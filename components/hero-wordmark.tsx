"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface HeroWordmarkProps {
  lines?: string[];
}

export function HeroWordmark({
  lines = ["Laboratório de", "História Oral"],
}: HeroWordmarkProps) {
  const heroRef = useRef<HTMLElement>(null);
  const wmRef = useRef<HTMLHeadingElement>(null);
  const scrollBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const wm = wmRef.current;
    const scrollBtn = scrollBtnRef.current;
    const nav = document.getElementById("nav");
    const navWm = nav?.querySelector(".nav__wm") as HTMLElement | null;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktop = window.matchMedia("(min-width: 961px)");

    const updateScrollIndicator = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const opacity = Math.max(0, 1 - y / 140);
      if (scrollBtn) {
        scrollBtn.style.opacity = String(opacity);
        scrollBtn.style.pointerEvents = opacity <= 0.05 ? "none" : "auto";
      }
    };

    if (!hero || !wm || !nav || prefersReducedMotion) {
      nav?.classList.add("wm-on");
      updateScrollIndicator();
      window.addEventListener("scroll", updateScrollIndicator, { passive: true });
      return () => {
        window.removeEventListener("scroll", updateScrollIndicator);
      };
    }

    let sEnd = 0.3;
    const measure = () => {
      if (navWm && wm) {
        sEnd = navWm.offsetWidth / wm.offsetWidth || 0.3;
      }
    };

    const update = () => {
      updateScrollIndicator();

      if (!desktop.matches) {
        wm.classList.remove("is-fixed", "is-gone");
        nav.classList.add("wm-on");
        return;
      }

      const top0 = parseFloat(getComputedStyle(nav).top) || 0;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const t = Math.min(
        1,
        Math.max(0, 1 - (heroBottom - top0) / hero.offsetHeight),
      );
      const navH = nav.offsetHeight;

      wm.classList.add("is-fixed");
      wm.style.setProperty(
        "--y",
        `${(top0 + Math.max(heroBottom, top0)) / 2 + (navH / 2) * t}px`,
      );
      wm.style.setProperty("--s", (1 + (sEnd - 1) * t).toFixed(4));
      wm.classList.toggle("is-gone", t >= 1);
      nav.classList.toggle("wm-on", t >= 1);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      update();
    });

    if (document.fonts) {
      document.fonts.ready.then(() => {
        measure();
        update();
      });
    }

    measure();
    update();

    return () => {
      window.removeEventListener("scroll", update);
      nav.classList.remove("wm-on");
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.querySelector(".intro") as HTMLElement | null;
    if (nextSection) {
      const nav = document.getElementById("nav");
      const navH = nav?.offsetHeight || 60;
      const targetY = nextSection.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  let globalIndex = 0;

  return (
    <section ref={heroRef} className="hero" aria-label="Laboratório de História Oral">
      <a
        className="hero__logo"
        href="https://www.ufv.br/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="UFV — 100 anos, 1926–2026"
      >
        <Image
          src="/img/ufv100-branco.png"
          width={1168}
          height={509}
          alt="UFV — 100 anos, 1926–2026"
          priority
          style={{ width: "auto", height: "clamp(40px, 4.4vw, 68px)" }}
        />
      </a>

      <h1 ref={wmRef} className="hero__wm" data-wm aria-label={lines.join(" ")}>
        {lines.map((line, lineIdx) => (
          <span key={lineIdx} className="wm__line" aria-hidden="true">
            {Array.from(line).map((char, charIdx) => {
              if (char === " ") {
                return (
                  <span key={charIdx} className="l sp">
                    {" "}
                  </span>
                );
              }
              const currentIndex = globalIndex++;
              return (
                <span
                  key={charIdx}
                  className="l"
                  style={{ "--i": currentIndex } as React.CSSProperties}
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </h1>

      <button
        ref={scrollBtnRef}
        type="button"
        onClick={handleScrollDown}
        className="hero__scroll"
        aria-label="Rolar para o conteúdo"
      >
        <span className="hero__scroll-label">Role</span>
        <span className="hero__scroll-icon" aria-hidden="true">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path
              d="M5 1V10.5M5 10.5L1.5 7M5 10.5L8.5 7"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </section>
  );
}
