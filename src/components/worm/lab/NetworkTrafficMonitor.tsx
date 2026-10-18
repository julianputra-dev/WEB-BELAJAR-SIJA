// File: src/components/worm/lab/NetworkTrafficMonitor.tsx
'use client';

import React, { useState } from 'react';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { PacketLogEntry } from '@/types/wormLab';
import { Radio, ShieldAlert, Filter, Pause, Play, CheckCircle2 } from 'lucide-react';

export function NetworkTrafficMonitor() {
  const { packetLogs, bandwidthUsage, packetRate, isSimulating } = useWormTopologyStore();
  const [filterType, setFilterType] = useState<'all' | 'exploit' | 'dropped'>('all');
  const [isPaused, setIsPaused] = useState(false);

  const filteredLogs = packetLogs.filter((log) => {
    if (filterType === 'all') return true;
    return log.type === filterType;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-slate-700" />
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
            Monitor Trafik Bandwidth LAN &amp; Log Paket Real-Time (Network Sniffer)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Buttons */}
          <div className="flex items-center gap-1 text-[10px] font-mono bg-slate-100 p-0.5 rounded border border-slate-200">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2 py-0.5 rounded ${
                filterType === 'all'
                  ? 'bg-white font-bold text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({packetLogs.length})
            </button>
            <button
              onClick={() => setFilterType('exploit')}
              className={`px-2 py-0.5 rounded ${
                filterType === 'exploit'
                  ? 'bg-white font-bold text-red-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Eksploit SMB
            </button>
            <button
              onClick={() => setFilterType('dropped')}
              className={`px-2 py-0.5 rounded ${
                filterType === 'dropped'
                  ? 'bg-white font-bold text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Firewall Drop
            </button>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
          >
            {isPaused ? <Play className="w-3 h-3 text-emerald-600" /> : <Pause className="w-3 h-3 text-slate-600" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
        </div>
      </div>

      {/* Packet Table Stream */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-900 text-slate-100">
        <div className="max-h-52 overflow-y-auto font-mono text-[11px]">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase sticky top-0 border-b border-slate-800">
              <tr>
                <th className="py-1.5 px-2.5">Waktu</th>
                <th className="py-1.5 px-2.5">Sumber (Src IP)</th>
                <th className="py-1.5 px-2.5">Tujuan (Dst IP)</th>
                <th className="py-1.5 px-2.5">Protokol</th>
                <th className="py-1.5 px-2.5">Port</th>
                <th className="py-1.5 px-2.5">Detail Muatan Paket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-[10px]">
              {filteredLogs.map((log, idx) => (
                <tr
                  key={`${log.id}-${idx}`}
                  className={`hover:bg-slate-800/60 transition-colors ${
                    log.type === 'exploit'
                      ? 'bg-red-950/40 text-red-200'
                      : log.type === 'dropped'
                      ? 'bg-emerald-950/30 text-emerald-200'
                      : 'text-slate-300'
                  }`}
                >
                  <td className="py-1.5 px-2.5 text-slate-400">{log.timestamp}</td>
                  <td className="py-1.5 px-2.5 font-bold">{log.sourceIp}</td>
                  <td className="py-1.5 px-2.5 font-bold">{log.targetIp}</td>
                  <td className="py-1.5 px-2.5">
                    <span
                      className={`px-1 py-0.5 rounded text-[9px] ${
                        log.type === 'exploit'
                          ? 'bg-red-900 text-red-200'
                          : log.type === 'dropped'
                          ? 'bg-emerald-900 text-emerald-200'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {log.protocol}
                    </span>
                  </td>
                  <td className="py-1.5 px-2.5">{log.port || 'Any'}</td>
                  <td className="py-1.5 px-2.5 truncate max-w-xs">{log.info}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-slate-500">
                    Tidak ada paket dengan kriteria filter terpilih.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
