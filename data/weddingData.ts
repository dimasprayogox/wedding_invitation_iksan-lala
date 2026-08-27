import { Person, EventDetail, LoveStoryTimeline, BankAccount, GuestWish } from '@/types/wedding';

export const WEDDING_DATA = {
  groom: {
    name: 'Ikhsan',
    fullName: 'Ikhsan Maulana',
    fatherName: 'Bpk. Muh Baris',
    motherName: 'Ibu Rahmatia',
    instagram: 'https://www.instagram.com/iksan_maul.1/?hl=en',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    role: 'groom'
  } as Person,

  bride: {
    name: 'Lala',
    fullName: 'Lala Permatasari',
    fatherName: 'Bpk. Tekat',
    motherName: 'Ibu Lamini',
    instagram: 'https://www.instagram.com/lalasa_rii/?hl=en',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    role: 'bride'
  } as Person,

  targetDate: '2026-10-02T08:30:00+07:00', // Date for timer
  displayDate: 'Jumat, 2 Oktober 2026',
  
  quote: {
    text: 'Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum: 21'
  },

  events: {
    akad: {
      title: 'Akad Nikah',
      date: 'Jumat, 2 Oktober 2026',
      time: '08.30 WIB',
      timezone: 'WIB',
      venue: 'Kediaman Mempelai Wanita',
      address: 'Jl. Bandungan No.10, Bandungan, Klangon, Kec. Saradan, Kabupaten Madiun, Jawa Timur 63155',
      mapsUrl: 'https://www.google.com/maps?q=-7.4773832,111.8128071',
      embedMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.48626663071957!2d111.81280713199455!3d-7.477383209436525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79cb7e2f3f711d%3A0x8830304c75b6e3b8!2sJl.%20Bandungan%20No.10%2C%20Bandungan%2C%20Klangon%2C%20Kec.%20Saradan%2C%20Kabupaten%20Madiun%2C%20Jawa%20Timur%2063155!5e0!3m2!1sid!2sid!4v1787805199057!5m2!1sid!2sid'
    } as EventDetail,
    resepsi: {
      title: 'Resepsi Pernikahan',
      date: 'Jumat, 2 Oktober 2026',
      time: '13.00 WIB',
      timezone: 'WIB',
      venue: 'Kediaman Mempelai Wanita',
      address: 'Jl. Bandungan No.10, Bandungan, Klangon, Kec. Saradan, Kabupaten Madiun, Jawa Timur 63155',
      mapsUrl: 'https://www.google.com/maps?q=-7.4773832,111.8128071',
      embedMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.48626663071957!2d111.81280713199455!3d-7.477383209436525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79cb7e2f3f711d%3A0x8830304c75b6e3b8!2sJl.%20Bandungan%20No.10%2C%20Bandungan%2C%20Klangon%2C%20Kec.%20Saradan%2C%20Kabupaten%20Madiun%2C%20Jawa%20Timur%2063155!5e0!3m2!1sid!2sid!4v1787805199057!5m2!1sid!2sid'
    } as EventDetail
  },

  loveStory: [
    {
      year: '2021',
      title: 'Pertama Kali Bertemu',
      description: 'Kami pertama kali bertegur sapa saat menghadiri seminar teknologi di Bandung. Sebuah percakapan singkat yang membuka awal cerita manis.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=500'
    },
    {
      year: '2023',
      title: 'Komitmen Bersama',
      description: 'Setelah 2 tahun mengenal satu sama lain, kami memutuskan untuk melangkah ke jenjang yang lebih serius dan saling mendukung impian masing-masing.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=500'
    },
    {
      year: '2025',
      title: 'Hari Lamaran',
      description: 'Di hadapan kedua keluarga besar, kami mengikrarkan niat tulus untuk menyatukan dua keluarga dalam ikatan pernikahan yang suci.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=500'
    }
  ] as LoveStoryTimeline[],

  gallery: [
    { id: 1, title: 'Prewedding Moment 1', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Prewedding Moment 2', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Prewedding Moment 3', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Prewedding Moment 4', url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Prewedding Moment 5', url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Prewedding Moment 6', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800' }
  ],

  bankAccounts: [
    {
      bankName: 'Bank BCA',
      accountNumber: '8400123456',
      accountName: 'Ikhsan Maulana',
      logo: 'BCA'
    },
    {
      bankName: 'Bank Mandiri',
      accountNumber: '1310019876543',
      accountName: 'Lala Permatasari',
      logo: 'MANDIRI'
    }
  ] as BankAccount[],

  giftAddress: {
    recipient: 'Ikhsan & Lala',
    phone: '0812-3456-7890',
    address: 'Jl. Bandungan No.10, Bandungan, Klangon, Kec. Saradan, Kabupaten Madiun, Jawa Timur 63155'
  },


  musicUrl: '/background_music.mp3',

  initialWishes: [
    {
      id: '1',
      name: 'Rian & Keluarga',
      relation: 'Teman Kuliah',
      message: 'Selamat Ikhsan dan Lala! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu sampai kakek nenek!',
      attendance: 'hadir',
      createdAt: '2 jam yang lalu'
    },
    {
      id: '2',
      name: 'Siti Aminah',
      relation: 'Sahabat SMA',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair. Lancar-lancar ya Lala sampai hari H!',
      attendance: 'hadir',
      createdAt: '5 jam yang lalu'
    },
    {
      id: '3',
      name: 'Budi Santoso',
      relation: 'Rekan Kerja',
      message: 'Selamat menempuh hidup baru sahabatku Ikhsan! Semoga selalu diberkahi kebahagiaan dan kelancaran rezeki.',
      attendance: 'hadir',
      createdAt: '1 hari yang lalu'
    }
  ] as GuestWish[]

};
