import React, { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function CategoryForm({ onRefresh }) {
  const [form, setForm] = useState({ name: ""});

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from("kategori").insert([form]);
    if (error) alert("Gagal menambah kategori: " + error.message);
    else {
      setForm({ name: ""});
      onRefresh();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4"
    >
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Nama kategori"
          className="border p-2 flex-1 rounded bg-gray-50 dark:bg-gray-700"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value.toLowerCase().replace(/\s+/g, "-") })
          }
        />
        <button
          type="submit"
          className="bg-[#167c48] text-white px-4 py-2 rounded font-semibold hover:bg-[#02c10f]"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
