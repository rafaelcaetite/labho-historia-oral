"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/lib/cms/types";

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;

  const quoteLines = (settings.footerQuote || "Toda memória\ncomeça com uma escuta.").split("\n");

  return (
    <footer className="foot">
      <div className="foot__top">
        <p className="foot__big">
          {quoteLines.map((line, idx) => (
            <span key={idx}>
              {idx === 0 ? line : <em>{line}</em>}
              {idx < quoteLines.length - 1 && <br />}
            </span>
          ))}
        </p>

        <div className="foot__cols">
          <div>
            <h2 className="eyebrow">Contatos</h2>
            {settings.email && (
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            )}
            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
            )}
            {settings.youtube && (
              <a
                href={settings.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube ↗
              </a>
            )}
          </div>

          <div>
            <h2 className="eyebrow">Navegar</h2>
            <Link href="/">Início</Link>
            <Link href="/laboratorio">Sobre</Link>
            <Link href="/acervo">Acervo</Link>
            <Link href="/eventos">Eventos</Link>
            <Link href="/contato">Contato</Link>
          </div>
        </div>
      </div>

      <div className="foot__apoio">
        <a
          className="foot__ufv"
          href="https://www.ufv.br/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="UFV — 100 anos, 1926–2026"
        >
          <Image
            src="/img/ufv100-laranja.png"
            width={420}
            height={183}
            alt="UFV — 100 anos, 1926–2026"
            style={{ width: "auto", height: "clamp(64px, 7vw, 100px)" }}
          />
        </a>

        {settings.apoioLogos && settings.apoioLogos.length > 0 && (
          <div>
            <h2 className="eyebrow">Apoio</h2>
            <div className="logos">
              {settings.apoioLogos.map((apoio, idx) => {
                const img = (
                  <Image
                    src={apoio.image.url}
                    alt={apoio.image.alt || apoio.title}
                    width={140}
                    height={44}
                    style={{ height: "44px", width: "auto" }}
                  />
                );

                return (
                  <div key={idx} className="logo">
                    {apoio.url ? (
                      <a
                        href={apoio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={apoio.title}
                      >
                        {img}
                      </a>
                    ) : (
                      img
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
