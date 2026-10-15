// File: src/data/scenarios/index.ts
import { MalwareType, ScenarioMetadata } from '@/types/simulation';
import { virusScenario } from './virusScenario';
import { wormScenario } from './wormScenario';
import { ransomwareScenario } from './ransomwareScenario';
import { trojanScenario } from './trojanScenario';
import { spywareScenario } from './spywareScenario';

// Urutan kurikulum terstruktur: Pemula -> Menengah -> Lanjutan
export const allScenarios: Record<MalwareType, ScenarioMetadata> = {
  virus: virusScenario,
  worm: wormScenario,
  ransomware: ransomwareScenario,
  trojan: trojanScenario,
  spyware: spywareScenario,
};

export function getScenario(type: string): ScenarioMetadata | undefined {
  return allScenarios[type as MalwareType];
}
