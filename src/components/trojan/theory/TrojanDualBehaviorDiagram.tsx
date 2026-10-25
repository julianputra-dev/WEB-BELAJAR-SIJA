// File: src/components/trojan/theory/TrojanDualBehaviorDiagram.tsx
import React from 'react';
import {
  Network,
  Terminal,
  ArrowDown,
  ArrowRight,
  Server,
  Laptop,
  Activity
} from 'lucide-react';

export function TrojanDualBehaviorDiagram() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Skematika Buku Teks Akademis
          </span>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-700" />
            Diagram Alur Kerja Dual-Behavior Trojan Horse
          </h3>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 w-fit">
          Arsitektur Thread Paralel &amp; Soket C2
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Skema di bawah menggambarkan bagaimana satu berkas biner tunggal (SuperCalc_Pro.exe) mengeksekusi dua aliran instruksi
        yang saling bertolak belakang: memelihara ilusi aplikasi utilitas yang sah di permukaan, sembari secara simultan
        membuka soket komunikasi tidak standar ke Command &amp; Control (C2) Server di latar belakang.
      </p>

      {/* Diagram Canvas */}
      <div className="border border-slate-300 rounded-lg p-4 md:p-6 bg-slate-50/70 space-y-6">
        {/* Node 1: Biner Induk Tunggal */}
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex flex-col items-center p-3 bg-white border border-slate-300 rounded-md shadow-xs w-full max-w-sm">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Biner PE Tunggal Terkompilasi</div>
            <div className="text-xs font-bold text-slate-900 font-mono mt-0.5">SuperCalc_Pro.exe</div>
            <div className="text-[11px] text-slate-600 mt-1 font-sans">
              Pengguna mengeksekusi biner yang diyakini sebagai kalkulator ilmiah gratis.
            </div>
            <div className="mt-2 text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700 border border-slate-200">
              Titik Masuk: WinMain() &bull; Subsystem: Windows GUI
            </div>
          </div>

          <div className="flex justify-center items-center my-2 text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200 text-slate-800 text-[11px] font-mono font-bold rounded border border-slate-300">
            <span>Pemisahan Aliran Eksekusi (CreateThread / Asynchronous Fork)</span>
          </div>
        </div>

        {/* Dual Columns: Permukaan vs Latar Belakang */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Kolom 1: Jalur Permukaan (Tampak Sah) */}
          <div className="bg-white border-2 border-slate-200 rounded-lg p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-800 px-2 py-0.5 bg-slate-100 rounded border border-slate-300">
                Jalur 01: Antarmuka Permukaan (Foreground)
              </span>
              <span className="text-[10px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Tampak Sah
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-900 font-sans">
                Jendela Antarmuka Kalkulator Utilitas
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                Loop pesan GUI menangani masukan mouse dan keyboard. Pengguna dapat menghitung angka secara presisi tanpa ada tanda-tanda kerusakan berkas.
              </p>
            </div>

            {/* Mock Kalkulator Frame */}
            <div className="bg-slate-100 border border-slate-300 rounded p-2.5 space-y-2 font-mono text-[10px]">
              <div className="flex items-center justify-between text-slate-500 border-b border-slate-200 pb-1">
                <span>SuperCalc Pro v2.4</span>
                <span className="text-[9px]">[_] [O] [X]</span>
              </div>
              <div className="bg-white border border-slate-300 p-1.5 text-right font-bold text-slate-900 text-xs rounded">
                42 * 10 = 420
              </div>
              <div className="grid grid-cols-4 gap-1 text-center text-slate-700">
                <span className="bg-white p-1 rounded border border-slate-200">7</span>
                <span className="bg-white p-1 rounded border border-slate-200">8</span>
                <span className="bg-white p-1 rounded border border-slate-200">9</span>
                <span className="bg-slate-200 p-1 rounded border border-slate-300 font-bold">/</span>
                <span className="bg-white p-1 rounded border border-slate-200">4</span>
                <span className="bg-white p-1 rounded border border-slate-200">5</span>
                <span className="bg-white p-1 rounded border border-slate-200">6</span>
                <span className="bg-slate-200 p-1 rounded border border-slate-300 font-bold">*</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 font-mono bg-slate-50 p-2 rounded border border-slate-200">
              <strong>Persepsi Korban:</strong> Aplikasi aman, berguna, dan tidak menimbulkan kecurigaan.
            </div>
          </div>

          {/* Kolom 2: Jalur Latar Belakang (Backdoor C2) */}
          <div className="bg-white border-2 border-red-200 rounded-lg p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-red-100 pb-2">
              <span className="text-[10px] font-mono uppercase font-bold text-red-900 px-2 py-0.5 bg-red-50 rounded border border-red-200">
                Jalur 02: Pipa Backdoor C2 (Background)
              </span>
              <span className="text-[10px] font-mono text-red-700 font-semibold bg-red-100/60 px-1.5 py-0.5 rounded border border-red-200">
                Berbahaya (Covert)
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-900 font-sans">
                Thread Worker Tersembunyi &bull; Process ID: 3892
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                Secara diam-diam memuat pustaka soket jaringan (ws2_32.dll), lalu menginisialisasi panggilan koneksi keluar TCP (Reverse Shell) menuju server penyerang.
              </p>
            </div>

            {/* Schematic Network Box */}
            <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded p-3 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 text-[10px]">
                <span className="flex items-center gap-1">
                  <Laptop className="w-3 h-3 text-slate-300" /> Host Korban (PID 3892)
                </span>
                <span className="text-emerald-400 font-bold">TCP ESTABLISHED</span>
              </div>
              <div className="flex items-center justify-between gap-2 py-1 text-[10px]">
                <div className="text-slate-300">Port Lokal: 49812</div>
                <ArrowRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <div className="text-red-300 font-bold">Target Port: 4444 (C2)</div>
              </div>
              <div className="text-[10px] text-slate-400 bg-slate-800/80 p-1.5 rounded border border-slate-700 flex items-center justify-between">
                <span>Alamat C2 Server:</span>
                <span className="text-amber-300 font-bold">198.51.100.23:4444</span>
              </div>
            </div>

            <div className="text-[10px] text-red-700 font-mono bg-red-50 p-2 rounded border border-red-200">
              <strong>Dampak Serangan:</strong> Peretas memperoleh akses terminal jarak jauh (cmd.exe) untuk mengeksfiltrasi berkas tanpa notifikasi sistem.
            </div>
          </div>
        </div>

        {/* Telemetri Netstat Bukti Forensik */}
        <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-300 font-bold">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              Bukti Forensik: Hasil Perintah Netstat Sistem Operasi
            </span>
            <span className="text-[10px] text-slate-400">Parameter: netstat -ano | findstr 4444</span>
          </div>

          <div className="space-y-1 text-[11px] overflow-x-auto py-1">
            <div className="text-slate-400">Proto  Local Address          Foreign Address        State          PID</div>
            <div className="text-emerald-400 font-bold bg-slate-800/60 p-1 rounded border border-slate-700">
              TCP    192.168.10.15:49812    198.51.100.23:4444     ESTABLISHED    3892
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <span className="text-slate-500 block">Protokol Transpor:</span>
              <strong className="text-slate-300">TCP (Handshake Sah)</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Foreign Address (C2):</span>
              <strong className="text-amber-300">198.51.100.23:4444</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Status Soket:</span>
              <strong className="text-emerald-300">ESTABLISHED</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Process ID Terikat:</span>
              <strong className="text-red-300">3892 (SuperCalc_Pro)</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
