// File: src/components/ransomware/theory/RansomwareSopRoadmapCard.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Server, Trash2, DatabaseBackup, AlertTriangle } from 'lucide-react';

export function RansomwareSopRoadmapCard() {
  const sopSteps = [
    {
      step: '01',
      title: 'Isolasi Penyimpanan Jaringan (Disconnect NAS)',
      desc: 'Putuskan koneksi logika SMB/CIFS ke Network Attached Storage (NAS) dan putus koneksi jaringan workstation untuk mencegah perambatan enkripsi ke server bersama.',
      icon: <Server className="w-4 h-4 text-slate-200" />,
    },
    {
      step: '02',
      title: 'Format & Bersihkan Partisi OS Terinfeksi (Eradication)',
      desc: 'Lakukan format menyeluruh pada partisi sistem yang terinfeksi untuk memusnahkan seluruh thread proses ransomware di RAM, entri registri, dan biner muatan berbahaya.',
      icon: <Trash2 className="w-4 h-4 text-slate-200" />,
    },
    {
      step: '03',
      title: 'Pemulihan Data Cadangan (Restore Offline Backup)',
      desc: 'Setelah lingkungan sistem operasi dipastikan steril, hubungkan media penyimpanan offline (Air-Gapped Drive) dan pulihkan seluruh berkas kerja tanpa membayar tebusan.',
      icon: <DatabaseBackup className="w-4 h-4 text-slate-200" />,
    },
  ];

  return (
    <section className="bg-slate-900 text-white rounded-xl p-6 md:p-8 border border-slate-800 shadow-sm mb-12">
      <div className="max-w-3xl space-y-3 mb-6">
        <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
          Prosedur Operasional Standar (SOP) Praktikum
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Alur Penanganan Insiden Ransomware (NIST SP 800-61 / SANS PICERL)
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Dalam simulasi laboratorium keamanan sistem informasi, urutan mitigasi memiliki konsekuensi nyata.
          Melompati tahapan penanganan akan memicu kontaminasi cadangan data secara permanen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {sopSteps.map((st, i) => (
          <div key={i} className="p-4 rounded bg-slate-800/90 border border-slate-700 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400">LANGKAH {st.step}</span>
                <div className="p-1.5 rounded bg-slate-700 text-slate-200">{st.icon}</div>
              </div>
              <h3 className="text-xs font-bold text-white leading-snug">{st.title}</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{st.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Forensic Cause-and-Effect Warning */}
      <div className="p-3.5 rounded bg-slate-800/80 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5 font-sans mb-6">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Peringatan Sebab-Akibat Forensik:</strong> Jangan pernah menghubungkan media cadangan data (Offline Backup Drive) sebelum partisi sistem operasi selesai diformat dan disterilkan pada Langkah 2. Proses ransomware yang masih aktif di memori kerja akan langsung mengenkripsi seluruh berkas cadangan Anda seketika!
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-400 font-mono">
          Prasyarat Teori Selesai • Siap Masuk ke Lingkungan Simulasi Sandboxing
        </div>
        <Link
          href="/modules/security/ransomware/lab"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
        >
          <span>Masuk ke Ruang Kerja Lab Ransomware</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
