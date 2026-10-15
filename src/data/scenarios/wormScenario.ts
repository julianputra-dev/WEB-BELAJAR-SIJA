// File: src/data/scenarios/wormScenario.ts
import { ScenarioMetadata } from '@/types/simulation';

export const wormScenario: ScenarioMetadata = {
  id: 'worm',
  title: 'Network Worm (Propagasi Otomatis LAN)',
  badge: 'Network Propagation',
  description:
    'Simulasi penyebaran malware mandiri yang melintasi jaringan lokal memanfaatkan celah Port 445 (SMB) tanpa memerlukan interaksi pengguna.',
  difficulty: 'Menengah',
  targetSop: [
    'Isolasi Jaringan (Disconnect LAN)',
    'Penutupan Port Rentan (Patch / Close Port 445)',
    'Terminasi Proses & Pemulihan Koneksi',
  ],
  narratives: {
    idle: {
      phase: 'idle',
      title: 'Fase Persiapan: Jaringan Komputer Normal',
      instruction: 'Klik tombol "Injeksi Paket Worm" untuk memulai simulasi serangan propagasi.',
      technicalExplanation:
        'Seluruh komputer di laboratorium SIJA terhubung ke Switch LAN dengan Port 445 (SMB) terbuka. Trafik jaringan dan utilisasi CPU berada dalam kondisi normal.',
    },
    infected: {
      phase: 'infected',
      title: 'Fase Observasi: Wabah Worm Menjalar Cepat',
      instruction:
        'Langkah SOP 1: Putuskan segera kabel LAN pada PC-SIJA-01 yang terinfeksi untuk memutus rantai transmisi eksploitasi.',
      technicalExplanation:
        'Perhatikan bagaimana Worm berpindah dari PC-01 ke PC lain secara otomatis tanpa interaksi pengguna. Worm memindai subnet jaringan lokal dan mengeksekusi celah keamanan pada Port 445 (SMB) yang terbuka, sekaligus membanjiri trafik jaringan hingga 100%.',
    },
    mitigation_step_1: {
      phase: 'mitigation_step_1',
      title: 'Langkah 1 Selesai: Isolasi Fisik Berhasil',
      instruction:
        'Langkah SOP 2: Buka pengaturan Firewall pada PC dan ubah status Port 445 menjadi TERTUTUP (Closed / Patched).',
      technicalExplanation:
        'Langkah pertama menghadapi wabah jaringan adalah isolasi perangkat. Memutus koneksi jaringan menghentikan pengiriman paket eksploitasi ke komputer lain di laboratorium.',
    },
    mitigation_step_2: {
      phase: 'mitigation_step_2',
      title: 'Langkah 2 Selesai: Celah Port Berhasil Ditutup',
      instruction:
        'Langkah SOP 3: Buka Task Manager simulasi, matikan proses berbahaya "worm_service.exe", lalu sambungkan kembali kabel LAN.',
      technicalExplanation:
        'Sebelum membersihkan malware dan menyambungkan kembali jaringan, pintu masuknya wajib ditutup. Menutup Port 445 memastikan Worm tidak dapat menyusup kembali dari komputer lain.',
    },
    recovered: {
      phase: 'recovered',
      title: 'Sistem Pulih: Insiden Selesai Ditangani',
      instruction:
        'Simulasi berhasil! Anda telah menerapkan prosedur isolasi dan mitigasi serangan Worm secara tepat.',
      technicalExplanation:
        'Proses berbahaya di RAM telah dihentikan, celah port telah ditutup, dan seluruh komputer kembali terhubung ke jaringan lokal secara aman tanpa risiko re-infeksi.',
    },
  },
};
