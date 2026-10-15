// File: src/components/landing/HeroSection.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { HeroPortalCard } from './HeroPortalCard';

export function HeroSection() {
  return (
    <section className="pt-4 md:pt-6 pb-12 md:pb-16 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Kolom Kiri: Pernyataan Portal SIJA & Call to Action (7 Kolom) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-300 rounded">
              <span>Kurikulum Vokasi SIJA 4 Tahun</span>
              <span className="text-slate-400">/</span>
              <span>Platform Pembelajaran Digital</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]">
              Portal Pembelajaran Terpadu Kejuruan Sistem Informasi, Jaringan, dan Aplikasi
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Media edukasi digital terpadu untuk penguatan kompetensi peserta didik SMK SIJA.
              Menghubungkan teori akademik dengan praktikum interaktif di bidang rekayasa jaringan
              komputer, administrasi server, pengembangan perangkat lunak, dan tata kelola keamanan
              informasi.
            </p>

            {/* Metrik Pilar Kurikulum Netral */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 pb-2 border-y border-slate-100">
              <div>
                <div className="text-[11px] font-mono text-slate-500 uppercase">Pilar Kejuruan</div>
                <div className="text-sm font-semibold text-slate-800 mt-0.5">4 Bidang Utama</div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-500 uppercase">Model Praktikum</div>
                <div className="text-sm font-semibold text-slate-800 mt-0.5">Simulasi Digital</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Standar Capaian</div>
                <div className="text-sm font-semibold text-slate-800 mt-0.5">Berbasis SKKNI</div>
              </div>
            </div>

            {/* Tombol Aksi Utama Netral */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#mata-pelajaran"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm tracking-wide rounded border border-slate-900 shadow-sm transition-all"
                >
                  <span>Eksplorasi 4 Pilar Kurikulum</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#fasilitas-lab"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm tracking-wide rounded border border-slate-300 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>Fasilitas Praktikum</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Seluruh modul dirancang modular untuk pembelajaran mandiri dan terbimbing.</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Dossier Status SIJA (5 Kolom) */}
          <div className="lg:col-span-5">
            <HeroPortalCard />
          </div>
        </div>
      </div>
    </section>
  );
}
