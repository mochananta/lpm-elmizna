import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breakingnews from "../components/Breakingnews";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [query]);

  async function fetchResults() {
    if (!query) return;
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .ilike("title", `%${query}%`)
      .order("created_at", { ascending: false });

    if (error) console.error("Gagal ambil hasil pencarian:", error.message);
    else setResults(data);

    setLoading(false);
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Memuat hasil pencarian...
      </div>
    );

  return (
    <>
      <Preloader />
      <Breakingnews />
      <Header />

      <div className="bg-gray-50 dark:bg-black">
        <section className="container mx-auto px-6 md:px-10 py-10">
          <h1 className="text-3xl font-bold mb-8 text-black dark:text-white text-center">
            Hasil Pencarian untuk:{" "}
            <span className="text-[#167c48]">“{query}”</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {results.length === 0 ? (
                <p className="text-center text-gray-500">
                  Tidak ada berita ditemukan.
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((item) => (
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
