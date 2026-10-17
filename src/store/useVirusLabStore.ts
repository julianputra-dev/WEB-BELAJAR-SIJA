// File: src/store/useVirusLabStore.ts
import { create } from 'zustand';
import { ProgressService } from '@/services/progressService';

export interface PeSection {
  name: string;
  virtualAddress: string;
  virtualSizeKB: number;
  rawSizeKB: number;
  characteristics: string;
  isMalicious?: boolean;
}

export interface ForensicProcess {
  pid: number;
  ppid: number;
  name: string;
  command: string;
  cpuPercent: number;
  memoryMB: number;
  isMalicious: boolean;
  signature: string;
  status: 'running' | 'terminated';
}

export interface ForensicBinary {
  id: string;
  name: string;
  description: string;
  isCarrier: boolean;
  originalSizeKB: number;
  currentSizeKB: number;
  baselineHash: string;
  currentHash: string;
  originalEntryPoint: string;
  currentEntryPoint: string;
  signature: string;
  sections: PeSection[];
  status: 'clean' | 'infected' | 'quarantined' | 'disinfected';
  lastExecutionMessage?: string;
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
  selectedFileId: string;
  mistakes: number;
  feedbackMessage: string | null;
  reinfectionAlert: string | null;
  systemLogs: string[];
  processes: ForensicProcess[];
  binaries: ForensicBinary[];
  completedSteps: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
  };

  // Actions
  setActiveTab: (tab: LabWorkbenchTab) => void;
  setSelectedPid: (pid: number | null) => void;
  setSelectedFileId: (id: string) => void;
  clearFeedback: () => void;
  clearReinfectionAlert: () => void;
  launchApplication: (id: string) => void;
  triggerInfection: () => void;
  terminateSelectedProcess: () => void;
  bootSafeMode: () => void;
  quarantineSelectedCarrier: () => void;
  disinfectBinary: (id: string) => void;
  disinfectAllInfected: () => Promise<void>;
  recalculateHashes: () => void;
  resetLab: () => void;
}

const INITIAL_PROCESSES: ForensicProcess[] = [
  {
    pid: 1042,
    ppid: 4,
    name: 'services.exe',
    command: 'C:\\Windows\\System32\\services.exe',
    cpuPercent: 0.8,
    memoryMB: 18.4,
    isMalicious: false,
    signature: 'Verified System Binary (Microsoft Windows)',
    status: 'running',
  },
  {
    pid: 1420,
    ppid: 1042,
    name: 'explorer.exe',
    command: 'C:\\Windows\\explorer.exe',
    cpuPercent: 2.1,
    memoryMB: 72.5,
    isMalicious: false,
    signature: 'Verified System Binary (Microsoft Windows)',
    status: 'running',
  },
  {
    pid: 2190,
    ppid: 1420,
    name: 'report_viewer.exe',
    command: 'C:\\Lab\\HostBinaries\\report_viewer.exe',
    cpuPercent: 0.4,
    memoryMB: 24.1,
    isMalicious: false,
    signature: 'Verified Host Application (SIJA Lab Signed)',
    status: 'running',
  },
  {
    pid: 2840,
    ppid: 1420,
    name: 'calc_tool.exe',
    command: 'C:\\Lab\\HostBinaries\\calc_tool.exe',
    cpuPercent: 0.2,
    memoryMB: 16.0,
    isMalicious: false,
    signature: 'Verified Host Application (SIJA Lab Signed)',
    status: 'running',
  },
];

