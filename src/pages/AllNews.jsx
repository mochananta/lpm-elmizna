import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breakingnews from "../components/Breakingnews";

export default function AllNews() {
  const [berita, setBerita] = useState([]);
  const [categories, setCategories] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchAllNews();
  }, []);

  async function fetchCategories() {
    const { data, error } = await supabase.from("kategori").select("id, name");
    if (error) {
      console.error("Gagal ambil kategori:", error.message);
      return;
    }
    const map = {};
    data.forEach((cat) => (map[cat.id] = cat.name));
    setCategories(map);
  }

  async function fetchAllNews() {
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Gagal ambil berita:", error.message);
    } else {
      setBerita(data);
    }
    setLoading(false);
  }

  const filteredNews = berita.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  function getKategoriName(id) {
    return categories[id] || "Umum";
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Memuat berita...
      </div>
    );

  return (
    <>
      <Preloader />
      <Breakingnews />
      <Header />

      <div className="bg-gray-50 dark:bg-black">
        <section className="container mx-auto px-6 md:px-10 py-10">
          <div className="max-w-6xl mx-auto mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-[#03e312]/10 text-gray-700 dark:text-gray-300 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Home
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-8 text-black dark:text-white text-center">
            Semua Berita
          </h1>

          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03e312] dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {filteredNews.length === 0 ? (
                <p className="text-center text-gray-500">
                  Tidak ada berita ditemukan.
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.map((item) => (
                    <Link
                      key={item.id}
                      to={`/berita/${item.id}`}
                      className="group block bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all overflow-hidden"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={item.image_url || "https://picsum.photos/500/300"}
                          alt={item.title}
                          className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <span className="bg-[#03e312] text-white text-xs px-2 py-1 rounded mb-2 inline-block">
                          {getKategoriName(item.category_id)}
                        </span>
                        <h3 className="text-base font-semibold leading-snug text-black dark:text-white group-hover:text-[#03e312] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <div className="flex items-center mt-3 text-xs text-gray-600 dark:text-gray-300 gap-4">
                          <span className="flex items-center gap-1">
                            <i className="ri-user-line text-[#03e312]"></i>{" "}
                            {item.author || "Redaksi"}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-calendar-line text-[#03e312]"></i>{" "}
                            {new Date(item.created_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Sidebar />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
