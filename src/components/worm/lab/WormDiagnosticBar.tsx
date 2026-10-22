// File: src/components/worm/lab/WormDiagnosticBar.tsx
'use client';

import React, { useEffect } from 'react';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { Activity, Wifi, ShieldAlert, ShieldCheck, Radio, AlertTriangle, X, Flame } from 'lucide-react';

export function WormDiagnosticBar() {
  const {
    bandwidthUsage,
    packetRate,
    nodes,
    isSimulating,
    executeScanningPulse,
    isFullyRemediated,
    reinfectionAlert,
    clearReinfectionAlert,
  } = useWormTopologyStore();

  // 2.5s Autonomous scanning pulse loop
  useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      executeScanningPulse();
    }, 2500);

    return () => clearInterval(timer);
  }, [isSimulating, executeScanningPulse]);

  const pcs = nodes.filter((n) => n.data.deviceType === 'pc');
  const infectedCount = pcs.filter((n) => n.data.status === 'infected').length;
  const totalPcs = pcs.length;

  const isSaturated = bandwidthUsage >= 80;
  const isElevated = bandwidthUsage >= 35;

  const allPortsBlocked = pcs.length > 0 && pcs.every((n) => !n.data.port445Open);
  const anyPortBlocked = pcs.some((n) => !n.data.port445Open);

  return (
    <div className="space-y-2.5">
      {/* Alert Notice: Re-infection Warning if triggered */}
      {reinfectionAlert && (
        <div className="bg-rose-50 border border-rose-300 text-rose-900 px-3.5 py-2.5 rounded text-xs flex items-start justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Peringatan Rekoneksi Berbahaya: </span>
              <span className="leading-relaxed">{reinfectionAlert}</span>
            </div>
          </div>
          <button
            onClick={clearReinfectionAlert}
            className="text-rose-500 hover:text-rose-800 p-0.5 rounded transition-colors"
            title="Tutup pemberitahuan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Metrics Row: 5 Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {/* Metric 1: Bandwidth Usage */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Utilisasi Bandwidth LAN</span>
            <Wifi className={`w-3.5 h-3.5 ${isSaturated ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`} />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className={`text-base font-bold font-mono ${isSaturated ? 'text-rose-700' : isElevated ? 'text-amber-700' : 'text-slate-900'}`}>
              {bandwidthUsage}%
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {isSaturated ? 'saturasi' : 'throughput'}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isSaturated ? 'bg-rose-500' : isElevated ? 'bg-amber-500' : 'bg-slate-400'}`}
              style={{ width: `${Math.min(100, bandwidthUsage)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            {isSaturated ? 'Lonjakan Trafik Port 445' : 'Trafik Broadcast Normal'}
          </div>
        </div>

        {/* Metric 2: Packet Rate (NetFlow) */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Laju Paket Subnet</span>
            <Activity className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className={`text-base font-bold font-mono ${packetRate > 200 ? 'text-rose-700' : 'text-slate-900'}`}>
              {packetRate}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">pkt/s</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${packetRate > 200 ? 'bg-rose-500' : 'bg-slate-400'}`}
              style={{ width: `${Math.min(100, (packetRate / 600) * 100)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            {packetRate > 200 ? 'SYN Scan Sweep Banjir' : 'Throughput Jaringan Stabil'}
          </div>
        </div>

        {/* Metric 3: Host Terkompromi */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Host Terkompromi</span>
            {infectedCount > 0 ? (
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            ) : isFullyRemediated ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            )}
          </div>
          <div className="mt-1">
            <span className={`text-xs font-mono font-bold ${
              infectedCount > 0
                ? 'text-rose-700'
                : isFullyRemediated
                ? 'text-emerald-700'
                : 'text-slate-700'
            }`}>
              {infectedCount} / {totalPcs} WORKSTATION
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            {infectedCount > 0
              ? 'Lateral Movement Aktif'
              : isFullyRemediated
              ? 'Seluruh PC Terproteksi'
              : 'Subnet Belum Terpapar'}
          </div>
        </div>

        {/* Metric 4: Firewall Port 445 (SMB ACL) */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Firewall Port 445 (SMB)</span>
            {allPortsBlocked ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Flame className="w-3.5 h-3.5 text-amber-500" />
            )}
          </div>
          <div className="mt-1">
            <span className={`text-xs font-mono font-bold ${
              allPortsBlocked
                ? 'text-emerald-700'
                : anyPortBlocked
                ? 'text-amber-700'
                : 'text-slate-700'
            }`}>
              {allPortsBlocked
                ? 'BLOKIR TOTAL (INBOUND)'
                : anyPortBlocked
                ? 'TERPARSIAL DITUTUP'
                : 'ALLOW (PORT TERBUKA)'}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            {allPortsBlocked ? 'GPO NetBIOS/SMB Ditutup' : 'Rentan Exploit EternalBlue'}
          </div>
        </div>

        {/* Metric 5: Detak Propagasi Worm */}
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-4 lg:col-span-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Detak Propagasi Worm</span>
            <Radio className={`w-3.5 h-3.5 ${isSimulating ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`} />
          </div>
          <div className="mt-1">
            <span className={`text-xs font-mono font-bold ${
              isSimulating
                ? 'text-rose-700'
                : isFullyRemediated
                ? 'text-emerald-700'
                : 'text-slate-600'
            }`}>
              {isSimulating ? 'AKTIF (INTERVAL 2.5s)' : isFullyRemediated ? 'TERHENTI (AMAN)' : 'IDLE (MENUNGGU)'}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            {isSimulating ? 'Pemindaian IP Rentan' : 'Tidak Ada Paket Worm'}
          </div>
        </div>
      </div>
    </div>
  );
}
