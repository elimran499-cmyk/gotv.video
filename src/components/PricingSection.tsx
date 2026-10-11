import React, { useEffect, useRef, useState } from 'react';
import { Shield, Crown, Tv, Film, Sparkles, Trophy, ShieldCheck, Headset, Zap } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  PLAN_DURATIONS,
  PLAN_TIERS,
  TIER_STATS,
  DEVICE_OPTIONS,
  DEFAULT_PLAN,
  getPlanPrice,
  getMonthlyPrice,
  formatEuro,
  PlanSelection,
  PlanTierId,
  Lang,
} from '../data/mockData';

interface PricingSectionProps {
  lang: Lang;
  onSelectPlan: (selection: PlanSelection) => void;
  onOpenWhatsApp: () => void;
}

const TIER_IDS: PlanTierId[] = ['basis', 'premium'];

/** The six things a pack comes with, shown as tiles above the prices. */
const HIGHLIGHTS: Record<PlanTierId, { icon: typeof Tv; value: Record<Lang, string>; label: Record<Lang, string> }[]> = {
  premium: [
    { icon: Tv, value: { nl: TIER_STATS.premium.channels, en: TIER_STATS.premium.channels, de: TIER_STATS.premium.channels }, label: { nl: 'live zenders', en: 'live channels', de: 'Live-Sender' } },
    { icon: Film, value: { nl: TIER_STATS.premium.vod, en: TIER_STATS.premium.vod, de: TIER_STATS.premium.vod }, label: { nl: 'films & series', en: 'movies & series', de: 'Filme & Serien' } },
    { icon: Sparkles, value: { nl: '4K · 8K · HDR', en: '4K · 8K · HDR', de: '4K · 8K · HDR' }, label: { nl: 'beeldkwaliteit', en: 'picture quality', de: 'Bildqualität' } },
    { icon: Trophy, value: { nl: 'Alle sport', en: 'All sports', de: 'Aller Sport' }, label: { nl: 'PPV-evenementen inbegrepen', en: 'PPV events included', de: 'PPV-Events inklusive' } },
    { icon: ShieldCheck, value: { nl: 'VPN', en: 'VPN', de: 'VPN' }, label: { nl: 'inbegrepen', en: 'included', de: 'inklusive' } },
    { icon: Headset, value: { nl: 'VIP', en: 'VIP', de: 'VIP' }, label: { nl: 'persoonlijke accountmanager', en: 'personal account manager', de: 'persönlicher Account-Manager' } },
  ],
  basis: [
    { icon: Tv, value: { nl: TIER_STATS.basis.channels, en: TIER_STATS.basis.channels, de: TIER_STATS.basis.channels }, label: { nl: 'live zenders', en: 'live channels', de: 'Live-Sender' } },
    { icon: Film, value: { nl: TIER_STATS.basis.vod, en: TIER_STATS.basis.vod, de: TIER_STATS.basis.vod }, label: { nl: 'films & series', en: 'movies & series', de: 'Filme & Serien' } },
    { icon: Sparkles, value: { nl: 'Full HD', en: 'Full HD', de: 'Full HD' }, label: { nl: 'SD, HD en Full HD', en: 'SD, HD and Full HD', de: 'SD, HD und Full HD' } },
    { icon: Trophy, value: { nl: 'Sport', en: 'Sports', de: 'Sport' }, label: { nl: 'ESPN, Ziggo en Viaplay', en: 'ESPN, Ziggo and Viaplay', de: 'ESPN, Ziggo und Viaplay' } },
    { icon: Zap, value: { nl: 'Anti-Freeze', en: 'Anti-Freeze', de: 'Anti-Freeze' }, label: { nl: 'technologie', en: 'technology', de: 'Technologie' } },
    { icon: Headset, value: { nl: '24/7', en: '24/7', de: '24/7' }, label: { nl: 'support', en: 'support', de: 'Support' } },
  ],
};

/** Counts smoothly from the previous amount to the new one when a price changes. */
const useAnimatedNumber = (value: number, duration = 450): number => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    if (from === value) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fromRef.current = value;
      setDisplay(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = from + (value - from) * eased;
      fromRef.current = current;
      setDisplay(current);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
};

const AnimatedPrice: React.FC<{ value: number }> = ({ value }) => (
  <>{formatEuro(useAnimatedNumber(value))}</>
);

