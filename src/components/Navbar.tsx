import React, { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Tv,
  Film,
  Sparkles,
  Wrench,
  HelpCircle,
  Newspaper,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BrandMark } from './BrandMark';
import { OrderIcon } from './OrderIcon';
import { Flag, LanguageSwitcher } from './LanguageSwitcher';
import { Lang, LANGS } from '../data/mockData';
import { PageId, SECTION_ID, pagePath } from '../seo/routes';

/** Matches the menu-panel-out animation in index.css. */
const MENU_CLOSE_MS = 300;

interface NavbarProps {
  lang: Lang;
  /** The page being shown; on the homepage the bar follows the scroll instead. */
  page: PageId;
  setLang: (lang: Lang) => void;
  onSelectPlan: () => void;
  onOpenWhatsApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  page,
  setLang,
  onSelectPlan,
  onOpenWhatsApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // True while the closing animation plays; the panel unmounts when it ends.
  const [menuClosing, setMenuClosing] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  const closeMenu = () => {
    if (!mobileMenuOpen || menuClosing) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setMenuClosing(true);
    closeTimer.current = window.setTimeout(
      () => {
        setMobileMenuOpen(false);
        setMenuClosing(false);
      },
      reduceMotion ? 0 : MENU_CLOSE_MS
    );
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);
  const [scrolled, setScrolled] = useState(false);

