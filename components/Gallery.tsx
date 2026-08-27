'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

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
    <section id="gallery" className="py-24 px-6 bg-[#070709] text-amber-50 relative border-t border-amber-500/15 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
            Galeri Foto
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-amber-100 font-normal">
            Momen Bahagia
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {WEDDING_DATA.gallery.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-48 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-amber-500/30 shadow-xl hover:border-amber-400 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-500"
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs text-amber-300 font-medium inline-flex items-center gap-1.5 uppercase tracking-wider">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  Lihat Foto
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-300 hover:bg-amber-400 hover:text-zinc-950 transition-colors cursor-pointer z-50 shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-300 hover:bg-amber-400 hover:text-zinc-950 transition-colors cursor-pointer z-50 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-300 hover:bg-amber-400 hover:text-zinc-950 transition-colors cursor-pointer z-50 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center p-2">
            <div className="relative w-full h-[75vh] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <Image
                src={WEDDING_DATA.gallery[activeImageIndex].url}
                alt={WEDDING_DATA.gallery[activeImageIndex].title}
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-xs text-amber-300 uppercase tracking-[0.2em] font-medium">
              {activeImageIndex + 1} / {WEDDING_DATA.gallery.length} — {WEDDING_DATA.gallery[activeImageIndex].title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

