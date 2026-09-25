// Cena "Vozes": pessoas em low-poly (maioria preta e parda, algumas idosas, poucas brancas),
// câmera guiada pelo scroll, balões de fala em HTML projetados a partir das cabeças 3D.
import * as THREE from "three";

const HAIR = "#17110D";
const GREY = "#CFC9C0";
const CLOTH = ["#A9502B", "#23324A", "#C8923A", "#E6DCCB", "#4E5A3A", "#7C2E22", "#2F2A26", "#B98A5E"];
const STYLES = ["afro", "turbante", "curto", "trancas", "coque", "curto", "afro"];
const DARK = ["#3E2419", "#5C3A26", "#84563A", "#4B2D1F", "#9A6844", "#6E4430", "#7A4B31"];
const LIGHT = ["#E7C3A3", "#D9A988"];
const GAP = 2.3;

// elenco dos protagonistas (repete em ciclo se houver mais falas)
const CAST = [
  { skin: "#3E2419", style: "afro", top: "#A9502B", bottom: "#2F2A26", dress: true },
  { skin: "#5C3A26", style: "curto", top: "#23324A", bottom: "#E6DCCB", hair: GREY, elder: true },
  { skin: "#84563A", style: "turbante", top: "#C8923A", bottom: "#2F2A26", dress: true },
  { skin: "#E7C3A3", style: "curto", top: "#4E5A3A", bottom: "#2F2A26", hair: "#6B4A2E" },
  { skin: "#4B2D1F", style: "coque", top: "#7C2E22", bottom: "#2F2A26", hair: GREY, elder: true, dress: true },
  { skin: "#9A6844", style: "trancas", top: "#2F2A26", bottom: "#E6DCCB" },
  { skin: "#6E4430", style: "afro", top: "#B98A5E", bottom: "#2F2A26" },
];

const G = {
  leg: new THREE.CapsuleGeometry(0.07, 0.68, 4, 8),
  shoe: new THREE.BoxGeometry(0.11, 0.06, 0.2),
  skirt: new THREE.CylinderGeometry(0.15, 0.29, 0.62, 12, 1),
  torso: new THREE.CapsuleGeometry(0.17, 0.36, 4, 12),
  arm: new THREE.CapsuleGeometry(0.05, 0.5, 4, 8),
  hand: new THREE.SphereGeometry(0.055, 8, 6),
  neck: new THREE.CylinderGeometry(0.05, 0.056, 0.14, 8),
  head: new THREE.SphereGeometry(0.13, 16, 12),
  afro: new THREE.IcosahedronGeometry(0.2, 1),
  cap: new THREE.SphereGeometry(0.139, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.55),
  bun: new THREE.SphereGeometry(0.075, 10, 8),
  wrap: new THREE.SphereGeometry(0.152, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.62),
  wrapTop: new THREE.IcosahedronGeometry(0.11, 0),
  braid: new THREE.CapsuleGeometry(0.028, 0.32, 3, 6),
  cane: new THREE.CylinderGeometry(0.017, 0.017, 0.9, 6),
  caneTop: new THREE.TorusGeometry(0.05, 0.016, 6, 12, Math.PI),
  shadow: new THREE.PlaneGeometry(1.1, 0.55),
};

const mats = new Map();
const mat = (hex) => {
  if (!mats.has(hex)) mats.set(hex, new THREE.MeshStandardMaterial({ color: hex, roughness: 0.82, metalness: 0, flatShading: true }));
  return mats.get(hex);
};

// sombra de contato suave (substitui sombras projetadas, que riscavam o chão)
let shadowMat;
function contactShadow() {
  if (!shadowMat) {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, "rgba(45,30,20,.32)");
    grd.addColorStop(1, "rgba(45,30,20,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    shadowMat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false });
  }
  const m = new THREE.Mesh(G.shadow, shadowMat);
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.002;
  return m;
}

