// File: src/components/landing/PortalFooter.tsx
import React from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';

export function PortalFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 md:px-10 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 pb-8 border-b border-slate-800">
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center gap-2 text-white font-bold text-sm tracking-tight">
            <Layers className="w-4 h-4 text-slate-200" />
            <span>SIJA E-Learning Portal</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Platform edukasi komprehensif penunjang kompetensi keahlian Sistem Informasi, Jaringan,
            dan Aplikasi (SIJA). Menghubungkan kurikulum vokasi dengan standar industri modern.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-[11px]">
          <div>
            <div className="text-slate-200 font-bold uppercase tracking-wider mb-2 font-mono">
              Pilar Kurikulum
            </div>
            <ul className="space-y-1.5">
              <li>
                <Link href="/modules/networking" className="hover:text-white transition-colors">
                  Jaringan Komputer
                </Link>
              </li>
              <li>
                <Link href="/modules/security" className="hover:text-white transition-colors">
                  Keamanan Informasi
                </Link>
              </li>
              <li>
                <Link href="/modules/systems" className="hover:text-white transition-colors">
                  Administrasi Sistem
                </Link>
              </li>
              <li>
                <Link href="/modules/applications" className="hover:text-white transition-colors">
                  Rekayasa Aplikasi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-slate-200 font-bold uppercase tracking-wider mb-2 font-mono">
              Metode Praktikum
            </div>
            <ul className="space-y-1.5">
              <li>Simulasi Digital Berbasis Web</li>
              <li>Validasi Status Deterministik</li>
              <li>Lapisan Abstraksi Service</li>
              <li>Bebas Risiko Terhadap Host</li>
            </ul>
          </div>

          <div>
            <div className="text-slate-200 font-bold uppercase tracking-wider mb-2 font-mono">
              Status Kurikulum
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Portal Versi 1.0.0 Aktif</span>
              </li>
              <li>4 Pilar Kompetensi Terpadu</li>
              <li>Berarsitektur Database-Ready</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px] font-mono">
        <div>
          Hak Cipta © 2026 Portal Pembelajaran Vokasi SIJA. Dikembangkan untuk Keperluan Edukasi Kejuruan.
        </div>
        <div>
          Kurikulum Berbasis Standar Industri Vokasi
        </div>
      </div>
    </footer>
  );
}
