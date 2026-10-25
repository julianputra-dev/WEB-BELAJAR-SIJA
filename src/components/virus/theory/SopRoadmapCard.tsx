// File: src/components/virus/theory/SopRoadmapCard.tsx
import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Cpu,
  Lock,
  Archive,
  CheckCircle2
} from 'lucide-react';

export function SopRoadmapCard() {
  const sopSteps = [
    {
      step: '01',
      title: 'Triage Proses Memori (Process Triage)',
      desc: 'Buka Process Explorer, analisis daftar PID yang berjalan, temukan proses berbahaya (setup_game.exe PID 3844), dan lakukan penghentian proses (SIGKILL).',
      icon: <Cpu className="w-4 h-4 text-slate-800" />,
    },
    {
      step: '02',
      title: 'Booting Mode Diagnostik (Safe Mode & Registry)',
      desc: 'Beralih ke Diagnostic Mode untuk mengisolasi driver grafis non-esensial dan memproteksi kunci registri SafeBoot agar kode parasit tidak dapat memuat ulang diri.',
      icon: <Lock className="w-4 h-4 text-slate-800" />,
    },
    {
      step: '03',
      title: 'Isolasi Biner Pembawa (Quarantine Vault)',
      desc: 'Pindahkan berkas pembawa utama (setup_game.exe) ke brankas karantina dengan mencabut seluruh izin eksekusi berkas pada partisi penyimpanan.',
      icon: <Archive className="w-4 h-4 text-slate-800" />,
    },
    {
      step: '04',
      title: 'Pemulihan Header PE & Validasi Hash SHA-256',
      desc: 'Pangkas 348 KB muatan parasit dari biner host, kembalikan nilai AddressOfEntryPoint asli, dan hitung ulang checksum SHA-256 hingga cocok 100% dengan baseline.',
      icon: <CheckCircle2 className="w-4 h-4 text-slate-800" />,
    },
  ];

  return (
    <section className="bg-slate-900 text-white rounded-xl p-6 md:p-8 border border-slate-800 shadow-sm mb-12">
      <div className="max-w-3xl space-y-3 mb-6">
        <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
          Prosedur Operasional Standar (SOP) Praktikum
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Alur Kerja Investigasi & Remediasi di Ruang Kerja Laboratorium
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Di dalam kanvas laboratorium simulasi, Anda tidak akan menemukan tombol instan. Setiap langkah
          mengharuskan Anda membaca data proses, membandingkan hash kriptografi, dan mengambil keputusan teknis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {sopSteps.map((st, i) => (
          <div key={i} className="p-4 rounded bg-slate-800/90 border border-slate-700 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400">LANGKAH {st.step}</span>
                <div className="p-1 rounded bg-slate-700 text-slate-200">{st.icon}</div>
              </div>
              <h3 className="text-xs font-bold text-white">{st.title}</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">{st.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-400 font-mono">
          Prasyarat Teori Selesai • Siap Masuk ke Lingkungan Simulasi Terisolasi
        </div>
        <Link
          href="/modules/security/virus/lab"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
        >
          <span>Masuk ke Ruang Kerja Lab Forensik</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
