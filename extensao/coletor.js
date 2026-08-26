// Injected into the active tab only when the user clicks the button, and only
// into that one tab. The manifest asks for `activeTab` + `scripting` and no
// host permissions at all, so this code cannot run on any page the user has
// not explicitly pointed it at.
//
// It reads the rendered page. It does not read cookies, storage, credentials
// or network traffic, and it makes no requests. Everything it finds is handed
// back to the popup for the user to confirm before anything leaves.

(() => {
  const PRICE = /R\$\s*([\d.]+,\d{2})/;

  // Package descriptors, in the forms Brazilian retail actually prints them.
  // Order matters: multipacks must win over the bare amount inside them, or
  // "6x350ml" gets read as "350ml" and the whole comparison is wrong.
  const PACK = [
    /(\d+)\s*[x×]\s*(\d+(?:[.,]\d+)?)\s*(kg|g|ml|l)\b/i,
    /\bc\/\s*(\d+)\b/i,
    /\bcom\s+(\d+)\s*(?:un|unidades)\b/i,
    /(\d+(?:[.,]\d+)?)\s*(kg|g|ml|l)\b/i,
  ];

  const clean = (s) => (s || "").replace(/\s+/g, " ").trim();

  function findPack(text) {
    for (const re of PACK) {
      const m = text.match(re);
      if (m) return clean(m[0]).toLowerCase().replace(/\s+/g, "");
    }
    return "";
  }

  // Walk up from the price to the smallest ancestor that also carries a plausible
  // product name. Card layouts differ per merchant; the common invariant is that
  // the name and the price share a container a few levels up.
  function nameFor(el) {
    let node = el;
    for (let depth = 0; depth < 6 && node; depth += 1) {
      // Split on the raw newlines FIRST. Collapsing whitespace before the split
      // merges the product name into the price line, and then the price filter
      // below throws the name away with it.
      const text = node.innerText || "";
      if (text.length > 12 && text.length < 400) {
        const line = text
          .split("\n")
          .map(clean)
          .filter((l) => l.length > 6 && !PRICE.test(l) && !/^\d+%|^por |^de /i.test(l))
          .sort((a, b) => b.length - a.length)[0];
        if (line) return line.slice(0, 90);
      }
      node = node.parentElement;
    }
    return "";
  }

  const seen = new Set();
  const found = [];

  // Leaf elements only: a price string appears in every ancestor's innerText,
  // so anything else double-counts the whole page.
  for (const el of document.querySelectorAll("body *")) {
    if (el.children.length > 0) continue;
    const text = clean(el.textContent);
    if (!text || text.length > 40) continue;

    const price = text.match(PRICE);
    if (!price) continue;
    if (!el.getClientRects().length) continue; // not visible

    const nome = nameFor(el);
    if (!nome) continue;

    const key = `${nome}|${price[1]}`;
    if (seen.has(key)) continue;
    seen.add(key);

    found.push({
      nome,
      preco: price[1],
      embalagem: findPack(nome),
      sku: nome
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 48),
    });
  }

  return {
    mercado: location.hostname.replace(/^www\./, "").split(".")[0],
    url: location.href,
    itens: found.slice(0, 60),
  };
})();