export const PricingSection: React.FC<PricingSectionProps> = ({
  lang,
  onSelectPlan,
  onOpenWhatsApp,
}) => {
  const [tierId, setTierId] = useState<PlanTierId>(DEFAULT_PLAN.tier);
  const [devices, setDevices] = useState<number>(DEFAULT_PLAN.devices);

  // The full list of benefits opens on request; the tiles above the prices carry the main ones.
  const [allShown, setAllShown] = useState(false);

  const t = {
    nl: {
      tag: 'PRIJZEN',
      titleStart: 'Kies het pakket dat bij ',
      titleAccent: 'jou',
      titleEnd: ' past',
      subtitle:
        'Eén vaste betaling per looptijd. Geen abonnement, geen stilzwijgende verlenging — en je bepaalt zelf op hoeveel schermen je tegelijk kijkt.',
      tiers: { basis: 'Basis', premium: 'Premium VIP' },
      device: 'Apparaat',
      devices: 'Apparaten',
      deviceLower: 'apparaat',
      devicesLower: 'apparaten',
      perMonth: 'per maand',
      thatIs: 'Dat is',
      choose: 'Kies dit pakket',
      allBenefits: (count: number) => `Alle ${count} voordelen bekijken`,
      included: 'inbegrepen',
      order: 'Bestel Nu',
      orderVip: 'Word VIP Nu',
      vipTagline: 'Het complete pakket: hoogste kwaliteit, alle sport en persoonlijke service.',
      vipPerks: ['4K · 8K · HDR', 'VPN inbegrepen', 'Alle sport-PPV', 'VIP accountmanager'],
      whatsIn: (name: string) => `Wat zit er in het ${name}?`,
      guarantee: 'Niet goed? Geld terug binnen 7 dagen',
      paymentMethods: 'Veilig & Snel Betalen Via Je Eigen Vertrouwde Betaalmethode',
      creditcard: 'Creditcard / Visa / Mastercard',
      doubt: 'Twijfel je nog welk pakket je wilt kiezen?',
      advice: 'Vraag vrijblijvend persoonlijk advies via WhatsApp →',
      secure: 'Veilige betaling · Directe activering binnen 5 minuten',
    },
    en: {
      tag: 'PRICING',
      titleStart: 'Choose the package that suits ',
      titleAccent: 'you',
      titleEnd: '',
      subtitle:
        'One fixed payment per term. No subscription, no silent renewal — and you decide how many screens you watch on at the same time.',
      tiers: { basis: 'Basic', premium: 'Premium VIP' },
      device: 'Device',
      devices: 'Devices',
      deviceLower: 'device',
      devicesLower: 'devices',
      perMonth: 'per month',
      thatIs: 'That is',
      choose: 'Choose this package',
      allBenefits: (count: number) => `See all ${count} benefits`,
      included: 'included',
      order: 'Order Now',
      orderVip: 'Go VIP Now',
      vipTagline: 'The complete package: top quality, all sports and personal service.',
      vipPerks: ['4K · 8K · HDR', 'VPN included', 'All sports PPV', 'VIP account manager'],
      whatsIn: (name: string) => `What is in the ${name}?`,
      guarantee: 'Not happy? Money back within 7 days',
      paymentMethods: 'Pay Safely & Quickly With Your Own Trusted Payment Method',
      creditcard: 'Credit card / Visa / Mastercard',
      doubt: 'Still not sure which package to choose?',
      advice: 'Ask for free personal advice via WhatsApp →',
      secure: 'Secure payment · Instant activation within 5 minutes',
    },
    de: {
      tag: 'PREISE',
      titleStart: 'Wähle das Paket, das zu ',
      titleAccent: 'dir',
      titleEnd: ' passt',
      subtitle:
        'Eine feste Zahlung pro Laufzeit. Kein Abo, keine stille Verlängerung — und du bestimmst selbst, auf wie vielen Bildschirmen du gleichzeitig schaust.',
      tiers: { basis: 'Basis', premium: 'Premium VIP' },
      device: 'Gerät',
      devices: 'Geräte',
      deviceLower: 'Gerät',
      devicesLower: 'Geräte',
      perMonth: 'pro Monat',
      thatIs: 'Das sind',
      choose: 'Dieses Paket wählen',
      allBenefits: (count: number) => `Alle ${count} Vorteile ansehen`,
      included: 'inklusive',
      order: 'Jetzt bestellen',
      orderVip: 'Jetzt VIP werden',
      vipTagline: 'Das Komplettpaket: höchste Qualität, alle Sportarten und persönlicher Service.',
      vipPerks: ['4K · 8K · HDR', 'VPN inklusive', 'Alle Sport-PPV', 'VIP-Account-Manager'],
      whatsIn: (name: string) => `Was steckt im ${name}?`,
      guarantee: 'Nicht zufrieden? Geld zurück innerhalb von 7 Tagen',
      paymentMethods: 'Sicher und schnell bezahlen mit deiner vertrauten Zahlungsmethode',
      creditcard: 'Kreditkarte / Visa / Mastercard',
      doubt: 'Noch unsicher, welches Paket du wählen sollst?',
      advice: 'Hol dir unverbindlich persönliche Beratung per WhatsApp →',
      secure: 'Sichere Zahlung · Sofortige Aktivierung innerhalb von 5 Minuten',
    },
  }[lang];

  const tier = PLAN_TIERS[tierId];
  const isPremium = tierId === 'premium';
  const deviceLabel = `${devices} ${devices === 1 ? t.deviceLower : t.devicesLower}`;

  return (
    <section id="prijzen" className="pk-section fluid-light py-16 lg:py-24 border-b border-[#dbe8df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-reveal className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display [text-wrap:balance]">
            {t.titleStart}
            <span className="text-fluid-deep">{t.titleAccent}</span>
            {t.titleEnd}
          </h2>
          <p className="pk-lead mt-4 text-lg sm:text-xl leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="pk">
          {/* Pack and number of screens */}
          <div className="pk-ctl">
            <div className="pk-seg">
              {TIER_IDS.map((id) => (
                <button key={id} type="button" onClick={() => setTierId(id)} aria-pressed={id === tierId}>
                  {id === 'premium' && <Crown className="w-4 h-4" />}
                  {t.tiers[id]}
                </button>
              ))}
            </div>
            <div className="pk-seg">
              {DEVICE_OPTIONS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setDevices(count)}
                  aria-pressed={count === devices}
                  aria-label={`${count} ${count === 1 ? t.device : t.devices}`}
                >
                  {count}
                  {count === devices && ` ${count === 1 ? t.deviceLower : t.devicesLower}`}
                </button>
              ))}
            </div>
          </div>

          {/* Premium VIP gets a stage of its own */}
          <div className={`pk-stage ${isPremium ? 'pk-vip' : 'pk-basis'}`}>
            {isPremium && (
              <>
                <div className="pk-head">
                  <span className="pk-crown">
                    <Crown className="w-8 h-8" />
                  </span>
                  <div>
                    <h3>{t.tiers.premium}</h3>
                    <p>{t.vipTagline}</p>
                  </div>
                </div>
              </>
            )}

            {/* What you get, before the prices */}
            <div className="pk-inc">
              <h3>{t.whatsIn(tier.name[lang])}</h3>
              <div className="pk-tiles">
                {HIGHLIGHTS[tierId].map((item) => (
                  <div key={item.label[lang]} className="pk-tile">
                    <span className="pk-ico">
                      <item.icon className="w-6 h-6" />
                    </span>
                    <b className="font-display">{item.value[lang]}</b>
                    <span className="pk-lbl">{item.label[lang]}</span>
                  </div>
                ))}
              </div>
              {allShown ? (
                <ul>
                  {tier.features[lang].map((feat) => (
                    <li key={feat}>{feat}</li>
                  ))}
                </ul>
              ) : (
                <button type="button" className="pk-more" onClick={() => setAllShown(true)}>
                  {t.allBenefits(tier.features[lang].length)}
                </button>
              )}
            </div>

            <div className="pk-grid">
              <div className="pk-opts">
                {PLAN_DURATIONS.map((duration) => {
                  const isBest = Boolean(duration.note);
                  return (
                    <div key={duration.id} className={`pk-opt ${isBest ? 'pk-best' : ''}`}>
                      <div className="pk-m">
                        {isBest && isPremium && (
                          <span className="pk-stamp font-display" aria-hidden="true">
                            VIP
                          </span>
                        )}
                        {isBest && duration.note && (
                          <span className="pk-tag">
                            {duration.note[lang]} · {duration.badge}
                          </span>
                        )}
                        <h3 className="pk-dur">{duration.label[lang]}</h3>
                        <p className="pk-pm">
                          {t.thatIs} <AnimatedPrice value={getMonthlyPrice(tierId, duration.id, devices)} /> {t.perMonth}
                        </p>
                        <p className="pk-dev">
                          {deviceLabel} {t.included}
                        </p>
                      </div>
                      <div className="pk-st">
                        <div className="pk-price font-display">
                          <AnimatedPrice value={getPlanPrice(tierId, duration.id, devices)} />
                        </div>
                        <button
                          type="button"
                          data-cta="order"
                          className="pk-btn"
                          onClick={() => onSelectPlan({ tier: tierId, duration: duration.id, devices })}
                        >
                          {t.choose}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="pk-back">
            <Shield className="w-5 h-5 shrink-0" />
            {t.guarantee}
          </p>
        </div>

        {/* Accepted Payment Methods Strip */}
        <div data-reveal className="mt-14 max-w-4xl mx-auto p-5 rounded-2xl bg-white border border-[#dbe8df] text-center shadow-xs">
          <div className="text-xs font-semibold text-[#527d66] mb-3">{t.paymentMethods}</div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-bold text-[#1a3829]">
            {['iDEAL', t.creditcard, 'Crypto (Bitcoin / USDT)', 'Bancontact', 'Apple Pay'].map(
              (method) => (
                <span
                  key={method}
                  className="px-3 py-1.5 rounded-lg bg-[#f1f7f3] border border-[#dbe8df]"
                >
                  {method}
                </span>
              )
            )}
          </div>
          <div className="mt-3 text-[11px] text-[#71917f]">{t.secure}</div>
        </div>

        {/* Personal advice */}
        <div data-reveal="fade" className="pk-advice mt-6 text-center text-base sm:text-lg">
          <span>{t.doubt} </span>
          <button
            onClick={onOpenWhatsApp}
            className="inline-flex items-center gap-1.5 font-bold underline underline-offset-4 cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25d366]" />
            {t.advice}
          </button>
        </div>
      </div>
    </section>
  );
};
