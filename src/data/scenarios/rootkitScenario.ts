// File: src/data/scenarios/rootkitScenario.ts
import { ScenarioMetadata } from '@/types/simulation';

export const rootkitScenario: ScenarioMetadata = {
  id: 'rootkit',
  title: 'Rootkit (Manipulasi Kernel & Siluman)',
  badge: 'KERNEL/OS SUBVERSION',
  description:
    'Manipulasi System Call di level Ring 0 untuk menyembunyikan proses jahat, berkas, dan soket jaringan dari pengawasan sistem operasi.',
  difficulty: 'Lanjutan',
  targetSop: [
    'Deteksi Forensik Memori',
    'Pemindaian Offline/Live OS',
    'Rekonstruksi Sistem/Wipe',
  ],
  narratives: {
    idle: {
      phase: 'idle',
      title: 'Fase Persiapan: Sistem Beroperasi Normal',
      instruction:
        'Sistem operasi berjalan normal. Kernel berada dalam kondisi bersih dan belum ada kode asing yang menyusup ke Ring 0.',
      technicalExplanation:
        'Setiap pemanggilan data dari aplikasi dan Task Manager dilayani oleh kernel secara jujur tanpa ada data yang disembunyikan.',
    },
    infected: {
      phase: 'infected',
      title: 'Fase Infeksi: Rootkit Menyusup & Menghilangkan Diri',
      instruction:
        'Langkah SOP 1: Lakukan ekstraksi memori RAM (Memory Dump) untuk mencari program siluman yang disembunyikan dari Task Manager.',
      technicalExplanation:
        'Driver Rootkit aktif di Ring 0. Rootkit memutus programnya dari daftar absensi proses (DKOM) sehingga Task Manager dan antivirus biasa tertipu.',
    },
    mitigation_step_1: {
      phase: 'mitigation_step_1',
      title: 'Langkah 1 Selesai: Program Siluman Terungkap di Memori RAM',
      instruction:
        'Langkah SOP 2: Matikan komputer dan boot dari Flashdisk penyelamat (Live USB bersih) agar driver Rootkit tidak bisa aktif saat pemindaian.',
      technicalExplanation:
        'Dengan membandingkan fakta fisik di RAM melawan daftar laporan Windows, kamu berhasil menemukan program tersembunyi yang menyamar.',
    },
    mitigation_step_2: {
      phase: 'mitigation_step_2',
      title: 'Langkah 2 Selesai: Berkas Jahat Terdeteksi pada Pemindaian Offline',
      instruction:
        'Langkah SOP 3: Bersihkan partisi penyimpanan secara total dan instal ulang sistem operasi dari sumber resmi tepercaya.',
      technicalExplanation:
        'Karena sistem operasi inang dimatikan dan diperiksa dari USB independen, Rootkit kehilangan kekuatan silumannya dan berkasnya berhasil diisolasi.',
    },
    recovered: {
      phase: 'recovered',
      title: 'Sistem Pulih: Pondasi Kernel Bersih & Aman Kembali',
      instruction:
        'Rekonstruksi sistem selesai! Komputer kembali aman dengan sistem operasi baru dan fitur Secure Boot aktif.',
      technicalExplanation:
        'Membangun ulang sistem dari nol (Clean Rebuild) menjamin 100% tidak ada lagi manipulasi kernel yang tertinggal.',
    },
  },
};
