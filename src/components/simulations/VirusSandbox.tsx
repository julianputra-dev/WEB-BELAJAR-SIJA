// File: src/components/simulations/VirusSandbox.tsx
'use client';

import React, { useState } from 'react';
import { useLessonPhaseStore } from '@/store/useLessonPhaseStore';
import { ProgressService } from '@/services/progressService';
import {
  FileCode,
  ShieldCheck,
  ShieldAlert,
  Archive,
  RefreshCw,
  Cpu,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

interface VirusFile {
  name: string;
  originalSize: number;
  currentSize: number;
  hash: string;
  status: 'clean' | 'infected' | 'quarantined';
}

export const VirusSandbox: React.FC = () => {
  const { currentPhase, setPhase, triggerWrongOrderError } = useLessonPhaseStore();
  const [inSafeMode, setInSafeMode] = useState(false);
  const [isQuarantined, setIsQuarantined] = useState(false);
  const [isDisinfected, setIsDisinfected] = useState(false);

  const [files, setFiles] = useState<VirusFile[]>([
    { name: 'setup_game.exe (Carrier)', originalSize: 1024, currentSize: 1024, hash: 'a1b2c3d4', status: 'clean' },
    { name: 'explorer_plugin.dll', originalSize: 512, currentSize: 512, hash: '8e9f0a1b', status: 'clean' },
    { name: 'system_service.exe', originalSize: 2048, currentSize: 2048, hash: 'c5d6e7f8', status: 'clean' },
  ]);

  const handleInfect = () => {
    setFiles((prev) =>
      prev.map((f) => ({
        ...f,
        currentSize: f.originalSize + 328, // ukuran membesar akibat payload
        status: 'infected',
        hash: 'TAMPERED_HASH',
      }))
    );
    setPhase(
      'infected',
      '[ALERT] setup_game.exe dijalankan! Muatan virus menyuntikkan kode parasit ke seluruh binary direktori.'
    );
  };

  // SOP 1: Safe mode & Process Kill
  const handleSafeModeKill = () => {
    if (currentPhase === 'idle') {
      triggerWrongOrderError('Simulasi belum berjalan.', '[WARN] Aksi diabaikan.');
      return;
    }
    setInSafeMode(true);
    setPhase(
      'mitigation_step_1',
      '[SOP-1 SUCCESS] Masuk ke Safe Mode & proses virus di RAM berhasil dimatikan.'
    );
  };

  // SOP 2: Karantina Carrier
  const handleQuarantine = () => {
    if (!inSafeMode) {
      triggerWrongOrderError(
        'Peringatan: Matikan proses virus di RAM (Safe Mode) terlebih dahulu sebelum memindahkan berkas!',
        '[ERR] File in Use: Virus masih aktif mengeksekusi thread di background.'
      );
      return;
    }
    setIsQuarantined(true);
    setFiles((prev) =>
      prev.map((f) => (f.name.includes('setup_game') ? { ...f, status: 'quarantined' } : f))
    );
    setPhase(
      'mitigation_step_2',
      '[SOP-2 SUCCESS] Berkas pembawa muatan (setup_game.exe) berhasil diisolasi ke ruang karantina.'
    );
  };

  // SOP 3: Disinfeksi Berkas
  const handleDisinfect = async () => {
    if (!isQuarantined) {
      triggerWrongOrderError(
        'Isolasi berkas pembawa ke karantina terlebih dahulu (Langkah 2) sebelum memindai!',
        '[ERR] Prosedur salah: Carrier file belum dikarantina.'
      );
      return;
    }

    setFiles((prev) =>
      prev.map((f) =>
        f.status === 'quarantined'
          ? f
          : { ...f, currentSize: f.originalSize, status: 'clean', hash: 'VERIFIED_OK' }
      )
    );
    setIsDisinfected(true);
    setPhase(
      'recovered',
      '[SOP-3 SUCCESS] Pemindaian integritas SHA-256 tuntas. Seluruh berkas biner berhasil didisinfeksi!'
    );

    await ProgressService.saveModuleProgress({
      malwareType: 'virus',
      infectionObserved: true,
      mitigationCompleted: true,
      mistakeCount: 0,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 p-4 gap-4 overflow-y-auto">
      {/* Control Action Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-cyan-400" />
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              File Infector & Binary Integrity Sandbox
            </div>
            <div className="text-[11px] text-slate-400">
              Vektor: Host Insertion & Binary Code Injection
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSafeModeKill}
            disabled={inSafeMode || currentPhase === 'idle' || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <Cpu className="w-3.5 h-3.5" />
            1. Safe Mode & Kill Process
          </button>

          <button
            onClick={handleQuarantine}
            disabled={isQuarantined || currentPhase === 'idle' || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <Archive className="w-3.5 h-3.5" />
            2. Karantina Carrier
          </button>

          <button
            onClick={handleDisinfect}
            disabled={isDisinfected || currentPhase === 'idle' || currentPhase === 'recovered'}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            3. Disinfeksi & SHA-256 Check
          </button>
        </div>
      </div>

      {/* File Integrity Table */}
      <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400 mb-3">
          <span>Sistem Berkas Host (Integritas Biner)</span>
          <span>Status Lingkungan: {inSafeMode ? 'SAFE MODE ACTIVE' : 'STANDARD OS'}</span>
        </div>

        <div className="overflow-x-auto flex-1 font-mono text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-800 text-[11px]">
                <th className="pb-2">Nama Berkas</th>
                <th className="pb-2">Ukuran Asli</th>
                <th className="pb-2">Ukuran Saat Ini</th>
                <th className="pb-2">Hash SHA-256</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px]">
              {files.map((file, idx) => (
                <tr key={idx} className={file.status === 'infected' ? 'text-red-400 bg-red-950/20' : 'text-slate-300'}>
                  <td className="py-2.5 font-semibold">{file.name}</td>
                  <td>{file.originalSize} KB</td>
                  <td className={file.currentSize > file.originalSize ? 'text-red-400 font-bold' : 'text-slate-300'}>
                    {file.currentSize} KB
                  </td>
                  <td className="text-slate-400">{file.hash}</td>
                  <td>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        file.status === 'infected'
                          ? 'bg-red-900 text-red-300'
                          : file.status === 'quarantined'
                          ? 'bg-amber-900 text-amber-300'
                          : 'bg-emerald-950 text-emerald-400'
                      }`}
                    >
                      {file.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {file.name.includes('setup_game') && currentPhase === 'idle' && (
                      <button
                        onClick={handleInfect}
                        className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px]"
                      >
                        Jalankan
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