const INITIAL_BINARIES: ForensicBinary[] = [
  {
    id: 'f-carrier',
    name: 'setup_game.exe',
    description: 'Installer permainan tidak dikenal yang diunduh siswa dari internet.',
    isCarrier: true,
    originalSizeKB: 1024,
    currentSizeKB: 1024,
    baselineHash: '4a9f8b2c1d3e5f60718293a4b5c6d7e8',
    currentHash: '4a9f8b2c1d3e5f60718293a4b5c6d7e8',
    originalEntryPoint: '0x004012A0',
    currentEntryPoint: '0x004012A0',
    signature: 'Unsigned / Untrusted Source',
    sections: [
      { name: '.text', virtualAddress: '0x00401000', virtualSizeKB: 512, rawSizeKB: 512, characteristics: 'CODE | EXECUTE | READ' },
      { name: '.data', virtualAddress: '0x00481000', virtualSizeKB: 256, rawSizeKB: 256, characteristics: 'INITIALIZED_DATA | READ | WRITE' },
      { name: '.rsrc', virtualAddress: '0x004C1000', virtualSizeKB: 256, rawSizeKB: 256, characteristics: 'RESOURCE_DATA | READ' },
    ],
    status: 'clean',
  },
  {
    id: 'f-host1',
    name: 'report_viewer.exe',
    description: 'Aplikasi internal penampil laporan laboratorium untuk siswa SIJA.',
    isCarrier: false,
    originalSizeKB: 840,
    currentSizeKB: 840,
    baselineHash: '9e1c2d3f4a5b6c7d8e9f0a1b2c3d4e5f',
    currentHash: '9e1c2d3f4a5b6c7d8e9f0a1b2c3d4e5f',
    originalEntryPoint: '0x00401050',
    currentEntryPoint: '0x00401050',
    signature: 'Verified Host Application (SIJA Lab Signed)',
    sections: [
      { name: '.text', virtualAddress: '0x00401000', virtualSizeKB: 420, rawSizeKB: 420, characteristics: 'CODE | EXECUTE | READ' },
      { name: '.data', virtualAddress: '0x0046A000', virtualSizeKB: 180, rawSizeKB: 180, characteristics: 'INITIALIZED_DATA | READ | WRITE' },
      { name: '.rsrc', virtualAddress: '0x00497000', virtualSizeKB: 240, rawSizeKB: 240, characteristics: 'RESOURCE_DATA | READ' },
    ],
    status: 'clean',
  },
  {
    id: 'f-host2',
    name: 'calc_tool.exe',
    description: 'Kalkulator rekayasa subnetting IP dan konversi biner presisi.',
    isCarrier: false,
    originalSizeKB: 512,
    currentSizeKB: 512,
    baselineHash: 'b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0',
    currentHash: 'b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0',
    originalEntryPoint: '0x00401120',
    currentEntryPoint: '0x00401120',
    signature: 'Verified Host Application (SIJA Lab Signed)',
    sections: [
      { name: '.text', virtualAddress: '0x00401000', virtualSizeKB: 260, rawSizeKB: 260, characteristics: 'CODE | EXECUTE | READ' },
      { name: '.data', virtualAddress: '0x00442000', virtualSizeKB: 128, rawSizeKB: 128, characteristics: 'INITIALIZED_DATA | READ | WRITE' },
      { name: '.rsrc', virtualAddress: '0x00462000', virtualSizeKB: 124, rawSizeKB: 124, characteristics: 'RESOURCE_DATA | READ' },
    ],
    status: 'clean',
  },
  {
    id: 'f-host3',
    name: 'network_sync.exe',
    description: 'Layanan sinkronisasi konfigurasi switch dan router jaringan lokal.',
    isCarrier: false,
    originalSizeKB: 1280,
    currentSizeKB: 1280,
    baselineHash: 'f0e1d2c3b4a5968778695a4b3c2d1e0f',
    currentHash: 'f0e1d2c3b4a5968778695a4b3c2d1e0f',
    originalEntryPoint: '0x00401500',
    currentEntryPoint: '0x00401500',
    signature: 'Verified Host Application (SIJA Lab Signed)',
    sections: [
      { name: '.text', virtualAddress: '0x00401000', virtualSizeKB: 640, rawSizeKB: 640, characteristics: 'CODE | EXECUTE | READ' },
      { name: '.data', virtualAddress: '0x004A1000', virtualSizeKB: 320, rawSizeKB: 320, characteristics: 'INITIALIZED_DATA | READ | WRITE' },
      { name: '.rsrc', virtualAddress: '0x004F1000', virtualSizeKB: 320, rawSizeKB: 320, characteristics: 'RESOURCE_DATA | READ' },
    ],
    status: 'clean',
  },
];

const PARASITE_SECTION: PeSection = {
  name: '.parasite',
  virtualAddress: '0x00409F00',
  virtualSizeKB: 348,
  rawSizeKB: 348,
  characteristics: 'CODE | EXECUTE | READ | WRITE (PARASITE_PAYLOAD)',
  isMalicious: true,
};

