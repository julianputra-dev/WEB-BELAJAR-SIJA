// File: src/components/simulations/TrojanSandbox.tsx
'use client';

import React, { useState } from 'react';
import { useLessonPhaseStore } from '@/store/useLessonPhaseStore';
import { ProgressService } from '@/services/progressService';
import {
  Calculator,
  Shield,
  Activity,
  Trash2,
  CheckCircle,
  ExternalLink,
  Radio,
  Lock,
} from 'lucide-react';

export const TrojanSandbox: React.FC = () => {
  const { currentPhase, setPhase, triggerWrongOrderError } = useLessonPhaseStore();
  const [pidKilled, setPidKilled] = useState(false);
  const [firewallBlocked, setFirewallBlocked] = useState(false);
  const [fileDeleted, setFileDeleted] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState('0');

  // Trigger Infeksi
  const handleRunApp = () => {
    setCalcDisplay('42');
    setPhase(
      'infected',
      '[ALERT] SuperCalc_Pro.exe aktif. Netstat mendeteksi koneksi tersembunyi pada Port 4444 ke IP C2 asing!'
    );
  };

  // SOP Langkah 1: Analisis Netstat
  const handleInspectNetstat = () => {
    if (currentPhase === 'idle') {
      triggerWrongOrderError(
        'Jalankan aplikasi kalkulator terlebih dahulu untuk memicu simulasi backdoor.',
        '[WARN] Aplikasi belum dieksekusi.'
      );
      return;
    }
    setPhase(
      'mitigation_step_1',
      '[SOP-1 SUCCESS] Netstat Analysis: Koneksi asing Port 4444 terlacak berakar dari Process ID (PID) 3892.'
    );
  };

  // SOP Langkah 2: Blokir IP & Matikan PID
  const handleKillAndBlock = () => {
    if (currentPhase === 'idle' || currentPhase === 'infected') {
      triggerWrongOrderError(
        'Kamu belum mengidentifikasi PID program penyebab lewat analisis Netstat (Langkah 1).',
        '[ERR] Prosedur salah: Lakukan audit Netstat terlebih dahulu.'
      );
      return;
    }
    setPidKilled(true);
    setFirewallBlocked(true);
    setPhase(
      'mitigation_step_2',
      '[SOP-2 SUCCESS] Firewall memblokir IP C2 luar dan PID 3892 dimatikan dari RAM.'
    );
  };

  // SOP Langkah 3: Hapus Berkas & Bersihkan Startup
  const handleDeleteBinary = async () => {
    if (currentPhase === 'idle') {
      triggerWrongOrderError('Simulasi belum berjalan.', '[WARN] Aksi diabaikan.');
      return;
    }

    // SALAH URUTAN: Mencoba menghapus berkas saat proses masih aktif di RAM
    if (!pidKilled) {
      triggerWrongOrderError(
        'Akses Ditolak (File in Use): Berkas tidak dapat dihapus karena program masih berjalan di latar belakang. Lacak PID melalui Netstat dan hentikan prosesnya terlebih dahulu di RAM!',
        '[ACCESS DENIED] File locking aktif: Proses PID 3892 masih memegang handle berkas.'
      );
      return;
    }

    setFileDeleted(true);
    setPhase(
      'recovered',
      '[SOP-3 SUCCESS] Berkas induk biner Trojan dihapus dan registri Startup dibersihkan. Sistem aman!'
    );

    await ProgressService.saveModuleProgress({
      malwareType: 'trojan',
      infectionObserved: true,
      mitigationCompleted: true,
      mistakeCount: 0,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 p-4 gap-4 overflow-y-auto">
      {/* Control Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-cyan-400" />
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Aplikasi Utilitas & Analisis Netstat Backdoor
            </div>
            <div className="text-[11px] text-slate-400">
              Vektor: Disguised Binary & C2 Reverse TCP Port 4444
            </div>
          </div>
        </div>

        {/* SOP Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleInspectNetstat}
            disabled={currentPhase === 'idle' || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <Activity className="w-3.5 h-3.5" />
            1. Analisis Netstat (Lacak PID)
          </button>

          <button
            onClick={handleKillAndBlock}
            disabled={currentPhase === 'idle' || pidKilled || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <Shield className="w-3.5 h-3.5" />
            2. Blokir IP & Kill PID 3892
          </button>

          <button
            onClick={handleDeleteBinary}
            disabled={fileDeleted || currentPhase === 'idle' || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            3. Hapus Berkas & Startup
          </button>
        </div>
      </div>

      {/* Main Grid: UI Kalkulator Tiruan & Terminal Netstat */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Fake Calculator GUI */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400 mb-4">
              <span className="font-semibold text-slate-200">SuperCalc_Pro.exe (Utilitas Gratis)</span>
              <span className={fileDeleted ? 'text-red-400' : 'text-emerald-400'}>
                {fileDeleted ? 'TERHAPUS' : 'INSTALLED'}
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-right font-mono text-2xl text-cyan-400 mb-4">
              {calcDisplay}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'].map(
                (btn) => (
                  <button
                    key={btn}
                    onClick={() => {
                      if (currentPhase === 'idle') handleRunApp();
                      if (btn === 'C') setCalcDisplay('0');
                      else setCalcDisplay((prev) => (prev === '0' ? btn : prev + btn));
                    }}
                    className="p-3 bg-slate-800 hover:bg-slate-700 text-white font-mono text-sm rounded-lg active:scale-95 transition-all"
                  >
                    {btn}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 mt-4 p-2 bg-slate-950 rounded border border-slate-800">
            *Aplikasi kalkulator ini berjalan normal di permukaan, namun diam-diam memanggil fungsi
            socket tersembunyi ke server luar.
          </div>
        </div>

        {/* Netstat Active Connection Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400 mb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>Netstat Active Sockets Audit</span>
            </div>
            <span>Proto: TCP/IP</span>
          </div>

          <div className="overflow-x-auto flex-1 font-mono text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800 text-[11px]">
                  <th className="pb-2">Proto</th>
                  <th className="pb-2">Local Address</th>
                  <th className="pb-2">Foreign Address</th>
                  <th className="pb-2">State</th>
                  <th className="pb-2">PID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-[11px]">
                <tr className="text-slate-400">
                  <td className="py-2">TCP</td>
                  <td>127.0.0.1:80</td>
                  <td>0.0.0.0:0</td>
                  <td>LISTENING</td>
                  <td>4</td>
                </tr>
                {currentPhase !== 'idle' && (
                  <tr
                    className={`font-bold transition-all ${
                      pidKilled
                        ? 'text-slate-600 line-through'
                        : 'text-red-400 bg-red-950/30 animate-pulse'
                    }`}
                  >
                    <td className="py-2">TCP</td>
                    <td>192.168.10.11:4444</td>
                    <td>198.51.100.23:4444</td>
                    <td>{pidKilled ? 'CLOSED' : 'ESTABLISHED (Backdoor)'}</td>
                    <td>3892</td>
                  </tr>
                )}
                <tr className="text-slate-400">
                  <td className="py-2">TCP</td>
                  <td>192.168.10.11:443</td>
                  <td>142.250.190.46:443</td>
                  <td>ESTABLISHED</td>
                  <td>1240</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
