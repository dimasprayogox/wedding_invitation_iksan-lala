'use client';

import React, { useState } from 'react';
import { CreditCard, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralDivider } from '@/components/FloralDecorations';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export const WeddingGift: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#0b192c', '#1e3e62', '#2d4f7c', '#faf7f2']
    });

    setTimeout(() => {
      setCopiedAccount(null);
    }, 3000);
  };

  return (
    <section id="gift" className="py-24 px-6 bg-gradient-to-b from-[#F2F7FA] via-[#f9fdff] to-[#E7EFF5] text-[#0B192C] relative border-t border-[#0B192C]/10 overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <RevealOnScroll className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1E3E62] font-semibold">
            Tanda Kasih
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-[#0B192C] font-normal">
            Amplop Digital
          </h2>
          <FloralDivider />
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed font-light">
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberi hadiah, kami menyediakan Amplop Digital di bawah ini:
          </p>
        </RevealOnScroll>

        {/* Bank Account Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {WEDDING_DATA.bankAccounts.map((acc, idx) => (
            <RevealOnScroll key={idx} delayMs={idx * 150}>
              <div
                className="p-7 rounded-3xl glass-card border border-[#0B192C]/15 shadow-xl flex flex-col justify-between space-y-5 hover:border-[#0B192C]/30 transition-all duration-300 relative overflow-hidden h-full"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1E3E62] tracking-wider">
                    {acc.bankName}
                  </span>
                  <CreditCard className="w-6 h-6 text-[#1E3E62]" />
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Nomor Rekening</p>
                  <p className="font-serif-custom text-2xl sm:text-3xl font-bold tracking-widest navy-gradient-text">
                    {acc.accountNumber}
                  </p>
                  <p className="text-xs text-[#0B192C] font-medium pt-1">
                    a.n {acc.accountName}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(acc.accountNumber)}
                  className="w-full py-3 rounded-full bg-[#FFFDF9] border border-[#0B192C]/20 text-xs font-semibold text-[#0B192C] hover:bg-[#0B192C] hover:text-[#FAF7F2] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm uppercase tracking-wider"
                >
                  {copiedAccount === acc.accountNumber ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Nomor Rekening Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#1E3E62]" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
