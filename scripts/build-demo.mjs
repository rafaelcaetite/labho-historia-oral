/**
 * Gera o protótipo estático (pasta demo/) a partir de um WordPress local com o tema ativo.
 *
 *   npm run demo:serve   # sobe o WordPress de demonstração em :9401
 *   npm run demo:build   # percorre o site e grava HTML + assets em demo/
 *
 * O HTML é o renderizado pelo próprio tema, então o protótipo não duplica templates.
 */
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const [origin = "http://127.0.0.1:9401", outDir = "demo"] = process.argv.slice(2);

const SKIP = /^\/(wp-admin|wp-login\.php|wp-json|xmlrpc\.php|wp-sitemap|feed|comments)|\/feed\/|\/embed\//;
const ASSET = /\.(css|m?js|png|jpe?g|webp|avif|gif|svg|woff2?|ico)$/i;
const LINK_ATTR = /\s(?:href|src)=["']([^"']+)["']/g;
const SRCSET = /\ssrcset=["']([^"']+)["']/g;
const CSS_URL = /url\(\s*["']?([^"')]+)["']?\s*\)/g;
const JS_IMPORT = /(?:import\(\s*|from\s+)["'](\.{1,2}\/[^"']+)["']/g;
// metadados que só fazem sentido com o WordPress rodando (API REST, oEmbed, editores)
const WP_ONLY_LINKS = /<link[^>]+rel=["'](?:https:\/\/api\.w\.org\/|alternate|EditURI|shortlink|wlwmanifest)["'][^>]*>\s*/g;

const pages = ["/"];
const seenPages = new Set(pages);
const assets = [];
const seenAssets = new Set();

/** Converte uma URL encontrada no HTML/CSS em caminho local, ou null se for externa/ignorada. */
function toLocal(raw, base) {
  // "%23" = referência interna de SVG embutido (ex.: url(%23n) em filtros)
  if (!raw || raw.startsWith("#") || raw.startsWith("%23") || /^(mailto|tel|data|javascript):/.test(raw)) return null;
  let url;
  try { url = new URL(raw.replaceAll("&#038;", "&").replaceAll("&amp;", "&"), base); } catch { return null; }
  if (url.origin !== origin || SKIP.test(url.pathname)) return null;
  return url;
}

function queue(url) {
  if (ASSET.test(url.pathname)) {
    if (!seenAssets.has(url.pathname)) { seenAssets.add(url.pathname); assets.push(url.pathname + url.search); }
  } else if (!url.search && !seenPages.has(url.pathname)) {
    seenPages.add(url.pathname);
    pages.push(url.pathname);
  }
}

function clean(html) {
  const escaped = origin.replaceAll("/", "\\/");
  const selfPrefetch = new RegExp(`<link[^>]+dns-prefetch[^>]+//${new URL(origin).hostname}[^>]*>\\s*`, "g");
  return html.replace(WP_ONLY_LINKS, "").replace(selfPrefetch, "").replaceAll(escaped, "").replaceAll(origin, "");
}

async function save(path, data) {
  const file = join(outDir, decodeURIComponent(path));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, data);
}

async function crawlPage(path) {
  const res = await fetch(origin + path, { redirect: "manual" });
  if (res.status >= 300 && res.status < 400) {
    const to = toLocal(res.headers.get("location"), origin + path);
    if (to) queue(to);
    return;
  }
  if (!res.ok) { console.warn(`  ${res.status} ${path}`); return; }
  const html = await res.text();
  for (const m of html.matchAll(LINK_ATTR)) { const u = toLocal(m[1], origin + path); if (u) queue(u); }
  for (const m of html.matchAll(SRCSET)) {
    for (const part of m[1].split(",")) { const u = toLocal(part.trim().split(/\s+/)[0], origin + path); if (u) queue(u); }
  }
  await save(join(path, "index.html"), clean(html));
  console.log(`  página  ${path}`);
}

async function crawlAsset(path) {
  const res = await fetch(origin + path);
  if (!res.ok) { console.warn(`  ${res.status} ${path}`); return; }
  const pathname = new URL(path, origin).pathname;
  if (/\.(css|m?js)$/.test(pathname)) {
    const text = await res.text();
    const refs = pathname.endsWith(".css") ? CSS_URL : JS_IMPORT;
    for (const m of text.matchAll(refs)) { const u = toLocal(m[1], origin + pathname); if (u) queue(u); }
    await save(pathname, clean(text));
  } else {
    await save(pathname, Buffer.from(await res.arrayBuffer()));
  }
}

console.log(`Gerando protótipo de ${origin} em ${outDir}/`);
// esvazia em vez de apagar a pasta (no Windows ela pode estar em uso por um servidor ou pelo Explorer);
// .vercel guarda o vínculo com o projeto de deploy e precisa sobreviver ao rebuild
await mkdir(outDir, { recursive: true });
for (const entry of await readdir(outDir)) {
  if (entry !== ".vercel") await rm(join(outDir, entry), { recursive: true, force: true });
}
while (pages.length || assets.length) {
  if (pages.length) await crawlPage(pages.shift());
  else await crawlAsset(assets.shift());
}

// página 404 servida pela Vercel para rotas inexistentes
const notFound = await fetch(`${origin}/pagina-inexistente/`);
await save("404.html", clean(await notFound.text()));

console.log(`Pronto: ${seenPages.size} páginas, ${seenAssets.size} arquivos.`);
