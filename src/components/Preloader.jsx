import React, { useEffect } from "react";

export default function Preloader() {
  useEffect(() => {
    function onLoad() {
      const preloader = document.getElementById("preloader");
      if (!preloader) return;
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 500);
    }
    window.addEventListener("load", onLoad);
    if (document.readyState === "complete") onLoad();
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div
      id="preloader"
      className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-[9999] transition-opacity duration-500"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#167c48] border-t-transparent" />
    </div>
  );
}
