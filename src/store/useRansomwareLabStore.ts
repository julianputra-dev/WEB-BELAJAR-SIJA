// File: src/store/useRansomwareLabStore.ts
import { create } from 'zustand';
import { ProgressService } from '@/services/progressService';

export interface StorageFile {
  id: string;
  drive: 'C' | 'Z' | 'E';
  name: string;
  originalName: string;
  extension: string;
  originalExtension: string;
  sizeKB: number;
  status: 'clean' | 'carrier' | 'encrypting' | 'encrypted' | 'tampered' | 'ransom_note';
  isCarrier?: boolean;
  plaintextPreview: string;
  hexDump: string;
  entropy: number;
  headerMagic: string;
  lastModified: string;
}

export interface SystemProcess {
  pid: number;
  ppid: number;
  name: string;
  command: string;
  cpuPercent: number;
  memoryMB: number;
  isMalicious: boolean;
  status: 'running' | 'terminated';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  command?: string;
}

export type RansomwarePhase =
  | 'idle'
  | 'infecting'
  | 'infected'
  | 'nas_isolated'
  | 'partition_wiped'
  | 'backup_restored'
  | 'hardened';

interface RansomwareLabState {
  phase: RansomwarePhase;
  selectedFileId: string;
  selectedStorage: 'C' | 'Z' | 'E';
  nasConnected: boolean;
  backupMounted: boolean;
  systemPartitionClean: boolean;
  securityPolicyActive: boolean;
  shadowCopiesDeleted: boolean;
  diskIOMBps: number;
  cpuPercent: number;
  mistakes: number;
  fatalErrorNotice: string | null;
  feedbackNotice: string | null;
  showRansomModal: boolean;
  ransomPaidStatus: 'none' | 'failed_scam';
  tamperAttempted: boolean;
  completedSteps: {
    isolateNas: boolean;
    wipePartition: boolean;
    restoreBackup: boolean;
    postValidation: boolean;
  };
  localFiles: StorageFile[];
  nasFiles: StorageFile[];
  backupFiles: StorageFile[];
  processes: SystemProcess[];
  logs: AuditLogEntry[];

  // Actions
  setSelectedFile: (fileId: string, drive: 'C' | 'Z' | 'E') => void;
  setShowRansomModal: (show: boolean) => void;
  clearNotices: () => void;
  executeCarrierFile: () => void;
  disconnectNas: () => void;
  reconnectNas: () => void;
  formatSystemPartition: () => void;
  toggleMountBackupDrive: () => void;
  restoreFromBackup: () => Promise<void>;
  activateProtectionPolicy: () => void;
  testReExecutionAfterHardening: () => void;
  experimentManualRename: () => void;
  experimentPayRansom: () => void;
  resetLab: () => void;
}

const INITIAL_LOCAL_FILES: StorageFile[] = [
  {
    id: 'c-carrier',
    drive: 'C',
    name: 'Tagihan_Kurir.pdf.exe',
    originalName: 'Tagihan_Kurir.pdf.exe',
    extension: '.pdf.exe',
    originalExtension: '.pdf.exe',
    sizeKB: 842,
    status: 'carrier',
    isCarrier: true,
    plaintextPreview: 'MZ [PE32 Executable] Dual-extension Trojan Dropper / Ransomware Payload.\nDisguised as Adobe Acrobat Document icon with trailing .exe extension.\nEmbedded cryptographic routines: AES-256-CBC, RSA-2048 public key.',
    hexDump: '4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00  MZ..............\nB8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00  ........@.......\n54 68 69 73 20 70 72 6F 67 72 61 6D 20 63 61 6E  This program can\n6E 6F 74 20 62 65 20 72 75 6E 20 69 6E 20 44 4F  not be run in DO',
    entropy: 7.84,
    headerMagic: '4D 5A (MZ DOS Header)',
    lastModified: '2026-10-20 09:14:02',
  },
  {
    id: 'c-doc1',
    drive: 'C',
    name: 'Laporan_Keuangan_Q3.docx',
    originalName: 'Laporan_Keuangan_Q3.docx',
    extension: '.docx',
    originalExtension: '.docx',
    sizeKB: 324,
    status: 'clean',
    plaintextPreview: 'PT TEKNOLOGI INFORMASI NUSANTARA\nLAPORAN LABA RUGI TRIWULAN III 2026\n===================================\nPendapatan Operasional: Rp 4.250.000.000\nBeban Pemeliharaan Infrastruktur: Rp 820.000.000\nLaba Bersih Sebelum Pajak: Rp 1.430.000.000\nStatus: Disetujui Direktur Keuangan.',
    hexDump: '50 4B 03 04 14 00 06 00 08 00 00 00 21 00 3D 4F  PK..........!.=O\n5B 6A 8E 01 00 00 5C 05 00 00 13 00 08 02 5B 43  [j....\\.......[C\n6F 6E 74 65 6E 74 5F 54 79 70 65 73 5D 2E 78 6D  ontent_Types].xm\n6C 20 A2 04 02 28 A0 00 02 00 00 00 00 00 00 00  l ...(..........',
    entropy: 3.42,
    headerMagic: '50 4B 03 04 (ZIP / Office XML)',
    lastModified: '2026-10-18 14:22:10',
  },
  {
    id: 'c-db1',
    drive: 'C',
    name: 'Database_Klien.sql',
    originalName: 'Database_Klien.sql',
    extension: '.sql',
    originalExtension: '.sql',
    sizeKB: 1250,
    status: 'clean',
    plaintextPreview: 'CREATE TABLE tb_klien_korporat (\n  id_klien INT PRIMARY KEY AUTO_INCREMENT,\n  nama_perusahaan VARCHAR(100) NOT NULL,\n  kontak_darurat VARCHAR(50),\n  saldo_deposit DECIMAL(15,2)\n);\nINSERT INTO tb_klien_korporat VALUES (1, "PT Sentosa Mandiri", "0812345678", 500000000.00);',
    hexDump: '43 52 45 41 54 45 20 54 41 42 4C 45 20 74 62 5F  CREATE TABLE tb_\n6B 6C 69 65 6E 5F 6B 6F 72 70 6F 72 61 74 20 28  klien_korporat (\n0A 20 20 69 64 5F 6B 6C 69 65 6E 20 49 4E 54 20  .  id_klien INT \n50 52 49 4D 41 52 59 20 4B 45 59 20 41 55 54 4F  PRIMARY KEY AUTO',
    entropy: 3.18,
    headerMagic: '43 52 45 41 (ASCII SQL Script)',
    lastModified: '2026-10-19 11:05:44',
  },
  {
    id: 'c-img1',
    drive: 'C',
    name: 'Foto_Kegiatan_PKL.jpg',
    originalName: 'Foto_Kegiatan_PKL.jpg',
    extension: '.jpg',
    originalExtension: '.jpg',
    sizeKB: 780,
    status: 'clean',
    plaintextPreview: '[JFIF JPEG Image Stream]\nKamera: Nikon D5600\nResolusi: 1920x1080 300DPI\nObjek: Dokumentasi Implementasi Server Rack Data Center Siswa SMK SIJA.',
    hexDump: 'FF D8 FF E0 00 10 4A 46 49 46 00 01 01 01 00 60  ......JFIF.....`\n00 60 00 00 FF DB 00 43 00 08 06 06 07 06 05 08  .`.....C........\n07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................\n13 0F 14 1D 1A 1F 1E 1D 1A 1C 1C 20 24 2E 27 20  ........... $\'. ',
    entropy: 5.82,
    headerMagic: 'FF D8 FF E0 (JPEG File Interchange)',
    lastModified: '2026-10-15 16:40:00',
  },
];

