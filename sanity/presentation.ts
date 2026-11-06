import {
  defineDocuments,
  defineLocations,
  type DocumentLocation,
  type PresentationPluginOptions,
} from "sanity/presentation";

const INICIO: DocumentLocation = { title: "Página inicial", href: "/" };

function paginaPropria(titulo: string | undefined, href: string | null): DocumentLocation[] {
  return href ? [{ title: titulo || "Sem título", href }] : [];
}

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    projeto: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          ...paginaPropria(doc?.title, doc?.slug ? `/acervo/${doc.slug}` : null),
          { title: "Acervo", href: "/acervo" },
          INICIO,
        ],
      }),
    }),
    entrevista: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
        projetoSlug: "projeto.slug.current",
      },
      resolve: (doc) => ({
        locations: [
          ...paginaPropria(doc?.title, doc?.slug ? `/entrevista/${doc.slug}` : null),
          ...(doc?.projetoSlug
            ? [{ title: "Projeto no acervo", href: `/acervo/${doc.projetoSlug}` }]
            : []),
          INICIO,
        ],
      }),
    }),
    evento: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          ...paginaPropria(doc?.title, doc?.slug ? `/eventos/${doc.slug}` : null),
          { title: "Agenda de Eventos", href: "/eventos" },
          INICIO,
        ],
      }),
    }),
    producao: defineLocations({
      locations: [{ title: "Sobre o laboratório", href: "/laboratorio" }],
    }),
    homePage: defineLocations({
      locations: [INICIO],
    }),
    sobrePage: defineLocations({
      locations: [{ title: "Sobre o laboratório", href: "/laboratorio" }],
    }),
    contatoPage: defineLocations({
      locations: [{ title: "Contato", href: "/contato" }],
    }),
    siteSettings: defineLocations({
      locations: [
        INICIO,
        { title: "Sobre", href: "/laboratorio" },
        { title: "Acervo", href: "/acervo" },
        { title: "Eventos", href: "/eventos" },
        { title: "Contato", href: "/contato" },
      ],
    }),
  },

  mainDocuments: defineDocuments([
    { route: "/acervo/:slug", filter: `_type == "projeto" && slug.current == $slug` },
    { route: "/entrevista/:slug", filter: `_type == "entrevista" && slug.current == $slug` },
    { route: "/eventos/:slug", filter: `_type == "evento" && slug.current == $slug` },
    { route: "/laboratorio", filter: `_type == "sobrePage"` },
    { route: "/contato", filter: `_type == "contatoPage"` },
    { route: "/", filter: `_type == "homePage"` },
  ]),
};
