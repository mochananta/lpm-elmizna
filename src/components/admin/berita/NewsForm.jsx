import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function NewsForm({ onRefresh }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category_id: "",
    content: "",
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from("kategori").select("*");
      if (!error) setCategories(data);
    }
    fetchCategories();
  }, []);

  async function uploadImage(file) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('berita-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('berita-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      alert("Gagal upload gambar: " + error.message);
      return null;
    }
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const formattedContent = form.content
      .split("\n")
      .filter(line => line.trim() !== "")
      .map(line => `<p>${line}</p>`)
      .join("");

    const { error } = await supabase.from("berita").insert([
      {
        ...form,
        content: formattedContent,
        image_url: imageUrl,
      },
    ]);

    setUploading(false);

    if (error) {
      alert("Gagal menambah berita: " + error.message);
    } else {
      setForm({
        title: "",
        author: "",
        category_id: "",
        content: "",
      });
      setImageFile(null);
      onRefresh();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6"
    >
      <h2 className="text-xl font-bold mb-4 text-[#167c48]">Tambah Berita</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="Judul"
          className="border p-2 rounded bg-gray-50 dark:bg-gray-700"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Penulis"
          className="border p-2 rounded bg-gray-50 dark:bg-gray-700"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <select
          className="border p-2 rounded bg-gray-50 dark:bg-gray-700"
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          className="border p-2 rounded bg-gray-50 dark:bg-gray-700 w-full"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <p className="text-xs text-gray-500 mt-1">
          Rekomendasi: gambar landscape rasio <b>16:9</b> (contoh: <b>1920×1080 px</b>)
        </p>
      </div>

      <textarea
        placeholder="Isi berita..."
        className="w-full border p-2 rounded mt-4 bg-gray-50 dark:bg-gray-700"
        rows="6"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      <p className="text-xs text-gray-500 mt-2 leading-relaxed">
        Gunakan <b>Enter 1×</b> untuk membuat paragraf baru.
        <br />
        <span className="italic">
          Contoh:
          <br />
          Lorem ipsum dolor sit amet consectetur adipis Quisque faucibus.
          <br />
          Lorem ipsum dolor sit amet consectetur adipiscing elit.<br />
          Lorem ipsum dolor sit amet consectetur adipis Quisque faucibus.
          <br />
        </span>
      </p>

      <button
        type="submit"
        disabled={uploading}
        className="mt-4 px-4 py-2 bg-[#167c48] text-white rounded font-semibold hover:bg-[#02c10f] transition disabled:opacity-50"
      >
        {uploading ? "Mengunggah..." : "Simpan"}
      </button>
    </form>
  );
}
