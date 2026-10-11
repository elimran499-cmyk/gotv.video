import {
  DEVICE_OPTIONS,
  FAQS,
  PLAN_DURATIONS,
  PLAN_TIERS,
  PlanTierId,
  WHATSAPP_NUMBER,
  getPlanPrice,
} from '../data/mockData';
import { BLOG_POSTS } from '../data/blogPosts';
import {
  ROUTE_LANGS,
  Route,
  SITE_NAME,
  absoluteUrl,
  copyFor,
  pagePath,
  postPath,
  routePath,
  translatePath,
} from './routes';

/**
 * The <head> of a page: title, description, canonical address, the same page
 * in the other languages, sharing tags and structured data. The pre-render
 * writes it into the HTML; the browser updates it when you move between pages.
 */

const OG_LOCALE = { nl: 'nl_NL', de: 'de_DE', en: 'en_GB' } as const;

export interface HeadTag {
  tag: 'meta' | 'link' | 'script';
  attrs: Record<string, string>;
  text?: string;
}

export interface Head {
  title: string;
  lang: string;
  tags: HeadTag[];
}

const structuredData = (route: Route): object[] => {
  const { lang } = route;
  const copy = copyFor(route);
  const url = absoluteUrl(routePath(route));
  const home = absoluteUrl(pagePath('home', lang));
  const logo = absoluteUrl('/logo.png');
  const org = {
    '@type': 'Organization',
    '@id': `${absoluteUrl('/')}#organization`,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `https://wa.me/${WHATSAPP_NUMBER}`,
      availableLanguage: ['nl', 'de', 'en'],
    },
  };
  const data: object[] = [{ '@context': 'https://schema.org', ...org }];

  if (route.page === 'home') {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: home,
      inLanguage: lang,
      publisher: { '@id': org['@id'] },
    });
  } else {
    const crumbs = [
      { name: copyFor({ page: 'home', lang }).label, item: home },
      { name: copyFor({ page: route.page, lang }).label, item: absoluteUrl(pagePath(route.page, lang)) },
    ];
    if (route.post) crumbs.push({ name: copy.h1, item: url });
    data.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, ...crumb })),
    });
  }

  if (route.page === 'faq') {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q[lang],
        acceptedAnswer: { '@type': 'Answer', text: faq.a[lang] },
      })),
    });
  }

  if (route.page === 'pricing') {
    for (const tier of Object.keys(PLAN_TIERS) as PlanTierId[]) {
      const prices = PLAN_DURATIONS.flatMap((d) => DEVICE_OPTIONS.map((n) => getPlanPrice(tier, d.id, n)));
      data.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${SITE_NAME} IPTV ${PLAN_TIERS[tier].name[lang]}`,
        description: PLAN_TIERS[tier].features[lang].slice(0, 4).join(' · '),
        image: logo,
        brand: { '@type': 'Brand', name: SITE_NAME },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: Math.min(...prices).toFixed(2),
          highPrice: Math.max(...prices).toFixed(2),
          offerCount: prices.length,
          availability: 'https://schema.org/InStock',
          url,
        },
      });
    }
  }

  if (route.page === 'blog' && !route.post) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: BLOG_POSTS.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: post.title[lang],
        url: absoluteUrl(postPath(post, lang)),
      })),
    });
  }

  if (route.post) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: route.post.title[lang],
      description: route.post.excerpt[lang],
      image: absoluteUrl(route.post.cover),
      inLanguage: lang,
      datePublished: route.post.date,
      dateModified: route.post.date,
      mainEntityOfPage: url,
      author: { '@id': org['@id'] },
      publisher: { '@id': org['@id'] },
    });
  }

  return data;
};

export const buildHead = (route: Route): Head => {
  const copy = copyFor(route);
  const url = absoluteUrl(routePath(route));
  const image = route.post ? absoluteUrl(route.post.cover) : absoluteUrl('/og-image.jpg');
  const meta = (attrs: Record<string, string>): HeadTag => ({ tag: 'meta', attrs });
  const link = (attrs: Record<string, string>): HeadTag => ({ tag: 'link', attrs });

  if (route.notFound) {
    return {
      title: `404 | ${SITE_NAME}`,
      lang: route.lang,
      tags: [meta({ name: 'robots', content: 'noindex, follow' })],
    };
  }

  return {
    title: copy.title,
    lang: route.lang,
    tags: [
      meta({ name: 'description', content: copy.description }),
      meta({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }),
      link({ rel: 'canonical', href: url }),
      ...ROUTE_LANGS.map((lang) =>
        link({ rel: 'alternate', hreflang: lang, href: absoluteUrl(translatePath(route, lang)) })
      ),
      link({ rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(translatePath(route, 'nl')) }),
      meta({ property: 'og:site_name', content: SITE_NAME }),
      meta({ property: 'og:type', content: route.post ? 'article' : 'website' }),
      meta({ property: 'og:title', content: copy.title }),
      meta({ property: 'og:description', content: copy.description }),
      meta({ property: 'og:url', content: url }),
      meta({ property: 'og:image', content: image }),
      meta({ property: 'og:locale', content: OG_LOCALE[route.lang] }),
      meta({ name: 'twitter:card', content: 'summary_large_image' }),
      meta({ name: 'twitter:title', content: copy.title }),
      meta({ name: 'twitter:description', content: copy.description }),
      meta({ name: 'twitter:image', content: image }),
      ...structuredData(route).map(
        (json): HeadTag => ({
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          text: JSON.stringify(json).replace(/</g, '\\u003c'),
        })
      ),
    ],
  };
};

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The head as HTML, for the pre-rendered pages. */
export const headHtml = (head: Head): string =>
  [
    `<title>${escapeHtml(head.title)}</title>`,
    ...head.tags.map((t) => {
      const attrs = Object.entries(t.attrs)
        .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
        .join(' ');
      return t.tag === 'script'
        ? `<script data-seo ${attrs}>${t.text}</script>`
        : `<${t.tag} data-seo ${attrs} />`;
    }),
  ].join('\n    ');

/** Swaps the head in the browser when the visitor moves to another page. */
export const applyHead = (head: Head): void => {
  document.title = head.title;
  document.documentElement.lang = head.lang;
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
  for (const t of head.tags) {
    const el = document.createElement(t.tag);
    el.setAttribute('data-seo', '');
    for (const [key, value] of Object.entries(t.attrs)) el.setAttribute(key, value);
    if (t.text) el.textContent = t.text;
    document.head.appendChild(el);
  }
};
