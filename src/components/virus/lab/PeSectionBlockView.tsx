// File: src/components/virus/lab/PeSectionBlockView.tsx
'use client';

import React from 'react';
import { ForensicBinary } from '@/store/useVirusLabStore';
import { ArrowRight, CornerDownRight, ShieldAlert, CheckCircle2, Zap } from 'lucide-react';

interface PeSectionBlockViewProps {
  binary: ForensicBinary;
}

export function PeSectionBlockView({ binary }: PeSectionBlockViewProps) {
  const isInfected = binary.status === 'infected';
  const hasParasite = binary.sections.some((s) => s.name === '.parasite');

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 text-[11px]">
            Visual Anatomi Struktur Biner PE (Portable Executable)
          </span>
          <span
            className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase ${
              isInfected
                ? 'bg-red-100 text-red-800 border-red-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            {isInfected ? 'PE Header Dibajak' : 'PE Header Sah'}
          </span>
        </div>

        <span className="text-[10px] text-slate-500">
          Target RVA: <strong className="text-slate-800">{binary.currentEntryPoint}</strong>
        </span>
      </div>

      {/* Memory Blocks Anatomy */}
      <div className="space-y-1.5">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
          Urutan Blok Memori Fisik Berkas:
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-1.5 overflow-x-auto pb-1 text-[10px]">
          {/* PE Header Block */}
          <div
            className={`p-2.5 rounded border flex-1 min-w-[130px] flex flex-col justify-between transition-colors ${
              isInfected
                ? 'bg-red-50 border-red-300 text-red-950'
                : 'bg-white border-slate-300 text-slate-800 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold">PE Header (IMAGE_NT)</span>
              {isInfected && <Zap className="w-3 h-3 text-red-600 animate-pulse" />}
            </div>
            <div className="mt-2 space-y-0.5 text-[9px]">
              <div className="text-slate-500">Magic: 0x4550 (PE00)</div>
              <div className={isInfected ? 'text-red-700 font-bold' : 'text-emerald-700 font-bold'}>
                EntryPoint: {binary.currentEntryPoint.split(' ')[0]}
              </div>
            </div>
          </div>

          {/* Jump Arrow */}
          <div className="flex items-center justify-center text-slate-400 shrink-0 self-center">
            {isInfected ? (
              <span className="text-[9px] text-red-600 font-bold px-1 py-0.5 rounded bg-red-100 border border-red-200 rotate-90 sm:rotate-0">
                JMP Seksi Akhir ➔
              </span>
            ) : (
              <ArrowRight className="w-4 h-4 text-emerald-600 rotate-90 sm:rotate-0" />
            )}
          </div>

          {/* Sections List */}
          {binary.sections.map((sec) => {
            const isMalicious = sec.name === '.parasite';

            return (
              <div
                key={sec.name}
                className={`p-2.5 rounded border flex-1 min-w-[120px] flex flex-col justify-between transition-colors ${
                  isMalicious
                    ? 'bg-red-100/90 border-red-400 text-red-950 ring-2 ring-red-300'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{sec.name}</span>
                    <span className="text-[9px] text-slate-500">{sec.virtualSizeKB} KB</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-1 truncate" title={sec.virtualAddress}>
                    RVA: {sec.virtualAddress}
                  </div>
                </div>

                <div className="mt-2 pt-1 border-t border-slate-200/60">
                  <span
                    className={`text-[8px] font-bold uppercase block truncate ${
                      isMalicious ? 'text-red-800' : 'text-slate-500'
                    }`}
                  >
                    {isMalicious ? 'SUNTIKAN PARASIT (+348KB)' : sec.characteristics.split('|')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cause and Effect Explanation Footer */}
      <div className="pt-2 border-t border-slate-200/80 text-[10px] leading-relaxed">
        {isInfected ? (
          <div className="text-red-800 bg-red-50 p-2 rounded border border-red-200 flex items-start gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
            <span>
              <strong>Penyimpangan Alur Eksekusi:</strong> Virus membelokkan{' '}
              <code className="bg-red-100 px-1 rounded">AddressOfEntryPoint</code> dari fungsi asli aplikasi menuju seksi{' '}
              <code className="bg-red-100 px-1 rounded">.parasite</code> di ujung berkas. Saat aplikasi dibuka, kode virus
              dieksekusi terlebih dahulu sebelum melompat kembali ke kode asli.
            </span>
          </div>
        ) : (
          <div className="text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200 flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Alur Eksekusi Utuh:</strong> EntryPoint merujuk langsung ke seksi kode asli{' '}
              <code className="bg-emerald-100 px-1 rounded">.text</code> (0x00401050). Struktur header bebas dari seksi
              injeksi parasit.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
