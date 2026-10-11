import { Lang } from '../data/mockData';
import React, { useState, useEffect } from 'react';
import { X, Gauge, Wifi, Zap, CheckCircle2, RotateCw } from 'lucide-react';

interface SpeedTestWidgetProps {
  lang: Lang;
  onClose: () => void;
  onExplorePlans: () => void;
}

export const SpeedTestWidget: React.FC<SpeedTestWidgetProps> = ({
  lang,
  onClose,
  onExplorePlans,
}) => {
  const [testing, setTesting] = useState(true);
  const [progress, setProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [ping, setPing] = useState(12);

  const runTest = () => {
    setTesting(true);
    setProgress(0);
    setDownloadSpeed(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      setProgress(current);
      // simulate realistic high-speed speed test curve
      setDownloadSpeed(Math.floor(40 + (current / 100) * 145 + Math.random() * 8));

      if (current >= 100) {
        clearInterval(interval);
        setTesting(false);
        setDownloadSpeed(192);
        setPing(11);
      }
    }, 100);
  };

  useEffect(() => {
    runTest();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0b1c13] text-white rounded-3xl border border-[#214c36] shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#183a27]">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-[#34d399]" />
            <h3 className="text-lg font-bold font-display">
              {{ nl: 'Gratis Geschiktheidscheck', en: 'Free Compatibility Check', de: 'Kostenloser Eignungscheck' }[lang]}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78a28e] hover:text-white hover:bg-[#163825] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-4 text-sm font-bold text-white">
          {{ nl: 'Is jouw thuisnetwerk geschikt voor 4K IPTV?', en: 'Is your home network ready for 4K IPTV?', de: 'Ist dein Heimnetzwerk bereit für 4K-IPTV?' }[lang]}
        </p>

        <div className="my-6 text-center space-y-4">
          <div className="text-5xl sm:text-6xl font-extrabold text-white font-display tabular-nums tracking-tight">
            {downloadSpeed} <span className="text-xl sm:text-2xl text-[#34d399]">Mbps</span>
          </div>

          <div className="w-full bg-[#132c1f] rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0c9361] to-[#34d399] h-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-[#0e271a] p-3 rounded-xl border border-[#1b3d2c]">
              <div className="text-xs text-[#6a977f]">Ping Latency</div>
              <div className="text-base font-bold text-white mt-0.5">{ping} ms</div>
            </div>
            <div className="bg-[#0e271a] p-3 rounded-xl border border-[#1b3d2c]">
              <div className="text-xs text-[#6a977f]">Server Node</div>
              <div className="text-base font-bold text-[#8fe2b7] mt-0.5">Amsterdam Core</div>
            </div>
          </div>
        </div>

        {!testing ? (
          <div className="p-4 rounded-2xl bg-[#0e2c1c] border border-[#1f593b] text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#34d399]">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {{ nl: '100% GESCHIKT VOOR GOTV 4K!', en: '100% READY FOR GOTV 4K!', de: '100% BEREIT FÜR GOTV 4K!' }[lang]}
              </span>
            </div>
            <p className="text-xs text-[#a0c8b3]">
              {{ nl: 'Gefeliciteerd! Jouw verbinding kan moeiteloos 4K Ultra HD en 60FPS sportstreams verwerken via onze Europese dedicated servers.', en: 'Congratulations! Your connection can effortlessly handle 4K Ultra HD and 60FPS sports streams via our dedicated European servers.', de: 'Glückwunsch! Deine Verbindung schafft mühelos 4K Ultra HD und 60FPS-Sportstreams über unsere dedizierten europäischen Server.' }[lang]}
            </p>
            <button
              onClick={() => {
                onClose();
                onExplorePlans();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-fluid-btn text-xs font-bold transition-colors cursor-pointer"
            >
              {{ nl: 'Bekijk De Pakketten', en: 'View The Packages', de: 'Pakete ansehen' }[lang]}
            </button>
          </div>
        ) : (
          <div className="text-center text-xs text-[#7aa18d] flex items-center justify-center gap-2">
            <RotateCw className="w-3.5 h-3.5 animate-spin text-[#34d399]" />
            <span>{{ nl: 'Thuisnetwerk analyseren...', en: 'Analysing home network...', de: 'Heimnetzwerk wird analysiert...' }[lang]}</span>
          </div>
        )}
      </div>
    </div>
  );
};
