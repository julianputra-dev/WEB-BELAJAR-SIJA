// File: src/data/rootkitTheoryData.ts

export interface PrivilegeRingComparison {
  ring: string;
  name: string;
  privilegeLevel: string;
  hardwareAccess: string;
  representativeComponents: string;
  deceptionVulnerability: string;
}

export interface InfiltrationVector {
  id: string;
  title: string;
  vectorType: string;
  mechanism: string;
  technicalArtifact: string;
  defensiveControl: string;
}

export interface RootkitConcealmentMechanism {
  id: string;
  name: string;
  subsystem: string;
  operationalConcept: string;
  manipulatedStructure: string;
  forensicTrace: string;
}

export interface RootkitAntivirusBlindspot {
  dimension: string;
  userModeAntivirus: string;
  kernelRootkitReality: string;
  structuralReason: string;
}

export interface RootkitCaseStudy {
  id: string;
  name: string;
  year: string;
  category: string;
  attackVector: string;
  impactScale: string;
  technicalLesson: string;
}

export interface RootkitSopStep {
  step: string;
  title: string;
  desc: string;
  technicalCommand: string;
  objective: string;
}

export const PRIVILEGE_RINGS_COMPARISON: PrivilegeRingComparison[] = [
  {
    ring: 'Ring 0',
    name: 'Kernel Mode / Supervisor',
    privilegeLevel: 'Hak Akses Penuh (Ring 0)',
    hardwareAccess: 'Akses langsung tanpa batas ke register prosesor (CR0-CR8, MSR), tabel interupsi (IDT), dan tabel pemetaan memori fisik (Page Tables).',
    representativeComponents: 'ntoskrnl.exe, HAL (Hardware Abstraction Layer), Driver Perangkat (.sys).',
    deceptionVulnerability: 'Merupakan sumber tunggal data pelaporan sistem. Jika disusupi Rootkit, kernel dapat memfilter daftar proses sebelum data dikirimkan ke aplikasi User Mode.',
  },
  {
    ring: 'Ring 1 & 2',
    name: 'Layanan Menengah (Arsitektur Lawas)',
    privilegeLevel: 'Hak Akses Menengah (Tidak Digunakan di 64-bit)',
    hardwareAccess: 'Awalnya dirancang untuk driver periferal pada spesifikasi x86 lama; dinonaktifkan pada Windows dan Linux x86-64 demi optimalisasi eksekusi.',
    representativeComponents: 'Tidak aktif pada prosesor x86-64 kontemporer.',
    deceptionVulnerability: 'Ditinggalkan dalam perancangan kernel modern guna memangkas waktu pergantian tugas sistem (context switching).',
  },
  {
    ring: 'Ring 3',
    name: 'User Mode / Application Space',
    privilegeLevel: 'Hak Akses Terbatas (Ring 3)',
    hardwareAccess: 'Tidak memiliki akses langsung ke hardware maupun memori fisik. Seluruh permintaan data wajib melewati perintah panggilan sistem (SYSCALL / SYSENTER).',
    representativeComponents: 'Task Manager (taskmgr.exe), aplikasi peramban web, utilitas sistem, dan perangkat lunak antivirus standar.',
    deceptionVulnerability: 'Hanya dapat menampilkan data yang disetujui dan dikembalikan oleh kernel. Rentan menerima informasi yang telah dimanipulasi.',
  },
];

