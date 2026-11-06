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

export const siteSettingsFixture: SiteSettings = {
  siteName: "LabHO — Laboratório de História Oral",
  slogan: "Acervo de entrevistas do Laboratório de História Oral do Departamento de História da UFV.",
  email: "labho.dhi@ufv.br",
  endereco: "Departamento de História — UFV\nAv. P. H. Rolfs, s/n\nViçosa, MG · 36570-900",
  instagram: "https://instagram.com/",
  youtube: "https://youtube.com/",
  footerQuote: "Toda memória\ncomeça com uma escuta.",
  apoioLogos: [
    {
      title: "UFV — 100 anos (1926–2026)",
      image: {
        url: "/img/ufv100-laranja.png",
        alt: "UFV — 100 anos, 1926–2026",
      },
      url: "https://www.ufv.br/",
    },
  ],
};

export const homePageFixture: HomePageData = {
  heroTitleLines: ["Laboratório de", "História Oral"],
  introEyebrow: "Laboratório de História Oral",
  introTitle: "Vozes que *atravessam* o tempo.",
  introLead:
    "Registramos, preservamos e devolvemos à sociedade as memórias de quem raramente foi ouvido pelos arquivos oficiais.",
  introText:
    "O LabHO reúne pesquisadoras, pesquisadores e estudantes do Departamento de História da UFV em torno da história oral como método, fonte e compromisso público.\n\nO acervo guarda entrevistas filmadas, transcrições e fotografias cedidas pelas famílias entrevistadas.",
  introImage: null,
  voicesTitle: "Quem conta, *faz história.*",
  voicesHint: "Role para ouvir · clique em alguém",
  galleryTitle: "Imagens da *memória*",
  gallery: [
    {
      image: { url: "", alt: "Entrevista comunitária na zona rural" },
      caption: "Registros de campo na Zona da Mata mineira (acervo LabHO)",
    },
    {
      image: { url: "", alt: "Encontro de congado e celebração popular" },
      caption: "Festas tradicionais e memória comunitária",
    },
    {
      image: { url: "", alt: "Arquivo de fitas e transcrições no laboratório" },
      caption: "Oficina de catalogação e transcrição no DHI",
    },
  ],
  agendaEyebrow: "Agenda",
  agendaTitle: "Encontros, oficinas e *rodas de conversa.*",
  agendaText:
    "Atividades abertas à comunidade para pensar a memória como prática coletiva.",
};

export const sobrePageFixture: SobrePageData = {
  title: "Quem somos",
  lead: "Um espaço de pesquisa, ensino e extensão dedicado à história oral no Departamento de História da UFV.",
  body:
    "O Laboratório de História Oral nasceu da necessidade de registrar experiências que não aparecem nos documentos escritos.\n\nVinculado ao Departamento de História da Universidade Federal de Viçosa, o laboratório desenvolve projetos de pesquisa, forma estudantes na metodologia da história oral e mantém um acervo aberto à consulta pública.\n\nTrabalhamos em estreita parceria com comunidades, movimentos sociais e instituições da Zona da Mata mineira, garantindo que os depoimentos retornem a quem os produziu.",
  image: null,
  gallery: [],
  producoesIntro:
    "Vídeos, publicações e materiais produzidos a partir do acervo e das atividades do laboratório.",
};

export const contatoPageFixture: ContatoPageData = {
  title: "Vamos *conversar*",
  lead: "Escreva para propor parcerias, doar acervos ou participar das atividades do laboratório.",
  body: "",
  image: null,
};

export const projetosFixture: Projeto[] = [
  {
    _id: "proj-1",
    title: "Memórias negras e indígenas da Zona da Mata",
    slug: "memorias-negras-e-indigenas-da-zona-da-mata",
    excerpt:
      "Entrevistas de história de vida com moradoras e moradores de comunidades negras e indígenas da Zona da Mata mineira.",
    body:
      "O projeto reúne narrativas de pessoas negras e indígenas da Zona da Mata mineira: trajetórias, saberes e formas de organização que ficaram de fora dos arquivos oficiais.\n\nAs entrevistas são gravadas em vídeo, transcritas e disponibilizadas com ficha técnica e fotografias cedidas pelas famílias. Cada depoimento é devolvido à comunidade antes da publicação.",
    coverImage: null,
    gallery: [],
    order: 1,
  },
  {
    _id: "proj-2",
    title: "Trajetórias institucionais na UFV",
    slug: "trajetorias-institucionais-na-ufv",
    excerpt:
      "Depoimentos de servidoras, servidores, docentes e estudantes que construíram a história da Universidade Federal de Viçosa.",
    body:
      "O projeto documenta a universidade a partir de quem a vive: técnicos, docentes, trabalhadores terceirizados e estudantes de diferentes gerações.\n\nO foco está nas vozes pouco presentes na memória institucional oficial.",
    coverImage: null,
    gallery: [],
    order: 2,
  },
];

