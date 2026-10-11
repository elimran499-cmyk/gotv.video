import React, { useEffect, useState } from 'react';
import { BrandMark } from './BrandMark';
import backdrop from '../assets/images/hero_streaming_mosaic_1791672867195.jpg';

interface SplashIntroProps {
  /** Called when the curtain has fully opened and the page is visible. */
  onDone: () => void;
}

/** How long the logo sequence holds before the curtain opens. */
const HOLD_MS = 1900;
/** Length of the curtain-open exit. */
const EXIT_MS = 950;

const WORDMARK = [
  { char: 'G', gold: false },
  { char: 'O', gold: false },
  { char: 'T', gold: true },
  { char: 'V', gold: true },
];

/** Brand intro, plays on every load: logo builds up, then a curtain opens onto the site. */
export const SplashIntro: React.FC<SplashIntroProps> = ({ onDone }) => {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      onDone();
      return;
    }

    document.body.style.overflow = 'hidden';
    const toOut = window.setTimeout(() => setPhase('out'), HOLD_MS);
    const toDone = window.setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
      onDone();
    }, HOLD_MS + EXIT_MS);

    return () => {
      window.clearTimeout(toOut);
      window.clearTimeout(toDone);
      document.body.style.overflow = '';
    };
    // Runs once per page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] ${phase === 'out' ? 'intro-out pointer-events-none' : ''}`}
    >
      {/* Curtain halves */}
      <div className="intro-curtain-top absolute inset-x-0 top-0 h-1/2 bg-[#050e09]" />
      <div className="intro-curtain-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#050e09]" />
      {/* Light along the seam, just before the curtain parts */}
      <div className="intro-seam absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#a8de57] to-transparent" />

      <div className="intro-content absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
        {/* Poster wall, far in the background */}
        <img
          src={backdrop}
          alt=""
          className="intro-backdrop absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_50%,rgba(5,14,9,0.55),#050e09_78%)]" />

        {/* Glow */}
        <div className="intro-glow absolute w-[32rem] h-[32rem] max-w-[120vw] rounded-full bg-[#a8de57]/20 blur-[110px]" />
        <div className="intro-glow absolute w-64 h-64 translate-x-24 translate-y-10 rounded-full bg-[#d6bf96]/20 blur-[90px]" />

        {/* Logo, with rings pulsing out of it */}
        <span className="intro-mark relative flex items-center justify-center">
          <span className="intro-ring absolute inset-0 rounded-[1.6rem] border border-[#a8de57]/60" />
          <span className="intro-ring intro-ring-late absolute inset-0 rounded-[1.6rem] border border-[#d6bf96]/50" />
          <span className="relative flex overflow-hidden rounded-[1.6rem]">
            <BrandMark className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.6rem]" />
            <span className="intro-shine absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </span>
        </span>

        {/* Wordmark */}
        <div className="relative mt-7 font-display font-extrabold uppercase leading-none tracking-[0.06em] text-6xl sm:text-8xl">
          {WORDMARK.map((letter, idx) => (
            <span
              key={letter.char}
              className={`intro-letter ${letter.gold ? 'text-gold' : 'text-white'}`}
              style={{ '--d': `${420 + idx * 100}ms` } as React.CSSProperties}
            >
              {letter.char}
            </span>
          ))}
        </div>

        <div className="intro-tagline relative mt-5 text-[10px] sm:text-xs font-bold uppercase text-[#f3dfb4]">
          Premium 4K IPTV
        </div>

        {/* Loading line, fills while the intro holds */}
        <div className="intro-line relative mt-6 h-[3px] w-44 sm:w-56 rounded-full bg-white/10 overflow-hidden">
          <div
            className="intro-progress h-full rounded-full bg-gradient-to-r from-[#a8de57] to-[#f3dfb4]"
            style={{ '--hold': `${HOLD_MS}ms` } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
};