export const INFILTRATION_VECTORS: InfiltrationVector[] = [
  {
    id: 'byovd',
    title: 'BYOVD: Bring Your Own Vulnerable Driver',
    vectorType: 'Penyalahgunaan Driver Sah Bertanda Tangan',
    mechanism: 'Windows menerapkan aturan verifikasi digital bernama Driver Signature Enforcement (DSE) untuk menolak driver tanpa sertifikat resmi. Penyerang menyiasatinya melalui taktik BYOVD (Bring Your Own Vulnerable Driver), yaitu membawa driver pihak ketiga yang sah dan bertanda tangan resmi Microsoft (misalnya driver hardware versi lama), namun memiliki kelemahan keamanan yang memungkinkan penulisan ke memori kernel tanpa izin. Celah ini dipakai untuk mematikan pertahanan kernel dari dalam.',
    technicalArtifact: 'Pemuatan berkas driver rentan (misalnya: RTCore64.sys atau gdrv.sys) ke dalam folder C:\\Windows\\System32\\drivers.',
    defensiveControl: 'Penerapan Microsoft Vulnerable Driver Blocklist, Hypervisor-Protected Code Integrity (HVCI), dan Windows Defender Application Control (WDAC).',
  },
  {
    id: 'bootkit-uefi',
    title: 'UEFI Bootkit: Subversi Sebelum Sistem Operasi Berjalan',
    vectorType: 'Persistensi Pra-Sistem Operasi (Pre-OS Execution)',
    mechanism: 'Bootkit menyusup ke sistem dasar motherboard (UEFI, yaitu chip sistem dasar pengganti BIOS lama) atau program pembuka jalan saat booting (Bootloader) yang tersimpan pada partisi khusus di harddisk (EFI System Partition atau ESP). Dengan memanfaatkan kelemahan bootloader versi lama (seperti celah CVE-2022-21894), Bootkit dijalankan sebelum Windows Boot Manager (bootmgr.efi) dan kernel Windows dimuat ke RAM, sehingga fitur pengamanan Secure Boot dapat dimatikan sebelum sistem operasi sempat aktif.',
    technicalArtifact: 'Modifikasi berkas bootloader pada partisi awal harddisk (EFI System Partition / ESP) di jalur efi\\boot\\bootx64.efi.',
    defensiveControl: 'Hardware-Root-of-Trust melalui chip keamanan TPM 2.0 (Measured Boot), pembaruan Secure Boot Revocation List (DBX), dan UEFI Secure Boot.',
  },
  {
    id: 'hypervisor-rootkit',
    title: 'Subversi Tingkat Hypervisor (Lapisan Virtual / Ring -1)',
    vectorType: 'Instalasi Hypervisor Siluman di Bawah OS',
    mechanism: 'Memanfaatkan fitur virtualisasi prosesor (Intel VT-x atau AMD-V) untuk memasang pengawas tersembunyi (Hypervisor) di bawah sistem operasi. Sistem operasi diturunkan fungsinya menjadi mesin virtual tanpa disadari, memberikan penyerang kendali dari lapisan paling dasar (Ring -1).',
    technicalArtifact: 'Inisialisasi instruksi virtualisasi CPU (VMXON / VMLAUNCH) oleh modul kernel tanpa registrasi hypervisor resmi.',
    defensiveControl: 'Penerapan Virtualization-Based Security (VBS) dan Extended Page Tables (EPT) yang ditegakkan langsung oleh prosesor.',
  },
];

export const ROOTKIT_CONCEALMENT_MECHANISMS: RootkitConcealmentMechanism[] = [
  {
    id: 'ssdt-hooking',
    name: 'SSDT Hooking (System Service Descriptor Table)',
    subsystem: 'Tabel Panggilan Sistem (ntoskrnl.exe)',
    operationalConcept: 'Kernel mengelola tabel SSDT untuk memetakan nomor panggilan sistem ke alamat fungsi kernel resmi. Rootkit mengganti penunjuk alamat fungsi (seperti NtQuerySystemInformation) ke rutin proxy miliknya. Rutin proxy memanggil fungsi asli, memfilter dan menghapus entri proses berbahaya dari buffer memori, lalu mengembalikan data yang telah disaring ke pemanggil di Ring 3.',
    manipulatedStructure: 'KeServiceDescriptorTable (Array penunjuk fungsi sistem operasi).',
    forensicTrace: 'Divergensi alamat pointer SSDT di luar rentang modul memori ntoskrnl.exe asli.',
  },
  {
    id: 'dkom',
    name: 'DKOM (Direct Kernel Object Manipulation)',
    subsystem: 'Daftar Berantai Struktur Proses Kernel (_EPROCESS)',
    operationalConcept: 'Setiap proses aktif direpresentasikan oleh struktur _EPROCESS di memori kernel dan saling terhubung dalam daftar berantai ganda melalui field ActiveProcessLinks. Rootkit memodifikasi penunjuk Flink (Forward Link) dan Blink (Backward Link) untuk melepas simpul prosesnya dari rantai. Penjadwal CPU (Thread Scheduler) tetap menjalankan instruksi proses tersebut, namun fungsi pencarian proses sistem melewatinya.',
    manipulatedStructure: '_EPROCESS.ActiveProcessLinks (Manipulasi penunjuk rantai proses).',
    forensicTrace: 'Ketidaksesuaian antara ActiveProcessLinks (pslist) dengan pemindaian tag alokasi memori fisik (psscan).',
  },
];

