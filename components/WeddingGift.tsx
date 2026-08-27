'use client';

import React, { useState } from 'react';
import { Gift, CreditCard, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DATA } from '@/data/weddingData';

export const WeddingGift: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ffd700', '#d4af37', '#aa771c', '#ffffff']
    });

    setTimeout(() => {
      setCopiedAccount(null);
    }, 3000);
  };

  return (
    <section id="gift" className="py-24 px-6 bg-[#0a0a0d] text-amber-50 relative border-t border-amber-500/15 overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
            Tanda Kasih
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-amber-100 font-normal">
            Amplop Digital
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed font-light">
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberi hadiah, kami menyediakan Amplop Digital di bawah ini:
          </p>
        </div>

        {/* Bank Account Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {WEDDING_DATA.bankAccounts.map((acc, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl glass-card border border-amber-500/30 shadow-2xl flex flex-col justify-between space-y-5 hover:border-amber-400/60 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-300 tracking-wider">
                  {acc.bankName}
                </span>
                <CreditCard className="w-6 h-6 text-amber-400" />
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em]">Nomor Rekening</p>
                <p className="font-serif-custom text-2xl sm:text-3xl font-bold tracking-widest gold-gradient-text">
                  {acc.accountNumber}
                </p>
                <p className="text-xs text-amber-200/90 font-medium pt-1">
                  a.n {acc.accountName}
                </p>
              </div>

              <button
                onClick={() => handleCopy(acc.accountNumber)}
                className="w-full py-3 rounded-full bg-zinc-950 border border-amber-400/40 text-xs font-semibold text-amber-300 hover:bg-amber-400 hover:text-zinc-950 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md uppercase tracking-wider"
              >
                {copiedAccount === acc.accountNumber ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">Nomor Rekening Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Nomor Rekening</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Gift Address Box */}
        <div className="p-7 sm:p-9 rounded-3xl glass-card border border-amber-500/30 shadow-2xl text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-zinc-950 border border-amber-400/40 flex items-center justify-center mx-auto text-amber-400 shadow-md">
            <Gift className="w-5 h-5" />
          </div>
          <h3 className="font-serif-custom text-xl sm:text-2xl gold-gradient-text font-semibold">
            Kirim Hadiah Fisik
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            Penerima: <strong className="text-amber-200 font-semibold">{WEDDING_DATA.giftAddress.recipient}</strong> ({WEDDING_DATA.giftAddress.phone})<br />
            Alamat: {WEDDING_DATA.giftAddress.address}
          </p>
          <button
            onClick={() => handleCopy(`${WEDDING_DATA.giftAddress.recipient} - ${WEDDING_DATA.giftAddress.address} (${WEDDING_DATA.giftAddress.phone})`)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 text-xs text-amber-300 border border-amber-400/40 hover:bg-amber-400 hover:text-zinc-950 transition-all duration-300 cursor-pointer uppercase tracking-wider font-semibold shadow-md"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Salin Alamat Pengiriman</span>
          </button>
        </div>
      </div>
    </section>
  );
};

