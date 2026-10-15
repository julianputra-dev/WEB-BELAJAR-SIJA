// File: src/app/modules/security/cia-triad/page.tsx
import React from 'react';
import { ModuleCurriculumView } from '@/components/layout/ModuleCurriculumView';

export default function CiaTriadPage() {
  return (
    <ModuleCurriculumView
      subjectName="Keamanan Sistem Informasi"
      subjectHref="/modules/security"
      moduleCode="SUB-SEC-02"
      title="Prinsip Dasar CIA Triad & Tata Kelola Keamanan"
      description="Pemahaman komprehensif mengenai tiga pilar fundamental keamanan informasi: Kerahasiaan (Confidentiality), Integritas (Integrity), dan Ketersediaan (Availability) dalam infrastruktur enterprise."
      targetCompetencies={[
        'Menganalisis skenario ancaman berdasarkan pelanggaran pilar CIA Triad',
        'Merancang kontrol akses berbasis peran (Role-Based Access Control / RBAC)',
        'Memverifikasi integritas data menggunakan fungsi hash satu arah',
        'Menyusun strategi redundansi sistem untuk menjaga ketersediaan layanan',
      ]}
      syllabusUnits={[
        {
          title: 'Konsep Kerahasiaan & Model Kontrol Akses',
          desc: 'Pengenalan otorisasi, autentikasi, enkripsi simetris/asimetris, dan pencegahan kebocoran data sensitif.',
        },
        {
          title: 'Penjaminan Integritas & Nilai Hash Kriptografi',
          desc: 'Simulasi deteksi modifikasi data ilegal melalui kalkulasi checksum SHA-256 dan sertifikat digital.',
        },
        {
          title: 'Ketersediaan & Arsitektur Redundansi Sistem',
          desc: 'Analisis dampak serangan Denial-of-Service (DoS), konfigurasi failover server, dan load balancer.',
        },
      ]}
    />
  );
}
