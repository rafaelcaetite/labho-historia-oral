/**
 * Identificação do projeto Sanity. Fica num módulo sem dependências porque é
 * lido dos dois lados: pelo painel, no navegador, e pelo adaptador, no servidor.
 */
export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const sanityApiVersion = "2024-10-01";

/** O CMS real só entra em cena quando o projeto Sanity está configurado. */
export const sanityEstaConfigurado = sanityProjectId.trim().length > 0;
