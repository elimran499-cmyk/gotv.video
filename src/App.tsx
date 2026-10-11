/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ChannelsExplorer } from './components/ChannelsExplorer';
import { MoviesSeriesSection } from './components/MoviesSeriesSection';
import { DeviceFeaturesSection } from './components/DeviceFeaturesSection';
import { PricingSection } from './components/PricingSection';
import { InstallationGuideSection } from './components/InstallationGuideSection';
import { CtaBanner } from './components/CtaBanner';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { MediaDetailModal } from './components/MediaDetailModal';
import { SpeedTestWidget } from './components/SpeedTestWidget';
import {
  MediaItem,
  Lang,
  LANGS,
  PlanSelection,
  DEFAULT_PLAN,
  contactLink,
  orderLink,
} from './data/mockData';
import { PageIntro } from './components/PageIntro';
import { BlogPostPage } from './components/BlogPostPage';
import { matchRoute, pagePath, routePath, translatePath } from './seo/routes';
import { applyHead, buildHead } from './seo/head';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { MobileNav } from './components/MobileNav';
import { SplashIntro } from './components/SplashIntro';
import { useCinematicReveal } from './components/useCinematicReveal';

const isLang = (value: string | null | undefined): value is Lang =>
  LANGS.some((option) => option.code === value);

/**
 * The address decides the page and its language (/de/preise is German pricing).
 * An old ?lang= link is sent on to the same page in that language; returns
 * true when the browser is on its way there.
 */
export const redirectOldLangLink = (): boolean => {
  const { pathname, search } = window.location;
  const wanted = new URLSearchParams(search).get('lang');
  const route = matchRoute(pathname);
  if (!isLang(wanted) || wanted === route.lang || route.notFound) return false;
  window.location.replace(translatePath(route, wanted));
  return true;
};

interface AppProps {
  /** Set when the page is rendered ahead of time, where there is no address bar. */
  path?: string;
}

