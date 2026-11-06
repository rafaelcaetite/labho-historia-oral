import { defineField, defineType } from "sanity";
import { MasterDetailIcon } from "@sanity/icons";

export const projetoType = defineType({
  name: "projeto",
  title: "Projetos do Acervo",
  type: "document",
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nome do projeto",
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
      name: "excerpt",
      title: "Resumo / Frase de apresentação",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Apresentação completa do projeto",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "coverImage",
      title: "Imagem principal / Capa",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galeria de imagens do projeto",
      type: "array",
      of: [
        {
          type: "object",
          name: "fotoProjeto",
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
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "coverImage",
    },
  },
});
