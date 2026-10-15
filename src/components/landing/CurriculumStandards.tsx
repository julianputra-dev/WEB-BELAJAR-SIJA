// File: src/components/landing/CurriculumStandards.tsx
import React from 'react';

export function CurriculumStandards() {
  const standards = [
    {
      title: 'SKKNI Keamanan Jaringan',
      category: 'Standar Nasional',
      desc: 'Kesesuaian dengan unit kompetensi penanganan insiden keamanan sistem informasi nasional.',
    },
    {
      title: 'NIST SP 800-61 Rev. 2',
      category: 'Kerangka Kerja Global',
      desc: 'Panduan internasional mengenai siklus hidup respons dan penanganan insiden komputer.',
    },
    {
      title: 'Kurikulum SMK SIJA 4 Tahun',
      category: 'Pendidikan Menengah Kejuruan',
      desc: 'Integrasi penguasaan sistem, jaringan, dan aplikasi untuk kesiapan industri teknologi.',
    },
    {
      title: 'SNI ISO/IEC 27001',
      category: 'Tata Kelola Informasi',
      desc: 'Penerapan prinsip kerahasiaan, integritas, dan ketersediaan aset informasi digital.',
    },
  ];

  return (
    <section id="standar-industri" className="bg-white border-b border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-6">
          Keselarasan Standar Industri & Kurikulum
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((std, i) => (
            <div key={i} className="border-l-2 border-slate-400 pl-4 space-y-1">
              <div className="text-[11px] font-mono text-slate-500 uppercase">{std.category}</div>
              <div className="text-sm font-bold text-slate-900">{std.title}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{std.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
