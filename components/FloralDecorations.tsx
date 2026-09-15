'use client';

import React from 'react';

// =========================================================================
// LUXURY PEONY & GOLDEN BOTANICAL FLORAL BOUQUET (Matches Reference Image)
// =========================================================================

// Top-Left Rich Peony & Gold Leaf Bouquet
export const NavyGoldFloralTopLeft: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 350 350"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-64 h-64 sm:w-96 sm:h-96 pointer-events-none ${className}`}
  >
    {/* Golden Vine Stems extending downwards */}
    <path d="M40 40 Q 90 120 70 250 T 90 340" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
    <path d="M40 40 Q 140 70 220 90 T 330 110" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />

    {/* Golden Leaves */}
    <path d="M70 120 C 100 110, 130 130, 110 160 C 80 160, 60 140, 70 120 Z" fill="#aa771c" opacity="0.75" stroke="#f3e5ab" strokeWidth="1" />
    <path d="M120 75 C 160 55, 175 85, 150 110 C 120 115, 105 95, 120 75 Z" fill="#aa771c" opacity="0.75" stroke="#f3e5ab" strokeWidth="1" />
    <path d="M160 90 C 200 80, 215 110, 185 130 C 150 130, 140 110, 160 90 Z" fill="#aa771c" opacity="0.7" stroke="#f3e5ab" strokeWidth="1" />
    <path d="M65 180 C 100 170, 110 200, 85 220 C 60 215, 50 195, 65 180 Z" fill="#aa771c" opacity="0.7" stroke="#f3e5ab" strokeWidth="1" />
    <path d="M80 250 C 115 240, 125 270, 100 290 C 75 285, 65 265, 80 250 Z" fill="#aa771c" opacity="0.75" stroke="#f3e5ab" strokeWidth="1" />

    {/* Small White / Cream Blossom Clusters (Baby's Breath) */}
    <g transform="translate(180, 140)" fill="#FAF7F2">
      <circle cx="0" cy="0" r="4" opacity="0.9" />
      <circle cx="8" cy="-6" r="3" opacity="0.8" />
      <circle cx="-6" cy="8" r="3.5" opacity="0.8" />
      <circle cx="10" cy="6" r="4" opacity="0.9" />
      <circle cx="-8" cy="-8" r="3" opacity="0.8" />
    </g>

    <g transform="translate(90, 210)" fill="#FAF7F2">
      <circle cx="0" cy="0" r="4" opacity="0.9" />
      <circle cx="8" cy="-6" r="3" opacity="0.8" />
      <circle cx="-6" cy="8" r="3.5" opacity="0.8" />
      <circle cx="10" cy="6" r="4" opacity="0.9" />
    </g>

    {/* Large Navy Peony Main Blossom */}
    <g transform="translate(85, 85)">
      {/* Outer Dark Navy Petals */}
      <path d="M-45 -10 C-60 -50 0 -70 45 -40 C75 -10 60 45 35 60 C-10 80 -60 45 -45 -10 Z" fill="#0B192C" opacity="0.95" stroke="#1E3E62" strokeWidth="1.5" />
      <path d="M-60 15 C-70 -25 -25 -65 15 -60 C65 -50 70 10 45 40 C10 65 -50 55 -60 15 Z" fill="#152C48" opacity="0.9" stroke="#d4af37" strokeWidth="0.8" />

      {/* Mid Petals */}
      <path d="M-35 -15 C-45 -40 -10 -50 25 -30 C50 -10 40 30 20 40 C-10 50 -40 25 -35 -15 Z" fill="#1E3E62" opacity="0.95" stroke="#f3e5ab" strokeWidth="0.8" />
      <path d="M-25 10 C-35 -20 0 -40 30 -20 C45 0 30 25 10 30 C-15 35 -30 20 -25 10 Z" fill="#0B192C" opacity="0.95" />

      {/* Inner Petal Swirls & Gold Stamen Core */}
      <circle cx="0" cy="0" r="14" fill="#07101D" stroke="#d4af37" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="8" fill="#d4af37" opacity="0.9" />
      <circle cx="-3" cy="-3" r="3" fill="#f3e5ab" />
      <circle cx="3" cy="2" r="2.5" fill="#f3e5ab" />
      <circle cx="2" cy="-4" r="2" fill="#f3e5ab" />
    </g>

    {/* Secondary Smaller Navy Rose */}
    <g transform="translate(185, 75)">
      <circle cx="0" cy="0" r="28" fill="#0B192C" stroke="#d4af37" strokeWidth="1" />
      <circle cx="-5" cy="-5" r="18" fill="#1E3E62" stroke="#f3e5ab" strokeWidth="0.8" />
      <circle cx="-2" cy="-2" r="9" fill="#d4af37" opacity="0.85" />
    </g>
  </svg>
);

// Bottom-Right Rich Peony & Gold Leaf Bouquet
export const NavyGoldFloralBottomRight: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`scale-x-[-1] scale-y-[-1] ${className}`}>
    <NavyGoldFloralTopLeft />
  </div>
);

