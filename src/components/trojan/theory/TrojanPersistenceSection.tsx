// File: src/components/trojan/theory/TrojanPersistenceSection.tsx
import React from 'react';
import { Lock, Cpu, Database, AlertCircle, ShieldAlert, FileX2, Terminal } from 'lucide-react';
import { PERSISTENCE_MECHANISMS } from '@/data/trojanTheoryData';

export function TrojanPersistenceSection() {
  return (
    <section className="mb-10 space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Persistensi &amp; Rekayasa Sistem Operasi
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-slate-800" />
          Mekanisme Persistensi: Mengapa Berkas Trojan Terkunci di Memori (File in Use)?
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Ancaman Trojan dirancang tidak hanya untuk membobol sistem, tetapi juga mempertahankan eksistensinya (survivability).
          Untuk mencegah penghapusan oleh pengguna dan bertahan setelah komputer dimatikan (reboot), Trojan memanfaatkan dua
          mekanisme fundamental kernel Windows: penguncian berkas citra memori (Memory-Mapped File Locking) dan registri autorun.
        </p>
      </div>

      {/* Deep-Dive Dua Fenomena Sistem: File Locking vs Registry Persistence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: Kernel File-in-Use Lock */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-red-100 text-red-800">
                <FileX2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                1. Penguncian Berkas Citra Memori (File in Use Lock)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 font-semibold">
              NTFS ERROR_SHARING_VIOLATION
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Ketika Windows mengeksekusi biner melalui API <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">CreateProcess()</code>,
            Memory Manager kernel membuat objek pemetaan berkas (<span className="font-mono text-slate-800">SEC_IMAGE</span>). Kernel melarang izin penghapusan
            (<span className="font-mono text-slate-800">FILE_SHARE_DELETE</span>) selama thread dengan nomor <strong>Process ID (PID)</strong> tertentu masih aktif di memori RAM.
          </p>

          {/* Kotak Galat Simulasi Windows */}
          <div className="bg-slate-50 border border-slate-300 rounded p-3 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 border-b border-slate-200 pb-1 text-[10px]">
              <span>Pesan Kesalahan Sistem Operasi Windows</span>
              <span>Kode Status: 0x00000020</span>
            </div>
            <div className="text-red-800 font-bold text-[11px]">
              [ACCESS DENIED] File In Use
            </div>
            <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
              &quot;The action can&apos;t be completed because the file is open in <strong>SuperCalc_Pro.exe (PID 3892)</strong>.
              Close the file and try again.&quot;
            </p>
          </div>

          <div className="p-3 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs font-sans leading-relaxed">
            <strong>Rasionalisasi SOP:</strong> Siswa tidak akan pernah bisa menghapus berkas Trojan sebelum mematikan
            proses induk di RAM melalui perintah <span className="font-mono font-bold">taskkill /F /PID 3892</span> atau manajer tugas.
          </div>
        </div>

        {/* Panel 2: Registri Auto-Run Persistence */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-slate-100 text-slate-800">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                2. Injeksi Kunci Registri Auto-Run (Boot Persistence)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-semibold">
              HKCU / HKLM RUN KEYS
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Sistem operasi Windows membaca kumpulan kunci registri tertentu saat pengguna melakukan login.
            Trojan menyuntikkan nilai biner ke cabang registri <span className="font-mono text-slate-800">HKEY_CURRENT_USER\...\Run</span> agar
            setiap kali komputer dinyalakan ulang, Trojan otomatis dieksekusi kembali ke dalam RAM tanpa memerlukan interaksi pengguna.
          </p>

          {/* Kotak Telemetri Kunci Registri */}
          <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded p-3 font-mono text-xs space-y-1.5">
            <div className="text-[10px] text-slate-400 border-b border-slate-800 pb-1">
              Path Registri Startup:
            </div>
            <div className="text-amber-300 text-[11px] break-all">
              HKCU\Software\Microsoft\Windows\CurrentVersion\Run
            </div>
            <div className="text-slate-400 text-[10px] pt-1">
              Nilai Biner (String Value):
            </div>
            <div className="text-emerald-400 text-[11px] bg-slate-800/80 p-1.5 rounded border border-slate-700">
              &quot;SuperCalcSync&quot; = &quot;C:\ProgramData\SuperCalc_Pro.exe --silent&quot;
            </div>
          </div>

          <div className="p-3 rounded bg-blue-50 border border-blue-200 text-blue-900 text-xs font-sans leading-relaxed">
            <strong>Rasionalisasi SOP:</strong> Mematikan proses dan menghapus berkas tidak cukup; teknisi wajib membersihkan entri registri ini
            menggunakan <span className="font-mono font-bold">reg delete</span> agar sistem tidak memunculkan galat missing binary saat reboot.
          </div>
        </div>
      </div>

      {/* 3 Kartu Mekanisme Persistensi Rinci */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PERSISTENCE_MECHANISMS.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-700 px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
                {item.category}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.technicalDetails}</p>
            <div className="text-[10px] font-mono text-slate-500 bg-slate-50 p-2 rounded border border-slate-200 break-all">
              <strong>Artefak OS:</strong> {item.operatingSystemArtifact}
            </div>
            <div className="text-[11px] text-slate-700 font-sans pt-1 border-t border-slate-100">
              <strong>Metode Mitigasi:</strong> {item.mitigationMethod}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
