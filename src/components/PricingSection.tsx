import React, { useEffect, useRef, useState } from 'react';
import { Shield, Crown, ArrowRight, Check } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BrandMark } from './BrandMark';
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
  PlanDurationId,
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
  const [durationId, setDurationId] = useState<PlanDurationId>(DEFAULT_PLAN.duration);
  const [devices, setDevices] = useState<number>(DEFAULT_PLAN.devices);

  // Phones show the first benefits of the chosen pack until asked for the rest.
  const [allShown, setAllShown] = useState(false);

  const t = {
    nl: {
      titleStart: 'Kies het pakket dat bij ',
      titleAccent: 'jou',
      titleEnd: ' past',
      subtitle:
        'Eén vaste betaling per looptijd. Geen abonnement, geen stilzwijgende verlenging — en je bepaalt zelf op hoeveel schermen je tegelijk kijkt.',
      tiers: { basis: 'Basis', premium: 'Premium VIP' },
      deviceLower: 'apparaat',
      devicesLower: 'apparaten',
      perMonth: 'per maand',
      thatIs: 'Dat is',
      step1: 'Kies je pakket',
      step2: 'Kies je looptijd',
      step3: 'Hoeveel schermen tegelijk?',
      from: 'vanaf',
      channels: 'live zenders',
      vod: 'films & series',
      quality: 'beeldkwaliteit',
      yours: 'Jouw pakket',
      sumPack: 'Pakket',
      sumTerm: 'Looptijd',
      sumScreens: 'Schermen',
      total: 'Totaal, eenmalig',
      choose: 'Kies dit pakket',
      allBenefits: (count: number) => `Alle ${count} voordelen bekijken`,
      vipTagline: 'Het complete pakket: hoogste kwaliteit, alle sport en persoonlijke service.',
      whatsIn: (name: string) => `Wat zit er in het ${name}?`,
      guarantee: 'Niet goed? Geld terug binnen 7 dagen',
      paymentMethods: 'Veilig & Snel Betalen Via Je Eigen Vertrouwde Betaalmethode',
      creditcard: 'Creditcard / Visa / Mastercard',
      doubt: 'Twijfel je nog welk pakket je wilt kiezen?',
      advice: 'Vraag vrijblijvend persoonlijk advies via WhatsApp →',
      secure: 'Veilige betaling · Directe activering binnen 5 minuten',
    },
    en: {
      titleStart: 'Choose the package that suits ',
      titleAccent: 'you',
      titleEnd: '',
      subtitle:
        'One fixed payment per term. No subscription, no silent renewal — and you decide how many screens you watch on at the same time.',
      tiers: { basis: 'Basic', premium: 'Premium VIP' },
      deviceLower: 'device',
      devicesLower: 'devices',
      perMonth: 'per month',
      thatIs: 'That is',
      step1: 'Choose your package',
      step2: 'Choose your term',
      step3: 'How many screens at once?',
      from: 'from',
      channels: 'live channels',
      vod: 'movies & series',
      quality: 'picture quality',
      yours: 'Your package',
      sumPack: 'Package',
      sumTerm: 'Term',
      sumScreens: 'Screens',
      total: 'Total, one-off',
      choose: 'Choose this package',
      allBenefits: (count: number) => `See all ${count} benefits`,
      vipTagline: 'The complete package: top quality, all sports and personal service.',
      whatsIn: (name: string) => `What is in the ${name}?`,
      guarantee: 'Not happy? Money back within 7 days',
      paymentMethods: 'Pay Safely & Quickly With Your Own Trusted Payment Method',
      creditcard: 'Credit card / Visa / Mastercard',
      doubt: 'Still not sure which package to choose?',
      advice: 'Ask for free personal advice via WhatsApp →',
      secure: 'Secure payment · Instant activation within 5 minutes',
    },
    de: {
      titleStart: 'Wähle das Paket, das zu ',
      titleAccent: 'dir',
      titleEnd: ' passt',
      subtitle:
        'Eine feste Zahlung pro Laufzeit. Kein Abo, keine stille Verlängerung — und du bestimmst selbst, auf wie vielen Bildschirmen du gleichzeitig schaust.',
      tiers: { basis: 'Basis', premium: 'Premium VIP' },
      deviceLower: 'Gerät',
      devicesLower: 'Geräte',
      perMonth: 'pro Monat',
      thatIs: 'Das sind',
      step1: 'Wähle dein Paket',
      step2: 'Wähle deine Laufzeit',
      step3: 'Wie viele Bildschirme gleichzeitig?',
      from: 'ab',
      channels: 'Live-Sender',
      vod: 'Filme & Serien',
      quality: 'Bildqualität',
      yours: 'Dein Paket',
      sumPack: 'Paket',
      sumTerm: 'Laufzeit',
      sumScreens: 'Bildschirme',
      total: 'Gesamt, einmalig',
      choose: 'Dieses Paket wählen',
      allBenefits: (count: number) => `Alle ${count} Vorteile ansehen`,
      vipTagline: 'Das Komplettpaket: höchste Qualität, alle Sportarten und persönlicher Service.',
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
  const duration = PLAN_DURATIONS.find((d) => d.id === durationId) ?? PLAN_DURATIONS[0];
  const deviceLabel = `${devices} ${devices === 1 ? t.deviceLower : t.devicesLower}`;
  const cheapest = (id: PlanTierId) => Math.min(...PLAN_DURATIONS.map((d) => getPlanPrice(id, d.id, 1)));

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

        {/* Three choices on the left, the total on the right (below, on phones) */}
        <div className="pk">
          <div className={`pk-stage ${isPremium ? 'pk-vip' : 'pk-basis'}`}>
            <div className="pk-main">
              {/* 1. The pack: two passes side by side, so the difference is plain */}
              <div className="pk-step">
                <h3 id="pk-step-1" className="pk-step-h">
                  <span className="pk-num">1</span>
                  {t.step1}
                </h3>
                <div className="pk-passes" role="radiogroup" aria-labelledby="pk-step-1">
                  {TIER_IDS.map((id) => {
                    const premium = id === 'premium';
                    return (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={id === tierId}
                        onClick={() => setTierId(id)}
                        className={`pk-pass ${premium ? 'pk-pass-vip' : ''}`}
                      >
                        <span className="pk-pass-top">
                          {premium ? (
                            <span className="pk-crown">
                              <Crown className="w-5 h-5" />
                            </span>
                          ) : (
                            <BrandMark className="w-8 h-8 rounded-lg" />
                          )}
                          <span className="pk-radio">
                            <Check className="w-4 h-4" strokeWidth={3.5} />
                          </span>
                        </span>
                        <span className="pk-pass-name font-display">{t.tiers[id]}</span>
                        <span className="pk-stat">
                          <b className="font-display">{TIER_STATS[id].channels}</b>
                          {t.channels}
                        </span>
                        <span className="pk-stat">
                          <b className="font-display">{TIER_STATS[id].vod}</b>
                          {t.vod}
                        </span>
                        <span className="pk-stat">
                          <b className="font-display">{premium ? '4K · 8K · HDR' : 'Full HD'}</b>
                          {t.quality}
                        </span>
                        <span className="pk-from">
                          {t.from} <b className="font-display">{formatEuro(cheapest(id))}</b>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* What is in the chosen pack */}
                <div className="pk-inc">
                  <h4>{t.whatsIn(tier.name[lang])}</h4>
                  {isPremium && <p>{t.vipTagline}</p>}
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
              </div>

              {/* 2. The term */}
              <div className="pk-step">
                <h3 id="pk-step-2" className="pk-step-h">
                  <span className="pk-num">2</span>
                  {t.step2}
                </h3>
                <div className="pk-terms" role="radiogroup" aria-labelledby="pk-step-2">
                  {PLAN_DURATIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={option.id === durationId}
                      onClick={() => setDurationId(option.id)}
                      className="pk-term"
                    >
                      <span className="pk-radio">
                        <Check className="w-4 h-4" strokeWidth={3.5} />
                      </span>
                      {option.note && (
                        <span className="pk-tag">
                          {option.note[lang]} · {option.badge}
                        </span>
                      )}
                      <span className="pk-term-name font-display">{option.label[lang]}</span>
                      <span className="pk-term-price font-display">
                        {formatEuro(getPlanPrice(tierId, option.id, devices))}
                      </span>
                      <span className="pk-term-pm">
                        {t.thatIs} {formatEuro(getMonthlyPrice(tierId, option.id, devices))} {t.perMonth}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. The number of screens */}
              <div className="pk-step">
                <h3 id="pk-step-3" className="pk-step-h">
                  <span className="pk-num">3</span>
                  {t.step3}
                </h3>
                <div className="pk-devs" role="radiogroup" aria-labelledby="pk-step-3">
                  {DEVICE_OPTIONS.map((count) => (
                    <button
                      key={count}
                      type="button"
                      role="radio"
                      aria-checked={count === devices}
                      onClick={() => setDevices(count)}
                      className="pk-devbtn"
                    >
                      <b className="font-display">{count}</b>
                      <span>{count === 1 ? t.deviceLower : t.devicesLower}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* The total, kept in view on wide screens */}
            <aside className="pk-sum">
              <h3 className="pk-sum-h">{t.yours}</h3>
              <dl className="pk-sum-list">
                <div>
                  <dt>{t.sumPack}</dt>
                  <dd>{t.tiers[tierId]}</dd>
                </div>
                <div>
                  <dt>{t.sumTerm}</dt>
                  <dd>{duration.label[lang]}</dd>
                </div>
                <div>
                  <dt>{t.sumScreens}</dt>
                  <dd>{deviceLabel}</dd>
                </div>
              </dl>
              <p className="pk-total-l">{t.total}</p>
              <div className="pk-total font-display">
                <AnimatedPrice value={getPlanPrice(tierId, durationId, devices)} />
              </div>
              <p className="pk-total-pm">
                {t.thatIs} <AnimatedPrice value={getMonthlyPrice(tierId, durationId, devices)} /> {t.perMonth}
              </p>
              <button
                type="button"
                data-cta="order"
                className="pk-btn"
                onClick={() => onSelectPlan({ tier: tierId, duration: durationId, devices })}
              >
                {t.choose}
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="pk-back">
                <Shield className="w-5 h-5 shrink-0" />
                {t.guarantee}
              </p>
            </aside>
          </div>
        </div>

        {/* Accepted payment methods */}
        <div data-reveal className="pk-pay">
          <div className="pk-pay-h">{t.paymentMethods}</div>
          <div className="pk-pay-list">
            {['iDEAL', t.creditcard, 'Crypto (Bitcoin / USDT)', 'Bancontact', 'Apple Pay'].map((method) => (
              <span key={method}>{method}</span>
            ))}
          </div>
          <div className="pk-pay-s">{t.secure}</div>
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
