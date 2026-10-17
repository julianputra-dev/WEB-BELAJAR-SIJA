// File: src/app/modules/security/worm/intro/page.tsx
import React from 'react';
import { WormHeroBanner } from '@/components/worm/theory/WormHeroBanner';
import { WormFundamentalsSection } from '@/components/worm/theory/WormFundamentalsSection';
import { WormPropagationMechanismSection } from '@/components/worm/theory/WormPropagationMechanismSection';
import { WormCaseStudyGrid } from '@/components/worm/theory/WormCaseStudyGrid';
import { WormSopRoadmapCard } from '@/components/worm/theory/WormSopRoadmapCard';

export default function WormTheoryIntroPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full">
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-6 md:py-8 w-full flex-1">
        <WormHeroBanner />
        <WormFundamentalsSection />
        <WormPropagationMechanismSection />
        <WormCaseStudyGrid />
        <WormSopRoadmapCard />
      </main>
    </div>
  );
}
