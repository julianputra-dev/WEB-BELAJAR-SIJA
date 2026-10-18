// File: src/components/worm/lab/WormInterfaceControls.tsx
'use client';

import React from 'react';
import { useWormTopologyStore } from '@/store/useWormTopologyStore';
import { WormNodeData } from '@/types/wormLab';
import { Wifi, WifiOff, ShieldCheck, ShieldAlert, Sliders } from 'lucide-react';

interface WormInterfaceControlsProps {
  nodeId: string;
  data: WormNodeData;
}

export function WormInterfaceControls({ nodeId, data }: WormInterfaceControlsProps) {
  const { toggleLanConnection, togglePort445 } = useWormTopologyStore();
  const isPc = data.deviceType === 'pc';

  if (!isPc) {
    return (
      <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-500 font-mono">
        Perangkat infrastruktur ({data.deviceType}) dikonfigurasi secara terpusat oleh administrator jaringan.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
        <Sliders className="w-3.5 h-3.5 text-slate-700" />
        <span>Sakelar Antarmuka Fisik &amp; Host Firewall</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Physical LAN Cable Switch */}
        <div className="p-3 rounded-lg border border-slate-200 bg-white flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900">Kabel Jaringan (NIC eth0)</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                  data.isLanConnected
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {data.isLanConnected ? 'LINK UP (Tersambung)' : 'LINK DOWN (Terputus)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
              Memutus kabel LAN secara fisik memisahkan host dari domain broadcast dan menghentikan pengiriman paket eksploitasi.
            </p>
          </div>

          <button
            onClick={() => toggleLanConnection(nodeId)}
            className={`w-full py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors font-mono ${
              data.isLanConnected
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
            }`}
          >
            {data.isLanConnected ? (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>Putuskan Kabel LAN (Isolasi)</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5" />
                <span>Sambungkan Kembali LAN</span>
              </>
            )}
          </button>
        </div>

        {/* Port 445 Host Firewall Toggle */}
        <div className="p-3 rounded-lg border border-slate-200 bg-white flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900">Firewall Port 445 (SMB)</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                  data.port445Open
                    ? 'bg-red-100 text-red-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {data.port445Open ? 'ALLOW (Inbound Rentan)' : 'BLOCK (Inbound Ditutup)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
              Menutup port 445 menolak paket eksploitasi SMB dari host lain di jaringan lokal saat kabel disambungkan.
            </p>
          </div>

          <button
            onClick={() => togglePort445(nodeId)}
            className={`w-full py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors font-mono ${
              data.port445Open
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            {data.port445Open ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Terapkan Aturan BLOCK Port 445</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Buka Port 445 (Allow Inbound)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
