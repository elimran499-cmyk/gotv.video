import React, { useState } from 'react';
import { X, Check, Copy, CheckCircle2, ShieldCheck, ArrowRight, Tv, Smartphone } from 'lucide-react';
import {
  PLAN_DURATIONS,
  PLAN_TIERS,
  DEFAULT_PLAN,
  getPlanPrice,
  formatEuro,
  PlanSelection,
  PlanDurationId,
  Lang,
} from '../data/mockData';

interface OrderModalProps {
  initialPlan?: PlanSelection;
  lang: Lang;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  initialPlan = DEFAULT_PLAN,
  lang,
  onClose,
}) => {
  const [durationId, setDurationId] = useState<PlanDurationId>(initialPlan.duration);
  const [device, setDevice] = useState('Smart TV (Samsung/LG)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('iDEAL');
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [copied, setCopied] = useState(false);

  const tier = PLAN_TIERS[initialPlan.tier];
  const devicesCount = initialPlan.devices;
  const currentDuration =
    PLAN_DURATIONS.find((d) => d.id === durationId) || PLAN_DURATIONS[PLAN_DURATIONS.length - 1];
  const currentPrice = getPlanPrice(tier.id, currentDuration.id, devicesCount);
  const planName = `${tier.name[lang]} · ${currentDuration.label[lang]}`;
  const screensLabel =
    lang === 'nl'
      ? `${devicesCount} ${devicesCount === 1 ? 'apparaat' : 'apparaten'}`
      : `${devicesCount} ${devicesCount === 1 ? 'device' : 'devices'}`;

  const devices = [
    'Smart TV (Samsung/LG)',
    'Amazon Fire TV Stick',
    'Android TV / Google TV',
    'Apple TV (iOS)',
    'MAG / Formuler Box',
    'PC / Laptop / Mac',
  ];

  const paymentMethods = [
    'iDEAL',
    'Bancontact',
    'Creditcard (Visa/MC)',
    'Apple Pay',
    'Crypto (BTC/USDT)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !whatsapp) return;
    setStep('success');
  };

  const copyCredentials = () => {
    navigator.clipboard.writeText(
      `GOTV IPTV CREDENTIALS\nServer: http://live.verdant-stream.vip:8080\nUsername: verdant_vip_${Math.floor(
        1000 + Math.random() * 9000
      )}\nPassword: vrd_${Math.random().toString(36).substring(7)}\nM3U: http://live.verdant-stream.vip:8080/get.php?username=vip&password=vrd`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-[#0b1c13] text-white rounded-3xl border border-[#214c36] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#0e2419] border-b border-[#1b3d2b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></span>
            <h3 className="text-lg font-bold font-display">
              {step === 'form'
                ? lang === 'nl'
                  ? `${tier.name.nl} Bestellen`
                  : `Order ${tier.name.en}`
                : lang === 'nl'
                ? 'Bestelling Geactiveerd!'
                : 'Order Successfully Activated!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78a28e] hover:text-white hover:bg-[#163825] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Plan selection pills */}
            <div>
              <label className="block text-xs font-semibold text-[#8fe2b7] uppercase mb-2">
                {lang === 'nl' ? '1. Selecteer je looptijd' : '1. Select your term'} · {screensLabel}:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {PLAN_DURATIONS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setDurationId(p.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      durationId === p.id
                        ? 'bg-fluid-btn border-transparent shadow-md'
                        : 'bg-[#0f281b] border-[#1a3d2b] text-[#9dbfae] hover:bg-[#153424]'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">
                      {p.label[lang]}
                    </div>
                    <div className="text-base font-extrabold mt-0.5">
                      {formatEuro(getPlanPrice(tier.id, p.id, devicesCount))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target device */}
            <div>
              <label className="block text-xs font-semibold text-[#8fe2b7] uppercase mb-2">
                {lang === 'nl' ? '2. Jouw primaire apparaat:' : '2. Primary device:'}
              </label>
              <select
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0f281b] border border-[#1b3d2b] focus:border-[#22c55e] focus:outline-hidden rounded-xl text-sm text-white"
              >
                {devices.map((d) => (
                  <option key={d} value={d} className="bg-[#0b1c13]">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#8fe2b7] uppercase mb-1.5">
                  {lang === 'nl' ? 'Volledige Naam:' : 'Full Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Bijv. Lucas Jansen"
                  className="w-full px-3.5 py-2.5 bg-[#0f281b] border border-[#1b3d2b] focus:border-[#22c55e] focus:outline-hidden rounded-xl text-sm text-white placeholder-[#4e7460]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8fe2b7] uppercase mb-1.5">
                  {lang === 'nl' ? 'E-mailadres:' : 'Email Address:'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.nl"
                  className="w-full px-3.5 py-2.5 bg-[#0f281b] border border-[#1b3d2b] focus:border-[#22c55e] focus:outline-hidden rounded-xl text-sm text-white placeholder-[#4e7460]"
                />
              </div>
            </div>

            {/* WhatsApp number for direct activation delivery */}
            <div>
              <label className="block text-xs font-semibold text-[#8fe2b7] uppercase mb-1.5">
                {lang === 'nl' ? 'WhatsApp Nummer (voor directe codes):' : 'WhatsApp Number (for instant codes):'}
              </label>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+31 6 12345678"
                className="w-full px-3.5 py-2.5 bg-[#0f281b] border border-[#1b3d2b] focus:border-[#22c55e] focus:outline-hidden rounded-xl text-sm text-white placeholder-[#4e7460]"
              />
              <span className="text-[11px] text-[#638f78] mt-1 block">
                {lang === 'nl'
                  ? 'Wij sturen je activatiecode en M3U-link binnen 3 minuten direct via WhatsApp.'
                  : 'We will dispatch your activation codes and M3U link in 3 minutes via WhatsApp.'}
              </span>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-semibold text-[#8fe2b7] uppercase mb-2">
                {lang === 'nl' ? 'Betaalmethode:' : 'Payment method:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => setPaymentMethod(pm)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors ${
                      paymentMethod === pm
                        ? 'bg-[#1b4a32] border-[#22c55e] text-white'
                        : 'bg-[#0f281b] border-[#1b3d2b] text-[#8db19f] hover:bg-[#143424]'
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>

            {/* Total breakdown & submit */}
            <div className="pt-3 border-t border-[#1b3d2b]">
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-[#88b19b]">
                  {lang === 'nl' ? 'Totaal te voldoen:' : 'Total due:'}
                </span>
                <span className="text-2xl font-extrabold text-white font-display">
                  {formatEuro(currentPrice)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-fluid-btn active:scale-[0.99] font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {lang === 'nl' ? 'Bevestig & Activeer Verbinding' : 'Confirm & Activate Stream'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#638f78]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
                <span>
                  {lang === 'nl'
                    ? 'Niet goed? Geld terug binnen 7 dagen · Veilige betaling'
                    : 'Not happy? Money back within 7 days · Secure payment'}
                </span>
              </div>
            </div>
          </form>
        ) : (
          /* Success Screen with Simulated Test Line */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#16462c] text-[#34d399] flex items-center justify-center mx-auto ring-8 ring-[#16462c]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-bold font-display text-white">
                {lang === 'nl' ? 'Welkom bij GOTV!' : 'Welcome to GOTV!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#8db19f] mt-1.5 max-w-md mx-auto">
                {lang === 'nl'
                  ? `Bedankt ${name}! Jouw ${planName} (${screensLabel}) voor ${device} is succesvol geconfigureerd. Je verificatie is tevens verstuurd naar ${whatsapp}.`
                  : `Thank you ${name}! Your ${planName} (${screensLabel}) for ${device} has been provisioned. A duplicate copy has also been sent to ${whatsapp}.`}
              </p>
            </div>

            {/* Generated Xtream Credentials Card */}
            <div className="bg-[#0e271a] p-4.5 rounded-2xl border border-[#1e4832] text-left space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#8fe2b7] uppercase border-b border-[#1b3d2b] pb-2">
                <span>JOUW XTREAM INLOGGEGEVENS</span>
                <span className="text-[#34d399]">STATUS: ACTIEF</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#65917a]">Server URL:</span>
                  <span className="font-mono text-white">http://live.verdant-stream.vip:8080</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#65917a]">Username:</span>
                  <span className="font-mono text-white">verdant_vip_8492</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#65917a]">Wachtwoord:</span>
                  <span className="font-mono text-white">vrd_93h7x1k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#65917a]">Looptijd:</span>
                  <span className="text-[#34d399] font-bold">
                    {currentDuration.label[lang]}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={copyCredentials}
                className="flex-1 py-3 px-4 rounded-xl bg-fluid-btn font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Gekopieerd naar klembord!' : 'Kopieer Gegevens'}</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 px-5 rounded-xl bg-[#143624] hover:bg-[#1b442e] text-[#8db19f] hover:text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                Sluiten & Beginnen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
