// File: src/app/modules/security/worm/lab/page.tsx
'use client';

import React from 'react';
import { WormLabHeader } from '@/components/worm/lab/WormLabHeader';
import { WormDiagnosticBar } from '@/components/worm/lab/WormDiagnosticBar';
import { WormTopologyCanvas } from '@/components/worm/lab/WormTopologyCanvas';
import { DeepPacketXRayInspector } from '@/components/worm/lab/DeepPacketXRayInspector';
import { NetworkTrafficMonitor } from '@/components/worm/lab/NetworkTrafficMonitor';
import { WormMissionSidebar } from '@/components/worm/lab/WormMissionSidebar';
import { PostHardeningAuditModal } from '@/components/worm/lab/PostHardeningAuditModal';

export default function WormSimulationLabPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col font-sans">
      <WormLabHeader />
      <WormDiagnosticBar />

      <main className="flex-1 p-3 md:p-4 max-w-[1680px] mx-auto w-full flex flex-col xl:flex-row gap-3.5 items-start">
        {/* Main Unified Network Sandbox (Left & Center Columns) */}
        <div className="flex-1 flex flex-col gap-3.5 min-w-0 w-full">
          {/* Top: React Flow Interactive Subnet Topology */}
          <WormTopologyCanvas />

          {/* Middle: Deep Packet & Port X-Ray Inspector */}
          <DeepPacketXRayInspector />

          {/* Bottom: Network Bandwidth Telemetry & Real-Time Sniffer Log */}
          <NetworkTrafficMonitor />
        </div>

        {/* Right Sidebar: Symptom-Based Investigation Missions & Concepts */}
        <div className="w-full xl:w-[350px] 2xl:w-[380px] shrink-0 xl:sticky xl:top-[75px]">
          <WormMissionSidebar />
        </div>
      </main>

      {/* Post-Hardening Exploit Test Audit Modal */}
      <PostHardeningAuditModal />
    </div>
  );
}