export const ROOTKIT_AV_BLINDSPOTS: RootkitAntivirusBlindspot[] = [
  {
    dimension: 'Tingkat Hak Akses Sistem',
    userModeAntivirus: 'Beroperasi di Ring 3 (User Space) dengan hak akses terbatas pada antarmuka aplikasi.',
    kernelRootkitReality: 'Beroperasi di Ring 0 (Kernel Space) dengan hak akses penuh setara inti sistem operasi.',
    structuralReason: 'Hukum asimetri hak akses: Aplikasi di Ring 3 tidak memiliki wewenang untuk memeriksa kebenaran data di Ring 0.',
  },
  {
    dimension: 'Pemeriksaan Daftar Aplikasi Aktif',
    userModeAntivirus: 'Memanggil fungsi pengecekan proses Windows (seperti EnumProcesses atau NtQuerySystemInformation, yaitu perintah resmi untuk meminta daftar aplikasi yang sedang berjalan).',
    kernelRootkitReality: 'Mencegat rutin kernel di balik perintah tersebut dan memfilter nomor identitas proses (Process ID / PID) milik Rootkit.',
    structuralReason: 'Antivirus menerima daftar yang sudah disaring dan dihapus oleh Rootkit sebelum data tersebut ditampilkan ke layar.',
  },
  {
    dimension: 'Pemeriksaan Berkas di Penyimpanan',
    userModeAntivirus: 'Memeriksa folder driver sistem (C:\\Windows\\System32\\drivers) melalui penelusur berkas Windows biasa.',
    kernelRootkitReality: 'Rootkit memasang filter perantara (IRP Filter Driver) untuk menyembunyikan berkas driver (.sys) miliknya dari daftar berkas.',
    structuralReason: 'Permintaan pembacaan folder dipalsukan sehingga berkas biner driver jahat tidak dicantumkan dalam daftar berkas.',
  },
  {
    dimension: 'Pemantauan Jalur Komunikasi Jaringan',
    userModeAntivirus: 'Memeriksa tabel koneksi aktif (menggunakan perintah pemantau port jaringan seperti GetExtendedTcpTable).',
    kernelRootkitReality: 'Memanipulasi data jaringan di memori kernel sehingga koneksi ke server peretas tidak dicatat dalam tabel publik.',
    structuralReason: 'Komunikasi keluar (Command & Control) yang aktif tidak terlihat oleh modul firewall lokal.',
  },
];

