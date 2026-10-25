// File: src/components/trojan/lab/ProcessFirewallPanel.tsx
'use client';

import React from 'react';
import { Cpu, Shield, AlertTriangle, CheckCircle2, RotateCcw, Link2 } from 'lucide-react';
import { useTrojanLabStore } from '@/store/useTrojanLabStore';

export function ProcessFirewallPanel() {
  const {
    processes,
    netstatSockets,
    selectedSocketId,
    firewallInputIp,
    firewallInputPort,
    isFirewallBlocked,
    blockedTargetSummary,
    respawnCountdown,
    setFirewallInputIp,
    setFirewallInputPort,
    useSelectedSocketForFirewall,
    applyFirewallRule,
    removeFirewallRule,
    terminateProcessByPid,
  } = useTrojanLabStore();

  const activeSocketsWithIp = netstatSockets.filter((s) => s.remoteIp !== '0.0.0.0');

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex flex-col gap-3.5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 border border-slate-200 rounded text-slate-800">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Panel 3: Monitor Proses RAM &amp; Kebijakan Host Firewall
            </h2>
            <p className="text-[11px] text-slate-500">
              Audit proses aktif di memori kerja dan konfigurasi aturan isolasi port keluar secara mandiri
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
          Remediasi Host
        </span>
      </div>

      {/* Grid: Left: Process Table, Right: Dynamic Firewall Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left Column: RAM Process Table (7 cols) */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-1 pb-2 mb-2 border-b border-slate-200 text-xs font-mono">
              <span className="text-slate-800 font-bold">Daftar Proses Memori (Task Manager)</span>
              <span className="text-[10.5px] text-slate-500">Gunakan taskkill untuk menghentikan proses</span>
            </div>

            {/* Watchdog Warning if PID respawned */}
            {respawnCountdown !== null && (
              <div className="mb-2 p-2 bg-amber-100 border border-amber-300 rounded text-xs text-amber-900 flex items-center justify-between font-mono animate-pulse">
                <span>[WATCHDOG AKTIF] Firewall belum diblokir! Proses akan bangkit kembali dalam 2 detik...</span>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase whitespace-nowrap">
                    <th className="py-2 px-2.5 w-44">Nama Biner</th>
                    <th className="py-2 px-2.5 w-20">PID</th>
                    <th className="py-2 px-2.5 w-16">PPID</th>
                    <th className="py-2 px-2.5 w-16">CPU</th>
                    <th className="py-2 px-2.5 w-20">RAM</th>
                    <th className="py-2 px-2.5 w-28 text-right">Aksi Kernel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs whitespace-nowrap">
                  {processes.map((proc) => {
                    const isRunning = proc.status === 'running';

                    return (
                      <tr key={proc.pid} className="hover:bg-slate-100 text-slate-800 bg-white">
                        <td className="py-2.5 px-2.5 font-bold flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isRunning ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          />
                          <span className={!isRunning ? 'line-through text-slate-400' : ''}>
                            {proc.name}
                          </span>
                        </td>
                        <td className="py-2.5 px-2.5 font-bold text-slate-900">{proc.pid}</td>
                        <td className="py-2.5 px-2.5 text-slate-500">{proc.ppid}</td>
                        <td className="py-2.5 px-2.5">{isRunning ? `${proc.cpuPercent}%` : '0%'}</td>
                        <td className="py-2.5 px-2.5">{isRunning ? `${proc.memoryMB} MB` : '0 MB'}</td>
                        <td className="py-2.5 px-2.5 text-right">
                          {isRunning ? (
                            <button
                              onClick={() => terminateProcessByPid(proc.pid)}
                              className="px-2.5 py-1 rounded text-xs font-semibold transition-colors border shadow-xs bg-slate-900 hover:bg-slate-800 text-white"
                              title={`Hentikan proses PID ${proc.pid}`}
                            >
                              taskkill /F
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-semibold">
                              TERMINATED
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200 text-[10.5px] text-slate-600 font-mono">
            Hentikan proses anomali untuk melepaskan handle penguncian berkas kernel di memori RAM (File-in-Use).
          </div>
        </div>

        {/* Right Column: Dynamic Zero-Prefill Firewall Control (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-1 pb-2 mb-2 border-b border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 font-mono">
                <Shield className="w-3.5 h-3.5 text-slate-600" />
                <span>Konfigurasi Outbound Firewall Mandiri</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${
                  isFirewallBlocked
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                {isFirewallBlocked ? 'ACTIVE DROP' : 'OPEN / PASS'}
              </span>
            </div>

            {/* Helper: Sync from selected socket in Netstat */}
            <div className="mb-2.5 flex items-center justify-between gap-2 p-2 bg-white border border-slate-200 rounded text-xs shadow-xs">
              <span className="text-[11px] text-slate-600">Ambil data dari Netstat:</span>
              <button
                onClick={useSelectedSocketForFirewall}
                disabled={!selectedSocketId}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 text-[11px] font-medium rounded border border-slate-300 transition-colors inline-flex items-center gap-1"
              >
                <Link2 className="w-3 h-3" />
                <span>Gunakan Soket Terpilih</span>
              </button>
            </div>

            {/* Quick Dropdown Selector */}
            <div className="mb-2.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                Atau Pilih dari Soket Terdeteksi:
              </label>
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) return;
                  const [ip, port] = val.split(':');
                  setFirewallInputIp(ip);
                  setFirewallInputPort(port);
                }}
                className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-mono text-slate-800"
              >
                <option value="">-- Pilih target dari tabel --</option>
                {activeSocketsWithIp.map((s) => (
                  <option key={s.id} value={`${s.remoteIp}:${s.remotePort}`}>
                    {s.remoteIp}:{s.remotePort} ({s.processName})
                  </option>
                ))}
              </select>
            </div>

            {/* Manual Form Inputs (Zero-Prefilled) */}
            <div className="space-y-2 mb-3">
              <div>
                <label className="text-[10px] font-mono text-slate-600 uppercase block mb-0.5">
                  Alamat IP Target (Remote IP):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 198.51.100.23"
                  value={firewallInputIp}
                  onChange={(e) => setFirewallInputIp(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded font-mono text-xs text-slate-900 focus:outline-slate-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-600 uppercase block mb-0.5">
                  Nomor Port Keluar (Remote Port):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 4444"
                  value={firewallInputPort}
                  onChange={(e) => setFirewallInputPort(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded font-mono text-xs text-slate-900 focus:outline-slate-500"
                />
              </div>
            </div>

            {/* Firewall Action Buttons */}
            {!isFirewallBlocked ? (
              <button
                onClick={applyFirewallRule}
                className="w-full py-2 px-3 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs bg-slate-900 hover:bg-slate-800 text-white"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Terapkan Aturan Blokir (New-NetFirewallRule)</span>
              </button>
            ) : (
              <div className="space-y-2">
                <div className="p-2 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 font-mono">
                  Aturan Aktif: DROP Outbound ke {blockedTargetSummary}.
                </div>
                <button
                  onClick={removeFirewallRule}
                  className="w-full py-1.5 px-3 rounded text-xs font-semibold transition-all border bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs"
                >
                  Cabut Aturan Blokir
                </button>
              </div>
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-200 text-[10.5px] text-slate-600 leading-relaxed font-sans">
            Hati-hati: Memblokir IP aplikasi legal akan menimbulkan penalti pelanggaran SOP. Pastikan target port sesuai dengan hasil analisis Netstat.
          </div>
        </div>
      </div>
    </div>
  );
}
