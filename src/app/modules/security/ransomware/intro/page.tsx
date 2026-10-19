// File: src/app/modules/security/ransomware/intro/page.tsx
import React from 'react';
import { RansomwareHeroBanner } from '@/components/ransomware/theory/RansomwareHeroBanner';
import { RansomwareTaxonomySection } from '@/components/ransomware/theory/RansomwareTaxonomySection';
import { RansomwareInfiltrationSection } from '@/components/ransomware/theory/RansomwareInfiltrationSection';
import { RansomwareCryptoSection } from '@/components/ransomware/theory/RansomwareCryptoSection';
import { RansomwareStoragePropagationSection } from '@/components/ransomware/theory/RansomwareStoragePropagationSection';
import { RansomwareCaseStudyGrid } from '@/components/ransomware/theory/RansomwareCaseStudyGrid';
import { RansomwareSopRoadmapCard } from '@/components/ransomware/theory/RansomwareSopRoadmapCard';

export default function RansomwareTheoryIntroPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full">
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-6 md:py-8 w-full flex-1">
        <RansomwareHeroBanner />
        <RansomwareTaxonomySection />
        <RansomwareInfiltrationSection />
        <RansomwareCryptoSection />
        <RansomwareStoragePropagationSection />
        <RansomwareCaseStudyGrid />
        <RansomwareSopRoadmapCard />
      </main>
    </div>
  );
}
