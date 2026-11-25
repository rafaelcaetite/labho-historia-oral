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
  const bandRef = useRef<HTMLDivElement>(null);
  const scrollBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const wm = wmRef.current;
    const band = bandRef.current;
    const scrollBtn = scrollBtnRef.current;
    const nav = document.getElementById("nav");
    const navWm = nav?.querySelector(".nav__wm") as HTMLElement | null;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // atributo, e não classe: o React reescreve o className do Nav e apagaria a classe
    const desktop = window.matchMedia("(min-width: 961px)");

    const updateScrollIndicator = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const opacity = Math.max(0, 1 - y / 140);
      if (scrollBtn) {
        scrollBtn.style.opacity = String(opacity);
        scrollBtn.style.pointerEvents = opacity <= 0.05 ? "none" : "auto";
      }
    };

    if (!hero || !wm || !band || !nav || prefersReducedMotion) {
      nav?.setAttribute("data-wm-on", "");
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
        nav.setAttribute("data-wm-on", "");
        return;
      }

      const top0 = parseFloat(getComputedStyle(nav).top) || 0;
      // o wordmark fica no centro da faixa até ela encontrar o centro do cabeçalho
      const navCenter = top0 + nav.offsetHeight / 2;
      const heroRect = hero.getBoundingClientRect();
      const bandCenter = heroRect.bottom - band.offsetHeight / 2;
      const travel = heroRect.height - band.offsetHeight / 2 - navCenter;
      const t = Math.min(1, Math.max(0, 1 - (bandCenter - navCenter) / travel));

      wm.classList.add("is-fixed");
      wm.style.setProperty("--y", `${Math.max(bandCenter, navCenter)}px`);
      wm.style.setProperty("--s", (1 + (sEnd - 1) * t).toFixed(4));
      wm.classList.toggle("is-gone", t >= 1);
      nav.toggleAttribute("data-wm-on", t >= 1);
    };

    window.addEventListener("scroll", update, { passive: true });
    const onResize = () => {
      measure();
      update();
    };
    window.addEventListener("resize", onResize);

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
      window.removeEventListener("resize", onResize);
      nav.removeAttribute("data-wm-on");
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
      <div className="hero__art">
        <Image
          src="/img/banner-labho.jpg"
          alt="Pintura do Laboratório de História Oral: pessoas de gerações diferentes reunidas em torno da escuta e da memória"
          fill
          priority
          sizes="100vw"
        />
        <span className="hero__light" aria-hidden="true" />
        <Image className="hero__logo" src="/img/logo-dlhi.svg" alt="dlhi" width={1453} height={698} priority unoptimized />
      </div>

      <div ref={bandRef} className="hero__band">
      <h1 ref={wmRef} className="hero__wm" data-wm aria-label={lines.join(" ")}>
        {lines.map((line, lineIdx) => (
          <span key={lineIdx} className="wm__line" aria-hidden="true">
            {line.trim().split(/\s+/).map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="l"
                style={{ "--i": globalIndex++ } as React.CSSProperties}
              >
                {word}
              </span>
            ))}
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
      </div>
    </section>
  );
}
