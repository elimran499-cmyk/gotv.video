import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Lang } from '../data/mockData';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';
import { pagePath, postPath } from '../seo/routes';
import { WhatsAppIcon } from './WhatsAppIcon';

interface BlogPostPageProps {
  post: BlogPost;
  lang: Lang;
  onOpenWhatsApp: () => void;
}

/** A blog article on its own page. */
export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, lang, onOpenWhatsApp }) => {
  const t = {
    nl: { min: 'min lezen', plans: 'Bekijk pakketten', help: 'Vraag het via WhatsApp', more: 'Meer artikelen' },
    en: { min: 'min read', plans: 'View packages', help: 'Ask us on WhatsApp', more: 'More articles' },
    de: { min: 'Min. Lesezeit', plans: 'Pakete ansehen', help: 'Frag uns per WhatsApp', more: 'Weitere Artikel' },
  }[lang];
  const others = BLOG_POSTS.filter((p) => p.id !== post.id);

  return (
    <section className="fluid-light py-12 lg:py-16 border-b border-[#dbe8df]">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-[#0c2017]">
        <div className="relative aspect-[16/8] rounded-[2rem] overflow-hidden bg-[#07140e] shadow-xl shadow-emerald-950/15">
          <img src={post.cover} alt={post.title[lang]} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="mt-6 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-wider text-[#15803d]">
          <span>{post.category[lang]}</span>
          <span className="w-1 h-1 rounded-full bg-[#b7cdbf]" />
          <span className="inline-flex items-center gap-1 font-semibold normal-case tracking-normal text-[#6b8a7a]">
            <Clock className="w-3 h-3" />
            {post.minutes} {t.min}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#b7cdbf]" />
          <time dateTime={post.date} className="font-semibold normal-case tracking-normal text-[#6b8a7a]">
            {new Date(`${post.date}T12:00:00Z`).toLocaleDateString({ nl: 'nl-NL', en: 'en-GB', de: 'de-DE' }[lang], {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
        </div>

        <div className="mt-6 space-y-7">
          {post.body[lang].map((block) => (
            <div key={block.heading}>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0c2017]">{block.heading}</h2>
              <p className="mt-2 text-base text-[#3b594b] leading-relaxed">{block.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[#dbe8df] flex flex-col sm:flex-row gap-3">
          <a
            href={pagePath('pricing', lang)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-fluid-btn text-sm font-bold active:scale-[0.98] transition-all group"
          >
            {t.plans}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={onOpenWhatsApp}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#c9ddd0] hover:border-[#25d366] text-sm font-bold text-[#0c2017] transition-colors cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25d366]" />
            {t.help}
          </button>
        </div>

        <h2 className="mt-12 text-lg font-bold font-display text-[#0c2017]">{t.more}</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {others.map((other) => (
            <li key={other.id}>
              <a
                href={postPath(other, lang)}
                className="block h-full p-4 rounded-2xl bg-white border border-[#dbe8df] hover:border-[#bcd9c6] hover:shadow-md transition-all"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803d]">{other.category[lang]}</span>
                <span className="mt-1 block text-base font-bold font-display leading-snug">{other.title[lang]}</span>
              </a>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};
