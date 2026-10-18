// File: src/components/worm/lab/PostHardeningAuditModal.tsx
'use client';

import React from 'react';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { ShieldCheck, ShieldAlert, X, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';

export function PostHardeningAuditModal() {
  const { hardeningAuditResult, clearHardeningAuditResult } = useWormTopologyStore();

  if (!hardeningAuditResult) return null;

  const { isResilient, blockedCount, totalTested, testedHosts, timestamp } =
    hardeningAuditResult;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div
          className={`px-5 py-4 flex items-center justify-between border-b ${
            isResilient
              ? 'bg-emerald-900 text-white border-emerald-800'
              : 'bg-red-900 text-white border-red-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {isResilient ? (
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-red-300" />
            )}
            <div>
              <h2 className="text-sm font-bold tracking-tight">
                {isResilient
                  ? 'Audit Ketahanan Pasca-Mitigasi: SISTEM TERBUKTI KEBAL'
                  : 'Audit Ketahanan Gagal: Celah Eksploitasi Ditemukan!'}
              </h2>
              <p className="text-[11px] font-mono opacity-85">
                Uji Re-Attack Eksploitasi SMBv1 (CVE-2017-0144) • {timestamp}
              </p>
            </div>
          </div>

          <button
            onClick={clearHardeningAuditResult}
            className="p-1 rounded-md hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Executive Summary Badge */}
          <div
            className={`p-3.5 rounded-lg border flex items-start gap-3 ${
              isResilient
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-red-50/80 border-red-300 text-red-950'
            }`}
          >
            {isResilient ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <span className="font-bold text-xs">
                {isResilient
                  ? `Hasil Uji Penetrasi: ${blockedCount} dari ${totalTested} Host Sukses Menolak Serangan (Zero Compromise)`
                  : 'Peringatan: Satu atau lebih host terinfeksi ulang karena Port 445 masih terbuka!'}
              </span>
              <p className="text-[11px] leading-relaxed text-slate-700">
                {isResilient
                  ? 'Paket buffer overflow yang ditembakkan dari penyerang eksternal (192.168.10.250) berhasil dicegat 100% oleh Host Firewall pada masing-masing workstation. Tidak ada kode berbahaya yang dieksekusi di kernel memory.'
                  : 'Host yang masih membuka Port 445 langsung mengeksekusi payload shellcode dan menyalakan kembali proses worm_service.exe.'}
              </p>
            </div>
          </div>

          {/* Telemetry Matrix Table */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5 font-mono">
              <Terminal className="w-3.5 h-3.5 text-slate-600" />
              <span>Matriks Respon Firewall Tiap Workstation:</span>
            </span>

            <div className="border border-slate-200 rounded-lg overflow-hidden font-mono text-[11px]">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 text-[10px] uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Workstation</th>
                    <th className="py-2 px-3">IP Address</th>
                    <th className="py-2 px-3">Aturan Firewall</th>
                    <th className="py-2 px-3">Respon Packet</th>
                    <th className="py-2 px-3 text-right">Status Integritas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {testedHosts.map((h) => (
                    <tr key={h.nodeId} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-3 font-semibold text-slate-900">
                        {h.label.split(' ')[0]}
                      </td>
                      <td className="py-2 px-3 text-slate-600">{h.ipAddress}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            h.portStatus === 'BLOCK'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          Port 445: {h.portStatus}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-700">
                        {h.firewallResult === 'DROPPED'
                          ? 'TCP RST (Dropped)'
                          : 'Buffer Overflow'}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <span
                          className={`font-bold text-[10px] ${
                            h.isSafe ? 'text-emerald-700' : 'text-red-700'
                          }`}
                        >
                          {h.isSafe ? '✓ KEBAL' : '✗ TERINFEKSI'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Concept Takeaway */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-[10px] uppercase">
              Prinsip Pertahanan (Defense-in-Depth):
            </span>
            <p className="leading-relaxed font-sans">
              Pengujian ulang empiris membuktikan bahwa penutupan Port 445 pada firewall host mengeliminasi *attack surface* secara permanen. Meskipun host tetap terhubung ke LAN dan menerima broadcast, paket eksploitasi ditolak sebelum mencapai driver kernel `srv.sys`.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={clearHardeningAuditResult}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded transition-colors"
          >
            Selesai &amp; Tutup Laporan Audit
          </button>
        </div>
      </div>
    </div>
  );
}
