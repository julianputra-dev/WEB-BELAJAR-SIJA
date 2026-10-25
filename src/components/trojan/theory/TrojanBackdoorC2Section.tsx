// File: src/components/trojan/theory/TrojanBackdoorC2Section.tsx
import React from 'react';
import { Network, Radio, Server } from 'lucide-react';
import { BACKDOOR_STAGES, TROJAN_IOCS } from '@/data/trojanTheoryData';
import { TrojanDualBehaviorDiagram } from './TrojanDualBehaviorDiagram';

export function TrojanBackdoorC2Section() {
  const shellTypes = [
    {
      title: 'Bind Shell (Port Mendengarkan Masuk)',
      desc: 'Trojan membuka port di mesin korban dan menunggu koneksi masuk dari peretas. Kelemahan bagi penyerang: sering kali diblokir oleh NAT router dan firewall jaringan perimeter.',
      badge: 'Inbound Listener',
    },
    {
      title: 'Reverse Shell (Koneksi Keluar Aktif)',
      desc: 'Trojan secara aktif menginisialisasi koneksi keluar (outbound) ke IP C2 peretas pada Port 4444. Teknik ini sangat efektif menembus NAT dan firewall organisasi yang meloloskan lalu lintas keluar.',
      badge: 'Outbound Connect (Tipe Lab SIJA)',
    },
    {
      title: 'Remote Access Trojan (RAT Fungsional Penuh)',
      desc: 'Mengombinasikan reverse shell dengan modul biner canggih seperti perekam ketikan (keylogger), pengambil tangkapan layar, pencuri berkas, dan penyadap sesi mikrofon/webcam.',
      badge: 'Full Command Suite',
    },
  ];

  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Arsitektur Jaringan &amp; Komunikasi C2
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Network className="w-5 h-5 text-slate-800" />
          Bagaimana Trojan Membuka Pintu Belakang Menuju C2 Server?
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Pintu belakang (backdoor) adalah mekanisme yang dirancang untuk melewati prosedur autentikasi normal
          dan memberikan akses sistem tanpa sepengetahuan administrator. Saluran ini dikendalikan melalui infrastruktur
          Command and Control (C2) yang bertindak sebagai stasiun komando penyerang.
        </p>
      </div>

      {/* Diagram Alur Kerja Dual-Behavior (Visualisasi Buku Teks Akademis) */}
      <TrojanDualBehaviorDiagram />

      {/* 3 Tipologi Backdoor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {shellTypes.map((st, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                {st.badge}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-snug">{st.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">{st.desc}</p>
          </div>
        ))}
      </div>

      {/* 4 Tahapan Siklus Hidup Backdoor */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {BACKDOOR_STAGES.map((stage) => (
          <div
            key={stage.id}
            className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold border border-slate-200">
                  {stage.phase}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Winsock2 API</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {stage.title}
              </h3>
              <div className="text-[10px] font-mono text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-200 break-all">
                {stage.commandSnippet}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {stage.mechanism}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-red-700 bg-red-50/50 p-2 rounded border border-red-100 font-sans">
              <strong>Dampak Sistem:</strong> {stage.systemImpact}
            </div>
          </div>
        ))}
      </div>

      {/* Indikator Kompromi (IoC) & Forensik Jaringan */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Radio className="w-4 h-4 text-slate-700" />
            <span>Indikator Kompromi Forensik Trojan (Indicators of Compromise / IoC)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Telemetri Blue Team</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {TROJAN_IOCS.map((ioc, idx) => (
            <div key={idx} className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{ioc.indicator}</span>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 font-semibold">
                  {ioc.diagnosticTool}
                </span>
              </div>
              <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
                {ioc.telemetryObservation}
              </p>
              <div className="pt-1.5 border-t border-slate-200 text-[10px] text-slate-700 font-sans">
                <strong>Tindakan Investigatif:</strong> {ioc.investigativeAction}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
