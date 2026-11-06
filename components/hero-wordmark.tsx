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

  useEffect(() => {
    const hero = heroRef.current;
    const wm = wmRef.current;
    const nav = document.getElementById("nav");
    const navWm = nav?.querySelector(".nav__wm") as HTMLElement | null;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktop = window.matchMedia("(min-width: 961px)");

    if (!hero || !wm || !nav || prefersReducedMotion) {
      nav?.classList.add("wm-on");
      return;
    }

    let sEnd = 0.3;
    const measure = () => {
      if (navWm && wm) {
        sEnd = navWm.offsetWidth / wm.offsetWidth || 0.3;
      }
    };

    const update = () => {
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
    </section>
  );
}
