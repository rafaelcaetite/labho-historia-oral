import React from "react";
import Image from "next/image";
import type { CmsImage } from "@/lib/cms/types";

const PALETTE = [
  ["#9C5A36", "#2A1911"],
  ["#23324A", "#0E1420"],
  ["#C8923A", "#3A2610"],
  ["#6B3F26", "#170E09"],
  ["#4E5A3A", "#1A1F12"],
  ["#A9502B", "#2B150B"],
];

interface MediaPlaceholderProps {
  image?: CmsImage | string | null;
  alt?: string;
  tag?: string;
  seed?: number;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
  priority?: boolean;
}

export function MediaPlaceholder({
  image,
  alt = "",
  tag,
  seed = 0,
  className = "",
  style,
  aspectRatio,
  priority = false,
}: MediaPlaceholderProps) {
  const c = PALETTE[Math.abs(seed) % PALETTE.length];
  const imageUrl = typeof image === "string" ? image : image?.url;
  const imageAlt = typeof image === "string" ? alt : image?.alt || alt;

  const inlineStyle: React.CSSProperties = {
    "--c1": c[0],
    "--c2": c[1],
    ...(aspectRatio ? { aspectRatio } : {}),
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`ph ${className}`} style={inlineStyle}>
      {imageUrl && imageUrl.trim().length > 0 && (
        <Image
          src={imageUrl}
          alt={imageAlt || "Imagem do LabHO"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      )}
      {tag && <span className="ph__tag">{tag}</span>}
    </div>
  );
}
