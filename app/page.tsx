'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CoverOverlay } from '@/components/CoverOverlay';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Hero } from '@/components/Hero';
import { CoupleProfile } from '@/components/CoupleProfile';
import { Countdown } from '@/components/Countdown';
import { EventDetails } from '@/components/EventDetails';
import { MapsLocation } from '@/components/MapsLocation';
import { Gallery } from '@/components/Gallery';
import { WeddingGift } from '@/components/WeddingGift';
import { RsvpForm } from '@/components/RsvpForm';
import { GuestWishes } from '@/components/GuestWishes';
import { MusicPlayer } from '@/components/MusicPlayer';
import { BottomNav } from '@/components/BottomNav';
import { FallingPetals } from '@/components/FallingPetals';
import { FloralDivider } from '@/components/FloralDecorations';
import { WEDDING_DATA } from '@/data/weddingData';
import { prepareMainContentAssets } from '@/lib/preload';

function MainInvitationContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || searchParams.get('tamu') || searchParams.get('name') || '';

  const [isOpenCover, setIsOpenCover] = useState(false);
  const [isLoadingMain, setIsLoadingMain] = useState(false);
  const [isFadingOutLoading, setIsFadingOutLoading] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleOpenInvitation = async () => {
    if (isLoadingMain || isOpenCover) return;

    setIsLoadingMain(true);

    try {
      // Preload initial viewport (Hero) assets & fonts with safety fallback timeout
      await prepareMainContentAssets(2500, 700);
    } catch {
      // Ignore errors and proceed to reveal content
    }

    // Reveal main content and fade out loading screen
    setIsOpenCover(true);
    setIsFadingOutLoading(true);

    // Play music after click and main content preparation
    setIsPlayingMusic(true);

    timeoutRef.current = setTimeout(() => {
      setIsLoadingMain(false);
      setIsFadingOutLoading(false);
    }, 700);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#E7EFF5] via-[#f9fdff] to-[#F2F7FA] text-[#162443] selection:bg-[#4E6A91] selection:text-white font-sans overflow-x-hidden">
      {/* Cover Overlay Modal */}
      <CoverOverlay
        guestName={guestName}
        isOpen={isOpenCover}
        isLoading={isLoadingMain}
        onOpen={handleOpenInvitation}
      />

      {/* Loading & Transition Screen */}
      <LoadingScreen
        isVisible={isLoadingMain}
        isFadingOut={isFadingOutLoading}
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
            <Gallery />
            <WeddingGift />
            <RsvpForm initialName={guestName} />
            <GuestWishes initialGuestName={guestName} />

            {/* Footer */}
            <footer className="py-3 px-3 bg-gradient-to-b from-[#E7EFF5] via-[#f9fdff] to-[#F2F7FA] border-t border-[#162443]/10 text-center space-y-2 text-xs text-[#4E6A91] relative overflow-hidden">
              <FloralDivider />
              <h3 className="font-cursive text-4xl text-[#162443] drop-shadow-sm">
                {WEDDING_DATA.groom.name} &amp; {WEDDING_DATA.bride.name}
              </h3>
              <p className="text-[#4E6A91]">Terima Kasih Atas Kehadiran &amp; Doa Restu Bapak/Ibu/Saudara/i</p>
              <p className="text-[10px] text-[#94AAC6]">
                Dimas Prayogo &copy; {new Date().getFullYear()}
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-[#F2F7FA] via-[#f9fdff] to-[#E7EFF5] flex items-center justify-center text-[#162443] font-serif-custom">
          Loading Wedding Invitation...
        </div>
      }
    >
      <MainInvitationContent />
    </Suspense>
  );
}
