import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breakingnews from "../components/Breakingnews";

export default function BeritaDetail() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBerita();
    window.scrollTo(0, 0);
  }, [id]);

  async function fetchBerita() {
    const { data, error } = await supabase
      .from("berita")
      .select("*, kategori:category_id(name)")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Gagal ambil berita:", error.message);
      setLoading(false);
      return;
    }

    setBerita(data);

    if (data?.view_count !== undefined) {
      const { error: updateError } = await supabase
        .from("berita")
        .update({ view_count: data.view_count + 1 })
        .eq("id", id);

      if (updateError) {
        console.error("❌ Gagal update view_count:", updateError.message);
      } else {
        console.log("✅ View count bertambah");
      }
    }

    if (data?.category_id) {
      const { data: relatedData, error: relErr } = await supabase
        .from("berita")
        .select("id, title, image_url, author, created_at")
        .eq("category_id", data.category_id)
        .neq("id", id)
        .order("created_at", { ascending: false })
        .limit(6);

      if (relErr) console.error("Gagal ambil artikel terkait:", relErr.message);
      else setRelated(relatedData || []);
    }

    setLoading(false);
  }


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Memuat berita...
      </div>
    );

  if (!berita)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Berita tidak ditemukan.
      </div>
    );

  return (
    <>
      <Preloader />
      <Breakingnews />
      <Header />

      <section className="relative w-full aspect-video overflow-hidden">
        <img
          src={berita.image_url}
          alt={berita.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

        <div className="absolute bottom-6 md:bottom-10 left-4 md:left-16 text-white max-w-3xl">
          <span className="bg-[#167c48] text-xs uppercase px-3 py-1 rounded-full">
            {berita.kategori?.name}
          </span>

          <h1 className="text-2xl md:text-5xl font-bold mt-4 leading-snug">
            {berita.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200 mt-3">
            <span className="flex items-center gap-1">
              <i className="ri-user-line text-[#167c48]"></i> {berita.author}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-calendar-line text-[#167c48]"></i>{" "}
              {new Date(berita.created_at).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-eye-line text-[#167c48]"></i>{" "}
              {berita.view_count || 0}x view
            </span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 md:px-10 py-12 grid lg:grid-cols-3 gap-10">
        <article className="lg:col-span-2">
          <div
            className="prose dark:prose-invert max-w-none prose-lg leading-relaxed mb-10"
            dangerouslySetInnerHTML={{ __html: berita.content }}
          ></div>

          {related.length > 0 && (
            <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h3 className="text-xl font-bold mb-6 text-black dark:text-white">
                Artikel Terkait
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((item) => (
                  <Link
                    to={`/berita/${item.id}`}
                    key={item.id}
                    className="rounded-xl overflow-hidden shadow hover:shadow-lg transition group"
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-black dark:text-white group-hover:text-[#167c48] transition-colors">
                        {item.title.length > 80
                          ? item.title.slice(0, 80) + "..."
                          : item.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-2 gap-3">
                        <span className="flex items-center gap-1">
                          <i className="ri-user-line text-[#167c48]"></i>{" "}
                          {item.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-calendar-line text-[#167c48]"></i>{" "}
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
            </div>
          )}
        </article>

        <Sidebar />
      </main>

      <Footer />
    </>
  );
}
