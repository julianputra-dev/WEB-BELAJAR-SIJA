// File: src/components/worm/theory/WormHeroBanner.tsx
import React from 'react';
import Link from 'next/link';
import { Network, ArrowRight, ArrowLeft } from 'lucide-react';

export function WormHeroBanner() {
  return (
    <div className="border-b border-slate-200 bg-white pb-8 mb-8">
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/modules/security/malware"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded border border-slate-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Katalog Malware</span>
        </Link>
        <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
          MODUL PRA-LAB • TEORI &amp; METODOLOGI
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
            <Network className="w-4 h-4 text-slate-700" />
            <span>Vektor Transmisi: Remote Port Exploitation (SMBv1 Port 445)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Anatomi &amp; Propagasi Mandiri Network Worm
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            Network Worm adalah malware mandiri (autonomous) yang menyebar melintasi jaringan komputer
            tanpa memerlukan berkas inang dan tanpa memerlukan interaksi pengguna. Berbeda dari virus berkas
            yang pasif, worm memanfaatkan celah layanan jaringan (seperti port SMB 445 yang terbuka) untuk
            mereplikasi diri ke komputer lain secara eksponensial dan melumpuhkan infrastruktur LAN.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/modules/security/worm/lab"
            className="inline-flex items-center gap-2.5 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded border border-slate-900 transition-colors shadow-sm"
          >
            <span>Mulai Laboratorium Topologi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
