import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Route, copyFor, pagePath } from '../seo/routes';

/**
 * The top of a section page or an article: where you are, the page's own
 * headline and a short opening paragraph. The homepage uses its hero instead.
 */
export const PageIntro: React.FC<{ route: Route }> = ({ route }) => {
  const { lang } = route;
  const copy = copyFor(route);
  const section = copyFor({ page: route.page, lang });

  return (
    <section className="fluid-dark pt-8 sm:pt-12 pb-10 sm:pb-14 border-b border-[#142e21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#8fb9a4]">
          <a href={pagePath('home', lang)} className="hover:text-white transition-colors">
            {copyFor({ page: 'home', lang }).label}
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#d6bf96]" aria-hidden="true" />
          {route.post ? (
            <a href={pagePath(route.page, lang)} className="hover:text-white transition-colors">
              {section.label}
            </a>
          ) : (
            <span aria-current="page" className="text-white">
              {section.label}
            </span>
          )}
        </nav>
        <h1 className="mt-5 max-w-4xl text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display [text-wrap:balance]">
          {copy.h1}
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg text-[#b8d6c6] leading-relaxed">{copy.intro}</p>
      </div>
    </section>
  );
};
