import Lenis from "lenis";

const nav = document.getElementById("nav");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/* ---------- scroll suave + nav ---------- */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.09 });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}
/* ---------- wordmark: do centro do hero ao centro do cabeçalho (como na referência) ---------- */
const hero = document.querySelector(".hero");
const wm = hero?.querySelector("[data-wm]");
const navWm = nav.querySelector(".nav__wm");
const desktop = matchMedia("(min-width: 961px)");
if (wm && !reduce) {
  let sEnd = 0.3;
  const measure = () => { sEnd = navWm.offsetWidth / wm.offsetWidth || 0.3; };
  const update = () => {
    if (!desktop.matches) {
      wm.classList.remove("is-fixed", "is-gone");
      nav.classList.add("wm-on");
      return;
    }
    const top0 = parseFloat(getComputedStyle(nav).top) || 0; // barra de admin do WP
    const heroBottom = hero.getBoundingClientRect().bottom;
    const t = Math.min(1, Math.max(0, 1 - (heroBottom - top0) / hero.offsetHeight));
    const navH = nav.offsetHeight;
    wm.classList.add("is-fixed");
    wm.style.setProperty("--y", `${(top0 + Math.max(heroBottom, top0)) / 2 + (navH / 2) * t}px`);
    wm.style.setProperty("--s", (1 + (sEnd - 1) * t).toFixed(4));
    wm.classList.toggle("is-gone", t >= 1);
    nav.classList.toggle("wm-on", t >= 1);
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", () => { measure(); update(); });
  document.fonts.ready.then(() => { measure(); update(); });
  measure();
  update();
} else {
  nav.classList.add("wm-on");
}

const toggle = nav.querySelector(".nav__toggle");
const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "Fechar" : "Menu";
};
toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.querySelector(".nav__menu").addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
});

/* ---------- revelações ---------- */
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".rv, .split").forEach((el) => io.observe(el));

/* ---------- cursor ---------- */
const cursor = document.querySelector(".cursor");
if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; });
  addEventListener("mouseover", (e) => cursor.classList.toggle("big", !!e.target.closest("a, button, input")));
  (function loop() {
    cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(loop);
  })();
}

/* ---------- vídeo do YouTube em pop-up ---------- */
const dlg = document.getElementById("video");
const frame = dlg.querySelector(".video__frame");
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-yt]");
  if (!b) return;
  frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(b.dataset.yt)}?autoplay=1" title="Vídeo" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
  dlg.showModal();
});
dlg.querySelector(".video__close").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());
dlg.addEventListener("close", () => (frame.innerHTML = ""));

/* ---------- seções em abas (Apresentação/Entrevistas, Quem somos/Produções) ----------
   São links para seções da página (aria-current), não um widget ARIA de abas. */
document.querySelectorAll("[data-tabs]").forEach((box) => {
  const links = [...box.querySelectorAll(".tabs a")];
  const panels = [...box.querySelectorAll("[data-panel]")];
  const owns = (hash) => panels.some((p) => "#" + p.id === hash);
  const show = (id, scroll) => {
    const panel = panels.find((p) => p.id === id) || panels[0];
    panels.forEach((p) => (p.hidden = p !== panel));
    links.forEach((a) => a.setAttribute("aria-current", a.hash === "#" + panel.id ? "page" : "false"));
    panel.querySelectorAll(".rv, .split").forEach((el) => el.classList.add("in"));
    lenis?.resize();
    if (scroll) {
      const y = box.getBoundingClientRect().top + scrollY - 80;
      lenis ? lenis.scrollTo(y, { duration: 1.2 }) : scrollTo({ top: y, behavior: "smooth" });
    }
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || !owns(a.hash)) return;
    e.preventDefault();
    history.replaceState(null, "", a.hash);
    show(a.hash.slice(1), true);
  });
  show(location.hash.slice(1), owns(location.hash));
});

/* ---------- busca + A–Z nas entrevistas ---------- */
document.querySelectorAll("[data-finder]").forEach((root) => {
  const q = root.querySelector("#q");
  const items = [...root.querySelectorAll(".person")];
  const empty = root.querySelector(".people__empty");
  const btns = [...root.querySelectorAll(".az button")];
  let letter = "";
  const apply = () => {
    const s = norm(q.value.trim());
    let n = 0;
    items.forEach((li) => {
      const ok = li.dataset.n.includes(s) && (!letter || li.dataset.n[0] === letter.toLowerCase());
      li.hidden = !ok;
      if (ok) { n++; li.classList.add("in"); }
    });
    empty.hidden = n > 0;
    lenis?.resize();
  };
  q.addEventListener("input", apply);
  btns.forEach((b) => b.addEventListener("click", () => {
    letter = b.dataset.l;
    btns.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    apply();
  }));
});

/* ---------- eventos: imagem segue o mouse ---------- */
const prev = document.querySelector(".ev-preview");
if (prev && matchMedia("(hover: hover)").matches) {
  let x = 0, y = 0, px = 0, py = 0;
  addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; });
  (function loop() {
    px += (x - px) * 0.15; py += (y - py) * 0.15;
    prev.style.transform = `translate3d(${px + 24}px, ${py - 140}px, 0)`;
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll(".ev").forEach((li, i) => {
    li.addEventListener("mouseenter", () => {
      prev.style.setProperty("--img", li.dataset.img ? `url("${li.dataset.img}")` : "");
      prev.style.setProperty("--c1", ["#A9502B", "#23324A", "#C8923A", "#6B3F26"][i % 4]);
      prev.classList.add("on");
    });
    li.addEventListener("mouseleave", () => prev.classList.remove("on"));
  });
}

/* ---------- home ---------- */
const track = document.querySelector(".track");
document.querySelectorAll("[data-car]").forEach((b) =>
  b.addEventListener("click", () => track.scrollBy({ left: +b.dataset.car * track.firstElementChild.offsetWidth * 1.05, behavior: "smooth" })));

const section = document.querySelector(".voices");
if (section) {
  const vozes = JSON.parse(document.getElementById("vozes-data").textContent);
  const vc = section.querySelector("[data-vc]");
  let current = 0;
  const { mountVoices } = await import("./scene.js");
  mountVoices({
    stage: section.querySelector(".voices__stage"),
    section,
    vozes,
    onActive: (i) => { current = i; vc.textContent = String(i + 1).padStart(2, "0"); },
    onPick: (i, y) => {
      // clicar em quem está falando abre a entrevista; em outra pessoa, leva até ela
      if (i === current && vozes[i].url) { location.href = vozes[i].url; return; }
      lenis ? lenis.scrollTo(y, { duration: 1.6 }) : scrollTo({ top: y, behavior: "smooth" });
    },
  });
}
