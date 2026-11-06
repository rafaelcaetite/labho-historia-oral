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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entrevista = await cms.getEntrevistaBySlug(slug);
  if (!entrevista) return { title: "Entrevista não encontrada" };

  return {
    title: entrevista.title,
    description: entrevista.destaque || entrevista.excerpt,
  };
}

export async function generateStaticParams() {
  const entrevistas = await cms.getEntrevistas();
  return entrevistas.map((e) => ({ slug: e.slug }));
}

export const revalidate = 60;

export default async function EntrevistaPage({ params }: PageProps) {
  const { slug } = await params;
  const entrevista = await cms.getEntrevistaBySlug(slug);

  if (!entrevista) {
    notFound();
  }

  const ytId = extractYouTubeId(entrevista.youtubeUrl);

  return (
    <>
      <article className="iv">
        <MediaPlaceholder
          image={entrevista.photo}
          className="iv__photo rv"
          aspectRatio="4/5"
          priority
        />

        <div>
          <nav className="crumbs rv" aria-label="Trilha">
            <Link href="/acervo">Acervo</Link>
            {entrevista.projeto && (
              <>
                <span>/</span>
                <Link href={`/acervo/${entrevista.projeto.slug}#entrevistas`}>
                  {entrevista.projeto.title}
                </Link>
              </>
            )}
            <span>/</span>
            <span>{entrevista.title}</span>
          </nav>

          {entrevista.excerpt && (
            <p className="eyebrow rv">{entrevista.excerpt}</p>
          )}

          <h1 className="split">
            <SplitText text={entrevista.title} />
          </h1>

          <div className="iv__bio rv">
            {entrevista.destaque && (
              <blockquote style={{ fontSize: "22px", margin: "0 0 24px", color: "var(--ink)", fontStyle: "italic", borderLeft: "2px solid var(--sun)", paddingLeft: "16px" }}>
                “{entrevista.destaque}”
              </blockquote>
            )}

            {entrevista.body.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="iv__actions rv">
            {ytId ? (
              <button
                type="button"
                className="cta cta--solid"
                data-yt={ytId}
              >
                Assistir entrevista
              </button>
            ) : (
              entrevista.youtubeUrl && (
                <a
                  className="cta cta--solid"
                  href={entrevista.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Assistir entrevista
                </a>
              )
            )}

            {entrevista.pdfUrl && (
              <a
                className="cta"
                href={entrevista.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Transcrição (PDF)
              </a>
            )}
          </div>

          {entrevista.fichaTecnica && entrevista.fichaTecnica.length > 0 && (
            <>
              <p className="eyebrow rv">Ficha técnica</p>
              <dl className="ficha rv">
                {entrevista.fichaTecnica.map((item, idx) => (
                  <div key={idx} style={{ display: "contents" }}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>
      </article>

      {entrevista.gallery && entrevista.gallery.length > 0 && (
        <div>
          <h2 className="sec-title rv">Galeria</h2>
          <div className="gallery">
            {entrevista.gallery.map((item, i) => (
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
