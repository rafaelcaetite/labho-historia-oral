"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MediaPlaceholder } from "./media-placeholder";
import type { Entrevista, GalleryItem } from "@/lib/cms/types";

interface ProjectTabsProps {
  bodyText: string;
  gallery: GalleryItem[];
  entrevistas: Entrevista[];
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const normalizeText = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function ProjectTabs({
  bodyText,
  gallery,
  entrevistas,
}: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState<"apresentacao" | "entrevistas">(
    "apresentacao",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("");

  useEffect(() => {
    if (window.location.hash === "#entrevistas") {
      setActiveTab("entrevistas");
    }
  }, []);

  const availableLetters = new Set<string>();
  entrevistas.forEach((e) => {
    const norm = normalizeText(e.title);
    if (norm.length > 0) {
      availableLetters.add(norm[0].toUpperCase());
    }
  });

  const filteredEntrevistas = entrevistas.filter((e) => {
    const norm = normalizeText(e.title);
    const matchesQuery = norm.includes(normalizeText(searchQuery.trim()));
    const matchesLetter =
      !selectedLetter || norm.startsWith(selectedLetter.toLowerCase());
    return matchesQuery && matchesLetter;
  });

  return (
    <div data-tabs>
      <nav className="tabs" aria-label="Seções do projeto">
        <button
          type="button"
          onClick={() => setActiveTab("apresentacao")}
          aria-current={activeTab === "apresentacao" ? "page" : undefined}
        >
          Apresentação
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("entrevistas")}
          aria-current={activeTab === "entrevistas" ? "page" : undefined}
        >
          Entrevistas ({entrevistas.length})
        </button>
      </nav>

      {activeTab === "apresentacao" && (
        <div id="apresentacao">
          <section className="prose">
            <p className="eyebrow rv">Apresentação</p>
            <div className="prose__body rv">
              {bodyText.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <button
                type="button"
                className="cta"
                onClick={() => setActiveTab("entrevistas")}
              >
                Ver entrevistas
              </button>
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

      {activeTab === "entrevistas" && (
        <div id="entrevistas">
          <section className="finder">
            <div className="finder__row">
              <label htmlFor="q">Buscar por nome</label>
              <input
                id="q"
                type="search"
                placeholder="Digite um nome…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="az" role="group" aria-label="Filtrar por inicial">
              {ALPHABET.map((letter) => {
                const hasPeople = availableLetters.has(letter);
                const isSelected = selectedLetter === letter;

                return (
                  <button
                    key={letter}
                    type="button"
                    disabled={!hasPeople}
                    aria-pressed={isSelected}
                    onClick={() =>
                      setSelectedLetter(isSelected ? "" : letter)
                    }
                  >
                    {letter}
                  </button>
                );
              })}
              <button
                type="button"
                className="all"
                aria-pressed={!selectedLetter}
                onClick={() => setSelectedLetter("")}
              >
                Todos
              </button>
            </div>
          </section>

          <ul className="people">
            {filteredEntrevistas.map((e, i) => (
              <li
                key={e._id || e.slug}
                className="person rv in"
                style={{ "--d": `${(i % 4) * 0.06}s` } as React.CSSProperties}
              >
                <Link href={`/entrevista/${e.slug}`}>
                  <MediaPlaceholder
                    image={e.photo}
                    alt={e.title}
                    seed={i}
                  />
                  <h3>{e.title}</h3>
                  {e.excerpt && <p>{e.excerpt}</p>}
                </Link>
              </li>
            ))}
          </ul>

          {filteredEntrevistas.length === 0 && (
            <p className="people__empty">Nenhuma entrevista encontrada.</p>
          )}
        </div>
      )}
    </div>
  );
}
