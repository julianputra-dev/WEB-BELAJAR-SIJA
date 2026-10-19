// File: src/data/ransomwareTheoryData.ts

export interface InfiltrationVectorItem {
  id: string;
  technique: string;
  mechanism: string;
  osBehavior: string;
  preventionMeasure: string;
}

export interface CryptoComparisonItem {
  property: string;
  plaintextFile: string;
  ciphertextLocked: string;
  technicalSignificance: string;
}

export interface StorageVectorItem {
  id: string;
  storageType: string;
  accessProtocol: string;
  infectionMechanism: string;
  containmentProtocol: string;
}

export interface RansomwareCaseStudyItem {
  id: string;
  name: string;
  year: string;
  vector: string;
  encryptionEngine: string;
  impactScale: string;
  technicalLesson: string;
}

export interface RansomwareTypeItem {
  id: string;
  name: string;
  category: string;
  primaryTarget: string;
  workingMechanism: string;
  fileIntegrityStatus: string;
  remediationPath: string;
  historicalExample: string;
}

export interface RansomwareTypeComparison {
  dimension: string;
  lockerRansomware: string;
  cryptoRansomware: string;
  technicalSignificance: string;
}

export interface RansomwareIoCItem {
  indicator: string;
  detectionTool: string;
  forensicArtifact: string;
}

export const RANSOMWARE_TYPES: RansomwareTypeItem[] = [
  {
    id: 'locker',
    name: 'Locker Ransomware',
    category: 'Screen / OS Lockout',
    primaryTarget: 'Antarmuka Pengguna & Akses Sistem Operasi (Shell / Winlogon / MBR)',
    workingMechanism:
      'Membajak antarmuka grafis pengguna (GUI) dengan menampilkan jendela tebusan layar penuh yang tidak dapat ditutup, menonaktifkan Task Manager (DisableTaskMgr), serta mengganti sub-sistem shell Windows (Winlogon\\Shell) tanpa menyentuh struktur data berkas.',
    fileIntegrityStatus: 'Utuh / Tidak Dimodifikasi (Berkas tetap tersimpan dalam format plaintext asli di hard drive).',
    remediationPath:
      'Dapat dipulihkan tanpa membayar tebusan melalui booting media penyelamat (WinPE / Live Linux), perbaikan entri registri Safe Mode, atau restorasi Master Boot Record (MBR).',
    historicalExample: 'Winlocker, Reveton (Police Trojan), Gimemo.',
  },
  {
    id: 'crypto',
    name: 'Crypto-Ransomware',
    category: 'File Data Encryption',
    primaryTarget: 'Konten & Struktur Biner Berkas Pengguna (.docx, .pdf, .xlsx, .db, .sql)',
    workingMechanism:
      'Membiarkan sistem operasi dan antarmuka desktop tetap berjalan normal, namun mengeksekusi thread latar belakang untuk mengenkripsi berkas pengguna menggunakan kriptografi hibrida (AES-256 + RSA-4096) dan mengganti ekstensi menjadi .locked.',
    fileIntegrityStatus: 'Rusak / Terenkripsi Total (Magic bytes asli dimusnahkan dan data diubah menjadi ciphertext berentropi tinggi).',
    remediationPath:
      'Secara matematis mustahil didekripsi tanpa Private Key penyerang. Penanganan wajib melalui isolasi storage, format partisi OS, dan pemulihan mutlak dari Offline Backup.',
    historicalExample: 'CryptoLocker, WannaCry, LockBit 3.0, Conti.',
  },
];

