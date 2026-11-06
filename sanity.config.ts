"use client";

import { ptBRLocale } from "@sanity/locale-pt-br";
import { visionTool } from "@sanity/vision";
import {
  CalendarIcon,
  CogIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  HomeIcon,
  InfoOutlineIcon,
  MasterDetailIcon,
  UserIcon,
} from "@sanity/icons";
import { defineConfig, type Template } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool, type StructureBuilder } from "sanity/structure";

import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/lib/cms/projeto-sanity";
import { resolve } from "@/sanity/presentation";
import { schemaTypes } from "@/sanity/schemas";

/** Documentos únicos: abrem direto no formulário, sem lista, sem duplicar. */
const UNICOS = ["homePage", "sobrePage", "contatoPage", "siteSettings"];

/** "Nova entrevista" de dentro de um projeto: o vínculo já nasce preenchido */
const ENTREVISTA_DO_PROJETO: Template = {
  id: "entrevista-do-projeto",
  title: "Entrevista neste projeto",
  schemaType: "entrevista",
  parameters: [{ name: "projetoId", type: "string" }],
  value: ({ projetoId }: { projetoId: string }) => ({
    projeto: { _type: "reference", _ref: projetoId },
  }),
};

/** Projetos com as entrevistas aninhadas */
function projetosComEntrevistas(S: StructureBuilder) {
  return S.listItem()
    .title("Projetos com entrevistas")
    .id("projetosComEntrevistas")
    .icon(MasterDetailIcon)
    .child(
      S.documentTypeList("projeto")
        .title("Projetos do acervo")
        .defaultOrdering([{ field: "order", direction: "asc" }])
        .child((projetoId) =>
          S.list()
            .title("Projeto do acervo")
            .items([
              S.listItem()
                .title("Dados do projeto")
                .icon(MasterDetailIcon)
                .child(S.document().schemaType("projeto").documentId(projetoId)),
              S.listItem()
                .title("Entrevistas deste projeto")
                .icon(UserIcon)
                .child(
                  S.documentList()
                    .title("Entrevistas vinculadas")
                    .schemaType("entrevista")
                    .filter('_type == "entrevista" && projeto._ref == $projetoId')
                    .params({ projetoId })
                    .defaultOrdering([{ field: "title", direction: "asc" }])
                    .initialValueTemplates([
                      S.initialValueTemplateItem("entrevista-do-projeto", { projetoId }),
                    ]),
                ),
            ]),
        ),
    );
}

function menuDoPainel(S: StructureBuilder) {
  return S.list()
    .title("Conteúdo do LabHO")
    .items([
      S.listItem()
        .title("Página Inicial")
        .id("homePage")
        .icon(HomeIcon)
        .schemaType("homePage")
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Página Inicial"),
        ),
      S.listItem()
        .title("Sobre o laboratório")
        .id("sobrePage")
        .icon(InfoOutlineIcon)
        .schemaType("sobrePage")
        .child(
          S.document()
            .schemaType("sobrePage")
            .documentId("sobrePage")
            .title("Sobre o laboratório"),
        ),
      S.listItem()
        .title("Página de Contato")
        .id("contatoPage")
        .icon(EnvelopeIcon)
        .schemaType("contatoPage")
        .child(
          S.document()
            .schemaType("contatoPage")
            .documentId("contatoPage")
            .title("Página de Contato"),
        ),
      S.listItem()
        .title("Configurações & Contatos")
        .id("siteSettings")
        .icon(CogIcon)
        .schemaType("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Configurações & Contatos"),
        ),
      S.divider(),
      projetosComEntrevistas(S),
      S.documentTypeListItem("projeto").title("Todos os projetos"),
      S.documentTypeListItem("entrevista").title("Todas as entrevistas"),
      S.divider(),
      S.documentTypeListItem("evento").title("Agenda de Eventos").icon(CalendarIcon),
      S.documentTypeListItem("producao").title("Produções").icon(DocumentTextIcon),
    ]);
}

export default defineConfig({
  name: "labho",
  title: "LabHO — Laboratório de História Oral",
  basePath: "/studio",
  projectId: sanityProjectId || "labho-placeholder",
  dataset: sanityDataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => [...templates, ENTREVISTA_DO_PROJETO],
  },
  document: {
    // Esconde a opção de duplicar ou criar novos documentos para tipos únicos
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((template) => !UNICOS.includes(template.templateId));
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (UNICOS.includes(schemaType)) {
        return prev.filter(
          ({ action }) => !["duplicate", "delete", "unpublish"].includes(action ?? ""),
        );
      }
      return prev;
    },
  },
  plugins: [
    structureTool({ structure: menuDoPainel }),
    visionTool({ defaultApiVersion: sanityApiVersion }),
    ptBRLocale(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve,
    }),
  ],
});
