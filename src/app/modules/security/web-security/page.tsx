// File: src/app/modules/security/web-security/page.tsx
import React from 'react';
import { ModuleCurriculumView } from '@/components/layout/ModuleCurriculumView';

export default function WebSecurityPage() {
  return (
    <ModuleCurriculumView
      subjectName="Keamanan Sistem Informasi"
      subjectHref="/modules/security"
      moduleCode="SUB-SEC-04"
      title="Keamanan Aplikasi Web & Mitigasi Kerentanan OWASP"
      description="Studi mendalam mengenai vektor serangan terhadap aplikasi web modern berbasis konsorsium OWASP Top 10, disertai metodologi pengujian keamanan dan penerapan Web Application Firewall (WAF)."
      targetCompetencies={[
        'Mengidentifikasi dan memitigasi kerentanan SQL Injection (SQLi) dan Cross-Site Scripting (XSS)',
        'Menerapkan sanitasi input dan prepared statements pada backend server',
        'Mengonfigurasi header keamanan HTTP (CSP, HSTS, X-Frame-Options)',
        'Melakukan audit keamanan dasar pada formulir autentikasi dan manajemen sesi',
      ]}
      syllabusUnits={[
        {
          title: 'Vektor Injeksi: SQLi dan Command Injection',
          desc: 'Simulasi bypass autentikasi login menggunakan payload SQL Injection dan langkah perbaikan query parameter.',
        },
        {
          title: 'Kerentanan Sisi Klien: XSS & CSRF',
          desc: 'Analisis pencurian session cookie melalui injeksi script berbahaya dan proteksi token anti-CSRF.',
        },
        {
          title: 'Penerapan Header Keamanan & Hardening Server Web',
          desc: 'Konfigurasi Content Security Policy (CSP) dan proteksi clickjacking pada server Nginx / Apache.',
        },
      ]}
    />
  );
}
