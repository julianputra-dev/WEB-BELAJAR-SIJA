// File: src/components/worm/lab/WormLabHeader.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Network, RefreshCw, ArrowLeft, Radio, AlertCircle, ShieldCheck } from 'lucide-react';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';

export function WormLabHeader() {
  const {
    mistakes,
    isSimulating,
    isFullyRemediated,
    triggerInitialInfection,
    runPostHardeningTest,
    resetTopology,
  } = useWormTopologyStore();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded bg-slate-900 text-white flex items-center justify-center border border-slate-800 shrink-0">
          <Network className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900">
              Laboratorium Topologi: Network Worm (Autonomous Propagation &amp; SMB Port 445)
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
              SUBNET 192.168.10.0/24
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            SOP Investigasi: Triage Pemindaian Subnet → Isolasi Fisik LAN → Blokir Port 445 Firewall → Terminasi Proses RAM
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="text-[11px] font-mono text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded">
          Kesalahan Prosedur:{' '}
          <span className={mistakes > 0 ? 'text-red-600 font-bold' : 'text-slate-900 font-bold'}>
            {mistakes}
          </span>
        </div>

        {isFullyRemediated ? (
          <button
            onClick={runPostHardeningTest}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded shadow-xs transition-colors font-mono"
            title="Luncurkan uji penetrasi ulang untuk memvalidasi ketahanan firewall"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
            <span>Uji Ketahanan Pasca-Mitigasi (Re-Attack Test)</span>
          </button>
        ) : !isSimulating ? (
          <button
            onClick={triggerInitialInfection}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded shadow-xs transition-colors"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Picu Kompromi PC-01</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 text-[11px] font-mono rounded">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span>SERANGAN AKTIF</span>
          </div>
        )}

        <button
          onClick={resetTopology}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded border border-slate-300 transition-colors"
          title="Reset topologi ke kondisi awal"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Lab</span>
        </button>

        <Link
          href="/modules/security/worm/intro"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Teori Dasar</span>
        </Link>
      </div>
    </header>
  );
}
