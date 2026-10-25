// File: src/components/trojan/lab/TrojanSopSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useTrojanLabStore } from '@/store/useTrojanLabStore';
import { TrojanMissionConceptAccordion } from './TrojanMissionConceptAccordion';
import { CheckCircle2, Circle, Compass, ArrowRight, Award } from 'lucide-react';

export function TrojanSopSidebar() {
  const { completedMissions, appTrojan, isFullyRemediated, mistakes } = useTrojanLabStore();

  const missionTasks = [
    {
      id: 'step1',
      number: '1',
      title: 'Observasi 3 Aplikasi & Lacak Anomali Netstat',
      done: completedMissions.mission1,
      active: appTrojan.isRunning && !completedMissions.mission1,
      symptomDesc:
        'Jalankan ketiga aplikasi pada Panel 1. Amati perbedaan telemetri di Panel 2: Temukan soket jaringan keluar berstatus ESTABLISHED pada port non-standar yang dimiliki oleh aplikasi utilitas offline, lalu klik barisnya untuk mengidentifikasi nomor PID.',
      conceptReason:
        'Trojan menyamarkan diri sebagai program utilitas normal di antarmuka permukaan tetapi meluncurkan thread latar belakang yang membuka soket TCP tersembunyi. Tabel Netstat adalah alat investigasi utama untuk melacak Process ID (PID) yang menguasai soket asing tersebut.',
      realWorldDefense:
        'SOC Analyst menggunakan sensor EDR (Sysmon Event ID 3: Network Connection) dan SIEM untuk mendeteksi setiap proses non-browser yang menginisialisasi koneksi keluar ke alamat IP publik.',
    },
    {
      id: 'step2',
      number: '2',
      title: 'Blokir Firewall C2 & Hentikan Proses di RAM',
      done: completedMissions.mission2,
      active: completedMissions.mission1 && !completedMissions.mission2,
      symptomDesc:
        'Pada Panel 3, konfigurasikan Host Firewall untuk memblokir Remote IP dan Port penyerang. Setelah koneksi C2 terputus, hentikan proses di RAM (taskkill /F). Jika Anda mematikan proses sebelum memblokir firewall, watchdog akan membangkitkan proses kembali dalam 2 detik!',
      conceptReason:
        'Memblokir IP di firewall menghentikan kendali peretas seketika dan melumpuhkan sinyal beacon watchdog. Menghentikan proses di RAM melepaskan memory-mapped handle di kernel Windows agar berkas biner tidak lagi terkunci (File in Use).',
      realWorldDefense:
        'Incident Response Team menerapkan Host Isolation pada firewall perimeter dan mengeksekusi penutupan port sebelum menghentikan proses untuk mencegah malware melakukan panic-exfiltration atau respawn otomatis.',
    },
    {
      id: 'step3',
      number: '3',
      title: 'Eliminasi Biner Induk & Bersihkan Persistensi',
      done: completedMissions.mission3,
      active: completedMissions.mission2 && !completedMissions.mission3,
      symptomDesc:
        'Setelah proses di RAM mati dan handle berkas terlepas, hapus berkas biner executable pembawa Trojan dari direktori instalasi di Panel 1, serta bersihkan entri auto-run pada registri Windows Startup (HKCU\\...\\Run) agar malware tidak bangkit kembali.',
      conceptReason:
        'Menghapus biner fisik mencegah eksekusi ulang secara manual oleh pengguna. Menghapus entri registri Run memutus siklus eksekusi otomatis yang dijalankan Windows Subsystem setiap kali pengguna login ke komputer.',
      realWorldDefense:
        'Pemeriksaan titik persistensi secara berkala menggunakan Sysinternals Autoruns dan penghapusan kunci Run yang mencurigakan via GPO / EDR remediation script.',
    },
    {
      id: 'step4',
      number: '4',
      title: 'Validasi Pasca-Remediasi (Reboot & Hardening)',
      done: completedMissions.mission4,
      active: completedMissions.mission3 && !completedMissions.mission4,
      symptomDesc:
        'Jalankan tombol "Simulasi Reboot OS" di bilah navigasi atas untuk membuktikan bahwa Trojan tidak bangkit kembali via persistensi registri dan bahwa Host Firewall menolak setiap upaya pembukaan kembali backdoor.',
      conceptReason:
        'Uji reboot sistem memverifikasi bahwa remediated host benar-benar bersih dan tidak meninggalkan scheduled task atau modul sekunder yang dapat meregenerasi infeksi.',
      realWorldDefense:
        'Post-Incident Verification Audit memastikan integritas host memenuhi standar Golden Image enterprise sebelum workstation dikembalikan ke jaringan produksi.',
    },
  ];

  return (
    <aside className="w-full bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between shadow-xs space-y-3.5">
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
            Analisis gejala di setiap panel dan selesaikan tahapan SOP mitigasi Trojan Horse sesuai urutan operasional tanpa spoiler.
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
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                        m.done
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.active
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {m.done ? 'SELESAI' : m.active ? 'AKTIF' : 'MENUNGGU'}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-600 mt-1 leading-relaxed">
                    {m.symptomDesc}
                  </p>
                </div>
              </div>

              {/* Dynamic Unlocked Concept Accordion */}
              <TrojanMissionConceptAccordion
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
      {isFullyRemediated && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>MODUL FORENSIK SELESAI</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed font-sans">
            Luar biasa! Anda telah berhasil mengidentifikasi Trojan melalui analisis telemetri murni, membuktikan perilaku siluman, memutus C2 pada firewall, melepaskan lock file-in-use di RAM, dan membersihkan persistensi dengan {mistakes} kesalahan SOP.
          </p>
          <Link
            href="/modules/security/malware"
            className="w-full py-2 px-3 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Lanjut ke Katalog Modul Malware</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </aside>
  );
}
