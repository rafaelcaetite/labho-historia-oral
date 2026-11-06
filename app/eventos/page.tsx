import type { Metadata } from "next";
import Link from "next/link";
import { cms } from "@/lib/cms";
import { SplitText } from "@/components/split-text";
import { EventsList } from "@/components/events-list";

export const metadata: Metadata = {
  title: "Agenda de Eventos",
  description:
    "Seminários, oficinas, mostras e rodas de conversa promovidos pelo Laboratório de História Oral.",
};

export const revalidate = 60;

export default async function EventosPage() {
  const eventos = await cms.getEventos();

  return (
    <>
      <header className="phead">
        <nav className="crumbs rv" aria-label="Trilha">
          <Link href="/">Início</Link>
          <span>/</span>
          <span>Eventos</span>
        </nav>
        <div className="phead__grid">
          <div>
            <p className="eyebrow rv">Agenda</p>
            <h1 className="split">
              <SplitText text="Eventos" />
            </h1>
          </div>
          <p
            className="phead__lead rv"
            style={{ "--d": ".3s" } as React.CSSProperties}
          >
            Seminários, oficinas, mostras e rodas de conversa promovidos pelo
            laboratório.
          </p>
        </div>
      </header>

      <EventsList eventos={eventos} />
    </>
  );
}
