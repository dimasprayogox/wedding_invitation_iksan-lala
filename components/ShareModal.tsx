'use client';

import React, { useState } from 'react';
import { Share2, X, Copy, Check, MessageSquare } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

export const ShareModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const generatedLink = `${baseUrl}${guestName ? `?to=${encodeURIComponent(guestName)}` : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const waText = `Kepada Yth. ${guestName || 'Bapak/Ibu/Saudara/i'},\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri acara pernikahan kami:\n\n*${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name}*\n📅 ${WEDDING_DATA.displayDate}\n\nInfo lengkap & konfirmasi RSVP dapat dilihat pada tautan undangan digital berikut:\n${generatedLink}\n\nTerima kasih atas perhatian dan doa restunya.`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 sm:bottom-8 left-6 z-50 px-5 py-3.5 rounded-full bg-zinc-950/90 text-amber-300 border border-amber-500/40 text-xs font-semibold shadow-2xl hover:border-amber-300 hover:bg-zinc-900 transition-all flex items-center gap-2.5 cursor-pointer uppercase tracking-wider"
      >
        <Share2 className="w-4 h-4 text-amber-400" />
        <span className="hidden sm:inline">Bagikan Undangan</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md p-7 sm:p-8 rounded-3xl glass-card border border-amber-500/35 bg-[#070709] text-amber-50 space-y-6 shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-amber-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-md">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif-custom text-2xl font-semibold gold-gradient-text">
                Bagikan Undangan
              </h3>
              <p className="text-xs text-zinc-400 font-light">
                Buat tautan undangan khusus dengan nama tamu undangan Anda.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Nama Tamu Undangan</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Contoh: Bapak Ahmad / Ibu Maria"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-amber-500/30 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950 border border-amber-500/30 text-[11px] text-amber-200/90 break-all font-mono">
              {generatedLink}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleCopy}
                className="py-3 px-4 rounded-xl shimmer-button text-zinc-950 text-xs font-extrabold hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider shadow-md"
              >
                {isCopied ? <Check className="w-4 h-4 text-zinc-950" /> : <Copy className="w-4 h-4 text-zinc-950" />}
                <span>{isCopied ? 'Tersalin!' : 'Salin Link'}</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="py-3 px-4 rounded-xl bg-zinc-950 border border-amber-400/50 text-amber-300 text-xs font-bold hover:bg-amber-400 hover:text-zinc-950 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

