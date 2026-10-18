// File: src/components/worm/lab/WormMissionSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { ReinfectionAlertBanner } from './ReinfectionAlertBanner';
import { WormConceptCard } from './WormConceptCard';
import { CheckCircle2, Circle, ShieldCheck, Compass, ArrowRight, ShieldAlert } from 'lucide-react';

export function WormMissionSidebar() {
  const { completedMissions, isSimulating, isFullyRemediated, runPostHardeningTest } =
    useWormTopologyStore();

  const missions = [
    {
      id: 'step1',
      number: '1',
      title: 'Triage Anomali Subnet & Vektor Penyerangan',
      done: completedMissions.step1,
      active: isSimulating && !completedMissions.step2,
      symptomDesc:
        'Trafik jaringan mengalami lonjakan saturasi dan CPU pada workstation meningkat tajam. Identifikasi port layanan yang dieksploitasi (Port 445 SMB) dan proses parasit yang berjalan.',
      conceptReason:
        'Network worm mengeksploitasi celah layanan jaringan dari jarak jauh tanpa memerlukan klik atau autentikasi pengguna. Pemindaian subnet dilakukan otonom melipatgandakan replikasi ke host lain.',
      realWorldDefense:
        'SOC Analyst menggunakan Intrusion Detection System (IDS seperti Snort/Suricata) dan NetFlow monitor untuk mendeteksi badai koneksi TCP SYN sweep pada port-port rentan.',
    },
    {
      id: 'step2',
      number: '2',
      title: 'Isolasi Kompartemen Fisik Host Terinfeksi',
      done: completedMissions.step2,
      active: completedMissions.step1 && !completedMissions.step2,
      symptomDesc:
        'Putuskan kabel LAN pada seluruh host yang terinfeksi di lab untuk menghentikan pemancaran paket eksploitasi menuju Switch dan node lainnya.',
      conceptReason:
        'Mengisolasi fisik antarmuka jaringan (NIC Link Down) memutus transmisi broadcast dan lateral movement secara instan, mencegah node tetangga terus menerus dibombardir paket worm.',
      realWorldDefense:
        'Pada level enterprise, isolasi dilakukan otomatis melalui Network Access Control (802.1X NAC) atau isolasi jaringan berbasis agent EDR (Endpoint Detection and Response).',
    },
    {
      id: 'step3',
      number: '3',
      title: 'Remediasi Firewall Port 445 (Hardening)',
      done: completedMissions.step3,
      active: completedMissions.step2 && !completedMissions.step3,
      symptomDesc:
        'Sebelum menyambungkan kembali workstation ke switch jaringan, konfigurasikan aturan Firewall host untuk memblokir seluruh paket inbound pada Port 445 (SMB).',
      conceptReason:
        'Menutup port pada firewall memastikan bahwa saat kabel jaringan dipasang kembali, worm dari host tetangga yang belum dibersihkan tidak dapat menyusup kembali.',
      realWorldDefense:
        'Administrator menerapkan Group Policy Object (GPO) terpusat untuk mematikan SMBv1 dan memblokir port 445 inbound dari segmen workstation non-server.',
    },
    {
      id: 'step4',
      number: '4',
      title: 'Terminasi Proses RAM & Verifikasi Rekoneksi',
      done: completedMissions.step4,
      active: completedMissions.step3 && !completedMissions.step4,
      symptomDesc:
        'Buka Task Manager pada masing-masing workstation, matikan proses "worm_service.exe" di RAM, lalu sambungkan kembali kabel LAN untuk memastikan tidak ada re-infeksi.',
      conceptReason:
        'Setelah celah port diamankan, terminasi proses mematikan engine replikasi di RAM. Rekoneksi jaringan aman dilakukan karena tidak ada vektor penetrasi yang tersisa.',
      realWorldDefense:
        'Tim Incident Response memvalidasi daftar hash proses di memori, mencabut persistence run registry keys, dan memverifikasi utilisasi bandwidth normal.',
    },
  ];

  return (
    <aside className="w-full bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between shadow-xs">
      <div className="space-y-3.5">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-slate-800" />
            <span>Misi Investigasi Insiden (NIST SP 800-61)</span>
          </div>
          <h2 className="text-xs font-bold text-slate-900 mt-0.5">
            Panduan Berbasis Gejala &amp; Validasi Sebab-Akibat
          </h2>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-sans">
            Trafik jaringan lokal lumpuh dan beban CPU meningkat di seluruh komputer laboratorium. Analisis vektor ancaman, hentikan penyebaran, amankan port firewall, dan pulihkan seluruh workstation.
          </p>
        </div>

        {/* Real-time Re-infection Warning Banner */}
        <ReinfectionAlertBanner />

        {/* Missions Checklist */}
        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
          {missions.map((m) => (
            <div
              key={m.id}
              className={`p-3 rounded-lg border text-xs transition-colors ${
                m.done
                  ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                  : m.active
                  ? 'bg-slate-100 border-slate-400 text-slate-900 ring-1 ring-slate-400'
                  : 'bg-slate-50/80 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {m.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className="font-bold text-[11px]">
                  Misi {m.number}: {m.title}
                </span>
              </div>

              <p className="text-[10px] leading-relaxed pl-6 text-slate-600 font-sans">
                {m.symptomDesc}
              </p>

              {/* Dynamic Accordion Unlocked after completion or for review */}
              <div className="pl-6">
                <WormConceptCard
                  title={`Konsep: Misi ${m.number}`}
                  isUnlocked={m.done}
                  conceptReason={m.conceptReason}
                  realWorldDefense={m.realWorldDefense}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {isFullyRemediated && (
        <div className="mt-3 p-3.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-mono space-y-2">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>SUB-JARINGAN STERIL &amp; AMAN 100%</span>
          </div>
          <p className="text-[10px] leading-relaxed font-sans">
            Seluruh workstation telah diisolasi, celah Port 445 ditutup di Firewall, memori RAM dibersihkan, dan rekoneksi LAN sukses tanpa siklus re-infeksi!
          </p>
          <div className="pt-1 flex flex-col gap-2">
            <button
              onClick={runPostHardeningTest}
              className="w-full py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors font-mono shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Uji Ulang Ketahanan (Re-Attack Test)</span>
            </button>

            <Link
              href="/modules/security/malware"
              className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded border border-slate-900 flex items-center justify-center gap-2 transition-colors font-sans shadow-sm"
            >
              <span>Kembali ke Katalog Malware SIJA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
