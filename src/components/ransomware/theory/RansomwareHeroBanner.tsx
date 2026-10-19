// File: src/components/ransomware/theory/RansomwareHeroBanner.tsx
import React from 'react';
import Link from 'next/link';
import { HardDrive, ArrowRight, ArrowLeft } from 'lucide-react';

export function RansomwareHeroBanner() {
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
            <HardDrive className="w-4 h-4 text-slate-700" />
            <span>Vektor Transmisi: Rekayasa Sosial &amp; Enkripsi Kriptografi Berkas (.pdf.exe)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Anatomi Serangan Ransomware, Kriptografi Berkas, &amp; Prosedur Mitigasi
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            Ransomware adalah peranti perusak pemeras yang merampas ketersediaan data pengguna dengan
            mentransformasikan berkas sah menjadi teks sandi kriptografis berkekuatan tinggi. Berbeda dengan
            kerusakan berkas acak, ransomware mengeksploitasi kriptografi hibrida modern yang secara matematis
            mustahil dipecahkan tanpa kunci privat, kemudian menyebarkan enkripsi ke media penyimpanan bersama (NAS)
            dan menuntut uang tebusan untuk pemulihannya.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/modules/security/malware/lab/ransomware"
            className="inline-flex items-center gap-2.5 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded border border-slate-900 transition-colors shadow-sm"
          >
            <span>Mulai Laboratorium Sandboxing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
