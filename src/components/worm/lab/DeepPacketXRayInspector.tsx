// File: src/components/worm/lab/DeepPacketXRayInspector.tsx
'use client';

import React from 'react';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { WormInterfaceControls } from './WormInterfaceControls';
import { WormTaskManager } from './WormTaskManager';
import { SmbPacketInspector } from './SmbPacketInspector';
import { Monitor, Server, Network, Eye } from 'lucide-react';

export function DeepPacketXRayInspector() {
  const { nodes, selectedNodeId } = useWormTopologyStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  if (!selectedNode) return null;

  const { data, id } = selectedNode;
  const isPc = data.deviceType === 'pc';

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-4">
      {/* Node Identification Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-slate-100 border border-slate-200 text-slate-800">
            {isPc ? (
              <Monitor className="w-5 h-5 text-slate-800" />
            ) : data.deviceType === 'switch' ? (
              <Network className="w-5 h-5 text-blue-700" />
            ) : (
              <Server className="w-5 h-5 text-slate-800" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">{data.label}</h2>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  data.status === 'infected'
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : data.status === 'isolated'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : data.status === 'patched'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                STATUS: {data.status}
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
              <span>IP: <strong className="text-slate-800">{data.ipAddress}</strong></span>
              <span>MAC: <strong className="text-slate-800">{data.macAddress}</strong></span>
              <span>OS: <strong className="text-slate-700">{data.osName}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded">
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          <span>Fokus Forensik Aktif</span>
        </div>
      </div>

      {/* 1. Interface Controls (LAN switch & Firewall Port 445) */}
      <WormInterfaceControls nodeId={id} data={data} />

      {/* 2. SMB Port 445 Deep Packet & Socket X-Ray Inspector */}
      <SmbPacketInspector data={data} />

      {/* 3. Task Manager RAM Process Table (Kill Process) */}
      <WormTaskManager nodeId={id} data={data} />
    </div>
  );
}
