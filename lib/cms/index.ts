import { fixtureSource } from "./fixtures";
import { sanityEstaConfigurado, sanitySource } from "./sanity";
import type { ContentSource } from "./types";

/**
 * Ponto único de acesso ao conteúdo. As páginas importam daqui e não sabem se
 * o conteúdo veio do Sanity ou das fixtures locais — a escolha depende apenas
 * de `NEXT_PUBLIC_SANITY_PROJECT_ID` estar preenchido.
 */
export const cms: ContentSource = sanityEstaConfigurado
  ? sanitySource
  : fixtureSource;

export const usandoConteudoDeExemplo = !sanityEstaConfigurado;

export * from "./types";
export { sanityEstaConfigurado } from "./projeto-sanity";
