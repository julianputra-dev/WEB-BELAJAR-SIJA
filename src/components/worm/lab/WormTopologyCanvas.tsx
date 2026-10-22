// File: src/components/worm/lab/WormTopologyCanvas.tsx
'use client';

import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { WormCustomNode } from './WormCustomNode';
import { Network, MousePointerClick, Radio, ShieldCheck } from 'lucide-react';

const nodeTypes: NodeTypes = {
  wormNode: WormCustomNode,
};

export function WormTopologyCanvas() {
  const { nodes, edges, isSimulating, isFullyRemediated, triggerInitialInfection } = useWormTopologyStore();

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs flex flex-col h-[400px]">
      {/* Topology Canvas Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-slate-700" />
          <span className="font-bold text-slate-900">
            Kanvas Interaktif Subnet SIJA (React Flow)
          </span>
          {isSimulating ? (
            <span className="flex items-center gap-1 text-[10px] text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded font-semibold">
              <Radio className="w-2.5 h-2.5 animate-pulse" />
              <span>Scanning Pulse Aktif (2.5s)</span>
            </span>
          ) : isFullyRemediated ? (
            <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Subnet Terproteksi</span>
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          {!isSimulating && !isFullyRemediated && (
            <button
              onClick={triggerInitialInfection}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded shadow-xs transition-colors"
              title="Luncurkan serangan worm otonom ke PC-01"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Picu Kompromi PC-01</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <MousePointerClick className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Klik node untuk X-Ray &amp; Kontrol SOP</span>
          </div>
        </div>
      </div>

      {/* React Flow Viewport */}
      <div className="flex-1 w-full h-full relative bg-slate-50/50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          attributionPosition="bottom-right"
          minZoom={0.5}
          maxZoom={1.5}
        >
          <Background color="#cbd5e1" gap={20} size={1} />
          <Controls className="bg-white border-slate-300 shadow-xs fill-slate-700" />
        </ReactFlow>

        {/* Legend Overlay at bottom left */}
        <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs border border-slate-200 rounded p-2 text-[10px] font-mono text-slate-600 space-y-1 shadow-xs pointer-events-none">
          <div className="font-bold text-slate-800 text-[11px] border-b border-slate-100 pb-0.5 mb-1">
            Indikator Status Node:
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>Clean (Normal)</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Infected (Spreading)</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Isolated (LAN Down)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Patched (Aman)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
