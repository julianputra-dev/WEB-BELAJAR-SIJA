// File: src/app/modules/security/virus/lab/page.tsx
'use client';

import React from 'react';
import { LabHeader } from '@/components/virus/lab/LabHeader';
import { DiagnosticBar } from '@/components/virus/lab/DiagnosticBar';
import { HostDirectoryExplorer } from '@/components/virus/lab/HostDirectoryExplorer';
import { ProcessTable } from '@/components/virus/lab/ProcessTable';
import { BinaryXRayInspector } from '@/components/virus/lab/BinaryXRayInspector';
import { ForensicTerminal } from '@/components/virus/lab/ForensicTerminal';
import { SopTaskSidebar } from '@/components/virus/lab/SopTaskSidebar';

export default function VirusForensicLabPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col font-sans">
      <LabHeader />

      <main className="flex-1 p-3 md:p-4 max-w-[1600px] mx-auto w-full flex flex-col xl:flex-row gap-3.5 items-start">
        {/* Main Unified Forensic Workbench (Left/Center Canvas) */}
        <div className="flex-1 flex flex-col gap-3.5 min-w-0 w-full">
          {/* Top Row: System Telemetry & Diagnostic Status */}
          <DiagnosticBar />

          {/* Core Panel 1: File Explorer & RAM Process Explorer Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <HostDirectoryExplorer />
            <ProcessTable />
          </div>

          {/* Core Panel 2: Binary X-Ray Inspector & SHA-256 Hash Comparator */}
          <div>
            <BinaryXRayInspector />
          </div>

          {/* Core Panel 3: Incident Console & Forensic Audit Feed */}
          <div>
            <ForensicTerminal />
          </div>
        </div>

        {/* Right Sidebar: Symptom-Based Investigation Missions & Dynamic Explanations */}
        <div className="w-full xl:w-[360px] 2xl:w-[380px] shrink-0 xl:sticky xl:top-[68px]">
          <SopTaskSidebar />
        </div>
      </main>
    </div>
  );
}
