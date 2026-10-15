// File: src/components/simulations/RansomwareSandbox.tsx
'use client';

import React, { useState } from 'react';
import { useFileSystemStore } from '@/store/useFileSystemStore';
import { useLessonPhaseStore } from '@/store/useLessonPhaseStore';
import { ProgressService } from '@/services/progressService';
import {
  Folder,
  FileText,
  FileCode,
  HardDrive,
  Lock,
  Skull,
  Server,
  RefreshCw,
  CheckCircle,
  AlertOctagon,
  ShieldAlert,
} from 'lucide-react';

export const RansomwareSandbox: React.FC = () => {
  const {
    files,
    nasConnected,
    backupConnected,
    systemCleaned,
    isRansomwareActive,
    executeCarrierFile,
    disconnectNas,
    wipeSystemPartition,
    attachBackupDrive,
    restoreFromBackup,
  } = useFileSystemStore();

  const { currentPhase, setPhase, triggerWrongOrderError } = useLessonPhaseStore();
  const [showRansomPopup, setShowRansomPopup] = useState(false);

  // Trigger Infeksi
  const handleTriggerInfection = (fileId: string) => {
    executeCarrierFile(fileId);
    setShowRansomPopup(true);
    setPhase(
      'infected',
      '[ALERT] Tagihan_Kurir.pdf.exe dieksekusi! Algoritma AES/RSA mengunci berkas dokumen lokal (.locked).'
    );
  };

  // SOP Langkah 1: Isolasi NAS
  const handleIsolateNas = () => {
    if (currentPhase === 'idle') {
      triggerWrongOrderError(
        'Sistem belum terinfeksi. Lakukan observasi infeksi terlebih dahulu.',
        '[WARN] Aksi dibatalkan: Sistem dalam keadaan normal.'
      );
      return;
    }

    disconnectNas();
    setPhase(
      'mitigation_step_1',
      '[SOP-1 SUCCESS] Koneksi Shared Storage (NAS) berhasil diputus. Enkripsi tidak dapat merambat ke server!'
    );
  };

  // SOP Langkah 2: Format / Bersihkan Partisi Terinfeksi
  const handleWipePartition = () => {
    if (currentPhase === 'idle') {
      triggerWrongOrderError(
        'Sistem dalam keadaan normal. Tidak perlu memformat partisi.',
        '[WARN] Format partisi dibatalkan: Sistem bersih.'
      );
      return;
    }

    if (nasConnected) {
      triggerWrongOrderError(
        'Peringatan Kritis: Kamu mencoba membersihkan sistem sebelum memutus koneksi NAS! Putuskan sambungan NAS terlebih dahulu agar integritas jaringan terjamin.',
        '[ERR] Prosedur salah: NAS masih tersambung ke jaringan!'
      );
      return;
    }

    wipeSystemPartition();
    setShowRansomPopup(false);
    setPhase(
      'mitigation_step_2',
      '[SOP-2 SUCCESS] Partisi sistem berhasil diformat bersih. Seluruh proses dan artefak ransomware musnah.'
    );
  };

  // SOP Langkah 3: Restore Backup
  const handleRestoreBackup = async () => {
    if (currentPhase === 'idle') {
      triggerWrongOrderError(
        'Sistem belum memerlukan restorasi.',
        '[WARN] Restorasi tidak diperlukan pada kondisi idle.'
      );
      return;
    }

    // SALAH URUTAN: Jika backup dicolok sebelum sistem diformat/dibersihkan
    if (!systemCleaned) {
      triggerWrongOrderError(
        'Fatal: Kamu mencolokkan drive cadangan saat sistem masih mengandung Ransomware aktif! Akibatnya berkas cadanganmu ikut terkunci! Bersihkan sistem operasi terlebih dahulu (Langkah 2) sebelum menghubungkan media backup.',
        '[CRITICAL FAILURE] Drive Backup dicolokkan saat malware aktif! Data backup terkontaminasi.'
      );
      return;
    }

    attachBackupDrive();
    restoreFromBackup();
    setPhase(
      'recovered',
      '[SOP-3 SUCCESS] Data berhasil dipulihkan dari External Offline Backup. Sistem kembali beroperasi penuh!'
    );

    await ProgressService.saveModuleProgress({
      malwareType: 'ransomware',
      infectionObserved: true,
      mitigationCompleted: true,
      mistakeCount: 0,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 p-4 gap-4 overflow-y-auto">
      {/* Top Banner Control Panel SOP */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <HardDrive className="w-5 h-5 text-cyan-400" />
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Terminal File Explorer & Storage Sandbox
            </div>
            <div className="text-[11px] text-slate-400">
              Target Insiden: Rekayasa Sosial & Enkripsi Kriptografi Berkas
            </div>
          </div>
        </div>

        {/* Status Indikator Media Eksternal */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
              nasConnected
                ? 'bg-amber-950/40 text-amber-400 border-amber-800'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>NAS: {nasConnected ? 'TERHUBUNG' : 'TERISOLASI'}</span>
          </div>

          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
              backupConnected
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Backup Drive: {backupConnected ? 'TERPASANG' : 'OFFLINE'}</span>
          </div>
        </div>
      </div>

      {/* Main Sandbox Area: File Explorer & Ransomware Note */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[360px]">
        {/* Kolom File Explorer (2 Kolom) */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col shadow-inner">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400 mb-3">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-cyan-400" />
              <span>C:\Users\Siswa_SIJA\Dokumen_PKL\</span>
            </div>
            <span>{files.length} Item Berkas</span>
          </div>

          {files.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 py-12 text-center">
              <RefreshCw className="w-8 h-8 text-slate-600 mb-2 animate-spin" />
              <p className="text-xs font-mono">Partisi sistem kosong (telah diformat bersih).</p>
              <p className="text-[11px] text-slate-600">
                Silakan lakukan restorasi dari drive cadangan (Offline Backup).
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 content-start">
              {files.map((file) => {
                const isEncrypted = file.status === 'encrypted';
                const isInfected = file.status === 'infected';

                return (
                  <div
                    key={file.id}
                    onClick={() => {
                      if (file.isCarrier && currentPhase === 'idle') {
                        handleTriggerInfection(file.id);
                      }
                    }}
                    className={`p-3 rounded-lg border transition-all flex items-center justify-between cursor-pointer select-none ${
                      isEncrypted
                        ? 'bg-red-950/40 border-red-900 text-red-200'
                        : isInfected
                        ? 'bg-red-900/50 border-red-600 text-white animate-pulse'
                        : file.isCarrier
                        ? 'bg-slate-800/80 border-cyan-800/60 hover:border-cyan-500 hover:bg-slate-800 text-slate-200'
                        : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isEncrypted ? (
                        <Lock className="w-5 h-5 text-red-500 shrink-0" />
                      ) : file.isCarrier ? (
                        <FileCode className="w-5 h-5 text-cyan-400 shrink-0" />
                      ) : (
                        <FileText className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate flex items-center gap-1">
                          {file.name}
                          {isEncrypted && (
                            <span className="text-[10px] text-red-400 font-mono font-bold">
                              .locked
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {file.sizeKB} KB • {file.status.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {file.isCarrier && currentPhase === 'idle' && (
                      <span className="text-[9px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 px-1.5 py-0.5 rounded">
                        Klik Uji
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Tombol Aksi Penanganan Interaktif SOP */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <button
              onClick={handleIsolateNas}
              disabled={!nasConnected || currentPhase === 'idle' || currentPhase === 'recovered'}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
            >
              <Server className="w-3.5 h-3.5" />
              1. Lepas Koneksi NAS
            </button>

            <button
              onClick={handleWipePartition}
              disabled={systemCleaned || currentPhase === 'idle' || currentPhase === 'recovered'}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
            >
              <Skull className="w-3.5 h-3.5" />
              2. Format Partisi Sistem
            </button>

            <button
              onClick={handleRestoreBackup}
              disabled={currentPhase === 'idle' || currentPhase === 'recovered'}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center gap-1.5 transition-all"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              3. Pasang & Restore Backup
            </button>
          </div>
        </div>

        {/* Kolom Jendela Tebusan Ransom Note (Simulasi Pop-up) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-red-400">
              <AlertOctagon className="w-4 h-4" />
              <span>Ransomware Payload Monitor</span>
            </div>

            {showRansomPopup ? (
              <div className="p-3.5 bg-red-950/80 border border-red-700 rounded-xl text-red-200 text-xs space-y-2 shadow-2xl animate-pulse">
                <div className="flex items-center gap-2 font-bold text-red-400">
                  <Skull className="w-5 h-5 text-red-500" />
                  <span>BERKAS ANDA TELAH DIENKRIPSI!</span>
                </div>
                <p className="text-[11px] leading-relaxed text-red-300">
                  Semua berkas dokumen, skrip, dan database Anda telah dikunci menggunakan algoritma
                  kriptografi militer RSA-4096.
                </p>
                <div className="bg-black/60 p-2 rounded font-mono text-[10px] text-amber-300">
                  Wallet: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                  <br />
                  Tebusan: 0.5 BTC untuk Kunci Dekripsi
                </div>
                <div className="text-[10px] text-red-400 font-semibold italic">
                  *Peringatan SIJA: Jangan pernah membayar tebusan! Lakukan prosedur isolasi segera.
                </div>
              </div>
            ) : (
              <div className="p-6 border border-dashed border-slate-800 rounded-xl text-center text-slate-500 text-xs flex flex-col items-center justify-center h-48">
                <ShieldAlert className="w-8 h-8 text-slate-700 mb-2" />
                <span>Tidak ada ransomware aktif terdeteksi.</span>
                <span className="text-[10px] text-slate-600">
                  Klik file Tagihan_Kurir.pdf.exe untuk menguji.
                </span>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Konsep Pedagogis SIJA:</span>
            <p className="mt-1 text-slate-400">
              Offline Backup (cadangan fisik terpisah) adalah satu-satunya metode pemulihan yang aman
              tanpa kompromi dengan peretas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
