import React from 'react';
import { PAGE_COPY } from '../seo/routes';
import { ArrowRight, ShieldCheck, Zap, Activity, Gauge, Play, Crown } from 'lucide-react';
import { MEDIA_ROWS, CHANNEL_COUNT, VOD_COUNT, MediaItem, Lang } from '../data/mockData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroSectionProps {
  lang: Lang;
  onExplorePlans: () => void;
  onOpenWhatsApp: () => void;
  onOpenSpeedTest: () => void;
}

/** Posters for the scrolling walls. */
const ALL_POSTERS: MediaItem[] = MEDIA_ROWS.flatMap((row) => row.items).filter((item) =>
  Boolean(item.poster)
);
const COLUMN_A = ALL_POSTERS.filter((_, idx) => idx % 3 === 0).slice(0, 8);
const COLUMN_B = ALL_POSTERS.filter((_, idx) => idx % 3 === 1).slice(0, 8);
const COLUMN_C = ALL_POSTERS.filter((_, idx) => idx % 3 === 2).slice(0, 8);
const FEATURED = ALL_POSTERS[0];

const PosterColumn: React.FC<{
  items: MediaItem[];
  direction: 'up' | 'down';
  className?: string;
}> = ({ items, direction, className = '' }) => (
  <div className={`overflow-hidden flex-1 ${className}`} aria-hidden="true">
    <div
      className={`flex flex-col gap-3 pb-3 ${
        direction === 'up' ? 'hero-track-up' : 'hero-track-down'
      }`}
    >
      {[0, 1].map((copy) => (
        <React.Fragment key={copy}>
          {items.map((item) => (
            <div
              key={`${copy}-${item.id}`}
              className="aspect-[2/3] rounded-2xl overflow-hidden bg-[#0d2217] ring-1 ring-white/10 shadow-xl shadow-black/40"
            >
              <img
                src={item.poster}
                alt=""
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExplorePlans,
  onOpenWhatsApp,
  onOpenSpeedTest,
}) => {
  const content = {
    nl: {
      eyebrow: 'Premium 4K IPTV · Nederland & België',
      subhead:
        'Alle Nederlandse zenders, complete sportpakketten en de nieuwste films en series op elk apparaat — zonder schotel, zonder kabel en zonder buffering.',
      ctaPrimary: 'Bekijk Pakketten',
      ctaSecondary: 'Neem Contact Op',
      uptime: '99.9% Uptime',
      antiBuffering: 'Anti-Freeze Technologie',
      instant: 'Direct Actief, Zonder Contract',
      channels: 'live zenders',
      vod: 'films & series',
      panelKicker: 'Meest bekeken films & series',
      nowPlaying: 'Nu populair',
      tagline: 'Alles kijken. Eén abonnement.',
      speedCheck: 'Gratis geschiktheidscheck voor jouw thuisnetwerk',
    },
    en: {
      eyebrow: 'Premium 4K IPTV · Netherlands & Belgium',
      subhead:
        'Every Dutch channel, complete sports packages and the latest movies and series on any device — no dish, no cable and no buffering.',
      ctaPrimary: 'View Packages',
      ctaSecondary: 'Get In Touch',
      uptime: '99.9% Uptime',
      antiBuffering: 'Anti-Freeze Technology',
      instant: 'Active Instantly, No Contract',
      channels: 'live channels',
      vod: 'movies & series',
      panelKicker: 'Most watched movies & series',
      nowPlaying: 'Trending now',
      tagline: 'Watch everything. One subscription.',
      speedCheck: 'Free compatibility check for your home network',
    },
    de: {
      eyebrow: 'Premium 4K IPTV · Deutschland, Niederlande & Belgien',
      subhead:
        'Alle Sender, komplette Sportpakete und die neuesten Filme und Serien auf jedem Gerät — ohne Schüssel, ohne Kabel und ohne Buffering.',
      ctaPrimary: 'Pakete ansehen',
      ctaSecondary: 'Kontakt aufnehmen',
      uptime: '99.9% Uptime',
      antiBuffering: 'Anti-Freeze-Technologie',
      instant: 'Sofort aktiv, ohne Vertrag',
      channels: 'Live-Sender',
      vod: 'Filme & Serien',
      panelKicker: 'Meistgesehene Filme & Serien',
      nowPlaying: 'Jetzt beliebt',
      tagline: 'Alles schauen. Ein Abo.',
      speedCheck: 'Kostenloser Eignungscheck für dein Heimnetzwerk',
    },
  }[lang];

  return (
    <section className="relative overflow-hidden bg-[#07140e] text-white">
      {/* Fluid colour field */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="blob-drift absolute -top-40 -left-32 w-[34rem] h-[34rem] rounded-full bg-green-500/25 blur-[110px]" />
        <div className="blob-drift-slow absolute top-1/3 right-[-10rem] w-[32rem] h-[32rem] rounded-full bg-green-400/15 blur-[120px]" />
        <div className="blob-drift absolute bottom-[-14rem] left-1/3 w-[30rem] h-[30rem] rounded-full bg-[#d6bf96]/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07140e] to-transparent" />
      </div>

      {/* Phones & tablets: tilted poster collage on top, wordmark overlapping it */}
      <div data-reveal="fade" className="lg:hidden relative" aria-hidden="true">
        <div
          className="relative h-[21rem] sm:h-[26rem] overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 97%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 97%)',
          }}
        >
          <div className="absolute -inset-x-12 -top-12 bottom-0 flex gap-2.5 -rotate-6 scale-110">
            <PosterColumn items={COLUMN_A} direction="up" />
            <PosterColumn items={COLUMN_B} direction="down" />
            <PosterColumn items={COLUMN_C} direction="up" />
            <PosterColumn items={COLUMN_A.slice().reverse()} direction="down" />
          </div>
          {/* Classic green wash so the art sits in the brand colour */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b3d1f]/45 via-transparent to-[#07140e]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(22,163,74,0.35),transparent_70%)]" />
        </div>

        {/* Floating chips over the collage */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#07140e]/80 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white shadow-lg">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          LIVE · 4K Ultra HD
        </div>
        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-btn text-[11px] font-extrabold text-[#0c2017] shadow-lg">
          <Crown className="w-3.5 h-3.5" />
          Premium VIP
        </div>

        {/* Now-playing card */}
        <div className="absolute right-4 bottom-24 sm:bottom-28 flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-2xl bg-[#07140e]/80 backdrop-blur-xl border border-[#d6bf96]/40 shadow-2xl">
          <img
            src={FEATURED.poster}
            alt=""
            className="w-9 h-12 rounded-lg object-cover ring-1 ring-white/20"
          />
          <div className="text-left">
            <div className="text-[9px] font-bold uppercase tracking-wider text-[#f3dfb4]">
              {content.nowPlaying}
            </div>
            <div className="text-xs font-bold text-white">{FEATURED.title}</div>
            <div className="mt-1 h-1 w-24 rounded-full bg-white/15 overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-[#22c55e]" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-20 sm:-mt-24 lg:mt-0 pb-14 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left: value proposition */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div data-reveal style={{ '--reveal-delay': '0ms' } as React.CSSProperties} className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d6bf96]/10 border border-[#d6bf96]/40 backdrop-blur-md text-[11px] sm:text-xs font-semibold tracking-wide text-[#f3dfb4]">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-70 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
              </span>
              <span>{content.eyebrow}</span>
            </div>

            <h1 data-reveal="zoom" style={{ '--reveal-delay': '120ms' } as React.CSSProperties} className="lg:mt-6 font-display font-extrabold uppercase tracking-tight leading-[0.9] text-[clamp(5rem,26vw,9.5rem)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
              <span className="text-white">GO</span>
              <span className="text-gold">TV</span>
              <span className="text-[#a8de57]">.</span>
              {/* What the site is, for search engines and screen readers; the wordmark stays the visual. */}
              <span className="sr-only"> {PAGE_COPY.home[lang].h1}</span>
            </h1>

            {/* Phones: gold rule and tagline under the wordmark */}
            <div data-reveal="fade" style={{ '--reveal-delay': '420ms' } as React.CSSProperties} className="lg:hidden mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#d6bf96]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] whitespace-nowrap text-[#f3dfb4]">
                {content.tagline}
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#d6bf96]" />
            </div>

            <p data-reveal style={{ '--reveal-delay': '300ms' } as React.CSSProperties} className="mt-5 lg:mt-6 text-base sm:text-lg lg:text-xl text-white/90 lg:text-[#c3dccf] leading-relaxed max-w-xl mx-auto lg:mx-0">
              {content.subhead}
            </p>

            {/* CTAs */}
            <div data-reveal style={{ '--reveal-delay': '420ms' } as React.CSSProperties} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onExplorePlans}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-fluid-btn active:scale-[0.98] text-base font-bold shadow-xl shadow-green-500/40 ring-1 ring-white/20 transition-all group"
              >
                <span>{content.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white text-[#0c2017] hover:bg-[#f1f7f3] lg:bg-white/5 lg:text-white lg:hover:bg-white/10 border border-white/20 text-base font-bold lg:font-semibold backdrop-blur-sm shadow-lg lg:shadow-none transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25d366]" />
                <span>{content.ctaSecondary}</span>
              </button>
            </div>

            {/* Headline figures */}
            <div data-reveal style={{ '--reveal-delay': '540ms' } as React.CSSProperties} className="mt-8 grid grid-cols-3 max-w-md mx-auto lg:mx-0 rounded-2xl bg-white/10 lg:bg-white/5 border border-[#d6bf96]/30 lg:border-white/10 backdrop-blur-md divide-x divide-white/10 text-center">
              {[
                { value: CHANNEL_COUNT, label: content.channels },
                { value: VOD_COUNT, label: content.vod },
                { value: '4K', label: 'Ultra HD · 60FPS' },
              ].map((stat) => (
                <div key={stat.label} className="px-2 py-3.5">
                  <div className="text-xl sm:text-2xl font-extrabold font-display tabular-nums text-gold lg:text-white">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#8fb9a4]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Proof points */}
            <div data-reveal style={{ '--reveal-delay': '660ms' } as React.CSSProperties} className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-[11px] sm:text-xs font-medium text-[#cfe6da]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                {content.uptime}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Zap className="w-3.5 h-3.5 text-green-400" />
                {content.antiBuffering}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Activity className="w-3.5 h-3.5 text-green-400" />
                {content.instant}
              </span>
            </div>

            <button
              data-reveal="fade"
              style={{ '--reveal-delay': '780ms' } as React.CSSProperties}
              onClick={onOpenSpeedTest}
              className="mt-5 inline-flex items-center gap-2 text-left text-xs sm:text-sm font-semibold text-[#f3dfb4] hover:text-white underline underline-offset-4 decoration-[#d6bf96]/50 transition-colors"
            >
              <Gauge className="w-4 h-4" />
              {content.speedCheck}
            </button>
          </div>

          {/* Right (desktop): tilted poster wall */}
          <div data-reveal="right" style={{ '--reveal-delay': '250ms' } as React.CSSProperties} className="hidden lg:block lg:col-span-5 relative">
            <div
              className="relative h-[600px] rounded-[2rem] overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)',
              }}
            >
              <div className="absolute inset-0 flex gap-3 rotate-[5deg] scale-110">
                <PosterColumn items={COLUMN_A} direction="up" />
                <PosterColumn items={COLUMN_B} direction="down" />
                <PosterColumn items={COLUMN_C} direction="up" />
              </div>
            </div>

            {/* Floating caption */}
            <div className="absolute -left-6 bottom-12 flex items-center gap-3 bg-[#0b1f15]/85 backdrop-blur-xl pl-3 pr-5 py-3 rounded-2xl border border-white/15 shadow-2xl">
              <span className="flex w-10 h-10 items-center justify-center rounded-xl bg-fluid-btn">
                <Play className="w-4 h-4 fill-current" />
              </span>
              <div>
                <div className="text-[11px] font-semibold text-[#f3dfb4] uppercase tracking-wider">
                  {content.panelKicker}
                </div>
                <div className="text-sm font-bold text-white">
                  {CHANNEL_COUNT} {content.channels} · 4K Ultra HD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
