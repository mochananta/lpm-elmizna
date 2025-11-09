import React, { useEffect, useState } from "react";
import { supabase } from "./../lib/supabase";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [sidePosts, setSidePosts] = useState([]);
  const [active, setActive] = useState(0);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchBerita();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, [slides]);

  async function fetchCategories() {
    const { data, error } = await supabase.from("kategori").select("id, name");
    if (error) console.error("Gagal ambil kategori:", error);
    else {
      const map = {};
      data.forEach((cat) => (map[cat.id] = cat.name));
      setCategories(map);
    }
  }

  async function fetchBerita() {
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Gagal mengambil berita:", error.message);
      return;
    }

    setSlides(data.slice(0, 3));
    setSidePosts(data.slice(3, 5));
  }

  function getKategoriName(id) {
    return categories[id] || "Umum";
  }

  return (
    <section className="container mx-auto px-6 mt-10 grid lg:grid-cols-3 gap-6">
      <div className="relative lg:col-span-2 rounded-2xl overflow-hidden shadow-lg h-[400px]">
        {slides.length === 0 ? (
          <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            Tidak ada berita terbaru
          </div>
        ) : (
          slides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={s.image_url}
                className="w-full h-[400px] object-cover"
                alt={s.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="bg-[#03e312] text-xs font-semibold uppercase px-2 py-1 rounded">
                    {getKategoriName(s.category_id)}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mt-3 leading-tight">
                    {s.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-white mt-2">
                    <i className="ri-user-line text-[#03e312]"></i>
                    <span className="opacity-90">{s.author}</span>
                    <i className="ri-calendar-line text-[#03e312] ml-3"></i>
                    <span className="opacity-90">
                      {new Date(s.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setActive(i)}
                className={`cursor-pointer w-3 h-3 rounded-full ${
                  i === active ? "bg-[#03e312]" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {sidePosts.length === 0 ? (
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-gray-600 dark:text-gray-300 h-[400px]">
            Tidak ada berita tambahan
          </div>
        ) : (
          sidePosts.map((p) => (
            <article
              key={p.id}
              className="relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 group"
            >
              <img
                src={p.image_url}
                className="w-full h-[190px] object-cover group-hover:scale-110 transition duration-700"
                alt={p.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="bg-[#03e312] text-xs font-semibold uppercase px-2 py-1 rounded">
                    {getKategoriName(p.category_id)}
                  </span>
                  <h3 className="font-bold text-lg mt-2 leading-snug">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-200 mt-1">
                    <i className="ri-user-line text-[#03e312]"></i> {p.author}
                    <i className="ri-calendar-line text-[#03e312] ml-2"></i>{" "}
                    {new Date(p.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
