// File: src/components/virus/lab/SopTaskSidebar.tsx
import React from 'react';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import { CheckCircle2, Circle, Play, AlertTriangle, ShieldCheck } from 'lucide-react';

export function SopTaskSidebar() {
  const { phase, safeMode, binaries, processes, triggerInfection, feedbackMessage } = useVirusLabStore();

  const isRogueTerminated = processes.find((p) => p.isMalicious)?.status === 'terminated';
  const isCarrierQuarantined = binaries.find((b) => b.isCarrier)?.status === 'quarantined';
  const isAllDisinfected = binaries.filter((b) => !b.isCarrier).every((b) => b.status === 'disinfected');

  const tasks = [
    {
      step: '1',
      title: 'Triage Memori & Kill PID Parasit',
      done: isRogueTerminated,
      active: phase === 'infected',
      desc: 'Analisis tabel Process Explorer dan hentikan proses muatan parasit (PID 3844).',
    },
    {
      step: '2',
      title: 'Booting Mode Diagnostik (SafeBoot)',
      done: safeMode,
      active: isRogueTerminated && !safeMode,
      desc: 'Buka tab PE Header & Registri, lalu aktifkan Diagnostic Boot untuk mengisolasi driver.',
    },
    {
      step: '3',
      title: 'Karantina Biner Pembawa (Carrier)',
      done: isCarrierQuarantined,
      active: safeMode && !isCarrierQuarantined,
      desc: 'Buka tab Hash Comparator, pilih setup_game.exe, dan pindahkan ke Brankas Karantina.',
    },
    {
      step: '4',
      title: 'Disinfeksi Header PE & SHA-256 Match',
      done: isAllDisinfected,
      active: isCarrierQuarantined && !isAllDisinfected,
      desc: 'Jalankan disinfeksi biner host untuk memotong muatan parasit dan verifikasi hash ke baseline.',
    },
  ];

  return (
    <aside className="w-full lg:w-80 bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between shadow-xs">
      <div className="space-y-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
            Panduan Prosedur
          </div>
          <h2 className="text-sm font-bold text-slate-900 mt-0.5">
            SOP Remediasi Forensik File Infector
          </h2>
        </div>

        {/* Action Trigger Infeksi Awal */}
        {phase === 'idle' && (
          <div className="p-3.5 rounded bg-amber-50 border border-amber-200 space-y-2">
            <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-amber-700" />
              <span>Simulasi Belum Berjalan</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Jalankan berkas pembawa setup_game.exe untuk mengamati perilaku replikasi virus dan memicu anomali telemetri.
            </p>
            <button
              onClick={triggerInfection}
              className="w-full py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded transition-colors shadow-xs"
            >
              Jalankan setup_game.exe (Mulai Infeksi)
            </button>
          </div>
        )}

        {/* Task Steps */}
        <div className="space-y-3">
          {tasks.map((t) => (
            <div
              key={t.step}
              className={`p-3 rounded border text-xs transition-colors ${
                t.done
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : t.active
                  ? 'bg-blue-50 border-blue-300 text-blue-950 ring-1 ring-blue-300'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {t.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className="font-bold">Langkah {t.step}: {t.title}</span>
              </div>
              <p className="text-[11px] leading-relaxed pl-6">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {isAllDisinfected && (
        <div className="mt-4 p-3 rounded bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-mono space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>INVESTIGASI LULUS 100%</span>
          </div>
          <p className="text-[11px]">Progres disimpan otomatis ke database lokal melalui ProgressService.</p>
        </div>
      )}
    </aside>
  );
}
