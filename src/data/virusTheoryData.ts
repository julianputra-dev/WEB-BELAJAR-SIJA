// File: src/data/virusTheoryData.ts

export interface InfectionVectorItem {
  id: string;
  name: string;
  mechanism: string;
  impactOnSize: string;
  mitigationApproach: string;
}

export interface CaseStudyItem {
  id: string;
  name: string;
  year: string;
  vector: string;
  impact: string;
  technicalLesson: string;
}

export interface IocItem {
  indicator: string;
  detectionTool: string;
  forensicArtifact: string;
}

export const INFECTION_VECTORS: InfectionVectorItem[] = [
  {
    id: 'appending',
    name: '1. Appending Virus (Menempel di Akhir Berkas)',
    mechanism:
      'Virus menambahkan kode jahatnya di bagian paling belakang file .exe. Agar virus berjalan lebih dulu, ia mengubah alamat awal eksekusi (AddressOfEntryPoint) agar melompat ke kode parasit sebelum aplikasi asli dibuka.',
    impactOnSize: 'Ukuran berkas membengkak sesuai panjang kode virus (contoh: bertambah +348 KB).',
    mitigationApproach: 'Memotong kode parasit dari akhir file dan mengembalikan nilai EntryPoint ke fungsi program asli.',
  },
  {
    id: 'prepending',
    name: '2. Prepending Virus (Menyusup di Depan Berkas)',
    mechanism:
      'Virus meletakkan kodenya di bagian paling depan file. Saat file diklik, virus langsung aktif mengeksekusi aksinya terlebih dahulu, baru kemudian memanggil program asli agar korban tidak curiga.',
    impactOnSize: 'Ukuran berkas membesar dan tanda tangan digital keamanan (authenticode) menjadi tidak sah.',
    mitigationApproach: 'Memisahkan biner orisinal dari lapisan muatan virus melalui analisis struktur offset file.',
  },
  {
    id: 'cavity',
    name: '3. Cavity Virus (Mengisi Ruang Kosong Biner)',
    mechanism:
      'Virus mencari celah kosong (slack space) di dalam file program, lalu menyembunyikan kodenya di celah tersebut secara cerdik tanpa membuat ukuran fisik file terlihat bertambah.',
    impactOnSize: 'Ukuran berkas tetap sama, namun sidik jari kriptografi (Hash SHA-256) berubah total.',
    mitigationApproach: 'Mencocokkan nilai Hash SHA-256 dengan database citra emas (Golden Image) untuk mendeteksi modifikasi.',
  },
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cih',
    name: 'CIH / Chernobyl Virus (Win95.CIH)',
    year: '1998',
    vector: 'Cavity File Infector (Mengisi Ruang Kosong PE)',
    impact: 'Menimpa data boot hard drive (MBR) dan merusak chip Flash BIOS pada komputer korban hingga mati total.',
    technicalLesson:
      'Membuktikan bahwa virus file infector dapat merusak komponen fisik komputer jika memiliki akses ke tingkat terdalam sistem (kernel).',
  },
  {
    id: 'sality',
    name: 'Sality Virus (Win32.Sality)',
    year: '2003 - 2010',
    vector: 'Polymorphic File Infector & Sabotase SafeMode',
    impact: 'Menginfeksi file .exe lokal, mematikan fungsi antivirus, dan merusak kunci registri SafeBoot agar tidak bisa dibersihkan.',
    technicalLesson:
      'Menegaskan perlunya menghentikan proses virus di memori RAM dan mengamankan registri SafeMode sebelum membersihkan file di disk.',
  },
  {
    id: 'nimda',
    name: 'Nimda Worm & File Infector',
    year: '2001',
    vector: 'Multi-Vektor (Email, Jaringan, & Infeksi Berkas)',
    impact: 'Menyusup ke berkas program lokal sekaligus menyebarkan diri secara masif ke komputer lain di jaringan LAN.',
    technicalLesson:
      'Mengharuskan kombinasi isolasi koneksi jaringan dan pemindaian hash kriptografi pada seluruh file komputer.',
  },
];

export const FORENSIC_IOCS: IocItem[] = [
  {
    indicator: 'Ketidakcocokan Nilai Hash SHA-256',
    detectionTool: 'Hash Comparator / CertUtil',
    forensicArtifact: 'Nilai sidik jari file berubah saat diuji terhadap database acuan (Golden Image).',
  },
  {
    indicator: 'Alamat EntryPoint yang Dibelokkan',
    detectionTool: 'PE Header Inspector (DumpBin / PEview)',
    forensicArtifact: 'Alamat eksekusi pertama file melompat ke seksi asing (.parasite) bukan ke kode asli.',
  },
  {
    indicator: 'Proses Asing Berbeban CPU Tinggi',
    detectionTool: 'Process Explorer / Task Manager Forensik',
    forensicArtifact: 'Proses asing (PID 3844) aktif memakan sumber daya CPU hingga lebih dari 80%.',
  },
  {
    indicator: 'Modifikasi Registri SafeBoot',
    detectionTool: 'Registry Auditor (Regedit / Autoruns)',
    forensicArtifact: 'Kunci registri SafeBoot dirusak untuk mencegah komputer masuk ke mode aman.',
  },
];
