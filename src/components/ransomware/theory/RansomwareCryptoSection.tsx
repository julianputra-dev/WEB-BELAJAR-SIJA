// File: src/components/ransomware/theory/RansomwareCryptoSection.tsx
import React from 'react';
import { CRYPTO_COMPARISON } from '@/data/ransomwareTheoryData';
import { Lock, KeyRound, ShieldAlert, FileCode2, Calculator } from 'lucide-react';

export function RansomwareCryptoSection() {
  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Bagian 3 • Arsitektur Kriptografis Berkas
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-slate-800" />
          Kriptografi Hibrida &amp; Transformasi Berkas ke Ciphertext (.locked)
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Ransomware modern tidak menggunakan algoritma enkripsi buatan sendiri (rol-your-own-crypto),
          melainkan menerapkan algoritma standar industri yang terbukti kebal secara matematis.
          Transformasi data dirancang agar tidak dapat dibatalkan tanpa kunci privat yang dipegang penyerang.
        </p>
      </div>

      {/* Skema Buku Teks: Struktur Berkas Plaintext vs Ciphertext .locked */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-slate-700" />
            <span>Diagram Struktur Biner: Sebelum vs Sesudah Enkripsi Kriptografis</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Analisis Offset &amp; Shannon Entropy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-mono">
          {/* Sisi Kiri: Berkas Asli (Plaintext) */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-900">1. Berkas Asli (Laporan_Keuangan.pdf)</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                Plaintext Sah
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="p-2 rounded bg-white border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Header &amp; Magic Bytes (Offset 0x00)</div>
                <div className="text-slate-900 font-bold mt-0.5">25 50 44 46 2D 31 2E 37 (%PDF-1.7)</div>
                <div className="text-[10px] text-slate-600 font-sans mt-0.5">Dikenali instan oleh sistem operasi</div>
              </div>

              <div className="p-2 rounded bg-white border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Muatan Data Dokumen (Body)</div>
                <div className="text-slate-800 font-sans mt-0.5 leading-relaxed">
                  Teks ASCII terstruktur, tabel angka, dan kompresi zlib berulang.
                </div>
              </div>

              <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-950 font-sans">
                <span className="font-bold font-mono text-[10px] uppercase block">Shannon Entropy: 4.12 / 8.0</span>
                <span>Tingkat keacakan data tergolong rendah karena memiliki pola bahasa teratur.</span>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Berkas Terenkripsi (.locked) */}
          <div className="border border-slate-300 rounded-lg p-4 bg-slate-100/70 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-300">
              <span className="font-bold text-slate-900">2. Berkas Terkunci (Laporan_Keuangan.pdf.locked)</span>
              <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-semibold">
                Ciphertext AES-256
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="p-2 rounded bg-white border border-slate-300">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Header &amp; Magic Bytes (Offset 0x00)</div>
                <div className="text-slate-900 font-bold mt-0.5">52 41 4E 53 4F 4D 5F 31 (Header Kustom)</div>
                <div className="text-[10px] text-slate-600 font-sans mt-0.5">Magic byte asli musnah, viewer gagal membaca</div>
              </div>

              <div className="p-2 rounded bg-white border border-slate-300">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Teks Sandi Pseudo-Acak (Ciphertext)</div>
                <div className="text-slate-800 font-sans mt-0.5 leading-relaxed">
                  Blok terenkripsi mode CBC/GCM; tidak ada pola string yang dapat dibaca.
                </div>
              </div>

              <div className="p-2 rounded bg-slate-200 border border-slate-300 text-slate-900 font-sans">
                <span className="font-bold font-mono text-[10px] uppercase block">Shannon Entropy: 7.98 / 8.0</span>
                <span>Tingkat keacakan mendekati batas maksimal white noise murni.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skema Kriptografi Hibrida & Kenapa Brute Force Mustahil */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Panel Alur Enkripsi Hibrida */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <KeyRound className="w-4 h-4 text-slate-700" />
            <span>Alur Arsitektur Enkripsi Hibrida (Hybrid Crypto)</span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700 font-sans">
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold font-mono text-[11px] text-slate-900 block">
                1. Pembuatan Kunci Sesi Simetris (AES-256)
              </span>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Untuk setiap berkas di disk, ransomware membangkitkan 256-bit AES key acak di memori RAM.
                Enkripsi simetris dipilih karena berkecepatan sangat tinggi dalam memproses gigabyte data.
              </p>
            </div>

            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold font-mono text-[11px] text-slate-900 block">
                2. Pembungkusan Kunci dengan Kunci Publik Asimetris (RSA-4096)
              </span>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Kunci AES tersebut kemudian dienkripsi menggunakan Master Public Key milik penyerang yang telah
                disematkan di biner malware, lalu hasilnya ditempelkan pada akhir berkas .locked.
              </p>
            </div>

            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold font-mono text-[11px] text-slate-900 block">
                3. Pemusnahan Kunci Sesi dari RAM
              </span>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Setelah berkas selesai dienkripsi, kunci AES simetris mentah segera dihapus dari memori kerja komputer (ZeroMemory)
                sehingga tidak dapat diekstrak melalui analisis dump memori forensik.
              </p>
            </div>
          </div>
        </div>

        {/* Panel Analisis Ketidakmungkinan Brute Force */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Calculator className="w-4 h-4 text-slate-700" />
            <span>Rasionalisasi Matematis: Mengapa Dekripsi Paksa Mustahil?</span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700 font-sans">
            <p className="text-xs leading-relaxed text-slate-600">
              Banyak korban awam berharap berkas terenkripsi dapat dibuka paksa melalui software pemecah sandi (brute-force).
              Secara fondasi matematika kriptografi modern, hal ini adalah kemustahilan fisik:
            </p>

            <div className="p-3 rounded bg-slate-900 text-slate-100 font-mono text-xs space-y-1.5">
              <div className="text-slate-400 text-[10px] uppercase">Ruang Kunci (Keyspace) AES-256:</div>
              <div className="text-sm font-bold text-emerald-400">2^256 ≈ 1.1579 × 10^77 Kombinasi</div>
              <div className="text-[11px] text-slate-300 font-sans leading-relaxed pt-1">
                Jika seluruh superkomputer tercepat di muka bumi digabungkan untuk menguji 1 triliun kunci per detik,
                waktu yang dibutuhkan masih melampaui usia alam semesta (miliaran tahun).
              </div>
            </div>

            <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-950 text-[11px] space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-800" />
                Kesimpulan Akademis:
              </span>
              <p className="leading-relaxed">
                Tanpa Private Key yang hanya dipegang penyerang, satu-satunya cara mengembalikan data adalah melalui
                restorasi dari media cadangan yang bersih (Offline Backup).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Matriks Perbandingan Teknis Berkas */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900">
            Matriks Parameter Biner: Plaintext Asli vs Ciphertext Terkunci
          </div>
          <span className="text-[10px] font-mono text-slate-500">Standar Evaluasi Entropi Forensik</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 w-1/4">Parameter Biner</th>
                <th className="py-2.5 px-3 w-1/3 text-slate-800">Berkas Plaintext Asli</th>
                <th className="py-2.5 px-3 w-1/3 text-slate-900 bg-slate-200/60 font-bold border-l border-slate-200">
                  Berkas Ciphertext (.locked)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px] font-sans">
              {CRYPTO_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold font-mono text-slate-900 bg-slate-50/50">
                    {row.property}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed font-mono text-[11px]">
                    {row.plaintextFile}
                  </td>
                  <td className="py-2.5 px-3 text-slate-900 font-medium leading-relaxed bg-slate-50/50 border-l border-slate-200 font-mono text-[11px]">
                    {row.ciphertextLocked}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
