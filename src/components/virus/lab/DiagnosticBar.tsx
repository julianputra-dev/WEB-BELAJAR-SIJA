// File: src/components/virus/lab/DiagnosticBar.tsx
import React from 'react';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import { Activity, Cpu, HardDrive, Database } from 'lucide-react';

export function DiagnosticBar() {
  const { phase, safeMode, processes } = useVirusLabStore();

  const isRogueRunning = processes.some((p) => p.isMalicious && p.status === 'running');
  const cpuVal = isRogueRunning ? 89.2 : safeMode ? 8.4 : 14.1;
  const ramVal = isRogueRunning ? 74.5 : safeMode ? 22.0 : 38.6;
  const diskActivity = isRogueRunning ? '32.4 MB/s (INJECTION WRITE)' : '0.1 MB/s (IDLE)';

  return (
    <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
      <div className="flex items-center gap-6">
        {/* CPU Telemetri */}
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-slate-500" />
          <span className="text-slate-500">CPU Usage:</span>
          <span className={`font-bold ${cpuVal > 50 ? 'text-red-600' : 'text-slate-800'}`}>
            {cpuVal}%
          </span>
          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden inline-block ml-1">
            <div
              className={`h-full ${cpuVal > 50 ? 'bg-red-500' : 'bg-slate-700'}`}
              style={{ width: `${Math.min(100, cpuVal)}%` }}
            />
          </div>
        </div>

        {/* RAM Telemetri */}
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-slate-500" />
          <span className="text-slate-500">RAM Load:</span>
          <span className={`font-bold ${ramVal > 60 ? 'text-amber-600' : 'text-slate-800'}`}>
            {ramVal}%
          </span>
          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden inline-block ml-1">
            <div
              className={`h-full ${ramVal > 60 ? 'bg-amber-500' : 'bg-slate-700'}`}
              style={{ width: `${Math.min(100, ramVal)}%` }}
            />
          </div>
        </div>

        {/* Disk I/O */}
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-slate-500" />
          <span className="text-slate-500">Disk I/O:</span>
          <span className={`font-semibold ${isRogueRunning ? 'text-red-700' : 'text-slate-700'}`}>
            {diskActivity}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-500">
        <Activity className="w-3.5 h-3.5 text-slate-400" />
        <span>Hardware Simulation Monitor • Active Polling</span>
      </div>
    </div>
  );
}
