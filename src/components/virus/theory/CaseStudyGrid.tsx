// File: src/components/virus/theory/CaseStudyGrid.tsx
import React from 'react';
import { CASE_STUDIES, FORENSIC_IOCS } from '@/data/virusTheoryData';
import { History, Search } from 'lucide-react';

export function CaseStudyGrid() {
  return (
    <section className="mb-10 space-y-8">
      {/* Kasus Nyata Sejarah */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <History className="w-4 h-4 text-slate-700" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Studi Kasus Insiden Riil di Industri Keamanan Siber
          </h2>
        </div>
        <p className="text-xs text-slate-600 mb-4 max-w-3xl leading-relaxed">
          Sejarah infeksi virus berkas memperlihatkan evolusi dari perusakan perangkat keras hingga
          sabotase pertahanan antivirus dan registri sistem operasi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                  {cs.year}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Kasus Bersejarah</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{cs.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{cs.impact}</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-700 bg-slate-50 p-2 rounded">
                <span className="font-semibold block text-slate-900 mb-0.5">Pelajaran Teknis:</span>
                {cs.technicalLesson}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabel Indikator Kompromi (IoC) */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Indikator Kompromi (IoC) yang Diinvestigasi pada Laboratorium
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            Standar: NIST SP 800-61 Rev. 2
          </span>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indikator Kompromi (IoC)</th>
                <th className="py-2.5 px-3">Perkakas Forensik</th>
                <th className="py-2.5 px-3">Artefak yang Dianalisis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
              {FORENSIC_IOCS.map((ioc, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-semibold font-sans text-slate-900">
                    {ioc.indicator}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{ioc.detectionTool}</td>
                  <td className="py-2.5 px-3 text-slate-600 font-sans">{ioc.forensicArtifact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
