// File: src/app/page.tsx
import Link from 'next/link';
import { Shield, Terminal, ArrowRight, BookOpen, Layers, Cpu } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col justify-between p-6 md:p-12 max-w-6xl mx-auto w-full">
      {/* Top Navbar */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/50">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">SIJA SecLab Platform</h1>
            <p className="text-xs text-slate-400 font-mono">Fase 1 (MVP) • Media Belajar Interaktif</p>
          </div>
        </div>

        <Link
          href="/modules/security"
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-black font-semibold text-xs rounded-lg flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all"
        >
          <span>Masuk ke Modul Lab</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      {/* Hero Section */}
      <main className="my-12 space-y-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          Kurikulum SMK SIJA • Keamanan Sistem & Jaringan
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Visualisasi & Penanganan SOP Malware di Lingkungan <span className="text-cyan-400">Sandbox</span>
        </h2>

        <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Media edukasi keamanan siber interaktif dengan pendekatan dua fase (Observasi Serangan &amp;
          Mitigasi Berurutan). Uji coba penanganan insiden tanpa risiko kode berbahaya nyata.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/modules/security"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl flex items-center gap-2 shadow-xl shadow-cyan-500/20 transition-all"
          >
            <span>Buka 5 Lab Simulasi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold text-sm rounded-xl transition-all"
          >
            Pelajari Fitur MVP
          </a>
        </div>
      </main>

      {/* Feature Pillars */}
      <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800 flex items-center justify-center text-blue-400 mb-3">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-sm text-white">Tata Letak 3-Panel</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Panduan instruksi, kanvas simulasi interaktif, dan telemetri perangkat terintegrasi dalam satu layar tanpa reload.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-800 flex items-center justify-center text-amber-400 mb-3">
            <Terminal className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-sm text-white">Validasi Urutan SOP</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mesin status memvalidasi setiap tindakan. Jika urutan mitigasi salah, sistem menampilkan umpan balik dan re-infeksi mendidik.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-3">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-sm text-white">Database-Ready</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Lapisan ProgressService dirancang khusus agar mudah dimigrasikan dari LocalStorage ke database cloud (Supabase) di Fase 3.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-600 font-mono py-6 border-t border-slate-900 mt-8">
        SIJA SecLab • SMK Sistem Informasi, Jaringan, dan Aplikasi • 100% In-Browser Simulation
      </footer>
    </div>
  );
}
