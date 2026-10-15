// File: src/store/useVirusLabStore.ts
import { create } from 'zustand';
import { ProgressService } from '@/services/progressService';

export interface ForensicProcess {
  pid: number;
  ppid: number;
  name: string;
  command: string;
  cpuPercent: number;
  memoryMB: number;
  isMalicious: boolean;
  status: 'running' | 'terminated';
}

export interface ForensicBinary {
  id: string;
  name: string;
  isCarrier: boolean;
  originalSizeKB: number;
  currentSizeKB: number;
  baselineHash: string;
  currentHash: string;
  originalEntryPoint: string;
  currentEntryPoint: string;
  status: 'clean' | 'infected' | 'quarantined' | 'disinfected';
}

export type VirusLabPhase =
  | 'idle'
  | 'infected'
  | 'process_terminated'
  | 'safe_mode_active'
  | 'carrier_quarantined'
  | 'disinfected_recovered';

export type LabWorkbenchTab = 'processes' | 'hashes' | 'pe_headers';

interface VirusLabState {
  phase: VirusLabPhase;
  activeTab: LabWorkbenchTab;
  safeMode: boolean;
  selectedPid: number | null;
  selectedFileId: string | null;
  mistakes: number;
  feedbackMessage: string | null;
  systemLogs: string[];
  processes: ForensicProcess[];
  binaries: ForensicBinary[];

  // Actions
  setActiveTab: (tab: LabWorkbenchTab) => void;
  setSelectedPid: (pid: number | null) => void;
  setSelectedFileId: (id: string | null) => void;
  clearFeedback: () => void;
  triggerInfection: () => void;
  terminateSelectedProcess: () => void;
  bootSafeMode: () => void;
  quarantineSelectedCarrier: () => void;
  disinfectSelectedBinary: (id: string) => void;
  disinfectAllInfected: () => void;
  recalculateHashes: () => void;
  resetLab: () => void;
}

const INITIAL_PROCESSES: ForensicProcess[] = [
  { pid: 1042, ppid: 4, name: 'services.exe', command: 'C:\\Windows\\System32\\services.exe', cpuPercent: 0.8, memoryMB: 18.4, isMalicious: false, status: 'running' },
  { pid: 1420, ppid: 1042, name: 'explorer.exe', command: 'C:\\Windows\\explorer.exe', cpuPercent: 2.1, memoryMB: 72.5, isMalicious: false, status: 'running' },
  { pid: 2190, ppid: 1420, name: 'report_viewer.exe', command: 'C:\\Lab\\HostBinaries\\report_viewer.exe', cpuPercent: 0.4, memoryMB: 24.1, isMalicious: false, status: 'running' },
  { pid: 2840, ppid: 1420, name: 'calc_tool.exe', command: 'C:\\Lab\\HostBinaries\\calc_tool.exe', cpuPercent: 0.2, memoryMB: 16.0, isMalicious: false, status: 'running' },
];

const INITIAL_BINARIES: ForensicBinary[] = [
  {
    id: 'f-carrier',
    name: 'setup_game.exe (Carrier Biner)',
    isCarrier: true,
    originalSizeKB: 1024,
    currentSizeKB: 1024,
    baselineHash: '4a9f8b2c1d3e5f60718293a4b5c6d7e8',
    currentHash: '4a9f8b2c1d3e5f60718293a4b5c6d7e8',
    originalEntryPoint: '0x004012A0',
    currentEntryPoint: '0x004012A0',
    status: 'clean',
  },
  {
    id: 'f-host1',
    name: 'report_viewer.exe',
    isCarrier: false,
    originalSizeKB: 840,
    currentSizeKB: 840,
    baselineHash: '9e1c2d3f4a5b6c7d8e9f0a1b2c3d4e5f',
    currentHash: '9e1c2d3f4a5b6c7d8e9f0a1b2c3d4e5f',
    originalEntryPoint: '0x00401050',
    currentEntryPoint: '0x00401050',
    status: 'clean',
  },
  {
    id: 'f-host2',
    name: 'calc_tool.exe',
    isCarrier: false,
    originalSizeKB: 512,
    currentSizeKB: 512,
    baselineHash: 'b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0',
    currentHash: 'b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0',
    originalEntryPoint: '0x00401120',
    currentEntryPoint: '0x00401120',
    status: 'clean',
  },
  {
    id: 'f-host3',
    name: 'network_sync.exe',
    isCarrier: false,
    originalSizeKB: 1280,
    currentSizeKB: 1280,
    baselineHash: 'f0e1d2c3b4a5968778695a4b3c2d1e0f',
    currentHash: 'f0e1d2c3b4a5968778695a4b3c2d1e0f',
    originalEntryPoint: '0x00401500',
    currentEntryPoint: '0x00401500',
    status: 'clean',
  },
];

