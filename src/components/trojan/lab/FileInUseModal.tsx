// File: src/components/trojan/lab/FileInUseModal.tsx
'use client';

import React from 'react';
import { AlertTriangle, Lock, X } from 'lucide-react';
import { useTrojanLabStore } from '@/store/useTrojanLabStore';

export function FileInUseModal() {
  const { showFileInUseModal, closeFileInUseModal } = useTrojanLabStore();

  if (!showFileInUseModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-300 rounded-lg max-w-lg w-full shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal OS Title Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 font-mono">
            <Lock className="w-4 h-4 text-rose-600" />
            <span>Peringatan Sistem Operasi: Akses Berkas Ditolak</span>
          </div>
          <button
            onClick={closeFileInUseModal}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-700 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                Akses Ditolak (File in Use)
              </h3>
              <p className="text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                Error Code: 0x00000020 &bull; ERROR_SHARING_VIOLATION
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-2 leading-relaxed font-sans">
            <p>
              Tindakan penghapusan berkas biner <span className="font-mono font-semibold text-slate-900">SuperCalc_Pro.exe</span> ditolak oleh kernel sistem operasi Windows.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900 font-mono">Penyebab Forensik Sistem:</div>
              <p>
                Berkas executable sedang dipetakan ke dalam memori kerja (Memory Mapped File) oleh proses aktif <span className="font-mono font-bold text-rose-700">PID 3892</span>. Selama proses masih berjalan, tabel deskriptor berkas kernel Windows mengunci berkas tersebut guna mencegah inkonsistensi eksekusi.
              </p>
            </div>
            <p className="text-slate-700">
              <strong>Solusi SOP:</strong> Buka <strong>Panel 3 (Monitor Proses RAM)</strong> dan hentikan proses induk biner (<span className="font-mono font-semibold">PID 3892</span>) terlebih dahulu sebelum menghapus berkas fisik dari direktori.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex justify-end gap-2">
          <button
            onClick={closeFileInUseModal}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors shadow-xs"
          >
            Pahami &amp; Matikan Proses Terlebih Dahulu
          </button>
        </div>
      </div>
    </div>
  );
}
