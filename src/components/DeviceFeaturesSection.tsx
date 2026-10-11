import React from 'react';
import { Tv, Zap, Trophy, Clock, Film, Headphones, Check } from 'lucide-react';
import { VOD_COUNT, Lang } from '../data/mockData';

interface DeviceFeaturesSectionProps {
  lang: Lang;
}

export const DeviceFeaturesSection: React.FC<DeviceFeaturesSectionProps> = ({
  lang,
}) => {
  const t = {
    nl: {
      tag: 'WAAROM GOTV',
      titleStart: 'Gebouwd voor de ',
      titleAccent: 'beste',
      titleEnd: ' kijkervaring in Nederland',
      subtitle:
        'Wij combineren de nieuwste Ultra-HD streamingtechnologie met superieure Europese servers voor gegarandeerd storingsvrij kijken.',
      included: 'Gegarandeerd inbegrepen',
      features: [
        {
          icon: Tv,
          badge: '4K 60FPS',
          title: '4K & Ultra HD Kwaliteit',
          desc: 'Haarscherp beeld op al je schermen met vlijmscherpe 60 FPS ondersteuning voor live sportevenementen.',
        },
        {
          icon: Zap,
          badge: '99.9% Uptime',
          title: 'Anti-Freeze™ Techniek v9.0',
          desc: 'Onze Europese dedicated serverclusters zorgen voor 99.9% uptime. Nooit meer irritante buffering tijdens belangrijke wedstrijden.',
        },
        {
          icon: Trophy,
          badge: 'Viaplay & Ziggo',
          title: 'Alle Live Sporten Inbegrepen',
          desc: 'Mis geen seconde van Formule 1 met Max Verstappen, UEFA Champions League, Premier League, Viaplay, Ziggo Sport & ESPN.',
        },
        {
          icon: Clock,
          badge: 'Binnen 5 min',
          title: 'Eenvoudige & Snelle Setup',
          desc: 'Werkt naadloos op Smart TV (Samsung, LG), Amazon Firestick, Android TV, Apple TV, iOS, Windows, Mac & Enigma2.',
        },
        {
          icon: Film,
          badge: 'NL Subs',
          title: `${VOD_COUNT} VOD Films & Series`,
          desc: 'Dagelijkse updates met de allernieuwste bioscoopfilms en trending series op Netflix & HBO Max, volledig voorzien van NL ondertitels.',
        },
        {
          icon: Headphones,
          badge: 'WhatsApp 24/7',
          title: '24/7 Nederlandstalige Support',
          desc: 'Onze technische klantenservice staat dag en nacht voor je klaar via WhatsApp en e-mail om al je vragen direct te beantwoorden.',
        },
      ],
    },
    en: {
      tag: 'WHY GOTV',
      titleStart: 'Built for the ',
      titleAccent: 'best',
      titleEnd: ' viewing experience in the Netherlands',
      subtitle:
        'We combine the latest Ultra HD streaming technology with superior European servers for guaranteed interruption-free viewing.',
      included: 'Guaranteed included',
      features: [
        {
          icon: Tv,
          badge: '4K 60FPS',
          title: '4K & Ultra HD Quality',
          desc: 'A razor-sharp picture on all your screens with crisp 60 FPS support for live sports events.',
        },
        {
          icon: Zap,
          badge: '99.9% Uptime',
          title: 'Anti-Freeze™ Technology v9.0',
          desc: 'Our dedicated European server clusters deliver 99.9% uptime. No more annoying buffering during the big matches.',
        },
        {
          icon: Trophy,
          badge: 'Viaplay & Ziggo',
          title: 'All Live Sports Included',
          desc: 'Never miss a second of Formula 1 with Max Verstappen, UEFA Champions League, Premier League, Viaplay, Ziggo Sport & ESPN.',
        },
        {
          icon: Clock,
          badge: 'Within 5 min',
          title: 'Simple & Fast Setup',
          desc: 'Works seamlessly on Smart TV (Samsung, LG), Amazon Firestick, Android TV, Apple TV, iOS, Windows, Mac & Enigma2.',
        },
        {
          icon: Film,
          badge: 'NL Subs',
          title: `${VOD_COUNT} VOD Movies & Series`,
          desc: 'Daily updates with the very latest cinema releases and trending series on Netflix & HBO Max, all with Dutch subtitles.',
        },
        {
          icon: Headphones,
          badge: 'WhatsApp 24/7',
          title: '24/7 Dutch-Language Support',
          desc: 'Our technical support team is there for you day and night via WhatsApp and email to answer all your questions right away.',
        },
      ],
    },
    de: {
      tag: 'WARUM GOTV',
      titleStart: 'Gebaut für das ',
      titleAccent: 'beste',
      titleEnd: ' Fernseherlebnis',
      subtitle:
        'Wir kombinieren die neueste Ultra-HD-Streamingtechnologie mit leistungsstarken europäischen Servern für garantiert störungsfreies Schauen.',
      included: 'Garantiert inklusive',
      features: [
        {
          icon: Tv,
          badge: '4K 60FPS',
          title: '4K- & Ultra-HD-Qualität',
          desc: 'Gestochen scharfes Bild auf all deinen Bildschirmen mit flüssigen 60 FPS für Live-Sportevents.',
        },
        {
          icon: Zap,
          badge: '99.9% Uptime',
          title: 'Anti-Freeze™ Technologie v9.0',
          desc: 'Unsere dedizierten europäischen Servercluster sorgen für 99.9% Uptime. Kein nerviges Buffering mehr bei wichtigen Spielen.',
        },
        {
          icon: Trophy,
          badge: 'Viaplay & Ziggo',
          title: 'Alle Live-Sportarten inklusive',
          desc: 'Verpasse keine Sekunde der Formel 1 mit Max Verstappen, UEFA Champions League, Premier League, Viaplay, Ziggo Sport & ESPN.',
        },
        {
          icon: Clock,
          badge: 'In 5 Min',
          title: 'Einfache & schnelle Einrichtung',
          desc: 'Läuft nahtlos auf Smart TV (Samsung, LG), Amazon Firestick, Android TV, Apple TV, iOS, Windows, Mac & Enigma2.',
        },
        {
          icon: Film,
          badge: 'On demand',
          title: `${VOD_COUNT} VOD-Filme & -Serien`,
          desc: 'Tägliche Updates mit den neuesten Kinofilmen und angesagten Serien von Netflix & HBO Max.',
        },
        {
          icon: Headphones,
          badge: 'WhatsApp 24/7',
          title: '24/7-Support',
          desc: 'Unser technischer Kundenservice ist Tag und Nacht per WhatsApp und E-Mail für dich da, um deine Fragen direkt zu beantworten.',
        },
      ],
    },
  }[lang];

  return (
    <section id="functionaliteiten" className="fluid-light py-16 lg:py-24 border-b border-[#dbe8df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-reveal="left" className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e2f0e7] border border-[#c9ddd0] text-[11px] font-semibold tracking-wider text-[#1e4834] uppercase mb-3">
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0c2017] font-display [text-wrap:balance]">
            {t.titleStart}
            <span className="text-fluid-deep">{t.titleAccent}</span>
            {t.titleEnd}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3b594b] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 6 Feature Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {t.features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                data-reveal
                style={{ '--reveal-delay': `${(idx % 3) * 110}ms` } as React.CSSProperties}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#dbe8df] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon + badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#0c2017] text-[#4ade80] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#e7f5ed] text-[#0c9361] border border-[#c1e6d1]">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#0c2017] mb-2 font-display">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#4b6a59] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {/* Bottom inclusion checkmark */}
                <div className="mt-6 pt-4 border-t border-[#e6efe9] flex items-center gap-2 text-xs font-semibold text-[#1e613c]">
                  <Check className="w-4 h-4 text-[#0c9361]" />
                  <span>{t.included}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
