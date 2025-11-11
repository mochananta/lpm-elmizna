import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [popularPosts, setPopularPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [nama, setNama] = useState("");
  const [emailKontak, setEmailKontak] = useState("");
  const [pesan, setPesan] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchPopularPosts();
    fetchCategories();
  }, []);

  async function fetchPopularPosts() {
    const { data, error } = await supabase
      .from("berita")
      .select("id, title, image_url, view_count")
      .gt("view_count", 0)
      .order("view_count", { ascending: false })
      .limit(5);

    if (error) console.error("Gagal mengambil popular posts:", error);
    else setPopularPosts(data);
  }

  async function fetchCategories() {
    const { data, error } = await supabase.from("kategori").select("id, name");
    if (error) console.error("Gagal mengambil kategori:", error);
    else setCategories(data);
  }

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email) {
      setMessage("Masukkan alamat email terlebih dahulu!");
      return;
    }
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("subscriber").insert([{ email }]);
    setLoading(false);

    if (error) {
      setMessage("Gagal menyimpan email: " + error.message);
    } else {
      setMessage("Berhasil berlangganan berita!");
      setEmail("");
    }
  }

  async function handleContactSubmit(e) {
    e.preventDefault();
    if (!nama || !emailKontak || !pesan) {
      setFeedback("Semua kolom wajib diisi!");
      return;
    }

    setSending(true);
    setFeedback("");

    const { error } = await supabase.from("kontak").insert([
      {
        nama,
        email: emailKontak,
        pesan,
      },
    ]);

    setSending(false);

    if (error) {
      setFeedback("❌ Gagal mengirim pesan: " + error.message);
    } else {
      setFeedback("✅ Pesan berhasil dikirim! Terima kasih.");
      setNama("");
      setEmailKontak("");
      setPesan("");
    }
  }

  return (
    <aside className="space-y-8">
      <div>
        <h3 className="flex items-center text-xl font-semibold border-b border-gray-200 dark:border-gray-800 pb-2 mb-4 uppercase text-black dark:text-white">
          <i className="fa-solid fa-fire text-[#167c48] mr-2"></i> Popular Posts
        </h3>
        {popularPosts.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada berita.</p>
        ) : (
          <ul className="space-y-4 text-sm">
            {popularPosts.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/berita/${post.id}`}
                  className="flex items-center space-x-3 group cursor-pointer"
                >
                  <img
                    src={post.image_url || "https://picsum.photos/100/60"}
                    className="w-16 h-12 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform"
                    alt={post.title}
                  />
                  <span className="text-black dark:text-white group-hover:text-[#167c48] font-medium line-clamp-2">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-800 pb-2 mb-4 uppercase text-black dark:text-white">
          Kategori
        </h3>
        {categories.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada kategori.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((k) => (
              <span
                key={k.id}
                className="bg-[#167c48]/10 text-[#167c48] px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-[#167c48]/20 transition"
              >
                {k.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#167c48] text-white rounded-xl p-5 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Berlangganan Berita</h3>
        <p className="text-sm mb-3 text-white/80">
          Dapatkan berita terbaru langsung ke email Anda.
        </p>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Alamat email..."
            className="w-full px-3 py-2 rounded text-black mb-2 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-semibold rounded py-2 hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Subscribe"}
          </button>
        </form>
        {message && (
          <p className="text-sm mt-2 text-center text-white font-medium">
            {message}
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
          Hubungi Kami
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          Kirim pesan atau pertanyaan Anda ke admin.
        </p>
        <form onSubmit={handleContactSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nama lengkap"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 text-black dark:text-white bg-transparent focus:outline-none"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <input
            type="email"
            placeholder="Alamat email"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 text-black dark:text-white bg-transparent focus:outline-none"
            value={emailKontak}
            onChange={(e) => setEmailKontak(e.target.value)}
          />
          <textarea
            placeholder="Pesan Anda..."
            rows="3"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 text-black dark:text-white bg-transparent focus:outline-none"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
          ></textarea>
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-[#167c48] text-white font-semibold rounded py-2 hover:bg-[#02c50f] transition disabled:opacity-50"
          >
            {sending ? "Mengirim..." : "Kirim Pesan"}
          </button>
        </form>
        {feedback && (
          <p
            className={`text-sm mt-3 text-center ${
              feedback.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </aside>
  );
}
