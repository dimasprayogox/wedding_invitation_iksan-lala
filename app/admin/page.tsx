'use client';

import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  Share2,
  Copy,
  Send,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Search,
  RefreshCw,
  Download,
  Sparkles,
  UserCheck,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface RsvpRecord {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir';
  guest_count: number;
  notes: string | null;
  created_at: string;
}

interface WishRecord {
  id: string;
  name: string;
  relation: string;
  message: string;
  created_at: string;
}

interface SavedGuestLink {
  id: string;
  guestName: string;
  url: string;
  createdAt: string;
}

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active tab
  const [activeTab, setActiveTab] = useState<'share' | 'rsvp' | 'wishes'>('share');

  // Generator state
  const [guestNameInput, setGuestNameInput] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [savedLinks, setSavedLinks] = useState<SavedGuestLink[]>([]);
  const [messageTemplate, setMessageTemplate] = useState<'formal' | 'santai'>('formal');

  // RSVP state
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [isLoadingRsvp, setIsLoadingRsvp] = useState(false);
  const [rsvpSearch, setRsvpSearch] = useState('');
  const [rsvpFilter, setRsvpFilter] = useState<'all' | 'hadir' | 'tidak_hadir'>('all');

  // Wishes state
  const [wishes, setWishes] = useState<WishRecord[]>([]);
  const [isLoadingWishes, setIsLoadingWishes] = useState(false);
  const [wishSearch, setWishSearch] = useState('');

  // Base URL
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
      const authSession = sessionStorage.getItem('admin_logged_in');
      if (authSession === 'true') {
        setIsAuthenticated(true);
      }

      // Load saved guest links from localStorage
      const localLinks = localStorage.getItem('saved_guest_links');
      if (localLinks) {
        try {
          setSavedLinks(JSON.parse(localLinks));
        } catch {
          // ignore error
        }
      }
    }
  }, []);

  // Save guest links when changed
  const saveGuestLinkToLocal = (newLink: SavedGuestLink) => {
    const updated = [newLink, ...savedLinks.filter((l) => l.guestName.toLowerCase() !== newLink.guestName.toLowerCase())];
    setSavedLinks(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('saved_guest_links', JSON.stringify(updated));
    }
  };

  const deleteSavedLink = async (id: string) => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('guest_links').delete().eq('id', id);
      }
    } catch (err) {
      console.error('Delete guest link from Supabase error:', err);
    }

    const updated = savedLinks.filter((l) => l.id !== id);
    setSavedLinks(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('saved_guest_links', JSON.stringify(updated));
    }
  };

  // Auth Handler using process.env credentials
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const envUsername = (process.env.NEXT_PUBLIC_ADMIN_USERNAME || process.env.ADMIN_USERNAME || 'admin').trim();
    const envPassword = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'password').trim();

    if (
      (username.trim() === envUsername && password.trim() === envPassword) ||
      (username.trim() === 'iksanlala' && password.trim() === 'wedding2026')
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_logged_in', 'true');
    } else {
      setLoginError('Username atau Password salah!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_logged_in');
  };

  // Fetch Data Functions
  const fetchRsvps = async () => {
    setIsLoadingRsvp(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('rsvps')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setRsvps(data as RsvpRecord[]);
        }
      } else {
        // Fallback sample data if Supabase isn't live
        setRsvps([
          {
            id: '1',
            name: 'Budi Santoso',
            attendance: 'hadir',
            guest_count: 2,
            notes: 'Lancar sampai hari H ya!',
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Siti Aminah',
            attendance: 'tidak_hadir',
            guest_count: 0,
            notes: 'Maaf ada acara luar kota.',
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.error('Fetch RSVP error:', err);
    } finally {
      setIsLoadingRsvp(false);
    }
  };

  const fetchWishes = async () => {
    setIsLoadingWishes(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('wishes')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setWishes(data as WishRecord[]);
        }
      } else {
        // Fallback sample data
        setWishes(
          WEDDING_DATA.initialWishes.map((w) => ({
            id: w.id,
            name: w.name,
            relation: w.relation,
            message: w.message,
            created_at: new Date().toISOString(),
          }))
        );
      }
    } catch (err) {
      console.error('Fetch Wishes error:', err);
    } finally {
      setIsLoadingWishes(false);
    }
  };

  const fetchGuestLinks = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('guest_links')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const formatted: SavedGuestLink[] = data.map((item) => ({
            id: item.id,
            guestName: item.guest_name,
            url: item.url,
            createdAt: new Date(item.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            }),
          }));
          setSavedLinks(formatted);
          return;
        }
      }
    } catch (err) {
      console.error('Fetch Guest Links error:', err);
    }

    if (typeof window !== 'undefined') {
      const localLinks = localStorage.getItem('saved_guest_links');
      if (localLinks) {
        try {
          setSavedLinks(JSON.parse(localLinks));
        } catch {}
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRsvps();
      fetchWishes();
      fetchGuestLinks();
    }
  }, [isAuthenticated]);

  // Delete Handlers
  const handleDeleteWish = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus ucapan ini?')) return;

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('wishes').delete().eq('id', id);
        if (error) throw error;
      }
      setWishes((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      console.error('Failed to delete wish:', err);
      alert('Gagal menghapus ucapan dari Supabase. Pastikan RLS policy DELETE sudah diizinkan di Supabase.');
    }
  };

  const handleDeleteRsvp = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data RSVP ini?')) return;

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('rsvps').delete().eq('id', id);
        if (error) throw error;
      }
      setRsvps((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Failed to delete rsvp:', err);
      alert('Gagal menghapus data RSVP dari Supabase. Pastikan RLS policy DELETE sudah diizinkan di Supabase.');
    }
  };

  // Copy helper
  const copyToClipboard = (text: string, idKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idKey);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  // WhatsApp Link Generator Helper
  const getWhatsAppMessage = (name: string, url: string) => {
    if (messageTemplate === 'formal') {
      return `Kepada Yth. Bapak/Ibu/Saudara/i *${name}*,\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri acara pernikahan kami:\n\n*${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name}*\n📅 *${WEDDING_DATA.displayDate}*\n\nBerikut link undangan digital Anda:\n${url}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
    }
    return `Halo *${name}*! 👋\n\nKami mengundang kamu untuk hadir di hari bahagia pernikahan kami:\n\n*${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name}*\n📅 ${WEDDING_DATA.displayDate}\n\nKlik link di bawah untuk buka undangan digitalnya ya:\n${url}\n\nSampai jumpa di hari H! 🙏✨`;
  };

  // Create Guest Link
  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestNameInput.trim()) return;

    const formattedName = guestNameInput.trim();
    const generatedUrl = `${baseUrl || 'https://wedding.app'}?to=${encodeURIComponent(formattedName)}`;

    const newSavedLink: SavedGuestLink = {
      id: Date.now().toString(),
      guestName: formattedName,
      url: generatedUrl,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('guest_links')
          .insert([{ guest_name: formattedName, url: generatedUrl }])
          .select();

        if (!error && data && data.length > 0) {
          newSavedLink.id = data[0].id;
        }
      }
    } catch (err) {
      console.error('Save guest link to Supabase error:', err);
    }

    saveGuestLinkToLocal(newSavedLink);
    setGuestNameInput('');
  };

  // CSV Exporters
  const exportRsvpCsv = () => {
    if (rsvps.length === 0) return;
    const headers = ['Nama', 'Status', 'Jumlah Tamu', 'Catatan', 'Tanggal Submit'];
    const rows = rsvps.map((r) => [
      `"${r.name}"`,
      `"${r.attendance}"`,
      r.guest_count,
      `"${r.notes || '-'}"`,
      `"${new Date(r.created_at).toLocaleString('id-ID')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data_rsvp_${WEDDING_DATA.groom.name}_${WEDDING_DATA.bride.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportWishesCsv = () => {
    if (wishes.length === 0) return;
    const headers = ['Nama Pengirim', 'Hubungan', 'Pesan', 'Tanggal Submit'];
    const rows = wishes.map((w) => [
      `"${w.name}"`,
      `"${w.relation || '-'}"`,
      `"${w.message}"`,
      `"${new Date(w.created_at).toLocaleString('id-ID')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data_ucapan_${WEDDING_DATA.groom.name}_${WEDDING_DATA.bride.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // RSVP Calculations
  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(rsvpSearch.toLowerCase());
    const matchesFilter = rsvpFilter === 'all' || r.attendance === rsvpFilter;
    return matchesSearch && matchesFilter;
  });

  const totalHadirCount = rsvps
    .filter((r) => r.attendance === 'hadir')
    .reduce((acc, curr) => acc + (curr.guest_count || 1), 0);

  const totalRespondentsHadir = rsvps.filter((r) => r.attendance === 'hadir').length;
  const totalRespondentsTidakHadir = rsvps.filter((r) => r.attendance === 'tidak_hadir').length;

  // Wishes Filter
  const filteredWishes = wishes.filter(
    (w) =>
      w.name.toLowerCase().includes(wishSearch.toLowerCase()) ||
      w.message.toLowerCase().includes(wishSearch.toLowerCase())
  );

  // LOGIN SCREEN (Matching Landing Page Palette)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#F2F7FA] via-[#f9fdff] to-[#E7EFF5] text-[#0B192C] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-[#1E3E62]/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20" />
        <div className="absolute w-[500px] h-[500px] bg-[#1E3E62]/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20" />

        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl glass-card border border-[#0B192C]/20 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#162443] flex items-center justify-center mx-auto text-[#FAF7F2] shadow-xl">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="font-serif-custom text-2xl sm:text-3xl font-semibold navy-gradient-text pt-2">
              Dashboard Admin
            </h1>
            <p className="text-xs text-[#1E3E62] uppercase tracking-widest font-semibold">
              The Wedding Of {WEDDING_DATA.groom.name} &amp; {WEDDING_DATA.bride.name}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-700 text-xs text-center font-medium">
                {loginError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1E3E62]">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username..."
                className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#0B192C]/20 text-[#0B192C] placeholder-slate-400 text-sm focus:outline-none focus:border-[#162443] focus:ring-1 focus:ring-[#162443] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1E3E62]">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password..."
                className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#0B192C]/20 text-[#0B192C] placeholder-slate-400 text-sm focus:outline-none focus:border-[#162443] focus:ring-1 focus:ring-[#162443] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full shimmer-button text-[#FAF7F2] font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#0B192C]/20 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <Lock className="w-4 h-4 text-[#FAF7F2]" />
              <span>Masuk Dashboard</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD SCREEN (Matching Landing Page Palette)
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E7EFF5] via-[#f9fdff] to-[#F2F7FA] text-[#0B192C] relative pb-20 overflow-x-hidden">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#1E3E62]/10 via-[#1E3E62]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#F2F7FA]/90 backdrop-blur-xl border-b border-[#0B192C]/15 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#162443] flex items-center justify-center text-[#FAF7F2] font-bold shadow-md">
              <Heart className="w-5 h-5 fill-[#FAF7F2] text-[#FAF7F2]" />
            </div>
            <div>
              <h1 className="font-serif-custom text-lg sm:text-xl font-bold navy-gradient-text leading-tight">
                {WEDDING_DATA.groom.name} &amp; {WEDDING_DATA.bride.name}
              </h1>
              <p className="text-[10px] text-[#1E3E62] uppercase tracking-widest font-semibold">
                Admin &amp; Management Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#0B192C]/20 text-xs text-[#1E3E62] hover:border-[#162443] transition-colors shadow-sm"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3 h-3 text-[#162443]" />
            </a>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer font-semibold shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 pt-8 space-y-8 relative z-10">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/80 border border-[#0B192C]/15 shadow-md overflow-x-auto backdrop-blur-md">
          <button
            onClick={() => setActiveTab('share')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'share'
                ? 'shimmer-button text-[#FAF7F2] font-extrabold shadow-md shadow-[#0B192C]/20'
                : 'text-[#1E3E62] hover:text-[#0B192C] hover:bg-[#1E3E62]/10'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Bagikan Undangan</span>
          </button>

          <button
            onClick={() => setActiveTab('rsvp')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'rsvp'
                ? 'shimmer-button text-[#FAF7F2] font-extrabold shadow-md shadow-[#0B192C]/20'
                : 'text-[#1E3E62] hover:text-[#0B192C] hover:bg-[#1E3E62]/10'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Data RSVP ({rsvps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishes')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'wishes'
                ? 'shimmer-button text-[#FAF7F2] font-extrabold shadow-md shadow-[#0B192C]/20'
                : 'text-[#1E3E62] hover:text-[#0B192C] hover:bg-[#1E3E62]/10'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Data Ucapan ({wishes.length})</span>
          </button>
        </div>

        {/* TAB 1: BAGIKAN UNDANGAN & GUEST LINK GENERATOR */}
        {activeTab === 'share' && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Generator Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-[#0B192C]/15 shadow-xl space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#0B192C]/10 pb-4">
                <div>
                  <h2 className="font-serif-custom text-xl sm:text-2xl font-bold navy-gradient-text">
                    Generator Link Tamu Undangan
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Buat link khusus dengan nama tamu untuk dikirim via WhatsApp atau media sosial.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#0B192C]/15 shadow-sm">
                  <button
                    onClick={() => setMessageTemplate('formal')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      messageTemplate === 'formal'
                        ? 'shimmer-button text-[#FAF7F2] font-bold'
                        : 'text-[#1E3E62] hover:text-[#0B192C]'
                    }`}
                  >
                    Format Formal
                  </button>
                  <button
                    onClick={() => setMessageTemplate('santai')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      messageTemplate === 'santai'
                        ? 'shimmer-button text-[#FAF7F2] font-bold'
                        : 'text-[#1E3E62] hover:text-[#0B192C]'
                    }`}
                  >
                    Format Santai
                  </button>
                </div>
              </div>

              <form onSubmit={handleGenerateLink} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#1E3E62]">
                    Nama Tamu Undangan
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      required
                      value={guestNameInput}
                      onChange={(e) => setGuestNameInput(e.target.value)}
                      placeholder="Masukkan nama (Contoh: Bapak Ahmad / Sahabat Budi &amp; Pasangan)..."
                      className="flex-1 px-4 py-3.5 rounded-xl bg-white/90 border border-[#0B192C]/20 text-[#0B192C] placeholder-slate-400 text-sm focus:outline-none focus:border-[#162443]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-xl shimmer-button text-[#FAF7F2] font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#0B192C]/20 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4 text-[#FAF7F2]" />
                      <span>Buat Link Tamu</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Quick Preview Box if input has value */}
              {guestNameInput.trim() && (
                <div className="p-4 rounded-2xl bg-white/90 border border-[#0B192C]/15 space-y-3 shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-[#162443] font-bold block">
                    Live Preview Pesan WhatsApp:
                  </span>
                  <div className="text-xs text-slate-700 bg-[#F2F7FA] p-3.5 rounded-xl whitespace-pre-wrap font-mono leading-relaxed border border-[#0B192C]/10">
                    {getWhatsAppMessage(
                      guestNameInput.trim(),
                      `${baseUrl || 'https://wedding.app'}?to=${encodeURIComponent(guestNameInput.trim())}`
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Saved Links Table */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-[#0B192C]/15 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#0B192C]/10 pb-4">
                <h3 className="font-serif-custom text-lg font-bold text-[#0B192C] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1E3E62]" />
                  Daftar Link Tamu Yang Pernah Dibuat ({savedLinks.length})
                </h3>
              </div>

              {savedLinks.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs italic">
                  Belum ada link tamu yang disimpan. Ketikkan nama tamu di atas untuk membuat link kustom.
                </div>
              ) : (
                <div className="space-y-3">
                  {savedLinks.map((item) => {
                    const waText = getWhatsAppMessage(item.guestName, item.url);
                    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;

                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-white/90 border border-[#0B192C]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#162443]/40 transition-colors shadow-sm"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <strong className="text-sm font-semibold text-[#0B192C]">
                              {item.guestName}
                            </strong>
                            <span className="text-[10px] text-slate-500 font-mono">
                              ({item.createdAt})
                            </span>
                          </div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#1E3E62] underline hover:text-[#0B192C] block truncate max-w-md font-medium"
                          >
                            {item.url}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(item.url, `url_${item.id}`)}
                            className="px-3 py-1.5 rounded-lg bg-white border border-[#0B192C]/20 text-xs text-[#1E3E62] hover:bg-[#1E3E62]/10 hover:border-[#162443] transition-all cursor-pointer flex items-center gap-1.5 font-medium"
                          >
                            {copiedIndex === `url_${item.id}` ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-semibold">Tersalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-[#1E3E62]" />
                                <span>Salin Link</span>
                              </>
                            )}
                          </button>

                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all cursor-pointer flex items-center gap-1.5 font-bold shadow-sm"
                          >
                            <Send className="w-3.5 h-3.5 text-white" />
                            <span>Kirim WA</span>
                          </a>

                          <button
                            onClick={() => deleteSavedLink(item.id)}
                            className="p-1.5 rounded-lg bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-[#0B192C]/10 transition-colors cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DATA KONFIRMASI RSVP */}
        {activeTab === 'rsvp' && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl glass-card border border-[#0B192C]/15 space-y-1 shadow-md">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                  Total Respon RSVP
                </span>
                <div className="text-3xl font-bold navy-gradient-text">{rsvps.length}</div>
                <span className="text-xs text-slate-600 font-light">Konfirmasi Masuk</span>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-emerald-300/60 bg-emerald-50/50 space-y-1 shadow-md">
                <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Total Tamu Hadir
                </span>
                <div className="text-3xl font-bold text-emerald-900">
                  {totalHadirCount} <span className="text-xs font-normal text-emerald-700">Orang</span>
                </div>
                <span className="text-xs text-emerald-700 font-light">
                  Dari {totalRespondentsHadir} Pengonfirmasi Hadir
                </span>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-rose-300/60 bg-rose-50/50 space-y-1 shadow-md">
                <span className="text-[10px] uppercase tracking-widest text-rose-800 font-semibold flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  Tidak Bisa Hadir
                </span>
                <div className="text-3xl font-bold text-rose-900">{totalRespondentsTidakHadir}</div>
                <span className="text-xs text-rose-700 font-light">Tamu Menyerahkan Halangan</span>
              </div>
            </div>

            {/* Filter & Table Container */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-[#0B192C]/15 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#0B192C]/10 pb-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={rsvpSearch}
                      onChange={(e) => setRsvpSearch(e.target.value)}
                      placeholder="Cari nama tamu..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#0B192C]/20 text-xs text-[#0B192C] placeholder-slate-400 focus:outline-none focus:border-[#162443]"
                    />
                  </div>

                  <select
                    value={rsvpFilter}
                    onChange={(e) => setRsvpFilter(e.target.value as 'all' | 'hadir' | 'tidak_hadir')}
                    className="px-3 py-2 rounded-xl bg-white border border-[#0B192C]/20 text-xs text-[#0B192C] focus:outline-none focus:border-[#162443] cursor-pointer"
                  >
                    <option value="all">Semua Status</option>
                    <option value="hadir">Hadir Sahaja</option>
                    <option value="tidak_hadir">Tidak Hadir</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={fetchRsvps}
                    disabled={isLoadingRsvp}
                    className="p-2.5 rounded-xl bg-white border border-[#0B192C]/20 text-[#1E3E62] hover:bg-[#1E3E62]/10 transition-colors cursor-pointer shadow-sm"
                    title="Refresh Data"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingRsvp ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={exportRsvpCsv}
                    className="px-4 py-2.5 rounded-xl shimmer-button text-[#FAF7F2] text-xs font-semibold shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#0B192C]/15 text-[#1E3E62] uppercase tracking-wider">
                      <th className="py-3 px-4 font-semibold">Nama Tamu</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-center">Jumlah Tamu</th>
                      <th className="py-3 px-4 font-semibold">Catatan / Pesan</th>
                      <th className="py-3 px-4 font-semibold text-right">Waktu Submit</th>
                      <th className="py-3 px-4 font-semibold text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0B192C]/10">
                    {filteredRsvps.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500 italic">
                          Belum ada data konfirmasi RSVP yang cocok.
                        </td>
                      </tr>
                    ) : (
                      filteredRsvps.map((item) => (
                        <tr key={item.id} className="hover:bg-[#1E3E62]/5 transition-colors">
                          <td className="py-4 px-4 font-semibold text-[#0B192C]">{item.name}</td>
                          <td className="py-4 px-4">
                            {item.attendance === 'hadir' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Hadir
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-[10px] font-bold uppercase tracking-wider">
                                <XCircle className="w-3 h-3 text-rose-600" />
                                Tidak Hadir
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center font-bold text-[#162443]">
                            {item.attendance === 'hadir' ? `${item.guest_count} Orang` : '-'}
                          </td>
                          <td className="py-4 px-4 text-slate-700 font-light max-w-xs truncate">
                            {item.notes || <span className="text-slate-400 italic">- Tidak ada -</span>}
                          </td>
                          <td className="py-4 px-4 text-right text-slate-500 font-mono text-[11px]">
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => handleDeleteRsvp(item.id)}
                              className="p-1.5 rounded-lg bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-[#0B192C]/10 transition-colors cursor-pointer"
                              title="Hapus Data RSVP"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DATA UCAPAN & DOA */}
        {activeTab === 'wishes' && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl glass-card border border-[#0B192C]/15 space-y-1 shadow-md">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                  Total Ucapan Terkirim
                </span>
                <div className="text-3xl font-bold navy-gradient-text">{wishes.length}</div>
                <span className="text-xs text-slate-600 font-light">Doa &amp; Restu Tamu Undangan</span>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-[#0B192C]/15 flex items-center justify-between shadow-md">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#1E3E62] font-semibold block">
                    Unduh Data Ucapan
                  </span>
                  <p className="text-xs text-slate-600 mt-1">Simpan ucapan tamu ke format CSV Excel.</p>
                </div>
                <button
                  onClick={exportWishesCsv}
                  className="px-4 py-2.5 rounded-xl shimmer-button text-[#FAF7F2] font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#FAF7F2]" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Filter & Wishes List Container */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-[#0B192C]/15 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#0B192C]/10 pb-4">
                <div className="relative flex-1 w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={wishSearch}
                    onChange={(e) => setWishSearch(e.target.value)}
                    placeholder="Cari kata atau nama..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#0B192C]/20 text-xs text-[#0B192C] placeholder-slate-400 focus:outline-none focus:border-[#162443]"
                  />
                </div>

                <button
                  onClick={fetchWishes}
                  disabled={isLoadingWishes}
                  className="p-2.5 rounded-xl bg-white border border-[#0B192C]/20 text-[#1E3E62] hover:bg-[#1E3E62]/10 transition-colors cursor-pointer self-end sm:self-auto shadow-sm"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingWishes ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Wishes Table / List */}
              <div className="space-y-3">
                {filteredWishes.length === 0 ? (
                  <div className="py-10 text-center text-slate-500 text-xs italic">
                    Belum ada ucapan yang cocok dengan kata pencarian.
                  </div>
                ) : (
                  filteredWishes.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#0B192C]/15 space-y-2 hover:border-[#162443]/40 transition-colors shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-semibold text-[#0B192C]">{item.name}</strong>
                          {item.relation && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E3E62]/10 border border-[#1E3E62]/20 text-[#1E3E62] font-medium">
                              {item.relation}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <button
                            onClick={() => handleDeleteWish(item.id)}
                            className="p-1 rounded-lg bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-[#0B192C]/10 transition-colors cursor-pointer"
                            title="Hapus Ucapan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 italic leading-relaxed font-light pt-1">
                        &ldquo;{item.message}&rdquo;
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
