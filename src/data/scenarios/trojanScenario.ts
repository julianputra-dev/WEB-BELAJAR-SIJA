// File: src/data/scenarios/trojanScenario.ts
import { ScenarioMetadata } from '@/types/simulation';

export const trojanScenario: ScenarioMetadata = {
  id: 'trojan',
  title: 'Trojan Horse (Aplikasi Berkedok & Backdoor)',
  badge: 'Network Backdoor & C2',
  description:
    'Simulasi aplikasi kalkulator utilitas yang tampak sah namun diam-diam membuka koneksi backdoor pada Port 4444 menuju Command & Control (C2) Server.',
  difficulty: 'Lanjutan',
  targetSop: [
    'Identifikasi Koneksi Asing & PID (Netstat Analysis)',
    'Blokir Firewall & Terminasi Proses Tersembunyi',
    'Hapus Berkas Induk & Bersihkan Registri Startup',
  ],
  narratives: {
    idle: {
      phase: 'idle',
      title: 'Fase Persiapan: Aplikasi Berjalan Normal',
      instruction:
        'Jalankan aplikasi kalkulator utilitas "SuperCalc_Pro.exe" di antarmuka sistem operasi.',
      technicalExplanation:
        'Aplikasi tampak berfungsi seperti biasa, namun modul tersembunyi bersiap memicu soket komunikasi keluar tanpa persetujuan pengguna.',
    },
    infected: {
      phase: 'infected',
      title: 'Fase Observasi: Backdoor C2 Terbuka di Latar Belakang',
      instruction:
        'Langkah SOP 1: Buka tab Netstat pada monitor jaringan, temukan koneksi Port 4444 dan catat Process ID (PID)-nya.',
      technicalExplanation:
        'Trojan tidak merusak sistem secara mencolok. Namun di balik layar, aplikasi ini membuka port komunikasi tidak standar (Port 4444) dan memberikan akses shell jarak jauh kepada peretas.',
    },
    mitigation_step_1: {
      phase: 'mitigation_step_1',
      title: 'Langkah 1 Selesai: PID 3892 Teridentifikasi',
      instruction:
        'Langkah SOP 2: Tambahkan aturan blokir IP C2 pada Firewall dan matikan PID 3892 di Task Manager.',
      technicalExplanation:
        'Melalui pemantauan tabel jaringan aktif (Netstat), Anda berhasil mengidentifikasi bahwa koneksi ilegal keluar dijalankan oleh proses tersembunyi dengan kode PID 3892.',
    },
    mitigation_step_2: {
      phase: 'mitigation_step_2',
      title: 'Langkah 2 Selesai: Koneksi C2 Diputus & Proses Dimatikan',
      instruction:
        'Langkah SOP 3: Hapus berkas biner "SuperCalc_Pro.exe" dan bersihkan entri Startup sistem.',
      technicalExplanation:
        'Memblokir koneksi keluar pada Firewall dan mematikan proses di memori RAM segera memutus kendali jarak jauh peretas atas komputer Anda.',
    },
    recovered: {
      phase: 'recovered',
      title: 'Sistem Pulih: Backdoor Trojan Berhasil Dimusnahkan',
      instruction: 'Simulasi selesai! Backdoor ditutup permanen dan sistem operasi terlindungi.',
      technicalExplanation:
        'Menghapus berkas aplikasi beserta entri registri Startup memastikan Trojan tidak akan aktif kembali saat komputer dinyalakan ulang.',
    },
  },
};
