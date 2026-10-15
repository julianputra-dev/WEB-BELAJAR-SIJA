// File: src/components/landing/SubjectGrid.tsx
import React from 'react';
import { Network, Shield, Server, Code2 } from 'lucide-react';
import { SubjectCard, SubjectItem } from './SubjectCard';

const SUBJECTS_DATA: SubjectItem[] = [
  {
    id: 'networking',
    code: 'MOD-SIJA-01',
    title: 'Jaringan Komputer & Infrastruktur',
    description:
      'Perancangan arsitektur jaringan komputer, pengalamatan IPv4/IPv6, routing dinamis OSPF, segmentasi VLAN enterprise, dan penegakan kebijakan dinding api (firewall).',
    href: '/modules/networking',
    icon: <Network className="w-5 h-5 text-slate-800" />,
    badge: 'Pilar Kejuruan 01',
    topics: [
      'Topologi Jaringan Hierarki & Subnetting VLSM',
      'Routing Statis & Dinamis (OSPF Multi-Area)',
      'Segmentasi VLAN Enterprise & Trunking 802.1Q',
      'Keamanan Perimeter Jaringan & Access Control List',
    ],
  },
  {
    id: 'security',
    code: 'MOD-SIJA-02',
    title: 'Keamanan Sistem Informasi',
    description:
      'Tata kelola proteksi aset digital, prinsip fundamental CIA Triad, perlindungan data, analisis kerentanan aplikasi web, serta prosedur investigasi insiden siber.',
    href: '/modules/security',
    icon: <Shield className="w-5 h-5 text-slate-800" />,
    badge: 'Pilar Kejuruan 02',
    topics: [
      'Prinsip Dasar CIA Triad & Model Kontrol Akses',
      'Proteksi Data (At Rest, In Transit, In Use)',
      'Keamanan Aplikasi Web & Mitigasi OWASP Top 10',
      'Investigasi Anomali & Standar Prosedur Mitigasi',
    ],
  },
  {
    id: 'systems',
    code: 'MOD-SIJA-03',
    title: 'Administrasi Sistem & Server',
    description:
      'Instalasi, konfigurasi, dan pemeliharaan sistem operasi server Linux dan Windows, manajemen direktori aktif, kontainerisasi aplikasi, serta strategi pemulihan bencana.',
    href: '/modules/systems',
    icon: <Server className="w-5 h-5 text-slate-800" />,
    badge: 'Pilar Kejuruan 03',
    topics: [
      'Administrasi Layanan Server Linux & Windows',
      'Virtualisasi & Kontainerisasi (Docker)',
      'Layanan Infrastruktur (DNS, DHCP, Web Server)',
      'Manajemen Backup & Rencana Disaster Recovery',
    ],
  },
  {
    id: 'applications',
    code: 'MOD-SIJA-04',
    title: 'Rekayasa Perangkat Lunak & Basis Data',
    description:
      'Pengembangan aplikasi web terdistribusi, perancangan basis data relasional ternormalisasi, integrasi Application Programming Interface (API), serta otomatisasi alur kerja.',
    href: '/modules/applications',
    icon: <Code2 className="w-5 h-5 text-slate-800" />,
    badge: 'Pilar Kejuruan 04',
    topics: [
      'Rekayasa Frontend Web Modern & Responsif',
      'Pemodelan Data Relasional (ERD & Kueri SQL)',
      'Arsitektur RESTful API & Keamanan Token JWT',
      'Siklus Hidup Pengembangan & Version Control Git',
    ],
  },
];

export function SubjectGrid() {
  return (
    <section id="mata-pelajaran" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
            Struktur Kurikulum SIJA
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Empat Pilar Mata Pelajaran Kejuruan Terpadu
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Kurikulum SIJA mengintegrasikan kompetensi sistem informasi, jaringan, dan aplikasi ke
            dalam empat ranah keilmuan modular. Setiap mata pelajaran dilengkapi dengan silabus
            komprehensif dan ruang praktikum terintegrasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUBJECTS_DATA.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </div>
    </section>
  );
}
