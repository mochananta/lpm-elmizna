import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-16 border-t border-gray-200 dark:border-gray-700 transition">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
            <i className="ri-newspaper-line text-[#03e312] text-lg"></i> LPM El Mizna
          </h4>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Lembaga Pers Mahasiswa Universitas Islam Ibrahimy — sumber berita,
            opini, dan inspirasi civitas akademika.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
            <i className="ri-links-line text-[#03e312]"></i> Navigasi
          </h4>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <a href="/" className="hover:text-[#03e312] flex items-center gap-2 transition">
                <i className="ri-home-4-line text-[#03e312]"></i> Home
              </a>
            </li>
            <li>
              <a href="/berita" className="hover:text-[#03e312] flex items-center gap-2 transition">
                <i className="ri-article-line text-[#03e312]"></i> Berita
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#03e312] flex items-center gap-2 transition">
                <i className="ri-quill-pen-line text-[#03e312]"></i> Opini
              </a>
            </li>
            <li>
              <a href="/redaksi" className="hover:text-[#03e312] flex items-center gap-2 transition">
                <i className="ri-team-line text-[#03e312]"></i> Redaksi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#03e312] flex items-center gap-2 transition">
                <i className="ri-building-4-line text-[#03e312]"></i> Kampus
              </a>
            </li>
            <li>
              <a href="/kontak" className="hover:text-[#03e312] flex items-center gap-2 transition">
                <i className="ri-mail-line text-[#03e312]"></i> Kontak
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
            <i className="ri-share-forward-line text-[#03e312]"></i> Ikuti Kami
          </h4>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://www.instagram.com/lpm_elmizna/"
              className="text-gray-600 dark:text-gray-400 hover:text-[#03e312] transition"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href="https://www.youtube.com/@eLMizna"
              className="text-gray-600 dark:text-gray-400 hover:text-[#03e312] transition"
            >
              <i className="ri-youtube-line"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-[#03e312] transition"
            >
              <i className="ri-global-line"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-[#03e312] transition"
            >
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs">
        &copy; 2025{" "}
        <span className="text-[#03e312] font-semibold">
          LPM El Mizna – Universitas Islam Ibrahimy Banyuwangi
        </span>
        . Semua Hak Dilindungi.
      </div>
    </footer>
  );
}
