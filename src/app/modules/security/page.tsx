// File: src/app/modules/security/page.tsx
import React from 'react';
import Link from 'next/link';
import {
  Shield,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Lock,
  Database,
  Globe,
  Bug,
} from 'lucide-react';

export default function SecuritySubjectPage() {
  const subtopics = [
    {
      id: 'malware',
      title: 'Analisis & Simulasi Malware',
      desc: 'Observasi 5 skenario malware di lingkungan terisolasi serta validasi SOP mitigasi berurutan.',
      href: '/modules/security/malware',
      icon: <Bug className="w-5 h-5 text-slate-800" />,
      badge: '5 Lab Tersedia',
    },
    {
      id: 'cia-triad',
      title: 'Prinsip Dasar CIA Triad',
      desc: 'Fondasi Confidentiality, Integrity, dan Availability dalam tata kelola keamanan informasi.',
      href: '/modules/security/cia-triad',
      icon: <Lock className="w-5 h-5 text-slate-600" />,
      badge: 'Silabus Kurikulum',
    },
    {
      id: 'data-protection',
      title: 'Keamanan Data: Transit, Rest, In-Use',
      desc: 'Proteksi kriptografi data saat tersimpan di disk, ditransmisikan di jaringan, dan diproses di RAM.',
      href: '/modules/security/data-protection',
      icon: <Database className="w-5 h-5 text-slate-600" />,
      badge: 'Silabus Kurikulum',
    },
    {
      id: 'web-security',
      title: 'Keamanan Web & OWASP Top 10',
      desc: 'Analisis kerentanan aplikasi web (SQLi, XSS, CSRF) dan konfigurasi proteksi firewall.',
      href: '/modules/security/web-security',
      icon: <Globe className="w-5 h-5 text-slate-600" />,
      badge: 'Silabus Kurikulum',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 md:py-8 w-full flex-1">
        {/* Header Dasbor Ringkas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-slate-800" />
              Keamanan Sistem Informasi
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Modul pembelajaran tata kelola keamanan aset digital, kepatuhan CIA Triad, dan simulasi respons insiden.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded border border-slate-300 transition-colors shrink-0 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Grid Sub-Topik Keamanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subtopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between hover:border-slate-400 transition-colors shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded bg-slate-100 border border-slate-200">
                    {topic.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                    {topic.badge}
                  </span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">{topic.title}</h2>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{topic.desc}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href={topic.href}
                  className="inline-flex items-center justify-between w-full text-xs font-semibold text-slate-900 hover:text-blue-900 transition-colors group"
                >
                  <span>Buka Modul & Laboratorium</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
