'use client';

import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  type: 'navy' | 'cream' | 'flower';
}

export const FallingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Optimize count based on device (8 petals for mobile, 12 for desktop)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 8 : 12;

    const types: ('navy' | 'cream' | 'flower')[] = ['navy', 'cream', 'flower', 'navy', 'cream'];
    const generatedPetals: Petal[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.random() * 12 + 10,
      duration: Math.random() * 8 + 9,
      delay: Math.random() * 6,
      rotation: Math.random() * 360,
      type: types[i % types.length],
    }));

    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => {
        if (petal.type === 'flower') {
          return (
            <div
              key={petal.id}
              className="absolute animate-petal-fall opacity-40 will-change-transform"
              style={{
                left: `${petal.left}%`,
                width: `${petal.size * 1.3}px`,
                height: `${petal.size * 1.3}px`,
                animationDuration: `${petal.duration}s`,
                animationDelay: `${petal.delay}s`,
                transform: `rotate(${petal.rotation}deg)`,
              }}
            >
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-[#1E3E62]">
                <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.6" />
                <circle cx="20" cy="10" r="6" fill="currentColor" opacity="0.4" />
                <circle cx="20" cy="30" r="6" fill="currentColor" opacity="0.4" />
                <circle cx="10" cy="20" r="6" fill="currentColor" opacity="0.4" />
                <circle cx="30" cy="20" r="6" fill="currentColor" opacity="0.4" />
              </svg>
            </div>
          );
        }

        const isCream = petal.type === 'cream';
        return (
          <div
            key={petal.id}
            className="absolute animate-petal-fall opacity-60 will-change-transform"
            style={{
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size * 1.5}px`,
              backgroundColor: isCream ? '#EFE8D8' : '#1E3E62',
              borderRadius: '50% 0% 50% 50%',
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              transform: `rotate(${petal.rotation}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};
