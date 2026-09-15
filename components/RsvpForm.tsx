'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, UserCheck, Users, MessageSquare, Send, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { FloralBackgroundGeometric, FloralDivider } from '@/components/FloralDecorations';

interface RsvpFormProps {
  initialName?: string;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ initialName = '' }) => {
  const [name, setName] = useState(initialName);
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialName) {
      setName(initialName);
    }
  }, [initialName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('rsvps').insert([
          {
            name: name.trim(),
            attendance,
            guest_count: attendance === 'hadir' ? guestCount : 0,
            notes: notes.trim() || null,
          },
        ]);

        if (error) throw error;
      }

      setIsSubmitted(true);

      if (attendance === 'hadir') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#162443', '#344a70', '#4e6a91', '#94aac6', '#d8e4ee'],
        });
      }
    } catch (err: unknown) {
      console.error('Failed to submit RSVP:', err);
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan konfirmasi. Silakan coba lagi.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-6 bg-gradient-to-b from-[#E7EFF5] via-[#f9fdff] to-[#F2F7FA] text-[#162443] relative border-t border-[#162443]/10 overflow-hidden">
      {/* Background Floral Ornaments */}
      <FloralBackgroundGeometric />

      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#4E6A91] font-semibold">
            Konfirmasi Kehadiran
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-[#162443] font-normal">
            Form RSVP
          </h2>
          <FloralDivider />
          <p className="text-xs sm:text-sm text-[#4E6A91] max-w-md mx-auto leading-relaxed font-light">
            Mohon konfirmasi kehadiran Anda untuk membantu kami menyiapkan katering dan tempat dengan baik.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-[#162443]/20 text-center space-y-4 shadow-xl">
            <CheckCircle2 className="w-14 h-14 text-[#4E6A91] mx-auto" />
            <h3 className="font-serif-custom text-2xl font-semibold navy-gradient-text">
              Konfirmasi Berhasil Terkirim!
            </h3>
            <p className="text-sm text-[#4E6A91] font-light">
              Terima kasih <strong className="text-[#162443] font-semibold">{name}</strong> atas respon konfirmasi kehadiran Anda.
            </p>
            <div className="inline-block px-5 py-2 rounded-full bg-[#F2F7FA] border border-[#162443]/20 text-[#162443] text-xs font-semibold uppercase tracking-wider">
              Status: {attendance === 'hadir' ? `Hadir (${guestCount} Orang)` : 'Tidak Dapat Hadir'}
            </div>
            <div className="pt-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[#4E6A91] underline hover:text-[#162443] cursor-pointer"
              >
                Ubah Konfirmasi Kehadiran
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl glass-card border border-[#162443]/15 shadow-xl space-y-6"
          >
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs text-center">
                {errorMessage}
              </div>
            )}

            {/* Input Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4E6A91] flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#4E6A91]" />
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda..."
                className="w-full px-4 py-3 rounded-xl bg-[#F2F7FA] border border-[#162443]/20 text-[#162443] placeholder-[#94AAC6] focus:outline-none focus:border-[#162443] text-sm transition-colors"
              />
            </div>

            {/* Attendance Status */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4E6A91]">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setAttendance('hadir')}
                  className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                    attendance === 'hadir'
                      ? 'shimmer-button text-white border-[#162443] font-extrabold shadow-lg shadow-[#162443]/20'
                      : 'bg-[#F2F7FA] border-[#162443]/20 text-[#4E6A91] hover:border-[#162443]/40 hover:text-[#162443]'
                  }`}
                >
                  Ya, Saya Akan Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('tidak_hadir')}
                  className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                    attendance === 'tidak_hadir'
                      ? 'bg-[#4E6A91] text-white border-[#162443] font-bold shadow-md'
                      : 'bg-[#F2F7FA] border-[#162443]/20 text-[#4E6A91] hover:border-[#162443]/40 hover:text-[#162443]'
                  }`}
                >
                  Maaf, Tidak Bisa Hadir
                </button>
              </div>
            </div>

            {/* Guest Count (If Hadir) */}
            {attendance === 'hadir' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4E6A91] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#4E6A91]" />
                  Jumlah Tamu Yang Hadir
                </label>

                <select
                  value={guestCount > 5 ? 'custom' : guestCount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'custom') {
                      setGuestCount(6);
                    } else {
                      setGuestCount(Number(val));
                    }
                  }}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F2F7FA] border border-[#162443]/20 text-[#162443] focus:outline-none focus:border-[#162443] text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <option value={1} className="bg-[#F2F7FA] text-[#162443] py-1">1 Orang</option>
                  <option value={2} className="bg-[#F2F7FA] text-[#162443] py-1">2 Orang</option>
                  <option value={3} className="bg-[#F2F7FA] text-[#162443] py-1">3 Orang</option>
                  <option value={4} className="bg-[#F2F7FA] text-[#162443] py-1">4 Orang</option>
                  <option value={5} className="bg-[#F2F7FA] text-[#162443] py-1">5 Orang</option>
                  <option value="custom" className="bg-[#F2F7FA] text-[#4E6A91] py-1 font-semibold">
                    Lainnya (Ketik Jumlah Manual)
                  </option>
                </select>

                {/* Manual Input if 'custom' / > 5 selected */}
                {guestCount > 5 && (
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-[#4E6A91] font-medium">Jumlah Tamu:</span>
                    <div className="flex items-center rounded-xl bg-[#F2F7FA] border border-[#162443]/20 p-1">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-8 h-8 rounded-lg bg-[#E7EFF5] text-[#162443] flex items-center justify-center text-sm font-bold hover:bg-[#162443] hover:text-white transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={guestCount}
                        onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center bg-transparent text-[#162443] font-bold text-sm focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setGuestCount(guestCount + 1)}
                        className="w-8 h-8 rounded-lg bg-[#E7EFF5] text-[#162443] flex items-center justify-center text-sm font-bold hover:bg-[#162443] hover:text-white transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-[#4E6A91] font-medium">Orang</span>
                  </div>
                )}
              </div>
            )}

            {/* Additional Notes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4E6A91] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#4E6A91]" />
                Pesan (Opsional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tuliskan catatan khusus..."
                className="w-full px-4 py-3 rounded-xl bg-[#F2F7FA] border border-[#162443]/20 text-[#162443] placeholder-[#94AAC6] focus:outline-none focus:border-[#162443] text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full shimmer-button text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#162443]/20 hover:scale-[1.01] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
              <span>{isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi RSVP'}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};