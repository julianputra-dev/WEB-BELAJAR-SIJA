// File: src/components/trojan/theory/TrojanHeroBanner.tsx
import React from 'react';
import Link from 'next/link';
import { Cpu, ArrowRight, ArrowLeft } from 'lucide-react';

export function TrojanHeroBanner() {
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
            <Cpu className="w-4 h-4 text-slate-700" />
            <span>Vektor Transmisi: Penyamaran Utilitas Sah &amp; Kanal Backdoor C2 (Port 4444)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Anatomi Trojan Horse, Arsitektur Backdoor C2, &amp; Analisis Forensik Jaringan
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            Trojan Horse adalah peranti perusak berkedok program sah yang menyembunyikan fungsi berbahaya
            di balik antarmuka aplikasi utilitas fungsional. Berbeda dengan virus yang merusak berkas atau worm
            yang menyebar agresif, Trojan bekerja secara senyap tanpa replikasi diri mandiri untuk membuka
            pintu belakang (backdoor) pada port tidak standar menuju Command &amp; Control (C2) Server peretas.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/modules/security/malware/lab/trojan"
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
