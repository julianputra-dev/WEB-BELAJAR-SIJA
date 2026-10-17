// File: src/components/virus/lab/SopTaskSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import { MissionConceptAccordion } from './MissionConceptAccordion';
import { CheckCircle2, Circle, ShieldCheck, AlertCircle, Compass, ArrowRight } from 'lucide-react';

export function SopTaskSidebar() {
  const {
    phase,
    completedSteps,
    binaries,
    processes,
    reinfectionAlert,
    clearReinfectionAlert,
  } = useVirusLabStore();

  const isAllDisinfected = completedSteps.step4;

  const missionTasks = [
    {
      id: 'step1',
      number: '1',
      title: 'Triage Anomali Memori RAM',
      done: completedSteps.step1,
      active: phase === 'infected' && !completedSteps.step1,
      symptomDesc:
        'Identifikasi proses di Process Explorer yang mengonsumsi CPU secara tidak wajar (>80%) dan tidak memiliki sertifikat tanda tangan resmi, lalu hentikan proses (SIGKILL).',
      conceptReason:
        'Proses aktif di RAM bertindak sebagai engine replikasi yang menyuntikkan muatan kode parasit ke berkas lain. Menghentikan proses di memori memutus siklus replikasi aktif secara instan.',
      realWorldDefense:
        'Pada SOC modern, analisis RAM dilakukan menggunakan EDR (Endpoint Detection and Response) untuk mendeteksi process hollowing dan anomali thread CPU secara otomatis.',
    },
    {
      id: 'step2',
      number: '2',
      title: 'Isolasi Lingkungan Sistem (SafeBoot)',
      done: completedSteps.step2,
      active: completedSteps.step1 && !completedSteps.step2,
      symptomDesc:
        'Sistem operasi standar masih rentan terhadap persistence hook driver. Beralih ke Diagnostic Mode untuk mengunci registri SafeBoot dan mematikan driver pihak ketiga.',
      conceptReason:
        'Driver pihak ketiga dapat mengaitkan (hook) fungsi kernel untuk mencegah berkas malware dihapus (status File in Use). SafeBoot hanya memuat driver minimal bersertifikat.',
      realWorldDefense:
        'Administrator enterprise mengunci konfigurasi UEFI Secure Boot dan GPO untuk mencegah pemuatan driver pihak ketiga tanpa sertifikasi resmi Microsoft WHQL.',
    },
    {
      id: 'step3',
      number: '3',
      title: 'Karantina Vektor Asal Infeksi',
      done: completedSteps.step3,
      active: completedSteps.step2 && !completedSteps.step3,
      symptomDesc:
        'Identifikasi biner asing tidak dikenal di direktori yang bertindak sebagai pembawa muatan awal, lalu amankan ke Brankas Karantina tanpa izin eksekusi.',
      conceptReason:
        'Mengisolasi biner pembawa ke Brankas Karantina mencabut hak eksekusi (chmod 000 / No-Execute ACL) sehingga berkas tidak dapat dijalankan kembali secara manual maupun otomatis.',
      realWorldDefense:
        'Penerapan Application Control (AppLocker / WDAC) memastikan hanya aplikasi yang terdaftar dalam daftar putih (allowlist) yang diizinkan berjalan di workstation.',
    },
    {
      id: 'step4',
      number: '4',
      title: 'Bedah Struktur PE & Rekonsiliasi Hash',
      done: completedSteps.step4,
      active: completedSteps.step3 && !completedSteps.step4,
      symptomDesc:
        'Gunakan Binary X-Ray untuk memeriksa biner inang yang membengkak. Pangkas seksi parasit (.parasite), kembalikan EntryPoint asli, dan pastikan hash SHA-256 cocok 100%.',
      conceptReason:
        'Disinfeksi biner sejati membedah header PE, memotong muatan parasit di akhir berkas, dan memulihkan AddressOfEntryPoint sehingga biner program asli dapat digunakan kembali dengan aman.',
      realWorldDefense:
        'Penerapan File Integrity Monitoring (FIM) seperti OSSEC, Tripwire, atau Wazuh yang secara rutin memverifikasi hash SHA-256 berkas sistem terhadap Golden Image Baseline.',
    },
  ];

  return (
    <aside className="w-full bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between shadow-xs">
      <div className="space-y-3.5">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-slate-800" />
            <span>Misi Investigasi Forensik (NIST SP 800-61)</span>
          </div>
          <h2 className="text-xs font-bold text-slate-900 mt-0.5">
            Panduan Berbasis Gejala &amp; Analisis Sebab-Akibat
          </h2>
        </div>

        {/* Re-infection Alert Banner if triggered */}
        {reinfectionAlert && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-red-950 text-xs space-y-2 animate-in fade-in">
            <div className="flex items-start justify-between gap-1">
              <div className="font-bold flex items-center gap-1.5 text-red-900 text-[11px]">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Eksperimen Re-Infeksi Nyata!</span>
              </div>
              <button
                onClick={clearReinfectionAlert}
                className="text-[10px] text-red-700 hover:text-red-950 underline font-mono"
              >
                Tutup
              </button>
            </div>
            <p className="text-[10px] leading-relaxed text-red-800 font-sans">
              {reinfectionAlert}
            </p>
          </div>
        )}

        {/* Task Steps with Concept Accordions */}
        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
          {missionTasks.map((t) => (
            <div
              key={t.id}
              className={`p-3 rounded-lg border text-xs transition-colors ${
                t.done
                  ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                  : t.active
                  ? 'bg-slate-100 border-slate-400 text-slate-900 ring-1 ring-slate-400'
                  : 'bg-slate-50/80 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {t.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className="font-bold text-[11px]">
                  Misi {t.number}: {t.title}
                </span>
              </div>

              <p className="text-[10px] leading-relaxed pl-6 text-slate-600 font-sans">
                {t.symptomDesc}
              </p>

              {/* Dynamic Accordion Unlocked after completion */}
              <div className="pl-6">
                <MissionConceptAccordion
                  stepTitle={`Misi ${t.number}`}
                  isUnlocked={t.done}
                  conceptReason={t.conceptReason}
                  realWorldDefense={t.realWorldDefense}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAllDisinfected && (
        <div className="mt-3 p-3 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-mono space-y-2">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>INVESTIGASI LULUS 100%</span>
          </div>
          <p className="text-[10px] leading-relaxed font-sans">
            Seluruh berkas host dipulihkan dan progres terekam otomatis ke database. Anda siap melanjutkan ke materi berikutnya!
          </p>
          <Link
            href="/modules/security/worm/intro"
            className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded border border-slate-900 flex items-center justify-center gap-2 transition-colors font-sans shadow-sm"
          >
            <span>Lanjut ke Materi Berikutnya: Network Worm</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </aside>
  );
}
