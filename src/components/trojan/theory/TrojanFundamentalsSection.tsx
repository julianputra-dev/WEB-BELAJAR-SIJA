// File: src/components/trojan/theory/TrojanFundamentalsSection.tsx
import React from 'react';
import { HelpCircle, Shield, SplitSquareVertical, EyeOff, Radio, RefreshCwOff } from 'lucide-react';
import { TROJAN_CHARACTERISTICS, MALWARE_TRIAD_COMPARISON } from '@/data/trojanTheoryData';

export function TrojanFundamentalsSection() {
  const iconList = [
    <EyeOff key="cam" className="w-4 h-4 text-slate-800" />,
    <RefreshCwOff key="rep" className="w-4 h-4 text-slate-800" />,
    <Radio key="back" className="w-4 h-4 text-slate-800" />,
  ];

  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Fondasi Konseptual
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-slate-800" />
          Karakteristik Penyamaran &amp; Perbedaan Mendasar Trojan Horse
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Nama Trojan Horse terinspirasi dari mitologi kuda kayu Troya, di mana ancaman mematikan
          diselundupkan di dalam hadiah yang tampak tidak berbahaya. Dalam domain rekayasa perangkat lunak jahat,
          Trojan tidak merusak sistem secara mencolok agar pengguna tidak curiga dan tetap membiarkan aplikasi berjalan di latar belakang.
        </p>
      </div>

      {/* 3 Karakteristik Kunci */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TROJAN_CHARACTERISTICS.map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-slate-100">{iconList[idx]}</div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
            <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500">
              Taksonomi: {item.technicalTerm}
            </div>
          </div>
        ))}
      </div>

      {/* Matriks Perbandingan Teknis Virus vs Worm vs Trojan */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <SplitSquareVertical className="w-4 h-4 text-slate-700" />
            <span>Matriks Taksonomi Teknis Malware: Virus vs Worm vs Trojan Horse</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Standar Klasifikasi NIST SP 800-83</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 w-1/5">Dimensi Analisis</th>
                <th className="py-2.5 px-3 w-1/4 text-slate-800">File Infector Virus</th>
                <th className="py-2.5 px-3 w-1/4 text-slate-800">Network Worm</th>
                <th className="py-2.5 px-3 w-3/10 text-slate-900 bg-slate-200/60 font-bold border-l border-slate-200">
                  Trojan Horse (Modul Ini)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px] font-sans">
              {MALWARE_TRIAD_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold font-mono text-slate-900 bg-slate-50/50">
                    {row.dimension}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed">
                    {row.virus}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed">
                    {row.worm}
                  </td>
                  <td className="py-2.5 px-3 text-slate-900 font-medium leading-relaxed bg-slate-50/50 border-l border-slate-200">
                    {row.trojan}
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
