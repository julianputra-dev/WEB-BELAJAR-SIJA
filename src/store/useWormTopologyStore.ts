// File: src/store/useWormTopologyStore.ts
import { create } from 'zustand';
import { SimulationNode, SimulationEdge } from '@/types/simulation';

interface WormTopologyStore {
  nodes: SimulationNode[];
  edges: SimulationEdge[];
  bandwidthUsage: number; // 0 - 100%
  injectWormPayload: () => void;
  disconnectLan: (nodeId: string) => void;
  reconnectLan: (nodeId: string) => void;
  togglePort445: (nodeId: string, open: boolean) => void;
  terminateWormProcess: (nodeId: string) => void;
  resetTopology: () => void;
  updateNodeStatus: (nodeId: string, updates: Partial<SimulationNode['data']>) => void;
}

const initialNodes: SimulationNode[] = [
  {
    id: 'pc-01',
    type: 'default',
    position: { x: 100, y: 120 },
    data: {
      label: 'PC-SIJA-01 (Target Awal)',
      ipAddress: '192.168.10.11',
      deviceType: 'pc',
      port445Open: true,
      isLanConnected: true,
      processActive: false,
      status: 'clean',
      cpuUsage: 8,
    },
  },
  {
    id: 'switch-01',
    type: 'default',
    position: { x: 380, y: 220 },
    data: {
      label: 'Switch Lab-SIJA',
      ipAddress: '192.168.10.1',
      deviceType: 'switch',
      port445Open: false,
      isLanConnected: true,
      processActive: false,
      status: 'clean',
      cpuUsage: 12,
    },
  },
  {
    id: 'pc-02',
    type: 'default',
    position: { x: 650, y: 100 },
    data: {
      label: 'PC-SIJA-02',
      ipAddress: '192.168.10.12',
      deviceType: 'pc',
      port445Open: true,
      isLanConnected: true,
      processActive: false,
      status: 'clean',
      cpuUsage: 10,
    },
  },
  {
    id: 'pc-03',
    type: 'default',
    position: { x: 650, y: 320 },
    data: {
      label: 'PC-SIJA-03',
      ipAddress: '192.168.10.13',
      deviceType: 'pc',
      port445Open: true,
      isLanConnected: true,
      processActive: false,
      status: 'clean',
      cpuUsage: 9,
    },
  },
];

const initialEdges: SimulationEdge[] = [
  { id: 'e-pc1-sw', source: 'pc-01', target: 'switch-01', animated: false },
  { id: 'e-pc2-sw', source: 'pc-02', target: 'switch-01', animated: false },
  { id: 'e-pc3-sw', source: 'pc-03', target: 'switch-01', animated: false },
];

export const useWormTopologyStore = create<WormTopologyStore>((set) => ({
  nodes: initialNodes,
  edges: initialEdges,
  bandwidthUsage: 5,

  injectWormPayload: () =>
    set((state) => ({
      bandwidthUsage: 98,
      nodes: state.nodes.map((n) =>
        n.id === 'pc-01'
          ? {
              ...n,
              data: {
                ...n.data,
                status: 'infected',
                processActive: true,
                cpuUsage: 94,
              },
            }
          : n
      ),
      edges: state.edges.map((e) => ({ ...e, animated: true })),
    })),

  disconnectLan: (nodeId: string) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              data: {
                ...n.data,
                isLanConnected: false,
                status: n.data.status === 'infected' ? 'isolated' : n.data.status,
              },
            }
          : n
      ),
      edges: state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
      bandwidthUsage: 25,
    })),

  reconnectLan: (nodeId: string) =>
    set((state) => {
      const newEdges = [...state.edges];
      if (!newEdges.some((e) => e.source === nodeId || e.target === nodeId)) {
        newEdges.push({
          id: `e-${nodeId}-sw`,
          source: nodeId,
          target: 'switch-01',
          animated: false,
        });
      }
      return {
        edges: newEdges,
        nodes: state.nodes.map((n) =>
          n.id === nodeId
            ? { ...n, data: { ...n.data, isLanConnected: true } }
            : n
        ),
      };
    }),

  togglePort445: (nodeId: string, open: boolean) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              data: {
                ...n.data,
                port445Open: open,
                status: !open && n.data.status === 'isolated' ? 'patched' : n.data.status,
              },
            }
          : n
      ),
    })),

  terminateWormProcess: (nodeId: string) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              data: {
                ...n.data,
                processActive: false,
                cpuUsage: 12,
                status: 'clean',
              },
            }
          : n
      ),
      bandwidthUsage: 10,
    })),

  resetTopology: () =>
    set({
      nodes: initialNodes,
      edges: initialEdges,
      bandwidthUsage: 5,
    }),

  updateNodeStatus: (nodeId: string, updates: Partial<SimulationNode['data']>) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              data: {
                ...n.data,
                ...updates,
              },
            }
          : n
      ),
    })),
}));
