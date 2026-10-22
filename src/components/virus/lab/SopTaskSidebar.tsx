// File: src/components/virus/lab/SopTaskSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import { MissionConceptAccordion } from './MissionConceptAccordion';
import { CheckCircle2, Circle, ShieldCheck, Compass, ArrowRight } from 'lucide-react';

export function SopTaskSidebar() {
  const { phase, completedSteps } = useVirusLabStore();

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
    <aside className="w-full bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between shadow-2xs space-y-3">
      <div className="space-y-3">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-slate-700" />
            <span>Misi Tanggap Insiden (NIST SP 800-61)</span>
          </div>
          <h2 className="text-xs font-bold text-slate-900 mt-0.5">
            Panduan Investigasi Forensik Berbasis Gejala
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            Analisis gejala di setiap panel dan tentukan urutan SOP penanganan yang benar.
          </p>
        </div>

        {/* Mission Steps List */}
        <div className="space-y-2">
          {missionTasks.map((m) => (
            <div
              key={m.id}
              className={`p-2.5 rounded border transition-colors ${
                m.done
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-900'
                  : m.active
                  ? 'bg-amber-50/50 border-amber-300 text-slate-900'
                  : 'bg-slate-50/60 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5 shrink-0">
                  {m.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Circle className={`w-4 h-4 ${m.active ? 'text-amber-600 font-bold' : 'text-slate-300'}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold leading-tight">
                      {m.number}. {m.title}
                    </span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                      m.done
                        ? 'bg-emerald-100 text-emerald-800'
                        : m.active
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {m.done ? 'SELESAI' : m.active ? 'AKTIF' : 'MENUNGGU'}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-600 mt-1 leading-relaxed">
                    {m.symptomDesc}
                  </p>
                </div>
              </div>

              {/* Dynamic Unlocked Concept Accordion */}
              <MissionConceptAccordion
                stepTitle={m.title}
                isUnlocked={m.done}
                conceptReason={m.conceptReason}
                realWorldDefense={m.realWorldDefense}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Completion Banner (Only appears when all steps are completed) */}
      {isAllDisinfected && (
        <div className="pt-3 border-t border-slate-200 mt-2 space-y-2">
          <div className="p-2.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Laboratorium Investigasi File Infector Tuntas!</div>
              <div className="text-[10.5px] mt-0.5 text-emerald-900 leading-snug">
                Seluruh berkas host berhasil dipulihkan, muatan parasit dibersihkan, dan rekonsiliasi hash SHA-256 cocok 100% dengan Golden Image.
              </div>
            </div>
          </div>

          <Link
            href="/modules/security/worm/intro"
            className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>Materi Selanjutnya: Network Worm</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </aside>
  );
}
