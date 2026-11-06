import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cms } from "@/lib/cms";
import { SplitText } from "@/components/split-text";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { extractYouTubeId } from "@/lib/youtube";

interface PageProps {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const evento = await cms.getEventoBySlug(slug);
  if (!evento) return { title: "Evento não encontrado" };

  return {
    title: evento.title,
    description: evento.excerpt,
  };
}

export async function generateStaticParams() {
  const eventos = await cms.getEventos();
  return eventos.map((e) => ({ slug: e.slug }));
}

export const revalidate = 60;

export default async function EventoPage({ params }: PageProps) {
  const { slug } = await params;
  const evento = await cms.getEventoBySlug(slug);

  if (!evento) {
    notFound();
  }

  const metaItems = [formatDate(evento.data), evento.local].filter(Boolean);
  const ytId = extractYouTubeId(evento.videoUrl);

  return (
    <>
      <header className="phead">
        <nav className="crumbs rv" aria-label="Trilha">
          <Link href="/">Início</Link>
          <span>/</span>
          <Link href="/eventos">Eventos</Link>
          <span>/</span>
          <span>{evento.title}</span>
        </nav>

        <div className="phead__grid">
          <div>
            {metaItems.length > 0 && (
              <p className="eyebrow rv">{metaItems.join(" · ")}</p>
            )}
            <h1 className="split">
              <SplitText text={evento.title} />
            </h1>
          </div>
          {evento.excerpt && (
            <p
              className="phead__lead rv"
              style={{ "--d": ".3s" } as React.CSSProperties}
            >
              {evento.excerpt}
            </p>
          )}
        </div>

        <MediaPlaceholder
          image={evento.coverImage}
          className="phead__media rv"
          aspectRatio="21/8"
        />
      </header>

      <section className="prose">
        <p className="eyebrow rv">Sobre</p>
        <div className="prose__body rv">
          {evento.body.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className="iv__actions">
            {ytId ? (
              <button
                type="button"
                className="cta cta--solid"
                data-yt={ytId}
              >
                Assistir gravação
              </button>
            ) : (
              evento.videoUrl && (
                <a
                  className="cta cta--solid"
                  href={evento.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Assistir gravação
                </a>
              )
            )}

            {evento.certificadosUrl && (
              <a
                className="cta"
                href={evento.certificadosUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Certificados
              </a>
            )}
          </div>
        </div>
      </section>

      {evento.gallery && evento.gallery.length > 0 && (
        <div>
          <h2 className="sec-title rv">Galeria</h2>
          <div className="gallery">
            {evento.gallery.map((item, i) => (
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
    </>
  );
}
