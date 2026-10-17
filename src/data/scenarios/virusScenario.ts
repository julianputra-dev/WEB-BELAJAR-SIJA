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
    'Triage Anomali RAM & Terminasi Proses Tidak Sah',
    'Isolasi Lingkungan Sistem (Diagnostic SafeBoot Mode)',
    'Karantina Berkas Vektor Infeksi (Untrusted Binary)',
    'Disinfeksi Header PE, Pangkas Seksi Parasit & Validasi Hash',
  ],
  narratives: {
    idle: {
      phase: 'idle',
      title: 'Fase Persiapan: Telemetri Sistem Normal',
      instruction:
        'Amati direktori kerja dan telemetri perangkat keras. Lakukan uji eksekusi pada berkas biner mencurigakan untuk menganalisis pola reproduksi dan replikasi virus.',
      technicalExplanation:
        'Virus berkas (file infector) bersifat pasif hingga pengguna mengeksekusi biner pembawa atau biner inang yang terinfeksi.',
    },
    infected: {
      phase: 'infected',
      title: 'Misi 1: Triage Anomali Proses Memori (RAM)',
      instruction:
        'Analisis tabel Process Explorer. Identifikasi proses aktif yang membebani CPU secara tidak wajar (>80%) dan tidak memiliki tanda tangan digital resmi, lalu hentikan proses tersebut (SIGKILL).',
      technicalExplanation:
        'Saat dieksekusi, virus menyuntikkan thread parasit ke memori yang bertugas memindai direktori dan menyisipkan muatan berbahaya ke berkas host lainnya.',
    },
    mitigation_step_1: {
      phase: 'mitigation_step_1',
      title: 'Misi 2: Isolasi Lingkungan Eksekusi (SafeBoot)',
      instruction:
        'Sistem operasi standar masih rentan terhadap persistence hook. Aktifkan Diagnostic Boot Mode untuk menonaktifkan driver pihak ketiga dan mengisolasi registri SafeBoot.',
      technicalExplanation:
        'Menghentikan proses di memori hanya langkah sementara. Diagnostic mode mencegah virus mengaitkan (hooking) driver atau meluncurkan autostart saat berkas lain disentuh.',
    },
    mitigation_step_2: {
      phase: 'mitigation_step_2',
      title: 'Misi 3: Karantina Vektor Asal Infeksi',
      instruction:
        'Lacak biner yang bertindak sebagai pembawa muatan awal (berkas asing tanpa signature yang tidak cocok dengan baseline kerja), lalu pindahkan ke Brankas Karantina.',
      technicalExplanation:
        'Berkas pembawa awal (carrier) harus diisolasi dari ruang eksekusi agar tidak dapat dijalankan kembali secara manual atau melalui script otomatis.',
    },
    recovered: {
      phase: 'recovered',
      title: 'Misi 4: Disinfeksi Struktur PE & Rekonsiliasi Hash',
      instruction:
        'Gunakan Binary X-Ray untuk memeriksa berkas-berkas host yang membengkak. Pangkas seksi parasit (.parasite), pulihkan Entry Point asli, dan pastikan hash SHA-256 cocok 100% dengan Golden Image.',
      technicalExplanation:
        'Disinfeksi sejati tidak menghapus berkas program penting, melainkan membedah biner, memotong kode parasit di akhir file, dan mengembalikan penunjuk PE Optional Header ke entry point asli.',
    },
  },
};

