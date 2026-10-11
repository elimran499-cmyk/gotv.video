import React from 'react';
import { PAGE_COPY } from '../seo/routes';
import { ArrowRight, ShieldCheck, Zap, Activity, Gauge, Play } from 'lucide-react';
import { MEDIA_ROWS, CHANNELS, CHANNEL_COUNT, VOD_COUNT, MediaItem, Lang } from '../data/mockData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroSectionProps {
  lang: Lang;
  onExplorePlans: () => void;
  onOpenWhatsApp: () => void;
  onOpenSpeedTest: () => void;
}

/** The posters that pass through the O of the name, one at a time. */
const REEL: MediaItem[] = MEDIA_ROWS.flatMap((row) => row.items)
  .filter((item) => Boolean(item.poster))
  .slice(0, 6);
const LOGOS = CHANNELS.filter((channel) => channel.logoSrc).slice(0, 16);

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

  // The poster showing in the O; the caption under the name says which one it is.
  const [shown, setShown] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setShown((index) => (index + 1) % REEL.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  const lines = content.tagline.split('. ').map((line, i, all) => (i < all.length - 1 ? `${line}.` : line));
  const nowPlaying = (
    <span className="inline-flex items-center gap-2 min-w-0">
      <Play className="w-3.5 h-3.5 shrink-0 fill-current" />
      <span className="truncate">
        {content.nowPlaying}: {REEL[shown].title}
      </span>
    </span>
  );
  const stats = [
    { value: CHANNEL_COUNT, label: content.channels },
    { value: VOD_COUNT, label: content.vod },
    { value: '4K', label: 'Ultra HD · 60FPS' },
  ];
  const proofs = [
    { icon: ShieldCheck, text: content.uptime },
    { icon: Zap, text: content.antiBuffering },
    { icon: Activity, text: content.instant },
  ];

  return (
    // Starts under the floating top bar, so the stage's colour runs behind it.
    <section className="relative -mt-[4.625rem] sm:-mt-[5.25rem] bg-[#f2f5ec] text-[#0c2017]">
      {/* The stage: the name as large as it goes, its O a window on what is on */}
      <div className="px-2 pt-2 sm:px-5 sm:pt-5">
        <div className="go-stage max-w-[87.5rem] mx-auto overflow-hidden rounded-[2.125rem] sm:rounded-[2.75rem] px-[1.125rem] sm:px-10 pt-[5.25rem] sm:pt-28 pb-5 sm:pb-6">
          <h1 className="go-word flex flex-col sm:flex-row sm:items-center font-display font-extrabold whitespace-nowrap">
            <span className="flex items-center" aria-hidden="true">
              G
              <span className="go-o">
                <span
                  className="flex h-full flex-col transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)]"
                  style={{ transform: `translateY(-${shown * 100}%)` }}
                >
                  {REEL.map((item) => (
                    <img key={item.id} src={item.poster} alt="" className="h-full w-full shrink-0 object-cover" />
                  ))}
                </span>
              </span>
            </span>
            <span className="flex items-end" aria-hidden="true">
              <span>TV</span>
              {/* Phones: a play button closes the name like a full stop */}
              <span className="go-dot sm:hidden">
                <Play className="w-[42%] h-[42%] fill-current" />
              </span>
            </span>
            {/* What the site is, for search engines and screen readers; the name stays the visual. */}
            <span className="sr-only">GOTV. {PAGE_COPY.home[lang].h1}</span>
          </h1>

          <div className="mt-4 sm:mt-6 flex items-center justify-between gap-6 text-xs sm:text-sm font-semibold">
            <span className="hidden sm:block">{content.eyebrow}</span>
            {nowPlaying}
          </div>
        </div>
      </div>

      <div className="max-w-[87.5rem] mx-auto px-5 sm:px-10 lg:px-16 pt-6 sm:pt-8 lg:pt-9 pb-10 grid lg:grid-cols-12 gap-x-10 gap-y-7">
        <div className="lg:col-span-5">
          <p className="sm:hidden text-xs font-semibold text-[#2f6b12]">{content.eyebrow}</p>
          <p className="mt-2 sm:mt-0 font-display font-bold tracking-[-0.025em] leading-[1.04] text-[2.125rem] sm:text-5xl">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onExplorePlans}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#0c2017] text-[#c8f47f] hover:bg-[#143524] active:scale-[0.98] text-base font-bold shadow-xl shadow-[#0c2017]/25 transition-all cursor-pointer group"
            >
              <span>{content.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenWhatsApp}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white hover:bg-[#f8faf5] border border-[#0c2017]/20 text-base font-bold transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25d366]" />
              <span>{content.ctaSecondary}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 lg:pt-2">
          <p className="text-base sm:text-[1.0625rem] text-[#4a6356] leading-relaxed">{content.subhead}</p>
          <ul className="mt-4 space-y-1.5 text-sm font-semibold">
            {proofs.map((proof) => (
              <li key={proof.text} className="flex items-center gap-2">
                <proof.icon className="w-4 h-4 text-[#2f6b12]" />
                {proof.text}
              </li>
            ))}
          </ul>
          <button
            onClick={onOpenSpeedTest}
            className="mt-4 inline-flex items-center gap-2 text-left text-sm font-semibold underline underline-offset-4 decoration-[#0c2017]/30 hover:decoration-[#0c2017] transition-colors cursor-pointer"
          >
            <Gauge className="w-4 h-4" />
            {content.speedCheck}
          </button>
        </div>

        <dl className="lg:col-span-3 grid grid-cols-3 lg:block border-y lg:border-y-0 border-[#0c2017]/15">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="py-2.5 pl-3 first:pl-0 border-l first:border-l-0 border-[#0c2017]/15 flex flex-col-reverse lg:flex-row lg:items-baseline lg:justify-between lg:pl-0 lg:py-3 lg:border-l-0 lg:border-t lg:last:border-b"
            >
              <dt className="text-[11px] sm:text-sm font-semibold lg:font-medium text-[#4a6356]">{stat.label}</dt>
              <dd className="font-display font-bold tracking-tight tabular-nums text-[1.4rem] sm:text-3xl lg:text-[2.125rem] leading-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* A few of the channels */}
      <div className="go-fade overflow-hidden pb-12 lg:pb-14" aria-hidden="true">
        <div className="flex w-max marquee-left" style={{ '--marquee-duration': '50s' } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <React.Fragment key={copy}>
              {LOGOS.map((channel) => (
                <span
                  key={`${copy}-${channel.id}`}
                  className="mr-2.5 flex w-[5.25rem] h-11 sm:w-[6.5rem] sm:h-12 shrink-0 items-center justify-center rounded-xl bg-white px-4 py-2.5"
                >
                  <img src={channel.logoSrc} alt="" className="max-w-full max-h-full object-contain" />
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
