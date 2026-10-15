# SIJA SecLab - Platform Simulasi Keamanan Siber Interaktif

Platform media pembelajaran interaktif berbasis web yang mengubah konsep abstrak keamanan sistem operasi dan jaringan menjadi simulasi visual yang aman, interaktif, dan terstruktur untuk siswa SMK SIJA (Sistem Informasi, Jaringan, dan Aplikasi).

---

## 🚀 Fitur Utama & Skenario Malware (Fase 1 - MVP)

1. **Network Worm (`/modules/security/lab/worm`)**
   - Visualisasi topologi jaringan interaktif menggunakan `@xyflow/react` (React Flow).
   - Propagasi paket otomatis via celah SMB Port 445.
   - Prosedur SOP: Isolasi kabel LAN ➔ Hardening Firewall Port 445 ➔ Terminasi proses `worm_service.exe`.

2. **Ransomware (`/modules/security/lab/ransomware`)**
   - Simulasi File Explorer & ekstensi ganda `.pdf.exe`.
   - Enkripsi dokumen real-time (`.locked`), catatan tebusan, dan simulasi NAS.
   - Prosedur SOP: Lepas koneksi Network Storage ➔ Format partisi sistem ➔ Pasang & Restore Offline Backup.

3. **Trojan Horse (`/modules/security/lab/trojan`)**
   - Utilitas kalkulator tiruan dengan komunikasi backdoor tersembunyi.
   - Audit tabel koneksi aktif (Netstat) & pelacakan Process ID (PID 3892).
   - Prosedur SOP: Analisis Netstat ➔ Blokir Firewall & Matikan proses ➔ Hapus file & entri Startup.

4. **File Infector Virus (`/modules/security/lab/virus`)**
   - Injeksi parasit ke host executable lain dan pembengkakan ukuran biner.
   - Prosedur SOP: Masuk Safe Mode & Kill process ➔ Karantina carrier file ➔ Verifikasi hash integritas SHA-256.

5. **Spyware & Keylogger (`/modules/security/lab/spyware`)**
   - Simulasi login portal dengan penangkapan ketukan keyboard (API Hooking) ke konsol C2 peretas.
   - Prosedur SOP: Hentikan `win_input_hook.dll` ➔ Hapus modul DLL ➔ Reset kata sandi & Aktifkan MFA (2FA).

---

## 🏗 Arsitektur & Teknologi

- **Framework:** [Next.js](https://nextjs.org/) (App Router) + React 19 + TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (In-Memory State Machine & SOP order validation)
- **Topologi Jaringan:** [@xyflow/react](https://reactflow.dev/) (React Flow)
- **Ikonografi:** [Lucide React](https://lucide.dev/)
- **Service Layer:** `progressService.ts` (Penyimpanan LocalStorage, Database-Ready untuk migrasi masa depan ke Supabase / PostgreSQL).

---

## 🛠 Memulai Proyek (Getting Started)

### 1. Kloning Repositori & Instalasi Dependensi
```bash
git clone https://github.com/julianputra-dev/WEB-BELAJAR-SIJA.git
cd WEB-BELAJAR-SIJA
npm install
```

### 2. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban di `http://localhost:3000` untuk mulai menjelajah simulasi.

### 3. Membangun Bundle Produksi
```bash
npm run build
npm run start
```

---

## 📜 Lisensi & Keamanan
Seluruh simulasi berjalan 100% di sisi klien (Client-Side DOM Manipulation & State Machine). **Tidak ada kode berbahaya, enkripsi sistem aktual, maupun keylogger nyata.** Platform ini ditujukan murni untuk media edukasi vokasi keamanan siber.
