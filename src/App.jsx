import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import BeritaDetail from "./pages/BeritaDetail";
import AllNews from "./pages/AllNews.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import Redaksi from "./pages/Redaksi.jsx";
import Kontak from "./pages/Kontak.jsx";


function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    }
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) setUser(null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-700 dark:text-gray-300">
        Memeriksa sesi login...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/berita" element={<AllNews />} />
        <Route path="/redaksi" element={<Redaksi />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
