// File: src/components/ransomware/lab/StorageDirectoryPanel.tsx
'use client';

import React from 'react';
import { HardDrive, Server, ShieldCheck, Lock, Play, Unplug, Plug, DatabaseBackup } from 'lucide-react';
import { useRansomwareLabStore, StorageFile } from '@/store/useRansomwareLabStore';

export function StorageDirectoryPanel() {
  const {
    localFiles,
    nasFiles,
    backupFiles,
    selectedFileId,
    selectedStorage,
    nasConnected,
    backupMounted,
    phase,
    setSelectedFile,
    executeCarrierFile,
    disconnectNas,
    reconnectNas,
    toggleMountBackupDrive,
    restoreFromBackup,
  } = useRansomwareLabStore();

  const renderFileRow = (file: StorageFile, drive: 'C' | 'Z' | 'E') => {
    const isSelected = selectedFileId === file.id && selectedStorage === drive;
    const isEncrypted = file.status === 'encrypted';
    const isCarrier = file.isCarrier;
    const isRansomNote = file.status === 'ransom_note';

    return (
      <div
        key={file.id}
        onClick={() => setSelectedFile(file.id, drive)}
        className={`p-2 rounded border cursor-pointer transition-colors text-xs flex items-center justify-between gap-2 ${
          isSelected
            ? 'bg-slate-900 text-white border-slate-900'
            : isEncrypted
            ? 'bg-rose-50/70 border-rose-300 text-rose-950 hover:bg-rose-100/70'
            : isCarrier
            ? 'bg-amber-50/70 border-amber-300 text-amber-950 hover:bg-amber-100/70'
            : isRansomNote
            ? 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'
            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {isEncrypted ? (
            <div className={`p-0.5 rounded ${isSelected ? 'bg-rose-900 text-rose-200' : 'bg-rose-100 text-rose-700'}`}>
              <Lock className="w-3.5 h-3.5 shrink-0" />
            </div>
          ) : isCarrier ? (
            <div className={`p-0.5 rounded ${isSelected ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-700'}`}>
              <Play className="w-3.5 h-3.5 shrink-0" />
            </div>
          ) : file.status === 'clean' ? (
            <div className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-white' : 'bg-emerald-500 ring-2 ring-emerald-200'}`} />
          ) : (
            <div className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-white' : 'bg-slate-400'}`} />
          )}
          <span className="font-mono truncate">{file.name}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
            isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
          }`}>
            {file.sizeKB} KB
          </span>
          {isCarrier && (phase === 'idle' || phase === 'hardened') && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                executeCarrierFile();
              }}
              className="px-2 py-0.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] rounded transition-colors"
              title="Eksekusi biner lampiran ganda"
            >
              Jalankan
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-slate-700" />
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Panel Direktori Multi-Penyimpanan Terpadu
          </h2>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          3 Media Penyimpanan (Lokal, NAS, Air-Gap)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Drive C: Local Workstation */}
        <div className="bg-slate-50/80 border border-slate-200 rounded p-2.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <HardDrive className="w-3.5 h-3.5 text-slate-700" />
                <span>Drive Lokal (C:)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">NTFS Sistem</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 truncate pb-1 border-b border-slate-200">
              C:\Users\Admin\Documents\
            </div>
            <div className="space-y-1.5 min-h-[160px]">
              {localFiles.map((f) => renderFileRow(f, 'C'))}
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200 mt-2 text-[10px] text-slate-500">
            {phase === 'infecting' ? (
              <span className="text-rose-600 font-semibold animate-pulse">Enkripsi thread lokal sedang berjalan...</span>
            ) : (
              <span>Klik berkas untuk inspeksi header dan entropi.</span>
            )}
          </div>
        </div>

        {/* Drive Z: Network Attached Storage (NAS) */}
        <div className="bg-slate-50/80 border border-slate-200 rounded p-2.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Server className="w-3.5 h-3.5 text-slate-700" />
                <span>Shared NAS (Z:)</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                nasConnected && (phase === 'backup_restored' || phase === 'hardened')
                  ? 'bg-emerald-100 text-emerald-800'
                  : nasConnected
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-200 text-slate-700'
              }`}>
                {nasConnected && (phase === 'backup_restored' || phase === 'hardened')
                  ? 'PULIH (TERHUBUNG)'
                  : nasConnected
                  ? 'TERHUBUNG'
                  : 'TERPUTUS (ISOLASI)'}
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 truncate pb-1 border-b border-slate-200">
              \\nas-corp.internal\shared\
            </div>
            <div className="space-y-1.5 min-h-[160px]">
              {nasConnected ? (
                nasFiles.map((f) => renderFileRow(f, 'Z'))
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-4 text-center text-slate-400">
                  <Unplug className="w-6 h-6 mb-1 text-slate-400" />
                  <span className="text-xs font-mono font-medium text-slate-600">Koneksi Jaringan NAS Terputus</span>
                  <span className="text-[10px] mt-0.5 text-slate-500">Vektor perambatan ke server bersama terisolasi aman.</span>
                </div>
              )}
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200 mt-2">
            {nasConnected ? (
              <button
                onClick={disconnectNas}
                className="w-full py-1.5 px-2 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                title="SOP 1: Putus koneksi SMB/CIFS ke Network Attached Storage"
              >
                <Unplug className="w-3 h-3" />
                <span>Putus Sambungan NAS (Isolasi)</span>
              </button>
            ) : (
              <button
                onClick={reconnectNas}
                className={`w-full py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  phase === 'backup_restored' || phase === 'hardened'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                }`}
                title="Sambungkan kembali koneksi NAS ke sistem"
              >
                <Plug className="w-3 h-3" />
                <span>Sambungkan Kembali NAS (Infrastruktur Pulih)</span>
              </button>
            )}
          </div>
        </div>

        {/* Drive E: External Offline Backup (Air-Gap) */}
        <div className="bg-slate-50/80 border border-slate-200 rounded p-2.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <DatabaseBackup className="w-3.5 h-3.5 text-slate-700" />
                <span>Offline Backup (E:)</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                backupMounted
                  ? 'bg-emerald-100 text-emerald-800'
                  : phase === 'backup_restored' || phase === 'hardened'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {backupMounted
                  ? 'TERPASANG'
                  : phase === 'backup_restored' || phase === 'hardened'
                  ? 'AIR-GAPPED (DI BRANKAS)'
                  : 'AIR-GAPPED (LEPAS)'}
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 truncate pb-1 border-b border-slate-200">
              E:\AirGap_Golden_Backup\
            </div>
            <div className="space-y-1.5 min-h-[160px]">
              {backupMounted ? (
                backupFiles.map((f) => renderFileRow(f, 'E'))
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                  <ShieldCheck className={`w-6 h-6 mb-1 ${
                    phase === 'backup_restored' || phase === 'hardened' ? 'text-emerald-600' : 'text-slate-400'
                  }`} />
                  <span className={`text-xs font-mono font-medium ${
                    phase === 'backup_restored' || phase === 'hardened' ? 'text-emerald-800' : 'text-slate-600'
                  }`}>
                    {phase === 'backup_restored' || phase === 'hardened'
                      ? 'Media Cadangan Dilepas & Diamankan'
                      : 'Media Cadangan Terlepas (Offline)'}
                  </span>
                  <span className="text-[10px] mt-0.5 text-slate-500">
                    {phase === 'backup_restored' || phase === 'hardened'
                      ? 'Sesuai aturan keamanan 3-2-1, drive cadangan disimpan terisolasi di brankas fisik.'
                      : 'Terisolasi fisik dari ancaman infeksi RAM dan sistem operasi.'}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200 mt-2 space-y-1.5">
            <button
              onClick={toggleMountBackupDrive}
              className={`w-full py-1 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                backupMounted
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  : phase === 'partition_wiped'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              <DatabaseBackup className="w-3 h-3" />
              <span>{backupMounted ? 'Lepas Drive Cadangan (Unmount)' : 'Pasang Drive Cadangan (Mount E:)'}</span>
            </button>
            {backupMounted && (
              <button
                onClick={restoreFromBackup}
                className="w-full py-1 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                title="SOP 3: Pulihkan data dari salinan cadangan bersih"
              >
                <span>Pulihkan Berkas dari Backup</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
