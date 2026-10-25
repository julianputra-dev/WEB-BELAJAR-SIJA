// File: src/store/useWormTopologyStore.ts
import { create } from 'zustand';
import { Node, Edge, MarkerType } from '@xyflow/react';
import {
  WormNodeData,
  PacketLogEntry,
  WormLabMissions,
  NodeStatus,
  PostHardeningAuditResult
} from '@/types/wormLab';
import { INITIAL_WORM_NODES, INITIAL_PACKET_LOGS } from '@/data/wormLabInitialData';
import { ProgressService } from '@/services/progressService';

interface WormTopologyStore {
  nodes: Node<WormNodeData>[];
  edges: Edge[];
  selectedNodeId: string;
  bandwidthUsage: number;
  packetRate: number;
  packetLogs: PacketLogEntry[];
  mistakes: number;
  reinfectionAlert: string | null;
  hardeningAuditResult: PostHardeningAuditResult | null;
  completedMissions: WormLabMissions;
  isSimulating: boolean;
  isFullyRemediated: boolean;

  setSelectedNode: (id: string) => void;
  triggerInitialInfection: () => void;
  executeScanningPulse: () => void;
  toggleLanConnection: (nodeId: string) => void;
  togglePort445: (nodeId: string) => void;
  killWormProcess: (nodeId: string) => void;
  clearReinfectionAlert: () => void;
  clearHardeningAuditResult: () => void;
  runPostHardeningTest: () => void;
  resetTopology: () => void;

  // Compatibility helpers
  injectWormPayload: () => void;
  disconnectLan: (nodeId: string) => void;
  reconnectLan: (nodeId: string) => void;
  terminateWormProcess: (nodeId: string) => void;
}

let packetSequence = 1000;
const generatePacketId = (prefix: string) =>
  `pkt-${Date.now()}-${++packetSequence}-${Math.random().toString(36).slice(2, 6)}`;

