// File: src/components/layout/SystemMonitorBar.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { useLessonPhaseStore } from '@/store/useLessonPhaseStore';
import { Cpu, Activity, Wifi, Terminal as TerminalIcon, Trash2 } from 'lucide-react';

interface SystemMonitorBarProps {
  cpuUsage?: number;
  ramUsage?: number;
  bandwidthUsage?: number;
}

export const SystemMonitorBar: React.FC<SystemMonitorBarProps> = ({
  cpuUsage = 14,
  ramUsage = 32,
  bandwidthUsage = 8,
}) => {
  const { systemLogs, currentPhase } = useLessonPhaseStore();
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal log to bottom on new message
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [systemLogs]);

  const getMetricColor = (val: number) => {
    if (val >= 80) return 'bg-red-500 text-red-400';
    if (val >= 50) return 'bg-amber-500 text-amber-400';
    return 'bg-cyan-500 text-cyan-400';
  };

  return (
    <footer className="h-44 bg-slate-950 border-t border-slate-800 flex flex-col md:flex-row text-slate-200 select-none">
      {/* Metric Gauges (Kiri Bawah) */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-800 p-3.5 flex flex-col justify-between bg-slate-900/60">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Hardware & Network Telemetry
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              currentPhase === 'infected' ? 'bg-red-500 animate-ping' : 'bg-emerald-500'
            }`}
          />
        </div>

        {/* CPU Gauge */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Cpu className="w-3 h-3 text-cyan-400" /> CPU Core Load
            </span>
            <span className={`font-bold ${getMetricColor(cpuUsage).split(' ')[1]}`}>
              {cpuUsage}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${getMetricColor(cpuUsage).split(' ')[0]}`}
              style={{ width: `${Math.min(100, Math.max(0, cpuUsage))}%` }}
            />
          </div>
        </div>

        {/* RAM Gauge */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Activity className="w-3 h-3 text-purple-400" /> RAM Memory Pool
            </span>
            <span className={`font-bold ${getMetricColor(ramUsage).split(' ')[1]}`}>
              {ramUsage}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${getMetricColor(ramUsage).split(' ')[0]}`}
              style={{ width: `${Math.min(100, Math.max(0, ramUsage))}%` }}
            />
          </div>
        </div>

        {/* Bandwidth LAN Gauge */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Wifi className="w-3 h-3 text-blue-400" /> LAN Bandwidth
            </span>
            <span className={`font-bold ${getMetricColor(bandwidthUsage).split(' ')[1]}`}>
              {bandwidthUsage}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${getMetricColor(bandwidthUsage).split(' ')[0]}`}
              style={{ width: `${Math.min(100, Math.max(0, bandwidthUsage))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Terminal Log Output (Kanan Bawah) */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
        <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] text-slate-300">SIJA Lab Kernel Audit Log (Real-Time Events)</span>
          </div>
          <span className="text-[10px] text-slate-500">Auto-tail: ON</span>
        </div>

        <div
          ref={logContainerRef}
          className="flex-1 p-3 overflow-y-auto font-mono text-xs space-y-1 select-text bg-black/40"
        >
          {systemLogs.map((log, index) => {
            const isError = log.includes('ERR') || log.includes('Peringatan') || log.includes('Fatal');
            const isSuccess = log.includes('berhasil') || log.includes('pulih') || log.includes('OK');
            const isAlert = log.includes('INFECT') || log.includes('ALERT') || log.includes('WORM');

            return (
              <div
                key={index}
                className={`leading-relaxed text-[11px] ${
                  isError
                    ? 'text-red-400 bg-red-950/30 px-1 rounded'
                    : isSuccess
                    ? 'text-emerald-400'
                    : isAlert
                    ? 'text-amber-400'
                    : 'text-slate-300'
                }`}
              >
                <span className="text-slate-600 mr-2">[{String(index + 1).padStart(2, '0')}]</span>
                {log}
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
