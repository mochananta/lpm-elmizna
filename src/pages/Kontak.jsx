import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breakingnews from "../components/Breakingnews";

export default function Kontak() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nama || !email || !pesan) {
      setFeedback("❌ Semua kolom wajib diisi!");
      return;
    }

    setLoading(true);
    setFeedback("");

    const { error } = await supabase.from("kontak").insert([
      {
        nama,
        email,
        pesan,
      },
    ]);

    setLoading(false);

    if (error) {
      setFeedback("❌ Gagal mengirim pesan: " + error.message);
    } else {
      setFeedback("✅ Pesan berhasil dikirim! Terima kasih atas masukan Anda.");
      setNama("");
      setEmail("");
      setPesan("");
    }
  }

  return (
    <>
      <Preloader />
      <Breakingnews />
      <Header />

      {/* Bagian utama */}
      <div className="bg-gray-50 dark:bg-black min-h-screen text-gray-800 dark:text-gray-100 px-6 md:px-20 py-10">
        {/* Tombol kembali */}
        <div className="max-w-5xl mx-auto mb-6">
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

        {/* Judul halaman */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Hubungi <span className="text-[#03e312]">Kami</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Jika ada pertanyaan, saran, atau kerja sama, jangan ragu untuk mengirim pesan.
          </p>
        </div>

        {/* Grid 2 kolom: form + info */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Formulir kontak */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Kirim Pesan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#03e312]"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              <input
                type="email"
                placeholder="Alamat Email"
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#03e312]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Pesan Anda..."
                rows="5"
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#03e312]"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#03e312] text-white font-semibold py-2 rounded hover:bg-[#02c20f] transition disabled:opacity-50"
              >
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>

            {feedback && (
              <p
                className={`mt-3 text-center text-sm ${
                  feedback.startsWith("✅") ? "text-green-600" : "text-red-500"
                }`}
              >
                {feedback}
              </p>
            )}
          </div>

          {/* Informasi kontak */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                Alamat Redaksi
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gedung UKM Lt. 2, Universitas Islam Ibrahimy Banyuwangi<br />
                Jl. Jember No. 123, Kabat, Banyuwangi
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-400">lpmelmizna@gmail.com</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                Media Sosial
              </h3>
              <div className="flex gap-4 text-[#03e312] text-2xl">
                <a href="#" className="hover:scale-110 transition">
                  <i className="ri-instagram-fill"></i>
                </a>
                <a href="#" className="hover:scale-110 transition">
                  <i className="ri-facebook-circle-fill"></i>
                </a>
                <a href="#" className="hover:scale-110 transition">
                  <i className="ri-twitter-x-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
