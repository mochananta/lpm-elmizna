import React from "react";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import NewsSection from "../components/NewsSection";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breakingnews from "../components/Breakingnews";

export default function Home() {
  return (
    <>
      <Preloader />
      <Breakingnews />
      <Header />
      <HeroSlider />
      <main className="container mx-auto px-6 mt-10 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <NewsSection />
        </div>
        <Sidebar />
      </main>
      <Footer />
    </>
  );
}
