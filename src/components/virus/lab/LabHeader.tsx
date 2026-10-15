// File: src/components/virus/lab/LabHeader.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Shield, AlertCircle } from 'lucide-react';
import { useVirusLabStore } from '@/store/useVirusLabStore';

export function LabHeader() {
  const { safeMode, mistakes, resetLab, phase } = useVirusLabStore();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded bg-slate-900 text-white flex items-center justify-center border border-slate-800">
          <Shield className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900">
              Laboratorium Investigasi: File Infector &amp; PE Disinfection
            </h1>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                safeMode
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {safeMode ? 'DIAGNOSTIC MODE (SAFEBOOT)' : 'STANDARD OS RUNTIME'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            SOP: Triage RAM PID → Isolasi SafeBoot → Karantina Carrier → Disinfeksi PE &amp; SHA-256
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-[11px] font-mono text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded">
          Kesalahan Langkah:{' '}
          <span className={mistakes > 0 ? 'text-red-600 font-bold' : 'text-slate-900 font-bold'}>
            {mistakes}
          </span>
        </div>

        <button
          onClick={resetLab}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded border border-slate-300 transition-colors"
          title="Reset ke kondisi awal"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Lab</span>
        </button>

        <Link
          href="/modules/security/virus/intro"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Teori Pre-Lab</span>
        </Link>
      </div>
    </header>
  );
}
