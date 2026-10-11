import React, { useState } from 'react';
import { Film, Languages, Play, RefreshCw, ArrowRight } from 'lucide-react';
import { MEDIA_ROWS, VOD_COUNT, MediaItem, Lang } from '../data/mockData';

interface MoviesSeriesSectionProps {
  lang: Lang;
  onSelectMedia: (item: MediaItem) => void;
  onExplorePlans: () => void;
}

type TypeFilter = 'all' | 'film' | 'serie';

/** Seconds of scroll per poster, so every row moves at the same pace. */
const SECONDS_PER_POSTER = 5;

export const MoviesSeriesSection: React.FC<MoviesSeriesSectionProps> = ({
  lang,
  onSelectMedia,
  onExplorePlans,
}) => {
  const [filter, setFilter] = useState<TypeFilter>('all');

  const t = {
    nl: {
      tag: 'FILMS & SERIES',
      titleStart: 'Jouw eigen ',
      titleAccent: 'bioscoop',
      titleEnd: ', altijd open',
      intro:
        'De populairste series van dit moment, de best beoordeelde films en tijdloze familieklassiekers. Kijk wanneer je wilt, pauzeer wanneer je wilt — allemaal met NL ondertiteling.',
      filters: { all: 'Alles', film: 'Films', serie: 'Series' },
      serie: 'Serie',
      film: 'Film',
      posterAlt: 'Poster van',
      perks: [
        {
          icon: Languages,
          title: 'NL Ondertiteling & Audio',
          text: 'Nederlandse subs op vrijwel elke titel, veel kinderfilms ook NL gesproken.',
        },
        {
          icon: Play,
          title: 'Direct Afspelen',
          text: 'Geen wachttijd of buffering — start binnen 2 seconden op elk apparaat.',
        },
        {
          icon: RefreshCw,
          title: 'Wekelijks Aangevuld',
          text: 'Nieuwe bioscooptitels en verse seizoenen worden automatisch toegevoegd.',
        },
      ],
      ctaTitle: 'Blader zelf door de volledige filmbibliotheek',
      ctaText: `Kies een pakket en ontdek alle ${VOD_COUNT} films en series op jouw eigen TV.`,
      cta: 'Bekijk Pakketten',
    },
    en: {
      tag: 'MOVIES & SERIES',
      titleStart: 'Your own ',
      titleAccent: 'cinema',
      titleEnd: ', always open',
      intro:
        'The most popular series right now, the best-rated films and timeless family classics. Watch when you want, pause when you want — all with Dutch subtitles.',
      filters: { all: 'All', film: 'Movies', serie: 'Series' },
      serie: 'Series',
      film: 'Movie',
      posterAlt: 'Poster of',
      perks: [
        {
          icon: Languages,
          title: 'Dutch Subtitles & Audio',
          text: 'Dutch subs on virtually every title, and many kids films dubbed in Dutch too.',
        },
        {
          icon: Play,
          title: 'Instant Playback',
          text: 'No waiting or buffering — starts within 2 seconds on any device.',
        },
        {
          icon: RefreshCw,
          title: 'Topped Up Weekly',
          text: 'New cinema titles and fresh seasons are added automatically.',
        },
      ],
      ctaTitle: 'Browse the full film library yourself',
      ctaText: `Pick a package and discover all ${VOD_COUNT} movies and series on your own TV.`,
      cta: 'View Packages',
    },
    de: {
      tag: 'FILME & SERIEN',
      titleStart: 'Dein eigenes ',
      titleAccent: 'Kino',
      titleEnd: ', immer geöffnet',
      intro:
        'Die beliebtesten Serien im Moment, die bestbewerteten Filme und zeitlose Familienklassiker. Schau, wann du willst, pausiere, wann du willst.',
      filters: { all: 'Alle', film: 'Filme', serie: 'Serien' },
      serie: 'Serie',
      film: 'Film',
      posterAlt: 'Poster von',
      perks: [
        {
          icon: Languages,
          title: 'Untertitel & Tonspuren',
          text: 'Niederländische Untertitel bei fast jedem Titel, viele Kinderfilme auch synchronisiert.',
        },
        {
          icon: Play,
          title: 'Sofort abspielen',
          text: 'Kein Warten, kein Buffering — startet innerhalb von 2 Sekunden auf jedem Gerät.',
        },
        {
          icon: RefreshCw,
          title: 'Wöchentlich ergänzt',
          text: 'Neue Kinotitel und frische Staffeln werden automatisch hinzugefügt.',
        },
      ],
      ctaTitle: 'Stöbere selbst durch die komplette Filmbibliothek',
      ctaText: `Wähle ein Paket und entdecke alle ${VOD_COUNT} Filme und Serien auf deinem eigenen TV.`,
      cta: 'Pakete ansehen',
    },
  }[lang];

  const rows = MEDIA_ROWS.map((row) => ({
    ...row,
    items: filter === 'all' ? row.items : row.items.filter((item) => item.type === filter),
  })).filter((row) => row.items.length > 0);

  const filterIds: TypeFilter[] = ['all', 'film', 'serie'];

  return (
    <section id="films" className="fluid-dark py-16 lg:py-24 border-b border-[#142e21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#8fe2b7] uppercase mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>{t.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display [text-wrap:balance]">
              {t.titleStart}
              <span className="text-fluid">{t.titleAccent}</span>
              {t.titleEnd}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#759f89] max-w-2xl">{t.intro}</p>
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2 shrink-0">
            {filterIds.map((id) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                aria-pressed={filter === id}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  filter === id
                    ? 'bg-fluid-btn shadow-xs'
                    : 'bg-[#0f241a] hover:bg-[#153426] text-[#93b7a4] border border-[#1a3d2c]'
                }`}
              >
                {t.filters[id]}
              </button>
            ))}
          </div>
        </div>

        {/* Poster rows */}
        <div className="space-y-10">
          {rows.map((row, rowIdx) => (
            <div
              key={row.id}
              data-reveal
              style={{ '--reveal-delay': `${rowIdx * 100}ms` } as React.CSSProperties}
            >
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  {row.title[lang]}
                </h3>
                {row.subtitle[lang] && (
                  <p className="text-xs sm:text-sm text-[#65917a]">{row.subtitle[lang]}</p>
                )}
              </div>

              <div className="overflow-x-auto no-scrollbar -mx-4 sm:-mx-6 lg:-mx-8">
                <div
                  className={`marquee-track flex w-max gap-4 pr-4 pb-3 ${
                    rowIdx % 2 === 0 ? 'marquee-left' : 'marquee-right'
                  }`}
                  style={
                    {
                      '--marquee-duration': `${Math.max(30, row.items.length * SECONDS_PER_POSTER)}s`,
                    } as React.CSSProperties
                  }
                >
                  {[0, 1].map((copy) => (
                    <React.Fragment key={copy}>
                {row.items.map((item) => (
                  <button
                    key={`${copy}-${item.id}`}
                    tabIndex={copy === 1 ? -1 : undefined}
                    aria-hidden={copy === 1 ? true : undefined}
                    type="button"
                    onClick={() => onSelectMedia(item)}
                    className="group shrink-0 w-32 sm:w-40 text-left cursor-pointer"
                  >
                    <div
                      className={`relative aspect-[2/3] rounded-2xl bg-gradient-to-br ${item.accent} overflow-hidden ring-1 ring-white/10 shadow-lg group-hover:ring-[#34d399]/60 group-hover:-translate-y-1 transition-all duration-200`}
                    >
                      {item.poster && (
                        <img
                          src={item.poster}
                          alt={`${t.posterAlt} ${item.title}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}

                      {item.badge && (
                        <span className="absolute top-2 left-2 bg-fluid-btn px-2 py-0.5 rounded text-[10px] font-bold">
                          {item.badge}
                        </span>
                      )}

                      <span className="absolute bottom-2 left-2 bg-[#091811]/90 px-2 py-0.5 rounded text-[10px] font-bold text-[#8fe2b7] border border-[#1c4832]">
                        {item.quality === '4K Ultra HD' ? '4K' : 'FHD'}
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-[#8fe2b7] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </button>
                ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Library perks */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {t.perks.map((perk, perkIdx) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                data-reveal
                style={{ '--reveal-delay': `${perkIdx * 110}ms` } as React.CSSProperties}
                className="bg-[#0d2217] border border-[#1b3f2c] rounded-2xl p-5 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#153424] text-[#4ade80] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">{perk.title}</h4>
                  <p className="mt-1 text-xs text-[#87ab97] leading-relaxed">{perk.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div data-reveal="zoom" className="mt-6 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-display">{t.ctaTitle}</h3>
            <p className="mt-1 text-xs sm:text-sm text-[#87ab97]">{t.ctaText}</p>
          </div>
          <button
            onClick={onExplorePlans}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-fluid-btn text-sm font-bold shadow-lg shadow-emerald-500/20 transition-colors cursor-pointer shrink-0"
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
