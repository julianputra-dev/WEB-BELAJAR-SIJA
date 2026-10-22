// File: src/app/error.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    // Audit error runtime ke konsol diagnostik browser
    console.error('[AppRouter Root Error Boundary]:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 selection:bg-slate-900 selection:text-white">
      <div className="max-w-lg w-full bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-lg bg-red-50 text-red-700 border border-red-200">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
              Boundary Kesalahan Runtime (App Router)
            </span>
            <h1 className="text-base font-bold text-slate-900">
              Terjadi Kesalahan pada Komponen Aplikasi
            </h1>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Sistem mendeteksi adanya kegagalan eksekusi pada pohon komponen. Kesalahan ini berhasil ditangkap oleh
            pembatas kesalahan akar (<code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">src/app/error.tsx</code>)
            sehingga tidak merusak status server.
          </p>

          {error.digest && (
            <div className="text-[10px] font-mono text-slate-500 bg-slate-50 p-2 rounded border border-slate-200">
              Digest ID: <span className="text-slate-800">{error.digest}</span>
            </div>
          )}

          {error.message && (
            <div className="text-[11px] font-mono text-red-800 bg-red-50/60 p-3 rounded border border-red-200 break-words">
              {error.message}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Coba Ulang Komponen</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded border border-slate-300 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
