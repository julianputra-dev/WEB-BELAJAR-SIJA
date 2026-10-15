// File: src/app/modules/networking/page.tsx
import React from 'react';
import { ModuleCurriculumView } from '@/components/layout/ModuleCurriculumView';

export default function NetworkingSubjectPage() {
  return (
    <ModuleCurriculumView
      subjectName="Portal Pembelajaran SIJA"
      subjectHref="/"
      moduleCode="MOD-SIJA-02"
      title="Jaringan Komputer & Infrastruktur Terdistribusi"
      description="Pilar mata pelajaran kejuruan yang mencakup perancangan topologi jaringan, pengalamatan IPv4/IPv6, protokol routing dinamis, switching VLAN enterprise, dan penegakan kebijakan firewall jaringan."
      targetCompetencies={[
        'Merancang dan menghitung skema subnetting VLSM untuk IPv4 dan prefix IPv6',
        'Mengonfigurasi switch manageable untuk segmentasi VLAN dan trunking 802.1Q',
        'Mengimplementasikan routing dinamis antar-area menggunakan protokol OSPF',
        'Mengamankan perimeter jaringan melalui Access Control List (ACL) dan NAT',
      ]}
      syllabusUnits={[
        {
          title: 'Topologi Fisik vs Logika & Pengalamatan IP',
          desc: 'Simulasi desain topologi hierarki enterprise (Core, Distribution, Access) dan manajemen subnetting.',
        },
        {
          title: 'Switching Enterprise, VLAN, & Inter-VLAN Routing',
          desc: 'Isolasi domain broadcast pada infrastruktur multi-departemen dan konfigurasi Router-on-a-Stick.',
        },
        {
          title: 'Routing Dinamis OSPF & Analisis Tabel Rute',
          desc: 'Pembentukan hubungan tetangga OSPF (adjacency), pertukaran Link-State Advertisement (LSA), dan konvergensi.',
        },
        {
          title: 'Konfigurasi Firewall, Stateful Inspection, & ACL',
          desc: 'Penyaringan lalu lintas paket berbasis IP sumber, IP tujuan, dan nomor porta protokol layanan.',
        },
      ]}
    />
  );
}
