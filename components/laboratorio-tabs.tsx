"use client";

import { useEffect, useState } from "react";
import { MediaPlaceholder } from "./media-placeholder";
import type { GalleryItem, Producao } from "@/lib/cms/types";

interface LaboratorioTabsProps {
  bodyText: string;
  gallery: GalleryItem[];
  producoesIntro: string;
  producoes: Producao[];
}

export function LaboratorioTabs({
  bodyText,
  gallery,
  producoesIntro,
  producoes,
}: LaboratorioTabsProps) {
  const [activeTab, setActiveTab] = useState<"quem-somos" | "producoes">(
    "quem-somos",
  );

  useEffect(() => {
    if (window.location.hash === "#producoes") {
      setActiveTab("producoes");
    }
  }, []);

  return (
    <div data-tabs>
      <nav className="tabs" aria-label="Seções Sobre">
        <button
          type="button"
          onClick={() => setActiveTab("quem-somos")}
          aria-current={activeTab === "quem-somos" ? "page" : undefined}
        >
          Quem somos
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("producoes")}
          aria-current={activeTab === "producoes" ? "page" : undefined}
        >
          Produções ({producoes.length})
        </button>
      </nav>

      {activeTab === "quem-somos" && (
        <div id="quem-somos">
          <section className="prose">
            <p className="eyebrow rv">Apresentação</p>
            <div className="prose__body rv">
              {bodyText.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {gallery && gallery.length > 0 && (
            <div>
              <h2 className="sec-title rv">Galeria</h2>
              <div className="gallery">
                {gallery.map((item, i) => (
                  <MediaPlaceholder
                    key={i}
                    image={item.image}
                    alt={item.caption}
                    tag={item.caption}
                    seed={i}
                    className="rv"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "producoes" && (
        <div id="producoes">
          <section className="prose">
            <p className="eyebrow rv">Produções</p>
            <div className="prose__body rv">
              <p>{producoesIntro}</p>
            </div>
          </section>

          <ul className="prods">
            {producoes.map((p, i) => (
              <li
                key={p._id}
                className="prod rv in"
                style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}
              >
                <MediaPlaceholder image={p.coverImage} alt={p.title} seed={i} />
                <span className="pill">{p.tipo || "Produção"}</span>
                <h3>{p.title}</h3>
                {p.excerpt && <p>{p.excerpt}</p>}
                {p.url && (
                  <a
                    className="link"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar ↗
                  </a>
                )}
              </li>
            ))}
          </ul>

          {producoes.length === 0 && (
            <p className="people__empty">Em breve.</p>
          )}
        </div>
      )}
    </div>
  );
}
