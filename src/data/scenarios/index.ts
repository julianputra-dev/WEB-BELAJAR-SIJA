// File: src/data/scenarios/index.ts
import { MalwareType, ScenarioMetadata } from '@/types/simulation';
import { wormScenario } from './wormScenario';
import { ransomwareScenario } from './ransomwareScenario';
import { virusScenario } from './virusScenario';
import { trojanScenario } from './trojanScenario';
import { spywareScenario } from './spywareScenario';

export const allScenarios: Record<MalwareType, ScenarioMetadata> = {
  worm: wormScenario,
  ransomware: ransomwareScenario,
  virus: virusScenario,
  trojan: trojanScenario,
  spyware: spywareScenario,
};

export function getScenario(type: string): ScenarioMetadata | undefined {
  return allScenarios[type as MalwareType];
}
