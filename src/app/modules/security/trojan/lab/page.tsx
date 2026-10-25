// File: src/app/modules/security/trojan/lab/page.tsx
'use client';

import React from 'react';
import { TrojanLabHeader } from '@/components/trojan/lab/TrojanLabHeader';
import { TrojanDiagnosticBar } from '@/components/trojan/lab/TrojanDiagnosticBar';
import { SurfaceAppDirectoryPanel } from '@/components/trojan/lab/SurfaceAppDirectoryPanel';
import { NetstatC2InspectorPanel } from '@/components/trojan/lab/NetstatC2InspectorPanel';
import { ProcessFirewallPanel } from '@/components/trojan/lab/ProcessFirewallPanel';
import { TrojanTerminalConsole } from '@/components/trojan/lab/TrojanTerminalConsole';
import { TrojanSopSidebar } from '@/components/trojan/lab/TrojanSopSidebar';
import { FileInUseModal } from '@/components/trojan/lab/FileInUseModal';
import { RebootAuditModal } from '@/components/trojan/lab/RebootAuditModal';

export default function TrojanForensicLabPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col font-sans">
      {/* Academic Top Navigation & Action Header */}
      <TrojanLabHeader />

      {/* Main Unified Forensic Sandbox Canvas + SOP Task Sidebar */}
      <main className="flex-1 p-3 md:p-4 max-w-[1600px] mx-auto w-full flex flex-col xl:flex-row gap-3.5 items-start">
        {/* Main Unified Forensic Workbench Canvas (Left & Center) */}
        <div className="flex-1 flex flex-col gap-3.5 min-w-0 w-full">
          {/* Top Diagnostics Status Metrics */}
          <TrojanDiagnosticBar />

          {/* Core Panel 1: Surface Application & Host Directory / Registry */}
          <SurfaceAppDirectoryPanel />

          {/* Core Panel 2: Netstat Active Sockets & C2 Traffic X-Ray */}
          <NetstatC2InspectorPanel />

          {/* Core Panel 3: RAM Process Table & Outbound Host Firewall Controls */}
          <ProcessFirewallPanel />

          {/* Core Panel 4: EDR Forensic Terminal & Incident Audit Feed */}
          <TrojanTerminalConsole />
        </div>

        {/* Right Sidebar: Symptom-Based SOP Missions & Dynamic Unlocked Explanations */}
        <div className="w-full xl:w-[360px] 2xl:w-[380px] shrink-0 xl:sticky xl:top-[68px]">
          <TrojanSopSidebar />
        </div>
      </main>

      {/* Cause-and-Effect OS Modals */}
      <FileInUseModal />
      <RebootAuditModal />
    </div>
  );
}
