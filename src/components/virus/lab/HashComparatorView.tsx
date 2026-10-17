// File: src/components/virus/lab/HashComparatorView.tsx
'use client';

import React from 'react';
import { ForensicBinary } from '@/store/useVirusLabStore';
import { Binary, ShieldCheck, ShieldAlert, Check, X } from 'lucide-react';

interface HashComparatorViewProps {
  binary: ForensicBinary;
}

export function HashComparatorView({ binary }: HashComparatorViewProps) {
  const isMatch = binary.currentHash === binary.baselineHash;
  const isSizeMatch = binary.currentSizeKB === binary.originalSizeKB;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Binary className="w-3.5 h-3.5 text-slate-800" />
          <span className="font-bold text-slate-800 text-[11px]">
            Audit Integritas Kriptografis SHA-256
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase flex items-center gap-1 ${
              isMatch
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-100 text-red-800 border-red-200'
            }`}
          >
            {isMatch ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
            <span>{isMatch ? 'HASH COCOK 100%' : 'HASH ANOMALI / BERBEDA'}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
        {/* Baseline Database Reference */}
        <div className="bg-white border border-slate-200 rounded p-2.5 space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold flex items-center justify-between">
            <span>Golden Image (Baseline Resmi)</span>
            <span className="text-slate-400 font-normal">{binary.originalSizeKB} KB</span>
          </div>
          <div className="bg-slate-50 p-2 rounded border border-slate-200 text-slate-700 font-mono break-all text-[10px] leading-tight select-all">
            {binary.baselineHash}
          </div>
          <div className="text-[9px] text-slate-500 flex items-center justify-between">
            <span>Basis: NIST Computer Security Division</span>
            <span className="text-emerald-700 font-semibold">Tervalidasi Asli</span>
          </div>
        </div>

        {/* Current Live Calculated SHA-256 */}
        <div className="bg-white border border-slate-200 rounded p-2.5 space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold flex items-center justify-between">
            <span>Kalkulasi Live Berkas Fisik</span>
            <span className={isSizeMatch ? 'text-slate-700' : 'text-red-600 font-bold'}>
              {binary.currentSizeKB} KB {!isSizeMatch && '(+348 KB)'}
            </span>
          </div>
          <div
            className={`p-2 rounded border font-mono break-all text-[10px] leading-tight select-all ${
              isMatch
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900 font-bold'
            }`}
          >
            {binary.currentHash}
          </div>
          <div className="text-[9px] flex items-center justify-between">
            <span className="text-slate-500">Status Checksum:</span>
            <span className={isMatch ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>
              {isMatch ? 'Kriptografis Utuh (Clean)' : 'Checksum Rusak (Modified)'}
            </span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 flex items-center justify-between">
        <span>Sertifikasi Tanda Tangan: <strong>{binary.signature}</strong></span>
        <span>Algoritma: SHA-256 (FIPS 180-4)</span>
      </div>
    </div>
  );
}
