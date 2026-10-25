// File: src/components/virus/lab/ProcessTable.tsx
'use client';

import React from 'react';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import { Cpu, XCircle, AlertTriangle } from 'lucide-react';

export function ProcessTable() {
  const {
    processes,
    selectedPid,
    setSelectedPid,
    terminateSelectedProcess,
    feedbackMessage,
  } = useVirusLabStore();

  const selectedProc = processes.find((p) => p.pid === selectedPid);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col h-[270px] shadow-xs">
      {/* Table Toolbar Header */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200 mb-2 shrink-0">
        <div className="min-w-0">
          <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold">
            Triage Forensik RAM
          </div>
          <h2 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 truncate">
            <Cpu className="w-3.5 h-3.5 text-slate-800 shrink-0" />
            <span className="truncate">Process Explorer</span>
          </h2>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {selectedProc && (
            <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              PID {selectedProc.pid}
            </span>
          )}
          <button
            onClick={terminateSelectedProcess}
            disabled={!selectedPid || selectedProc?.status === 'terminated'}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-700 hover:bg-red-800 disabled:opacity-40 disabled:pointer-events-none text-white text-[10px] font-bold rounded shadow-xs transition-colors shrink-0"
            title="Hentikan proses yang dipilih menggunakan SIGKILL"
          >
            <XCircle className="w-3 h-3" />
            <span>SIGKILL</span>
          </button>
        </div>
      </div>

      {feedbackMessage && (
        <div className="mb-2 p-1.5 rounded bg-amber-50 border border-amber-200 text-[10px] text-amber-900 flex items-center gap-1.5 font-mono shrink-0">
          <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
          <span className="truncate">{feedbackMessage}</span>
        </div>
      )}

      {/* Process Table View */}
      <div className="overflow-y-auto flex-1 text-xs font-mono pr-0.5">
        <table className="w-full text-left border border-slate-200 table-fixed">
          <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[9px] border-b border-slate-200 sticky top-0 z-10">
            <tr>
              <th className="py-1.5 px-2 w-[55px]">PID</th>
              <th className="py-1.5 px-2">Citra Biner &amp; Signature</th>
              <th className="py-1.5 px-2 w-[65px] text-right">CPU</th>
              <th className="py-1.5 px-2 w-[65px] text-right">RAM</th>
              <th className="py-1.5 px-2 w-[85px] text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-[10px]">
            {processes.map((proc) => {
              const isSelected = selectedPid === proc.pid;
              const isTerminated = proc.status === 'terminated';
              const isHighCpu = proc.cpuPercent > 50;

              return (
                <tr
                  key={proc.pid}
                  onClick={() => !isTerminated && setSelectedPid(proc.pid)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-slate-100 border-l-4 border-l-slate-900'
                      : proc.isMalicious && !isTerminated
                      ? 'bg-red-50/80 hover:bg-red-100/80'
                      : 'hover:bg-slate-50'
                  } ${isTerminated ? 'opacity-40 line-through bg-slate-50' : ''}`}
                >
                  <td className="py-1.5 px-2 font-bold text-slate-900 font-mono">
                    {proc.pid}
                  </td>
                  <td className="py-1.5 px-2 min-w-0">
                    <div className="flex items-center gap-1 truncate font-semibold text-slate-800">
                      <span className="truncate">{proc.name}</span>
                      {proc.isMalicious && !isTerminated && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shrink-0" />
                      )}
                    </div>
                    <div className="text-[8px] text-slate-400 truncate">
                      {proc.isMalicious ? 'Tanda Tangan: Tidak Sah / Anomali' : 'Tanda Tangan: Terverifikasi'}
                    </div>
                  </td>
                  <td className={`py-1.5 px-2 text-right font-mono font-bold ${isHighCpu ? 'text-red-600' : 'text-slate-600'}`}>
                    {proc.cpuPercent}%
                  </td>
                  <td className="py-1.5 px-2 text-right text-slate-600 font-mono">
                    {proc.memoryMB} MB
                  </td>
                  <td className="py-1.5 px-2 text-center">
                    <span
                      className={`px-1.5 py-0.2 rounded text-[8px] font-bold uppercase block truncate ${
                        isTerminated
                          ? 'bg-slate-200 text-slate-700'
                          : proc.isMalicious
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {isTerminated ? 'TERMINATED' : proc.isMalicious ? 'ANOMALY' : 'RUNNING'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-1.5 text-[9px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-100 mt-1 shrink-0">
        <span>Klik baris ber-CPU tinggi lalu tekan SIGKILL.</span>
        <span>{processes.length} Proses Aktif</span>
      </div>
    </div>
  );
}
