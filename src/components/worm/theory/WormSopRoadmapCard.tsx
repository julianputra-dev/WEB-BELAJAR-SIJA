// File: src/components/worm/theory/WormSopRoadmapCard.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Network, Lock, Cpu, CheckCircle2, AlertTriangle } from 'lucide-react';

export function WormSopRoadmapCard() {
  const sopSteps = [
    {
      step: '01',
      title: 'Isolasi Fisik / Logika Jaringan (Disconnect LAN)',
      desc: 'Putus koneksi antarmuka jaringan workstation yang terinfeksi untuk menghentikan pengiriman paket eksploitasi ke komputer lain di laboratorium secara instan.',
      icon: <Network className="w-4 h-4 text-slate-200" />,
    },
    {
      step: '02',
      title: 'Penutupan Celah Port Rentan (Block Port 445)',
      desc: 'Konfigurasikan Host Firewall untuk memblokir port SMB 445 agar worm dari node tetangga yang masih aktif tidak dapat menyusup kembali.',
      icon: <Lock className="w-4 h-4 text-slate-200" />,
    },
    {
      step: '03',
      title: 'Terminasi Thread Proses di RAM (SIGKILL)',
      desc: 'Buka Task Manager simulasi, identifikasi thread berbahaya "worm_service.exe", dan matikan proses dari memori kerja komputer.',
      icon: <Cpu className="w-4 h-4 text-slate-200" />,
    },
    {
      step: '04',
      title: 'Rekoneksi Jaringan & Audit Bebas Re-Infeksi',
      desc: 'Sambungkan kembali kabel LAN, pantau telemetri lalu lintas antarmuka jaringan, dan pastikan tidak ada upaya infeksi ulang yang berhasil.',
      icon: <CheckCircle2 className="w-4 h-4 text-slate-200" />,
    },
  ];

  return (
    <section className="bg-slate-900 text-white rounded-xl p-6 md:p-8 border border-slate-800 shadow-sm mb-12">
      <div className="max-w-3xl space-y-3 mb-6">
        <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
          Prosedur Operasional Standar (SOP) Praktikum
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Alur Mitigasi Insiden Wabah Network Worm (NIST SP 800-61)
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Dalam simulasi laboratorium topologi jaringan, urutan tindakan menentukan keberhasilan.
          Menjalankan prosedur di luar urutan sebab-akibat akan memicu infeksi ulang seketika.
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

      {/* Forensic Cause-and-Effect Warning */}
      <div className="p-3.5 rounded bg-slate-800/80 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5 font-sans mb-6">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Peringatan Sebab-Akibat Forensik:</strong> Jika siswa membersihkan proses di RAM atau menyambungkan kembali kabel LAN sebelum menutup celah Port 445 pada firewall, workstation akan langsung terinfeksi ulang (re-infected) dalam hitungan detik oleh node tetangga di jaringan!
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-400 font-mono">
          Prasyarat Teori Selesai • Siap Masuk ke Lingkungan Simulasi Topologi
        </div>
        <Link
          href="/modules/security/malware/lab/worm"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
        >
          <span>Masuk ke Lab Simulasi Topologi</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
