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
import { Network, MousePointerClick, Radio } from 'lucide-react';

const nodeTypes: NodeTypes = {
  wormNode: WormCustomNode,
};

export function WormTopologyCanvas() {
  const { nodes, edges, isSimulating } = useWormTopologyStore();

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs flex flex-col h-[400px]">
      {/* Topology Canvas Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3.5 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-slate-700" />
          <span className="font-bold text-slate-900">
            Kanvas Interaktif Subnet SIJA (React Flow)
          </span>
          {isSimulating && (
            <span className="flex items-center gap-1 text-[10px] text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-semibold">
              <Radio className="w-2.5 h-2.5 animate-pulse" />
              <span>Scanning Pulse Aktif (2.5s)</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <MousePointerClick className="w-3.5 h-3.5 text-slate-400" />
          <span>Klik node untuk membuka X-Ray Inspector &amp; Kontrol SOP</span>
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
