// File: src/data/scenarios/virusScenario.ts
import { ScenarioMetadata } from '@/types/simulation';

export const virusScenario: ScenarioMetadata = {
  id: 'virus',
  title: 'File Infector Virus (Injeksi Kode ke Host Berkas)',
  badge: 'File System & Process',
  description:
    'Simulasi virus klasik yang memerlukan berkas inang (host) dan eksekusi pengguna untuk mereplikasi diri ke berkas executable lainnya.',
  difficulty: 'Pemula',
  targetSop: [
    'Terminasi Proses Induk di RAM (Safe Mode)',
    'Karantina Berkas Pembawa (Quarantine Carrier)',
    'Pemindaian Hash & Disinfeksi Berkas (SHA-256 Check)',
  ],
  narratives: {
    idle: {
      phase: 'idle',
      title: 'Fase Persiapan: Lingkungan Berkas Bersih',
      instruction: 'Jalankan berkas "setup_game.exe" untuk memicu replikasi virus ke berkas lain.',
      technicalExplanation:
        'Virus berkas membutuhkan eksekusi aktif dari pengguna untuk mengawali injeksi muatan ke berkas biner di direktori kerja.',
    },
    infected: {
      phase: 'infected',
      title: 'Fase Observasi: Injeksi Payload Menjalar',
      instruction:
        'Langkah SOP 1: Masuk ke Mode Aman dan hentikan proses induk virus di Task Manager.',
      technicalExplanation:
        'Muatan virus menyisipkan biner ke berkas dokumen lain sehingga ukuran berkas membengkak dan utilisasi CPU melonjak drastis.',
    },
    mitigation_step_1: {
      phase: 'mitigation_step_1',
      title: 'Langkah 1 Selesai: Proses Aktif Dihentikan',
      instruction:
        'Langkah SOP 2: Pindahkan berkas pembawa "setup_game.exe" ke wadah karantina terisolasi.',
      technicalExplanation:
        'Mematikan proses di memori menghentikan siklus replikasi aktif sehingga virus tidak dapat menyisipkan muatan baru.',
    },
    mitigation_step_2: {
      phase: 'mitigation_step_2',
      title: 'Langkah 2 Selesai: Berkas Pembawa Dikarantina',
      instruction:
        'Langkah SOP 3: Jalankan "Pemindaian Hash & Disinfeksi Berkas" untuk membersihkan header kode sisipan.',
      technicalExplanation:
        'Karantina mencegah berkas berbahaya dieksekusi ulang tanpa sengaja oleh pengguna di kemudian hari.',
    },
    recovered: {
      phase: 'recovered',
      title: 'Sistem Pulih: Integritas Berkas Kembali Normal',
      instruction: 'Simulasi selesai! Berkas telah dibersihkan dan verifikasi hash valid.',
      technicalExplanation:
        'Pemeriksaan hash SHA-256 memverifikasi seluruh berkas kembali ke ukuran asli dan aman digunakan.',
    },
  },
};
