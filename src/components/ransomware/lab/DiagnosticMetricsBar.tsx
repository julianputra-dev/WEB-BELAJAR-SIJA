// File: src/components/ransomware/lab/DiagnosticMetricsBar.tsx
'use client';

import React from 'react';
import { Activity, HardDrive, Wifi, ShieldAlert, Cpu, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useRansomwareLabStore } from '@/store/useRansomwareLabStore';

export function DiagnosticMetricsBar() {
  const {
    phase,
    systemPartitionClean,
    diskIOMBps,
    cpuPercent,
    shadowCopiesDeleted,
    nasConnected,
    backupMounted,
    fatalErrorNotice,
    feedbackNotice,
    clearNotices,
  } = useRansomwareLabStore();

  const isDiskActive = diskIOMBps > 50;
  const isVssRecovered = systemPartitionClean || phase === 'partition_wiped' || phase === 'backup_restored' || phase === 'hardened';
  const isVssDestroyed = shadowCopiesDeleted && !isVssRecovered;
  const isNasRecovered = nasConnected && (phase === 'backup_restored' || phase === 'hardened');

  return (
    <div className="space-y-2.5">
      {/* Alert Notices (Fatal error or educational feedback) */}
      {fatalErrorNotice && (
        <div className="bg-rose-50 border border-rose-300 text-rose-900 px-3.5 py-2.5 rounded text-xs flex items-start justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Konsekuensi Fatal Forensik: </span>
              <span>{fatalErrorNotice}</span>
            </div>
          </div>
          <button
            onClick={clearNotices}
            className="text-rose-500 hover:text-rose-800 p-0.5 rounded transition-colors"
            title="Tutup pemberitahuan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {feedbackNotice && !fatalErrorNotice && (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 px-3.5 py-2 rounded text-xs flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{feedbackNotice}</span>
          </div>
          <button
            onClick={clearNotices}
            className="text-blue-500 hover:text-blue-800 p-0.5 rounded transition-colors"
            title="Tutup pemberitahuan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {/* Metric 1: Disk I/O Write Burst */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Disk I/O Write</span>
            <Activity className={`w-3.5 h-3.5 ${isDiskActive ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`} />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className={`text-base font-bold font-mono ${isDiskActive ? 'text-rose-700' : 'text-slate-900'}`}>
              {diskIOMBps.toFixed(1)}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">MB/s</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isDiskActive ? 'bg-rose-500' : 'bg-slate-400'}`}
              style={{ width: `${Math.min(100, (diskIOMBps / 200) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: CPU Utilization */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>CPU Crypt-Thread</span>
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className={`text-base font-bold font-mono ${cpuPercent > 50 ? 'text-rose-700' : 'text-slate-900'}`}>
              {cpuPercent.toFixed(1)}%
            </span>
            <span className="text-[10px] text-slate-500 font-mono">load</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${cpuPercent > 50 ? 'bg-rose-500' : 'bg-slate-400'}`}
              style={{ width: `${cpuPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Volume Shadow Copies (VSS) */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Volume Shadow Copies</span>
            {isVssDestroyed ? (
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            ) : (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            )}
          </div>
          <div className="mt-1">
            <span className={`text-xs font-mono font-bold ${
              isVssDestroyed
                ? 'text-rose-700'
                : isVssRecovered
                ? 'text-emerald-700'
                : 'text-emerald-700'
            }`}>
              {isVssDestroyed
                ? 'TERHAPUS (VSS Musnah)'
                : isVssRecovered
                ? 'AKTIF (Layanan Pulih)'
                : 'TERSEDIA (Snapshot Valid)'}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            {isVssDestroyed
              ? 'vssadmin delete shadows'
              : isVssRecovered
              ? 'Layanan VSS Berjalan Normal'
              : 'Restore Point Ready'}
          </div>
        </div>

        {/* Metric 4: Shared NAS Z: Link */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>NAS Share (Z:)</span>
            <Wifi className={`w-3.5 h-3.5 ${
              isNasRecovered
                ? 'text-emerald-600'
                : nasConnected
                ? 'text-amber-500'
                : 'text-slate-400'
            }`} />
          </div>
          <div className="mt-1">
            <span className={`text-xs font-mono font-bold ${
              isNasRecovered
                ? 'text-emerald-700'
                : nasConnected
                ? 'text-amber-700'
                : 'text-slate-600'
            }`}>
              {isNasRecovered
                ? 'PULIH (TERHUBUNG AMAN)'
                : nasConnected
                ? 'SMB TERHUBUNG'
                : 'ISOLATED (OFFLINE)'}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            {nasConnected ? '\\\\nas-corp.internal\\shared' : 'Sesi Terputus'}
          </div>
        </div>

        {/* Metric 5: Offline Backup Drive (E:) */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-4 lg:col-span-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Offline Backup (E:)</span>
            <HardDrive className={`w-3.5 h-3.5 ${
              backupMounted
                ? 'text-emerald-600'
                : phase === 'backup_restored' || phase === 'hardened'
                ? 'text-emerald-600'
                : 'text-slate-400'
            }`} />
          </div>
          <div className="mt-1">
            <span className={`text-xs font-mono font-bold ${
              backupMounted
                ? 'text-emerald-700'
                : phase === 'backup_restored' || phase === 'hardened'
                ? 'text-emerald-700'
                : 'text-slate-500'
            }`}>
              {backupMounted
                ? 'TERPASANG (MOUNTED)'
                : phase === 'backup_restored' || phase === 'hardened'
                ? 'AIR-GAPPED (DI BRANKAS)'
                : 'AIR-GAPPED (LEPAS)'}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            {backupMounted
              ? 'Volume{airgap-2026}'
              : phase === 'backup_restored' || phase === 'hardened'
              ? 'Dilepas Sesuai SOP 3-2-1'
              : 'Fisik Terisolasi'}
          </div>
        </div>
      </div>
    </div>
  );
}
