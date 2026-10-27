// File: src/components/rootkit/theory/RootkitMitigationSection.tsx
import React from 'react';
import {
  ShieldAlert,
  Usb,
  RotateCcw,
  HelpCircle,
  FileSearch
} from 'lucide-react';
import { ROOTKIT_AV_BLINDSPOTS } from '@/data/rootkitTheoryData';

export function RootkitMitigationSection() {
  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Rasionalitas Pertahanan &amp; Metodologi Forensik
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-slate-800" />
          Mengapa Antivirus User Mode Gagal &amp; Urgensi Mitigasi Offline / Forensik Memori
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Pemahaman mengenai batasan arsitektural perangkat lunak antivirus di User Mode menjelaskan
          mengapa penanganan insiden Rootkit Kernel membutuhkan prosedur operasional khusus yang berbeda
          secara mendasar dibandingkan pembersihan malware konvensional.
        </p>
      </div>

      {/* Matriks Kebutaan Antivirus User Mode */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-800" />
            <span>Matriks Kebutaan Arsitektural: Antivirus User Mode vs Realitas Kernel Rootkit</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Prinsip Asimetri Hak Akses</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 w-1/5">Dimensi Observasi</th>
                <th className="py-2.5 px-3 w-1/4 text-slate-800">Antivirus User Mode (Ring 3)</th>
                <th className="py-2.5 px-3 w-1/4 text-slate-900 bg-slate-200/60 font-bold border-l border-slate-200">
                  Realitas Kernel Rootkit (Ring 0)
                </th>
                <th className="py-2.5 px-3 w-3/10 text-slate-700 border-l border-slate-200">
                  Alasan Kegagalan Struktural
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px] font-sans">
              {ROOTKIT_AV_BLINDSPOTS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold font-mono text-slate-900 bg-slate-50/50">
                    {row.dimension}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed font-sans">
                    {row.userModeAntivirus}
                  </td>
                  <td className="py-2.5 px-3 text-slate-900 font-medium leading-relaxed bg-slate-50/50 border-l border-slate-200 font-sans">
                    {row.kernelRootkitReality}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed border-l border-slate-200 font-sans">
                    {row.structuralReason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Pilar Metodologi Mitigasi Nyata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Pilar 1: Memory Dump */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-mono font-bold text-slate-700 uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Pilar Mitigasi 01
              </span>
              <FileSearch className="w-4 h-4 text-slate-700" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Akuisisi &amp; Forensik Memori Mentah (RAM Dump)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Karena kernel yang terinfeksi tidak dapat dipercaya untuk melaporkan statusnya sendiri, investigator
              mengekstrak citra biner memori fisik mentah (<span className="font-mono text-slate-800">Raw RAM Dump</span>)
              melalui crash dump atau perangkat akuisisi fisik. Analisis dilakukan di stasiun kerja forensik independen
              untuk mencocokkan struktur linked list (<span className="font-mono text-slate-800">pslist</span>)
              dengan pemindaian alokasi pool memori fisik (<span className="font-mono text-slate-800">psscan</span>).
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500">
            Prinsip: Membaca struktur byte fisik tanpa melalui fungsi API kernel yang terinfeksi.
          </div>
        </div>

        {/* Pilar 2: Offline Scanning */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-mono font-bold text-slate-700 uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Pilar Mitigasi 02
              </span>
              <Usb className="w-4 h-4 text-slate-700" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Pemindaian Sistem Offline (Clean Live OS)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Driver Rootkit hanya memiliki kemampuan siluman ketika dieksekusi di RAM oleh prosesor. Jika komputer dimatikan
              dan di-boot ulang menggunakan media independen yang bersih (seperti Linux Forensic Live USB atau WinPE bersih),
              sistem operasi yang terinfeksi berstatus pasif. Media penyimpanan dibaca sebagai blok data statis,
              sehingga berkas biner driver jahat (<span className="font-mono text-slate-800">.sys</span>) kehilangan kemampuan intersepsi
              dan dapat dianalisis secara objektif.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500">
            Prinsip: Menghilangkan lingkungan eksekusi kernel berbahaya dengan mematikan OS inang.
          </div>
        </div>

        {/* Pilar 3: Wipe & Rebuild */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-mono font-bold text-slate-700 uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Pilar Mitigasi 03
              </span>
              <RotateCcw className="w-4 h-4 text-slate-700" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Rekonstruksi Total (NIST SP 800-88 Zero-Trust)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Standar Incident Response SANS dan NIST menyatakan bahwa begitu integritas Ring 0 atau rantai bootloader
              telah dilanggar, sistem tidak dapat dijamin keamanannya hanya dengan menghapus berkas driver.
              Solusi wajib adalah sanitasi media penyimpanan penuh (Secure Wipe / Partisi Ulang Bersih), audit serta flash ulang
              firmware UEFI dari sumber vendor resmi, dan instalasi ulang sistem operasi dari media instalasi terverifikasi.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500">
            Prinsip: Pemulihan rantai kepercayaan perangkat keras melalui rekonstruksi total.
          </div>
        </div>
      </div>
    </section>
  );
}
