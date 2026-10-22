// File: src/components/worm/lab/WormMissionSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { WormConceptCard } from './WormConceptCard';
import { CheckCircle2, Circle, ShieldCheck, Compass, ArrowRight } from 'lucide-react';

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
            Analisis anomali topologi jaringan dan terapkan urutan SOP penanganan insiden yang benar.
          </p>
        </div>

        {/* Mission Steps List */}
        <div className="space-y-2">
          {missions.map((m) => (
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
              <WormConceptCard
                title={m.title}
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
        <div className="pt-3 border-t border-slate-200 mt-2 space-y-2">
          <div className="p-2.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Laboratorium Topologi Network Worm Tuntas!</div>
              <div className="text-[10.5px] mt-0.5 text-emerald-900 leading-snug">
                Seluruh workstation telah diisolasi, celah Port 445 ditutup di Firewall, memori RAM dibersihkan, dan rekoneksi LAN sukses tanpa siklus re-infeksi.
              </div>
            </div>
          </div>

          <button
            onClick={runPostHardeningTest}
            className="w-full py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors font-mono shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
            <span>Uji Ulang Ketahanan (Re-Attack Test)</span>
          </button>

          <Link
            href="/modules/security/ransomware/intro"
            className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>Materi Selanjutnya: Ransomware</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </aside>
  );
}
