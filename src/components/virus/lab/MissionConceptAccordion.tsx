// File: src/components/virus/lab/MissionConceptAccordion.tsx
'use client';

import React, { useState } from 'react';
import { Lock, Unlock, ChevronDown, ChevronUp, BookOpen, ShieldCheck, Lightbulb } from 'lucide-react';

interface MissionConceptAccordionProps {
  stepTitle: string;
  isUnlocked: boolean;
  conceptReason: string;
  realWorldDefense: string;
}

export function MissionConceptAccordion({
  stepTitle,
  isUnlocked,
  conceptReason,
  realWorldDefense,
}: MissionConceptAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isUnlocked) {
    return (
      <div className="mt-2 p-2.5 rounded border border-dashed border-slate-300 bg-slate-50/70 text-slate-400 text-[10px] flex items-center justify-between font-mono">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-slate-400 shrink-0" />
          <span>Analisis Mendalam Terkunci</span>
        </div>
        <span className="text-[9px] text-slate-400">Selesaikan misi untuk membuka</span>
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-lg border border-emerald-300 bg-emerald-50/40 overflow-hidden transition-all text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 flex items-center justify-between text-left hover:bg-emerald-100/50 transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <Unlock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span className="font-bold text-emerald-950 text-[11px]">
            Wawasan Forensik Terbuka: {stepTitle}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-emerald-700" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
        )}
      </button>

      {isOpen && (
        <div className="p-3 border-t border-emerald-200/80 space-y-2.5 text-[11px] leading-relaxed bg-white">
          {/* Mengapa Kita Melakukan Ini */}
          <div className="space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px]">
              <Lightbulb className="w-3 h-3 text-amber-600 shrink-0" />
              <span>Penjelasan Konsep: Mengapa Kita Melakukan Ini?</span>
            </div>
            <p className="text-slate-600 pl-4.5 text-[10px] bg-slate-50 p-2 rounded border border-slate-200 font-sans">
              {conceptReason}
            </p>
          </div>

          {/* Cara Antisipasi di Dunia Nyata */}
          <div className="space-y-1 pt-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="w-3 h-3 text-slate-800 shrink-0" />
              <span>Cara Antisipasi di Dunia Nyata (Enterprise Defense)</span>
            </div>
            <p className="text-slate-600 pl-4.5 text-[10px] bg-slate-50 p-2 rounded border border-slate-200 font-sans">
              {realWorldDefense}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