export const ROOTKIT_CASE_STUDIES: RootkitCaseStudy[] = [
  {
    id: 'sony-bmg',
    name: 'Sony BMG Copy Protection (XCP)',
    year: '2005',
    category: 'Driver Filter Sistem Berkas Kernel',
    attackVector: 'Penyisipan driver filter kernel otomatis melalui CD audio musik untuk menyembunyikan berkas berawalan $sys$.',
    impactScale: 'Menciptakan kerentanan sistemik pada jutaan PC di seluruh dunia karena peretas lain mulai menamai malware mereka dengan awalan $sys$ agar otomatis disembunyikan oleh driver Sony.',
    technicalLesson: 'Manipulasi tabel penanganan I/O di tingkat kernel untuk kontrol DRM membuka celah eksploitasi berbahaya yang merusak integritas sistem operasi secara luas.',
  },
  {
    id: 'stuxnet',
    name: 'Stuxnet Signed Kernel Driver',
    year: '2010',
    category: 'Rootkit Kernel Bertanda Tangan Sah',
    attackVector: 'Penggunaan sertifikat digital sah yang dicuri dari Realtek Semiconductor dan JMicron untuk melewati pemeriksaan Driver Signature Enforcement (DSE).',
    impactScale: 'Menyabotase perangkat pengayaan uranium di Natanz (Iran) sembari memanipulasi telemetri sensor SCADA agar operator tetap melihat status normal.',
    technicalLesson: 'Tanda tangan digital sah tidak menjamin keamanan biner jika kunci privat sertifikat berhasil disusupi oleh penyerang tingkat lanjut.',
  },
  {
    id: 'rustock',
    name: 'Rustock Spam Botnet',
    year: '2006 - 2011',
    category: 'Rootkit Siluman SSDT & VBR',
    attackVector: 'Penyusupan kode ke Virtual Boot Record (VBR) harddisk dan intersepsi fungsi SSDT untuk menyembunyikan thread pengirim email spam massal.',
    impactScale: 'Mengendalikan lebih dari 1 juta mesin zombie yang memuntahkan miliaran pesan spam setiap hari tanpa pernah terdeteksi oleh Task Manager pengguna.',
    technicalLesson: 'Menegaskan bahwa mitigasi malware kernel mustahil dilakukan secara aman dari dalam sistem operasi yang sedang aktif terinfeksi.',
  },
  {
    id: 'blacklotus',
    name: 'BlackLotus UEFI Bootkit',
    year: '2023',
    category: 'Bootkit Firmware UEFI Modern',
    attackVector: 'Eksploitasi kerentanan Baton Drop (CVE-2022-21894) pada bootloader lama untuk mengeksekusi biner EFI sebelum proteksi kernel aktif.',
    impactScale: 'Mampu menembus sistem operasi Windows 11 mutakhir yang dilindungi Secure Boot penuh, menonaktifkan HVCI dan BitLocker dari fase booting awal.',
    technicalLesson: 'Menunjukkan pentingnya pembaruan rutin Secure Boot Revocation List (DBX) dan transisi menuju arsitektur Zero Trust berbasis hardware TPM.',
  },
];

export const ROOTKIT_SOP_STEPS: RootkitSopStep[] = [
  {
    step: '01',
    title: 'Audit & Deteksi Forensik Memori RAM (Memory Dump)',
    desc: 'Lakukan pengambilan salinan bita memori fisik mentah (Raw Memory Dump) langsung ke flashdisk tanpa melewati Windows yang sedang terinfeksi. Gunakan alat forensik memori independen untuk membandingkan daftar proses yang terdaftar dengan hasil pemindaian memori fisik mentah.',
    technicalCommand: 'volatility -f memdump.raw windows.psscan && windows.ssdt',
    objective: 'Mengidentifikasi Process ID (PID) yang disembunyikan oleh teknik DKOM melalui divergensi antara struktur rantai proses dan memori fisik.',
  },
  {
    step: '02',
    title: 'Pemindaian Sistem Offline (Booting Media Terisolasi)',
    desc: 'Matikan komputer yang terinfeksi untuk menghentikan eksekusi kode di memori RAM, lalu nyalakan komputer menggunakan media eksternal tepercaya (seperti Linux Live USB atau WinPE bersih). Periksa partisi penyimpanan harddisk dalam kondisi pasif tanpa ada intervensi dari driver Rootkit.',
    technicalCommand: 'mount -o ro /dev/nvme0n1p2 /mnt/target && clamscan -r /mnt/target/Windows/System32/drivers',
    objective: 'Mencabut kemampuan intersepsi kernel Rootkit dengan memutus aliran eksekusi CPU pada sistem operasi inang, sehingga berkas biner driver berbahaya dapat dideteksi.',
  },
  {
    step: '03',
    title: 'Rekonstruksi Sistem Total & Sanitasi Penyimpanan',
    desc: 'Berdasarkan standar penanganan insiden siber (NIST SP 800-88), sistem yang telah disusupi pada level kernel tidak boleh hanya dibersihkan sebagian. Lakukan format total partisi penyimpanan (Secure Wipe), perbarui firmware motherboard dari vendor resmi, dan instal ulang sistem operasi yang bersih dari installer resmi.',
    technicalCommand: 'blkdiscard /dev/nvme0n1 && instalasi ulang OS terverifikasi',
    objective: 'Memulihkan rantai kepercayaan (Chain of Trust) dari tingkat perangkat keras hingga sistem operasi tanpa menyisakan residu artefak kernel.',
  },
];
