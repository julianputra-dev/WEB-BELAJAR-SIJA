// File: src/components/worm/lab/WormCustomNode.tsx
'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { WormNodeData } from '@/types/wormLab';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { Monitor, Server, Network, Wifi, WifiOff, ShieldCheck, ShieldAlert, Cpu } from 'lucide-react';

export const WormCustomNode = ({ id, data }: NodeProps & { data: WormNodeData }) => {
  const { selectedNodeId, setSelectedNode } = useWormTopologyStore();
  const isSelected = selectedNodeId === id;

  const isPc = data.deviceType === 'pc';
  const isSwitch = data.deviceType === 'switch';
  const isServer = data.deviceType === 'server';

  const isInfected = data.status === 'infected';
  const isIsolated = data.status === 'isolated';
  const isPatched = data.status === 'patched';

  return (
    <div
      onClick={() => setSelectedNode(id)}
      className={`p-3 rounded-lg border text-left min-w-[210px] bg-white transition-all cursor-pointer shadow-xs ${
        isSelected
          ? 'ring-2 ring-blue-600 border-blue-500 shadow-md'
          : 'border-slate-300 hover:border-slate-400'
      } ${
        isInfected
          ? 'bg-red-50/60 border-red-300 ring-1 ring-red-400'
          : isIsolated
          ? 'bg-amber-50/50 border-amber-300'
          : isPatched
          ? 'bg-emerald-50/40 border-emerald-300'
          : ''
      }`}
    >
      {/* Dedicated Connection Handles for Switch vs Workstations */}
      {isSwitch ? (
        <>
          {/* Port Fa0/1 for PC-01 (Top-Left of Switch) */}
          <Handle
            type="source"
            position={Position.Left}
            id="sw-port-pc1-src"
            style={{ top: '28%' }}
            className="w-2.5 h-2.5 !bg-blue-600 border border-white"
          />
          <Handle
            type="target"
            position={Position.Left}
            id="sw-port-pc1-tgt"
            style={{ top: '28%' }}
            className="w-2.5 h-2.5 !bg-blue-600 border border-white"
          />

          {/* Port Fa0/2 for PC-02 (Bottom-Left of Switch) */}
          <Handle
            type="source"
            position={Position.Left}
            id="sw-port-pc2-src"
            style={{ top: '72%' }}
            className="w-2.5 h-2.5 !bg-blue-600 border border-white"
          />
          <Handle
            type="target"
            position={Position.Left}
            id="sw-port-pc2-tgt"
            style={{ top: '72%' }}
            className="w-2.5 h-2.5 !bg-blue-600 border border-white"
          />

          {/* Port Fa0/3 for PC-03 (Top-Right of Switch) */}
          <Handle
            type="source"
            position={Position.Right}
            id="sw-port-pc3-src"
            style={{ top: '28%' }}
            className="w-2.5 h-2.5 !bg-blue-600 border border-white"
          />
          <Handle
            type="target"
            position={Position.Right}
            id="sw-port-pc3-tgt"
            style={{ top: '28%' }}
            className="w-2.5 h-2.5 !bg-blue-600 border border-white"
          />

          {/* Port Gi0/1 for Server-01 (Bottom-Right of Switch) */}
          <Handle
            type="source"
            position={Position.Right}
            id="sw-port-server-src"
            style={{ top: '72%' }}
            className="w-2.5 h-2.5 !bg-blue-600 border border-white"
          />
          <Handle
            type="target"
            position={Position.Right}
            id="sw-port-server-tgt"
            style={{ top: '72%' }}
            className="w-2.5 h-2.5 !bg-blue-600 border border-white"
          />
        </>
      ) : (
        <>
          {/* Workstation / Server Handles */}
          <Handle
            type="source"
            position={Position.Left}
            id="left-src"
            className="w-2 h-2 !bg-slate-400"
          />
          <Handle
            type="target"
            position={Position.Left}
            id="left-tgt"
            className="w-2 h-2 !bg-slate-400"
          />

          <Handle
            type="source"
            position={Position.Right}
            id="right-src"
            className="w-2 h-2 !bg-slate-400"
          />
          <Handle
            type="target"
            position={Position.Right}
            id="right-tgt"
            className="w-2 h-2 !bg-slate-400"
          />
        </>
      )}

      {/* Header Bar */}
      <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-slate-200 mb-2">
        <div className="flex items-center gap-1.5">
          {isPc && <Monitor className="w-4 h-4 text-slate-700" />}
          {isSwitch && <Network className="w-4 h-4 text-blue-700" />}
          {isServer && <Server className="w-4 h-4 text-slate-800" />}
          <span className="font-bold text-xs text-slate-900 truncate max-w-[120px]">
            {data.label.split(' ')[0]}
          </span>
        </div>

        <span
          className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
            isInfected
              ? 'bg-red-100 text-red-800 border border-red-300 animate-pulse'
              : isIsolated
              ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : isPatched
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          {data.status}
        </span>
      </div>

      {/* Node Metrics */}
      <div className="space-y-1 text-[10px] font-mono">
        <div className="flex justify-between text-slate-600">
          <span className="text-slate-400">IP:</span>
          <span className="font-semibold text-slate-800">{data.ipAddress}</span>
        </div>

        {isPc && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Port 445:</span>
              <span
                className={`font-semibold px-1 rounded ${
                  data.port445Open
                    ? 'text-red-700 bg-red-100/70 border border-red-200'
                    : 'text-emerald-700 bg-emerald-100/70 border border-emerald-200'
                }`}
              >
                {data.port445Open ? 'ALLOW (Rentan)' : 'BLOCK (Aman)'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">Link LAN:</span>
              <span
                className={`font-semibold flex items-center gap-1 ${
                  data.isLanConnected ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {data.isLanConnected ? (
                  <>
                    <Wifi className="w-2.5 h-2.5" />
                    <span>UP</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-2.5 h-2.5" />
                    <span>DOWN</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">worm_service:</span>
              <span
                className={`font-bold ${
                  data.processActive ? 'text-red-600 animate-pulse' : 'text-slate-500'
                }`}
              >
                {data.processActive ? 'ACTIVE (92% CPU)' : 'NONE'}
              </span>
            </div>
          </>
        )}

        {isSwitch && (
          <div className="text-slate-500 pt-1 border-t border-slate-100 space-y-1">
            <div className="flex justify-between text-[9px] text-slate-600 font-mono">
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                Fa0/1: PC-01
              </span>
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                Fa0/3: PC-03
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              </span>
            </div>
            <div className="flex justify-between text-[9px] text-slate-600 font-mono">
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                Fa0/2: PC-02
              </span>
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                Gi0/1: Server
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
              </span>
            </div>
          </div>
        )}

        {isServer && (
          <div className="text-emerald-700 font-semibold pt-1 border-t border-slate-100 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Port 445 Terproteksi GPO</span>
          </div>
        )}
      </div>
    </div>
  );
};
