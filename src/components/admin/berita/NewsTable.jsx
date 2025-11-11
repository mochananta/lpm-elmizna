import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function NewsTable({ data, onRefresh }) {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from("kategori").select("*");
      const map = {};
      data.forEach((c) => (map[c.id] = c.name));
      setCategories(map);
    }
    fetchCategories();
  }, []);

  async function handleDelete(id) {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      await supabase.from("berita").delete().eq("id", id);
      onRefresh();
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-[#167c48]">Daftar Berita</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-left">
            <th className="p-2">Judul</th>
            <th className="p-2">Penulis</th>
            <th className="p-2">Kategori</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b dark:border-gray-700">
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.author}</td>
              <td className="p-2">{categories[item.category_id] || "-"}</td>
              <td className="p-2">
                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
