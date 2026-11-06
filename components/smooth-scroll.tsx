"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
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

    // Revelações em scroll (.rv, .split)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const observeElements = () => {
      document.querySelectorAll(".rv, .split").forEach((el) => {
        observer.observe(el);
      });
    };

    observeElements();
    const timeout = setTimeout(observeElements, 500);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