// Gold Double Line Border Frame (Matches Reference Image)
export const GoldBorderFrame: React.FC = () => (
  <div className="absolute inset-3 sm:inset-6 pointer-events-none z-10 border border-[#d4af37]/40 rounded-2xl p-1">
    <div className="w-full h-full border border-[#d4af37]/20 rounded-xl" />
  </div>
);

// Monogram Emblem Header (S & J / Custom Initials Monogram)
export const MonogramHeader: React.FC<{ initial1?: string; initial2?: string }> = ({
  initial1 = 'I',
  initial2 = 'L',
}) => (
  <div className="flex flex-col items-center justify-center my-3 text-[#d4af37] animate-float">
    <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
      {/* Outer Leaf Ring */}
      <svg viewBox="0 0 100 100" fill="none" className="absolute inset-0 w-full h-full text-[#d4af37] opacity-80">
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" />
        {/* Leaf accents */}
        <path d="M50 5 Q 55 12 50 16 Q 45 12 50 5 Z" fill="currentColor" />
        <path d="M50 95 Q 55 88 50 84 Q 45 88 50 95 Z" fill="currentColor" />
        <path d="M5 50 Q 12 55 16 50 Q 12 45 5 50 Z" fill="currentColor" />
        <path d="M95 50 Q 88 55 84 50 Q 88 45 95 50 Z" fill="currentColor" />
      </svg>
      {/* Monogram Initials */}
      <div className="font-serif-custom text-xl sm:text-2xl font-bold tracking-tighter text-[#0B192C] flex items-center gap-1">
        <span>{initial1}</span>
        <span className="text-xs text-[#d4af37]">&amp;</span>
        <span>{initial2}</span>
      </div>
    </div>
  </div>
);

// Full Floral Section Background Container with Peony Bouquets
export const FloralBackgroundRose: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-0 left-0 animate-float">
      <NavyGoldFloralTopLeft />
    </div>
    <div className="absolute bottom-0 right-0 animate-float" style={{ animationDelay: '2.5s' }}>
      <NavyGoldFloralBottomRight />
    </div>
  </div>
);

export const FloralBackgroundBotanical: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-0 right-0 animate-float" style={{ animationDelay: '1.5s' }}>
      <div className="scale-x-[-1]"><NavyGoldFloralTopLeft /></div>
    </div>
    <div className="absolute bottom-0 left-0 animate-float" style={{ animationDelay: '3s' }}>
      <div className="scale-y-[-1]"><NavyGoldFloralTopLeft /></div>
    </div>
  </div>
);

export const FloralBackgroundLaurel: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-0 left-0 animate-float"><NavyGoldFloralTopLeft /></div>
    <div className="absolute bottom-0 right-0 animate-float" style={{ animationDelay: '2s' }}><NavyGoldFloralBottomRight /></div>
  </div>
);

export const FloralBackgroundMeadow: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-0 right-0 animate-float" style={{ animationDelay: '2s' }}>
      <div className="scale-x-[-1]"><NavyGoldFloralTopLeft /></div>
    </div>
    <div className="absolute bottom-0 left-0 animate-float" style={{ animationDelay: '4s' }}>
      <div className="scale-y-[-1]"><NavyGoldFloralTopLeft /></div>
    </div>
  </div>
);

export const FloralBackgroundGeometric: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-0 left-0 animate-float"><NavyGoldFloralTopLeft /></div>
    <div className="absolute bottom-0 right-0 animate-float" style={{ animationDelay: '3s' }}><NavyGoldFloralBottomRight /></div>
  </div>
);

// Floral Section Divider SVG
export const FloralDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 py-3 text-[#0B192C] opacity-40 ${className}`}>
    <svg className="w-16 h-4" viewBox="0 0 100 20" fill="none">
      <path d="M0 10 Q 30 0 50 10 Q 70 20 100 10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="5" r="2" fill="currentColor" />
      <circle cx="70" cy="15" r="2" fill="currentColor" />
    </svg>
    <svg className="w-7 h-7" viewBox="0 0 40 40" fill="currentColor">
      <circle cx="20" cy="20" r="5" fill="#d4af37" />
      <path d="M20 5 Q 25 12 20 15 Q 15 12 20 5 Z" />
      <path d="M20 35 Q 25 28 20 25 Q 15 28 20 35 Z" />
      <path d="M5 20 Q 12 25 15 20 Q 12 15 5 20 Z" />
      <path d="M35 20 Q 28 25 25 20 Q 28 15 35 20 Z" />
    </svg>
    <svg className="w-16 h-4 scale-x-[-1]" viewBox="0 0 100 20" fill="none">
      <path d="M0 10 Q 30 0 50 10 Q 70 20 100 10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="5" r="2" fill="currentColor" />
      <circle cx="70" cy="15" r="2" fill="currentColor" />
    </svg>
  </div>
);
