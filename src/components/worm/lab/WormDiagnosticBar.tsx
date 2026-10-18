// File: src/components/worm/lab/WormDiagnosticBar.tsx
'use client';

import React, { useEffect } from 'react';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { Activity, Wifi, ShieldAlert, Cpu, Radio, Network } from 'lucide-react';

export function WormDiagnosticBar() {
  const {
    bandwidthUsage,
    packetRate,
    nodes,
    isSimulating,
    executeScanningPulse,
    isFullyRemediated,
  } = useWormTopologyStore();

  // 2.5s Autonomous scanning pulse loop
  useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      executeScanningPulse();
    }, 2500);

    return () => clearInterval(timer);
  }, [isSimulating, executeScanningPulse]);

  const infectedCount = nodes.filter(
    (n) => n.data.deviceType === 'pc' && n.data.status === 'infected'
  ).length;
  const totalPcs = nodes.filter((n) => n.data.deviceType === 'pc').length;

  const isSaturated = bandwidthUsage >= 80;
  const isElevated = bandwidthUsage >= 35;

  return (
    <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
      <div className="flex items-center gap-6">
        {/* Bandwidth Usage */}
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-slate-500" />
          <span className="text-slate-500">Utilisasi Bandwidth LAN:</span>
          <span
            className={`font-bold ${
              isSaturated ? 'text-red-600' : isElevated ? 'text-amber-600' : 'text-slate-800'
            }`}
          >
            {bandwidthUsage}% {isSaturated ? '(SATURASI)' : ''}
          </span>
          <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden inline-block ml-1">
            <div
              className={`h-full transition-all duration-500 ${
                isSaturated ? 'bg-red-500' : isElevated ? 'bg-amber-500' : 'bg-slate-700'
              }`}
              style={{ width: `${Math.min(100, bandwidthUsage)}%` }}
            />
          </div>
        </div>

        {/* Packet Rate */}
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-slate-500" />
          <span className="text-slate-500">Laju Paket Subnet:</span>
          <span className={`font-semibold ${packetRate > 200 ? 'text-red-700' : 'text-slate-800'}`}>
            {packetRate} pkt/s
          </span>
        </div>

        {/* Host Infection Status */}
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-500" />
          <span className="text-slate-500">Host Terkompromi:</span>
          <span
            className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
              infectedCount > 0
                ? 'bg-red-100 text-red-800 border border-red-200'
                : isFullyRemediated
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {infectedCount} / {totalPcs} Workstation
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-500">
        {isSimulating ? (
          <span className="flex items-center gap-1.5 text-red-700 font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-600" />
            <span>Detak Pemindaian Otomatis: Setiap 2.5 Detik</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 text-slate-500">
            <Network className="w-3.5 h-3.5 text-slate-400" />
            <span>Subnet Idle • Menunggu Inisiasi</span>
          </span>
        )}
      </div>
    </div>
  );
}
