import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Lang } from '../data/mockData';
import { BLOG_POSTS } from '../data/blogPosts';
import { PAGE_EXTRAS } from '../seo/pageExtras';
import { PageId, pagePath, postPath } from '../seo/routes';

/** The part of a section page that only that page has: more explanation and links onward. */
export const PageExtras: React.FC<{ page: Exclude<PageId, 'home'>; lang: Lang }> = ({ page, lang }) => {
  const extra = PAGE_EXTRAS[page][lang];
  const links = extra.links.flatMap((link) => {
    const post = link.post ? BLOG_POSTS.find((p) => p.id === link.post) : undefined;
    const href = post ? postPath(post, lang) : link.page ? pagePath(link.page, lang) : '';
    return href ? [{ href, label: link.label }] : [];
  });

  return (
    <section className="fluid-light py-14 lg:py-20 border-b border-[#dbe8df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-8">
          {extra.blocks.map((block) => (
            <div key={block.heading}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0c2017] font-display [text-wrap:balance]">
                {block.heading}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-[#3b594b] leading-relaxed">{block.text}</p>
            </div>
          ))}
        </div>
        <aside className="lg:col-span-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#15803d]">{extra.linksTitle}</h2>
          <ul className="mt-3 grid gap-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-white border border-[#dbe8df] hover:border-[#bcd9c6] hover:shadow-md text-sm sm:text-base font-bold text-[#0c2017] transition-all"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 shrink-0 text-[#15803d] group-hover:translate-x-1 transition-transform" />
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};
