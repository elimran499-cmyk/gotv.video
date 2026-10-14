import React from 'react';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import { Lang } from '../data/mockData';
import { BLOG_POSTS } from '../data/blogPosts';
import { postPath } from '../seo/routes';

interface BlogSectionProps {
  lang: Lang;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ lang }) => {
  const t = {
    nl: {
      tag: 'BLOG',
      titleStart: 'Tips om ',
      titleAccent: 'meer',
      titleEnd: ' uit je tv te halen',
      subtitle: 'Korte handleidingen van ons supportteam: installeren, je verbinding op orde en haperend beeld oplossen.',
      read: 'Lees artikel',
      min: 'min lezen',
      featured: 'Uitgelicht',
      close: 'Sluiten',
      plans: 'Bekijk pakketten',
      help: 'Vraag het via WhatsApp',
    },
    en: {
      tag: 'BLOG',
      titleStart: 'Tips to get ',
      titleAccent: 'more',
      titleEnd: ' out of your TV',
      subtitle: 'Short guides from our support team: installing, getting your connection right and fixing a stuttering picture.',
      read: 'Read article',
      min: 'min read',
      featured: 'Featured',
      close: 'Close',
      plans: 'View packages',
      help: 'Ask us on WhatsApp',
    },
    de: {
      tag: 'BLOG',
      titleStart: 'Tipps, um ',
      titleAccent: 'mehr',
      titleEnd: ' aus deinem TV zu holen',
      subtitle: 'Kurze Anleitungen von unserem Support-Team: Einrichten, die Verbindung in den Griff bekommen und ruckelndes Bild beheben.',
      read: 'Artikel lesen',
      min: 'Min. Lesezeit',
      featured: 'Empfohlen',
      close: 'Schließen',
      plans: 'Pakete ansehen',
      help: 'Frag uns per WhatsApp',
    },
  }[lang];

  const [lead, ...rest] = BLOG_POSTS;
  // a single article beside the big one gets its picture on top, at full width, instead of a narrow strip at the side
  const single = rest.length === 1;

  return (
    <section id="blog" className="fluid-light py-16 lg:py-24 border-b border-[#dbe8df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal="left" className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e2f0e7] border border-[#c9ddd0] text-[11px] font-semibold tracking-wider text-[#1e4834] uppercase mb-3">
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0c2017] font-display [text-wrap:balance]">
            {t.titleStart}
            <span className="text-fluid-deep">{t.titleAccent}</span>
            {t.titleEnd}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3b594b] leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-7">
          {/* Lead article */}
          <a
            data-reveal
            href={postPath(lead, lang)}
            className="group relative lg:col-span-3 min-h-[22rem] sm:min-h-[26rem] rounded-[2rem] overflow-hidden text-left bg-[#07140e] shadow-xl shadow-emerald-950/15 cursor-pointer"
          >
            <img
              src={lead.cover}
              alt={lead.title[lang]}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07140e] via-[#07140e]/70 to-[#07140e]/10" />
            <div className="relative h-full flex flex-col justify-end p-6 sm:p-9">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                <span className="px-2.5 py-1 rounded-full bg-fluid-btn">{t.featured}</span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#f3dfb4] backdrop-blur-md">
                  {lead.category[lang]}
                </span>
              </div>
              <h3 className="mt-4 max-w-xl text-2xl sm:text-4xl font-extrabold font-display leading-tight text-white [text-wrap:balance]">
                {lead.title[lang]}
              </h3>
              <p className="mt-3 max-w-lg text-sm sm:text-base text-[#c3dccf] leading-relaxed">
                {lead.excerpt[lang]}
              </p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8fb9a4]">
                  <Clock className="w-3.5 h-3.5" />
                  {lead.minutes} {t.min}
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  {t.read}
                  <span className="flex w-9 h-9 items-center justify-center rounded-full bg-fluid-btn group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </span>
              </div>
            </div>
          </a>

          {/* Other articles */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-7">
            {rest.map((post, idx) => (
              <a
                key={post.id}
                data-reveal
                style={{ '--reveal-delay': `${(idx + 1) * 110}ms` } as React.CSSProperties}
                href={postPath(post, lang)}
                className={`group flex ${single ? '' : 'lg:flex-row'} flex-col gap-4 sm:gap-5 p-3 rounded-[1.75rem] bg-white border border-[#dbe8df] text-left shadow-xs hover:shadow-lg hover:border-[#bcd9c6] hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
              >
                <div className={`relative ${single ? '' : 'lg:w-40 lg:aspect-auto'} shrink-0 aspect-[16/10] rounded-[1.25rem] overflow-hidden bg-[#0c2017]`}>
                  <img
                    src={post.cover}
                    alt={post.title[lang]}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className={`flex-1 min-w-0 flex flex-col px-2 pb-3 ${single ? '' : 'lg:px-0 lg:py-2 lg:pr-3'}`}>
                  <div className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-wider text-[#15803d]">
                    <span>{post.category[lang]}</span>
                    <span className="w-1 h-1 rounded-full bg-[#b7cdbf]" />
                    <span className="font-semibold normal-case tracking-normal text-[#6b8a7a]">
                      {post.minutes} {t.min}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold font-display leading-snug text-[#0c2017] [text-wrap:balance]">
                    {post.title[lang]}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#4b6a5b] leading-relaxed line-clamp-2">
                    {post.excerpt[lang]}
                  </p>
                  <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#0c2017]">
                    {t.read}
                    <ArrowRight className="w-4 h-4 text-[#15803d] group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
