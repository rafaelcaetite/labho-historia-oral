import { defineField, defineType } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";

export const sobrePageType = defineType({
  name: "sobrePage",
  title: "Página Sobre (Laboratório)",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título da página",
      type: "string",
      initialValue: "Quem somos",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lead",
      title: "Resumo / Apresentação curta",
      type: "text",
      rows: 2,
      initialValue:
        "Um espaço de pesquisa, ensino e extensão dedicado à história oral no Departamento de História da UFV.",
    }),
    defineField({
      name: "body",
      title: "Texto de apresentação completa (Aba Quem somos)",
      type: "text",
      rows: 8,
      initialValue:
        "O Laboratório de História Oral nasceu da necessidade de registrar experiências que não aparecem nos documentos escritos.\n\nVinculado ao Departamento de História da Universidade Federal de Viçosa, o laboratório desenvolve projetos de pesquisa, forma estudantes na metodologia da história oral e mantém um acervo aberto à consulta.\n\nTrabalhamos em parceria com comunidades, movimentos sociais e instituições da Zona da Mata mineira.",
    }),
    defineField({
      name: "image",
      title: "Imagem principal",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galeria de fotos (Aba Quem somos)",
      type: "array",
      of: [
        {
          type: "object",
          name: "fotoSobre",
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
      name: "producoesIntro",
      title: "Texto de introdução da aba Produções",
      type: "text",
      rows: 2,
      initialValue:
        "Vídeos, publicações e materiais produzidos a partir do acervo e das atividades do laboratório.",
    }),
  ],
});
