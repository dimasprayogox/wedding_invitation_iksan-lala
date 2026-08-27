export interface Person {
  name: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  instagram?: string;
  photoUrl: string;
  role: 'groom' | 'bride';
}

export interface EventDetail {
  title: string;
  date: string;
  time: string;
  timezone: string;
  venue: string;
  address: string;
  mapsUrl: string;
  embedMapsUrl: string;
}

export interface LoveStoryTimeline {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  logo: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  createdAt: string;
}

export interface RsvpData {
  name: string;
  phone: string;
  attendance: 'hadir' | 'tidak_hadir';
  guestCount: number;
  notes?: string;
}
