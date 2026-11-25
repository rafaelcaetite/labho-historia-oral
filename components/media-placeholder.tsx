import React from "react";
import Image from "next/image";
import type { CmsImage } from "@/lib/cms/types";

const PALETTE = [
  ["#B3160C", "#3A0805"],
  ["#1E4FC4", "#0B1440"],
  ["#E8A21C", "#4A2E05"],
  ["#1F7A34", "#0A2A12"],
  ["#F3731B", "#0B1440"],
  ["#6E1010", "#0B1440"],
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
