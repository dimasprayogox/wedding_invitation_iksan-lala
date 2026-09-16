'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { MailOpen, Heart, Sparkles, Loader2 } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { MonogramHeader } from '@/components/FloralDecorations';
import { preloadHeroAssets } from '@/lib/preload';

interface CoverOverlayProps {
  guestName: string;
  isOpen: boolean;
  isLoading?: boolean;
  onOpen: () => void;
}

export const CoverOverlay: React.FC<CoverOverlayProps> = ({ guestName, isOpen, isLoading = false, onOpen }) => {
  useEffect(() => {
    // Quietly preload hero assets in background without blocking cover
    preloadHeroAssets().catch(() => {});
  }, []);

  if (isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#F2F7FA] via-[#f9fdff] to-[#E7EFF5] text-[#0B192C] p-4 sm:p-8 transition-all duration-1000 ease-in-out overflow-y-auto">
      {/* Mobile / Portrait Background Image */}
      <div className="block sm:hidden absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/bingkai_potrait.webp"
          alt="Background Bingkai Portrait"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Desktop / Landscape Background Image */}
      <div className="hidden sm:block absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/bingkai_landscape.webp"
          alt="Background Bingkai Landscape"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Main Content Container - Centered for Landscape & Portrait Screens */}
      <div className="relative z-10 max-w-2xl w-full my-auto flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5 p-4 sm:p-8 animate-fade-in-up">
        {/* Monogram Emblem Header */}
  
        <div className="space-y-1">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#1E3E62] font-semibold">
            The Wedding Invitation Of
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#0B192C]/40 to-transparent mx-auto" />
        </div>

        {/* Couple Names */}
        <h1 className="font-cursive text-5xl sm:text-7xl md:text-8xl navy-gradient-text drop-shadow-sm animate-float py-1">
          {WEDDING_DATA.groom.name} &amp; {WEDDING_DATA.bride.name}
        </h1>

        <p className="font-serif-custom text-xs sm:text-sm text-[#1E3E62] tracking-[0.25em] uppercase">
          {WEDDING_DATA.displayDate}
        </p>

        {/* Personalized Guest Box */}
        <div className="mt-3 py-5 sm:py-7 px-4 sm:px-6 rounded-3xl glass-card border border-[#0B192C]/20 backdrop-blur-xl shadow-xl relative max-w-[285px] min-w-[285px] sm:max-w-md  mx-auto">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] border border-[#0B192C]/30 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-[#FAF7F2] shadow-md whitespace-nowrap">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B192C] mt-2 capitalize font-serif-custom py-1">
            {guestName || 'Tamu Undangan Satu Dua Tiga'}
          </h2>
        </div>

        {/* Invitation Message Below Guest Card */}
        <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-light max-w-md mx-auto">
          Tanpa Mengurangi Rasa Hormat, Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami.
        </p>

        {/* Open Button */}
        <button
          onClick={onOpen}
          disabled={isLoading}
          className="mt-4 group inline-flex items-center gap-3 px-9 py-3.5 rounded-full shimmer-button text-[#FAF7F2] font-extrabold shadow-xl shadow-[#0B192C]/20 hover:scale-105 transition-all duration-300 cursor-pointer disabled:opacity-80 disabled:scale-100 disabled:cursor-wait"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-[#FAF7F2]" />
              <span className="tracking-wider uppercase text-xs sm:text-sm font-bold">Menyiapkan...</span>
            </>
          ) : (
            <>
              <MailOpen className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 text-[#FAF7F2]" />
              <span className="tracking-wider uppercase text-xs sm:text-sm font-bold">Buka Undangan</span>
              <Sparkles className="w-4 h-4 text-[#FAF7F2] animate-spin-slow" />
            </>
          )}
        </button>

        {/* Decorative Bottom Note */}
        <div className="pt-2 text-slate-600 text-[11px] flex items-center justify-center gap-1.5 animate-pulse">
          <Heart className="w-3.5 h-3.5 text-[#1E3E62] fill-[#1E3E62]" />
          <span>Mohon Maaf Apabila Ada Kesalahan Penulisan Nama/Gelar</span>
        </div>
      </div>
    </div>
  );
};
