// File: src/components/virus/theory/InfectionMechanismSection.tsx
import React from 'react';
import { INFECTION_VECTORS } from '@/data/virusTheoryData';
import { Layers, FileCode, Sparkles } from 'lucide-react';

export function InfectionMechanismSection() {
  return (
    <section className="mb-10 space-y-4">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Mekanisme Teknis Biner
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-slate-800" />
          Bagaimana Virus Menyisipkan Kodenya ke File Executable (.exe)?
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          File program Windows memiliki struktur standar bernama <strong>Portable Executable (PE)</strong>.
          Analogi mudahnya seperti sebuah buku: virus dapat menempelkan lembaran tambahan di bagian belakang,
          menyisipkan halaman baru di sampul depan, atau mengisi celah margin yang kosong.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {INFECTION_VECTORS.map((vec) => (
          <div
            key={vec.id}
            className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between shadow-xs space-y-3"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileCode className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900">{vec.name}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {vec.mechanism}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] font-mono">
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <span className="text-slate-500 uppercase block mb-0.5">Dampak Ukuran:</span>
                <span className="text-slate-800 font-semibold">{vec.impactOnSize}</span>
              </div>
              <div className="bg-blue-50/50 p-2 rounded border border-blue-100">
                <span className="text-blue-900 uppercase block mb-0.5">Cara Mengatasinya:</span>
                <span className="text-blue-950">{vec.mitigationApproach}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
