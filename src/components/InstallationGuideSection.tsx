import React, { useState } from 'react';
import { Wrench, ShoppingBag, Zap, Tv, Check } from 'lucide-react';
import { SETUP_STEPS, DEVICE_GUIDES, Lang } from '../data/mockData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface InstallationGuideSectionProps {
  lang: Lang;
  onExplorePlans: () => void;
  onOpenWhatsApp: () => void;
}

const STEP_ICONS = [ShoppingBag, Zap, Tv];

export const InstallationGuideSection: React.FC<InstallationGuideSectionProps> = ({
  lang,
  onExplorePlans,
  onOpenWhatsApp,
}) => {
  const [activeDeviceId, setActiveDeviceId] = useState(DEVICE_GUIDES[0].id);

  const t = {
    nl: {
      tag: 'INSTALLATIE',
      titleStart: 'Eenvoudig geïnstalleerd in ',
      titleAccent: '3 stappen',
      subtitle:
        'Geen monteur nodig. Binnen enkele minuten kijk je al naar jouw favoriete live tv-zenders.',
      ctaPrimary: 'Kies Direct Je Pakket',
      ctaSecondary: 'Hulp Nodig? Neem Contact Op',
      devicesTag: 'APPARATEN',
      devicesTitleStart: 'Kijk op je ',
      devicesTitleAccent: 'favoriete',
      devicesTitleEnd: ' apparaat',
      devicesIntro:
        'Geen ingewikkelde installatie. Binnen 3 minuten geïnstalleerd op je Smart TV, streamingstick, smartphone of tablet.',
      guide: 'Handleiding',
      recApps: 'Aanbevolen Apps:',
      helpTitle: 'Hulp nodig bij installatie?',
      helpText: 'Onze support helpt je live via WhatsApp!',
      helpCta: 'Start WhatsApp Installatiehulp',
    },
    en: {
      tag: 'INSTALLATION',
      titleStart: 'Easily installed in ',
      titleAccent: '3 steps',
      subtitle:
        'No engineer needed. Within minutes you are watching your favourite live TV channels.',
      ctaPrimary: 'Choose Your Package Now',
      ctaSecondary: 'Need Help? Get In Touch',
      devicesTag: 'DEVICES',
      devicesTitleStart: 'Watch on your ',
      devicesTitleAccent: 'favourite',
      devicesTitleEnd: ' device',
      devicesIntro:
        'No complicated installation. Set up within 3 minutes on your Smart TV, streaming stick, smartphone or tablet.',
      guide: 'Guide',
      recApps: 'Recommended Apps:',
      helpTitle: 'Need help installing?',
      helpText: 'Our support team helps you live via WhatsApp!',
      helpCta: 'Start WhatsApp Installation Help',
    },
    de: {
      tag: 'INSTALLATION',
      titleStart: 'Einfach installiert in ',
      titleAccent: '3 Schritten',
      subtitle:
        'Kein Techniker nötig. In wenigen Minuten schaust du deine liebsten Live-TV-Sender.',
      ctaPrimary: 'Jetzt Paket wählen',
      ctaSecondary: 'Hilfe nötig? Kontakt aufnehmen',
      devicesTag: 'GERÄTE',
      devicesTitleStart: 'Schau auf deinem ',
      devicesTitleAccent: 'Lieblingsgerät',
      devicesTitleEnd: '',
      devicesIntro:
        'Keine komplizierte Installation. In 3 Minuten eingerichtet auf Smart TV, Streaming-Stick, Smartphone oder Tablet.',
      guide: 'Anleitung',
      recApps: 'Empfohlene Apps:',
      helpTitle: 'Hilfe bei der Installation?',
      helpText: 'Unser Support hilft dir live per WhatsApp!',
      helpCta: 'WhatsApp-Installationshilfe starten',
    },
  }[lang];

  const currentGuide = DEVICE_GUIDES.find((g) => g.id === activeDeviceId) ?? DEVICE_GUIDES[0];

  return (
    <section id="handleidingen" className="fluid-dark-alt py-16 lg:py-24 border-b border-[#142e22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Device compatibility & app setup */}
        <div data-reveal="zoom" className="bg-[#0e2318] rounded-3xl p-6 sm:p-8 border border-[#193e2b] shadow-xl mb-16 lg:mb-20">
          <div className="max-w-3xl mb-7">
            <div className="text-xs font-semibold tracking-wider text-[#8fe2b7] uppercase mb-2">
              {t.devicesTag}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-display">
              {t.devicesTitleStart}
              <span className="text-fluid">{t.devicesTitleAccent}</span>
              {t.devicesTitleEnd}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#7ca48e] leading-relaxed">
              {t.devicesIntro}
            </p>
          </div>

          {/* Device Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6 border-b border-[#1b3d2b]">
            {DEVICE_GUIDES.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveDeviceId(g.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeDeviceId === g.id
                    ? 'bg-fluid-btn shadow-sm'
                    : 'bg-[#132d20] hover:bg-[#1a3a2a] text-[#86ab97]'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>

          {/* Active Guide Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="text-lg font-bold text-white">
                {currentGuide.name} {t.guide}
              </div>
              <p className="text-sm text-[#c7dfd2] leading-relaxed">
                {currentGuide.description[lang]}
              </p>

              <div>
                <div className="text-xs font-semibold text-[#6a977f] mb-1.5">{t.recApps}</div>
                <div className="flex flex-wrap gap-1.5">
                  {currentGuide.apps.map((app) => (
                    <span
                      key={app}
                      className="px-2.5 py-1 rounded bg-[#132c1f] text-[11px] font-semibold text-[#a5cbb7] border border-[#1b422e]"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp installation help */}
            <div className="bg-[#0b1b13] p-5 rounded-2xl border border-[#173827] space-y-3">
              <div className="text-sm font-bold text-white">{t.helpTitle}</div>
              <p className="text-xs text-[#7aa18d]">{t.helpText}</p>
              <button
                onClick={onOpenWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-fluid-btn transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{t.helpCta}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3-step setup */}
        <div data-reveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#8fe2b7] uppercase mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
            {t.titleStart}
            <span className="text-fluid">{t.titleAccent}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#7ca48e] leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {SETUP_STEPS.map((step, idx) => {
            const Icon = STEP_ICONS[idx] ?? Tv;
            return (
              <div
                key={step.number}
                data-reveal
                style={{ '--reveal-delay': `${idx * 130}ms` } as React.CSSProperties}
                className="bg-[#0f241a] rounded-2xl p-6 border border-[#1b3d2b] hover:border-[#2f6f4e] transition-colors flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-extrabold text-[#388d5e] font-display tabular-nums">
                    {String(step.number).padStart(2, '0')}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#153424] text-[#4ade80] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 font-display">
                  {step.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-[#7aa18d] leading-relaxed flex-1">
                  {step.description[lang]}
                </p>
                <div className="mt-4 pt-3 border-t border-[#163524] flex items-start gap-2 text-xs font-semibold text-[#8fe2b7]">
                  <Check className="w-4 h-4 shrink-0 text-[#34d399]" />
                  <span>{step.detail[lang]}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div data-reveal="fade" className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onExplorePlans}
            className="px-7 py-3.5 rounded-full bg-fluid-btn text-sm font-bold transition-colors cursor-pointer"
          >
            {t.ctaPrimary}
          </button>
          <button
            onClick={onOpenWhatsApp}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0c2017] hover:bg-[#102a1d] text-white border border-[#295c41] text-sm font-semibold transition-colors cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#34d399]" />
            <span>{t.ctaSecondary}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
