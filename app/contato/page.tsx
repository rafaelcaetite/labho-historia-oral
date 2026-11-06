import type { Metadata } from "next";
import Link from "next/link";
import { cms } from "@/lib/cms";
import { SplitText } from "@/components/split-text";
import { MediaPlaceholder } from "@/components/media-placeholder";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Escreva para propor parcerias, doar acervos ou participar das atividades do laboratório.",
};

export const revalidate = 60;

export default async function ContatoPage() {
  const [contatoData, settings] = await Promise.all([
    cms.getContatoPage(),
    cms.getSiteSettings(),
  ]);

  return (
    <>
      <header className="phead">
        <nav className="crumbs rv" aria-label="Trilha">
          <Link href="/">Início</Link>
          <span>/</span>
          <span>Contato</span>
        </nav>

        <div className="phead__grid">
          <div>
            <p className="eyebrow rv">Contato</p>
            <h1 className="split">
              <SplitText text={contatoData.title} />
            </h1>
          </div>
          {contatoData.lead && (
            <p
              className="phead__lead rv"
              style={{ "--d": ".3s" } as React.CSSProperties}
            >
              {contatoData.lead}
            </p>
          )}
        </div>

        <MediaPlaceholder
          image={contatoData.image}
          className="phead__media rv"
          aspectRatio="21/8"
          seed={5}
        />
      </header>

      <section className="contact">
        <div className="rv">
          <p className="eyebrow">E-mail</p>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
        </div>

        <div className="rv" style={{ "--d": ".08s" } as React.CSSProperties}>
          <p className="eyebrow">Endereço</p>
          <address style={{ whiteSpace: "pre-line" }}>
            {settings.endereco}
          </address>
        </div>

        <div className="rv" style={{ "--d": ".16s" } as React.CSSProperties}>
          <p className="eyebrow">Redes</p>
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
      </section>

      {contatoData.body && (
        <section className="prose">
          <span />
          <div className="prose__body rv">
            {contatoData.body.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
