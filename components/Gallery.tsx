'use client';

import React from 'react';
import Image from 'next/image';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralDivider } from '@/components/FloralDecorations';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export const Gallery: React.FC = () => {

  return (
    <section id="gallery" className="py-24 px-6 bg-gradient-to-b from-[#E7EFF5] via-[#f9fdff] to-[#F2F7FA] text-[#0B192C] relative border-t border-[#0B192C]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <RevealOnScroll className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1E3E62] font-semibold">
            Galeri Foto
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-[#0B192C] font-normal">
            Momen Bahagia
          </h2>
          <FloralDivider />
        </RevealOnScroll>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {WEDDING_DATA.gallery.map((img, idx) => (
            <RevealOnScroll key={img.id} delayMs={(idx % 3) * 120}>
              <div
                className="group relative h-48 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-[#0B192C]/15 shadow-md hover:border-[#0B192C]/40 hover:shadow-xl transition-all duration-500"
              >
                <Image
                  src="/1.webp"
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-[#0B192C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                 
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

     
    </section>
  );
};
