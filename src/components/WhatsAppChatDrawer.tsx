import React, { useState } from 'react';
import { X, Send, MessageSquare, Bot, User, CheckCheck } from 'lucide-react';

interface WhatsAppChatDrawerProps {
  lang: 'nl' | 'en';
  onClose: () => void;
  onSelectPlan: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  time: string;
}

export const WhatsAppChatDrawer: React.FC<WhatsAppChatDrawerProps> = ({
  lang,
  onClose,
  onSelectPlan,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'concierge',
      text:
        lang === 'nl'
          ? '👋 Hallo! Welkom bij GOTV. Heb je een vraag over een kanaal, de pakketten, of hulp bij installatie op je TV?'
          : '👋 Hello! Welcome to GOTV. Do you have a question about a channel, the packages, or need help installing on your TV?',
      time: 'Nu',
    },
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    lang === 'nl' ? 'Kan ik eerst een korte periode uitproberen?' : 'Can I try it for a short period first?',
    lang === 'nl' ? 'Welke app raad je aan voor Firestick?' : 'Which app is best for Fire TV?',
    lang === 'nl' ? 'Zijn alle Formule 1 & Champions League zenders live?' : 'Are F1 & Champions League live?',
  ];

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      time: 'Nu',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate realistic response
    setTimeout(() => {
      let reply = '';
      const lower = messageText.toLowerCase();

      if (lower.includes('proef') ||
        lower.includes('uitprobe') ||
        lower.includes('test') ||
        lower.includes('trial') ||
        lower.includes('try')) {
        reply =
          lang === 'nl'
            ? 'We werken niet met gratis proefaccounts, maar je kunt zonder verplichting starten met het pakket van 3 maanden. Geen contract, geen automatische verlenging — en niet goed? Geld terug binnen 7 dagen.'
            : 'We do not offer free trial accounts, but you can start with no obligation on the 3-month package. No contract, no automatic renewal — and if you are not happy, money back within 7 days.';
      } else if (lower.includes('firestick') || lower.includes('app')) {
        reply =
          lang === 'nl'
            ? 'Voor de Amazon Firestick adviseren we TiviMate IPTV of IPTV Smarters Pro. Beide installeren in 2 minuten en geven native 4K 60fps ondersteuning.'
            : 'For Amazon Firestick, we recommend TiviMate IPTV or IPTV Smarters Pro for buttery smooth 4K 60fps streaming.';
      } else {
        reply =
          lang === 'nl'
            ? 'Ja! Alle Nederlandse top-sportkanalen, inclusief alle Viaplay streams, Ziggo Sport Totaal, ESPN 1-4 en internationale sportzenders zijn standaard inbegrepen in 4K Ultra HD met 60 FPS.'
            : 'Yes! All top Dutch sports channels, including every Viaplay stream, Ziggo Sport Totaal, ESPN 1-4 and international sports channels, are included as standard in 4K Ultra HD at 60 FPS.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'concierge',
          text: reply,
          time: 'Zojuist',
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[380px] max-h-[580px] bg-[#091a11] text-white rounded-3xl border border-[#1d4b33] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6">
      {/* Drawer Header */}
      <div className="bg-[#0e2c1c] p-4 border-b border-[#1b432e] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-fluid-btn flex items-center justify-center font-bold shadow-xs">
              V
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[#0e2c1c]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">GOTV Support</h4>
            <div className="text-[11px] text-[#34d399] flex items-center gap-1">
              <span>{lang === 'nl' ? 'Online • Reageert binnen 2 min' : 'Online • Replies within 2 min'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#78a28e] hover:text-white hover:bg-[#163825] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#07150e]/95 text-xs">
        {messages.map((m) => {
          const isMe = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                  isMe
                    ? 'bg-fluid-btn rounded-br-xs'
                    : 'bg-[#122c1d] text-[#d6ede0] border border-[#1d4831] rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#557e67] mt-1 px-1 flex items-center gap-1">
                {m.time} {isMe && <CheckCheck className="w-3 h-3 text-[#34d399]" />}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quick Questions Suggestions */}
      <div className="p-2.5 bg-[#0b2115] border-t border-[#163825] flex gap-1.5 overflow-x-auto no-scrollbar">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 text-[11px] bg-[#143522] hover:bg-[#1b482f] text-[#8fe2b7] rounded-lg whitespace-nowrap border border-[#1e4832] transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="p-3 bg-[#0d2618] border-t border-[#183a27] flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={lang === 'nl' ? 'Typ hier je bericht...' : 'Type your message here...'}
          className="flex-1 px-3 py-2 text-xs bg-[#091a11] border border-[#1b432e] focus:border-[#22c55e] focus:outline-hidden rounded-xl text-white placeholder-[#517561]"
        />
        <button
          onClick={() => handleSend()}
          className="p-2 rounded-xl bg-fluid-btn transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
