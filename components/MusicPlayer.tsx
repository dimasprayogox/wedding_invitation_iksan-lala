'use client';

import React, { useRef, useEffect } from 'react';
import { Pause, Play, Square } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  onStop: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle, onStop }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Auto-play policy standard browser fallback
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onStop();
  };

  return (
    <>
      <audio ref={audioRef} src={WEDDING_DATA.musicUrl} loop preload="auto" />

      {/* Fixed Floating Control Pod */}
      <div className="fixed bottom-20 sm:bottom-8 right-6 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-zinc-950/90 backdrop-blur-xl border border-amber-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.9)] hover:border-amber-400/60 transition-all duration-300">
        {/* Play / Pause Button */}
        <button
          onClick={onToggle}
          title={isPlaying ? 'Jeda Musik (Pause)' : 'Putar Musik (Play)'}
          className={`p-3 rounded-full transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'shimmer-button text-zinc-950 border-amber-300 shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-105'
              : 'bg-zinc-900 text-amber-400 border border-amber-500/30 hover:border-amber-300 hover:text-amber-200'
          }`}
        >
          <div className="relative flex items-center justify-center">
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-zinc-950" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-200 animate-ping" />
              </>
            ) : (
              <Play className="w-4 h-4 ml-0.5 text-amber-400" />
            )}
          </div>
        </button>

        {/* Stop Button */}
        <button
          onClick={handleStop}
          title="Hentikan Musik (Stop & Reset)"
          className="p-3 rounded-full bg-zinc-900 text-amber-400/80 border border-amber-500/30 hover:border-amber-400 hover:text-amber-300 hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
        >
          <Square className="w-4 h-4 fill-current" />
        </button>
      </div>
    </>
  );
};