export default function App({ path: givenPath }: AppProps) {
  const [path, setPath] = useState<string>(() => givenPath ?? window.location.pathname);
  const route = matchRoute(path);
  const { lang, page } = route;

  const navigate = (to: string) => {
    if (to !== window.location.pathname) window.history.pushState(null, '', to);
    setPath(to);
    window.scrollTo({ top: 0 });
  };

  const setLang = (next: Lang) => navigate(translatePath(route, next));

  // Back and forward buttons, and links between the site's own pages.
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || a.target || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || /\.[a-z0-9]{2,5}$/i.test(url.pathname)) return;
      // A #section link on the page you are on keeps scrolling as usual.
      if (url.pathname === window.location.pathname && url.hash) return;
      e.preventDefault();
      navigate(url.pathname);
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // Title, description, canonical and language follow the page.
  useEffect(() => {
    applyHead(buildHead(route));
  }, [routePath(route), route.notFound]);

  // Modal States
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [speedTestOpen, setSpeedTestOpen] = useState(false);

  // The intro plays on every load; scroll reveals start once its curtain opens.
  const [introDone, setIntroDone] = useState(false);
  useCinematicReveal(introDone);

  // Support and orders run over WhatsApp: every contact button opens a chat
  // with the GOTV number, and order buttons prefill the chosen package.
  const openWhatsApp = () => {
    window.open(contactLink(lang), '_blank', 'noopener,noreferrer');
  };

  const handleSelectPlan = (selection: PlanSelection = DEFAULT_PLAN) => {
    window.open(orderLink(selection, lang), '_blank', 'noopener,noreferrer');
  };

  const handleSelectMedia = (item: MediaItem) => {
    setActiveMedia(item);
  };

  const scrollToPricing = () => {
    const el = document.getElementById('prijzen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(pagePath('pricing', lang));
    }
  };

  return (
    <div className="min-h-screen bg-[#07140e] text-[#e3ece7] flex flex-col font-sans selection:bg-[#22c55e]/20 selection:text-[#4ade80]">
      {/* Brand intro, plays on every load */}
      <SplashIntro onDone={() => setIntroDone(true)} />
      <div className="scroll-progress" aria-hidden="true" />

      {/* 1. Top Bar Navigation Contract */}
      <Navbar
        lang={lang}
        page={page}
        setLang={setLang}
        onSelectPlan={scrollToPricing}
        onOpenWhatsApp={openWhatsApp}
      />

      <main className="flex-1">
        {route.notFound ? (
          <section className="fluid-dark py-24 text-center">
            <div className="max-w-xl mx-auto px-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white">404</h1>
              <p className="mt-3 text-[#b8d6c6]">
                {{ nl: 'Deze pagina bestaat niet (meer).', en: 'This page does not exist (any more).', de: 'Diese Seite gibt es nicht (mehr).' }[lang]}
              </p>
              <a href={pagePath('home', lang)} className="mt-6 inline-flex px-6 py-3 rounded-full bg-fluid-btn text-sm font-bold">
                {{ nl: 'Naar de homepage', en: 'Go to the homepage', de: 'Zur Startseite' }[lang]}
              </a>
            </div>
          </section>
        ) : page === 'home' ? (
          <>
            {/* The homepage: every section on one page */}
            <HeroSection
              lang={lang}
              onExplorePlans={scrollToPricing}
              onOpenWhatsApp={openWhatsApp}
              onOpenSpeedTest={() => setSpeedTestOpen(true)}
            />
            <ChannelsExplorer lang={lang} onExplorePlans={scrollToPricing} />
            <MoviesSeriesSection lang={lang} onSelectMedia={handleSelectMedia} onExplorePlans={scrollToPricing} />
            <PricingSection lang={lang} onSelectPlan={handleSelectPlan} onOpenWhatsApp={openWhatsApp} />
            <DeviceFeaturesSection lang={lang} />
            <InstallationGuideSection lang={lang} onExplorePlans={scrollToPricing} onOpenWhatsApp={openWhatsApp} />
            <BlogSection lang={lang} />
            <CtaBanner lang={lang} onExplorePlans={scrollToPricing} onOpenWhatsApp={openWhatsApp} />
            <FaqSection lang={lang} onOpenWhatsApp={openWhatsApp} />
          </>
        ) : (
          <>
            {/* A section page or an article: its own headline, then the section */}
            <PageIntro route={route} />
            {route.post ? (
              <BlogPostPage post={route.post} lang={lang} onOpenWhatsApp={openWhatsApp} />
            ) : (
              <>
                {page === 'channels' && <ChannelsExplorer lang={lang} onExplorePlans={scrollToPricing} />}
                {page === 'movies' && <MoviesSeriesSection lang={lang} onSelectMedia={handleSelectMedia} onExplorePlans={scrollToPricing} />}
                {page === 'pricing' && <PricingSection lang={lang} onSelectPlan={handleSelectPlan} onOpenWhatsApp={openWhatsApp} />}
                {page === 'features' && <DeviceFeaturesSection lang={lang} />}
                {page === 'guides' && <InstallationGuideSection lang={lang} onExplorePlans={scrollToPricing} onOpenWhatsApp={openWhatsApp} />}
                {page === 'blog' && <BlogSection lang={lang} />}
                {page === 'faq' && <FaqSection lang={lang} onOpenWhatsApp={openWhatsApp} />}
              </>
            )}
            <CtaBanner lang={lang} onExplorePlans={scrollToPricing} onOpenWhatsApp={openWhatsApp} />
          </>
        )}
      </main>

      {/* 11. Footer */}
      <Footer
        lang={lang}
        onOpenWhatsApp={openWhatsApp}
      />

      {/* Floating WhatsApp button (desktop); phones use the bottom nav */}
      <button
        onClick={openWhatsApp}
        aria-label="WhatsApp Support"
        className="hidden lg:flex fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#25d366] hover:bg-[#1fb857] active:scale-95 text-white shadow-xl shadow-emerald-900/30 hover:shadow-2xl transition-all items-center gap-2.5 group cursor-pointer"
      >
        <WhatsAppIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-bold tracking-wide pr-1">WhatsApp Support</span>
      </button>

      {/* Floating bottom navigation, phones and tablets only */}
      {!activeMedia && !speedTestOpen && (
        <MobileNav lang={lang} page={page} onOpenWhatsApp={openWhatsApp} />
      )}

      {/* Active Modals */}
      {activeMedia && (
        <MediaDetailModal
          item={activeMedia}
          lang={lang}
          onClose={() => setActiveMedia(null)}
          onSelectPlan={() => {
            setActiveMedia(null);
            scrollToPricing();
          }}
        />
      )}

      {speedTestOpen && (
        <SpeedTestWidget
          lang={lang}
          onClose={() => setSpeedTestOpen(false)}
          onExplorePlans={() => {
            setSpeedTestOpen(false);
            scrollToPricing();
          }}
        />
      )}
    </div>
  );
}
