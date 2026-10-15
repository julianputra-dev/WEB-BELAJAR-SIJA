// File: src/components/layout/GuideSidebar.tsx
'use client';

import React from 'react';
import { useLessonPhaseStore } from '@/store/useLessonPhaseStore';
import { ScenarioMetadata, SimulationPhase } from '@/types/simulation';
import {
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Info,
  Flame,
  ArrowRight,
  ShieldCheck,
  Bug,
  BookOpen,
} from 'lucide-react';

interface GuideSidebarProps {
  scenario: ScenarioMetadata;
  onTriggerInfection?: () => void;
  onReset?: () => void;
}

const PHASE_LABELS: Record<SimulationPhase, { label: string; color: string; badge: string }> = {
  idle: {
    label: 'Fase Persiapan',
    color: 'bg-slate-800 text-slate-300 border-slate-700',
    badge: 'IDLE / READY',
  },
  infected: {
    label: 'Fase Observasi Serangan',
    color: 'bg-red-950/80 text-red-300 border-red-800 animate-pulse',
    badge: 'ACTIVE INFECTION',
  },
  mitigation_step_1: {
    label: 'Mitigasi Langkah 1',
    color: 'bg-amber-950/80 text-amber-300 border-amber-800',
    badge: 'CONTAINMENT',
  },
  mitigation_step_2: {
    label: 'Mitigasi Langkah 2',
    color: 'bg-blue-950/80 text-blue-300 border-blue-800',
    badge: 'ERADICATION',
  },
  recovered: {
    label: 'Sistem Pulih (Mitigasi 3 Selesai)',
    color: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
    badge: 'SYSTEM RESTORED',
  },
};

export const GuideSidebar: React.FC<GuideSidebarProps> = ({
  scenario,
  onTriggerInfection,
  onReset,
}) => {
  const { currentPhase, errorFeedback, mistakeCount, clearError, resetLesson } =
    useLessonPhaseStore();

  const currentNarrative = scenario.narratives[currentPhase] || scenario.narratives.idle;
  const phaseMeta = PHASE_LABELS[currentPhase] || PHASE_LABELS.idle;

  const handleReset = () => {
    resetLesson();
    if (onReset) onReset();
  };

  return (
    <aside className="w-80 md:w-96 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden text-slate-100 shadow-2xl">
      {/* Header Info Skenario */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-mono tracking-widest px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800">
            {scenario.badge}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Kesalahan: <span className="text-amber-400 font-bold">{mistakeCount}</span>
          </span>
        </div>
        <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Bug className="w-4 h-4 text-cyan-400 shrink-0" />
          {scenario.title}
        </h2>
      </div>

      {/* Indikator Status & Alert Kesalahan */}
      <div className="p-4 space-y-3 overflow-y-auto flex-1">
        {/* Banner Fase Saat Ini */}
        <div
          className={`p-3 rounded-lg border flex items-center justify-between text-xs font-semibold ${phaseMeta.color}`}
        >
          <div className="flex items-center gap-2">
            {currentPhase === 'infected' ? (
              <Flame className="w-4 h-4 text-red-400 shrink-0" />
            ) : currentPhase === 'recovered' ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <span>{phaseMeta.label}</span>
          </div>
          <span className="text-[10px] font-mono tracking-wider opacity-80 uppercase">
            {phaseMeta.badge}
          </span>
        </div>

        {/* Error Feedback Banner jika Salah Urutan Langkah */}
        {errorFeedback && (
          <div className="p-3 bg-red-950/90 border border-red-700 rounded-lg text-red-200 text-xs shadow-lg animate-bounce">
            <div className="flex items-start gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-semibold text-red-300">Peringatan SOP Dilanggar!</div>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-white text-xs px-1 hover:bg-red-800 rounded"
              >
                ✕
              </button>
            </div>
            <p className="leading-relaxed text-[11px] text-red-100">{errorFeedback}</p>
          </div>
        )}

        {/* Kotak Instruksi & Narasi Edukasi */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Instruksi Tahap Ini</span>
          </div>
          <h3 className="text-sm font-semibold text-white leading-snug">
            {currentNarrative.title}
          </h3>
          <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-900/60 text-cyan-200 text-xs leading-relaxed">
            <div className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
              <span>{currentNarrative.instruction}</span>
            </div>
          </div>
        </div>

        {/* Penjelasan Teknis SIJA */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>Penjelasan Teknis Keamanan</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentNarrative.technicalExplanation}
          </p>
        </div>

        {/* Prosedur SOP Terencana (Checklist) */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-3.5 space-y-2">
          <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
            Urutan Prosedur SOP:
          </span>
          <div className="space-y-1.5 pt-1">
            {scenario.targetSop.map((sop, idx) => {
              const stepCompleted =
                (idx === 0 &&
                  (currentPhase === 'mitigation_step_1' ||
                    currentPhase === 'mitigation_step_2' ||
                    currentPhase === 'recovered')) ||
                (idx === 1 &&
                  (currentPhase === 'mitigation_step_2' || currentPhase === 'recovered')) ||
                (idx === 2 && currentPhase === 'recovered');

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 text-xs p-1.5 rounded transition-all ${
                    stepCompleted
                      ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/50'
                      : 'text-slate-400'
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ${
                      stepCompleted ? 'text-emerald-400' : 'text-slate-600'
                    }`}
                  />
                  <span className="font-mono text-[11px] text-slate-500">#{idx + 1}</span>
                  <span className="truncate">{sop}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Kontrol Utama Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/90 flex items-center gap-2">
        {currentPhase === 'idle' && (
          <button
            onClick={onTriggerInfection}
            className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-lg shadow-red-950/50 transition-all"
          >
            <Flame className="w-3.5 h-3.5" />
            Mulai Serangan Simulasi
          </button>
        )}
        <button
          onClick={handleReset}
          className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 border border-slate-700 hover:text-white transition-all"
          title="Reset Simulasi ke Kondisi Awal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </aside>
  );
};
