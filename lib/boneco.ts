// Aparência do bonequinho 3D definida no painel. Sem three: o schema do Sanity também importa daqui.
export interface Boneco {
  pele?: string | null;
  cabelo?: string | null;
  corCabelo?: string | null;
  roupa?: string | null;
  corRoupa?: string | null;
  idoso?: boolean | null;
}

export interface PersonConfig {
  skin: string;
  style: string;
  top: string;
  bottom: string;
  dress?: boolean;
  hair?: string;
  elder?: boolean;
}

type Opcoes = Record<string, { titulo: string; valor: string }>;

export const PELE: Opcoes = {
  muitoEscura: { titulo: "Muito escura", valor: "#3E2419" },
  escura: { titulo: "Escura", valor: "#5C3A26" },
  mediaEscura: { titulo: "Média escura", valor: "#84563A" },
  media: { titulo: "Média", valor: "#9A6844" },
  clara: { titulo: "Clara", valor: "#D9A988" },
  muitoClara: { titulo: "Muito clara", valor: "#E7C3A3" },
};
export const CABELO: Opcoes = {
  afro: { titulo: "Afro", valor: "afro" },
  curto: { titulo: "Curto", valor: "curto" },
  longo: { titulo: "Longo", valor: "longo" },
  coque: { titulo: "Coque", valor: "coque" },
  trancas: { titulo: "Tranças", valor: "trancas" },
  turbante: { titulo: "Turbante", valor: "turbante" },
  careca: { titulo: "Careca", valor: "careca" },
};
export const COR_CABELO: Opcoes = {
  preto: { titulo: "Preto", valor: "#17110D" },
  castanho: { titulo: "Castanho", valor: "#6B4A2E" },
  loiro: { titulo: "Loiro", valor: "#C79A4B" },
  grisalho: { titulo: "Grisalho", valor: "#CFC9C0" },
  branco: { titulo: "Branco", valor: "#EFEBE4" },
};
export const ROUPA: Opcoes = {
  calca: { titulo: "Calça e blusa", valor: "calca" },
  vestido: { titulo: "Vestido", valor: "vestido" },
};
export const COR_ROUPA: Opcoes = {
  vermelho: { titulo: "Vermelho", valor: "#B3160C" },
  azul: { titulo: "Azul", valor: "#1E4FC4" },
  ouro: { titulo: "Ouro", valor: "#E8A21C" },
  laranja: { titulo: "Laranja", valor: "#F3731B" },
  verde: { titulo: "Verde", valor: "#1F7A34" },
  vinho: { titulo: "Vinho", valor: "#6E1010" },
  marinho: { titulo: "Marinho", valor: "#0B1440" },
  creme: { titulo: "Creme", valor: "#FFE3B3" },
};

/** Lista no formato options.list do Sanity. */
export const paraLista = (o: Opcoes) =>
  Object.entries(o).map(([value, { titulo }]) => ({ title: titulo, value }));

const CAMPOS = ["pele", "cabelo", "corCabelo", "roupa", "corRoupa", "idoso"] as const;

/** Sem escolhas no painel, devolve o padrão do elenco; com qualquer escolha parte de uma base neutra. */
export function configurarBoneco(boneco: Boneco | null | undefined, padrao: PersonConfig): PersonConfig {
  if (!boneco || !CAMPOS.some((c) => boneco[c])) return padrao;
  const cfg: PersonConfig = {
    skin: padrao.skin,
    style: "curto",
    top: padrao.top,
    bottom: "#0B1440",
    dress: false,
    hair: COR_CABELO.preto.valor,
    elder: false,
  };
  if (boneco.pele && PELE[boneco.pele]) cfg.skin = PELE[boneco.pele].valor;
  if (boneco.cabelo && CABELO[boneco.cabelo]) cfg.style = CABELO[boneco.cabelo].valor;
  if (boneco.roupa && ROUPA[boneco.roupa]) cfg.dress = boneco.roupa === "vestido";
  if (boneco.corRoupa && COR_ROUPA[boneco.corRoupa]) cfg.top = COR_ROUPA[boneco.corRoupa].valor;
  if (boneco.idoso) {
    cfg.elder = true;
    cfg.hair = COR_CABELO.grisalho.valor;
  }
  if (boneco.corCabelo && COR_CABELO[boneco.corCabelo]) cfg.hair = COR_CABELO[boneco.corCabelo].valor;
  if (cfg.top === cfg.bottom) cfg.bottom = COR_ROUPA.vinho.valor; // calça não some na blusa marinho
  return cfg;
}
