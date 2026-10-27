// File: src/components/rootkit/theory/RootkitRingArchitectureSection.tsx
import React from 'react';
import { ShieldCheck, Cpu, Lock, Unlock, EyeOff, Layers } from 'lucide-react';
import { PRIVILEGE_RINGS_COMPARISON } from '@/data/rootkitTheoryData';

export function RootkitRingArchitectureSection() {
  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Fondasi Konseptual Sistem Operasi
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-slate-800" />
          Konsep Hierarki Hak Akses CPU: Kernel Mode (Ring 0) vs User Mode (Ring 3)
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Arsitektur prosesor x86/x64 menerapkan mekanisme proteksi cincin berjenjang (Hierarchical Protection Rings)
          untuk mengisolasi instruksi sensitif sistem operasi dari aplikasi pihak ketiga. Pemisahan ini menciptakan batas
          keamanan perangkat keras (Hardware Trust Boundary) yang dieksploitasi oleh Rootkit untuk menguasai sistem secara menyeluruh.
        </p>
      </div>

      {/* 3 Kartu Cincin Hak Akses CPU */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Ring 0 */}
        <div className="bg-white border-2 border-slate-900 rounded-lg p-5 shadow-xs space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-900 px-2 py-0.5 bg-slate-100 rounded border border-slate-300">
                Ring 0 • Kernel Mode
              </span>
              <span className="text-[10px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Hak Akses Penuh
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-slate-100 border border-slate-200">
                <Unlock className="w-4 h-4 text-slate-800" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Inti Eksekutif &amp; Driver Sistem</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Memiliki kendali mutlak atas register kontrol prosesor (<span className="font-mono text-slate-800">CR0, CR3, CR4</span>),
              tabel pemetaan memori fisik (Page Tables), instruksi I/O perangkat keras, serta tabel interupsi (Interrupt Descriptor Table atau IDT).
              Instruksi di Ring 0 dieksekusi langsung oleh CPU tanpa pembatasan hak akses perangkat lunak.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500">
            Komponen: ntoskrnl.exe, HAL, Driver Perangkat (.sys)
          </div>
        </div>

        {/* Ring 1 & 2 */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 opacity-80 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-[10px] font-mono uppercase font-semibold text-slate-600 px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
                Ring 1 &amp; Ring 2
              </span>
              <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                Tidak Digunakan
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-slate-100 border border-slate-200">
                <Cpu className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="text-sm font-bold text-slate-700">Layanan Menengah (Arsitektur Lawas)</h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Awalnya disiapkan pada spesifikasi x86 untuk driver periferal dan subsistem OS. Namun, sistem operasi modern
              (Windows, Linux, dan macOS 64-bit) menonaktifkan kedua cincin ini guna memangkas latensi alih tugas sistem
              (context switching) antara User Space dan Kernel Space.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
            Status: Ditinggalkan pada prosesor x86-64 kontemporer
          </div>
        </div>

        {/* Ring 3 */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-800 px-2 py-0.5 bg-slate-100 rounded border border-slate-300">
                Ring 3 • User Mode
              </span>
              <span className="text-[10px] font-mono text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Hak Akses Terbatas
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-slate-100 border border-slate-200">
                <Lock className="w-4 h-4 text-slate-800" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Aplikasi &amp; Antarmuka Pengguna</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Menjalankan aplikasi umum, Task Manager, dan perangkat lunak antivirus standar. Program di Ring 3 dilarang mengakses
              hardware dan memori fisik secara langsung. Setiap permohonan data sistem wajib dilakukan melalui antarmuka
              panggilan resmi (System Call) menuju kernel, menjadikan Ring 3 konsumen pasif dari data yang disediakan Ring 0.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500">
            Komponen: taskmgr.exe, Antivirus Ring 3, User Applications
          </div>
        </div>
      </div>

      {/* Matriks Perbandingan Teknis Detail */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-800" />
            <span>Matriks Asimetri Proteksi: Kernel Mode (Ring 0) vs User Mode (Ring 3)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Standar Arsitektur Intel 64 / AMD64</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 w-1/6">Tingkat Cincin</th>
                <th className="py-2.5 px-3 w-1/5 text-slate-800">Komponen Representatif</th>
                <th className="py-2.5 px-3 w-1/3 text-slate-800">Akses Perangkat Keras &amp; Memori</th>
                <th className="py-2.5 px-3 w-3/10 text-slate-900 bg-slate-200/60 font-bold border-l border-slate-200">
                  Kapasitas Deception (Pemalsuan Status)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px] font-sans">
              {PRIVILEGE_RINGS_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold font-mono text-slate-900 bg-slate-50/50">
                    <div>{row.ring}</div>
                    <div className="text-[10px] text-slate-500 font-sans font-normal mt-0.5">{row.name}</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-800 font-medium font-sans">
                    {row.representativeComponents}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed font-sans">
                    {row.hardwareAccess}
                  </td>
                  <td className="py-2.5 px-3 text-slate-900 leading-relaxed bg-slate-50/50 border-l border-slate-200 font-sans">
                    {row.deceptionVulnerability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prinsip Asimetri Hak Akses */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-mono">
          <EyeOff className="w-4 h-4 text-slate-800" />
          <span>Prinsip Asimetri Proteksi: Batas Pengawasan Hak Akses Sistem Operasi</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          Dalam arsitektur sistem operasi, aplikasi yang berjalan di Ring 3 (termasuk Task Manager dan scanner antivirus)
          tidak dapat memeriksa kebenaran data di Ring 0 secara independen. Ketika aplikasi meminta informasi proses aktif
          melalui antarmuka Native API (<span className="font-mono text-slate-900">ntdll.dll</span>), eksekusi berpindah ke kernel.
          Jika modul Rootkit telah aktif di Ring 0, Rootkit memiliki hak akses penuh untuk memodifikasi atau menyaring struktur data
          sebelum buffer hasil diserahkan kembali ke Ring 3. Hal ini menjadikan sistem pelaporan resmi sistem operasi sebagai
          instrumen penyamaran malware.
        </p>
      </div>
    </section>
  );
}
