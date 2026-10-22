// File: src/app/global-error.tsx
'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('[AppRouter Global Error Boundary]:', error);
  }, [error]);

  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 antialiased font-sans">
        <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-xl p-8 shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2 rounded-lg bg-red-950 text-red-400 border border-red-800">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                Kegagalan Fatal Root Layout
              </span>
              <h1 className="text-base font-bold text-white">
                Kesalahan Tingkat Global Terdeteksi
              </h1>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Terjadi kegagalan kritis pada root layout aplikasi. Penangan kesalahan global aktif untuk mencegah kebocoran status ke Pages Router.
          </p>

          {error.digest && (
            <div className="text-[10px] font-mono text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
              Digest ID: {error.digest}
            </div>
          )}

          <button
            type="button"
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-200 text-slate-950 text-xs font-semibold rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Muat Ulang Aplikasi</span>
          </button>
        </div>
      </body>
    </html>
  );
}
