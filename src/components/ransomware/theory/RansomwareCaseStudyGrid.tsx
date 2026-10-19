// File: src/components/ransomware/theory/RansomwareCaseStudyGrid.tsx
import React from 'react';
import { History, Award } from 'lucide-react';
import { RANSOMWARE_CASE_STUDIES } from '@/data/ransomwareTheoryData';

export function RansomwareCaseStudyGrid() {
  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Bagian 5 • Studi Kasus Forensik Global
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-slate-800" />
          Studi Kasus Insiden Ransomware Global Paling Berpengaruh
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Analisis terhadap serangan dunia nyata memperlihatkan bagaimana kombinasi rekayasa sosial,
          enkripsi hibrida, dan perambatan jaringan melumpuhkan organisasi skala internasional jika prinsip SOP tidak ditaati.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {RANSOMWARE_CASE_STUDIES.map((cs) => (
          <div
            key={cs.id}
            className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{cs.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                  Tahun {cs.year}
                </span>
              </div>

              <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 space-y-1">
                <div>
                  <strong className="text-slate-800">Vektor:</strong> {cs.vector}
                </div>
                <div>
                  <strong className="text-slate-800">Kripto:</strong> {cs.encryptionEngine}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {cs.impactScale}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 space-y-1">
              <span className="font-semibold block text-slate-900 mb-0.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-slate-700" />
                <span>Pelajaran Rekayasa &amp; Pertahanan:</span>
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">{cs.technicalLesson}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
