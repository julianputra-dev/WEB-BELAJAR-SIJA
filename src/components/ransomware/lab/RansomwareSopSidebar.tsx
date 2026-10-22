// File: src/components/ransomware/lab/RansomwareSopSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, CheckCircle2, Circle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRansomwareLabStore } from '@/store/useRansomwareLabStore';
import { RansomwareMissionAccordion } from './RansomwareMissionAccordion';

export function RansomwareSopSidebar() {
  const { phase, completedSteps } = useRansomwareLabStore();

  const isAllCompleted =
    completedSteps.isolateNas &&
    completedSteps.wipePartition &&
    completedSteps.restoreBackup &&
    completedSteps.postValidation;

  const missions = [
    {
      id: 'step1',
      number: '1',
      title: 'Observasi & Transmisi Kriptografi Berkas',
      done: phase !== 'idle',
      active: phase === 'idle',
      symptomDesc:
        'Terdapat berkas mencurigakan dengan ekstensi ganda (.pdf.exe) di direktori kerja lokal. Amati lonjakan Disk I/O, eksekusi pemusnahan snapshot VSS, dan transformasi berkas menjadi ciphertext berentropi tinggi.',
      conceptReason:
        'Ransomware menggunakan enkripsi simetris cepat (AES-256) untuk mengenkripsi isi dokumen dan mengunci kuncinya dengan kunci publik asimetris (RSA-2048). Pola byte yang teratur diubah menjadi acakan semu berentropi ~7.96 sehingga data tidak dapat dibaca tanpa kunci privat.',
      realWorldDefense:
        'Sistem EDR (Endpoint Detection and Response) modern memonitor lonjakan entropi berkas dan panggilan API penghapusan snapshot vssadmin untuk memblokir proses ransomware sebelum enkripsi massal selesai.',
    },
    {
      id: 'step2',
      number: '2',
      title: 'Isolasi Jalur Perambatan Jaringan (Shared NAS)',
      done: completedSteps.isolateNas,
      active: phase === 'infected' && !completedSteps.isolateNas,
      symptomDesc:
        'Malware berusaha merambat ke direktori penyimpanan bersama (Z: NAS) melalui sesi SMB aktif. Segera putuskan koneksi penyimpanan jaringan sebelum berkas milik departemen lain ikut tersandera.',
      conceptReason:
        'Ransomware memindai seluruh letter drive yang terpasang di sistem operasi. Memutus sesi SMB secara langsung memotong hak akses tulis malware ke server jaringan bersama dan mencegah eskalasi lateral.',
      realWorldDefense:
        'Sesuai panduan NIST SP 800-61 r2, tindakan pertama penanganan insiden ransomware aktif adalah isolasi jaringan segera (Network Containment) baik melalui pemutusan fisik maupun isolasi VLAN terisolasi.',
    },
    {
      id: 'step3',
      number: '3',
      title: 'Pemusnahan Threat di RAM & Format Partisi OS',
      done: completedSteps.wipePartition,
      active: completedSteps.isolateNas && !completedSteps.wipePartition,
      symptomDesc:
        'Proses enkripsi masih berjalan aktif di memori kerja (RAM). Lakukan sterilisasi total dengan memformat partisi sistem operasi yang terinfeksi untuk memusnahkan seluruh proses berbahaya dan artefak registri.',
      conceptReason:
        'Menghapus berkas biner saja tidak memadai karena kode perusak masih bercokol di memori RAM dan persistence keys. Menghubungkan media cadangan saat RAM masih terinfeksi adalah kesalahan fatal yang akan mengontaminasi cadangan.',
      realWorldDefense:
        'Praktik terbaik industri (SANS Incident Handling) mewajibkan reimaging sistem operasi dari citra steril tepercaya (Golden Image) untuk memastikan tiada celah backdoor atau thread tersembunyi yang tersisa.',
    },
    {
      id: 'step4',
      number: '4',
      title: 'Pemasangan Media Steril & Restorasi Backup',
      done: completedSteps.restoreBackup,
      active: completedSteps.wipePartition && !completedSteps.restoreBackup,
      symptomDesc:
        'Setelah sistem operasi dipastikan steril dan bersih, pasang media cadangan eksternal (Air-Gapped Drive) dan pulihkan seluruh berkas kerja. Sistem akan memulihkan data, menyambungkan kembali Shared NAS (Z:), dan melepas media cadangan E: agar tetap terisolasi di brankas fisik.',
      conceptReason:
        'Prinsip cadangan data 3-2-1 mensyaratkan minimal satu salinan terisolasi secara fisik (Air-Gapped) dan berstatus WORM (Write Once Read Many). Salinan ini aman dari serangan malware jaringan karena tidak terhubung saat insiden terjadi.',
      realWorldDefense:
        'Badan Siber dan Sandi Negara (BSSN) serta FBI merekomendasikan agar korban ransomware tidak pernah membayar tebusan, melainkan memulihkan data dari salinan cadangan offline yang telah divalidasi checksum-nya.',
    },
    {
      id: 'step5',
      number: '5',
      title: 'Hardening & Penguatan Kebijakan Pasca-Mitigasi',
      done: completedSteps.postValidation,
      active: completedSteps.restoreBackup && !completedSteps.postValidation,
      symptomDesc:
        'Terapkan Software Restriction Policy (SRP) atau aturan AppLocker untuk memblokir eksekusi biner berekstensi ganda di folder dokumen pengguna, lalu uji coba validitas pencegahan.',
      conceptReason:
        'Penerapan Group Policy Object (GPO) membatasi eksekusi berkas executable (.exe, .bat, .vbs) di luar direktori Program Files dan Windows, mencegah pengguna awam mengeksekusi lampiran malware rekayasa sosial di masa mendatang.',
      realWorldDefense:
        'Implementasi Application Allowlisting (seperti Windows Defender Application Control / WDAC) merupakan kontrol preventif tier-1 dalam kerangka CIS Critical Security Controls.',
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
          <p className="text-[11px] text-slate-500 mt-0.5">
            Analisis gejala di setiap panel dan tentukan urutan SOP penanganan yang benar.
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
              <RansomwareMissionAccordion
                stepTitle={m.title}
                isUnlocked={m.done}
                conceptReason={m.conceptReason}
                realWorldDefense={m.realWorldDefense}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Completion Banner */}
      {isAllCompleted && (
        <div className="pt-3 border-t border-slate-200 mt-2 space-y-2">
          <div className="p-2.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Laboratorium Forensik Ransomware Tuntas!</div>
              <div className="text-[10.5px] mt-0.5 text-emerald-900 leading-snug">
                Seluruh data berhasil diselamatkan tanpa membayar tebusan, dan sistem telah diperkuat dengan kebijakan proteksi biner.
              </div>
            </div>
          </div>

          <Link
            href="/modules/security/trojan/intro"
            className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>Materi Selanjutnya: Trojan Horse</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </aside>
  );
}
