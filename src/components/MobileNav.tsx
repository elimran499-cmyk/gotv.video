import React, { useEffect, useState } from 'react';
import { Home, Tv, Film } from 'lucide-react';
import { OrderIcon } from './OrderIcon';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Lang } from '../data/mockData';
import { PageId, SECTION_ID, pagePath } from '../seo/routes';

interface MobileNavProps {
  lang: Lang;
  /** The page being shown; on the homepage the bar follows the scroll instead. */
  page: PageId;
  onOpenWhatsApp: () => void;
}

const ITEMS: { id: PageId; icon: React.ComponentType<{ className?: string }>; label: Record<Lang, string> }[] = [
  { id: 'home', icon: Home, label: { nl: 'Home', en: 'Home', de: 'Start' } },
  { id: 'channels', icon: Tv, label: { nl: 'Zenders', en: 'Channels', de: 'Sender' } },
  { id: 'movies', icon: Film, label: { nl: 'Films', en: 'Movies', de: 'Filme' } },
  { id: 'pricing', icon: OrderIcon, label: { nl: 'Prijzen', en: 'Pricing', de: 'Preise' } },
];

/** Floating bottom navigation, phones and tablets only. */
export const MobileNav: React.FC<MobileNavProps> = ({ lang, page, onOpenWhatsApp }) => {
  // On the homepage, the section in view; elsewhere the page itself.
  const [inView, setInView] = useState<PageId>('home');

  useEffect(() => {
    if (page !== 'home') return;
    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.45;
      let current: PageId = 'home';
      for (const item of ITEMS) {
        if (item.id === 'home') continue;
        const el = document.getElementById(SECTION_ID[item.id]);
        if (el && el.offsetTop <= marker) current = item.id;
      }
      setInView(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [page]);

  const active = page === 'home' ? inView : ITEMS.some((item) => item.id === page) ? page : '';

  return (
    <nav
      aria-label={{ nl: 'Hoofdnavigatie', en: 'Main navigation', de: 'Hauptnavigation' }[lang]}
      className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 p-1.5 rounded-full bg-[#07140e]/90 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/50"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={pagePath(item.id, lang)}
            aria-label={item.label[lang]}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center gap-1.5 h-11 rounded-full transition-all ${
              isActive
                ? 'px-4 bg-fluid-btn'
                : 'w-11 justify-center text-white/70 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {isActive && <span className="text-xs font-bold">{item.label[lang]}</span>}
          </a>
        );
      })}
      <button
        onClick={onOpenWhatsApp}
        aria-label={{ nl: 'Contact via WhatsApp', en: 'Contact via WhatsApp', de: 'Kontakt per WhatsApp' }[lang]}
        className="flex items-center justify-center w-11 h-11 rounded-full bg-[#25d366] text-white shadow-md"
      >
        <WhatsAppIcon className="w-5 h-5" />
      </button>
    </nav>
  );
};
