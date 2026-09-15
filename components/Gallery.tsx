'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralBackgroundMeadow, FloralDivider } from '@/components/FloralDecorations';

export const Gallery: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setActiveImageIndex(index);
  const closeLightbox = () => setActiveImageIndex(null);

  const prevImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + WEDDING_DATA.gallery.length) % WEDDING_DATA.gallery.length);
    }
  };

  const nextImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % WEDDING_DATA.gallery.length);
    }
  };

  return (
    <section id="gallery" className="py-24 px-6 bg-gradient-to-b from-[#E7EFF5] via-[#f9fdff] to-[#F2F7FA] text-[#0B192C] relative border-t border-[#0B192C]/10 overflow-hidden">
      {/* Background Floral Ornaments */}
      <FloralBackgroundMeadow />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1E3E62] font-semibold">
            Galeri Foto
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-[#0B192C] font-normal">
            Momen Bahagia
          </h2>
          <FloralDivider />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {WEDDING_DATA.gallery.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-48 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-[#0B192C]/15 shadow-md hover:border-[#0B192C]/40 hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-[#0B192C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs text-[#FAF7F2] font-medium inline-flex items-center gap-1.5 uppercase tracking-wider">
                  <Maximize2 className="w-3.5 h-3.5 text-[#FAF7F2]" />
                  Lihat Foto
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#0B192C]/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#1E3E62] border border-[#FAF7F2]/20 text-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#0B192C] transition-colors cursor-pointer z-50 shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-[#1E3E62] border border-[#FAF7F2]/20 text-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#0B192C] transition-colors cursor-pointer z-50 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-[#1E3E62] border border-[#FAF7F2]/20 text-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#0B192C] transition-colors cursor-pointer z-50 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center p-2">
            <div className="relative w-full h-[75vh] rounded-2xl overflow-hidden border border-[#FAF7F2]/20 shadow-2xl">
              <Image
                src={WEDDING_DATA.gallery[activeImageIndex].url}
                alt={WEDDING_DATA.gallery[activeImageIndex].title}
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-xs text-[#FAF7F2] uppercase tracking-[0.2em] font-medium">
              {activeImageIndex + 1} / {WEDDING_DATA.gallery.length} — {WEDDING_DATA.gallery[activeImageIndex].title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
