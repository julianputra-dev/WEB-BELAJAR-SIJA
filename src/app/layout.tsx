import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SIJA SecLab - Platform Simulasi Keamanan Siber Interaktif',
  description:
    'Media pembelajaran interaktif berbasis web untuk siswa SMK SIJA: Simulasi visual analisis infeksi dan penanganan SOP malware di lingkungan sandbox.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
