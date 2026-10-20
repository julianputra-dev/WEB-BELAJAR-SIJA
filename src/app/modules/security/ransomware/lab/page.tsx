// File: src/app/modules/security/ransomware/lab/page.tsx
'use client';

import React from 'react';
import { RansomwareLabHeader } from '@/components/ransomware/lab/RansomwareLabHeader';
import { DiagnosticMetricsBar } from '@/components/ransomware/lab/DiagnosticMetricsBar';
import { StorageDirectoryPanel } from '@/components/ransomware/lab/StorageDirectoryPanel';
import { FileHexEntropyInspector } from '@/components/ransomware/lab/FileHexEntropyInspector';
import { RansomwareProcessMonitor } from '@/components/ransomware/lab/RansomwareProcessMonitor';
import { RansomwareTerminalLog } from '@/components/ransomware/lab/RansomwareTerminalLog';
import { RansomwareSopSidebar } from '@/components/ransomware/lab/RansomwareSopSidebar';
import { RansomNoteModal } from '@/components/ransomware/lab/RansomNoteModal';

export default function RansomwareLabPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col font-sans">
      <RansomwareLabHeader />

      <main className="flex-1 p-3 md:p-4 max-w-[1600px] mx-auto w-full flex flex-col xl:flex-row gap-3.5 items-start">
        {/* Main Unified Forensic Sandbox Canvas (Left & Center) */}
        <div className="flex-1 flex flex-col gap-3.5 min-w-0 w-full">
          {/* Top Row: System Telemetry & Diagnostic Status */}
          <DiagnosticMetricsBar />

          {/* Core Panel 1: Multi-Storage Directory (C: Local, Z: NAS, E: Offline Backup) */}
          <StorageDirectoryPanel />

          {/* Core Panel 2: File Content & Hex / Shannon Entropy X-Ray Inspector */}
          <FileHexEntropyInspector />

          {/* Core Panel 3: Process RAM Monitor & OS Partition Eradication Controls */}
          <RansomwareProcessMonitor />

          {/* Core Panel 4: Incident Terminal Console & Forensic Audit Feed */}
          <RansomwareTerminalLog />
        </div>

        {/* Right Sidebar: Symptom-Based SOP Missions & Dynamic Unlocked Explanations */}
        <div className="w-full xl:w-[360px] 2xl:w-[380px] shrink-0 xl:sticky xl:top-[68px]">
          <RansomwareSopSidebar />
        </div>
      </main>

      {/* Ransom Note Modal (README_DECRYPT.txt) */}
      <RansomNoteModal />
    </div>
  );
}
