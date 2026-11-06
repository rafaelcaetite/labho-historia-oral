import type { Metadata } from "next";
import Link from "next/link";
import { cms } from "@/lib/cms";
import { SplitText } from "@/components/split-text";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { LaboratorioTabs } from "@/components/laboratorio-tabs";

export const metadata: Metadata = {
  title: "Sobre o Laboratório",
  description:
    "Um espaço de pesquisa, ensino e extensão dedicado à história oral no Departamento de História da UFV.",
};

export const revalidate = 60;

export default async function LaboratorioPage() {
  const [sobreData, producoes] = await Promise.all([
    cms.getSobrePage(),
    cms.getProducoes(),
  ]);

  return (
    <>
      <header className="phead">
        <nav className="crumbs rv" aria-label="Trilha">
          <Link href="/">Início</Link>
          <span>/</span>
          <span>Sobre</span>
        </nav>

        <div className="phead__grid">
          <div>
            <p className="eyebrow rv">Sobre</p>
            <h1 className="split">
              <SplitText text={sobreData.title} />
            </h1>
          </div>
          {sobreData.lead && (
            <p
              className="phead__lead rv"
              style={{ "--d": ".3s" } as React.CSSProperties}
            >
              {sobreData.lead}
            </p>
          )}
        </div>

        <MediaPlaceholder
          image={sobreData.image}
          className="phead__media rv"
          aspectRatio="21/8"
          seed={3}
        />
      </header>

      <LaboratorioTabs
        bodyText={sobreData.body}
        gallery={sobreData.gallery}
        producoesIntro={sobreData.producoesIntro}
        producoes={producoes}
      />
    </>
  );
}
