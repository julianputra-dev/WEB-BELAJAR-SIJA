// File: src/components/trojan/lab/SurfaceAppDirectoryPanel.tsx
'use client';

import React, { useState } from 'react';
import {
  FileText,
  CloudSun,
  Calculator,
  Folder,
  Trash2,
  Database,
  Play,
  X,
  RotateCw,
  Eye,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useTrojanLabStore } from '@/store/useTrojanLabStore';

export function SurfaceAppDirectoryPanel() {
  const {
    appOffline,
    appNetwork,
    appTrojan,
    isFileDeleted,
    isProcessKilled,
    isStartupCleaned,
    launchApp,
    closeAppGui,
    pressCalcButton,
    updateNotesContent,
    triggerWeatherSync,
    deleteAppBinary,
    cleanStartupRegistry,
  } = useTrojanLabStore();

  const [activeTab, setActiveTab] = useState<'offline' | 'network' | 'trojan'>('trojan');

  const calcButtons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    'C', '0', '=', '+',
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex flex-col gap-3.5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 border border-slate-200 rounded text-slate-800">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Panel 1: Pengujian 3 Aplikasi Permukaan &amp; Direktori Berkas
            </h2>
            <p className="text-[11px] text-slate-500">
              Uji ketiga aplikasi utilitas untuk membandingkan perilaku permukaan dengan telemetri jaringan di balik layar
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
          Mode Deteksi Mandiri
        </span>
      </div>

      {/* 3 App Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* App 1: Offline Utility */}
        <button
          onClick={() => setActiveTab('offline')}
          className={`p-2.5 rounded border text-left transition-all flex items-center justify-between shadow-xs ${
            activeTab === 'offline'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">1. Catatan_Sistem.exe</div>
              <div className={`text-[10px] truncate ${activeTab === 'offline' ? 'text-slate-300' : 'text-slate-500'}`}>
                Utilitas Teks (Offline)
              </div>
            </div>
          </div>
          <span
            className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 font-semibold ${
              appOffline.isRunning
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : activeTab === 'offline'
                ? 'bg-slate-800 text-slate-300'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {appOffline.isRunning ? 'AKTIF' : 'IDLE'}
          </span>
        </button>

        {/* App 2: Normal Network App */}
        <button
          onClick={() => setActiveTab('network')}
          className={`p-2.5 rounded border text-left transition-all flex items-center justify-between shadow-xs ${
            activeTab === 'network'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <CloudSun className="w-4 h-4 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">2. WeatherSync_Pro.exe</div>
              <div className={`text-[10px] truncate ${activeTab === 'network' ? 'text-slate-300' : 'text-slate-500'}`}>
                Sinkron Cuaca (HTTPS)
              </div>
            </div>
          </div>
          <span
            className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 font-semibold ${
              appNetwork.isRunning
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : activeTab === 'network'
                ? 'bg-slate-800 text-slate-300'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {appNetwork.isRunning ? 'AKTIF' : 'IDLE'}
          </span>
        </button>

        {/* App 3: Trojan Disguised App */}
        <button
          onClick={() => setActiveTab('trojan')}
          className={`p-2.5 rounded border text-left transition-all flex items-center justify-between shadow-xs ${
            activeTab === 'trojan'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Calculator className="w-4 h-4 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">3. SuperCalc_Pro.exe</div>
              <div className={`text-[10px] truncate ${activeTab === 'trojan' ? 'text-slate-300' : 'text-slate-500'}`}>
                Kalkulator Sistem
              </div>
            </div>
          </div>
          <span
            className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 font-semibold ${
              appTrojan.isRunning
                ? isProcessKilled
                  ? 'bg-slate-400 text-white'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : activeTab === 'trojan'
                ? 'bg-slate-800 text-slate-300'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {isFileDeleted
              ? 'TERHAPUS'
              : isProcessKilled
              ? 'MATI'
              : appTrojan.isRunning
              ? 'AKTIF'
              : 'IDLE'}
          </span>
        </button>
      </div>

      {/* Main Workspace Split: Left: Active App GUI, Right: Directory Explorer & Registry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left Sub-Panel: Selected App Interactive Window (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between min-h-[310px]">
          {/* TAB 1: Offline App (Catatan_Sistem.exe) */}
          {activeTab === 'offline' && (
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200 text-xs font-mono">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-600" />
                    Catatan_Sistem.exe (PID 2104)
                  </span>
                  {appOffline.isGuiOpen && (
                    <button
                      onClick={() => closeAppGui('offline')}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                      title="Tutup Jendela"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {!appOffline.isRunning ? (
                  <div className="py-8 text-center space-y-3">
                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                      Aplikasi utilitas pengolah teks lokal. Tidak memerlukan akses koneksi internet.
                    </p>
                    <button
                      onClick={() => launchApp('offline')}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Jalankan Catatan_Sistem.exe</span>
                    </button>
                  </div>
                ) : !appOffline.isGuiOpen ? (
                  <div className="py-6 text-center space-y-2">
                    <div className="text-xs text-slate-600">Jendela aplikasi diminimalkan.</div>
                    <button
                      onClick={() => launchApp('offline')}
                      className="px-3 py-1.5 bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Tampilkan Jendela GUI</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      value={appOffline.notesContent}
                      onChange={(e) => updateNotesContent(e.target.value)}
                      rows={5}
                      className="w-full p-2 bg-white border border-slate-300 rounded font-mono text-xs text-slate-900 resize-none focus:outline-slate-500"
                    />
                    <div className="text-[10px] text-slate-500 font-mono">
                      Status Jaringan: Offline murni (Tidak membuka soket Winsock2).
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10.5px] text-slate-500">
                Amati tabel Netstat di Panel 2 saat aplikasi offline ini dijalankan (tidak ada baris soket asing).
              </div>
            </div>
          )}

          {/* TAB 2: Normal Network App (WeatherSync_Pro.exe) */}
          {activeTab === 'network' && (
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200 text-xs font-mono">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CloudSun className="w-3.5 h-3.5 text-slate-600" />
                    WeatherSync_Pro.exe (PID 2540)
                  </span>
                  {appNetwork.isGuiOpen && (
                    <button
                      onClick={() => closeAppGui('network')}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                      title="Tutup Jendela"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {!appNetwork.isRunning ? (
                  <div className="py-8 text-center space-y-3">
                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                      Aplikasi cuaca legal. Menggunakan protokol HTTPS standar pada Port 443 dengan sertifikat TLS terotentikasi.
                    </p>
                    <button
                      onClick={() => launchApp('network')}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Jalankan WeatherSync_Pro.exe</span>
                    </button>
                  </div>
                ) : !appNetwork.isGuiOpen ? (
                  <div className="py-6 text-center space-y-2">
                    <div className="text-xs text-slate-600">Jendela aplikasi diminimalkan ke system tray.</div>
                    <button
                      onClick={() => launchApp('network')}
                      className="px-3 py-1.5 bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Buka Jendela WeatherSync</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-white border border-slate-200 rounded space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">{appNetwork.lastCity}</div>
                        <div className="text-2xl font-bold font-mono text-slate-800">{appNetwork.tempC}°C</div>
                      </div>
                      <button
                        onClick={triggerWeatherSync}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Sinkron Ulang</span>
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Protokol: HTTPS Port 443 &bull; Tujuan: 142.250.190.46 &bull; Status: Sah
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10.5px] text-slate-500">
                Aplikasi jaringan legal menggunakan port standar (443/80) dengan payload terenkripsi TLS resmi.
              </div>
            </div>
          )}

          {/* TAB 3: Trojan Disguised App (SuperCalc_Pro.exe) */}
          {activeTab === 'trojan' && (
            <div className="h-full flex flex-col justify-between">
              <div>
                {/* Title Bar with Stealth "Tutup Jendela (X)" Button */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 text-xs font-mono">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-slate-600" />
                    SuperCalc_Pro.exe (v2.4)
                  </span>
                  {appTrojan.isGuiOpen && (
                    <button
                      onClick={() => closeAppGui('trojan')}
                      className="px-1.5 py-0.5 text-xs text-slate-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 rounded transition-colors flex items-center gap-1 font-sans"
                      title="Tutup Jendela Aplikasi (Uji Mekanisme Siluman)"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Tutup Jendela (X)</span>
                    </button>
                  )}
                </div>

                {!appTrojan.isRunning ? (
                  <div className="py-8 text-center space-y-3">
                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                      Aplikasi kalkulator yang diunduh dari internet. Berjalan normal untuk menghitung aritmetika di permukaan.
                    </p>
                    <button
                      onClick={() => launchApp('trojan')}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Jalankan SuperCalc_Pro.exe</span>
                    </button>
                  </div>
                ) : !appTrojan.isGuiOpen ? (
                  /* Stealth Demonstration Screen: Window is Closed, but Daemon Still Runs! */
                  <div className="p-3 bg-amber-50/70 border border-amber-300 rounded space-y-2.5">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-amber-900">
                          Mekanisme Siluman: Jendela GUI Ditutup Pengguna
                        </div>
                        <p className="text-[11px] text-amber-800 leading-relaxed font-sans">
                          Meskipun jendela antarmuka ditutup seolah-olah program berhenti, perhatikan <strong>Panel 2 (Netstat)</strong> dan <strong>Panel 3 (RAM)</strong>: Proses biner dan koneksi jaringan jarak jauh masih terus berjalan di latar belakang (Background Daemon)!
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => launchApp('trojan')}
                      className="w-full py-1.5 px-3 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs font-semibold rounded flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Buka Kembali Jendela GUI</span>
                    </button>
                  </div>
                ) : (
                  /* Normal Working Calculator Screen */
                  <div className="space-y-2.5">
                    <div className="bg-white border border-slate-300 rounded p-2 text-right font-mono text-xl font-bold text-slate-900 tracking-tight shadow-inner min-h-[42px] flex items-center justify-end">
                      {appTrojan.calcDisplay}
                    </div>

                    <div className="grid grid-cols-4 gap-1">
                      {calcButtons.map((btn) => {
                        const isOp = ['/', '*', '-', '+', '='].includes(btn);
                        const isClear = btn === 'C';
                        return (
                          <button
                            key={btn}
                            onClick={() => pressCalcButton(btn)}
                            disabled={isFileDeleted}
                            className={`h-9 rounded text-xs font-mono font-semibold transition-all shadow-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                              isClear
                                ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200'
                                : isOp
                                ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300'
                                : 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-300'
                            }`}
                          >
                            {btn}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10.5px] text-slate-600 font-sans">
                Kalkulator berfungsi 100% normal. Gunakan tombol &quot;Tutup Jendela (X)&quot; untuk menguji apakah prosesnya benar-benar berhenti.
              </div>
            </div>
          )}
        </div>

        {/* Right Sub-Panel: File Explorer & Startup Registry (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* File Directory Listing */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 mb-2 border-b border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 font-mono">
                <Folder className="w-3.5 h-3.5 text-slate-600" />
                <span>Direktori Penyimpanan Biner Host</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                NTFS Storage
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {/* App 3 Trojan Binary Row */}
              <div className="p-2.5 bg-white border border-slate-200 rounded flex flex-wrap items-center justify-between gap-2 shadow-xs">
                <div className="min-w-[180px] flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${isFileDeleted ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                      SuperCalc_Pro.exe
                    </span>
                    <span className="text-[10px] text-slate-500">(1,842 KB)</span>
                  </div>
                  <div className="text-[10.5px] text-slate-500 mt-0.5">
                    Path: C:\ProgramData\SuperCalc_Pro\ &bull;{' '}
                    {isFileDeleted ? (
                      <span className="text-emerald-700 font-semibold">Terhapus</span>
                    ) : !appTrojan.isRunning ? (
                      <span className="text-slate-600">Belum Dieksekusi</span>
                    ) : !isProcessKilled ? (
                      <span className="text-amber-800 font-semibold">Terkunci di RAM (File in Use)</span>
                    ) : (
                      <span className="text-blue-700 font-semibold">Siap Dihapus</span>
                    )}
                  </div>
                </div>

                {!isFileDeleted ? (
                  <button
                    onClick={deleteAppBinary}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded transition-colors shrink-0 shadow-xs"
                    title="Hapus berkas executable dari direktori"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Berkas</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    TERHAPUS
                  </span>
                )}
              </div>

              {/* Normal Apps Binary Rows */}
              <div className="p-2 bg-white border border-slate-200 rounded flex items-center justify-between text-slate-600 text-[11px]">
                <span>C:\ProgramData\AppSuite\Catatan_Sistem.exe (512 KB)</span>
                <span className="text-[10px] text-slate-400">Utilitas Bersih</span>
              </div>
              <div className="p-2 bg-white border border-slate-200 rounded flex items-center justify-between text-slate-600 text-[11px]">
                <span>C:\ProgramData\AppSuite\WeatherSync_Pro.exe (1,120 KB)</span>
                <span className="text-[10px] text-slate-400">Utilitas Bersih</span>
              </div>
            </div>
          </div>

          {/* Startup Registry Key Table */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 mb-2 border-b border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 font-mono">
                <Database className="w-3.5 h-3.5 text-slate-600" />
                <span>HKCU\Software\Microsoft\Windows\CurrentVersion\Run</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                Auto-Run Persistence
              </span>
            </div>

            <div className="p-2.5 bg-white border border-slate-200 rounded flex flex-wrap items-center justify-between gap-2 shadow-xs text-xs font-mono">
              <div className="min-w-[200px] flex-1">
                <div className="font-bold text-slate-900">
                  Value: {isStartupCleaned ? <span className="line-through text-slate-400">SuperCalcSync</span> : 'SuperCalcSync'}
                </div>
                <div className="text-[10.5px] text-slate-500 mt-0.5 truncate max-w-sm">
                  {isStartupCleaned
                    ? 'Kunci registri telah dihapus (Steril)'
                    : 'C:\\ProgramData\\SuperCalc_Pro\\SuperCalc_Pro.exe --daemon'}
                </div>
              </div>

              {!isStartupCleaned ? (
                <button
                  onClick={cleanStartupRegistry}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded transition-colors shrink-0 shadow-xs"
                  title="Hapus entri registri auto-run"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Registri</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  BERSIH
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
