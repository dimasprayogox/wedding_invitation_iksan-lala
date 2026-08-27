'use client';

import React from 'react';
import { MailOpen, Heart, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

interface CoverOverlayProps {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

export const CoverOverlay: React.FC<CoverOverlayProps> = ({ guestName, isOpen, onOpen }) => {
  if (isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#070709] text-amber-50 p-6 sm:p-10 transition-all duration-1000 ease-in-out overflow-hidden">
      {/* Background ambient gold lighting & golden aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-amber-500/15 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Top Border */}
      <div className="text-center pt-8 relative z-10 animate-fade-in-up">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-400/90 mb-2 font-semibold">
          The Wedding Invitation Of
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
      </div>

      {/* Couple Names */}
      <div className="text-center my-auto relative z-10 max-w-lg space-y-6 animate-fade-in-up">
        <h1 className="font-cursive text-6xl sm:text-8xl md:text-9xl gold-gradient-text drop-shadow-2xl animate-float py-2">
          {WEDDING_DATA.groom.name} &amp; {WEDDING_DATA.bride.name}
        </h1>
        <p className="font-serif-custom text-xs sm:text-sm text-amber-200/90 tracking-[0.25em] uppercase mt-2">
          {WEDDING_DATA.displayDate}
        </p>

        {/* Personalized Guest Box */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl glass-card border border-amber-500/35 backdrop-blur-xl shadow-[0_15px_40px_-15px_rgba(212,175,55,0.2)] relative hover:scale-[1.02] transition-transform">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 bg-gradient-to-r from-zinc-950 via-[#684b0f] to-zinc-950 border border-amber-400/50 rounded-full text-[10px] uppercase tracking-widest text-amber-200 shadow-lg">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white mt-3 capitalize font-serif-custom drop-shadow">
            {guestName || 'Tamu Undangan'}
          </h2>
          <p className="text-xs text-amber-200/75 mt-3 italic leading-relaxed font-light">
            Tanpa Mengurangi Rasa Hormat, Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami.
          </p>
        </div>

        {/* Open Button */}
        <button
          onClick={onOpen}
          className="mt-6 group inline-flex items-center gap-3 px-9 py-4 rounded-full shimmer-button text-zinc-950 font-extrabold shadow-2xl shadow-amber-500/40 hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <MailOpen className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 text-zinc-950" />
          <span className="tracking-wider uppercase text-xs sm:text-sm font-bold">Buka Undangan</span>
          <Sparkles className="w-4 h-4 text-zinc-950 animate-spin-slow" />
        </button>
      </div>

      {/* Decorative Bottom */}
      <div className="text-center pb-6 relative z-10 text-amber-300/70 text-xs flex items-center justify-center gap-2 animate-pulse">
        <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span>Mohon Maaf Apabila Ada Kesalahan Penulisan Nama/Gelar</span>
      </div>
    </div>
  );
};

