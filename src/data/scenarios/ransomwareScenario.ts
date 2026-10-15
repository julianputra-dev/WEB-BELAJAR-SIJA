// File: src/data/scenarios/ransomwareScenario.ts
import { ScenarioMetadata } from '@/types/simulation';

export const ransomwareScenario: ScenarioMetadata = {
  id: 'ransomware',
  title: 'Ransomware (Enkripsi Berkas & Penyanderaan)',
  badge: 'Storage & Encryption',
  description:
    'Simulasi serangan pemerasan digital yang mengeksploitasi kelengahan pengguna melalui rekayasa sosial ekstensi ganda (.pdf.exe) dan mengenkripsi dokumen penting.',
  difficulty: 'Menengah',
  targetSop: [
    'Isolasi Akses Shared Folder / NAS',
    'Pembersihan Partisi Sistem Terinfeksi',
    'Pemulihan Data Cadangan (Offline Backup)',
  ],
  narratives: {
    idle: {
      phase: 'idle',
      title: 'Fase Persiapan: Direktori Dokumen Normal',
      instruction:
        'Klik berkas mencurigakan "Tagihan_Kurir.pdf.exe" pada File Explorer simulasi untuk mengamati teknik tipuan ekstensi ganda.',
      technicalExplanation:
        'Sistem operasi menampilkan berkas dokumen dan koneksi aktif ke Shared Storage (NAS). Berkas pembawa muatan berbahaya menyamar sebagai dokumen faktur tagihan.',
    },
    infected: {
      phase: 'infected',
      title: 'Fase Observasi: Seluruh Berkas Terenkripsi (.locked)',
      instruction:
        'Langkah SOP 1: Putuskan segera koneksi ke Network Storage (NAS) untuk mencegah enkripsi lateral ke server.',
      technicalExplanation:
        'Berkas ini menggunakan teknik ekstensi ganda (.pdf.exe) untuk menipu pengguna. Begitu dijalankan, algoritma enkripsi langsung mengunci seluruh dokumen kerja di penyimpanan lokal sehingga tidak dapat dibuka tanpa kunci dekripsi.',
    },
    mitigation_step_1: {
      phase: 'mitigation_step_1',
      title: 'Langkah 1 Selesai: Penyimpanan Bersama Terlindungi',
      instruction:
        'Langkah SOP 2: Lakukan "Format & Bersihkan Partisi Terinfeksi" untuk menghapus skrip enkripsi dan modul ransomware aktif.',
      technicalExplanation:
        'Jangan pernah membayar tebusan karena tidak ada jaminan kunci diberikan. Memutus koneksi ke penyimpanan jaringan (Server/NAS) memastikan berkas rekan kerja di server tetap aman.',
    },
    mitigation_step_2: {
      phase: 'mitigation_step_2',
      title: 'Langkah 2 Selesai: Sistem Operasi Bersih',
      instruction:
        'Langkah SOP 3: Hubungkan media penyimpanan cadangan (External Backup Drive) lalu jalankan "Restore Offline Backup".',
      technicalExplanation:
        'Enkripsi kriptografi modern tidak dapat didekripsi secara instan tanpa kunci privat. Memformat partisi sistem memastikan tidak ada artefak malware yang tertinggal.',
    },
    recovered: {
      phase: 'recovered',
      title: 'Sistem Pulih: Data Berhasil Dikembalikan dari Backup',
      instruction:
        'Simulasi selesai! Seluruh data dipulihkan dengan sukses tanpa membayar tebusan peretas.',
      technicalExplanation:
        'Seluruh berkas berhasil kembali utuh berkat adanya Offline Backup. Penyimpanan cadangan yang terisolasi secara fisik (air-gapped) adalah pertahanan mutlak menghadapi Ransomware.',
    },
  },
};
