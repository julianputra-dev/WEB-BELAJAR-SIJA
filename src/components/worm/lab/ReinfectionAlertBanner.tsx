// File: src/components/worm/lab/ReinfectionAlertBanner.tsx
'use client';

import React from 'react';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { AlertCircle, X } from 'lucide-react';

export function ReinfectionAlertBanner() {
  const { reinfectionAlert, clearReinfectionAlert } = useWormTopologyStore();

  if (!reinfectionAlert) return null;

  return (
    <div className="p-3.5 rounded-lg bg-red-50 border border-red-300 text-red-950 text-xs space-y-2 animate-in fade-in">
      <div className="flex items-start justify-between gap-2">
        <div className="font-bold flex items-center gap-1.5 text-red-900 text-xs">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>Eksperimen Sebab-Akibat: Siklus Re-Infeksi Terjadi!</span>
        </div>
        <button
          onClick={clearReinfectionAlert}
          className="text-red-700 hover:text-red-950 transition-colors p-0.5 rounded"
          title="Tutup peringatan"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-[11px] leading-relaxed text-red-800 font-sans">
        {reinfectionAlert}
      </p>

      <div className="pt-1.5 border-t border-red-200/80 text-[10px] font-mono text-red-700">
        💡 <strong>Prinsip SOP:</strong> Putus kabel LAN terlebih dahulu, tutup Port 445 di Firewall, barulah bersihkan proses di RAM.
      </div>
    </div>
  );
}
