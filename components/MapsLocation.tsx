'use client';

import React from 'react';
import { Navigation } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralBackgroundGeometric, FloralDivider } from '@/components/FloralDecorations';

export const MapsLocation: React.FC = () => {
  const { resepsi } = WEDDING_DATA.events;

  return (
    <section id="location" className="py-24 px-6 bg-gradient-to-b from-[#F2F7FA] via-[#f9fdff] to-[#E7EFF5] text-[#0B192C] relative border-t border-[#0B192C]/10 overflow-hidden">
      {/* Background Floral Ornaments */}
      <FloralBackgroundGeometric />

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1E3E62] font-semibold">
            Lokasi Acara
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-[#0B192C] font-normal">
            Petunjuk Lokasi
          </h2>
          <FloralDivider />
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            <strong className="text-[#0B192C] font-semibold">{resepsi.venue}</strong> — {resepsi.address}
          </p>
        </div>

        {/* Embedded Google Maps Container */}
        <div className="relative rounded-3xl overflow-hidden border border-[#0B192C]/20 shadow-xl bg-[#FFFDF9] h-[380px] sm:h-[450px]">
          <iframe
            title="Google Maps Location"
            src={resepsi.embedMapsUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        <div className="flex justify-center">
          <a
            href={resepsi.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full shimmer-button text-[#FAF7F2] font-extrabold text-xs sm:text-sm shadow-xl shadow-[#0B192C]/20 hover:scale-105 transition-all duration-300 cursor-pointer uppercase tracking-wider"
          >
            <Navigation className="w-4 h-4 fill-[#FAF7F2] text-[#FAF7F2]" />
            <span>Petunjuk Arah (Google Maps)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
