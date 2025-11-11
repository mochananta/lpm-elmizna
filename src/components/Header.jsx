import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [darkMode, setDarkMode] = useState(() => localStorage.theme === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  const handleSearchKey = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className="bg-white/90 dark:bg-black/90 backdrop-blur shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center py-3 px-5 md:px-10">

        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img
              src="/logo-elmizna.png"
              alt="LPM El Mizna"
              className={`h-14 md:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300 ${darkMode ? "invert brightness-0 md:brightness-0" : ""
                }`}
            />
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8 font-medium">
          <a href="/" className="hover:text-[#167c48] transition">Home</a>
          <a href="/berita" className="hover:text-[#167c48] transition">Berita</a>
          <a href="/berita?kategori=opini" className="hover:text-[#167c48] transition">Opini</a>
          <a href="/berita?kategori=kampus" className="hover:text-[#167c48] transition">Kampus</a>
          <a href="/redaksi" className="hover:text-[#167c48] transition">Redaksi</a>
          <a href="/kontak" className="hover:text-[#167c48] transition">Kontak</a>
        </nav>

        <div className="flex items-center space-x-3">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKey}
              className="border border-gray-300 dark:border-gray-700 rounded-full pl-4 pr-10 py-2 text-sm w-48 md:w-64 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[#167c48] focus:outline-none transition"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
              alt="Search"
              className="w-4 h-4 absolute right-3 top-2.5 opacity-70 dark:invert"
            />
          </div>

          <button onClick={() => setDarkMode((p) => !p)} className="border border-gray-300 dark:border-gray-600 rounded-full p-2">
            <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="Light" className={`w-6 h-6 ${darkMode ? "hidden" : "block"}`} />
            <img src="https://cdn-icons-png.flaticon.com/512/6714/6714978.png" alt="Dark" className={`w-6 h-6 ${darkMode ? "block" : "hidden"} dark:invert`} />
          </button>

          <button
            onClick={() => setMenuOpen((p) => !p)}
            id="menuToggle"
            className="md:hidden border border-gray-300 dark:border-gray-700 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png" alt="Menu" className="w-5 h-5 dark:invert" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobileNav" className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-6 py-4 space-y-3 font-medium">
          <a href="/" className="block hover:text-[#167c48] transition">Home</a>
          <a href="/berita" className="block hover:text-[#167c48] transition">Berita</a>
          <a href="/berita?kategori=opini" className="block hover:text-[#167c48] transition">Opini</a>
          <a href="/berita?kategori=kampus" className="block hover:text-[#167c48] transition">Kampus</a>
          <a href="/redaksi" className="block hover:text-[#167c48] transition">Redaksi</a>
          <a href="/kontak" className="block hover:text-[#167c48] transition">Kontak</a>
        </div>
      )}
    </header>

  );
}
