import React from "react";
import { supabase } from "../../../lib/supabase";

export default function CategoryTable({ data, onRefresh }) {
  async function handleDelete(id) {
    if (confirm("Yakin ingin menghapus kategori ini?")) {
      const { error } = await supabase.from("kategori").delete().eq("id", id);
      if (error) alert("Gagal hapus kategori: " + error.message);
      else onRefresh();
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-left">
            <th className="p-2">Nama</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cat) => (
            <tr key={cat.id} className="border-b dark:border-gray-700">
              <td className="p-2">{cat.name}</td>
                  <td className="p-2">
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="3" className="p-3 text-center text-gray-500">
                Belum ada kategori.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