export const LOCKER_VS_CRYPTO_COMPARISON: RansomwareTypeComparison[] = [
  {
    dimension: 'Sasaran Utama Serangan',
    lockerRansomware: 'Antarmuka pengguna, desktop shell, atau sektor boot (MBR/UEFI).',
    cryptoRansomware: 'Struktur data internal berkas dokumen, database, dan arsip pengguna.',
    technicalSignificance:
      'Locker menyandera akses sistem, sedangkan Crypto menyandera isi muatan data berkas.',
  },
  {
    dimension: 'Integritas Berkas di Disk',
    lockerRansomware: '100% Utuh (Plaintext): Seluruh berkas tidak mengalami modifikasi biner.',
    cryptoRansomware: 'Terenkripsi Kriptografis: Seluruh berkas diubah menjadi teks sandi (.locked).',
    technicalSignificance:
      'Locker tidak merusak data; Crypto menghancurkan keterbacaan data secara matematis.',
  },
  {
    dimension: 'Mekanisme Operasi',
    lockerRansomware: 'Injeksi GUI, overlay kiosk mode, penonaktifan keyboard/mouse input & taskmgr.',
    cryptoRansomware: 'Algoritma simetris cepat (AES/ChaCha) dibungkus kunci publik asimetris (RSA/ECC).',
    technicalSignificance:
      'Locker mengeksploitasi fungsi kontrol OS; Crypto mengeksploitasi pustaka kriptografi.',
  },
  {
    dimension: 'Entropi Data Berkas (Shannon)',
    lockerRansomware: 'Normal (3.0 – 5.5 / 8.0): Mengikuti pola bahasa dan kompresi berkas asli.',
    cryptoRansomware: 'Maksimal (~7.98 / 8.0): Karakteristik pseudo-random acak sempurna.',
    technicalSignificance:
      'Pemantau telemetri dapat mendeteksi Crypto secara dini lewat lonjakan entropi disk I/O.',
  },
  {
    dimension: 'Ketergantungan terhadap Backup',
    lockerRansomware: 'Rendah: Data dapat diselamatkan tanpa backup jika OS berhasil dibersihkan.',
    cryptoRansomware: 'Mutlak (100%): Tanpa offline backup, data hilang permanen tanpa kunci privat.',
    technicalSignificance:
      'Ketiadaan offline backup menjadi malapetaka total pada insiden Crypto-Ransomware.',
  },
  {
    dimension: 'Pendekatan Remediasi Blue Team',
    lockerRansomware: 'Booting Live OS / WinPE, modifikasi registri shell, disinfeksi startup biner.',
    cryptoRansomware: 'Isolasi jaringan/NAS, format partisi terinfeksi, restorasi air-gapped backup.',
    technicalSignificance:
      'Prosedur penanganan kedua jenis ransomware memiliki alur mitigasi yang sangat berbeda.',
  },
];

export const INFILTRATION_VECTORS: InfiltrationVectorItem[] = [
  {
    id: 'double-extension',
    technique: 'Penyamaran Ekstensi Ganda (.pdf.exe)',
    mechanism:
      'Penyerang menamai berkas biner berbahaya dengan dua ekstensi berurutan, seperti Tagihan_Kurir.pdf.exe. Pengguna ditipu agar mengira berkas tersebut adalah dokumen portabel PDF yang aman dibuka.',
    osBehavior:
      'Windows secara default mengaktifkan fitur "Hide extensions for known file types". Akibatnya, sistem menyembunyikan ekstensi biner .exe dan hanya menampilkan Tagihan_Kurir.pdf kepada pengguna.',
    preventionMeasure:
      'Nonaktifkan fitur penyembunyian ekstensi pada pengaturan Explorer atau enforced melalui Group Policy Object (GPO) registri HideFileExt bernilai 0.',
  },
  {
    id: 'icon-spoofing',
    technique: 'Manipulasi Resource Icon (Icon Spoofing)',
    mechanism:
      'Biner Portable Executable (PE) disematkan aset ikon resmi aplikasi PDF Viewer ke dalam seksi .rsrc biner saat kompilasi payload.',
    osBehavior:
      'Sub-sistem Shell Windows merender ikon dari seksi resource biner, sehingga berkas executable berekstensi .exe tampak persis seperti dokumen Adobe Reader.',
    preventionMeasure:
      'Pemeriksaan kolom tipe berkas ("Type: Application" vs "Type: PDF Document") dan verifikasi tanda tangan digital kode biner (Authenticode).',
  },
  {
    id: 'phishing-lure',
    technique: 'Rekayasa Sosial Umpan Finansial/Operasional',
    mechanism:
      'Distribusi berkas melalui surat elektronik bertema urgensi tinggi (seperti invoice tagihan kurir, slip gaji, atau surat peringatan hukum) untuk memicu tindakan tergesa-gesa.',
    osBehavior:
      'Bila pengguna mengklik dua kali berkas, sistem operasi langsung memanggil API CreateProcessW untuk mengeksekusi payload tanpa peringatan makro dokumen.',
    preventionMeasure:
      'Pelatihan kesadaran keamanan (Security Awareness Training) dan penerapan attachment sandboxing pada Mail Transfer Agent (MTA).',
  },
];

