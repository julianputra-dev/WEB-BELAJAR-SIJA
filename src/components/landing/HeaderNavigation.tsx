// File: src/components/landing/HeaderNavigation.tsx
import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight } from 'lucide-react';

export function HeaderNavigation() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Brand Identitas */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded bg-slate-900 flex items-center justify-center text-white border border-slate-800 group-hover:bg-slate-800 transition-colors">
            <Layers className="w-5 h-5 text-slate-100" />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900 tracking-tight leading-none">
              SIJA E-Learning Portal
            </div>
            <div className="text-[11px] text-slate-500 font-medium tracking-tight mt-1">
              Sistem Informasi, Jaringan, dan Aplikasi
            </div>
          </div>
        </Link>

        {/* Menu Navigasi Akademik Netral */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-600">
          <a href="#mata-pelajaran" className="hover:text-slate-950 transition-colors">
            Pilar Kurikulum
          </a>
          <a href="#fasilitas-lab" className="hover:text-slate-950 transition-colors">
            Fasilitas Praktikum
          </a>
          <a href="#metodologi" className="hover:text-slate-950 transition-colors">
            Metode Belajar
          </a>
          <a href="#standar-industri" className="hover:text-slate-950 transition-colors">
            Standar Acuan
          </a>
        </nav>

        {/* Akses Modul Kurikulum */}
        <div className="flex items-center gap-3">
          <a
            href="#mata-pelajaran"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-medium tracking-wide rounded border border-slate-900 transition-colors shadow-sm"
          >
            <span>Akses Kurikulum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
