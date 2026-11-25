// node scripts/boneco.test.mjs (Node 22+ lê .ts direto)
import assert from "node:assert/strict";
import { configurarBoneco } from "../lib/boneco.ts";

const padrao = { skin: "#111111", style: "afro", top: "#B3160C", bottom: "#0B1440", dress: true };
assert.equal(configurarBoneco(undefined, padrao), padrao);
assert.equal(configurarBoneco({ pele: null, cabelo: "", idoso: false }, padrao), padrao);

const a = configurarBoneco({ cabelo: "longo", corRoupa: "azul", pele: "clara" }, padrao);
assert.deepEqual(a, { skin: "#D9A988", style: "longo", top: "#1E4FC4", bottom: "#0B1440", dress: false, hair: "#17110D", elder: false });

const b = configurarBoneco({ idoso: true, roupa: "vestido", cabelo: "xyz", pele: "nada" }, padrao);
assert.equal(b.hair, "#CFC9C0");
assert.equal(b.elder, true);
assert.equal(b.dress, true);
assert.equal(b.style, "curto");
assert.equal(b.skin, "#111111");
assert.equal(configurarBoneco({ idoso: true, corCabelo: "loiro" }, padrao).hair, "#C79A4B");

const m = configurarBoneco({ corRoupa: "marinho" }, padrao);
assert.notEqual(m.top, m.bottom);
console.log("boneco: 10/10 asserts ok");