const getNowTimestamp = () => {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}`;
};

// Kalkulasi dinamis arah animasi dan koneksi edge topologi bintang dengan port terpisah
export const computeNetworkEdges = (nodes: Node<WormNodeData>[]): Edge[] => {
  const spreaders = nodes.filter(
    (n) => n.data.status === 'infected' && n.data.isLanConnected && n.data.processActive
  );
  const hasActiveSpreaders = spreaders.length > 0;
  const hosts = ['pc-01', 'pc-02', 'pc-03', 'server-01'];

  return hosts.map((hostId) => {
    const hostNode = nodes.find((n) => n.id === hostId);
    if (!hostNode) {
      return {
        id: `e-${hostId}-sw`,
        source: hostId,
        target: 'switch-01',
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      };
    }

    // Pemetaan port fisik switch terpisah (mencegah tumpang tindih jalur kabel):
    // PC-01 -> Port Fa0/1 (Sisi Kiri Atas, top: 28%)
    // PC-02 -> Port Fa0/2 (Sisi Kiri Bawah, top: 72%)
    // PC-03 -> Port Fa0/3 (Sisi Kanan Atas, top: 28%)
    // Server -> Port Gi0/1 (Sisi Kanan Bawah, top: 72%)
    let hostSideSrc = 'right-src';
    let hostSideTgt = 'right-tgt';
    let swSideSrc = 'sw-port-pc1-src';
    let swSideTgt = 'sw-port-pc1-tgt';

    if (hostId === 'pc-01') {
      hostSideSrc = 'right-src';
      hostSideTgt = 'right-tgt';
      swSideSrc = 'sw-port-pc1-src';
      swSideTgt = 'sw-port-pc1-tgt';
    } else if (hostId === 'pc-02') {
      hostSideSrc = 'right-src';
      hostSideTgt = 'right-tgt';
      swSideSrc = 'sw-port-pc2-src';
      swSideTgt = 'sw-port-pc2-tgt';
    } else if (hostId === 'pc-03') {
      hostSideSrc = 'left-src';
      hostSideTgt = 'left-tgt';
      swSideSrc = 'sw-port-pc3-src';
      swSideTgt = 'sw-port-pc3-tgt';
    } else if (hostId === 'server-01') {
      hostSideSrc = 'left-src';
      hostSideTgt = 'left-tgt';
      swSideSrc = 'sw-port-server-src';
      swSideTgt = 'sw-port-server-tgt';
    }

    // 1. Kabel LAN Terputus (Link Down)
    if (!hostNode.data.isLanConnected) {
      return {
        id: `e-${hostId}-sw`,
        source: hostId,
        sourceHandle: hostSideSrc,
        target: 'switch-01',
        targetHandle: swSideTgt,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#cbd5e1', strokeWidth: 1.5, strokeDasharray: '4,4' },
      };
    }

    // 2. Komputer ini adalah Penyerang Aktif (Infected Spreader)
    // Arah aliran animasi: DARI KOMPUTER TERINFEKSI -> MENUJU SWITCH!
    const isSpreader = hostNode.data.status === 'infected' && hostNode.data.processActive;
    if (isSpreader) {
      return {
        id: `e-${hostId}-sw`,
        source: hostId,
        sourceHandle: hostSideSrc,
        target: 'switch-01',
        targetHandle: swSideTgt,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#ef4444', strokeWidth: 3 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#ef4444',
          width: 14,
          height: 14,
        },
      };
    }

    // 3. Komputer belum terinfeksi, tetapi ada spreader lain di jaringan
    // Arah aliran animasi: DARI SWITCH -> MENUJU KOMPUTER TARGET!
    if (hasActiveSpreaders) {
      if (hostNode.data.port445Open) {
        // Rentan: Aliran paket eksploitasi menembus port
        return {
          id: `e-${hostId}-sw`,
          source: 'switch-01',
          sourceHandle: swSideSrc,
          target: hostId,
          targetHandle: hostSideTgt,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#f97316', strokeWidth: 2.5 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#f97316',
            width: 14,
            height: 14,
          },
        };
      } else {
        // Terproteksi / Firewall block: Paket probe terhenti di firewall
        return {
          id: `e-${hostId}-sw`,
          source: 'switch-01',
          sourceHandle: swSideSrc,
          target: hostId,
          targetHandle: hostSideTgt,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5,5' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#3b82f6',
            width: 12,
            height: 12,
          },
        };
      }
    }

    // 4. Jaringan Steril / Tenang (Normal)
    return {
      id: `e-${hostId}-sw`,
      source: hostId,
      sourceHandle: hostSideSrc,
      target: 'switch-01',
      targetHandle: swSideTgt,
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#94a3b8', strokeWidth: 2 },
    };
  });
};

// Evaluasi status misi investigasi & pemulihan total
const evaluateMissions = (
  nodes: Node<WormNodeData>[],
  prevMissions: WormLabMissions
): { missions: WormLabMissions; isFullyRemediated: boolean } => {
  const pcs = nodes.filter((n) => n.data.deviceType === 'pc');

  const step1 = prevMissions.step1;
  const anyIsolated = prevMissions.step2 || pcs.some((n) => !n.data.isLanConnected);
  const allPortsBlocked = pcs.length > 0 && pcs.every((n) => !n.data.port445Open);

  // Kriteria penyelesaian penuh:
  // Semua PC di lab bebas dari worm_service, port 445 diblokir di firewall, dan kabel LAN terhubung kembali
  const allCleanAndSecured =
    pcs.length > 0 &&
    pcs.every(
      (n) => !n.data.processActive && !n.data.port445Open && n.data.isLanConnected
    );

  return {
    missions: {
      step1: step1,
      step2: allCleanAndSecured ? true : anyIsolated,
      step3: allCleanAndSecured ? true : prevMissions.step3 || allPortsBlocked,
      step4: allCleanAndSecured,
    },
    isFullyRemediated: allCleanAndSecured,
  };
};

export const useWormTopologyStore = create<WormTopologyStore>((set, get) => ({
  nodes: INITIAL_WORM_NODES,
  edges: computeNetworkEdges(INITIAL_WORM_NODES),
  selectedNodeId: 'pc-01',
  bandwidthUsage: 6,
  packetRate: 14,
  packetLogs: INITIAL_PACKET_LOGS,
  mistakes: 0,
  reinfectionAlert: null,
  hardeningAuditResult: null,
  completedMissions: {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  },
  isSimulating: false,
  isFullyRemediated: false,

  setSelectedNode: (id: string) => set({ selectedNodeId: id }),

  triggerInitialInfection: () => {
    const time = getNowTimestamp();
    const newLog: PacketLogEntry = {
      id: generatePacketId('exploit-init'),
      timestamp: time,
      sourceIp: '192.168.10.250',
      targetIp: '192.168.10.11',
      protocol: 'SMB/TCP',
      port: 445,
      info: '[CVE-2017-0144 EternalBlue] Buffer overflow payload injected -> worm_service.exe spawned (PID 4450)',
      type: 'exploit',
    };

    const updatedNodes: Node<WormNodeData>[] = get().nodes.map((n) =>
      n.id === 'pc-01'
        ? {
            ...n,
            data: {
              ...n.data,
              status: 'infected' as NodeStatus,
              processActive: true,
              cpuUsage: 94,
              ramUsage: 78,
              packetsSent: n.data.packetsSent + 250,
            },
          }
        : n
    );

    const updatedEdges = computeNetworkEdges(updatedNodes);

    set((state) => ({
      isSimulating: true,
      hardeningAuditResult: null,
      bandwidthUsage: 45,
      packetRate: 480,
      packetLogs: [newLog, ...state.packetLogs].slice(0, 50),
      completedMissions: { ...state.completedMissions, step1: true },
      nodes: updatedNodes,
      edges: updatedEdges,
    }));
  },

  // UJI PENETRASI PASCA-MITIGASI (Re-Attack Validation Engine)
  runPostHardeningTest: () => {
    const { nodes } = get();
    const time = getNowTimestamp();
    const pcs = nodes.filter((n) => n.data.deviceType === 'pc');

    const testedHosts = pcs.map((pc) => {
      const isBlocked = !pc.data.port445Open;
      return {
        nodeId: pc.id,
        label: pc.data.label,
        ipAddress: pc.data.ipAddress,
        portStatus: isBlocked ? ('BLOCK' as const) : ('ALLOW' as const),
        firewallResult: isBlocked ? ('DROPPED' as const) : ('EXPLOITED' as const),
        isSafe: isBlocked,
      };
    });

    const allSafe = testedHosts.every((h) => h.isSafe);
    const blockedCount = testedHosts.filter((h) => h.isSafe).length;

    const newLogs: PacketLogEntry[] = [
      {
        id: generatePacketId('audit-init'),
        timestamp: time,
        sourceIp: '192.168.10.250',
        targetIp: '192.168.10.255',
        protocol: 'SMB/TCP',
        port: 445,
        info: '[POST-HARDENING RE-ATTACK AUDIT] Adversary fired SMBv1 EternalBlue exploit probe buffer (4096 bytes) across subnet',
        type: 'exploit',
      },
      ...testedHosts.map((h) => ({
        id: generatePacketId(`audit-${h.nodeId}`),
        timestamp: time,
        sourceIp: '192.168.10.250',
        targetIp: h.ipAddress,
        protocol: 'TCP SYN' as const,
        port: 445,
        info: h.isSafe
          ? `[FIREWALL DROP] Inbound TCP 445 rejected on ${h.ipAddress} (TCP RST sent). worm_service.exe injection prevented!`
          : `[CRITICAL COMPROMISE] Port 445 ALLOW on ${h.ipAddress}! Exploit executed -> Re-infection active!`,
        type: h.isSafe ? ('dropped' as const) : ('exploit' as const),
      })),
    ];

    let updatedNodes = nodes;
    if (!allSafe) {
      updatedNodes = nodes.map((n) => {
        const match = testedHosts.find((h) => h.nodeId === n.id);
        if (match && !match.isSafe) {
          return {
            ...n,
            data: {
              ...n.data,
              status: 'infected' as NodeStatus,
              processActive: true,
              cpuUsage: 94,
            },
          };
        }
        return n;
      });
    }

    const auditResult: PostHardeningAuditResult = {
      timestamp: time,
      testedHosts,
      isResilient: allSafe,
      blockedCount,
      totalTested: testedHosts.length,
    };

    set((state) => ({
      hardeningAuditResult: auditResult,
      packetLogs: [...newLogs, ...state.packetLogs].slice(0, 50),
      nodes: updatedNodes,
      edges: computeNetworkEdges(updatedNodes),
      bandwidthUsage: allSafe ? 8 : 65,
      packetRate: allSafe ? 24 : 450,
      isSimulating: !allSafe,
    }));
  },

  clearHardeningAuditResult: () => set({ hardeningAuditResult: null }),

  executeScanningPulse: () => {
    const { nodes, isSimulating } = get();
    if (!isSimulating) return;

    const spreaders = nodes.filter(
      (n) => n.data.status === 'infected' && n.data.isLanConnected && n.data.processActive
    );

    if (spreaders.length === 0) {
      set((state) => ({
        bandwidthUsage: 8,
        packetRate: 12,
        edges: computeNetworkEdges(state.nodes),
      }));
      return;
    }

    const time = getNowTimestamp();
    const newLogs: PacketLogEntry[] = [];
    let updatedNodes = [...nodes];

    spreaders.forEach((spreader) => {
      nodes.forEach((target) => {
        if (target.id === spreader.id || target.id === 'switch-01') return;

        if (target.data.isLanConnected) {
          if (target.data.port445Open && !target.data.processActive) {
            updatedNodes = updatedNodes.map((n) =>
              n.id === target.id
                ? {
                    ...n,
                    data: {
                      ...n.data,
                      status: 'infected' as NodeStatus,
                      processActive: true,
                      cpuUsage: 92,
                      ramUsage: 72,
                      packetsReceived: n.data.packetsReceived + 120,
                    },
                  }
                : n
            );
            newLogs.push({
              id: generatePacketId(`spread-${target.id}`),
              timestamp: time,
              sourceIp: spreader.data.ipAddress,
              targetIp: target.data.ipAddress,
              protocol: 'SMB/TCP',
              port: 445,
              info: `[AUTONOMOUS SPREAD] SMB Trans2 Secondary payload executed on ${target.data.ipAddress}:445 -> worm_service active!`,
              type: 'exploit',
            });
          } else if (!target.data.port445Open) {
            newLogs.push({
              id: generatePacketId(`drop-${target.id}`),
              timestamp: time,
              sourceIp: spreader.data.ipAddress,
              targetIp: target.data.ipAddress,
              protocol: 'TCP SYN',
              port: 445,
              info: `[FIREWALL DROP] Inbound probe on port 445 rejected by host firewall on ${target.data.ipAddress} (TCP RST/ACK)`,
              type: 'dropped',
            });
          }
        }
      });
    });

    const activeSpreadersCount = updatedNodes.filter(
      (n) => n.data.status === 'infected' && n.data.isLanConnected && n.data.processActive
    ).length;

    const calcBw = Math.min(100, Math.max(35, activeSpreadersCount * 34));
    const calcPps = activeSpreadersCount * 420;

    // Hitung ulang arah edge dengan port terpisah
    const updatedEdges = computeNetworkEdges(updatedNodes);

    set((state) => ({
      nodes: updatedNodes,
      bandwidthUsage: calcBw,
      packetRate: calcPps,
      packetLogs: [...newLogs, ...state.packetLogs].slice(0, 50),
      edges: updatedEdges,
    }));
  },

  toggleLanConnection: (nodeId: string) => {
    const { nodes } = get();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const willConnect = !node.data.isLanConnected;
    const time = getNowTimestamp();

    if (willConnect) {
      const otherActiveSpreaders = nodes.some(
        (n) => n.id !== nodeId && n.data.status === 'infected' && n.data.isLanConnected && n.data.processActive
      );

      // Skenario Kesalahan 2: Re-koneksi tanpa menutup Port 445
      if (node.data.port445Open && otherActiveSpreaders) {
        const alertMsg = `⚠️ SIKLUS RE-INFEKSI TERJADI: Anda menyambungkan kembali kabel LAN pada ${node.data.label} sementara Port 445 masih OPEN di Firewall! Host tetangga di jaringan langsung menyusupkan paket eksploitasi SMB.`;
        const log: PacketLogEntry = {
          id: generatePacketId('reinf-lan'),
          timestamp: time,
          sourceIp: '192.168.10.11',
          targetIp: node.data.ipAddress,
          protocol: 'SMB/TCP',
          port: 445,
          info: `[CRITICAL RE-INFECTION] Port 445 OPEN on reconnect! Instant SMB exploit re-injected worm_service.exe`,
          type: 'exploit',
        };

        const reinfNodes: Node<WormNodeData>[] = nodes.map((n) =>
          n.id === nodeId
            ? {
                ...n,
                data: {
                  ...n.data,
                  isLanConnected: true,
                  status: 'infected' as NodeStatus,
                  processActive: true,
                  cpuUsage: 94,
                },
              }
            : n
        );

        set((state) => ({
          mistakes: state.mistakes + 1,
          reinfectionAlert: alertMsg,
          packetLogs: [log, ...state.packetLogs].slice(0, 50),
          nodes: reinfNodes,
          edges: computeNetworkEdges(reinfNodes),
        }));
        return;
      }
    }

    set((state) => {
      const updatedNodes: Node<WormNodeData>[] = state.nodes.map((n) => {
        if (n.id !== nodeId) return n;
        const newStatus: NodeStatus = !willConnect
          ? n.data.status === 'infected'
            ? 'isolated'
            : n.data.status
          : !n.data.port445Open && !n.data.processActive
          ? 'patched'
          : n.data.status;
        return {
          ...n,
          data: {
            ...n.data,
            isLanConnected: willConnect,
            status: newStatus,
          },
        };
      });

      const { missions, isFullyRemediated } = evaluateMissions(
        updatedNodes,
        state.completedMissions
      );

      if (isFullyRemediated) {
        ProgressService.saveModuleProgress({
          malwareType: 'worm',
          infectionObserved: true,
          mitigationCompleted: true,
          mistakeCount: state.mistakes,
          updatedAt: new Date().toISOString(),
        });
      }

      return {
        nodes: updatedNodes,
        completedMissions: missions,
        isFullyRemediated,
        bandwidthUsage: isFullyRemediated ? 6 : state.bandwidthUsage,
        packetRate: isFullyRemediated ? 12 : state.packetRate,
        isSimulating: isFullyRemediated ? false : state.isSimulating,
        edges: computeNetworkEdges(updatedNodes),
      };
    });
  },

  togglePort445: (nodeId: string) => {
    set((state) => {
      const target = state.nodes.find((n) => n.id === nodeId);
      if (!target) return state;

      const willOpen = !target.data.port445Open;
      const updatedNodes: Node<WormNodeData>[] = state.nodes.map((n) => {
        if (n.id !== nodeId) return n;
        const newStatus: NodeStatus =
          !willOpen && !n.data.processActive && n.data.isLanConnected
            ? 'patched'
            : !willOpen && n.data.status === 'isolated'
            ? 'isolated'
            : n.data.status;
        return {
          ...n,
          data: {
            ...n.data,
            port445Open: willOpen,
            status: newStatus,
          },
        };
      });

      const { missions, isFullyRemediated } = evaluateMissions(
        updatedNodes,
        state.completedMissions
      );

      if (isFullyRemediated) {
        ProgressService.saveModuleProgress({
          malwareType: 'worm',
          infectionObserved: true,
          mitigationCompleted: true,
          mistakeCount: state.mistakes,
          updatedAt: new Date().toISOString(),
        });
      }

      return {
        nodes: updatedNodes,
        completedMissions: missions,
        isFullyRemediated,
        bandwidthUsage: isFullyRemediated ? 6 : state.bandwidthUsage,
        packetRate: isFullyRemediated ? 12 : state.packetRate,
        isSimulating: isFullyRemediated ? false : state.isSimulating,
        edges: computeNetworkEdges(updatedNodes),
      };
    });
  },

  killWormProcess: (nodeId: string) => {
    const { nodes } = get();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const time = getNowTimestamp();
    const otherSpreaders = nodes.some(
      (n) => n.id !== nodeId && n.data.status === 'infected' && n.data.isLanConnected && n.data.processActive
    );

    // Skenario Kesalahan 1: Kill process saat LAN masih tersambung & Port 445 masih OPEN
    if (node.data.isLanConnected && node.data.port445Open && otherSpreaders) {
      const alertMsg = `⚠️ SIKLUS RE-INFEKSI TERJADI: Anda mematikan proses di RAM pada ${node.data.label} tanpa mengisolasi kabel LAN dan tanpa menutup Port 445! Dalam detak pemindaian jaringan, worm dari node tetangga langsung mengirim paket eksploitasi SMB ulang dan menginjeksi kembali proses worm_service.exe.`;
      const log: PacketLogEntry = {
        id: generatePacketId('reinf-kill'),
        timestamp: time,
        sourceIp: '192.168.10.12',
        targetIp: node.data.ipAddress,
        protocol: 'SMB/TCP',
        port: 445,
        info: `[RE-INFECTION TRIGGERED] worm_service killed without network isolation! Neighbor SMB sweep immediately re-spawned payload.`,
        type: 'exploit',
      };

      set((state) => ({
        mistakes: state.mistakes + 1,
        reinfectionAlert: alertMsg,
        packetLogs: [log, ...state.packetLogs].slice(0, 50),
      }));
      return;
    }

    set((state) => {
      const updatedNodes: Node<WormNodeData>[] = state.nodes.map((n) => {
        if (n.id !== nodeId) return n;
        const newStatus: NodeStatus = !n.data.port445Open && n.data.isLanConnected ? 'patched' : 'clean';
        return {
          ...n,
          data: {
            ...n.data,
            processActive: false,
            cpuUsage: 11,
            ramUsage: 25,
            status: newStatus,
          },
        };
      });

      const { missions, isFullyRemediated } = evaluateMissions(
        updatedNodes,
        state.completedMissions
      );

      if (isFullyRemediated) {
        ProgressService.saveModuleProgress({
          malwareType: 'worm',
          infectionObserved: true,
          mitigationCompleted: true,
          mistakeCount: state.mistakes,
          updatedAt: new Date().toISOString(),
        });
      }

      return {
        nodes: updatedNodes,
        completedMissions: missions,
        isFullyRemediated,
        bandwidthUsage: isFullyRemediated ? 6 : state.bandwidthUsage,
        packetRate: isFullyRemediated ? 12 : state.packetRate,
        isSimulating: isFullyRemediated ? false : state.isSimulating,
        edges: computeNetworkEdges(updatedNodes),
      };
    });
  },

  clearReinfectionAlert: () => set({ reinfectionAlert: null }),

  resetTopology: () =>
    set({
      nodes: INITIAL_WORM_NODES,
      edges: computeNetworkEdges(INITIAL_WORM_NODES),
      selectedNodeId: 'pc-01',
      bandwidthUsage: 6,
      packetRate: 14,
      packetLogs: INITIAL_PACKET_LOGS,
      mistakes: 0,
      reinfectionAlert: null,
      hardeningAuditResult: null,
      completedMissions: {
        step1: false,
        step2: false,
        step3: false,
        step4: false,
      },
      isSimulating: false,
      isFullyRemediated: false,
    }),

  // Compatibility helpers
  injectWormPayload: () => get().triggerInitialInfection(),
  disconnectLan: (nodeId: string) => {
    const node = get().nodes.find((n) => n.id === nodeId);
    if (node && node.data.isLanConnected) get().toggleLanConnection(nodeId);
  },
  reconnectLan: (nodeId: string) => {
    const node = get().nodes.find((n) => n.id === nodeId);
    if (node && !node.data.isLanConnected) get().toggleLanConnection(nodeId);
  },
  terminateWormProcess: (nodeId: string) => get().killWormProcess(nodeId),
}));
