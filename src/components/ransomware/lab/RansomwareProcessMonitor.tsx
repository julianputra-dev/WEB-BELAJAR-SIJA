// File: src/components/ransomware/lab/RansomwareProcessMonitor.tsx
'use client';

import React from 'react';
import {
  Cpu,
  Trash2,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { useRansomwareLabStore } from '@/store/useRansomwareLabStore';

export function RansomwareProcessMonitor() {
  const {
    processes,
    systemPartitionClean,
    securityPolicyActive,
    phase,
    formatSystemPartition,
    activateProtectionPolicy,
    testReExecutionAfterHardening,
  } = useRansomwareLabStore();

  const isMalwareRunning = processes.some(
    (p) => p.isMalicious && p.status === 'running'
  );

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs space-y-3">
      {/* Panel Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-slate-700" />
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Panel Monitor Proses RAM &amp; Manajemen Partisi OS
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
            isMalwareRunning
              ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}>
            {isMalwareRunning ? 'THREAT ACTIVE IN RAM' : 'MEMORY CLEAN / STERIL'}
          </span>
        </div>
      </div>

      {/* Active Processes Table */}
      <div className="border border-slate-200 rounded overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px]">
            <tr>
              <th className="py-1.5 px-2.5">PID</th>
              <th className="py-1.5 px-2">Image Name</th>
              <th className="py-1.5 px-2 hidden sm:table-cell">Command Line</th>
              <th className="py-1.5 px-2 text-right">CPU</th>
              <th className="py-1.5 px-2 text-right">Memori</th>
              <th className="py-1.5 px-2.5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {processes.map((proc) => {
              const isDanger = proc.isMalicious && proc.status === 'running';
              return (
                <tr
                  key={proc.pid}
                  className={isDanger ? 'bg-rose-50/70 font-bold text-rose-950' : 'text-slate-700 hover:bg-slate-50'}
                >
                  <td className="py-1.5 px-2.5 font-mono">{proc.pid}</td>
                  <td className="py-1.5 px-2 flex items-center gap-1.5">
                    {isDanger && <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                    <span>{proc.name}</span>
                  </td>
                  <td className="py-1.5 px-2 text-[10px] text-slate-500 truncate max-w-[200px] hidden sm:table-cell">
                    {proc.command}
                  </td>
                  <td className="py-1.5 px-2 text-right">{proc.cpuPercent.toFixed(1)}%</td>
                  <td className="py-1.5 px-2 text-right">{proc.memoryMB.toFixed(1)} MB</td>
                  <td className="py-1.5 px-2.5 text-center">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${
                        proc.status === 'running'
                          ? isDanger
                            ? 'bg-rose-200 text-rose-800'
                            : 'bg-slate-200 text-slate-700'
                          : 'bg-slate-100 text-slate-400 line-through'
                      }`}
                    >
                      {proc.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* OS Partition & Threat Eradication Controls */}
      <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
        <div className="text-[11px] text-slate-600">
          {systemPartitionClean ? (
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Partisi sistem operasi C: telah steril dan siap menerima salinan data cadangan.
            </span>
          ) : (
            <span className="text-slate-500">
              Prosedur Eradication: Wajib format partisi sistem sebelum menghubungkan media cadangan.
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!systemPartitionClean ? (
            <button
              onClick={formatSystemPartition}
              className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              title="SOP 2: Format partisi sistem operasi untuk memusnahkan ransomware dari memori dan disk"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Format &amp; Install Ulang Partisi OS (Eradication)</span>
            </button>
          ) : !securityPolicyActive ? (
            <button
              onClick={activateProtectionPolicy}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Konfigurasi Software Restriction Policy untuk mencegah infeksi berulang"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Terapkan Kebijakan Proteksi Ekstensi Ganda (SRP)</span>
            </button>
          ) : (
            <button
              onClick={testReExecutionAfterHardening}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Uji coba ketahanan sistem terhadap eksekusi malware berulang"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Uji Coba Blokir Eksekusi (Post-Validation)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