export const entrevistasFixture: Entrevista[] = [
  {
    _id: "ent-1",
    title: "Ana Lúcia Ferreira",
    slug: "ana-lucia-ferreira",
    excerpt: "Rezadeira e liderança comunitária",
    destaque: "Minha avó contava que a estrada foi aberta na enxada, por gente nossa.",
    projeto: {
      _id: "proj-1",
      title: "Memórias negras e indígenas da Zona da Mata",
      slug: "memorias-negras-e-indigenas-da-zona-da-mata",
    },
    youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    pdfUrl: "",
    fichaTecnica: [
      { label: "Entrevistador(a)", value: "Equipe LabHO" },
      { label: "Data", value: "10/03/2024" },
      { label: "Local", value: "Viçosa, MG" },
      { label: "Duração", value: "1h 20min" },
    ],
    body:
      "Ana nasceu na Zona da Mata mineira e passou a vida entre o trabalho e a comunidade. Na entrevista, lembra a infância, a família e as redes de apoio que sustentaram gerações.\n\nO depoimento percorre temas como trabalho, religiosidade e educação, e ajuda a entender as mudanças da região ao longo do século XX.",
    photo: null,
    gallery: [],
  },
  {
    _id: "ent-2",
    title: "Benedito Souza",
    slug: "benedito-souza",
    excerpt: "Capitão de congado",
    destaque: "O congado era a nossa forma de lembrar quem veio antes.",
    projeto: {
      _id: "proj-1",
      title: "Memórias negras e indígenas da Zona da Mata",
      slug: "memorias-negras-e-indigenas-da-zona-da-mata",
    },
    youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    pdfUrl: "",
    fichaTecnica: [
      { label: "Entrevistador(a)", value: "Equipe LabHO" },
      { label: "Data", value: "11/04/2024" },
      { label: "Local", value: "Viçosa, MG" },
      { label: "Duração", value: "1h 25min" },
    ],
    body:
      "Benedito nasceu na Zona da Mata mineira e passou a vida entre o trabalho e a comunidade. Na entrevista, lembra a infância, a família e as redes de apoio que sustentaram gerações.\n\nO depoimento percorre temas como trabalho, religiosidade e educação, e ajuda a entender as mudanças da região ao longo do século XX.",
    photo: null,
    gallery: [],
  },
  {
    _id: "ent-3",
    title: "Jurema Puri",
    slug: "jurema-puri",
    excerpt: "Artesã e contadora de histórias",
    destaque: "A gente aprendia o nome das plantas antes de aprender a ler.",
    projeto: {
      _id: "proj-1",
      title: "Memórias negras e indígenas da Zona da Mata",
      slug: "memorias-negras-e-indigenas-da-zona-da-mata",
    },
    youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    pdfUrl: "",
    fichaTecnica: [
      { label: "Entrevistador(a)", value: "Equipe LabHO" },
      { label: "Data", value: "12/05/2024" },
      { label: "Local", value: "Viçosa, MG" },
      { label: "Duração", value: "1h 30min" },
    ],
    body:
      "Jurema nasceu na Zona da Mata mineira e passou a vida entre o trabalho e a comunidade. Na entrevista, lembra a infância, a família e as redes de apoio que sustentaram gerações.\n\nO depoimento percorre temas como trabalho, religiosidade e educação, e ajuda a entender as mudanças da região ao longo do século XX.",
    photo: null,
    gallery: [],
  },
  {
    _id: "ent-4",
    title: "Tereza Cristina Silva",
    slug: "tereza-cristina-silva",
    excerpt: "Quituteira e griô",
    destaque: "Ninguém escreveu a nossa história. Então a gente conta.",
    projeto: {
      _id: "proj-1",
      title: "Memórias negras e indígenas da Zona da Mata",
      slug: "memorias-negras-e-indigenas-da-zona-da-mata",
    },
    youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    pdfUrl: "",
    fichaTecnica: [
      { label: "Entrevistador(a)", value: "Equipe LabHO" },
      { label: "Data", value: "13/06/2024" },
      { label: "Local", value: "Viçosa, MG" },
      { label: "Duração", value: "1h 35min" },
    ],
    body:
      "Tereza nasceu na Zona da Mata mineira e passou a vida entre o trabalho e a comunidade. Na entrevista, lembra a infância, a família e as redes de apoio que sustentaram gerações.\n\nO depoimento percorre temas como trabalho, religiosidade e educação, e ajuda a entender as mudanças da região ao longo do século XX.",
    photo: null,
    gallery: [],
  },
  {
    _id: "ent-5",
    title: "Manoel do Rosário",
    slug: "manoel-do-rosario",
    excerpt: "Lavrador e mestre de folia",
    destaque: "Quando eu falo, falo por muita gente que não pôde.",
    projeto: {
      _id: "proj-1",
      title: "Memórias negras e indígenas da Zona da Mata",
      slug: "memorias-negras-e-indigenas-da-zona-da-mata",
    },
    youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    pdfUrl: "",
    fichaTecnica: [
      { label: "Entrevistador(a)", value: "Equipe LabHO" },
      { label: "Data", value: "14/07/2024" },
      { label: "Local", value: "Viçosa, MG" },
      { label: "Duração", value: "1h 40min" },
    ],
    body:
      "Manoel nasceu na Zona da Mata mineira e passou a vida entre o trabalho e a comunidade. Na entrevista, lembra a infância, a família e as redes de apoio que sustentaram gerações.\n\nO depoimento percorre temas como trabalho, religiosidade e educação, e ajuda a entender as mudanças da região ao longo do século XX.",
    photo: null,
    gallery: [],
  },
  {
    _id: "ent-6",
    title: "Rosângela Oliveira",
    slug: "rosangela-oliveira",
    excerpt: "Primeira turma de cotistas",
    destaque:
      "Fui a primeira da família a entrar na universidade. Minha mãe chorou no portão.",
    projeto: {
      _id: "proj-2",
      title: "Trajetórias institucionais na UFV",
      slug: "trajetorias-institucionais-na-ufv",
    },
    youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    pdfUrl: "",
    fichaTecnica: [
      { label: "Entrevistador(a)", value: "Equipe LabHO" },
      { label: "Data", value: "15/08/2024" },
      { label: "Local", value: "Viçosa, MG" },
      { label: "Duração", value: "1h 45min" },
    ],
    body:
      "Rosângela nasceu na Zona da Mata mineira e passou a vida entre o trabalho e a comunidade. Na entrevista, lembra a infância, a família e as redes de apoio que sustentaram gerações.\n\nO depoimento percorre temas como trabalho, religiosidade e educação, e ajuda a entender as mudanças da região ao longo do século XX.",
    photo: null,
    gallery: [],
  },
  {
    _id: "ent-7",
    title: "Geraldo Pereira",
    slug: "geraldo-pereira",
    excerpt: "Servidor da biblioteca central",
    destaque: "Trabalhei quarenta anos no campus. Vi cada prédio subir.",
    projeto: {
      _id: "proj-2",
      title: "Trajetórias institucionais na UFV",
      slug: "trajetorias-institucionais-na-ufv",
    },
    youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    pdfUrl: "",
    fichaTecnica: [
      { label: "Entrevistador(a)", value: "Equipe LabHO" },
      { label: "Data", value: "16/09/2024" },
      { label: "Local", value: "Viçosa, MG" },
      { label: "Duração", value: "1h 50min" },
    ],
    body:
      "Geraldo nasceu na Zona da Mata mineira e passou a vida entre o trabalho e a comunidade. Na entrevista, lembra a infância, a família e as redes de apoio que sustentaram gerações.\n\nO depoimento percorre temas como trabalho, religiosidade e educação, e ajuda a entender as mudanças da região ao longo do século XX.",
    photo: null,
    gallery: [],
  },
];

