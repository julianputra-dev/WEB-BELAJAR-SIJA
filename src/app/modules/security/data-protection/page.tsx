// File: src/app/modules/security/data-protection/page.tsx
import React from 'react';
import { ModuleCurriculumView } from '@/components/layout/ModuleCurriculumView';

export default function DataProtectionPage() {
  return (
    <ModuleCurriculumView
      subjectName="Keamanan Sistem Informasi"
      subjectHref="/modules/security"
      moduleCode="SUB-SEC-03"
      title="Perlindungan Data: At Rest, In Transit, & In Use"
      description="Eksplorasi siklus hidup data digital dan mekanisme proteksi kriptografi modern saat data tersimpan dalam media penyimpanan, melintasi jaringan publik, atau sedang diproses di memori komputer."
      targetCompetencies={[
        'Menerapkan enkripsi disk penuh (Full Disk Encryption) untuk data at rest',
        'Mengonfigurasi protokol TLS/SSL dan enkripsi VPN untuk data in transit',
        'Memahami teknik enkripsi memori dan Trusted Execution Environment (TEE) untuk data in use',
        'Merancang kebijakan retensi dan penghapusan data secara aman (sanitasi media)',
      ]}
      syllabusUnits={[
        {
          title: 'Proteksi Data At Rest (Penyimpanan & Cadangan)',
          desc: 'Simulasi enkripsi volume penyimpanan menggunakan BitLocker/LUKS dan manajemen kunci enkripsi.',
        },
        {
          title: 'Proteksi Data In Transit (Transmisi Jaringan)',
          desc: 'Analisis inspeksi paket jaringan tanpa proteksi vs paket terenkripsi HTTPS/TLS melalui Wireshark.',
        },
        {
          title: 'Proteksi Data In Use (Pemrosesan Memori RAM)',
          desc: 'Pencegahan dump memori dan injeksi proses berbahaya pada aplikasi yang sedang mengeksekusi data rahasia.',
        },
      ]}
    />
  );
}
