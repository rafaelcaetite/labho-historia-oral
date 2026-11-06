"use client";

import { useEffect } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export function StudioClient() {
  useEffect(() => {
    // Garante que o Lenis e qualquer interferência de scroll estejam desativados no Studio
    document.documentElement.classList.remove("lenis", "lenis-smooth");
  }, []);

  return (
    <div
      data-lenis-prevent
      style={{
        height: "100vh",
        maxHeight: "100dvh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <NextStudio config={config} />
    </div>
  );
}
