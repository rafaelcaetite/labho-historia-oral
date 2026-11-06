import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const homePageType = defineType({
  name: "homePage",
  title: "Página Inicial",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "heroLines",
      title: "Linhas do Wordmark (Hero)",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["Laboratório de", "História Oral"],
      description: "As palavras que aparecem no centro da abertura e viajam para o cabeçalho fixo.",
    }),
    defineField({
      name: "introEyebrow",
      title: "Rótulo superior da Introdução",
      type: "string",
      initialValue: "Laboratório de História Oral",
    }),
    defineField({
      name: "introTitle",
      title: "Título da Introdução",
      type: "string",
      initialValue: "Vozes que *atravessam* o tempo.",
      description: "Palavras entre *asteriscos* serão destacadas em itálico.",
    }),
    defineField({
      name: "introLead",
      title: "Resumo / Frase de apresentação",
      type: "text",
      rows: 2,
      initialValue:
        "Registramos, preservamos e devolvemos à sociedade as memórias de quem raramente foi ouvido pelos arquivos oficiais.",
    }),
    defineField({
      name: "introText",
      title: "Texto explicativo da introdução",
      type: "text",
      rows: 5,
      initialValue:
        "O LabHO reúne pesquisadoras, pesquisadores e estudantes do Departamento de História da UFV em torno da história oral como método, fonte e compromisso público.\n\nO acervo guarda entrevistas filmadas, transcrições e fotografias cedidas pelas famílias entrevistadas.",
    }),
    defineField({
      name: "introImage",
      title: "Imagem destacada da introdução",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "voicesTitle",
      title: "Título da seção 3D Vozes",
      type: "string",
      initialValue: "Quem conta, *faz história.*",
    }),
    defineField({
      name: "voicesHint",
      title: "Instrução de interação",
      type: "string",
      initialValue: "Role para ouvir · clique em alguém",
    }),
    defineField({
      name: "galleryTitle",
      title: "Título do Carrossel de Fotos",
      type: "string",
      initialValue: "Imagens da *memória*",
    }),
    defineField({
      name: "gallery",
      title: "Fotos do Carrossel",
      type: "array",
      of: [
        {
          type: "object",
          name: "fotoCarrossel",
          fields: [
            defineField({
              name: "image",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "caption", title: "Legenda", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "agendaEyebrow",
      title: "Rótulo da Agenda",
      type: "string",
      initialValue: "Agenda",
    }),
    defineField({
      name: "agendaTitle",
      title: "Título da chamada de eventos",
      type: "string",
      initialValue: "Encontros, oficinas e *rodas de conversa.*",
    }),
    defineField({
      name: "agendaText",
      title: "Texto da chamada de eventos",
      type: "text",
      rows: 2,
      initialValue:
        "Atividades abertas à comunidade para pensar a memória como prática coletiva.",
    }),
  ],
});
