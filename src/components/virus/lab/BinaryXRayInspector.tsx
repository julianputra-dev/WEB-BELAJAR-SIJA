// File: src/components/virus/lab/BinaryXRayInspector.tsx
'use client';

import React from 'react';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import { PeSectionBlockView } from './PeSectionBlockView';
import { HashComparatorView } from './HashComparatorView';
import {
  FileCode,
  Lock,
  Archive,
  ShieldCheck,
  Scissors,
} from 'lucide-react';

export function BinaryXRayInspector() {
  const {
    binaries,
    selectedFileId,
    safeMode,
    bootSafeMode,
    quarantineSelectedCarrier,
    disinfectBinary,
    disinfectAllInfected,
    phase,
  } = useVirusLabStore();

  const activeBinary = binaries.find((b) => b.id === selectedFileId) || binaries[0];
  const isInfected = activeBinary.status === 'infected';
  const isQuarantined = activeBinary.status === 'quarantined';
  const infectedCount = binaries.filter((b) => b.status === 'infected').length;
  const isCarrier = activeBinary.isCarrier;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col shadow-xs">
      {/* Inspector Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between pb-2.5 border-b border-slate-200 gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold">
            Instrumen Forensik PE:
          </div>
          <h2 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-slate-800" />
            <span className="font-mono bg-slate-100 text-slate-900 border border-slate-300 px-2 py-0.5 rounded">
              {activeBinary.name}
            </span>
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Action: Boot SafeMode */}
          <button
            onClick={bootSafeMode}
            disabled={safeMode || phase === 'idle'}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-white text-[10px] font-bold rounded shadow-xs transition-colors"
            title="Isolasi registri SafeBoot dan nonaktifkan driver pihak ketiga"
          >
            <Lock className="w-3 h-3" />
            <span>{safeMode ? 'SafeBoot Aktif' : 'Boot SafeBoot'}</span>
          </button>

          {/* Action: Karantina Carrier */}
          {isCarrier && (
            <button
              onClick={quarantineSelectedCarrier}
              disabled={isQuarantined || phase === 'idle'}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-700 hover:bg-amber-800 disabled:opacity-40 disabled:pointer-events-none text-white text-[10px] font-bold rounded shadow-xs transition-colors"
              title="Pindahkan biner pembawa ke Brankas Karantina"
            >
              <Archive className="w-3 h-3" />
              <span>{isQuarantined ? 'Terkarantina' : 'Karantina Carrier'}</span>
            </button>
          )}

          {/* Action: Disinfect Selected Host */}
          {!isCarrier && isInfected && (
            <button
              onClick={() => disinfectBinary(activeBinary.id)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold rounded shadow-xs transition-colors"
              title="Pangkas payload parasit dan pulihkan PE Header berkas ini"
            >
              <Scissors className="w-3 h-3" />
              <span>Pangkas &amp; Disinfeksi</span>
            </button>
          )}

          {/* Action: Disinfect All */}
          {infectedCount > 0 && (
            <button
              onClick={disinfectAllInfected}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold rounded shadow-xs transition-colors"
              title="Disinfeksi seluruh berkas host yang terinfeksi"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Disinfeksi Semua ({infectedCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Inspector Body: Side-by-side on wide screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* PE Section Block View */}
        <PeSectionBlockView binary={activeBinary} />

        {/* Hash Comparator View */}
        <HashComparatorView binary={activeBinary} />
      </div>

      {/* Registry Status Bar */}
      <div className="pt-2 border-t border-slate-200 mt-2 flex flex-wrap items-center justify-between text-[9px] text-slate-500 font-mono gap-2">
        <div className="flex items-center gap-2">
          <span>Registri SafeBoot:</span>
          <span
            className={`font-bold px-1.5 py-0.2 rounded border ${
              safeMode
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {safeMode ? 'TERISOLASI (SAFEBOOT_LOCKED)' : 'SESI STANDAR (HOOKABLE)'}
          </span>
        </div>
        <span>Magic Signature: <strong>IMAGE_NT_SIGNATURE (0x00004550)</strong></span>
      </div>
    </div>
  );
}
