import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cms } from "@/lib/cms";
import { SplitText } from "@/components/split-text";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { ProjectTabs } from "@/components/project-tabs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await cms.getProjetoBySlug(slug);
  if (!data) return { title: "Projeto não encontrado" };

  return {
    title: data.projeto.title,
    description: data.projeto.excerpt,
  };
}

export async function generateStaticParams() {
  const projetos = await cms.getProjetos();
  return projetos.map((p) => ({ slug: p.slug }));
}

export const revalidate = 60;

export default async function ProjetoPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await cms.getProjetoBySlug(slug);

  if (!data) {
    notFound();
  }

  const { projeto, entrevistas } = data;

  return (
    <>
      <header className="phead">
        <nav className="crumbs rv" aria-label="Trilha">
          <Link href="/">Início</Link>
          <span>/</span>
          <Link href="/acervo">Acervo</Link>
          <span>/</span>
          <span>{projeto.title}</span>
        </nav>

        <div className="phead__grid">
          <div>
            <p className="eyebrow rv">Projeto de entrevistas</p>
            <h1 className="split">
              <SplitText text={projeto.title} />
            </h1>
          </div>
          {projeto.excerpt && (
            <p
              className="phead__lead rv"
              style={{ "--d": ".3s" } as React.CSSProperties}
            >
              {projeto.excerpt}
            </p>
          )}
        </div>

        <MediaPlaceholder
          image={projeto.coverImage}
          className="phead__media rv"
          aspectRatio="21/8"
        />
      </header>

      <ProjectTabs
        bodyText={projeto.body}
        gallery={projeto.gallery}
        entrevistas={entrevistas}
      />
    </>
  );
}
