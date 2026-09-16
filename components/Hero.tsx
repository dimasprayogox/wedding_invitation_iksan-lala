'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, ChevronDown } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralBackgroundRose, MonogramHeader, GoldBorderFrame } from '@/components/FloralDecorations';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#F2F7FA] via-[#f9fdff] to-[#E7EFF5] text-[#0B192C] overflow-hidden">
      {/* Top-Left Bunga Ornament */}
      <div className="absolute -top-20 -left-1 sm:-top-10 sm:-left-10 w-[240px] sm:w-[420px] md:w-[500px] pointer-events-none z-30 hero-stagger-flower">
  <Image
    src="/bunga.webp"
    alt="Ornamen Bunga Kiri Atas"
    width={962}
    height={1634}
    className="w-full h-auto rotate-270 -scale-y-100 sm:rotate-0 sm:-scale-x-100 sm:-scale-y-100"
    priority
  />
</div>

      {/* Bottom-Right Bunga Ornament */}
     <div className="absolute bottom-0 right-19 sm:-bottom-4 sm:-right-10 w-[240px] sm:w-[420px] md:w-[500px] pointer-events-none z-30 hero-stagger-flower" style={{ animationDelay: '0.3s' }}>
  <Image
    src="/bunga.webp"
    alt="Ornamen Bunga Kanan Bawah"
    width={962}
    height={1634}
    className="w-full h-auto rotate-270 -scale-x-100 sm:rotate-0 sm:scale-x-100"
    priority
  />
</div>

      {/* Gold Frame Border matching reference image */}
      <GoldBorderFrame />

      {/* Background Decorative Glow */}
      <div className="absolute w-[650px] h-[650px] bg-gradient-to-b from-[#1E3E62]/10 to-transparent rounded-full blur-3xl pointer-events-none -top-40" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-5 pt-8">
    
        {/* The Wedding Of badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFFDF9] border border-[#0B192C]/20 text-[#1E3E62] text-xs tracking-[0.2em] uppercase font-semibold shadow-md hero-stagger hero-stagger-1">
          <Heart className="w-3.5 h-3.5 fill-[#1E3E62] text-[#1E3E62]" />
          <span>The Wedding Of</span>
        </div>

        {/* Couple Names */}
        <h1 className="font-cursive text-6xl sm:text-8xl md:text-9xl font-normal navy-gradient-text tracking-wide drop-shadow-sm py-2 hero-stagger hero-stagger-2">
          {WEDDING_DATA.groom.name} &amp; {WEDDING_DATA.bride.name}
        </h1>

        {/* Date */}
        <p className="font-serif-custom text-sm sm:text-xl text-[#1E3E62] tracking-[0.2em] uppercase hero-stagger hero-stagger-3">
          {WEDDING_DATA.displayDate}
        </p>

        {/* Quote section with birds */}
        <div className="relative max-w-md mx-auto mt-4 hero-stagger hero-stagger-4">
          {/* Left Bird Decorative Overlay */}
          <div className="absolute top-26 sm:top-24 -left-14 sm:-left-25 w-44 h-44 sm:w-44 sm:h-44 pointer-events-none z-30 animate-bird">
            <Image
              src="/burung.webp"
              alt="Burung"
              width={96}
              height={96}
              className="w-full h-full object-contain drop-shadow-md"
              priority
            />
          </div>

          <div className="p-6 sm:p-7 rounded-2xl glass-card border border-[#0B192C]/15 shadow-lg relative z-10">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-light">
              &ldquo;{WEDDING_DATA.quote.text}&rdquo;
            </p>
            <span className="block mt-4 text-xs font-semibold navy-gradient-text uppercase tracking-widest">
              — {WEDDING_DATA.quote.source} —
            </span>
          </div>

          {/* Right Bird Decorative Overlay */}
          <div className="absolute -top-24 -right-14 sm:-right-26 sm:-top-4 w-36 h-36 sm:w-44 sm:h-44 -scale-x-100 pointer-events-none z-30 animate-bird" style={{ animationDelay: '1.5s' }}>
            <Image
              src="/burung.webp"
              alt="Burung"
              width={96}
              height={96}
              className="w-full h-full object-contain drop-shadow-md"
              priority
            />
          </div>
        </div>

        {/* Action button to scroll down */}
        <div className="pt-6 hero-stagger hero-stagger-5">
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
