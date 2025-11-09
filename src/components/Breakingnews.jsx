import React from "react";

export default function Breakingnews() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white text-sm py-1 overflow-hidden relative border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
      <div className="flex items-center space-x-3 px-4">
        <div className="overflow-hidden relative flex-1">
          <div className="flex animate-marquee whitespace-nowrap italic">
            <span className="mx-8">
              🎓 Universitas Islam Ibrahimy Banyuwangi Resmi Membuka Pendaftaran Mahasiswa Baru Tahun Akademik 2025/2026.
            </span>
            <span className="mx-8">
              📰 LPM El Mizna Luncurkan Edisi Terbaru Majalah Kampus Bertema <b>"Suara Mahasiswa, Suara Perubahan"</b>.
            </span>
            <span className="mx-8">
              💬 Diskusi Publik El Mizna Bahas “Peran Pers Mahasiswa di Era Digital” di Aula Ibrahimy Banyuwangi.
            </span>
            <span className="mx-8">
              📢 UKM Pers El Mizna Raih Penghargaan Sebagai Media Kampus Teraktif se-Banyuwangi Tahun 2025.
            </span>
            <span className="mx-8">
              ✍️ Pelatihan Jurnalistik Dasar El Mizna 2025 Diikuti Puluhan Mahasiswa Baru dari Berbagai Fakultas.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
