// File: src/store/useTrojanLabStore.ts
import { create } from 'zustand';
import { ProgressService } from '@/services/progressService';

export interface TrojanProcess {
  pid: number;
  ppid: number;
  name: string;
  command: string;
  cpuPercent: number;
  memoryMB: number;
  isMalicious: boolean;
  status: 'running' | 'terminated';
  description: string;
}

export interface NetstatSocket {
  id: string;
  proto: 'TCP' | 'UDP';
  localAddress: string;
  foreignAddress: string;
  remoteIp: string;
  remotePort: number;
  state: 'ESTABLISHED' | 'LISTENING' | 'TIME_WAIT' | 'CLOSED';
  pid: number;
  processName: string;
  appType: 'offline' | 'normal_network' | 'trojan' | 'system';
}

export interface ExfilPacket {
  id: string;
  timestamp: string;
  socketId: string;
  protocol: string;
  source: string;
  destination: string;
  dataSummary: string;
  sizeBytes: number;
  isMalicious: boolean;
  isBlocked: boolean;
}

export interface EDRLogEntry {
  id: string;
  timestamp: string;
  category: 'SYSCALL' | 'NETSTAT' | 'FIREWALL' | 'KERNEL' | 'REGISTRY';
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
}

export interface TrojanLabMissions {
  mission1: boolean; // 1. Observasi 3 Aplikasi & Lacak PID Anomali di Netstat
  mission2: boolean; // 2. Blokir Firewall C2 & Hentikan Proses di RAM
  mission3: boolean; // 3. Hapus Biner Induk & Bersihkan Persistensi Startup
  mission4: boolean; // 4. Validasi Pasca-Remediasi (Reboot & Hardening Audit)
}

interface TrojanLabState {
  // 3 Applications state in Panel 1
  appOffline: {
    name: string;
    pid: number;
    isRunning: boolean;
    isGuiOpen: boolean;
    notesContent: string;
  };
  appNetwork: {
    name: string;
    pid: number;
    isRunning: boolean;
    isGuiOpen: boolean;
    lastCity: string;
    tempC: number;
    syncCount: number;
  };
  appTrojan: {
    name: string;
    pid: number;
    isRunning: boolean;
    isGuiOpen: boolean; // Supports "Tutup Jendela (X)" while isRunning remains true!
    calcDisplay: string;
    calcPreviousValue: number | null;
    calcOperation: string | null;
    calcClearOnNextDigit: boolean;
  };

  // Telemetry & Selection state
  selectedSocketId: string | null;
  netstatFilter: string;

  // Firewall configuration state (Zero-prefill)
  firewallInputIp: string;
  firewallInputPort: string;
  isFirewallBlocked: boolean;
  blockedTargetSummary: string | null;

  // Remediation states
  isProcessKilled: boolean;
  isFileDeleted: boolean;
  isStartupCleaned: boolean;
  respawnCountdown: number | null;

  // Mistakes & Audits
  mistakes: number;
  showFileInUseModal: boolean;
  showRebootModal: boolean;
  rebootAuditResult: 'idle' | 'reinfected' | 'clean';
  completedMissions: TrojanLabMissions;
  isFullyRemediated: boolean;

  // Collections
  processes: TrojanProcess[];
  netstatSockets: NetstatSocket[];
  exfilPackets: ExfilPacket[];
  logs: EDRLogEntry[];

  // Actions
  launchApp: (appKey: 'offline' | 'network' | 'trojan') => void;
  closeAppGui: (appKey: 'offline' | 'network' | 'trojan') => void;
  terminateAppCompletely: (appKey: 'offline' | 'network') => void;

  // Calculator & App Actions
  pressCalcButton: (key: string) => void;
  updateNotesContent: (text: string) => void;
  triggerWeatherSync: () => void;

  // Telemetry selection & Firewall actions
  selectNetstatSocket: (socketId: string) => void;
  setNetstatFilter: (filter: string) => void;
  setFirewallInputIp: (ip: string) => void;
  setFirewallInputPort: (port: string) => void;
  useSelectedSocketForFirewall: () => void;
  applyFirewallRule: () => void;
  removeFirewallRule: () => void;

  // RAM & SOP Actions
  terminateProcessByPid: (pid: number) => void;
  deleteAppBinary: () => void;
  cleanStartupRegistry: () => void;

  // Modals
  closeFileInUseModal: () => void;
  openRebootModal: () => void;
  closeRebootModal: () => void;
  executeRebootSequence: () => Promise<void>;
  resetLab: () => void;
}

const getClientTimestamp = () => {
  if (typeof window === 'undefined') return '10:00:00.000';
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
};

