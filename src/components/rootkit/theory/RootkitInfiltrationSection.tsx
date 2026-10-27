// File: src/components/rootkit/theory/RootkitInfiltrationSection.tsx
import React from 'react';
import { HardDrive, AlertOctagon, FileCheck, Terminal, ShieldAlert } from 'lucide-react';
import { INFILTRATION_VECTORS } from '@/data/rootkitTheoryData';

export function RootkitInfiltrationSection() {
  const vectorIcons = [
    <FileCheck key="byovd" className="w-4 h-4 text-slate-800" />,
    <HardDrive key="uefi" className="w-4 h-4 text-slate-800" />,
    <ShieldAlert key="hyp" className="w-4 h-4 text-slate-800" />,
  ];

  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Vektor Penetrasi &amp; Persistensi
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-slate-800" />
          Vektor Infiltrasi Rootkit: Penyalahgunaan Driver Sah (BYOVD) &amp; UEFI Bootkit
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Sistem operasi modern menerapkan aturan verifikasi bernama <strong>Driver Signature Enforcement (DSE)</strong>,
          yaitu kewajiban bahwa setiap driver perangkat keras harus memiliki sertifikat digital resmi dari Microsoft sebelum dapat dimuat ke kernel.
          Untuk melewati pembatasan ini, penyerang memanfaatkan celah pada firmware motherboard dan penyalahgunaan driver lama yang sah.
        </p>
      </div>

      {/* Grid 3 Vektor Infiltrasi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {INFILTRATION_VECTORS.map((vec, idx) => (
          <div
            key={vec.id}
            className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200">
                    {vectorIcons[idx]}
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-700">
                    Vektor 0{idx + 1}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  {vec.vectorType}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{vec.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans mt-2">
                  {vec.mechanism}
                </p>
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                  Artefak Sistem &amp; Jejak Eksekusi:
                </span>
                <span className="text-[11px] font-mono text-slate-800 break-all block">
                  {vec.technicalArtifact}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-700">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                Kontrol Pertahanan Sistem:
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                {vec.defensiveControl}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Rantai Kepercayaan Booting Sistem */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-800" />
            <span>Alur Booting Sistem: Kapan Waktu Paling Kritis Terjadinya Penyusupan?</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Mekanisme Validasi Bertingkat (Secure Boot)</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Dalam siklus booting normal, setiap komponen memverifikasi integritas digital dari komponen berikutnya sebelum kode dijalankan.
          Bootkit menyusup pada tahap paling awal agar dapat mematikan mekanisme pengawasan sebelum kernel Windows sempat aktif:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
            <div className="font-mono text-[10px] uppercase font-bold text-slate-800">
              Fase 1: Firmware Motherboard (UEFI)
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Saat tombol power ditekan, chip motherboard (UEFI) menyala dan memeriksa keabsahan sertifikat bootloader. Bootkit mengeksploitasi bootloader versi lama yang rentan untuk menyusup ke memori firmware sebelum sistem operasi dimulai.
            </p>
          </div>
          <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
            <div className="font-mono text-[10px] uppercase font-bold text-slate-800">
              Fase 2: Windows Boot Manager &amp; Kernel
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Bootloader memuat berkas inti Windows (ntoskrnl.exe) dan driver perangkat keras ke RAM. Jika fase 1 telah disusupi, Bootkit mengubah instruksi di memori untuk mematikan proteksi integritas kernel (HVCI).
            </p>
          </div>
          <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
            <div className="font-mono text-[10px] uppercase font-bold text-slate-800">
              Fase 3: User Mode &amp; Antivirus Berjalan
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Layar desktop menyala dan antivirus mulai memindai. Karena kernel di bawahnya telah dimodifikasi sejak fase awal, seluruh laporan sistem di fase 3 berjalan di atas sistem yang telah disubversi oleh Bootkit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
