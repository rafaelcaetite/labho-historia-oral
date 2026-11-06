/**
 * Script de importação dos dados iniciais para o Sanity Studio.
 * Execute com: npm run seed
 */
import { createClient } from "@sanity/client";
import { existsSync } from "fs";

if (existsSync(".env.local")) {
  try {
    process.loadEnvFile(".env.local");
  } catch {}
} else if (existsSync(".env")) {
  try {
    process.loadEnvFile(".env");
  } catch {}
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!projectId) {
  console.error("❌ Erro: NEXT_PUBLIC_SANITY_PROJECT_ID não encontrado no .env.local.");
  process.exit(1);
}

if (!token) {
  console.error("❌ Erro: SANITY_API_WRITE_TOKEN não encontrado no .env.local.");
  console.error("👉 Crie um token com permissão 'Editor' em sanity.io/manage → API → Tokens e cole em SANITY_API_WRITE_TOKEN no .env.local.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

async function seed() {
  console.log(`\n🚀 Conectando ao Sanity (Projeto: ${projectId}, Dataset: ${dataset})...\n`);

  // 1. Configurações gerais
  console.log("📝 Criando Configurações Gerais (siteSettings)...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "LabHO — Laboratório de História Oral",
    slogan: "Acervo de entrevistas do Laboratório de História Oral do Departamento de História da UFV.",
    email: "labho.dhi@ufv.br",
    endereco: "Departamento de História — UFV\nAv. P. H. Rolfs, s/n\nViçosa, MG · 36570-900",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    footerQuote: "Toda memória\ncomeça com uma escuta.",
  });

  // 2. Página Inicial
  console.log("🏠 Criando Página Inicial (homePage)...");
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroLines: ["Laboratório de", "História Oral"],
    introEyebrow: "Laboratório de História Oral",
    introTitle: "Vozes que *atravessam* o tempo.",
    introLead: "Registramos, preservamos e devolvemos à sociedade as memórias de quem raramente foi ouvido pelos arquivos oficiais.",
    introText: "O LabHO reúne pesquisadoras, pesquisadores e estudantes do Departamento de História da UFV em torno da história oral como método, fonte e compromisso público.\n\nO acervo guarda entrevistas filmadas, transcrições e fotografias cedidas pelas famílias entrevistadas.",
    voicesTitle: "Quem conta, *faz história.*",
    voicesHint: "Role para ouvir · clique em alguém",
    galleryTitle: "Imagens da *memória*",
    agendaEyebrow: "Agenda",
    agendaTitle: "Encontros, oficinas e *rodas de conversa.*",
    agendaText: "Atividades abertas à comunidade para pensar a memória como prática coletiva.",
  });

  // 3. Página Sobre
  console.log("ℹ️ Criando Página Sobre (sobrePage)...");
  await client.createOrReplace({
    _id: "sobrePage",
    _type: "sobrePage",
    title: "Quem somos",
    lead: "Um espaço de pesquisa, ensino e extensão dedicado à história oral no Departamento de História da UFV.",
    body: "O Laboratório de História Oral nasceu da necessidade de registrar experiências que não aparecem nos documentos escritos.\n\nVinculado ao Departamento de História da Universidade Federal de Viçosa, o laboratório desenvolve projetos de pesquisa, forma estudantes na metodologia da história oral e mantém um acervo aberto à consulta.\n\nTrabalhamos em parceria com comunidades, movimentos sociais e instituições da Zona da Mata mineira.",
    producoesIntro: "Vídeos, publicações e materiais produzidos a partir do acervo e das atividades do laboratório.",
  });

  // 4. Página Contato
  console.log("✉️ Criando Página Contato (contatoPage)...");
  await client.createOrReplace({
    _id: "contatoPage",
    _type: "contatoPage",
    title: "Vamos *conversar*",
    lead: "Escreva para propor parcerias, doar acervos ou participar das atividades do laboratório.",
    body: "",
  });

  // 5. Projetos
  console.log("📂 Criando Projetos do Acervo...");
  const proj1 = await client.createOrReplace({
    _id: "proj-memorias-negras-e-indigenas",
    _type: "projeto",
    title: "Memórias negras e indígenas da Zona da Mata",
    slug: { _type: "slug", current: "memorias-negras-e-indigenas-da-zona-da-mata" },
    excerpt: "Entrevistas de história de vida com moradoras e moradores de comunidades negras e indígenas da Zona da Mata mineira.",
    body: "O projeto reúne narrativas de pessoas negras e indígenas da Zona da Mata mineira: trajetórias, saberes e formas de organização que ficaram de fora dos arquivos oficiais.\n\nAs entrevistas são gravadas em vídeo, transcritas e disponibilizadas com ficha técnica e fotografias cedidas pelas famílias.\n\nCada depoimento é devolvido à comunidade antes da publicação.",
    order: 1,
  });

  const proj2 = await client.createOrReplace({
    _id: "proj-trajetorias-institucionais",
    _type: "projeto",
    title: "Trajetórias institucionais na UFV",
    slug: { _type: "slug", current: "trajetorias-institucionais-na-ufv" },
    excerpt: "Depoimentos de servidoras, servidores, docentes e estudantes que construíram a história da Universidade Federal de Viçosa.",
    body: "O projeto documenta a universidade a partir de quem a vive: técnicos, docentes, trabalhadores terceirizados e estudantes de diferentes gerações.\n\nO foco está nas vozes pouco presentes na memória institucional.",
    order: 2,
  });

  // 6. Entrevistas
  console.log("🎙️ Criando Entrevistas...");
  const entrevistas = [
    {
      id: "ent-ana-lucia-ferreira",
      nome: "Ana Lúcia Ferreira",
      slug: "ana-lucia-ferreira",
      projId: proj1._id,
      resumo: "Rezadeira e liderança comunitária",
      destaque: "Minha avó contava que a estrada foi aberta na enxada, por gente nossa.",
      data: "10/03/2024",
      duracao: "1h 20min",
    },
    {
      id: "ent-benedito-souza",
      nome: "Benedito Souza",
      slug: "benedito-souza",
      projId: proj1._id,
      resumo: "Capitão de congado",
      destaque: "O congado era a nossa forma de lembrar quem veio antes.",
      data: "11/04/2024",
      duracao: "1h 25min",
    },
    {
      id: "ent-jurema-puri",
      nome: "Jurema Puri",
      slug: "jurema-puri",
      projId: proj1._id,
      resumo: "Artesã e contadora de histórias",
      destaque: "A gente aprendia o nome das plantas antes de aprender a ler.",
      data: "12/05/2024",
      duracao: "1h 30min",
    },
    {
      id: "ent-tereza-cristina-silva",
      nome: "Tereza Cristina Silva",
      slug: "tereza-cristina-silva",
      projId: proj1._id,
      resumo: "Quituteira e griô",
      destaque: "Ninguém escreveu a nossa história. Então a gente conta.",
      data: "13/06/2024",
      duracao: "1h 35min",
    },
    {
      id: "ent-manoel-do-rosario",
      nome: "Manoel do Rosário",
      slug: "manoel-do-rosario",
      projId: proj1._id,
      resumo: "Lavrador e mestre de folia",
      destaque: "Quando eu falo, falo por muita gente que não pôde.",
      data: "14/07/2024",
      duracao: "1h 40min",
    },
    {
      id: "ent-rosangela-oliveira",
      nome: "Rosângela Oliveira",
      slug: "rosangela-oliveira",
      projId: proj2._id,
      resumo: "Primeira turma de cotistas",
      destaque: "Fui a primeira da família a entrar na universidade. Minha mãe chorou no portão.",
      data: "15/08/2024",
      duracao: "1h 45min",
    },
    {
      id: "ent-geraldo-pereira",
      nome: "Geraldo Pereira",
      slug: "geraldo-pereira",
      projId: proj2._id,
      resumo: "Servidor da biblioteca central",
      destaque: "Trabalhei quarenta anos no campus. Vi cada prédio subir.",
      data: "16/09/2024",
      duracao: "1h 50min",
    },
  ];

  for (const ent of entrevistas) {
    const primeiro = ent.nome.split(" ")[0];
    await client.createOrReplace({
      _id: ent.id,
      _type: "entrevista",
      title: ent.nome,
      slug: { _type: "slug", current: ent.slug },
      projeto: { _type: "reference", _ref: ent.projId },
      excerpt: ent.resumo,
      destaque: ent.destaque,
      youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      fichaTecnica: [
        { _key: "f1", label: "Entrevistador(a)", value: "Equipe LabHO" },
        { _key: "f2", label: "Data", value: ent.data },
        { _key: "f3", label: "Local", value: "Viçosa, MG" },
        { _key: "f4", label: "Duração", value: ent.duracao },
      ],
      body: `${primeiro} nasceu na Zona da Mata mineira e passou a vida entre o trabalho e a comunidade. Na entrevista, lembra a infância, a família e as redes de apoio que sustentaram gerações.\n\nO depoimento percorre temas como trabalho, religiosidade e educação, e ajuda a entender as mudanças da região ao longo do século XX.`,
    });
  }

  // 7. Eventos
  console.log("📅 Criando Eventos...");
  const eventos = [
    {
      id: "ev-seminario-memoria-oralidade",
      title: "Seminário Memória, Oralidade e Território",
      slug: "seminario-memoria-oralidade-e-territorio",
      data: "2025-11-20",
      local: "Auditório do DHI",
      excerpt: "Seminário aberto à comunidade acadêmica e ao público externo.",
    },
    {
      id: "ev-oficina-entrevista-transcricao",
      title: "Oficina de entrevista e transcrição",
      slug: "oficina-de-entrevista-e-transcricao",
      data: "2025-08-14",
      local: "Laboratório de História Oral",
      excerpt: "Oficina aberta à comunidade acadêmica e ao público externo.",
    },
    {
      id: "ev-mostra-vozes-da-mata",
      title: "Mostra Vozes da Mata",
      slug: "mostra-vozes-da-mata",
      data: "2024-11-22",
      local: "Cine UFV",
      excerpt: "Mostra audiovisual aberta à comunidade acadêmica e ao público externo.",
    },
    {
      id: "ev-roda-de-conversa-13-maio",
      title: "Roda de conversa: 13 de maio, memória e luta",
      slug: "roda-de-conversa-13-de-maio-memoria-e-luta",
      data: "2024-05-13",
      local: "Praça da Estação, Viçosa",
      excerpt: "Roda de conversa aberta à comunidade acadêmica e ao público externo.",
    },
  ];

  for (const ev of eventos) {
    await client.createOrReplace({
      _id: ev.id,
      _type: "evento",
      title: ev.title,
      slug: { _type: "slug", current: ev.slug },
      data: ev.data,
      local: ev.local,
      excerpt: ev.excerpt,
      body: "Encontro com mesas de debate, exibição de trechos de entrevistas do acervo e participação de pessoas entrevistadas pelo laboratório.\n\nA atividade faz parte das ações de extensão do Laboratório de História Oral e do Departamento de História da UFV.",
      videoUrl: "https://youtu.be/aqz-KE-bpKQ",
      certificadosUrl: "https://drive.google.com/",
    });
  }

  // 8. Produções
  console.log("🎬 Criando Produções...");
  const producoes = [
    {
      id: "prod-serie-vozes-da-mata",
      title: "Série Vozes da Mata",
      tipo: "YouTube",
      excerpt: "Vídeos curtos com trechos das entrevistas do acervo.",
      url: "https://www.youtube.com/",
      order: 1,
    },
    {
      id: "prod-caderno-metodologia",
      title: "Caderno de metodologia",
      tipo: "Drive",
      excerpt: "Guia de entrevista, transcrição e cessão de direitos usado nas oficinas.",
      url: "https://drive.google.com/",
      order: 2,
    },
    {
      id: "prod-artigos-e-capitulos",
      title: "Artigos e capítulos",
      tipo: "Artigo",
      excerpt: "Produção acadêmica da equipe a partir do acervo.",
      url: "https://drive.google.com/",
      order: 3,
    },
  ];

  for (const prod of producoes) {
    await client.createOrReplace({
      _id: prod.id,
      _type: "producao",
      title: prod.title,
      tipo: prod.tipo,
      excerpt: prod.excerpt,
      url: prod.url,
      order: prod.order,
    });
  }

  console.log("\n✅ Importação concluída com sucesso no Sanity! 🎉");
}

seed().catch((err) => {
  console.error("\n❌ Falha na importação:", err);
  process.exit(1);
});
