"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function CustomCursor() {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStudio) return;

    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!isFinePointer) return;

    const el = cursorRef.current;
    if (!el) return;

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;
    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest("a, button, input, select, textarea, [data-yt]"),
      );
      el.classList.toggle("big", isInteractive);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("mouseover", onMouseOver);

    const loop = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isStudio]);

  if (isStudio) {
    return null;
  }

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />;
}
