"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll() {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  useEffect(() => {
    if (isStudio) {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let lenis: Lenis | null = null;
    let rafId: number;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // Revelações em scroll (.rv, .split). Atributo, não classe: o React não apaga ao reconciliar className.
    // MutationObserver pega o conteúdo que entra numa navegação client-side.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const observeElements = () => {
      document.querySelectorAll(".rv:not([data-in]), .split:not([data-in])").forEach((el) => {
        observer.observe(el);
      });
    };

    observeElements();
    const mutations = new MutationObserver(observeElements);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [isStudio]);

  if (isStudio) {
    return null;
  }

  return null;
}
