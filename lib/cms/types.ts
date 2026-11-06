export interface CmsImage {
  url: string;
  alt?: string;
  caption?: string;
  lqip?: string;
}

export interface SiteSettings {
  siteName: string;
  slogan: string;
  email: string;
  endereco: string;
  instagram: string;
  youtube: string;
  footerQuote: string;
  apoioLogos: Array<{
    title: string;
    image: CmsImage;
    url?: string;
  }>;
}

export interface GalleryItem {
  image: CmsImage;
  caption?: string;
}

export interface HomePageData {
  heroTitleLines: string[];
  introEyebrow: string;
  introTitle: string;
  introLead: string;
  introText: string;
  introImage: CmsImage | null;
  voicesTitle: string;
  voicesHint: string;
  galleryTitle: string;
  gallery: GalleryItem[];
  agendaEyebrow: string;
  agendaTitle: string;
  agendaText: string;
}

export interface SobrePageData {
  title: string;
  lead: string;
  body: string;
  image: CmsImage | null;
  gallery: GalleryItem[];
  producoesIntro: string;
}

export interface ContatoPageData {
  title: string;
  lead: string;
  body?: string;
  image: CmsImage | null;
}

export interface FichaTecnicaItem {
  label: string;
  value: string;
}

export interface Projeto {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: CmsImage | null;
  gallery: GalleryItem[];
  order: number;
}

export interface Entrevista {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  destaque: string;
  projeto: {
    _id: string;
    title: string;
    slug: string;
  } | null;
  youtubeUrl: string;
  pdfUrl?: string;
  fichaTecnica: FichaTecnicaItem[];
  body: string;
  photo: CmsImage | null;
  gallery: GalleryItem[];
}

export interface Evento {
  _id: string;
  title: string;
  slug: string;
  data: string; // ISO "YYYY-MM-DD"
  local: string;
  excerpt: string;
  body: string;
  coverImage: CmsImage | null;
  videoUrl?: string;
  certificadosUrl?: string;
  gallery: GalleryItem[];
}

export interface Producao {
  _id: string;
  title: string;
  tipo: string;
  excerpt: string;
  url: string;
  coverImage: CmsImage | null;
  order: number;
}

export interface VozDestaque {
  q: string;
  by: string;
  url: string;
}

export interface ContentSource {
  getSiteSettings(): Promise<SiteSettings>;
  getHomePage(): Promise<HomePageData>;
  getSobrePage(): Promise<SobrePageData>;
  getContatoPage(): Promise<ContatoPageData>;
  getProjetos(): Promise<Projeto[]>;
  getProjetoBySlug(slug: string): Promise<{ projeto: Projeto; entrevistas: Entrevista[] } | null>;
  getEntrevistas(): Promise<Entrevista[]>;
  getEntrevistaBySlug(slug: string): Promise<Entrevista | null>;
  getVozesDestaque(): Promise<VozDestaque[]>;
  getEventos(): Promise<Evento[]>;
  getEventoBySlug(slug: string): Promise<Evento | null>;
  getProximoEvento(): Promise<Evento | null>;
  getProducoes(): Promise<Producao[]>;
}