function mesh(geo, color, x, y, z, parent) {
  const m = new THREE.Mesh(geo, mat(color));
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

function buildPerson(i, { skin, style, top, bottom, dress, hair = HAIR, elder = false }) {
  const group = new THREE.Group();
  const body = new THREE.Group();
  group.add(body, contactShadow());

  for (const s of [-1, 1]) {
    mesh(G.leg, bottom, s * 0.085, 0.45, 0, body);
    mesh(G.shoe, "#1F1A17", s * 0.085, 0.03, 0.035, body);
  }
  if (dress) mesh(G.skirt, top, 0, 0.64, 0, body);
  const torso = mesh(G.torso, top, 0, 1.2, 0, body);
  torso.scale.z = 0.72;

  const arms = [-1, 1].map((s) => {
    const pivot = new THREE.Group();
    pivot.position.set(s * 0.225, 1.46, 0);
    pivot.rotation.z = s * 0.08;
    mesh(G.arm, top, 0, -0.3, 0, pivot);
    mesh(G.hand, skin, 0, -0.62, 0, pivot);
    body.add(pivot);
    return pivot;
  });

  mesh(G.neck, skin, 0, 1.6, 0, body);
  const head = new THREE.Group();
  head.position.set(0, 1.73, 0);
  body.add(head);
  mesh(G.head, skin, 0, 0, 0, head).scale.set(0.92, 1.1, 0.98);

  if (style === "afro") mesh(G.afro, hair, 0, 0.07, -0.035, head).scale.set(1, 0.88, 0.95);
  if (style === "curto" || style === "coque" || style === "trancas") mesh(G.cap, hair, 0, 0.012, -0.008, head).rotation.x = -0.28;
  if (style === "coque") mesh(G.bun, hair, 0, 0.13, -0.1, head);
  if (style === "trancas") for (const s of [-1, 1]) mesh(G.braid, hair, s * 0.075, -0.13, -0.09, head).rotation.x = 0.18;
  if (style === "turbante") {
    const c = CLOTH[(Math.abs(i) + 2) % CLOTH.length];
    mesh(G.wrap, c, 0, 0.02, -0.012, head).rotation.x = -0.22;
    mesh(G.wrapTop, c, 0, 0.16, -0.05, head).scale.set(1.15, 0.8, 1.1);
  }

  // idoso(a): corpo levemente curvado e bengala na mão direita
  if (elder) {
    body.rotation.x = 0.09;
    mesh(G.cane, "#4A3222", 0.33, 0.45, 0.15, body);
    mesh(G.caneTop, "#4A3222", 0.37, 0.9, 0.15, body);
    arms[1].rotation.set(-0.25, 0, 0.17);
  }

  group.traverse((o) => { if (o.isMesh) o.userData.idx = i; });
  return { group, body, head, arms, torso, elder, g: 0, w: 0, yaw: 0 };
}

const rnd = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// índice da pessoa -> progresso do scroll (inverso do mapeamento em tick)
const progressFor = (i, n) => (i / (n - 1) + 0.04) / 1.08;

export function mountVoices({ stage, section, vozes, onActive, onPick }) {
  const N = vozes.length;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cursor = document.querySelector(".cursor");

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    // sem WebGL: mostra as falas como texto
    stage.insertAdjacentHTML("beforeend", `<div class="voices__head" style="top:auto;bottom:90px;display:block">${vozes.map((v) => `<p style="font-size:22px;max-width:40ch">“${esc(v.q)}”</p>`).join("")}</div>`);
    return () => {};
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.domElement.setAttribute("aria-hidden", "true");
  stage.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("#E1DFD5", 10, 24); // névoa leve: tons de pele continuam legíveis ao fundo
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);

  scene.add(new THREE.HemisphereLight("#FFF6EA", "#B89A80", 1.25));
  const key = new THREE.DirectionalLight("#FFE6CC", 1.7);
  key.position.set(3, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight("#D89A48", 0.9);
  rim.position.set(-4, 3, -5);
  scene.add(rim);

  // protagonistas
  const people = vozes.map((_, i) => {
    const per = buildPerson(i, CAST[i % CAST.length]);
    per.baseZ = i % 2 ? -0.35 : 0.2;
    per.group.position.set(i * GAP, 0, per.baseZ);
    scene.add(per.group);
    return per;
  });
  // hitbox oval invisível e fixa (não acompanha braços): evita o liga-desliga do aceno
  const hitGeo = new THREE.SphereGeometry(1, 16, 12);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitMeshes = people.map((p, i) => {
    const h = new THREE.Mesh(hitGeo, hitMat);
    h.scale.set(0.6, 1.05, 0.45);
    h.position.y = 0.98;
    h.userData.idx = i;
    p.group.add(h);
    return h;
  });

  // multidão ao fundo, dissolvida na névoa
  const r = rnd(7);
  const crowd = Array.from({ length: 12 }, (_, k) => {
    const elder = r() < 0.2;
    const c = buildPerson(-1, {
      skin: r() < 0.12 ? LIGHT[k % LIGHT.length] : DARK[Math.floor(r() * DARK.length)],
      style: STYLES[Math.floor(r() * STYLES.length)],
      top: CLOTH[Math.floor(r() * CLOTH.length)],
      bottom: "#2F2A26",
      dress: r() > 0.6,
      hair: elder ? GREY : HAIR,
      elder,
    });
    c.group.position.set(-3 + r() * ((N - 1) * GAP + 6), 0, -5 - r() * 4);
    c.group.rotation.y = (r() - 0.5) * 1.4;
    c.phase = k * 1.7;
    scene.add(c.group);
    return c;
  });

  // balões
  const bubbles = vozes.map((v) => {
    const el = document.createElement("div");
    el.className = "bubble";
    el.setAttribute("aria-hidden", "true");
    const words = String(v.q).split(" ").map((w) => `<span class="w">${[...w].map((ch) => `<span class="c">${esc(ch)}</span>`).join("")}</span>`).join(" ");
    el.innerHTML = `<p class="bubble__q">“${words}”</p><div class="bubble__by">${esc(v.by)}</div><div class="bubble__dots"><i></i><i></i><i></i></div>`;
    stage.appendChild(el);
    return { el, chars: [...el.querySelectorAll(".c")], shown: 0, typed: 0, hv: 0 };
  });
  // leitores de tela: anuncia só a fala ativa
  const live = document.createElement("p");
  live.setAttribute("aria-live", "polite");
  live.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)";
  stage.appendChild(live);

  let portrait = false, W = 1, H = 1, camX = 0, camZ = 8.2, visible = false, raf = 0, hovered = -1, active = -1;
  const mouse = new THREE.Vector2(), ms = new THREE.Vector2();
  const ray = new THREE.Raycaster();
  const v3 = new THREE.Vector3();
  const clock = new THREE.Clock();

  function resize() {
    W = stage.clientWidth; H = stage.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    portrait = W / H < 0.8;
    camZ = portrait ? 8.4 : 8.2;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  resize();

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) { clock.getDelta(); raf = requestAnimationFrame(tick); }
  });
  io.observe(stage);

  // o palco gruda abaixo do cabeçalho fixo: o progresso conta a partir daí
  const stickTop = () => parseFloat(getComputedStyle(stage).top) || 0;
  const travel = () => Math.max(1, section.offsetHeight - stage.offsetHeight);
  function progress() {
    return Math.min(1, Math.max(0, (stickTop() - section.getBoundingClientRect().top) / travel()));
  }
  const scrollYFor = (i) => section.getBoundingClientRect().top + scrollY - stickTop() + progressFor(i, N) * travel();

  const toNdc = (e, v) => {
    const b = stage.getBoundingClientRect();
    return v.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1);
  };
  // toque não move a câmera nem cria hover "preso" no último ponto tocado
  function onMove(e) { if (e.pointerType !== "touch") toNdc(e, mouse); }
  function onLeave() { mouse.set(0, 0); }
  // o clique faz o próprio raycast: no toque não existe pointermove antes do clique
  const tap = new THREE.Vector2();
  function onClick(e) {
    ray.setFromCamera(toNdc(e, tap), camera);
    const hit = ray.intersectObjects(hitMeshes, false)[0];
    if (hit) onPick(hit.object.userData.idx, scrollYFor(hit.object.userData.idx));
  }
  stage.addEventListener("pointermove", onMove);
  stage.addEventListener("pointerleave", onLeave);
  stage.addEventListener("click", onClick);

  // pausa em cada pessoa: câmera só anda no miolo do intervalo
  const dwell = (t) => {
    const f = Math.floor(t), x = t - f;
    return f + (x < 0.3 ? 0 : x > 0.7 ? 1 : (1 - Math.cos(((x - 0.3) / 0.4) * Math.PI)) / 2);
  };

  function tick() {
    raf = visible ? requestAnimationFrame(tick) : 0;
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    const p = progress();
    const idxF = Math.min(1, Math.max(0, p * 1.08 - 0.04)) * (N - 1);
    const now = Math.round(idxF);
    if (now !== active) {
      active = now;
      onActive(active);
      live.textContent = `${vozes[active].q} — ${vozes[active].by}`;
    }
    section.style.setProperty("--p", p.toFixed(4));

    // câmera: enquadramento baixo, pés perto da barra de progresso
    ms.lerp(mouse, 0.06);
    const k = reduce ? 1 : 1 - Math.pow(0.002, dt);
    camX += (dwell(idxF) * GAP - camX) * k;
    const off = portrait ? 0.15 : 0.35; // na tela em pé, quem fala fica centralizado
    camera.position.set(camX + off + ms.x * 0.35, 1.75 + ms.y * 0.15, camZ);
    camera.lookAt(camX + off, 1.6, 0);

    // hover
    ray.setFromCamera(mouse, camera);
    const hit = ray.intersectObjects(hitMeshes, false)[0];
    const h = hit ? hit.object.userData.idx : -1;
    if (h !== hovered) {
      hovered = h;
      stage.style.cursor = h >= 0 ? "pointer" : "";
      cursor?.classList.toggle("big", h >= 0);
    }

    const sp = people[active].group.position;
    people.forEach((per, i) => {
      const isSpk = i === active;
      per.g += ((isSpk ? 1 : 0) - per.g) * 0.06;
      per.w += ((i === hovered && !isSpk ? 1 : 0) - per.w) * 0.1;
      const gp = per.group.position;

      per.torso.scale.y = 1 + Math.sin(t * (per.elder ? 1.2 : 1.7) + i) * 0.012;
      per.body.position.y = per.w * Math.abs(Math.sin(t * 6)) * 0.03;

      // quem fala olha para a câmera; quem escuta olha para quem fala
      const yaw = isSpk || i === hovered
        ? Math.atan2(camera.position.x - gp.x, camera.position.z - gp.z) + ms.x * 0.35
        : Math.max(-0.8, Math.min(0.8, Math.atan2(sp.x - gp.x, sp.z - gp.z + 1.2)));
      per.yaw += (yaw - per.yaw) * 0.05;
      per.head.rotation.y = per.yaw * 0.7;
      per.body.rotation.y = per.yaw * 0.3;
      per.head.rotation.x = (per.elder ? -0.1 : 0) + (-ms.y * 0.12 + Math.sin(t * 5.3) * 0.035) * per.g;
      per.head.rotation.z = Math.sin(t * 0.8 + i) * 0.03;
      gp.z = per.baseZ + per.g * 0.25;

      // gestos de fala + aceno no hover (quem usa bengala gesticula com a outra mão)
      const [L, R] = per.arms;
      const talk = per.elder ? L : R;
      const side = per.elder ? -1 : 1;
      talk.rotation.x = -(0.85 + Math.sin(t * 3.1) * 0.28) * per.g;
      talk.rotation.z = side * (0.08 + per.w * (2.5 + Math.sin(t * 9) * 0.3));
      if (!per.elder) {
        L.rotation.x = -(0.35 + Math.sin(t * 2.3 + 1) * 0.15) * per.g;
        L.rotation.z = -0.08 - per.g * 0.1;
      }
    });
    crowd.forEach((c) => {
      c.torso.scale.y = 1 + Math.sin(t * 1.5 + c.phase) * 0.012;
      c.head.rotation.y = Math.sin(t * 0.3 + c.phase) * 0.4;
    });

    // posição do balão = topo da cabeça projetado na tela (x = borda esquerda, y = base)
    const place = (b, i) => {
      people[i].head.getWorldPosition(v3);
      v3.x += 0.08; v3.y += 0.26;
      v3.project(camera);
      const w = b.el.offsetWidth, h = b.el.offsetHeight;
      return {
        x: Math.max(12, Math.min((v3.x * 0.5 + 0.5) * W, W - w - 12)),
        y: Math.max(h + 12, (-v3.y * 0.5 + 0.5) * H),
        w, h,
      };
    };
    const speech = place(bubbles[active], active);

    // balões: fala ativa digita; hover em outra pessoa mostra "..."
    bubbles.forEach((b, i) => {
      const on = i === active;
      // hover com histerese (~100ms para entrar e sair): varrer o cursor não faz piscar
      b.hv = Math.min(1.2, Math.max(0, b.hv + (i === hovered ? dt : -dt) * 6));
      const dots = !on && b.hv > 0.6; // "digitando" só no hover
      // o modo (fala/digitando) só muda enquanto visível; no fade-out mantém o último,
      // senão o balão "some" mostrando por um instante o conteúdo do outro modo
      if (on || dots) b.el.dataset.mode = on ? "on" : "dots";
      b.el.classList.toggle("is-visible", on || dots);
      if (on) {
        b.off = 0;
        b.typed = reduce ? b.chars.length : Math.min(b.chars.length, b.typed + dt * 38);
        for (const n = Math.floor(b.typed); b.shown < n; b.shown++) b.chars[b.shown].classList.add("on");
      } else if (b.shown && (b.off = (b.off || 0) + dt) > 0.6) {
        // só apaga as letras depois do fade-out (0,5s), para o balão não sumir vazio
        b.typed = b.shown = 0;
        b.chars.forEach((c) => c.classList.remove("on"));
      }
      // posição atualizada sempre (também durante o fade-out, senão o balão fica para trás)
      const p = on ? speech : place(b, i);
      // quem está à direita de quem fala: se o "digitando" cair sob a fala, vai para depois dela
      if (i > active) {
        const dw = p.w * 0.72; // largura visual no modo digitando (scale .72)
        const hitsX = p.x < speech.x + speech.w + 12 && p.x + dw > speech.x - 12;
        const hitsY = p.y - p.h < speech.y && p.y > speech.y - speech.h;
        if (hitsX && hitsY) {
          p.x = speech.x + speech.w + 12;
          if (p.x + dw > W - 12) { p.x = W - dw - 12; p.y = speech.y - speech.h - 8; } // sem espaço à direita: sobe
        }
      }
      // `translate` (e não `transform`): a propriedade `scale` do balão não pode encolher o deslocamento
      b.el.style.translate = `${p.x.toFixed(1)}px calc(${p.y.toFixed(1)}px - 100%)`;
    });

    renderer.render(scene, camera);
  }

  return function dispose() {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    stage.removeEventListener("pointermove", onMove);
    stage.removeEventListener("pointerleave", onLeave);
    stage.removeEventListener("click", onClick);
    cursor?.classList.remove("big");
    bubbles.forEach((b) => b.el.remove());
    live.remove();
    hitGeo.dispose();
    hitMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    // geometrias/materiais compartilhados ficam em cache
  };
}
