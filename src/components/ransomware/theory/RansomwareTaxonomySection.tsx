// File: src/components/ransomware/theory/RansomwareTaxonomySection.tsx
import React from 'react';
import { RANSOMWARE_TYPES, LOCKER_VS_CRYPTO_COMPARISON } from '@/data/ransomwareTheoryData';
import { MonitorX, FileKey2, SplitSquareVertical } from 'lucide-react';

export function RansomwareTaxonomySection() {
  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Bagian 1 • Taksonomi &amp; Klasifikasi
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <SplitSquareVertical className="w-5 h-5 text-slate-800" />
          Dua Taksonomi Utama: Locker Ransomware vs Crypto-Ransomware
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Dalam taksonomi keamanan informasi (NIST SP 800-83), ransomware diklasifikasikan ke dalam dua kategori
          arsitektural yang sangat berbeda. Memahami apakah malware menyandera akses sistem operasi atau
          menghancurkan integritas berkas merupakan langkah triase awal yang menentukan efektivitas SOP remediasi.
        </p>
      </div>

      {/* Grid 2 Kartu Komparasi Arsitektural */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {RANSOMWARE_TYPES.map((t) => {
          const isLocker = t.id === 'locker';
          return (
            <div
              key={t.id}
              className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200 uppercase">
                    {t.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${
                      isLocker
                        ? 'bg-amber-50 text-amber-900 border-amber-200'
                        : 'bg-red-50 text-red-900 border-red-200'
                    }`}
                  >
                    {isLocker ? 'Non-Cryptographic Hostage' : 'Cryptographic Destruction'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-slate-100">
                    {isLocker ? (
                      <MonitorX className="w-4 h-4 text-slate-800" />
                    ) : (
                      <FileKey2 className="w-4 h-4 text-slate-800" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{t.name}</h3>
                    <div className="text-[11px] font-mono text-slate-500">
                      Target: {t.primaryTarget}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t.workingMechanism}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] font-mono">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 font-sans space-y-0.5">
                  <span className="text-slate-500 uppercase font-mono text-[10px] block font-bold">
                    Status Integritas Berkas:
                  </span>
                  <span className="text-slate-900 leading-relaxed block">
                    {t.fileIntegrityStatus}
                  </span>
                </div>

                <div className="bg-slate-100 p-2.5 rounded border border-slate-200 font-sans space-y-0.5">
                  <span className="text-slate-700 uppercase font-mono text-[10px] block font-bold">
                    Jalur Remediasi Blue Team:
                  </span>
                  <span className="text-slate-900 leading-relaxed block">
                    {t.remediationPath}
                  </span>
                </div>

                <div className="text-[10px] text-slate-500 font-mono pt-1">
                  <strong>Contoh Kasus Klasik:</strong> {t.historicalExample}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Matriks Perbandingan Teknis Buku Teks */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <SplitSquareVertical className="w-4 h-4 text-slate-700" />
            <span>Matriks Perbandingan Teknis: Locker vs Crypto-Ransomware</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">NIST SP 800-83 Malware Classification</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 w-1/4">Dimensi Evaluasi</th>
                <th className="py-2.5 px-3 w-3/8 text-slate-800">Locker Ransomware</th>
                <th className="py-2.5 px-3 w-3/8 text-slate-900 bg-slate-200/60 font-bold border-l border-slate-200">
                  Crypto-Ransomware (Fokus Lab)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px] font-sans">
              {LOCKER_VS_CRYPTO_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold font-mono text-slate-900 bg-slate-50/50">
                    {row.dimension}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed font-sans">
                    {row.lockerRansomware}
                  </td>
                  <td className="py-2.5 px-3 text-slate-900 font-medium leading-relaxed bg-slate-50/50 border-l border-slate-200 font-sans">
                    {row.cryptoRansomware}
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
