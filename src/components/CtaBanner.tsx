import { Lang } from '../data/mockData';
import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CtaBannerProps {
  lang: Lang;
  onExplorePlans: () => void;
  onOpenWhatsApp: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  lang,
  onExplorePlans,
  onOpenWhatsApp,
}) => {
  const content = {
    nl: {
      headline: 'Al jouw favoriete zenders in één abonnement',
      subhead:
        'Geen monteur nodig. Kies een pakket en kijk binnen 5 minuten op je eigen TV of telefoon — direct actief, zonder contract.',
      ctaPrimary: 'Kies Direct Je Pakket',
      ctaSecondary: 'Hulp Nodig? Neem Contact Op',
      instantSetup: 'Veilige betaling · Directe activering binnen 5 minuten',
    },
    en: {
      headline: 'All your favourite channels in one subscription',
      subhead:
        'No engineer needed. Pick a package and be watching on your own TV or phone within 5 minutes — active instantly, no contract.',
      ctaPrimary: 'Choose Your Package Now',
      ctaSecondary: 'Need Help? Get In Touch',
      instantSetup: 'Secure payment · Instant activation within 5 minutes',
    },
    de: {
      headline: 'Alle deine Lieblingssender in einem Abo',
      subhead:
        'Kein Techniker nötig. Wähle ein Paket und schaue innerhalb von 5 Minuten auf deinem eigenen TV oder Handy — sofort aktiv, ohne Vertrag.',
      ctaPrimary: 'Jetzt Paket wählen',
      ctaSecondary: 'Hilfe nötig? Kontakt aufnehmen',
      instantSetup: 'Sichere Zahlung · Sofortige Aktivierung innerhalb von 5 Minuten',
    },
  }[lang];

  return (
    <section className="fluid-dark-alt py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-reveal="zoom" className="relative rounded-3xl bg-gradient-to-r from-[#0e271b] via-[#123624] to-[#0d261a] p-8 sm:p-12 lg:p-16 border border-[#23583c] shadow-2xl overflow-hidden text-center">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#0c9361]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#153e28] text-[11px] font-bold text-[#8fe2b7] uppercase tracking-wider border border-[#235d3d]">
              <Zap className="w-3.5 h-3.5 text-[#34d399]" />
              <span>{content.instantSetup}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display [text-wrap:balance]">
              {content.headline}
            </h2>

            <p className="text-sm sm:text-base text-[#93bcaa] max-w-xl mx-auto leading-relaxed">
              {content.subhead}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onExplorePlans}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#d6bf96] hover:bg-[#c9af82] text-[#0c2017] text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <span>{content.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0c2017]/80 hover:bg-[#0c2017] text-white border border-[#295c41] text-sm sm:text-base font-semibold transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#34d399]" />
                <span>{content.ctaSecondary}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
