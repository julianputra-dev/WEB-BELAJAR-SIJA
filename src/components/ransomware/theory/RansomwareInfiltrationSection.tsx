// File: src/components/ransomware/theory/RansomwareInfiltrationSection.tsx
import React from 'react';
import { INFILTRATION_VECTORS } from '@/data/ransomwareTheoryData';
import { EyeOff, AlertCircle, FileText, Binary, ShieldAlert } from 'lucide-react';

export function RansomwareInfiltrationSection() {
  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Bagian 2 • Vektor Infiltrasi &amp; Rekayasa Sosial
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <EyeOff className="w-5 h-5 text-slate-800" />
          Rekayasa Sosial &amp; Eksploitasi Ekstensi Ganda (.pdf.exe)
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Mayoritas infeksi ransomware pada workstation bermula bukan dari kerentanan zero-day jaringan,
          melainkan dari kelalaian verifikasi integritas berkas. Penyerang memanfaatkan fitur bawaan sistem operasi
          yang menyembunyikan ekstensi berkas untuk menyamarkan muatan biner executable.
        </p>
      </div>

      {/* Skema Diagram Buku Teks: Anatomi Penyamaran Ekstensi Ganda */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-700" />
            <span>Skema Perbedaan Persepsi: Shell Windows vs Eksekusi Kernel OS</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Diagram Forensik Penamaan Berkas</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-mono">
          {/* Kolom 1: UI Shell Korban */}
          <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-600" />
                Persepsi Pengguna (Explorer UI)
              </span>
              <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-semibold">
                Tersamarkan
              </span>
            </div>
            <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
              <div className="text-[11px] font-bold text-slate-900">Tagihan_Kurir.pdf</div>
              <div className="text-[10px] text-slate-500 font-sans">
                Tipe: Adobe Acrobat Document
              </div>
              <div className="text-[10px] text-slate-500 font-sans">
                Ikon: Logo PDF Resmi (.rsrc spoofing)
              </div>
            </div>
            <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
              Pengguna melihat ekstensi .pdf dan menganggap berkas berupa dokumen tagihan resmi yang aman dibuka.
            </p>
          </div>

          {/* Kolom 2: Titik Manipulasi OS */}
          <div className="p-4 rounded bg-slate-100 border border-slate-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-slate-700" />
                Mekanisme Manipulasi Windows
              </span>
              <span className="text-[9px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-semibold">
                Konfigurasi OS
              </span>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200 space-y-1.5 text-[10px]">
              <div className="text-slate-600 font-semibold">Entri Registri Shell:</div>
              <div className="bg-slate-50 p-1.5 rounded border border-slate-200 text-slate-800 break-all">
                HKCU\...\Advanced\HideFileExt = 1
              </div>
              <div className="text-slate-600 text-[10px] font-sans">
                Sistem menyembunyikan ekstensi biner terakhir (.exe) dari penglihatan pengguna.
              </div>
            </div>
            <p className="text-[11px] font-sans text-slate-700 leading-relaxed">
              Karakter pemisah titik kedua (.exe) dianggap sebagai ekstensi biner sesungguhnya, sedangkan .pdf hanya bagian dari penamaan teks string.
            </p>
          </div>

          {/* Kolom 3: Eksekusi Nyata Kernel */}
          <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Binary className="w-4 h-4 text-slate-600" />
                Eksekusi Kernel (NTFS Layer)
              </span>
              <span className="text-[9px] bg-red-100 text-red-900 px-1.5 py-0.5 rounded font-semibold">
                Payload Aktif
              </span>
            </div>
            <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
              <div className="text-[11px] font-bold text-red-700">Tagihan_Kurir.pdf.exe</div>
              <div className="text-[10px] text-slate-500 font-sans">
                Signature: 4D 5A (MZ DOS Header PE32)
              </div>
              <div className="text-[10px] text-slate-500 font-sans">
                API: CreateProcessW() terpanggil
              </div>
            </div>
            <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
              Kernel OS memuat biner ke memori kerja (RAM) dan meluncurkan thread ransomware berizin penuh pengguna lokal.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Kartu Vektor Infiltrasi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {INFILTRATION_VECTORS.map((vec) => (
          <div
            key={vec.id}
            className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between shadow-xs space-y-3"
          >
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {vec.technique}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {vec.mechanism}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] font-mono">
              <div className="bg-slate-50 p-2 rounded border border-slate-200 font-sans">
                <span className="text-slate-500 uppercase font-mono text-[10px] block mb-0.5">Perilaku OS:</span>
                <span className="text-slate-800 leading-snug">{vec.osBehavior}</span>
              </div>
              <div className="bg-slate-100 p-2 rounded border border-slate-200 font-sans">
                <span className="text-slate-700 uppercase font-mono text-[10px] block mb-0.5 font-bold">Langkah Pencegahan:</span>
                <span className="text-slate-900 leading-snug">{vec.preventionMeasure}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
