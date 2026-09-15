'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralBackgroundLaurel, FloralDivider } from '@/components/FloralDecorations';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const target = new Date(WEDDING_DATA.targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveCalendar = () => {
    const startDate = new Date(WEDDING_DATA.targetDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(new Date(WEDDING_DATA.targetDate).getTime() + 5 * 3600 * 1000)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");
    
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Pernikahan ${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name}`
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      `Undangan Pernikahan ${WEDDING_DATA.groom.fullName} & ${WEDDING_DATA.bride.fullName}`
    )}&location=${encodeURIComponent(WEDDING_DATA.events.resepsi.venue)}`;

    window.open(calUrl, '_blank');
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#F2F7FA] via-[#f9fdff] to-[#E7EFF5] text-[#0B192C] border-y border-[#0B192C]/10 relative overflow-hidden">
      {/* Background Floral Ornaments */}
      <FloralBackgroundLaurel />

      {/* Soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#1E3E62]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1E3E62] font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#1E3E62]" />
            <span>Hitung Mundur Acara</span>
          </div>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-[#0B192C] font-normal">
            Menuju Hari Bahagia
          </h2>
          <FloralDivider />
        </div>

        {/* Timer Box Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {[
            { label: 'Hari', value: isClient ? timeLeft.days : 0 },
            { label: 'Jam', value: isClient ? timeLeft.hours : 0 },
            { label: 'Menit', value: isClient ? timeLeft.minutes : 0 },
            { label: 'Detik', value: isClient ? timeLeft.seconds : 0 }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card border border-[#0B192C]/15 flex flex-col items-center justify-center shadow-lg hover:border-[#0B192C]/30 transition-all duration-300"
            >
              <span className="font-serif-custom text-4xl sm:text-5xl font-bold navy-gradient-text">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#1E3E62] mt-2 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveCalendar}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full shimmer-button text-[#FAF7F2] text-xs sm:text-sm font-extrabold hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl shadow-[#0B192C]/20 uppercase tracking-wider"
        >
          <Calendar className="w-4 h-4 text-[#FAF7F2]" />
          <span>Simpan Ke Google Calendar</span>
        </button>
      </div>
    </section>
  );
};
