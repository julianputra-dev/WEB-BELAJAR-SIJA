// File: src/components/ransomware/lab/RansomwareTerminalLog.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { useRansomwareLabStore } from '@/store/useRansomwareLabStore';

export function RansomwareTerminalLog() {
  const { logs } = useRansomwareLabStore();
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Selalu pastikan entri log terbaru di paling atas langsung terlihat oleh siswa
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = 0;
    }
  }, [logs]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex flex-col h-44 shadow-inner font-mono text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px] mb-2 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-bold text-slate-200">Incident Terminal Console &amp; Forensic Log Feed</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
          Urutan: Log Terbaru di Paling Atas
        </span>
      </div>

      <div ref={terminalContainerRef} className="flex-1 overflow-y-auto space-y-1.5 text-[11px] pr-2">
        {logs.map((log) => {
          let textCol = 'text-slate-300';
          if (log.level === 'error') textCol = 'text-rose-400 font-medium';
          else if (log.level === 'warn') textCol = 'text-amber-300';
          else if (log.level === 'success') textCol = 'text-emerald-400 font-medium';
          else if (log.level === 'info') textCol = 'text-sky-300';

          return (
            <div key={log.id} className="leading-relaxed flex items-start gap-1">
              <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
              <div className="min-w-0">
                {log.command && (
                  <span className="text-cyan-300 font-bold font-mono mr-2">
                    {log.command} &gt;
                  </span>
                )}
                <span className={textCol}>{log.message}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
