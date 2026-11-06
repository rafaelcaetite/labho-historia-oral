import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contatoPageType = defineType({
  name: "contatoPage",
  title: "Página Contato",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título da página",
      type: "string",
      initialValue: "Vamos *conversar*",
      validation: (Rule) => Rule.required(),
      description: "Palavras entre *asteriscos* serão destacadas em itálico.",
    }),
    defineField({
      name: "lead",
      title: "Resumo / Frase de apresentação",
      type: "text",
      rows: 2,
      initialValue:
        "Escreva para propor parcerias, doar acervos ou participar das atividades do laboratório.",
    }),
    defineField({
      name: "image",
      title: "Imagem de cabeçalho",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "body",
      title: "Texto explicativo adicional (opcional)",
      type: "text",
      rows: 4,
    }),
  ],
});
