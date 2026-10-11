import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { CHANNEL_COUNT, VOD_COUNT, Lang } from '../data/mockData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BrandMark } from './BrandMark';
import { pagePath } from '../seo/routes';

interface FooterProps {
  lang: Lang;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenWhatsApp }) => {
  return (
    <footer className="bg-[#07140e] text-[#80a492] pt-16 pb-28 lg:pb-12 border-t border-[#12281d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#13281e]">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href={pagePath('home', lang)} aria-label="GOTV" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white">
              <BrandMark className="w-10 h-10 rounded-xl" />
              <span className="font-display font-extrabold tracking-[0.12em] uppercase">
                <span className="text-white">GO</span>
                <span className="text-gold">TV</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm text-[#6c917f] max-w-sm leading-relaxed">
              {{ nl: `De nummer #1 premium 4K IPTV aanbieder van Nederland. Geniet van meer dan ${CHANNEL_COUNT} live tv-zenders, alle Nederlandse topsporten en ${VOD_COUNT} VOD films & series op al je apparaten.`, en: `The number #1 premium 4K IPTV provider in the Netherlands. Enjoy more than ${CHANNEL_COUNT} live TV channels, all top Dutch sports and ${VOD_COUNT} VOD movies & series on all your devices.`, de: `Dein Premium-4K-IPTV-Anbieter. Genieße mehr als ${CHANNEL_COUNT} Live-TV-Sender, Top-Sport und ${VOD_COUNT} VOD-Filme & -Serien auf all deinen Geräten.` }[lang]}
            </p>
            <p className="text-xs text-[#6c917f] max-w-sm leading-relaxed">
              {{ nl: 'Vragen over een pakket, een zender of de installatie op jouw TV? Onze Nederlandse support helpt je via WhatsApp, doorgaans binnen 2 minuten.', en: 'Questions about a package, a channel or installing on your TV? Our Dutch support team helps you via WhatsApp, usually within 2 minutes.', de: 'Fragen zu einem Paket, einem Sender oder zur Installation auf deinem TV? Unser Support hilft dir per WhatsApp, meist innerhalb von 2 Minuten.' }[lang]}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#143e28] hover:bg-[#1b5235] border border-[#23583c] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#4ade80]" />
                <span>{{ nl: 'Neem Contact Op via WhatsApp', en: 'Get In Touch via WhatsApp', de: 'Kontakt per WhatsApp aufnehmen' }[lang]}</span>
              </button>
            </div>
          </div>

          {/* Col 3: Snelle Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {{ nl: 'Snelle Navigatie', en: 'Quick Navigation', de: 'Schnellnavigation' }[lang]}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={pagePath('channels', lang)} className="hover:text-white transition-colors">
                  {{ nl: 'Zenderaanbod & Sport', en: 'Channels & Sports', de: 'Sender & Sport' }[lang]}
                </a>
              </li>
              <li>
                <a href={pagePath('movies', lang)} className="hover:text-white transition-colors">
                  {{ nl: 'Films & Series', en: 'Movies & Series', de: 'Filme & Serien' }[lang]}
                </a>
              </li>
              <li>
                <a href={pagePath('pricing', lang)} className="hover:text-white transition-colors">
                  {{ nl: 'Pakketten & Tarieven', en: 'Packages & Pricing', de: 'Pakete & Preise' }[lang]}
                </a>
              </li>
              <li>
                <a href={pagePath('features', lang)} className="hover:text-white transition-colors">
                  {{ nl: 'Waarom GOTV', en: 'Why GOTV', de: 'Warum GOTV' }[lang]}
                </a>
              </li>
              <li>
                <a href={pagePath('guides', lang)} className="hover:text-white transition-colors">
                  {{ nl: 'Installatie Handleiding', en: 'Installation Guide', de: 'Installationsanleitung' }[lang]}
                </a>
              </li>
              <li>
                <a href={pagePath('blog', lang)} className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href={pagePath('faq', lang)} className="hover:text-white transition-colors">
                  {{ nl: 'Veelgestelde Vragen', en: 'Frequently Asked Questions', de: 'Häufige Fragen' }[lang]}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Ondersteunde Apparaten */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {{ nl: 'Apparaten', en: 'Supported Devices', de: 'Unterstützte Geräte' }[lang]}
            </h4>
            <ul className="space-y-2 text-xs text-[#6e9381]">
              <li>Smart TV (Samsung / LG)</li>
              <li>Amazon Firestick & Fire TV</li>
              <li>Android TV / Google TV</li>
              <li>Apple TV, iPhone & iPad</li>
              <li>Formuler / MAG Box / Enigma2</li>
              <li>Windows & Mac</li>
            </ul>
          </div>

          {/* Col 5: Veiligheid & Betaling */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {{ nl: 'Veilig betalen met:', en: 'Pay securely with:', de: 'Sicher bezahlen mit:' }[lang]}
            </h4>
            <div className="space-y-2.5 text-xs text-[#6e9381]">
              <p>iDEAL · Bancontact · Creditcard · Apple Pay · Crypto</p>
              <div className="flex items-center gap-1.5 pt-1">
                <Lock className="w-3.5 h-3.5 text-[#34d399]" />
                <span>
                  {{ nl: 'Veilige betaling · Directe activering binnen 5 minuten', en: 'Secure payment · Instant activation within 5 minutes', de: 'Sichere Zahlung · Sofortige Aktivierung innerhalb von 5 Minuten' }[lang]}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#34d399]" />
                <span>
                  {{ nl: '99.9% Uptime Dedicated Europese Servers', en: '99.9% Uptime Dedicated European Servers', de: '99.9% Uptime, dedizierte europäische Server' }[lang]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="pt-8 text-[11px] text-[#517463] leading-relaxed max-w-5xl">
          <strong className="text-[#80a492]">
            {{ nl: 'Disclaimer & Juridische Informatie:', en: 'Disclaimer & Legal Information:', de: 'Disclaimer & rechtliche Hinweise:' }[lang]}
          </strong>{' '}
          {{ nl: "GOTV treedt op als technologie- en netwerkserviceprovider. Alle merknamen, logo's en zendernamen (zoals Ziggo, Viaplay, ESPN, NPO, RTL) zijn het eigendom van hun respectievelijke rechthebbenden. Onze diensten zijn uitsluitend bedoeld voor educatieve en persoonlijke netwerkdoeleinden in overeenstemming met de geldende regelgeving.", en: 'GOTV acts as a technology and network service provider. All brand names, logos and channel names (such as Ziggo, Viaplay, ESPN, NPO, RTL) are the property of their respective owners. Our services are intended solely for educational and personal network purposes in accordance with applicable regulations.', de: 'GOTV tritt als Technologie- und Netzwerkdienstleister auf. Alle Markennamen, Logos und Sendernamen (wie Ziggo, Viaplay, ESPN, NPO, RTL) sind Eigentum ihrer jeweiligen Rechteinhaber. Unsere Dienste sind ausschließlich für Bildungs- und persönliche Netzwerkzwecke im Einklang mit den geltenden Vorschriften bestimmt.' }[lang]}
        </p>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#517463]">
          <div>
            © {new Date().getFullYear()} GOTV. {{ nl: 'Alle rechten voorbehouden.', en: 'All rights reserved.', de: 'Alle Rechte vorbehalten.' }[lang]}
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">{{ nl: 'Privacybeleid', en: 'Privacy Policy', de: 'Datenschutz' }[lang]}</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">{{ nl: 'Algemene Voorwaarden', en: 'Terms & Conditions', de: 'AGB' }[lang]}</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Server Status (99.9%)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
