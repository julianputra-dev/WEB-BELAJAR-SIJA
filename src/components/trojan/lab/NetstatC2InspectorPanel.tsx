// File: src/components/trojan/lab/NetstatC2InspectorPanel.tsx
'use client';

import React from 'react';
import { Network, Radio, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTrojanLabStore } from '@/store/useTrojanLabStore';

export function NetstatC2InspectorPanel() {
  const {
    netstatSockets,
    selectedSocketId,
    netstatFilter,
    isFirewallBlocked,
    exfilPackets,
    selectNetstatSocket,
    setNetstatFilter,
  } = useTrojanLabStore();

  const filteredSockets = netstatSockets.filter((s) => {
    if (!netstatFilter) return true;
    if (netstatFilter === '4444') return s.foreignAddress.includes('4444') || s.localAddress.includes('4444');
    if (netstatFilter === 'ESTABLISHED') return s.state === 'ESTABLISHED';
    return true;
  });

  const selectedSocket = netstatSockets.find((s) => s.id === selectedSocketId);
  const relevantPackets = exfilPackets.filter((p) => p.socketId === selectedSocketId);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex flex-col gap-3.5">
      {/* Header with Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 border border-slate-200 rounded text-slate-800">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Panel 2: Tabel Soket Jaringan (Netstat) &amp; Inspektur Lalu Lintas
            </h2>
            <p className="text-[11px] text-slate-500">
              Analisis netral soket aktif dan inspeksi dinamis muatan paket berdasarkan baris yang dipilih
            </p>
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-[10px] text-slate-500 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Filter:
          </span>
          <button
            onClick={() => setNetstatFilter('')}
            className={`px-2.5 py-1 rounded text-xs transition-colors border ${
              netstatFilter === ''
                ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setNetstatFilter('ESTABLISHED')}
            className={`px-2.5 py-1 rounded text-xs transition-colors border ${
              netstatFilter === 'ESTABLISHED'
                ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
            }`}
          >
            ESTABLISHED
          </button>
          <button
            onClick={() => setNetstatFilter('4444')}
            className={`px-2.5 py-1 rounded text-xs transition-colors border ${
              netstatFilter === '4444'
                ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
            }`}
          >
            findstr 4444
          </button>
        </div>
      </div>

      {/* Grid: Left: Neutral Netstat Table, Right: Dynamic Selected Socket Traffic Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left Column: Neutral Netstat Table (7 cols) */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-1 pb-2 mb-2 border-b border-slate-200 text-xs font-mono">
              <span className="text-slate-800 font-bold">Tabel Soket Aktif (netstat -ano)</span>
              <span className="text-[10.5px] text-slate-500">Pilih baris untuk menginspeksi lalu lintas</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase whitespace-nowrap">
                    <th className="py-2 px-2.5 w-14">Proto</th>
                    <th className="py-2 px-2.5 w-40">Alamat Lokal</th>
                    <th className="py-2 px-2.5 w-48">Alamat Asing (Remote)</th>
                    <th className="py-2 px-2.5 w-28">Status</th>
                    <th className="py-2 px-2.5 w-20">PID</th>
                    <th className="py-2 px-2.5 w-36">Nama Biner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs whitespace-nowrap">
                  {filteredSockets.map((s) => {
                    const isSelected = selectedSocketId === s.id;

                    return (
                      <tr
                        key={s.id}
                        onClick={() => selectNetstatSocket(s.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-100/80 text-blue-950 font-semibold border-l-4 border-l-blue-600'
                            : 'hover:bg-slate-100 text-slate-800 bg-white'
                        }`}
                      >
                        <td className="py-2.5 px-2.5 font-bold">{s.proto}</td>
                        <td className="py-2.5 px-2.5 text-slate-700">{s.localAddress}</td>
                        <td className="py-2.5 px-2.5 font-mono text-slate-800">{s.foreignAddress}</td>
                        <td className="py-2.5 px-2.5">
                          <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold border bg-slate-100 text-slate-700 border-slate-300">
                            {s.state}
                          </span>
                        </td>
                        <td className="py-2.5 px-2.5 font-bold text-slate-900">{s.pid}</td>
                        <td className="py-2.5 px-2.5 font-medium">{s.processName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200 text-[10.5px] text-slate-600 font-mono">
            {selectedSocket ? (
              <span className="text-slate-900 font-semibold">
                Soket terpilih: {selectedSocket.localAddress} &rarr; {selectedSocket.foreignAddress} (PID: {selectedSocket.pid}). Lihat inspektur di sebelah kanan.
              </span>
            ) : (
              <span>Klik salah satu baris soket di atas untuk menganalisis payload dan protokol komunikasi.</span>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Traffic Inspector for Selected Socket (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col justify-between min-h-[300px]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-1 pb-2 mb-2 border-b border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 font-mono">
                <Radio className="w-3.5 h-3.5 text-slate-600" />
                <span>Inspektur Lalu Lintas Soket Dinamis</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                Deep Packet Inspection
              </span>
            </div>

            {!selectedSocket ? (
              <div className="py-10 text-center space-y-2">
                <Radio className="w-8 h-8 text-slate-300 mx-auto" />
                <div className="text-xs font-semibold text-slate-700 font-mono">
                  Belum Ada Soket Terpilih
                </div>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Pilih salah satu baris pada tabel Netstat untuk membedah paket data dan menganalisis legitimasi koneksi.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {/* Selected Socket Metadata Card */}
                <div className="p-2.5 bg-white border border-slate-200 rounded text-xs font-mono space-y-1 shadow-xs">
                  <div className="flex justify-between text-slate-500 text-[10.5px]">
                    <span>Proses / PID:</span>
                    <span className="font-bold text-slate-900">{selectedSocket.processName} ({selectedSocket.pid})</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[10.5px]">
                    <span>Koneksi:</span>
                    <span className="font-semibold text-slate-800">{selectedSocket.localAddress} &rarr; {selectedSocket.foreignAddress}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[10.5px]">
                    <span>Port Tujuan:</span>
                    <span className="font-bold text-slate-900">{selectedSocket.remotePort || 'N/A (Listening)'}</span>
                  </div>
                </div>

                {/* Specific Behavior Evaluation */}
                {selectedSocket.appType === 'system' ? (
                  <div className="p-2.5 bg-white border border-slate-200 rounded text-[11px] text-slate-600 space-y-1">
                    <div className="font-semibold text-slate-900 font-mono">Soket Sistem Lokal (Listening):</div>
                    <p className="leading-relaxed">
                      Layanan internal sistem operasi yang mendengarkan panggilan RPC/IPC lokal. Tidak melakukan transmisi keluar ke internet.
                    </p>
                  </div>
                ) : selectedSocket.appType === 'normal_network' ? (
                  <div className="p-2.5 bg-white border border-slate-200 rounded text-[11px] text-slate-600 space-y-1.5">
                    <div className="font-semibold text-slate-900 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Analisis Forensik: Trafik Jaringan Sah (HTTPS)</span>
                    </div>
                    <p className="leading-relaxed">
                      Proses <strong>{selectedSocket.processName}</strong> berkomunikasi melalui Port standar 443 dengan enkripsi TLS 1.3 dan sertifikat publik resmi.
                    </p>
                    <div className="p-2 bg-slate-50 rounded border border-slate-200 text-[10px] font-mono break-all text-slate-700">
                      Payload: GET /v1/weather HTTP/2 (Encrypted TLS Payload, Valid CA Certificate)
                    </div>
                  </div>
                ) : (
                  /* Trojan Socket Inspection */
                  <div className="p-2.5 bg-white border border-slate-200 rounded text-[11px] text-slate-600 space-y-1.5">
                    <div className="font-semibold text-slate-900 font-mono flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Analisis Forensik: Anomali Port &amp; Protokol</span>
                    </div>
                    <p className="leading-relaxed text-slate-700">
                      Aplikasi kalkulator lokal ({selectedSocket.processName}) membuka koneksi persisten ke IP asing ({selectedSocket.remoteIp}) pada <strong>Port {selectedSocket.remotePort}</strong> tanpa enkripsi TLS resmi!
                    </p>

                    {/* Live Outbound Packets Stream */}
                    <div className="space-y-1 max-h-[110px] overflow-y-auto pr-1">
                      <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                        Paket Data Keluar:
                      </div>
                      {relevantPackets.length === 0 ? (
                        <div className="text-[10.5px] text-slate-400 font-mono p-1">
                          Lakukan kalkulasi di Panel 1 untuk melihat transmisi paket...
                        </div>
                      ) : (
                        relevantPackets.map((pkt) => (
                          <div
                            key={pkt.id}
                            className={`p-1.5 rounded border text-[10px] font-mono leading-relaxed ${
                              pkt.isBlocked
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="flex justify-between text-[9px] text-slate-400">
                              <span>{pkt.timestamp} &bull; {pkt.id}</span>
                              <span>{pkt.isBlocked ? 'DROPPED (FW)' : `${pkt.sizeBytes} B`}</span>
                            </div>
                            <div className="truncate">{pkt.dataSummary}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-200 text-[10.5px] text-slate-500 font-sans">
            Bandingkan antara koneksi HTTPS standar (Port 443) dengan koneksi tanpa justifikasi pada port non-standar.
          </div>
        </div>
      </div>
    </div>
  );
}
