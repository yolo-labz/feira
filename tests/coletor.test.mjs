#!/usr/bin/env node
// Runnable check for the browser extension's page collector.
//
// The collector runs inside a real browser, but its two failure modes are pure
// parsing bugs that a fake DOM catches for free:
//   1. picking up the price line as the product name
//   2. reading "350ml" out of "6x350ml", which silently corrupts every
//      comparison the price ever feeds into
//
//   node tests/coletor.test.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(here, "..", "extensao", "coletor.js"), "utf8");

function el(tag, text, children = []) {
  const node = {
    tagName: tag,
    textContent: text ?? "",
    children,
    parentElement: null,
    getClientRects: () => [{}],
  };
  children.forEach((c) => (c.parentElement = node));
  Object.defineProperty(node, "innerText", {
    get() {
      return node.children.length
        ? node.children.map((c) => c.innerText).join("\n")
        : node.textContent;
    },
  });
  return node;
}

const card = (nome, preco) => el("div", null, [el("span", nome), el("span", preco)]);

const cards = [
  card("Óleo de Soja Liza 900ml", "R$ 7,49"),
  card("Arroz Branco Tio João Tipo 1 5kg", "R$ 27,45"),
  card("Refrigerante Coca-Cola fardo 6x350ml", "R$ 21,90"),
  card("Papel Higiênico Neve Folha Dupla c/16", "R$ 39,90"),
  card("Bandeja de ovos", "R$ 18,90"),
];

const all = [];
(function walk(n) {
  all.push(n);
  n.children.forEach(walk);
})(el("body", null, cards));

globalThis.document = { querySelectorAll: (s) => (s === "body *" ? all : []) };
globalThis.location = { hostname: "www.atacarejo-exemplo.com.br", href: "https://exemplo/x" };

const out = eval(src);
const by = Object.fromEntries(out.itens.map((i) => [i.sku, i]));
const falhas = [];

const check = (rotulo, got, want) => {
  if (got !== want) falhas.push(`${rotulo}: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
};

check("merchant from hostname", out.mercado, "atacarejo-exemplo");
check("found every card", out.itens.length, cards.length);

check("name is not the price line", by["oleo-de-soja-liza-900ml"]?.nome, "Óleo de Soja Liza 900ml");
check("price parsed", by["oleo-de-soja-liza-900ml"]?.preco, "7,49");
check("volume package", by["oleo-de-soja-liza-900ml"]?.embalagem, "900ml");
check("mass package", by["arroz-branco-tio-joao-tipo-1-5kg"]?.embalagem, "5kg");

// The one that matters most: a multipack must not be read as its inner amount.
check("multipack beats inner amount", by["refrigerante-coca-cola-fardo-6x350ml"]?.embalagem, "6x350ml");
check("count package", by["papel-higienico-neve-folha-dupla-c-16"]?.embalagem, "c/16");

// No package is a legitimate answer, not an error — the popup flags it for review
// rather than guessing, because a guessed package is an invisible wrong price.
check("no package stays empty", by["bandeja-de-ovos"]?.embalagem, "");

if (falhas.length) {
  console.error(`FAIL — ${falhas.length} checks did not hold:\n`);
  falhas.forEach((f) => console.error(`  ${f}`));
  process.exit(1);
}
console.log(`ok — collector read ${out.itens.length} cards, packages and names intact`);
