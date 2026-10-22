// File: src/app/not-found.tsx
import React from 'react';
import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 selection:bg-slate-900 selection:text-white">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6 text-center">
        <div className="mx-auto w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
          <FileQuestion className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
            HTTP 404 &bull; Resource Not Found
          </span>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed font-sans pt-1">
            Rute yang Anda minta tidak tersedia di dalam portal laboratorium SIJA atau telah dipindahkan ke modul lain.
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/modules/security/malware"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Katalog Malware</span>
          </Link>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded border border-slate-300 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda Utama</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
