'use client';

import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralDivider } from '@/components/FloralDecorations';

export const EventDetails: React.FC = () => {
  const { akad, resepsi } = WEDDING_DATA.events;

  return (
    <section id="event" className="py-24 px-6 bg-gradient-to-b from-[#E7EFF5] via-[#f9fdff] to-[#F2F7FA] text-[#0B192C] relative overflow-hidden border-t border-[#0B192C]/10">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1E3E62] font-semibold">
            Waktu &amp; Tempat
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-[#0B192C] font-normal">
            Rangkaian Acara
          </h2>
          <FloralDivider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Akad Nikah Card */}
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-[#0B192C]/15 shadow-xl flex flex-col justify-between hover:border-[#0B192C]/30 transition-all duration-300 relative group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FFFDF9] border border-[#0B192C]/20 flex items-center justify-center text-[#1E3E62] mb-6 shadow-md group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6 text-[#1E3E62]" />
              </div>
              <h3 className="font-serif-custom text-2xl sm:text-3xl font-semibold navy-gradient-text mb-2">
                {akad.title}
              </h3>
              <div className="space-y-4 text-sm text-slate-700 my-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#1E3E62] flex-shrink-0" />
                  <span className="text-[#0B192C] font-medium">{akad.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#1E3E62] flex-shrink-0" />
                  <span className="text-[#0B192C] font-medium">{akad.time}</span>
                </div>
                <div className="flex items-start gap-3 pt-2">
                  <MapPin className="w-4 h-4 text-[#1E3E62] flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-[#0B192C] font-semibold">{akad.venue}</strong>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{akad.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resepsi Card */}
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-[#0B192C]/15 shadow-xl flex flex-col justify-between hover:border-[#0B192C]/30 transition-all duration-300 relative group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FFFDF9] border border-[#0B192C]/20 flex items-center justify-center text-[#1E3E62] mb-6 shadow-md group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6 text-[#1E3E62]" />
              </div>
              <h3 className="font-serif-custom text-2xl sm:text-3xl font-semibold navy-gradient-text mb-2">
                {resepsi.title}
              </h3>
              <div className="space-y-4 text-sm text-slate-700 my-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#1E3E62] flex-shrink-0" />
                  <span className="text-[#0B192C] font-medium">{resepsi.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#1E3E62] flex-shrink-0" />
                  <span className="text-[#0B192C] font-medium">{resepsi.time}</span>
                </div>
                <div className="flex items-start gap-3 pt-2">
                  <MapPin className="w-4 h-4 text-[#1E3E62] flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-[#0B192C] font-semibold">{resepsi.venue}</strong>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{resepsi.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
