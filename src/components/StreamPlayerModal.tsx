import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Radio, Server, Activity, ShieldCheck } from 'lucide-react';
import { Channel } from '../data/mockData';

interface StreamPlayerModalProps {
  channel: Channel;
  lang: 'nl' | 'en';
  onClose: () => void;
  onUpgrade: () => void;
}

export const StreamPlayerModal: React.FC<StreamPlayerModalProps> = ({
  channel,
  lang,
  onClose,
  onUpgrade,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState<'4K' | '1080p' | '720p'>('4K');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#091811] text-white rounded-3xl border border-[#1d4330] shadow-2xl overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="px-5 py-4 bg-[#0d2217] border-b border-[#183a27] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="country">
              {channel.logo}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {channel.name}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#153e28] text-[#4ade80] border border-[#235d3d]">
                  LIVE BROADCAST
                </span>
              </div>
              <p className="text-xs text-[#7aa18d]">{channel.currentProgram}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#78a28e] hover:text-white hover:bg-[#163825] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Area */}
        <div className="relative aspect-video w-full bg-[#050e0a] overflow-hidden flex items-center justify-center">
          {/* Animated visual backdrop representing live broadcast */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#07160f] via-[#0d261a] to-[#123824] flex items-center justify-center">
            {/* Ambient animated scanning line */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="text-center space-y-3 z-10 px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0c9361]/30 border-2 border-[#22c55e]/60 flex items-center justify-center mx-auto text-[#4ade80] animate-pulse">
                <Radio className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold font-display text-white">
                  {channel.name} · {quality} Stream
                </div>
                <div className="text-xs sm:text-sm text-[#8fe2b7] mt-1">
                  {isPlaying ? '● Live Ultra HD Stream Verbonden' : 'Stream Gepauzeerd'}
                </div>
              </div>
            </div>
          </div>

          {/* Top Live Badges in Player */}
          <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] font-bold">
            <span className="px-2.5 py-1 rounded bg-red-600/90 text-white uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              LIVE
            </span>
            <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-[#8fe2b7] border border-white/10">
              60 FPS · HEVC H.265
            </span>
          </div>

          {/* Bottom Video Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-[#a8c9b7] text-xs hidden sm:inline">
                {channel.quality}
              </span>
            </div>

            {/* Quality switch */}
            <div className="flex items-center gap-2">
              <div className="flex bg-black/50 p-1 rounded-lg border border-white/10 text-xs">
                {(['4K', '1080p', '720p'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      quality === q ? 'bg-fluid-btn' : 'text-[#88b19b] hover:text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <button
                onClick={onUpgrade}
                className="px-3 py-1.5 bg-fluid-btn rounded-lg text-xs font-bold transition-colors"
              >
                Krijg Volledige Toegang
              </button>
            </div>
          </div>
        </div>

        {/* Diagnostics & Stream Health Footer */}
        <div className="p-4 bg-[#0c1f15] border-t border-[#163827] flex flex-wrap items-center justify-between gap-4 text-xs text-[#7ca58f]">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-[#34d399]" />
              <span>Node: Amsterdam-Core-02</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#34d399]" />
              <span>Bitrate: 18.4 Mbps (0% Packet Drop)</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#8fe2b7]">
            <ShieldCheck className="w-4 h-4 text-[#34d399]" />
            <span>Anti-Buffering Failover: Standby</span>
          </div>
        </div>
      </div>
    </div>
  );
};
