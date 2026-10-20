// File: src/components/ransomware/theory/RansomwareStoragePropagationSection.tsx
import React from 'react';
import { STORAGE_PROPAGATION_VECTORS, RANSOMWARE_IOCS } from '@/data/ransomwareTheoryData';
import { Server, AlertTriangle, ShieldX, Radio } from 'lucide-react';

export function RansomwareStoragePropagationSection() {
  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Bagian 4 • Perambatan Penyimpanan &amp; Risiko Fatal
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Server className="w-5 h-5 text-slate-800" />
          Pemindaian Media Penyimpanan &amp; Bahaya Kontaminasi Backup
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Ransomware tidak membatasi serangannya pada partisi lokal (Drive C:). Perangkat perusak ini secara aktif
          mengiterasi seluruh drive yang terpasang, merambat ke Shared Storage (NAS) melalui jaringan, dan
          menghancurkan media cadangan jika ditangani tanpa isolasi ketat.
        </p>
      </div>

      {/* Skema Buku Teks: Kesalahan Fatal Menghubungkan Cadangan Sebelum Pembersihan */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-slate-700" />
            <span>Skema Kesalahan Fatal: Mengapa Backup Dilarang Dicolok Saat Malware Aktif?</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Korelasi Sebab-Akibat Lab</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          {/* Kondisi 1: Proses Malware Masih Aktif di RAM */}
          <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">1. Malware Masih Berjalan di RAM</span>
              <span className="text-[9px] bg-red-100 text-red-900 px-1.5 py-0.5 rounded font-semibold">
                Bahaya Aktif
              </span>
            </div>
            <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
              Thread ransomware terus berjalan di latar belakang (background daemon) dan secara berkala
              memanggil API GetLogicalDriveStringsW untuk mendeteksi volume penyimpanan baru.
            </p>
          </div>

          {/* Kondisi 2: Kesalahan Teknisi - Colok Backup Prematur */}
          <div className="p-4 rounded bg-amber-50/80 border border-amber-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-950">2. Teknisi Mencolokkan Backup</span>
              <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-semibold">
                Kesalahan Prosedur
              </span>
            </div>
            <p className="text-[11px] font-sans text-amber-900 leading-relaxed">
              Karena panik ingin segera memulihkan data, teknisi langsung mencolokkan External Backup Drive
              ke port USB workstation sebelum sistem operasi dibersihkan atau diformat.
            </p>
          </div>

          {/* Kondisi 3: Dampak Bencana - Backup Ikut Terenkripsi */}
          <div className="p-4 rounded bg-slate-900 text-white border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100 flex items-center gap-1.5">
                <ShieldX className="w-4 h-4 text-rose-400" />
                3. Bencana: Backup Ikut Terkunci
              </span>
              <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.5 rounded font-semibold">
                Fatal Failure
              </span>
            </div>
            <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
              Malware langsung mengenali drive baru, mengunci seluruh file cadangan menjadi .locked,
              dan menghancurkan satu-satunya jalan keluar pemulihan data organisasi.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Jalur Perambatan Penyimpanan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STORAGE_PROPAGATION_VECTORS.map((vec) => (
          <div
            key={vec.id}
            className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between shadow-xs space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                  {vec.accessProtocol}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {vec.storageType}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {vec.infectionMechanism}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-200 font-sans">
              <span className="font-bold block text-slate-900 mb-0.5">Protokol Penanganan:</span>
              <p className="text-slate-600 leading-relaxed">{vec.containmentProtocol}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Indikator Kompromi Forensik (IoC) */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Radio className="w-4 h-4 text-slate-700" />
            <span>Indikator Kompromi Sistem &amp; Forensik (Indicators of Compromise / IoC)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Telemetri Deteksi Host</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {RANSOMWARE_IOCS.map((ioc, idx) => (
            <div key={idx} className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{ioc.indicator}</span>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                  {ioc.detectionTool}
                </span>
              </div>
              <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
                {ioc.forensicArtifact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
