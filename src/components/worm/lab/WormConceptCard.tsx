// File: src/components/worm/lab/WormConceptCard.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, ShieldCheck } from 'lucide-react';

interface WormConceptCardProps {
  title: string;
  isUnlocked: boolean;
  conceptReason: string;
  realWorldDefense: string;
}

export function WormConceptCard({
  title,
  isUnlocked,
  conceptReason,
  realWorldDefense,
}: WormConceptCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2 border border-slate-200 rounded bg-white overflow-hidden text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-left flex items-center justify-between text-slate-800 transition-colors font-mono"
      >
        <span className="flex items-center gap-1.5 font-bold text-[10px]">
          <BookOpen className="w-3 h-3 text-slate-600" />
          <span>{title}</span>
          {isUnlocked && (
            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-semibold uppercase">
              Terbuka
            </span>
          )}
        </span>
        {isOpen ? <ChevronUp className="w-3 h-3 text-slate-500" /> : <ChevronDown className="w-3 h-3 text-slate-500" />}
      </button>

      {isOpen && (
        <div className="p-2.5 space-y-2 bg-white text-[11px] leading-relaxed font-sans text-slate-600 border-t border-slate-100">
          <div>
            <strong className="text-slate-900 block text-[10px] font-mono uppercase mb-0.5">
              Landasan Ilmiah Sebab-Akibat:
            </strong>
            <p>{conceptReason}</p>
          </div>

          <div className="pt-2 border-t border-slate-100 text-slate-700 bg-slate-50 p-2 rounded text-[10px] space-y-1">
            <span className="font-semibold block text-slate-900 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Praktik Defensif Enterprise (SOC / Blue Team):</span>
            </span>
            <p>{realWorldDefense}</p>
          </div>
        </div>
      )}
    </div>
  );
}
