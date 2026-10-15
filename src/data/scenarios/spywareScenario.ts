// File: src/data/scenarios/spywareScenario.ts
import { ScenarioMetadata } from '@/types/simulation';

export const spywareScenario: ScenarioMetadata = {
  id: 'spyware',
  title: 'Spyware & Keylogger (Penyadapan Ketukan Keyboard)',
  badge: 'API Hooking & Credential Leak',
  description:
    'Simulasi penyadap senyap yang mencegat input kredensial pengguna (API Hooking) sebelum enkripsi peramban dan mengirimkannya secara langsung ke server penyerang.',
  difficulty: 'Lanjutan',
  targetSop: [
    'Audit & Hentikan Proses Hook Latar Belakang (win_input_hook.dll)',
    'Hapus Modul Spyware dari Direktori Sistem',
    'Reset Kredensial Akun & Aktifkan Multi-Factor Auth (MFA)',
  ],
  narratives: {
    idle: {
      phase: 'idle',
      title: 'Fase Persiapan: Portal Login Simulasi',
      instruction:
        'Ketikkan nama pengguna dan kata sandi pada formulir login simulasi untuk menguji sistem.',
      technicalExplanation:
        'Sistem tampak berjalan normal tanpa indikasi beban tinggi, namun pustaka hook mencurigakan aktif di tingkat sistem operasi.',
    },
    infected: {
      phase: 'infected',
      title: 'Fase Observasi: Kredensial Terekam Real-Time di Server Penyerang',
      instruction:
        'Langkah SOP 1: Buka audit proses sistem dan hentikan layanan hook "win_input_hook.dll".',
      technicalExplanation:
        'Malware bekerja secara senyap merekam ketukan papan ketik (API Hooking) sebelum data dienkripsi oleh peramban web, lalu mengirimkannya ke server pemantau peretas secara langsung.',
    },
    mitigation_step_1: {
      phase: 'mitigation_step_1',
      title: 'Langkah 1 Selesai: Hook Keyboard Dimatikan',
      instruction:
        'Langkah SOP 2: Hapus modul berkas "win_input_hook.dll" secara permanen dari sistem berkas.',
      technicalExplanation:
        'Menonaktifkan API hook menghentikan intersepsi data input pengguna di tingkat kernel/userland.',
    },
    mitigation_step_2: {
      phase: 'mitigation_step_2',
      title: 'Langkah 2 Selesai: Berkas Penyadap Dihapus',
      instruction:
        'Langkah SOP 3: Lakukan penggantian kata sandi dan aktifkan Multi-Factor Authentication (MFA/2FA).',
      technicalExplanation:
        'Berkas induk telah dihapus sehingga modul penyadap tidak dapat memuat ulang dirinya sendiri.',
    },
    recovered: {
      phase: 'recovered',
      title: 'Sistem Pulih: Akun Aman dengan Proteksi MFA',
      instruction: 'Simulasi selesai! Kredensial telah diperbarui dan dilindungi lapisan otentikasi ganda.',
      technicalExplanation:
        'Dengan MFA aktif, meskipun penyerang pernah memegang kata sandi lama, akun tidak lagi dapat diakses tanpa token dinamis waktu-nyata.',
    },
  },
};
