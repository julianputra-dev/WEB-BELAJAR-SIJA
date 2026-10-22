// File: src/components/virus/lab/DiagnosticBar.tsx
'use client';

import React from 'react';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import { Activity, Cpu, HardDrive, Database, ShieldAlert, CheckCircle, AlertTriangle, X, Binary, ShieldCheck } from 'lucide-react';

export function DiagnosticBar() {
  const {
    safeMode,
    processes,
    binaries,
    reinfectionAlert,
    clearReinfectionAlert,
    feedbackMessage,
    clearFeedback,
    completedSteps,
  } = useVirusLabStore();

  const isRogueRunning = processes.some((p) => p.isMalicious && p.status === 'running');
  const cpuVal = isRogueRunning ? 89.2 : safeMode ? 8.4 : 14.1;
  const ramVal = isRogueRunning ? 74.5 : safeMode ? 22.0 : 38.6;
  const diskIOMBs = isRogueRunning ? 32.4 : 0.1;

  const carrierFile = binaries.find((b) => b.isCarrier);
  const isCarrierQuarantined = carrierFile?.status === 'quarantined';
  const isAllDisinfected = completedSteps.step4;
  const anyInfected = binaries.some((b) => b.status === 'infected');

  return (
    <div className="space-y-2.5">
      {/* Alert Notice: Re-infection Warning */}
      {reinfectionAlert && (
        <div className="bg-rose-50 border border-rose-300 text-rose-900 px-3.5 py-2.5 rounded text-xs flex items-start justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Eksperimen Re-Infeksi Nyata: </span>
              <span className="leading-relaxed">{reinfectionAlert}</span>
            </div>
          </div>
          <button
            onClick={clearReinfectionAlert}
            className="text-rose-500 hover:text-rose-800 p-0.5 rounded transition-colors"
            title="Tutup pemberitahuan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Standard Feedback Notice */}
      {feedbackMessage && !reinfectionAlert && (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 px-3.5 py-2 rounded text-xs flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
          <button
            onClick={clearFeedback}
            className="text-blue-500 hover:text-blue-800 p-0.5 rounded transition-colors"
            title="Tutup pemberitahuan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Metrics Row: 5 Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {/* Metric 1: CPU Usage */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>CPU Usage (RAM)</span>
            <Cpu className={`w-3.5 h-3.5 ${cpuVal > 50 ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`} />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className={`text-base font-bold font-mono ${cpuVal > 50 ? 'text-rose-700' : 'text-slate-900'}`}>
              {cpuVal.toFixed(1)}%
            </span>
            <span className="text-[10px] text-slate-500 font-mono">load</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${cpuVal > 50 ? 'bg-rose-500' : 'bg-slate-400'}`}
              style={{ width: `${Math.min(100, cpuVal)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            {isRogueRunning ? 'Thread Parasit Aktif' : safeMode ? 'SafeBoot Throttled' : 'Beban Kernel Standar'}
          </div>
        </div>

        {/* Metric 2: RAM Memory Load */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>RAM Load (Host)</span>
            <Database className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className={`text-base font-bold font-mono ${ramVal > 60 ? 'text-rose-700' : 'text-slate-900'}`}>
              {ramVal.toFixed(1)}%
            </span>
            <span className="text-[10px] text-slate-500 font-mono">alloc</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${ramVal > 60 ? 'bg-amber-500' : 'bg-slate-400'}`}
              style={{ width: `${Math.min(100, ramVal)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            {isRogueRunning ? 'Injeksi Heap Aktif' : 'Memori OS Bersih'}
          </div>
        </div>

        {/* Metric 3: Disk I/O Write */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Disk I/O Write</span>
            <Activity className={`w-3.5 h-3.5 ${isRogueRunning ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`} />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className={`text-base font-bold font-mono ${isRogueRunning ? 'text-rose-700' : 'text-slate-900'}`}>
              {diskIOMBs.toFixed(1)}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">MB/s</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isRogueRunning ? 'bg-rose-500' : 'bg-slate-400'}`}
              style={{ width: `${isRogueRunning ? 65 : 5}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            {isRogueRunning ? 'INJECTION WRITE (.exe)' : 'IDLE (Tidak Ada Mutasi)'}
          </div>
        </div>

        {/* Metric 4: Integritas Berkas Host (FIM) */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Integritas Berkas PE</span>
            {isAllDisinfected ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            ) : anyInfected ? (
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            ) : (
              <Binary className="w-3.5 h-3.5 text-slate-400" />
            )}
          </div>
          <div className="mt-1">
            <span className={`text-xs font-mono font-bold ${
              isAllDisinfected
                ? 'text-emerald-700'
                : anyInfected
                ? 'text-rose-700'
                : 'text-slate-700'
            }`}>
              {isAllDisinfected
                ? '100% VALID (DISINFECTED)'
                : anyInfected
                ? 'TERKONTAMINASI (+348KB)'
                : 'TERVERIFIKASI (CLEAN)'}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            {isAllDisinfected
              ? 'Baseline SHA-256 Cocok'
              : anyInfected
              ? 'AddressOfEntryPoint Dibajak'
              : '4 Berkas Baseline Sah'}
          </div>
        </div>

        {/* Metric 5: Mode Lingkungan OS */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-4 lg:col-span-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Mode Lingkungan OS</span>
            {safeMode ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
            )}
          </div>
          <div className="mt-1">
            <span className={`text-xs font-mono font-bold ${
              safeMode
                ? 'text-emerald-700'
                : 'text-slate-700'
            }`}>
              {safeMode ? 'DIAGNOSTIC (SAFEBOOT)' : 'STANDARD OS RUNTIME'}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            {safeMode
              ? 'Driver 3rd-Party Mati'
              : isCarrierQuarantined
              ? 'Carrier Terkarantina'
              : 'Driver Persistence Aktif'}
          </div>
        </div>
      </div>
    </div>
  );
}
