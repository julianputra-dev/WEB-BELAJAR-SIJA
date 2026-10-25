// File: src/components/worm/lab/WormTaskManager.tsx
'use client';

import React from 'react';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { WormNodeData } from '@/types/wormLab';
import { Cpu, XCircle, AlertTriangle } from 'lucide-react';

interface WormTaskManagerProps {
  nodeId: string;
  data: WormNodeData;
}

export function WormTaskManager({ nodeId, data }: WormTaskManagerProps) {
  const { killWormProcess } = useWormTopologyStore();
  const isPc = data.deviceType === 'pc';

  if (!isPc) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-slate-700" />
          <span>Task Manager: Tabel Proses di RAM (Host Memory Table)</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          PID Monitoring • Real-time RAM
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-2 px-3">Nama Proses (Binary)</th>
              <th className="py-2 px-3">PID</th>
              <th className="py-2 px-3">User</th>
              <th className="py-2 px-3">CPU</th>
              <th className="py-2 px-3">RAM</th>
              <th className="py-2 px-3">Status Socket</th>
              <th className="py-2 px-3 text-right">Aksi Penanganan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
            {data.processActive && (
              <tr className="bg-red-50/70 text-red-950 font-semibold hover:bg-red-50 transition-colors">
                <td className="py-2 px-3 flex items-center gap-1.5 text-red-700">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-pulse text-red-600" />
                  <span className="font-bold">worm_service.exe</span>
                </td>
                <td className="py-2 px-3">4450</td>
                <td className="py-2 px-3 text-[10px]">SYSTEM</td>
                <td className="py-2 px-3 text-red-600 font-bold">88.4%</td>
                <td className="py-2 px-3">142.8 MB</td>
                <td className="py-2 px-3 text-[10px] text-red-700">TCP 0.0.0.0:445 (LISTEN)</td>
                <td className="py-2 px-3 text-right">
                  <button
                    onClick={() => killWormProcess(nodeId)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded shadow-xs transition-colors"
                  >
                    <XCircle className="w-3 h-3" />
                    <span>Kill Process (SIGKILL)</span>
                  </button>
                </td>
              </tr>
            )}

            <tr className="hover:bg-slate-50 text-slate-700">
              <td className="py-2 px-3 font-medium">svchost.exe</td>
              <td className="py-2 px-3">684</td>
              <td className="py-2 px-3 text-[10px]">SYSTEM</td>
              <td className="py-2 px-3">1.2%</td>
              <td className="py-2 px-3">34.1 MB</td>
              <td className="py-2 px-3 text-[10px] text-slate-500">RPC Endpoint Mapper</td>
              <td className="py-2 px-3 text-right text-[10px] text-slate-400">OS Protected</td>
            </tr>

            <tr className="hover:bg-slate-50 text-slate-700">
              <td className="py-2 px-3 font-medium">lsass.exe</td>
              <td className="py-2 px-3">592</td>
              <td className="py-2 px-3 text-[10px]">SYSTEM</td>
              <td className="py-2 px-3">0.4%</td>
              <td className="py-2 px-3">18.5 MB</td>
              <td className="py-2 px-3 text-[10px] text-slate-500">Local Auth Authority</td>
              <td className="py-2 px-3 text-right text-[10px] text-slate-400">OS Protected</td>
            </tr>

            <tr className="hover:bg-slate-50 text-slate-700">
              <td className="py-2 px-3 font-medium">explorer.exe</td>
              <td className="py-2 px-3">2140</td>
              <td className="py-2 px-3 text-[10px]">LabStudent</td>
              <td className="py-2 px-3">2.1%</td>
              <td className="py-2 px-3">76.2 MB</td>
              <td className="py-2 px-3 text-[10px] text-slate-500">Desktop GUI Shell</td>
              <td className="py-2 px-3 text-right text-[10px] text-slate-400">Standard User</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
