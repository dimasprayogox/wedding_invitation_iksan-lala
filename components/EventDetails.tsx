'use client';

import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

export const EventDetails: React.FC = () => {
  const { akad, resepsi } = WEDDING_DATA.events;

  return (
    <section id="event" className="py-24 px-6 bg-[#0a0a0d] text-amber-50 relative overflow-hidden border-t border-amber-500/15">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
            Waktu &amp; Tempat
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-amber-100 font-normal">
            Rangkaian Acara
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Akad Nikah Card */}
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-amber-500/30 shadow-2xl flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 relative group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-zinc-950/90 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-6 shadow-lg group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-serif-custom text-2xl sm:text-3xl font-semibold gold-gradient-text mb-2">
                {akad.title}
              </h3>
              <div className="space-y-4 text-sm text-zinc-300 my-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-amber-100/90 font-medium">{akad.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-amber-100/90 font-medium">{akad.time}</span>
                </div>
                <div className="flex items-start gap-3 pt-2">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-amber-200 font-semibold">{akad.venue}</strong>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{akad.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={akad.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-950 border border-amber-400/40 text-xs font-semibold text-amber-300 hover:bg-amber-400 hover:text-zinc-950 transition-all duration-300 cursor-pointer shadow-md uppercase tracking-wider"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Google Maps</span>
            </a>
          </div>

          {/* Resepsi Card */}
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-amber-500/30 shadow-2xl flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 relative group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-zinc-950/90 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-6 shadow-lg group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-serif-custom text-2xl sm:text-3xl font-semibold gold-gradient-text mb-2">
                {resepsi.title}
              </h3>
              <div className="space-y-4 text-sm text-zinc-300 my-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-amber-100/90 font-medium">{resepsi.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-amber-100/90 font-medium">{resepsi.time}</span>
                </div>
                <div className="flex items-start gap-3 pt-2">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-amber-200 font-semibold">{resepsi.venue}</strong>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{resepsi.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={resepsi.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-950 border border-amber-400/40 text-xs font-semibold text-amber-300 hover:bg-amber-400 hover:text-zinc-950 transition-all duration-300 cursor-pointer shadow-md uppercase tracking-wider"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

