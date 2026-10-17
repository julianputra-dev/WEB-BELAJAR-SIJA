// File: src/data/wormTheoryData.ts

export interface WormVsVirusComparison {
  dimension: string;
  virus: string;
  worm: string;
}

export interface PropagationMechanismItem {
  id: string;
  stage: string;
  title: string;
  protocol: string;
  technicalDetails: string;
  systemImpact: string;
}

export interface WormCaseStudyItem {
  id: string;
  name: string;
  year: string;
  targetVector: string;
  impactScale: string;
  technicalLesson: string;
}

export interface NetworkIoCItem {
  indicator: string;
  monitoringTool: string;
  networkSymptom: string;
}

export const VIRUS_VS_WORM_COMPARISON: WormVsVirusComparison[] = [
  {
    dimension: 'Kemandirian Eksekusi',
    virus: 'Pasif: Wajib dipicu oleh interaksi pengguna (mengklik berkas inang .exe/.dll yang terinfeksi).',
    worm: 'Mandiri (Autonomous): Menyebar dan mengeksekusi diri sendiri secara otomatis melalui port jaringan yang terbuka.',
  },
  {
    dimension: 'Ketergantungan Berkas',
    virus: 'Parasitik: Memerlukan file inang sah untuk disisipi kode injeksi (mengubah struktur PE Header).',
    worm: 'Stand-alone: Berdiri sebagai paket jaringan independen atau proses sistem utuh tanpa perlu menempel pada file lain.',
  },
  {
    dimension: 'Vektor Propagasi Utama',
    virus: 'Media Penyimpanan Lokal: Flashdisk, file sharing lokal, unduhan email yang dieksekusi manual.',
    worm: 'Protokol Jaringan Komputer: Pemindaian port (Port Scanning), eksploitasi layanan remote (SMB Port 445, RPC, RDP).',
  },
  {
    dimension: 'Kecepatan Penyebaran',
    virus: 'Linear: Bergantung pada seberapa sering pengguna membuka dan membagikan berkas yang terinfeksi.',
    worm: 'Eksponensial: Melipatgandakan replikasi ke seluruh subnet LAN dalam hitungan detik tanpa campur tangan manusia.',
  },
  {
    dimension: 'Dampak Telemetri Khas',
    virus: 'Lonjakan CPU lokal (>80%), pembengkakan ukuran berkas biner, kerusakan integritas hash SHA-256.',
    worm: 'Saturasi Bandwidth Jaringan (100%), banjir paket TCP SYN, kelumpuhan switch/router akibat badai broadcast.',
  },
];

export const PROPAGATION_MECHANISMS: PropagationMechanismItem[] = [
  {
    id: 'recon',
    stage: 'Tahap 1',
    title: 'Pemindaian Subnet & Target Discovery',
    protocol: 'TCP SYN Sweep / ICMP Echo (Port 445 SMB)',
    technicalDetails:
      'Worm membaca routing table pada komputer korban, menghitung rentang subnet lokal (misal 192.168.1.0/24), dan memancarkan paket probe SYN ke seluruh IP tetangga untuk mencari port SMB 445 yang terbuka.',
    systemImpact: 'Utilisasi bandwidth jaringan melonjak drastis akibat ribuan koneksi probe yang dikirim per detik.',
  },
  {
    id: 'exploit',
    stage: 'Tahap 2',
    title: 'Pengiriman Paket Eksploitasi Kerentanan',
    protocol: 'SMBv1 / Buffer Overflow (CVE-2017-0144 / EternalBlue)',
    technicalDetails:
      'Saat menemukan host dengan Port 445 terbuka, worm mengirimkan paket SMB yang dirancang khusus untuk memicu buffer overflow pada driver kernel srv.sys tanpa memerlukan kredensial login (Unauthenticated RCE).',
    systemImpact: 'Layanan server jaringan menjadi tidak stabil dan memori kernel mengalami memory corruption.',
  },
  {
    id: 'payload',
    stage: 'Tahap 3',
    title: 'Injeksi Shellcode & Pembuatan Layanan',
    protocol: 'In-Memory Injection & Process Spawning',
    technicalDetails:
      'Setelah kendali eksekusi direbut, shellcode mengeksekusi payload di memori RAM, membuat proses layanan sistem palsu (misal worm_service.exe), dan membuka soket komunikasi lokal.',
    systemImpact: 'Proses parasit aktif di Task Manager dan port transmisi data terbuka di latar belakang.',
  },
  {
    id: 'replication',
    stage: 'Tahap 4',
    title: 'Replikasi Mandiri & Lateral Movement',
    protocol: 'Multi-Threaded Spreading Engine',
    technicalDetails:
      'Komputer korban kini bertransformasi menjadi penyerang baru. Thread worm baru diluncurkan untuk memindai switch dan subnet berikutnya, mempercepat laju infeksi secara eksponensial.',
    systemImpact: 'Seluruh node dalam LAN terancam terinfeksi secara berantai jika tidak segera diisolasi secara fisik.',
  },
];

