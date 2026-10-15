// File: src/components/landing/PedagogySection.tsx
import React from 'react';
import { BookOpen, Terminal, CheckCircle2 } from 'lucide-react';

export function PedagogySection() {
  const steps = [
    {
      num: '01',
      title: 'Eksplorasi Konseptual & Analisis Sistem',
      icon: <BookOpen className="w-5 h-5" />,
      desc: 'Siswa mempelajari fondasi arsitektur dan menganalisis studi kasus riil: aliran paket jaringan, konfigurasi server, pemodelan data, serta identifikasi indikator anomali.',
      badge: 'Fase Analisis',
    },
    {
      num: '02',
      title: 'Praktik Terstruktur Berbasis SOP',
      icon: <Terminal className="w-5 h-5" />,
      desc: 'Menerapkan tahapan konfigurasi dan mitigasi melalui simulasi interaktif. Alur kerja tervalidasi secara deterministik untuk membiasakan kepatuhan terhadap standar industri.',
      badge: 'Fase Praktikum',
    },
    {
      num: '03',
      title: 'Evaluasi Capaian & Rekam Portofolio',
      icon: <CheckCircle2 className="w-5 h-5" />,
      desc: 'Setiap hasil eksperimen diverifikasi terhadap standar kompetensi. Umpan balik diagnostik membantu siswa memperbaiki kesalahan logika hingga mencapai status kompeten.',
      badge: 'Fase Verifikasi',
    },
  ];

  return (
    <section id="metodologi" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
            Metodologi Pedagogis
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Pendekatan Pembelajaran Vokasi Berbasis Simulasi
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Menghubungkan pemahaman teori dengan kecakapan teknis praktis melalui siklus belajar tiga
            fase yang terstruktur dan terukur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-slate-400">TAHAP {st.num}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {st.badge}
                </span>
              </div>
              <div className="w-10 h-10 rounded bg-slate-900 text-white flex items-center justify-center mb-4">
                {st.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{st.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
