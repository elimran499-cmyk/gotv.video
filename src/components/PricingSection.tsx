import React, { useEffect, useRef, useState } from 'react';
import { Check, Sparkles, Shield, ArrowRight, Crown, MonitorSmartphone } from 'lucide-react';
import { OrderIcon } from './OrderIcon';
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

/** Feeds the pointer position to the card so its spotlight follows the cursor or finger. */
const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
};

export const PricingSection: React.FC<PricingSectionProps> = ({
  lang,
  onSelectPlan,
  onOpenWhatsApp,
}) => {
  const [tierId, setTierId] = useState<PlanTierId>(DEFAULT_PLAN.tier);
  const [devices, setDevices] = useState<number>(DEFAULT_PLAN.devices);

  // The cards play their entrance once the pricing stage scrolls into view.
  const stageRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <section id="prijzen" className="fluid-light py-16 lg:py-24 border-b border-[#dbe8df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-reveal className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e2f0e7] border border-[#c9ddd0] text-[11px] font-semibold tracking-wider text-[#1e4834] uppercase mb-3">
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0c2017] font-display [text-wrap:balance]">
            {t.titleStart}
            <span className="text-fluid-deep">{t.titleAccent}</span>
            {t.titleEnd}
          </h2>
          <p className="mt-3 text-base text-[#24402f] leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Tier toggle */}
        <div data-reveal="zoom" className="flex justify-center mb-3">
          <div className="grid grid-cols-2 w-full max-w-md p-1.5 rounded-2xl bg-white border border-[#dbe8df] shadow-sm">
            {TIER_IDS.map((id) => {
              const active = id === tierId;
              const premium = id === 'premium';
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTierId(id)}
                  aria-pressed={active}
                  className={`px-4 py-3 rounded-xl font-display font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    active
                      ? premium
                        ? 'bg-[#0b1f15] text-[#f3dfb4] shadow-lg ring-1 ring-[#d6bf96]/60'
                        : 'bg-fluid-btn shadow-md'
                      : 'text-[#24402f] hover:text-[#0c2017] hover:bg-[#f1f7f3]'
                  }`}
                >
                  {premium && (
                    <Crown className={`w-4 h-4 ${active ? 'text-[#d6bf96]' : 'text-[#b8964f]'}`} />
                  )}
                  <span>{t.tiers[id]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Device count selector */}
        <div data-reveal="zoom" style={{ '--reveal-delay': '120ms' } as React.CSSProperties} className="flex justify-center mb-10 sm:mb-12">
          <div className="grid grid-cols-4 w-full max-w-md sm:max-w-xl p-1.5 rounded-2xl bg-white border border-[#dbe8df] shadow-sm">
            {DEVICE_OPTIONS.map((count) => {
              const active = count === devices;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setDevices(count)}
                  aria-pressed={active}
                  aria-label={`${count} ${count === 1 ? t.device : t.devices}`}
                  className={`px-2 py-2.5 rounded-xl font-display font-extrabold text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    active
                      ? 'bg-fluid-btn shadow-md'
                      : 'text-[#24402f] hover:text-[#0c2017] hover:bg-[#f1f7f3]'
                  }`}
                >
                  <MonitorSmartphone className="w-4 h-4 shrink-0" />
                  <span>{count}</span>
                  <span className="hidden sm:inline">{count === 1 ? t.device : t.devices}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Premium VIP gets its own dark, gold-trimmed stage */}
        <div
          ref={stageRef}
          className={`relative max-w-6xl mx-auto transition-all duration-500 ${
            isPremium
              ? 'vip-card rounded-[1.75rem] sm:rounded-[2rem] p-3.5 sm:p-6 lg:p-8 border border-[#d6bf96]/40 shadow-2xl shadow-green-950/40'
              : ''
          }`}
        >
          {/* Projector beams */}
          {isPremium && (
            <div
              className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none"
              aria-hidden="true"
            >
              <div className="cine-beam left-[4%]" />
              <div className="cine-beam cine-beam-green right-[4%]" />
            </div>
          )}

          {isPremium && (
            <div
              key="vip-head"
              className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 sm:px-2 pb-6 ${
                inView ? 'pack-rise' : 'pack-wait'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex w-11 h-11 items-center justify-center rounded-2xl bg-gold-btn shadow-lg shadow-amber-200/20">
                  <Crown className="w-5 h-5 text-[#0c2017]" />
                </span>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold font-display text-gold">
                    {tier.name[lang]}
                  </div>
                  <div className="text-xs text-[#c3dccf]">{t.vipTagline}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-bold text-[#f6e7c3]">
                {t.vipPerks.map((perk) => (
                  <span
                    key={perk}
                    className="px-2.5 py-1 rounded-full bg-[#d6bf96]/15 border border-[#d6bf96]/40"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 3 looptijd cards */}
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6 items-stretch pt-3 lg:pt-0">
            {PLAN_DURATIONS.map((duration, idx) => {
              const price = getPlanPrice(tierId, duration.id, devices);
              const monthly = getMonthlyPrice(tierId, duration.id, devices);
              const isBest = Boolean(duration.note);
              const dark = isPremium;

              const cardClass = isPremium
                ? isBest
                  ? 'bg-gradient-to-b from-[#1a4430] to-[#0b1f15] text-white border border-transparent shadow-2xl shadow-amber-200/15'
                  : 'bg-[#11281c]/90 text-white border border-white/15 hover:border-[#d6bf96]/60 backdrop-blur-sm shadow-lg shadow-black/30'
                : isBest
                ? 'bg-white text-[#0c2017] border border-transparent shadow-xl shadow-green-700/15'
                : 'bg-white text-[#0c2017] border border-[#cfe3d5] hover:border-[#16a34a] shadow-sm hover:shadow-xl hover:shadow-green-700/10';

              return (
                <div
                  // Re-keyed on tier so switching Basis ↔ Premium VIP replays the entrance.
                  key={`${tierId}-${duration.id}`}
                  className={`${inView ? 'pack-rise' : 'pack-wait'} ${
                    isBest ? 'lg:-mt-2 lg:mb-2' : ''
                  }`}
                  style={{ '--d': `${120 + idx * 140}ms` } as React.CSSProperties}
                >
                  <div
                    onPointerMove={trackPointer}
                    className={`pack-card relative h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between ${cardClass}`}
                    style={
                      {
                        '--spot': dark ? 'rgba(243, 223, 180, 0.16)' : 'rgba(34, 197, 94, 0.14)',
                        '--ring-a': dark ? '#f3dfb4' : '#16a34a',
                        '--ring-b': dark ? '#22c55e' : '#d6bf96',
                      } as React.CSSProperties
                    }
                  >
                    {/* Reactive layers */}
                    {isBest && <div className="pack-ring" aria-hidden="true" />}
                    <div className="pack-spot" aria-hidden="true" />
                    {isBest && (
                      <div
                        className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="pack-shine" />
                      </div>
                    )}

                    {/* Best deal pill */}
                    {isBest && duration.note && (
                      <div
                        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap z-10 ${
                          isPremium ? 'bg-gold-btn text-[#0c2017]' : 'bg-fluid-btn'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>
                          {duration.note[lang]} · {duration.badge}
                        </span>
                      </div>
                    )}

                    <div className="relative">
                      {/* Looptijd */}
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl font-bold font-display">{duration.label[lang]}</h3>
                        {isPremium && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-1 rounded-full bg-[#d6bf96]/15 text-[#f6e7c3] border border-[#d6bf96]/40">
                            <Crown className="w-3 h-3" />
                            VIP
                          </span>
                        )}
                      </div>

                      {/* Price Block */}
                      <div className="mt-4 mb-2">
                        <span
                          className={`text-4xl sm:text-5xl font-extrabold font-display tabular-nums tracking-tight ${
                            isPremium ? 'text-gold' : isBest ? 'text-fluid-deep' : 'text-[#0c2017]'
                          }`}
                        >
                          <AnimatedPrice value={price} />
                        </span>
                      </div>

                      {/* Monthly breakdown */}
                      <div
                        className={`text-sm font-semibold ${
                          dark ? 'text-[#86efac]' : 'text-[#15803d]'
                        }`}
                      >
                        ≈ <AnimatedPrice value={monthly} /> {t.perMonth}
                      </div>

                      <div
                        className={`mt-1.5 mb-6 flex items-center gap-1.5 text-xs font-semibold ${
                          dark ? 'text-[#c3dccf]' : 'text-[#3b594b]'
                        }`}
                      >
                        <MonitorSmartphone className="w-3.5 h-3.5" />
                        <span>
                          {deviceLabel} {t.included}
                        </span>
                      </div>

                      {/* CTA Button */}
                      <button
                        data-cta="order"
                        onClick={() =>
                          onSelectPlan({ tier: tierId, duration: duration.id, devices })
                        }
                        className={`group/cta w-full py-3.5 px-5 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2 cursor-pointer ${
                          isPremium
                            ? isBest
                              ? 'bg-gold-btn text-[#0c2017] shadow-lg shadow-amber-200/25 hover:shadow-xl hover:shadow-amber-200/40'
                              : 'bg-[#d6bf96]/10 text-[#f6e7c3] border border-[#d6bf96]/60 hover:bg-gold-btn hover:text-[#0c2017]'
                            : isBest
                            ? 'bg-fluid-btn shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-600/40'
                            : 'bg-[#0f2d1e] hover:bg-[#15803d] text-white'
                        }`}
                      >
                        <OrderIcon className="w-5 h-5 transition-transform group-hover/cta:-translate-x-0.5 group-hover/cta:-rotate-6" />
                        <span>{isPremium ? t.orderVip : t.order}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
                      </button>

                      {/* Feature Checklist */}
                      <div className="mt-7 space-y-3.5">
                        <div
                          className={`text-xs font-bold ${
                            dark ? 'text-[#f6e7c3]' : 'text-[#24402f]'
                          }`}
                        >
                          {t.whatsIn(tier.name[lang])}
                        </div>

                        <ul className="space-y-1 text-[13px] sm:text-sm">
                          {tier.features[lang].map((feat) => (
                            <li
                              key={feat}
                              className={`flex items-start gap-2.5 leading-snug -mx-2 px-2 py-1 rounded-lg transition-colors ${
                                dark ? 'hover:bg-white/5' : 'hover:bg-[#f1f7f3]'
                              }`}
                            >
                              <Check
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  dark ? 'text-[#e9d3a6]' : 'text-[#16a34a]'
                                }`}
                              />
                              <span className={dark ? 'text-[#eef6f1]' : 'text-[#24402f]'}>
                                {feat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card footer trust note */}
                    <div
                      className={`relative mt-8 pt-4 border-t text-xs flex items-center gap-2 ${
                        dark ? 'border-white/15 text-[#c3dccf]' : 'border-[#e6efe9] text-[#3b594b]'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.guarantee}</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
        <div data-reveal="fade" className="mt-6 text-center text-sm text-[#3b594b]">
          <span>{t.doubt} </span>
          <button
            onClick={onOpenWhatsApp}
            className="inline-flex items-center gap-1.5 font-bold text-[#0c9361] hover:text-[#0a7a50] underline underline-offset-4 cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25d366]" />
            {t.advice}
          </button>
        </div>
      </div>
    </section>
  );
};