const INITIAL_NAS_FILES: StorageFile[] = [
  {
    id: 'z-gaji',
    drive: 'Z',
    name: 'Rekap_Gaji_Divisi.xlsx',
    originalName: 'Rekap_Gaji_Divisi.xlsx',
    extension: '.xlsx',
    originalExtension: '.xlsx',
    sizeKB: 512,
    status: 'clean',
    plaintextPreview: 'KOMPILASI GAJI DIVISI TEKNIK & JARINGAN 2026\n===========================================\nPegawai: 42 Orang\nTotal Anggaran: Rp 315.000.000\nStatus Approval: HRD & General Manager.',
    hexDump: '50 4B 03 04 14 00 06 00 08 00 00 00 21 00 A1 9B  PK..........!... \n4C 2F 99 02 00 00 10 08 00 00 13 00 08 02 78 6C  L/............xl\n2F 77 6F 72 6B 62 6F 6F 6B 2E 78 6D 6C 20 A2 04  /workbook.xml ..\n02 28 A0 00 02 00 00 00 00 00 00 00 00 00 00 00  .(..............',
    entropy: 3.51,
    headerMagic: '50 4B 03 04 (ZIP / Office XML)',
    lastModified: '2026-10-19 17:30:15',
  },
  {
    id: 'z-kontrak',
    drive: 'Z',
    name: 'Master_Kontrak_Proyek.pdf',
    originalName: 'Master_Kontrak_Proyek.pdf',
    extension: '.pdf',
    originalExtension: '.pdf',
    sizeKB: 1420,
    status: 'clean',
    plaintextPreview: '%PDF-1.7\nSURAT PERJANJIAN KERJASAMA PEMBANGUNAN JARINGAN KAMPUS\nAntara Dinas Pendidikan dan PT Telekomunikasi Indonesia.\nPasal 4: Kerahasiaan Data & Ketentuan Enkripsi Jalur Komunikasi.',
    hexDump: '25 50 44 46 2D 31 2E 37 0A 25 D3 F4 CC E1 0A 34  %PDF-1.7.%.....4\n30 20 30 20 6F 62 6A 0A 3C 3C 2F 4C 69 6E 65 61  0 0 obj.<</Linea\n72 69 7A 65 64 20 31 2F 4C 20 39 38 34 32 30 2F  rized 1/L 98420/\n48 20 5B 20 38 31 32 20 32 30 38 20 5D 2F 45 20  H [ 812 208 ]/E ',
    entropy: 4.88,
    headerMagic: '25 50 44 46 (%PDF Specification)',
    lastModified: '2026-10-17 10:11:00',
  },
];

