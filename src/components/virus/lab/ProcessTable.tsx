// File: src/components/virus/lab/ProcessTable.tsx
import React from 'react';
import { useVirusLabStore, ForensicProcess } from '@/store/useVirusLabStore';
import { Cpu, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

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
    <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col h-full shadow-xs">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3 mb-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
            Alat Triage Forensik RAM
          </div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-slate-700" />
            Process Explorer (Pemantau Proses &amp; Thread Aktif)
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {selectedProc && (
            <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              Terpilih: PID {selectedProc.pid} ({selectedProc.name})
            </span>
          )}
          <button
            onClick={terminateSelectedProcess}
            disabled={!selectedPid || selectedProc?.status === 'terminated'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-700 hover:bg-red-800 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-semibold rounded transition-colors"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Hentikan Proses (SIGKILL)</span>
          </button>
        </div>
      </div>

      {feedbackMessage && (
        <div className="mb-3 p-2.5 rounded bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2 font-mono">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Process Table View */}
      <div className="overflow-x-auto flex-1 text-xs font-mono">
        <table className="w-full text-left border border-slate-200">
          <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[11px] border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">PID</th>
              <th className="py-2.5 px-3">PPID</th>
              <th className="py-2.5 px-3">Nama Biner</th>
              <th className="py-2.5 px-3">CPU (%)</th>
              <th className="py-2.5 px-3">Memori (MB)</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Jalur Perintah (Command Line)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-[11px]">
            {processes.map((proc) => {
              const isSelected = selectedPid === proc.pid;
              const isTerminated = proc.status === 'terminated';

              return (
                <tr
                  key={proc.pid}
                  onClick={() => !isTerminated && setSelectedPid(proc.pid)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-100/70 border-l-4 border-l-blue-700'
                      : proc.isMalicious && !isTerminated
                      ? 'bg-red-50 hover:bg-red-100/70'
                      : 'hover:bg-slate-50'
                  } ${isTerminated ? 'opacity-40 line-through bg-slate-50' : ''}`}
                >
                  <td className="py-2.5 px-3 font-bold text-slate-900">{proc.pid}</td>
                  <td className="py-2.5 px-3 text-slate-500">{proc.ppid}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-1.5">
                    {proc.name}
                    {proc.isMalicious && !isTerminated && (
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" title="Muatan Parasit Terdeteksi" />
                    )}
                  </td>
                  <td className={`py-2.5 px-3 ${proc.cpuPercent > 10 ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                    {proc.cpuPercent}%
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{proc.memoryMB} MB</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isTerminated
                          ? 'bg-slate-200 text-slate-700'
                          : proc.isMalicious
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {isTerminated ? 'TERMINATED' : proc.isMalicious ? 'ROUGE THREAD' : 'RUNNING'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 truncate max-w-xs" title={proc.command}>
                    {proc.command}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-3 text-[11px] text-slate-500 font-mono flex items-center justify-between border-t border-slate-100 mt-2">
        <span>Petunjuk: Klik baris proses berbahaya yang mengonsumsi CPU tinggi lalu tekan SIGKILL.</span>
        <span>Total: {processes.length} Proses</span>
      </div>
    </div>
  );
}
