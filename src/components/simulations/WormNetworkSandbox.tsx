// File: src/components/simulations/WormNetworkSandbox.tsx
'use client';

import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { useLessonPhaseStore } from '@/store/useLessonPhaseStore';
import { ProgressService } from '@/services/progressService';
import { NetworkNodeData } from '@/types/simulation';
import {
  Monitor,
  Network,
  Shield,
  Wifi,
  WifiOff,
  Flame,
  CheckCircle,
  Radio,
  Server,
  Zap,
} from 'lucide-react';

// Custom Node Komputer / Switch Interaktif
const CustomNetworkNode = ({ data, id }: NodeProps & { data: NetworkNodeData }) => {
  const isPc = data.deviceType === 'pc';
  const isInfected = data.status === 'infected';
  const isIsolated = data.status === 'isolated';
  const isPatched = data.status === 'patched';

  return (
    <div
      className={`p-3 rounded-xl border min-w-[200px] shadow-xl backdrop-blur-md transition-all ${
        isInfected
          ? 'bg-red-950/80 border-red-500 text-red-200 animate-pulse'
          : isIsolated
          ? 'bg-amber-950/80 border-amber-600 text-amber-200'
          : isPatched
          ? 'bg-blue-950/80 border-blue-500 text-blue-200'
          : 'bg-slate-900/90 border-slate-700 text-slate-200'
      }`}
    >
      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/10 mb-2">
        <div className="flex items-center gap-1.5 font-bold text-xs">
          {isPc ? (
            <Monitor className="w-4 h-4 text-cyan-400" />
          ) : (
            <Network className="w-4 h-4 text-emerald-400" />
          )}
          <span>{data.label}</span>
        </div>
        <span
          className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
            isInfected
              ? 'bg-red-900 text-red-300'
              : isIsolated
              ? 'bg-amber-900 text-amber-300'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {data.status}
        </span>
      </div>

      <div className="space-y-1 text-[11px] font-mono">
        <div className="flex justify-between text-slate-400">
          <span>IP:</span>
          <span className="text-slate-200">{data.ipAddress}</span>
        </div>
        {isPc && (
          <>
            <div className="flex justify-between">
              <span className="text-slate-400">Port 445 (SMB):</span>
              <span
                className={`font-bold ${
                  data.port445Open ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {data.port445Open ? 'OPEN (Rentan)' : 'CLOSED (Aman)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Kabel LAN:</span>
              <span className={data.isLanConnected ? 'text-emerald-400' : 'text-amber-400'}>
                {data.isLanConnected ? 'Connected' : 'DISCONNECTED'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Proses Worm:</span>
              <span className={data.processActive ? 'text-red-400 font-bold' : 'text-slate-400'}>
                {data.processActive ? 'ACTIVE (94% CPU)' : 'INACTIVE'}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const nodeTypes = {
  default: CustomNetworkNode,
};

export const WormNetworkSandbox: React.FC = () => {
  const {
    nodes,
    edges,
    bandwidthUsage,
    injectWormPayload,
    disconnectLan,
    reconnectLan,
    togglePort445,
    terminateWormProcess,
    resetTopology,
  } = useWormTopologyStore();

  const { currentPhase, setPhase, triggerWrongOrderError } = useLessonPhaseStore();

  const pc01 = nodes.find((n) => n.id === 'pc-01');

  // Trigger Infeksi Worm
  const handleInjectWorm = () => {
    injectWormPayload();
    setPhase(
      'infected',
      '[ALERT] Worm menginjeksi paket exploit SMB! Port 445 terbuka di subnet diserang secara lateral.'
    );
  };

  // SOP Langkah 1: Isolasi Jaringan
  const handleDisconnectLan = () => {
    if (currentPhase === 'idle') {
      triggerWrongOrderError(
        'Jaringan belum terinfeksi. Lakukan injeksi simulasi terlebih dahulu.',
        '[WARN] Aksi diabaikan: Jaringan normal.'
      );
      return;
    }
    disconnectLan('pc-01');
    setPhase(
      'mitigation_step_1',
      '[SOP-1 SUCCESS] Kabel LAN PC-01 diputus. Propagasi paket Worm ke Switch terhenti!'
    );
  };

  // SOP Langkah 2: Patch / Tutup Port 445
  const handlePatchPort445 = () => {
    if (currentPhase === 'idle') {
      triggerWrongOrderError('Simulasi belum dimulai.', '[WARN] Aksi diabaikan.');
      return;
    }

    if (pc01?.data.isLanConnected) {
      triggerWrongOrderError(
        'Peringatan Kritis: Jangan menutup port saat kabel LAN masih tersambung dan banjir paket sedang terjadi! Putuskan koneksi LAN terlebih dahulu (Langkah 1).',
        '[ERR] Prosedur salah: Isolasi fisik kabel LAN harus dilakukan terlebih dahulu.'
      );
      return;
    }

    togglePort445('pc-01', false);
    setPhase(
      'mitigation_step_2',
      '[SOP-2 SUCCESS] Firewall rule aktif: Port 445 ditutup permanen.'
    );
  };

  // SOP Langkah 3: Matikan proses & Pulihkan LAN
  const handleTerminateAndRestore = async () => {
    if (currentPhase === 'idle') {
      triggerWrongOrderError('Simulasi belum berjalan.', '[WARN] Aksi diabaikan.');
      return;
    }

    // SALAH URUTAN: Jika membersihkan proses sebelum memutus LAN dan menutup port
    if (pc01?.data.isLanConnected || pc01?.data.port445Open) {
      triggerWrongOrderError(
        'Peringatan: PC kembali terinfeksi! Kamu membersihkan prosesnya, tetapi koneksi LAN masih terhubung dan Port 445 masih terbuka sehingga Worm dari jaringan langsung masuk kembali. Isolasi jaringan dan tutup port terlebih dahulu.',
        '[CRITICAL FAILURE] Re-infection terjadi seketika! Worm menembus Port 445 yang masih terbuka.'
      );
      return;
    }

    terminateWormProcess('pc-01');
    reconnectLan('pc-01');
    setPhase(
      'recovered',
      '[SOP-3 SUCCESS] worm_service.exe dimatikan. LAN disambung kembali dengan Port 445 terproteksi. Jaringan aman!'
    );

    await ProgressService.saveModuleProgress({
      malwareType: 'worm',
      infectionObserved: true,
      mitigationCompleted: true,
      mistakeCount: 0,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 p-4 gap-4">
      {/* Control Action Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Topologi Subnet Lab SIJA (React Flow Interactive)
            </div>
            <div className="text-[11px] text-slate-400">
              Vektor Serangan: Remote Code Execution via SMB Port 445
            </div>
          </div>
        </div>

        {/* Action Buttons SOP */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDisconnectLan}
            disabled={!pc01?.data.isLanConnected || currentPhase === 'idle' || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <WifiOff className="w-3.5 h-3.5" />
            1. Putus Koneksi LAN
          </button>

          <button
            onClick={handlePatchPort445}
            disabled={!pc01?.data.port445Open || currentPhase === 'idle' || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <Shield className="w-3.5 h-3.5" />
            2. Tutup Port 445 (Firewall)
          </button>

          <button
            onClick={handleTerminateAndRestore}
            disabled={currentPhase === 'idle' || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            3. Kill Process & Reconnect LAN
          </button>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden relative shadow-inner">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          attributionPosition="bottom-right"
        >
          <Background color="#334155" gap={20} size={1} />
          <Controls className="bg-slate-800 border-slate-700 fill-white" />
        </ReactFlow>
      </div>
    </div>
  );
};
