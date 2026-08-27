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
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[95%] sm:w-auto px-5 py-2.5 rounded-full glass-card border border-amber-500/40 bg-zinc-950/90 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
      <ul className="flex items-center justify-between gap-2 sm:gap-6 text-zinc-400">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <li key={idx}>
              <a
                href={item.href}
                className="flex flex-col items-center gap-1 p-1.5 text-zinc-400 hover:text-amber-300 transition-colors group cursor-pointer"
                title={item.label}
              >
                <Icon className="w-4 h-4 text-amber-400/80 group-hover:text-amber-300 group-hover:scale-110 transition-all duration-300" />
                <span className="text-[9px] font-medium uppercase tracking-wider hidden sm:inline group-hover:text-amber-200">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

