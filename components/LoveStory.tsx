'use client';

import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

export const LoveStory: React.FC = () => {
  return (
    <section id="story" className="py-24 px-6 bg-[#0a0a0d] text-amber-50 relative border-t border-amber-500/15 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
            Kisah Cinta Kami
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-amber-100 font-normal">
            Perjalanan Cinta
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
        </div>

        <div className="relative border-l-2 border-amber-500/35 ml-4 sm:ml-32 space-y-12">
          {WEDDING_DATA.loveStory.map((story, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Dot Icon */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-zinc-950 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>

              {/* Story Content Card */}
              <div className="p-6 sm:p-8 rounded-2xl glass-card border border-amber-500/30 shadow-xl space-y-4 hover:border-amber-400/60 transition-all duration-300">
                <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-zinc-950 via-[#684b0f] to-zinc-950 border border-amber-400/40 text-amber-200 text-xs font-bold tracking-wider uppercase shadow-md">
                  {story.year}
                </span>

                <h3 className="font-serif-custom text-xl sm:text-2xl font-semibold gold-gradient-text">
                  {story.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {story.description}
                </p>

                {story.image && (
                  <div className="relative w-full h-48 sm:h-60 rounded-xl overflow-hidden mt-4 border border-amber-500/30 shadow-lg">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

