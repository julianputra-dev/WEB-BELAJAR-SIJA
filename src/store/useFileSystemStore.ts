// File: src/store/useFileSystemStore.ts
import { create } from 'zustand';
import { SimulatedFile } from '@/types/simulation';

interface FileSystemStore {
  files: SimulatedFile[];
  nasConnected: boolean;
  backupConnected: boolean;
  systemCleaned: boolean;
  isRansomwareActive: boolean;
  cpuUsage: number;
  ramUsage: number;
  executeCarrierFile: (fileId: string) => void;
  disconnectNas: () => void;
  wipeSystemPartition: () => void;
  attachBackupDrive: () => void;
  restoreFromBackup: () => void;
  quarantineFile: (fileId: string) => void;
  disinfectFiles: () => void;
  resetFileSystem: () => void;
}

const initialFiles: SimulatedFile[] = [
  { id: 'f-1', name: 'Tagihan_Kurir.pdf', extension: '.exe', sizeKB: 840, status: 'clean', isCarrier: true },
  { id: 'f-2', name: 'Laporan_PKL_SIJA.docx', extension: '.docx', sizeKB: 2450, status: 'clean' },
  { id: 'f-3', name: 'Topologi_Jaringan_Lab.vsdx', extension: '.vsdx', sizeKB: 1820, status: 'clean' },
  { id: 'f-4', name: 'Konfigurasi_Mikrotik.rsc', extension: '.rsc', sizeKB: 120, status: 'clean' },
  { id: 'f-5', name: 'Database_Siswa.sql', extension: '.sql', sizeKB: 5120, status: 'clean' },
];

export const useFileSystemStore = create<FileSystemStore>((set) => ({
  files: initialFiles,
  nasConnected: true,
  backupConnected: false,
  systemCleaned: false,
  isRansomwareActive: false,
  cpuUsage: 14,
  ramUsage: 28,

  executeCarrierFile: (fileId: string) =>
    set((state) => ({
      isRansomwareActive: true,
      cpuUsage: 92,
      ramUsage: 86,
      files: state.files.map((f) =>
        f.id === fileId
          ? { ...f, status: 'infected' }
          : { ...f, status: 'encrypted' }
      ),
    })),

  disconnectNas: () =>
    set({
      nasConnected: false,
    }),

  wipeSystemPartition: () =>
    set({
      systemCleaned: true,
      isRansomwareActive: false,
      cpuUsage: 12,
      ramUsage: 25,
      files: [], // partisi dibersihkan
    }),

  attachBackupDrive: () =>
    set({
      backupConnected: true,
    }),

  restoreFromBackup: () =>
    set({
      files: initialFiles.map((f) =>
        f.isCarrier ? { ...f, status: 'quarantined' } : { ...f, status: 'clean' }
      ),
      cpuUsage: 15,
      ramUsage: 30,
    }),

  quarantineFile: (fileId: string) =>
    set((state) => ({
      files: state.files.map((f) =>
        f.id === fileId ? { ...f, status: 'quarantined' } : f
      ),
    })),

  disinfectFiles: () =>
    set((state) => ({
      files: state.files.map((f) => ({ ...f, status: 'clean' })),
      cpuUsage: 12,
      ramUsage: 26,
    })),

  resetFileSystem: () =>
    set({
      files: initialFiles,
      nasConnected: true,
      backupConnected: false,
      systemCleaned: false,
      isRansomwareActive: false,
      cpuUsage: 14,
      ramUsage: 28,
    }),
}));
