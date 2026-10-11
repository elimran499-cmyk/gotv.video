import React, { useEffect } from 'react';
import { X, ArrowRight, Star, Calendar, Film, Globe, Zap } from 'lucide-react';
import { MediaItem, VOD_COUNT, Lang } from '../data/mockData';

interface MediaDetailModalProps {
  item: MediaItem;
  lang: Lang;
  onClose: () => void;
  onSelectPlan: () => void;
}

export const MediaDetailModal: React.FC<MediaDetailModalProps> = ({
  item,
  lang,
  onClose,
  onSelectPlan,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const t = {
    nl: {
      serie: 'Serie',
      film: 'Film',
      subs: 'NL ondertiteling',
      instant: 'Start binnen 2 sec',
      text: `${item.title} staat in onze bibliotheek van ${VOD_COUNT} films en series. Geen wachttijd of buffering, op elk apparaat en met Nederlandse ondertiteling.`,
      cta: 'Bekijk pakketten',
      close: 'Sluiten',
    },
    en: {
      serie: 'Series',
      film: 'Movie',
      subs: 'Dutch subtitles',
      instant: 'Starts within 2 sec',
      text: `${item.title} is part of our library of ${VOD_COUNT} movies and series. No waiting or buffering, on any device and with Dutch subtitles.`,
      cta: 'View packages',
      close: 'Close',
    },
    de: {
      serie: 'Serie',
      film: 'Film',
      subs: 'NL-Untertitel',
      instant: 'Startet in 2 Sek.',
      text: `${item.title} ist Teil unserer Bibliothek mit ${VOD_COUNT} Filmen und Serien. Kein Warten, kein Buffering, auf jedem Gerät.`,
      cta: 'Pakete ansehen',
      close: 'Schließen',
    },
  }[lang];

  const facts = [
    { icon: Calendar, label: String(item.year) },
    { icon: Film, label: item.type === 'serie' ? t.serie : t.film },
    { icon: Globe, label: t.subs },
    { icon: Zap, label: t.instant },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Bottom sheet on phones, centred card from tablets up */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        onClick={(e) => e.stopPropagation()}
        className="pack-rise relative w-full sm:max-w-xl max-h-[92dvh] overflow-y-auto bg-[#0b1c13] text-white rounded-t-[2rem] sm:rounded-[2rem] border border-white/10 shadow-2xl shadow-black/60"
      >
        {/* Poster as soft colour wash behind the header */}
        <div className="absolute inset-x-0 top-0 h-56 overflow-hidden" aria-hidden="true">
          <img src={item.poster} alt="" className="w-full h-full object-cover scale-125 blur-2xl opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c13]/20 via-[#0b1c13]/70 to-[#0b1c13]" />
        </div>

        {/* Grab handle, phones only */}
        <div className="sm:hidden relative flex justify-center pt-2.5">
          <span className="h-1 w-10 rounded-full bg-white/25" />
        </div>

        <button
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-4 right-4 z-10 flex w-9 h-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative px-5 sm:px-7 pt-6 sm:pt-8 pb-6 sm:pb-7">
          {/* Poster + title */}
          <div className="flex items-end gap-4 sm:gap-5">
            <div className="relative w-28 sm:w-36 shrink-0 aspect-[2/3] rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/60">
              <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-fluid-btn text-[10px] font-extrabold">
                {item.quality}
              </span>
            </div>

            <div className="min-w-0 pb-1 pr-8 sm:pr-0">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#f3dfb4]">
                {item.genre}
              </div>
              <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold font-display leading-tight [text-wrap:balance]">
                {item.title}
              </h3>
              {item.rating && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-xs font-bold text-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  {item.rating.toFixed(1)}
                  <span className="font-medium text-amber-200/60">/ 10</span>
                </div>
              )}
            </div>
          </div>

          {/* Facts */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            {facts.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-[#cfe6da]"
              >
                <Icon className="w-4 h-4 shrink-0 text-[#a8de57]" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm text-[#b5cdc0] leading-relaxed">{t.text}</p>

          <button
            onClick={() => {
              onClose();
              onSelectPlan();
            }}
            className="mt-6 w-full py-3.5 px-5 rounded-full bg-fluid-btn font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onClose}
            className="mt-2 w-full py-2.5 text-xs font-semibold text-[#8db19f] hover:text-white transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
