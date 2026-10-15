// File: src/app/page.tsx
import { InstitutionalBanner } from '@/components/landing/InstitutionalBanner';
import { HeaderNavigation } from '@/components/landing/HeaderNavigation';
import { HeroSection } from '@/components/landing/HeroSection';
import { SubjectGrid } from '@/components/landing/SubjectGrid';
import { VirtualLabOverview } from '@/components/landing/VirtualLabOverview';
import { PedagogySection } from '@/components/landing/PedagogySection';
import { CurriculumStandards } from '@/components/landing/CurriculumStandards';
import { PortalFooter } from '@/components/landing/PortalFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full font-sans antialiased">
      <InstitutionalBanner />
      <HeaderNavigation />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <SubjectGrid />
        <VirtualLabOverview />
        <PedagogySection />
        <CurriculumStandards />
      </main>
      <PortalFooter />
    </div>
  );
}
