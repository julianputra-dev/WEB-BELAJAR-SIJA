// File: src/components/worm/theory/WormFundamentalsSection.tsx
import React from 'react';
import { HelpCircle, Network, Zap, Shield, SplitSquareVertical } from 'lucide-react';
import { VIRUS_VS_WORM_COMPARISON } from '@/data/wormTheoryData';

export function WormFundamentalsSection() {
  const characteristics = [
    {
      title: 'Mampu Berdiri Sendiri (Stand-Alone)',
      desc: 'Tidak memerlukan berkas inang (host). Worm adalah program atau proses mandiri yang tidak perlu menyusup ke file .exe lain.',
      icon: <Network className="w-4 h-4 text-slate-800" />,
    },
    {
      title: 'Propagasi Otomatis (Nir-Interaksi)',
      desc: 'Tidak membutuhkan klik dari pengguna. Worm menyebar otomatis dengan memindai port jaringan yang rentan di subnet lokal.',
      icon: <Zap className="w-4 h-4 text-slate-800" />,
    },
    {
      title: 'Eksploitasi Port Layanan Jaringan',
      desc: 'Memanfaatkan celah pada protokol jaringan (seperti SMB Port 445 atau RDP Port 3389) untuk mengeksekusi kode dari jarak jauh.',
      icon: <Shield className="w-4 h-4 text-slate-800" />,
    },
  ];

  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Fondasi Konseptual
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-slate-800" />
          Apa Itu Network Worm &amp; Apa Bedanya dengan Virus?
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Dalam keamanan informasi, membedakan antara Virus dan Worm merupakan kompetensi dasar yang krusial.
          Keduanya memiliki mekanisme penularan, vektor serangan, dan prosedur penanganan insiden yang sangat bertolak belakang.
        </p>
      </div>

      {/* 3 Karakteristik Kunci */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {characteristics.map((c, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-slate-100">{c.icon}</div>
              <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Matriks Perbandingan Virus vs Worm */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <SplitSquareVertical className="w-4 h-4 text-slate-700" />
            <span>Matriks Perbandingan Teknis: File Virus vs Network Worm</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Standar Klasifikasi NIST SP 800-83</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 w-1/4">Dimensi Perbandingan</th>
                <th className="py-2.5 px-3 w-3/8 text-slate-800">File Infector Virus (Modul 1)</th>
                <th className="py-2.5 px-3 w-3/8 text-slate-900 bg-slate-200/60 font-bold border-l border-slate-200">Network Worm (Modul 2)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px] font-sans">
              {VIRUS_VS_WORM_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold font-mono text-slate-900 bg-slate-50/50">
                    {row.dimension}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed">
                    {row.virus}
                  </td>
                  <td className="py-2.5 px-3 text-slate-900 font-medium leading-relaxed bg-slate-50/50 border-l border-slate-200">
                    {row.worm}
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
