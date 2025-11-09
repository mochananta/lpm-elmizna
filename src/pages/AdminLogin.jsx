import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    else window.location.href = "/admin/dashboard";
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-[#03e312]">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded bg-gray-50 dark:bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded bg-gray-50 dark:bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#03e312] text-white py-2 rounded font-semibold hover:bg-[#02c10f]"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