export const eventosFixture: Evento[] = [
  {
    _id: "ev-1",
    title: "Seminário Memória, Oralidade e Território",
    slug: "seminario-memoria-oralidade-e-territorio",
    data: "2025-11-20",
    local: "Auditório do DHI",
    excerpt: "Seminário aberto à comunidade acadêmica e ao público externo.",
    body:
      "Encontro com mesas de debate, exibição de trechos de entrevistas do acervo e participação de pessoas entrevistadas pelo laboratório.\n\nA atividade faz parte das ações de extensão do Laboratório de História Oral e do Departamento de História da UFV.",
    coverImage: null,
    videoUrl: "https://youtu.be/aqz-KE-bpKQ",
    certificadosUrl: "https://drive.google.com/",
    gallery: [],
  },
  {
    _id: "ev-2",
    title: "Oficina de entrevista e transcrição",
    slug: "oficina-de-entrevista-e-transcricao",
    data: "2025-08-14",
    local: "Laboratório de História Oral",
    excerpt: "Oficina aberta à comunidade acadêmica e ao público externo.",
    body:
      "Encontro com mesas de debate, exibição de trechos de entrevistas do acervo e participação de pessoas entrevistadas pelo laboratório.\n\nA atividade faz parte das ações de extensão do Laboratório de História Oral e do Departamento de História da UFV.",
    coverImage: null,
    videoUrl: "https://youtu.be/aqz-KE-bpKQ",
    certificadosUrl: "https://drive.google.com/",
    gallery: [],
  },
  {
    _id: "ev-3",
    title: "Mostra Vozes da Mata",
    slug: "mostra-vozes-da-mata",
    data: "2024-11-22",
    local: "Cine UFV",
    excerpt: "Mostra audiovisual aberta à comunidade acadêmica e ao público externo.",
    body:
      "Encontro com mesas de debate, exibição de trechos de entrevistas do acervo e participação de pessoas entrevistadas pelo laboratório.\n\nA atividade faz parte das ações de extensão do Laboratório de História Oral e do Departamento de História da UFV.",
    coverImage: null,
    videoUrl: "https://youtu.be/aqz-KE-bpKQ",
    certificadosUrl: "https://drive.google.com/",
    gallery: [],
  },
  {
    _id: "ev-4",
    title: "Roda de conversa: 13 de maio, memória e luta",
    slug: "roda-de-conversa-13-de-maio-memoria-e-luta",
    data: "2024-05-13",
    local: "Praça da Estação, Viçosa",
    excerpt: "Roda de conversa aberta à comunidade acadêmica e ao público externo.",
    body:
      "Encontro com mesas de debate, exibição de trechos de entrevistas do acervo e participação de pessoas entrevistadas pelo laboratório.\n\nA atividade faz parte das ações de extensão do Laboratório de História Oral e do Departamento de História da UFV.",
    coverImage: null,
    videoUrl: "https://youtu.be/aqz-KE-bpKQ",
    certificadosUrl: "https://drive.google.com/",
    gallery: [],
  },
];

