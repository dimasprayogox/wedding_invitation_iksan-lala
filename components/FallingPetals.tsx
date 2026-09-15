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
    // Generate 26 floating flower petals and blossoms
    const types: ('navy' | 'cream' | 'flower')[] = ['navy', 'cream', 'navy', 'flower', 'navy', 'cream'];
    const generatedPetals: Petal[] = Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 16 + 10,
      duration: Math.random() * 9 + 8,
      delay: Math.random() * 9,
      rotation: Math.random() * 360,
      type: types[i % types.length],
    }));

    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => {
        if (petal.type === 'flower') {
          return (
            <div
              key={petal.id}
              className="absolute animate-petal-fall opacity-40"
              style={{
                left: `${petal.left}%`,
                width: `${petal.size * 1.4}px`,
                height: `${petal.size * 1.4}px`,
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
            className="absolute animate-petal-fall opacity-65"
            style={{
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size * 1.6}px`,
              background: isCream
                ? 'linear-gradient(135deg, rgba(244, 239, 230, 0.9), rgba(212, 175, 55, 0.5))'
                : 'linear-gradient(135deg, rgba(30, 62, 98, 0.45), rgba(11, 25, 44, 0.6))',
              borderRadius: '50% 0% 50% 50%',
              filter: 'blur(0.3px)',
              boxShadow: isCream
                ? '0 0 10px rgba(212, 175, 55, 0.2)'
                : '0 0 10px rgba(11, 25, 44, 0.15)',
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
