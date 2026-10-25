// File: src/components/ransomware/lab/FileHexEntropyInspector.tsx
'use client';

import React from 'react';
import {
  Eye,
  FileCode,
  AlertCircle,
  RefreshCw,
  Hash,
  FileText,
  Unplug
} from 'lucide-react';
import { useRansomwareLabStore } from '@/store/useRansomwareLabStore';

export function FileHexEntropyInspector() {
  const {
    selectedFileId,
    selectedStorage,
    nasConnected,
    localFiles,
    nasFiles,
    backupFiles,
    experimentManualRename,
    tamperAttempted,
  } = useRansomwareLabStore();

  if (selectedStorage === 'Z' && !nasConnected) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs space-y-2 text-center">
        <div className="inline-flex p-2 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          <Unplug className="w-5 h-5" />
        </div>
        <h3 className="text-xs font-bold text-slate-900">Akses Berkas Jaringan (Z: NAS) Ditolak</h3>
        <p className="text-[11px] text-slate-500 max-w-md mx-auto leading-relaxed">
          Koneksi penyimpanan jaringan sedang terputus (diisolasi). Berkas departemen pada server bersama tidak dapat diakses atau diinspeksi hingga isolasi dicabut dalam kondisi sistem steril.
        </p>
      </div>
    );
  }

  const currentList =
    selectedStorage === 'C' ? localFiles : selectedStorage === 'Z' ? nasFiles : backupFiles;
  const file = currentList.find((f) => f.id === selectedFileId) || currentList[0];

  if (!file) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-4 text-center text-xs text-slate-500">
        Pilih berkas dari Panel Direktori untuk memulai inspeksi forensik.
      </div>
    );
  }

  const isEncrypted = file.status === 'encrypted';
  const isHighEntropy = file.entropy >= 7.0;
  const isDocxRenameApplicable = file.extension === '.locked' || (file.status === 'tampered');

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs space-y-3">
      {/* Header & Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-slate-700" />
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            File Content &amp; Hex/Entropy X-Ray Inspector
          </h2>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            {selectedStorage}:\{file.name}
          </span>
        </div>

        {/* Extension experiment button */}
        {isDocxRenameApplicable && (
          <button
            onClick={experimentManualRename}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors shadow-2xs"
            title="Eksperimen: Coba ganti ekstensi berkas .locked kembali ke format aslinya"
          >
            <RefreshCw className="w-3 h-3 text-amber-700" />
            <span>Eksperimen Ubah Ekstensi (.locked ke {file.originalExtension})</span>
          </button>
        )}
      </div>

      {/* Forensic Telemetry Strip: Header Magic & Shannon Entropy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50 border border-slate-200 rounded p-2.5">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 mb-1">
            <Hash className="w-3 h-3 text-slate-400" />
            <span>Magic Header Byte (Identitas Biner)</span>
          </div>
          <div className="text-xs font-mono font-bold text-slate-800">
            {file.headerMagic}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
            <div className="flex items-center gap-1">
              <FileCode className="w-3 h-3 text-slate-400" />
              <span>Nilai Entropi Shannon (Keacakan Data)</span>
            </div>
            <span className={`font-bold font-mono ${isHighEntropy ? 'text-rose-700' : 'text-emerald-700'}`}>
              {file.entropy.toFixed(2)} / 8.00
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isHighEntropy ? 'bg-rose-500' : 'bg-emerald-500'}`}
              style={{ width: `${(file.entropy / 8) * 100}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex justify-between font-mono">
            <span>Teks Alami (Low: ~3.0)</span>
            <span>Ciphertext Enkripsi (High: ~7.95)</span>
          </div>
        </div>
      </div>

      {/* Tampered Notice Banner if student tried manual rename */}
      {file.status === 'tampered' && (
        <div className="p-2.5 rounded bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Hasil Eksperimen:</strong> Nama berkas telah berganti kembali ke <code>{file.originalName}</code>. Namun, perhatikan blok Hex di bawah: bytes tetap berupa ciphertext acak dan Magic Header tetap corrupt. Aplikasi pembaca (seperti MS Word) akan menolak membuka berkas karena struktur internal belum didekripsi secara matematis.
          </div>
        </div>
      )}

      {/* Two Columns: Plaintext / Text Preview & Hex Dump */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Left: Text Stream / Ciphertext Preview */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-semibold">Pratinjau Isi Konten Berkas</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-500">
              {isEncrypted ? 'Ciphertext Terenkripsi' : 'Plaintext Terbaca'}
            </span>
          </div>
          <div className={`p-3 rounded border font-mono text-xs whitespace-pre-wrap leading-relaxed h-[150px] overflow-y-auto ${
            isEncrypted
              ? 'bg-rose-950/10 border-rose-200 text-rose-950'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            {file.plaintextPreview}
          </div>
        </div>

        {/* Right: Hex Dump Inspector */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
            <div className="flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-semibold">Raw Hex Byte &amp; ASCII Representation</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Offset: 0000h - 003Fh</span>
          </div>
          <pre className="p-3 rounded bg-slate-900 text-slate-200 font-mono text-[9.5px] sm:text-[10px] xl:text-[10.5px] leading-relaxed h-[150px] overflow-y-auto overflow-x-hidden break-all whitespace-pre-wrap select-all border border-slate-800">
            {file.hexDump}
          </pre>
        </div>
      </div>
    </div>
  );
}