// Deterministic baseline data for SSR hydration safety
const BASELINE_PROCESSES: TrojanProcess[] = [
  {
    pid: 4,
    ppid: 0,
    name: 'System',
    command: 'ntoskrnl.exe',
    cpuPercent: 0.4,
    memoryMB: 16.2,
    isMalicious: false,
    status: 'running',
    description: 'NT Kernel & System Thread Coordinator',
  },
  {
    pid: 896,
    ppid: 620,
    name: 'svchost.exe',
    command: 'C:\\Windows\\System32\\svchost.exe -k DcomLaunch',
    cpuPercent: 0.2,
    memoryMB: 28.5,
    isMalicious: false,
    status: 'running',
    description: 'Host Process for Windows Services',
  },
  {
    pid: 1420,
    ppid: 1042,
    name: 'explorer.exe',
    command: 'C:\\Windows\\explorer.exe',
    cpuPercent: 1.6,
    memoryMB: 68.4,
    isMalicious: false,
    status: 'running',
    description: 'Windows GUI Shell & Desktop Manager',
  },
];

const BASELINE_SOCKETS: NetstatSocket[] = [
  {
    id: 'sock-sys-1',
    proto: 'TCP',
    localAddress: '127.0.0.1:135',
    foreignAddress: '0.0.0.0:0',
    remoteIp: '0.0.0.0',
    remotePort: 0,
    state: 'LISTENING',
    pid: 896,
    processName: 'svchost.exe',
    appType: 'system',
  },
  {
    id: 'sock-sys-2',
    proto: 'TCP',
    localAddress: '192.168.10.15:445',
    foreignAddress: '0.0.0.0:0',
    remoteIp: '0.0.0.0',
    remotePort: 0,
    state: 'LISTENING',
    pid: 4,
    processName: 'System',
    appType: 'system',
  },
];

const INITIAL_LOGS: EDRLogEntry[] = [
  {
    id: 'log-01',
    timestamp: '10:00:00.000',
    category: 'SYSCALL',
    level: 'info',
    message: 'Laboratorium Forensik aktif dalam Mode Investigasi Mandiri (Zero-Spoiler).',
  },
  {
    id: 'log-02',
    timestamp: '10:00:00.120',
    category: 'KERNEL',
    level: 'info',
    message: 'Tersedia 3 biner utilitas di direktori pengujian. Jalankan dan amati telemetri untuk menemukan anomali siluman.',
  },
];

