// File: src/app/modules/security/virus/intro/page.tsx
import React from 'react';
import { VirusHeroBanner } from '@/components/virus/theory/VirusHeroBanner';
import { VirusFundamentalsSection } from '@/components/virus/theory/VirusFundamentalsSection';
import { InfectionMechanismSection } from '@/components/virus/theory/InfectionMechanismSection';
import { CaseStudyGrid } from '@/components/virus/theory/CaseStudyGrid';
import { SopRoadmapCard } from '@/components/virus/theory/SopRoadmapCard';

export default function VirusTheoryIntroPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full">
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-6 md:py-8 w-full flex-1">
        <VirusHeroBanner />
        <VirusFundamentalsSection />
        <InfectionMechanismSection />
        <CaseStudyGrid />
        <SopRoadmapCard />
      </main>
    </div>
  );
}
