import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import NewsForm from "../components/admin/berita/NewsForm";
import NewsTable from "../components/admin/berita/NewsTable";
import CategoryForm from "../components/admin/kategori/CategoryForm";
import CategoryTable from "../components/admin/kategori/CategoryTable";

export default function AdminDashboard() {
  const [berita, setBerita] = useState([]);
  const [kategori, setKategori] = useState([]);

  async function fetchData() {
    const { data: beritaData } = await supabase
      .from("berita")
      .select("*")
      .order("id", { ascending: false });

    const { data: kategoriData } = await supabase
      .from("kategori")
      .select("*")
      .order("id", { ascending: false });

    setBerita(beritaData || []);
    setKategori(kategoriData || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#167c48]">Dashboard Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Manajemen Kategori</h2>
        <CategoryForm onRefresh={fetchData} />
        <CategoryTable data={kategori} onRefresh={fetchData} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Manajemen Berita</h2>
        <NewsForm onRefresh={fetchData} />
        <NewsTable data={berita} onRefresh={fetchData} />
      </section>
    </div>
  );
}