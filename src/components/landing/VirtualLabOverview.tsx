// File: src/components/landing/VirtualLabOverview.tsx
import React from 'react';
import Link from 'next/link';
import { Network, Shield, Server, Code2, ArrowRight } from 'lucide-react';

export function VirtualLabOverview() {
  const labFacilities = [
    {
      id: 'net-lab',
      title: 'Simulator Topologi Jaringan',
      desc: 'Pemodelan skema interkoneksi, routing dinamis OSPF, segmentasi VLAN, dan analisis paket protokol jaringan.',
      icon: <Network className="w-5 h-5 text-slate-800" />,
      href: '/modules/networking',
      badge: 'Jaringan Komputer',
    },
    {
      id: 'sec-lab',
      title: 'Lab Analisis & Keamanan Siber',
      desc: 'Investigasi telemetri anomali, penegakan SOP mitigasi insiden, evaluasi CIA Triad, dan proteksi aset data.',
      icon: <Shield className="w-5 h-5 text-slate-800" />,
      href: '/modules/security',
      badge: 'Keamanan Sistem',
    },
    {
      id: 'sys-lab',
      title: 'Konsol Administrasi Server',
      desc: 'Simulasi konfigurasi layanan Linux/Windows server, manajemen DNS/DHCP, dan orkestrasi kontainer Docker.',
      icon: <Server className="w-5 h-5 text-slate-800" />,
      href: '/modules/systems',
      badge: 'Sistem Operasi',
    },
    {
      id: 'app-lab',
      title: 'Studio Rekayasa Perangkat Lunak',
      desc: 'Perancangan struktur basis data relasional, pengujian kueri SQL kompleks, dan integrasi antarmuka REST API.',
      icon: <Code2 className="w-5 h-5 text-slate-800" />,
      href: '/modules/applications',
      badge: 'Aplikasi & Data',
    },
  ];

  return (
    <section id="fasilitas-lab" className="py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
            Lingkungan Praktikum Digital
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Fasilitas Laboratorium Virtual Terpadu
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Platform menyediakan ruang simulasi interaktif untuk setiap ranah keahlian vokasi SIJA,
            memungkinkan siswa bereksperimen dengan skenario nyata tanpa ketergantungan perangkat keras berbiaya tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {labFacilities.map((lab) => (
            <div
              key={lab.id}
              className="bg-slate-50 border border-slate-200 hover:border-slate-400 rounded-lg p-5 flex flex-col justify-between transition-colors shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded bg-white border border-slate-200">
                    {lab.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    {lab.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{lab.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{lab.desc}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200">
                <Link
                  href={lab.href}
                  className="inline-flex items-center justify-between w-full text-xs font-semibold text-slate-800 hover:text-blue-900 transition-colors group"
                >
                  <span>Buka Silabus Modul</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
