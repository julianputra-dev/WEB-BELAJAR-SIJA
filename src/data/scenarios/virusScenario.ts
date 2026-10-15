// File: src/data/scenarios/virusScenario.ts
import { ScenarioMetadata } from '@/types/simulation';

export const virusScenario: ScenarioMetadata = {
  id: 'virus',
  title: 'File Infector Virus (Injeksi Kode ke Host Berkas)',
  badge: 'Struktur PE & Triage RAM',
  description:
    'Investigasi forensik kode parasit pada format berkas Portable Executable (PE), triage proses RAM, isolasi registri SafeBoot, dan disinfeksi biner berbasis hash SHA-256.',
  difficulty: 'Pemula',
  targetSop: [
    'Triage RAM & Hentikan PID Parasit (Process Explorer)',
    'Boot Diagnostic Mode (Isolasi Registri SafeBoot)',
    'Karantina Biner Pembawa (setup_game.exe)',
    'Disinfeksi Header PE & Validasi Hash SHA-256',
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
        'Langkah SOP 1: Buka Process Explorer dan hentikan proses parasit aktif di memori RAM (PID 3844).',
      technicalExplanation:
        'Muatan virus menyisipkan biner ke berkas host PE sehingga ukuran berkas membengkak dan utilisasi CPU melonjak drastis.',
    },
    mitigation_step_1: {
      phase: 'mitigation_step_1',
      title: 'Langkah 1 Selesai: Proses Parasit Dihentikan',
      instruction:
        'Langkah SOP 2: Beralih ke Diagnostic Boot Mode untuk mengisolasi driver dan registri SafeBoot.',
      technicalExplanation:
        'Mematikan proses di memori menghentikan siklus replikasi aktif sehingga virus tidak dapat menyisipkan muatan baru.',
    },
    mitigation_step_2: {
      phase: 'mitigation_step_2',
      title: 'Langkah 2 Selesai: Diagnostic Mode Aktif & Registri Terproteksi',
      instruction:
        'Langkah SOP 3: Pindahkan biner pembawa ke Brankas Karantina lalu jalankan disinfeksi header PE.',
      technicalExplanation:
        'Karantina mencegah berkas berbahaya dieksekusi ulang tanpa sengaja oleh pengguna di kemudian hari.',
    },
    recovered: {
      phase: 'recovered',
      title: 'Sistem Pulih: Integritas Berkas Kembali Normal',
      instruction: 'Simulasi selesai! Berkas telah didisinfeksi dan verifikasi hash SHA-256 cocok 100%.',
      technicalExplanation:
        'Pemeriksaan hash SHA-256 memverifikasi seluruh berkas kembali ke ukuran asli dan aman digunakan.',
    },
  },
};