export const producoesFixture: Producao[] = [
  {
    _id: "prod-1",
    title: "Série Vozes da Mata",
    tipo: "YouTube",
    excerpt: "Vídeos curtos com trechos das entrevistas do acervo.",
    url: "https://www.youtube.com/",
    coverImage: null,
    order: 1,
  },
  {
    _id: "prod-2",
    title: "Caderno de metodologia",
    tipo: "Drive",
    excerpt: "Guia de entrevista, transcrição e cessão de direitos usado nas oficinas.",
    url: "https://drive.google.com/",
    coverImage: null,
    order: 2,
  },
  {
    _id: "prod-3",
    title: "Artigos e capítulos",
    tipo: "Artigo",
    excerpt: "Produção acadêmica da equipe a partir do acervo.",
    url: "https://drive.google.com/",
    coverImage: null,
    order: 3,
  },
];

export const fixtureSource: ContentSource = {
  async getSiteSettings() {
    return siteSettingsFixture;
  },
  async getHomePage() {
    return homePageFixture;
  },
  async getSobrePage() {
    return sobrePageFixture;
  },
  async getContatoPage() {
    return contatoPageFixture;
  },
  async getProjetos() {
    return [...projetosFixture].sort((a, b) => a.order - b.order);
  },
  async getProjetoBySlug(slug: string) {
    const projeto = projetosFixture.find((p) => p.slug === slug);
    if (!projeto) return null;
    const entrevistas = entrevistasFixture
      .filter((e) => e.projeto?._id === projeto._id)
      .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    return { projeto, entrevistas };
  },
  async getEntrevistas() {
    return [...entrevistasFixture].sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
  },
  async getEntrevistaBySlug(slug: string) {
    const entrevista = entrevistasFixture.find((e) => e.slug === slug);
    return entrevista ?? null;
  },
  async getVozesDestaque(): Promise<VozDestaque[]> {
    return entrevistasFixture.map((e) => ({
      q: e.destaque,
      by: `${e.title}${e.projeto ? ` · ${e.projeto.title}` : ""}`,
      url: `/entrevista/${e.slug}`,
    }));
  },
  async getEventos() {
    return [...eventosFixture].sort((a, b) => b.data.localeCompare(a.data));
  },
  async getEventoBySlug(slug: string) {
    return eventosFixture.find((e) => e.slug === slug) ?? null;
  },
  async getProximoEvento() {
    const sorted = [...eventosFixture].sort((a, b) => b.data.localeCompare(a.data));
    return sorted[0] ?? null;
  },
  async getProducoes() {
    return [...producoesFixture].sort((a, b) => a.order - b.order);
  },
};
