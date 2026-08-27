'use client';

import React from 'react';
import { Navigation } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

export const MapsLocation: React.FC = () => {
  const { resepsi } = WEDDING_DATA.events;

  return (
    <section id="location" className="py-24 px-6 bg-[#070709] text-amber-50 relative border-t border-amber-500/15 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
            Lokasi Acara
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-amber-100 font-normal">
            Petunjuk Lokasi
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            <strong className="text-amber-200 font-semibold">{resepsi.venue}</strong> — {resepsi.address}
          </p>
        </div>

        {/* Embedded Google Maps Container */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-zinc-950 h-[380px] sm:h-[450px]">
          <iframe
            title="Google Maps Location"
            src={resepsi.embedMapsUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
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
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full shimmer-button text-zinc-950 font-extrabold text-xs sm:text-sm shadow-2xl shadow-amber-500/30 hover:scale-105 transition-all duration-300 cursor-pointer uppercase tracking-wider"
          >
            <Navigation className="w-4 h-4 fill-zinc-950 text-zinc-950" />
            <span>Petunjuk Arah (Google Maps)</span>
          </a>
        </div>
      </div>
    </section>
  );
};