export const CRYPTO_COMPARISON: CryptoComparisonItem[] = [
  {
    property: 'Magic Bytes (File Signature)',
    plaintextFile: 'Valid (%PDF-1.7, \\x89PNG, \\xFF\\xD8\\xFF, PK\\x03\\x04)',
    ciphertextLocked: 'Acak / Rusak (Ditandai Magic Byte Kustom Ransomware)',
    technicalSignificance:
      'Sistem operasi tidak lagi mengenali format berkas karena struktur header biner telah dienkripsi total.',
  },
  {
    property: 'Entropi Data (Shannon Entropy)',
    plaintextFile: 'Rendah - Sedang (3.2 - 5.8 / 8.0)',
    ciphertextLocked: 'Sangat Tinggi / Mendekati Maksimal (7.92 - 7.99 / 8.0)',
    technicalSignificance:
      'Karakteristik teks sandi kriptografis menghasilkan distribusi byte pseudo-acak yang tidak memiliki pola berulang.',
  },
  {
    property: 'Ekstensi Berkas',
    plaintextFile: '.pdf, .docx, .xlsx, .sql, .jpg',
    ciphertextLocked: '.locked, .enc, .crypto, atau format acak unik',
    technicalSignificance:
      'Mengubah pemetaan asosiasi aplikasi default pada sistem operasi sehingga berkas tidak dapat dibuka aplikasi asal.',
  },
  {
    property: 'Ketersediaan Kunci Dekripsi',
    plaintextFile: 'Tidak Memerlukan Kunci (Akses Terbuka)',
    ciphertextLocked: 'Terkunci Kunci Privat Asimetris (Disimpan di Server C2)',
    technicalSignificance:
      'Tanpa kunci privat RSA/ECC milik penyerang, berkas tidak dapat dipulihkan secara matematis dalam batas waktu manusiawi.',
  },
];

export const STORAGE_PROPAGATION_VECTORS: StorageVectorItem[] = [
  {
    id: 'mapped-nas',
    storageType: 'Shared Folder & NAS (SMB/CIFS)',
    accessProtocol: 'Server Message Block (Port 445 / Port 139)',
    infectionMechanism:
      'Ransomware memanggil API Windows WNetOpenEnumW untuk memindai seluruh drive jaringan yang terhubung dan mengenkripsi berkas bersama yang memiliki izin tulis (Write Access).',
    containmentProtocol:
      'Isolasi segera antarmuka jaringan (cabut kabel LAN / putus Wi-Fi) dan nonaktifkan akses share SMB pada server NAS.',
  },
  {
    id: 'external-drive',
    storageType: 'External Hard Drive / Flash Drive',
    accessProtocol: 'Universal Serial Bus (USB) Mass Storage',
    infectionMechanism:
      'Malware mendengarkan event WM_DEVICECHANGE dari sistem operasi; ketika drive USB dicolokkan saat malware masih berjalan di RAM, seluruh isi drive cadangan langsung ikut dienkripsi.',
    containmentProtocol:
      'Terapkan kebijakan Air-Gapped Backup: media cadangan fisik dilarang keras dihubungkan sebelum sistem operasi terinfeksi diformat bersih.',
  },
  {
    id: 'cloud-sync',
    storageType: 'Virtual Cloud Drive Sync (OneDrive/Google Drive)',
    accessProtocol: 'Background File System Watcher Daemon',
    infectionMechanism:
      'Saat berkas lokal diubah menjadi .locked, agen sinkronisasi cloud menganggapnya sebagai pembaruan sah dan mengunggah berkas terenkripsi ke penyimpanan cloud.',
    containmentProtocol:
      'Hentikan proses sinkronisasi cloud dan manfaatkan fitur Version History / Point-in-Time Recovery pada konsol admin cloud.',
  },
];

