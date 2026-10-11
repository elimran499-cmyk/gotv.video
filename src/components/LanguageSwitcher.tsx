import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Lang, LANGS } from '../data/mockData';

/** Small drawn flags, so they look the same on every device (emoji flags do not render on Windows). */
export const Flag: React.FC<{ code: Lang; className?: string }> = ({ code, className = 'w-5 h-5' }) => (
  <span className={`inline-block shrink-0 rounded-full overflow-hidden ring-1 ring-white/25 ${className}`}>
    <svg viewBox="0 0 24 24" className="w-full h-full block" aria-hidden="true">
      {code === 'nl' && (
        <>
          <rect width="24" height="8" fill="#ae1c28" />
          <rect y="8" width="24" height="8" fill="#fff" />
          <rect y="16" width="24" height="8" fill="#21468b" />
        </>
      )}
      {code === 'de' && (
        <>
          <rect width="24" height="8" fill="#000" />
          <rect y="8" width="24" height="8" fill="#dd0000" />
          <rect y="16" width="24" height="8" fill="#ffce00" />
        </>
      )}
      {code === 'en' && (
        <>
          <rect width="24" height="24" fill="#012169" />
          <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="5" />
          <path d="M0 0l24 24M24 0L0 24" stroke="#c8102e" strokeWidth="2" />
          <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="8" />
          <path d="M12 0v24M0 12h24" stroke="#c8102e" strokeWidth="4.5" />
        </>
      )}
    </svg>
  </span>
);

interface LanguageSwitcherProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  label: string;
}

/** Desktop language menu: flag + code, opening a list of every language. */
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ lang, setLang, label }) => {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wide transition-colors ${
          open
            ? 'bg-white/15 border-[#d6bf96]/60 text-white'
            : 'bg-white/5 border-white/10 text-[#cfe6da] hover:bg-white/10 hover:text-white'
        }`}
      >
        <Flag code={lang} className="w-6 h-6" />
        <span>{lang}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          className="lang-menu absolute right-0 top-[calc(100%+0.6rem)] w-52 p-1.5 rounded-2xl bg-[#0b1f15]/95 backdrop-blur-2xl border border-[#d6bf96]/30 shadow-2xl shadow-black/60"
        >
          <div className="px-2.5 pt-1.5 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8fb9a4]">
            {label}
          </div>
          {LANGS.map((option) => {
            const active = option.code === lang;
            return (
              <button
                key={option.code}
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLang(option.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left transition-colors ${
                  active ? 'bg-[#a8de57]/15' : 'hover:bg-white/5'
                }`}
              >
                <Flag code={option.code} className="w-7 h-7" />
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-bold text-white">{option.label}</span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#8fb9a4]">
                    {option.code}
                  </span>
                </span>
                {active && (
                  <span className="flex w-5 h-5 items-center justify-center rounded-full bg-fluid-btn">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
