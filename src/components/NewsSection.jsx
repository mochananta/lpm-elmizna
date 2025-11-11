import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export default function NewsSection() {
  const [beritaOpini, setBeritaOpini] = useState([]);
  const [beritaTerbaru, setBeritaTerbaru] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (Object.keys(categories).length > 0) {
      fetchNews();
    }
  }, [categories]);

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

  async function fetchNews() {
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal memuat berita:", error.message);
      return;
    }

    const opiniOnly = data.filter(
      (item) =>
        categories[item.category_id]?.toLowerCase() === "opini"
    );

    setBeritaOpini(opiniOnly.slice(0, 6)); 
    setBeritaTerbaru(data.slice(0, 6)); 
    setLoading(false);
  }

  function getKategoriName(id) {
    return categories[id] || "Umum";
  }

  if (loading) {
    return <p className="text-center text-gray-500 py-10">Memuat berita...</p>;
  }

  return (
    <div>
      {/* BERITA OPINI */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-bold tracking-wide text-black dark:text-white uppercase">
            Berita Opini
          </h2>
          <Link
            to="/berita?kategori=opini"
            className="text-[#167c48] text-sm font-medium hover:text-[#03e312] transition-all duration-300"
          >
            View All
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beritaOpini.length === 0 ? (
            <p className="text-gray-500">Belum ada berita opini.</p>
          ) : (
            beritaOpini.map((item) => (
              <Link
                key={item.id}
                to={`/berita/${item.id}`}
                className="group block bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image_url || "https://picsum.photos/500/300"}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="bg-[#167c48] text-white text-xs px-2 py-1 rounded mb-2 inline-block">
                    {getKategoriName(item.category_id)}
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-black dark:text-white group-hover:text-[#167c48] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex items-center mt-3 text-xs text-gray-600 dark:text-gray-300 gap-4">
                    <span className="flex items-center gap-1">
                      <i className="ri-user-line text-[#167c48]"></i>{" "}
                      {item.author || "Redaksi"}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-calendar-line text-[#167c48]"></i>{" "}
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* BERITA TERBARU */}
      <section className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-bold tracking-wide text-black dark:text-white uppercase">
            Berita Terbaru
          </h2>
          <Link
            to="/berita"
            className="text-[#167c48] text-sm font-medium hover:text-[#03e312] transition-all duration-300"
          >
            View All
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {beritaTerbaru.length === 0 ? (
            <p className="text-gray-500">Belum ada berita terbaru.</p>
          ) : (
            beritaTerbaru.map((item) => (
              <Link
                key={item.id}
                to={`/berita/${item.id}`}
                className="group block bg-white dark:bg-black rounded-xl shadow hover:shadow-md transition p-4"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-lg mb-3">
                  <img
                    src={item.image_url || "https://picsum.photos/800/450"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={item.title}
                  />
                </div>
                <span className="bg-[#167c48] text-white text-xs px-2 py-1 rounded">
                  {getKategoriName(item.category_id)}
                </span>
                <h3 className="font-bold text-lg mt-2 text-black dark:text-white group-hover:text-[#167c48] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                  {item.content || "Belum ada deskripsi."}
                </p>
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-3 gap-4">
                  <span className="flex items-center gap-1">
                    <i className="ri-user-line text-[#167c48]"></i>{" "}
                    {item.author || "Redaksi"}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-calendar-line text-[#167c48]"></i>{" "}
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
