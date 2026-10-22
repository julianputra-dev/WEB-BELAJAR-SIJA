// File: src/app/modules/security/trojan/intro/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { TrojanHeroBanner } from '@/components/trojan/theory/TrojanHeroBanner';
import { TrojanFundamentalsSection } from '@/components/trojan/theory/TrojanFundamentalsSection';
import { TrojanBackdoorC2Section } from '@/components/trojan/theory/TrojanBackdoorC2Section';
import { TrojanPersistenceSection } from '@/components/trojan/theory/TrojanPersistenceSection';
import { TrojanCaseStudyGrid } from '@/components/trojan/theory/TrojanCaseStudyGrid';
import { TrojanSopRoadmapCard } from '@/components/trojan/theory/TrojanSopRoadmapCard';

export const metadata: Metadata = {
  title: 'Pengantar Teori & Metodologi Trojan Horse - Laboratorium SIJA',
  description:
    'Anatomi Trojan Horse, penyamaran aplikasi utilitas, arsitektur backdoor C2 Port 4444, analisis Netstat, penguncian memori kernel, dan metodologi penanganan insiden.',
};

export default function TrojanTheoryIntroPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full">
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-6 md:py-8 w-full flex-1">
        <TrojanHeroBanner />
        <TrojanFundamentalsSection />
        <TrojanBackdoorC2Section />
        <TrojanPersistenceSection />
        <TrojanCaseStudyGrid />
        <TrojanSopRoadmapCard />
      </main>
    </div>
  );
}
