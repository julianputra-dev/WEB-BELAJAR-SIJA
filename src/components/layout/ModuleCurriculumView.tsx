// File: src/components/layout/ModuleCurriculumView.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Layers } from 'lucide-react';

export interface ModuleCurriculumProps {
  subjectName: string;
  subjectHref: string;
  moduleCode: string;
  title: string;
  description: string;
  targetCompetencies: string[];
  syllabusUnits: { title: string; desc: string }[];
}

export function ModuleCurriculumView({
  subjectName,
  subjectHref,
  moduleCode,
  title,
  description,
  targetCompetencies,
  syllabusUnits,
}: ModuleCurriculumProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-6 md:py-8 w-full flex-1">
        {/* Header Dasbor Ringkas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                {moduleCode}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                RENCANA FASE 2
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>

          <Link
            href={subjectHref}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded border border-slate-300 transition-colors shrink-0 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </Link>
        </div>

        {/* Ringkasan Kompetensi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-slate-700" />
              <span>Unit Pembelajaran Silabus:</span>
            </div>
            <div className="space-y-3">
              {syllabusUnits.map((unit, idx) => (
                <div key={idx} className="p-3.5 rounded bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-900">
                    {idx + 1}. {unit.title}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {unit.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
                Sasaran Capaian:
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {targetCompetencies.map((comp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-2">
              <div className="text-[11px] font-mono text-slate-500">
                Praktikum simulasi modul ini sedang dalam tahap perancangan logika.
              </div>
              <Link
                href="/modules/security/malware"
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors"
              >
                <span>Buka Lab Malware (Aktif)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
