import { createClient, type QueryParams } from "@sanity/client";
import { draftMode } from "next/headers";

import {
  sanityApiVersion,
  sanityDataset,
  sanityEstaConfigurado,
  sanityProjectId,
} from "./projeto-sanity";
import type {
  ContatoPageData,
  ContentSource,
  Entrevista,
  Evento,
  HomePageData,
  Producao,
  Projeto,
  SiteSettings,
  SobrePageData,
  VozDestaque,
} from "./types";

export { sanityEstaConfigurado };

export const tokenDeLeitura = process.env.SANITY_API_READ_TOKEN;

const client = sanityEstaConfigurado
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

const clienteDePreVisualizacao =
  client && tokenDeLeitura ? client.withConfig({ token: tokenDeLeitura }) : null;

async function emPreVisualizacao(): Promise<boolean> {
  if (!clienteDePreVisualizacao) return false;
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

async function buscar<T>(query: string, params: QueryParams = {}): Promise<T> {
  if (await emPreVisualizacao()) {
    return clienteDePreVisualizacao!.fetch<T>(query, params, {
      perspective: "previewDrafts",
      useCdn: false,
      cache: "no-store",
    });
  }
  if (!client) {
    throw new Error("Cliente Sanity indisponível: NEXT_PUBLIC_SANITY_PROJECT_ID não definido.");
  }
  return client.fetch<T>(query, params, { next: { revalidate: 60 } });
}

const IMAGEM_PROJ = /* groq */ `
  {
    "url": coalesce(asset->url, ""),
    "alt": coalesce(alt, ""),
    "caption": coalesce(caption, ""),
    "lqip": asset->metadata.lqip
  }
`;

export const sanitySource: ContentSource = {
  async getSiteSettings() {
    const data = await buscar<SiteSettings | null>(
      /* groq */ `*[_type == "siteSettings"][0]{
        siteName,
        slogan,
        email,
        endereco,
        instagram,
        youtube,
        footerQuote,
        apoioLogos[]{
          title,
          url,
          "image": image${IMAGEM_PROJ}
        }
      }`,
    );
    return (
      data ?? {
        siteName: "LabHO — Laboratório de História Oral",
        slogan: "Acervo de entrevistas do Laboratório de História Oral do Departamento de História da UFV.",
        email: "labho.dhi@ufv.br",
        endereco: "Departamento de História — UFV\nAv. P. H. Rolfs, s/n\nViçosa, MG · 36570-900",
        instagram: "https://instagram.com/",
        youtube: "https://youtube.com/",
        footerQuote: "Toda memória\ncomeça com uma escuta.",
        apoioLogos: [],
      }
    );
  },

  async getHomePage() {
    const data = await buscar<HomePageData | null>(
      /* groq */ `*[_type == "homePage"][0]{
        "heroTitleLines": coalesce(heroLines, ["Laboratório de", "História Oral"]),
        "introEyebrow": coalesce(introEyebrow, "Laboratório de História Oral"),
        "introTitle": coalesce(introTitle, "Vozes que *atravessam* o tempo."),
        "introLead": coalesce(introLead, "Registramos, preservamos e devolvemos à sociedade as memórias de quem raramente foi ouvido pelos arquivos oficiais."),
        "introText": coalesce(introText, ""),
        "introImage": introImage${IMAGEM_PROJ},
        "voicesTitle": coalesce(voicesTitle, "Quem conta, *faz história.*"),
        "voicesHint": coalesce(voicesHint, "Role para ouvir · clique em alguém"),
        "galleryTitle": coalesce(galleryTitle, "Imagens da *memória*"),
        "gallery": coalesce(gallery[]{ "caption": caption, "image": image${IMAGEM_PROJ} }, []),
        "agendaEyebrow": coalesce(agendaEyebrow, "Agenda"),
        "agendaTitle": coalesce(agendaTitle, "Encontros, oficinas e *rodas de conversa.*"),
        "agendaText": coalesce(agendaText, "Atividades abertas à comunidade para pensar a memória como prática coletiva.")
      }`,
    );
    return (
      data ?? {
        heroTitleLines: ["Laboratório de", "História Oral"],
        introEyebrow: "Laboratório de História Oral",
        introTitle: "Vozes que *atravessam* o tempo.",
        introLead:
          "Registramos, preservamos e devolvemos à sociedade as memórias de quem raramente foi ouvido pelos arquivos oficiais.",
        introText: "",
        introImage: null,
        voicesTitle: "Quem conta, *faz história.*",
        voicesHint: "Role para ouvir · clique em alguém",
        galleryTitle: "Imagens da *memória*",
        gallery: [],
        agendaEyebrow: "Agenda",
        agendaTitle: "Encontros, oficinas e *rodas de conversa.*",
        agendaText:
          "Atividades abertas à comunidade para pensar a memória como prática coletiva.",
      }
    );
  },

  async getSobrePage() {
    const data = await buscar<SobrePageData | null>(
      /* groq */ `*[_type == "sobrePage"][0]{
        "title": coalesce(title, "Quem somos"),
        "lead": coalesce(lead, "Um espaço de pesquisa, ensino e extensão dedicado à história oral no Departamento de História da UFV."),
        "body": coalesce(body, ""),
        "image": image${IMAGEM_PROJ},
        "gallery": coalesce(gallery[]{ "caption": caption, "image": image${IMAGEM_PROJ} }, []),
        "producoesIntro": coalesce(producoesIntro, "Vídeos, publicações e materiais produzidos a partir do acervo e das atividades do laboratório.")
      }`,
    );
    return (
      data ?? {
        title: "Quem somos",
        lead: "Um espaço de pesquisa, ensino e extensão dedicado à história oral no Departamento de História da UFV.",
        body: "",
        image: null,
        gallery: [],
        producoesIntro:
          "Vídeos, publicações e materiais produzidos a partir do acervo e das atividades do laboratório.",
      }
    );
  },

  async getContatoPage() {
    const data = await buscar<ContatoPageData | null>(
      /* groq */ `*[_type == "contatoPage"][0]{
        "title": coalesce(title, "Vamos *conversar*"),
        "lead": coalesce(lead, "Escreva para propor parcerias, doar acervos ou participar das atividades do laboratório."),
        "body": coalesce(body, ""),
        "image": image${IMAGEM_PROJ}
      }`,
    );
    return (
      data ?? {
        title: "Vamos *conversar*",
        lead: "Escreva para propor parcerias, doar acervos ou participar das atividades do laboratório.",
        body: "",
        image: null,
      }
    );
  },

  async getProjetos() {
    return buscar<Projeto[]>(
      /* groq */ `*[_type == "projeto" && defined(slug.current)] | order(order asc, _createdAt asc){
        _id,
        title,
        "slug": slug.current,
        "excerpt": coalesce(excerpt, ""),
        "body": coalesce(body, ""),
        "coverImage": coverImage${IMAGEM_PROJ},
        "gallery": coalesce(gallery[]{ "caption": caption, "image": image${IMAGEM_PROJ} }, []),
        "order": coalesce(order, 1)
      }`,
    );
  },

  async getProjetoBySlug(slug: string) {
    const projeto = await buscar<Projeto | null>(
      /* groq */ `*[_type == "projeto" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        "excerpt": coalesce(excerpt, ""),
        "body": coalesce(body, ""),
        "coverImage": coverImage${IMAGEM_PROJ},
        "gallery": coalesce(gallery[]{ "caption": caption, "image": image${IMAGEM_PROJ} }, []),
        "order": coalesce(order, 1)
      }`,
      { slug },
    );
    if (!projeto) return null;

    const entrevistas = await buscar<Entrevista[]>(
      /* groq */ `*[_type == "entrevista" && projeto._ref == $projetoId && defined(slug.current)] | order(title asc){
        _id,
        title,
        "slug": slug.current,
        "excerpt": coalesce(excerpt, ""),
        "destaque": coalesce(destaque, ""),
        "projeto": { "_id": ^._id, "title": ^.title, "slug": ^.slug },
        "youtubeUrl": coalesce(youtubeUrl, ""),
        "pdfUrl": coalesce(transcricaoPdf.asset->url, pdfUrl, ""),
        "fichaTecnica": coalesce(fichaTecnica, []),
        "body": coalesce(body, ""),
        "photo": photo${IMAGEM_PROJ},
        "gallery": coalesce(gallery[]{ "caption": caption, "image": image${IMAGEM_PROJ} }, [])
      }`,
      { projetoId: projeto._id },
    );

    return { projeto, entrevistas };
  },

  async getEntrevistas() {
    return buscar<Entrevista[]>(
      /* groq */ `*[_type == "entrevista" && defined(slug.current)] | order(title asc){
        _id,
        title,
        "slug": slug.current,
        "excerpt": coalesce(excerpt, ""),
        "destaque": coalesce(destaque, ""),
        "projeto": projeto->{ "_id": _id, "title": title, "slug": slug.current },
        "youtubeUrl": coalesce(youtubeUrl, ""),
        "pdfUrl": coalesce(transcricaoPdf.asset->url, pdfUrl, ""),
        "fichaTecnica": coalesce(fichaTecnica, []),
        "body": coalesce(body, ""),
        "photo": photo${IMAGEM_PROJ},
        "gallery": coalesce(gallery[]{ "caption": caption, "image": image${IMAGEM_PROJ} }, [])
      }`,
    );
  },

  async getEntrevistaBySlug(slug: string) {
    return buscar<Entrevista | null>(
      /* groq */ `*[_type == "entrevista" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        "excerpt": coalesce(excerpt, ""),
        "destaque": coalesce(destaque, ""),
        "projeto": projeto->{ "_id": _id, "title": title, "slug": slug.current },
        "youtubeUrl": coalesce(youtubeUrl, ""),
        "pdfUrl": coalesce(transcricaoPdf.asset->url, pdfUrl, ""),
        "fichaTecnica": coalesce(fichaTecnica, []),
        "body": coalesce(body, ""),
        "photo": photo${IMAGEM_PROJ},
        "gallery": coalesce(gallery[]{ "caption": caption, "image": image${IMAGEM_PROJ} }, [])
      }`,
      { slug },
    );
  },

  async getVozesDestaque(): Promise<VozDestaque[]> {
    const list = await buscar<
      Array<{
        title: string;
        destaque: string;
        slug: string;
        projetoTitle?: string;
      }>
    >(
      /* groq */ `*[_type == "entrevista" && defined(slug.current) && defined(destaque) && destaque != ""]{
        title,
        destaque,
        "slug": slug.current,
        "projetoTitle": projeto->title
      }`,
    );

    return list.map((item) => ({
      q: item.destaque,
      by: `${item.title}${item.projetoTitle ? ` · ${item.projetoTitle}` : ""}`,
      url: `/entrevista/${item.slug}`,
    }));
  },

  async getEventos() {
    return buscar<Evento[]>(
      /* groq */ `*[_type == "evento" && defined(slug.current)] | order(data desc){
        _id,
        title,
        "slug": slug.current,
        data,
        "local": coalesce(local, ""),
        "excerpt": coalesce(excerpt, ""),
        "body": coalesce(body, ""),
        "coverImage": coverImage${IMAGEM_PROJ},
        "videoUrl": coalesce(videoUrl, ""),
        "certificadosUrl": coalesce(certificadosUrl, ""),
        "gallery": coalesce(gallery[]{ "caption": caption, "image": image${IMAGEM_PROJ} }, [])
      }`,
    );
  },

  async getEventoBySlug(slug: string) {
    return buscar<Evento | null>(
      /* groq */ `*[_type == "evento" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        data,
        "local": coalesce(local, ""),
        "excerpt": coalesce(excerpt, ""),
        "body": coalesce(body, ""),
        "coverImage": coverImage${IMAGEM_PROJ},
        "videoUrl": coalesce(videoUrl, ""),
        "certificadosUrl": coalesce(certificadosUrl, ""),
        "gallery": coalesce(gallery[]{ "caption": caption, "image": image${IMAGEM_PROJ} }, [])
      }`,
      { slug },
    );
  },

  async getProximoEvento() {
    return buscar<Evento | null>(
      /* groq */ `*[_type == "evento" && defined(slug.current)] | order(data desc)[0]{
        _id,
        title,
        "slug": slug.current,
        data,
        "local": coalesce(local, ""),
        "excerpt": coalesce(excerpt, ""),
        "body": coalesce(body, ""),
        "coverImage": coverImage${IMAGEM_PROJ},
        "videoUrl": coalesce(videoUrl, ""),
        "certificadosUrl": coalesce(certificadosUrl, ""),
        "gallery": coalesce(gallery[]{ "caption": caption, "image": image${IMAGEM_PROJ} }, [])
      }`,
    );
  },

  async getProducoes() {
    return buscar<Producao[]>(
      /* groq */ `*[_type == "producao"] | order(order asc, _createdAt asc){
        _id,
        title,
        tipo,
        "excerpt": coalesce(excerpt, ""),
        url,
        "coverImage": coverImage${IMAGEM_PROJ},
        "order": coalesce(order, 1)
      }`,
    );
  },
};
