import React from "react";
import { Link } from "react-router-dom";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breakingnews from "../components/Breakingnews";

export default function Redaksi() {
  const pengurus = [
    { nama: "Fauzan Adhima", jabatan: "Ketua Umum" },
    { nama: "Izza", jabatan: "Pimpinan Redaksi / Copy Writer" },
    { nama: "Latifah", jabatan: "Sekretaris Umum" },
    { nama: "Indah Magfirah", jabatan: "Bendahara Umum" },
    { nama: "Millah", jabatan: "Divisi Literasi & Pengembangan SDM" },
    { nama: "Iqbal Robal A.", jabatan: "Divisi Jaringan Kerja" },
    { nama: "Faizin", jabatan: "Divisi Editor" },
    { nama: "Haikal", jabatan: "Divisi Editor" },
    { nama: "Firda", jabatan: "Divisi Reporter/Wartawan" },
    { nama: "Tarisah", jabatan: "Divisi Reporter/Wartawan" },
  ];

  return (
    <>
      <Preloader />
      <Breakingnews />
      <Header />

      <div className="bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-100 min-h-screen px-6 md:px-20 py-10">
        <div className="max-w-6xl mx-auto mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-[#03e312]/10 text-gray-700 dark:text-gray-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Home
          </Link>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-[#000000] dark:text-gray-300 font-semibold">
            Struktur Organisasi
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Pengurus UKM Pers El Mizna <br />
            <span className="text-[#03e312]">
              Universitas Islam Ibrahimy Banyuwangi
            </span>
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">Periode 2025 – 2026</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 max-w-6xl mx-auto">
          {pengurus.map((p, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center relative"
            >
              <div className="w-28 h-28 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-[#03e312]/70 mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9001/9001859.png"
                  alt="Admin Icon"
                  className="w-14 h-14 dark:invert transition"
                />
              </div>

              <h3 className="font-semibold text-lg">{p.nama}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{p.jabatan}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
