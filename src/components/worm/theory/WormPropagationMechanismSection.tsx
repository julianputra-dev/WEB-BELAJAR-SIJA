// File: src/components/worm/theory/WormPropagationMechanismSection.tsx
import React from 'react';
import { Network, Activity, Radio } from 'lucide-react';
import { PROPAGATION_MECHANISMS, NETWORK_IOCS } from '@/data/wormTheoryData';

export function WormPropagationMechanismSection() {
  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Mekanisme Propagasi &amp; Eksploitasi
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-slate-800" />
          Bagaimana Worm Menyusup Melalui Port 445 (SMB)?
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Port 445 digunakan oleh protokol Server Message Block (SMB) untuk berbagi file dan printer di jaringan lokal.
          Worm jaringan secara agresif memindai port ini untuk menyuntikkan paket eksploitasi remote code execution tanpa memerlukan login.
        </p>
      </div>

      {/* 4 Tahapan Propagasi Mandiri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROPAGATION_MECHANISMS.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold border border-slate-200">
                  {item.stage}
                </span>
                <span className="text-[10px] font-mono text-slate-400">SMB Port 445</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>
              <div className="text-[10px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-200">
                {item.protocol}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {item.technicalDetails}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-red-700 bg-red-50/50 p-2 rounded border border-red-100 font-sans">
              <strong>Dampak:</strong> {item.systemImpact}
            </div>
          </div>
        ))}
      </div>

      {/* Indikator Forensik Jaringan (IoC) */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Radio className="w-4 h-4 text-slate-700" />
            <span>Indikator Kompromi Jaringan (Network Indicators of Compromise / IoC)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Telemetri Deteksi Intrusi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {NETWORK_IOCS.map((ioc, idx) => (
            <div key={idx} className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{ioc.indicator}</span>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                  {ioc.monitoringTool}
                </span>
              </div>
              <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
                {ioc.networkSymptom}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
