// File: src/app/modules/security/rootkit/intro/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { RootkitHeroBanner } from '@/components/rootkit/theory/RootkitHeroBanner';
import { RootkitRingArchitectureSection } from '@/components/rootkit/theory/RootkitRingArchitectureSection';
import { RootkitInfiltrationSection } from '@/components/rootkit/theory/RootkitInfiltrationSection';
import { RootkitHookingDkomDiagram } from '@/components/rootkit/theory/RootkitHookingDkomDiagram';
import { RootkitMitigationSection } from '@/components/rootkit/theory/RootkitMitigationSection';
import { RootkitCaseStudyGrid } from '@/components/rootkit/theory/RootkitCaseStudyGrid';
import { RootkitSopRoadmapCard } from '@/components/rootkit/theory/RootkitSopRoadmapCard';

export const metadata: Metadata = {
  title: 'Pengantar Teori & Metodologi Rootkit - Laboratorium SIJA',
  description:
    'Anatomi Rootkit Kernel, subversi hak akses Ring 0 vs Ring 3, vektor infiltrasi BYOVD dan UEFI Bootkit, diagram intersepsi SSDT Hooking & DKOM, serta metodologi mitigasi forensik memori.',
};

export default function RootkitTheoryIntroPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full">
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-6 md:py-8 w-full flex-1">
        <RootkitHeroBanner />
        <RootkitRingArchitectureSection />
        <RootkitInfiltrationSection />
        <RootkitHookingDkomDiagram />
        <RootkitMitigationSection />
        <RootkitCaseStudyGrid />
        <RootkitSopRoadmapCard />
      </main>
    </div>
  );
}
