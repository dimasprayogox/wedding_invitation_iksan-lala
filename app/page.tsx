'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CoverOverlay } from '@/components/CoverOverlay';
import { Hero } from '@/components/Hero';
import { CoupleProfile } from '@/components/CoupleProfile';
import { Countdown } from '@/components/Countdown';
import { EventDetails } from '@/components/EventDetails';
import { MapsLocation } from '@/components/MapsLocation';
import { LoveStory } from '@/components/LoveStory';
import { Gallery } from '@/components/Gallery';
import { WeddingGift } from '@/components/WeddingGift';
import { RsvpForm } from '@/components/RsvpForm';
import { GuestWishes } from '@/components/GuestWishes';
import { MusicPlayer } from '@/components/MusicPlayer';
import { BottomNav } from '@/components/BottomNav';
import { FallingPetals } from '@/components/FallingPetals';
import { WEDDING_DATA } from '@/data/weddingData';

function MainInvitationContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || searchParams.get('tamu') || searchParams.get('name') || '';

  const [isOpenCover, setIsOpenCover] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpenCover(true);
    setIsPlayingMusic(true);
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-amber-50 selection:bg-amber-500 selection:text-zinc-950 font-sans overflow-x-hidden">
      {/* Cover Overlay Modal */}
      <CoverOverlay
        guestName={guestName}
        isOpen={isOpenCover}
        onOpen={handleOpenInvitation}
      />

      {/* Falling Flower Petals Background */}
      {isOpenCover && <FallingPetals />}

      {/* Main Content Sections */}
      {isOpenCover && (
        <>
          <main className="animate-fade-in-up pb-28">
            <Hero />
            <CoupleProfile />
            <Countdown />
            <EventDetails />
            <MapsLocation />
            <LoveStory />
            <Gallery />
            <WeddingGift />
            <RsvpForm initialName={guestName} />
            <GuestWishes initialGuestName={guestName} />

            {/* Footer */}
            <footer className="py-12 px-6 bg-zinc-950 border-t border-amber-500/10 text-center space-y-4 text-xs text-zinc-500">
              <h3 className="font-cursive text-4xl text-amber-300 drop-shadow">
                {WEDDING_DATA.groom.name} &amp; {WEDDING_DATA.bride.name}
              </h3>
              <p>Terima Kasih Atas Kehadiran &amp; Doa Restu Bapak/Ibu/Saudara/i</p>
              <p className="text-[10px] text-zinc-600">
                Dimas Prayogo &copy; {new Date().getFullYear()} •{' '}
              </p>

            </footer>
          </main>

          {/* Floating Action Elements - Fixed to Viewport */}
          <MusicPlayer
            isPlaying={isPlayingMusic}
            onToggle={() => setIsPlayingMusic(!isPlayingMusic)}
            onStop={() => setIsPlayingMusic(false)}
          />
          <BottomNav />
        </>
      )}

    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-amber-300 font-serif-custom">
        Loading Wedding Invitation...
      </div>
    }>
      <MainInvitationContent />
    </Suspense>
  );
}
