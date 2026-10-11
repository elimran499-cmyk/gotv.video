import React from 'react';
import { CHANNEL_COUNT, VOD_COUNT } from '../data/mockData';

interface StatsBarProps {
  lang: 'nl' | 'en';
}

export const StatsBar: React.FC<StatsBarProps> = ({ lang }) => {
  const stats = [
    {
      value: CHANNEL_COUNT,
      label: lang === 'nl' ? 'Live zenders' : 'Live Channels',
      sub: lang === 'nl' ? 'Alle Nederlandse zenders & sport' : 'Every Dutch channel & sports',
    },
    {
      value: VOD_COUNT,
      label: lang === 'nl' ? 'Films & Series' : 'Movies & Series',
      sub: lang === 'nl' ? 'Met NL ondertiteling' : 'With Dutch subtitles',
    },
    {
      value: '4K UHD',
      label: lang === 'nl' ? 'Streaming Kwaliteit' : 'Streaming Quality',
      sub: lang === 'nl' ? '60FPS vloeiend beeld' : '60FPS Smooth Motion',
    },
    {
      value: '24/7',
      label: lang === 'nl' ? 'Nederlandstalige Support' : 'Dutch-Language Support',
      sub: lang === 'nl' ? 'Direct via WhatsApp' : 'Direct via WhatsApp',
    },
  ];

  return (
    <section className="fluid-dark py-10 border-b border-[#132c20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#163827]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center ${
                idx > 1 ? 'pt-6 md:pt-0' : idx === 1 ? 'pt-0 md:pt-0' : ''
              } px-2 sm:px-4`}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display tabular-nums">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs sm:text-sm font-semibold text-[#8fe2b7] uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-[11px] sm:text-xs text-[#527d66] mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
