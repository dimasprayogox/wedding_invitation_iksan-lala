'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User, Loader2 } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { GuestWish } from '@/types/wedding';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { FloralBackgroundBotanical, FloralDivider } from '@/components/FloralDecorations';

interface GuestWishesProps {
  initialGuestName?: string;
}

export const GuestWishes: React.FC<GuestWishesProps> = ({ initialGuestName = '' }) => {
  const [wishes, setWishes] = useState<GuestWish[]>(WEDDING_DATA.initialWishes);
  const [name, setName] = useState(initialGuestName);
  const [relation, setRelation] = useState('Sahabat');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialGuestName) {
      setName(initialGuestName);
    }
  }, [initialGuestName]);

  // Fetch initial wishes from Supabase & Subscribe to Realtime inserts
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    const fetchWishes = async () => {
      const { data, error } = await client
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const formatted: GuestWish[] = data.map((item) => ({
          id: item.id,
          name: item.name,
          relation: item.relation || 'Tamu Undangan',
          message: item.message,
          attendance: item.attendance || 'hadir',
          createdAt: new Date(item.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }));
        setWishes(formatted);
      }
    };

    fetchWishes();

    // Subscribe to realtime insert events
    const channel = client
      .channel('public:wishes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          const newItem = payload.new;
          const newWish: GuestWish = {
            id: newItem.id,
            name: newItem.name,
            relation: newItem.relation || 'Tamu Undangan',
            message: newItem.message,
            attendance: newItem.attendance || 'hadir',
            createdAt: 'Baru saja',
          };
          setWishes((prev) => [newWish, ...prev.filter((w) => w.id !== newWish.id)]);
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, []);

  const handleAddWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const newWishObj: GuestWish = {
      id: Date.now().toString(),
      name: name.trim(),
      relation: relation.trim() || 'Tamu Undangan',
      message: message.trim(),
      attendance: 'hadir',
      createdAt: 'Baru saja',
    };

    try {
      const client = supabase;
      if (isSupabaseConfigured && client) {
        const { error } = await client.from('wishes').insert([
          {
            name: newWishObj.name,
            relation: newWishObj.relation,
            message: newWishObj.message,
            attendance: newWishObj.attendance,
          },
        ]);

        if (error) throw error;
      } else {
        setWishes([newWishObj, ...wishes]);
      }

      setMessage('');
    } catch (err: unknown) {
      console.error('Failed to submit wish:', err);
      const msg = err instanceof Error ? err.message : 'Gagal mengirim ucapan. Silakan coba lagi.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="py-24 px-6 bg-[#FAF7F2] text-[#0B192C] relative border-t border-[#0B192C]/10 overflow-hidden">
      {/* Background Floral Ornaments */}
      <FloralBackgroundBotanical />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1E3E62] font-semibold">
            Buku Tamu &amp; Doa Restu
          </span>
          <h2 className="font-serif-custom text-3xl sm:text-5xl text-[#0B192C] font-normal">
            Ucapan &amp; Doa
          </h2>
          <FloralDivider />
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-light">
            Berikan ucapan hangat dan doa terbaik Anda untuk kedua mempelai.
          </p>
        </div>

        {/* Input Form Card */}
        <form
          onSubmit={handleAddWish}
          className="p-6 sm:p-8 rounded-3xl glass-card border border-[#0B192C]/15 shadow-xl space-y-5"
        >
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs text-center">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E3E62] uppercase tracking-wider">Nama Anda</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap..."
                className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#0B192C]/20 text-[#0B192C] placeholder-slate-400 text-xs focus:outline-none focus:border-[#0B192C]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E3E62] uppercase tracking-wider">Hubungan / Sebagai</label>
              <input
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="Contoh: Teman SMA, Rekan Kerja, Saudara..."
                className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#0B192C]/20 text-[#0B192C] placeholder-slate-400 text-xs focus:outline-none focus:border-[#0B192C]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1E3E62] uppercase tracking-wider">Ucapan &amp; Doa Restu</label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa terbaik..."
              className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#0B192C]/20 text-[#0B192C] placeholder-slate-400 text-xs focus:outline-none focus:border-[#0B192C]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full shimmer-button text-[#FAF7F2] font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#0B192C]/20 hover:scale-[1.01] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#FAF7F2]" />
            ) : (
              <Send className="w-4 h-4 text-[#FAF7F2]" />
            )}
            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}</span>
          </button>
        </form>

        {/* Wishes List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3E62] uppercase tracking-widest pb-2">
            <MessageCircle className="w-4 h-4 text-[#1E3E62]" />
            <span>{wishes.length} Ucapan Terkirim</span>
          </div>

          {wishes.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl glass-card border border-[#0B192C]/15 space-y-2 hover:border-[#0B192C]/30 transition-colors shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#0B192C]/20 flex items-center justify-center text-[#1E3E62] shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-[#0B192C] block">
                      {item.name}
                    </strong>
                    <span className="text-[11px] text-[#1E3E62] font-medium">
                      {item.relation}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-mono">
                  {item.createdAt}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed pt-1 pl-12 font-light">
                &ldquo;{item.message}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
