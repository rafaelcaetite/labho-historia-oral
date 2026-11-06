import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const eventoType = defineType({
  name: "evento",
  title: "Agenda de Eventos",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título do evento",
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
      name: "data",
      title: "Data do evento",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "local",
      title: "Local do evento",
      type: "string",
      placeholder: "Ex.: Auditório do DHI, Cine UFV, Online",
    }),
    defineField({
      name: "excerpt",
      title: "Resumo / Tipo de evento",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "body",
      title: "Descrição completa do evento",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de divulgação / Banner",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "videoUrl",
      title: "Link da gravação (YouTube ou Drive)",
      type: "url",
    }),
    defineField({
      name: "certificadosUrl",
      title: "Link da pasta de certificados (Google Drive)",
      type: "url",
    }),
    defineField({
      name: "gallery",
      title: "Fotos do evento",
      type: "array",
      of: [
        {
          type: "object",
          name: "fotoEvento",
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
  orderings: [
    {
      title: "Data do evento (mais recente primeiro)",
      name: "dataDesc",
      by: [{ field: "data", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "data",
      media: "coverImage",
    },
  },
});
