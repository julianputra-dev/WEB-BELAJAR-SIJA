// File: src/components/trojan/lab/RebootAuditModal.tsx
'use client';

import React, { useState } from 'react';
import { Power, RotateCcw, AlertTriangle, CheckCircle2, ShieldAlert, X } from 'lucide-react';
import { useTrojanLabStore } from '@/store/useTrojanLabStore';

export function RebootAuditModal() {
  const {
    showRebootModal,
    rebootAuditResult,
    closeRebootModal,
    executeRebootSequence,
    isFileDeleted,
    isStartupCleaned,
    isProcessKilled,
    isFirewallBlocked,
  } = useTrojanLabStore();

  const [isRebooting, setIsRebooting] = useState(false);

  if (!showRebootModal) return null;

  const handleTriggerReboot = async () => {
    setIsRebooting(true);
    setTimeout(async () => {
      await executeRebootSequence();
      setIsRebooting(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-300 rounded-lg max-w-lg w-full shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 font-mono">
            <Power className="w-4 h-4 text-slate-700" />
            <span>Simulasi Reboot Sistem Operasi &amp; Audit Persistensi</span>
          </div>
          <button
            onClick={closeRebootModal}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {isRebooting ? (
            <div className="py-8 flex flex-col items-center justify-center space-y-3 text-center">
              <RotateCcw className="w-8 h-8 text-slate-700 animate-spin" />
              <div className="text-xs font-bold font-mono text-slate-900">
                Memulai Ulang Sistem Operasi Windows...
              </div>
              <div className="text-[11px] text-slate-500 max-w-xs">
                Mengevaluasi autorun registry key, memuat kernel subsystem, dan menguji filter host firewall.
              </div>
            </div>
          ) : rebootAuditResult === 'idle' ? (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 leading-relaxed font-sans">
                <p className="font-semibold text-slate-900 mb-1">
                  Pengujian Siklus Persistensi Malware:
                </p>
                <p>
                  Trojan modern dirancang untuk bertahan hidup melewati restart komputer. Jika Anda hanya mematikan proses di RAM tanpa memblokir firewall atau tanpa membersihkan entri Startup, Trojan akan dimuat kembali oleh Windows saat login.
                </p>
              </div>

              {/* Status Checklist before Reboot */}
              <div className="p-3 bg-white border border-slate-200 rounded space-y-1.5 text-xs font-mono">
                <div className="text-[10px] uppercase text-slate-500 font-semibold mb-1">
                  Pemeriksaan Kondisi Pra-Reboot:
                </div>
                <div className="flex items-center justify-between">
                  <span>1. Proses RAM Dimatikan:</span>
                  <span className={isProcessKilled ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                    {isProcessKilled ? 'YA' : 'BELUM'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>2. Firewall Outbound C2 Diblokir:</span>
                  <span className={isFirewallBlocked ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                    {isFirewallBlocked ? 'YA' : 'BELUM'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>3. Biner Trojan Dihapus dari Disk:</span>
                  <span className={isFileDeleted ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                    {isFileDeleted ? 'YA' : 'BELUM'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>4. Entri Registri Startup Dibersihkan:</span>
                  <span className={isStartupCleaned ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                    {isStartupCleaned ? 'YA' : 'BELUM'}
                  </span>
                </div>
              </div>
            </div>
          ) : rebootAuditResult === 'reinfected' ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-rose-50 border border-rose-200 rounded text-rose-800">
                <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-sm">RE-INFEKSI PERSISTENSI TERJADI!</div>
                  <p className="leading-relaxed font-sans">
                    Komputer berhasil menyala kembali, tetapi sistem terinfeksi ulang! Windows Subsystem membaca kunci registri <span className="font-mono font-bold">HKCU\...\Run\SuperCalcSync</span> atau mendeteksi biner yang belum dimusnahkan.
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed space-y-1.5 font-sans p-2.5 bg-slate-50 border border-slate-200 rounded">
                <p>
                  <strong>Dampak Sistem:</strong> Biner <span className="font-mono">SuperCalc_Pro.exe</span> otomatis dimuat kembali ke RAM dan membuka ulang koneksi backdoor pada Port 4444 ke server penyerang.
                </p>
                <p>
                  <strong>Koreksi SOP:</strong> Pastikan seluruh 3 langkah SOP diselesaikan: Blokir IP C2 di Firewall, Matikan Proses di RAM, Hapus Berkas Biner, dan Bersihkan Registri Startup.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-sm">AUDIT PASCA-REMEDIASI SUKSES!</div>
                  <p className="leading-relaxed font-sans">
                    Sistem operasi telah di-reboot dan terbukti 100% steril! Tidak ada proses berbahaya di RAM, direktori instalasi bersih, entri registri kosong, dan Host Firewall memblokir permanen setiap upaya koneksi keluar menuju C2 server.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-mono space-y-1">
                <div className="text-[10px] uppercase text-slate-500 font-semibold mb-1">
                  Hasil Telemetri Verifikasi:
                </div>
                <div>&bull; Biner SuperCalc_Pro.exe: NOT FOUND ON DISK</div>
                <div>&bull; Run Registry: HKCU\...\Run STERILE</div>
                <div>&bull; Firewall Outbound Policy: DROP 198.51.100.23:4444</div>
                <div>&bull; Modul Progres: KELULUSAN TERCATAT</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex justify-end gap-2">
          {rebootAuditResult === 'idle' ? (
            <>
              <button
                onClick={closeRebootModal}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleTriggerReboot}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Power className="w-3.5 h-3.5" />
                <span>Mulai Simulasi Reboot OS</span>
              </button>
            </>
          ) : (
            <button
              onClick={closeRebootModal}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors shadow-xs"
            >
              {rebootAuditResult === 'clean' ? 'Tutup & Selesai' : 'Perbaiki SOP Sekarang'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
