// File: src/types/wormLab.ts

export type NodeStatus = 'clean' | 'infected' | 'scanning' | 'isolated' | 'patched';

export interface WormNodeData extends Record<string, unknown> {
  label: string;
  ipAddress: string;
  deviceType: 'pc' | 'switch' | 'server';
  macAddress: string;
  osName: string;
  port445Open: boolean;
  isLanConnected: boolean;
  processActive: boolean;
  status: NodeStatus;
  cpuUsage: number;
  ramUsage: number;
  packetsReceived: number;
  packetsSent: number;
}

export interface PacketLogEntry {
  id: string;
  timestamp: string;
  sourceIp: string;
  targetIp: string;
  protocol: 'SMB/TCP' | 'TCP SYN' | 'ICMP' | 'ARP';
  port: number;
  info: string;
  type: 'exploit' | 'scan' | 'dropped' | 'normal';
}

export interface WormLabMissions {
  step1: boolean; // Triage & amati propagasi
  step2: boolean; // Isolasi kabel LAN host terinfeksi
  step3: boolean; // Blokir Port 445 pada firewall
  step4: boolean; // Kill worm_service.exe di RAM & verifikasi rekoneksi
}

export interface PostHardeningAuditResult {
  timestamp: string;
  testedHosts: {
    nodeId: string;
    label: string;
    ipAddress: string;
    portStatus: 'BLOCK' | 'ALLOW';
    firewallResult: 'DROPPED' | 'EXPLOITED';
    isSafe: boolean;
  }[];
  isResilient: boolean;
  blockedCount: number;
  totalTested: number;
}

