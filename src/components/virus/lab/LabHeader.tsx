// File: src/components/virus/lab/LabHeader.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, RotateCcw, Shield } from 'lucide-react';
import { useVirusLabStore } from '@/store/useVirusLabStore';

export function LabHeader() {
  const { safeMode, mistakes, resetLab, phase, completedSteps } = useVirusLabStore();

  const isAllDisinfected = completedSteps.step4 || phase === 'disinfected_recovered';

  const getStatusBadge = () => {
    if (isAllDisinfected) {
      return { text: 'SISTEM STERIL • TERVERIFIKASI', color: 'bg-emerald-50 text-emerald-800 border-emerald-300' };
    }
    if (safeMode) {
      return { text: 'DIAGNOSTIC MODE (SAFEBOOT)', color: 'bg-emerald-50 text-emerald-800 border-emerald-300' };
    }
    if (phase === 'infected') {
      return { text: 'INFEKSI AKTIF • PROSES PARASIT', color: 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' };
    }
    if (phase === 'process_terminated') {
      return { text: 'PROSES PARASIT DITERMINASI', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    }
    if (phase === 'carrier_quarantined') {
      return { text: 'VEKTOR ASAL TERKARANTINA', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
    return { text: 'STANDARD OS RUNTIME', color: 'bg-slate-100 text-slate-700 border-slate-200' };
  };

  const badge = getStatusBadge();

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 shadow-xs">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Navigation and Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/modules/security/virus/intro"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors"
            title="Kembali ke Modul Teori Virus"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modul Teori</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-900 text-white rounded">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                  Laboratorium Investigasi: File Infector &amp; PE Disinfection
                </h1>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${badge.color}`}>
                  {badge.text}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Simulasi Injeksi Parasit Biner, Analisis Struktur Header PE, dan Validasi SOP Disinfeksi Sistem
              </p>
            </div>
          </div>
        </div>

        {/* Right: Telemetry & Actions */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-mono">
            <span className="text-slate-500">Pelanggaran SOP:</span>
            <span className={`font-bold ${mistakes > 0 ? 'text-rose-600' : 'text-slate-700'}`}>
              {mistakes}
            </span>
          </div>

          <button
            onClick={resetLab}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded transition-colors shadow-xs"
            title="Reset ke kondisi awal"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Lab</span>
          </button>

          <Link
            href="/modules/security/malware"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors shadow-xs"
          >
            <span>Katalog Malware</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
