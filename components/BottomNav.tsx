'use client';

import React from 'react';
import { Home, Users, Calendar, MapPin, Image as ImageIcon, Gift, CheckSquare, MessageCircle } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navItems = [
    { label: 'Utama', href: '#hero', icon: Home },
    { label: 'Mempelai', href: '#couple', icon: Users },
    { label: 'Acara', href: '#event', icon: Calendar },
    { label: 'Lokasi', href: '#location', icon: MapPin },
    { label: 'Galeri', href: '#gallery', icon: ImageIcon },
    { label: 'Hadiah', href: '#gift', icon: Gift },
    { label: 'RSVP', href: '#rsvp', icon: CheckSquare },
    { label: 'Ucapan', href: '#wishes', icon: MessageCircle },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-3xl w-[95%] sm:w-auto px-4 sm:px-6 py-2.5 rounded-full glass-card border border-[#0B192C]/20 bg-[#FAF7F2]/90 backdrop-blur-xl shadow-[0_10px_35px_rgba(11,25,44,0.15)]">
      <ul className="flex items-center justify-between gap-1 sm:gap-4 md:gap-5 text-slate-600">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <li key={idx}>
              <a
                href={item.href}
                className="flex flex-col items-center gap-1 p-1 sm:px-2 text-slate-600 hover:text-[#0B192C] transition-colors group cursor-pointer"
                title={item.label}
              >
                <Icon className="w-4 h-4 text-[#1E3E62] group-hover:text-[#0B192C] group-hover:scale-110 transition-all duration-300" />
                <span className="text-[9px] font-medium uppercase tracking-wider hidden sm:inline whitespace-nowrap group-hover:text-[#0B192C]">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
