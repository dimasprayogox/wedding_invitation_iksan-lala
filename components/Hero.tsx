'use client';

import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#070709] via-zinc-950 to-[#0a0a0d] text-amber-50 overflow-hidden">
      {/* Background Decorative Gold Glow */}
      <div className="absolute w-[650px] h-[650px] bg-gradient-to-b from-amber-500/15 to-transparent rounded-full blur-3xl pointer-events-none -top-40" />
      
      {/* Frame border element */}
      <div className="absolute inset-4 sm:inset-8 border border-amber-500/30 rounded-3xl pointer-events-none" />
      <div className="absolute inset-6 sm:inset-10 border border-amber-400/15 rounded-2xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-6 pt-12">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-950/80 border border-amber-400/40 text-amber-300 text-xs tracking-[0.2em] uppercase font-semibold shadow-lg">
          <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>The Wedding Of</span>
        </div>

        <h1 className="font-cursive text-6xl sm:text-8xl md:text-9xl font-normal gold-gradient-text tracking-wide drop-shadow-2xl py-2">
          {WEDDING_DATA.groom.name} &amp; {WEDDING_DATA.bride.name}
        </h1>

        <p className="font-serif-custom text-sm sm:text-xl text-amber-200/90 tracking-[0.2em] uppercase">
          {WEDDING_DATA.displayDate}
        </p>

        <div className="max-w-md mx-auto p-6 sm:p-7 rounded-2xl glass-card border border-amber-500/30 shadow-2xl mt-6">
          <p className="text-xs sm:text-sm text-amber-100/90 italic leading-relaxed font-light">
            &ldquo;{WEDDING_DATA.quote.text}&rdquo;
          </p>
          <span className="block mt-4 text-xs font-semibold gold-gradient-text uppercase tracking-widest">
            — {WEDDING_DATA.quote.source} —
          </span>
        </div>

        {/* Action button to scroll down */}
        <div className="pt-8">
          <a
            href="#couple"
            className="inline-flex flex-col items-center gap-2 text-xs text-amber-300/80 hover:text-amber-200 transition-colors cursor-pointer group"
          >
            <span className="tracking-widest uppercase text-[10px] font-medium text-amber-300/90">Gulir Ke Bawah</span>
            <div className="w-9 h-9 rounded-full border border-amber-500/40 bg-zinc-950/60 flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-500/10 transition-colors shadow-md">
              <ChevronDown className="w-4 h-4 text-amber-300 animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

