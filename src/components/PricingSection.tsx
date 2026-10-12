import React, { useEffect, useRef, useState } from 'react';
import { Shield, Crown, ArrowRight, Check, MonitorSmartphone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  PLAN_DURATIONS,
  PLAN_TIERS,
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

  // Phones show the first benefits in each card until asked for the rest.
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
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display [text-wrap:balance]">
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
                  <MonitorSmartphone className="w-4 h-4" />
                  {count}
                  <span className={count === devices ? '' : 'hidden lg:inline'}>
                    {count === 1 ? t.deviceLower : t.devicesLower}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Premium VIP gets a stage of its own */}
          <div className={`pk-stage ${isPremium ? 'pk-vip' : 'pk-basis'}`}>
            {isPremium && (
              <div className="pk-head">
                <span className="pk-crown">
                  <Crown className="w-7 h-7" />
                </span>
                <div>
                  <h3>{t.tiers.premium}</h3>
                  <p>{t.vipTagline}</p>
                </div>
              </div>
            )}

            {/* One card per term; each says what you get */}
            <div className="pk-cards">
              {PLAN_DURATIONS.map((duration) => {
                const isBest = Boolean(duration.note);
                return (
                  <div key={duration.id} className={`pk-card ${isBest ? 'pk-best' : ''}`}>
                    {isBest && duration.note && (
                      <span className="pk-tag">
                        {duration.note[lang]} · {duration.badge}
                      </span>
                    )}
                    <h3 className="pk-dur">{duration.label[lang]}</h3>
                    <div className="pk-price font-display">
                      <AnimatedPrice value={getPlanPrice(tierId, duration.id, devices)} />
                    </div>
                    <p className="pk-pm">
                      {t.thatIs} <AnimatedPrice value={getMonthlyPrice(tierId, duration.id, devices)} /> {t.perMonth}
                    </p>
                    <p className="pk-dev">
                      <MonitorSmartphone className="w-4 h-4" />
                      {deviceLabel} {t.included}
                    </p>
                    <button
                      type="button"
                      data-cta="order"
                      className="pk-btn"
                      onClick={() => onSelectPlan({ tier: tierId, duration: duration.id, devices })}
                    >
                      {t.choose}
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="pk-inc">
                      <h4>
                        <span className="pk-chip">{tier.label}</span>
                        {t.whatsIn(tier.name[lang])}
                      </h4>
                      <ul className={allShown ? '' : 'pk-short'}>
                        {tier.features[lang].map((feat) => (
                          <li key={feat}>
                            <span className="pk-check">
                              <Check className="w-3.5 h-3.5" strokeWidth={3} />
                            </span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                      {!allShown && (
                        <button type="button" className="pk-more" onClick={() => setAllShown(true)}>
                          {t.allBenefits(tier.features[lang].length)}
                        </button>
                      )}
                    </div>

                    <p className="pk-back">
                      <Shield className="w-4 h-4 shrink-0" />
                      {t.guarantee}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
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