const INITIAL_BACKUP_FILES: StorageFile[] = [
  {
    id: 'e-doc1',
    drive: 'E',
    name: 'Laporan_Keuangan_Q3_GoldenBackup.docx',
    originalName: 'Laporan_Keuangan_Q3_GoldenBackup.docx',
    extension: '.docx',
    originalExtension: '.docx',
    sizeKB: 324,
    status: 'clean',
    plaintextPreview: 'SALINAN STERIL AIR-GAP (WORM BACKUP)\nPT TEKNOLOGI INFORMASI NUSANTARA\nLAPORAN LABA RUGI TRIWULAN III 2026\nChecksum SHA-256 Terverifikasi Valid.',
    hexDump: '50 4B 03 04 14 00 06 00 08 00 00 00 21 00 3D 4F  PK..........!.=O\n5B 6A 8E 01 00 00 5C 05 00 00 13 00 08 02 5B 43  [j....\\.......[C\n6F 6E 74 65 6E 74 5F 54 79 70 65 73 5D 2E 78 6D  ontent_Types].xm\n6C 20 A2 04 02 28 A0 00 02 00 00 00 00 00 00 00  l ...(..........',
    entropy: 3.42,
    headerMagic: '50 4B 03 04 (ZIP / Office XML)',
    lastModified: '2026-10-15 00:00:00',
  },
  {
    id: 'e-db1',
    drive: 'E',
    name: 'Database_Klien_GoldenBackup.sql',
    originalName: 'Database_Klien_GoldenBackup.sql',
    extension: '.sql',
    originalExtension: '.sql',
    sizeKB: 1250,
    status: 'clean',
    plaintextPreview: 'SALINAN STERIL AIR-GAP (WORM BACKUP)\nCREATE TABLE tb_klien_korporat (\n  id_klien INT PRIMARY KEY AUTO_INCREMENT,\n  nama_perusahaan VARCHAR(100) NOT NULL\n);',
    hexDump: '43 52 45 41 54 45 20 54 41 42 4C 45 20 74 62 5F  CREATE TABLE tb_\n6B 6C 69 65 6E 5F 6B 6F 72 70 6F 72 61 74 20 28  klien_korporat (\n0A 20 20 69 64 5F 6B 6C 69 65 6E 20 49 4E 54 20  .  id_klien INT \n50 52 49 4D 41 52 59 20 4B 45 59 20 41 55 54 4F  PRIMARY KEY AUTO',
    entropy: 3.18,
    headerMagic: '43 52 45 41 (ASCII SQL Script)',
    lastModified: '2026-10-15 00:00:00',
  },
  {
    id: 'e-gaji',
    drive: 'E',
    name: 'Rekap_Gaji_Divisi_GoldenBackup.xlsx',
    originalName: 'Rekap_Gaji_Divisi_GoldenBackup.xlsx',
    extension: '.xlsx',
    originalExtension: '.xlsx',
    sizeKB: 512,
    status: 'clean',
    plaintextPreview: 'SALINAN STERIL AIR-GAP (WORM BACKUP)\nKOMPILASI GAJI DIVISI TEKNIK & JARINGAN 2026\nTotal Anggaran: Rp 315.000.000',
    hexDump: '50 4B 03 04 14 00 06 00 08 00 00 00 21 00 A1 9B  PK..........!... \n4C 2F 99 02 00 00 10 08 00 00 13 00 08 02 78 6C  L/............xl\n2F 77 6F 72 6B 62 6F 6F 6B 2E 78 6D 6C 20 A2 04  /workbook.xml ..\n02 28 A0 00 02 00 00 00 00 00 00 00 00 00 00 00  .(..............',
    entropy: 3.51,
    headerMagic: '50 4B 03 04 (ZIP / Office XML)',
    lastModified: '2026-10-15 00:00:00',
  },
];

const INITIAL_PROCESSES: SystemProcess[] = [
  {
    pid: 840,
    ppid: 4,
    name: 'smss.exe',
    command: 'C:\\Windows\\System32\\smss.exe',
    cpuPercent: 0.1,
    memoryMB: 4.8,
    isMalicious: false,
    status: 'running',
  },
  {
    pid: 1042,
    ppid: 840,
    name: 'services.exe',
    command: 'C:\\Windows\\System32\\services.exe',
    cpuPercent: 0.6,
    memoryMB: 19.2,
    isMalicious: false,
    status: 'running',
  },
  {
    pid: 1420,
    ppid: 1042,
    name: 'explorer.exe',
    command: 'C:\\Windows\\explorer.exe',
    cpuPercent: 1.8,
    memoryMB: 78.4,
    isMalicious: false,
    status: 'running',
  },
  {
    pid: 2280,
    ppid: 1420,
    name: 'svchost.exe (LanmanWorkstation)',
    command: 'C:\\Windows\\System32\\svchost.exe -k NetworkService',
    cpuPercent: 0.4,
    memoryMB: 32.1,
    isMalicious: false,
    status: 'running',
  },
];

const INITIAL_LOGS: AuditLogEntry[] = [
  {
    id: 'l-0',
    timestamp: '09:15:00',
    level: 'info',
    message: 'Lingkungan simulasi sandbox forensik siap. Drive C: terpasang, Share NAS Z: terhubung, Drive E: terlepas (Air-Gapped).',
  },
  {
    id: 'l-1',
    timestamp: '09:15:02',
    level: 'info',
    message: 'Layanan Volume Shadow Copy (VSS) beroperasi normal. Kebijakan eksekusi berkas: Default Permissive.',
  },
];

