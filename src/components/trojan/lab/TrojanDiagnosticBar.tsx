// File: src/components/trojan/lab/TrojanDiagnosticBar.tsx
'use client';

import React from 'react';
import { Cpu, HardDrive, Radio, Shield, Lock, Unlock, Database } from 'lucide-react';
import { useTrojanLabStore } from '@/store/useTrojanLabStore';

export function TrojanDiagnosticBar() {
  const { appTrojan, isProcessKilled, isFirewallBlocked, isFileDeleted, isStartupCleaned, processes } = useTrojanLabStore();

  const isTrojanRunning = appTrojan.isRunning && !isProcessKilled;
  const isKernelLocked = isTrojanRunning;
  const isPersistenceArmed = appTrojan.isRunning && !isStartupCleaned;

  // Calculate total RAM from active processes
  const totalRam = processes
    .filter((p) => p.status === 'running')
    .reduce((acc, p) => acc + p.memoryMB, 0)
    .toFixed(1);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Metric 1: CPU Telemetry */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">Beban CPU Host</span>
            <Cpu className="w-3.5 h-3.5 text-slate-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold font-mono text-slate-900">
              {isTrojanRunning ? '1.8%' : '1.2%'}
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 rounded font-semibold border border-emerald-200">
              NORMAL
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 truncate">
            Nir-lonjakan beban prosesor
          </span>
        </div>

        {/* Metric 2: RAM Memory Usage */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">Memori Kerja RAM</span>
            <HardDrive className="w-3.5 h-3.5 text-slate-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold font-mono text-slate-900">
              {totalRam} MB
            </span>
            <span className="text-[10px] px-1 rounded font-semibold border bg-slate-100 text-slate-700 border-slate-300">
              STABIL
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 truncate">
            Alokasi memori proses aktif
          </span>
        </div>

        {/* Metric 3: Zero-Spoiler Network Traffic Telemetry */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">Trafik Keluar</span>
            <Radio className="w-3.5 h-3.5 text-slate-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded border ${
                !appTrojan.isRunning
                  ? 'bg-slate-100 text-slate-700 border-slate-300'
                  : isFirewallBlocked
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : isProcessKilled
                  ? 'bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}
            >
              {!appTrojan.isRunning
                ? 'TERKONTROL'
                : isFirewallBlocked
                ? 'TERISOLASI (FW)'
                : isProcessKilled
                ? 'SOKET CLOSED'
                : 'ANOMALI TERDETEKSI'}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 truncate">
            {!appTrojan.isRunning
              ? 'Layanan jaringan normal'
              : isFirewallBlocked
              ? 'Aturan firewall aktif'
              : isProcessKilled
              ? 'Proses pengirim mati'
              : 'Periksa tabel Netstat'}
          </span>
        </div>

        {/* Metric 4: Host Firewall State */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">Host Firewall</span>
            <Shield className="w-3.5 h-3.5 text-slate-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded border ${
                isFirewallBlocked
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              {isFirewallBlocked ? 'OUTBOUND DROP' : 'OPEN / PASS'}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 truncate">
            {isFirewallBlocked ? 'Filter port keluar aktif' : 'Lalu lintas tanpa filter'}
          </span>
        </div>

        {/* Metric 5: Zero-Spoiler Kernel File Lock */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">Kernel File Lock</span>
            {isKernelLocked ? (
              <Lock className="w-3.5 h-3.5 text-amber-700" />
            ) : (
              <Unlock className="w-3.5 h-3.5 text-emerald-600" />
            )}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded border ${
                !appTrojan.isRunning
                  ? 'bg-slate-100 text-slate-700 border-slate-300'
                  : isKernelLocked
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : isFileDeleted
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-blue-50 text-blue-800 border-blue-300'
              }`}
            >
              {!appTrojan.isRunning
                ? 'TIDAK ADA'
                : isKernelLocked
                ? 'HANDLE AKTIF'
                : isFileDeleted
                ? 'BERKAS DIHAPUS'
                : 'HANDLE DILEPAS'}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 truncate">
            {isKernelLocked ? 'Handle memori terkunci' : 'Biner bebas manipulasi'}
          </span>
        </div>

        {/* Metric 6: Zero-Spoiler Startup Persistence */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">Persistensi Registri</span>
            <Database className="w-3.5 h-3.5 text-slate-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded border ${
                !appTrojan.isRunning
                  ? 'bg-slate-100 text-slate-700 border-slate-300'
                  : isPersistenceArmed
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}
            >
              {!appTrojan.isRunning ? 'STANDBY' : isPersistenceArmed ? 'TERDETEKSI AKTIF' : 'STERIL / BERSIH'}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 truncate">
            {isPersistenceArmed ? 'Entri auto-start aktif' : 'Registri auto-run bersih'}
          </span>
        </div>
      </div>
    </div>
  );
}
