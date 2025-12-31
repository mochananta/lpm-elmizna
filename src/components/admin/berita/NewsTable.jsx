import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function NewsTable({ data, onRefresh }) {
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from("kategori").select("*");
      setCategories(data || []);
    }
    fetchCategories();
  }, []);

  async function handleDelete(id) {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      await supabase.from("berita").delete().eq("id", id);
      onRefresh();
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setSaving(true);

    const formattedContent = editData.content
      .split("\n")
      .filter(line => line.trim() !== "")
      .map(line => `<p>${line}</p>`)
      .join("");

    const { error } = await supabase
      .from("berita")
      .update({
        title: editData.title,
        author: editData.author,
        category_id: editData.category_id,
        content: formattedContent,
      })
      .eq("id", editData.id);

    setSaving(false);

    if (error) {
      alert("Gagal update berita: " + error.message);
    } else {
      setEditData(null);
      onRefresh();
    }
  }

  return (
    <>
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
                <td className="p-2">
                  {categories.find((c) => c.id === item.category_id)?.name || "-"}
                </td>
                <td className="p-2 space-x-3">
                  <button
                    onClick={() =>
                      setEditData({
                        ...item,
                        content: item.content
                          ?.replace(/<\/p>/g, "\n\n")
                          .replace(/<[^>]+>/g, "")
                          .trim(),
                      })
                    }
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL EDIT ================= */}
      {editData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-xl p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-[#167c48]">
              Edit Berita
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                placeholder="Judul"
              />

              <input
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700"
                value={editData.author}
                onChange={(e) =>
                  setEditData({ ...editData, author: e.target.value })
                }
                placeholder="Penulis"
              />

              <select
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700"
                value={editData.category_id}
                onChange={(e) =>
                  setEditData({ ...editData, category_id: e.target.value })
                }
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <textarea
                rows="5"
                className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700"
                value={editData.content}
                onChange={(e) =>
                  setEditData({ ...editData, content: e.target.value })
                }
                placeholder="Isi berita..."
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditData(null)}
                  className="px-4 py-2 border rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#167c48] text-white rounded disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
