import type { Metadata } from "next";
import Link from "next/link";
import { cms } from "@/lib/cms";
import { SplitText } from "@/components/split-text";
import { MediaPlaceholder } from "@/components/media-placeholder";

export const metadata: Metadata = {
  title: "Acervo de Projetos",
  description:
    "Projetos de história oral: entrevistas com pessoas negras e indígenas e trajetórias da UFV.",
};

export const revalidate = 60;

export default async function AcervoPage() {
  const [projetos, entrevistas] = await Promise.all([
    cms.getProjetos(),
    cms.getEntrevistas(),
  ]);

  const countByProjeto: Record<string, number> = {};
  entrevistas.forEach((e) => {
    if (e.projeto?._id) {
      countByProjeto[e.projeto._id] = (countByProjeto[e.projeto._id] || 0) + 1;
    }
  });

  return (
    <>
      <header className="phead">
        <nav className="crumbs rv" aria-label="Trilha">
          <Link href="/">Início</Link>
          <span>/</span>
          <span>Acervo</span>
        </nav>
        <div className="phead__grid">
          <div>
            <p className="eyebrow rv">Acervo</p>
            <h1 className="split">
              <SplitText text="Projetos de entrevistas" />
            </h1>
          </div>
          <p
            className="phead__lead rv"
            style={{ "--d": ".3s" } as React.CSSProperties}
          >
            Entrevistas de história de vida filmadas, transcritas e abertas à
            consulta pública.
          </p>
        </div>
      </header>

      <section className="projects">
        {projetos.map((p, i) => {
          const count = countByProjeto[p._id] || 0;
          const countLabel =
            count === 1 ? "1 entrevista" : `${count} entrevistas`;

          return (
            <Link
              key={p._id}
              className="proj rv"
              style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}
              href={`/acervo/${p.slug}`}
            >
              <MediaPlaceholder
                image={p.coverImage}
                alt={p.title}
                seed={i}
              />
              <div className="proj__txt">
                <p className="eyebrow">
                  Projeto {String(i + 1).padStart(2, "0")}
                </p>
                <h2>{p.title}</h2>
                <span>{countLabel} →</span>
              </div>
            </Link>
          );
        })}
      </section>

      {projetos.length === 0 && (
        <p className="people__empty">Nenhum projeto publicado ainda.</p>
      )}
    </>
  );
}
