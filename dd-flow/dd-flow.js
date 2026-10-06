var uo = Object.defineProperty;
var ho = (e, t, n) => t in e ? uo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var G = (e, t, n) => ho(e, typeof t != "symbol" ? t + "" : t, n);
const ee = {
  nodeClick: "dd-flow:node-click",
  edgeClick: "dd-flow:edge-click",
  backgroundClick: "dd-flow:background-click",
  /** Fired for a click on a row inside a `compound` node (see types.ts::NodeRow) — for a flow
   *  mount this fires INSTEAD OF `nodeClick`; for a graph mount it fires ALONGSIDE `nodeClick`
   *  (the row's owning node still gets pinned/highlighted, same as any other click on it). */
  rowClick: "dd-flow:row-click",
  selectionChange: "dd-flow:selection-change",
  subflowOpen: "dd-flow:subflow-open",
  /** Fired when a graph mount's level filter changes (see levels.ts) -- `key: null` means cleared. */
  filterChange: "dd-flow:filter-change"
};
function te(e, t, n) {
  e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: !0, composed: !0 }));
}
function ot(e, t) {
  const n = URL.createObjectURL(e), o = document.createElement("a");
  o.href = n, o.download = t, document.body.appendChild(o), o.click(), o.remove(), URL.revokeObjectURL(n);
}
function po(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  ot(new Blob([n], { type: "application/json" }), `${e}.layout.json`);
}
function wo(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  ot(new Blob([n], { type: "application/json" }), `${e}.flow.json`);
}
const mo = /^var\((--dd-flow-[a-z-]+)\)$/;
function go(e, t) {
  const n = e.cloneNode(!0), o = getComputedStyle(t), r = ["fill", "stroke"], s = (d) => {
    const l = d.match(mo);
    return l && o.getPropertyValue(l[1]).trim() || d;
  }, i = [n, ...Array.from(n.querySelectorAll("*"))];
  for (const d of i)
    for (const l of r) {
      const a = d.getAttribute(l);
      a && d.setAttribute(l, s(a));
    }
  return n;
}
function Sn(e, t) {
  const n = go(e, t);
  return n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), new XMLSerializer().serializeToString(n);
}
function yo(e, t, n) {
  const o = Sn(e, t);
  ot(new Blob([o], { type: "image/svg+xml;charset=utf-8" }), n);
}
function bo(e, t, n, o = 2) {
  const r = Sn(e, t), s = parseFloat(e.getAttribute("width") || "800"), i = parseFloat(e.getAttribute("height") || "600"), d = getComputedStyle(t).getPropertyValue("--dd-flow-canvas-bg").trim() || "#ffffff", l = new Blob([r], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(l), c = new Image();
  c.onload = () => {
    const f = document.createElement("canvas");
    f.width = s * o, f.height = i * o;
    const h = f.getContext("2d");
    if (!h) {
      URL.revokeObjectURL(a);
      return;
    }
    h.scale(o, o), h.fillStyle = d, h.fillRect(0, 0, s, i), h.drawImage(c, 0, 0, s, i), URL.revokeObjectURL(a), f.toBlob((w) => {
      w && ot(w, n);
    }, "image/png");
  }, c.onerror = () => URL.revokeObjectURL(a), c.src = a;
}
const vo = "dd-flow-graph-fullscreen-open";
let zt = 0;
function xo(e, t, n = !0) {
  let o = !1;
  const r = document.createComment("dd-flow fullscreen"), s = n ? document.createElement("button") : null, i = () => {
    s && (s.textContent = o ? "✕" : "⤢", s.setAttribute("aria-label", o ? "Close fullscreen" : "Fullscreen"), s.setAttribute("aria-pressed", String(o)));
  }, d = (a) => {
    a !== o && (zt += a ? 1 : -1, document.body.classList.toggle(vo, zt > 0)), a && !o && e.parentNode && e.parentNode !== document.body ? (e.replaceWith(r), document.body.appendChild(e)) : !a && r.parentNode && r.replaceWith(e), o = a, e.classList.toggle("dd-flow-graph-fullscreen", a), i(), t();
  }, l = (a) => {
    o && a.key === "Escape" && d(!1);
  };
  return document.addEventListener("keydown", l), s && (s.type = "button", s.className = "dd-flow-graph-expand", s.addEventListener("click", (a) => {
    a.stopPropagation(), d(!o);
  }), i(), e.appendChild(s)), {
    set: d,
    destroy() {
      o && d(!1), document.removeEventListener("keydown", l), s == null || s.remove();
    }
  };
}
const Eo = "http://www.w3.org/2000/svg";
function $(e, t = {}) {
  const n = document.createElementNS(Eo, e);
  for (const [o, r] of Object.entries(t)) n.setAttribute(o, String(r));
  return n;
}
const Gt = {
  start: { w: 140, h: 48 },
  end: { w: 140, h: 48 },
  process: { w: 180, h: 64 },
  decision: { w: 180, h: 100 },
  subprocess: { w: 200, h: 64 },
  document: { w: 180, h: 64 },
  data: { w: 180, h: 64 },
  manual: { w: 180, h: 64 },
  "manual-input": { w: 180, h: 64 },
  database: { w: 160, h: 100 },
  multidocument: { w: 190, h: 74 },
  delay: { w: 160, h: 64 },
  "on-page-reference": { w: 72, h: 72 },
  "off-page-reference": { w: 150, h: 90 },
  "alternate-process": { w: 180, h: 64 },
  merge: { w: 140, h: 100 },
  preparation: { w: 180, h: 80 },
  compound: { w: 220, h: 64 }
}, Ce = 24, Le = 28, Co = 8;
function Mt(e) {
  return Le + ((e == null ? void 0 : e.length) ?? 0) * Ce + Co;
}
function rt(e, t, n) {
  const o = [e, ...(t ?? []).map((s) => s.label)], r = Math.max(...o.map((s) => s.length));
  return Math.max(n, r * _n + 40);
}
function ne(e, t) {
  return `${e}::${t}`;
}
function Ot(e) {
  return `${ne(e.sourceNode, e.sourceRow)}=>${ne(e.targetNode, e.targetRow)}`;
}
function Ht(e, t, n) {
  var i;
  const o = ((i = e.rows) == null ? void 0 : i.findIndex((d) => d.id === t)) ?? -1;
  if (o < 0) return null;
  const s = -e.h / 2 + Le + o * Ce + Ce / 2;
  return { x: e.x + (n === "left" ? -e.w / 2 : e.w / 2), y: e.y + s };
}
function Oe(e) {
  switch (e) {
    case "start":
      return {
        fill: "var(--dd-flow-start-fill)",
        stroke: "var(--dd-flow-start-fill)",
        text: "var(--dd-flow-start-text)"
      };
    case "end":
      return { fill: "var(--dd-flow-end-fill)", stroke: "var(--dd-flow-end-fill)", text: "var(--dd-flow-end-text)" };
    case "decision":
      return {
        fill: "var(--dd-flow-decision-fill)",
        stroke: "var(--dd-flow-decision-stroke)",
        text: "var(--dd-flow-node-text)"
      };
    case "subprocess":
      return {
        fill: "var(--dd-flow-node-fill)",
        stroke: "var(--dd-flow-subprocess-stroke)",
        text: "var(--dd-flow-node-text)"
      };
    default:
      return {
        fill: "var(--dd-flow-node-fill)",
        stroke: "var(--dd-flow-node-stroke)",
        text: "var(--dd-flow-node-text)"
      };
  }
}
function Nn(e, t, n) {
  const { fill: o, stroke: r } = Oe(e), s = { fill: o, stroke: r, "stroke-width": 2 };
  switch (e) {
    case "start":
    case "end": {
      const i = n / 2;
      return $("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: i, ry: i, ...s });
    }
    case "decision": {
      const i = [
        [0, -n / 2],
        [t / 2, 0],
        [0, n / 2],
        [-t / 2, 0]
      ].map((d) => d.join(",")).join(" ");
      return $("polygon", { points: i, ...s });
    }
    case "data": {
      const i = t * 0.15, d = [
        [-t / 2 + i, -n / 2],
        [t / 2, -n / 2],
        [t / 2 - i, n / 2],
        [-t / 2, n / 2]
      ].map((l) => l.join(",")).join(" ");
      return $("polygon", { points: d, ...s });
    }
    case "manual": {
      const i = t * 0.12, d = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [t / 2 - i, n / 2],
        [-t / 2 + i, n / 2]
      ].map((l) => l.join(",")).join(" ");
      return $("polygon", { points: d, ...s });
    }
    case "document": {
      const i = n * 0.12, d = [
        `M ${-t / 2} ${-n / 2}`,
        `L ${t / 2} ${-n / 2}`,
        `L ${t / 2} ${n / 2 - i}`,
        `C ${t / 4} ${n / 2 + i}, ${-t / 4} ${n / 2 - i * 2}, ${-t / 2} ${n / 2}`,
        "Z"
      ].join(" ");
      return $("path", { d, ...s });
    }
    case "multidocument": {
      const i = $("g", {}), d = n * 0.12, l = [
        { x: 14, y: -14 },
        { x: 7, y: -7 },
        { x: 0, y: 0 }
      ];
      for (const { x: a, y: c } of l) {
        const f = [
          `M ${-t / 2 + a} ${-n / 2 + c}`,
          `L ${t / 2 + a} ${-n / 2 + c}`,
          `L ${t / 2 + a} ${n / 2 + c - d}`,
          `C ${t / 4 + a} ${n / 2 + c + d}, ${-t / 4 + a} ${n / 2 + c - d * 2}, ${-t / 2 + a} ${n / 2 + c}`,
          "Z"
        ].join(" ");
        i.appendChild($("path", { d: f, ...s }));
      }
      return i;
    }
    case "manual-input": {
      const i = [
        [-t / 2, -n / 2 + n * 0.3],
        [t / 2, -n / 2],
        [t / 2, n / 2],
        [-t / 2, n / 2]
      ].map((d) => d.join(",")).join(" ");
      return $("polygon", { points: i, ...s });
    }
    case "database": {
      const i = n * 0.18, d = -n / 2, l = n / 2, a = $("g", {}), c = [
        `M ${-t / 2} ${d + i}`,
        `L ${-t / 2} ${l - i}`,
        `A ${t / 2} ${i} 0 0 0 ${t / 2} ${l - i}`,
        `L ${t / 2} ${d + i}`,
        "Z"
      ].join(" ");
      return a.appendChild($("path", { d: c, ...s })), a.appendChild($("ellipse", { cx: 0, cy: d + i, rx: t / 2, ry: i, ...s })), a;
    }
    case "delay": {
      const i = n / 2, d = [
        `M ${-t / 2} ${-n / 2}`,
        `L ${t / 2 - i} ${-n / 2}`,
        `A ${i} ${i} 0 0 1 ${t / 2 - i} ${n / 2}`,
        `L ${-t / 2} ${n / 2}`,
        "Z"
      ].join(" ");
      return $("path", { d, ...s });
    }
    case "on-page-reference":
      return $("circle", { cx: 0, cy: 0, r: Math.min(t, n) / 2, ...s });
    case "off-page-reference": {
      const i = n * 0.3, d = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [t / 2, n / 2 - i],
        [0, n / 2],
        [-t / 2, n / 2 - i]
      ].map((l) => l.join(",")).join(" ");
      return $("polygon", { points: d, ...s });
    }
    case "alternate-process": {
      const i = n * 0.35;
      return $("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: i, ry: i, ...s });
    }
    case "merge": {
      const i = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [0, n / 2]
      ].map((d) => d.join(",")).join(" ");
      return $("polygon", { points: i, ...s });
    }
    case "preparation": {
      const i = t * 0.15, d = [
        [-t / 2 + i, -n / 2],
        [t / 2 - i, -n / 2],
        [t / 2, 0],
        [t / 2 - i, n / 2],
        [-t / 2 + i, n / 2],
        [-t / 2, 0]
      ].map((l) => l.join(",")).join(" ");
      return $("polygon", { points: d, ...s });
    }
    case "subprocess": {
      const i = $("g", {});
      i.appendChild($("rect", { x: -t / 2, y: -n / 2, width: t, height: n, ...s }));
      const d = 10;
      return i.appendChild(
        $("line", {
          x1: -t / 2 + d,
          y1: -n / 2,
          x2: -t / 2 + d,
          y2: n / 2,
          stroke: Oe(e).stroke,
          "stroke-width": 2
        })
      ), i.appendChild(
        $("line", {
          x1: t / 2 - d,
          y1: -n / 2,
          x2: t / 2 - d,
          y2: n / 2,
          stroke: Oe(e).stroke,
          "stroke-width": 2
        })
      ), i;
    }
    case "process":
    default:
      return $("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: 6, ry: 6, ...s });
  }
}
function Lo(e, t) {
  const n = $("g", { transform: `translate(${e / 2 - 16}, ${t / 2 - 16})`, class: "dd-flow-subflow-badge" });
  n.appendChild($("circle", { cx: 0, cy: 0, r: 10, fill: "var(--dd-flow-subprocess-stroke)" }));
  const o = $("path", {
    d: "M -4 3 L 3 -4 M -1 -4 L 3 -4 L 3 0",
    stroke: "#ffffff",
    "stroke-width": 1.6,
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });
  return n.appendChild(o), n;
}
const Fe = 12;
function ko(e, t) {
  const { text: n, stroke: o } = Oe(e.type), r = $("g", { class: "dd-flow-node-body" }), s = -e.h / 2, i = (l) => $("line", { x1: -e.w / 2, x2: e.w / 2, y1: l, y2: l, stroke: o, "stroke-width": 1, opacity: 0.4 }), d = $("text", {
    x: 0,
    y: s + Le / 2,
    fill: n,
    "text-anchor": "middle",
    "dominant-baseline": "central",
    class: "dd-flow-label"
  });
  return d.textContent = e.label, r.appendChild(d), r.appendChild(i(s + Le)), (e.rows ?? []).forEach((l, a) => {
    const c = s + Le + a * Ce, f = $("g", {
      class: `dd-flow-node-row${l.id === t ? " is-row-selected" : ""}`,
      "data-row-id": l.id
    });
    f.appendChild(
      $("rect", { x: -e.w / 2, y: c, width: e.w, height: Ce, fill: "transparent" })
    );
    const h = $("text", {
      x: -e.w / 2 + 10,
      y: c + Ce / 2,
      fill: n,
      "text-anchor": "start",
      "dominant-baseline": "central",
      class: "dd-flow-label"
    });
    h.textContent = l.label, f.appendChild(h), r.appendChild(f), a > 0 && r.appendChild(i(c));
  }), r;
}
function So(e, t = {}) {
  var r;
  const n = [
    "dd-flow-node",
    `dd-flow-node-${e.type}`,
    t.selected && "is-selected",
    t.multiselected && "is-multiselected"
  ].filter(Boolean).join(" "), o = $("g", {
    class: n,
    "data-node-id": e.id,
    transform: `translate(${e.x}, ${e.y})`
  });
  if (o.appendChild(Nn(e.type, e.w, e.h)), (r = e.rows) != null && r.length)
    o.appendChild(ko(e, t.selectedRowId));
  else {
    const { text: s } = Oe(e.type), i = $("text", {
      x: 0,
      y: 0,
      fill: s,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      class: "dd-flow-label"
    });
    No(i, e.label, e.w - 20), o.appendChild(i);
  }
  return e.subflow && o.appendChild(Lo(e.w, e.h)), t.resizable && o.appendChild(
    $("rect", {
      class: "dd-flow-resize-handle",
      x: e.w / 2 - Fe,
      y: e.h / 2 - Fe,
      width: Fe,
      height: Fe,
      fill: "var(--dd-flow-selection)",
      opacity: 0
    })
  ), o;
}
const vt = 16, _n = 7.2;
function $t(e, t) {
  const n = e.split(/\s+/), o = Math.max(4, Math.floor(t / _n)), r = [];
  let s = "";
  for (const i of n) {
    const d = s ? `${s} ${i}` : i;
    d.length > o && s ? (r.push(s), s = i) : s = d;
  }
  return s && r.push(s), r;
}
function No(e, t, n) {
  const o = $t(t, n), r = -((o.length - 1) * vt) / 2;
  o.forEach((s, i) => {
    const d = $("tspan", { x: 0, y: r + i * vt });
    d.textContent = s, e.appendChild(d);
  });
}
function At(e, t, n) {
  const r = n - (e === "start" || e === "end" ? n * 0.3 : 20);
  return $t(t, Math.max(20, r)).length * vt + 24;
}
function We(e) {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const o of e)
    t.has(o.to) || t.set(o.to, []), t.get(o.to).push(o.from), n.has(o.from) || n.set(o.from, []), n.get(o.from).push(o.to);
  return { parentsOf: t, childrenOf: n };
}
function ve(e, t) {
  const n = /* @__PURE__ */ new Set(), o = [...e.get(t) ?? []];
  for (; o.length; ) {
    const r = o.pop();
    n.has(r) || (n.add(r), o.push(...e.get(r) ?? []));
  }
  return n;
}
const qt = ["is-focus", "is-upstream", "is-downstream", "is-dimmed"], Yt = ["is-row-focus", "is-row-upstream", "is-row-downstream", "is-row-dimmed"];
function In(e, t, n, o, r) {
  const s = new Set(n ? [...o, n] : []), i = new Set(n ? [...r, n] : []);
  for (const l of e.querySelectorAll(".dd-flow-node")) {
    if (l.classList.remove(...qt), !n) continue;
    const a = l.getAttribute("data-node-id") ?? "";
    a === n ? l.classList.add("is-focus") : o.has(a) ? l.classList.add("is-upstream") : r.has(a) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed");
  }
  const d = new Map(t.map((l) => [l.id, l]));
  for (const l of e.querySelectorAll(".dd-flow-edge")) {
    if (l.classList.remove(...qt), !n) continue;
    const a = d.get(l.getAttribute("data-edge-id") ?? "");
    a && (s.has(a.from) && s.has(a.to) ? l.classList.add("is-upstream") : i.has(a.from) && i.has(a.to) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed"));
  }
}
function ze(e, t, n, o) {
  const r = o ? ve(n.parentsOf, o) : /* @__PURE__ */ new Set(), s = o ? ve(n.childrenOf, o) : /* @__PURE__ */ new Set();
  In(e, t, o, r, s);
}
function at(e, t, n, o) {
  var c;
  const r = o ? ne(o.nodeId, o.rowId) : null, s = r ? ve(n.parentsOf, r) : /* @__PURE__ */ new Set(), i = r ? ve(n.childrenOf, r) : /* @__PURE__ */ new Set(), d = new Set(r ? [...s, r] : []), l = new Set(r ? [...i, r] : []);
  for (const f of e.querySelectorAll(".dd-flow-node-row")) {
    if (f.classList.remove(...Yt), !r) continue;
    const h = ((c = f.closest(".dd-flow-node")) == null ? void 0 : c.getAttribute("data-node-id")) ?? "", w = f.getAttribute("data-row-id") ?? "", p = ne(h, w);
    p === r ? f.classList.add("is-row-focus") : s.has(p) ? f.classList.add("is-row-upstream") : i.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
  const a = new Map(t.map((f) => [Ot(f), f]));
  for (const f of e.querySelectorAll(".dd-flow-row-edge")) {
    if (f.classList.remove(...Yt), !r) continue;
    const h = a.get(f.getAttribute("data-row-edge-id") ?? "");
    if (!h) continue;
    const w = ne(h.sourceNode, h.sourceRow), p = ne(h.targetNode, h.targetRow);
    d.has(w) && d.has(p) ? f.classList.add("is-row-upstream") : l.has(w) && l.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
}
function _o(e, t, n = {}) {
  const o = We(t), r = n.flowId ?? "", s = n.rowEdges ?? [], i = We(
    s.map((g) => ({
      id: Ot(g),
      from: ne(g.sourceNode, g.sourceRow),
      to: ne(g.targetNode, g.targetRow)
    }))
  ), d = /* @__PURE__ */ new Map();
  for (const g of s)
    d.set(ne(g.sourceNode, g.sourceRow), g.sourceNode), d.set(ne(g.targetNode, g.targetRow), g.targetNode);
  let l = null, a = null;
  const c = () => a ? `r:${a.nodeId}:${a.rowId}` : l ? `n:${l}` : "", f = () => te(e, ee.selectionChange, {
    flowId: r,
    selectedNodeIds: a ? [a.nodeId] : l ? [l] : [],
    selectedEdgeId: null
  }), h = (g) => {
    var C;
    const L = (C = g == null ? void 0 : g.closest) == null ? void 0 : C.call(g, ".dd-flow-node");
    return (L == null ? void 0 : L.getAttribute("data-node-id")) ?? null;
  }, w = (g) => {
    var _, y;
    const L = (_ = g == null ? void 0 : g.closest) == null ? void 0 : _.call(g, ".dd-flow-node-row"), C = (y = L == null ? void 0 : L.closest(".dd-flow-node")) == null ? void 0 : y.getAttribute("data-node-id"), E = L == null ? void 0 : L.getAttribute("data-row-id");
    return C && E ? { nodeId: C, rowId: E } : null;
  }, p = () => {
    if (a) {
      const g = ne(a.nodeId, a.rowId), L = ve(i.parentsOf, g), C = ve(i.childrenOf, g);
      at(e, s, i, a);
      const E = new Set([...L].map((y) => d.get(y) ?? y)), _ = new Set([...C].map((y) => d.get(y) ?? y));
      In(e, t, a.nodeId, E, _);
    } else
      ze(e, t, o, l), s.length && at(e, s, i, null);
  }, b = (g) => {
    if (l || a) return;
    const L = h(g.target);
    L && ze(e, t, o, L);
  }, m = (g) => {
    var C, E;
    if (l || a) return;
    const L = (E = (C = g.relatedTarget) == null ? void 0 : C.closest) == null ? void 0 : E.call(C, ".dd-flow-node");
    L && L === g.target.closest(".dd-flow-node") || ze(e, t, o, null);
  }, x = (g) => {
    const L = h(g.target), C = s.length ? w(g.target) : null, E = c();
    C ? (a = (a == null ? void 0 : a.nodeId) === C.nodeId && (a == null ? void 0 : a.rowId) === C.rowId ? null : C, l = null) : (l = L && L !== l ? L : null, a = null), p(), L ? te(e, ee.nodeClick, {
      flowId: r,
      nodeId: L,
      shiftKey: g.shiftKey
    }) : te(e, ee.backgroundClick, {
      flowId: r,
      point: { x: g.clientX, y: g.clientY },
      shiftKey: g.shiftKey
    }), c() !== E && f();
  };
  return n.hover !== !1 && (e.addEventListener("pointerover", b), e.addEventListener("pointerout", m)), e.addEventListener("click", x), {
    setFocus(g) {
      const L = c();
      l = g, a = null, p(), c() !== L && f();
    },
    getFocus: () => l,
    setRowFocus(g) {
      const L = c();
      a = g, l = null, p(), c() !== L && f();
    },
    getRowFocus: () => a,
    destroy() {
      e.removeEventListener("pointerover", b), e.removeEventListener("pointerout", m), e.removeEventListener("click", x), ze(e, t, o, null), s.length && at(e, s, i, null);
    }
  };
}
function Io(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Mo = "\0", ge = "\0", Vt = "";
let Oo = class {
  constructor(t) {
    G(this, "_isDirected", !0);
    G(this, "_isMultigraph", !1);
    G(this, "_isCompound", !1);
    // Label for the graph itself
    G(this, "_label");
    // Defaults to be set when creating a new node
    G(this, "_defaultNodeLabelFn", () => {
    });
    // Defaults to be set when creating a new edge
    G(this, "_defaultEdgeLabelFn", () => {
    });
    // v -> label
    G(this, "_nodes", {});
    // v -> edgeObj
    G(this, "_in", {});
    // u -> v -> Number
    G(this, "_preds", {});
    // v -> edgeObj
    G(this, "_out", {});
    // v -> w -> Number
    G(this, "_sucs", {});
    // e -> edgeObj
    G(this, "_edgeObjs", {});
    // e -> label
    G(this, "_edgeLabels", {});
    /* Number of nodes in the graph. Should only be changed by the implementation. */
    G(this, "_nodeCount", 0);
    /* Number of edges in the graph. Should only be changed by the implementation. */
    G(this, "_edgeCount", 0);
    G(this, "_parent");
    G(this, "_children");
    t && (this._isDirected = Object.hasOwn(t, "directed") ? t.directed : !0, this._isMultigraph = Object.hasOwn(t, "multigraph") ? t.multigraph : !1, this._isCompound = Object.hasOwn(t, "compound") ? t.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[ge] = {});
  }
  /* === Graph functions ========= */
  /**
   * Whether graph was created with 'directed' flag set to true or not.
   */
  isDirected() {
    return this._isDirected;
  }
  /**
   * Whether graph was created with 'multigraph' flag set to true or not.
   */
  isMultigraph() {
    return this._isMultigraph;
  }
  /**
   * Whether graph was created with 'compound' flag set to true or not.
   */
  isCompound() {
    return this._isCompound;
  }
  /**
   * Sets the label of the graph.
   */
  setGraph(t) {
    return this._label = t, this;
  }
  /**
   * Gets the graph label.
   */
  graph() {
    return this._label;
  }
  /* === Node functions ========== */
  /**
   * Sets the default node label. If newDefault is a function, it will be
   * invoked ach time when setting a label for a node. Otherwise, this label
   * will be assigned as default label in case if no label was specified while
   * setting a node.
   * Complexity: O(1).
   */
  setDefaultNodeLabel(t) {
    return this._defaultNodeLabelFn = t, typeof t != "function" && (this._defaultNodeLabelFn = () => t), this;
  }
  /**
   * Gets the number of nodes in the graph.
   * Complexity: O(1).
   */
  nodeCount() {
    return this._nodeCount;
  }
  /**
   * Gets all nodes of the graph. Note, the in case of compound graph subnodes are
   * not included in list.
   * Complexity: O(1).
   */
  nodes() {
    return Object.keys(this._nodes);
  }
  /**
   * Gets list of nodes without in-edges.
   * Complexity: O(|V|).
   */
  sources() {
    var t = this;
    return this.nodes().filter((n) => Object.keys(t._in[n]).length === 0);
  }
  /**
   * Gets list of nodes without out-edges.
   * Complexity: O(|V|).
   */
  sinks() {
    var t = this;
    return this.nodes().filter((n) => Object.keys(t._out[n]).length === 0);
  }
  /**
   * Invokes setNode method for each node in names list.
   * Complexity: O(|names|).
   */
  setNodes(t, n) {
    var o = arguments, r = this;
    return t.forEach(function(s) {
      o.length > 1 ? r.setNode(s, n) : r.setNode(s);
    }), this;
  }
  /**
   * Creates or updates the value for the node v in the graph. If label is supplied
   * it is set as the value for the node. If label is not supplied and the node was
   * created by this call then the default node label will be assigned.
   * Complexity: O(1).
   */
  setNode(t, n) {
    return Object.hasOwn(this._nodes, t) ? (arguments.length > 1 && (this._nodes[t] = n), this) : (this._nodes[t] = arguments.length > 1 ? n : this._defaultNodeLabelFn(t), this._isCompound && (this._parent[t] = ge, this._children[t] = {}, this._children[ge][t] = !0), this._in[t] = {}, this._preds[t] = {}, this._out[t] = {}, this._sucs[t] = {}, ++this._nodeCount, this);
  }
  /**
   * Gets the label of node with specified name.
   * Complexity: O(|V|).
   */
  node(t) {
    return this._nodes[t];
  }
  /**
   * Detects whether graph has a node with specified name or not.
   */
  hasNode(t) {
    return Object.hasOwn(this._nodes, t);
  }
  /**
   * Remove the node with the name from the graph or do nothing if the node is not in
   * the graph. If the node was removed this function also removes any incident
   * edges.
   * Complexity: O(1).
   */
  removeNode(t) {
    var n = this;
    if (Object.hasOwn(this._nodes, t)) {
      var o = (r) => n.removeEdge(n._edgeObjs[r]);
      delete this._nodes[t], this._isCompound && (this._removeFromParentsChildList(t), delete this._parent[t], this.children(t).forEach(function(r) {
        n.setParent(r);
      }), delete this._children[t]), Object.keys(this._in[t]).forEach(o), delete this._in[t], delete this._preds[t], Object.keys(this._out[t]).forEach(o), delete this._out[t], delete this._sucs[t], --this._nodeCount;
    }
    return this;
  }
  /**
   * Sets node p as a parent for node v if it is defined, or removes the
   * parent for v if p is undefined. Method throws an exception in case of
   * invoking it in context of noncompound graph.
   * Average-case complexity: O(1).
   */
  setParent(t, n) {
    if (!this._isCompound)
      throw new Error("Cannot set parent in a non-compound graph");
    if (n === void 0)
      n = ge;
    else {
      n += "";
      for (var o = n; o !== void 0; o = this.parent(o))
        if (o === t)
          throw new Error("Setting " + n + " as parent of " + t + " would create a cycle");
      this.setNode(n);
    }
    return this.setNode(t), this._removeFromParentsChildList(t), this._parent[t] = n, this._children[n][t] = !0, this;
  }
  _removeFromParentsChildList(t) {
    delete this._children[this._parent[t]][t];
  }
  /**
   * Gets parent node for node v.
   * Complexity: O(1).
   */
  parent(t) {
    if (this._isCompound) {
      var n = this._parent[t];
      if (n !== ge)
        return n;
    }
  }
  /**
   * Gets list of direct children of node v.
   * Complexity: O(1).
   */
  children(t = ge) {
    if (this._isCompound) {
      var n = this._children[t];
      if (n)
        return Object.keys(n);
    } else {
      if (t === ge)
        return this.nodes();
      if (this.hasNode(t))
        return [];
    }
  }
  /**
   * Return all nodes that are predecessors of the specified node or undefined if node v is not in
   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
   * Complexity: O(|V|).
   */
  predecessors(t) {
    var n = this._preds[t];
    if (n)
      return Object.keys(n);
  }
  /**
   * Return all nodes that are successors of the specified node or undefined if node v is not in
   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
   * Complexity: O(|V|).
   */
  successors(t) {
    var n = this._sucs[t];
    if (n)
      return Object.keys(n);
  }
  /**
   * Return all nodes that are predecessors or successors of the specified node or undefined if
   * node v is not in the graph.
   * Complexity: O(|V|).
   */
  neighbors(t) {
    var n = this.predecessors(t);
    if (n) {
      const r = new Set(n);
      for (var o of this.successors(t))
        r.add(o);
      return Array.from(r.values());
    }
  }
  isLeaf(t) {
    var n;
    return this.isDirected() ? n = this.successors(t) : n = this.neighbors(t), n.length === 0;
  }
  /**
   * Creates new graph with nodes filtered via filter. Edges incident to rejected node
   * are also removed. In case of compound graph, if parent is rejected by filter,
   * than all its children are rejected too.
   * Average-case complexity: O(|E|+|V|).
   */
  filterNodes(t) {
    var n = new this.constructor({
      directed: this._isDirected,
      multigraph: this._isMultigraph,
      compound: this._isCompound
    });
    n.setGraph(this.graph());
    var o = this;
    Object.entries(this._nodes).forEach(function([i, d]) {
      t(i) && n.setNode(i, d);
    }), Object.values(this._edgeObjs).forEach(function(i) {
      n.hasNode(i.v) && n.hasNode(i.w) && n.setEdge(i, o.edge(i));
    });
    var r = {};
    function s(i) {
      var d = o.parent(i);
      return d === void 0 || n.hasNode(d) ? (r[i] = d, d) : d in r ? r[d] : s(d);
    }
    return this._isCompound && n.nodes().forEach((i) => n.setParent(i, s(i))), n;
  }
  /* === Edge functions ========== */
  /**
   * Sets the default edge label or factory function. This label will be
   * assigned as default label in case if no label was specified while setting
   * an edge or this function will be invoked each time when setting an edge
   * with no label specified and returned value * will be used as a label for edge.
   * Complexity: O(1).
   */
  setDefaultEdgeLabel(t) {
    return this._defaultEdgeLabelFn = t, typeof t != "function" && (this._defaultEdgeLabelFn = () => t), this;
  }
  /**
   * Gets the number of edges in the graph.
   * Complexity: O(1).
   */
  edgeCount() {
    return this._edgeCount;
  }
  /**
   * Gets edges of the graph. In case of compound graph subgraphs are not considered.
   * Complexity: O(|E|).
   */
  edges() {
    return Object.values(this._edgeObjs);
  }
  /**
   * Establish an edges path over the nodes in nodes list. If some edge is already
   * exists, it will update its label, otherwise it will create an edge between pair
   * of nodes with label provided or default label if no label provided.
   * Complexity: O(|nodes|).
   */
  setPath(t, n) {
    var o = this, r = arguments;
    return t.reduce(function(s, i) {
      return r.length > 1 ? o.setEdge(s, i, n) : o.setEdge(s, i), i;
    }), this;
  }
  /**
   * Creates or updates the label for the edge (v, w) with the optionally supplied
   * name. If label is supplied it is set as the value for the edge. If label is not
   * supplied and the edge was created by this call then the default edge label will
   * be assigned. The name parameter is only useful with multigraphs.
   */
  setEdge() {
    var t, n, o, r, s = !1, i = arguments[0];
    typeof i == "object" && i !== null && "v" in i ? (t = i.v, n = i.w, o = i.name, arguments.length === 2 && (r = arguments[1], s = !0)) : (t = i, n = arguments[1], o = arguments[3], arguments.length > 2 && (r = arguments[2], s = !0)), t = "" + t, n = "" + n, o !== void 0 && (o = "" + o);
    var d = _e(this._isDirected, t, n, o);
    if (Object.hasOwn(this._edgeLabels, d))
      return s && (this._edgeLabels[d] = r), this;
    if (o !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[d] = s ? r : this._defaultEdgeLabelFn(t, n, o);
    var l = $o(this._isDirected, t, n, o);
    return t = l.v, n = l.w, Object.freeze(l), this._edgeObjs[d] = l, Kt(this._preds[n], t), Kt(this._sucs[t], n), this._in[n][d] = l, this._out[t][d] = l, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, o) {
    var r = arguments.length === 1 ? ct(this._isDirected, arguments[0]) : _e(this._isDirected, t, n, o);
    return this._edgeLabels[r];
  }
  /**
   * Gets the label for the specified edge and converts it to an object.
   * Complexity: O(1)
   */
  edgeAsObj() {
    const t = this.edge(...arguments);
    return typeof t != "object" ? { label: t } : t;
  }
  /**
   * Detects whether the graph contains specified edge or not. No subgraphs are considered.
   * Complexity: O(1).
   */
  hasEdge(t, n, o) {
    var r = arguments.length === 1 ? ct(this._isDirected, arguments[0]) : _e(this._isDirected, t, n, o);
    return Object.hasOwn(this._edgeLabels, r);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, o) {
    var r = arguments.length === 1 ? ct(this._isDirected, arguments[0]) : _e(this._isDirected, t, n, o), s = this._edgeObjs[r];
    return s && (t = s.v, n = s.w, delete this._edgeLabels[r], delete this._edgeObjs[r], Ut(this._preds[n], t), Ut(this._sucs[t], n), delete this._in[n][r], delete this._out[t][r], this._edgeCount--), this;
  }
  /**
   * Return all edges that point to the node v. Optionally filters those edges down to just those
   * coming from node u. Behavior is undefined for undirected graphs - use nodeEdges instead.
   * Complexity: O(|E|).
   */
  inEdges(t, n) {
    var o = this._in[t];
    if (o) {
      var r = Object.values(o);
      return n ? r.filter((s) => s.v === n) : r;
    }
  }
  /**
   * Return all edges that are pointed at by node v. Optionally filters those edges down to just
   * those point to w. Behavior is undefined for undirected graphs - use nodeEdges instead.
   * Complexity: O(|E|).
   */
  outEdges(t, n) {
    var o = this._out[t];
    if (o) {
      var r = Object.values(o);
      return n ? r.filter((s) => s.w === n) : r;
    }
  }
  /**
   * Returns all edges to or from node v regardless of direction. Optionally filters those edges
   * down to just those between nodes v and w regardless of direction.
   * Complexity: O(|E|).
   */
  nodeEdges(t, n) {
    var o = this.inEdges(t, n);
    if (o)
      return o.concat(this.outEdges(t, n));
  }
};
function Kt(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function Ut(e, t) {
  --e[t] || delete e[t];
}
function _e(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  return r + Vt + s + Vt + (o === void 0 ? Mo : o);
}
function $o(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  var d = { v: r, w: s };
  return o && (d.name = o), d;
}
function ct(e, t) {
  return _e(e, t.v, t.w, t.name);
}
var Tt = Oo, Ao = "2.2.4", To = {
  Graph: Tt,
  version: Ao
}, Ro = Tt, Po = {
  write: jo,
  read: Fo
};
function jo(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: Do(e),
    edges: Bo(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function Do(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), o = e.parent(t), r = { v: t };
    return n !== void 0 && (r.value = n), o !== void 0 && (r.parent = o), r;
  });
}
function Bo(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), o = { v: t.v, w: t.w };
    return t.name !== void 0 && (o.name = t.name), n !== void 0 && (o.value = n), o;
  });
}
function Fo(e) {
  var t = new Ro(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var zo = Go;
function Go(e) {
  var t = {}, n = [], o;
  function r(s) {
    Object.hasOwn(t, s) || (t[s] = !0, o.push(s), e.successors(s).forEach(r), e.predecessors(s).forEach(r));
  }
  return e.nodes().forEach(function(s) {
    o = [], r(s), o.length && n.push(o);
  }), n;
}
let Ho = class {
  constructor() {
    G(this, "_arr", []);
    G(this, "_keyIndices", {});
  }
  /**
   * Returns the number of elements in the queue. Takes `O(1)` time.
   */
  size() {
    return this._arr.length;
  }
  /**
   * Returns the keys that are in the queue. Takes `O(n)` time.
   */
  keys() {
    return this._arr.map(function(t) {
      return t.key;
    });
  }
  /**
   * Returns `true` if **key** is in the queue and `false` if not.
   */
  has(t) {
    return Object.hasOwn(this._keyIndices, t);
  }
  /**
   * Returns the priority for **key**. If **key** is not present in the queue
   * then this function returns `undefined`. Takes `O(1)` time.
   *
   * @param {Object} key
   */
  priority(t) {
    var n = this._keyIndices[t];
    if (n !== void 0)
      return this._arr[n].priority;
  }
  /**
   * Returns the key for the minimum element in this queue. If the queue is
   * empty this function throws an Error. Takes `O(1)` time.
   */
  min() {
    if (this.size() === 0)
      throw new Error("Queue underflow");
    return this._arr[0].key;
  }
  /**
   * Inserts a new key into the priority queue. If the key already exists in
   * the queue this function returns `false`; otherwise it will return `true`.
   * Takes `O(n)` time.
   *
   * @param {Object} key the key to add
   * @param {Number} priority the initial priority for the key
   */
  add(t, n) {
    var o = this._keyIndices;
    if (t = String(t), !Object.hasOwn(o, t)) {
      var r = this._arr, s = r.length;
      return o[t] = s, r.push({ key: t, priority: n }), this._decrease(s), !0;
    }
    return !1;
  }
  /**
   * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
   */
  removeMin() {
    this._swap(0, this._arr.length - 1);
    var t = this._arr.pop();
    return delete this._keyIndices[t.key], this._heapify(0), t.key;
  }
  /**
   * Decreases the priority for **key** to **priority**. If the new priority is
   * greater than the previous priority, this function will throw an Error.
   *
   * @param {Object} key the key for which to raise priority
   * @param {Number} priority the new priority for the key
   */
  decrease(t, n) {
    var o = this._keyIndices[t];
    if (n > this._arr[o].priority)
      throw new Error("New priority is greater than current priority. Key: " + t + " Old: " + this._arr[o].priority + " New: " + n);
    this._arr[o].priority = n, this._decrease(o);
  }
  _heapify(t) {
    var n = this._arr, o = 2 * t, r = o + 1, s = t;
    o < n.length && (s = n[o].priority < n[s].priority ? o : s, r < n.length && (s = n[r].priority < n[s].priority ? r : s), s !== t && (this._swap(t, s), this._heapify(s)));
  }
  _decrease(t) {
    for (var n = this._arr, o = n[t].priority, r; t !== 0 && (r = t >> 1, !(n[r].priority < o)); )
      this._swap(t, r), t = r;
  }
  _swap(t, n) {
    var o = this._arr, r = this._keyIndices, s = o[t], i = o[n];
    o[t] = i, o[n] = s, r[i.key] = t, r[s.key] = n;
  }
};
var Mn = Ho, qo = Mn, On = Vo, Yo = () => 1;
function Vo(e, t, n, o) {
  return Ko(
    e,
    String(t),
    n || Yo,
    o || function(r) {
      return e.outEdges(r);
    }
  );
}
function Ko(e, t, n, o) {
  var r = {}, s = new qo(), i, d, l = function(a) {
    var c = a.v !== i ? a.v : a.w, f = r[c], h = n(a), w = d.distance + h;
    if (h < 0)
      throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + a + " Weight: " + h);
    w < f.distance && (f.distance = w, f.predecessor = i, s.decrease(c, w));
  };
  for (e.nodes().forEach(function(a) {
    var c = a === t ? 0 : Number.POSITIVE_INFINITY;
    r[a] = { distance: c }, s.add(a, c);
  }); s.size() > 0 && (i = s.removeMin(), d = r[i], d.distance !== Number.POSITIVE_INFINITY); )
    o(i).forEach(l);
  return r;
}
var Uo = On, Wo = Xo;
function Xo(e, t, n) {
  return e.nodes().reduce(function(o, r) {
    return o[r] = Uo(e, r, t, n), o;
  }, {});
}
var $n = Jo;
function Jo(e) {
  var t = 0, n = [], o = {}, r = [];
  function s(i) {
    var d = o[i] = {
      onStack: !0,
      lowlink: t,
      index: t++
    };
    if (n.push(i), e.successors(i).forEach(function(c) {
      Object.hasOwn(o, c) ? o[c].onStack && (d.lowlink = Math.min(d.lowlink, o[c].index)) : (s(c), d.lowlink = Math.min(d.lowlink, o[c].lowlink));
    }), d.lowlink === d.index) {
      var l = [], a;
      do
        a = n.pop(), o[a].onStack = !1, l.push(a);
      while (i !== a);
      r.push(l);
    }
  }
  return e.nodes().forEach(function(i) {
    Object.hasOwn(o, i) || s(i);
  }), r;
}
var Qo = $n, Zo = er;
function er(e) {
  return Qo(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var tr = or, nr = () => 1;
function or(e, t, n) {
  return rr(
    e,
    t || nr,
    n || function(o) {
      return e.outEdges(o);
    }
  );
}
function rr(e, t, n) {
  var o = {}, r = e.nodes();
  return r.forEach(function(s) {
    o[s] = {}, o[s][s] = { distance: 0 }, r.forEach(function(i) {
      s !== i && (o[s][i] = { distance: Number.POSITIVE_INFINITY });
    }), n(s).forEach(function(i) {
      var d = i.v === s ? i.w : i.v, l = t(i);
      o[s][d] = { distance: l, predecessor: s };
    });
  }), r.forEach(function(s) {
    var i = o[s];
    r.forEach(function(d) {
      var l = o[d];
      r.forEach(function(a) {
        var c = l[s], f = i[a], h = l[a], w = c.distance + f.distance;
        w < h.distance && (h.distance = w, h.predecessor = f.predecessor);
      });
    });
  }), o;
}
function An(e) {
  var t = {}, n = {}, o = [];
  function r(s) {
    if (Object.hasOwn(n, s))
      throw new xt();
    Object.hasOwn(t, s) || (n[s] = !0, t[s] = !0, e.predecessors(s).forEach(r), delete n[s], o.push(s));
  }
  if (e.sinks().forEach(r), Object.keys(t).length !== e.nodeCount())
    throw new xt();
  return o;
}
class xt extends Error {
  constructor() {
    super(...arguments);
  }
}
var Tn = An;
An.CycleException = xt;
var Wt = Tn, sr = ir;
function ir(e) {
  try {
    Wt(e);
  } catch (t) {
    if (t instanceof Wt.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var Rn = dr;
function dr(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var o = e.isDirected() ? (d) => e.successors(d) : (d) => e.neighbors(d), r = n === "post" ? lr : ar, s = [], i = {};
  return t.forEach((d) => {
    if (!e.hasNode(d))
      throw new Error("Graph does not have node: " + d);
    r(d, o, i, s);
  }), s;
}
function lr(e, t, n, o) {
  for (var r = [[e, !1]]; r.length > 0; ) {
    var s = r.pop();
    s[1] ? o.push(s[0]) : Object.hasOwn(n, s[0]) || (n[s[0]] = !0, r.push([s[0], !0]), Pn(t(s[0]), (i) => r.push([i, !1])));
  }
}
function ar(e, t, n, o) {
  for (var r = [e]; r.length > 0; ) {
    var s = r.pop();
    Object.hasOwn(n, s) || (n[s] = !0, o.push(s), Pn(t(s), (i) => r.push(i)));
  }
}
function Pn(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var cr = Rn, fr = ur;
function ur(e, t) {
  return cr(e, t, "post");
}
var hr = Rn, pr = wr;
function wr(e, t) {
  return hr(e, t, "pre");
}
var mr = Tt, gr = Mn, yr = br;
function br(e, t) {
  var n = new mr(), o = {}, r = new gr(), s;
  function i(l) {
    var a = l.v === s ? l.w : l.v, c = r.priority(a);
    if (c !== void 0) {
      var f = t(l);
      f < c && (o[a] = s, r.decrease(a, f));
    }
  }
  if (e.nodeCount() === 0)
    return n;
  e.nodes().forEach(function(l) {
    r.add(l, Number.POSITIVE_INFINITY), n.setNode(l);
  }), r.decrease(e.nodes()[0], 0);
  for (var d = !1; r.size() > 0; ) {
    if (s = r.removeMin(), Object.hasOwn(o, s))
      n.setEdge(s, o[s]);
    else {
      if (d)
        throw new Error("Input graph is not connected: " + e);
      d = !0;
    }
    e.nodeEdges(s).forEach(i);
  }
  return n;
}
var vr = {
  components: zo,
  dijkstra: On,
  dijkstraAll: Wo,
  findCycles: Zo,
  floydWarshall: tr,
  isAcyclic: sr,
  postorder: fr,
  preorder: pr,
  prim: yr,
  tarjan: $n,
  topsort: Tn
}, Xt = To, oe = {
  Graph: Xt.Graph,
  json: Po,
  alg: vr,
  version: Xt.version
};
let xr = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return Jt(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && Jt(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, o = n._prev;
    for (; o !== n; )
      t.push(JSON.stringify(o, Er)), o = o._prev;
    return "[" + t.join(", ") + "]";
  }
};
function Jt(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function Er(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var Cr = xr;
let Lr = oe.Graph, kr = Cr;
var Sr = _r;
let Nr = () => 1;
function _r(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = Mr(e, t || Nr);
  return Ir(n.graph, n.buckets, n.zeroIdx).flatMap((r) => e.outEdges(r.v, r.w));
}
function Ir(e, t, n) {
  let o = [], r = t[t.length - 1], s = t[0], i;
  for (; e.nodeCount(); ) {
    for (; i = s.dequeue(); )
      ft(e, t, n, i);
    for (; i = r.dequeue(); )
      ft(e, t, n, i);
    if (e.nodeCount()) {
      for (let d = t.length - 2; d > 0; --d)
        if (i = t[d].dequeue(), i) {
          o = o.concat(ft(e, t, n, i, !0));
          break;
        }
    }
  }
  return o;
}
function ft(e, t, n, o, r) {
  let s = r ? [] : void 0;
  return e.inEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = e.node(i.v);
    r && s.push({ v: i.v, w: i.w }), l.out -= d, Et(t, n, l);
  }), e.outEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = i.w, a = e.node(l);
    a.in -= d, Et(t, n, a);
  }), e.removeNode(o.v), s;
}
function Mr(e, t) {
  let n = new Lr(), o = 0, r = 0;
  e.nodes().forEach((d) => {
    n.setNode(d, { v: d, in: 0, out: 0 });
  }), e.edges().forEach((d) => {
    let l = n.edge(d.v, d.w) || 0, a = t(d), c = l + a;
    n.setEdge(d.v, d.w, c), r = Math.max(r, n.node(d.v).out += a), o = Math.max(o, n.node(d.w).in += a);
  });
  let s = Or(r + o + 3).map(() => new kr()), i = o + 1;
  return n.nodes().forEach((d) => {
    Et(s, i, n.node(d));
  }), { graph: n, buckets: s, zeroIdx: i };
}
function Et(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function Or(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let jn = oe.Graph;
var H = {
  addBorderNode: Fr,
  addDummyNode: Dn,
  applyWithChunking: st,
  asNonCompoundGraph: Ar,
  buildLayerMatrix: jr,
  intersectRect: Pr,
  mapValues: Kr,
  maxRank: Fn,
  normalizeRanks: Dr,
  notime: qr,
  partition: Gr,
  pick: Vr,
  predecessorWeights: Rr,
  range: Gn,
  removeEmptyRanks: Br,
  simplify: $r,
  successorWeights: Tr,
  time: Hr,
  uniqueId: zn,
  zipObject: Rt
};
function Dn(e, t, n, o) {
  for (var r = o; e.hasNode(r); )
    r = zn(o);
  return n.dummy = t, e.setNode(r, n), r;
}
function $r(e) {
  let t = new jn().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let o = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, r = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: o.weight + r.weight,
      minlen: Math.max(o.minlen, r.minlen)
    });
  }), t;
}
function Ar(e) {
  let t = new jn({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function Tr(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.outEdges(n).forEach((r) => {
      o[r.w] = (o[r.w] || 0) + e.edge(r).weight;
    }), o;
  });
  return Rt(e.nodes(), t);
}
function Rr(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.inEdges(n).forEach((r) => {
      o[r.v] = (o[r.v] || 0) + e.edge(r).weight;
    }), o;
  });
  return Rt(e.nodes(), t);
}
function Pr(e, t) {
  let n = e.x, o = e.y, r = t.x - n, s = t.y - o, i = e.width / 2, d = e.height / 2;
  if (!r && !s)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let l, a;
  return Math.abs(s) * i > Math.abs(r) * d ? (s < 0 && (d = -d), l = d * r / s, a = d) : (r < 0 && (i = -i), l = i, a = i * s / r), { x: n + l, y: o + a };
}
function jr(e) {
  let t = Gn(Fn(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let o = e.node(n), r = o.rank;
    r !== void 0 && (t[r][o.order] = n);
  }), t;
}
function Dr(e) {
  let t = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MAX_VALUE : r;
  }), n = st(Math.min, t);
  e.nodes().forEach((o) => {
    let r = e.node(o);
    Object.hasOwn(r, "rank") && (r.rank -= n);
  });
}
function Br(e) {
  let t = e.nodes().map((i) => e.node(i).rank), n = st(Math.min, t), o = [];
  e.nodes().forEach((i) => {
    let d = e.node(i).rank - n;
    o[d] || (o[d] = []), o[d].push(i);
  });
  let r = 0, s = e.graph().nodeRankFactor;
  Array.from(o).forEach((i, d) => {
    i === void 0 && d % s !== 0 ? --r : i !== void 0 && r && i.forEach((l) => e.node(l).rank += r);
  });
}
function Fr(e, t, n, o) {
  let r = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (r.rank = n, r.order = o), Dn(e, "border", r, t);
}
function zr(e, t = Bn) {
  const n = [];
  for (let o = 0; o < e.length; o += t) {
    const r = e.slice(o, o + t);
    n.push(r);
  }
  return n;
}
const Bn = 65535;
function st(e, t) {
  if (t.length > Bn) {
    const n = zr(t);
    return e.apply(null, n.map((o) => e.apply(null, o)));
  } else
    return e.apply(null, t);
}
function Fn(e) {
  const n = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MIN_VALUE : r;
  });
  return st(Math.max, n);
}
function Gr(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((o) => {
    t(o) ? n.lhs.push(o) : n.rhs.push(o);
  }), n;
}
function Hr(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function qr(e, t) {
  return t();
}
let Yr = 0;
function zn(e) {
  var t = ++Yr;
  return e + ("" + t);
}
function Gn(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let o = (s) => s < t;
  n < 0 && (o = (s) => t < s);
  const r = [];
  for (let s = e; o(s); s += n)
    r.push(s);
  return r;
}
function Vr(e, t) {
  const n = {};
  for (const o of t)
    e[o] !== void 0 && (n[o] = e[o]);
  return n;
}
function Kr(e, t) {
  let n = t;
  return typeof t == "string" && (n = (o) => o[t]), Object.entries(e).reduce((o, [r, s]) => (o[r] = n(s, r), o), {});
}
function Rt(e, t) {
  return e.reduce((n, o, r) => (n[o] = t[r], n), {});
}
let Ur = Sr, Wr = H.uniqueId;
var Xr = {
  run: Jr,
  undo: Zr
};
function Jr(e) {
  (e.graph().acyclicer === "greedy" ? Ur(e, n(e)) : Qr(e)).forEach((o) => {
    let r = e.edge(o);
    e.removeEdge(o), r.forwardName = o.name, r.reversed = !0, e.setEdge(o.w, o.v, r, Wr("rev"));
  });
  function n(o) {
    return (r) => o.edge(r).weight;
  }
}
function Qr(e) {
  let t = [], n = {}, o = {};
  function r(s) {
    Object.hasOwn(o, s) || (o[s] = !0, n[s] = !0, e.outEdges(s).forEach((i) => {
      Object.hasOwn(n, i.w) ? t.push(i) : r(i.w);
    }), delete n[s]);
  }
  return e.nodes().forEach(r), t;
}
function Zr(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let o = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, o);
    }
  });
}
let es = H;
var ts = {
  run: ns,
  undo: rs
};
function ns(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => os(e, t));
}
function os(e, t) {
  let n = t.v, o = e.node(n).rank, r = t.w, s = e.node(r).rank, i = t.name, d = e.edge(t), l = d.labelRank;
  if (s === o + 1) return;
  e.removeEdge(t);
  let a, c, f;
  for (f = 0, ++o; o < s; ++f, ++o)
    d.points = [], c = {
      width: 0,
      height: 0,
      edgeLabel: d,
      edgeObj: t,
      rank: o
    }, a = es.addDummyNode(e, "edge", c, "_d"), o === l && (c.width = d.width, c.height = d.height, c.dummy = "edge-label", c.labelpos = d.labelpos), e.setEdge(n, a, { weight: d.weight }, i), f === 0 && e.graph().dummyChains.push(a), n = a;
  e.setEdge(n, r, { weight: d.weight }, i);
}
function rs(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), o = n.edgeLabel, r;
    for (e.setEdge(n.edgeObj, o); n.dummy; )
      r = e.successors(t)[0], e.removeNode(t), o.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (o.x = n.x, o.y = n.y, o.width = n.width, o.height = n.height), t = r, n = e.node(t);
  });
}
const { applyWithChunking: ss } = H;
var it = {
  longestPath: is,
  slack: ds
};
function is(e) {
  var t = {};
  function n(o) {
    var r = e.node(o);
    if (Object.hasOwn(t, o))
      return r.rank;
    t[o] = !0;
    let s = e.outEdges(o).map((d) => d == null ? Number.POSITIVE_INFINITY : n(d.w) - e.edge(d).minlen);
    var i = ss(Math.min, s);
    return i === Number.POSITIVE_INFINITY && (i = 0), r.rank = i;
  }
  e.sources().forEach(n);
}
function ds(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var ls = oe.Graph, Xe = it.slack, Hn = as;
function as(e) {
  var t = new ls({ directed: !1 }), n = e.nodes()[0], o = e.nodeCount();
  t.setNode(n, {});
  for (var r, s; cs(t, e) < o; )
    r = fs(t, e), s = t.hasNode(r.v) ? Xe(e, r) : -Xe(e, r), us(t, e, s);
  return t;
}
function cs(e, t) {
  function n(o) {
    t.nodeEdges(o).forEach((r) => {
      var s = r.v, i = o === s ? r.w : s;
      !e.hasNode(i) && !Xe(t, r) && (e.setNode(i, {}), e.setEdge(o, i, {}), n(i));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function fs(e, t) {
  return t.edges().reduce((o, r) => {
    let s = Number.POSITIVE_INFINITY;
    return e.hasNode(r.v) !== e.hasNode(r.w) && (s = Xe(t, r)), s < o[0] ? [s, r] : o;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function us(e, t, n) {
  e.nodes().forEach((o) => t.node(o).rank += n);
}
var hs = Hn, Qt = it.slack, ps = it.longestPath, ws = oe.alg.preorder, ms = oe.alg.postorder, gs = H.simplify, ys = xe;
xe.initLowLimValues = jt;
xe.initCutValues = Pt;
xe.calcCutValue = qn;
xe.leaveEdge = Vn;
xe.enterEdge = Kn;
xe.exchangeEdges = Un;
function xe(e) {
  e = gs(e), ps(e);
  var t = hs(e);
  jt(t), Pt(t, e);
  for (var n, o; n = Vn(t); )
    o = Kn(t, e, n), Un(t, e, n, o);
}
function Pt(e, t) {
  var n = ms(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((o) => bs(e, t, o));
}
function bs(e, t, n) {
  var o = e.node(n), r = o.parent;
  e.edge(n, r).cutvalue = qn(e, t, n);
}
function qn(e, t, n) {
  var o = e.node(n), r = o.parent, s = !0, i = t.edge(n, r), d = 0;
  return i || (s = !1, i = t.edge(r, n)), d = i.weight, t.nodeEdges(n).forEach((l) => {
    var a = l.v === n, c = a ? l.w : l.v;
    if (c !== r) {
      var f = a === s, h = t.edge(l).weight;
      if (d += f ? h : -h, xs(e, n, c)) {
        var w = e.edge(n, c).cutvalue;
        d += f ? -w : w;
      }
    }
  }), d;
}
function jt(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), Yn(e, {}, 1, t);
}
function Yn(e, t, n, o, r) {
  var s = n, i = e.node(o);
  return t[o] = !0, e.neighbors(o).forEach((d) => {
    Object.hasOwn(t, d) || (n = Yn(e, t, n, d, o));
  }), i.low = s, i.lim = n++, r ? i.parent = r : delete i.parent, n;
}
function Vn(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function Kn(e, t, n) {
  var o = n.v, r = n.w;
  t.hasEdge(o, r) || (o = n.w, r = n.v);
  var s = e.node(o), i = e.node(r), d = s, l = !1;
  s.lim > i.lim && (d = i, l = !0);
  var a = t.edges().filter((c) => l === Zt(e, e.node(c.v), d) && l !== Zt(e, e.node(c.w), d));
  return a.reduce((c, f) => Qt(t, f) < Qt(t, c) ? f : c);
}
function Un(e, t, n, o) {
  var r = n.v, s = n.w;
  e.removeEdge(r, s), e.setEdge(o.v, o.w, {}), jt(e), Pt(e, t), vs(e, t);
}
function vs(e, t) {
  var n = e.nodes().find((r) => !t.node(r).parent), o = ws(e, n);
  o = o.slice(1), o.forEach((r) => {
    var s = e.node(r).parent, i = t.edge(r, s), d = !1;
    i || (i = t.edge(s, r), d = !0), t.node(r).rank = t.node(s).rank + (d ? i.minlen : -i.minlen);
  });
}
function xs(e, t, n) {
  return e.hasEdge(t, n);
}
function Zt(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var Es = it, Wn = Es.longestPath, Cs = Hn, Ls = ys, ks = Ss;
function Ss(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      en(e);
      break;
    case "tight-tree":
      _s(e);
      break;
    case "longest-path":
      Ns(e);
      break;
    case "none":
      break;
    default:
      en(e);
  }
}
var Ns = Wn;
function _s(e) {
  Wn(e), Cs(e);
}
function en(e) {
  Ls(e);
}
var Is = Ms;
function Ms(e) {
  let t = $s(e);
  e.graph().dummyChains.forEach((n) => {
    let o = e.node(n), r = o.edgeObj, s = Os(e, t, r.v, r.w), i = s.path, d = s.lca, l = 0, a = i[l], c = !0;
    for (; n !== r.w; ) {
      if (o = e.node(n), c) {
        for (; (a = i[l]) !== d && e.node(a).maxRank < o.rank; )
          l++;
        a === d && (c = !1);
      }
      if (!c) {
        for (; l < i.length - 1 && e.node(a = i[l + 1]).minRank <= o.rank; )
          l++;
        a = i[l];
      }
      e.setParent(n, a), n = e.successors(n)[0];
    }
  });
}
function Os(e, t, n, o) {
  let r = [], s = [], i = Math.min(t[n].low, t[o].low), d = Math.max(t[n].lim, t[o].lim), l, a;
  l = n;
  do
    l = e.parent(l), r.push(l);
  while (l && (t[l].low > i || d > t[l].lim));
  for (a = l, l = o; (l = e.parent(l)) !== a; )
    s.push(l);
  return { path: r.concat(s.reverse()), lca: a };
}
function $s(e) {
  let t = {}, n = 0;
  function o(r) {
    let s = n;
    e.children(r).forEach(o), t[r] = { low: s, lim: n++ };
  }
  return e.children().forEach(o), t;
}
let Je = H;
var As = {
  run: Ts,
  cleanup: js
};
function Ts(e) {
  let t = Je.addDummyNode(e, "root", {}, "_root"), n = Rs(e), o = Object.values(n), r = Je.applyWithChunking(Math.max, o) - 1, s = 2 * r + 1;
  e.graph().nestingRoot = t, e.edges().forEach((d) => e.edge(d).minlen *= s);
  let i = Ps(e) + 1;
  e.children().forEach((d) => Xn(e, t, s, i, r, n, d)), e.graph().nodeRankFactor = s;
}
function Xn(e, t, n, o, r, s, i) {
  let d = e.children(i);
  if (!d.length) {
    i !== t && e.setEdge(t, i, { weight: 0, minlen: n });
    return;
  }
  let l = Je.addBorderNode(e, "_bt"), a = Je.addBorderNode(e, "_bb"), c = e.node(i);
  e.setParent(l, i), c.borderTop = l, e.setParent(a, i), c.borderBottom = a, d.forEach((f) => {
    Xn(e, t, n, o, r, s, f);
    let h = e.node(f), w = h.borderTop ? h.borderTop : f, p = h.borderBottom ? h.borderBottom : f, b = h.borderTop ? o : 2 * o, m = w !== p ? 1 : r - s[i] + 1;
    e.setEdge(l, w, {
      weight: b,
      minlen: m,
      nestingEdge: !0
    }), e.setEdge(p, a, {
      weight: b,
      minlen: m,
      nestingEdge: !0
    });
  }), e.parent(i) || e.setEdge(t, l, { weight: 0, minlen: r + s[i] });
}
function Rs(e) {
  var t = {};
  function n(o, r) {
    var s = e.children(o);
    s && s.length && s.forEach((i) => n(i, r + 1)), t[o] = r;
  }
  return e.children().forEach((o) => n(o, 1)), t;
}
function Ps(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function js(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var o = e.edge(n);
    o.nestingEdge && e.removeEdge(n);
  });
}
let Ds = H;
var Bs = Fs;
function Fs(e) {
  function t(n) {
    let o = e.children(n), r = e.node(n);
    if (o.length && o.forEach(t), Object.hasOwn(r, "minRank")) {
      r.borderLeft = [], r.borderRight = [];
      for (let s = r.minRank, i = r.maxRank + 1; s < i; ++s)
        tn(e, "borderLeft", "_bl", n, r, s), tn(e, "borderRight", "_br", n, r, s);
    }
  }
  e.children().forEach(t);
}
function tn(e, t, n, o, r, s) {
  let i = { width: 0, height: 0, rank: s, borderType: t }, d = r[t][s - 1], l = Ds.addDummyNode(e, "border", i, n);
  r[t][s] = l, e.setParent(l, o), d && e.setEdge(d, l, { weight: 1 });
}
var zs = {
  adjust: Gs,
  undo: Hs
};
function Gs(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && Jn(e);
}
function Hs(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && qs(e), (t === "lr" || t === "rl") && (Ys(e), Jn(e));
}
function Jn(e) {
  e.nodes().forEach((t) => nn(e.node(t))), e.edges().forEach((t) => nn(e.edge(t)));
}
function nn(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function qs(e) {
  e.nodes().forEach((t) => ut(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(ut), Object.hasOwn(n, "y") && ut(n);
  });
}
function ut(e) {
  e.y = -e.y;
}
function Ys(e) {
  e.nodes().forEach((t) => ht(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(ht), Object.hasOwn(n, "x") && ht(n);
  });
}
function ht(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let on = H;
var Vs = Ks;
function Ks(e) {
  let t = {}, n = e.nodes().filter((l) => !e.children(l).length), o = n.map((l) => e.node(l).rank), r = on.applyWithChunking(Math.max, o), s = on.range(r + 1).map(() => []);
  function i(l) {
    if (t[l]) return;
    t[l] = !0;
    let a = e.node(l);
    s[a.rank].push(l), e.successors(l).forEach(i);
  }
  return n.sort((l, a) => e.node(l).rank - e.node(a).rank).forEach(i), s;
}
let Us = H.zipObject;
var Ws = Xs;
function Xs(e, t) {
  let n = 0;
  for (let o = 1; o < t.length; ++o)
    n += Js(e, t[o - 1], t[o]);
  return n;
}
function Js(e, t, n) {
  let o = Us(n, n.map((a, c) => c)), r = t.flatMap((a) => e.outEdges(a).map((c) => ({ pos: o[c.w], weight: e.edge(c).weight })).sort((c, f) => c.pos - f.pos)), s = 1;
  for (; s < n.length; ) s <<= 1;
  let i = 2 * s - 1;
  s -= 1;
  let d = new Array(i).fill(0), l = 0;
  return r.forEach((a) => {
    let c = a.pos + s;
    d[c] += a.weight;
    let f = 0;
    for (; c > 0; )
      c % 2 && (f += d[c + 1]), c = c - 1 >> 1, d[c] += a.weight;
    l += a.weight * f;
  }), l;
}
var Qs = Zs;
function Zs(e, t = []) {
  return t.map((n) => {
    let o = e.inEdges(n);
    if (o.length) {
      let r = o.reduce((s, i) => {
        let d = e.edge(i), l = e.node(i.v);
        return {
          sum: s.sum + d.weight * l.order,
          weight: s.weight + d.weight
        };
      }, { sum: 0, weight: 0 });
      return {
        v: n,
        barycenter: r.sum / r.weight,
        weight: r.weight
      };
    } else
      return { v: n };
  });
}
let ei = H;
var ti = ni;
function ni(e, t) {
  let n = {};
  e.forEach((r, s) => {
    let i = n[r.v] = {
      indegree: 0,
      in: [],
      out: [],
      vs: [r.v],
      i: s
    };
    r.barycenter !== void 0 && (i.barycenter = r.barycenter, i.weight = r.weight);
  }), t.edges().forEach((r) => {
    let s = n[r.v], i = n[r.w];
    s !== void 0 && i !== void 0 && (i.indegree++, s.out.push(n[r.w]));
  });
  let o = Object.values(n).filter((r) => !r.indegree);
  return oi(o);
}
function oi(e) {
  let t = [];
  function n(r) {
    return (s) => {
      s.merged || (s.barycenter === void 0 || r.barycenter === void 0 || s.barycenter >= r.barycenter) && ri(r, s);
    };
  }
  function o(r) {
    return (s) => {
      s.in.push(r), --s.indegree === 0 && e.push(s);
    };
  }
  for (; e.length; ) {
    let r = e.pop();
    t.push(r), r.in.reverse().forEach(n(r)), r.out.forEach(o(r));
  }
  return t.filter((r) => !r.merged).map((r) => ei.pick(r, ["vs", "i", "barycenter", "weight"]));
}
function ri(e, t) {
  let n = 0, o = 0;
  e.weight && (n += e.barycenter * e.weight, o += e.weight), t.weight && (n += t.barycenter * t.weight, o += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / o, e.weight = o, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let si = H;
var ii = di;
function di(e, t) {
  let n = si.partition(e, (c) => Object.hasOwn(c, "barycenter")), o = n.lhs, r = n.rhs.sort((c, f) => f.i - c.i), s = [], i = 0, d = 0, l = 0;
  o.sort(li(!!t)), l = rn(s, r, l), o.forEach((c) => {
    l += c.vs.length, s.push(c.vs), i += c.barycenter * c.weight, d += c.weight, l = rn(s, r, l);
  });
  let a = { vs: s.flat(!0) };
  return d && (a.barycenter = i / d, a.weight = d), a;
}
function rn(e, t, n) {
  let o;
  for (; t.length && (o = t[t.length - 1]).i <= n; )
    t.pop(), e.push(o.vs), n++;
  return n;
}
function li(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let ai = Qs, ci = ti, fi = ii;
var ui = Qn;
function Qn(e, t, n, o) {
  let r = e.children(t), s = e.node(t), i = s ? s.borderLeft : void 0, d = s ? s.borderRight : void 0, l = {};
  i && (r = r.filter((h) => h !== i && h !== d));
  let a = ai(e, r);
  a.forEach((h) => {
    if (e.children(h.v).length) {
      let w = Qn(e, h.v, n, o);
      l[h.v] = w, Object.hasOwn(w, "barycenter") && pi(h, w);
    }
  });
  let c = ci(a, n);
  hi(c, l);
  let f = fi(c, o);
  if (i && (f.vs = [i, f.vs, d].flat(!0), e.predecessors(i).length)) {
    let h = e.node(e.predecessors(i)[0]), w = e.node(e.predecessors(d)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + h.order + w.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function hi(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((o) => t[o] ? t[o].vs : o);
  });
}
function pi(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let wi = oe.Graph, mi = H;
var gi = yi;
function yi(e, t, n, o) {
  o || (o = e.nodes());
  let r = bi(e), s = new wi({ compound: !0 }).setGraph({ root: r }).setDefaultNodeLabel((i) => e.node(i));
  return o.forEach((i) => {
    let d = e.node(i), l = e.parent(i);
    (d.rank === t || d.minRank <= t && t <= d.maxRank) && (s.setNode(i), s.setParent(i, l || r), e[n](i).forEach((a) => {
      let c = a.v === i ? a.w : a.v, f = s.edge(c, i), h = f !== void 0 ? f.weight : 0;
      s.setEdge(c, i, { weight: e.edge(a).weight + h });
    }), Object.hasOwn(d, "minRank") && s.setNode(i, {
      borderLeft: d.borderLeft[t],
      borderRight: d.borderRight[t]
    }));
  }), s;
}
function bi(e) {
  for (var t; e.hasNode(t = mi.uniqueId("_root")); ) ;
  return t;
}
var vi = xi;
function xi(e, t, n) {
  let o = {}, r;
  n.forEach((s) => {
    let i = e.parent(s), d, l;
    for (; i; ) {
      if (d = e.parent(i), d ? (l = o[d], o[d] = i) : (l = r, r = i), l && l !== i) {
        t.setEdge(l, i);
        return;
      }
      i = d;
    }
  });
}
let Ei = Vs, Ci = Ws, Li = ui, ki = gi, Si = vi, Ni = oe.Graph, Ge = H;
var _i = Zn;
function Zn(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, Zn);
    return;
  }
  let n = Ge.maxRank(e), o = sn(e, Ge.range(1, n + 1), "inEdges"), r = sn(e, Ge.range(n - 1, -1, -1), "outEdges"), s = Ei(e);
  if (dn(e, s), t && t.disableOptimalOrderHeuristic)
    return;
  let i = Number.POSITIVE_INFINITY, d;
  for (let l = 0, a = 0; a < 4; ++l, ++a) {
    Ii(l % 2 ? o : r, l % 4 >= 2), s = Ge.buildLayerMatrix(e);
    let c = Ci(e, s);
    c < i && (a = 0, d = Object.assign({}, s), i = c);
  }
  dn(e, d);
}
function sn(e, t, n) {
  const o = /* @__PURE__ */ new Map(), r = (s, i) => {
    o.has(s) || o.set(s, []), o.get(s).push(i);
  };
  for (const s of e.nodes()) {
    const i = e.node(s);
    if (typeof i.rank == "number" && r(i.rank, s), typeof i.minRank == "number" && typeof i.maxRank == "number")
      for (let d = i.minRank; d <= i.maxRank; d++)
        d !== i.rank && r(d, s);
  }
  return t.map(function(s) {
    return ki(e, s, n, o.get(s) || []);
  });
}
function Ii(e, t) {
  let n = new Ni();
  e.forEach(function(o) {
    let r = o.graph().root, s = Li(o, r, n, t);
    s.vs.forEach((i, d) => o.node(i).order = d), Si(o, n, s.vs);
  });
}
function dn(e, t) {
  Object.values(t).forEach((n) => n.forEach((o, r) => e.node(o).order = r));
}
let Mi = oe.Graph, se = H;
var Oi = {
  positionX: Gi
};
function $i(e, t) {
  let n = {};
  function o(r, s) {
    let i = 0, d = 0, l = r.length, a = s[s.length - 1];
    return s.forEach((c, f) => {
      let h = Ti(e, c), w = h ? e.node(h).order : l;
      (h || c === a) && (s.slice(d, f + 1).forEach((p) => {
        e.predecessors(p).forEach((b) => {
          let m = e.node(b), x = m.order;
          (x < i || w < x) && !(m.dummy && e.node(p).dummy) && eo(n, b, p);
        });
      }), d = f + 1, i = w);
    }), s;
  }
  return t.length && t.reduce(o), n;
}
function Ai(e, t) {
  let n = {};
  function o(s, i, d, l, a) {
    let c;
    se.range(i, d).forEach((f) => {
      c = s[f], e.node(c).dummy && e.predecessors(c).forEach((h) => {
        let w = e.node(h);
        w.dummy && (w.order < l || w.order > a) && eo(n, h, c);
      });
    });
  }
  function r(s, i) {
    let d = -1, l, a = 0;
    return i.forEach((c, f) => {
      if (e.node(c).dummy === "border") {
        let h = e.predecessors(c);
        h.length && (l = e.node(h[0]).order, o(i, a, f, d, l), a = f, d = l);
      }
      o(i, a, i.length, l, s.length);
    }), i;
  }
  return t.length && t.reduce(r), n;
}
function Ti(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function eo(e, t, n) {
  if (t > n) {
    let r = t;
    t = n, n = r;
  }
  let o = e[t];
  o || (e[t] = o = {}), o[n] = !0;
}
function Ri(e, t, n) {
  if (t > n) {
    let o = t;
    t = n, n = o;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function Pi(e, t, n, o) {
  let r = {}, s = {}, i = {};
  return t.forEach((d) => {
    d.forEach((l, a) => {
      r[l] = l, s[l] = l, i[l] = a;
    });
  }), t.forEach((d) => {
    let l = -1;
    d.forEach((a) => {
      let c = o(a);
      if (c.length) {
        c = c.sort((h, w) => i[h] - i[w]);
        let f = (c.length - 1) / 2;
        for (let h = Math.floor(f), w = Math.ceil(f); h <= w; ++h) {
          let p = c[h];
          s[a] === a && l < i[p] && !Ri(n, a, p) && (s[p] = a, s[a] = r[a] = r[p], l = i[p]);
        }
      }
    });
  }), { root: r, align: s };
}
function ji(e, t, n, o, r) {
  let s = {}, i = Di(e, t, n, r), d = r ? "borderLeft" : "borderRight";
  function l(f, h) {
    let w = i.nodes(), p = w.pop(), b = {};
    for (; p; )
      b[p] ? f(p) : (b[p] = !0, w.push(p), w = w.concat(h(p))), p = w.pop();
  }
  function a(f) {
    s[f] = i.inEdges(f).reduce((h, w) => Math.max(h, s[w.v] + i.edge(w)), 0);
  }
  function c(f) {
    let h = i.outEdges(f).reduce((p, b) => Math.min(p, s[b.w] - i.edge(b)), Number.POSITIVE_INFINITY), w = e.node(f);
    h !== Number.POSITIVE_INFINITY && w.borderType !== d && (s[f] = Math.max(s[f], h));
  }
  return l(a, i.predecessors.bind(i)), l(c, i.successors.bind(i)), Object.keys(o).forEach((f) => s[f] = s[n[f]]), s;
}
function Di(e, t, n, o) {
  let r = new Mi(), s = e.graph(), i = Hi(s.nodesep, s.edgesep, o);
  return t.forEach((d) => {
    let l;
    d.forEach((a) => {
      let c = n[a];
      if (r.setNode(c), l) {
        var f = n[l], h = r.edge(f, c);
        r.setEdge(f, c, Math.max(i(e, a, l), h || 0));
      }
      l = a;
    });
  }), r;
}
function Bi(e, t) {
  return Object.values(t).reduce((n, o) => {
    let r = Number.NEGATIVE_INFINITY, s = Number.POSITIVE_INFINITY;
    Object.entries(o).forEach(([d, l]) => {
      let a = qi(e, d) / 2;
      r = Math.max(l + a, r), s = Math.min(l - a, s);
    });
    const i = r - s;
    return i < n[0] && (n = [i, o]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Fi(e, t) {
  let n = Object.values(t), o = se.applyWithChunking(Math.min, n), r = se.applyWithChunking(Math.max, n);
  ["u", "d"].forEach((s) => {
    ["l", "r"].forEach((i) => {
      let d = s + i, l = e[d];
      if (l === t) return;
      let a = Object.values(l), c = o - se.applyWithChunking(Math.min, a);
      i !== "l" && (c = r - se.applyWithChunking(Math.max, a)), c && (e[d] = se.mapValues(l, (f) => f + c));
    });
  });
}
function zi(e, t) {
  return se.mapValues(e.ul, (n, o) => {
    if (t)
      return e[t.toLowerCase()][o];
    {
      let r = Object.values(e).map((s) => s[o]).sort((s, i) => s - i);
      return (r[1] + r[2]) / 2;
    }
  });
}
function Gi(e) {
  let t = se.buildLayerMatrix(e), n = Object.assign(
    $i(e, t),
    Ai(e, t)
  ), o = {}, r;
  ["u", "d"].forEach((i) => {
    r = i === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((d) => {
      d === "r" && (r = r.map((f) => Object.values(f).reverse()));
      let l = (i === "u" ? e.predecessors : e.successors).bind(e), a = Pi(e, r, n, l), c = ji(
        e,
        r,
        a.root,
        a.align,
        d === "r"
      );
      d === "r" && (c = se.mapValues(c, (f) => -f)), o[i + d] = c;
    });
  });
  let s = Bi(e, o);
  return Fi(o, s), zi(o, e.graph().align);
}
function Hi(e, t, n) {
  return (o, r, s) => {
    let i = o.node(r), d = o.node(s), l = 0, a;
    if (l += i.width / 2, Object.hasOwn(i, "labelpos"))
      switch (i.labelpos.toLowerCase()) {
        case "l":
          a = -i.width / 2;
          break;
        case "r":
          a = i.width / 2;
          break;
      }
    if (a && (l += n ? a : -a), a = 0, l += (i.dummy ? t : e) / 2, l += (d.dummy ? t : e) / 2, l += d.width / 2, Object.hasOwn(d, "labelpos"))
      switch (d.labelpos.toLowerCase()) {
        case "l":
          a = d.width / 2;
          break;
        case "r":
          a = -d.width / 2;
          break;
      }
    return a && (l += n ? a : -a), a = 0, l;
  };
}
function qi(e, t) {
  return e.node(t).width;
}
let to = H, Yi = Oi.positionX;
var Vi = Ki;
function Ki(e) {
  e = to.asNonCompoundGraph(e), Ui(e), Object.entries(Yi(e)).forEach(([t, n]) => e.node(t).x = n);
}
function Ui(e) {
  let t = to.buildLayerMatrix(e), n = e.graph().ranksep, o = 0;
  t.forEach((r) => {
    const s = r.reduce((i, d) => {
      const l = e.node(d).height;
      return i > l ? i : l;
    }, 0);
    r.forEach((i) => e.node(i).y = o + s / 2), o += s + n;
  });
}
let ln = Xr, an = ts, Wi = ks, Xi = H.normalizeRanks, Ji = Is, Qi = H.removeEmptyRanks, cn = As, Zi = Bs, fn = zs, ed = _i, td = Vi, J = H, nd = oe.Graph;
var od = rd;
function rd(e, t) {
  let n = t && t.debugTiming ? J.time : J.notime;
  n("layout", () => {
    let o = n("  buildLayoutGraph", () => pd(e));
    n("  runLayout", () => sd(o, n, t)), n("  updateInputGraph", () => id(e, o));
  });
}
function sd(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => wd(e)), t("    removeSelfEdges", () => Ld(e)), t("    acyclic", () => ln.run(e)), t("    nestingGraph.run", () => cn.run(e)), t("    rank", () => Wi(J.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => md(e)), t("    removeEmptyRanks", () => Qi(e)), t("    nestingGraph.cleanup", () => cn.cleanup(e)), t("    normalizeRanks", () => Xi(e)), t("    assignRankMinMax", () => gd(e)), t("    removeEdgeLabelProxies", () => yd(e)), t("    normalize.run", () => an.run(e)), t("    parentDummyChains", () => Ji(e)), t("    addBorderSegments", () => Zi(e)), t("    order", () => ed(e, n)), t("    insertSelfEdges", () => kd(e)), t("    adjustCoordinateSystem", () => fn.adjust(e)), t("    position", () => td(e)), t("    positionSelfEdges", () => Sd(e)), t("    removeBorderNodes", () => Cd(e)), t("    normalize.undo", () => an.undo(e)), t("    fixupEdgeLabelCoords", () => xd(e)), t("    undoCoordinateSystem", () => fn.undo(e)), t("    translateGraph", () => bd(e)), t("    assignNodeIntersects", () => vd(e)), t("    reversePoints", () => Ed(e)), t("    acyclic.undo", () => ln.undo(e));
}
function id(e, t) {
  e.nodes().forEach((n) => {
    let o = e.node(n), r = t.node(n);
    o && (o.x = r.x, o.y = r.y, o.rank = r.rank, t.children(n).length && (o.width = r.width, o.height = r.height));
  }), e.edges().forEach((n) => {
    let o = e.edge(n), r = t.edge(n);
    o.points = r.points, Object.hasOwn(r, "x") && (o.x = r.x, o.y = r.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let dd = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], ld = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, ad = ["acyclicer", "ranker", "rankdir", "align"], cd = ["width", "height", "rank"], un = { width: 0, height: 0 }, fd = ["minlen", "weight", "width", "height", "labeloffset"], ud = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, hd = ["labelpos"];
function pd(e) {
  let t = new nd({ multigraph: !0, compound: !0 }), n = wt(e.graph());
  return t.setGraph(Object.assign(
    {},
    ld,
    pt(n, dd),
    J.pick(n, ad)
  )), e.nodes().forEach((o) => {
    let r = wt(e.node(o));
    const s = pt(r, cd);
    Object.keys(un).forEach((i) => {
      s[i] === void 0 && (s[i] = un[i]);
    }), t.setNode(o, s), t.setParent(o, e.parent(o));
  }), e.edges().forEach((o) => {
    let r = wt(e.edge(o));
    t.setEdge(o, Object.assign(
      {},
      ud,
      pt(r, fd),
      J.pick(r, hd)
    ));
  }), t;
}
function wd(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let o = e.edge(n);
    o.minlen *= 2, o.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? o.width += o.labeloffset : o.height += o.labeloffset);
  });
}
function md(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let o = e.node(t.v), s = { rank: (e.node(t.w).rank - o.rank) / 2 + o.rank, e: t };
      J.addDummyNode(e, "edge-proxy", s, "_ep");
    }
  });
}
function gd(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let o = e.node(n);
    o.borderTop && (o.minRank = e.node(o.borderTop).rank, o.maxRank = e.node(o.borderBottom).rank, t = Math.max(t, o.maxRank));
  }), e.graph().maxRank = t;
}
function yd(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function bd(e) {
  let t = Number.POSITIVE_INFINITY, n = 0, o = Number.POSITIVE_INFINITY, r = 0, s = e.graph(), i = s.marginx || 0, d = s.marginy || 0;
  function l(a) {
    let c = a.x, f = a.y, h = a.width, w = a.height;
    t = Math.min(t, c - h / 2), n = Math.max(n, c + h / 2), o = Math.min(o, f - w / 2), r = Math.max(r, f + w / 2);
  }
  e.nodes().forEach((a) => l(e.node(a))), e.edges().forEach((a) => {
    let c = e.edge(a);
    Object.hasOwn(c, "x") && l(c);
  }), t -= i, o -= d, e.nodes().forEach((a) => {
    let c = e.node(a);
    c.x -= t, c.y -= o;
  }), e.edges().forEach((a) => {
    let c = e.edge(a);
    c.points.forEach((f) => {
      f.x -= t, f.y -= o;
    }), Object.hasOwn(c, "x") && (c.x -= t), Object.hasOwn(c, "y") && (c.y -= o);
  }), s.width = n - t + i, s.height = r - o + d;
}
function vd(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), o = e.node(t.v), r = e.node(t.w), s, i;
    n.points ? (s = n.points[0], i = n.points[n.points.length - 1]) : (n.points = [], s = r, i = o), n.points.unshift(J.intersectRect(o, s)), n.points.push(J.intersectRect(r, i));
  });
}
function xd(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (Object.hasOwn(n, "x"))
      switch ((n.labelpos === "l" || n.labelpos === "r") && (n.width -= n.labeloffset), n.labelpos) {
        case "l":
          n.x -= n.width / 2 + n.labeloffset;
          break;
        case "r":
          n.x += n.width / 2 + n.labeloffset;
          break;
      }
  });
}
function Ed(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function Cd(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), o = e.node(n.borderTop), r = e.node(n.borderBottom), s = e.node(n.borderLeft[n.borderLeft.length - 1]), i = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(i.x - s.x), n.height = Math.abs(r.y - o.y), n.x = s.x + n.width / 2, n.y = o.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function Ld(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function kd(e) {
  var t = J.buildLayerMatrix(e);
  t.forEach((n) => {
    var o = 0;
    n.forEach((r, s) => {
      var i = e.node(r);
      i.order = s + o, (i.selfEdges || []).forEach((d) => {
        J.addDummyNode(e, "selfedge", {
          width: d.label.width,
          height: d.label.height,
          rank: i.rank,
          order: s + ++o,
          e: d.e,
          label: d.label
        }, "_se");
      }), delete i.selfEdges;
    });
  });
}
function Sd(e) {
  e.nodes().forEach((t) => {
    var n = e.node(t);
    if (n.dummy === "selfedge") {
      var o = e.node(n.e.v), r = o.x + o.width / 2, s = o.y, i = n.x - r, d = o.height / 2;
      e.setEdge(n.e, n.label), e.removeNode(t), n.label.points = [
        { x: r + 2 * i / 3, y: s - d },
        { x: r + 5 * i / 6, y: s - d },
        { x: r + i, y: s },
        { x: r + 5 * i / 6, y: s + d },
        { x: r + 2 * i / 3, y: s + d }
      ], n.label.x = n.x, n.label.y = n.y;
    }
  });
}
function pt(e, t) {
  return J.mapValues(J.pick(e, t), Number);
}
function wt(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, o]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = o;
  }), t;
}
let Nd = H, _d = oe.Graph;
var Id = {
  debugOrdering: Md
};
function Md(e) {
  let t = Nd.buildLayerMatrix(e), n = new _d({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((o) => {
    n.setNode(o, { label: o }), n.setParent(o, "layer" + e.node(o).rank);
  }), e.edges().forEach((o) => n.setEdge(o.v, o.w, {}, o.name)), t.forEach((o, r) => {
    let s = "layer" + r;
    n.setNode(s, { rank: "same" }), o.reduce((i, d) => (n.setEdge(i, d, { style: "invis" }), d));
  }), n;
}
var Od = "1.1.8", $d = {
  graphlib: oe,
  layout: od,
  debug: Id,
  util: {
    time: H.time,
    notime: H.notime
  },
  version: Od
};
const hn = /* @__PURE__ */ Io($d);
function pn(e, t) {
  var s;
  const n = Gt[e.type] ?? Gt.process;
  if (e.type === "compound" || (s = e.rows) != null && s.length) {
    const i = (t == null ? void 0 : t.w) ?? e.w ?? rt(e.label, e.rows, n.w), d = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, Mt(e.rows));
    return { w: i, h: d };
  }
  const o = (t == null ? void 0 : t.w) ?? e.w ?? n.w, r = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, At(e.type, e.label, o));
  return { w: o, h: r };
}
const Ad = 60;
function Qe(e) {
  var n;
  const t = (n = e.rows) != null && n.length ? Mt(e.rows) : At(e.type, e.label, e.w ?? 0);
  return { w: Ad, h: t };
}
function $e(e, t) {
  const n = new hn.graphlib.Graph({ multigraph: !0 });
  n.setGraph({ rankdir: e.direction ?? "TB", nodesep: 50, ranksep: 60, marginx: 20, marginy: 20 }), n.setDefaultEdgeLabel(() => ({}));
  for (const a of e.nodes) {
    const { w: c, h: f } = pn(a, t == null ? void 0 : t.nodes[a.id]);
    n.setNode(a.id, { width: c, height: f });
  }
  for (const a of e.edges)
    n.setEdge(a.from, a.to, {}, a.id);
  hn.layout(n);
  const o = e.nodes.map((a) => {
    const c = t == null ? void 0 : t.nodes[a.id], { w: f, h } = pn(a, c), w = n.node(a.id);
    return {
      ...a,
      x: (c == null ? void 0 : c.x) ?? w.x,
      y: (c == null ? void 0 : c.y) ?? w.y,
      w: f,
      h
    };
  }), r = e.edges.map((a) => {
    const c = t == null ? void 0 : t.edges[a.id];
    return { ...a, points: (c == null ? void 0 : c.points) ?? [] };
  }), s = new Set(e.nodes.map((a) => a.id)), i = new Set(e.edges.map((a) => a.id)), d = t ? Object.keys(t.nodes).filter((a) => !s.has(a)) : [], l = t ? Object.keys(t.edges).filter((a) => !i.has(a)) : [];
  return (d.length || l.length) && console.warn(
    `dd-flow "${e.id}": saved layout has ${d.length} node(s) and ${l.length} edge(s) with no match in the current flow — their manual positions/routes were dropped.`,
    { orphanedNodeIds: d, orphanedEdgeIds: l }
  ), { nodes: o, edges: r, orphanedNodeIds: d, orphanedEdgeIds: l };
}
function He(e, t) {
  const n = { nodes: {}, edges: {} };
  for (const o of e) n.nodes[o.id] = { x: o.x, y: o.y, w: o.w, h: o.h };
  for (const o of t) n.edges[o.id] = { points: o.points };
  return n;
}
const mt = 5, no = 13, oo = 8;
function Td(e) {
  const t = (e ?? []).filter((n) => n.color).length;
  return t ? t * no + oo : 0;
}
function wn(e, t, n, o) {
  const r = $("g", { class: "dd-flow-pips" });
  let s = 0;
  for (const i of t) {
    const d = Re(e, [i.key]);
    if (!i.color || !d) continue;
    const l = n - oo - mt - s * no, a = $("circle", {
      cx: l,
      cy: o,
      r: d === 3 ? mt + 1 : mt,
      fill: d === 1 ? "none" : i.color,
      stroke: i.color,
      "stroke-width": d === 1 ? 2 : 1,
      class: `dd-flow-pip dd-flow-pip-${d}`,
      "data-filter-key": i.key
    }), c = $("title", {});
    c.textContent = `${i.label ?? i.key}: ${d}`, a.appendChild(c), r.appendChild(a), s += 1;
  }
  return s ? r : null;
}
function Rd(e, t, n) {
  var s;
  for (const i of e.querySelectorAll(".dd-flow-pips")) i.remove();
  if (!n.some((i) => i.color)) return;
  const o = new Map(t.map((i) => [i.id, i])), r = (i, d) => Number((i == null ? void 0 : i.getAttribute(d)) ?? Number.NaN);
  for (const i of e.querySelectorAll(".dd-flow-node")) {
    const d = o.get(i.getAttribute("data-node-id") ?? ""), l = i.firstElementChild;
    if (!d || (l == null ? void 0 : l.tagName.toLowerCase()) !== "rect") continue;
    const a = r(l, "x") + r(l, "width"), f = r(l, "y") + ((s = d.rows) != null && s.length ? Le : r(l, "height")) / 2, h = wn(d.levels, n, a, f);
    h && i.appendChild(h);
    const w = new Map((d.rows ?? []).map((p) => [p.id, p]));
    for (const p of i.querySelectorAll(".dd-flow-node-row")) {
      const b = p.querySelector("rect"), m = w.get(p.getAttribute("data-row-id") ?? ""), x = m && wn(m.levels, n, a, r(b, "y") + r(b, "height") / 2);
      x && p.appendChild(x);
    }
  }
}
const Pd = 3, mn = [
  "dd-flow-level-1",
  "dd-flow-level-2",
  "dd-flow-level-3",
  "dd-flow-level-none",
  "dd-flow-level-branch"
], ro = (e) => e === null ? [] : typeof e == "string" ? [e] : e;
function Re(e, t) {
  const n = Math.max(0, ...t.map((o) => Math.floor((e == null ? void 0 : e[o]) ?? 0)));
  return Math.min(Pd, n);
}
function jd(e, t, n, o) {
  var a;
  const r = ro(o);
  for (const c of e.querySelectorAll(mn.map((f) => `.${f}`).join(",")))
    c.classList.remove(...mn);
  const s = { 1: 0, 2: 0, 3: 0 };
  if (!r.length) return s;
  const i = /* @__PURE__ */ new Map();
  for (const c of e.querySelectorAll(".dd-flow-node")) {
    const f = c.getAttribute("data-node-id");
    f && i.set(f, c);
  }
  const d = /* @__PURE__ */ new Set(), l = (c) => {
    for (const f of ve(n.parentsOf, c)) d.add(f);
  };
  for (const c of t) {
    const f = i.get(c.id);
    if (!f) continue;
    const h = Re(c.levels, r);
    h && (f.classList.add(`dd-flow-level-${h}`), s[h] += 1, l(c.id));
    const w = /* @__PURE__ */ new Map();
    for (const p of f.querySelectorAll(".dd-flow-node-row")) {
      const b = p.getAttribute("data-row-id");
      b && w.set(b, p);
    }
    for (const p of c.rows ?? []) {
      const b = w.get(p.id);
      if (!b) continue;
      const m = Re(p.levels, r);
      if (!m) {
        b.classList.add("dd-flow-level-none");
        continue;
      }
      b.classList.add(`dd-flow-level-${m}`), s[m] += 1, d.add(c.id), l(c.id);
    }
  }
  for (const c of d) (a = i.get(c)) == null || a.classList.add("dd-flow-level-branch");
  return s;
}
function Dd(e, t, n) {
  const o = ro(n), r = /* @__PURE__ */ new Map();
  for (const l of t) r.set(l.target, [...r.get(l.target) ?? [], l.source]);
  const s = /* @__PURE__ */ new Map();
  for (const l of e) {
    const a = (l.rows ?? []).filter((c) => Re(c.levels, o) > 0);
    (Re(l.levels, o) > 0 || a.length) && s.set(l.id, a);
  }
  const i = new Set(s.keys()), d = [...i];
  for (; d.length; )
    for (const l of r.get(d.pop()) ?? [])
      i.has(l) || (i.add(l), d.push(l));
  return {
    nodes: e.filter((l) => i.has(l.id)).map((l) => {
      const a = s.get(l.id) ?? [];
      return { ...l, rows: a.length ? a : void 0 };
    }),
    edges: t.filter((l) => i.has(l.source) && i.has(l.target))
  };
}
function Bd(e, t, n = "All") {
  const o = document.createElement("div");
  o.className = "dd-flow-filter-bar", o.setAttribute("role", "group"), o.setAttribute("aria-label", "Filter");
  let r = [];
  const s = document.createElement("button"), i = /* @__PURE__ */ new Map(), d = (l) => {
    const a = e.map((c) => c.key);
    r = [...a.filter((c) => l.includes(c)), ...l.filter((c) => !a.includes(c))], s.setAttribute("aria-pressed", String(!r.length));
    for (const [c, f] of i) f.setAttribute("aria-pressed", String(r.includes(c)));
    t([...r]);
  };
  s.type = "button", s.className = "dd-flow-filter-btn", s.textContent = n, s.setAttribute("aria-pressed", "true"), s.addEventListener("click", () => d([])), o.appendChild(s);
  for (const l of e) {
    const a = document.createElement("button");
    a.type = "button", a.className = "dd-flow-filter-btn", a.textContent = l.label ?? l.key, a.dataset.filterKey = l.key, a.setAttribute("aria-pressed", "false"), a.addEventListener(
      "click",
      () => d(r.includes(l.key) ? r.filter((c) => c !== l.key) : [...r, l.key])
    ), i.set(l.key, a), o.appendChild(a);
  }
  return o.addEventListener("click", (l) => l.stopPropagation()), { element: o, select: d };
}
const qe = 20, gn = {
  top: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  bottom: { x: 0, y: 1 },
  left: { x: -1, y: 0 }
}, Fd = ["top", "right", "bottom", "left"], zd = /* @__PURE__ */ new Set(["decision", "merge", "on-page-reference", "preparation"]), Ne = (e) => e === "top" || e === "bottom";
function Ze(e, t) {
  const n = t.at ?? 0.5, o = e.x - e.w / 2, r = e.y - e.h / 2;
  if (t.side === "top") return { x: o + n * e.w, y: r };
  if (t.side === "bottom") return { x: o + n * e.w, y: r + e.h };
  const s = e.type === "merge" ? n * e.w / 2 : 0;
  return t.side === "left" ? { x: o + s, y: r + n * e.h } : { x: o + e.w - s, y: r + n * e.h };
}
function so(e) {
  const t = zd.has(e) ? [0.5] : [0.25, 0.5, 0.75];
  return Fd.flatMap((n) => t.map((o) => ({ side: n, at: o })));
}
function Gd(e, t) {
  const n = (o) => {
    const r = Ze(e, o);
    return Math.hypot(r.x - t.x, r.y - t.y);
  };
  return so(e.type).reduce((o, r) => n(r) < n(o) ? r : o);
}
function yn(e, t) {
  const n = t.x - e.x, o = t.y - e.y;
  return Math.abs(o) >= Math.abs(n) || n === 0 ? o >= 0 ? "bottom" : "top" : n >= 0 ? "right" : "left";
}
function Hd(e, t, n, o) {
  const r = gn[t], s = gn[o], i = { x: e.x + r.x * qe, y: e.y + r.y * qe }, d = { x: n.x + s.x * qe, y: n.y + s.y * qe };
  if (Ne(t) && Ne(o)) {
    if (t === o) {
      const a = t === "bottom" ? Math.max(i.y, d.y) : Math.min(i.y, d.y);
      return [e, { x: e.x, y: a }, { x: n.x, y: a }, n];
    }
    if ((d.y - i.y) * r.y >= 0) {
      const a = (e.y + n.y) / 2;
      return [e, { x: e.x, y: a }, { x: n.x, y: a }, n];
    }
    const l = (e.x + n.x) / 2;
    return [e, i, { x: l, y: i.y }, { x: l, y: d.y }, d, n];
  }
  if (!Ne(t) && !Ne(o)) {
    if (t === o) {
      const a = t === "right" ? Math.max(i.x, d.x) : Math.min(i.x, d.x);
      return [e, { x: a, y: e.y }, { x: a, y: n.y }, n];
    }
    if ((d.x - i.x) * r.x >= 0) {
      const a = (e.x + n.x) / 2;
      return [e, { x: a, y: e.y }, { x: a, y: n.y }, n];
    }
    const l = (e.y + n.y) / 2;
    return [e, i, { x: i.x, y: l }, { x: d.x, y: l }, d, n];
  }
  return Ne(t) ? (n.y - e.y) * r.y > 0 && (e.x - n.x) * s.x > 0 ? [e, { x: e.x, y: n.y }, n] : [e, i, { x: d.x, y: i.y }, d, n] : (n.x - e.x) * r.x > 0 && (e.y - n.y) * s.y > 0 ? [e, { x: n.x, y: e.y }, n] : [e, i, { x: i.x, y: d.y }, d, n];
}
const Ye = 40;
function dt(e) {
  const t = e.type === "conditional" ? "conditional" : "default", n = e.type === "dashed" ? "dashed" : "solid";
  return {
    kind: e.kind ?? t,
    routing: e.routing ?? "orthogonal",
    stroke: e.stroke ?? n
  };
}
function qd(e, t) {
  const n = t.x - e.x, o = t.y - e.y;
  if (n === 0 && o === 0)
    return [
      { x: e.x, y: e.y },
      { x: t.x, y: t.y }
    ];
  const r = (s, i, d) => {
    const l = s.w / 2, a = s.h / 2, c = Math.min(
      i !== 0 ? l / Math.abs(i) : 1 / 0,
      d !== 0 ? a / Math.abs(d) : 1 / 0
    );
    return { x: s.x + i * c, y: s.y + d * c };
  };
  return [r(e, n, o), r(t, -n, -o)];
}
function Yd(e, t) {
  const n = t.x - e.x, o = t.y - e.y;
  if (Math.abs(n) >= Math.abs(o)) {
    const s = n >= 0 ? 1 : -1;
    return [
      { x: e.x + s * e.w / 2, y: e.y },
      { x: t.x - s * t.w / 2, y: t.y }
    ];
  }
  const r = o >= 0 ? 1 : -1;
  return [
    { x: e.x, y: e.y + r * e.h / 2 },
    { x: t.x, y: t.y - r * t.h / 2 }
  ];
}
function Vd(e, t, n = "orthogonal", o = {}) {
  if (o.from || o.to) {
    const c = o.from ?? { side: yn(e, t) }, f = o.to ?? { side: yn(t, e) }, h = Ze(e, c), w = Ze(t, f);
    return n === "straight" || n === "bezier" ? [h, w] : Hd(h, c.side, w, f.side);
  }
  if (n === "straight") return qd(e, t);
  if (n === "bezier") return Yd(e, t);
  const r = t.x - e.x, s = t.y - e.y;
  if (Math.abs(s) >= Math.abs(r) || r === 0) {
    const c = s >= 0 ? 1 : -1, f = { x: e.x, y: e.y + c * e.h / 2 }, h = { x: t.x, y: t.y - c * t.h / 2 };
    if (f.x === h.x) return [f, h];
    const w = (f.y + h.y) / 2;
    return [f, { x: f.x, y: w }, { x: h.x, y: w }, h];
  }
  const i = r >= 0 ? 1 : -1, d = { x: e.x + i * e.w / 2, y: e.y }, l = { x: t.x - i * t.w / 2, y: t.y };
  if (d.y === l.y) return [d, l];
  const a = (d.x + l.x) / 2;
  return [d, { x: a, y: d.y }, { x: a, y: l.y }, l];
}
const Kd = 10, bn = 40;
function io(e) {
  const [t, n] = [e[0], e[e.length - 1]], o = n.x - t.x, r = n.y - t.y;
  if (Math.abs(o) >= Math.abs(r)) {
    const i = Math.max(bn, Math.abs(o) / 2) * Math.sign(o || 1);
    return `M ${t.x} ${t.y} C ${t.x + i} ${t.y}, ${n.x - i} ${n.y}, ${n.x} ${n.y}`;
  }
  const s = Math.max(bn, Math.abs(r) / 2) * Math.sign(r || 1);
  return `M ${t.x} ${t.y} C ${t.x} ${t.y + s}, ${n.x} ${n.y - s}, ${n.x} ${n.y}`;
}
function Ud(e, t) {
  if (!t || e.length <= 2) return Wd(e);
  const n = [`M ${e[0].x} ${e[0].y}`];
  for (let r = 1; r < e.length - 1; r++) {
    const s = e[r - 1], i = e[r], d = e[r + 1], l = Math.hypot(i.x - s.x, i.y - s.y), a = Math.hypot(d.x - i.x, d.y - i.y), c = Math.min(Kd, l / 2, a / 2), f = { x: i.x - (i.x - s.x) / l * c, y: i.y - (i.y - s.y) / l * c }, h = { x: i.x + (d.x - i.x) / a * c, y: i.y + (d.y - i.y) / a * c };
    n.push(`L ${f.x} ${f.y}`, `Q ${i.x} ${i.y} ${h.x} ${h.y}`);
  }
  const o = e[e.length - 1];
  return n.push(`L ${o.x} ${o.y}`), n.join(" ");
}
function Wd(e) {
  return e.map((t, n) => `${n === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
}
const Xd = {
  solid: null,
  dashed: "6,4",
  dotted: "1.5,4"
};
function Jd(e) {
  return e.filter((t, n) => n === 0 || t.x !== e[n - 1].x || t.y !== e[n - 1].y);
}
function Dt(e, t, n) {
  const o = { from: e.fromPort, to: e.toPort }, r = e.points.length >= 2 ? e.points : Vd(t, n, dt(e).routing, o);
  return Jd(r);
}
function Qd(e, t, n, o = {}) {
  const r = Dt(e, t, n), { kind: s, routing: i, stroke: d } = dt(e), l = $("g", {
    class: `dd-flow-edge dd-flow-edge-${s}${o.selected ? " is-selected" : ""}`,
    "data-edge-id": e.id
  }), a = i === "bezier" && r.length === 2 ? io(r) : Ud(r, i === "curved");
  l.appendChild(
    $("path", { d: a, fill: "none", stroke: "transparent", "stroke-width": 16, class: "dd-flow-edge-hit" })
  );
  const c = $("path", {
    d: a,
    fill: "none",
    stroke: s === "conditional" ? "var(--dd-flow-edge-conditional-stroke)" : "var(--dd-flow-edge-stroke)",
    "stroke-width": 2,
    "marker-end": "url(#dd-flow-arrow)"
  }), f = Xd[d];
  if (f && c.setAttribute("stroke-dasharray", f), l.appendChild(c), e.label) {
    const h = r[Math.floor((r.length - 1) / 2)], w = r[Math.floor((r.length - 1) / 2) + 1] ?? h, p = (h.x + w.x) / 2, b = (h.y + w.y) / 2, m = Math.max(24, e.label.length * 7 + 12);
    l.appendChild(
      $("rect", {
        x: p - m / 2,
        y: b - 10,
        width: m,
        height: 20,
        rx: 4,
        fill: "var(--dd-flow-edge-label-bg)",
        class: "dd-flow-edge-label-bg"
      })
    );
    const x = $("text", {
      x: p,
      y: b,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "var(--dd-flow-edge-label-text)",
      class: "dd-flow-edge-label"
    });
    x.textContent = e.label, l.appendChild(x);
  }
  return l;
}
function Zd(e, t, n) {
  const o = $("g", {
    class: `dd-flow-row-edge${e.flagged ? " dd-flow-row-edge-flagged" : ""}`,
    "data-row-edge-id": Ot(e)
  }), r = io([t, n]);
  return o.appendChild(
    $("path", {
      d: r,
      fill: "none",
      stroke: "var(--dd-flow-row-edge-stroke, var(--dd-flow-edge-stroke))",
      "stroke-width": 1.5,
      "stroke-dasharray": "3,3"
    })
  ), o;
}
function el() {
  const e = $("defs", {}), t = $("marker", {
    id: "dd-flow-arrow",
    viewBox: "0 0 10 10",
    refX: 9,
    refY: 5,
    markerWidth: 8,
    markerHeight: 8,
    orient: "auto-start-reverse"
  });
  return t.appendChild($("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "var(--dd-flow-edge-stroke)" })), e.appendChild(t), e;
}
const tl = 7, Ve = 10, nl = 24, ol = 0.2;
function et(e, t, n = {}) {
  var x, g, L, C;
  const o = new Map(e.map((E) => [E.id, E]));
  let r = 1 / 0, s = 1 / 0, i = -1 / 0, d = -1 / 0;
  for (const E of e)
    r = Math.min(r, E.x - E.w / 2), s = Math.min(s, E.y - E.h / 2), i = Math.max(i, E.x + E.w / 2), d = Math.max(d, E.y + E.h / 2);
  e.length || (r = 0, s = 0, i = 200, d = 100);
  const l = i - r + Ye * 2, a = d - s + Ye * 2, c = Ye - r, f = Ye - s, h = $("svg", {
    class: "dd-flow-svg",
    viewBox: `0 0 ${l} ${a}`,
    width: l,
    height: a
  });
  h.appendChild(el());
  const w = $("g", { class: "dd-flow-world", transform: `translate(${c}, ${f})` }), p = $("g", { class: "dd-flow-edges" });
  for (const E of t) {
    const _ = o.get(E.from), y = o.get(E.to);
    !_ || !y || p.appendChild(Qd(E, _, y, { selected: E.id === n.selectedEdgeId }));
  }
  w.appendChild(p);
  const b = (((x = n.selectedNodeIds) == null ? void 0 : x.size) ?? 0) > 1, m = $("g", { class: "dd-flow-nodes" });
  for (const E of e) {
    const _ = ((g = n.selectedNodeIds) == null ? void 0 : g.has(E.id)) ?? !1, y = !b && (E.id === n.selectedNodeId || _), M = ((L = n.selectedRowKey) == null ? void 0 : L.nodeId) === E.id ? n.selectedRowKey.rowId : null;
    m.appendChild(
      So(E, { selected: y, multiselected: b && _, selectedRowId: M, resizable: n.resizable })
    );
  }
  if (w.appendChild(m), n.reconnectable) {
    const E = $("g", { class: "dd-flow-edge-handles" });
    for (const _ of t) {
      const y = o.get(_.from), M = o.get(_.to);
      if (!y || !M) continue;
      const I = Dt(_, y, M), k = { from: I[0], to: I[I.length - 1] }, T = `${_.id === n.selectedEdgeId ? " is-selected" : ""}${_.id === n.hotEdgeId ? " is-hot" : ""}`, B = ["orthogonal", "curved"].includes(dt(_).routing);
      for (let j = 0; B && j < I.length - 1; j++) {
        const Y = I[j], U = I[j + 1], ie = Y.y === U.y;
        if (ie === (Y.x === U.x) || Math.abs(U.x - Y.x) + Math.abs(U.y - Y.y) < nl) continue;
        const re = _.label && j === Math.floor((I.length - 1) / 2) ? ol : 0.5;
        E.appendChild(
          $("rect", {
            class: `dd-flow-bend-handle ${ie ? "is-horizontal" : "is-vertical"}${T}`,
            "data-edge-id": _.id,
            "data-segment": j,
            x: Y.x + (U.x - Y.x) * re - Ve / 2,
            y: Y.y + (U.y - Y.y) * re - Ve / 2,
            width: Ve,
            height: Ve,
            rx: 2,
            fill: "var(--dd-flow-selection)",
            opacity: 0
          })
        );
      }
      for (const j of ["from", "to"])
        E.appendChild(
          $("circle", {
            class: `dd-flow-edge-handle${T}`,
            "data-edge-id": _.id,
            "data-end": j,
            cx: k[j].x,
            cy: k[j].y,
            r: tl,
            fill: "var(--dd-flow-selection)",
            // Invisible by its own attribute, so a copy without the stylesheet never shows it.
            opacity: 0
          })
        );
    }
    w.appendChild(E);
  }
  if ((C = n.rowEdges) != null && C.length) {
    const E = $("g", { class: "dd-flow-row-edges" });
    for (const _ of n.rowEdges) {
      const y = o.get(_.sourceNode), M = o.get(_.targetNode);
      if (!y || !M) continue;
      const I = y.x <= M.x, k = Ht(y, _.sourceRow, I ? "right" : "left"), T = Ht(M, _.targetRow, I ? "left" : "right");
      !k || !T || E.appendChild(Zd(_, k, T));
    }
    w.appendChild(E);
  }
  return h.appendChild(w), h;
}
const tt = {
  bam: {
    vars: {
      bg: "#ffffff",
      "canvas-bg": "#fafbfa",
      "node-fill": "#ffffff",
      "node-stroke": "#3eb049",
      "node-text": "#1b1b1b",
      "start-fill": "#3eb049",
      "start-text": "#ffffff",
      "end-fill": "#1b1b1b",
      "end-text": "#ffffff",
      "decision-fill": "#fff8e6",
      "decision-stroke": "#b08e3e",
      "subprocess-stroke": "#00bfff",
      "edge-stroke": "#555555",
      "edge-conditional-stroke": "#b08e3e",
      "edge-label-bg": "#ffffff",
      "edge-label-text": "#333333",
      selection: "#00bfff",
      font: "'Segoe UI', system-ui, -apple-system, sans-serif"
    }
  },
  mono: {
    vars: {
      bg: "#ffffff",
      "canvas-bg": "#ffffff",
      "node-fill": "#ffffff",
      "node-stroke": "#333333",
      "node-text": "#111111",
      "start-fill": "#111111",
      "start-text": "#ffffff",
      "end-fill": "#111111",
      "end-text": "#ffffff",
      "decision-fill": "#f2f2f2",
      "decision-stroke": "#333333",
      "subprocess-stroke": "#333333",
      "edge-stroke": "#333333",
      "edge-conditional-stroke": "#666666",
      "edge-label-bg": "#ffffff",
      "edge-label-text": "#111111",
      selection: "#0066cc",
      font: "'Segoe UI', system-ui, -apple-system, sans-serif"
    }
  },
  contrast: {
    vars: {
      bg: "#1e1e1e",
      "canvas-bg": "#181818",
      "node-fill": "#2a2a2a",
      "node-stroke": "#e0e0e0",
      "node-text": "#f5f5f5",
      "start-fill": "#3eb049",
      "start-text": "#ffffff",
      "end-fill": "#e0e0e0",
      "end-text": "#1e1e1e",
      "decision-fill": "#3a331a",
      "decision-stroke": "#e2c478",
      "subprocess-stroke": "#5fd4ff",
      "edge-stroke": "#cccccc",
      "edge-conditional-stroke": "#e2c478",
      "edge-label-bg": "#2a2a2a",
      "edge-label-text": "#f5f5f5",
      selection: "#5fd4ff",
      font: "'Segoe UI', system-ui, -apple-system, sans-serif"
    }
  }
};
tt.host = {
  vars: {
    bg: "var(--dd-flow-host-bg, var(--md-default-bg-color, #ffffff))",
    "canvas-bg": "var(--dd-flow-host-canvas-bg, var(--md-code-bg-color, #fafbfa))",
    "node-fill": "var(--dd-flow-host-node-fill, var(--md-default-bg-color, #ffffff))",
    "node-stroke": "var(--dd-flow-host-node-stroke, var(--md-primary-fg-color, #3eb049))",
    "node-text": "var(--dd-flow-host-node-text, var(--md-default-fg-color, #1b1b1b))",
    "start-fill": "var(--dd-flow-host-start-fill, var(--md-primary-fg-color, #3eb049))",
    "start-text": "var(--dd-flow-host-start-text, var(--md-primary-bg-color, #ffffff))",
    "end-fill": "var(--dd-flow-host-end-fill, var(--md-default-fg-color, #1b1b1b))",
    "end-text": "var(--dd-flow-host-end-text, var(--md-default-bg-color, #ffffff))",
    "decision-fill": "var(--dd-flow-host-decision-fill, var(--md-code-bg-color, #fff8e6))",
    "decision-stroke": "var(--dd-flow-host-decision-stroke, #b08e3e)",
    "subprocess-stroke": "var(--dd-flow-host-subprocess-stroke, var(--md-accent-fg-color, #00bfff))",
    "edge-stroke": "var(--dd-flow-host-edge-stroke, var(--md-default-fg-color--light, #555555))",
    "edge-conditional-stroke": "var(--dd-flow-host-edge-conditional-stroke, #b08e3e)",
    "edge-label-bg": "var(--dd-flow-host-edge-label-bg, var(--md-default-bg-color, #ffffff))",
    "edge-label-text": "var(--dd-flow-host-edge-label-text, var(--md-default-fg-color, #333333))",
    selection: "var(--dd-flow-host-selection, var(--md-accent-fg-color, #00bfff))",
    font: "var(--dd-flow-host-font, 'Segoe UI', system-ui, -apple-system, sans-serif)"
  }
};
const gt = "bam";
function Ae(e, t) {
  const n = tt[t ?? gt] ?? tt[gt];
  e.setAttribute("data-dd-flow-theme", t ?? gt);
  for (const [o, r] of Object.entries(n.vars))
    e.style.setProperty(`--dd-flow-${o}`, r);
}
function fa(e, t) {
  tt[e] = t;
}
const rl = 0.2, sl = 4, il = 4, dl = 300, ll = 30;
function Ct(e) {
  const t = e.offsetWidth, n = e.getBoundingClientRect().width;
  return t > 0 && n > 0 ? n / t : 1;
}
function Lt(e, t, n) {
  const o = e.getBoundingClientRect(), r = Ct(e);
  return { x: (t - o.left) / r, y: (n - o.top) / r };
}
const Ie = "ddFlowPanned";
function lo(e, t, n = {}) {
  var de, ue, le, Pe, je;
  const o = n.minScale ?? rl, r = n.maxScale ?? sl, s = n.maxFitScale ?? 1, i = Number(t.getAttribute("width")) || 1, d = Number(t.getAttribute("height")) || 1, l = 24, a = t.querySelector("g.dd-flow-world");
  if (!a)
    return {
      fit: () => {
      },
      reset: () => {
      },
      zoomBy: () => {
      },
      state: () => ({ scale: 1, tx: 0, ty: 0, userAdjusted: !1 }),
      destroy: () => {
      }
    };
  const c = document.createElementNS("http://www.w3.org/2000/svg", "g");
  c.setAttribute("class", "dd-flow-pz"), (de = a.parentNode) == null || de.insertBefore(c, a), c.appendChild(a), e.classList.add("dd-flow-has-viewport");
  let f = ((ue = n.initial) == null ? void 0 : ue.scale) ?? 1, h = ((le = n.initial) == null ? void 0 : le.tx) ?? 0, w = ((Pe = n.initial) == null ? void 0 : Pe.ty) ?? 0, p = ((je = n.initial) == null ? void 0 : je.userAdjusted) ?? !1, b = o;
  const m = () => {
    c.setAttribute("transform", `translate(${h}, ${w}) scale(${f})`);
  }, x = () => {
    const P = e.getBoundingClientRect(), R = Math.max(1, Math.round(e.offsetWidth || P.width)), z = Math.max(1, Math.round(e.offsetHeight || P.height));
    return t.setAttribute("width", String(R)), t.setAttribute("height", String(z)), t.setAttribute("viewBox", `0 0 ${R} ${z}`), { w: R, h: z };
  }, g = () => {
    const P = e.getBoundingClientRect(), R = a.getBoundingClientRect();
    if (!R.width || !R.height || !f) return null;
    const z = Ct(e);
    return {
      x: ((R.left - P.left) / z - h) / f,
      y: ((R.top - P.top) / z - w) / f,
      width: R.width / z / f,
      height: R.height / z / f
    };
  }, L = () => {
    const { w: P, h: R } = x();
    if (p) {
      m();
      return;
    }
    m();
    const z = g() ?? { x: 0, y: 0, width: i, height: d }, Q = { w: Math.max(1, P - l * 2), h: Math.max(1, R - l * 2) };
    f = Math.min(s, Q.w / z.width, Q.h / z.height), b = Math.min(o, f), h = (P - z.width * f) / 2 - z.x * f, w = (R - z.height * f) / 2 - z.y * f, m();
  }, C = (P, R, z) => {
    const Q = f;
    f = Math.min(r, Math.max(b, f * z)), f !== Q && (h = P - (P - h) / Q * f, w = R - (R - w) / Q * f, m());
  }, E = (P) => {
    P.preventDefault(), p = !0;
    const R = Lt(e, P.clientX, P.clientY);
    C(R.x, R.y, P.deltaY < 0 ? 1.1 : 0.9);
  };
  let _ = !1, y = !1, M = 0, I = 0, k = 0, T = 0;
  const B = /* @__PURE__ */ new Map();
  let j = 0, Y = 0, U = 0, ie = 0;
  const Se = () => {
    if (B.size < 2) return null;
    const [P, R] = [...B.values()];
    return { distance: Math.hypot(P.x - R.x, P.y - R.y), cx: (P.x + R.x) / 2, cy: (P.y + R.y) / 2 };
  }, re = (P) => {
    const R = P;
    return R != null && R.closest ? !R.closest(".dd-flow-node") && !R.closest(".dd-flow-edge-hit, .dd-flow-edge-handle, .dd-flow-bend-handle") && !R.closest(".dd-flow-filter-bar, button") : !0;
  }, K = (P) => {
    B.set(P.pointerId, { x: P.clientX, y: P.clientY });
    const R = Se();
    if (R) {
      _ = !1, j = R.distance;
      return;
    }
    re(P.target) && (_ = !0, y = !1, M = P.clientX, I = P.clientY, k = h, T = w);
  }, W = (P) => {
    B.has(P.pointerId) && B.set(P.pointerId, { x: P.clientX, y: P.clientY });
    const R = Se();
    if (R) {
      if (!j) {
        j = R.distance;
        return;
      }
      p = !0, y = !0, e.dataset[Ie] = "1";
      const he = Lt(e, R.cx, R.cy);
      C(he.x, he.y, R.distance / j), j = R.distance;
      return;
    }
    if (!_) return;
    const z = P.clientX - M, Q = P.clientY - I;
    if (!y && Math.hypot(z, Q) < il) return;
    y = !0, p = !0, e.dataset[Ie] = "1";
    const De = Ct(e);
    h = k + z / De, w = T + Q / De, m();
  }, lt = (P) => {
    const R = Date.now(), z = R - Y < dl && Math.hypot(P.clientX - U, P.clientY - ie) < ll;
    return Y = z ? 0 : R, U = P.clientX, ie = P.clientY, z;
  }, fe = (P) => {
    const R = B.size >= 2;
    if (B.delete(P.pointerId), R) {
      j = 0, B.size < 2 && setTimeout(() => delete e.dataset[Ie], 0);
      return;
    }
    if (_) {
      if (_ = !1, !y) {
        re(P.target) && lt(P) && (p = !1, L());
        return;
      }
      setTimeout(() => delete e.dataset[Ie], 0);
    }
  }, X = { capture: !0 };
  e.addEventListener("wheel", E, { passive: !1, capture: !0 }), e.addEventListener("pointerdown", K, X), e.addEventListener("pointermove", W, X), e.addEventListener("pointerup", fe, X), e.addEventListener("pointercancel", fe, X);
  const Ee = new ResizeObserver(() => L());
  return Ee.observe(e), L(), {
    fit: L,
    state: () => ({ scale: f, tx: h, ty: w, userAdjusted: p }),
    reset() {
      p = !1, L();
    },
    zoomBy(P) {
      p = !0;
      const { w: R, h: z } = x();
      C(R / 2, z / 2, P);
    },
    destroy() {
      Ee.disconnect(), e.removeEventListener("wheel", E, X), e.removeEventListener("pointerdown", K, X), e.removeEventListener("pointermove", W, X), e.removeEventListener("pointerup", fe, X), e.removeEventListener("pointercancel", fe, X), e.classList.remove("dd-flow-has-viewport");
    }
  };
}
const ke = {
  nodeWidth: 118,
  nodeHeight: 34,
  layerGap: 170,
  rowGap: 48,
  margin: 30,
  hint: "Hover to preview · click to pin · scroll to zoom · drag to pan"
};
function al(e, t, n) {
  const { nodeWidth: o, nodeHeight: r, layerGap: s, rowGap: i, margin: d } = n, l = /* @__PURE__ */ new Map();
  for (const p of e) {
    const b = p.layer ?? 0;
    l.has(b) || l.set(b, []), l.get(b).push(p);
  }
  for (const p of l.values()) p.sort((b, m) => b.id.localeCompare(m.id));
  const a = Math.max(1, ...[...l.values()].map((p) => p.length)), c = Math.max(0, ...e.map((p) => p.layer ?? 0)), f = a * (r + i) - i, h = new Set(t.map((p) => p.source)), w = /* @__PURE__ */ new Map();
  for (const [p, b] of l) {
    const m = b.filter((C) => h.has(C.id)), x = b.filter((C) => !h.has(C.id)), g = m.length ? m.length * (r + i) - i : 0, L = d + (f - g) / 2;
    m.forEach((C, E) => {
      w.set(C.id, { x: d + p * s, y: L + E * (r + i) });
    }), x.forEach((C, E) => {
      const _ = Math.floor(E / 2), y = E % 2 === 0 ? _ : a - 1 - _;
      w.set(C.id, { x: d + p * s, y: d + y * (r + i) });
    });
  }
  return {
    positions: w,
    width: d * 2 + c * s + o,
    height: d * 2 + f
  };
}
const ao = (e) => `${e.source} ${e.target}`;
function cl(e, t, n, o) {
  const r = e.nodes.map((d) => {
    var l;
    return (l = d.rows) != null && l.length ? Mt(d.rows) : n;
  }), s = Math.max(n, ...r), { positions: i } = al(e.nodes, e.edges, {
    nodeWidth: t,
    nodeHeight: s,
    layerGap: o.layerGap ?? ke.layerGap,
    rowGap: o.rowGap ?? ke.rowGap,
    margin: ke.margin
  });
  return e.nodes.map((d, l) => {
    var w;
    const a = i.get(d.id), c = !!((w = d.rows) != null && w.length), f = c ? rt(d.label ?? d.id, d.rows, t) : t, h = c ? r[l] : n;
    return {
      id: d.id,
      label: d.label ?? d.id,
      type: c ? "compound" : "process",
      note: d.note,
      rows: d.rows,
      x: a.x + f / 2,
      y: a.y + s / 2,
      w: f,
      h
    };
  });
}
const fl = 320;
function ul(e, t, n) {
  const o = Math.min(
    Math.max(t, rt(e, void 0, t)),
    Math.max(t, fl)
  ), r = $t(e, o - 20).length > 1;
  return { w: o, h: r ? Math.max(n, At("process", e, o)) : n };
}
function hl(e, t, n, o) {
  const r = Td(e.filters), { nodes: s } = $e({
    id: e.id ?? "graph",
    direction: o,
    nodes: e.nodes.map((i) => {
      var c;
      const d = i.label ?? i.id;
      if ((c = i.rows) != null && c.length) {
        const f = rt(d, i.rows, t) + r;
        return { id: i.id, label: d, type: "compound", note: i.note, rows: i.rows, w: f };
      }
      const { w: l, h: a } = ul(d, t, n);
      return { id: i.id, label: d, type: "process", note: i.note, w: l + r, h: a };
    }),
    edges: e.edges.map((i) => ({ id: ao(i), from: i.source, to: i.target }))
  });
  return s;
}
function pl(e, t, n = {}) {
  var _;
  const o = n.nodeWidth ?? ke.nodeWidth, r = n.nodeHeight ?? ke.nodeHeight, s = n.hint ?? ke.hint;
  e.classList.add("dd-flow-embed", "dd-flow-graph-mount"), Ae(e, n.style ?? "host");
  const i = n.id ?? t.id ?? "";
  let d, l = We([]), a = null, c = null;
  const f = (y) => {
    c == null || c.destroy(), a == null || a.destroy(), d == null || d.remove();
    const M = n.layout === "flow" ? hl(y, o, r, n.direction ?? "LR") : cl(y, o, r, n), I = new Set(M.map((T) => T.id)), k = y.edges.filter((T) => I.has(T.source) && I.has(T.target)).map((T) => ({
      id: ao(T),
      from: T.source,
      to: T.target,
      routing: "bezier",
      stroke: T.flagged ? "dashed" : "solid",
      kind: T.flagged ? "conditional" : "default",
      points: []
    }));
    d = et(M, k, { rowEdges: y.rowEdges }), Rd(d, y.nodes, t.filters ?? []), e.prepend(d), a = lo(e, d, { maxFitScale: 1 }), c = _o(e, k, { flowId: i, rowEdges: y.rowEdges }), l = We(k);
  };
  f(t);
  const h = document.createElement("div");
  if (h.className = "dd-flow-graph-tooltip", e.appendChild(h), s) {
    const y = document.createElement("div");
    y.className = "dd-flow-graph-hint", y.textContent = s, e.appendChild(y);
  }
  const w = new Map(t.nodes.map((y) => [y.id, y])), p = (y) => {
    var B, j;
    const M = (j = (B = y.target) == null ? void 0 : B.closest) == null ? void 0 : j.call(B, ".dd-flow-node"), I = M == null ? void 0 : M.getAttribute("data-node-id"), k = I ? w.get(I) : void 0;
    if (!k) {
      h.style.display = "none";
      return;
    }
    h.textContent = k.note ? `${k.label ?? k.id} · ${k.note}` : k.label ?? k.id, h.style.display = "block";
    const T = Lt(e, y.clientX, y.clientY);
    h.style.left = `${T.x + 14}px`, h.style.top = `${T.y + 14}px`;
  }, b = () => {
    h.style.display = "none";
  };
  e.addEventListener("pointermove", p), e.addEventListener("pointerleave", b);
  const m = (y) => {
    var B, j;
    const M = (j = (B = y.target) == null ? void 0 : B.closest) == null ? void 0 : j.call(B, ".dd-flow-node-row"), I = M == null ? void 0 : M.closest(".dd-flow-node"), k = I == null ? void 0 : I.getAttribute("data-node-id"), T = M == null ? void 0 : M.getAttribute("data-row-id");
    !k || !T || te(e, ee.rowClick, {
      flowId: i,
      nodeId: k,
      rowId: T,
      shiftKey: y.shiftKey
    });
  };
  e.addEventListener("click", m);
  let x = [];
  const g = (y) => {
    const M = n.filterMode === "hide", I = M && y.length ? Dd(t.nodes, t.edges, y) : null, k = I != null && I.nodes.length ? { ...t, ...I, rowEdges: void 0 } : t;
    M && (k !== t || x.length) && f(k), x = y;
    const T = jd(d, k.nodes, l, y);
    te(e, ee.filterChange, {
      flowId: i,
      keys: y,
      key: y[0] ?? null,
      counts: T
    });
  }, L = (y) => {
    C ? C.select(y) : g([...y]);
  }, C = (_ = t.filters) != null && _.length ? Bd(t.filters, g, n.allFilterLabel) : null;
  C && e.appendChild(C.element);
  const E = xo(e, () => a == null ? void 0 : a.reset(), n.fullscreen !== !1);
  return {
    setFullscreen: E.set,
    setFilters: L,
    getFilters: () => [...x],
    setFilter: (y) => L(y === null ? [] : [y]),
    getFilter: () => x[0] ?? null,
    destroy() {
      E.destroy(), e.removeEventListener("pointermove", p), e.removeEventListener("pointerleave", b), e.removeEventListener("click", m), c == null || c.destroy(), c = null, a == null || a.destroy(), a = null, e.innerHTML = "", e.classList.remove("dd-flow-graph-mount");
    }
  };
}
const wl = ".dd-flow-graph:not([data-dd-flow-mounted])";
async function ml(e = document) {
  const t = Array.from(e.querySelectorAll(wl));
  await Promise.all(
    t.map(async (n) => {
      n.setAttribute("data-dd-flow-mounted", "1");
      const o = n.getAttribute("data-graph");
      try {
        let r;
        if (o) {
          const i = await fetch(o);
          if (!i.ok) throw new Error(`${i.status} ${i.statusText}`);
          r = await i.json();
        } else {
          const i = n.querySelector('script[type="application/json"]');
          if (!(i != null && i.textContent)) throw new Error("no data-graph attribute and no inline JSON");
          r = JSON.parse(i.textContent), i.remove();
        }
        const s = n.getAttribute("data-hint");
        pl(n, r, { style: n.getAttribute("data-style") ?? void 0, hint: s ?? void 0 });
      } catch (r) {
        console.error("dd-flow: failed to mount graph", r), n.textContent = "dd-flow: failed to mount graph (see console)";
      }
    })
  );
}
const ua = () => ({ nodes: {}, edges: {} }), gl = 4, yl = 18, bl = 40, vl = 20, vn = "dd-flow-connecting";
function xl(e, t) {
  const n = Math.max(Math.abs(e.x - t.x) - t.w / 2, 0), o = Math.max(Math.abs(e.y - t.y) - t.h / 2, 0);
  return Math.hypot(n, o);
}
function xn(e, t) {
  const n = Math.hypot(t.x - e.x, t.y - e.y), o = Math.min(vl, n / 2) / (n || 1);
  return { x: e.x + (t.x - e.x) * o, y: e.y + (t.y - e.y) * o };
}
function El(e, t, n, o) {
  const r = e.map((l) => ({ ...l }));
  let s = t;
  if (t + 1 === r.length - 1) {
    const l = xn(r[t + 1], r[t]);
    r.splice(t + 1, 0, { ...l }, l);
  }
  if (t === 0) {
    const l = xn(r[0], r[1]);
    r.splice(1, 0, l, { ...l }), s = 2;
  }
  const i = r[s], d = r[s + 1];
  return i.y === d.y ? (i.y += o, d.y += o) : (i.x += n, d.x += n), r;
}
const Bt = (e) => e.querySelector("svg.dd-flow-svg g.dd-flow-world");
function kt(e, t, n) {
  var d, l;
  const o = e.querySelector("svg.dd-flow-svg"), r = (l = (d = Bt(e)) == null ? void 0 : d.getScreenCTM) == null ? void 0 : l.call(d);
  if (!o || !r) return { x: t, y: n };
  const s = o.createSVGPoint();
  s.x = t, s.y = n;
  const i = s.matrixTransform(r.inverse());
  return { x: i.x, y: i.y };
}
const St = (e) => {
  var t, n;
  return (n = (t = Bt(e)) == null ? void 0 : t.querySelector(".dd-flow-drag-overlay")) == null ? void 0 : n.remove();
};
function Cl(e, t, n) {
  return e.filter((o) => o.id !== n && xl(t, o) <= bl).flatMap((o) => so(o.type).map((r) => ({ point: Ze(o, r), nodeId: o.id, port: r })));
}
function Ll(e, t) {
  let n = yl, o = null;
  for (const r of e) {
    const s = Math.hypot(r.point.x - t.x, r.point.y - t.y);
    s < n && (n = s, o = r);
  }
  return o;
}
function yt(e, t, n, o) {
  var l;
  St(e);
  const r = Cl(t, n, o.excludeNodeId), s = Ll(r, n);
  o.snap = s && { nodeId: s.nodeId, port: s.port };
  const i = $("g", { class: "dd-flow-drag-overlay" }), d = (s == null ? void 0 : s.point) ?? n;
  i.appendChild(
    $("line", { class: "dd-flow-rubber", x1: o.anchor.x, y1: o.anchor.y, x2: d.x, y2: d.y })
  );
  for (const a of r) {
    const c = a === s;
    i.appendChild(
      $("circle", {
        class: `dd-flow-port${c ? " is-snap" : ""}`,
        cx: a.point.x,
        cy: a.point.y,
        r: c ? 7 : 4
      })
    );
  }
  (l = Bt(e)) == null || l.appendChild(i);
}
const co = (e) => Array.from(e.querySelectorAll(".dd-flow-edge-handle, .dd-flow-bend-handle"));
function kl(e) {
  var t, n, o, r;
  return ((n = (t = e.closest) == null ? void 0 : t.call(e, ".dd-flow-edge-handle, .dd-flow-bend-handle")) == null ? void 0 : n.getAttribute("data-edge-id")) ?? ((r = (o = e.closest) == null ? void 0 : o.call(e, ".dd-flow-edge")) == null ? void 0 : r.getAttribute("data-edge-id")) ?? null;
}
function Sl(e, t) {
  for (const n of co(e))
    n.classList.toggle("is-hot", t !== null && n.getAttribute("data-edge-id") === t);
}
function Nl(e, t, n) {
  var d, l;
  const o = (l = (d = n.target).closest) == null ? void 0 : l.call(d, ".dd-flow-bend-handle"), r = t.edges.find((a) => a.id === (o == null ? void 0 : o.getAttribute("data-edge-id"))), s = t.nodes.find((a) => a.id === (r == null ? void 0 : r.from)), i = t.nodes.find((a) => a.id === (r == null ? void 0 : r.to));
  return !o || !r || !s || !i ? null : {
    kind: "bend",
    edgeId: r.id,
    segment: Number(o.getAttribute("data-segment")),
    start: kt(e, n.clientX, n.clientY),
    points: Dt(r, s, i),
    moved: !1,
    shiftKey: n.shiftKey
  };
}
function _l(e, t, n) {
  var d, l;
  const o = (l = (d = n.target).closest) == null ? void 0 : l.call(d, ".dd-flow-edge-handle"), r = t.edges.find((a) => a.id === (o == null ? void 0 : o.getAttribute("data-edge-id")));
  if (!o || !r) return null;
  const s = o.getAttribute("data-end") === "from" ? "from" : "to", i = co(e).find(
    (a) => a.classList.contains("dd-flow-edge-handle") && a.getAttribute("data-edge-id") === r.id && a !== o
  );
  return {
    kind: "end",
    edgeId: r.id,
    end: s,
    startX: n.clientX,
    startY: n.clientY,
    anchor: { x: Number((i == null ? void 0 : i.getAttribute("cx")) ?? 0), y: Number((i == null ? void 0 : i.getAttribute("cy")) ?? 0) },
    excludeNodeId: s === "from" ? r.to : r.from,
    moved: !1,
    snap: null
  };
}
function Il(e, t, n) {
  return e.moved ? !0 : (e.kind === "bend" ? Math.hypot(n.x - e.start.x, n.y - e.start.y) : Math.hypot(t.clientX - e.startX, t.clientY - e.startY)) >= gl;
}
function Ml(e, t, n) {
  const o = e.find((i) => i.id === t.edgeId);
  if (!o) return !1;
  const r = Math.round(n.x - t.start.x), s = Math.round(n.y - t.start.y);
  return o.points = El(t.points, t.segment, r, s), !0;
}
function Ol(e, t, n, o = {}) {
  let r = null, s = null, i = null;
  const d = (b) => {
    i = b, Sl(e, i);
  }, l = (b) => {
    r || d(kl(b.target));
  }, a = () => {
    r || d(null);
  }, c = () => {
    s = null, e.classList.remove(vn), St(e);
  }, f = (b) => {
    var C, E, _, y;
    if (!s || b.button !== 0) return;
    b.stopImmediatePropagation(), b.preventDefault();
    const { fromNodeId: m } = s;
    yt(e, t.nodes, kt(e, b.clientX, b.clientY), s);
    const x = s.snap, g = (_ = (E = (C = b.target).closest) == null ? void 0 : E.call(C, ".dd-flow-node")) == null ? void 0 : _.getAttribute("data-node-id"), L = (x == null ? void 0 : x.nodeId) ?? (g && g !== m ? g : null);
    c(), L && ((y = o.onConnect) == null || y.call(o, m, L, x == null ? void 0 : x.port));
  }, h = (b) => {
    var m;
    b.button !== 0 || !e.classList.contains("dd-flow-editing") || (r = Nl(e, t, b) ?? _l(e, t, b), r && ((m = e.setPointerCapture) == null || m.call(e, b.pointerId)));
  }, w = (b) => {
    var x;
    if (!s && !r) return;
    const m = kt(e, b.clientX, b.clientY);
    if (s && !r) {
      yt(e, t.nodes, m, s);
      return;
    }
    if (!(!r || !Il(r, b, m))) {
      if (r.kind === "end") {
        r.moved = !0, yt(e, t.nodes, m, r);
        return;
      }
      r.moved || (x = o.onBendDragStart) == null || x.call(o, r.edgeId), r.moved = !0, i = r.edgeId, Ml(t.edges, r, m) && n();
    }
  }, p = () => {
    var m, x, g;
    if (!r) return;
    const b = r;
    if (r = null, b.kind === "bend") {
      b.moved ? (m = o.onBendMoved) == null || m.call(o, b.edgeId) : (x = o.onEdgeClick) == null || x.call(o, b.edgeId, { shiftKey: b.shiftKey });
      return;
    }
    St(e), b.snap && ((g = o.onEdgeEndMoved) == null || g.call(o, b.edgeId, b.end, b.snap.nodeId, b.snap.port));
  };
  return e.addEventListener("pointerdown", f, !0), e.addEventListener("pointerover", l), e.addEventListener("pointerleave", a), e.addEventListener("pointerdown", h), e.addEventListener("pointermove", w), e.addEventListener("pointerup", p), e.addEventListener("pointercancel", p), {
    hotEdgeId: () => i,
    startConnector(b) {
      const m = t.nodes.find((x) => x.id === b);
      m && (s = { fromNodeId: b, anchor: { x: m.x, y: m.y }, excludeNodeId: b, snap: null }, e.classList.add(vn));
    },
    cancelConnector() {
      return s ? (c(), !0) : !1;
    },
    destroy() {
      e.removeEventListener("pointerdown", f, !0), e.removeEventListener("pointerover", l), e.removeEventListener("pointerleave", a), e.removeEventListener("pointerdown", h), e.removeEventListener("pointermove", w), e.removeEventListener("pointerup", p), e.removeEventListener("pointercancel", p), c();
    }
  };
}
const $l = 100;
function Al(e = $l) {
  const t = [];
  let n = [], o;
  return {
    record(r, s) {
      n = [], !(s !== void 0 && s === o) && (o = s, t.push(r), t.length > e && t.shift());
    },
    undo(r) {
      const s = t.pop();
      return s === void 0 ? null : (o = void 0, n.push(r), s);
    },
    redo(r) {
      const s = n.pop();
      return s === void 0 ? null : (o = void 0, t.push(r), s);
    }
  };
}
const Tl = [
  "start",
  "end",
  "process",
  "decision",
  "subprocess",
  "document",
  "data",
  "manual",
  "manual-input",
  "database",
  "multidocument",
  "delay",
  "on-page-reference",
  "off-page-reference",
  "alternate-process",
  "merge",
  "preparation",
  "compound"
];
function Rl(e) {
  const t = document.createElement("div");
  t.className = "dd-flow-inspector", t.hidden = !0, e.appendChild(t);
  let n = !1;
  function o(m) {
    const g = t.offsetWidth || 260, L = t.offsetHeight || 200;
    let C = m.right + 12;
    C + g > window.innerWidth && (C = m.left - 12 - g), C < 12 && (C = Math.min(m.left, window.innerWidth - g - 12)), C = Math.max(12, Math.min(C, window.innerWidth - g - 12));
    let E = m.top;
    return E = Math.max(12, Math.min(E, window.innerHeight - L - 12)), { left: C, top: E };
  }
  function r(m) {
    const { left: x, top: g } = o(m);
    t.style.left = `${x}px`, t.style.top = `${g}px`;
  }
  function s(m, x) {
    const g = document.createElement("div");
    g.className = "dd-flow-inspector-field";
    const L = document.createElement("label");
    return L.textContent = m, g.appendChild(L), g.appendChild(x), g;
  }
  function i(m) {
    const x = document.createElement("button");
    return x.type = "button", x.className = "dd-flow-btn dd-flow-inspector-delete", x.textContent = "Delete", x.addEventListener("click", m), x;
  }
  function d() {
    const m = document.createElement("button");
    return m.type = "button", m.className = "dd-flow-inspector-close", m.textContent = "×", m.setAttribute("aria-label", "Close"), m.addEventListener("click", p), m;
  }
  function l(m, x) {
    const g = document.createElement("div");
    g.className = "dd-flow-inspector-size";
    const L = (M, I) => {
      const k = document.createElement("input");
      return k.type = "number", k.min = "1", k.value = String(Math.round(M)), k.setAttribute("aria-label", I), k;
    }, C = L(m.w, "Width"), E = L(m.h, "Height"), _ = () => {
      const M = Number(C.value), I = Number(E.value);
      M > 0 && I > 0 && x.onSizeChange({ w: M, h: I });
    };
    C.addEventListener("change", _), E.addEventListener("change", _);
    const y = document.createElement("button");
    return y.type = "button", y.className = "dd-flow-btn", y.textContent = "Auto", y.title = "Fit the size to the text", y.addEventListener("click", x.onAutoSize), g.append(C, "×", E, y), g;
  }
  function a(m, x, g = {}) {
    var y, M;
    t.innerHTML = "", t.appendChild(d());
    const L = document.createElement("input");
    L.type = "text", L.value = m.label, L.addEventListener("input", () => x.onLabelChange(L.value)), t.appendChild(s("Label", L));
    const C = document.createElement("textarea");
    if (C.rows = 2, C.value = m.note ?? "", C.addEventListener("input", () => x.onNoteChange(C.value)), t.appendChild(s("Note", C)), m.type === "compound" || (y = m.rows) != null && y.length) {
      const I = document.createElement("textarea");
      I.className = "dd-flow-inspector-rows", I.rows = Math.max(3, (((M = m.rows) == null ? void 0 : M.length) ?? 0) + 1), I.value = (m.rows ?? []).map((k) => k.label).join(`
`), I.addEventListener("input", () => x.onRowsChange(I.value.split(`
`))), t.appendChild(s("Rows (one per line)", I));
    }
    const E = document.createElement("div");
    E.className = "dd-flow-type-grid";
    for (const I of Tl) {
      const k = document.createElement("button");
      k.type = "button", k.className = `dd-flow-type-swatch${I === m.type ? " is-active" : ""}`, k.title = I, k.setAttribute("aria-label", I);
      const T = $("svg", { viewBox: "-32 -22 64 44", width: 48, height: 33 });
      T.appendChild(Nn(I, 56, 36)), k.appendChild(T), k.addEventListener("click", () => x.onTypeChange(I)), E.appendChild(k);
    }
    if (t.appendChild(s("Type", E)), g.size && t.appendChild(s("Size (width × height)", l(g.size, x))), m.subflow) {
      const I = document.createElement("div");
      I.className = "dd-flow-inspector-subflow-row";
      const k = document.createElement("span");
      if (k.textContent = `Opens subflow: ${m.subflow}`, I.appendChild(k), x.onGotoSubflow) {
        const T = document.createElement("button");
        T.type = "button", T.className = "dd-flow-btn", T.textContent = "Open", T.addEventListener("click", x.onGotoSubflow), I.appendChild(T);
      }
      t.appendChild(I);
    }
    const _ = document.createElement("button");
    _.type = "button", _.className = "dd-flow-btn dd-flow-inspector-reset dd-flow-inspector-connect", _.textContent = "Add connector", _.title = "Then click the box, or the connection point, it should go to", _.addEventListener("click", x.onAddConnector), t.appendChild(_), t.appendChild(i(x.onDelete));
  }
  function c(m, x, g, L) {
    const C = document.createElement("div");
    C.className = "dd-flow-inspector-radios";
    for (const E of x) {
      const _ = `dd-flow-${m}-${E}`, y = document.createElement("input");
      y.type = "radio", y.name = `dd-flow-${m}`, y.id = _, y.checked = E === g, y.addEventListener("change", () => L(E));
      const M = document.createElement("label");
      M.htmlFor = _, M.textContent = E, C.appendChild(y), C.appendChild(M);
    }
    return C;
  }
  function f(m, x) {
    t.innerHTML = "", t.appendChild(d());
    const g = document.createElement("input");
    g.type = "text", g.value = m.label ?? "", g.addEventListener("input", () => x.onLabelChange(g.value)), t.appendChild(s("Label", g));
    const { routing: L, stroke: C, kind: E } = dt(m);
    t.appendChild(
      s(
        "Routing",
        c("routing", ["orthogonal", "straight", "curved"], L, x.onRoutingChange)
      )
    ), t.appendChild(
      s("Stroke", c("stroke", ["solid", "dashed", "dotted"], C, x.onStrokeChange))
    ), t.appendChild(
      s("Kind", c("kind", ["default", "conditional"], E, x.onKindChange))
    );
    const _ = document.createElement("p");
    _.className = "dd-flow-inspector-hint", _.textContent = "Changing routing clears any hand-dragged route for this connector.", t.appendChild(_);
    const y = document.createElement("button");
    y.type = "button", y.className = "dd-flow-btn dd-flow-inspector-reset", y.textContent = "Automatic route", y.title = "Let go of the connection points and the hand-set route", y.addEventListener("click", x.onResetRoute), t.appendChild(y), t.appendChild(i(x.onDelete));
  }
  function h(m, x, g, L = {}) {
    t.innerHTML = "", t.appendChild(d());
    const C = document.createElement("p");
    C.className = "dd-flow-inspector-hint", C.textContent = m, t.appendChild(C);
    const E = document.createElement("input");
    E.type = "text", E.value = x;
    const _ = () => {
      const k = E.value.trim();
      w(), (k || L.allowEmpty) && g(k);
    };
    E.addEventListener("keydown", (k) => {
      k.key === "Enter" && _();
    }), t.appendChild(s(L.fieldLabel ?? "Name", E));
    const y = document.createElement("div");
    y.className = "dd-flow-inspector-actions";
    const M = document.createElement("button");
    M.type = "button", M.className = "dd-flow-btn", M.textContent = "Cancel", M.addEventListener("click", w);
    const I = document.createElement("button");
    I.type = "button", I.className = "dd-flow-btn is-active", I.textContent = L.submitLabel ?? "Create", I.addEventListener("click", _), y.appendChild(M), y.appendChild(I), t.appendChild(y);
  }
  function w() {
    n = !1, t.hidden = !0, t.innerHTML = "";
  }
  function p() {
    var m;
    w(), (m = b.onDismiss) == null || m.call(b);
  }
  const b = {
    onDismiss: null,
    dismiss: p,
    get isOpen() {
      return n;
    },
    showNode(m, x, g, L) {
      if (a(m, g, L), t.hidden = !1, n = !0, r(x), L != null && L.focusLabel) {
        const C = t.querySelector('input[type="text"]');
        C == null || C.focus(), C == null || C.select();
      }
    },
    showEdge(m, x, g) {
      f(m, g), t.hidden = !1, n = !0, r(x);
    },
    showPrompt(m, x, g, L, C) {
      h(m, g, L, C), t.hidden = !1, n = !0, r(x);
      const E = t.querySelector("input");
      E == null || E.focus(), E == null || E.select();
    },
    refreshAnchor(m) {
      n && r(m);
    },
    hide: w,
    destroy() {
      w(), t.remove();
    }
  };
  return b;
}
const Pl = 0.5, Ke = 8, Ue = (e, t) => Math.abs(e - t) < Pl, En = (e, t, n) => Math.min(n, Math.max(t, e)), Nt = (e) => ({
  left: e.x - e.w / 2,
  top: e.y - e.h / 2,
  right: e.x + e.w / 2,
  bottom: e.y + e.h / 2
});
function Cn(e, t, n) {
  const o = Nt(t), r = Nt(n), s = {
    left: Math.abs(e.x - o.left),
    right: Math.abs(e.x - o.right),
    top: Math.abs(e.y - o.top),
    bottom: Math.abs(e.y - o.bottom)
  }, i = Math.min(s.left, s.right, s.top, s.bottom);
  let d = e.x + r.left - o.left, l = e.y + r.top - o.top;
  return s.right === i ? d = e.x + r.right - o.right : s.bottom === i && (l = e.y + r.bottom - o.bottom), n.w === t.w && n.h === t.h ? { x: d, y: l } : s.top === i || s.bottom === i ? { x: En(d, r.left, r.right), y: l } : { x: d, y: En(l, r.top, r.bottom) };
}
function Ln(e, t, n) {
  const [o, r] = e, s = Ue(o.x, r.x), i = Ue(o.y, r.y);
  if (e.length > 2) {
    const l = s ? { x: t.x, y: r.y } : i ? { x: r.x, y: t.y } : r;
    return [t, l, ...e.slice(2)];
  }
  const d = n && Nt(n);
  if (s && !Ue(t.x, r.x)) {
    if (d && t.x >= d.left + Ke && t.x <= d.right - Ke)
      return [t, { x: t.x, y: r.y }];
    const l = (t.y + r.y) / 2;
    return [t, { x: t.x, y: l }, { x: r.x, y: l }, r];
  }
  if (i && !Ue(t.y, r.y)) {
    if (d && t.y >= d.top + Ke && t.y <= d.bottom - Ke)
      return [t, { x: r.x, y: t.y }];
    const l = (t.x + r.x) / 2;
    return [t, { x: l, y: t.y }, { x: l, y: r.y }, r];
  }
  return [t, r];
}
function _t(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e)
    (o.from === t || o.to === t) && o.points.length >= 2 && n.set(o.id, o.points);
  return n;
}
function It(e, t, n, o, r, s = () => {
}) {
  for (const i of e) {
    const d = t.get(i.id);
    if (!d) continue;
    if (i.from === n && i.to === n) {
      const a = r.x - r.w / 2 - (o.x - o.w / 2), c = r.y - r.h / 2 - (o.y - o.h / 2);
      i.points = d.map((f) => ({ x: f.x + a, y: f.y + c }));
      continue;
    }
    const l = d.map((a) => ({ ...a }));
    i.from === n ? i.points = Ln(l, Cn(l[0], o, r), s(i.to)) : (l.reverse(), i.points = Ln(l, Cn(l[0], o, r), s(i.from)).reverse());
  }
}
const jl = 4;
function Dl(e, t, n, o = {}) {
  let r = null;
  const s = (f, h, w) => {
    const p = f.createSVGPoint();
    p.x = h, p.y = w;
    const b = f.getScreenCTM();
    if (!b) return { x: h, y: w };
    const m = p.matrixTransform(b.inverse());
    return { x: m.x, y: m.y };
  }, i = () => e.querySelector("svg.dd-flow-svg"), d = (f) => {
    var L, C, E, _, y, M, I;
    if (f.button !== 0) return;
    const h = i();
    if (!h) return;
    const w = f.target;
    if ((L = w.closest) != null && L.call(w, ".dd-flow-edge-handle, .dd-flow-bend-handle")) return;
    const p = s(h, f.clientX, f.clientY), b = (C = w.closest) == null ? void 0 : C.call(w, ".dd-flow-node");
    if (b) {
      const k = b.getAttribute("data-node-id"), T = t.nodes.find((Y) => Y.id === k);
      if (!T) return;
      const B = (E = w.closest) == null ? void 0 : E.call(w, ".dd-flow-node-row"), j = (B == null ? void 0 : B.getAttribute("data-row-id")) ?? null;
      r = {
        node: T,
        edgeId: null,
        rowId: j,
        resizing: !!((_ = w.closest) != null && _.call(w, ".dd-flow-resize-handle")),
        startX: p.x,
        startY: p.y,
        nodeStart: { x: T.x, y: T.y, w: T.w, h: T.h },
        routes: _t(t.edges, T.id),
        moved: !1,
        shiftKey: f.shiftKey
      }, (y = e.setPointerCapture) == null || y.call(e, f.pointerId);
      return;
    }
    const m = (M = w.closest) == null ? void 0 : M.call(w, ".dd-flow-edge-hit"), x = m == null ? void 0 : m.closest(".dd-flow-edge");
    r = {
      node: null,
      edgeId: (x == null ? void 0 : x.getAttribute("data-edge-id")) ?? null,
      rowId: null,
      resizing: !1,
      startX: p.x,
      startY: p.y,
      nodeStart: { x: 0, y: 0, w: 0, h: 0 },
      routes: /* @__PURE__ */ new Map(),
      moved: !1,
      shiftKey: f.shiftKey
    }, (I = e.setPointerCapture) == null || I.call(e, f.pointerId);
  }, l = (f) => {
    var x;
    if (!r || !r.node) return;
    const h = i();
    if (!h) return;
    const w = s(h, f.clientX, f.clientY), p = w.x - r.startX, b = w.y - r.startY;
    if (!e.classList.contains("dd-flow-editing") || !r.moved && Math.hypot(p, b) < jl) return;
    r.moved || (x = o.onNodeDragStart) == null || x.call(o, r.node.id), r.moved = !0;
    const m = r.nodeStart;
    r.resizing ? (r.node.w = Math.max(Qe(r.node).w, m.w + p), r.node.h = Math.max(Qe(r.node).h, m.h + b), r.node.x = m.x + (r.node.w - m.w) / 2, r.node.y = m.y + (r.node.h - m.h) / 2) : (r.node.x = m.x + p, r.node.y = m.y + b), It(t.edges, r.routes, r.node.id, m, r.node, (g) => t.nodes.find((L) => L.id === g)), n();
  }, a = () => {
    var L, C, E, _, y, M;
    if (!r) return;
    const { node: f, edgeId: h, rowId: w, resizing: p, moved: b, shiftKey: m, startX: x, startY: g } = r;
    if (r = null, f)
      if (b && p) (L = o.onNodeResized) == null || L.call(o, f.id);
      else if (b) (C = o.onNodeMoved) == null || C.call(o, f.id);
      else {
        if (p) return;
        w ? (E = o.onRowClick) == null || E.call(o, f.id, w, { shiftKey: m }) : (_ = o.onNodeClick) == null || _.call(o, f.id, { shiftKey: m });
      }
    else h ? (y = o.onEdgeClick) == null || y.call(o, h, { shiftKey: m }) : e.dataset[Ie] || (M = o.onBackgroundClick) == null || M.call(o, { x, y: g }, { shiftKey: m });
  }, c = (f) => {
    var m, x, g, L, C, E, _, y;
    const h = f.target, w = (x = (m = h.closest) == null ? void 0 : m.call(h, ".dd-flow-node")) == null ? void 0 : x.getAttribute("data-node-id"), p = ((C = (L = (g = h.closest) == null ? void 0 : g.call(h, ".dd-flow-edge-hit")) == null ? void 0 : L.closest(".dd-flow-edge")) == null ? void 0 : C.getAttribute("data-edge-id")) ?? ((_ = (E = h.closest) == null ? void 0 : E.call(h, ".dd-flow-edge-handle, .dd-flow-bend-handle")) == null ? void 0 : _.getAttribute("data-edge-id")), b = w ? { nodeId: w } : p ? { edgeId: p } : null;
    b && ((y = o.onContextMenu) != null && y.call(o, b)) && f.preventDefault();
  };
  return e.addEventListener("pointerdown", d), e.addEventListener("contextmenu", c), e.addEventListener("pointermove", l), e.addEventListener("pointerup", a), e.addEventListener("pointercancel", a), {
    destroy() {
      e.removeEventListener("pointerdown", d), e.removeEventListener("contextmenu", c), e.removeEventListener("pointermove", l), e.removeEventListener("pointerup", a), e.removeEventListener("pointercancel", a);
    }
  };
}
function Bl(e, t) {
  return { ...e, nodes: [...e.nodes, t] };
}
function Fl(e, t) {
  return { ...e, edges: [...e.edges, t] };
}
function zl(e, t) {
  return {
    ...e,
    nodes: e.nodes.filter((n) => n.id !== t),
    edges: e.edges.filter((n) => n.from !== t && n.to !== t)
  };
}
function Gl(e, t) {
  return { ...e, edges: e.edges.filter((n) => n.id !== t) };
}
function be(e, t, n) {
  return { ...e, nodes: e.nodes.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function ye(e, t, n) {
  return { ...e, edges: e.edges.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function Hl(e, t, n, o) {
  return {
    ...e,
    nodes: e.nodes.map(
      (r) => r.id === t && r.rows ? { ...r, rows: r.rows.map((s) => s.id === n ? { ...s, label: o } : s) } : r
    )
  };
}
function ql(e, t, n) {
  const o = e.nodes.find((c) => c.id === t);
  if (!o) return e;
  const r = n.map((c) => c.trim()).filter(Boolean), s = o.rows ?? [], i = /* @__PURE__ */ new Set(), d = r.map((c) => {
    const f = s.findIndex((h, w) => !i.has(w) && h.label === c);
    return f < 0 ? null : (i.add(f), s[f]);
  }), l = new Set(d.filter((c) => c !== null).map((c) => c.id)), a = r.map((c, f) => {
    const h = d[f];
    if (h) return h;
    if (f < s.length && !i.has(f))
      return i.add(f), l.add(s[f].id), { ...s[f], label: c };
    const w = Me("row", c, /* @__PURE__ */ new Set([...l, ...s.map((p) => p.id)]));
    return l.add(w), { id: w, label: c };
  });
  return be(e, t, { rows: a.length ? a : void 0 });
}
function Me(e, t, n) {
  const o = t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || e;
  if (!n.has(o)) return o;
  let r = 2;
  for (; n.has(`${o}-${r}`); ) r++;
  return `${o}-${r}`;
}
function Yl(e) {
  const {
    spec: t,
    layout: n,
    nodePositions: o,
    selectedNodeIds: r,
    newSubflowId: s,
    placeholderNodeId: i,
    placeholderLabel: d,
    existingSubflowIds: l
  } = e, a = new Set(r);
  if (a.size < 2)
    throw new Error("extractSubflow requires at least 2 selected nodes.");
  if (l.has(s) || s === t.id)
    throw new Error(`extractSubflow: subflow id "${s}" already exists.`);
  const c = new Set(t.nodes.map((k) => k.id));
  if (c.has(i) && !a.has(i))
    throw new Error(`extractSubflow: placeholder id "${i}" collides with an existing node.`);
  for (const k of a)
    if (!c.has(k)) throw new Error(`extractSubflow: selected node "${k}" not found in spec.`);
  const f = [], h = [], w = [], p = [];
  for (const k of t.edges) {
    const T = a.has(k.from), B = a.has(k.to);
    T && B ? f.push(k) : !T && B ? h.push(k) : T && !B ? w.push(k) : p.push(k);
  }
  const b = {
    id: s,
    title: d,
    style: t.style,
    direction: t.direction,
    nodes: t.nodes.filter((k) => a.has(k.id)),
    edges: f
  }, m = {
    id: i,
    label: d,
    type: "subprocess",
    subflow: s
  }, x = h.map((k) => ({ ...k, to: i })), g = w.map((k) => ({ ...k, from: i })), L = {
    ...t,
    nodes: [...t.nodes.filter((k) => !a.has(k.id)), m],
    edges: [...p, ...x, ...g]
  }, C = new Set(r), E = new Set(f.map((k) => k.id)), _ = new Set([...x, ...g].map((k) => k.id)), y = {};
  for (const [k, T] of Object.entries(n.nodes))
    C.has(k) || (y[k] = T);
  const M = {};
  for (const [k, T] of Object.entries(n.edges))
    !E.has(k) && !_.has(k) && (M[k] = T);
  const I = Vl(r, o);
  return I && (y[i] = I), {
    parent: { spec: L, layout: { nodes: y, edges: M } },
    subflow: { spec: b }
  };
}
function Vl(e, t) {
  const n = e.map((s) => t[s]).filter((s) => !!s);
  if (!n.length) return null;
  const o = n.reduce((s, i) => s + i.x, 0) / n.length, r = n.reduce((s, i) => s + i.y, 0) / n.length;
  return { x: o, y: r };
}
const fo = "http://127.0.0.1:5311";
let kn = !1;
function Kl() {
  return kn ? Promise.resolve(!0) : fetch(`${fo}/health`).then((e) => (e.ok && (kn = !0), e.ok)).catch(() => !1);
}
async function Ul(e, t, n) {
  const r = { layoutPath: e.layout ?? e.spec.replace(/\.flow\.json$/, ".layout.json"), layout: n };
  t && (r.specPath = e.spec, r.spec = t);
  try {
    return (await fetch(`${fo}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(r)
    })).ok;
  } catch {
    return !1;
  }
}
let ae = null, ce = null, Te = null;
function nt(e, t, n) {
  const { nodes: o, edges: r, orphanedNodeIds: s, orphanedEdgeIds: i } = $e(t, n);
  return {
    flowId: e,
    title: t.title,
    spec: t,
    nodes: o,
    edges: r,
    dirty: !1,
    specDirty: !1,
    orphanedNodeIds: s,
    orphanedEdgeIds: i,
    history: Al()
  };
}
function Wl(e) {
  const t = e;
  return !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
}
function Xl(e, t, n = {}) {
  e.classList.add("dd-flow-embed", "dd-flow-inline"), Ae(e, t.main.style);
  const o = nt(t.main.id, t.main, t.mainLayout), r = et(o.nodes, o.edges);
  e.appendChild(r);
  const s = () => {
    var a;
    const l = nt(t.main.id, t.main, t.mainLayout);
    (a = e.querySelector("svg.dd-flow-svg")) == null || a.replaceWith(et(l.nodes, l.edges));
  }, i = () => ia(t, n, s);
  e.addEventListener("click", i);
  const d = () => (ae == null ? void 0 : ae.bundle) === t;
  return {
    open: i,
    destroy() {
      e.removeEventListener("click", i), e.innerHTML = "";
    },
    // A fresh object every call, even when inactive -- a shared constant here would let a
    // caller's `getSelection().nodeIds.push(...)` mutate what every subsequent inactive read
    // (from this handle AND any other mountFlow() bundle's own inactive reads) observes.
    getSelection: () => d() ? ae.getSelection() : { nodeIds: [], edgeId: null },
    setSelection(l) {
      if (!d()) return;
      const a = ae.getSelection(), c = new Set(l.nodeIds ?? a.nodeIds), f = l.edgeId !== void 0 ? l.edgeId : a.edgeId;
      ae.setSelection(c, f);
    }
  };
}
const Jl = ".dd-flow-embed[data-flow]:not([data-dd-flow-mounted])";
async function Ql(e = document) {
  const t = Array.from(e.querySelectorAll(Jl));
  await Promise.all(
    t.map(async (n) => {
      n.setAttribute("data-dd-flow-mounted", "1");
      const o = n.getAttribute("data-flow");
      if (o)
        try {
          const r = await fetch(o);
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          const s = await r.json();
          Xl(n, s);
        } catch (r) {
          console.error(`dd-flow: failed to load flow from "${o}"`, r), n.textContent = `dd-flow: failed to load "${o}" (see console)`;
        }
    })
  );
}
let V = null;
const Zl = 3, ea = 400;
function ta() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
function na(e) {
  var o, r;
  if (!ta()) return;
  const t = e.webkitRequestFullscreen, n = ((o = e.requestFullscreen) == null ? void 0 : o.bind(e)) ?? (t == null ? void 0 : t.bind(e));
  (r = n == null ? void 0 : n()) == null || r.catch(() => {
  });
}
function oa(e) {
  document.fullscreenElement === e && document.exitFullscreen().catch(() => {
  });
}
function ra() {
  if (V) return V;
  const e = document.createElement("div");
  e.className = "dd-flow-lightbox", e.hidden = !0, e.innerHTML = `
    <div class="dd-flow-lightbox-panel">
      <div class="dd-flow-stage"></div>
      <div class="dd-flow-breadcrumb" hidden></div>
      <div class="dd-flow-quickbar">
        <button type="button" class="dd-flow-iconbtn dd-flow-menu-btn" aria-label="Show controls" aria-expanded="false">&hellip;</button>
        <button type="button" class="dd-flow-iconbtn dd-flow-close-btn" aria-label="Close (Esc)">&times;</button>
      </div>
      <div class="dd-flow-toolbar" hidden>
        <div class="dd-flow-toolbar-actions">
          <button type="button" class="dd-flow-btn dd-flow-fit-btn">Fit</button>
          <button type="button" class="dd-flow-btn dd-flow-export-svg-btn">Export SVG</button>
          <button type="button" class="dd-flow-btn dd-flow-export-png-btn">Export PNG</button>
          <span class="dd-flow-authoring" hidden>
            <button type="button" class="dd-flow-btn dd-flow-edit-btn">Shape tools</button>
            <button type="button" class="dd-flow-btn dd-flow-add-shape-btn" disabled title="Add shape: click the canvas to place it">+ Shape</button>
            <button type="button" class="dd-flow-btn dd-flow-make-subflow-btn" disabled>Make subflow</button>
            <button type="button" class="dd-flow-btn dd-flow-save-btn" disabled>Save layout</button>
          </span>
        </div>
      </div>
      <div class="dd-flow-warning-banner" hidden></div>
    </div>
  `, document.body.appendChild(e), V = {
    root: e,
    panel: e.querySelector(".dd-flow-lightbox-panel"),
    stage: e.querySelector(".dd-flow-stage"),
    toolbar: e.querySelector(".dd-flow-toolbar"),
    breadcrumbEl: e.querySelector(".dd-flow-breadcrumb"),
    authoringEl: e.querySelector(".dd-flow-authoring"),
    menuBtn: e.querySelector(".dd-flow-menu-btn"),
    fitBtn: e.querySelector(".dd-flow-fit-btn"),
    editBtn: e.querySelector(".dd-flow-edit-btn"),
    addShapeBtn: e.querySelector(".dd-flow-add-shape-btn"),
    makeSubflowBtn: e.querySelector(".dd-flow-make-subflow-btn"),
    saveBtn: e.querySelector(".dd-flow-save-btn"),
    warningBanner: e.querySelector(".dd-flow-warning-banner"),
    inspector: Rl(e)
  }, e.querySelector(".dd-flow-close-btn").addEventListener("click", bt);
  const t = e.querySelector(".dd-flow-menu-btn"), n = e.querySelector(".dd-flow-toolbar");
  return t.addEventListener("click", () => {
    n.hidden = !n.hidden, t.setAttribute("aria-expanded", String(!n.hidden)), t.classList.toggle("is-active", !n.hidden);
  }), document.addEventListener("keydown", (o) => {
    if (!e.hidden && (o.ctrlKey || o.metaKey) && !Wl(o.target)) {
      const r = o.key.toLowerCase(), s = r === "y" || r === "z" && o.shiftKey;
      if (r === "z" || s) {
        o.preventDefault(), s ? ce == null || ce.redo() : ce == null || ce.undo();
        return;
      }
    }
    if (!e.hidden && o.key === "Escape") {
      if (Te != null && Te()) return;
      V != null && V.inspector.isOpen ? V.inspector.dismiss() : bt();
    }
  }), document.addEventListener("fullscreenchange", () => {
    !document.fullscreenElement && V && !V.root.hidden && bt();
  }), V;
}
function bt() {
  V && (oa(V.root), V.root.hidden = !0, V.stage.innerHTML = "", V.inspector.hide(), document.body.classList.remove("dd-flow-lightbox-open"), ae = null, ce = null, Te = null);
}
function sa(e) {
  const t = Math.min(...e.map((s) => s.left)), n = Math.min(...e.map((s) => s.top)), o = Math.max(...e.map((s) => s.right)), r = Math.max(...e.map((s) => s.bottom));
  return new DOMRect(t, n, o - t, r - n);
}
function ia(e, t, n = () => {
}) {
  var he, Ft;
  const o = ra();
  o.root.hidden = !1, document.body.classList.add("dd-flow-lightbox-open"), na(o.root), o.toolbar.hidden = !0, o.menuBtn.setAttribute("aria-expanded", "false"), o.menuBtn.classList.remove("is-active"), o.authoringEl.hidden = !0;
  const r = [nt(e.main.id, e.main, e.mainLayout)];
  let s = !1, i = /* @__PURE__ */ new Set(), d = null, l = null, a = !1, c = !1;
  function f() {
    c || !e.sources || Kl().then((u) => {
      !u || o.root.hidden || (c = !0, o.authoringEl.hidden = !1, ue(), o.addShapeBtn.disabled = !s, le(), W());
    });
  }
  f(), o.stage.innerHTML = "";
  const h = document.createElement("div");
  h.className = "dd-flow-stage-inner", o.stage.appendChild(h), Ae(o.root, e.main.style);
  const w = { nodes: r[0].nodes, edges: r[0].edges };
  function p() {
    return r[r.length - 1];
  }
  function b() {
    w.nodes = p().nodes, w.edges = p().edges;
  }
  function m(u) {
    return Array.from(h.querySelectorAll(".dd-flow-node")).find(
      (v) => v.getAttribute("data-node-id") === u
    ) ?? null;
  }
  function x(u) {
    return Array.from(h.querySelectorAll(".dd-flow-edge")).find(
      (v) => v.getAttribute("data-edge-id") === u
    ) ?? null;
  }
  function g(u, v = {}) {
    const N = p(), O = He(N.nodes, N.edges);
    if (N.history.record(B(N), v.mergeKey), v.resizeNodeId) {
      const A = O.nodes[v.resizeNodeId];
      A && (O.nodes[v.resizeNodeId] = { x: A.x, y: A.y });
    }
    v.clearEdgePoints && delete O.edges[v.clearEdgePoints], v.setNodePosition && (O.nodes[v.setNodePosition.id] = v.setNodePosition.point), N.spec = u(N.spec);
    const S = $e(N.spec, O);
    N.nodes = S.nodes, N.edges = S.edges, N.orphanedNodeIds = S.orphanedNodeIds, N.orphanedEdgeIds = S.orphanedEdgeIds, N.dirty = !0, N.specDirty = !0, b(), o.saveBtn.disabled = !1, W(), de();
  }
  function L(u) {
    var A;
    const v = p().spec;
    let N, O, S;
    if ("edgeId" in u) {
      const D = v.edges.find((F) => F.id === u.edgeId);
      if (!D) return;
      N = "Arrow label", O = D.label ?? "", S = x(u.edgeId);
    } else {
      const D = v.nodes.find((F) => F.id === u.nodeId);
      if (!D) return;
      if (S = m(u.nodeId), u.rowId) {
        const F = (A = D.rows) == null ? void 0 : A.find((q) => q.id === u.rowId);
        if (!F) return;
        N = "Row text", O = F.label, S = Array.from((S == null ? void 0 : S.querySelectorAll(".dd-flow-node-row")) ?? []).find(
          (q) => q.getAttribute("data-row-id") === u.rowId
        ) ?? S;
      } else
        N = "Box text", O = D.label;
    }
    S && o.inspector.showPrompt(
      N,
      S.getBoundingClientRect(),
      O,
      (D) => {
        if (D !== O)
          if ("edgeId" in u)
            g((F) => ye(F, u.edgeId, { label: D || void 0 }));
          else if (u.rowId) {
            const F = u.rowId;
            g((q) => Hl(q, u.nodeId, F, D), { resizeNodeId: u.nodeId });
          } else
            g((F) => be(F, u.nodeId, { label: D }), { resizeNodeId: u.nodeId });
      },
      { fieldLabel: "Text", submitLabel: "Save", allowEmpty: "edgeId" in u }
    );
  }
  const C = (u) => p().nodes.find((v) => v.id === u);
  function E(u) {
    var O;
    const v = p().spec.nodes.find((S) => S.id === u), N = v == null ? void 0 : v.subflow;
    return {
      onLabelChange: (S) => {
        g((D) => be(D, u, { label: S }), {
          resizeNodeId: u,
          mergeKey: `label:${u}`
        });
        const A = m(u);
        A && o.inspector.refreshAnchor(A.getBoundingClientRect());
      },
      onNoteChange: (S) => g((A) => be(A, u, { note: S }), { mergeKey: `note:${u}` }),
      onRowsChange: (S) => {
        g((D) => ql(D, u, S), { resizeNodeId: u, mergeKey: `rows:${u}` });
        const A = m(u);
        A && o.inspector.refreshAnchor(A.getBoundingClientRect());
      },
      onTypeChange: (S) => {
        g((A) => be(A, u, { type: S }), { resizeNodeId: u }), s ? y() : M(u);
      },
      onSizeChange: (S) => {
        const A = p(), D = A.nodes.find((Z) => Z.id === u);
        if (!D) return;
        A.history.record(B(A), `size:${u}`);
        const F = { x: D.x, y: D.y, w: D.w, h: D.h }, q = _t(A.edges, u);
        D.w = Math.max(Qe(D).w, S.w), D.h = Math.max(Qe(D).h, S.h), D.x = F.x + (D.w - F.w) / 2, D.y = F.y + (D.h - F.h) / 2, It(A.edges, q, u, F, D, C), T(u), W();
        const pe = m(u);
        pe && o.inspector.refreshAnchor(pe.getBoundingClientRect());
      },
      onAutoSize: () => {
        const S = p().nodes.find((q) => q.id === u);
        if (!S) return;
        const A = { x: S.x, y: S.y, w: S.w, h: S.h }, D = _t(p().edges, u);
        g((q) => be(q, u, { w: void 0, h: void 0 }), { resizeNodeId: u });
        const F = p().nodes.find((q) => q.id === u);
        F && It(p().edges, D, u, A, F, C), W(), s ? y() : M(u);
      },
      onDelete: () => {
        g((A) => zl(A, u));
        const S = new Set(i);
        S.delete(u), j(S, null);
      },
      onAddConnector: () => {
        o.inspector.hide(), re.startConnector(u);
      },
      onGotoSubflow: N && ((O = e.subflows) != null && O[N]) ? () => U(N) : void 0
    };
  }
  function _(u) {
    return {
      onLabelChange: (v) => g((N) => ye(N, u, { label: v }), { mergeKey: `edge-label:${u}` }),
      onRoutingChange: (v) => g((N) => ye(N, u, { routing: v }), { clearEdgePoints: u }),
      onStrokeChange: (v) => g((N) => ye(N, u, { stroke: v })),
      onKindChange: (v) => g((N) => ye(N, u, { kind: v })),
      onResetRoute: () => g((v) => ye(v, u, { fromPort: void 0, toPort: void 0 }), {
        clearEdgePoints: u
      }),
      onDelete: () => {
        g((v) => Gl(v, u)), j(/* @__PURE__ */ new Set(), null);
      }
    };
  }
  function y(u = {}) {
    if (!s || !c) {
      o.inspector.hide();
      return;
    }
    i.size === 1 && !d && M([...i][0], u) || d && I(d) || o.inspector.hide();
  }
  function M(u, v = {}) {
    const N = p().spec.nodes.find((D) => D.id === u), O = p().nodes.find((D) => D.id === u), S = m(u);
    if (!N || !S) return !1;
    const A = O && { w: O.w, h: O.h };
    return o.inspector.showNode(N, S.getBoundingClientRect(), E(u), { ...v, size: A }), !0;
  }
  function I(u) {
    const v = p().spec.edges.find((O) => O.id === u), N = x(u);
    return !v || !N ? !1 : (o.inspector.showEdge(v, N.getBoundingClientRect(), _(u)), !0);
  }
  function k(u) {
    const v = p();
    v.spec = u.spec;
    const N = $e(v.spec, u.layout);
    v.nodes = N.nodes, v.edges = N.edges, v.orphanedNodeIds = N.orphanedNodeIds, v.orphanedEdgeIds = N.orphanedEdgeIds, v.dirty = !0, v.specDirty = !0, b(), o.saveBtn.disabled = !1;
    const O = new Set(v.spec.nodes.map((A) => A.id)), S = new Set(v.spec.edges.map((A) => A.id));
    o.inspector.hide(), j(
      new Set([...i].filter((A) => O.has(A))),
      d && S.has(d) ? d : null
    ), de();
  }
  function T(u) {
    const v = p(), N = v.nodes.find((O) => O.id === u);
    N && (v.spec = be(v.spec, u, { w: N.w, h: N.h }), v.dirty = !0, v.specDirty = !0, o.saveBtn.disabled = !1, de());
  }
  function B(u) {
    return { spec: u.spec, layout: He(u.nodes, u.edges) };
  }
  ce = {
    undo: () => {
      const u = p().history.undo(B(p()));
      u && k(u);
    },
    redo: () => {
      const u = p().history.redo(B(p()));
      u && k(u);
    }
  };
  function j(u, v, N = {}) {
    i = u, d = v, l = N.rowKey ?? null, ue(), W(), y({ focusLabel: N.focusLabel }), te(h, ee.selectionChange, {
      flowId: p().flowId,
      selectedNodeIds: [...i],
      selectedEdgeId: d
    });
  }
  o.inspector.onDismiss = () => {
    s && (i.size || d) && j(/* @__PURE__ */ new Set(), null);
  };
  function Y() {
    return s || !o.inspector.isOpen ? !1 : (o.inspector.hide(), !0);
  }
  Te = () => re.cancelConnector(), ae = {
    bundle: e,
    getSelection: () => ({ nodeIds: [...i], edgeId: d }),
    setSelection: j
  };
  function U(u) {
    var O;
    const v = (O = e.subflows) == null ? void 0 : O[u];
    if (!v) return;
    const N = p().flowId;
    r.push(nt(u, v.spec, v.layout)), b(), Ae(o.root, v.spec.style ?? e.main.style), le(), j(/* @__PURE__ */ new Set(), null), te(h, ee.subflowOpen, { flowId: N, subflowId: u });
  }
  const ie = (u, v) => {
    if (te(h, ee.edgeClick, {
      flowId: p().flowId,
      edgeId: u,
      shiftKey: v.shiftKey
    }), !s) {
      if (Y()) return;
      c && !v.shiftKey && L({ edgeId: u });
      return;
    }
    j(/* @__PURE__ */ new Set(), d === u ? null : u);
  }, Se = Dl(h, w, W, {
    onNodeClick: (u, v) => {
      var O;
      const N = p().nodes.find((S) => S.id === u);
      if (N) {
        if (te(h, ee.nodeClick, {
          flowId: p().flowId,
          nodeId: u,
          shiftKey: v.shiftKey
        }), s) {
          let S;
          v.shiftKey ? (S = new Set(i), S.has(u) ? S.delete(u) : S.add(u)) : S = i.size === 1 && i.has(u) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([u]), j(S, null);
          return;
        }
        if (!Y()) {
          if (N.subflow && ((O = e.subflows) != null && O[N.subflow])) {
            U(N.subflow);
            return;
          }
          c && !v.shiftKey && L({ nodeId: u });
        }
      }
    },
    onNodeDragStart: () => p().history.record(B(p())),
    onNodeMoved: (u) => {
      s ? j(/* @__PURE__ */ new Set([u]), null) : o.inspector.hide(), p().dirty = !0, o.saveBtn.disabled = !1, de();
    },
    onNodeResized: (u) => {
      s ? j(/* @__PURE__ */ new Set([u]), null) : o.inspector.hide(), T(u);
    },
    onRowClick: (u, v, N) => {
      if (te(h, ee.rowClick, {
        flowId: p().flowId,
        nodeId: u,
        rowId: v,
        shiftKey: N.shiftKey
      }), !s) {
        if (Y()) return;
        c && !N.shiftKey && L({ nodeId: u, rowId: v });
        return;
      }
      const O = (l == null ? void 0 : l.nodeId) === u && (l == null ? void 0 : l.rowId) === v;
      j(/* @__PURE__ */ new Set(), null, { rowKey: O ? null : { nodeId: u, rowId: v } });
    },
    onEdgeClick: ie,
    onBackgroundClick: (u, v) => {
      if (te(h, ee.backgroundClick, {
        flowId: p().flowId,
        point: u,
        shiftKey: v.shiftKey
      }), !s) {
        o.inspector.hide();
        return;
      }
      if (a) {
        const N = new Set(p().spec.nodes.map((S) => S.id)), O = Me("step", "New step", N);
        g((S) => Bl(S, { id: O, label: "New step", type: "process" }), {
          setNodePosition: { id: O, point: u }
        }), a = !1, h.classList.remove("dd-flow-placing"), o.addShapeBtn.classList.remove("is-active"), j(/* @__PURE__ */ new Set([O]), null, { focusLabel: !0 });
        return;
      }
      j(/* @__PURE__ */ new Set(), null);
    },
    // Right-click opens a shape's tools straight away. In live mode that leaves the mode alone:
    // the next left click still edits text, and closing the panel is all there is to undo.
    onContextMenu: (u) => c ? ("nodeId" in u ? s ? j(/* @__PURE__ */ new Set([u.nodeId]), null) : M(u.nodeId) : s ? j(/* @__PURE__ */ new Set(), u.edgeId) : I(u.edgeId), !0) : !1
  }), re = Ol(h, w, W, {
    onEdgeClick: ie,
    onBendDragStart: () => p().history.record(B(p())),
    onBendMoved: (u) => {
      s && j(/* @__PURE__ */ new Set(), u), p().dirty = !0, o.saveBtn.disabled = !1, de();
    },
    onConnect: (u, v, N) => {
      const O = Me("edge", `${u}-${v}`, new Set(p().spec.edges.map((S) => S.id)));
      g((S) => Fl(S, { id: O, from: u, to: v, ...N ? { toPort: N } : {} })), s && j(/* @__PURE__ */ new Set(), O);
    },
    onEdgeEndMoved: (u, v, N, O) => {
      const S = p(), A = S.edges.find((Z) => Z.id === u), D = S.nodes.find((Z) => Z.id === N);
      if (!A || !D) return;
      const F = v === "from" ? { from: N, fromPort: O } : { to: N, toPort: O }, q = C(v === "from" ? A.to : A.from), pe = v === "from" ? A.toPort : A.fromPort;
      if (q && !pe && A.points.length >= 2) {
        const Z = v === "from" ? A.points[A.points.length - 1] : A.points[0], we = Gd(q, Z);
        v === "from" ? F.toPort = we : F.fromPort = we;
      }
      g((Z) => ye(Z, u, F), { clearEdgePoints: u }), s ? j(/* @__PURE__ */ new Set(), u) : o.inspector.hide();
    }
  });
  let K = null;
  function W() {
    const u = p(), v = et(u.nodes, u.edges, {
      selectedNodeIds: i,
      selectedEdgeId: d,
      selectedRowKey: l,
      resizable: s || c,
      reconnectable: s || c,
      hotEdgeId: re.hotEdgeId()
    }), N = h.querySelector("svg.dd-flow-svg");
    N ? h.replaceChild(v, N) : h.appendChild(v);
    const O = K == null ? void 0 : K.state();
    K == null || K.destroy(), K = lo(h, v, { maxFitScale: Zl, initial: O });
  }
  function lt() {
    K == null || K.reset();
  }
  function fe() {
    h.classList.toggle("dd-flow-editing", s || c), h.classList.toggle("dd-flow-live", c && !s);
  }
  function X(u) {
    var N;
    const v = !!(t.onSaveLayout || t.onSaveSpec);
    return c && (v || !!((N = e.sources) != null && N[u.flowId]));
  }
  const Ee = /* @__PURE__ */ new Map();
  function de() {
    const u = p();
    X(u) && (clearTimeout(Ee.get(u)), Ee.set(
      u,
      setTimeout(() => {
        Ee.delete(u), R(u);
      }, ea)
    ));
  }
  function ue() {
    const u = i.size;
    o.makeSubflowBtn.disabled = !s || !c || u < 2, o.makeSubflowBtn.textContent = u >= 2 ? `Make subflow (${u})` : "Make subflow";
  }
  function le() {
    o.breadcrumbEl.innerHTML = "", o.breadcrumbEl.hidden = r.length < 2, r.forEach((O, S) => {
      if (S > 0) {
        const D = document.createElement("span");
        D.className = "dd-flow-breadcrumb-sep", D.textContent = "›", o.breadcrumbEl.appendChild(D);
      }
      const A = document.createElement(S === r.length - 1 ? "span" : "button");
      A.className = "dd-flow-breadcrumb-item", A.textContent = O.title, S !== r.length - 1 && (A.type = "button", A.addEventListener("click", () => {
        r.length = S + 1, b(), Ae(o.root, p().spec.style ?? e.main.style), le(), j(/* @__PURE__ */ new Set(), null);
      })), o.breadcrumbEl.appendChild(A);
    }), o.saveBtn.disabled = !(p().dirty || p().specDirty), o.saveBtn.hidden = X(p()), o.editBtn.classList.toggle("is-active", s), o.addShapeBtn.disabled = !s || !c, fe();
    const { orphanedNodeIds: u, orphanedEdgeIds: v } = p(), N = u.length + v.length;
    if (N > 0) {
      const O = [...u, ...v].join(", ");
      o.warningBanner.textContent = `⚠ The saved layout has ${N} position(s) that no longer match this flow (${O}) — they were dropped. This usually means the flow was regenerated with different node/edge ids.`, o.warningBanner.hidden = !1;
    } else
      o.warningBanner.hidden = !0;
  }
  const Pe = () => {
    s = !s, fe(), o.editBtn.classList.toggle("is-active", s), s && f(), o.addShapeBtn.disabled = !s || !c, s ? (ue(), W(), y()) : (a = !1, h.classList.remove("dd-flow-placing"), o.addShapeBtn.classList.remove("is-active"), j(/* @__PURE__ */ new Set(), null));
  }, je = () => {
    !s || !c || (a = !a, h.classList.toggle("dd-flow-placing", a), o.addShapeBtn.classList.toggle("is-active", a));
  }, P = () => {
    if (!s || !c || i.size < 2) return;
    const u = [...i], v = u.map((O) => m(O)).filter((O) => O !== null);
    if (!v.length) return;
    const N = sa(v.map((O) => O.getBoundingClientRect()));
    o.inspector.showPrompt("Name the new subflow", N, "Subflow", (O) => {
      const S = p(), A = new Set(Object.keys(e.subflows ?? {})), D = new Set(S.spec.nodes.map((me) => me.id)), F = Me("subflow", O, A), q = Me(F, O, D), pe = {};
      for (const me of S.nodes) pe[me.id] = { x: me.x, y: me.y };
      const Z = B(S);
      let we;
      try {
        we = Yl({
          spec: S.spec,
          layout: He(S.nodes, S.edges),
          nodePositions: pe,
          selectedNodeIds: u,
          newSubflowId: F,
          placeholderNodeId: q,
          placeholderLabel: O,
          existingSubflowIds: A
        });
      } catch (me) {
        console.error("dd-flow: could not extract subflow", me);
        return;
      }
      S.history.record(Z), S.spec = we.parent.spec;
      const Be = $e(S.spec, we.parent.layout);
      S.nodes = Be.nodes, S.edges = Be.edges, S.orphanedNodeIds = Be.orphanedNodeIds, S.orphanedEdgeIds = Be.orphanedEdgeIds, S.dirty = !0, S.specDirty = !0, e.subflows || (e.subflows = {}), e.subflows[F] = { spec: we.subflow.spec, layout: void 0 }, b(), o.saveBtn.disabled = !1, le(), j(/* @__PURE__ */ new Set([q]), null);
    });
  }, R = async (u = p()) => {
    var A;
    const v = He(u.nodes, u.edges), N = u.specDirty, O = t.onSaveLayout || t.onSaveSpec, S = c ? (A = e.sources) == null ? void 0 : A[u.flowId] : void 0;
    if (!O && S && await Ul(S, N ? u.spec : null, v)) {
      u.dirty = !1, u.specDirty = !1, o.saveBtn.disabled = !0, z(u, v);
      return;
    }
    t.onSaveLayout ? t.onSaveLayout(u.flowId, v) : po(u.flowId, v), N && (t.onSaveSpec ? t.onSaveSpec(u.flowId, u.spec) : wo(u.flowId, u.spec)), u.dirty = !1, u.specDirty = !1, o.saveBtn.disabled = !0, z(u, v);
  };
  function z(u, v) {
    u === r[0] && (e.main = u.spec, e.mainLayout = v, n());
  }
  const Q = () => {
    const u = h.querySelector("svg.dd-flow-svg");
    u && yo(u, h, `${p().flowId}.svg`);
  }, De = () => {
    const u = h.querySelector("svg.dd-flow-svg");
    u && bo(u, h, `${p().flowId}.png`);
  };
  o.editBtn.onclick = Pe, o.addShapeBtn.onclick = je, o.makeSubflowBtn.onclick = P, o.saveBtn.onclick = () => void R(), o.fitBtn.onclick = lt, o.root.querySelector(".dd-flow-export-svg-btn").onclick = Q, o.root.querySelector(".dd-flow-export-png-btn").onclick = De, s = !1, i = /* @__PURE__ */ new Set(), d = null, l = null, a = !1, h.classList.remove("dd-flow-editing", "dd-flow-live", "dd-flow-placing"), le(), ue(), W(), y(), (Ft = (he = o.root._interactions) == null ? void 0 : he.destroy) == null || Ft.call(he), o.root._interactions = {
    destroy() {
      Se.destroy(), re.destroy();
    }
  };
}
if (typeof document < "u") {
  const e = () => {
    Ql(), ml();
  }, t = globalThis.document$;
  t ? t.subscribe(e) : document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e();
}
export {
  ee as DD_FLOW_EVENTS,
  gt as DEFAULT_THEME,
  tt as THEMES,
  Ae as applyTheme,
  _o as attachRelationHighlight,
  lo as attachViewport,
  Ql as autoMountFlows,
  ml as autoMountGraphs,
  We as buildGraphIndex,
  ve as collectClosure,
  $e as computeLayout,
  te as dispatchFlowEvent,
  ot as downloadBlob,
  po as downloadLayout,
  bo as downloadPng,
  yo as downloadSvg,
  ua as emptyLayout,
  al as layoutLayered,
  Xl as mountFlow,
  pl as mountGraph,
  jd as paintLevels,
  ze as paintRelations,
  at as paintRowRelations,
  fa as registerTheme,
  et as renderSvg,
  Vd as routeEdge,
  He as toLayout
};
