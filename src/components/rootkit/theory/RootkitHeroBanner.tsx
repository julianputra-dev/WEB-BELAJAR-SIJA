// File: src/components/rootkit/theory/RootkitHeroBanner.tsx
import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, ArrowLeft } from 'lucide-react';

export function RootkitHeroBanner() {
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
            <Layers className="w-4 h-4 text-slate-700" />
            <span>Vektor Subversi Kernel: Manipulasi Hak Akses Ring 0, SSDT Hooking, &amp; DKOM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Anatomi Rootkit Kernel, Subversi Hak Akses Ring 0, &amp; Forensik Memori
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            Rootkit adalah kategori peranti perusak (malware) tingkat lanjut yang beroperasi di lapisan inti sistem operasi:
            Kernel Mode (Ring 0) atau lingkungan pra-booting (UEFI/Bootkit). Berbeda dari malware aplikasi biasa yang berjalan di
            User Mode (Ring 3), Rootkit memiliki hak akses tak terbatas untuk memodifikasi struktur data internal dan mekanisme pelaporan
            sistem operasi. Dengan mengendalikan inti sistem, Rootkit mampu memalsukan status proses, port jaringan, serta berkas
            berbahaya sehingga tidak dapat terdeteksi oleh Task Manager maupun perangkat lunak antivirus standar.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/modules/security/malware/lab/rootkit"
            className="inline-flex items-center gap-2.5 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded border border-slate-900 transition-colors shadow-xs"
          >
            <span>Mulai Laboratorium Sandboxing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
