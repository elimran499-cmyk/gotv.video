import React from 'react';
import { Tv, ArrowRight } from 'lucide-react';
import { CHANNELS, DURATION_SUMMARY, Channel, Lang } from '../data/mockData';

interface ChannelsExplorerProps {
  lang: Lang;
  onExplorePlans: () => void;
}

const ROW_COUNT = 3;
/** Seconds of scroll per tile, so every row moves at the same pace. */
const SECONDS_PER_TILE = 4;

const ROWS: Channel[][] = Array.from({ length: ROW_COUNT }, (_, row) =>
  CHANNELS.filter((_, idx) => idx % ROW_COUNT === row)
);

const qualityLabel = (channel: Channel): string =>
  channel.quality === '4K Ultra HD' ? '4K' : channel.quality === '60 FPS' ? '60' : 'HD';

/** Display-only logo tile: the wall shows the line-up, it is not clickable. */
const ChannelTile: React.FC<{ channel: Channel }> = ({ channel }) => (
  <div
    aria-label={channel.name}
    className="relative shrink-0 w-32 sm:w-44 h-20 sm:h-28 rounded-2xl bg-white border border-[#dbe8df] shadow-xs overflow-hidden flex items-center justify-center px-3 select-none"
  >
    <span className="absolute top-2 right-2 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#eef3ef] text-[#2d4b3d]">
      {qualityLabel(channel)}
    </span>

    {channel.logoSrc ? (
      <img
        src={channel.logoSrc}
        alt={channel.name}
        loading="eager"
        decoding="async"
        draggable={false}
        className="max-h-11 sm:max-h-14 max-w-[86%] object-contain"
      />
    ) : (
      <span className="text-sm font-extrabold text-[#0c2017] font-display text-center leading-tight">
        {channel.name}
      </span>
    )}
  </div>
);

export const ChannelsExplorer: React.FC<ChannelsExplorerProps> = ({
  lang,
  onExplorePlans,
}) => {
  const t = {
    nl: {
      tag: 'ZENDERS',
      titleStart: 'Ontdek het ',
      titleAccent: 'volledige',
      titleEnd: ' zenderaanbod',
      intro:
        'Van de Eredivisie en Formule 1 tot NPO, RTL, SBS en de nieuwste bioscoopfilms. Alle zenders in haarscherpe 4K Ultra HD.',
      ctaTitle: 'Al jouw favoriete zenders in één abonnement',
      ctaText: `Kies een looptijd van ${DURATION_SUMMARY.nl} en kijk binnen 5 minuten op je eigen TV of telefoon.`,
      cta: 'Bekijk Pakketten',
    },
    en: {
      tag: 'CHANNELS',
      titleStart: 'Discover the ',
      titleAccent: 'full',
      titleEnd: ' channel line-up',
      intro:
        'From the Eredivisie and Formula 1 to NPO, RTL, SBS and the latest cinema releases. Every channel in razor-sharp 4K Ultra HD.',
      ctaTitle: 'All your favourite channels in one subscription',
      ctaText: `Pick a term of ${DURATION_SUMMARY.en} and be watching on your own TV or phone within 5 minutes.`,
      cta: 'View Packages',
    },
    de: {
      tag: 'SENDER',
      titleStart: 'Entdecke das ',
      titleAccent: 'komplette',
      titleEnd: ' Senderangebot',
      intro:
        'Von der Eredivisie und Formel 1 bis NPO, RTL, SBS und den neuesten Kinofilmen. Alle Sender in gestochen scharfem 4K Ultra HD.',
      ctaTitle: 'Alle deine Lieblingssender in einem Abo',
      ctaText: `Wähle eine Laufzeit von ${DURATION_SUMMARY.de} und schaue innerhalb von 5 Minuten auf deinem eigenen TV oder Handy.`,
      cta: 'Pakete ansehen',
    },
  }[lang];

  return (
    <section id="zenders" className="fluid-dark py-16 lg:py-24 border-b border-[#142e21] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#8fe2b7] uppercase mb-2">
              <Tv className="w-3.5 h-3.5" />
              <span>{t.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display [text-wrap:balance]">
              {t.titleStart}
              <span className="text-fluid">{t.titleAccent}</span>
              {t.titleEnd}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#759f89] max-w-2xl">{t.intro}</p>
          </div>

        </div>
      </div>

      {/* Auto-scrolling channel wall */}
      <div className="space-y-3 sm:space-y-4">
        {ROWS.map((row, rowIdx) => (
          <div
            key={rowIdx}
            data-reveal={rowIdx % 2 === 0 ? 'left' : 'right'}
            style={{ '--reveal-delay': `${rowIdx * 120}ms` } as React.CSSProperties}
            className="overflow-hidden"
          >
            <div
              className={`flex w-max gap-3 sm:gap-4 pr-3 sm:pr-4 ${
                rowIdx % 2 === 0 ? 'marquee-left' : 'marquee-right'
              }`}
              style={
                {
                  '--marquee-duration': `${Math.max(18, row.length * SECONDS_PER_TILE)}s`,
                } as React.CSSProperties
              }
            >
              {[0, 1].map((copy) => (
                <React.Fragment key={copy}>
                  {row.map((channel) => (
                    <ChannelTile key={`${copy}-${channel.id}`} channel={channel} />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom CTA strip */}
        <div data-reveal="zoom" className="mt-10 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