  // Section currently in view, highlighted in the bar.
  const [activeHref, setActiveHref] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = '';
      document.querySelectorAll<HTMLElement>('main section[id]').forEach((el) => {
        if (el.offsetTop <= marker) current = `#${el.id}`;
      });
      setActiveHref(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The phone menu is a full-screen sheet, so the page behind it stays put.
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen && !menuClosing ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, menuClosing]);

  const t = {
    nl: {
      channels: 'Zenders',
      channelsSub: 'Alle Nederlandse zenders & sport',
      movies: 'Films & Series',
      moviesSub: 'Met NL ondertiteling',
      pricing: 'Prijzen',
      pricingSub: 'Basis & Premium VIP pakketten',
      features: 'Waarom GOTV',
      featuresSub: '4K, Anti-Freeze & 24/7 support',
      guides: 'Installatie',
      guidesSub: 'In 3 stappen op elk apparaat',
      blog: 'Blog',
      blogSub: 'Tips & handleidingen',
      faq: 'FAQ',
      faqSub: 'Antwoord op je vragen',
      cta: 'Bekijk Pakketten',
      whatsapp: 'Neem Contact Op',
      menu: 'Menu',
      language: 'Taal',
    },
    en: {
      channels: 'Channels',
      channelsSub: 'Every Dutch channel & sports',
      movies: 'Movies & Series',
      moviesSub: 'With Dutch subtitles',
      pricing: 'Pricing',
      pricingSub: 'Basic & Premium VIP packages',
      features: 'Why GOTV',
      featuresSub: '4K, Anti-Freeze & 24/7 support',
      guides: 'Installation',
      guidesSub: 'In 3 steps on any device',
      blog: 'Blog',
      blogSub: 'Tips & guides',
      faq: 'FAQ',
      faqSub: 'Answers to your questions',
      cta: 'View Packages',
      whatsapp: 'Get In Touch',
      menu: 'Menu',
      language: 'Language',
    },
    de: {
      channels: 'Sender',
      channelsSub: 'Alle Sender & Sport',
      movies: 'Filme & Serien',
      moviesSub: 'Riesige Mediathek on demand',
      pricing: 'Preise',
      pricingSub: 'Basis- & Premium-VIP-Pakete',
      features: 'Warum GOTV',
      featuresSub: '4K, Anti-Freeze & 24/7-Support',
      guides: 'Installation',
      guidesSub: 'In 3 Schritten auf jedem Gerät',
      blog: 'Blog',
      blogSub: 'Tipps & Anleitungen',
      faq: 'FAQ',
      faqSub: 'Antworten auf deine Fragen',
      cta: 'Pakete ansehen',
      whatsapp: 'Kontakt aufnehmen',
      menu: 'Menü',
      language: 'Sprache',
    },
  }[lang];

  // Every section has its own page; the links are real addresses.
  const links = (
    [
      { id: 'channels', label: t.channels, sub: t.channelsSub, icon: Tv },
      { id: 'movies', label: t.movies, sub: t.moviesSub, icon: Film },
      { id: 'pricing', label: t.pricing, sub: t.pricingSub, icon: OrderIcon },
      { id: 'features', label: t.features, sub: t.featuresSub, icon: Sparkles },
      { id: 'guides', label: t.guides, sub: t.guidesSub, icon: Wrench },
      { id: 'blog', label: t.blog, sub: t.blogSub, icon: Newspaper },
      { id: 'faq', label: t.faq, sub: t.faqSub, icon: HelpCircle },
    ] as const
  ).map((link) => ({
    ...link,
    href: pagePath(link.id, lang),
    active: page === 'home' ? activeHref === `#${SECTION_ID[link.id]}` : page === link.id,
  }));

  return (
    <>
    <header className="sticky top-0 z-50 w-full px-3 sm:px-5 pt-2.5 sm:pt-3 pb-2 pointer-events-none">
      {/* Floating glass bar */}
      <div
        className={`pointer-events-auto max-w-7xl mx-auto pl-3 pr-2 sm:pl-4 sm:pr-2.5 h-14 sm:h-16 flex items-center justify-between gap-3 rounded-full border transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'nav-glass border-[#d6bf96]/25 shadow-xl shadow-black/40'
            : 'nav-glass border-white/10'
        }`}
      >
        {/* Brand Wordmark */}
        <a href={pagePath('home', lang)} aria-label="GOTV" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <BrandMark className="w-9 h-9 sm:w-10 sm:h-10 rounded-full group-hover:scale-105 group-hover:-rotate-6 transition-transform duration-300" />
          <span className="font-display font-extrabold tracking-[0.12em] uppercase text-lg sm:text-xl">
            <span className="text-white">GO</span>
            <span className="text-gold">TV</span>
          </span>
        </a>

        {/* Section links */}
        <nav className="hidden xl:flex items-center gap-0.5 text-[13px] font-semibold text-[#b8d6c6]">
          {links.map((link) => {
            const active = link.active;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? (page === 'home' ? 'true' : 'page') : undefined}
                className={`relative px-3 py-2 rounded-full whitespace-nowrap transition-colors ${
                  active ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[3px] rounded-full bg-[#a8de57] transition-all duration-300 ${
                    active ? 'w-4 opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="hidden sm:block">
            <LanguageSwitcher lang={lang} setLang={setLang} label={t.language} />
          </div>

          <button
            onClick={onOpenWhatsApp}
            aria-label={t.whatsapp}
            className="flex items-center gap-2 p-2.5 2xl:px-3.5 2xl:py-2.5 text-xs font-semibold text-white bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/40 rounded-full transition-colors whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25d366]" />
            <span className="hidden 2xl:inline">{t.whatsapp}</span>
          </button>

          <button
            onClick={() => onSelectPlan()}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-fluid-btn active:scale-[0.98] rounded-full transition-all shadow-md shadow-green-500/25 whitespace-nowrap"
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => (mobileMenuOpen ? closeMenu() : setMobileMenuOpen(true))}
            className={`xl:hidden flex items-center gap-2 pl-3.5 pr-3 py-2.5 rounded-full border text-xs font-bold transition-colors ${
              mobileMenuOpen && !menuClosing
                ? 'bg-white text-[#07140e] border-white'
                : 'bg-white/5 text-white border-white/15 hover:bg-white/10'
            }`}
            aria-label={t.menu}
            aria-expanded={mobileMenuOpen && !menuClosing}
          >
            <span>{t.menu}</span>
            {mobileMenuOpen && !menuClosing ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>

      {/* Phone menu: compact panel under the Menu button. Rendered outside the
          header because the header's backdrop blur would otherwise trap this
          fixed layer inside it. */}
      {mobileMenuOpen && (
        <div className={`xl:hidden fixed inset-0 z-40 ${menuClosing ? 'menu-closing pointer-events-none' : ''}`}>
          {/* Dimmed, blurred page behind; tap to close */}
          <button
            type="button"
            aria-label={{ nl: 'Menu sluiten', en: 'Close menu', de: 'Menü schließen' }[lang]}
            onClick={closeMenu}
            className="menu-backdrop absolute inset-0 w-full h-full bg-[#030a06]/70 cursor-default"
          />

          <div className="menu-panel absolute right-3 top-[4.75rem] sm:top-[5.5rem] w-[17.5rem] max-w-[calc(100vw-1.5rem)] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-3xl bg-[#0b1f15]/95 backdrop-blur-2xl border border-[#d6bf96]/30 shadow-2xl shadow-black/60 p-2.5">
            {/* Gold light line that draws across the top */}
            <div className="menu-line mx-3 mb-1.5 h-px bg-gradient-to-r from-[#d6bf96] via-[#22c55e] to-transparent" />

            <nav>
              {links.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="menu-item flex items-center gap-3 px-2.5 py-2 rounded-2xl active:bg-white/10 hover:bg-white/5 transition-colors"
                    style={{ '--d': `${140 + idx * 55}ms` } as React.CSSProperties}
                  >
                    <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-xl bg-green-500/15 border border-green-400/25 text-green-300">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="flex-1 text-sm font-bold text-white font-display">
                      {link.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#d6bf96]" />
                  </a>
                );
              })}
            </nav>

            <div
              className="menu-item mt-2 pt-2.5 border-t border-white/10 grid gap-2"
              style={{ '--d': `${140 + links.length * 55}ms` } as React.CSSProperties}
            >
              <button
                onClick={() => {
                  closeMenu();
                  onSelectPlan();
                }}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-bold bg-fluid-btn rounded-xl shadow-lg shadow-green-500/25"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  closeMenu();
                  onOpenWhatsApp();
                }}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-white bg-[#25d366]/15 border border-[#25d366]/40 rounded-xl"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25d366]" />
                <span>{t.whatsapp}</span>
              </button>

              <div className="flex items-center justify-between px-1 pt-0.5 text-xs text-[#8fb9a4]">
                <span>{t.language}</span>
                <div
                  className="inline-flex p-0.5 rounded-full bg-white/5 border border-white/10"
                  role="group"
                  aria-label={t.language}
                >
                  {LANGS.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => setLang(code)}
                      aria-pressed={lang === code}
                      aria-label={label}
                      className={`flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full text-[11px] font-bold uppercase transition-colors ${
                        lang === code ? 'bg-gold-btn text-[#0c2017]' : 'text-[#b8d6c6]'
                      }`}
                    >
                      <Flag code={code} className="w-5 h-5" />
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
