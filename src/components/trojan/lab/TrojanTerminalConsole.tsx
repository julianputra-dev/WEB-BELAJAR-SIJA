// File: src/components/trojan/lab/TrojanTerminalConsole.tsx
'use client';

import React from 'react';
import { Terminal } from 'lucide-react';
import { useTrojanLabStore } from '@/store/useTrojanLabStore';

export function TrojanTerminalConsole() {
  const { logs } = useTrojanLabStore();

  return (
    <div className="bg-slate-900 text-slate-200 rounded-lg p-3.5 shadow-xs flex flex-col font-mono text-xs border border-slate-800">
      {/* Console Header */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-slate-800 rounded text-slate-300">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-200">
            Endpoint Detection &amp; Response (EDR) Forensic Audit Console
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-slate-400">LIVE FEED</span>
        </div>
      </div>

      {/* Log Feed */}
      <div className="space-y-1.5 h-44 overflow-y-auto pr-1 text-xs">
        {logs.map((log) => {
          const badgeClass =
            log.category === 'FIREWALL'
              ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800'
              : log.category === 'KERNEL'
              ? 'text-amber-400 bg-amber-950/60 border-amber-800'
              : log.category === 'NETSTAT'
              ? 'text-rose-400 bg-rose-950/60 border-rose-800'
              : log.category === 'REGISTRY'
              ? 'text-purple-400 bg-purple-950/60 border-purple-800'
              : 'text-slate-400 bg-slate-800 border-slate-700';

          return (
            <div key={log.id} className="leading-relaxed flex items-start gap-2 text-[11px]">
              <span className="text-slate-500 shrink-0 select-none">{log.timestamp}</span>
              <span className={`px-1 rounded border text-[9.5px] font-bold shrink-0 ${badgeClass}`}>
                {log.category}
              </span>
              <span
                className={`flex-1 break-words ${
                  log.level === 'error'
                    ? 'text-rose-300 font-semibold'
                    : log.level === 'warn'
                    ? 'text-amber-300'
                    : log.level === 'success'
                    ? 'text-emerald-300 font-semibold'
                    : 'text-slate-300'
                }`}
              >
                {log.message}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between items-center">
        <span>Host Forensics Telemetry Subsystem (Winsock2 &bull; Kernel Handles &bull; Registry Audit)</span>
        <span>Total Catatan: {logs.length}</span>
      </div>
    </div>
  );
}
