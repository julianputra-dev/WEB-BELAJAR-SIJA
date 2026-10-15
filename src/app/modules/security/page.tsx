// File: src/app/modules/security/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { allScenarios } from '@/data/scenarios';
import { ProgressService, ModuleProgressRecord } from '@/services/progressService';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Network,
  FileCode,
  HardDrive,
  Cpu,
  KeyRound,
  ArrowLeft,
} from 'lucide-react';
import { MalwareType } from '@/types/simulation';

const MALWARE_ICONS: Record<MalwareType, React.ReactNode> = {
  worm: <Network className="w-5 h-5 text-blue-400" />,
  ransomware: <HardDrive className="w-5 h-5 text-red-400" />,
  trojan: <Cpu className="w-5 h-5 text-amber-400" />,
  virus: <FileCode className="w-5 h-5 text-purple-400" />,
  spyware: <KeyRound className="w-5 h-5 text-emerald-400" />,
};

export default function SecurityModulesPage() {
  const [progressMap, setProgressMap] = useState<Record<string, ModuleProgressRecord>>({});

  useEffect(() => {
    ProgressService.getAllProgress().then(setProgressMap);
  }, []);

  return (
    <div className="flex-1 flex flex-col p-6 md:p-10 max-w-7xl mx-auto w-full">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-mono mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Shield className="w-7 h-7 text-cyan-400" />
            Modul Praktik Keamanan Siber SMK SIJA
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Pilih skenario ancaman siber untuk memulai observasi perilaku malware dan eksekusi mitigasi SOP.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-300">
          Status Modul:{' '}
          <span className="text-cyan-400 font-bold">
            {Object.keys(progressMap).length} / 5 Diselesaikan
          </span>
        </div>
      </div>

      {/* Grid 5 Kartu Skenario Malware */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(allScenarios).map((scenario) => {
          const progress = progressMap[scenario.id];
          const isCompleted = progress?.mitigationCompleted;

          return (
            <div
              key={scenario.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Badge & Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    {MALWARE_ICONS[scenario.id]}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {scenario.difficulty}
                    </span>
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        LULUS SOP
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Badge */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
                    {scenario.badge}
                  </div>
                  <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {scenario.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {scenario.description}
                </p>

                {/* Target SOP Checklist Preview */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Target Prosedur Penanganan:
                  </span>
                  {scenario.targetSop.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                      <span className="truncate">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/60">
                <Link
                  href={`/modules/security/lab/${scenario.id}`}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-cyan-600 hover:text-black text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <span>Buka Ruang Kerja Simulasi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
