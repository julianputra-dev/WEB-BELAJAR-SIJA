// File: src/components/virus/lab/ForensicTerminal.tsx
import React, { useEffect, useRef } from 'react';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import { Terminal, Copy } from 'lucide-react';

export function ForensicTerminal() {
  const { systemLogs } = useVirusLabStore();
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [systemLogs]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 flex flex-col h-48 shadow-inner font-mono text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px] mb-2 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-bold text-slate-200">Forensic Audit Console &amp; Incident Log</span>
        </div>
        <span className="text-[10px] text-slate-500">Live Telemetry Feed</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 text-[11px] pr-2">
        {systemLogs.map((log, idx) => {
          const isError = log.includes('[FAIL]') || log.includes('[CRITICAL') || log.includes('[MALWARE]');
          const isSuccess = log.includes('[SOP') || log.includes('[DISINFECT]') || log.includes('[AUDIT COMPLETED]');

          return (
            <div
              key={idx}
              className={`leading-relaxed ${
                isError
                  ? 'text-red-400'
                  : isSuccess
                  ? 'text-emerald-400'
                  : 'text-slate-300'
              }`}
            >
              {log}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
