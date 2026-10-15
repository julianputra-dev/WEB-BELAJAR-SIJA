// File: src/components/virus/theory/VirusFundamentalsSection.tsx
import React from 'react';
import { HelpCircle, FileCheck, MousePointerClick, RefreshCcw, ShieldAlert, Cpu } from 'lucide-react';

export function VirusFundamentalsSection() {
  const characteristics = [
    {
      title: 'Membutuhkan Berkas Inang (Host)',
      desc: 'Tidak dapat berdiri sebagai berkas independen. Virus harus menempel pada program sah (seperti file .exe atau .dll) layaknya benalu.',
      icon: <FileCheck className="w-4 h-4 text-slate-800" />,
    },
    {
      title: 'Memerlukan Pemicu Pengguna',
      desc: 'Tidak menyebar otomatis seperti worm. Virus baru aktif dan berjalan di memori jika pengguna mengklik atau mengeksekusi berkas inangnya.',
      icon: <MousePointerClick className="w-4 h-4 text-slate-800" />,
    },
    {
      title: 'Memodifikasi Kode Biner Asli',
      desc: 'Menyisipkan potongan kode parasit ke dalam biner inang agar saat program dijalankan, kode virus dieksekusi terlebih dahulu.',
      icon: <RefreshCcw className="w-4 h-4 text-slate-800" />,
    },
  ];

  const lifecycle = [
    {
      phase: '1. Fase Tertidur (Dormant)',
      desc: 'Virus bersembunyi pasif di dalam berkas penyimpanan tanpa memunculkan gejala agar tidak dicurigai pengguna.',
    },
    {
      phase: '2. Fase Pemicuan (Trigger)',
      desc: 'Pengguna mengeksekusi berkas inang (misal setup_game.exe), memindahkan kode virus dari disk ke memori RAM.',
    },
    {
      phase: '3. Fase Replikasi (Propagation)',
      desc: 'Virus memindai folder lokal dan menyuntikkan salinan kode parasitnya ke berkas biner executable lain yang sehat.',
    },
    {
      phase: '4. Fase Eksekusi Muatan (Payload)',
      desc: 'Muatan perusak aktif: membebani prosesor (CPU spike), merusak struktur data, atau menonaktifkan proteksi sistem.',
    },
  ];

  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Fondasi Konseptual
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-slate-800" />
          Apa Itu Virus Komputer &amp; Bagaimana Cara Kerjanya?
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Seringkali istilah &quot;virus&quot; disalahartikan sebagai sebutan untuk semua jenis malware.
          Secara teknis forensik, virus memiliki karakteristik biologis: membutuhkan inang untuk bertahan hidup
          dan membutuhkan tindakan inang untuk menyebar.
        </p>
      </div>

      {/* 3 Karakteristik Pembeda */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {characteristics.map((c, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-slate-100">{c.icon}</div>
              <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* 4 Tahapan Siklus Hidup */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-700" />
            <span>Siklus Hidup Infeksi Virus (Empat Tahap Kerja)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Logika Kerja Parasit</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          {lifecycle.map((lc, i) => (
            <div key={i} className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900">{lc.phase}</div>
              <p className="text-[11px] font-sans text-slate-600 leading-relaxed">{lc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