export const useVirusLabStore = create<VirusLabState>((set, get) => ({
  phase: 'idle',
  activeTab: 'processes',
  safeMode: false,
  selectedPid: null,
  selectedFileId: 'f-carrier',
  mistakes: 0,
  feedbackMessage: null,
  systemLogs: [
    '[09:00:00] [AUDIT] Ruang kerja forensik diinisialisasi. Lingkungan terisolasi siap digunakan.',
    '[09:00:01] [BASELINE] 4 biner host diverifikasi terhadap Golden Hash Image.',
  ],
  processes: INITIAL_PROCESSES,
  binaries: INITIAL_BINARIES,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedPid: (pid) => set({ selectedPid: pid, feedbackMessage: null }),
  setSelectedFileId: (id) => set({ selectedFileId: id }),
  clearFeedback: () => set({ feedbackMessage: null }),

  triggerInfection: () => {
    const rogueProcess: ForensicProcess = {
      pid: 3844,
      ppid: 1420,
      name: 'setup_game.exe (Virus Host)',
      command: 'C:\\Users\\Student\\Downloads\\setup_game.exe --inject-all',
      cpuPercent: 88.4,
      memoryMB: 142.0,
      isMalicious: true,
      status: 'running',
    };

    const infectedBinaries = get().binaries.map((b) => ({
      ...b,
      currentSizeKB: b.originalSizeKB + 348,
      currentHash: `TAMPERED_${b.id.toUpperCase()}_VIRUS_INJECTED`,
      currentEntryPoint: '0x00409F00 (HIJACKED_PARASITE)',
      status: 'infected' as const,
    }));

    set((state) => ({
      phase: 'infected',
      processes: [...state.processes, rogueProcess],
      binaries: infectedBinaries,
      selectedPid: 3844,
      systemLogs: [
        ...state.systemLogs,
        '[09:01:14] [CRITICAL ALERT] Biner setup_game.exe dieksekusi oleh pengguna.',
        '[09:01:15] [MALWARE] Proses berbahaya PID 3844 aktif di RAM (CPU: 88.4%).',
        '[09:01:16] [TAMPER] Kode parasit menyisipkan 348 KB muatan biner ke seluruh berkas host PE.',
        '[09:01:17] [TAMPER] EntryPoint RVA dibelokkan ke segmen injeksi 0x00409F00.',
      ],
      feedbackMessage: 'ALERT: Virus aktif di memori RAM dan menginfeksi seluruh biner host!',
    }));
  },

  terminateSelectedProcess: () => {
    const { selectedPid, processes, phase } = get();
    if (!selectedPid) {
      set({ feedbackMessage: 'Pilih baris proses pada tabel sebelum menekan tombol terminasi.' });
      return;
    }
    const proc = processes.find((p) => p.pid === selectedPid);
    if (!proc) return;

    if (!proc.isMalicious) {
      set((state) => ({
        mistakes: state.mistakes + 1,
        feedbackMessage: `KESALAHAN FORENSIK: PID ${proc.pid} (${proc.name}) adalah proses sistem sah. Menghentikannya memicu instabilitas OS!`,
        systemLogs: [
          ...state.systemLogs,
          `[FAIL] Upaya terminasi salah sasaran pada proses sah PID ${proc.pid} (${proc.name}).`,
        ],
      }));
      return;
    }

    set((state) => ({
      phase: phase === 'infected' ? 'process_terminated' : state.phase,
      processes: state.processes.map((p) => (p.pid === selectedPid ? { ...p, status: 'terminated', cpuPercent: 0, memoryMB: 0 } : p)),
      selectedPid: null,
      feedbackMessage: `BERHASIL (SOP Langkah 1): Proses parasit PID ${selectedPid} berhasil dihentikan dari memori RAM.`,
      systemLogs: [
        ...state.systemLogs,
        `[SOP-1 OK] SIGKILL dieksekusi terhadap PID ${selectedPid}. Thread injeksi biner dihentikan.`,
      ],
    }));
  },

  bootSafeMode: () => {
    const { phase, processes } = get();
    const rogueRunning = processes.some((p) => p.isMalicious && p.status === 'running');

    if (rogueRunning) {
      set((state) => ({
        mistakes: state.mistakes + 1,
        feedbackMessage: 'PELANGGARAN URUTAN SOP: Proses parasit PID 3844 masih aktif di memori! Matikan proses di Process Explorer sebelum beralih ke Diagnostic Mode.',
        systemLogs: [
          ...state.systemLogs,
          '[FAIL] Boot Diagnostic gagal: Driver hook virus menahan shutdown proses.',
        ],
      }));
      return;
    }

    set((state) => ({
      safeMode: true,
      phase: phase === 'process_terminated' ? 'safe_mode_active' : state.phase,
      feedbackMessage: 'BERHASIL (SOP Langkah 2): Sistem berhasil masuk ke Diagnostic Mode. Registri SafeBoot terisolasi.',
      systemLogs: [
        ...state.systemLogs,
        '[SOP-2 OK] Diagnostic Minimal Driver diaktifkan. Kunci registri SafeBoot diproteksi.',
      ],
    }));
  },

  quarantineSelectedCarrier: () => {
    const { safeMode, binaries, phase } = get();
    if (!safeMode) {
      set((state) => ({
        mistakes: state.mistakes + 1,
        feedbackMessage: 'PELANGGARAN URUTAN SOP: Masuk ke Diagnostic Mode terlebih dahulu (Langkah 2) sebelum memindahkan berkas pembawa ke Vault Karantina!',
        systemLogs: [
          ...state.systemLogs,
          '[FAIL] Pemindahan berkas ditolak: File lock aktif di sesi standar OS.',
        ],
      }));
      return;
    }

    set((state) => ({
      binaries: state.binaries.map((b) => (b.isCarrier ? { ...b, status: 'quarantined' } : b)),
      phase: phase === 'safe_mode_active' ? 'carrier_quarantined' : state.phase,
      feedbackMessage: 'BERHASIL (SOP Langkah 3): Berkas pembawa muatan setup_game.exe dipindahkan ke Brankas Karantina.',
      systemLogs: [
        ...state.systemLogs,
        '[SOP-3 OK] Carrier biner diisolasi dengan atribut read-only tanpa hak eksekusi.',
      ],
    }));
  },

  disinfectSelectedBinary: (id) => {
    const { phase } = get();
    if (phase !== 'carrier_quarantined' && phase !== 'disinfected_recovered') {
      set((state) => ({
        mistakes: state.mistakes + 1,
        feedbackMessage: 'PELANGGARAN URUTAN SOP: Karantina berkas pembawa terlebih dahulu (Langkah 3) sebelum menjalankan disinfeksi biner host!',
        systemLogs: [
          ...state.systemLogs,
          '[FAIL] Disinfeksi ditolak: Berkas pembawa masih berpotensi menginfeksi ulang direktori.',
        ],
      }));
      return;
    }

    set((state) => {
      const updated = state.binaries.map((b) => {
        if (b.id === id && !b.isCarrier) {
          return {
            ...b,
            currentSizeKB: b.originalSizeKB,
            currentEntryPoint: b.originalEntryPoint,
            currentHash: b.baselineHash,
            status: 'disinfected' as const,
          };
        }
        return b;
      });

      const allDisinfected = updated.filter((b) => !b.isCarrier).every((b) => b.status === 'disinfected');

      return {
        binaries: updated,
        phase: allDisinfected ? 'disinfected_recovered' : state.phase,
        feedbackMessage: allDisinfected
          ? 'LULUS SOP FORENSIK: Seluruh biner host berhasil dipulihkan ke hash baseline!'
          : `Biner ${id} berhasil didisinfeksi. Lanjutkan berkas lainnya.`,
        systemLogs: [
          ...state.systemLogs,
          `[DISINFECT] Header PE ${id} dipangkas 348 KB parasit. EntryPoint dikembalikan ke ${updated.find((x) => x.id === id)?.originalEntryPoint}.`,
        ],
      };
    });
  },

  disinfectAllInfected: async () => {
    const { phase, binaries } = get();
    if (phase !== 'carrier_quarantined') {
      set((state) => ({
        mistakes: state.mistakes + 1,
        feedbackMessage: 'PELANGGARAN URUTAN SOP: Karantina berkas pembawa terlebih dahulu sebelum disinfeksi!',
        systemLogs: [
          ...state.systemLogs,
          '[FAIL] Prosedur salah urutan.',
        ],
      }));
      return;
    }

    const cleaned = binaries.map((b) => {
      if (b.isCarrier) return b;
      return {
        ...b,
        currentSizeKB: b.originalSizeKB,
        currentEntryPoint: b.originalEntryPoint,
        currentHash: b.baselineHash,
        status: 'disinfected' as const,
      };
    });

    set((state) => ({
      binaries: cleaned,
      phase: 'disinfected_recovered',
      feedbackMessage: 'LULUS SOP: Seluruh biner host tervalidasi dan dipulihkan ke status integritas awal!',
      systemLogs: [
        ...state.systemLogs,
        '[SOP-4 OK] Pemindaian hash SHA-256 tuntas. Seluruh biner host cocok 100% dengan Golden Image.',
        '[AUDIT COMPLETED] Penanganan insiden File Infector tuntas sesuai standar NIST SP 800-61.',
      ],
    }));

    await ProgressService.saveModuleProgress({
      malwareType: 'virus',
      infectionObserved: true,
      mitigationCompleted: true,
      mistakeCount: get().mistakes,
      updatedAt: new Date().toISOString(),
    });
  },

  recalculateHashes: () => {
    set((state) => ({
      systemLogs: [
        ...state.systemLogs,
        `[HASH AUDIT] Menghitung checksum kriptografi untuk ${state.binaries.length} berkas biner...`,
      ],
    }));
  },

  resetLab: () => {
    set({
      phase: 'idle',
      activeTab: 'processes',
      safeMode: false,
      selectedPid: null,
      selectedFileId: 'f-carrier',
      mistakes: 0,
      feedbackMessage: null,
      processes: INITIAL_PROCESSES,
      binaries: INITIAL_BINARIES,
      systemLogs: [
        '[09:00:00] [AUDIT] Ruang kerja forensik direset ke kondisi bersih awal.',
      ],
    });
  },
}));
