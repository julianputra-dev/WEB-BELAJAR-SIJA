// File: src/types/simulation.ts
import { Node, Edge } from '@xyflow/react';

export type MalwareType = 'virus' | 'worm' | 'trojan' | 'ransomware' | 'spyware';

export type SimulationPhase =
  | 'idle'              // Menunggu siswa memicu simulasi infeksi
  | 'infected'          // Malware telah menginfeksi, siswa mengamati dampak
  | 'mitigation_step_1' // Langkah penanganan 1 selesai
  | 'mitigation_step_2' // Langkah penanganan 2 selesai
  | 'recovered';        // Langkah penanganan 3 selesai, sistem pulih

export interface StepNarrative {
  phase: SimulationPhase;
  title: string;
  instruction: string;
  technicalExplanation: string;
}

// Tipe untuk simulasi berbasis berkas (Virus & Ransomware)
export interface SimulatedFile {
  id: string;
  name: string;
  extension: string;
  sizeKB: number;
  status: 'clean' | 'infected' | 'encrypted' | 'quarantined';
  isCarrier?: boolean;
}

// Tipe untuk simulasi topologi jaringan (React Flow - Worm)
export type NodeHealthStatus = 'clean' | 'infected' | 'isolated' | 'patched';

export interface NetworkNodeData extends Record<string, unknown> {
  label: string;
  ipAddress: string;
  deviceType: 'pc' | 'switch' | 'server';
  port445Open: boolean;
  isLanConnected: boolean;
  processActive: boolean;
  status: NodeHealthStatus;
  cpuUsage: number;
}

export type SimulationNode = Node<NetworkNodeData>;
export type SimulationEdge = Edge;

// Metadata skenario malware untuk navigasi dan presentasi modul
export interface ScenarioMetadata {
  id: MalwareType;
  title: string;
  badge: string;
  description: string;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  targetSop: string[];
  narratives: Record<SimulationPhase, StepNarrative>;
}
