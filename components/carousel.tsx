"use client";

import { useRef } from "react";
import { MediaPlaceholder } from "./media-placeholder";
import { SplitText } from "./split-text";
import type { GalleryItem } from "@/lib/cms/types";

interface CarouselProps {
  title?: string;
  items: GalleryItem[];
}

export function Carousel({
  title = "Imagens da *memória*",
  items,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (!items || items.length === 0) return null;

  const handleScroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return;
    const itemWidth = (track.firstElementChild as HTMLElement).offsetWidth;
    track.scrollBy({
      left: direction * itemWidth * 1.05,
      behavior: "smooth",
    });
  };

  return (
    <section className="carousel" aria-label="Galeria de fotos">
      <div className="carousel__head">
        <div>
          <p className="eyebrow rv">Galeria</p>
          <h2 className="split">
            <SplitText text={title} />
          </h2>
        </div>
        <div className="carousel__btns">
          <button
            type="button"
            onClick={() => handleScroll(-1)}
            aria-label="Foto anterior"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => handleScroll(1)}
            aria-label="Próxima foto"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="track"
        tabIndex={0}
        aria-label="Fotos do carrossel"
      >
        {items.map((item, i) => (
          <figure
            key={i}
            className="rv"
            style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
          >
            <MediaPlaceholder image={item.image} alt={item.caption} seed={i} />
            {item.caption && (
              <figcaption>
                <span>{item.caption}</span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
