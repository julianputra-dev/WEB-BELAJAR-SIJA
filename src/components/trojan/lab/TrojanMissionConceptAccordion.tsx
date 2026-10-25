// File: src/components/trojan/lab/TrojanMissionConceptAccordion.tsx
'use client';

import React, { useState } from 'react';
import { Lock, Unlock, ChevronDown, ChevronUp, ShieldCheck, Lightbulb } from 'lucide-react';

interface TrojanMissionConceptAccordionProps {
  stepTitle: string;
  isUnlocked: boolean;
  conceptReason: string;
  realWorldDefense: string;
}

export function TrojanMissionConceptAccordion({
  stepTitle,
  isUnlocked,
  conceptReason,
  realWorldDefense,
}: TrojanMissionConceptAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isUnlocked) {
    return (
      <div className="mt-2 p-2 rounded border border-dashed border-slate-300 bg-slate-50/70 text-slate-400 text-[10px] flex items-center justify-between font-mono">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-slate-400 shrink-0" />
          <span>Analisis Konseptual Terkunci</span>
        </div>
        <span className="text-[9px] text-slate-400">Selesaikan misi ini untuk membuka</span>
      </div>
    );
  }

  return (
    <div className="mt-2 rounded border border-emerald-300 bg-emerald-50/40 overflow-hidden text-xs transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 flex items-center justify-between text-left hover:bg-emerald-100/50 transition-colors"
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <Unlock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span className="font-bold text-emerald-950 text-[11px] truncate">
            Wawasan Forensik: {stepTitle}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="p-2.5 border-t border-emerald-200/80 space-y-2 text-[11px] leading-relaxed bg-white">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
              <Lightbulb className="w-3 h-3 text-amber-600 shrink-0" />
              <span>Penjelasan Konsep: Mengapa Kita Melakukan Ini?</span>
            </div>
            <p className="text-slate-600 pl-4 border-l-2 border-amber-300 text-[10.5px]">
              {conceptReason}
            </p>
          </div>

          <div className="space-y-1 pt-1 border-t border-slate-100">
            <div className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Prosedur Dunia Nyata (Enterprise Defense):</span>
            </div>
            <p className="text-slate-600 pl-4 border-l-2 border-emerald-300 text-[10.5px]">
              {realWorldDefense}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
