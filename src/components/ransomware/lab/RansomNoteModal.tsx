// File: src/components/ransomware/lab/RansomNoteModal.tsx
'use client';

import React from 'react';
import { AlertTriangle, Lock, X, DollarSign, ShieldAlert, ExternalLink } from 'lucide-react';
import { useRansomwareLabStore } from '@/store/useRansomwareLabStore';

export function RansomNoteModal() {
  const {
    showRansomModal,
    ransomPaidStatus,
    setShowRansomModal,
    experimentPayRansom,
  } = useRansomwareLabStore();

  if (!showRansomModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white border border-slate-300 rounded-xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Modal Top Bar */}
        <div className="bg-rose-900 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-300" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Artefak Forensik: README_DECRYPT.txt
            </span>
          </div>
          <button
            onClick={() => setShowRansomModal(false)}
            className="text-rose-200 hover:text-white transition-colors p-1"
            title="Tutup jendela pratinjau catatan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Warning Banner */}
          <div className="p-3 bg-rose-50 border border-rose-200 rounded text-rose-950 text-xs flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Seluruh Berkas Dokumen &amp; Basis Data Anda Telah Terenkripsi:</strong> Algoritma militer AES-256 dan RSA-2048 telah mengunci data di drive lokal dan jaringan bersama. Kunci privat hanya tersimpan pada server rahasia penyerang.
            </div>
          </div>

          {/* Extortion Demands */}
          <div className="space-y-2 bg-slate-50 border border-slate-200 p-3 rounded text-xs font-mono">
            <div className="flex justify-between border-b border-slate-200 pb-1.5">
              <span className="text-slate-500">Jumlah Tebusan:</span>
              <span className="font-bold text-slate-900">0.25 BTC (~$16,500 USD)</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-1.5">
              <span className="text-slate-500">Alamat Dompet Bitcoin:</span>
              <span className="text-slate-800 select-all truncate ml-2">bc1qa8w997xkffz34991209ccxm842kdf99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Portal Dekripsi Tor:</span>
              <span className="text-slate-800">http://locker729h4xzk...onion</span>
            </div>
          </div>

          {/* Failed scam explanation if student clicked pay ransom */}
          {ransomPaidStatus === 'failed_scam' ? (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded text-amber-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Hasil Eksperimen: Pembayaran Tebusan Gagal &amp; Merugikan!</span>
              </div>
              <p className="leading-relaxed text-[11px] text-amber-900">
                Uang kripto telah terkirim, namun penyerang tidak pernah mengirimkan kunci dekriptor. Domain Tor penyerang kini berstatus <em>HTTP 404 (Offline)</em>. Berkas Anda tetap terkunci secara permanen.
              </p>
              <div className="text-[10px] text-amber-800 bg-amber-100/60 p-2 rounded">
                <strong>Pedoman BSSN &amp; FBI:</strong> Pembayaran tebusan dilarang dalam SOP keamanan siber resmi karena tidak menjamin pemulihan data, mendanai kejahatan sindikat terorganisir, dan menandai organisasi sebagai sasaran empuk pemerasan berulang di masa mendatang.
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-slate-500 leading-relaxed">
              Catatan tebusan ini disuntikkan secara otomatis oleh biner ransomware ke setiap folder dokumen. Dalam investigasi forensik nyata, catatan ini dijadikan bukti artefak IOC (Indicator of Compromise).
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-2">
          {ransomPaidStatus !== 'failed_scam' && (
            <button
              onClick={experimentPayRansom}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Eksperimen: Uji apa yang terjadi jika korban memutuskan membayar tebusan"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Eksperimen Simulasi Bayar Tebusan</span>
            </button>
          )}

          <button
            onClick={() => setShowRansomModal(false)}
            className="ml-auto px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold transition-colors"
          >
            Lanjutkan Penanganan Insiden
          </button>
        </div>
      </div>
    </div>
  );
}
