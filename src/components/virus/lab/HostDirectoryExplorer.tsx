// File: src/components/virus/lab/HostDirectoryExplorer.tsx
'use client';

import React from 'react';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import {
  Folder,
  Play,
  Archive,
  FileText
} from 'lucide-react';

export function HostDirectoryExplorer() {
  const { binaries, selectedFileId, setSelectedFileId, launchApplication } = useVirusLabStore();

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col h-[270px] shadow-xs">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 mb-2 shrink-0">
        <div>
          <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold">
            Sistem Berkas Host (C:\Lab\HostBinaries)
          </div>
          <h2 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Folder className="w-3.5 h-3.5 text-slate-800" />
            <span>Direktori Berkas Biner (File Explorer)</span>
          </h2>
        </div>
        <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 font-bold">
          {binaries.length} Berkas
        </span>
      </div>

      {/* Binary Files List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
        {binaries.map((file) => {
          const isSelected = selectedFileId === file.id;
          const isInfected = file.status === 'infected';
          const isQuarantined = file.status === 'quarantined';
          const isDisinfected = file.status === 'disinfected' || (file.status === 'clean' && !file.isCarrier);

          return (
            <div
              key={file.id}
              onClick={() => setSelectedFileId(file.id)}
              className={`p-2 rounded border transition-all cursor-pointer text-xs ${
                isSelected
                  ? 'bg-slate-100/90 border-slate-400 ring-1 ring-slate-400'
                  : isInfected
                  ? 'bg-red-50/50 border-red-200 hover:bg-red-50/80'
                  : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                {/* File info */}
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div
                    className={`p-1.5 rounded shrink-0 ${
                      isInfected
                        ? 'bg-red-100 text-red-700'
                        : isQuarantined
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isQuarantined ? <Archive className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 font-mono text-[11px] truncate">
                        {file.name}
                      </span>
                      {file.isCarrier && (
                        <span className="text-[8px] font-mono bg-amber-100 text-amber-800 border border-amber-200 px-1 rounded font-bold shrink-0">
                          CARRIER
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-slate-500 font-mono mt-0.5">
                      <span
                        className={`font-bold uppercase ${
                          isInfected
                            ? 'text-red-700'
                            : isQuarantined
                            ? 'text-amber-700'
                            : isDisinfected
                            ? 'text-emerald-700'
                            : 'text-slate-500'
                        }`}
                      >
                        {isInfected ? 'TERINFEKSI' : isQuarantined ? 'TERKARANTINA' : 'VALID'}
                      </span>
                      <span>•</span>
                      <span className={file.currentSizeKB > file.originalSizeKB ? 'text-red-600 font-bold' : ''}>
                        {file.currentSizeKB} KB {file.currentSizeKB > file.originalSizeKB && '(+348KB)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      launchApplication(file.id);
                    }}
                    disabled={isQuarantined}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-white text-[9px] font-bold rounded shadow-xs transition-colors"
                    title="Uji jalankan aplikasi untuk menganalisis eksekusi biner"
                  >
                    <Play className="w-2 h-2 fill-current" />
                    <span>Buka</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFileId(file.id);
                    }}
                    className={`px-2 py-1 text-[9px] font-bold rounded border transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    X-Ray
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-1.5 border-t border-slate-100 mt-1 text-[9px] text-slate-400 font-mono flex items-center justify-between shrink-0">
        <span>Pilih berkas untuk inspeksi blok X-Ray PE.</span>
        <span>&apos;Buka&apos; memicu uji eksekusi.</span>
      </div>
    </div>
  );
}
