"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { mountVoices } from "@/lib/scene";
import type { VozDestaque } from "@/lib/cms/types";

interface VoicesSectionProps {
  title?: string;
  hint?: string;
  vozes: VozDestaque[];
}

export function VoicesSection({
  title = "Quem conta, *faz história.*",
  hint = "Role para ouvir · clique em alguém",
  vozes,
}: VoicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    if (!stage || !section || vozes.length === 0) return;

    let current = 0;

    const dispose = mountVoices({
      stage,
      section,
      vozes,
      onActive: (i) => {
        current = i;
        setActiveIndex(i);
      },
      onPick: (i, scrollYTarget) => {
        if (i === current && vozes[i]?.url) {
          router.push(vozes[i].url);
        } else {
          window.scrollTo({ top: scrollYTarget, behavior: "smooth" });
        }
      },
    });

    return () => {
      dispose();
    };
  }, [vozes, router]);

  if (vozes.length === 0) return null;

  const currentDisplay = String(activeIndex + 1).padStart(2, "0");
  const totalDisplay = String(vozes.length).padStart(2, "0");

  return (
    <section ref={sectionRef} className="voices" aria-label="Vozes do acervo">
      <div ref={stageRef} className="voices__stage">
        <div className="voices__head">
          <h2 className="voices__title">
            Quem conta, <em>faz história.</em>
          </h2>
          <div className="voices__count">
            <span>{currentDisplay}</span> / {totalDisplay}
            <small>Vozes do acervo</small>
          </div>
        </div>
        <p className="voices__hint">
          {hint.replace("clique", "")}
          <span className="on-hover">clique</span>
          <span className="on-touch">toque</span> em alguém
        </p>
        <div className="voices__bar">
          <i />
        </div>
      </div>
    </section>
  );
}
