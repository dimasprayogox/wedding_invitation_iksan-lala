'use client';

import React from 'react';
import { WEDDING_DATA } from '@/data/weddingData';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  isVisible: boolean;
  isFadingOut?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible, isFadingOut = false }) => {
  if (!isVisible && !isFadingOut) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#F2F7FA] via-[#f9fdff] to-[#E7EFF5] text-[#0B192C] p-6 transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-5 animate-fade-in-up">
        {/* Animated Wedding Monogram Ring */}
        <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
          <div className="absolute inset-0 rounded-full border-2 border-[#0B192C]/15 border-t-[#0B192C] animate-spin" />
          <div className="absolute inset-2 rounded-full border border-[#1E3E62]/20 border-b-[#1E3E62] animate-spin-slow" />
          <Sparkles className="w-7 h-7 text-[#0B192C] animate-pulse" />
        </div>

        {/* Groom & Bride Name */}
        <div className="text-center space-y-1">
          <h2 className="font-cursive text-3xl sm:text-4xl navy-gradient-text">
            {WEDDING_DATA.groom.name} &amp; {WEDDING_DATA.bride.name}
          </h2>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#1E3E62] font-semibold flex items-center justify-center gap-2">
            <span>Menyiapkan Undangan</span>
            <span className="inline-flex">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
