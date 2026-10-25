// File: src/components/trojan/theory/TrojanSopRoadmapCard.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal, ShieldAlert, Trash2, AlertTriangle, Cpu, Radio, CheckCircle2 } from 'lucide-react';
import { TROJAN_SOP_STEPS } from '@/data/trojanTheoryData';

export function TrojanSopRoadmapCard() {
  const stepIcons = [
    <Terminal key="s1" className="w-4 h-4 text-slate-200" />,
    <Cpu key="s2" className="w-4 h-4 text-slate-200" />,
    <Trash2 key="s3" className="w-4 h-4 text-slate-200" />,
  ];

  return (
    <section className="bg-slate-900 text-white rounded-xl p-6 md:p-8 border border-slate-800 shadow-sm mb-12">
      <div className="max-w-3xl space-y-3 mb-6">
        <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
          Prosedur Operasional Standar (SOP) Praktikum
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Alur Mitigasi Insiden Backdoor Trojan Horse (NIST SP 800-61)
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Dalam simulasi laboratorium keamanan siber, urutan mitigasi insiden didasarkan pada logika sistem operasi.
          Setiap langkah harus diselesaikan secara berurutan guna menghindari penolakan akses kernel (kernel file locking)
          dan menjamin pemusnahan total terhadap pintu belakang penyerang.
        </p>
      </div>

      {/* 3 Langkah SOP Terurut */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {TROJAN_SOP_STEPS.map((st, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-slate-800/90 border border-slate-700 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  LANGKAH {st.step}
                </span>
                <div className="p-1 rounded bg-slate-700 text-slate-200">
                  {stepIcons[i]}
                </div>
              </div>
              <h3 className="text-xs font-bold text-white">{st.title}</h3>
              <div className="text-[10px] font-mono text-emerald-400 bg-slate-900/90 p-1.5 rounded border border-slate-700 break-all">
                {st.technicalCommand}
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                {st.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-700/60 text-[10px] text-slate-400 font-sans">
              <strong>Tujuan:</strong> {st.objective}
            </div>
          </div>
        ))}
      </div>

      {/* Forensic Cause-and-Effect Warning */}
      <div className="p-3.5 rounded-lg bg-slate-800/80 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5 font-sans mb-6">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Peringatan Sebab-Akibat Forensik:</strong> Jika siswa mencoba menghapus biner aplikasi induk (<span className="font-mono text-amber-100">SuperCalc_Pro.exe</span>)
          sebelum mematikan proses di RAM, sistem operasi Windows akan memblokir tindakan dengan status <span className="font-mono text-amber-100">ERROR_SHARING_VIOLATION (File in Use)</span> karena
          kernel menahan handle berkas aktif. Selain itu, jika registri Startup tidak dibersihkan, Trojan akan bangkit kembali saat komputer dinyalakan ulang.
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-400 font-mono">
          Prasyarat Teori Selesai &bull; Siap Memasuki Ruang Kerja Laboratorium Sandboxing
        </div>
        <Link
          href="/modules/security/trojan/lab"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
        >
          <span>Masuk ke Lab Simulasi Trojan</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
