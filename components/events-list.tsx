"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Evento } from "@/lib/cms/types";

interface EventsListProps {
  eventos: Evento[];
}

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    const [year, month, day] = iso.split("-");
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const monthName = months[parseInt(month, 10) - 1] || month;
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  } catch {
    return iso;
  }
}

export function EventsList({ eventos }: EventsListProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = previewRef.current;
    if (!prev || !window.matchMedia("(hover: hover)").matches) return;

    let x = 0,
      y = 0,
      px = 0,
      py = 0;
    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    window.addEventListener("pointermove", onPointerMove);

    const loop = () => {
      px += (x - px) * 0.15;
      py += (y - py) * 0.15;
      prev.style.transform = `translate3d(${px + 24}px, ${py - 140}px, 0)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMouseEnter = (imgUrl: string | undefined, index: number) => {
    const prev = previewRef.current;
    if (!prev) return;
    const colors = ["#A9502B", "#23324A", "#C8923A", "#6B3F26"];
    prev.style.setProperty("--c1", colors[index % colors.length]);
    prev.style.setProperty("--img", imgUrl ? `url("${imgUrl}")` : "");
    prev.classList.add("on");
  };

  const handleMouseLeave = () => {
    const prev = previewRef.current;
    if (!prev) return;
    prev.classList.remove("on");
  };

  return (
    <>
      <ul className="events">
        {eventos.map((ev, i) => (
          <li
            key={ev._id}
            className="ev rv in"
            style={{ "--d": `${Math.min(i, 6) * 0.06}s` } as React.CSSProperties}
            onMouseEnter={() => handleMouseEnter(ev.coverImage?.url, i)}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={`/eventos/${ev.slug}`}>
              <time dateTime={ev.data}>{formatDate(ev.data)}</time>
              <h2>{ev.title}</h2>
              <span>{ev.local || "Ver evento"} →</span>
            </Link>
          </li>
        ))}
      </ul>

      {eventos.length === 0 && (
        <p className="people__empty">Nenhum evento publicado ainda.</p>
      )}

      <div ref={previewRef} className="ev-preview ph" aria-hidden="true" />
    </>
  );
}
