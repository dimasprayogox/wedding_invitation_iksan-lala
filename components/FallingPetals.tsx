'use client';

import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export const FallingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate 20 floating golden petals and glittering particles
    const generatedPetals: Petal[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 8,
      duration: Math.random() * 8 + 7,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
    }));

    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-80 animate-petal-fall"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.5}px`,
            background: 'linear-gradient(135deg, rgba(255, 235, 150, 0.9), rgba(212, 175, 55, 0.75), rgba(170, 119, 28, 0.6))',
            borderRadius: '50% 0% 50% 50%',
            filter: 'blur(0.4px)',
            boxShadow: '0 0 12px rgba(212, 175, 55, 0.5)',
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

