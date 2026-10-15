import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SIJA SecLab - Laboratorium Simulasi & Penanganan Insiden Keamanan Siber',
  description:
    'Portal edukasi dan praktikum keamanan jaringan terisolasi untuk program keahlian SIJA. Simulasi telemetri serangan dan penanganan insiden berbasis standar operasional prosedur.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-slate-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
