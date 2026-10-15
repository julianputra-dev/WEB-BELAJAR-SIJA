// File: src/app/modules/systems/page.tsx
import React from 'react';
import { ModuleCurriculumView } from '@/components/layout/ModuleCurriculumView';

export default function SystemsSubjectPage() {
  return (
    <ModuleCurriculumView
      subjectName="Portal Pembelajaran SIJA"
      subjectHref="/"
      moduleCode="MOD-SIJA-03"
      title="Administrasi Sistem Operasi & Komputasi Awan"
      description="Pilar mata pelajaran kejuruan yang berfokus pada administrasi server Linux/Windows, konfigurasi layanan inti jaringan (DNS, DHCP, Web, Mail), virtualisasi bare-metal, dan kontainerisasi aplikasi modern."
      targetCompetencies={[
        'Mengelola hak akses berkas, proses, dan cron job pada sistem operasi Linux Server',
        'Mengonfigurasi layanan direktori dan domain controller Windows Server Active Directory',
        'Menerapkan virtualisasi server dan orkestrasi kontainer menggunakan Docker',
        'Menyusun prosedur pencadangan otomatis dan pemulihan bencana sistem (Disaster Recovery)',
      ]}
      syllabusUnits={[
        {
          title: 'Manajemen Server Linux & Layanan Direktori',
          desc: 'Pengoperasian antarmuka CLI, pengelolaan pengguna/grup, permissions chmod/chown, dan secure shell (SSH).',
        },
        {
          title: 'Layanan Jaringan Server (DNS, DHCP, Web Server)',
          desc: 'Instalasi dan pengujian layanan BIND9 DNS, Kea/ISC DHCP, serta web server Nginx dengan SSL/TLS.',
        },
        {
          title: 'Kontainerisasi Docker & Arsitektur Layanan',
          desc: 'Pembuatan Dockerfile, pengelolaan container lifecycle, volume persistensi, dan Docker Compose.',
        },
        {
          title: 'Pemantauan Layanan & Strategi Pencadangan Terjadwal',
          desc: 'Implementasi monitoring utilisasi sumber daya server dan skrip otomatisasi backup berkala.',
        },
      ]}
    />
  );
}