export const RANSOMWARE_CASE_STUDIES: RansomwareCaseStudyItem[] = [
  {
    id: 'wannacry',
    name: 'WannaCry (WanaCrypt0r 2.0)',
    year: '2017',
    vector: 'Eksploitasi Jaringan SMBv1 (EternalBlue CVE-2017-0144) + Enkripsi Hibrida',
    encryptionEngine: 'AES-128-CBC (Per-File) + RSA-2048 (Key Wrapping)',
    impactScale:
      'Melumpuhkan lebih dari 200.000 komputer di 150 negara dalam hitungan jam, termasuk menghentikan layanan darurat rumah sakit National Health Service (NHS) di Inggris.',
    technicalLesson:
      'Menegaskan pentingnya menonaktifkan protokol lawas yang rentan (SMBv1) dan menjaga pembaruan patch keamanan sistem operasi secara berkala.',
  },
  {
    id: 'darkside-colonial',
    name: 'DarkSide (Insiden Colonial Pipeline)',
    year: '2021',
    vector: 'Compromised VPN Credentials + Lateral Movement Active Directory',
    encryptionEngine: 'Salsa20 / ChaCha20 + RSA-1024 / RSA-4096',
    impactScale:
      'Menghentikan pipa distribusi bahan bakar minyak terbesar di pesisir timur Amerika Serikat selama 6 hari dan memicu kepanikan pasokan energi nasional.',
    technicalLesson:
      'Membuktikan bahwa otentikasi multi-faktor (MFA) wajib diterapkan pada seluruh akses remote access dan pemisahan jaringan operasional (OT) dari TI.',
  },
  {
    id: 'lockbit',
    name: 'LockBit 3.0 (LockBit Black)',
    year: '2022 - Sekarang',
    vector: 'Double Extortion (Penyanderaan Enkripsi + Ancaman Kebocoran Data)',
    encryptionEngine: 'AES-GCM / ChaCha20 + BPS Kustom Multi-Threading',
    impactScale:
      'Salah satu sindikat Ransomware-as-a-Service (RaaS) paling agresif yang menyerang sektor perbankan, manufaktur, dan lembaga layanan publik di berbagai negara.',
    technicalLesson:
      'Pertahanan tidak cukup hanya mengandalkan backup lokal; organisasi harus menerapkan enkripsi data at-rest serta strategi deteksi dini anomali lalu lintas eksfiltrasi data.',
  },
];

export const RANSOMWARE_IOCS: RansomwareIoCItem[] = [
  {
    indicator: 'Perubahan Massal Ekstensi Berkas (.locked)',
    detectionTool: 'File System Integrity Monitor (Sysmon Event ID 11 / Tripwire)',
    forensicArtifact:
      'Ribuan berkas dokumen beralih nama dan bertambah ekstensi .locked dalam rentang waktu singkat.',
  },
  {
    indicator: 'Pemusnahan Volume Shadow Copies',
    detectionTool: 'Windows Security Event Log (Event ID 4688: vssadmin.exe)',
    forensicArtifact:
      'Eksekusi perintah biner "vssadmin.exe delete shadows /all /quiet" dan "wbadmin delete catalog".',
  },
  {
    indicator: 'Kemunculan Berkas Instruksi Tebusan',
    detectionTool: 'Endpoint Detection & Response (EDR / File Watcher)',
    forensicArtifact:
      'File teks instruksi tebusan (misal README_DECRYPT.txt) dibuat pada setiap subfolder sistem penyimpanan.',
  },
  {
    indicator: 'Lonjakan Beban CPU Akibat Proses Enkripsi',
    detectionTool: 'Performance Monitor / Process Explorer',
    forensicArtifact:
      'Proses mencurigakan mengeksekusi operasi baca-tulis disk (Disk I/O) berkecepatan tinggi dengan utilisasi CPU konstan.',
  },
];
