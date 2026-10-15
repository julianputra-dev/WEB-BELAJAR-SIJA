// File: src/components/landing/InstitutionalBanner.tsx
import React from 'react';

export function InstitutionalBanner() {
  return (
    <div className="bg-slate-900 text-slate-300 text-[11px] font-mono tracking-wider py-2 px-6 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          <span className="text-slate-400">DIREKTORAT PENDIDIKAN VOKASI</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-200">PORTAL PEMBELAJARAN KURIKULUM SIJA</span>
        </div>
        <div className="text-slate-400">
          STANDAR KOMPETENSI: SKKNI / NIST SP 800-61 / ISO 27001
        </div>
      </div>
    </div>
  );
}
