// File: src/components/trojan/lab/TrojanLabHeader.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, RotateCcw, Shield, Power } from 'lucide-react';
import { useTrojanLabStore } from '@/store/useTrojanLabStore';

export function TrojanLabHeader() {
  const {
    appTrojan,
    appOffline,
    appNetwork,
    mistakes,
    resetLab,
    openRebootModal,
    isFullyRemediated,
    isProcessKilled,
    isFileDeleted,
    isStartupCleaned,
    isFirewallBlocked,
  } = useTrojanLabStore();

  const getSystemStatus = () => {
    if (isFullyRemediated) {
      return {
        label: 'SISTEM STERIL • PASCA-HARDENING',
        color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      };
    }
    if (isFileDeleted && isStartupCleaned && isProcessKilled && isFirewallBlocked) {
      return {
        label: 'MITIGASI SELESAI • BUTUH AUDIT REBOOT',
        color: 'bg-blue-50 text-blue-800 border-blue-300',
      };
    }
    const anyAppRunning = appTrojan.isRunning || appOffline.isRunning || appNetwork.isRunning;
    if (anyAppRunning) {
      return {
        label: 'INVESTIGASI AKTIF • OBSERVASI TELEMETRI',
        color: 'bg-amber-50 text-amber-800 border-amber-300',
      };
    }
    return {
      label: 'LINGKUNGAN BERSIH • SIAP PENGUJIAN',
      color: 'bg-slate-100 text-slate-700 border-slate-300',
    };
  };

  const status = getSystemStatus();

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 shadow-xs">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Navigation and Academic Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/modules/security/trojan/intro"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors"
            title="Kembali ke Modul Teori Trojan Horse"
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
                  Laboratorium Forensik: Deteksi Anomali Siluman &amp; Trojan Horse
                </h1>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${status.color}`}>
                  {status.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Investigasi Telemetri Mandiri (Zero-Spoiler), Analisis Soket Netstat, File Locking, dan Mitigasi SOP
              </p>
            </div>
          </div>
        </div>

        {/* Right: Actions, Mistakes & Reboot */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-mono">
            <span className="text-slate-500">Pelanggaran SOP:</span>
            <span className={`font-bold ${mistakes > 0 ? 'text-rose-600' : 'text-slate-700'}`}>
              {mistakes}
            </span>
          </div>

          <button
            onClick={openRebootModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded transition-colors shadow-xs"
            title="Simulasi Reboot OS untuk menguji persistensi atau validasi penguatan sistem"
          >
            <Power className="w-3.5 h-3.5 text-amber-700" />
            <span>Simulasi Reboot OS</span>
          </button>

          <button
            onClick={resetLab}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded transition-colors shadow-xs"
            title="Kembalikan lingkungan sandbox ke kondisi awal"
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
