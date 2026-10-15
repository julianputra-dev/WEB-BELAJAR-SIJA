// File: src/app/modules/security/virus/lab/page.tsx
'use client';

import React from 'react';
import { useVirusLabStore } from '@/store/useVirusLabStore';
import { LabHeader } from '@/components/virus/lab/LabHeader';
import { DiagnosticBar } from '@/components/virus/lab/DiagnosticBar';
import { ProcessTable } from '@/components/virus/lab/ProcessTable';
import { HashAnalyzer } from '@/components/virus/lab/HashAnalyzer';
import { PeHeaderInspector } from '@/components/virus/lab/PeHeaderInspector';
import { ForensicTerminal } from '@/components/virus/lab/ForensicTerminal';
import { SopTaskSidebar } from '@/components/virus/lab/SopTaskSidebar';
import { Cpu, Binary, FileCode } from 'lucide-react';

export default function VirusForensicLabPage() {
  const { activeTab, setActiveTab } = useVirusLabStore();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col font-sans">
      <LabHeader />
      <DiagnosticBar />

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6">
        {/* Main Workbench Area */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Workbench Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-300 pb-2 text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTab('processes')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-t transition-colors ${
                activeTab === 'processes'
                  ? 'bg-white text-slate-900 border-t-2 border-t-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-slate-600" />
              <span>1. Process Explorer (Triage RAM)</span>
            </button>

            <button
              onClick={() => setActiveTab('pe_headers')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-t transition-colors ${
                activeTab === 'pe_headers'
                  ? 'bg-white text-slate-900 border-t-2 border-t-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-slate-600" />
              <span>2. PE Header &amp; Registri SafeBoot</span>
            </button>

            <button
              onClick={() => setActiveTab('hashes')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-t transition-colors ${
                activeTab === 'hashes'
                  ? 'bg-white text-slate-900 border-t-2 border-t-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Binary className="w-3.5 h-3.5 text-slate-600" />
              <span>3. Hash SHA-256 Integrity Comparator</span>
            </button>
          </div>

          {/* Active Workbench Canvas */}
          <div className="flex-1 min-h-[360px]">
            {activeTab === 'processes' && <ProcessTable />}
            {activeTab === 'pe_headers' && <PeHeaderInspector />}
            {activeTab === 'hashes' && <HashAnalyzer />}
          </div>

          {/* Forensic Incident Console */}
          <ForensicTerminal />
        </div>

        {/* Right Sidebar: SOP Checklist & Guides */}
        <SopTaskSidebar />
      </main>
    </div>
  );
}
