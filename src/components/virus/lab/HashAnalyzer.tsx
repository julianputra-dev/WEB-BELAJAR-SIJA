// File: src/components/virus/lab/HashAnalyzer.tsx
import React from 'react';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import { Binary, ShieldAlert, ShieldCheck, Archive, RefreshCw } from 'lucide-react';

export function HashAnalyzer() {
  const {
    binaries,
    selectedFileId,
    setSelectedFileId,
    quarantineSelectedCarrier,
    disinfectAllInfected,
    recalculateHashes,
    phase,
  } = useVirusLabStore();

  const carrier = binaries.find((b) => b.isCarrier);
  const infectedCount = binaries.filter((b) => b.status === 'infected').length;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col h-full shadow-xs">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3 mb-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
            Audit Integritas Kriptografi
          </div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Binary className="w-4 h-4 text-slate-700" />
            SHA-256 Baseline Integrity Comparator
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={quarantineSelectedCarrier}
            disabled={carrier?.status === 'quarantined' || phase === 'idle'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-semibold rounded transition-colors"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Karantina Carrier Biner</span>
          </button>

          <button
            onClick={disinfectAllInfected}
            disabled={infectedCount === 0 || carrier?.status !== 'quarantined'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-semibold rounded transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Disinfeksi Biner Host</span>
          </button>
        </div>
      </div>

      {/* Table Hashes */}
      <div className="overflow-x-auto flex-1 text-xs font-mono">
        <table className="w-full text-left border border-slate-200">
          <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[11px] border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Nama Berkas</th>
              <th className="py-2.5 px-3">Ukuran Fisik</th>
              <th className="py-2.5 px-3">Baseline Hash (Golden DB)</th>
              <th className="py-2.5 px-3">Hasil Kalkulasi SHA-256</th>
              <th className="py-2.5 px-3">Status Integritas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-[11px]">
            {binaries.map((bin) => {
              const isTampered = bin.status === 'infected';
              const isQuarantined = bin.status === 'quarantined';
              const isClean = bin.status === 'clean' || bin.status === 'disinfected';

              return (
                <tr
                  key={bin.id}
                  onClick={() => setSelectedFileId(bin.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedFileId === bin.id
                      ? 'bg-slate-100 border-l-4 border-l-slate-900'
                      : isTampered
                      ? 'bg-red-50 hover:bg-red-100/70'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-1.5">
                    {bin.name}
                    {bin.isCarrier && (
                      <span className="text-[10px] bg-slate-200 px-1.5 py-0.2 rounded text-slate-700">CARRIER</span>
                    )}
                  </td>
                  <td className={`py-2.5 px-3 ${bin.currentSizeKB > bin.originalSizeKB ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                    {bin.currentSizeKB} KB
                    {bin.currentSizeKB > bin.originalSizeKB && (
                      <span className="text-[10px] text-red-500 ml-1">(+348 KB Parasit)</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 truncate max-w-xs">{bin.baselineHash}</td>
                  <td className={`py-2.5 px-3 font-bold truncate max-w-xs ${isTampered ? 'text-red-700' : 'text-emerald-700'}`}>
                    {bin.currentHash}
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isTampered
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : isQuarantined
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {isTampered ? 'HASH TAMPERED' : isQuarantined ? 'QUARANTINED' : 'MATCH VERIFIED'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-3 text-[11px] text-slate-500 font-mono flex items-center justify-between border-t border-slate-100 mt-2">
        <span>Bandingkan nilai SHA-256 hasil kalkulasi dengan database Golden Image untuk membuktikan infeksi.</span>
        <span>Terinfeksi: {infectedCount} Biner</span>
      </div>
    </div>
  );
}
