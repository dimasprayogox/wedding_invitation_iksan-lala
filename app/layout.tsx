import type { Metadata } from "next";
import { Cinzel, Great_Vibes, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Wedding of Ikhsan & Lala | Undangan Pernikahan Digital",
  description: "Undangan Pernikahan Digital Ikhsan & Lala. Jumat, 2 Oktober 2026.",
  openGraph: {
    title: "The Wedding of Ikhsan & Lala",
    description: "Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${cinzel.variable} ${greatVibes.variable} ${plusJakartaSans.variable} font-sans bg-[#F2F7FA] text-[#162443] antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}