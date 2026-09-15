'use client';

import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralBackgroundRose, MonogramHeader, GoldBorderFrame } from '@/components/FloralDecorations';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#F2F7FA] via-[#f9fdff] to-[#E7EFF5] text-[#0B192C] overflow-hidden">
      {/* Background Floral Ornaments */}
      <FloralBackgroundRose />

      {/* Gold Frame Border matching reference image */}
      <GoldBorderFrame />

      {/* Background Decorative Glow */}
      <div className="absolute w-[650px] h-[650px] bg-gradient-to-b from-[#1E3E62]/10 to-transparent rounded-full blur-3xl pointer-events-none -top-40" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-5 pt-8">
        <MonogramHeader initial1={WEDDING_DATA.groom.name[0]} initial2={WEDDING_DATA.bride.name[0]} />

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFFDF9] border border-[#0B192C]/20 text-[#1E3E62] text-xs tracking-[0.2em] uppercase font-semibold shadow-md">
          <Heart className="w-3.5 h-3.5 fill-[#1E3E62] text-[#1E3E62]" />
          <span>The Wedding Of</span>
        </div>

        <h1 className="font-cursive text-6xl sm:text-8xl md:text-9xl font-normal navy-gradient-text tracking-wide drop-shadow-sm py-2">
          {WEDDING_DATA.groom.name} &amp; {WEDDING_DATA.bride.name}
        </h1>

        <p className="font-serif-custom text-sm sm:text-xl text-[#1E3E62] tracking-[0.2em] uppercase">
          {WEDDING_DATA.displayDate}
        </p>

        <div className="max-w-md mx-auto p-6 sm:p-7 rounded-2xl glass-card border border-[#0B192C]/15 shadow-lg mt-4">
          <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-light">
            &ldquo;{WEDDING_DATA.quote.text}&rdquo;
          </p>
          <span className="block mt-4 text-xs font-semibold navy-gradient-text uppercase tracking-widest">
            — {WEDDING_DATA.quote.source} —
          </span>
        </div>

        {/* Action button to scroll down */}
        <div className="pt-6">
          <a
            href="#couple"
            className="inline-flex flex-col items-center gap-2 text-xs text-[#1E3E62] hover:text-[#0B192C] transition-colors cursor-pointer group"
          >
            <span className="tracking-widest uppercase text-[10px] font-medium text-[#1E3E62]">Gulir Ke Bawah</span>
            <div className="w-9 h-9 rounded-full border border-[#0B192C]/20 bg-[#FFFDF9] flex items-center justify-center group-hover:border-[#0B192C]/40 group-hover:bg-[#1E3E62]/10 transition-colors shadow-md">
              <ChevronDown className="w-4 h-4 text-[#0B192C] animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
