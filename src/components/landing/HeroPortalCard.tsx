// File: src/components/landing/HeroPortalCard.tsx
import React from 'react';
import Link from 'next/link';
import { Network, Shield, Server, Code2, ChevronRight } from 'lucide-react';

export function HeroPortalCard() {
  const subjectPillars = [
    {
      title: 'Jaringan Komputer & Infrastruktur',
      desc: 'Topologi, Routing, VLAN & Firewall',
      href: '/modules/networking',
      icon: <Network className="w-3.5 h-3.5 text-slate-700" />,
    },
    {
      title: 'Keamanan Sistem Informasi',
      desc: 'CIA Triad, Proteksi Data & Mitigasi Insiden',
      href: '/modules/security',
      icon: <Shield className="w-3.5 h-3.5 text-slate-700" />,
    },
    {
      title: 'Administrasi Sistem & Server',
      desc: 'Linux, Windows Server & Virtualisasi',
      href: '/modules/systems',
      icon: <Server className="w-3.5 h-3.5 text-slate-700" />,
    },
    {
      title: 'Rekayasa Perangkat Lunak',
      desc: 'Web Full-Stack, Basis Data & API',
      href: '/modules/applications',
      icon: <Code2 className="w-3.5 h-3.5 text-slate-700" />,
    },
  ];

  return (
    <div className="bg-slate-50 border border-slate-300 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
            Status Kurikulum Vokasi
          </div>
          <div className="text-sm font-bold text-slate-900">
            DOKUMEN: SIJA-ACAD-2026
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
          TERINTEGRASI
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between py-1 border-b border-slate-200">
          <span className="text-slate-500">Program Keahlian</span>
          <span className="font-semibold text-slate-900 font-mono">SIJA 4 Tahun</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-200">
          <span className="text-slate-500">Domain Keilmuan</span>
          <span className="font-semibold text-slate-900 font-mono">4 Bidang Kejuruan</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-200">
          <span className="text-slate-500">Metode Pengajaran</span>
          <span className="font-semibold text-slate-900 font-mono">Praktik & Simulasi Digital</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-200">
          <span className="text-slate-500">Standar Acuan</span>
          <span className="font-semibold text-slate-900 font-mono">SKKNI & Kurikulum Nasional</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200">
        <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
          Pilar Mata Pelajaran Terpadu:
        </div>
        <div className="space-y-1.5">
          {subjectPillars.map((p, idx) => (
            <Link
              key={idx}
              href={p.href}
              className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 hover:border-slate-400 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-slate-100">{p.icon}</div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-900">
                    {p.title}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">{p.desc}</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