export const useVirusLabStore = create<VirusLabState>((set, get) => ({
  phase: 'idle',
  activeTab: 'processes',
  safeMode: false,
  selectedPid: null,
  selectedFileId: 'f-carrier',
  mistakes: 0,
  feedbackMessage: null,
  reinfectionAlert: null,
  systemLogs: [
    '[09:00:00] [AUDIT] Laboratorium forensik Portable Executable (PE) diinisialisasi.',
    '[09:00:01] [BASELINE] 4 biner direktori diverifikasi terhadap Golden Hash DB. Seluruh hash identik 100%.',
    '[09:00:02] [READY] Lingkungan terisolasi siap untuk eksperimen observasi dan mitigasi.',
  ],
  processes: INITIAL_PROCESSES,
  binaries: INITIAL_BINARIES,
  completedSteps: {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedPid: (pid) => set({ selectedPid: pid, feedbackMessage: null }),
  setSelectedFileId: (id) => set({ selectedFileId: id }),
  clearFeedback: () => set({ feedbackMessage: null }),
  clearReinfectionAlert: () => set({ reinfectionAlert: null }),

  launchApplication: (id) => {
    const { binaries, phase, processes } = get();
    const file = binaries.find((b) => b.id === id);
    if (!file) return;

    // Skenario 1: Berkas berada dalam karantina
    if (file.status === 'quarantined') {
      set((state) => ({
        feedbackMessage: `AKSES DITOLAK: ${file.name} berada di Brankas Karantina dengan atribut No-Execute (000). Eksekusi diblokir oleh kernel!`,
        systemLogs: [
          ...state.systemLogs,
          `[ACCESS DENIED] Upaya eksekusi ${file.name} digagalkan: Atribut karantina aktif.`,
        ],
      }));
      return;
    }

    // Skenario 2: Berkas Carrier dieksekusi saat idle
    if (file.isCarrier && phase === 'idle') {
      get().triggerInfection();
      return;
    }

    // Skenario 3: Biner inang TERINFEKSI dieksekusi siswa (Siklus Re-Infeksi Nyata)
    if (file.status === 'infected') {
      // Pembuktian pedagogis: Kode parasit tereksekusi sebelum fungsi asli!
      const revivedPid = 4192;
      const revivedProcess: ForensicProcess = {
        pid: revivedPid,
        ppid: 1420,
        name: `${file.name} [Hijacked Thread]`,
        command: `C:\\Lab\\HostBinaries\\${file.name} --exec-hook`,
        cpuPercent: 86.8,
        memoryMB: 138.5,
        isMalicious: true,
        signature: 'Unsigned / Anomaly Detected (Parasite Thread)',
        status: 'running',
      };

      // Pastikan seluruh host binaries tetap atau kembali terinfeksi
      const reinfectedBinaries = binaries.map((b) => {
        if (b.isCarrier) return b;
        return {
          ...b,
          currentSizeKB: b.originalSizeKB + 348,
          currentHash: `TAMPERED_${b.id.toUpperCase()}_VIRUS_INJECTED`,
          currentEntryPoint: '0x00409F00 (.parasite)',
          sections: b.sections.some((s) => s.name === '.parasite')
            ? b.sections
            : [...b.sections, PARASITE_SECTION],
          status: 'infected' as const,
        };
      });

      // Filter proses lama, tambahkan proses parasit yang bangkit
      const existingWithoutMalicious = processes.filter((p) => !p.isMalicious);

      set((state) => ({
        phase: 'infected',
        mistakes: state.mistakes + 1,
        processes: [...existingWithoutMalicious, revivedProcess],
        binaries: reinfectedBinaries,
        selectedPid: revivedPid,
        selectedFileId: id,
        reinfectionAlert: `SIKLUS RE-INFEKSI TERBUKTI: Anda membuka '${file.name}' yang masih memuat injeksi parasit! AddressOfEntryPoint melompat ke seksi .parasite (0x00409F00), membangkitkan kembali thread virus di RAM (PID ${revivedPid}, CPU 86.8%). Ini membuktikan mematikan proses di RAM saja TIDAK CUKUP tanpa disinfeksi struktur berkas!`,
        feedbackMessage: `PERINGATAN: ${file.name} terinfeksi! Eksekusi parasit membangkitkan proses virus di RAM.`,
        completedSteps: {
          ...state.completedSteps,
          step1: false, // Gugur karena proses parasit kembali aktif
        },
        systemLogs: [
          ...state.systemLogs,
          `[CRITICAL RE-INFECTION] Biner inang '${file.name}' dieksekusi oleh pengguna saat payload masih aktif!`,
          `[CPU JUMP] Execution pointer melompat ke AddressOfEntryPoint 0x00409F00 (.parasite).`,
          `[PROCESS SPAWN] Thread parasit baru diinjeksikan ke RAM (PID ${revivedPid}, CPU: 86.8%).`,
          `[RE-PROPAGATION] Siklus replikasi virus kembali aktif menulari berkas host di direktori!`,
        ],
      }));
      return;
    }

    // Skenario 4: Berkas bersih atau sudah didisinfeksi dieksekusi
    set((state) => ({
      feedbackMessage: `Aplikasi ${file.name} berjalan normal dan aman. Entry Point valid (${file.currentEntryPoint}), tidak ada anomali memori.`,
      systemLogs: [
        ...state.systemLogs,
        `[SAFE EXECUTION] ${file.name} dieksekusi. PE Header valid, signature terverifikasi. Aplikasi host berjalan normal di background.`,
      ],
    }));
  },

  triggerInfection: () => {
    const rogueProcess: ForensicProcess = {
      pid: 3844,
      ppid: 1420,
      name: 'setup_game.exe (Virus Host)',
      command: 'C:\\Users\\Student\\Downloads\\setup_game.exe --inject-all',
      cpuPercent: 88.4,
      memoryMB: 142.0,
      isMalicious: true,
      signature: 'Unsigned / Anomaly Detected (No Valid Certificate)',
      status: 'running',
    };

    const infectedBinaries = get().binaries.map((b) => {
      const hasParasite = b.sections.some((s) => s.name === '.parasite');
      return {
        ...b,
        currentSizeKB: b.originalSizeKB + 348,
        currentHash: `TAMPERED_${b.id.toUpperCase()}_VIRUS_INJECTED`,
        currentEntryPoint: '0x00409F00 (.parasite)',
        sections: hasParasite ? b.sections : [...b.sections, PARASITE_SECTION],
        status: 'infected' as const,
      };
    });

    set((state) => ({
      phase: 'infected',
      processes: [...state.processes, rogueProcess],
      binaries: infectedBinaries,
      selectedPid: 3844,
      selectedFileId: 'f-host1',
      feedbackMessage: 'ALERT: Virus aktif di memori RAM! Seksi .parasite disuntikkan ke seluruh berkas host PE.',
      systemLogs: [
        ...state.systemLogs,
        '[09:01:14] [CRITICAL ALERT] Biner berekstensi .exe mencurigakan dieksekusi oleh pengguna.',
        '[09:01:15] [MALWARE ACTIVE] Thread berbahaya PID 3844 aktif di RAM dengan beban CPU 88.4%.',
        '[09:01:16] [TAMPER INJECTION] Kode parasit menyisipkan seksi .parasite (+348 KB) ke seluruh berkas host PE.',
        '[09:01:17] [PE HIJACK] AddressOfEntryPoint dibelokkan dari 0x00401050 menuju 0x00409F00.',
      ],
    }));
  },

  terminateSelectedProcess: () => {
    const { selectedPid, processes, phase } = get();
    if (!selectedPid) {
      set({ feedbackMessage: 'Pilih baris proses pada Process Explorer sebelum menekan tombol SIGKILL.' });
      return;
    }
    const proc = processes.find((p) => p.pid === selectedPid);
    if (!proc) return;

    if (!proc.isMalicious) {
      set((state) => ({
        mistakes: state.mistakes + 1,
        feedbackMessage: `KESALAHAN FORENSIK: PID ${proc.pid} (${proc.name}) adalah proses sistem sah bertanda tangan resmi. Menghentikannya memicu instabilitas OS!`,
        systemLogs: [
          ...state.systemLogs,
          `[FAIL] Upaya terminasi salah sasaran pada proses sah PID ${proc.pid} (${proc.name}).`,
        ],
      }));
      return;
    }

    set((state) => ({
      phase: phase === 'infected' ? 'process_terminated' : state.phase,
      processes: state.processes.map((p) =>
        p.pid === selectedPid ? { ...p, status: 'terminated', cpuPercent: 0, memoryMB: 0 } : p
      ),
      selectedPid: null,
      completedSteps: {
        ...state.completedSteps,
        step1: true,
      },
      feedbackMessage: `BERHASIL (Misi 1 Selesai): Proses parasit berhasil dihentikan dari memori RAM via SIGKILL.`,
      systemLogs: [
        ...state.systemLogs,
        `[SOP-1 OK] SIGKILL dieksekusi terhadap PID ${selectedPid}. Thread injeksi kode parasit dihentikan dari RAM.`,
      ],
    }));
  },

  bootSafeMode: () => {
    const { phase, processes } = get();
    const rogueRunning = processes.some((p) => p.isMalicious && p.status === 'running');

    if (rogueRunning) {
      set((state) => ({
        mistakes: state.mistakes + 1,
        feedbackMessage:
          'PELANGGARAN URUTAN SOP: Proses parasit dengan CPU tinggi masih aktif di RAM! Hentikan proses tersebut di Process Explorer sebelum beralih ke Diagnostic Mode.',
        systemLogs: [
          ...state.systemLogs,
          '[FAIL] Boot Diagnostic ditolak: Driver hook virus menahan shutdown proses aktif.',
        ],
      }));
      return;
    }

    set((state) => ({
      safeMode: true,
      phase: phase === 'process_terminated' ? 'safe_mode_active' : state.phase,
      completedSteps: {
        ...state.completedSteps,
        step2: true,
      },
      feedbackMessage:
        'BERHASIL (Misi 2 Selesai): Sistem berhasil masuk ke Diagnostic Mode. Registri SafeBoot terisolasi dari driver pihak ketiga.',
      systemLogs: [
        ...state.systemLogs,
        '[SOP-2 OK] Diagnostic Minimal Driver diaktifkan. Kunci registri SafeBoot diproteksi dan hook diblokir.',
      ],
    }));
  },

  quarantineSelectedCarrier: () => {
    const { safeMode, phase } = get();
    if (!safeMode) {
      set((state) => ({
        mistakes: state.mistakes + 1,
        feedbackMessage:
          'PELANGGARAN URUTAN SOP: Aktifkan Diagnostic Mode terlebih dahulu (Misi 2) sebelum memindahkan berkas pembawa ke Brankas Karantina!',
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
      completedSteps: {
        ...state.completedSteps,
        step3: true,
      },
      feedbackMessage:
        'BERHASIL (Misi 3 Selesai): Berkas pembawa muatan berhasil diisolasi ke Brankas Karantina tanpa izin eksekusi.',
      systemLogs: [
        ...state.systemLogs,
        '[SOP-3 OK] Carrier biner diisolasi dengan atribut read-only tanpa hak eksekusi (chmod 000).',
      ],
    }));
  },

  disinfectBinary: (id) => {
    const { phase } = get();
    if (phase !== 'carrier_quarantined' && phase !== 'disinfected_recovered') {
      set((state) => ({
        mistakes: state.mistakes + 1,
        feedbackMessage:
          'PELANGGARAN URUTAN SOP: Karantina berkas pembawa awal terlebih dahulu (Misi 3) sebelum menjalankan disinfeksi biner host!',
        systemLogs: [
          ...state.systemLogs,
          '[FAIL] Disinfeksi ditolak: Vektor pembawa muatan belum diisolasi dari direktori kerja.',
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
            sections: b.sections.filter((s) => s.name !== '.parasite'),
            status: 'disinfected' as const,
          };
        }
        return b;
      });

      const allDisinfected = updated.filter((b) => !b.isCarrier).every((b) => b.status === 'disinfected');

      return {
        binaries: updated,
        phase: allDisinfected ? 'disinfected_recovered' : state.phase,
        completedSteps: {
          ...state.completedSteps,
          step4: allDisinfected ? true : state.completedSteps.step4,
        },
        feedbackMessage: allDisinfected
          ? 'LULUS SOP FORENSIK: Seluruh biner host berhasil dipulihkan ke hash baseline Golden Image!'
          : `Biner ${id} berhasil didisinfeksi. Pangkas parasit pada berkas inang lainnya.`,
        systemLogs: [
          ...state.systemLogs,
          `[DISINFECT] Header PE ${id} dipangkas 348 KB seksi parasit. AddressOfEntryPoint dikembalikan ke ${
            updated.find((x) => x.id === id)?.originalEntryPoint
          }.`,
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
        systemLogs: [...state.systemLogs, '[FAIL] Prosedur salah urutan: Karantina pembawa biner belum tuntas.'],
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
        sections: b.sections.filter((s) => s.name !== '.parasite'),
        status: 'disinfected' as const,
      };
    });

    set((state) => ({
      binaries: cleaned,
      phase: 'disinfected_recovered',
      completedSteps: {
        ...state.completedSteps,
        step4: true,
      },
      feedbackMessage: 'LULUS SOP FORENSIK: Seluruh biner host tervalidasi dan dipulihkan ke status integritas awal!',
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
        `[HASH AUDIT] Menghitung checksum kriptografis SHA-256 untuk ${state.binaries.length} berkas biner...`,
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
      reinfectionAlert: null,
      processes: INITIAL_PROCESSES,
      binaries: INITIAL_BINARIES,
      completedSteps: {
        step1: false,
        step2: false,
        step3: false,
        step4: false,
      },
      systemLogs: [
        '[09:00:00] [AUDIT] Ruang kerja forensik direset ke kondisi bersih awal.',
        '[09:00:01] [BASELINE] Verifikasi Golden Image siap digunakan.',
      ],
    });
  },
}));
