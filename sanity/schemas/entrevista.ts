import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

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
      title: "Fala em destaque (alimenta os balões da página inicial e a cena 3D)",
      type: "text",
      rows: 2,
      description: "Uma frase marcante da entrevista dita pela pessoa.",
      validation: (Rule) => Rule.required(),
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