export const WORM_CASE_STUDIES: WormCaseStudyItem[] = [
  {
    id: 'morris',
    name: 'The Morris Worm',
    year: '1988',
    targetVector: 'Eksploitasi Buffer Overflow fingerd & Sendmail DEBUG',
    impactScale: 'Melumpuhkan ~6.000 komputer UNIX (10% dari seluruh ARPANET pada masa itu).',
    technicalLesson:
      'Membuktikan untuk pertama kalinya bahwa kesalahan logika pemindaian jaringan dapat melumpuhkan tulang punggung internet global.',
  },
  {
    id: 'iloveyou',
    name: 'ILOVEYOU Worm (Love Bug)',
    year: '2000',
    targetVector: 'Propagasi VBScript Otomatis via Microsoft Outlook MAPI',
    impactScale: 'Menginfeksi lebih dari 10 juta komputer di seluruh dunia, kerugian ~$15 Miliar.',
    technicalLesson:
      'Menyadarkan industri pentingnya membatasi hak akses script pihak ketiga dan pemindaian lampiran email secara terpusat.',
  },
  {
    id: 'slammer',
    name: 'SQL Slammer (Sapphire Worm)',
    year: '2003',
    targetVector: 'Buffer Overflow UDP Port 1434 (Microsoft SQL Server)',
    impactScale: 'Menginfeksi 75.000 server hanya dalam 10 menit; menggandakan ukuran setiap 8,5 detik.',
    technicalLesson:
      'Membuktikan konsep "Worm Nir-Berkas" (Memory-Only Worm) yang tidak pernah menyentuh hard drive, hanya beroperasi di paket memori.',
  },
  {
    id: 'wannacry',
    name: 'WannaCry Network Worm & Ransomware',
    year: '2017',
    targetVector: 'Eksploitasi SMBv1 Port 445 (EternalBlue / MS17-010)',
    impactScale: 'Melumpuhkan 200.000 komputer di 150 negara, termasuk sistem rumah sakit NHS Inggris.',
    technicalLesson:
      'Menegaskan prinsip isolasi port SMB dari jaringan luar dan keharusan menghentikan protokol lawas (SMBv1) di seluruh infrastruktur enterprise.',
  },
];

export const NETWORK_IOCS: NetworkIoCItem[] = [
  {
    indicator: 'Saturasi Utilisasi Bandwidth Jaringan (100%)',
    monitoringTool: 'PRTG / Wireshark / SNMP Network Monitor',
    networkSymptom: 'Lalu lintas data melonjak tajam tanpa adanya aktivitas transfer file atau streaming resmi.',
  },
  {
    indicator: 'Lonjakan Paket TCP SYN pada Port 445 (SMB)',
    monitoringTool: 'Network Intrusion Detection System (Snort / Suricata)',
    networkSymptom: 'Satu node komputer mengirim ribuan paket koneksi ke seluruh IP berurutan dalam subnet /24.',
  },
  {
    indicator: 'Proses Sistem Tidak Dikenal di RAM (worm_service.exe)',
    monitoringTool: 'Task Manager / Process Hacker',
    networkSymptom: 'Proses sistem misterius yang terus membuka socket jaringan lokal dan membebani memori.',
  },
  {
    indicator: 'Upaya Lateral Movement Tanpa Otentikasi',
    monitoringTool: 'Windows Event Viewer (Event ID 4625 / 4624)',
    networkSymptom: 'Catatan log kegagalan otentikasi SMB berulang kali dari alamat IP internal komputer laboratorium.',
  },
];
