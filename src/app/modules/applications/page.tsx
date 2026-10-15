// File: src/app/modules/applications/page.tsx
import React from 'react';
import { ModuleCurriculumView } from '@/components/layout/ModuleCurriculumView';

export default function ApplicationsSubjectPage() {
  return (
    <ModuleCurriculumView
      subjectName="Portal Pembelajaran SIJA"
      subjectHref="/"
      moduleCode="MOD-SIJA-04"
      title="Rekayasa Perangkat Lunak, Basis Data, & DevOps"
      description="Pilar mata pelajaran kejuruan yang menekankan pengembangan aplikasi web terstruktur, perancangan basis data relasional ternormalisasi, integrasi antarmuka program aplikasi (API), serta otomatisasi alur kerja."
      targetCompetencies={[
        'Membangun antarmuka web interaktif menggunakan framework modern dan Tailwind CSS',
        'Merancang Entity Relationship Diagram (ERD) dan mengeksekusi kueri SQL kompleks',
        'Mengembangkan layanan backend RESTful API yang aman dengan otentikasi JWT',
        'Menerapkan kontrol versi Git dan continuous integration/continuous deployment (CI/CD)',
      ]}
      syllabusUnits={[
        {
          title: 'Rekayasa Frontend Web Modern',
          desc: 'Komposisi komponen modular, reaktivitas state manajemen sisi klien, dan integrasi responsif lintas perangkat.',
        },
        {
          title: 'Pemodelan Basis Data Relasional & SQL',
          desc: 'Normalisasi basis data (1NF - 3NF), relasi tabel, indexing performa kueri, dan transaksi ACID.',
        },
        {
          title: 'Pengembangan Backend & RESTful API Architecture',
          desc: 'Pembuatan endpoint CRUD, validasi skema request, proteksi rate limiting, dan dokumentasi OpenAPI/Swagger.',
        },
        {
          title: 'Alur Kerja Git Terdistribusi & Dasar CI/CD',
          desc: 'Branching strategy, pull request review, dan otomatisasi pengujian kode sebelum deploy ke lingkungan produksi.',
        },
      ]}
    />
  );
}
