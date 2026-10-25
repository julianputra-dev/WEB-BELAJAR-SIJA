// File: src/components/simulations/SpywareSandbox.tsx
'use client';

import React, { useState } from 'react';
import { useLessonPhaseStore } from '@/store/useLessonPhaseStore';
import { ProgressService } from '@/services/progressService';
import {
  KeyRound,
  Shield,
  Trash2,
  Terminal,
  Smartphone
} from 'lucide-react';

export const SpywareSandbox: React.FC = () => {
  const { currentPhase, setPhase, triggerWrongOrderError } = useLessonPhaseStore();
  const [username, setUsername] = useState('siswa_sija');
  const [password, setPassword] = useState('');
  const [hackerLogs, setHackerLogs] = useState<string[]>([]);
  const [hookKilled, setHookKilled] = useState(false);
  const [moduleDeleted, setModuleDeleted] = useState(false);
  const [mfaActive, setMfaActive] = useState(false);

  const handlePasswordInput = (val: string) => {
    setPassword(val);
    if (!hookKilled && val.length > 0) {
      setHackerLogs((prev) => [...prev, `[KEYSTROKE CAPTURED] Key: '${val.slice(-1)}' | Full: '${val}'`]);
      if (currentPhase === 'idle') {
        setPhase(
          'infected',
          '[ALERT] API Hook aktif: Setiap karakter ketukan keyboard diteruskan ke server C2 penyerang!'
        );
      }
    }
  };

  // SOP 1: Matikan Hook Process
  const handleKillHook = () => {
    if (currentPhase === 'idle') {
      triggerWrongOrderError('Simulasi belum berjalan.', '[WARN] Aksi diabaikan.');
      return;
    }
    setHookKilled(true);
    setPhase(
      'mitigation_step_1',
      '[SOP-1 SUCCESS] Background API Hook (win_input_hook.dll) dinonaktifkan dari memori sistem.'
    );
  };

  // SOP 2: Hapus Modul Penyadap
  const handleDeleteModule = () => {
    if (!hookKilled) {
      triggerWrongOrderError(
        'Peringatan: Matikan proses hook di memori terlebih dahulu sebelum menghapus berkas sistemnya!',
        '[ERR] File in Use: DLL sedang dimuat oleh proses sistem.'
      );
      return;
    }
    setModuleDeleted(true);
    setPhase(
      'mitigation_step_2',
      '[SOP-2 SUCCESS] Berkas DLL penyadap telah dibersihkan secara permanen dari direktori Windows.'
    );
  };

  // SOP 3: Reset Kata Sandi & Aktifkan MFA
  const handleResetPasswordAndMFA = async () => {
    if (currentPhase === 'idle') {
      triggerWrongOrderError('Simulasi belum dimulai.', '[WARN] Aksi diabaikan.');
      return;
    }

    // SALAH URUTAN: Jika mengganti password saat hook keylogger masih aktif
    if (!hookKilled) {
      setHackerLogs((prev) => [
        ...prev,
        `[CRITICAL LEAK] New Password leaked: 'AdminRahasia2026!'`,
      ]);
      triggerWrongOrderError(
        'Peringatan: Kata sandi barumu langsung bocor kembali! Kamu mengganti kata sandi saat proses Keylogger masih aktif menyadap papan ketik. Hentikan proses penyadapnya terlebih dahulu (Langkah 1).',
        '[CRITICAL FAILURE] Kredensial baru kembali tersadap oleh keylogger!'
      );
      return;
    }

    setMfaActive(true);
    setPassword('');
    setPhase(
      'recovered',
      '[SOP-3 SUCCESS] Kata sandi telah diperbarui & Multi-Factor Authentication (MFA) berhasil diaktifkan!'
    );

    await ProgressService.saveModuleProgress({
      malwareType: 'spyware',
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
          <KeyRound className="w-5 h-5 text-cyan-400" />
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Portal Autentikasi & Attacker Interception Terminal
            </div>
            <div className="text-[11px] text-slate-400">
              Vektor: Kernel API Keyboard Hooking & Exfiltration
            </div>
          </div>
        </div>

        {/* SOP Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleKillHook}
            disabled={hookKilled || currentPhase === 'idle' || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <Shield className="w-3.5 h-3.5" />
            1. Kill win_input_hook.dll
          </button>

          <button
            onClick={handleDeleteModule}
            disabled={moduleDeleted || currentPhase === 'idle' || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            2. Hapus Berkas Spyware
          </button>

          <button
            onClick={handleResetPasswordAndMFA}
            disabled={mfaActive || currentPhase === 'idle' || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <Smartphone className="w-3.5 h-3.5" />
            3. Reset Password & Aktifkan MFA
          </button>
        </div>
      </div>

      {/* Main Grid: User Login Portal vs Hacker Exfiltration Terminal */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* User Login Simulation */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400 mb-4">
              <span className="font-semibold text-slate-200">Portal Login Siswa SIJA</span>
              <span className="text-cyan-400 font-mono">HTTPS Simulated</span>
            </div>

            <div className="space-y-4 max-w-sm mx-auto py-2">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Username / NISN</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Password (Ketikkan sesuatu untuk menguji keylogger)
                </label>
                <input
                  type="password"
                  placeholder="Ketik password..."
                  value={password}
                  onChange={(e) => handlePasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {mfaActive && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                  <Smartphone className="w-4 h-4 shrink-0" />
                  <span>Proteksi 2FA / OTP Token Aktif pada Akun!</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
            *Di layar siswa, input password tersembunyi sebagai tanda bintang (*). Namun API hook
            mencegat sinyal tombol langsung dari OS.
          </div>
        </div>

        {/* Attacker C2 Server Terminal */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 mb-3">
            <div className="flex items-center gap-2 text-red-400">
              <Terminal className="w-4 h-4" />
              <span className="font-bold">Attacker C2 Keylogger Server (Raw Intercept)</span>
            </div>
            <span className={hookKilled ? 'text-slate-500' : 'text-red-400 animate-pulse'}>
              {hookKilled ? 'STREAM OFFLINE' : 'LIVE LISTENING'}
            </span>
          </div>

          <div className="flex-1 bg-black/60 rounded-lg p-3 overflow-y-auto space-y-1.5 border border-slate-800 text-[11px]">
            {hackerLogs.length === 0 ? (
              <div className="text-slate-600 text-center py-10">
                Menunggu ketukan tombol pengguna di portal login...
              </div>
            ) : (
              hackerLogs.map((log, idx) => (
                <div key={idx} className="text-red-400 font-mono">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
