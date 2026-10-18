// File: src/components/worm/lab/SmbPacketInspector.tsx
'use client';

import React from 'react';
import { WormNodeData } from '@/types/wormLab';
import { Binary, ShieldCheck, ShieldAlert, Cpu, Terminal } from 'lucide-react';

interface SmbPacketInspectorProps {
  data: WormNodeData;
}

export function SmbPacketInspector({ data }: SmbPacketInspectorProps) {
  const isPc = data.deviceType === 'pc';

  if (!isPc) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
          <Binary className="w-3.5 h-3.5 text-slate-700" />
          <span>Deep Packet &amp; Port 445 (SMB) X-Ray Inspector</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          Protokol: SMBv1 / CVE-2017-0144 EternalBlue
        </span>
      </div>

      <div className="p-3 rounded-lg border border-slate-200 bg-slate-900 text-slate-100 font-mono text-[11px] space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Socket Listener:</span>
            <span className="text-cyan-400 font-bold">TCP 0.0.0.0:445</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Status Firewall:</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                data.port445Open
                  ? 'bg-red-950 text-red-300 border border-red-700'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
              }`}
            >
              {data.port445Open ? 'ALLOW (Inbound Vulnerable)' : 'BLOCK (Inbound Filtered)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Physical Link:</span>
            <span className={data.isLanConnected ? 'text-emerald-400' : 'text-amber-400'}>
              {data.isLanConnected ? 'ETH0_UP' : 'ETH0_DISCONNECTED'}
            </span>
          </div>
        </div>

        {/* Live Packet Disassembly Stream */}
        <div className="space-y-1.5 text-[10px] leading-relaxed">
          <div className="text-slate-400 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-slate-500" />
            <span>X-Ray Packet Disassembly Telemetry:</span>
          </div>

          {!data.isLanConnected ? (
            <div className="p-2 rounded bg-amber-950/40 border border-amber-800/60 text-amber-300">
              [INTERFACE ISOLATED] Antarmuka fisik eth0 diputus. Kernel networking stack tidak menerima frame Ethernet apa pun dari LAN. Vektor eksploitasi terisolasi 100%.
            </div>
          ) : data.port445Open ? (
            <div className="p-2 rounded bg-red-950/40 border border-red-800/60 text-red-200 space-y-1">
              <div className="text-red-400 font-bold">
                [EXPLOIT VECTOR EXPOSED] Port 445 terbuka menerima paket SMBv1 Trans2 Request!
              </div>
              <div className="text-slate-300">
                &gt; SMB Header: 0xFF &apos;SMB&apos; | Command: 0x32 (SMB_COM_TRANSACTION2_SECONDARY)
              </div>
              <div className="text-slate-400">
                &gt; Payload: SrvOs2FeaToNt() buffer overflow (4096 bytes) -&gt; Ring 0 Kernel overwrite
              </div>
              <div className="text-red-300 font-semibold">
                &gt; Result: Unauthenticated Remote Code Execution -&gt; Spawn &apos;worm_service.exe&apos;
              </div>
            </div>
          ) : (
            <div className="p-2 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 space-y-1">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>[FILTER RULE ACTIVE] Aturan Firewall Menolak Inbound TCP Port 445</span>
              </div>
              <div className="text-slate-300">
                &gt; Rule #104: Inbound Port 445 SMB -&gt; ACTION: DROP / TCP RST sent back.
              </div>
              <div className="text-emerald-300">
                &gt; Result: Paket probe dan eksploitasi worm dibuang sebelum mencapai srv.sys. Host aman dari infeksi ulang!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
