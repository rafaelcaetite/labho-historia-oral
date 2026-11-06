import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const producaoType = defineType({
  name: "producao",
  title: "Produções",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título da produção",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipo",
      title: "Tipo de material",
      type: "string",
      options: {
        list: [
          { title: "YouTube / Vídeo", value: "YouTube" },
          { title: "Artigo", value: "Artigo" },
          { title: "Caderno / Metodologia", value: "Drive" },
          { title: "Livro / E-book", value: "Livro" },
          { title: "Site", value: "Site" },
          { title: "Outro", value: "Outro" },
        ],
      },
      initialValue: "YouTube",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo / Descrição",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "url",
      title: "Link de acesso (URL)",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Capa / Imagem de destaque",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tipo",
      media: "coverImage",
    },
  },
});
