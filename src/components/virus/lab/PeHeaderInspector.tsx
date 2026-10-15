// File: src/components/virus/lab/PeHeaderInspector.tsx
import React from 'react';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import { FileCode, Lock, ShieldAlert, CheckCircle2, ShieldCheck } from 'lucide-react';

export function PeHeaderInspector() {
  const { binaries, selectedFileId, safeMode, bootSafeMode, phase } = useVirusLabStore();

  const activeBinary = binaries.find((b) => b.id === selectedFileId) || binaries[0];
  const isHijacked = activeBinary.status === 'infected';

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col h-full shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3 mb-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
            Inspeksi Header Portable Executable
          </div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-slate-700" />
            PE Optional Header &amp; Registri SafeBoot
          </h2>
        </div>

        <button
          onClick={bootSafeMode}
          disabled={safeMode || phase === 'idle'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-semibold rounded transition-colors"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Boot Diagnostic Mode (Isolasi Registri)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 text-xs font-mono">
        {/* PE Header Dump */}
        <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3">
          <div className="text-[11px] font-bold text-slate-800 border-b border-slate-200 pb-2">
            Struktur Header: {activeBinary.name}
          </div>
          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Magic Number</span>
              <span className="text-slate-800 font-bold">IMAGE_NT_SIGNATURE (PE00)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Original EntryPoint</span>
              <span className="text-slate-700">{activeBinary.originalEntryPoint}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Current EntryPoint</span>
              <span className={`font-bold ${isHijacked ? 'text-red-700' : 'text-emerald-700'}`}>
                {activeBinary.currentEntryPoint}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Seksi Biner Terdeteksi</span>
              <span className="text-slate-800">
                {isHijacked ? '.text, .data, .rsrc, .parasite' : '.text, .data, .rsrc'}
              </span>
            </div>
          </div>
        </div>

        {/* Registry SafeBoot Status */}
        <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3">
          <div className="text-[11px] font-bold text-slate-800 border-b border-slate-200 pb-2">
            Status Kunci Registri SafeBoot
          </div>
          <div className="space-y-2 text-[11px]">
            <div>
              <span className="text-slate-500 block mb-0.5">Jalur Kunci Registri:</span>
              <span className="text-slate-800 text-[10px] bg-white p-1 rounded border border-slate-200 block truncate">
                HKLM\SYSTEM\CurrentControlSet\Control\SafeBoot
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Integritas Nilai Registri</span>
              <span className={`font-bold ${safeMode ? 'text-emerald-700' : isHijacked ? 'text-red-700' : 'text-slate-700'}`}>
                {safeMode ? 'LOCKED & PROTECTED' : isHijacked ? 'COMPROMISED (HOOKED)' : 'CLEAN'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Mode Driver Sistem</span>
              <span className="text-slate-800">{safeMode ? 'Minimal Diagnostic Drivers' : 'Full Kernel Driver Stack'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 text-[11px] text-slate-500 font-mono border-t border-slate-100 mt-2">
        Catatan: Virus membelokkan EntryPoint ke seksi .parasite untuk mengeksekusi payload sebelum fungsi utama.
      </div>
    </div>
  );
}