export const useTrojanLabStore = create<TrojanLabState>((set, get) => ({
  // 3 Apps
  appOffline: {
    name: 'Catatan_Sistem.exe',
    pid: 2104,
    isRunning: false,
    isGuiOpen: false,
    notesContent: 'Daftar inventaris workstation laboratorium forensik SIJA.\nSemua utilitas offline aman untuk eksekusi lokal.',
  },
  appNetwork: {
    name: 'WeatherSync_Pro.exe',
    pid: 2540,
    isRunning: false,
    isGuiOpen: false,
    lastCity: 'Jakarta',
    tempC: 28,
    syncCount: 0,
  },
  appTrojan: {
    name: 'SuperCalc_Pro.exe',
    pid: 3892,
    isRunning: false,
    isGuiOpen: false,
    calcDisplay: '0',
    calcPreviousValue: null,
    calcOperation: null,
    calcClearOnNextDigit: false,
  },

  selectedSocketId: null,
  netstatFilter: '',

  firewallInputIp: '',
  firewallInputPort: '',
  isFirewallBlocked: false,
  blockedTargetSummary: null,

  isProcessKilled: false,
  isFileDeleted: false,
  isStartupCleaned: false,
  respawnCountdown: null,

  mistakes: 0,
  showFileInUseModal: false,
  showRebootModal: false,
  rebootAuditResult: 'idle',
  completedMissions: {
    mission1: false,
    mission2: false,
    mission3: false,
    mission4: false,
  },
  isFullyRemediated: false,

  processes: BASELINE_PROCESSES,
  netstatSockets: BASELINE_SOCKETS,
  exfilPackets: [],
  logs: INITIAL_LOGS,

  launchApp: (appKey) => {
    const time = getClientTimestamp();
    const state = get();

    if (appKey === 'offline') {
      const isAlreadyIn = state.processes.some((p) => p.pid === 2104);
      const newProc: TrojanProcess = {
        pid: 2104,
        ppid: 1420,
        name: 'Catatan_Sistem.exe',
        command: 'C:\\ProgramData\\AppSuite\\Catatan_Sistem.exe',
        cpuPercent: 0.1,
        memoryMB: 14.2,
        isMalicious: false,
        status: 'running',
        description: 'Teks Editor Utilitas Lokal (Offline)',
      };

      set({
        appOffline: { ...state.appOffline, isRunning: true, isGuiOpen: true },
        processes: isAlreadyIn
          ? state.processes.map((p) => (p.pid === 2104 ? { ...p, status: 'running' } : p))
          : [...state.processes, newProc],
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: time,
            category: 'SYSCALL',
            level: 'info',
            message: 'Catatan_Sistem.exe (PID 2104) dijalankan. Biner utilitas teks offline aktif.',
          },
          ...state.logs,
        ],
      });
    } else if (appKey === 'network') {
      const isAlreadyIn = state.processes.some((p) => p.pid === 2540);
      const newProc: TrojanProcess = {
        pid: 2540,
        ppid: 1420,
        name: 'WeatherSync_Pro.exe',
        command: 'C:\\ProgramData\\AppSuite\\WeatherSync_Pro.exe',
        cpuPercent: 0.3,
        memoryMB: 22.8,
        isMalicious: false,
        status: 'running',
        description: 'Sinkronisasi Waktu & Cuaca (HTTPS Terverifikasi)',
      };

      const weatherSocket: NetstatSocket = {
        id: 'sock-weather',
        proto: 'TCP',
        localAddress: '192.168.10.15:52180',
        foreignAddress: '142.250.190.46:443',
        remoteIp: '142.250.190.46',
        remotePort: 443,
        state: 'ESTABLISHED',
        pid: 2540,
        processName: 'WeatherSync_Pro.exe',
        appType: 'normal_network',
      };

      const weatherPacket: ExfilPacket = {
        id: `pkt-w-${Date.now().toString().slice(-4)}`,
        timestamp: time,
        socketId: 'sock-weather',
        protocol: 'TLS 1.3 / HTTPS',
        source: '192.168.10.15:52180',
        destination: '142.250.190.46:443',
        dataSummary: 'GET /v1/weather?city=Jakarta HTTP/2 (TLS_AES_256_GCM_SHA384, Valid Certificate Authority)',
        sizeBytes: 420,
        isMalicious: false,
        isBlocked: false,
      };

      const socketsWithoutWeather = state.netstatSockets.filter((s) => s.id !== 'sock-weather');

      set({
        appNetwork: { ...state.appNetwork, isRunning: true, isGuiOpen: true, syncCount: state.appNetwork.syncCount + 1 },
        processes: isAlreadyIn
          ? state.processes.map((p) => (p.pid === 2540 ? { ...p, status: 'running' } : p))
          : [...state.processes, newProc],
        netstatSockets: [...socketsWithoutWeather, weatherSocket],
        exfilPackets: [weatherPacket, ...state.exfilPackets.slice(0, 19)],
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: time,
            category: 'NETSTAT',
            level: 'info',
            message: 'WeatherSync_Pro.exe (PID 2540) membuka koneksi TLS 1.3 ke 142.250.190.46:443 (Sertifikat Sah).',
          },
          ...state.logs,
        ],
      });
    } else if (appKey === 'trojan') {
      if (state.isFileDeleted) {
        set({
          logs: [
            {
              id: `log-${Date.now()}`,
              timestamp: time,
              category: 'SYSCALL',
              level: 'error',
              message: 'CreateProcessW GAGAL: SuperCalc_Pro.exe telah dihapus dari direktori instalasi.',
            },
            ...state.logs,
          ],
        });
        return;
      }

      const isAlreadyIn = state.processes.some((p) => p.pid === 3892);
      const trojanProc: TrojanProcess = {
        pid: 3892,
        ppid: 1420,
        name: 'SuperCalc_Pro.exe',
        command: 'C:\\ProgramData\\SuperCalc_Pro\\SuperCalc_Pro.exe',
        cpuPercent: 0.4,
        memoryMB: 34.8,
        isMalicious: true,
        status: 'running',
        description: 'SuperCalc Utility Engine [Sub-thread Backdoor Daemon]',
      };

      const trojanSocket: NetstatSocket = {
        id: 'sock-trojan',
        proto: 'TCP',
        localAddress: '192.168.10.15:49812',
        foreignAddress: '198.51.100.23:4444',
        remoteIp: '198.51.100.23',
        remotePort: 4444,
        state: state.isFirewallBlocked ? 'CLOSED' : 'ESTABLISHED',
        pid: 3892,
        processName: 'SuperCalc_Pro.exe',
        appType: 'trojan',
      };

      const trojanPacket: ExfilPacket = {
        id: `pkt-t-${Date.now().toString().slice(-4)}`,
        timestamp: time,
        socketId: 'sock-trojan',
        protocol: 'RAW TCP (Custom)',
        source: '192.168.10.15:49812',
        destination: '198.51.100.23:4444',
        dataSummary: '{"event":"initial_beacon","host":"DESKTOP-SIJA","os":"Win11","user":"Administrator","stealth_mode":true}',
        sizeBytes: 156,
        isMalicious: true,
        isBlocked: state.isFirewallBlocked,
      };

      const socketsWithoutTrojan = state.netstatSockets.filter((s) => s.id !== 'sock-trojan');

      set({
        appTrojan: { ...state.appTrojan, isRunning: true, isGuiOpen: true },
        isProcessKilled: false,
        processes: isAlreadyIn
          ? state.processes.map((p) => (p.pid === 3892 ? { ...p, status: 'running' } : p))
          : [...state.processes, trojanProc],
        netstatSockets: [...socketsWithoutTrojan, trojanSocket],
        exfilPackets: [trojanPacket, ...state.exfilPackets.slice(0, 19)],
        logs: [
          {
            id: `log-${Date.now()}-1`,
            timestamp: time,
            category: 'SYSCALL',
            level: 'info',
            message: 'SuperCalc_Pro.exe dieksekusi. Antarmuka kalkulator aktif melayani operasi matematika normal.',
          },
          {
            id: `log-${Date.now()}-2`,
            timestamp: time,
            category: 'NETSTAT',
            level: 'info',
            message: 'Tabel soket diperbarui: TCP 192.168.10.15:49812 -> 198.51.100.23:4444 [ESTABLISHED] terdaftar.',
          },
          ...state.logs,
        ],
      });
    }
  },

  closeAppGui: (appKey) => {
    const time = getClientTimestamp();
    const state = get();

    if (appKey === 'offline') {
      set({
        appOffline: { ...state.appOffline, isGuiOpen: false },
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: time,
            category: 'SYSCALL',
            level: 'info',
            message: 'Jendela Catatan_Sistem.exe diminimalkan / ditutup oleh pengguna.',
          },
          ...state.logs,
        ],
      });
    } else if (appKey === 'network') {
      set({
        appNetwork: { ...state.appNetwork, isGuiOpen: false },
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: time,
            category: 'SYSCALL',
            level: 'info',
            message: 'Jendela WeatherSync_Pro.exe diminimalkan ke system tray.',
          },
          ...state.logs,
        ],
      });
    } else if (appKey === 'trojan') {
      // Mekanisme Siluman Trojan: Jendela GUI ditutup, tetapi proses dan soket C2 di RAM tetap hidup!
      set({
        appTrojan: { ...state.appTrojan, isGuiOpen: false },
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: time,
            category: 'KERNEL',
            level: 'warn',
            message: 'PENGAMATAN SILUMAN: Pengguna menekan tombol "Tutup Jendela (X)" pada SuperCalc_Pro.exe. Jendela GUI tertutup, TETAPI proses di RAM (PID 3892) dan koneksi Port 4444 tetap aktif di latar belakang (Background Daemon)!',
          },
          ...state.logs,
        ],
      });
    }
  },

  terminateAppCompletely: (appKey) => {
    const state = get();
    const pidToKill = appKey === 'offline' ? 2104 : 2540;
    const procName = appKey === 'offline' ? 'Catatan_Sistem.exe' : 'WeatherSync_Pro.exe';

    set({
      ...(appKey === 'offline'
        ? { appOffline: { ...state.appOffline, isRunning: false, isGuiOpen: false } }
        : { appNetwork: { ...state.appNetwork, isRunning: false, isGuiOpen: false } }),
      processes: state.processes.filter((p) => p.pid !== pidToKill),
      netstatSockets: state.netstatSockets.filter((s) => s.pid !== pidToKill),
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: getClientTimestamp(),
          category: 'SYSCALL',
          level: 'info',
          message: `Aplikasi normal ${procName} (PID ${pidToKill}) dihentikan sepenuhnya.`,
        },
        ...state.logs,
      ],
    });
  },

  pressCalcButton: (key) => {
    const state = get();
    const { calcDisplay, calcPreviousValue, calcOperation, calcClearOnNextDigit, isRunning } = state.appTrojan;
    const { isProcessKilled, isFileDeleted, isFirewallBlocked, exfilPackets, logs } = state;

    if (!isRunning || isFileDeleted) return;

    let newDisplay = calcDisplay;
    let newPrev = calcPreviousValue;
    let newOp = calcOperation;
    let newClear = calcClearOnNextDigit;

    if (key === 'C') {
      newDisplay = '0';
      newPrev = null;
      newOp = null;
      newClear = false;
    } else if (['+', '-', '*', '/'].includes(key)) {
      const current = parseFloat(calcDisplay);
      if (newPrev !== null && newOp && !newClear) {
        let result = current;
        if (newOp === '+') result = newPrev + current;
        else if (newOp === '-') result = newPrev - current;
        else if (newOp === '*') result = newPrev * current;
        else if (newOp === '/') result = current !== 0 ? newPrev / current : 0;
        newDisplay = String(parseFloat(result.toFixed(6)));
        newPrev = result;
      } else {
        newPrev = current;
      }
      newOp = key;
      newClear = true;
    } else if (key === '=') {
      if (newPrev !== null && newOp) {
        const current = parseFloat(calcDisplay);
        let result = current;
        if (newOp === '+') result = newPrev + current;
        else if (newOp === '-') result = newPrev - current;
        else if (newOp === '*') result = newPrev * current;
        else if (newOp === '/') result = current !== 0 ? newPrev / current : 0;
        newDisplay = String(parseFloat(result.toFixed(6)));
        newPrev = null;
        newOp = null;
        newClear = true;
      }
    } else if (key === '.') {
      if (newClear) {
        newDisplay = '0.';
        newClear = false;
      } else if (!newDisplay.includes('.')) {
        newDisplay += '.';
      }
    } else {
      if (newClear || newDisplay === '0') {
        newDisplay = key;
        newClear = false;
      } else {
        newDisplay = newDisplay.length < 10 ? newDisplay + key : newDisplay;
      }
    }

    // Dual-Behavior Exfiltration Packet:
    const timeStr = getClientTimestamp();
    let updatedPackets = exfilPackets;
    let updatedLogs = logs;

    if (!isProcessKilled && !isFileDeleted) {
      const pktId = `pkt-t-${Date.now().toString().slice(-4)}`;
      if (!isFirewallBlocked) {
        const samplePayloads = [
          `{"calc_input":"${key}","display":"${newDisplay}","keystroke_hook":true,"auth_token":"NTLM-HASH-8b2f90"}`,
          `{"event":"covert_sync","clipboard":"AdminPassword2026","active_window":"SuperCalc_Pro.exe"}`,
          `{"sys_probe":"SAM_HIVE","dump":"aad3b435b51404eeaad3b435b51404ee","target":"198.51.100.23:4444"}`,
        ];
        const payload = samplePayloads[Math.floor(Math.random() * samplePayloads.length)];

        updatedPackets = [
          {
            id: pktId,
            timestamp: timeStr,
            socketId: 'sock-trojan',
            protocol: 'RAW TCP (Port 4444)',
            source: '192.168.10.15:49812',
            destination: '198.51.100.23:4444',
            dataSummary: payload,
            sizeBytes: 172 + Math.floor(Math.random() * 30),
            isMalicious: true,
            isBlocked: false,
          },
          ...exfilPackets.slice(0, 19),
        ];

        updatedLogs = [
          {
            id: `log-${Date.now()}`,
            timestamp: timeStr,
            category: 'NETSTAT',
            level: 'warn',
            message: `Outbound Socket Exfiltration: Thread latar belakang PID 3892 mengirim paket rahasia ke 198.51.100.23:4444 (${updatedPackets[0].sizeBytes} bytes).`,
          },
          ...logs.slice(0, 40),
        ];
      } else {
        updatedPackets = [
          {
            id: pktId,
            timestamp: timeStr,
            socketId: 'sock-trojan',
            protocol: 'RAW TCP (Port 4444)',
            source: '192.168.10.15:49812',
            destination: '198.51.100.23:4444',
            dataSummary: `{"attempted_transmission":"${key}","status":"DROPPED_BY_FIREWALL"}`,
            sizeBytes: 0,
            isMalicious: true,
            isBlocked: true,
          },
          ...exfilPackets.slice(0, 19),
        ];

        updatedLogs = [
          {
            id: `log-${Date.now()}`,
            timestamp: timeStr,
            category: 'FIREWALL',
            level: 'info',
            message: `Host Firewall Rule: Paket keluar dari PID 3892 ke 198.51.100.23:4444 berhasil di-DROP.`,
          },
          ...logs.slice(0, 40),
        ];
      }
    }

    set({
      appTrojan: {
        ...state.appTrojan,
        calcDisplay: newDisplay,
        calcPreviousValue: newPrev,
        calcOperation: newOp,
        calcClearOnNextDigit: newClear,
      },
      exfilPackets: updatedPackets,
      logs: updatedLogs,
    });
  },

  updateNotesContent: (text) => {
    set((state) => ({
      appOffline: { ...state.appOffline, notesContent: text },
    }));
  },

  triggerWeatherSync: () => {
    const time = getClientTimestamp();
    const state = get();
    const newTemp = 27 + Math.floor(Math.random() * 5);
    const pkt: ExfilPacket = {
      id: `pkt-w-${Date.now().toString().slice(-4)}`,
      timestamp: time,
      socketId: 'sock-weather',
      protocol: 'TLS 1.3 / HTTPS',
      source: '192.168.10.15:52180',
      destination: '142.250.190.46:443',
      dataSummary: `GET /v1/weather?city=Jakarta HTTP/2 (200 OK, temp=${newTemp}C, Verified Public API)`,
      sizeBytes: 390 + Math.floor(Math.random() * 40),
      isMalicious: false,
      isBlocked: false,
    };

    set({
      appNetwork: {
        ...state.appNetwork,
        tempC: newTemp,
        syncCount: state.appNetwork.syncCount + 1,
      },
      exfilPackets: [pkt, ...state.exfilPackets.slice(0, 19)],
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: time,
          category: 'NETSTAT',
          level: 'info',
          message: `WeatherSync_Pro.exe sinkronisasi HTTPS sah ke 142.250.190.46:443 (Suhu: ${newTemp}°C).`,
        },
        ...state.logs,
      ],
    });
  },

  selectNetstatSocket: (socketId) => {
    const state = get();
    const sock = state.netstatSockets.find((s) => s.id === socketId);
    if (!sock) return;

    const isTrojan = sock.pid === 3892;
    const isNormal = sock.pid === 2540;

    let updatedMissions = state.completedMissions;
    if (isTrojan) {
      updatedMissions = { ...state.completedMissions, mission1: true };
    }

    set({
      selectedSocketId: socketId,
      completedMissions: updatedMissions,
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: getClientTimestamp(),
          category: 'NETSTAT',
          level: isTrojan ? 'success' : 'info',
          message: isTrojan
            ? `ANOMALI DITEMUKAN: Soket ${sock.localAddress} -> ${sock.foreignAddress} berstatus ESTABLISHED pada Port 4444 dikendalikan oleh PID ${sock.pid} (${sock.processName}). Aplikasi kalkulator offline tidak wajar memiliki koneksi jaringan asing!`
            : isNormal
            ? `Pemeriksaan Soket: ${sock.localAddress} -> ${sock.foreignAddress} adalah koneksi HTTPS port 443 sah dari ${sock.processName}.`
            : `Pemeriksaan Soket: ${sock.localAddress} adalah soket sistem lokal (${sock.processName}).`,
        },
        ...state.logs.slice(0, 40),
      ],
    });
  },

  setNetstatFilter: (filter) => {
    set({ netstatFilter: filter });
  },

  setFirewallInputIp: (ip) => {
    set({ firewallInputIp: ip });
  },

  setFirewallInputPort: (port) => {
    set({ firewallInputPort: port });
  },

  useSelectedSocketForFirewall: () => {
    const state = get();
    const sock = state.netstatSockets.find((s) => s.id === state.selectedSocketId);
    if (!sock) return;

    if (sock.remoteIp === '0.0.0.0') {
      set({
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: getClientTimestamp(),
            category: 'FIREWALL',
            level: 'warn',
            message: 'Peringatan: Soket terpilih adalah soket listening lokal (0.0.0.0), bukan alamat remote yang relevan untuk outbound rule.',
          },
          ...state.logs,
        ],
      });
      return;
    }

    set({
      firewallInputIp: sock.remoteIp,
      firewallInputPort: String(sock.remotePort),
    });
  },

  applyFirewallRule: () => {
    const state = get();
    const { firewallInputIp, firewallInputPort, logs, mistakes, completedMissions } = state;
    const ip = firewallInputIp.trim();
    const port = firewallInputPort.trim();

    if (!ip || !port) {
      set({
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: getClientTimestamp(),
            category: 'FIREWALL',
            level: 'warn',
            message: 'Galat Konfigurasi: Masukkan Alamat IP dan Nomor Port target sebelum menerapkan aturan blokir.',
          },
          ...logs,
        ],
      });
      return;
    }

    // Hukuman / Penalti Salah Target:
    if (ip === '142.250.190.46' || port === '443') {
      set({
        mistakes: mistakes + 1,
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: getClientTimestamp(),
            category: 'FIREWALL',
            level: 'error',
            message: 'HUKUMAN SALAH TARGET: Anda memblokir IP 142.250.190.46:443 milik layanan WeatherSync (Jaringan Legal)! Layanan sistem terganggu. Periksa kembali tabel Netstat untuk menemukan port anomali non-standar!',
          },
          ...logs,
        ],
      });
      return;
    }

    // Blokir target Trojan yang benar: 198.51.100.23 dan Port 4444
    const isTargetCorrect = ip === '198.51.100.23' && port === '4444';

    if (isTargetCorrect) {
      const updatedSockets = state.netstatSockets.map((s) =>
        s.remotePort === 4444 ? { ...s, state: 'CLOSED' as const } : s
      );

      const isMission2Done = state.isProcessKilled;
      const updatedMissions = {
        ...completedMissions,
        mission2: isMission2Done ? true : completedMissions.mission2,
      };

      set({
        isFirewallBlocked: true,
        blockedTargetSummary: `${ip}:${port}`,
        netstatSockets: updatedSockets,
        completedMissions: updatedMissions,
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: getClientTimestamp(),
            category: 'FIREWALL',
            level: 'success',
            message: `New-NetFirewallRule diterapkan: Outbound Drop diaktifkan untuk RemoteAddress ${ip} Port ${port}. Kanal komunikasi C2 Trojan berhasil diputus!`,
          },
          ...logs,
        ],
      });
    } else {
      set({
        mistakes: mistakes + 1,
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: getClientTimestamp(),
            category: 'FIREWALL',
            level: 'warn',
            message: `Aturan Firewall dibuat untuk ${ip}:${port}, namun alamat tersebut tidak cocok dengan remote IP penyerang pada tabel Netstat.`,
          },
          ...logs,
        ],
      });
    }
  },

  removeFirewallRule: () => {
    set((state) => ({
      isFirewallBlocked: false,
      blockedTargetSummary: null,
      netstatSockets: state.netstatSockets.map((s) =>
        s.remotePort === 4444 && !state.isProcessKilled ? { ...s, state: 'ESTABLISHED' as const } : s
      ),
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: getClientTimestamp(),
          category: 'FIREWALL',
          level: 'warn',
          message: 'Aturan Outbound Firewall dicabut. Port 4444 kembali terbuka untuk transmisi keluar.',
        },
        ...state.logs,
      ],
    }));
  },

  terminateProcessByPid: (pid) => {
    const state = get();
    const time = getClientTimestamp();

    if (pid !== 3892) {
      set({
        mistakes: state.mistakes + 1,
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: time,
            category: 'KERNEL',
            level: 'error',
            message: `Peringatan: PID ${pid} adalah proses sistem / utilitas normal. Jangan menghentikan proses tanpa verifikasi anomali!`,
          },
          ...state.logs,
        ],
      });
      return;
    }

    // SOP KETAT (B): Jika dimatikan SEBELUM Firewall diblokir, Trojan akan respawn / bangkit dalam 2 detik!
    if (!state.isFirewallBlocked) {
      // Matikan sementara
      set({
        isProcessKilled: true,
        respawnCountdown: 2,
        processes: state.processes.map((p) => (p.pid === 3892 ? { ...p, status: 'terminated' } : p)),
        netstatSockets: state.netstatSockets.map((s) => (s.pid === 3892 ? { ...s, state: 'CLOSED' } : s)),
        logs: [
          {
            id: `log-${Date.now()}-1`,
            timestamp: time,
            category: 'KERNEL',
            level: 'warn',
            message: 'taskkill /F /PID 3892 dieksekusi. Namun soket keluar C2 BELUM DIBLOKIR di Host Firewall!',
          },
          {
            id: `log-${Date.now()}-2`,
            timestamp: time,
            category: 'KERNEL',
            level: 'error',
            message: 'HUKUMAN SALAH URUTAN SOP: Thread watchdog Trojan mendeteksi kanal C2 masih terbuka dan memicu respawn otomatis dalam 2 detik!',
          },
          ...state.logs,
        ],
      });

      // Timer 2 detik untuk respawn otomatis
      setTimeout(() => {
        const cur = get();
        if (!cur.isFirewallBlocked && !cur.isFileDeleted) {
          set({
            isProcessKilled: false,
            respawnCountdown: null,
            mistakes: cur.mistakes + 1,
            processes: cur.processes.map((p) => (p.pid === 3892 ? { ...p, status: 'running' } : p)),
            netstatSockets: cur.netstatSockets.map((s) => (s.pid === 3892 ? { ...s, state: 'ESTABLISHED' } : s)),
            logs: [
              {
                id: `log-${Date.now()}`,
                timestamp: getClientTimestamp(),
                category: 'KERNEL',
                level: 'error',
                message: 'TROJAN RESPAWN! Biner SuperCalc_Pro.exe otomatis aktif kembali di RAM (PID 3892) karena IP C2 belum diblokir di Firewall! Blokir Firewall terlebih dahulu.',
              },
              ...cur.logs,
            ],
          });
        }
      }, 2000);
      return;
    }

    // Jika Firewall sudah diblokir: Terminasi berhasil permanen!
    const updatedProcesses = state.processes.map((p) => (p.pid === 3892 ? { ...p, status: 'terminated' as const } : p));
    const updatedSockets = state.netstatSockets.map((s) => (s.pid === 3892 ? { ...s, state: 'CLOSED' as const } : s));

    const updatedMissions = {
      ...state.completedMissions,
      mission2: true,
    };

    set({
      isProcessKilled: true,
      respawnCountdown: null,
      processes: updatedProcesses,
      netstatSockets: updatedSockets,
      completedMissions: updatedMissions,
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: time,
          category: 'KERNEL',
          level: 'success',
          message: 'taskkill /F /PID 3892 BERHASIL: Karena Firewall telah memblokir C2, daemon Trojan tidak dapat membangkitkan diri. Handle berkas kernel resmi dilepaskan.',
        },
        ...state.logs,
      ],
    });
  },

  deleteAppBinary: () => {
    const state = get();
    const time = getClientTimestamp();

    // SOP KETAT (A): Hapus berkas ditolak (File in Use) jika proses masih aktif di RAM
    if (!state.isProcessKilled) {
      set({
        showFileInUseModal: true,
        mistakes: state.mistakes + 1,
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: time,
            category: 'KERNEL',
            level: 'error',
            message: 'Akses Ditolak (File in Use / 0x00000020): Berkas SuperCalc_Pro.exe sedang dikunci oleh proses aktif di RAM (PID 3892). Hentikan proses terlebih dahulu!',
          },
          ...state.logs,
        ],
      });
      return;
    }

    const isMission3Done = state.isStartupCleaned;
    const updatedMissions = {
      ...state.completedMissions,
      mission3: isMission3Done ? true : state.completedMissions.mission3,
    };

    set({
      isFileDeleted: true,
      completedMissions: updatedMissions,
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: time,
          category: 'SYSCALL',
          level: 'success',
          message: 'Remove-Item berhasil: Berkas C:\\ProgramData\\SuperCalc_Pro\\SuperCalc_Pro.exe telah dihapus permanen dari direktori.',
        },
        ...state.logs,
      ],
    });
  },

  cleanStartupRegistry: () => {
    const state = get();
    const isMission3Done = state.isFileDeleted;
    const updatedMissions = {
      ...state.completedMissions,
      mission3: isMission3Done ? true : state.completedMissions.mission3,
    };

    set({
      isStartupCleaned: true,
      completedMissions: updatedMissions,
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: getClientTimestamp(),
          category: 'REGISTRY',
          level: 'success',
          message: 'reg delete HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v SuperCalcSync /f berhasil: Entri persistensi auto-run dimusnahkan.',
        },
        ...state.logs,
      ],
    });
  },

  closeFileInUseModal: () => {
    set({ showFileInUseModal: false });
  },

  openRebootModal: () => {
    set({ showRebootModal: true, rebootAuditResult: 'idle' });
  },

  closeRebootModal: () => {
    set({ showRebootModal: false, rebootAuditResult: 'idle' });
  },

  executeRebootSequence: async () => {
    const state = get();
    const time = getClientTimestamp();

    // SOP KETAT (C): Re-Infeksi saat Reboot jika Startup belum dibersihkan atau berkas belum dihapus
    const hasPersistence = !state.isFileDeleted || !state.isStartupCleaned;
    const isFirewallOpen = !state.isFirewallBlocked;

    if (hasPersistence || isFirewallOpen || !state.isProcessKilled) {
      set((s) => ({
        rebootAuditResult: 'reinfected',
        mistakes: s.mistakes + 1,
        isProcessKilled: false,
        processes: s.processes.map((p) => (p.pid === 3892 ? { ...p, status: 'running' } : p)),
        netstatSockets: s.netstatSockets.map((sock) =>
          sock.pid === 3892 ? { ...sock, state: s.isFirewallBlocked ? 'CLOSED' : 'ESTABLISHED' } : sock
        ),
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: time,
            category: 'REGISTRY',
            level: 'error',
            message: 'PERSISTENCE TRIGGERED: Komputer selesai di-reboot. Windows membaca entri Startup HKCU\\...\\Run\\SuperCalcSync dan memuat ulang biner Trojan ke memori RAM! Backdoor kembali aktif.',
          },
          ...s.logs,
        ],
      }));
      return;
    }

    // Sukses: Seluruh SOP terpenuhi
    const updatedMissions = {
      ...state.completedMissions,
      mission4: true,
    };

    set({
      rebootAuditResult: 'clean',
      completedMissions: updatedMissions,
      isFullyRemediated: true,
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: time,
          category: 'KERNEL',
          level: 'success',
          message: 'POST-HARDENING AUDIT PASSED: Sistem reboot secara steril. Biner telah terhapus, registri bersih dari entri auto-run, dan Host Firewall memblokir permanen upaya koneksi ke 198.51.100.23:4444.',
        },
        ...state.logs,
      ],
    });

    await ProgressService.saveModuleProgress({
      malwareType: 'trojan',
      infectionObserved: true,
      mitigationCompleted: true,
      mistakeCount: get().mistakes,
      updatedAt: new Date().toISOString(),
    });
  },

  resetLab: () => {
    set({
      appOffline: {
        name: 'Catatan_Sistem.exe',
        pid: 2104,
        isRunning: false,
        isGuiOpen: false,
        notesContent: 'Daftar inventaris workstation laboratorium forensik SIJA.\nSemua utilitas offline aman untuk eksekusi lokal.',
      },
      appNetwork: {
        name: 'WeatherSync_Pro.exe',
        pid: 2540,
        isRunning: false,
        isGuiOpen: false,
        lastCity: 'Jakarta',
        tempC: 28,
        syncCount: 0,
      },
      appTrojan: {
        name: 'SuperCalc_Pro.exe',
        pid: 3892,
        isRunning: false,
        isGuiOpen: false,
        calcDisplay: '0',
        calcPreviousValue: null,
        calcOperation: null,
        calcClearOnNextDigit: false,
      },

      selectedSocketId: null,
      netstatFilter: '',
      firewallInputIp: '',
      firewallInputPort: '',
      isFirewallBlocked: false,
      blockedTargetSummary: null,

      isProcessKilled: false,
      isFileDeleted: false,
      isStartupCleaned: false,
      respawnCountdown: null,

      mistakes: 0,
      showFileInUseModal: false,
      showRebootModal: false,
      rebootAuditResult: 'idle',
      completedMissions: {
        mission1: false,
        mission2: false,
        mission3: false,
        mission4: false,
      },
      isFullyRemediated: false,

      processes: BASELINE_PROCESSES,
      netstatSockets: BASELINE_SOCKETS,
      exfilPackets: [],
      logs: [
        {
          id: 'log-reset',
          timestamp: '10:00:00.000',
          category: 'SYSCALL',
          level: 'info',
          message: 'Laboratorium di-reset ke kondisi awal. Uji 3 aplikasi di Panel 1 untuk memulai investigasi mandiri.',
        },
      ],
    });
  },
}));
