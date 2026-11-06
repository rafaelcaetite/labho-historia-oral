import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Configurações e Contatos",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteName",
      title: "Nome do site / laboratório",
      type: "string",
      initialValue: "LabHO — Laboratório de História Oral",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slogan",
      title: "Slogan / Descrição curta",
      type: "string",
      initialValue:
        "Acervo de entrevistas do Laboratório de História Oral do Departamento de História da UFV.",
    }),
    defineField({
      name: "email",
      title: "E-mail de contato",
      type: "string",
      initialValue: "labho.dhi@ufv.br",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endereco",
      title: "Endereço físico",
      type: "text",
      rows: 3,
      initialValue: "Departamento de História — UFV\nAv. P. H. Rolfs, s/n\nViçosa, MG · 36570-900",
    }),
    defineField({
      name: "instagram",
      title: "Link do Instagram",
      type: "url",
      initialValue: "https://instagram.com/",
    }),
    defineField({
      name: "youtube",
      title: "Link do YouTube",
      type: "url",
      initialValue: "https://youtube.com/",
    }),
    defineField({
      name: "footerQuote",
      title: "Frase em destaque no rodapé",
      type: "text",
      rows: 2,
      initialValue: "Toda memória\ncomeça com uma escuta.",
    }),
    defineField({
      name: "apoioLogos",
      title: "Logos de apoio e parceiros",
      type: "array",
      of: [
        {
          type: "object",
          name: "logoApoio",
          title: "Logo de apoio",
          fields: [
            defineField({ name: "title", title: "Nome da instituição", type: "string" }),
            defineField({
              name: "image",
              title: "Imagem do logo",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "url", title: "Link da instituição", type: "url" }),
          ],
        },
      ],
    }),
  ],
});