export const useRansomwareLabStore = create<RansomwareLabState>((set, get) => ({
  phase: 'idle',
  selectedFileId: 'c-carrier',
  selectedStorage: 'C',
  nasConnected: true,
  backupMounted: false,
  systemPartitionClean: false,
  securityPolicyActive: false,
  shadowCopiesDeleted: false,
  diskIOMBps: 2.1,
  cpuPercent: 3.5,
  mistakes: 0,
  fatalErrorNotice: null,
  feedbackNotice: null,
  showRansomModal: false,
  ransomPaidStatus: 'none',
  tamperAttempted: false,
  completedSteps: {
    isolateNas: false,
    wipePartition: false,
    restoreBackup: false,
    postValidation: false,
  },
  localFiles: INITIAL_LOCAL_FILES,
  nasFiles: INITIAL_NAS_FILES,
  backupFiles: INITIAL_BACKUP_FILES,
  processes: INITIAL_PROCESSES,
  logs: INITIAL_LOGS,

  setSelectedFile: (fileId, drive) => {
    set({ selectedFileId: fileId, selectedStorage: drive });
  },

  setShowRansomModal: (show) => {
    set({ showRansomModal: show });
  },

  clearNotices: () => {
    set({ fatalErrorNotice: null, feedbackNotice: null });
  },

  executeCarrierFile: () => {
    const { phase, securityPolicyActive, processes, localFiles, nasConnected, logs } = get();

    if (securityPolicyActive) {
      set({
        feedbackNotice: 'Akses Ditolak oleh Software Restriction Policy (SRP): Eksekusi file berekstensi ganda (*.pdf.exe) dari folder dokumen berhasil diblokir.',
        logs: [
          {
            id: `l-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            level: 'success',
            message: 'AppLocker / SRP Policy mencegah eksekusi: Tagihan_Kurir.pdf.exe dilarang berjalan.',
            command: 'SE_PRIVILEGE_CHECK: ACCESS_DENIED_BY_GPO',
          },
          ...logs,
        ],
      });
      return;
    }

    if (phase !== 'idle' && phase !== 'hardened') {
      set({
        feedbackNotice: 'Proses Ransomware sudah aktif atau sistem telah dalam kondisi insiden.',
      });
      return;
    }

    // Eksekusi dimulai
    set({
      phase: 'infecting',
      diskIOMBps: 188.4,
      cpuPercent: 86.5,
      shadowCopiesDeleted: true,
      logs: [
        {
          id: `l-${Date.now()}-1`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'warn',
          message: 'Eksekusi Tagihan_Kurir.pdf.exe oleh pengguna explorer.exe (PID 1420). Sub-proses ransomware diinisialisasi.',
          command: 'C:\\Users\\Admin\\Documents\\Tagihan_Kurir.pdf.exe',
        },
        {
          id: `l-${Date.now()}-2`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'error',
          message: 'Eksekusi perintah pemusnahan bayangan pemulihan sistem operasi lokal.',
          command: 'vssadmin.exe delete shadows /all /quiet',
        },
        {
          id: `l-${Date.now()}-3`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'error',
          message: 'Pemusnahan cadangan status sistem Windows Backup Catalog.',
          command: 'wbadmin.exe DELETE SYSTEMSTATEBACKUP -keepVersions:0',
        },
        {
          id: `l-${Date.now()}-4`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'warn',
          message: 'Thread kriptografi AES-256-CBC aktif. Membaca dan mengenkripsi berkas dokumen secara beruntun di drive C:.',
        },
        ...logs,
      ],
      processes: [
        ...processes,
        {
          pid: 4120,
          ppid: 1420,
          name: 'crypto_locker.exe',
          command: 'C:\\Users\\Admin\\AppData\\Roaming\\crypto_locker.exe --encrypt-all',
          cpuPercent: 82.4,
          memoryMB: 114.6,
          isMalicious: true,
          status: 'running',
        },
      ],
    });

    // Simulasi enkripsi lokal bertahap
    setTimeout(() => {
      const stateNow = get();
      const updatedLocalFiles: StorageFile[] = stateNow.localFiles.map((f) => {
        if (f.id === 'c-carrier') return f;
        return {
          ...f,
          name: `${f.originalName}.locked`,
          extension: '.locked',
          status: 'encrypted',
          entropy: 7.96,
          headerMagic: '4C 4F 43 4B (LOCK Payload Cipher Header)',
          plaintextPreview: '[CIPHERTEXT TERENKRIPSI - AES-256]\n7a e4 b1 99 f0 d3 c8 a1 10 9b 22 fe 55 dc 80 43\n89 b4 71 22 c3 41 af 8e 90 12 d8 ea cc 11 09 a2\nBerkas telah terkunci secara kriptografis.\nStruktur berkas asli dan header format telah musnah.',
          hexDump: '4C 4F 43 4B 8A E2 91 04 22 7B C9 88 F1 02 A3 77  LOCK...."{\\..\\..\nE4 10 9B CC 28 41 DE 90 19 FC 82 AA B3 44 91 20  ....(A.......D. \n71 C4 A8 99 F2 01 E9 8B C0 49 11 82 34 81 FF 00  q........I..4...\nB8 92 1A CC FF 01 22 93 88 19 44 A1 00 23 C1 92  ......"...D..#..',
        };
      });

      // Munculkan README_DECRYPT.txt
      const ransomNote: StorageFile = {
        id: 'c-ransom-note',
        drive: 'C',
        name: 'README_DECRYPT.txt',
        originalName: 'README_DECRYPT.txt',
        extension: '.txt',
        originalExtension: '.txt',
        sizeKB: 4,
        status: 'ransom_note',
        plaintextPreview: 'PERINGATAN KRITIS FORENSIK:\nSeluruh berkas Anda telah dienkripsi dengan algoritma hibrida AES-256 + RSA-2048.\nKunci privat disimpan di server Command & Control kami di jaringan Tor.\nUntuk mendapatkan dekriptor, kirimkan 0.25 BTC ke alamat tertera.\nPercobaan modifikasi berkas secara manual akan merusak data Anda selamanya!',
        hexDump: '50 45 52 49 4E 47 41 54 41 4E 20 4B 52 49 54 49  PERINGATAN KRITI\n53 20 46 4F 52 45 4E 53 49 4B 3A 0A 53 65 6C 75  S FORENSIK:.Selu\n72 75 68 20 62 65 72 6B 61 73 20 41 6E 64 61 20  ruh berkas Anda \n74 65 6C 61 68 20 64 69 65 6E 6B 72 69 70 73 69  telah dienkripsi',
        entropy: 3.75,
        headerMagic: '50 45 52 49 (ASCII Text Ransom Note)',
        lastModified: new Date().toLocaleTimeString(),
      };

      const finalLocal = [...updatedLocalFiles, ransomNote];

      // Periksa apakah NAS terhubung
      let updatedNas = stateNow.nasFiles;
      const newLogs = [...stateNow.logs];

      if (stateNow.nasConnected) {
        newLogs.unshift({
          id: `l-${Date.now()}-nas`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'error',
          message: 'Penyebaran Enkripsi Jaringan: Ransomware mendeteksi SMB share Z:\\ dan mengenkripsi berkas divisi!',
          command: 'C:\\Windows\\System32\\net.exe share Z: /encrypted',
        });

        updatedNas = stateNow.nasFiles.map((nf) => ({
          ...nf,
          name: `${nf.originalName}.locked`,
          extension: '.locked',
          status: 'encrypted',
          entropy: 7.95,
          headerMagic: '4C 4F 43 4B (LOCK Payload Cipher Header)',
          plaintextPreview: '[CIPHERTEXT NAS TERENKRIPSI]\nBerkas departemen pada penyimpanan jaringan terenkripsi via koneksi SMB terbuka.',
          hexDump: '4C 4F 43 4B 99 22 A1 F0 44 8B C1 09 88 12 EE 45  LOCK."..D......E\n10 84 AA CC 21 00 98 FE 77 12 41 90 BC 32 11 90  ....!...w.A..2..\n44 19 82 EE FC 11 00 23 88 91 22 10 99 AA 88 71  D......#.."....q',
        }));
      }

      set({
        phase: 'infected',
        diskIOMBps: 4.8,
        cpuPercent: 12.0,
        localFiles: finalLocal,
        nasFiles: updatedNas,
        selectedFileId: 'c-ransom-note',
        selectedStorage: 'C',
        showRansomModal: true,
        logs: [
          {
            id: `l-${Date.now()}-done`,
            timestamp: new Date().toLocaleTimeString(),
            level: 'error',
            message: 'Enkripsi lokal selesai. Catatan tebusan README_DECRYPT.txt disuntikkan ke desktop pengguna.',
          },
          ...newLogs,
        ],
      });
    }, 1200);
  },

  disconnectNas: () => {
    const { phase, logs, completedSteps } = get();

    if (phase === 'idle') {
      set({
        feedbackNotice: 'Sistem masih dalam keadaan normal. Tidak ada ancaman perambatan jaringan saat ini.',
      });
      return;
    }

    // Jika pengguna sedang menginspeksi berkas di Z:, otomatis alihkan ke Drive C:
    const currentStorage = get().selectedStorage;
    const newStorage = currentStorage === 'Z' ? 'C' : currentStorage;
    const newFileId = currentStorage === 'Z' ? 'c-doc1' : get().selectedFileId;

    set({
      nasConnected: false,
      selectedStorage: newStorage,
      selectedFileId: newFileId,
      completedSteps: { ...completedSteps, isolateNas: true },
      logs: [
        {
          id: `l-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'success',
          message: 'Isolasi Jaringan Berhasil: Sesi SMB/CIFS ke Shared Storage Z: diputus secara permanen.',
          command: 'net.exe use Z: /delete /yes',
        },
        ...logs,
      ],
      feedbackNotice: 'SOP Langkah 1 Berhasil: Shared Folder NAS (Z:) telah diisolasi dari workstation yang terinfeksi.',
    });
  },

  reconnectNas: () => {
    const { phase, processes, nasFiles, logs } = get();
    const isCryptoRunning = processes.some((p) => p.name === 'crypto_locker.exe' && p.status === 'running');

    if (isCryptoRunning) {
      // Kesalahan: Reconnect NAS saat crypto masih jalan!
      const encryptedNas = nasFiles.map((nf) => ({
        ...nf,
        name: `${nf.originalName}.locked`,
        extension: '.locked',
        status: 'encrypted' as const,
        entropy: 7.95,
        plaintextPreview: '[CIPHERTEXT NAS TERENKRIPSI]\nBerkas departemen terkunci karena koneksi NAS disambungkan kembali saat malware aktif.',
      }));

      set((state) => ({
        nasConnected: true,
        nasFiles: encryptedNas,
        mistakes: state.mistakes + 1,
        fatalErrorNotice: 'Kesalahan Kritis: Menyambungkan kembali NAS saat crypto_locker.exe masih aktif menyebabkan seluruh berkas di Z: terkunci seketika!',
        logs: [
          {
            id: `l-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            level: 'error',
            message: 'Pelanggaran SOP: NAS disambungkan ulang saat proses ransomware aktif.',
          },
          ...logs,
        ],
      }));
      return;
    }

    set({
      nasConnected: true,
      logs: [
        {
          id: `l-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'info',
          message: 'Koneksi Shared Storage Z: dipulihkan ke jaringan aman.',
          command: 'net.exe use Z: \\\\nas-corp.internal\\shared',
        },
        ...logs,
      ],
    });
  },

  formatSystemPartition: () => {
    const { phase, nasConnected, processes, logs, completedSteps } = get();

    if (phase === 'idle') {
      set({ feedbackNotice: 'Partisi sistem masih bersih, format partisi tidak diperlukan.' });
      return;
    }

    if (nasConnected) {
      set((state) => ({
        mistakes: state.mistakes + 1,
        fatalErrorNotice: 'Pelanggaran Urutan SOP: Anda mencoba memformat sistem sebelum memutus koneksi NAS (Z:). Putuskan sambungan jaringan NAS terlebih dahulu agar vektor perambatan terisolasi!',
        logs: [
          {
            id: `l-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            level: 'error',
            message: 'Peringatan Forensik: Format dieksekusi dengan koneksi jaringan NAS masih terbuka.',
          },
          ...logs,
        ],
      }));
      return;
    }

    // Pembersihan sistem yang valid: Seluruh thread dan biner malware musnah dari RAM
    const cleanProcesses = processes.filter((p) => !p.isMalicious);

    // Pastikan berkas terpilih adalah dokumen bersih
    const newSelectedFileId =
      get().selectedFileId === 'c-carrier' || get().selectedFileId === 'c-ransom-note'
        ? 'c-doc1'
        : get().selectedFileId;

    set({
      phase: 'partition_wiped',
      systemPartitionClean: true,
      shadowCopiesDeleted: false,
      diskIOMBps: 2.3,
      cpuPercent: 3.8,
      showRansomModal: false,
      selectedFileId: newSelectedFileId,
      processes: cleanProcesses,
      completedSteps: { ...completedSteps, wipePartition: true },
      feedbackNotice: 'SOP Langkah 2 Berhasil: Partisi sistem operasi telah diformat bersih. Proses crypto_locker.exe di RAM dan seluruh berkas terinfeksi telah dimusnahkan.',
      logs: [
        {
          id: `l-${Date.now()}-1`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'success',
          message: 'Format Partisi Sistem Operasi C: (NTFS Clean Image & Wipe Payload).',
          command: 'format.com C: /FS:NTFS /Q /Y',
        },
        {
          id: `l-${Date.now()}-2`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'success',
          message: 'Terminasi Paksa: Thread crypto_locker.exe (PID 4120) terhapus total dari memori RAM.',
          command: 'taskkill.exe /F /PID 4120',
        },
        {
          id: `l-${Date.now()}-3`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'success',
          message: 'Layanan Sistem Pulih: Volume Shadow Copies (VSS) beroperasi normal pada partisi steril.',
          command: 'net.exe start VSS',
        },
        ...logs,
      ],
    });
  },

  toggleMountBackupDrive: () => {
    const { backupMounted, processes, backupFiles, logs } = get();
    const isCryptoRunning = processes.some((p) => p.name === 'crypto_locker.exe' && p.status === 'running');

    if (!backupMounted) {
      // Pasang backup drive
      if (isCryptoRunning) {
        // FATAL MISTAKE 1: Backup drive dicolok saat sistem masih terinfeksi
        const infectedBackup = backupFiles.map((bf) => ({
          ...bf,
          name: `${bf.originalName}.locked`,
          extension: '.locked',
          status: 'encrypted' as const,
          entropy: 7.97,
          plaintextPreview: '[CIPHERTEXT CADANGAN TERKONTAMINASI]\nMedia backup dicolokkan saat malware masih aktif di RAM. Kripto-rutin langsung mengenkripsi volume E:\\!',
          hexDump: '4C 4F 43 4B C1 A0 99 21 BB 43 89 00 23 FF 98 12  LOCK.....C..#...\n88 91 22 40 10 99 AA 88 71 22 10 09 AA 88 12 FC  .."@....q"......',
        }));

        set((state) => ({
          backupMounted: true,
          backupFiles: infectedBackup,
          mistakes: state.mistakes + 1,
          fatalErrorNotice: 'FATAL: Anda menghubungkan External Offline Backup (E:) saat proses Ransomware masih aktif di RAM! crypto_locker.exe langsung mendeteksi drive baru dan mengenkripsi seluruh salinan cadangan Anda!',
          logs: [
            {
              id: `l-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString(),
              level: 'error',
              message: 'KONTAMINASI CADANGAN: Volume E:\\ terdeteksi oleh crypto_locker.exe. Enkripsi backup terjadi seketika!',
            },
            ...logs,
          ],
        }));
        return;
      }

      // Safe mount
      set({
        backupMounted: true,
        feedbackNotice: 'External Offline Backup Drive (E:) berhasil dipasang dalam kondisi sistem yang aman dan steril.',
        logs: [
          {
            id: `l-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            level: 'info',
            message: 'Drive E: (WORM Air-Gapped Storage) terpasang. Integritas hash SHA-256 berkas cadangan valid.',
            command: 'mountvol.exe E: \\\\?\\Volume{airgap-secure-backup-2026}',
          },
          ...logs,
        ],
      });
    } else {
      // Lepas drive
      set({
        backupMounted: false,
        logs: [
          {
            id: `l-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            level: 'info',
            message: 'Drive E: (Air-Gapped Backup) berhasil dilepas (Unmounted).',
          },
          ...logs,
        ],
      });
    }
  },

  restoreFromBackup: async () => {
    const { backupMounted, backupFiles, systemPartitionClean, completedSteps, logs } = get();

    if (!backupMounted) {
      set({
        feedbackNotice: 'Gagal: Media cadangan (E: Offline Backup Drive) belum terhubung ke sistem.',
      });
      return;
    }

    // Periksa apakah cadangan terkontaminasi
    const isBackupInfected = backupFiles.some((f) => f.status === 'encrypted');
    if (isBackupInfected) {
      set((state) => ({
        mistakes: state.mistakes + 1,
        fatalErrorNotice: 'Tidak dapat memulihkan berkas: Seluruh data pada media cadangan telah terkontaminasi enkripsi karena kesalahan urutan penanganan sebelumnya! Lakukan reset lab.',
      }));
      return;
    }

    if (!systemPartitionClean) {
      set((state) => ({
        mistakes: state.mistakes + 1,
        fatalErrorNotice: 'Pelanggaran SOP: Jangan merestorasi berkas ke partisi sistem yang belum diformat bersih!',
      }));
      return;
    }

    // Restorasi berhasil
    const restoredLocal: StorageFile[] = [
      {
        id: 'c-doc1',
        drive: 'C',
        name: 'Laporan_Keuangan_Q3.docx',
        originalName: 'Laporan_Keuangan_Q3.docx',
        extension: '.docx',
        originalExtension: '.docx',
        sizeKB: 324,
        status: 'clean',
        plaintextPreview: 'PT TEKNOLOGI INFORMASI NUSANTARA\nLAPORAN LABA RUGI TRIWULAN III 2026\n[BERKAS TELAH DIPULIHKAN PENUH DARI GOLDEN BACKUP STERIL]',
        hexDump: '50 4B 03 04 14 00 06 00 08 00 00 00 21 00 3D 4F  PK..........!.=O\n5B 6A 8E 01 00 00 5C 05 00 00 13 00 08 02 5B 43  [j....\\.......[C',
        entropy: 3.42,
        headerMagic: '50 4B 03 04 (ZIP / Office XML)',
        lastModified: new Date().toLocaleTimeString(),
      },
      {
        id: 'c-db1',
        drive: 'C',
        name: 'Database_Klien.sql',
        originalName: 'Database_Klien.sql',
        extension: '.sql',
        originalExtension: '.sql',
        sizeKB: 1250,
        status: 'clean',
        plaintextPreview: 'CREATE TABLE tb_klien_korporat (\n  id_klien INT PRIMARY KEY AUTO_INCREMENT,\n  nama_perusahaan VARCHAR(100) NOT NULL\n);\n[BERKAS TELAH DIPULIHKAN PENUH DARI GOLDEN BACKUP STERIL]',
        hexDump: '43 52 45 41 54 45 20 54 41 42 4C 45 20 74 62 5F  CREATE TABLE tb_\n6B 6C 69 65 6E 5F 6B 6F 72 70 6F 72 61 74 20 28  klien_korporat (',
        entropy: 3.18,
        headerMagic: '43 52 45 41 (ASCII SQL Script)',
        lastModified: new Date().toLocaleTimeString(),
      },
      {
        id: 'c-img1',
        drive: 'C',
        name: 'Foto_Kegiatan_PKL.jpg',
        originalName: 'Foto_Kegiatan_PKL.jpg',
        extension: '.jpg',
        originalExtension: '.jpg',
        sizeKB: 780,
        status: 'clean',
        plaintextPreview: '[JFIF JPEG Image Stream - DIPULIHKAN DARI CADANGAN]\nDokumentasi Siswa SMK SIJA.',
        hexDump: 'FF D8 FF E0 00 10 4A 46 49 46 00 01 01 01 00 60  ......JFIF.....`',
        entropy: 5.82,
        headerMagic: 'FF D8 FF E0 (JPEG File Interchange)',
        lastModified: new Date().toLocaleTimeString(),
      },
    ];

    const restoredNas = INITIAL_NAS_FILES;

    // Jika pengguna sedang menginspeksi Drive E:, alihkan ke C: karena drive cadangan dilepas
    const currentStorage = get().selectedStorage;
    const newStorage = currentStorage === 'E' ? 'C' : currentStorage;
    const newFileId = currentStorage === 'E' ? 'c-doc1' : get().selectedFileId;

    set({
      phase: 'backup_restored',
      localFiles: restoredLocal,
      nasFiles: restoredNas,
      nasConnected: true,
      backupMounted: false,
      selectedStorage: newStorage,
      selectedFileId: newFileId,
      shadowCopiesDeleted: false,
      completedSteps: { ...completedSteps, restoreBackup: true },
      feedbackNotice: 'SOP Langkah 3 Berhasil: Seluruh data lokal dan jaringan pulih dari Offline Backup. Shared NAS (Z:) disambungkan kembali dan media cadangan (E:) dilepas ke status Air-Gap aman.',
      logs: [
        {
          id: `l-${Date.now()}-res1`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'success',
          message: 'Restorasi Berhasil: Salinan cadangan diverifikasi dan ditulis ke partisi C: dan Z:.',
          command: 'robocopy.exe E:\\AirGap_Backup C:\\Users\\Admin\\Documents /MIR /SEC',
        },
        {
          id: `l-${Date.now()}-res2`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'success',
          message: 'Pemulihan Jaringan Kantor: Shared NAS (Z:) tersambung kembali secara aman ke sistem steril.',
          command: 'net.exe use Z: \\\\nas-corp.internal\\shared',
        },
        {
          id: `l-${Date.now()}-res3`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'info',
          message: 'Prosedur Air-Gap 3-2-1: Media cadangan Drive E: dilepas (unmounted) untuk mempertahankan isolasi offline.',
          command: 'mountvol.exe E: /d',
        },
        ...logs,
      ],
    });

    await ProgressService.saveModuleProgress({
      malwareType: 'ransomware',
      infectionObserved: true,
      mitigationCompleted: true,
      mistakeCount: get().mistakes,
      updatedAt: new Date().toISOString(),
    });
  },

  activateProtectionPolicy: () => {
    const { completedSteps, logs } = get();

    set({
      securityPolicyActive: true,
      phase: 'hardened',
      completedSteps: { ...completedSteps, postValidation: true },
      feedbackNotice: 'Kebijakan Keamanan Aktif: Software Restriction Policy (SRP) & Proteksi Ekstensi Ganda berhasil dikonfigurasi.',
      logs: [
        {
          id: `l-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'success',
          message: 'Penerapan Aturan Pencegahan: Eksekusi biner berekstensi ganda *.pdf.exe dan payload script diblokir total.',
          command: 'gpupdate.exe /force /target:computer',
        },
        ...logs,
      ],
    });
  },

  testReExecutionAfterHardening: () => {
    const { securityPolicyActive, logs } = get();

    if (securityPolicyActive) {
      set({
        feedbackNotice: 'Uji Validasi Berhasil: Sistem keamanan menolak peluncuran biner malware. Lingkungan telah imun.',
        logs: [
          {
            id: `l-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            level: 'success',
            message: 'Validasi Pasca-Mitigasi: Eksekusi diblokir oleh SRP Rule Hash & Path Block.',
          },
          ...logs,
        ],
      });
    }
  },

  experimentManualRename: () => {
    const { selectedFileId, selectedStorage, localFiles, nasFiles, logs } = get();

    const targetList = selectedStorage === 'C' ? localFiles : nasFiles;
    const targetFile = targetList.find((f) => f.id === selectedFileId);

    if (!targetFile || targetFile.extension !== '.locked') {
      set({
        feedbackNotice: 'Pilih berkas berekstensi .locked terlebih dahulu untuk melakukan eksperimen penggantian ekstensi.',
      });
      return;
    }

    const updated = targetList.map((f) => {
      if (f.id === targetFile.id) {
        return {
          ...f,
          name: f.originalName,
          extension: f.originalExtension,
          status: 'tampered' as const,
        };
      }
      return f;
    });

    if (selectedStorage === 'C') {
      set({ localFiles: updated, tamperAttempted: true });
    } else {
      set({ nasFiles: updated, tamperAttempted: true });
    }

    set({
      feedbackNotice: 'Eksperimen Selesai: Ekstensi berkas diubah kembali menjadi dokumen. Namun perhatikan Panel X-Ray: Isi berkas tetap berupa ciphertext acak dengan entropi 7.96! Mengganti ekstensi tidak memulihkan struktur data.',
      logs: [
        {
          id: `l-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'warn',
          message: `Eksperimen Pengguna: Mengubah nama ${targetFile.name} menjadi ${targetFile.originalName}. Header file tetap invalid.`,
          command: `ren "${targetFile.name}" "${targetFile.originalName}"`,
        },
        ...logs,
      ],
    });
  },

  experimentPayRansom: () => {
    const { logs } = get();

    set((state) => ({
      ransomPaidStatus: 'failed_scam',
      mistakes: state.mistakes + 1,
      feedbackNotice: 'Pelanggaran SOP Industri & BSSN: Uang tebusan dikirimkan, namun penyerang tidak pernah memberikan kunci privat! Server Tor offline. Organisasi Anda kini tercatat sebagai target pemerasan berulang.',
      logs: [
        {
          id: `l-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'error',
          message: 'Transaksi Bitcoin 0.25 BTC terkirim ke dompet penyerang. Tidak ada respons dekriptor.',
        },
        ...logs,
      ],
    }));
  },

  resetLab: () => {
    set({
      phase: 'idle',
      selectedFileId: 'c-carrier',
      selectedStorage: 'C',
      nasConnected: true,
      backupMounted: false,
      systemPartitionClean: false,
      securityPolicyActive: false,
      shadowCopiesDeleted: false,
      diskIOMBps: 2.1,
      cpuPercent: 3.5,
      mistakes: 0,
      fatalErrorNotice: null,
      feedbackNotice: null,
      showRansomModal: false,
      ransomPaidStatus: 'none',
      tamperAttempted: false,
      completedSteps: {
        isolateNas: false,
        wipePartition: false,
        restoreBackup: false,
        postValidation: false,
      },
      localFiles: INITIAL_LOCAL_FILES,
      nasFiles: INITIAL_NAS_FILES,
      backupFiles: INITIAL_BACKUP_FILES,
      processes: INITIAL_PROCESSES,
      logs: INITIAL_LOGS,
    });
  },
}));
