var kn = Object.defineProperty;
var Cn = (e, t, n) => t in e ? kn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var D = (e, t, n) => Cn(e, typeof t != "symbol" ? t + "" : t, n);
const z = {
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
function U(e, t, n) {
  e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: !0, composed: !0 }));
}
function Oe(e, t) {
  const n = URL.createObjectURL(e), o = document.createElement("a");
  o.href = n, o.download = t, document.body.appendChild(o), o.click(), o.remove(), URL.revokeObjectURL(n);
}
function Ln(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  Oe(new Blob([n], { type: "application/json" }), `${e}.layout.json`);
}
function _n(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  Oe(new Blob([n], { type: "application/json" }), `${e}.flow.json`);
}
const Sn = /^var\((--dd-flow-[a-z-]+)\)$/;
function Nn(e, t) {
  const n = e.cloneNode(!0), o = getComputedStyle(t), r = ["fill", "stroke"], s = (d) => {
    const l = d.match(Sn);
    return l && o.getPropertyValue(l[1]).trim() || d;
  }, i = [n, ...Array.from(n.querySelectorAll("*"))];
  for (const d of i)
    for (const l of r) {
      const a = d.getAttribute(l);
      a && d.setAttribute(l, s(a));
    }
  return n;
}
function Pt(e, t) {
  const n = Nn(e, t);
  return n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), new XMLSerializer().serializeToString(n);
}
function In(e, t, n) {
  const o = Pt(e, t);
  Oe(new Blob([o], { type: "image/svg+xml;charset=utf-8" }), n);
}
function On(e, t, n, o = 2) {
  const r = Pt(e, t), s = parseFloat(e.getAttribute("width") || "800"), i = parseFloat(e.getAttribute("height") || "600"), d = getComputedStyle(t).getPropertyValue("--dd-flow-canvas-bg").trim() || "#ffffff", l = new Blob([r], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(l), c = new Image();
  c.onload = () => {
    const f = document.createElement("canvas");
    f.width = s * o, f.height = i * o;
    const h = f.getContext("2d");
    if (!h) {
      URL.revokeObjectURL(a);
      return;
    }
    h.scale(o, o), h.fillStyle = d, h.fillRect(0, 0, s, i), h.drawImage(c, 0, 0, s, i), URL.revokeObjectURL(a), f.toBlob((u) => {
      u && Oe(u, n);
    }, "image/png");
  }, c.onerror = () => URL.revokeObjectURL(a), c.src = a;
}
const $n = "dd-flow-graph-fullscreen-open";
let it = 0;
function Mn(e, t, n = !0) {
  let o = !1;
  const r = document.createComment("dd-flow fullscreen"), s = n ? document.createElement("button") : null, i = () => {
    s && (s.textContent = o ? "✕" : "⤢", s.setAttribute("aria-label", o ? "Close fullscreen" : "Fullscreen"), s.setAttribute("aria-pressed", String(o)));
  }, d = (a) => {
    a !== o && (it += a ? 1 : -1, document.body.classList.toggle($n, it > 0)), a && !o && e.parentNode && e.parentNode !== document.body ? (e.replaceWith(r), document.body.appendChild(e)) : !a && r.parentNode && r.replaceWith(e), o = a, e.classList.toggle("dd-flow-graph-fullscreen", a), i(), t();
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
const An = "http://www.w3.org/2000/svg";
function I(e, t = {}) {
  const n = document.createElementNS(An, e);
  for (const [o, r] of Object.entries(t)) n.setAttribute(o, String(r));
  return n;
}
const dt = {
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
}, oe = 24, re = 28, jn = 8;
function Bt(e) {
  return re + ((e == null ? void 0 : e.length) ?? 0) * oe + jn;
}
function $e(e, t, n) {
  const o = [e, ...(t ?? []).map((s) => s.label)], r = Math.max(...o.map((s) => s.length));
  return Math.max(n, r * Ft + 40);
}
function K(e, t) {
  return `${e}::${t}`;
}
function Je(e) {
  return `${K(e.sourceNode, e.sourceRow)}=>${K(e.targetNode, e.targetRow)}`;
}
function at(e, t, n) {
  var i;
  const o = ((i = e.rows) == null ? void 0 : i.findIndex((d) => d.id === t)) ?? -1;
  if (o < 0) return null;
  const s = -e.h / 2 + re + o * oe + oe / 2;
  return { x: e.x + (n === "left" ? -e.w / 2 : e.w / 2), y: e.y + s };
}
function ce(e) {
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
function Dt(e, t, n) {
  const { fill: o, stroke: r } = ce(e), s = { fill: o, stroke: r, "stroke-width": 2 };
  switch (e) {
    case "start":
    case "end": {
      const i = n / 2;
      return I("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: i, ry: i, ...s });
    }
    case "decision": {
      const i = [
        [0, -n / 2],
        [t / 2, 0],
        [0, n / 2],
        [-t / 2, 0]
      ].map((d) => d.join(",")).join(" ");
      return I("polygon", { points: i, ...s });
    }
    case "data": {
      const i = t * 0.15, d = [
        [-t / 2 + i, -n / 2],
        [t / 2, -n / 2],
        [t / 2 - i, n / 2],
        [-t / 2, n / 2]
      ].map((l) => l.join(",")).join(" ");
      return I("polygon", { points: d, ...s });
    }
    case "manual": {
      const i = t * 0.12, d = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [t / 2 - i, n / 2],
        [-t / 2 + i, n / 2]
      ].map((l) => l.join(",")).join(" ");
      return I("polygon", { points: d, ...s });
    }
    case "document": {
      const i = n * 0.12, d = [
        `M ${-t / 2} ${-n / 2}`,
        `L ${t / 2} ${-n / 2}`,
        `L ${t / 2} ${n / 2 - i}`,
        `C ${t / 4} ${n / 2 + i}, ${-t / 4} ${n / 2 - i * 2}, ${-t / 2} ${n / 2}`,
        "Z"
      ].join(" ");
      return I("path", { d, ...s });
    }
    case "multidocument": {
      const i = I("g", {}), d = n * 0.12, l = [
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
        i.appendChild(I("path", { d: f, ...s }));
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
      return I("polygon", { points: i, ...s });
    }
    case "database": {
      const i = n * 0.18, d = -n / 2, l = n / 2, a = I("g", {}), c = [
        `M ${-t / 2} ${d + i}`,
        `L ${-t / 2} ${l - i}`,
        `A ${t / 2} ${i} 0 0 0 ${t / 2} ${l - i}`,
        `L ${t / 2} ${d + i}`,
        "Z"
      ].join(" ");
      return a.appendChild(I("path", { d: c, ...s })), a.appendChild(I("ellipse", { cx: 0, cy: d + i, rx: t / 2, ry: i, ...s })), a;
    }
    case "delay": {
      const i = n / 2, d = [
        `M ${-t / 2} ${-n / 2}`,
        `L ${t / 2 - i} ${-n / 2}`,
        `A ${i} ${i} 0 0 1 ${t / 2 - i} ${n / 2}`,
        `L ${-t / 2} ${n / 2}`,
        "Z"
      ].join(" ");
      return I("path", { d, ...s });
    }
    case "on-page-reference":
      return I("circle", { cx: 0, cy: 0, r: Math.min(t, n) / 2, ...s });
    case "off-page-reference": {
      const i = n * 0.3, d = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [t / 2, n / 2 - i],
        [0, n / 2],
        [-t / 2, n / 2 - i]
      ].map((l) => l.join(",")).join(" ");
      return I("polygon", { points: d, ...s });
    }
    case "alternate-process": {
      const i = n * 0.35;
      return I("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: i, ry: i, ...s });
    }
    case "merge": {
      const i = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [0, n / 2]
      ].map((d) => d.join(",")).join(" ");
      return I("polygon", { points: i, ...s });
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
      return I("polygon", { points: d, ...s });
    }
    case "subprocess": {
      const i = I("g", {});
      i.appendChild(I("rect", { x: -t / 2, y: -n / 2, width: t, height: n, ...s }));
      const d = 10;
      return i.appendChild(
        I("line", {
          x1: -t / 2 + d,
          y1: -n / 2,
          x2: -t / 2 + d,
          y2: n / 2,
          stroke: ce(e).stroke,
          "stroke-width": 2
        })
      ), i.appendChild(
        I("line", {
          x1: t / 2 - d,
          y1: -n / 2,
          x2: t / 2 - d,
          y2: n / 2,
          stroke: ce(e).stroke,
          "stroke-width": 2
        })
      ), i;
    }
    case "process":
    default:
      return I("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: 6, ry: 6, ...s });
  }
}
function Tn(e, t) {
  const n = I("g", { transform: `translate(${e / 2 - 16}, ${t / 2 - 16})`, class: "dd-flow-subflow-badge" });
  n.appendChild(I("circle", { cx: 0, cy: 0, r: 10, fill: "var(--dd-flow-subprocess-stroke)" }));
  const o = I("path", {
    d: "M -4 3 L 3 -4 M -1 -4 L 3 -4 L 3 0",
    stroke: "#ffffff",
    "stroke-width": 1.6,
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });
  return n.appendChild(o), n;
}
function Rn(e, t) {
  const { text: n, stroke: o } = ce(e.type), r = I("g", { class: "dd-flow-node-body" }), s = -e.h / 2, i = (l) => I("line", { x1: -e.w / 2, x2: e.w / 2, y1: l, y2: l, stroke: o, "stroke-width": 1, opacity: 0.4 }), d = I("text", {
    x: 0,
    y: s + re / 2,
    fill: n,
    "text-anchor": "middle",
    "dominant-baseline": "central",
    class: "dd-flow-label"
  });
  return d.textContent = e.label, r.appendChild(d), r.appendChild(i(s + re)), (e.rows ?? []).forEach((l, a) => {
    const c = s + re + a * oe, f = I("g", {
      class: `dd-flow-node-row${l.id === t ? " is-row-selected" : ""}`,
      "data-row-id": l.id
    });
    f.appendChild(
      I("rect", { x: -e.w / 2, y: c, width: e.w, height: oe, fill: "transparent" })
    );
    const h = I("text", {
      x: -e.w / 2 + 10,
      y: c + oe / 2,
      fill: n,
      "text-anchor": "start",
      "dominant-baseline": "central",
      class: "dd-flow-label"
    });
    h.textContent = l.label, f.appendChild(h), r.appendChild(f), a > 0 && r.appendChild(i(c));
  }), r;
}
function Pn(e, t = {}) {
  var r;
  const n = [
    "dd-flow-node",
    `dd-flow-node-${e.type}`,
    t.selected && "is-selected",
    t.multiselected && "is-multiselected"
  ].filter(Boolean).join(" "), o = I("g", {
    class: n,
    "data-node-id": e.id,
    transform: `translate(${e.x}, ${e.y})`
  });
  if (o.appendChild(Dt(e.type, e.w, e.h)), e.type === "compound" && ((r = e.rows) != null && r.length))
    o.appendChild(Rn(e, t.selectedRowId));
  else {
    const { text: s } = ce(e.type), i = I("text", {
      x: 0,
      y: 0,
      fill: s,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      class: "dd-flow-label"
    });
    Bn(i, e.label, e.w - 20), o.appendChild(i);
  }
  return e.subflow && o.appendChild(Tn(e.w, e.h)), o;
}
const Ve = 16, Ft = 7.2;
function Qe(e, t) {
  const n = e.split(/\s+/), o = Math.max(4, Math.floor(t / Ft)), r = [];
  let s = "";
  for (const i of n) {
    const d = s ? `${s} ${i}` : i;
    d.length > o && s ? (r.push(s), s = i) : s = d;
  }
  return s && r.push(s), r;
}
function Bn(e, t, n) {
  const o = Qe(t, n), r = -((o.length - 1) * Ve) / 2;
  o.forEach((s, i) => {
    const d = I("tspan", { x: 0, y: r + i * Ve });
    d.textContent = s, e.appendChild(d);
  });
}
function Gt(e, t, n) {
  const r = n - (e === "start" || e === "end" ? n * 0.3 : 20);
  return Qe(t, Math.max(20, r)).length * Ve + 24;
}
function Le(e) {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const o of e)
    t.has(o.to) || t.set(o.to, []), t.get(o.to).push(o.from), n.has(o.from) || n.set(o.from, []), n.get(o.from).push(o.to);
  return { parentsOf: t, childrenOf: n };
}
function ee(e, t) {
  const n = /* @__PURE__ */ new Set(), o = [...e.get(t) ?? []];
  for (; o.length; ) {
    const r = o.pop();
    n.has(r) || (n.add(r), o.push(...e.get(r) ?? []));
  }
  return n;
}
const lt = ["is-focus", "is-upstream", "is-downstream", "is-dimmed"], ct = ["is-row-focus", "is-row-upstream", "is-row-downstream", "is-row-dimmed"];
function Ht(e, t, n, o, r) {
  const s = new Set(n ? [...o, n] : []), i = new Set(n ? [...r, n] : []);
  for (const l of e.querySelectorAll(".dd-flow-node")) {
    if (l.classList.remove(...lt), !n) continue;
    const a = l.getAttribute("data-node-id") ?? "";
    a === n ? l.classList.add("is-focus") : o.has(a) ? l.classList.add("is-upstream") : r.has(a) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed");
  }
  const d = new Map(t.map((l) => [l.id, l]));
  for (const l of e.querySelectorAll(".dd-flow-edge")) {
    if (l.classList.remove(...lt), !n) continue;
    const a = d.get(l.getAttribute("data-edge-id") ?? "");
    a && (s.has(a.from) && s.has(a.to) ? l.classList.add("is-upstream") : i.has(a.from) && i.has(a.to) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed"));
  }
}
function be(e, t, n, o) {
  const r = o ? ee(n.parentsOf, o) : /* @__PURE__ */ new Set(), s = o ? ee(n.childrenOf, o) : /* @__PURE__ */ new Set();
  Ht(e, t, o, r, s);
}
function je(e, t, n, o) {
  var c;
  const r = o ? K(o.nodeId, o.rowId) : null, s = r ? ee(n.parentsOf, r) : /* @__PURE__ */ new Set(), i = r ? ee(n.childrenOf, r) : /* @__PURE__ */ new Set(), d = new Set(r ? [...s, r] : []), l = new Set(r ? [...i, r] : []);
  for (const f of e.querySelectorAll(".dd-flow-node-row")) {
    if (f.classList.remove(...ct), !r) continue;
    const h = ((c = f.closest(".dd-flow-node")) == null ? void 0 : c.getAttribute("data-node-id")) ?? "", u = f.getAttribute("data-row-id") ?? "", p = K(h, u);
    p === r ? f.classList.add("is-row-focus") : s.has(p) ? f.classList.add("is-row-upstream") : i.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
  const a = new Map(t.map((f) => [Je(f), f]));
  for (const f of e.querySelectorAll(".dd-flow-row-edge")) {
    if (f.classList.remove(...ct), !r) continue;
    const h = a.get(f.getAttribute("data-row-edge-id") ?? "");
    if (!h) continue;
    const u = K(h.sourceNode, h.sourceRow), p = K(h.targetNode, h.targetRow);
    d.has(u) && d.has(p) ? f.classList.add("is-row-upstream") : l.has(u) && l.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
}
function Dn(e, t, n = {}) {
  const o = Le(t), r = n.flowId ?? "", s = n.rowEdges ?? [], i = Le(
    s.map((b) => ({
      id: Je(b),
      from: K(b.sourceNode, b.sourceRow),
      to: K(b.targetNode, b.targetRow)
    }))
  ), d = /* @__PURE__ */ new Map();
  for (const b of s)
    d.set(K(b.sourceNode, b.sourceRow), b.sourceNode), d.set(K(b.targetNode, b.targetRow), b.targetNode);
  let l = null, a = null;
  const c = () => a ? `r:${a.nodeId}:${a.rowId}` : l ? `n:${l}` : "", f = () => U(e, z.selectionChange, {
    flowId: r,
    selectedNodeIds: a ? [a.nodeId] : l ? [l] : [],
    selectedEdgeId: null
  }), h = (b) => {
    var E;
    const y = (E = b == null ? void 0 : b.closest) == null ? void 0 : E.call(b, ".dd-flow-node");
    return (y == null ? void 0 : y.getAttribute("data-node-id")) ?? null;
  }, u = (b) => {
    var A, C;
    const y = (A = b == null ? void 0 : b.closest) == null ? void 0 : A.call(b, ".dd-flow-node-row"), E = (C = y == null ? void 0 : y.closest(".dd-flow-node")) == null ? void 0 : C.getAttribute("data-node-id"), g = y == null ? void 0 : y.getAttribute("data-row-id");
    return E && g ? { nodeId: E, rowId: g } : null;
  }, p = () => {
    if (a) {
      const b = K(a.nodeId, a.rowId), y = ee(i.parentsOf, b), E = ee(i.childrenOf, b);
      je(e, s, i, a);
      const g = new Set([...y].map((C) => d.get(C) ?? C)), A = new Set([...E].map((C) => d.get(C) ?? C));
      Ht(e, t, a.nodeId, g, A);
    } else
      be(e, t, o, l), s.length && je(e, s, i, null);
  }, w = (b) => {
    if (l || a) return;
    const y = h(b.target);
    y && be(e, t, o, y);
  }, x = (b) => {
    var E, g;
    if (l || a) return;
    const y = (g = (E = b.relatedTarget) == null ? void 0 : E.closest) == null ? void 0 : g.call(E, ".dd-flow-node");
    y && y === b.target.closest(".dd-flow-node") || be(e, t, o, null);
  }, v = (b) => {
    const y = h(b.target), E = s.length ? u(b.target) : null, g = c();
    E ? (a = (a == null ? void 0 : a.nodeId) === E.nodeId && (a == null ? void 0 : a.rowId) === E.rowId ? null : E, l = null) : (l = y && y !== l ? y : null, a = null), p(), y ? U(e, z.nodeClick, {
      flowId: r,
      nodeId: y,
      shiftKey: b.shiftKey
    }) : U(e, z.backgroundClick, {
      flowId: r,
      point: { x: b.clientX, y: b.clientY },
      shiftKey: b.shiftKey
    }), c() !== g && f();
  };
  return n.hover !== !1 && (e.addEventListener("pointerover", w), e.addEventListener("pointerout", x)), e.addEventListener("click", v), {
    setFocus(b) {
      const y = c();
      l = b, a = null, p(), c() !== y && f();
    },
    getFocus: () => l,
    setRowFocus(b) {
      const y = c();
      a = b, l = null, p(), c() !== y && f();
    },
    getRowFocus: () => a,
    destroy() {
      e.removeEventListener("pointerover", w), e.removeEventListener("pointerout", x), e.removeEventListener("click", v), be(e, t, o, null), s.length && je(e, s, i, null);
    }
  };
}
function Fn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Gn = "\0", Z = "\0", ft = "";
let Hn = class {
  constructor(t) {
    D(this, "_isDirected", !0);
    D(this, "_isMultigraph", !1);
    D(this, "_isCompound", !1);
    // Label for the graph itself
    D(this, "_label");
    // Defaults to be set when creating a new node
    D(this, "_defaultNodeLabelFn", () => {
    });
    // Defaults to be set when creating a new edge
    D(this, "_defaultEdgeLabelFn", () => {
    });
    // v -> label
    D(this, "_nodes", {});
    // v -> edgeObj
    D(this, "_in", {});
    // u -> v -> Number
    D(this, "_preds", {});
    // v -> edgeObj
    D(this, "_out", {});
    // v -> w -> Number
    D(this, "_sucs", {});
    // e -> edgeObj
    D(this, "_edgeObjs", {});
    // e -> label
    D(this, "_edgeLabels", {});
    /* Number of nodes in the graph. Should only be changed by the implementation. */
    D(this, "_nodeCount", 0);
    /* Number of edges in the graph. Should only be changed by the implementation. */
    D(this, "_edgeCount", 0);
    D(this, "_parent");
    D(this, "_children");
    t && (this._isDirected = Object.hasOwn(t, "directed") ? t.directed : !0, this._isMultigraph = Object.hasOwn(t, "multigraph") ? t.multigraph : !1, this._isCompound = Object.hasOwn(t, "compound") ? t.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[Z] = {});
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
    return Object.hasOwn(this._nodes, t) ? (arguments.length > 1 && (this._nodes[t] = n), this) : (this._nodes[t] = arguments.length > 1 ? n : this._defaultNodeLabelFn(t), this._isCompound && (this._parent[t] = Z, this._children[t] = {}, this._children[Z][t] = !0), this._in[t] = {}, this._preds[t] = {}, this._out[t] = {}, this._sucs[t] = {}, ++this._nodeCount, this);
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
      n = Z;
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
      if (n !== Z)
        return n;
    }
  }
  /**
   * Gets list of direct children of node v.
   * Complexity: O(1).
   */
  children(t = Z) {
    if (this._isCompound) {
      var n = this._children[t];
      if (n)
        return Object.keys(n);
    } else {
      if (t === Z)
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
    var d = ae(this._isDirected, t, n, o);
    if (Object.hasOwn(this._edgeLabels, d))
      return s && (this._edgeLabels[d] = r), this;
    if (o !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[d] = s ? r : this._defaultEdgeLabelFn(t, n, o);
    var l = qn(this._isDirected, t, n, o);
    return t = l.v, n = l.w, Object.freeze(l), this._edgeObjs[d] = l, ut(this._preds[n], t), ut(this._sucs[t], n), this._in[n][d] = l, this._out[t][d] = l, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, o) {
    var r = arguments.length === 1 ? Te(this._isDirected, arguments[0]) : ae(this._isDirected, t, n, o);
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
    var r = arguments.length === 1 ? Te(this._isDirected, arguments[0]) : ae(this._isDirected, t, n, o);
    return Object.hasOwn(this._edgeLabels, r);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, o) {
    var r = arguments.length === 1 ? Te(this._isDirected, arguments[0]) : ae(this._isDirected, t, n, o), s = this._edgeObjs[r];
    return s && (t = s.v, n = s.w, delete this._edgeLabels[r], delete this._edgeObjs[r], ht(this._preds[n], t), ht(this._sucs[t], n), delete this._in[n][r], delete this._out[t][r], this._edgeCount--), this;
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
function ut(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function ht(e, t) {
  --e[t] || delete e[t];
}
function ae(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  return r + ft + s + ft + (o === void 0 ? Gn : o);
}
function qn(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  var d = { v: r, w: s };
  return o && (d.name = o), d;
}
function Te(e, t) {
  return ae(e, t.v, t.w, t.name);
}
var Ze = Hn, Vn = "2.2.4", Yn = {
  Graph: Ze,
  version: Vn
}, zn = Ze, Un = {
  write: Kn,
  read: Jn
};
function Kn(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: Wn(e),
    edges: Xn(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function Wn(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), o = e.parent(t), r = { v: t };
    return n !== void 0 && (r.value = n), o !== void 0 && (r.parent = o), r;
  });
}
function Xn(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), o = { v: t.v, w: t.w };
    return t.name !== void 0 && (o.name = t.name), n !== void 0 && (o.value = n), o;
  });
}
function Jn(e) {
  var t = new zn(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var Qn = Zn;
function Zn(e) {
  var t = {}, n = [], o;
  function r(s) {
    Object.hasOwn(t, s) || (t[s] = !0, o.push(s), e.successors(s).forEach(r), e.predecessors(s).forEach(r));
  }
  return e.nodes().forEach(function(s) {
    o = [], r(s), o.length && n.push(o);
  }), n;
}
let eo = class {
  constructor() {
    D(this, "_arr", []);
    D(this, "_keyIndices", {});
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
var qt = eo, to = qt, Vt = oo, no = () => 1;
function oo(e, t, n, o) {
  return ro(
    e,
    String(t),
    n || no,
    o || function(r) {
      return e.outEdges(r);
    }
  );
}
function ro(e, t, n, o) {
  var r = {}, s = new to(), i, d, l = function(a) {
    var c = a.v !== i ? a.v : a.w, f = r[c], h = n(a), u = d.distance + h;
    if (h < 0)
      throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + a + " Weight: " + h);
    u < f.distance && (f.distance = u, f.predecessor = i, s.decrease(c, u));
  };
  for (e.nodes().forEach(function(a) {
    var c = a === t ? 0 : Number.POSITIVE_INFINITY;
    r[a] = { distance: c }, s.add(a, c);
  }); s.size() > 0 && (i = s.removeMin(), d = r[i], d.distance !== Number.POSITIVE_INFINITY); )
    o(i).forEach(l);
  return r;
}
var so = Vt, io = ao;
function ao(e, t, n) {
  return e.nodes().reduce(function(o, r) {
    return o[r] = so(e, r, t, n), o;
  }, {});
}
var Yt = lo;
function lo(e) {
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
var co = Yt, fo = uo;
function uo(e) {
  return co(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var ho = wo, po = () => 1;
function wo(e, t, n) {
  return mo(
    e,
    t || po,
    n || function(o) {
      return e.outEdges(o);
    }
  );
}
function mo(e, t, n) {
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
        var c = l[s], f = i[a], h = l[a], u = c.distance + f.distance;
        u < h.distance && (h.distance = u, h.predecessor = f.predecessor);
      });
    });
  }), o;
}
function zt(e) {
  var t = {}, n = {}, o = [];
  function r(s) {
    if (Object.hasOwn(n, s))
      throw new Ye();
    Object.hasOwn(t, s) || (n[s] = !0, t[s] = !0, e.predecessors(s).forEach(r), delete n[s], o.push(s));
  }
  if (e.sinks().forEach(r), Object.keys(t).length !== e.nodeCount())
    throw new Ye();
  return o;
}
class Ye extends Error {
  constructor() {
    super(...arguments);
  }
}
var Ut = zt;
zt.CycleException = Ye;
var pt = Ut, go = bo;
function bo(e) {
  try {
    pt(e);
  } catch (t) {
    if (t instanceof pt.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var Kt = yo;
function yo(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var o = e.isDirected() ? (d) => e.successors(d) : (d) => e.neighbors(d), r = n === "post" ? vo : Eo, s = [], i = {};
  return t.forEach((d) => {
    if (!e.hasNode(d))
      throw new Error("Graph does not have node: " + d);
    r(d, o, i, s);
  }), s;
}
function vo(e, t, n, o) {
  for (var r = [[e, !1]]; r.length > 0; ) {
    var s = r.pop();
    s[1] ? o.push(s[0]) : Object.hasOwn(n, s[0]) || (n[s[0]] = !0, r.push([s[0], !0]), Wt(t(s[0]), (i) => r.push([i, !1])));
  }
}
function Eo(e, t, n, o) {
  for (var r = [e]; r.length > 0; ) {
    var s = r.pop();
    Object.hasOwn(n, s) || (n[s] = !0, o.push(s), Wt(t(s), (i) => r.push(i)));
  }
}
function Wt(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var xo = Kt, ko = Co;
function Co(e, t) {
  return xo(e, t, "post");
}
var Lo = Kt, _o = So;
function So(e, t) {
  return Lo(e, t, "pre");
}
var No = Ze, Io = qt, Oo = $o;
function $o(e, t) {
  var n = new No(), o = {}, r = new Io(), s;
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
var Mo = {
  components: Qn,
  dijkstra: Vt,
  dijkstraAll: io,
  findCycles: fo,
  floydWarshall: ho,
  isAcyclic: go,
  postorder: ko,
  preorder: _o,
  prim: Oo,
  tarjan: Yt,
  topsort: Ut
}, wt = Yn, W = {
  Graph: wt.Graph,
  json: Un,
  alg: Mo,
  version: wt.version
};
let Ao = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return mt(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && mt(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, o = n._prev;
    for (; o !== n; )
      t.push(JSON.stringify(o, jo)), o = o._prev;
    return "[" + t.join(", ") + "]";
  }
};
function mt(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function jo(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var To = Ao;
let Ro = W.Graph, Po = To;
var Bo = Fo;
let Do = () => 1;
function Fo(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = Ho(e, t || Do);
  return Go(n.graph, n.buckets, n.zeroIdx).flatMap((r) => e.outEdges(r.v, r.w));
}
function Go(e, t, n) {
  let o = [], r = t[t.length - 1], s = t[0], i;
  for (; e.nodeCount(); ) {
    for (; i = s.dequeue(); )
      Re(e, t, n, i);
    for (; i = r.dequeue(); )
      Re(e, t, n, i);
    if (e.nodeCount()) {
      for (let d = t.length - 2; d > 0; --d)
        if (i = t[d].dequeue(), i) {
          o = o.concat(Re(e, t, n, i, !0));
          break;
        }
    }
  }
  return o;
}
function Re(e, t, n, o, r) {
  let s = r ? [] : void 0;
  return e.inEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = e.node(i.v);
    r && s.push({ v: i.v, w: i.w }), l.out -= d, ze(t, n, l);
  }), e.outEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = i.w, a = e.node(l);
    a.in -= d, ze(t, n, a);
  }), e.removeNode(o.v), s;
}
function Ho(e, t) {
  let n = new Ro(), o = 0, r = 0;
  e.nodes().forEach((d) => {
    n.setNode(d, { v: d, in: 0, out: 0 });
  }), e.edges().forEach((d) => {
    let l = n.edge(d.v, d.w) || 0, a = t(d), c = l + a;
    n.setEdge(d.v, d.w, c), r = Math.max(r, n.node(d.v).out += a), o = Math.max(o, n.node(d.w).in += a);
  });
  let s = qo(r + o + 3).map(() => new Po()), i = o + 1;
  return n.nodes().forEach((d) => {
    ze(s, i, n.node(d));
  }), { graph: n, buckets: s, zeroIdx: i };
}
function ze(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function qo(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let Xt = W.Graph;
var F = {
  addBorderNode: Qo,
  addDummyNode: Jt,
  applyWithChunking: Me,
  asNonCompoundGraph: Yo,
  buildLayerMatrix: Wo,
  intersectRect: Ko,
  mapValues: sr,
  maxRank: Zt,
  normalizeRanks: Xo,
  notime: nr,
  partition: er,
  pick: rr,
  predecessorWeights: Uo,
  range: tn,
  removeEmptyRanks: Jo,
  simplify: Vo,
  successorWeights: zo,
  time: tr,
  uniqueId: en,
  zipObject: et
};
function Jt(e, t, n, o) {
  for (var r = o; e.hasNode(r); )
    r = en(o);
  return n.dummy = t, e.setNode(r, n), r;
}
function Vo(e) {
  let t = new Xt().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let o = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, r = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: o.weight + r.weight,
      minlen: Math.max(o.minlen, r.minlen)
    });
  }), t;
}
function Yo(e) {
  let t = new Xt({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function zo(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.outEdges(n).forEach((r) => {
      o[r.w] = (o[r.w] || 0) + e.edge(r).weight;
    }), o;
  });
  return et(e.nodes(), t);
}
function Uo(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.inEdges(n).forEach((r) => {
      o[r.v] = (o[r.v] || 0) + e.edge(r).weight;
    }), o;
  });
  return et(e.nodes(), t);
}
function Ko(e, t) {
  let n = e.x, o = e.y, r = t.x - n, s = t.y - o, i = e.width / 2, d = e.height / 2;
  if (!r && !s)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let l, a;
  return Math.abs(s) * i > Math.abs(r) * d ? (s < 0 && (d = -d), l = d * r / s, a = d) : (r < 0 && (i = -i), l = i, a = i * s / r), { x: n + l, y: o + a };
}
function Wo(e) {
  let t = tn(Zt(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let o = e.node(n), r = o.rank;
    r !== void 0 && (t[r][o.order] = n);
  }), t;
}
function Xo(e) {
  let t = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MAX_VALUE : r;
  }), n = Me(Math.min, t);
  e.nodes().forEach((o) => {
    let r = e.node(o);
    Object.hasOwn(r, "rank") && (r.rank -= n);
  });
}
function Jo(e) {
  let t = e.nodes().map((i) => e.node(i).rank), n = Me(Math.min, t), o = [];
  e.nodes().forEach((i) => {
    let d = e.node(i).rank - n;
    o[d] || (o[d] = []), o[d].push(i);
  });
  let r = 0, s = e.graph().nodeRankFactor;
  Array.from(o).forEach((i, d) => {
    i === void 0 && d % s !== 0 ? --r : i !== void 0 && r && i.forEach((l) => e.node(l).rank += r);
  });
}
function Qo(e, t, n, o) {
  let r = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (r.rank = n, r.order = o), Jt(e, "border", r, t);
}
function Zo(e, t = Qt) {
  const n = [];
  for (let o = 0; o < e.length; o += t) {
    const r = e.slice(o, o + t);
    n.push(r);
  }
  return n;
}
const Qt = 65535;
function Me(e, t) {
  if (t.length > Qt) {
    const n = Zo(t);
    return e.apply(null, n.map((o) => e.apply(null, o)));
  } else
    return e.apply(null, t);
}
function Zt(e) {
  const n = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MIN_VALUE : r;
  });
  return Me(Math.max, n);
}
function er(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((o) => {
    t(o) ? n.lhs.push(o) : n.rhs.push(o);
  }), n;
}
function tr(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function nr(e, t) {
  return t();
}
let or = 0;
function en(e) {
  var t = ++or;
  return e + ("" + t);
}
function tn(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let o = (s) => s < t;
  n < 0 && (o = (s) => t < s);
  const r = [];
  for (let s = e; o(s); s += n)
    r.push(s);
  return r;
}
function rr(e, t) {
  const n = {};
  for (const o of t)
    e[o] !== void 0 && (n[o] = e[o]);
  return n;
}
function sr(e, t) {
  let n = t;
  return typeof t == "string" && (n = (o) => o[t]), Object.entries(e).reduce((o, [r, s]) => (o[r] = n(s, r), o), {});
}
function et(e, t) {
  return e.reduce((n, o, r) => (n[o] = t[r], n), {});
}
let ir = Bo, dr = F.uniqueId;
var ar = {
  run: lr,
  undo: fr
};
function lr(e) {
  (e.graph().acyclicer === "greedy" ? ir(e, n(e)) : cr(e)).forEach((o) => {
    let r = e.edge(o);
    e.removeEdge(o), r.forwardName = o.name, r.reversed = !0, e.setEdge(o.w, o.v, r, dr("rev"));
  });
  function n(o) {
    return (r) => o.edge(r).weight;
  }
}
function cr(e) {
  let t = [], n = {}, o = {};
  function r(s) {
    Object.hasOwn(o, s) || (o[s] = !0, n[s] = !0, e.outEdges(s).forEach((i) => {
      Object.hasOwn(n, i.w) ? t.push(i) : r(i.w);
    }), delete n[s]);
  }
  return e.nodes().forEach(r), t;
}
function fr(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let o = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, o);
    }
  });
}
let ur = F;
var hr = {
  run: pr,
  undo: mr
};
function pr(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => wr(e, t));
}
function wr(e, t) {
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
    }, a = ur.addDummyNode(e, "edge", c, "_d"), o === l && (c.width = d.width, c.height = d.height, c.dummy = "edge-label", c.labelpos = d.labelpos), e.setEdge(n, a, { weight: d.weight }, i), f === 0 && e.graph().dummyChains.push(a), n = a;
  e.setEdge(n, r, { weight: d.weight }, i);
}
function mr(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), o = n.edgeLabel, r;
    for (e.setEdge(n.edgeObj, o); n.dummy; )
      r = e.successors(t)[0], e.removeNode(t), o.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (o.x = n.x, o.y = n.y, o.width = n.width, o.height = n.height), t = r, n = e.node(t);
  });
}
const { applyWithChunking: gr } = F;
var Ae = {
  longestPath: br,
  slack: yr
};
function br(e) {
  var t = {};
  function n(o) {
    var r = e.node(o);
    if (Object.hasOwn(t, o))
      return r.rank;
    t[o] = !0;
    let s = e.outEdges(o).map((d) => d == null ? Number.POSITIVE_INFINITY : n(d.w) - e.edge(d).minlen);
    var i = gr(Math.min, s);
    return i === Number.POSITIVE_INFINITY && (i = 0), r.rank = i;
  }
  e.sources().forEach(n);
}
function yr(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var vr = W.Graph, _e = Ae.slack, nn = Er;
function Er(e) {
  var t = new vr({ directed: !1 }), n = e.nodes()[0], o = e.nodeCount();
  t.setNode(n, {});
  for (var r, s; xr(t, e) < o; )
    r = kr(t, e), s = t.hasNode(r.v) ? _e(e, r) : -_e(e, r), Cr(t, e, s);
  return t;
}
function xr(e, t) {
  function n(o) {
    t.nodeEdges(o).forEach((r) => {
      var s = r.v, i = o === s ? r.w : s;
      !e.hasNode(i) && !_e(t, r) && (e.setNode(i, {}), e.setEdge(o, i, {}), n(i));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function kr(e, t) {
  return t.edges().reduce((o, r) => {
    let s = Number.POSITIVE_INFINITY;
    return e.hasNode(r.v) !== e.hasNode(r.w) && (s = _e(t, r)), s < o[0] ? [s, r] : o;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Cr(e, t, n) {
  e.nodes().forEach((o) => t.node(o).rank += n);
}
var Lr = nn, gt = Ae.slack, _r = Ae.longestPath, Sr = W.alg.preorder, Nr = W.alg.postorder, Ir = F.simplify, Or = te;
te.initLowLimValues = nt;
te.initCutValues = tt;
te.calcCutValue = on;
te.leaveEdge = sn;
te.enterEdge = dn;
te.exchangeEdges = an;
function te(e) {
  e = Ir(e), _r(e);
  var t = Lr(e);
  nt(t), tt(t, e);
  for (var n, o; n = sn(t); )
    o = dn(t, e, n), an(t, e, n, o);
}
function tt(e, t) {
  var n = Nr(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((o) => $r(e, t, o));
}
function $r(e, t, n) {
  var o = e.node(n), r = o.parent;
  e.edge(n, r).cutvalue = on(e, t, n);
}
function on(e, t, n) {
  var o = e.node(n), r = o.parent, s = !0, i = t.edge(n, r), d = 0;
  return i || (s = !1, i = t.edge(r, n)), d = i.weight, t.nodeEdges(n).forEach((l) => {
    var a = l.v === n, c = a ? l.w : l.v;
    if (c !== r) {
      var f = a === s, h = t.edge(l).weight;
      if (d += f ? h : -h, Ar(e, n, c)) {
        var u = e.edge(n, c).cutvalue;
        d += f ? -u : u;
      }
    }
  }), d;
}
function nt(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), rn(e, {}, 1, t);
}
function rn(e, t, n, o, r) {
  var s = n, i = e.node(o);
  return t[o] = !0, e.neighbors(o).forEach((d) => {
    Object.hasOwn(t, d) || (n = rn(e, t, n, d, o));
  }), i.low = s, i.lim = n++, r ? i.parent = r : delete i.parent, n;
}
function sn(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function dn(e, t, n) {
  var o = n.v, r = n.w;
  t.hasEdge(o, r) || (o = n.w, r = n.v);
  var s = e.node(o), i = e.node(r), d = s, l = !1;
  s.lim > i.lim && (d = i, l = !0);
  var a = t.edges().filter((c) => l === bt(e, e.node(c.v), d) && l !== bt(e, e.node(c.w), d));
  return a.reduce((c, f) => gt(t, f) < gt(t, c) ? f : c);
}
function an(e, t, n, o) {
  var r = n.v, s = n.w;
  e.removeEdge(r, s), e.setEdge(o.v, o.w, {}), nt(e), tt(e, t), Mr(e, t);
}
function Mr(e, t) {
  var n = e.nodes().find((r) => !t.node(r).parent), o = Sr(e, n);
  o = o.slice(1), o.forEach((r) => {
    var s = e.node(r).parent, i = t.edge(r, s), d = !1;
    i || (i = t.edge(s, r), d = !0), t.node(r).rank = t.node(s).rank + (d ? i.minlen : -i.minlen);
  });
}
function Ar(e, t, n) {
  return e.hasEdge(t, n);
}
function bt(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var jr = Ae, ln = jr.longestPath, Tr = nn, Rr = Or, Pr = Br;
function Br(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      yt(e);
      break;
    case "tight-tree":
      Fr(e);
      break;
    case "longest-path":
      Dr(e);
      break;
    case "none":
      break;
    default:
      yt(e);
  }
}
var Dr = ln;
function Fr(e) {
  ln(e), Tr(e);
}
function yt(e) {
  Rr(e);
}
var Gr = Hr;
function Hr(e) {
  let t = Vr(e);
  e.graph().dummyChains.forEach((n) => {
    let o = e.node(n), r = o.edgeObj, s = qr(e, t, r.v, r.w), i = s.path, d = s.lca, l = 0, a = i[l], c = !0;
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
function qr(e, t, n, o) {
  let r = [], s = [], i = Math.min(t[n].low, t[o].low), d = Math.max(t[n].lim, t[o].lim), l, a;
  l = n;
  do
    l = e.parent(l), r.push(l);
  while (l && (t[l].low > i || d > t[l].lim));
  for (a = l, l = o; (l = e.parent(l)) !== a; )
    s.push(l);
  return { path: r.concat(s.reverse()), lca: a };
}
function Vr(e) {
  let t = {}, n = 0;
  function o(r) {
    let s = n;
    e.children(r).forEach(o), t[r] = { low: s, lim: n++ };
  }
  return e.children().forEach(o), t;
}
let Se = F;
var Yr = {
  run: zr,
  cleanup: Wr
};
function zr(e) {
  let t = Se.addDummyNode(e, "root", {}, "_root"), n = Ur(e), o = Object.values(n), r = Se.applyWithChunking(Math.max, o) - 1, s = 2 * r + 1;
  e.graph().nestingRoot = t, e.edges().forEach((d) => e.edge(d).minlen *= s);
  let i = Kr(e) + 1;
  e.children().forEach((d) => cn(e, t, s, i, r, n, d)), e.graph().nodeRankFactor = s;
}
function cn(e, t, n, o, r, s, i) {
  let d = e.children(i);
  if (!d.length) {
    i !== t && e.setEdge(t, i, { weight: 0, minlen: n });
    return;
  }
  let l = Se.addBorderNode(e, "_bt"), a = Se.addBorderNode(e, "_bb"), c = e.node(i);
  e.setParent(l, i), c.borderTop = l, e.setParent(a, i), c.borderBottom = a, d.forEach((f) => {
    cn(e, t, n, o, r, s, f);
    let h = e.node(f), u = h.borderTop ? h.borderTop : f, p = h.borderBottom ? h.borderBottom : f, w = h.borderTop ? o : 2 * o, x = u !== p ? 1 : r - s[i] + 1;
    e.setEdge(l, u, {
      weight: w,
      minlen: x,
      nestingEdge: !0
    }), e.setEdge(p, a, {
      weight: w,
      minlen: x,
      nestingEdge: !0
    });
  }), e.parent(i) || e.setEdge(t, l, { weight: 0, minlen: r + s[i] });
}
function Ur(e) {
  var t = {};
  function n(o, r) {
    var s = e.children(o);
    s && s.length && s.forEach((i) => n(i, r + 1)), t[o] = r;
  }
  return e.children().forEach((o) => n(o, 1)), t;
}
function Kr(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function Wr(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var o = e.edge(n);
    o.nestingEdge && e.removeEdge(n);
  });
}
let Xr = F;
var Jr = Qr;
function Qr(e) {
  function t(n) {
    let o = e.children(n), r = e.node(n);
    if (o.length && o.forEach(t), Object.hasOwn(r, "minRank")) {
      r.borderLeft = [], r.borderRight = [];
      for (let s = r.minRank, i = r.maxRank + 1; s < i; ++s)
        vt(e, "borderLeft", "_bl", n, r, s), vt(e, "borderRight", "_br", n, r, s);
    }
  }
  e.children().forEach(t);
}
function vt(e, t, n, o, r, s) {
  let i = { width: 0, height: 0, rank: s, borderType: t }, d = r[t][s - 1], l = Xr.addDummyNode(e, "border", i, n);
  r[t][s] = l, e.setParent(l, o), d && e.setEdge(d, l, { weight: 1 });
}
var Zr = {
  adjust: es,
  undo: ts
};
function es(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && fn(e);
}
function ts(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && ns(e), (t === "lr" || t === "rl") && (os(e), fn(e));
}
function fn(e) {
  e.nodes().forEach((t) => Et(e.node(t))), e.edges().forEach((t) => Et(e.edge(t)));
}
function Et(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function ns(e) {
  e.nodes().forEach((t) => Pe(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Pe), Object.hasOwn(n, "y") && Pe(n);
  });
}
function Pe(e) {
  e.y = -e.y;
}
function os(e) {
  e.nodes().forEach((t) => Be(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Be), Object.hasOwn(n, "x") && Be(n);
  });
}
function Be(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let xt = F;
var rs = ss;
function ss(e) {
  let t = {}, n = e.nodes().filter((l) => !e.children(l).length), o = n.map((l) => e.node(l).rank), r = xt.applyWithChunking(Math.max, o), s = xt.range(r + 1).map(() => []);
  function i(l) {
    if (t[l]) return;
    t[l] = !0;
    let a = e.node(l);
    s[a.rank].push(l), e.successors(l).forEach(i);
  }
  return n.sort((l, a) => e.node(l).rank - e.node(a).rank).forEach(i), s;
}
let is = F.zipObject;
var ds = as;
function as(e, t) {
  let n = 0;
  for (let o = 1; o < t.length; ++o)
    n += ls(e, t[o - 1], t[o]);
  return n;
}
function ls(e, t, n) {
  let o = is(n, n.map((a, c) => c)), r = t.flatMap((a) => e.outEdges(a).map((c) => ({ pos: o[c.w], weight: e.edge(c).weight })).sort((c, f) => c.pos - f.pos)), s = 1;
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
var cs = fs;
function fs(e, t = []) {
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
let us = F;
var hs = ps;
function ps(e, t) {
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
  return ws(o);
}
function ws(e) {
  let t = [];
  function n(r) {
    return (s) => {
      s.merged || (s.barycenter === void 0 || r.barycenter === void 0 || s.barycenter >= r.barycenter) && ms(r, s);
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
  return t.filter((r) => !r.merged).map((r) => us.pick(r, ["vs", "i", "barycenter", "weight"]));
}
function ms(e, t) {
  let n = 0, o = 0;
  e.weight && (n += e.barycenter * e.weight, o += e.weight), t.weight && (n += t.barycenter * t.weight, o += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / o, e.weight = o, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let gs = F;
var bs = ys;
function ys(e, t) {
  let n = gs.partition(e, (c) => Object.hasOwn(c, "barycenter")), o = n.lhs, r = n.rhs.sort((c, f) => f.i - c.i), s = [], i = 0, d = 0, l = 0;
  o.sort(vs(!!t)), l = kt(s, r, l), o.forEach((c) => {
    l += c.vs.length, s.push(c.vs), i += c.barycenter * c.weight, d += c.weight, l = kt(s, r, l);
  });
  let a = { vs: s.flat(!0) };
  return d && (a.barycenter = i / d, a.weight = d), a;
}
function kt(e, t, n) {
  let o;
  for (; t.length && (o = t[t.length - 1]).i <= n; )
    t.pop(), e.push(o.vs), n++;
  return n;
}
function vs(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let Es = cs, xs = hs, ks = bs;
var Cs = un;
function un(e, t, n, o) {
  let r = e.children(t), s = e.node(t), i = s ? s.borderLeft : void 0, d = s ? s.borderRight : void 0, l = {};
  i && (r = r.filter((h) => h !== i && h !== d));
  let a = Es(e, r);
  a.forEach((h) => {
    if (e.children(h.v).length) {
      let u = un(e, h.v, n, o);
      l[h.v] = u, Object.hasOwn(u, "barycenter") && _s(h, u);
    }
  });
  let c = xs(a, n);
  Ls(c, l);
  let f = ks(c, o);
  if (i && (f.vs = [i, f.vs, d].flat(!0), e.predecessors(i).length)) {
    let h = e.node(e.predecessors(i)[0]), u = e.node(e.predecessors(d)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + h.order + u.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function Ls(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((o) => t[o] ? t[o].vs : o);
  });
}
function _s(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let Ss = W.Graph, Ns = F;
var Is = Os;
function Os(e, t, n, o) {
  o || (o = e.nodes());
  let r = $s(e), s = new Ss({ compound: !0 }).setGraph({ root: r }).setDefaultNodeLabel((i) => e.node(i));
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
function $s(e) {
  for (var t; e.hasNode(t = Ns.uniqueId("_root")); ) ;
  return t;
}
var Ms = As;
function As(e, t, n) {
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
let js = rs, Ts = ds, Rs = Cs, Ps = Is, Bs = Ms, Ds = W.Graph, ye = F;
var Fs = hn;
function hn(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, hn);
    return;
  }
  let n = ye.maxRank(e), o = Ct(e, ye.range(1, n + 1), "inEdges"), r = Ct(e, ye.range(n - 1, -1, -1), "outEdges"), s = js(e);
  if (Lt(e, s), t && t.disableOptimalOrderHeuristic)
    return;
  let i = Number.POSITIVE_INFINITY, d;
  for (let l = 0, a = 0; a < 4; ++l, ++a) {
    Gs(l % 2 ? o : r, l % 4 >= 2), s = ye.buildLayerMatrix(e);
    let c = Ts(e, s);
    c < i && (a = 0, d = Object.assign({}, s), i = c);
  }
  Lt(e, d);
}
function Ct(e, t, n) {
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
    return Ps(e, s, n, o.get(s) || []);
  });
}
function Gs(e, t) {
  let n = new Ds();
  e.forEach(function(o) {
    let r = o.graph().root, s = Rs(o, r, n, t);
    s.vs.forEach((i, d) => o.node(i).order = d), Bs(o, n, s.vs);
  });
}
function Lt(e, t) {
  Object.values(t).forEach((n) => n.forEach((o, r) => e.node(o).order = r));
}
let Hs = W.Graph, X = F;
var qs = {
  positionX: ei
};
function Vs(e, t) {
  let n = {};
  function o(r, s) {
    let i = 0, d = 0, l = r.length, a = s[s.length - 1];
    return s.forEach((c, f) => {
      let h = zs(e, c), u = h ? e.node(h).order : l;
      (h || c === a) && (s.slice(d, f + 1).forEach((p) => {
        e.predecessors(p).forEach((w) => {
          let x = e.node(w), v = x.order;
          (v < i || u < v) && !(x.dummy && e.node(p).dummy) && pn(n, w, p);
        });
      }), d = f + 1, i = u);
    }), s;
  }
  return t.length && t.reduce(o), n;
}
function Ys(e, t) {
  let n = {};
  function o(s, i, d, l, a) {
    let c;
    X.range(i, d).forEach((f) => {
      c = s[f], e.node(c).dummy && e.predecessors(c).forEach((h) => {
        let u = e.node(h);
        u.dummy && (u.order < l || u.order > a) && pn(n, h, c);
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
function zs(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function pn(e, t, n) {
  if (t > n) {
    let r = t;
    t = n, n = r;
  }
  let o = e[t];
  o || (e[t] = o = {}), o[n] = !0;
}
function Us(e, t, n) {
  if (t > n) {
    let o = t;
    t = n, n = o;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function Ks(e, t, n, o) {
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
        c = c.sort((h, u) => i[h] - i[u]);
        let f = (c.length - 1) / 2;
        for (let h = Math.floor(f), u = Math.ceil(f); h <= u; ++h) {
          let p = c[h];
          s[a] === a && l < i[p] && !Us(n, a, p) && (s[p] = a, s[a] = r[a] = r[p], l = i[p]);
        }
      }
    });
  }), { root: r, align: s };
}
function Ws(e, t, n, o, r) {
  let s = {}, i = Xs(e, t, n, r), d = r ? "borderLeft" : "borderRight";
  function l(f, h) {
    let u = i.nodes(), p = u.pop(), w = {};
    for (; p; )
      w[p] ? f(p) : (w[p] = !0, u.push(p), u = u.concat(h(p))), p = u.pop();
  }
  function a(f) {
    s[f] = i.inEdges(f).reduce((h, u) => Math.max(h, s[u.v] + i.edge(u)), 0);
  }
  function c(f) {
    let h = i.outEdges(f).reduce((p, w) => Math.min(p, s[w.w] - i.edge(w)), Number.POSITIVE_INFINITY), u = e.node(f);
    h !== Number.POSITIVE_INFINITY && u.borderType !== d && (s[f] = Math.max(s[f], h));
  }
  return l(a, i.predecessors.bind(i)), l(c, i.successors.bind(i)), Object.keys(o).forEach((f) => s[f] = s[n[f]]), s;
}
function Xs(e, t, n, o) {
  let r = new Hs(), s = e.graph(), i = ti(s.nodesep, s.edgesep, o);
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
function Js(e, t) {
  return Object.values(t).reduce((n, o) => {
    let r = Number.NEGATIVE_INFINITY, s = Number.POSITIVE_INFINITY;
    Object.entries(o).forEach(([d, l]) => {
      let a = ni(e, d) / 2;
      r = Math.max(l + a, r), s = Math.min(l - a, s);
    });
    const i = r - s;
    return i < n[0] && (n = [i, o]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Qs(e, t) {
  let n = Object.values(t), o = X.applyWithChunking(Math.min, n), r = X.applyWithChunking(Math.max, n);
  ["u", "d"].forEach((s) => {
    ["l", "r"].forEach((i) => {
      let d = s + i, l = e[d];
      if (l === t) return;
      let a = Object.values(l), c = o - X.applyWithChunking(Math.min, a);
      i !== "l" && (c = r - X.applyWithChunking(Math.max, a)), c && (e[d] = X.mapValues(l, (f) => f + c));
    });
  });
}
function Zs(e, t) {
  return X.mapValues(e.ul, (n, o) => {
    if (t)
      return e[t.toLowerCase()][o];
    {
      let r = Object.values(e).map((s) => s[o]).sort((s, i) => s - i);
      return (r[1] + r[2]) / 2;
    }
  });
}
function ei(e) {
  let t = X.buildLayerMatrix(e), n = Object.assign(
    Vs(e, t),
    Ys(e, t)
  ), o = {}, r;
  ["u", "d"].forEach((i) => {
    r = i === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((d) => {
      d === "r" && (r = r.map((f) => Object.values(f).reverse()));
      let l = (i === "u" ? e.predecessors : e.successors).bind(e), a = Ks(e, r, n, l), c = Ws(
        e,
        r,
        a.root,
        a.align,
        d === "r"
      );
      d === "r" && (c = X.mapValues(c, (f) => -f)), o[i + d] = c;
    });
  });
  let s = Js(e, o);
  return Qs(o, s), Zs(o, e.graph().align);
}
function ti(e, t, n) {
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
function ni(e, t) {
  return e.node(t).width;
}
let wn = F, oi = qs.positionX;
var ri = si;
function si(e) {
  e = wn.asNonCompoundGraph(e), ii(e), Object.entries(oi(e)).forEach(([t, n]) => e.node(t).x = n);
}
function ii(e) {
  let t = wn.buildLayerMatrix(e), n = e.graph().ranksep, o = 0;
  t.forEach((r) => {
    const s = r.reduce((i, d) => {
      const l = e.node(d).height;
      return i > l ? i : l;
    }, 0);
    r.forEach((i) => e.node(i).y = o + s / 2), o += s + n;
  });
}
let _t = ar, St = hr, di = Pr, ai = F.normalizeRanks, li = Gr, ci = F.removeEmptyRanks, Nt = Yr, fi = Jr, It = Zr, ui = Fs, hi = ri, Y = F, pi = W.Graph;
var wi = mi;
function mi(e, t) {
  let n = t && t.debugTiming ? Y.time : Y.notime;
  n("layout", () => {
    let o = n("  buildLayoutGraph", () => _i(e));
    n("  runLayout", () => gi(o, n, t)), n("  updateInputGraph", () => bi(e, o));
  });
}
function gi(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => Si(e)), t("    removeSelfEdges", () => Ri(e)), t("    acyclic", () => _t.run(e)), t("    nestingGraph.run", () => Nt.run(e)), t("    rank", () => di(Y.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => Ni(e)), t("    removeEmptyRanks", () => ci(e)), t("    nestingGraph.cleanup", () => Nt.cleanup(e)), t("    normalizeRanks", () => ai(e)), t("    assignRankMinMax", () => Ii(e)), t("    removeEdgeLabelProxies", () => Oi(e)), t("    normalize.run", () => St.run(e)), t("    parentDummyChains", () => li(e)), t("    addBorderSegments", () => fi(e)), t("    order", () => ui(e, n)), t("    insertSelfEdges", () => Pi(e)), t("    adjustCoordinateSystem", () => It.adjust(e)), t("    position", () => hi(e)), t("    positionSelfEdges", () => Bi(e)), t("    removeBorderNodes", () => Ti(e)), t("    normalize.undo", () => St.undo(e)), t("    fixupEdgeLabelCoords", () => Ai(e)), t("    undoCoordinateSystem", () => It.undo(e)), t("    translateGraph", () => $i(e)), t("    assignNodeIntersects", () => Mi(e)), t("    reversePoints", () => ji(e)), t("    acyclic.undo", () => _t.undo(e));
}
function bi(e, t) {
  e.nodes().forEach((n) => {
    let o = e.node(n), r = t.node(n);
    o && (o.x = r.x, o.y = r.y, o.rank = r.rank, t.children(n).length && (o.width = r.width, o.height = r.height));
  }), e.edges().forEach((n) => {
    let o = e.edge(n), r = t.edge(n);
    o.points = r.points, Object.hasOwn(r, "x") && (o.x = r.x, o.y = r.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let yi = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], vi = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, Ei = ["acyclicer", "ranker", "rankdir", "align"], xi = ["width", "height", "rank"], Ot = { width: 0, height: 0 }, ki = ["minlen", "weight", "width", "height", "labeloffset"], Ci = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, Li = ["labelpos"];
function _i(e) {
  let t = new pi({ multigraph: !0, compound: !0 }), n = Fe(e.graph());
  return t.setGraph(Object.assign(
    {},
    vi,
    De(n, yi),
    Y.pick(n, Ei)
  )), e.nodes().forEach((o) => {
    let r = Fe(e.node(o));
    const s = De(r, xi);
    Object.keys(Ot).forEach((i) => {
      s[i] === void 0 && (s[i] = Ot[i]);
    }), t.setNode(o, s), t.setParent(o, e.parent(o));
  }), e.edges().forEach((o) => {
    let r = Fe(e.edge(o));
    t.setEdge(o, Object.assign(
      {},
      Ci,
      De(r, ki),
      Y.pick(r, Li)
    ));
  }), t;
}
function Si(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let o = e.edge(n);
    o.minlen *= 2, o.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? o.width += o.labeloffset : o.height += o.labeloffset);
  });
}
function Ni(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let o = e.node(t.v), s = { rank: (e.node(t.w).rank - o.rank) / 2 + o.rank, e: t };
      Y.addDummyNode(e, "edge-proxy", s, "_ep");
    }
  });
}
function Ii(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let o = e.node(n);
    o.borderTop && (o.minRank = e.node(o.borderTop).rank, o.maxRank = e.node(o.borderBottom).rank, t = Math.max(t, o.maxRank));
  }), e.graph().maxRank = t;
}
function Oi(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function $i(e) {
  let t = Number.POSITIVE_INFINITY, n = 0, o = Number.POSITIVE_INFINITY, r = 0, s = e.graph(), i = s.marginx || 0, d = s.marginy || 0;
  function l(a) {
    let c = a.x, f = a.y, h = a.width, u = a.height;
    t = Math.min(t, c - h / 2), n = Math.max(n, c + h / 2), o = Math.min(o, f - u / 2), r = Math.max(r, f + u / 2);
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
function Mi(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), o = e.node(t.v), r = e.node(t.w), s, i;
    n.points ? (s = n.points[0], i = n.points[n.points.length - 1]) : (n.points = [], s = r, i = o), n.points.unshift(Y.intersectRect(o, s)), n.points.push(Y.intersectRect(r, i));
  });
}
function Ai(e) {
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
function ji(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function Ti(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), o = e.node(n.borderTop), r = e.node(n.borderBottom), s = e.node(n.borderLeft[n.borderLeft.length - 1]), i = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(i.x - s.x), n.height = Math.abs(r.y - o.y), n.x = s.x + n.width / 2, n.y = o.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function Ri(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function Pi(e) {
  var t = Y.buildLayerMatrix(e);
  t.forEach((n) => {
    var o = 0;
    n.forEach((r, s) => {
      var i = e.node(r);
      i.order = s + o, (i.selfEdges || []).forEach((d) => {
        Y.addDummyNode(e, "selfedge", {
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
function Bi(e) {
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
function De(e, t) {
  return Y.mapValues(Y.pick(e, t), Number);
}
function Fe(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, o]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = o;
  }), t;
}
let Di = F, Fi = W.Graph;
var Gi = {
  debugOrdering: Hi
};
function Hi(e) {
  let t = Di.buildLayerMatrix(e), n = new Fi({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((o) => {
    n.setNode(o, { label: o }), n.setParent(o, "layer" + e.node(o).rank);
  }), e.edges().forEach((o) => n.setEdge(o.v, o.w, {}, o.name)), t.forEach((o, r) => {
    let s = "layer" + r;
    n.setNode(s, { rank: "same" }), o.reduce((i, d) => (n.setEdge(i, d, { style: "invis" }), d));
  }), n;
}
var qi = "1.1.8", Vi = {
  graphlib: W,
  layout: wi,
  debug: Gi,
  util: {
    time: F.time,
    notime: F.notime
  },
  version: qi
};
const $t = /* @__PURE__ */ Fn(Vi);
function Mt(e, t) {
  const n = dt[e.type] ?? dt.process;
  if (e.type === "compound") {
    const s = (t == null ? void 0 : t.w) ?? e.w ?? $e(e.label, e.rows, n.w), i = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, Bt(e.rows));
    return { w: s, h: i };
  }
  const o = (t == null ? void 0 : t.w) ?? e.w ?? n.w, r = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, Gt(e.type, e.label, o));
  return { w: o, h: r };
}
function Ne(e, t) {
  const n = new $t.graphlib.Graph({ multigraph: !0 });
  n.setGraph({ rankdir: e.direction ?? "TB", nodesep: 50, ranksep: 60, marginx: 20, marginy: 20 }), n.setDefaultEdgeLabel(() => ({}));
  for (const a of e.nodes) {
    const { w: c, h: f } = Mt(a, t == null ? void 0 : t.nodes[a.id]);
    n.setNode(a.id, { width: c, height: f });
  }
  for (const a of e.edges)
    n.setEdge(a.from, a.to, {}, a.id);
  $t.layout(n);
  const o = e.nodes.map((a) => {
    const c = t == null ? void 0 : t.nodes[a.id], { w: f, h } = Mt(a, c), u = n.node(a.id);
    return {
      ...a,
      x: (c == null ? void 0 : c.x) ?? u.x,
      y: (c == null ? void 0 : c.y) ?? u.y,
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
function Ge(e, t) {
  const n = { nodes: {}, edges: {} };
  for (const o of e) n.nodes[o.id] = { x: o.x, y: o.y, w: o.w, h: o.h };
  for (const o of t) n.edges[o.id] = { points: o.points };
  return n;
}
const He = 5, mn = 13, gn = 8;
function Yi(e) {
  const t = (e ?? []).filter((n) => n.color).length;
  return t ? t * mn + gn : 0;
}
function At(e, t, n, o) {
  const r = I("g", { class: "dd-flow-pips" });
  let s = 0;
  for (const i of t) {
    const d = ue(e, [i.key]);
    if (!i.color || !d) continue;
    const l = n - gn - He - s * mn, a = I("circle", {
      cx: l,
      cy: o,
      r: d === 3 ? He + 1 : He,
      fill: d === 1 ? "none" : i.color,
      stroke: i.color,
      "stroke-width": d === 1 ? 2 : 1,
      class: `dd-flow-pip dd-flow-pip-${d}`,
      "data-filter-key": i.key
    }), c = I("title", {});
    c.textContent = `${i.label ?? i.key}: ${d}`, a.appendChild(c), r.appendChild(a), s += 1;
  }
  return s ? r : null;
}
function zi(e, t, n) {
  var s;
  for (const i of e.querySelectorAll(".dd-flow-pips")) i.remove();
  if (!n.some((i) => i.color)) return;
  const o = new Map(t.map((i) => [i.id, i])), r = (i, d) => Number((i == null ? void 0 : i.getAttribute(d)) ?? Number.NaN);
  for (const i of e.querySelectorAll(".dd-flow-node")) {
    const d = o.get(i.getAttribute("data-node-id") ?? ""), l = i.firstElementChild;
    if (!d || (l == null ? void 0 : l.tagName.toLowerCase()) !== "rect") continue;
    const a = r(l, "x") + r(l, "width"), f = r(l, "y") + ((s = d.rows) != null && s.length ? re : r(l, "height")) / 2, h = At(d.levels, n, a, f);
    h && i.appendChild(h);
    const u = new Map((d.rows ?? []).map((p) => [p.id, p]));
    for (const p of i.querySelectorAll(".dd-flow-node-row")) {
      const w = p.querySelector("rect"), x = u.get(p.getAttribute("data-row-id") ?? ""), v = x && At(x.levels, n, a, r(w, "y") + r(w, "height") / 2);
      v && p.appendChild(v);
    }
  }
}
const Ui = 3, jt = [
  "dd-flow-level-1",
  "dd-flow-level-2",
  "dd-flow-level-3",
  "dd-flow-level-none",
  "dd-flow-level-branch"
], bn = (e) => e === null ? [] : typeof e == "string" ? [e] : e;
function ue(e, t) {
  const n = Math.max(0, ...t.map((o) => Math.floor((e == null ? void 0 : e[o]) ?? 0)));
  return Math.min(Ui, n);
}
function Ki(e, t, n, o) {
  var a;
  const r = bn(o);
  for (const c of e.querySelectorAll(jt.map((f) => `.${f}`).join(",")))
    c.classList.remove(...jt);
  const s = { 1: 0, 2: 0, 3: 0 };
  if (!r.length) return s;
  const i = /* @__PURE__ */ new Map();
  for (const c of e.querySelectorAll(".dd-flow-node")) {
    const f = c.getAttribute("data-node-id");
    f && i.set(f, c);
  }
  const d = /* @__PURE__ */ new Set(), l = (c) => {
    for (const f of ee(n.parentsOf, c)) d.add(f);
  };
  for (const c of t) {
    const f = i.get(c.id);
    if (!f) continue;
    const h = ue(c.levels, r);
    h && (f.classList.add(`dd-flow-level-${h}`), s[h] += 1, l(c.id));
    const u = /* @__PURE__ */ new Map();
    for (const p of f.querySelectorAll(".dd-flow-node-row")) {
      const w = p.getAttribute("data-row-id");
      w && u.set(w, p);
    }
    for (const p of c.rows ?? []) {
      const w = u.get(p.id);
      if (!w) continue;
      const x = ue(p.levels, r);
      if (!x) {
        w.classList.add("dd-flow-level-none");
        continue;
      }
      w.classList.add(`dd-flow-level-${x}`), s[x] += 1, d.add(c.id), l(c.id);
    }
  }
  for (const c of d) (a = i.get(c)) == null || a.classList.add("dd-flow-level-branch");
  return s;
}
function Wi(e, t, n) {
  const o = bn(n), r = /* @__PURE__ */ new Map();
  for (const l of t) r.set(l.target, [...r.get(l.target) ?? [], l.source]);
  const s = /* @__PURE__ */ new Map();
  for (const l of e) {
    const a = (l.rows ?? []).filter((c) => ue(c.levels, o) > 0);
    (ue(l.levels, o) > 0 || a.length) && s.set(l.id, a);
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
function Xi(e, t, n = "All") {
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
const ve = 40;
function Ue(e) {
  const t = e.type === "conditional" ? "conditional" : "default", n = e.type === "dashed" ? "dashed" : "solid";
  return {
    kind: e.kind ?? t,
    routing: e.routing ?? "orthogonal",
    stroke: e.stroke ?? n
  };
}
function Ji(e, t) {
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
function Qi(e, t) {
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
function Zi(e, t, n = "orthogonal") {
  if (n === "straight") return Ji(e, t);
  if (n === "bezier") return Qi(e, t);
  const o = t.x - e.x, r = t.y - e.y;
  if (Math.abs(r) >= Math.abs(o) || o === 0) {
    const a = r >= 0 ? 1 : -1, c = { x: e.x, y: e.y + a * e.h / 2 }, f = { x: t.x, y: t.y - a * t.h / 2 };
    if (c.x === f.x) return [c, f];
    const h = (c.y + f.y) / 2;
    return [c, { x: c.x, y: h }, { x: f.x, y: h }, f];
  }
  const s = o >= 0 ? 1 : -1, i = { x: e.x + s * e.w / 2, y: e.y }, d = { x: t.x - s * t.w / 2, y: t.y };
  if (i.y === d.y) return [i, d];
  const l = (i.x + d.x) / 2;
  return [i, { x: l, y: i.y }, { x: l, y: d.y }, d];
}
const ed = 10, Tt = 40;
function yn(e) {
  const [t, n] = [e[0], e[e.length - 1]], o = n.x - t.x, r = n.y - t.y;
  if (Math.abs(o) >= Math.abs(r)) {
    const i = Math.max(Tt, Math.abs(o) / 2) * Math.sign(o || 1);
    return `M ${t.x} ${t.y} C ${t.x + i} ${t.y}, ${n.x - i} ${n.y}, ${n.x} ${n.y}`;
  }
  const s = Math.max(Tt, Math.abs(r) / 2) * Math.sign(r || 1);
  return `M ${t.x} ${t.y} C ${t.x} ${t.y + s}, ${n.x} ${n.y - s}, ${n.x} ${n.y}`;
}
function td(e, t) {
  if (!t || e.length <= 2) return nd(e);
  const n = [`M ${e[0].x} ${e[0].y}`];
  for (let r = 1; r < e.length - 1; r++) {
    const s = e[r - 1], i = e[r], d = e[r + 1], l = Math.hypot(i.x - s.x, i.y - s.y), a = Math.hypot(d.x - i.x, d.y - i.y), c = Math.min(ed, l / 2, a / 2), f = { x: i.x - (i.x - s.x) / l * c, y: i.y - (i.y - s.y) / l * c }, h = { x: i.x + (d.x - i.x) / a * c, y: i.y + (d.y - i.y) / a * c };
    n.push(`L ${f.x} ${f.y}`, `Q ${i.x} ${i.y} ${h.x} ${h.y}`);
  }
  const o = e[e.length - 1];
  return n.push(`L ${o.x} ${o.y}`), n.join(" ");
}
function nd(e) {
  return e.map((t, n) => `${n === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
}
const od = {
  solid: null,
  dashed: "6,4",
  dotted: "1.5,4"
};
function rd(e) {
  return e.filter((t, n) => n === 0 || t.x !== e[n - 1].x || t.y !== e[n - 1].y);
}
function sd(e, t, n, o = {}) {
  const r = e.points.length >= 2 ? e.points : Zi(t, n, Ue(e).routing), s = rd(r), { kind: i, routing: d, stroke: l } = Ue(e), a = I("g", {
    class: `dd-flow-edge dd-flow-edge-${i}${o.selected ? " is-selected" : ""}`,
    "data-edge-id": e.id
  }), c = d === "bezier" && s.length === 2 ? yn(s) : td(s, d === "curved");
  a.appendChild(
    I("path", { d: c, fill: "none", stroke: "transparent", "stroke-width": 16, class: "dd-flow-edge-hit" })
  );
  const f = I("path", {
    d: c,
    fill: "none",
    stroke: i === "conditional" ? "var(--dd-flow-edge-conditional-stroke)" : "var(--dd-flow-edge-stroke)",
    "stroke-width": 2,
    "marker-end": "url(#dd-flow-arrow)"
  }), h = od[l];
  if (h && f.setAttribute("stroke-dasharray", h), a.appendChild(f), e.label) {
    const u = s[Math.floor((s.length - 1) / 2)], p = s[Math.floor((s.length - 1) / 2) + 1] ?? u, w = (u.x + p.x) / 2, x = (u.y + p.y) / 2, v = Math.max(24, e.label.length * 7 + 12);
    a.appendChild(
      I("rect", {
        x: w - v / 2,
        y: x - 10,
        width: v,
        height: 20,
        rx: 4,
        fill: "var(--dd-flow-edge-label-bg)",
        class: "dd-flow-edge-label-bg"
      })
    );
    const b = I("text", {
      x: w,
      y: x,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "var(--dd-flow-edge-label-text)",
      class: "dd-flow-edge-label"
    });
    b.textContent = e.label, a.appendChild(b);
  }
  return a;
}
function id(e, t, n) {
  const o = I("g", {
    class: `dd-flow-row-edge${e.flagged ? " dd-flow-row-edge-flagged" : ""}`,
    "data-row-edge-id": Je(e)
  }), r = yn([t, n]);
  return o.appendChild(
    I("path", {
      d: r,
      fill: "none",
      stroke: "var(--dd-flow-row-edge-stroke, var(--dd-flow-edge-stroke))",
      "stroke-width": 1.5,
      "stroke-dasharray": "3,3"
    })
  ), o;
}
function dd() {
  const e = I("defs", {}), t = I("marker", {
    id: "dd-flow-arrow",
    viewBox: "0 0 10 10",
    refX: 9,
    refY: 5,
    markerWidth: 8,
    markerHeight: 8,
    orient: "auto-start-reverse"
  });
  return t.appendChild(I("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "var(--dd-flow-edge-stroke)" })), e.appendChild(t), e;
}
function ot(e, t, n = {}) {
  var v, b, y, E;
  const o = new Map(e.map((g) => [g.id, g]));
  let r = 1 / 0, s = 1 / 0, i = -1 / 0, d = -1 / 0;
  for (const g of e)
    r = Math.min(r, g.x - g.w / 2), s = Math.min(s, g.y - g.h / 2), i = Math.max(i, g.x + g.w / 2), d = Math.max(d, g.y + g.h / 2);
  e.length || (r = 0, s = 0, i = 200, d = 100);
  const l = i - r + ve * 2, a = d - s + ve * 2, c = ve - r, f = ve - s, h = I("svg", {
    class: "dd-flow-svg",
    viewBox: `0 0 ${l} ${a}`,
    width: l,
    height: a
  });
  h.appendChild(dd());
  const u = I("g", { class: "dd-flow-world", transform: `translate(${c}, ${f})` }), p = I("g", { class: "dd-flow-edges" });
  for (const g of t) {
    const A = o.get(g.from), C = o.get(g.to);
    !A || !C || p.appendChild(sd(g, A, C, { selected: g.id === n.selectedEdgeId }));
  }
  u.appendChild(p);
  const w = (((v = n.selectedNodeIds) == null ? void 0 : v.size) ?? 0) > 1, x = I("g", { class: "dd-flow-nodes" });
  for (const g of e) {
    const A = ((b = n.selectedNodeIds) == null ? void 0 : b.has(g.id)) ?? !1, C = !w && (g.id === n.selectedNodeId || A), M = ((y = n.selectedRowKey) == null ? void 0 : y.nodeId) === g.id ? n.selectedRowKey.rowId : null;
    x.appendChild(Pn(g, { selected: C, multiselected: w && A, selectedRowId: M }));
  }
  if (u.appendChild(x), (E = n.rowEdges) != null && E.length) {
    const g = I("g", { class: "dd-flow-row-edges" });
    for (const A of n.rowEdges) {
      const C = o.get(A.sourceNode), M = o.get(A.targetNode);
      if (!C || !M) continue;
      const T = C.x <= M.x, _ = at(C, A.sourceRow, T ? "right" : "left"), j = at(M, A.targetRow, T ? "left" : "right");
      !_ || !j || g.appendChild(id(A, _, j));
    }
    u.appendChild(g);
  }
  return h.appendChild(u), h;
}
const Ie = {
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
Ie.host = {
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
const qe = "bam";
function fe(e, t) {
  const n = Ie[t ?? qe] ?? Ie[qe];
  e.setAttribute("data-dd-flow-theme", t ?? qe);
  for (const [o, r] of Object.entries(n.vars))
    e.style.setProperty(`--dd-flow-${o}`, r);
}
function Ud(e, t) {
  Ie[e] = t;
}
const ad = 0.2, ld = 4, cd = 4, fd = 300, ud = 30;
function Ke(e) {
  const t = e.offsetWidth, n = e.getBoundingClientRect().width;
  return t > 0 && n > 0 ? n / t : 1;
}
function We(e, t, n) {
  const o = e.getBoundingClientRect(), r = Ke(e);
  return { x: (t - o.left) / r, y: (n - o.top) / r };
}
const le = "ddFlowPanned";
function vn(e, t, n = {}) {
  var S, R, V, ne, de;
  const o = n.minScale ?? ad, r = n.maxScale ?? ld, s = n.maxFitScale ?? 1, i = Number(t.getAttribute("width")) || 1, d = Number(t.getAttribute("height")) || 1, l = 24, a = t.querySelector("g.dd-flow-world");
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
  c.setAttribute("class", "dd-flow-pz"), (S = a.parentNode) == null || S.insertBefore(c, a), c.appendChild(a), e.classList.add("dd-flow-has-viewport");
  let f = ((R = n.initial) == null ? void 0 : R.scale) ?? 1, h = ((V = n.initial) == null ? void 0 : V.tx) ?? 0, u = ((ne = n.initial) == null ? void 0 : ne.ty) ?? 0, p = ((de = n.initial) == null ? void 0 : de.userAdjusted) ?? !1, w = o;
  const x = () => {
    c.setAttribute("transform", `translate(${h}, ${u}) scale(${f})`);
  }, v = () => {
    const O = e.getBoundingClientRect(), N = Math.max(1, Math.round(e.offsetWidth || O.width)), P = Math.max(1, Math.round(e.offsetHeight || O.height));
    return t.setAttribute("width", String(N)), t.setAttribute("height", String(P)), t.setAttribute("viewBox", `0 0 ${N} ${P}`), { w: N, h: P };
  }, b = () => {
    const O = e.getBoundingClientRect(), N = a.getBoundingClientRect();
    if (!N.width || !N.height || !f) return null;
    const P = Ke(e);
    return {
      x: ((N.left - O.left) / P - h) / f,
      y: ((N.top - O.top) / P - u) / f,
      width: N.width / P / f,
      height: N.height / P / f
    };
  }, y = () => {
    const { w: O, h: N } = v();
    if (p) {
      x();
      return;
    }
    x();
    const P = b() ?? { x: 0, y: 0, width: i, height: d }, G = { w: Math.max(1, O - l * 2), h: Math.max(1, N - l * 2) };
    f = Math.min(s, G.w / P.width, G.h / P.height), w = Math.min(o, f), h = (O - P.width * f) / 2 - P.x * f, u = (N - P.height * f) / 2 - P.y * f, x();
  }, E = (O, N, P) => {
    const G = f;
    f = Math.min(r, Math.max(w, f * P)), f !== G && (h = O - (O - h) / G * f, u = N - (N - u) / G * f, x());
  }, g = (O) => {
    O.preventDefault(), p = !0;
    const N = We(e, O.clientX, O.clientY);
    E(N.x, N.y, O.deltaY < 0 ? 1.1 : 0.9);
  };
  let A = !1, C = !1, M = 0, T = 0, _ = 0, j = 0;
  const B = /* @__PURE__ */ new Map();
  let q = 0, he = 0, pe = 0, we = 0;
  const me = () => {
    if (B.size < 2) return null;
    const [O, N] = [...B.values()];
    return { distance: Math.hypot(O.x - N.x, O.y - N.y), cx: (O.x + N.x) / 2, cy: (O.y + N.y) / 2 };
  }, ge = (O) => {
    const N = O;
    return N != null && N.closest ? !N.closest(".dd-flow-node") && !N.closest(".dd-flow-edge-hit") && !N.closest(".dd-flow-filter-bar, button") : !0;
  }, Q = (O) => {
    B.set(O.pointerId, { x: O.clientX, y: O.clientY });
    const N = me();
    if (N) {
      A = !1, q = N.distance;
      return;
    }
    ge(O.target) && (A = !0, C = !1, M = O.clientX, T = O.clientY, _ = h, j = u);
  }, ie = (O) => {
    B.has(O.pointerId) && B.set(O.pointerId, { x: O.clientX, y: O.clientY });
    const N = me();
    if (N) {
      if (!q) {
        q = N.distance;
        return;
      }
      p = !0, C = !0, e.dataset[le] = "1";
      const st = We(e, N.cx, N.cy);
      E(st.x, st.y, N.distance / q), q = N.distance;
      return;
    }
    if (!A) return;
    const P = O.clientX - M, G = O.clientY - T;
    if (!C && Math.hypot(P, G) < cd) return;
    C = !0, p = !0, e.dataset[le] = "1";
    const rt = Ke(e);
    h = _ + P / rt, u = j + G / rt, x();
  }, m = (O) => {
    const N = Date.now(), P = N - he < fd && Math.hypot(O.clientX - pe, O.clientY - we) < ud;
    return he = P ? 0 : N, pe = O.clientX, we = O.clientY, P;
  }, k = (O) => {
    const N = B.size >= 2;
    if (B.delete(O.pointerId), N) {
      q = 0, B.size < 2 && setTimeout(() => delete e.dataset[le], 0);
      return;
    }
    if (A) {
      if (A = !1, !C) {
        ge(O.target) && m(O) && (p = !1, y());
        return;
      }
      setTimeout(() => delete e.dataset[le], 0);
    }
  }, L = { capture: !0 };
  e.addEventListener("wheel", g, { passive: !1, capture: !0 }), e.addEventListener("pointerdown", Q, L), e.addEventListener("pointermove", ie, L), e.addEventListener("pointerup", k, L), e.addEventListener("pointercancel", k, L);
  const $ = new ResizeObserver(() => y());
  return $.observe(e), y(), {
    fit: y,
    state: () => ({ scale: f, tx: h, ty: u, userAdjusted: p }),
    reset() {
      p = !1, y();
    },
    zoomBy(O) {
      p = !0;
      const { w: N, h: P } = v();
      E(N / 2, P / 2, O);
    },
    destroy() {
      $.disconnect(), e.removeEventListener("wheel", g, L), e.removeEventListener("pointerdown", Q, L), e.removeEventListener("pointermove", ie, L), e.removeEventListener("pointerup", k, L), e.removeEventListener("pointercancel", k, L), e.classList.remove("dd-flow-has-viewport");
    }
  };
}
const se = {
  nodeWidth: 118,
  nodeHeight: 34,
  layerGap: 170,
  rowGap: 48,
  margin: 30,
  hint: "Hover to preview · click to pin · scroll to zoom · drag to pan"
};
function hd(e, t, n) {
  const { nodeWidth: o, nodeHeight: r, layerGap: s, rowGap: i, margin: d } = n, l = /* @__PURE__ */ new Map();
  for (const p of e) {
    const w = p.layer ?? 0;
    l.has(w) || l.set(w, []), l.get(w).push(p);
  }
  for (const p of l.values()) p.sort((w, x) => w.id.localeCompare(x.id));
  const a = Math.max(1, ...[...l.values()].map((p) => p.length)), c = Math.max(0, ...e.map((p) => p.layer ?? 0)), f = a * (r + i) - i, h = new Set(t.map((p) => p.source)), u = /* @__PURE__ */ new Map();
  for (const [p, w] of l) {
    const x = w.filter((E) => h.has(E.id)), v = w.filter((E) => !h.has(E.id)), b = x.length ? x.length * (r + i) - i : 0, y = d + (f - b) / 2;
    x.forEach((E, g) => {
      u.set(E.id, { x: d + p * s, y: y + g * (r + i) });
    }), v.forEach((E, g) => {
      const A = Math.floor(g / 2), C = g % 2 === 0 ? A : a - 1 - A;
      u.set(E.id, { x: d + p * s, y: d + C * (r + i) });
    });
  }
  return {
    positions: u,
    width: d * 2 + c * s + o,
    height: d * 2 + f
  };
}
const En = (e) => `${e.source} ${e.target}`;
function pd(e, t, n, o) {
  const r = e.nodes.map((d) => {
    var l;
    return (l = d.rows) != null && l.length ? Bt(d.rows) : n;
  }), s = Math.max(n, ...r), { positions: i } = hd(e.nodes, e.edges, {
    nodeWidth: t,
    nodeHeight: s,
    layerGap: o.layerGap ?? se.layerGap,
    rowGap: o.rowGap ?? se.rowGap,
    margin: se.margin
  });
  return e.nodes.map((d, l) => {
    var u;
    const a = i.get(d.id), c = !!((u = d.rows) != null && u.length), f = c ? $e(d.label ?? d.id, d.rows, t) : t, h = c ? r[l] : n;
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
const wd = 320;
function md(e, t, n) {
  const o = Math.min(
    Math.max(t, $e(e, void 0, t)),
    Math.max(t, wd)
  ), r = Qe(e, o - 20).length > 1;
  return { w: o, h: r ? Math.max(n, Gt("process", e, o)) : n };
}
function gd(e, t, n, o) {
  const r = Yi(e.filters), { nodes: s } = Ne({
    id: e.id ?? "graph",
    direction: o,
    nodes: e.nodes.map((i) => {
      var c;
      const d = i.label ?? i.id;
      if ((c = i.rows) != null && c.length) {
        const f = $e(d, i.rows, t) + r;
        return { id: i.id, label: d, type: "compound", note: i.note, rows: i.rows, w: f };
      }
      const { w: l, h: a } = md(d, t, n);
      return { id: i.id, label: d, type: "process", note: i.note, w: l + r, h: a };
    }),
    edges: e.edges.map((i) => ({ id: En(i), from: i.source, to: i.target }))
  });
  return s;
}
function bd(e, t, n = {}) {
  var A;
  const o = n.nodeWidth ?? se.nodeWidth, r = n.nodeHeight ?? se.nodeHeight, s = n.hint ?? se.hint;
  e.classList.add("dd-flow-embed", "dd-flow-graph-mount"), fe(e, n.style ?? "host");
  const i = n.id ?? t.id ?? "";
  let d, l = Le([]), a = null, c = null;
  const f = (C) => {
    c == null || c.destroy(), a == null || a.destroy(), d == null || d.remove();
    const M = n.layout === "flow" ? gd(C, o, r, n.direction ?? "LR") : pd(C, o, r, n), T = new Set(M.map((j) => j.id)), _ = C.edges.filter((j) => T.has(j.source) && T.has(j.target)).map((j) => ({
      id: En(j),
      from: j.source,
      to: j.target,
      routing: "bezier",
      stroke: j.flagged ? "dashed" : "solid",
      kind: j.flagged ? "conditional" : "default",
      points: []
    }));
    d = ot(M, _, { rowEdges: C.rowEdges }), zi(d, C.nodes, t.filters ?? []), e.prepend(d), a = vn(e, d, { maxFitScale: 1 }), c = Dn(e, _, { flowId: i, rowEdges: C.rowEdges }), l = Le(_);
  };
  f(t);
  const h = document.createElement("div");
  if (h.className = "dd-flow-graph-tooltip", e.appendChild(h), s) {
    const C = document.createElement("div");
    C.className = "dd-flow-graph-hint", C.textContent = s, e.appendChild(C);
  }
  const u = new Map(t.nodes.map((C) => [C.id, C])), p = (C) => {
    var B, q;
    const M = (q = (B = C.target) == null ? void 0 : B.closest) == null ? void 0 : q.call(B, ".dd-flow-node"), T = M == null ? void 0 : M.getAttribute("data-node-id"), _ = T ? u.get(T) : void 0;
    if (!_) {
      h.style.display = "none";
      return;
    }
    h.textContent = _.note ? `${_.label ?? _.id} · ${_.note}` : _.label ?? _.id, h.style.display = "block";
    const j = We(e, C.clientX, C.clientY);
    h.style.left = `${j.x + 14}px`, h.style.top = `${j.y + 14}px`;
  }, w = () => {
    h.style.display = "none";
  };
  e.addEventListener("pointermove", p), e.addEventListener("pointerleave", w);
  const x = (C) => {
    var B, q;
    const M = (q = (B = C.target) == null ? void 0 : B.closest) == null ? void 0 : q.call(B, ".dd-flow-node-row"), T = M == null ? void 0 : M.closest(".dd-flow-node"), _ = T == null ? void 0 : T.getAttribute("data-node-id"), j = M == null ? void 0 : M.getAttribute("data-row-id");
    !_ || !j || U(e, z.rowClick, {
      flowId: i,
      nodeId: _,
      rowId: j,
      shiftKey: C.shiftKey
    });
  };
  e.addEventListener("click", x);
  let v = [];
  const b = (C) => {
    const M = n.filterMode === "hide", T = M && C.length ? Wi(t.nodes, t.edges, C) : null, _ = T != null && T.nodes.length ? { ...t, ...T, rowEdges: void 0 } : t;
    M && (_ !== t || v.length) && f(_), v = C;
    const j = Ki(d, _.nodes, l, C);
    U(e, z.filterChange, {
      flowId: i,
      keys: C,
      key: C[0] ?? null,
      counts: j
    });
  }, y = (C) => {
    E ? E.select(C) : b([...C]);
  }, E = (A = t.filters) != null && A.length ? Xi(t.filters, b, n.allFilterLabel) : null;
  E && e.appendChild(E.element);
  const g = Mn(e, () => a == null ? void 0 : a.reset(), n.fullscreen !== !1);
  return {
    setFullscreen: g.set,
    setFilters: y,
    getFilters: () => [...v],
    setFilter: (C) => y(C === null ? [] : [C]),
    getFilter: () => v[0] ?? null,
    destroy() {
      g.destroy(), e.removeEventListener("pointermove", p), e.removeEventListener("pointerleave", w), e.removeEventListener("click", x), c == null || c.destroy(), c = null, a == null || a.destroy(), a = null, e.innerHTML = "", e.classList.remove("dd-flow-graph-mount");
    }
  };
}
const yd = ".dd-flow-graph:not([data-dd-flow-mounted])";
async function vd(e = document) {
  const t = Array.from(e.querySelectorAll(yd));
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
        bd(n, r, { style: n.getAttribute("data-style") ?? void 0, hint: s ?? void 0 });
      } catch (r) {
        console.error("dd-flow: failed to mount graph", r), n.textContent = "dd-flow: failed to mount graph (see console)";
      }
    })
  );
}
const Kd = () => ({ nodes: {}, edges: {} }), Ed = [
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
function xd(e) {
  const t = document.createElement("div");
  t.className = "dd-flow-inspector", t.hidden = !0, e.appendChild(t);
  let n = !1;
  function o(u) {
    const w = t.offsetWidth || 260, x = t.offsetHeight || 200;
    let v = u.right + 12;
    v + w > window.innerWidth && (v = u.left - 12 - w), v < 12 && (v = Math.min(u.left, window.innerWidth - w - 12)), v = Math.max(12, Math.min(v, window.innerWidth - w - 12));
    let b = u.top;
    return b = Math.max(12, Math.min(b, window.innerHeight - x - 12)), { left: v, top: b };
  }
  function r(u) {
    const { left: p, top: w } = o(u);
    t.style.left = `${p}px`, t.style.top = `${w}px`;
  }
  function s(u, p) {
    const w = document.createElement("div");
    w.className = "dd-flow-inspector-field";
    const x = document.createElement("label");
    return x.textContent = u, w.appendChild(x), w.appendChild(p), w;
  }
  function i(u) {
    const p = document.createElement("button");
    return p.type = "button", p.className = "dd-flow-btn dd-flow-inspector-delete", p.textContent = "Delete", p.addEventListener("click", u), p;
  }
  function d() {
    const u = document.createElement("button");
    return u.type = "button", u.className = "dd-flow-inspector-close", u.textContent = "×", u.setAttribute("aria-label", "Close"), u.addEventListener("click", h), u;
  }
  function l(u, p) {
    var b;
    t.innerHTML = "", t.appendChild(d());
    const w = document.createElement("input");
    w.type = "text", w.value = u.label, w.addEventListener("input", () => p.onLabelChange(w.value)), t.appendChild(s("Label", w));
    const x = document.createElement("textarea");
    if (x.rows = 2, x.value = u.note ?? "", x.addEventListener("input", () => p.onNoteChange(x.value)), t.appendChild(s("Note", x)), u.type === "compound") {
      const y = document.createElement("textarea");
      y.className = "dd-flow-inspector-rows", y.rows = Math.max(3, (((b = u.rows) == null ? void 0 : b.length) ?? 0) + 1), y.value = (u.rows ?? []).map((E) => E.label).join(`
`), y.addEventListener("input", () => p.onRowsChange(y.value.split(`
`))), t.appendChild(s("Rows (one per line)", y));
    }
    const v = document.createElement("div");
    v.className = "dd-flow-type-grid";
    for (const y of Ed) {
      const E = document.createElement("button");
      E.type = "button", E.className = `dd-flow-type-swatch${y === u.type ? " is-active" : ""}`, E.title = y, E.setAttribute("aria-label", y);
      const g = I("svg", { viewBox: "-32 -22 64 44", width: 48, height: 33 });
      g.appendChild(Dt(y, 56, 36)), E.appendChild(g), E.addEventListener("click", () => p.onTypeChange(y)), v.appendChild(E);
    }
    if (t.appendChild(s("Type", v)), u.subflow) {
      const y = document.createElement("div");
      y.className = "dd-flow-inspector-subflow-row";
      const E = document.createElement("span");
      if (E.textContent = `Opens subflow: ${u.subflow}`, y.appendChild(E), p.onGotoSubflow) {
        const g = document.createElement("button");
        g.type = "button", g.className = "dd-flow-btn", g.textContent = "Open", g.addEventListener("click", p.onGotoSubflow), y.appendChild(g);
      }
      t.appendChild(y);
    }
    t.appendChild(i(p.onDelete));
  }
  function a(u, p, w, x) {
    const v = document.createElement("div");
    v.className = "dd-flow-inspector-radios";
    for (const b of p) {
      const y = `dd-flow-${u}-${b}`, E = document.createElement("input");
      E.type = "radio", E.name = `dd-flow-${u}`, E.id = y, E.checked = b === w, E.addEventListener("change", () => x(b));
      const g = document.createElement("label");
      g.htmlFor = y, g.textContent = b, v.appendChild(E), v.appendChild(g);
    }
    return v;
  }
  function c(u, p) {
    t.innerHTML = "", t.appendChild(d());
    const w = document.createElement("input");
    w.type = "text", w.value = u.label ?? "", w.addEventListener("input", () => p.onLabelChange(w.value)), t.appendChild(s("Label", w));
    const { routing: x, stroke: v, kind: b } = Ue(u);
    t.appendChild(
      s(
        "Routing",
        a("routing", ["orthogonal", "straight", "curved"], x, p.onRoutingChange)
      )
    ), t.appendChild(
      s("Stroke", a("stroke", ["solid", "dashed", "dotted"], v, p.onStrokeChange))
    ), t.appendChild(
      s("Kind", a("kind", ["default", "conditional"], b, p.onKindChange))
    );
    const y = document.createElement("p");
    y.className = "dd-flow-inspector-hint", y.textContent = "Changing routing clears any hand-dragged route for this connector.", t.appendChild(y), t.appendChild(i(p.onDelete));
  }
  function f(u, p, w) {
    t.innerHTML = "", t.appendChild(d());
    const x = document.createElement("p");
    x.className = "dd-flow-inspector-hint", x.textContent = u, t.appendChild(x);
    const v = document.createElement("input");
    v.type = "text", v.value = p;
    const b = () => {
      const A = v.value.trim();
      A && w(A), h();
    };
    v.addEventListener("keydown", (A) => {
      A.key === "Enter" && b();
    }), t.appendChild(s("Name", v));
    const y = document.createElement("div");
    y.className = "dd-flow-inspector-actions";
    const E = document.createElement("button");
    E.type = "button", E.className = "dd-flow-btn", E.textContent = "Cancel", E.addEventListener("click", h);
    const g = document.createElement("button");
    g.type = "button", g.className = "dd-flow-btn is-active", g.textContent = "Create", g.addEventListener("click", b), y.appendChild(E), y.appendChild(g), t.appendChild(y), requestAnimationFrame(() => {
      v.focus(), v.select();
    });
  }
  function h() {
    n = !1, t.hidden = !0, t.innerHTML = "";
  }
  return {
    get isOpen() {
      return n;
    },
    showNode(u, p, w, x) {
      if (l(u, w), t.hidden = !1, n = !0, r(p), x != null && x.focusLabel) {
        const v = t.querySelector('input[type="text"]');
        v == null || v.focus(), v == null || v.select();
      }
    },
    showEdge(u, p, w) {
      c(u, w), t.hidden = !1, n = !0, r(p);
    },
    showPrompt(u, p, w, x) {
      f(u, w, x), t.hidden = !1, n = !0, r(p);
    },
    refreshAnchor(u) {
      n && r(u);
    },
    hide: h,
    destroy() {
      h(), t.remove();
    }
  };
}
const kd = 4;
function Cd(e, t, n, o = {}) {
  let r = null;
  const s = (c, f, h) => {
    const u = c.createSVGPoint();
    u.x = f, u.y = h;
    const p = c.getScreenCTM();
    if (!p) return { x: f, y: h };
    const w = u.matrixTransform(p.inverse());
    return { x: w.x, y: w.y };
  }, i = () => e.querySelector("svg.dd-flow-svg"), d = (c) => {
    var b, y, E, g, A;
    const f = i();
    if (!f) return;
    const h = c.target, u = s(f, c.clientX, c.clientY), p = (b = h.closest) == null ? void 0 : b.call(h, ".dd-flow-node");
    if (p) {
      const C = p.getAttribute("data-node-id"), M = t.nodes.find((j) => j.id === C);
      if (!M) return;
      const T = (y = h.closest) == null ? void 0 : y.call(h, ".dd-flow-node-row"), _ = (T == null ? void 0 : T.getAttribute("data-row-id")) ?? null;
      r = {
        node: M,
        edgeId: null,
        rowId: _,
        startX: u.x,
        startY: u.y,
        nodeStartX: M.x,
        nodeStartY: M.y,
        moved: !1,
        shiftKey: c.shiftKey
      }, (E = e.setPointerCapture) == null || E.call(e, c.pointerId);
      return;
    }
    const w = (g = h.closest) == null ? void 0 : g.call(h, ".dd-flow-edge-hit"), x = w == null ? void 0 : w.closest(".dd-flow-edge");
    r = {
      node: null,
      edgeId: (x == null ? void 0 : x.getAttribute("data-edge-id")) ?? null,
      rowId: null,
      startX: u.x,
      startY: u.y,
      nodeStartX: 0,
      nodeStartY: 0,
      moved: !1,
      shiftKey: c.shiftKey
    }, (A = e.setPointerCapture) == null || A.call(e, c.pointerId);
  }, l = (c) => {
    if (!r || !r.node) return;
    const f = i();
    if (!f) return;
    const h = s(f, c.clientX, c.clientY), u = h.x - r.startX, p = h.y - r.startY;
    e.classList.contains("dd-flow-editing") && (!r.moved && Math.hypot(u, p) < kd || (r.moved = !0, r.node.x = r.nodeStartX + u, r.node.y = r.nodeStartY + p, n()));
  }, a = () => {
    var v, b, y, E, g;
    if (!r) return;
    const { node: c, edgeId: f, rowId: h, moved: u, shiftKey: p, startX: w, startY: x } = r;
    r = null, c ? u ? (v = o.onNodeMoved) == null || v.call(o, c.id) : h ? (b = o.onRowClick) == null || b.call(o, c.id, h, { shiftKey: p }) : (y = o.onNodeClick) == null || y.call(o, c.id, { shiftKey: p }) : f ? (E = o.onEdgeClick) == null || E.call(o, f, { shiftKey: p }) : e.dataset[le] || (g = o.onBackgroundClick) == null || g.call(o, { x: w, y: x }, { shiftKey: p });
  };
  return e.addEventListener("pointerdown", d), e.addEventListener("pointermove", l), e.addEventListener("pointerup", a), e.addEventListener("pointercancel", a), {
    destroy() {
      e.removeEventListener("pointerdown", d), e.removeEventListener("pointermove", l), e.removeEventListener("pointerup", a), e.removeEventListener("pointercancel", a);
    }
  };
}
function Ld(e, t) {
  return { ...e, nodes: [...e.nodes, t] };
}
function _d(e, t) {
  return {
    ...e,
    nodes: e.nodes.filter((n) => n.id !== t),
    edges: e.edges.filter((n) => n.from !== t && n.to !== t)
  };
}
function Sd(e, t) {
  return { ...e, edges: e.edges.filter((n) => n.id !== t) };
}
function ke(e, t, n) {
  return { ...e, nodes: e.nodes.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function Ee(e, t, n) {
  return { ...e, edges: e.edges.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function Nd(e, t, n) {
  const o = e.nodes.find((c) => c.id === t);
  if (!o) return e;
  const r = n.map((c) => c.trim()).filter(Boolean), s = o.rows ?? [], i = /* @__PURE__ */ new Set(), d = r.map((c) => {
    const f = s.findIndex((h, u) => !i.has(u) && h.label === c);
    return f < 0 ? null : (i.add(f), s[f]);
  }), l = new Set(d.filter((c) => c !== null).map((c) => c.id)), a = r.map((c, f) => {
    const h = d[f];
    if (h) return h;
    if (f < s.length && !i.has(f))
      return i.add(f), l.add(s[f].id), { ...s[f], label: c };
    const u = Ce("row", c, /* @__PURE__ */ new Set([...l, ...s.map((p) => p.id)]));
    return l.add(u), { id: u, label: c };
  });
  return ke(e, t, { rows: a.length ? a : void 0 });
}
function Ce(e, t, n) {
  const o = t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || e;
  if (!n.has(o)) return o;
  let r = 2;
  for (; n.has(`${o}-${r}`); ) r++;
  return `${o}-${r}`;
}
function Id(e) {
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
  const c = new Set(t.nodes.map((_) => _.id));
  if (c.has(i) && !a.has(i))
    throw new Error(`extractSubflow: placeholder id "${i}" collides with an existing node.`);
  for (const _ of a)
    if (!c.has(_)) throw new Error(`extractSubflow: selected node "${_}" not found in spec.`);
  const f = [], h = [], u = [], p = [];
  for (const _ of t.edges) {
    const j = a.has(_.from), B = a.has(_.to);
    j && B ? f.push(_) : !j && B ? h.push(_) : j && !B ? u.push(_) : p.push(_);
  }
  const w = {
    id: s,
    title: d,
    style: t.style,
    direction: t.direction,
    nodes: t.nodes.filter((_) => a.has(_.id)),
    edges: f
  }, x = {
    id: i,
    label: d,
    type: "subprocess",
    subflow: s
  }, v = h.map((_) => ({ ..._, to: i })), b = u.map((_) => ({ ..._, from: i })), y = {
    ...t,
    nodes: [...t.nodes.filter((_) => !a.has(_.id)), x],
    edges: [...p, ...v, ...b]
  }, E = new Set(r), g = new Set(f.map((_) => _.id)), A = new Set([...v, ...b].map((_) => _.id)), C = {};
  for (const [_, j] of Object.entries(n.nodes))
    E.has(_) || (C[_] = j);
  const M = {};
  for (const [_, j] of Object.entries(n.edges))
    !g.has(_) && !A.has(_) && (M[_] = j);
  const T = Od(r, o);
  return T && (C[i] = T), {
    parent: { spec: y, layout: { nodes: C, edges: M } },
    subflow: { spec: w }
  };
}
function Od(e, t) {
  const n = e.map((s) => t[s]).filter((s) => !!s);
  if (!n.length) return null;
  const o = n.reduce((s, i) => s + i.x, 0) / n.length, r = n.reduce((s, i) => s + i.y, 0) / n.length;
  return { x: o, y: r };
}
const xn = "http://127.0.0.1:5311";
let Rt = !1;
function $d() {
  return Rt ? Promise.resolve(!0) : fetch(`${xn}/health`).then((e) => (e.ok && (Rt = !0), e.ok)).catch(() => !1);
}
async function Md(e, t, n) {
  const r = { layoutPath: e.layout ?? e.spec.replace(/\.flow\.json$/, ".layout.json"), layout: n };
  t && (r.specPath = e.spec, r.spec = t);
  try {
    return (await fetch(`${xn}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(r)
    })).ok;
  } catch {
    return !1;
  }
}
let J = null;
function Xe(e, t, n) {
  const { nodes: o, edges: r, orphanedNodeIds: s, orphanedEdgeIds: i } = Ne(t, n);
  return {
    flowId: e,
    title: t.title,
    spec: t,
    nodes: o,
    edges: r,
    dirty: !1,
    specDirty: !1,
    orphanedNodeIds: s,
    orphanedEdgeIds: i
  };
}
function Ad(e, t, n = {}) {
  e.classList.add("dd-flow-embed", "dd-flow-inline"), fe(e, t.main.style);
  const o = Xe(t.main.id, t.main, t.mainLayout), r = ot(o.nodes, o.edges);
  e.appendChild(r);
  const s = () => Hd(t, n);
  e.addEventListener("click", s);
  const i = () => (J == null ? void 0 : J.bundle) === t;
  return {
    open: s,
    destroy() {
      e.removeEventListener("click", s), e.innerHTML = "";
    },
    // A fresh object every call, even when inactive -- a shared constant here would let a
    // caller's `getSelection().nodeIds.push(...)` mutate what every subsequent inactive read
    // (from this handle AND any other mountFlow() bundle's own inactive reads) observes.
    getSelection: () => i() ? J.getSelection() : { nodeIds: [], edgeId: null },
    setSelection(d) {
      if (!i()) return;
      const l = J.getSelection(), a = new Set(d.nodeIds ?? l.nodeIds), c = d.edgeId !== void 0 ? d.edgeId : l.edgeId;
      J.setSelection(a, c);
    }
  };
}
const jd = ".dd-flow-embed[data-flow]:not([data-dd-flow-mounted])";
async function Td(e = document) {
  const t = Array.from(e.querySelectorAll(jd));
  await Promise.all(
    t.map(async (n) => {
      n.setAttribute("data-dd-flow-mounted", "1");
      const o = n.getAttribute("data-flow");
      if (o)
        try {
          const r = await fetch(o);
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          const s = await r.json();
          Ad(n, s);
        } catch (r) {
          console.error(`dd-flow: failed to load flow from "${o}"`, r), n.textContent = `dd-flow: failed to load "${o}" (see console)`;
        }
    })
  );
}
let H = null;
const Rd = 3;
function Pd() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
function Bd(e) {
  var o, r;
  if (!Pd()) return;
  const t = e.webkitRequestFullscreen, n = ((o = e.requestFullscreen) == null ? void 0 : o.bind(e)) ?? (t == null ? void 0 : t.bind(e));
  (r = n == null ? void 0 : n()) == null || r.catch(() => {
  });
}
function Dd(e) {
  document.fullscreenElement === e && document.exitFullscreen().catch(() => {
  });
}
function Fd() {
  if (H) return H;
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
            <button type="button" class="dd-flow-btn dd-flow-edit-btn">Edit layout</button>
            <button type="button" class="dd-flow-btn dd-flow-add-shape-btn" disabled title="Add shape: click the canvas to place it">+ Shape</button>
            <button type="button" class="dd-flow-btn dd-flow-make-subflow-btn" disabled>Make subflow</button>
            <button type="button" class="dd-flow-btn dd-flow-save-btn" disabled>Save layout</button>
          </span>
        </div>
      </div>
      <div class="dd-flow-warning-banner" hidden></div>
    </div>
  `, document.body.appendChild(e), H = {
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
    inspector: xd(e)
  }, e.addEventListener("click", (o) => {
    o.target === e && xe();
  }), e.querySelector(".dd-flow-close-btn").addEventListener("click", xe);
  const t = e.querySelector(".dd-flow-menu-btn"), n = e.querySelector(".dd-flow-toolbar");
  return t.addEventListener("click", () => {
    n.hidden = !n.hidden, t.setAttribute("aria-expanded", String(!n.hidden)), t.classList.toggle("is-active", !n.hidden);
  }), document.addEventListener("keydown", (o) => {
    !e.hidden && o.key === "Escape" && (H != null && H.inspector.isOpen ? H.inspector.hide() : xe());
  }), document.addEventListener("fullscreenchange", () => {
    !document.fullscreenElement && H && !H.root.hidden && xe();
  }), H;
}
function xe() {
  H && (Dd(H.root), H.root.hidden = !0, H.stage.innerHTML = "", H.inspector.hide(), document.body.classList.remove("dd-flow-lightbox-open"), J = null);
}
function Gd(e) {
  const t = Math.min(...e.map((s) => s.left)), n = Math.min(...e.map((s) => s.top)), o = Math.max(...e.map((s) => s.right)), r = Math.max(...e.map((s) => s.bottom));
  return new DOMRect(t, n, o - t, r - n);
}
function Hd(e, t) {
  var Q, ie;
  const n = Fd();
  n.root.hidden = !1, document.body.classList.add("dd-flow-lightbox-open"), Bd(n.root), n.toolbar.hidden = !0, n.menuBtn.setAttribute("aria-expanded", "false"), n.menuBtn.classList.remove("is-active"), n.authoringEl.hidden = !0;
  const o = [Xe(e.main.id, e.main, e.mainLayout)];
  let r = !1, s = /* @__PURE__ */ new Set(), i = null, d = null, l = !1, a = !1;
  function c() {
    a || !e.sources || $d().then((m) => {
      !m || n.root.hidden || (a = !0, n.authoringEl.hidden = !1, j(), n.addShapeBtn.disabled = !r);
    });
  }
  c(), n.stage.innerHTML = "";
  const f = document.createElement("div");
  f.className = "dd-flow-stage-inner", n.stage.appendChild(f), fe(n.root, e.main.style);
  const h = { nodes: o[0].nodes, edges: o[0].edges };
  function u() {
    return o[o.length - 1];
  }
  function p() {
    h.nodes = u().nodes, h.edges = u().edges;
  }
  function w(m) {
    return Array.from(f.querySelectorAll(".dd-flow-node")).find(
      (k) => k.getAttribute("data-node-id") === m
    ) ?? null;
  }
  function x(m) {
    return Array.from(f.querySelectorAll(".dd-flow-edge")).find(
      (k) => k.getAttribute("data-edge-id") === m
    ) ?? null;
  }
  function v(m, k = {}) {
    const L = u(), $ = Ge(L.nodes, L.edges);
    if (k.resizeNodeId) {
      const R = $.nodes[k.resizeNodeId];
      R && ($.nodes[k.resizeNodeId] = { x: R.x, y: R.y });
    }
    k.clearEdgePoints && delete $.edges[k.clearEdgePoints], k.setNodePosition && ($.nodes[k.setNodePosition.id] = k.setNodePosition.point), L.spec = m(L.spec);
    const S = Ne(L.spec, $);
    L.nodes = S.nodes, L.edges = S.edges, L.orphanedNodeIds = S.orphanedNodeIds, L.orphanedEdgeIds = S.orphanedEdgeIds, L.dirty = !0, L.specDirty = !0, p(), n.saveBtn.disabled = !1, T();
  }
  function b(m) {
    var $;
    const k = u().spec.nodes.find((S) => S.id === m), L = k == null ? void 0 : k.subflow;
    return {
      onLabelChange: (S) => {
        v((V) => ke(V, m, { label: S }), { resizeNodeId: m });
        const R = w(m);
        R && n.inspector.refreshAnchor(R.getBoundingClientRect());
      },
      onNoteChange: (S) => v((R) => ke(R, m, { note: S })),
      onRowsChange: (S) => {
        v((V) => Nd(V, m, S), { resizeNodeId: m });
        const R = w(m);
        R && n.inspector.refreshAnchor(R.getBoundingClientRect());
      },
      onTypeChange: (S) => {
        v((R) => ke(R, m, { type: S }), { resizeNodeId: m }), E();
      },
      onDelete: () => {
        v((R) => _d(R, m));
        const S = new Set(s);
        S.delete(m), g(S, null);
      },
      onGotoSubflow: L && (($ = e.subflows) != null && $[L]) ? () => A(L) : void 0
    };
  }
  function y(m) {
    return {
      onLabelChange: (k) => v((L) => Ee(L, m, { label: k })),
      onRoutingChange: (k) => v((L) => Ee(L, m, { routing: k }), { clearEdgePoints: m }),
      onStrokeChange: (k) => v((L) => Ee(L, m, { stroke: k })),
      onKindChange: (k) => v((L) => Ee(L, m, { kind: k })),
      onDelete: () => {
        v((k) => Sd(k, m)), g(/* @__PURE__ */ new Set(), null);
      }
    };
  }
  function E(m = {}) {
    if (!r || !a) {
      n.inspector.hide();
      return;
    }
    if (s.size === 1 && !i) {
      const k = [...s][0], L = u().spec.nodes.find((S) => S.id === k), $ = w(k);
      if (L && $) {
        n.inspector.showNode(L, $.getBoundingClientRect(), b(k), m);
        return;
      }
    }
    if (i) {
      const k = u().spec.edges.find(($) => $.id === i), L = x(i);
      if (k && L) {
        n.inspector.showEdge(k, L.getBoundingClientRect(), y(i));
        return;
      }
    }
    n.inspector.hide();
  }
  function g(m, k, L = {}) {
    s = m, i = k, d = L.rowKey ?? null, j(), T(), E({ focusLabel: L.focusLabel }), U(f, z.selectionChange, {
      flowId: u().flowId,
      selectedNodeIds: [...s],
      selectedEdgeId: i
    });
  }
  J = {
    bundle: e,
    getSelection: () => ({ nodeIds: [...s], edgeId: i }),
    setSelection: g
  };
  function A(m) {
    var $;
    const k = ($ = e.subflows) == null ? void 0 : $[m];
    if (!k) return;
    const L = u().flowId;
    o.push(Xe(m, k.spec, k.layout)), p(), fe(n.root, k.spec.style ?? e.main.style), B(), g(/* @__PURE__ */ new Set(), null), U(f, z.subflowOpen, { flowId: L, subflowId: m });
  }
  const C = Cd(f, h, T, {
    onNodeClick: (m, k) => {
      var $;
      const L = u().nodes.find((S) => S.id === m);
      if (L) {
        if (U(f, z.nodeClick, {
          flowId: u().flowId,
          nodeId: m,
          shiftKey: k.shiftKey
        }), r) {
          let S;
          k.shiftKey ? (S = new Set(s), S.has(m) ? S.delete(m) : S.add(m)) : S = s.size === 1 && s.has(m) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([m]), g(S, null);
          return;
        }
        L.subflow && (($ = e.subflows) != null && $[L.subflow]) && A(L.subflow);
      }
    },
    onNodeMoved: (m) => {
      g(/* @__PURE__ */ new Set([m]), null), u().dirty = !0, n.saveBtn.disabled = !1;
    },
    onRowClick: (m, k, L) => {
      if (U(f, z.rowClick, {
        flowId: u().flowId,
        nodeId: m,
        rowId: k,
        shiftKey: L.shiftKey
      }), !r) return;
      const $ = (d == null ? void 0 : d.nodeId) === m && (d == null ? void 0 : d.rowId) === k;
      g(/* @__PURE__ */ new Set(), null, { rowKey: $ ? null : { nodeId: m, rowId: k } });
    },
    onEdgeClick: (m, k) => {
      U(f, z.edgeClick, {
        flowId: u().flowId,
        edgeId: m,
        shiftKey: k.shiftKey
      }), r && g(/* @__PURE__ */ new Set(), i === m ? null : m);
    },
    onBackgroundClick: (m, k) => {
      if (U(f, z.backgroundClick, {
        flowId: u().flowId,
        point: m,
        shiftKey: k.shiftKey
      }), !!r) {
        if (l) {
          const L = new Set(u().spec.nodes.map((S) => S.id)), $ = Ce("step", "New step", L);
          v((S) => Ld(S, { id: $, label: "New step", type: "process" }), {
            setNodePosition: { id: $, point: m }
          }), l = !1, f.classList.remove("dd-flow-placing"), n.addShapeBtn.classList.remove("is-active"), g(/* @__PURE__ */ new Set([$]), null, { focusLabel: !0 });
          return;
        }
        g(/* @__PURE__ */ new Set(), null);
      }
    }
  });
  let M = null;
  function T() {
    const m = u(), k = ot(m.nodes, m.edges, { selectedNodeIds: s, selectedEdgeId: i, selectedRowKey: d }), L = f.querySelector("svg.dd-flow-svg");
    L ? f.replaceChild(k, L) : f.appendChild(k);
    const $ = M == null ? void 0 : M.state();
    M == null || M.destroy(), M = vn(f, k, { maxFitScale: Rd, initial: $ });
  }
  function _() {
    M == null || M.reset();
  }
  function j() {
    const m = s.size;
    n.makeSubflowBtn.disabled = !r || !a || m < 2, n.makeSubflowBtn.textContent = m >= 2 ? `Make subflow (${m})` : "Make subflow";
  }
  function B() {
    n.breadcrumbEl.innerHTML = "", n.breadcrumbEl.hidden = o.length < 2, o.forEach(($, S) => {
      if (S > 0) {
        const V = document.createElement("span");
        V.className = "dd-flow-breadcrumb-sep", V.textContent = "›", n.breadcrumbEl.appendChild(V);
      }
      const R = document.createElement(S === o.length - 1 ? "span" : "button");
      R.className = "dd-flow-breadcrumb-item", R.textContent = $.title, S !== o.length - 1 && (R.type = "button", R.addEventListener("click", () => {
        o.length = S + 1, p(), fe(n.root, u().spec.style ?? e.main.style), B(), g(/* @__PURE__ */ new Set(), null);
      })), n.breadcrumbEl.appendChild(R);
    }), n.saveBtn.disabled = !(u().dirty || u().specDirty), n.editBtn.textContent = r ? "Done editing" : "Edit layout", n.editBtn.classList.toggle("is-active", r), n.addShapeBtn.disabled = !r || !a;
    const { orphanedNodeIds: m, orphanedEdgeIds: k } = u(), L = m.length + k.length;
    if (L > 0) {
      const $ = [...m, ...k].join(", ");
      n.warningBanner.textContent = `⚠ The saved layout has ${L} position(s) that no longer match this flow (${$}) — they were dropped. This usually means the flow was regenerated with different node/edge ids.`, n.warningBanner.hidden = !1;
    } else
      n.warningBanner.hidden = !0;
  }
  const q = () => {
    r = !r, f.classList.toggle("dd-flow-editing", r), n.editBtn.textContent = r ? "Done editing" : "Edit layout", n.editBtn.classList.toggle("is-active", r), r && c(), n.addShapeBtn.disabled = !r || !a, r ? (j(), T(), E()) : (l = !1, f.classList.remove("dd-flow-placing"), n.addShapeBtn.classList.remove("is-active"), g(/* @__PURE__ */ new Set(), null));
  }, he = () => {
    !r || !a || (l = !l, f.classList.toggle("dd-flow-placing", l), n.addShapeBtn.classList.toggle("is-active", l));
  }, pe = () => {
    if (!r || !a || s.size < 2) return;
    const m = [...s], k = m.map(($) => w($)).filter(($) => $ !== null);
    if (!k.length) return;
    const L = Gd(k.map(($) => $.getBoundingClientRect()));
    n.inspector.showPrompt("Name the new subflow", L, "Subflow", ($) => {
      const S = u(), R = new Set(Object.keys(e.subflows ?? {})), V = new Set(S.spec.nodes.map((G) => G.id)), ne = Ce("subflow", $, R), de = Ce(ne, $, V), O = {};
      for (const G of S.nodes) O[G.id] = { x: G.x, y: G.y };
      let N;
      try {
        N = Id({
          spec: S.spec,
          layout: Ge(S.nodes, S.edges),
          nodePositions: O,
          selectedNodeIds: m,
          newSubflowId: ne,
          placeholderNodeId: de,
          placeholderLabel: $,
          existingSubflowIds: R
        });
      } catch (G) {
        console.error("dd-flow: could not extract subflow", G);
        return;
      }
      S.spec = N.parent.spec;
      const P = Ne(S.spec, N.parent.layout);
      S.nodes = P.nodes, S.edges = P.edges, S.orphanedNodeIds = P.orphanedNodeIds, S.orphanedEdgeIds = P.orphanedEdgeIds, S.dirty = !0, S.specDirty = !0, e.subflows || (e.subflows = {}), e.subflows[ne] = { spec: N.subflow.spec, layout: void 0 }, p(), n.saveBtn.disabled = !1, B(), g(/* @__PURE__ */ new Set([de]), null);
    });
  }, we = async () => {
    var R;
    const m = u(), k = Ge(m.nodes, m.edges), L = m.specDirty, $ = t.onSaveLayout || t.onSaveSpec, S = a ? (R = e.sources) == null ? void 0 : R[m.flowId] : void 0;
    if (!$ && S && await Md(S, L ? m.spec : null, k)) {
      m.dirty = !1, m.specDirty = !1, n.saveBtn.disabled = !0;
      return;
    }
    t.onSaveLayout ? t.onSaveLayout(m.flowId, k) : Ln(m.flowId, k), L && (t.onSaveSpec ? t.onSaveSpec(m.flowId, m.spec) : _n(m.flowId, m.spec)), m.dirty = !1, m.specDirty = !1, n.saveBtn.disabled = !0;
  }, me = () => {
    const m = f.querySelector("svg.dd-flow-svg");
    m && In(m, f, `${u().flowId}.svg`);
  }, ge = () => {
    const m = f.querySelector("svg.dd-flow-svg");
    m && On(m, f, `${u().flowId}.png`);
  };
  n.editBtn.onclick = q, n.addShapeBtn.onclick = he, n.makeSubflowBtn.onclick = pe, n.saveBtn.onclick = we, n.fitBtn.onclick = _, n.root.querySelector(".dd-flow-export-svg-btn").onclick = me, n.root.querySelector(".dd-flow-export-png-btn").onclick = ge, r = !1, s = /* @__PURE__ */ new Set(), i = null, d = null, l = !1, f.classList.remove("dd-flow-editing", "dd-flow-placing"), B(), j(), T(), E(), (ie = (Q = n.root._interactions) == null ? void 0 : Q.destroy) == null || ie.call(Q), n.root._interactions = C;
}
if (typeof document < "u") {
  const e = () => {
    Td(), vd();
  }, t = globalThis.document$;
  t ? t.subscribe(e) : document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e();
}
export {
  z as DD_FLOW_EVENTS,
  qe as DEFAULT_THEME,
  Ie as THEMES,
  fe as applyTheme,
  Dn as attachRelationHighlight,
  vn as attachViewport,
  Td as autoMountFlows,
  vd as autoMountGraphs,
  Le as buildGraphIndex,
  ee as collectClosure,
  Ne as computeLayout,
  U as dispatchFlowEvent,
  Oe as downloadBlob,
  Ln as downloadLayout,
  On as downloadPng,
  In as downloadSvg,
  Kd as emptyLayout,
  hd as layoutLayered,
  Ad as mountFlow,
  bd as mountGraph,
  Ki as paintLevels,
  be as paintRelations,
  je as paintRowRelations,
  Ud as registerTheme,
  ot as renderSvg,
  Zi as routeEdge,
  Ge as toLayout
};
