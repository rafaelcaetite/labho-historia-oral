import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";
import { CABELO, COR_CABELO, COR_ROUPA, PELE, ROUPA, paraLista } from "@/lib/boneco";

export const entrevistaType = defineType({
  name: "entrevista",
  title: "Entrevistas",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nome do(a) entrevistado(a)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (endereço no site)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projeto",
      title: "Projeto do acervo vinculado",
      type: "reference",
      to: [{ type: "projeto" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Ocupação / Bio curta (ex.: Rezadeira e liderança comunitária)",
      type: "string",
    }),
    defineField({
      name: "destaque",
      title: "Fala em destaque (balão do bonequinho)",
      type: "text",
      rows: 2,
      description: "Uma frase marcante dita pela pessoa. Ter fala não coloca a entrevista sozinha na cena 3D: escolha quais viram bonequinhos em Página inicial > Entrevistas que viram bonequinhos.",
    }),
    defineField({
      name: "boneco",
      title: "Aparência do bonequinho",
      type: "object",
      description: "Escolha para parecer com a pessoa. Se ficar tudo em branco, vale o elenco padrão, que não tem relação com a pessoa.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "pele",
          title: "Tom de pele",
          type: "string",
          options: { list: paraLista(PELE), layout: "dropdown" },
        }),
        defineField({
          name: "cabelo",
          title: "Cabelo",
          type: "string",
          options: { list: paraLista(CABELO), layout: "dropdown" },
        }),
        defineField({
          name: "corCabelo",
          title: "Cor do cabelo",
          type: "string",
          options: { list: paraLista(COR_CABELO), layout: "dropdown" },
        }),
        defineField({
          name: "roupa",
          title: "Tipo de roupa",
          type: "string",
          options: { list: paraLista(ROUPA), layout: "dropdown" },
        }),
        defineField({
          name: "corRoupa",
          title: "Cor da roupa",
          type: "string",
          options: { list: paraLista(COR_ROUPA), layout: "dropdown" },
        }),
        defineField({
          name: "idoso",
          title: "Pessoa idosa",
          description: "Corpo curvado e bengala. O cabelo fica grisalho se você não escolher outra cor.",
          type: "boolean",
        }),
      ],
    }),
    defineField({
      name: "photo",
      title: "Foto do(a) entrevistado(a)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "youtubeUrl",
      title: "Link do vídeo no YouTube",
      type: "url",
    }),
    defineField({
      name: "transcricaoPdf",
      title: "Arquivo da Transcrição em PDF",
      type: "file",
      options: {
        accept: "application/pdf",
      },
    }),
    defineField({
      name: "pdfUrl",
      title: "Ou link externo para o PDF / Drive (opcional)",
      type: "url",
    }),
    defineField({
      name: "fichaTecnica",
      title: "Ficha técnica",
      type: "array",
      of: [
        {
          type: "object",
          name: "itemFicha",
          fields: [
            defineField({
              name: "label",
              title: "Campo (ex.: Entrevistador, Data, Local, Duração)",
              type: "string",
            }),
            defineField({ name: "value", title: "Valor", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Biografia e depoimento completo",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "gallery",
      title: "Galeria de fotografias e acervo pessoal",
      type: "array",
      of: [
        {
          type: "object",
          name: "fotoEntrevista",
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "destaque",
      media: "photo",
    },
  },
});
