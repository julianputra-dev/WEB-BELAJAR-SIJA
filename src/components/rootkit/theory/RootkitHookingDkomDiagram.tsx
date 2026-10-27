// File: src/components/rootkit/theory/RootkitHookingDkomDiagram.tsx
import React from 'react';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Database,
  CheckCircle,
  XCircle,
  Split,
  Terminal,
  HelpCircle,
  Layers,
  ShieldCheck,
  EyeOff
} from 'lucide-react';

export function RootkitHookingDkomDiagram() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-6">
      {/* Header Bagian Diagram */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Skematika Intersepsi Sistem
          </span>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-700" />
            Diagram Alur Intersepsi System Call &amp; Manipulasi Struktur Memori DKOM
          </h3>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 w-fit">
          Arsitektur Ring 0 / Ring 3 Call Interception
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Skema di bawah menggambarkan alur operasional permintaan data sistem saat Task Manager (<span className="font-mono text-slate-800">taskmgr.exe</span>)
        meminta daftar aplikasi yang aktif. Rootkit di Kernel Mode (Ring 0) mencegat aliran data tersebut melalui dua teknik utama:
        <strong> SSDT Hooking</strong> (pembelokan fungsi panggilan sistem) dan <strong>DKOM</strong> (pemutusan mata rantai proses pada memori RAM).
      </p>

      {/* Kanvas Diagram Utama */}
      <div className="border border-slate-300 rounded-lg p-4 md:p-6 bg-slate-50/70 space-y-6">
        
        {/* ======================================================== */}
        {/* LAPISAN 1: USER MODE (RING 3) - INISIASI PERMINTAAN      */}
        {/* ======================================================== */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-800 px-2 py-0.5 bg-slate-100 rounded border border-slate-300">
                Tahap 01 • User Space (Ring 3)
              </span>
              <span className="text-xs font-bold text-slate-900 font-sans">
                Permintaan Daftar Program oleh Aplikasi Pengguna
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              Hak Akses Terbatas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">1. Pemohon Data</div>
              <div className="text-xs font-bold font-mono text-slate-900">Task Manager / Antivirus</div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                Aplikasi meminta daftar seluruh program yang sedang berjalan untuk ditampilkan ke layar monitor.
              </p>
            </div>

            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">2. Fungsi Panggilan Sistem</div>
              <div className="text-xs font-bold font-mono text-slate-900">NtQuerySystemInformation</div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                Perintah resmi Windows yang dipanggil untuk mengambil rincian proses dari inti sistem.
              </p>
            </div>

            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">3. Transisi Perangkat Keras</div>
              <div className="text-xs font-bold font-mono text-slate-900">Instruksi SYSCALL CPU</div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                Prosesor mengalihkan kendali eksekusi dari Ring 3 ke Ring 0 agar sistem dapat membaca data memori internal.
              </p>
            </div>
          </div>
        </div>

        {/* BATAS GERBANG HAK AKSES */}
        <div className="flex items-center justify-center gap-3 text-slate-400 font-mono text-[10px] uppercase">
          <div className="h-px bg-slate-300 flex-1" />
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 rounded shadow-xs text-slate-700 font-bold">
            <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
            <span>Gerbang Hak Akses CPU: Masuk ke Inti Sistem (Ring 3 ke Ring 0)</span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
          </div>
          <div className="h-px bg-slate-300 flex-1" />
        </div>

        {/* ======================================================== */}
        {/* LAPISAN 2: KERNEL MODE (RING 0) - INTERSEPSI & MANIPULASI */}
        {/* ======================================================== */}
        <div className="bg-white border-2 border-slate-900 rounded-lg p-5 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-white px-2 py-0.5 bg-slate-900 rounded">
                Tahap 02 • Kernel Space (Ring 0)
              </span>
              <span className="text-xs font-bold text-slate-900 font-sans">
                Intersepsi dan Pemalsuan Data oleh Rootkit
              </span>
            </div>
            <span className="text-[10px] font-mono text-red-800 font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-200">
              Manipulasi Siluman Aktif
            </span>
          </div>

          {/* Skema Komparatif 2 Mekanisme: SSDT Hooking vs DKOM */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Mekanisme A: SSDT Hooking */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Split className="w-3.5 h-3.5 text-slate-700" />
                  Metode A: SSDT Hooking (Pembelokan Jalur)
                </span>
                <span className="text-[10px] font-mono text-slate-500">Manipulasi Tabel Fungsi</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* Visual Jalur Pemanggilan */}
                <div className="p-3 rounded bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono">Jalur Normal:</span>
                    <span className="font-mono text-slate-400 line-through">SSDT -&gt; Fungsi Asli Windows</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-red-700 bg-red-50 p-1.5 rounded border border-red-200">
                    <span className="font-mono">Jalur Dibajak:</span>
                    <span className="font-mono">SSDT -&gt; Fungsi Perantara Rootkit</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-white border border-slate-200 space-y-1.5 font-sans text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-900 block font-mono text-[10px] uppercase">
                    Cara Kerja Pembelokan:
                  </span>
                  <p className="leading-relaxed">
                    1. Permintaan dari Task Manager dialihkan ke fungsi palsu milik Rootkit.
                  </p>
                  <p className="leading-relaxed">
                    2. Fungsi palsu memanggil fungsi Windows yang asli untuk mengambil daftar seluruh program.
                  </p>
                  <p className="leading-relaxed text-red-700 font-medium">
                    3. Fungsi palsu menghapus program berbahaya (<span className="font-mono">rootkit.sys</span>) dari daftar tersebut sebelum dikembalikan ke layar pengguna.
                  </p>
                </div>
              </div>
            </div>

            {/* Mekanisme B: DKOM Unlinking */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-slate-700" />
                  Metode B: DKOM (Pelepasan Rantai Memori)
                </span>
                <span className="text-[10px] font-mono text-slate-500">Manipulasi Antrean RAM</span>
              </div>

              {/* Rantai Struktur Proses Visual */}
              <div className="space-y-2.5">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                  Rantai Hubungan Antar-Proses di Memori RAM:
                </div>

                <div className="flex items-center justify-between gap-1 text-center font-mono text-[10px]">
                  {/* Node 1 */}
                  <div className="p-2 bg-white rounded border border-slate-300 flex-1">
                    <div className="text-slate-400 text-[9px]">Proses 1</div>
                    <div className="font-bold text-slate-800">smss.exe</div>
                    <div className="text-slate-500">PID: 368</div>
                  </div>

                  <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />

                  {/* Node 2 - Terputus */}
                  <div className="p-2 bg-red-50 rounded border-2 border-dashed border-red-300 flex-1 relative">
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-bold px-1 rounded">
                      DILEPAS
                    </span>
                    <div className="text-red-500 text-[9px]">Proses 2 (Rootkit)</div>
                    <div className="font-bold text-red-700">rootkit.sys</div>
                    <div className="text-red-600">PID: 4096</div>
                  </div>

                  <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />

                  {/* Node 3 */}
                  <div className="p-2 bg-white rounded border border-slate-300 flex-1">
                    <div className="text-slate-400 text-[9px]">Proses 3</div>
                    <div className="font-bold text-slate-800">csrss.exe</div>
                    <div className="text-slate-500">PID: 440</div>
                  </div>
                </div>

                <div className="p-3 rounded bg-white border border-slate-200 space-y-1.5 font-sans text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-900 block font-mono text-[10px] uppercase">
                    Cara Kerja Pelepasan Rantai:
                  </span>
                  <p className="leading-relaxed">
                    Rootkit mengubah penunjuk arah memori sehingga <strong>Proses 1</strong> langsung terhubung ke <strong>Proses 3</strong>, melompati Proses 2.
                  </p>
                  <p className="leading-relaxed text-slate-700">
                    <strong>Dampak Sistem:</strong> Saat sistem mencari aplikasi aktif, sistem melompati Proses 2 seolah-olah tidak ada. Namun prosesor CPU tetap menjalankan instruksi Rootkit di memori RAM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TRANSISI KEMBALI MENUJU USER SPACE */}
        <div className="flex items-center justify-center gap-3 text-slate-400 font-mono text-[10px] uppercase">
          <div className="h-px bg-slate-300 flex-1" />
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 rounded shadow-xs text-slate-700 font-bold">
            <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
            <span>Hasil Diserahkan Kembali ke Layar Pengguna (Ring 0 ke Ring 3)</span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
          </div>
          <div className="h-px bg-slate-300 flex-1" />
        </div>

        {/* ======================================================== */}
        {/* LAPISAN 3: OUTPUT USER SCREEN VS TELEMETRI FORENSIK RAM  */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Kolom Kiri: Layar Task Manager (Ilusi Normal) */}
          <div className="bg-white border-2 border-slate-200 rounded-lg p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-800 px-2 py-0.5 bg-slate-100 rounded border border-slate-300">
                Tahap 03 • Layar Pengguna (Task Manager)
              </span>
              <span className="text-[10px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Status: Tampak Bersih
              </span>
            </div>

            <div className="bg-slate-100 border border-slate-300 rounded p-2.5 font-mono text-[11px] space-y-1.5">
              <div className="text-slate-500 text-[10px] border-b border-slate-200 pb-1 flex justify-between font-sans font-semibold">
                <span>Nama Program</span>
                <span>ID Proses (PID)</span>
                <span>Status</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>System</span>
                <span>4</span>
                <span className="text-emerald-700">Berjalan</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>smss.exe</span>
                <span>368</span>
                <span className="text-emerald-700">Berjalan</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>csrss.exe</span>
                <span>440</span>
                <span className="text-emerald-700">Berjalan</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>explorer.exe</span>
                <span>1820</span>
                <span className="text-emerald-700">Berjalan</span>
              </div>
              <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-sans mt-2">
                <strong>Apa yang dilihat pengguna:</strong> Seluruh sistem tampak normal dan tidak ada ancaman. Program Rootkit (PID 4096) berhasil disembunyikan sepenuhnya dari layar.
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Telemetri Forensik Memori Fisik (Volatility Analysis) */}
          <div className="bg-white border-2 border-slate-900 rounded-lg p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-900 px-2 py-0.5 bg-slate-100 rounded border border-slate-300">
                Hasil Nyata: Audit Forensik Memori RAM
              </span>
              <span className="text-[10px] font-mono text-red-800 font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-200 flex items-center gap-1">
                <XCircle className="w-3 h-3 text-red-600" />
                Bukti: Ditemukan di RAM
              </span>
            </div>

            <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded p-2.5 font-mono text-[10px] space-y-1.5 overflow-x-auto">
              <div className="text-slate-400 border-b border-slate-800 pb-1 text-[9px] flex items-center gap-1">
                <Terminal className="w-3 h-3 text-slate-400" />
                <span>Pemeriksaan Memori Fisik Mentah (Raw RAM Scan)</span>
              </div>
              
              <table className="w-full text-left font-mono text-[10px]">
                <thead className="text-slate-400 border-b border-slate-800 text-[9px]">
                  <tr>
                    <th className="py-1 px-1.5">Alamat RAM</th>
                    <th className="py-1 px-1.5">PID</th>
                    <th className="py-1 px-1.5">Nama Program</th>
                    <th className="py-1 px-1.5">Kondisi Nyata</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="py-1 px-1.5 text-slate-400">0x0001F34000</td>
                    <td className="py-1 px-1.5">368</td>
                    <td className="py-1 px-1.5">smss.exe</td>
                    <td className="py-1 px-1.5 text-emerald-400">Aktif Normal</td>
                  </tr>
                  <tr className="bg-red-950/60 text-red-300 font-bold">
                    <td className="py-1 px-1.5 text-red-400">0x0001F80000</td>
                    <td className="py-1 px-1.5 text-red-400">4096</td>
                    <td className="py-1 px-1.5 text-white">rootkit.sys</td>
                    <td className="py-1 px-1.5 text-red-400">AKTIF (DISEMBUNYIKAN)</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 text-slate-400">0x0001F92000</td>
                    <td className="py-1 px-1.5">440</td>
                    <td className="py-1 px-1.5">csrss.exe</td>
                    <td className="py-1 px-1.5 text-emerald-400">Aktif Normal</td>
                  </tr>
                </tbody>
              </table>

              <div className="p-2 rounded bg-slate-800 text-slate-300 text-[11px] font-sans mt-2 border border-slate-700">
                <strong className="text-white">Fakta Forensik:</strong> Meskipun di Task Manager tidak muncul, program jahat (PID 4096) sebenarnya masih tersimpan dan bekerja di dalam keping RAM fisik komputer.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* PANDUAN LANGKAH DEMI LANGKAH UNTUK SISWA                 */}
      {/* ======================================================== */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
          <HelpCircle className="w-4 h-4 text-slate-800" />
          <h4 className="text-sm font-bold text-slate-900">
            Penjelasan Alur untuk Siswa: Bagaimana Rootkit Menipu Komputer Anda?
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Langkah 1 */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-700 uppercase bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                Langkah 1
              </span>
              <Layers className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <h5 className="text-xs font-bold text-slate-900">Task Manager Meminta Data</h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Saat Anda membuka Task Manager, aplikasi tersebut meminta daftar seluruh program yang sedang berjalan kepada sistem operasi melalui perintah resmi (System Call).
            </p>
          </div>

          {/* Langkah 2 */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-700 uppercase bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                Langkah 2
              </span>
              <Split className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <h5 className="text-xs font-bold text-slate-900">Pencegatan di Inti Sistem</h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Permintaan data turun ke lapisan Kernel (Ring 0). Karena Rootkit sudah berada di Ring 0, Rootkit dapat mencegat perintah tersebut sebelum diproses oleh fungsi Windows yang asli.
            </p>
          </div>

          {/* Langkah 3 */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-700 uppercase bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                Langkah 3
              </span>
              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <h5 className="text-xs font-bold text-slate-900">Penyaringan Data Rahasia</h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Rootkit menghapus namanya sendiri dari daftar program (via SSDT Hooking) atau melepas mata rantai prosesnya di RAM (via DKOM), sehingga namanya hilang dari daftar.
            </p>
          </div>

          {/* Langkah 4 */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-700 uppercase bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                Langkah 4
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <h5 className="text-xs font-bold text-slate-900">Munculnya Ilusi Normal</h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Daftar yang telah dipalsukan diserahkan kembali ke Task Manager. Di layar komputer Anda semuanya tampak bersih, padahal program jahat tetap aktif di memori RAM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
