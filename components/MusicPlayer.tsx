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
      <div className="fixed bottom-20 sm:bottom-8 right-6 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-[#F2F7FA]/90 backdrop-blur-xl border border-[#0B192C]/20 shadow-[0_10px_35px_rgba(11,25,44,0.15)] hover:border-[#0B192C]/40 transition-all duration-300">
        {/* Play / Pause Button */}
        <button
          onClick={onToggle}
          title={isPlaying ? 'Jeda Musik (Pause)' : 'Putar Musik (Play)'}
          className={`p-3 rounded-full transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'shimmer-button text-[#FAF7F2] border-[#0B192C] shadow-[0_0_20px_rgba(11,25,44,0.3)] scale-105'
              : 'bg-[#FFFDF9] text-[#1E3E62] border border-[#0B192C]/20 hover:border-[#0B192C] hover:text-[#0B192C]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-[#FAF7F2]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FAF7F2] animate-ping" />
              </>
            ) : (
              <Play className="w-4 h-4 ml-0.5 text-[#1E3E62]" />
            )}
          </div>
        </button>

        {/* Stop Button */}
        <button
          onClick={handleStop}
          title="Hentikan Musik (Stop & Reset)"
          className="p-3 rounded-full bg-[#FFFDF9] text-[#1E3E62] border border-[#0B192C]/20 hover:border-[#0B192C] hover:text-[#0B192C] hover:bg-[#F4EFE6] transition-all duration-300 cursor-pointer"
        >
          <Square className="w-4 h-4 fill-current" />
        </button>
      </div>
    </>
  );
};
