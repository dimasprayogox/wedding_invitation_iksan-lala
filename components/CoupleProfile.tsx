'use client';

import React from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralDivider } from '@/components/FloralDecorations';

export const CoupleProfile: React.FC = () => {
  return (
    <section id="couple" className="py-24 px-6 bg-gradient-to-b from-[#E7EFF5] via-[#f9fdff] to-[#F2F7FA] text-[#0B192C] relative overflow-hidden border-t border-[#0B192C]/10">
      {/* Background Floral Ornaments */}
    
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1E3E62]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1E3E62] font-semibold">
            Mempelai Pernikahan
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-[#0B192C] font-normal">
            Pasangan Bahagia
          </h2>
          <FloralDivider />
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Dengan Memohon Rahmat Dan Ridho Allah SWT, Kami Bermaksud Menyelenggarakan Pernikahan Kami:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Groom */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full p-2 bg-gradient-to-tr from-[#0B192C] via-[#1E3E62] to-[#0B192C] shadow-[0_10px_35px_rgba(11,25,44,0.15)] mb-6 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_15px_45px_rgba(11,25,44,0.25)]">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#FAF7F2]">
                <Image
                  src={WEDDING_DATA.groom.photoUrl}
                  alt={WEDDING_DATA.groom.fullName}
                  fill
                  sizes="(max-width: 768px) 192px, 240px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            <h3 className="font-serif-custom text-2xl sm:text-3xl font-semibold navy-gradient-text">
              {WEDDING_DATA.groom.fullName}
            </h3>
            <p className="text-xs text-[#1E3E62] font-medium tracking-[0.2em] uppercase mt-1.5">
              Mempelai Pria
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-xs leading-relaxed">
              Putra Kedua dari<br />
              <strong className="text-[#0B192C] font-semibold">{WEDDING_DATA.groom.fatherName}</strong><br />
              &amp; <strong className="text-[#0B192C] font-semibold">{WEDDING_DATA.groom.motherName}</strong>
            </p>

            {WEDDING_DATA.groom.instagram && (
              <a
                href={WEDDING_DATA.groom.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFDF9] border border-[#0B192C]/20 text-xs text-[#0B192C] hover:bg-[#1E3E62]/10 hover:border-[#0B192C]/40 transition-all cursor-pointer shadow-md"
              >
                <Camera className="w-3.5 h-3.5 text-[#1E3E62]" />
                <span>@{WEDDING_DATA.groom.name.toLowerCase()}</span>
              </a>
            )}
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full p-2 bg-gradient-to-tr from-[#0B192C] via-[#1E3E62] to-[#0B192C] shadow-[0_10px_35px_rgba(11,25,44,0.15)] mb-6 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_15px_45px_rgba(11,25,44,0.25)]">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#FAF7F2]">
                <Image
                  src={WEDDING_DATA.bride.photoUrl}
                  alt={WEDDING_DATA.bride.fullName}
                  fill
                  sizes="(max-width: 768px) 192px, 240px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            <h3 className="font-serif-custom text-2xl sm:text-3xl font-semibold navy-gradient-text">
              {WEDDING_DATA.bride.fullName}
            </h3>
            <p className="text-xs text-[#1E3E62] font-medium tracking-[0.2em] uppercase mt-1.5">
              Mempelai Wanita
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-xs leading-relaxed">
              Putri Pertama dari<br />
              <strong className="text-[#0B192C] font-semibold">{WEDDING_DATA.bride.fatherName}</strong><br />
              &amp; <strong className="text-[#0B192C] font-semibold">{WEDDING_DATA.bride.motherName}</strong>
            </p>

            {WEDDING_DATA.bride.instagram && (
              <a
                href={WEDDING_DATA.bride.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFDF9] border border-[#0B192C]/20 text-xs text-[#0B192C] hover:bg-[#1E3E62]/10 hover:border-[#0B192C]/40 transition-all cursor-pointer shadow-md"
              >
                <Camera className="w-3.5 h-3.5 text-[#1E3E62]" />
                <span>@{WEDDING_DATA.bride.name.toLowerCase()}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
