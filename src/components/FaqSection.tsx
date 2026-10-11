import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS, Lang } from '../data/mockData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FaqSectionProps {
  lang: Lang;
  onOpenWhatsApp: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang, onOpenWhatsApp }) => {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  const t = {
    nl: {
      titleStart: 'Heb je nog ',
      titleAccent: 'vragen',
      intro: 'Hier vind je antwoorden op de meest gestelde vragen over onze IPTV diensten.',
      notListed: 'Staat jouw specifieke vraag er niet tussen?',
      ask: 'Stel Je Vraag Direct op WhatsApp (24/7)',
    },
    en: {
      titleStart: 'Still have ',
      titleAccent: 'questions',
      intro: 'Here you will find answers to the most frequently asked questions about our IPTV services.',
      notListed: 'Is your specific question not listed?',
      ask: 'Ask Your Question Directly on WhatsApp (24/7)',
    },
    de: {
      titleStart: 'Noch ',
      titleAccent: 'Fragen',
      intro: 'Hier findest du Antworten auf die häufigsten Fragen zu unseren IPTV-Diensten.',
      notListed: 'Deine Frage ist nicht dabei?',
      ask: 'Stell deine Frage direkt per WhatsApp (24/7)',
    },
  }[lang];

  return (
    <section id="faq" className="fluid-dark py-16 lg:py-24 border-b border-[#142e21]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#8fe2b7] uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            {t.titleStart}
            <span className="text-fluid">{t.titleAccent}</span>?
          </h2>
          <p className="mt-2 text-sm text-[#759f89]">{t.intro}</p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, faqIdx) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                data-reveal={faqIdx % 2 === 0 ? 'left' : 'right'}
                style={{ '--reveal-delay': `${faqIdx * 70}ms` } as React.CSSProperties}
                className="rounded-2xl bg-[#0d2217] border border-[#193d2c] transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4.5 px-5 sm:px-6 flex items-center justify-between text-left text-sm sm:text-base font-bold text-white hover:text-[#8fe2b7] transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q[lang]}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#4ade80] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {/* Always in the page so search engines can read it; closed answers are only hidden. */}
                <div
                  hidden={!isOpen}
                  className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#93baa6] leading-relaxed border-t border-[#143224]/80"
                >
                  {faq.a[lang]}
                </div>
              </div>
            );
          })}
        </div>

        <div data-reveal="fade" className="mt-10 text-center">
          <p className="text-sm text-[#759f89] mb-3">{t.notListed}</p>
          <button
            onClick={onOpenWhatsApp}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fluid-btn text-sm font-bold transition-colors cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>{t.ask}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
