import { contatoPageType } from "./contatoPage";
import { entrevistaType } from "./entrevista";
import { eventoType } from "./evento";
import { homePageType } from "./homePage";
import { producaoType } from "./producao";
import { projetoType } from "./projeto";
import { siteSettingsType } from "./siteSettings";
import { sobrePageType } from "./sobrePage";

export const schemaTypes = [
  // Singletons
  siteSettingsType,
  homePageType,
  sobrePageType,
  contatoPageType,
  // Coleções
  projetoType,
  entrevistaType,
  eventoType,
  producaoType,
];
