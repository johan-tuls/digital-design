var Tn = Object.defineProperty;
var jn = (e, t, n) => t in e ? Tn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var D = (e, t, n) => jn(e, typeof t != "symbol" ? t + "" : t, n);
const K = {
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
function ze(e, t) {
  const n = URL.createObjectURL(e), o = document.createElement("a");
  o.href = n, o.download = t, document.body.appendChild(o), o.click(), o.remove(), URL.revokeObjectURL(n);
}
function Rn(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  ze(new Blob([n], { type: "application/json" }), `${e}.layout.json`);
}
function Pn(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  ze(new Blob([n], { type: "application/json" }), `${e}.flow.json`);
}
const Bn = /^var\((--dd-flow-[a-z-]+)\)$/;
function Dn(e, t) {
  const n = e.cloneNode(!0), o = getComputedStyle(t), r = ["fill", "stroke"], s = (d) => {
    const l = d.match(Bn);
    return l && o.getPropertyValue(l[1]).trim() || d;
  }, i = [n, ...Array.from(n.querySelectorAll("*"))];
  for (const d of i)
    for (const l of r) {
      const a = d.getAttribute(l);
      a && d.setAttribute(l, s(a));
    }
  return n;
}
function Kt(e, t) {
  const n = Dn(e, t);
  return n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), new XMLSerializer().serializeToString(n);
}
function Fn(e, t, n) {
  const o = Kt(e, t);
  ze(new Blob([o], { type: "image/svg+xml;charset=utf-8" }), n);
}
function Gn(e, t, n, o = 2) {
  const r = Kt(e, t), s = parseFloat(e.getAttribute("width") || "800"), i = parseFloat(e.getAttribute("height") || "600"), d = getComputedStyle(t).getPropertyValue("--dd-flow-canvas-bg").trim() || "#ffffff", l = new Blob([r], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(l), c = new Image();
  c.onload = () => {
    const f = document.createElement("canvas");
    f.width = s * o, f.height = i * o;
    const h = f.getContext("2d");
    if (!h) {
      URL.revokeObjectURL(a);
      return;
    }
    h.scale(o, o), h.fillStyle = d, h.fillRect(0, 0, s, i), h.drawImage(c, 0, 0, s, i), URL.revokeObjectURL(a), f.toBlob((w) => {
      w && ze(w, n);
    }, "image/png");
  }, c.onerror = () => URL.revokeObjectURL(a), c.src = a;
}
const qn = "dd-flow-graph-fullscreen-open";
let mt = 0;
function Hn(e, t, n = !0) {
  let o = !1;
  const r = document.createComment("dd-flow fullscreen"), s = n ? document.createElement("button") : null, i = () => {
    s && (s.textContent = o ? "✕" : "⤢", s.setAttribute("aria-label", o ? "Close fullscreen" : "Fullscreen"), s.setAttribute("aria-pressed", String(o)));
  }, d = (a) => {
    a !== o && (mt += a ? 1 : -1, document.body.classList.toggle(qn, mt > 0)), a && !o && e.parentNode && e.parentNode !== document.body ? (e.replaceWith(r), document.body.appendChild(e)) : !a && r.parentNode && r.replaceWith(e), o = a, e.classList.toggle("dd-flow-graph-fullscreen", a), i(), t();
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
const zn = "http://www.w3.org/2000/svg";
function $(e, t = {}) {
  const n = document.createElementNS(zn, e);
  for (const [o, r] of Object.entries(t)) n.setAttribute(o, String(r));
  return n;
}
const gt = {
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
}, ce = 24, fe = 28, Vn = 8;
function Ut(e) {
  return fe + ((e == null ? void 0 : e.length) ?? 0) * ce + Vn;
}
function Ve(e, t, n) {
  const o = [e, ...(t ?? []).map((s) => s.label)], r = Math.max(...o.map((s) => s.length));
  return Math.max(n, r * Xt + 40);
}
function W(e, t) {
  return `${e}::${t}`;
}
function lt(e) {
  return `${W(e.sourceNode, e.sourceRow)}=>${W(e.targetNode, e.targetRow)}`;
}
function bt(e, t, n) {
  var i;
  const o = ((i = e.rows) == null ? void 0 : i.findIndex((d) => d.id === t)) ?? -1;
  if (o < 0) return null;
  const s = -e.h / 2 + fe + o * ce + ce / 2;
  return { x: e.x + (n === "left" ? -e.w / 2 : e.w / 2), y: e.y + s };
}
function Ee(e) {
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
function Wt(e, t, n) {
  const { fill: o, stroke: r } = Ee(e), s = { fill: o, stroke: r, "stroke-width": 2 };
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
          stroke: Ee(e).stroke,
          "stroke-width": 2
        })
      ), i.appendChild(
        $("line", {
          x1: t / 2 - d,
          y1: -n / 2,
          x2: t / 2 - d,
          y2: n / 2,
          stroke: Ee(e).stroke,
          "stroke-width": 2
        })
      ), i;
    }
    case "process":
    default:
      return $("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: 6, ry: 6, ...s });
  }
}
function Yn(e, t) {
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
function Kn(e, t) {
  const { text: n, stroke: o } = Ee(e.type), r = $("g", { class: "dd-flow-node-body" }), s = -e.h / 2, i = (l) => $("line", { x1: -e.w / 2, x2: e.w / 2, y1: l, y2: l, stroke: o, "stroke-width": 1, opacity: 0.4 }), d = $("text", {
    x: 0,
    y: s + fe / 2,
    fill: n,
    "text-anchor": "middle",
    "dominant-baseline": "central",
    class: "dd-flow-label"
  });
  return d.textContent = e.label, r.appendChild(d), r.appendChild(i(s + fe)), (e.rows ?? []).forEach((l, a) => {
    const c = s + fe + a * ce, f = $("g", {
      class: `dd-flow-node-row${l.id === t ? " is-row-selected" : ""}`,
      "data-row-id": l.id
    });
    f.appendChild(
      $("rect", { x: -e.w / 2, y: c, width: e.w, height: ce, fill: "transparent" })
    );
    const h = $("text", {
      x: -e.w / 2 + 10,
      y: c + ce / 2,
      fill: n,
      "text-anchor": "start",
      "dominant-baseline": "central",
      class: "dd-flow-label"
    });
    h.textContent = l.label, f.appendChild(h), r.appendChild(f), a > 0 && r.appendChild(i(c));
  }), r;
}
function Un(e, t = {}) {
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
  if (o.appendChild(Wt(e.type, e.w, e.h)), (r = e.rows) != null && r.length)
    o.appendChild(Kn(e, t.selectedRowId));
  else {
    const { text: s } = Ee(e.type), i = $("text", {
      x: 0,
      y: 0,
      fill: s,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      class: "dd-flow-label"
    });
    Wn(i, e.label, e.w - 20), o.appendChild(i);
  }
  return e.subflow && o.appendChild(Yn(e.w, e.h)), o;
}
const ot = 16, Xt = 7.2;
function ct(e, t) {
  const n = e.split(/\s+/), o = Math.max(4, Math.floor(t / Xt)), r = [];
  let s = "";
  for (const i of n) {
    const d = s ? `${s} ${i}` : i;
    d.length > o && s ? (r.push(s), s = i) : s = d;
  }
  return s && r.push(s), r;
}
function Wn(e, t, n) {
  const o = ct(t, n), r = -((o.length - 1) * ot) / 2;
  o.forEach((s, i) => {
    const d = $("tspan", { x: 0, y: r + i * ot });
    d.textContent = s, e.appendChild(d);
  });
}
function Jt(e, t, n) {
  const r = n - (e === "start" || e === "end" ? n * 0.3 : 20);
  return ct(t, Math.max(20, r)).length * ot + 24;
}
function Be(e) {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const o of e)
    t.has(o.to) || t.set(o.to, []), t.get(o.to).push(o.from), n.has(o.from) || n.set(o.from, []), n.get(o.from).push(o.to);
  return { parentsOf: t, childrenOf: n };
}
function se(e, t) {
  const n = /* @__PURE__ */ new Set(), o = [...e.get(t) ?? []];
  for (; o.length; ) {
    const r = o.pop();
    n.has(r) || (n.add(r), o.push(...e.get(r) ?? []));
  }
  return n;
}
const yt = ["is-focus", "is-upstream", "is-downstream", "is-dimmed"], vt = ["is-row-focus", "is-row-upstream", "is-row-downstream", "is-row-dimmed"];
function Qt(e, t, n, o, r) {
  const s = new Set(n ? [...o, n] : []), i = new Set(n ? [...r, n] : []);
  for (const l of e.querySelectorAll(".dd-flow-node")) {
    if (l.classList.remove(...yt), !n) continue;
    const a = l.getAttribute("data-node-id") ?? "";
    a === n ? l.classList.add("is-focus") : o.has(a) ? l.classList.add("is-upstream") : r.has(a) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed");
  }
  const d = new Map(t.map((l) => [l.id, l]));
  for (const l of e.querySelectorAll(".dd-flow-edge")) {
    if (l.classList.remove(...yt), !n) continue;
    const a = d.get(l.getAttribute("data-edge-id") ?? "");
    a && (s.has(a.from) && s.has(a.to) ? l.classList.add("is-upstream") : i.has(a.from) && i.has(a.to) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed"));
  }
}
function Me(e, t, n, o) {
  const r = o ? se(n.parentsOf, o) : /* @__PURE__ */ new Set(), s = o ? se(n.childrenOf, o) : /* @__PURE__ */ new Set();
  Qt(e, t, o, r, s);
}
function Ue(e, t, n, o) {
  var c;
  const r = o ? W(o.nodeId, o.rowId) : null, s = r ? se(n.parentsOf, r) : /* @__PURE__ */ new Set(), i = r ? se(n.childrenOf, r) : /* @__PURE__ */ new Set(), d = new Set(r ? [...s, r] : []), l = new Set(r ? [...i, r] : []);
  for (const f of e.querySelectorAll(".dd-flow-node-row")) {
    if (f.classList.remove(...vt), !r) continue;
    const h = ((c = f.closest(".dd-flow-node")) == null ? void 0 : c.getAttribute("data-node-id")) ?? "", w = f.getAttribute("data-row-id") ?? "", p = W(h, w);
    p === r ? f.classList.add("is-row-focus") : s.has(p) ? f.classList.add("is-row-upstream") : i.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
  const a = new Map(t.map((f) => [lt(f), f]));
  for (const f of e.querySelectorAll(".dd-flow-row-edge")) {
    if (f.classList.remove(...vt), !r) continue;
    const h = a.get(f.getAttribute("data-row-edge-id") ?? "");
    if (!h) continue;
    const w = W(h.sourceNode, h.sourceRow), p = W(h.targetNode, h.targetRow);
    d.has(w) && d.has(p) ? f.classList.add("is-row-upstream") : l.has(w) && l.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
}
function Xn(e, t, n = {}) {
  const o = Be(t), r = n.flowId ?? "", s = n.rowEdges ?? [], i = Be(
    s.map((m) => ({
      id: lt(m),
      from: W(m.sourceNode, m.sourceRow),
      to: W(m.targetNode, m.targetRow)
    }))
  ), d = /* @__PURE__ */ new Map();
  for (const m of s)
    d.set(W(m.sourceNode, m.sourceRow), m.sourceNode), d.set(W(m.targetNode, m.targetRow), m.targetNode);
  let l = null, a = null;
  const c = () => a ? `r:${a.nodeId}:${a.rowId}` : l ? `n:${l}` : "", f = () => U(e, K.selectionChange, {
    flowId: r,
    selectedNodeIds: a ? [a.nodeId] : l ? [l] : [],
    selectedEdgeId: null
  }), h = (m) => {
    var E;
    const L = (E = m == null ? void 0 : m.closest) == null ? void 0 : E.call(m, ".dd-flow-node");
    return (L == null ? void 0 : L.getAttribute("data-node-id")) ?? null;
  }, w = (m) => {
    var N, x;
    const L = (N = m == null ? void 0 : m.closest) == null ? void 0 : N.call(m, ".dd-flow-node-row"), E = (x = L == null ? void 0 : L.closest(".dd-flow-node")) == null ? void 0 : x.getAttribute("data-node-id"), v = L == null ? void 0 : L.getAttribute("data-row-id");
    return E && v ? { nodeId: E, rowId: v } : null;
  }, p = () => {
    if (a) {
      const m = W(a.nodeId, a.rowId), L = se(i.parentsOf, m), E = se(i.childrenOf, m);
      Ue(e, s, i, a);
      const v = new Set([...L].map((x) => d.get(x) ?? x)), N = new Set([...E].map((x) => d.get(x) ?? x));
      Qt(e, t, a.nodeId, v, N);
    } else
      Me(e, t, o, l), s.length && Ue(e, s, i, null);
  }, g = (m) => {
    if (l || a) return;
    const L = h(m.target);
    L && Me(e, t, o, L);
  }, y = (m) => {
    var E, v;
    if (l || a) return;
    const L = (v = (E = m.relatedTarget) == null ? void 0 : E.closest) == null ? void 0 : v.call(E, ".dd-flow-node");
    L && L === m.target.closest(".dd-flow-node") || Me(e, t, o, null);
  }, C = (m) => {
    const L = h(m.target), E = s.length ? w(m.target) : null, v = c();
    E ? (a = (a == null ? void 0 : a.nodeId) === E.nodeId && (a == null ? void 0 : a.rowId) === E.rowId ? null : E, l = null) : (l = L && L !== l ? L : null, a = null), p(), L ? U(e, K.nodeClick, {
      flowId: r,
      nodeId: L,
      shiftKey: m.shiftKey
    }) : U(e, K.backgroundClick, {
      flowId: r,
      point: { x: m.clientX, y: m.clientY },
      shiftKey: m.shiftKey
    }), c() !== v && f();
  };
  return n.hover !== !1 && (e.addEventListener("pointerover", g), e.addEventListener("pointerout", y)), e.addEventListener("click", C), {
    setFocus(m) {
      const L = c();
      l = m, a = null, p(), c() !== L && f();
    },
    getFocus: () => l,
    setRowFocus(m) {
      const L = c();
      a = m, l = null, p(), c() !== L && f();
    },
    getRowFocus: () => a,
    destroy() {
      e.removeEventListener("pointerover", g), e.removeEventListener("pointerout", y), e.removeEventListener("click", C), Me(e, t, o, null), s.length && Ue(e, s, i, null);
    }
  };
}
function Jn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Qn = "\0", re = "\0", Et = "";
let Zn = class {
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
    t && (this._isDirected = Object.hasOwn(t, "directed") ? t.directed : !0, this._isMultigraph = Object.hasOwn(t, "multigraph") ? t.multigraph : !1, this._isCompound = Object.hasOwn(t, "compound") ? t.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[re] = {});
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
    return Object.hasOwn(this._nodes, t) ? (arguments.length > 1 && (this._nodes[t] = n), this) : (this._nodes[t] = arguments.length > 1 ? n : this._defaultNodeLabelFn(t), this._isCompound && (this._parent[t] = re, this._children[t] = {}, this._children[re][t] = !0), this._in[t] = {}, this._preds[t] = {}, this._out[t] = {}, this._sucs[t] = {}, ++this._nodeCount, this);
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
      n = re;
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
      if (n !== re)
        return n;
    }
  }
  /**
   * Gets list of direct children of node v.
   * Complexity: O(1).
   */
  children(t = re) {
    if (this._isCompound) {
      var n = this._children[t];
      if (n)
        return Object.keys(n);
    } else {
      if (t === re)
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
    var d = be(this._isDirected, t, n, o);
    if (Object.hasOwn(this._edgeLabels, d))
      return s && (this._edgeLabels[d] = r), this;
    if (o !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[d] = s ? r : this._defaultEdgeLabelFn(t, n, o);
    var l = eo(this._isDirected, t, n, o);
    return t = l.v, n = l.w, Object.freeze(l), this._edgeObjs[d] = l, xt(this._preds[n], t), xt(this._sucs[t], n), this._in[n][d] = l, this._out[t][d] = l, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, o) {
    var r = arguments.length === 1 ? We(this._isDirected, arguments[0]) : be(this._isDirected, t, n, o);
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
    var r = arguments.length === 1 ? We(this._isDirected, arguments[0]) : be(this._isDirected, t, n, o);
    return Object.hasOwn(this._edgeLabels, r);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, o) {
    var r = arguments.length === 1 ? We(this._isDirected, arguments[0]) : be(this._isDirected, t, n, o), s = this._edgeObjs[r];
    return s && (t = s.v, n = s.w, delete this._edgeLabels[r], delete this._edgeObjs[r], kt(this._preds[n], t), kt(this._sucs[t], n), delete this._in[n][r], delete this._out[t][r], this._edgeCount--), this;
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
function xt(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function kt(e, t) {
  --e[t] || delete e[t];
}
function be(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  return r + Et + s + Et + (o === void 0 ? Qn : o);
}
function eo(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  var d = { v: r, w: s };
  return o && (d.name = o), d;
}
function We(e, t) {
  return be(e, t.v, t.w, t.name);
}
var ft = Zn, to = "2.2.4", no = {
  Graph: ft,
  version: to
}, oo = ft, ro = {
  write: so,
  read: lo
};
function so(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: io(e),
    edges: ao(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function io(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), o = e.parent(t), r = { v: t };
    return n !== void 0 && (r.value = n), o !== void 0 && (r.parent = o), r;
  });
}
function ao(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), o = { v: t.v, w: t.w };
    return t.name !== void 0 && (o.name = t.name), n !== void 0 && (o.value = n), o;
  });
}
function lo(e) {
  var t = new oo(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var co = fo;
function fo(e) {
  var t = {}, n = [], o;
  function r(s) {
    Object.hasOwn(t, s) || (t[s] = !0, o.push(s), e.successors(s).forEach(r), e.predecessors(s).forEach(r));
  }
  return e.nodes().forEach(function(s) {
    o = [], r(s), o.length && n.push(o);
  }), n;
}
let uo = class {
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
var Zt = uo, ho = Zt, en = wo, po = () => 1;
function wo(e, t, n, o) {
  return mo(
    e,
    String(t),
    n || po,
    o || function(r) {
      return e.outEdges(r);
    }
  );
}
function mo(e, t, n, o) {
  var r = {}, s = new ho(), i, d, l = function(a) {
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
var go = en, bo = yo;
function yo(e, t, n) {
  return e.nodes().reduce(function(o, r) {
    return o[r] = go(e, r, t, n), o;
  }, {});
}
var tn = vo;
function vo(e) {
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
var Eo = tn, xo = ko;
function ko(e) {
  return Eo(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var Co = So, Lo = () => 1;
function So(e, t, n) {
  return _o(
    e,
    t || Lo,
    n || function(o) {
      return e.outEdges(o);
    }
  );
}
function _o(e, t, n) {
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
function nn(e) {
  var t = {}, n = {}, o = [];
  function r(s) {
    if (Object.hasOwn(n, s))
      throw new rt();
    Object.hasOwn(t, s) || (n[s] = !0, t[s] = !0, e.predecessors(s).forEach(r), delete n[s], o.push(s));
  }
  if (e.sinks().forEach(r), Object.keys(t).length !== e.nodeCount())
    throw new rt();
  return o;
}
class rt extends Error {
  constructor() {
    super(...arguments);
  }
}
var on = nn;
nn.CycleException = rt;
var Ct = on, No = Io;
function Io(e) {
  try {
    Ct(e);
  } catch (t) {
    if (t instanceof Ct.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var rn = Oo;
function Oo(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var o = e.isDirected() ? (d) => e.successors(d) : (d) => e.neighbors(d), r = n === "post" ? $o : Mo, s = [], i = {};
  return t.forEach((d) => {
    if (!e.hasNode(d))
      throw new Error("Graph does not have node: " + d);
    r(d, o, i, s);
  }), s;
}
function $o(e, t, n, o) {
  for (var r = [[e, !1]]; r.length > 0; ) {
    var s = r.pop();
    s[1] ? o.push(s[0]) : Object.hasOwn(n, s[0]) || (n[s[0]] = !0, r.push([s[0], !0]), sn(t(s[0]), (i) => r.push([i, !1])));
  }
}
function Mo(e, t, n, o) {
  for (var r = [e]; r.length > 0; ) {
    var s = r.pop();
    Object.hasOwn(n, s) || (n[s] = !0, o.push(s), sn(t(s), (i) => r.push(i)));
  }
}
function sn(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var Ao = rn, To = jo;
function jo(e, t) {
  return Ao(e, t, "post");
}
var Ro = rn, Po = Bo;
function Bo(e, t) {
  return Ro(e, t, "pre");
}
var Do = ft, Fo = Zt, Go = qo;
function qo(e, t) {
  var n = new Do(), o = {}, r = new Fo(), s;
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
var Ho = {
  components: co,
  dijkstra: en,
  dijkstraAll: bo,
  findCycles: xo,
  floydWarshall: Co,
  isAcyclic: No,
  postorder: To,
  preorder: Po,
  prim: Go,
  tarjan: tn,
  topsort: on
}, Lt = no, X = {
  Graph: Lt.Graph,
  json: ro,
  alg: Ho,
  version: Lt.version
};
let zo = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return St(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && St(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, o = n._prev;
    for (; o !== n; )
      t.push(JSON.stringify(o, Vo)), o = o._prev;
    return "[" + t.join(", ") + "]";
  }
};
function St(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function Vo(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var Yo = zo;
let Ko = X.Graph, Uo = Yo;
var Wo = Jo;
let Xo = () => 1;
function Jo(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = Zo(e, t || Xo);
  return Qo(n.graph, n.buckets, n.zeroIdx).flatMap((r) => e.outEdges(r.v, r.w));
}
function Qo(e, t, n) {
  let o = [], r = t[t.length - 1], s = t[0], i;
  for (; e.nodeCount(); ) {
    for (; i = s.dequeue(); )
      Xe(e, t, n, i);
    for (; i = r.dequeue(); )
      Xe(e, t, n, i);
    if (e.nodeCount()) {
      for (let d = t.length - 2; d > 0; --d)
        if (i = t[d].dequeue(), i) {
          o = o.concat(Xe(e, t, n, i, !0));
          break;
        }
    }
  }
  return o;
}
function Xe(e, t, n, o, r) {
  let s = r ? [] : void 0;
  return e.inEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = e.node(i.v);
    r && s.push({ v: i.v, w: i.w }), l.out -= d, st(t, n, l);
  }), e.outEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = i.w, a = e.node(l);
    a.in -= d, st(t, n, a);
  }), e.removeNode(o.v), s;
}
function Zo(e, t) {
  let n = new Ko(), o = 0, r = 0;
  e.nodes().forEach((d) => {
    n.setNode(d, { v: d, in: 0, out: 0 });
  }), e.edges().forEach((d) => {
    let l = n.edge(d.v, d.w) || 0, a = t(d), c = l + a;
    n.setEdge(d.v, d.w, c), r = Math.max(r, n.node(d.v).out += a), o = Math.max(o, n.node(d.w).in += a);
  });
  let s = er(r + o + 3).map(() => new Uo()), i = o + 1;
  return n.nodes().forEach((d) => {
    st(s, i, n.node(d));
  }), { graph: n, buckets: s, zeroIdx: i };
}
function st(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function er(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let dn = X.Graph;
var F = {
  addBorderNode: lr,
  addDummyNode: an,
  applyWithChunking: Ye,
  asNonCompoundGraph: nr,
  buildLayerMatrix: ir,
  intersectRect: sr,
  mapValues: mr,
  maxRank: cn,
  normalizeRanks: dr,
  notime: hr,
  partition: fr,
  pick: wr,
  predecessorWeights: rr,
  range: un,
  removeEmptyRanks: ar,
  simplify: tr,
  successorWeights: or,
  time: ur,
  uniqueId: fn,
  zipObject: ut
};
function an(e, t, n, o) {
  for (var r = o; e.hasNode(r); )
    r = fn(o);
  return n.dummy = t, e.setNode(r, n), r;
}
function tr(e) {
  let t = new dn().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let o = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, r = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: o.weight + r.weight,
      minlen: Math.max(o.minlen, r.minlen)
    });
  }), t;
}
function nr(e) {
  let t = new dn({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function or(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.outEdges(n).forEach((r) => {
      o[r.w] = (o[r.w] || 0) + e.edge(r).weight;
    }), o;
  });
  return ut(e.nodes(), t);
}
function rr(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.inEdges(n).forEach((r) => {
      o[r.v] = (o[r.v] || 0) + e.edge(r).weight;
    }), o;
  });
  return ut(e.nodes(), t);
}
function sr(e, t) {
  let n = e.x, o = e.y, r = t.x - n, s = t.y - o, i = e.width / 2, d = e.height / 2;
  if (!r && !s)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let l, a;
  return Math.abs(s) * i > Math.abs(r) * d ? (s < 0 && (d = -d), l = d * r / s, a = d) : (r < 0 && (i = -i), l = i, a = i * s / r), { x: n + l, y: o + a };
}
function ir(e) {
  let t = un(cn(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let o = e.node(n), r = o.rank;
    r !== void 0 && (t[r][o.order] = n);
  }), t;
}
function dr(e) {
  let t = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MAX_VALUE : r;
  }), n = Ye(Math.min, t);
  e.nodes().forEach((o) => {
    let r = e.node(o);
    Object.hasOwn(r, "rank") && (r.rank -= n);
  });
}
function ar(e) {
  let t = e.nodes().map((i) => e.node(i).rank), n = Ye(Math.min, t), o = [];
  e.nodes().forEach((i) => {
    let d = e.node(i).rank - n;
    o[d] || (o[d] = []), o[d].push(i);
  });
  let r = 0, s = e.graph().nodeRankFactor;
  Array.from(o).forEach((i, d) => {
    i === void 0 && d % s !== 0 ? --r : i !== void 0 && r && i.forEach((l) => e.node(l).rank += r);
  });
}
function lr(e, t, n, o) {
  let r = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (r.rank = n, r.order = o), an(e, "border", r, t);
}
function cr(e, t = ln) {
  const n = [];
  for (let o = 0; o < e.length; o += t) {
    const r = e.slice(o, o + t);
    n.push(r);
  }
  return n;
}
const ln = 65535;
function Ye(e, t) {
  if (t.length > ln) {
    const n = cr(t);
    return e.apply(null, n.map((o) => e.apply(null, o)));
  } else
    return e.apply(null, t);
}
function cn(e) {
  const n = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MIN_VALUE : r;
  });
  return Ye(Math.max, n);
}
function fr(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((o) => {
    t(o) ? n.lhs.push(o) : n.rhs.push(o);
  }), n;
}
function ur(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function hr(e, t) {
  return t();
}
let pr = 0;
function fn(e) {
  var t = ++pr;
  return e + ("" + t);
}
function un(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let o = (s) => s < t;
  n < 0 && (o = (s) => t < s);
  const r = [];
  for (let s = e; o(s); s += n)
    r.push(s);
  return r;
}
function wr(e, t) {
  const n = {};
  for (const o of t)
    e[o] !== void 0 && (n[o] = e[o]);
  return n;
}
function mr(e, t) {
  let n = t;
  return typeof t == "string" && (n = (o) => o[t]), Object.entries(e).reduce((o, [r, s]) => (o[r] = n(s, r), o), {});
}
function ut(e, t) {
  return e.reduce((n, o, r) => (n[o] = t[r], n), {});
}
let gr = Wo, br = F.uniqueId;
var yr = {
  run: vr,
  undo: xr
};
function vr(e) {
  (e.graph().acyclicer === "greedy" ? gr(e, n(e)) : Er(e)).forEach((o) => {
    let r = e.edge(o);
    e.removeEdge(o), r.forwardName = o.name, r.reversed = !0, e.setEdge(o.w, o.v, r, br("rev"));
  });
  function n(o) {
    return (r) => o.edge(r).weight;
  }
}
function Er(e) {
  let t = [], n = {}, o = {};
  function r(s) {
    Object.hasOwn(o, s) || (o[s] = !0, n[s] = !0, e.outEdges(s).forEach((i) => {
      Object.hasOwn(n, i.w) ? t.push(i) : r(i.w);
    }), delete n[s]);
  }
  return e.nodes().forEach(r), t;
}
function xr(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let o = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, o);
    }
  });
}
let kr = F;
var Cr = {
  run: Lr,
  undo: _r
};
function Lr(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => Sr(e, t));
}
function Sr(e, t) {
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
    }, a = kr.addDummyNode(e, "edge", c, "_d"), o === l && (c.width = d.width, c.height = d.height, c.dummy = "edge-label", c.labelpos = d.labelpos), e.setEdge(n, a, { weight: d.weight }, i), f === 0 && e.graph().dummyChains.push(a), n = a;
  e.setEdge(n, r, { weight: d.weight }, i);
}
function _r(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), o = n.edgeLabel, r;
    for (e.setEdge(n.edgeObj, o); n.dummy; )
      r = e.successors(t)[0], e.removeNode(t), o.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (o.x = n.x, o.y = n.y, o.width = n.width, o.height = n.height), t = r, n = e.node(t);
  });
}
const { applyWithChunking: Nr } = F;
var Ke = {
  longestPath: Ir,
  slack: Or
};
function Ir(e) {
  var t = {};
  function n(o) {
    var r = e.node(o);
    if (Object.hasOwn(t, o))
      return r.rank;
    t[o] = !0;
    let s = e.outEdges(o).map((d) => d == null ? Number.POSITIVE_INFINITY : n(d.w) - e.edge(d).minlen);
    var i = Nr(Math.min, s);
    return i === Number.POSITIVE_INFINITY && (i = 0), r.rank = i;
  }
  e.sources().forEach(n);
}
function Or(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var $r = X.Graph, De = Ke.slack, hn = Mr;
function Mr(e) {
  var t = new $r({ directed: !1 }), n = e.nodes()[0], o = e.nodeCount();
  t.setNode(n, {});
  for (var r, s; Ar(t, e) < o; )
    r = Tr(t, e), s = t.hasNode(r.v) ? De(e, r) : -De(e, r), jr(t, e, s);
  return t;
}
function Ar(e, t) {
  function n(o) {
    t.nodeEdges(o).forEach((r) => {
      var s = r.v, i = o === s ? r.w : s;
      !e.hasNode(i) && !De(t, r) && (e.setNode(i, {}), e.setEdge(o, i, {}), n(i));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function Tr(e, t) {
  return t.edges().reduce((o, r) => {
    let s = Number.POSITIVE_INFINITY;
    return e.hasNode(r.v) !== e.hasNode(r.w) && (s = De(t, r)), s < o[0] ? [s, r] : o;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function jr(e, t, n) {
  e.nodes().forEach((o) => t.node(o).rank += n);
}
var Rr = hn, _t = Ke.slack, Pr = Ke.longestPath, Br = X.alg.preorder, Dr = X.alg.postorder, Fr = F.simplify, Gr = ie;
ie.initLowLimValues = pt;
ie.initCutValues = ht;
ie.calcCutValue = pn;
ie.leaveEdge = mn;
ie.enterEdge = gn;
ie.exchangeEdges = bn;
function ie(e) {
  e = Fr(e), Pr(e);
  var t = Rr(e);
  pt(t), ht(t, e);
  for (var n, o; n = mn(t); )
    o = gn(t, e, n), bn(t, e, n, o);
}
function ht(e, t) {
  var n = Dr(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((o) => qr(e, t, o));
}
function qr(e, t, n) {
  var o = e.node(n), r = o.parent;
  e.edge(n, r).cutvalue = pn(e, t, n);
}
function pn(e, t, n) {
  var o = e.node(n), r = o.parent, s = !0, i = t.edge(n, r), d = 0;
  return i || (s = !1, i = t.edge(r, n)), d = i.weight, t.nodeEdges(n).forEach((l) => {
    var a = l.v === n, c = a ? l.w : l.v;
    if (c !== r) {
      var f = a === s, h = t.edge(l).weight;
      if (d += f ? h : -h, zr(e, n, c)) {
        var w = e.edge(n, c).cutvalue;
        d += f ? -w : w;
      }
    }
  }), d;
}
function pt(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), wn(e, {}, 1, t);
}
function wn(e, t, n, o, r) {
  var s = n, i = e.node(o);
  return t[o] = !0, e.neighbors(o).forEach((d) => {
    Object.hasOwn(t, d) || (n = wn(e, t, n, d, o));
  }), i.low = s, i.lim = n++, r ? i.parent = r : delete i.parent, n;
}
function mn(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function gn(e, t, n) {
  var o = n.v, r = n.w;
  t.hasEdge(o, r) || (o = n.w, r = n.v);
  var s = e.node(o), i = e.node(r), d = s, l = !1;
  s.lim > i.lim && (d = i, l = !0);
  var a = t.edges().filter((c) => l === Nt(e, e.node(c.v), d) && l !== Nt(e, e.node(c.w), d));
  return a.reduce((c, f) => _t(t, f) < _t(t, c) ? f : c);
}
function bn(e, t, n, o) {
  var r = n.v, s = n.w;
  e.removeEdge(r, s), e.setEdge(o.v, o.w, {}), pt(e), ht(e, t), Hr(e, t);
}
function Hr(e, t) {
  var n = e.nodes().find((r) => !t.node(r).parent), o = Br(e, n);
  o = o.slice(1), o.forEach((r) => {
    var s = e.node(r).parent, i = t.edge(r, s), d = !1;
    i || (i = t.edge(s, r), d = !0), t.node(r).rank = t.node(s).rank + (d ? i.minlen : -i.minlen);
  });
}
function zr(e, t, n) {
  return e.hasEdge(t, n);
}
function Nt(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var Vr = Ke, yn = Vr.longestPath, Yr = hn, Kr = Gr, Ur = Wr;
function Wr(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      It(e);
      break;
    case "tight-tree":
      Jr(e);
      break;
    case "longest-path":
      Xr(e);
      break;
    case "none":
      break;
    default:
      It(e);
  }
}
var Xr = yn;
function Jr(e) {
  yn(e), Yr(e);
}
function It(e) {
  Kr(e);
}
var Qr = Zr;
function Zr(e) {
  let t = ts(e);
  e.graph().dummyChains.forEach((n) => {
    let o = e.node(n), r = o.edgeObj, s = es(e, t, r.v, r.w), i = s.path, d = s.lca, l = 0, a = i[l], c = !0;
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
function es(e, t, n, o) {
  let r = [], s = [], i = Math.min(t[n].low, t[o].low), d = Math.max(t[n].lim, t[o].lim), l, a;
  l = n;
  do
    l = e.parent(l), r.push(l);
  while (l && (t[l].low > i || d > t[l].lim));
  for (a = l, l = o; (l = e.parent(l)) !== a; )
    s.push(l);
  return { path: r.concat(s.reverse()), lca: a };
}
function ts(e) {
  let t = {}, n = 0;
  function o(r) {
    let s = n;
    e.children(r).forEach(o), t[r] = { low: s, lim: n++ };
  }
  return e.children().forEach(o), t;
}
let Fe = F;
var ns = {
  run: os,
  cleanup: is
};
function os(e) {
  let t = Fe.addDummyNode(e, "root", {}, "_root"), n = rs(e), o = Object.values(n), r = Fe.applyWithChunking(Math.max, o) - 1, s = 2 * r + 1;
  e.graph().nestingRoot = t, e.edges().forEach((d) => e.edge(d).minlen *= s);
  let i = ss(e) + 1;
  e.children().forEach((d) => vn(e, t, s, i, r, n, d)), e.graph().nodeRankFactor = s;
}
function vn(e, t, n, o, r, s, i) {
  let d = e.children(i);
  if (!d.length) {
    i !== t && e.setEdge(t, i, { weight: 0, minlen: n });
    return;
  }
  let l = Fe.addBorderNode(e, "_bt"), a = Fe.addBorderNode(e, "_bb"), c = e.node(i);
  e.setParent(l, i), c.borderTop = l, e.setParent(a, i), c.borderBottom = a, d.forEach((f) => {
    vn(e, t, n, o, r, s, f);
    let h = e.node(f), w = h.borderTop ? h.borderTop : f, p = h.borderBottom ? h.borderBottom : f, g = h.borderTop ? o : 2 * o, y = w !== p ? 1 : r - s[i] + 1;
    e.setEdge(l, w, {
      weight: g,
      minlen: y,
      nestingEdge: !0
    }), e.setEdge(p, a, {
      weight: g,
      minlen: y,
      nestingEdge: !0
    });
  }), e.parent(i) || e.setEdge(t, l, { weight: 0, minlen: r + s[i] });
}
function rs(e) {
  var t = {};
  function n(o, r) {
    var s = e.children(o);
    s && s.length && s.forEach((i) => n(i, r + 1)), t[o] = r;
  }
  return e.children().forEach((o) => n(o, 1)), t;
}
function ss(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function is(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var o = e.edge(n);
    o.nestingEdge && e.removeEdge(n);
  });
}
let ds = F;
var as = ls;
function ls(e) {
  function t(n) {
    let o = e.children(n), r = e.node(n);
    if (o.length && o.forEach(t), Object.hasOwn(r, "minRank")) {
      r.borderLeft = [], r.borderRight = [];
      for (let s = r.minRank, i = r.maxRank + 1; s < i; ++s)
        Ot(e, "borderLeft", "_bl", n, r, s), Ot(e, "borderRight", "_br", n, r, s);
    }
  }
  e.children().forEach(t);
}
function Ot(e, t, n, o, r, s) {
  let i = { width: 0, height: 0, rank: s, borderType: t }, d = r[t][s - 1], l = ds.addDummyNode(e, "border", i, n);
  r[t][s] = l, e.setParent(l, o), d && e.setEdge(d, l, { weight: 1 });
}
var cs = {
  adjust: fs,
  undo: us
};
function fs(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && En(e);
}
function us(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && hs(e), (t === "lr" || t === "rl") && (ps(e), En(e));
}
function En(e) {
  e.nodes().forEach((t) => $t(e.node(t))), e.edges().forEach((t) => $t(e.edge(t)));
}
function $t(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function hs(e) {
  e.nodes().forEach((t) => Je(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Je), Object.hasOwn(n, "y") && Je(n);
  });
}
function Je(e) {
  e.y = -e.y;
}
function ps(e) {
  e.nodes().forEach((t) => Qe(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Qe), Object.hasOwn(n, "x") && Qe(n);
  });
}
function Qe(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let Mt = F;
var ws = ms;
function ms(e) {
  let t = {}, n = e.nodes().filter((l) => !e.children(l).length), o = n.map((l) => e.node(l).rank), r = Mt.applyWithChunking(Math.max, o), s = Mt.range(r + 1).map(() => []);
  function i(l) {
    if (t[l]) return;
    t[l] = !0;
    let a = e.node(l);
    s[a.rank].push(l), e.successors(l).forEach(i);
  }
  return n.sort((l, a) => e.node(l).rank - e.node(a).rank).forEach(i), s;
}
let gs = F.zipObject;
var bs = ys;
function ys(e, t) {
  let n = 0;
  for (let o = 1; o < t.length; ++o)
    n += vs(e, t[o - 1], t[o]);
  return n;
}
function vs(e, t, n) {
  let o = gs(n, n.map((a, c) => c)), r = t.flatMap((a) => e.outEdges(a).map((c) => ({ pos: o[c.w], weight: e.edge(c).weight })).sort((c, f) => c.pos - f.pos)), s = 1;
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
var Es = xs;
function xs(e, t = []) {
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
let ks = F;
var Cs = Ls;
function Ls(e, t) {
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
  return Ss(o);
}
function Ss(e) {
  let t = [];
  function n(r) {
    return (s) => {
      s.merged || (s.barycenter === void 0 || r.barycenter === void 0 || s.barycenter >= r.barycenter) && _s(r, s);
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
  return t.filter((r) => !r.merged).map((r) => ks.pick(r, ["vs", "i", "barycenter", "weight"]));
}
function _s(e, t) {
  let n = 0, o = 0;
  e.weight && (n += e.barycenter * e.weight, o += e.weight), t.weight && (n += t.barycenter * t.weight, o += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / o, e.weight = o, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let Ns = F;
var Is = Os;
function Os(e, t) {
  let n = Ns.partition(e, (c) => Object.hasOwn(c, "barycenter")), o = n.lhs, r = n.rhs.sort((c, f) => f.i - c.i), s = [], i = 0, d = 0, l = 0;
  o.sort($s(!!t)), l = At(s, r, l), o.forEach((c) => {
    l += c.vs.length, s.push(c.vs), i += c.barycenter * c.weight, d += c.weight, l = At(s, r, l);
  });
  let a = { vs: s.flat(!0) };
  return d && (a.barycenter = i / d, a.weight = d), a;
}
function At(e, t, n) {
  let o;
  for (; t.length && (o = t[t.length - 1]).i <= n; )
    t.pop(), e.push(o.vs), n++;
  return n;
}
function $s(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let Ms = Es, As = Cs, Ts = Is;
var js = xn;
function xn(e, t, n, o) {
  let r = e.children(t), s = e.node(t), i = s ? s.borderLeft : void 0, d = s ? s.borderRight : void 0, l = {};
  i && (r = r.filter((h) => h !== i && h !== d));
  let a = Ms(e, r);
  a.forEach((h) => {
    if (e.children(h.v).length) {
      let w = xn(e, h.v, n, o);
      l[h.v] = w, Object.hasOwn(w, "barycenter") && Ps(h, w);
    }
  });
  let c = As(a, n);
  Rs(c, l);
  let f = Ts(c, o);
  if (i && (f.vs = [i, f.vs, d].flat(!0), e.predecessors(i).length)) {
    let h = e.node(e.predecessors(i)[0]), w = e.node(e.predecessors(d)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + h.order + w.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function Rs(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((o) => t[o] ? t[o].vs : o);
  });
}
function Ps(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let Bs = X.Graph, Ds = F;
var Fs = Gs;
function Gs(e, t, n, o) {
  o || (o = e.nodes());
  let r = qs(e), s = new Bs({ compound: !0 }).setGraph({ root: r }).setDefaultNodeLabel((i) => e.node(i));
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
function qs(e) {
  for (var t; e.hasNode(t = Ds.uniqueId("_root")); ) ;
  return t;
}
var Hs = zs;
function zs(e, t, n) {
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
let Vs = ws, Ys = bs, Ks = js, Us = Fs, Ws = Hs, Xs = X.Graph, Ae = F;
var Js = kn;
function kn(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, kn);
    return;
  }
  let n = Ae.maxRank(e), o = Tt(e, Ae.range(1, n + 1), "inEdges"), r = Tt(e, Ae.range(n - 1, -1, -1), "outEdges"), s = Vs(e);
  if (jt(e, s), t && t.disableOptimalOrderHeuristic)
    return;
  let i = Number.POSITIVE_INFINITY, d;
  for (let l = 0, a = 0; a < 4; ++l, ++a) {
    Qs(l % 2 ? o : r, l % 4 >= 2), s = Ae.buildLayerMatrix(e);
    let c = Ys(e, s);
    c < i && (a = 0, d = Object.assign({}, s), i = c);
  }
  jt(e, d);
}
function Tt(e, t, n) {
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
    return Us(e, s, n, o.get(s) || []);
  });
}
function Qs(e, t) {
  let n = new Xs();
  e.forEach(function(o) {
    let r = o.graph().root, s = Ks(o, r, n, t);
    s.vs.forEach((i, d) => o.node(i).order = d), Ws(o, n, s.vs);
  });
}
function jt(e, t) {
  Object.values(t).forEach((n) => n.forEach((o, r) => e.node(o).order = r));
}
let Zs = X.Graph, Q = F;
var ei = {
  positionX: fi
};
function ti(e, t) {
  let n = {};
  function o(r, s) {
    let i = 0, d = 0, l = r.length, a = s[s.length - 1];
    return s.forEach((c, f) => {
      let h = oi(e, c), w = h ? e.node(h).order : l;
      (h || c === a) && (s.slice(d, f + 1).forEach((p) => {
        e.predecessors(p).forEach((g) => {
          let y = e.node(g), C = y.order;
          (C < i || w < C) && !(y.dummy && e.node(p).dummy) && Cn(n, g, p);
        });
      }), d = f + 1, i = w);
    }), s;
  }
  return t.length && t.reduce(o), n;
}
function ni(e, t) {
  let n = {};
  function o(s, i, d, l, a) {
    let c;
    Q.range(i, d).forEach((f) => {
      c = s[f], e.node(c).dummy && e.predecessors(c).forEach((h) => {
        let w = e.node(h);
        w.dummy && (w.order < l || w.order > a) && Cn(n, h, c);
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
function oi(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function Cn(e, t, n) {
  if (t > n) {
    let r = t;
    t = n, n = r;
  }
  let o = e[t];
  o || (e[t] = o = {}), o[n] = !0;
}
function ri(e, t, n) {
  if (t > n) {
    let o = t;
    t = n, n = o;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function si(e, t, n, o) {
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
          s[a] === a && l < i[p] && !ri(n, a, p) && (s[p] = a, s[a] = r[a] = r[p], l = i[p]);
        }
      }
    });
  }), { root: r, align: s };
}
function ii(e, t, n, o, r) {
  let s = {}, i = di(e, t, n, r), d = r ? "borderLeft" : "borderRight";
  function l(f, h) {
    let w = i.nodes(), p = w.pop(), g = {};
    for (; p; )
      g[p] ? f(p) : (g[p] = !0, w.push(p), w = w.concat(h(p))), p = w.pop();
  }
  function a(f) {
    s[f] = i.inEdges(f).reduce((h, w) => Math.max(h, s[w.v] + i.edge(w)), 0);
  }
  function c(f) {
    let h = i.outEdges(f).reduce((p, g) => Math.min(p, s[g.w] - i.edge(g)), Number.POSITIVE_INFINITY), w = e.node(f);
    h !== Number.POSITIVE_INFINITY && w.borderType !== d && (s[f] = Math.max(s[f], h));
  }
  return l(a, i.predecessors.bind(i)), l(c, i.successors.bind(i)), Object.keys(o).forEach((f) => s[f] = s[n[f]]), s;
}
function di(e, t, n, o) {
  let r = new Zs(), s = e.graph(), i = ui(s.nodesep, s.edgesep, o);
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
function ai(e, t) {
  return Object.values(t).reduce((n, o) => {
    let r = Number.NEGATIVE_INFINITY, s = Number.POSITIVE_INFINITY;
    Object.entries(o).forEach(([d, l]) => {
      let a = hi(e, d) / 2;
      r = Math.max(l + a, r), s = Math.min(l - a, s);
    });
    const i = r - s;
    return i < n[0] && (n = [i, o]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function li(e, t) {
  let n = Object.values(t), o = Q.applyWithChunking(Math.min, n), r = Q.applyWithChunking(Math.max, n);
  ["u", "d"].forEach((s) => {
    ["l", "r"].forEach((i) => {
      let d = s + i, l = e[d];
      if (l === t) return;
      let a = Object.values(l), c = o - Q.applyWithChunking(Math.min, a);
      i !== "l" && (c = r - Q.applyWithChunking(Math.max, a)), c && (e[d] = Q.mapValues(l, (f) => f + c));
    });
  });
}
function ci(e, t) {
  return Q.mapValues(e.ul, (n, o) => {
    if (t)
      return e[t.toLowerCase()][o];
    {
      let r = Object.values(e).map((s) => s[o]).sort((s, i) => s - i);
      return (r[1] + r[2]) / 2;
    }
  });
}
function fi(e) {
  let t = Q.buildLayerMatrix(e), n = Object.assign(
    ti(e, t),
    ni(e, t)
  ), o = {}, r;
  ["u", "d"].forEach((i) => {
    r = i === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((d) => {
      d === "r" && (r = r.map((f) => Object.values(f).reverse()));
      let l = (i === "u" ? e.predecessors : e.successors).bind(e), a = si(e, r, n, l), c = ii(
        e,
        r,
        a.root,
        a.align,
        d === "r"
      );
      d === "r" && (c = Q.mapValues(c, (f) => -f)), o[i + d] = c;
    });
  });
  let s = ai(e, o);
  return li(o, s), ci(o, e.graph().align);
}
function ui(e, t, n) {
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
function hi(e, t) {
  return e.node(t).width;
}
let Ln = F, pi = ei.positionX;
var wi = mi;
function mi(e) {
  e = Ln.asNonCompoundGraph(e), gi(e), Object.entries(pi(e)).forEach(([t, n]) => e.node(t).x = n);
}
function gi(e) {
  let t = Ln.buildLayerMatrix(e), n = e.graph().ranksep, o = 0;
  t.forEach((r) => {
    const s = r.reduce((i, d) => {
      const l = e.node(d).height;
      return i > l ? i : l;
    }, 0);
    r.forEach((i) => e.node(i).y = o + s / 2), o += s + n;
  });
}
let Rt = yr, Pt = Cr, bi = Ur, yi = F.normalizeRanks, vi = Qr, Ei = F.removeEmptyRanks, Bt = ns, xi = as, Dt = cs, ki = Js, Ci = wi, V = F, Li = X.Graph;
var Si = _i;
function _i(e, t) {
  let n = t && t.debugTiming ? V.time : V.notime;
  n("layout", () => {
    let o = n("  buildLayoutGraph", () => Pi(e));
    n("  runLayout", () => Ni(o, n, t)), n("  updateInputGraph", () => Ii(e, o));
  });
}
function Ni(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => Bi(e)), t("    removeSelfEdges", () => Ki(e)), t("    acyclic", () => Rt.run(e)), t("    nestingGraph.run", () => Bt.run(e)), t("    rank", () => bi(V.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => Di(e)), t("    removeEmptyRanks", () => Ei(e)), t("    nestingGraph.cleanup", () => Bt.cleanup(e)), t("    normalizeRanks", () => yi(e)), t("    assignRankMinMax", () => Fi(e)), t("    removeEdgeLabelProxies", () => Gi(e)), t("    normalize.run", () => Pt.run(e)), t("    parentDummyChains", () => vi(e)), t("    addBorderSegments", () => xi(e)), t("    order", () => ki(e, n)), t("    insertSelfEdges", () => Ui(e)), t("    adjustCoordinateSystem", () => Dt.adjust(e)), t("    position", () => Ci(e)), t("    positionSelfEdges", () => Wi(e)), t("    removeBorderNodes", () => Yi(e)), t("    normalize.undo", () => Pt.undo(e)), t("    fixupEdgeLabelCoords", () => zi(e)), t("    undoCoordinateSystem", () => Dt.undo(e)), t("    translateGraph", () => qi(e)), t("    assignNodeIntersects", () => Hi(e)), t("    reversePoints", () => Vi(e)), t("    acyclic.undo", () => Rt.undo(e));
}
function Ii(e, t) {
  e.nodes().forEach((n) => {
    let o = e.node(n), r = t.node(n);
    o && (o.x = r.x, o.y = r.y, o.rank = r.rank, t.children(n).length && (o.width = r.width, o.height = r.height));
  }), e.edges().forEach((n) => {
    let o = e.edge(n), r = t.edge(n);
    o.points = r.points, Object.hasOwn(r, "x") && (o.x = r.x, o.y = r.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let Oi = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], $i = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, Mi = ["acyclicer", "ranker", "rankdir", "align"], Ai = ["width", "height", "rank"], Ft = { width: 0, height: 0 }, Ti = ["minlen", "weight", "width", "height", "labeloffset"], ji = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, Ri = ["labelpos"];
function Pi(e) {
  let t = new Li({ multigraph: !0, compound: !0 }), n = et(e.graph());
  return t.setGraph(Object.assign(
    {},
    $i,
    Ze(n, Oi),
    V.pick(n, Mi)
  )), e.nodes().forEach((o) => {
    let r = et(e.node(o));
    const s = Ze(r, Ai);
    Object.keys(Ft).forEach((i) => {
      s[i] === void 0 && (s[i] = Ft[i]);
    }), t.setNode(o, s), t.setParent(o, e.parent(o));
  }), e.edges().forEach((o) => {
    let r = et(e.edge(o));
    t.setEdge(o, Object.assign(
      {},
      ji,
      Ze(r, Ti),
      V.pick(r, Ri)
    ));
  }), t;
}
function Bi(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let o = e.edge(n);
    o.minlen *= 2, o.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? o.width += o.labeloffset : o.height += o.labeloffset);
  });
}
function Di(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let o = e.node(t.v), s = { rank: (e.node(t.w).rank - o.rank) / 2 + o.rank, e: t };
      V.addDummyNode(e, "edge-proxy", s, "_ep");
    }
  });
}
function Fi(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let o = e.node(n);
    o.borderTop && (o.minRank = e.node(o.borderTop).rank, o.maxRank = e.node(o.borderBottom).rank, t = Math.max(t, o.maxRank));
  }), e.graph().maxRank = t;
}
function Gi(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function qi(e) {
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
function Hi(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), o = e.node(t.v), r = e.node(t.w), s, i;
    n.points ? (s = n.points[0], i = n.points[n.points.length - 1]) : (n.points = [], s = r, i = o), n.points.unshift(V.intersectRect(o, s)), n.points.push(V.intersectRect(r, i));
  });
}
function zi(e) {
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
function Vi(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function Yi(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), o = e.node(n.borderTop), r = e.node(n.borderBottom), s = e.node(n.borderLeft[n.borderLeft.length - 1]), i = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(i.x - s.x), n.height = Math.abs(r.y - o.y), n.x = s.x + n.width / 2, n.y = o.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function Ki(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function Ui(e) {
  var t = V.buildLayerMatrix(e);
  t.forEach((n) => {
    var o = 0;
    n.forEach((r, s) => {
      var i = e.node(r);
      i.order = s + o, (i.selfEdges || []).forEach((d) => {
        V.addDummyNode(e, "selfedge", {
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
function Wi(e) {
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
function Ze(e, t) {
  return V.mapValues(V.pick(e, t), Number);
}
function et(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, o]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = o;
  }), t;
}
let Xi = F, Ji = X.Graph;
var Qi = {
  debugOrdering: Zi
};
function Zi(e) {
  let t = Xi.buildLayerMatrix(e), n = new Ji({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((o) => {
    n.setNode(o, { label: o }), n.setParent(o, "layer" + e.node(o).rank);
  }), e.edges().forEach((o) => n.setEdge(o.v, o.w, {}, o.name)), t.forEach((o, r) => {
    let s = "layer" + r;
    n.setNode(s, { rank: "same" }), o.reduce((i, d) => (n.setEdge(i, d, { style: "invis" }), d));
  }), n;
}
var ed = "1.1.8", td = {
  graphlib: X,
  layout: Si,
  debug: Qi,
  util: {
    time: F.time,
    notime: F.notime
  },
  version: ed
};
const Gt = /* @__PURE__ */ Jn(td);
function qt(e, t) {
  var s;
  const n = gt[e.type] ?? gt.process;
  if (e.type === "compound" || (s = e.rows) != null && s.length) {
    const i = (t == null ? void 0 : t.w) ?? e.w ?? Ve(e.label, e.rows, n.w), d = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, Ut(e.rows));
    return { w: i, h: d };
  }
  const o = (t == null ? void 0 : t.w) ?? e.w ?? n.w, r = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, Jt(e.type, e.label, o));
  return { w: o, h: r };
}
function xe(e, t) {
  const n = new Gt.graphlib.Graph({ multigraph: !0 });
  n.setGraph({ rankdir: e.direction ?? "TB", nodesep: 50, ranksep: 60, marginx: 20, marginy: 20 }), n.setDefaultEdgeLabel(() => ({}));
  for (const a of e.nodes) {
    const { w: c, h: f } = qt(a, t == null ? void 0 : t.nodes[a.id]);
    n.setNode(a.id, { width: c, height: f });
  }
  for (const a of e.edges)
    n.setEdge(a.from, a.to, {}, a.id);
  Gt.layout(n);
  const o = e.nodes.map((a) => {
    const c = t == null ? void 0 : t.nodes[a.id], { w: f, h } = qt(a, c), w = n.node(a.id);
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
function Te(e, t) {
  const n = { nodes: {}, edges: {} };
  for (const o of e) n.nodes[o.id] = { x: o.x, y: o.y, w: o.w, h: o.h };
  for (const o of t) n.edges[o.id] = { points: o.points };
  return n;
}
const tt = 5, Sn = 13, _n = 8;
function nd(e) {
  const t = (e ?? []).filter((n) => n.color).length;
  return t ? t * Sn + _n : 0;
}
function Ht(e, t, n, o) {
  const r = $("g", { class: "dd-flow-pips" });
  let s = 0;
  for (const i of t) {
    const d = Ce(e, [i.key]);
    if (!i.color || !d) continue;
    const l = n - _n - tt - s * Sn, a = $("circle", {
      cx: l,
      cy: o,
      r: d === 3 ? tt + 1 : tt,
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
function od(e, t, n) {
  var s;
  for (const i of e.querySelectorAll(".dd-flow-pips")) i.remove();
  if (!n.some((i) => i.color)) return;
  const o = new Map(t.map((i) => [i.id, i])), r = (i, d) => Number((i == null ? void 0 : i.getAttribute(d)) ?? Number.NaN);
  for (const i of e.querySelectorAll(".dd-flow-node")) {
    const d = o.get(i.getAttribute("data-node-id") ?? ""), l = i.firstElementChild;
    if (!d || (l == null ? void 0 : l.tagName.toLowerCase()) !== "rect") continue;
    const a = r(l, "x") + r(l, "width"), f = r(l, "y") + ((s = d.rows) != null && s.length ? fe : r(l, "height")) / 2, h = Ht(d.levels, n, a, f);
    h && i.appendChild(h);
    const w = new Map((d.rows ?? []).map((p) => [p.id, p]));
    for (const p of i.querySelectorAll(".dd-flow-node-row")) {
      const g = p.querySelector("rect"), y = w.get(p.getAttribute("data-row-id") ?? ""), C = y && Ht(y.levels, n, a, r(g, "y") + r(g, "height") / 2);
      C && p.appendChild(C);
    }
  }
}
const rd = 3, zt = [
  "dd-flow-level-1",
  "dd-flow-level-2",
  "dd-flow-level-3",
  "dd-flow-level-none",
  "dd-flow-level-branch"
], Nn = (e) => e === null ? [] : typeof e == "string" ? [e] : e;
function Ce(e, t) {
  const n = Math.max(0, ...t.map((o) => Math.floor((e == null ? void 0 : e[o]) ?? 0)));
  return Math.min(rd, n);
}
function sd(e, t, n, o) {
  var a;
  const r = Nn(o);
  for (const c of e.querySelectorAll(zt.map((f) => `.${f}`).join(",")))
    c.classList.remove(...zt);
  const s = { 1: 0, 2: 0, 3: 0 };
  if (!r.length) return s;
  const i = /* @__PURE__ */ new Map();
  for (const c of e.querySelectorAll(".dd-flow-node")) {
    const f = c.getAttribute("data-node-id");
    f && i.set(f, c);
  }
  const d = /* @__PURE__ */ new Set(), l = (c) => {
    for (const f of se(n.parentsOf, c)) d.add(f);
  };
  for (const c of t) {
    const f = i.get(c.id);
    if (!f) continue;
    const h = Ce(c.levels, r);
    h && (f.classList.add(`dd-flow-level-${h}`), s[h] += 1, l(c.id));
    const w = /* @__PURE__ */ new Map();
    for (const p of f.querySelectorAll(".dd-flow-node-row")) {
      const g = p.getAttribute("data-row-id");
      g && w.set(g, p);
    }
    for (const p of c.rows ?? []) {
      const g = w.get(p.id);
      if (!g) continue;
      const y = Ce(p.levels, r);
      if (!y) {
        g.classList.add("dd-flow-level-none");
        continue;
      }
      g.classList.add(`dd-flow-level-${y}`), s[y] += 1, d.add(c.id), l(c.id);
    }
  }
  for (const c of d) (a = i.get(c)) == null || a.classList.add("dd-flow-level-branch");
  return s;
}
function id(e, t, n) {
  const o = Nn(n), r = /* @__PURE__ */ new Map();
  for (const l of t) r.set(l.target, [...r.get(l.target) ?? [], l.source]);
  const s = /* @__PURE__ */ new Map();
  for (const l of e) {
    const a = (l.rows ?? []).filter((c) => Ce(c.levels, o) > 0);
    (Ce(l.levels, o) > 0 || a.length) && s.set(l.id, a);
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
function dd(e, t, n = "All") {
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
const je = 40;
function it(e) {
  const t = e.type === "conditional" ? "conditional" : "default", n = e.type === "dashed" ? "dashed" : "solid";
  return {
    kind: e.kind ?? t,
    routing: e.routing ?? "orthogonal",
    stroke: e.stroke ?? n
  };
}
function ad(e, t) {
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
function ld(e, t) {
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
function cd(e, t, n = "orthogonal") {
  if (n === "straight") return ad(e, t);
  if (n === "bezier") return ld(e, t);
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
const fd = 10, Vt = 40;
function In(e) {
  const [t, n] = [e[0], e[e.length - 1]], o = n.x - t.x, r = n.y - t.y;
  if (Math.abs(o) >= Math.abs(r)) {
    const i = Math.max(Vt, Math.abs(o) / 2) * Math.sign(o || 1);
    return `M ${t.x} ${t.y} C ${t.x + i} ${t.y}, ${n.x - i} ${n.y}, ${n.x} ${n.y}`;
  }
  const s = Math.max(Vt, Math.abs(r) / 2) * Math.sign(r || 1);
  return `M ${t.x} ${t.y} C ${t.x} ${t.y + s}, ${n.x} ${n.y - s}, ${n.x} ${n.y}`;
}
function ud(e, t) {
  if (!t || e.length <= 2) return hd(e);
  const n = [`M ${e[0].x} ${e[0].y}`];
  for (let r = 1; r < e.length - 1; r++) {
    const s = e[r - 1], i = e[r], d = e[r + 1], l = Math.hypot(i.x - s.x, i.y - s.y), a = Math.hypot(d.x - i.x, d.y - i.y), c = Math.min(fd, l / 2, a / 2), f = { x: i.x - (i.x - s.x) / l * c, y: i.y - (i.y - s.y) / l * c }, h = { x: i.x + (d.x - i.x) / a * c, y: i.y + (d.y - i.y) / a * c };
    n.push(`L ${f.x} ${f.y}`, `Q ${i.x} ${i.y} ${h.x} ${h.y}`);
  }
  const o = e[e.length - 1];
  return n.push(`L ${o.x} ${o.y}`), n.join(" ");
}
function hd(e) {
  return e.map((t, n) => `${n === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
}
const pd = {
  solid: null,
  dashed: "6,4",
  dotted: "1.5,4"
};
function wd(e) {
  return e.filter((t, n) => n === 0 || t.x !== e[n - 1].x || t.y !== e[n - 1].y);
}
function md(e, t, n, o = {}) {
  const r = e.points.length >= 2 ? e.points : cd(t, n, it(e).routing), s = wd(r), { kind: i, routing: d, stroke: l } = it(e), a = $("g", {
    class: `dd-flow-edge dd-flow-edge-${i}${o.selected ? " is-selected" : ""}`,
    "data-edge-id": e.id
  }), c = d === "bezier" && s.length === 2 ? In(s) : ud(s, d === "curved");
  a.appendChild(
    $("path", { d: c, fill: "none", stroke: "transparent", "stroke-width": 16, class: "dd-flow-edge-hit" })
  );
  const f = $("path", {
    d: c,
    fill: "none",
    stroke: i === "conditional" ? "var(--dd-flow-edge-conditional-stroke)" : "var(--dd-flow-edge-stroke)",
    "stroke-width": 2,
    "marker-end": "url(#dd-flow-arrow)"
  }), h = pd[l];
  if (h && f.setAttribute("stroke-dasharray", h), a.appendChild(f), e.label) {
    const w = s[Math.floor((s.length - 1) / 2)], p = s[Math.floor((s.length - 1) / 2) + 1] ?? w, g = (w.x + p.x) / 2, y = (w.y + p.y) / 2, C = Math.max(24, e.label.length * 7 + 12);
    a.appendChild(
      $("rect", {
        x: g - C / 2,
        y: y - 10,
        width: C,
        height: 20,
        rx: 4,
        fill: "var(--dd-flow-edge-label-bg)",
        class: "dd-flow-edge-label-bg"
      })
    );
    const m = $("text", {
      x: g,
      y,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "var(--dd-flow-edge-label-text)",
      class: "dd-flow-edge-label"
    });
    m.textContent = e.label, a.appendChild(m);
  }
  return a;
}
function gd(e, t, n) {
  const o = $("g", {
    class: `dd-flow-row-edge${e.flagged ? " dd-flow-row-edge-flagged" : ""}`,
    "data-row-edge-id": lt(e)
  }), r = In([t, n]);
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
function bd() {
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
function Ge(e, t, n = {}) {
  var C, m, L, E;
  const o = new Map(e.map((v) => [v.id, v]));
  let r = 1 / 0, s = 1 / 0, i = -1 / 0, d = -1 / 0;
  for (const v of e)
    r = Math.min(r, v.x - v.w / 2), s = Math.min(s, v.y - v.h / 2), i = Math.max(i, v.x + v.w / 2), d = Math.max(d, v.y + v.h / 2);
  e.length || (r = 0, s = 0, i = 200, d = 100);
  const l = i - r + je * 2, a = d - s + je * 2, c = je - r, f = je - s, h = $("svg", {
    class: "dd-flow-svg",
    viewBox: `0 0 ${l} ${a}`,
    width: l,
    height: a
  });
  h.appendChild(bd());
  const w = $("g", { class: "dd-flow-world", transform: `translate(${c}, ${f})` }), p = $("g", { class: "dd-flow-edges" });
  for (const v of t) {
    const N = o.get(v.from), x = o.get(v.to);
    !N || !x || p.appendChild(md(v, N, x, { selected: v.id === n.selectedEdgeId }));
  }
  w.appendChild(p);
  const g = (((C = n.selectedNodeIds) == null ? void 0 : C.size) ?? 0) > 1, y = $("g", { class: "dd-flow-nodes" });
  for (const v of e) {
    const N = ((m = n.selectedNodeIds) == null ? void 0 : m.has(v.id)) ?? !1, x = !g && (v.id === n.selectedNodeId || N), j = ((L = n.selectedRowKey) == null ? void 0 : L.nodeId) === v.id ? n.selectedRowKey.rowId : null;
    y.appendChild(Un(v, { selected: x, multiselected: g && N, selectedRowId: j }));
  }
  if (w.appendChild(y), (E = n.rowEdges) != null && E.length) {
    const v = $("g", { class: "dd-flow-row-edges" });
    for (const N of n.rowEdges) {
      const x = o.get(N.sourceNode), j = o.get(N.targetNode);
      if (!x || !j) continue;
      const R = x.x <= j.x, _ = bt(x, N.sourceRow, R ? "right" : "left"), M = bt(j, N.targetRow, R ? "left" : "right");
      !_ || !M || v.appendChild(gd(N, _, M));
    }
    w.appendChild(v);
  }
  return h.appendChild(w), h;
}
const qe = {
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
qe.host = {
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
const nt = "bam";
function ke(e, t) {
  const n = qe[t ?? nt] ?? qe[nt];
  e.setAttribute("data-dd-flow-theme", t ?? nt);
  for (const [o, r] of Object.entries(n.vars))
    e.style.setProperty(`--dd-flow-${o}`, r);
}
function la(e, t) {
  qe[e] = t;
}
const yd = 0.2, vd = 4, Ed = 4, xd = 300, kd = 30;
function dt(e) {
  const t = e.offsetWidth, n = e.getBoundingClientRect().width;
  return t > 0 && n > 0 ? n / t : 1;
}
function at(e, t, n) {
  const o = e.getBoundingClientRect(), r = dt(e);
  return { x: (t - o.left) / r, y: (n - o.top) / r };
}
const ye = "ddFlowPanned";
function On(e, t, n = {}) {
  var _e, we, me, Ne, Ie;
  const o = n.minScale ?? yd, r = n.maxScale ?? vd, s = n.maxFitScale ?? 1, i = Number(t.getAttribute("width")) || 1, d = Number(t.getAttribute("height")) || 1, l = 24, a = t.querySelector("g.dd-flow-world");
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
  c.setAttribute("class", "dd-flow-pz"), (_e = a.parentNode) == null || _e.insertBefore(c, a), c.appendChild(a), e.classList.add("dd-flow-has-viewport");
  let f = ((we = n.initial) == null ? void 0 : we.scale) ?? 1, h = ((me = n.initial) == null ? void 0 : me.tx) ?? 0, w = ((Ne = n.initial) == null ? void 0 : Ne.ty) ?? 0, p = ((Ie = n.initial) == null ? void 0 : Ie.userAdjusted) ?? !1, g = o;
  const y = () => {
    c.setAttribute("transform", `translate(${h}, ${w}) scale(${f})`);
  }, C = () => {
    const O = e.getBoundingClientRect(), A = Math.max(1, Math.round(e.offsetWidth || O.width)), u = Math.max(1, Math.round(e.offsetHeight || O.height));
    return t.setAttribute("width", String(A)), t.setAttribute("height", String(u)), t.setAttribute("viewBox", `0 0 ${A} ${u}`), { w: A, h: u };
  }, m = () => {
    const O = e.getBoundingClientRect(), A = a.getBoundingClientRect();
    if (!A.width || !A.height || !f) return null;
    const u = dt(e);
    return {
      x: ((A.left - O.left) / u - h) / f,
      y: ((A.top - O.top) / u - w) / f,
      width: A.width / u / f,
      height: A.height / u / f
    };
  }, L = () => {
    const { w: O, h: A } = C();
    if (p) {
      y();
      return;
    }
    y();
    const u = m() ?? { x: 0, y: 0, width: i, height: d }, b = { w: Math.max(1, O - l * 2), h: Math.max(1, A - l * 2) };
    f = Math.min(s, b.w / u.width, b.h / u.height), g = Math.min(o, f), h = (O - u.width * f) / 2 - u.x * f, w = (A - u.height * f) / 2 - u.y * f, y();
  }, E = (O, A, u) => {
    const b = f;
    f = Math.min(r, Math.max(g, f * u)), f !== b && (h = O - (O - h) / b * f, w = A - (A - w) / b * f, y());
  }, v = (O) => {
    O.preventDefault(), p = !0;
    const A = at(e, O.clientX, O.clientY);
    E(A.x, A.y, O.deltaY < 0 ? 1.1 : 0.9);
  };
  let N = !1, x = !1, j = 0, R = 0, _ = 0, M = 0;
  const P = /* @__PURE__ */ new Map();
  let H = 0, z = 0, Z = 0, Le = 0;
  const he = () => {
    if (P.size < 2) return null;
    const [O, A] = [...P.values()];
    return { distance: Math.hypot(O.x - A.x, O.y - A.y), cx: (O.x + A.x) / 2, cy: (O.y + A.y) / 2 };
  }, pe = (O) => {
    const A = O;
    return A != null && A.closest ? !A.closest(".dd-flow-node") && !A.closest(".dd-flow-edge-hit") && !A.closest(".dd-flow-filter-bar, button") : !0;
  }, de = (O) => {
    P.set(O.pointerId, { x: O.clientX, y: O.clientY });
    const A = he();
    if (A) {
      N = !1, H = A.distance;
      return;
    }
    pe(O.target) && (N = !0, x = !1, j = O.clientX, R = O.clientY, _ = h, M = w);
  }, ae = (O) => {
    P.has(O.pointerId) && P.set(O.pointerId, { x: O.clientX, y: O.clientY });
    const A = he();
    if (A) {
      if (!H) {
        H = A.distance;
        return;
      }
      p = !0, x = !0, e.dataset[ye] = "1";
      const I = at(e, A.cx, A.cy);
      E(I.x, I.y, A.distance / H), H = A.distance;
      return;
    }
    if (!N) return;
    const u = O.clientX - j, b = O.clientY - R;
    if (!x && Math.hypot(u, b) < Ed) return;
    x = !0, p = !0, e.dataset[ye] = "1";
    const k = dt(e);
    h = _ + u / k, w = M + b / k, y();
  }, le = (O) => {
    const A = Date.now(), u = A - z < xd && Math.hypot(O.clientX - Z, O.clientY - Le) < kd;
    return z = u ? 0 : A, Z = O.clientX, Le = O.clientY, u;
  }, J = (O) => {
    const A = P.size >= 2;
    if (P.delete(O.pointerId), A) {
      H = 0, P.size < 2 && setTimeout(() => delete e.dataset[ye], 0);
      return;
    }
    if (N) {
      if (N = !1, !x) {
        pe(O.target) && le(O) && (p = !1, L());
        return;
      }
      setTimeout(() => delete e.dataset[ye], 0);
    }
  }, Y = { capture: !0 };
  e.addEventListener("wheel", v, { passive: !1, capture: !0 }), e.addEventListener("pointerdown", de, Y), e.addEventListener("pointermove", ae, Y), e.addEventListener("pointerup", J, Y), e.addEventListener("pointercancel", J, Y);
  const Se = new ResizeObserver(() => L());
  return Se.observe(e), L(), {
    fit: L,
    state: () => ({ scale: f, tx: h, ty: w, userAdjusted: p }),
    reset() {
      p = !1, L();
    },
    zoomBy(O) {
      p = !0;
      const { w: A, h: u } = C();
      E(A / 2, u / 2, O);
    },
    destroy() {
      Se.disconnect(), e.removeEventListener("wheel", v, Y), e.removeEventListener("pointerdown", de, Y), e.removeEventListener("pointermove", ae, Y), e.removeEventListener("pointerup", J, Y), e.removeEventListener("pointercancel", J, Y), e.classList.remove("dd-flow-has-viewport");
    }
  };
}
const ue = {
  nodeWidth: 118,
  nodeHeight: 34,
  layerGap: 170,
  rowGap: 48,
  margin: 30,
  hint: "Hover to preview · click to pin · scroll to zoom · drag to pan"
};
function Cd(e, t, n) {
  const { nodeWidth: o, nodeHeight: r, layerGap: s, rowGap: i, margin: d } = n, l = /* @__PURE__ */ new Map();
  for (const p of e) {
    const g = p.layer ?? 0;
    l.has(g) || l.set(g, []), l.get(g).push(p);
  }
  for (const p of l.values()) p.sort((g, y) => g.id.localeCompare(y.id));
  const a = Math.max(1, ...[...l.values()].map((p) => p.length)), c = Math.max(0, ...e.map((p) => p.layer ?? 0)), f = a * (r + i) - i, h = new Set(t.map((p) => p.source)), w = /* @__PURE__ */ new Map();
  for (const [p, g] of l) {
    const y = g.filter((E) => h.has(E.id)), C = g.filter((E) => !h.has(E.id)), m = y.length ? y.length * (r + i) - i : 0, L = d + (f - m) / 2;
    y.forEach((E, v) => {
      w.set(E.id, { x: d + p * s, y: L + v * (r + i) });
    }), C.forEach((E, v) => {
      const N = Math.floor(v / 2), x = v % 2 === 0 ? N : a - 1 - N;
      w.set(E.id, { x: d + p * s, y: d + x * (r + i) });
    });
  }
  return {
    positions: w,
    width: d * 2 + c * s + o,
    height: d * 2 + f
  };
}
const $n = (e) => `${e.source} ${e.target}`;
function Ld(e, t, n, o) {
  const r = e.nodes.map((d) => {
    var l;
    return (l = d.rows) != null && l.length ? Ut(d.rows) : n;
  }), s = Math.max(n, ...r), { positions: i } = Cd(e.nodes, e.edges, {
    nodeWidth: t,
    nodeHeight: s,
    layerGap: o.layerGap ?? ue.layerGap,
    rowGap: o.rowGap ?? ue.rowGap,
    margin: ue.margin
  });
  return e.nodes.map((d, l) => {
    var w;
    const a = i.get(d.id), c = !!((w = d.rows) != null && w.length), f = c ? Ve(d.label ?? d.id, d.rows, t) : t, h = c ? r[l] : n;
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
const Sd = 320;
function _d(e, t, n) {
  const o = Math.min(
    Math.max(t, Ve(e, void 0, t)),
    Math.max(t, Sd)
  ), r = ct(e, o - 20).length > 1;
  return { w: o, h: r ? Math.max(n, Jt("process", e, o)) : n };
}
function Nd(e, t, n, o) {
  const r = nd(e.filters), { nodes: s } = xe({
    id: e.id ?? "graph",
    direction: o,
    nodes: e.nodes.map((i) => {
      var c;
      const d = i.label ?? i.id;
      if ((c = i.rows) != null && c.length) {
        const f = Ve(d, i.rows, t) + r;
        return { id: i.id, label: d, type: "compound", note: i.note, rows: i.rows, w: f };
      }
      const { w: l, h: a } = _d(d, t, n);
      return { id: i.id, label: d, type: "process", note: i.note, w: l + r, h: a };
    }),
    edges: e.edges.map((i) => ({ id: $n(i), from: i.source, to: i.target }))
  });
  return s;
}
function Id(e, t, n = {}) {
  var N;
  const o = n.nodeWidth ?? ue.nodeWidth, r = n.nodeHeight ?? ue.nodeHeight, s = n.hint ?? ue.hint;
  e.classList.add("dd-flow-embed", "dd-flow-graph-mount"), ke(e, n.style ?? "host");
  const i = n.id ?? t.id ?? "";
  let d, l = Be([]), a = null, c = null;
  const f = (x) => {
    c == null || c.destroy(), a == null || a.destroy(), d == null || d.remove();
    const j = n.layout === "flow" ? Nd(x, o, r, n.direction ?? "LR") : Ld(x, o, r, n), R = new Set(j.map((M) => M.id)), _ = x.edges.filter((M) => R.has(M.source) && R.has(M.target)).map((M) => ({
      id: $n(M),
      from: M.source,
      to: M.target,
      routing: "bezier",
      stroke: M.flagged ? "dashed" : "solid",
      kind: M.flagged ? "conditional" : "default",
      points: []
    }));
    d = Ge(j, _, { rowEdges: x.rowEdges }), od(d, x.nodes, t.filters ?? []), e.prepend(d), a = On(e, d, { maxFitScale: 1 }), c = Xn(e, _, { flowId: i, rowEdges: x.rowEdges }), l = Be(_);
  };
  f(t);
  const h = document.createElement("div");
  if (h.className = "dd-flow-graph-tooltip", e.appendChild(h), s) {
    const x = document.createElement("div");
    x.className = "dd-flow-graph-hint", x.textContent = s, e.appendChild(x);
  }
  const w = new Map(t.nodes.map((x) => [x.id, x])), p = (x) => {
    var P, H;
    const j = (H = (P = x.target) == null ? void 0 : P.closest) == null ? void 0 : H.call(P, ".dd-flow-node"), R = j == null ? void 0 : j.getAttribute("data-node-id"), _ = R ? w.get(R) : void 0;
    if (!_) {
      h.style.display = "none";
      return;
    }
    h.textContent = _.note ? `${_.label ?? _.id} · ${_.note}` : _.label ?? _.id, h.style.display = "block";
    const M = at(e, x.clientX, x.clientY);
    h.style.left = `${M.x + 14}px`, h.style.top = `${M.y + 14}px`;
  }, g = () => {
    h.style.display = "none";
  };
  e.addEventListener("pointermove", p), e.addEventListener("pointerleave", g);
  const y = (x) => {
    var P, H;
    const j = (H = (P = x.target) == null ? void 0 : P.closest) == null ? void 0 : H.call(P, ".dd-flow-node-row"), R = j == null ? void 0 : j.closest(".dd-flow-node"), _ = R == null ? void 0 : R.getAttribute("data-node-id"), M = j == null ? void 0 : j.getAttribute("data-row-id");
    !_ || !M || U(e, K.rowClick, {
      flowId: i,
      nodeId: _,
      rowId: M,
      shiftKey: x.shiftKey
    });
  };
  e.addEventListener("click", y);
  let C = [];
  const m = (x) => {
    const j = n.filterMode === "hide", R = j && x.length ? id(t.nodes, t.edges, x) : null, _ = R != null && R.nodes.length ? { ...t, ...R, rowEdges: void 0 } : t;
    j && (_ !== t || C.length) && f(_), C = x;
    const M = sd(d, _.nodes, l, x);
    U(e, K.filterChange, {
      flowId: i,
      keys: x,
      key: x[0] ?? null,
      counts: M
    });
  }, L = (x) => {
    E ? E.select(x) : m([...x]);
  }, E = (N = t.filters) != null && N.length ? dd(t.filters, m, n.allFilterLabel) : null;
  E && e.appendChild(E.element);
  const v = Hn(e, () => a == null ? void 0 : a.reset(), n.fullscreen !== !1);
  return {
    setFullscreen: v.set,
    setFilters: L,
    getFilters: () => [...C],
    setFilter: (x) => L(x === null ? [] : [x]),
    getFilter: () => C[0] ?? null,
    destroy() {
      v.destroy(), e.removeEventListener("pointermove", p), e.removeEventListener("pointerleave", g), e.removeEventListener("click", y), c == null || c.destroy(), c = null, a == null || a.destroy(), a = null, e.innerHTML = "", e.classList.remove("dd-flow-graph-mount");
    }
  };
}
const Od = ".dd-flow-graph:not([data-dd-flow-mounted])";
async function $d(e = document) {
  const t = Array.from(e.querySelectorAll(Od));
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
        Id(n, r, { style: n.getAttribute("data-style") ?? void 0, hint: s ?? void 0 });
      } catch (r) {
        console.error("dd-flow: failed to mount graph", r), n.textContent = "dd-flow: failed to mount graph (see console)";
      }
    })
  );
}
const ca = () => ({ nodes: {}, edges: {} }), Md = 100;
function Ad(e = Md) {
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
const Td = [
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
function jd(e) {
  const t = document.createElement("div");
  t.className = "dd-flow-inspector", t.hidden = !0, e.appendChild(t);
  let n = !1;
  function o(w) {
    const g = t.offsetWidth || 260, y = t.offsetHeight || 200;
    let C = w.right + 12;
    C + g > window.innerWidth && (C = w.left - 12 - g), C < 12 && (C = Math.min(w.left, window.innerWidth - g - 12)), C = Math.max(12, Math.min(C, window.innerWidth - g - 12));
    let m = w.top;
    return m = Math.max(12, Math.min(m, window.innerHeight - y - 12)), { left: C, top: m };
  }
  function r(w) {
    const { left: p, top: g } = o(w);
    t.style.left = `${p}px`, t.style.top = `${g}px`;
  }
  function s(w, p) {
    const g = document.createElement("div");
    g.className = "dd-flow-inspector-field";
    const y = document.createElement("label");
    return y.textContent = w, g.appendChild(y), g.appendChild(p), g;
  }
  function i(w) {
    const p = document.createElement("button");
    return p.type = "button", p.className = "dd-flow-btn dd-flow-inspector-delete", p.textContent = "Delete", p.addEventListener("click", w), p;
  }
  function d() {
    const w = document.createElement("button");
    return w.type = "button", w.className = "dd-flow-inspector-close", w.textContent = "×", w.setAttribute("aria-label", "Close"), w.addEventListener("click", h), w;
  }
  function l(w, p) {
    var m, L;
    t.innerHTML = "", t.appendChild(d());
    const g = document.createElement("input");
    g.type = "text", g.value = w.label, g.addEventListener("input", () => p.onLabelChange(g.value)), t.appendChild(s("Label", g));
    const y = document.createElement("textarea");
    if (y.rows = 2, y.value = w.note ?? "", y.addEventListener("input", () => p.onNoteChange(y.value)), t.appendChild(s("Note", y)), w.type === "compound" || (m = w.rows) != null && m.length) {
      const E = document.createElement("textarea");
      E.className = "dd-flow-inspector-rows", E.rows = Math.max(3, (((L = w.rows) == null ? void 0 : L.length) ?? 0) + 1), E.value = (w.rows ?? []).map((v) => v.label).join(`
`), E.addEventListener("input", () => p.onRowsChange(E.value.split(`
`))), t.appendChild(s("Rows (one per line)", E));
    }
    const C = document.createElement("div");
    C.className = "dd-flow-type-grid";
    for (const E of Td) {
      const v = document.createElement("button");
      v.type = "button", v.className = `dd-flow-type-swatch${E === w.type ? " is-active" : ""}`, v.title = E, v.setAttribute("aria-label", E);
      const N = $("svg", { viewBox: "-32 -22 64 44", width: 48, height: 33 });
      N.appendChild(Wt(E, 56, 36)), v.appendChild(N), v.addEventListener("click", () => p.onTypeChange(E)), C.appendChild(v);
    }
    if (t.appendChild(s("Type", C)), w.subflow) {
      const E = document.createElement("div");
      E.className = "dd-flow-inspector-subflow-row";
      const v = document.createElement("span");
      if (v.textContent = `Opens subflow: ${w.subflow}`, E.appendChild(v), p.onGotoSubflow) {
        const N = document.createElement("button");
        N.type = "button", N.className = "dd-flow-btn", N.textContent = "Open", N.addEventListener("click", p.onGotoSubflow), E.appendChild(N);
      }
      t.appendChild(E);
    }
    t.appendChild(i(p.onDelete));
  }
  function a(w, p, g, y) {
    const C = document.createElement("div");
    C.className = "dd-flow-inspector-radios";
    for (const m of p) {
      const L = `dd-flow-${w}-${m}`, E = document.createElement("input");
      E.type = "radio", E.name = `dd-flow-${w}`, E.id = L, E.checked = m === g, E.addEventListener("change", () => y(m));
      const v = document.createElement("label");
      v.htmlFor = L, v.textContent = m, C.appendChild(E), C.appendChild(v);
    }
    return C;
  }
  function c(w, p) {
    t.innerHTML = "", t.appendChild(d());
    const g = document.createElement("input");
    g.type = "text", g.value = w.label ?? "", g.addEventListener("input", () => p.onLabelChange(g.value)), t.appendChild(s("Label", g));
    const { routing: y, stroke: C, kind: m } = it(w);
    t.appendChild(
      s(
        "Routing",
        a("routing", ["orthogonal", "straight", "curved"], y, p.onRoutingChange)
      )
    ), t.appendChild(
      s("Stroke", a("stroke", ["solid", "dashed", "dotted"], C, p.onStrokeChange))
    ), t.appendChild(
      s("Kind", a("kind", ["default", "conditional"], m, p.onKindChange))
    );
    const L = document.createElement("p");
    L.className = "dd-flow-inspector-hint", L.textContent = "Changing routing clears any hand-dragged route for this connector.", t.appendChild(L), t.appendChild(i(p.onDelete));
  }
  function f(w, p, g, y = {}) {
    t.innerHTML = "", t.appendChild(d());
    const C = document.createElement("p");
    C.className = "dd-flow-inspector-hint", C.textContent = w, t.appendChild(C);
    const m = document.createElement("input");
    m.type = "text", m.value = p;
    const L = () => {
      const x = m.value.trim();
      h(), (x || y.allowEmpty) && g(x);
    };
    m.addEventListener("keydown", (x) => {
      x.key === "Enter" && L();
    }), t.appendChild(s(y.fieldLabel ?? "Name", m));
    const E = document.createElement("div");
    E.className = "dd-flow-inspector-actions";
    const v = document.createElement("button");
    v.type = "button", v.className = "dd-flow-btn", v.textContent = "Cancel", v.addEventListener("click", h);
    const N = document.createElement("button");
    N.type = "button", N.className = "dd-flow-btn is-active", N.textContent = y.submitLabel ?? "Create", N.addEventListener("click", L), E.appendChild(v), E.appendChild(N), t.appendChild(E);
  }
  function h() {
    n = !1, t.hidden = !0, t.innerHTML = "";
  }
  return {
    get isOpen() {
      return n;
    },
    showNode(w, p, g, y) {
      if (l(w, g), t.hidden = !1, n = !0, r(p), y != null && y.focusLabel) {
        const C = t.querySelector('input[type="text"]');
        C == null || C.focus(), C == null || C.select();
      }
    },
    showEdge(w, p, g) {
      c(w, g), t.hidden = !1, n = !0, r(p);
    },
    showPrompt(w, p, g, y, C) {
      f(w, g, y, C), t.hidden = !1, n = !0, r(p);
      const m = t.querySelector("input");
      m == null || m.focus(), m == null || m.select();
    },
    refreshAnchor(w) {
      n && r(w);
    },
    hide: h,
    destroy() {
      h(), t.remove();
    }
  };
}
const Rd = 4;
function Pd(e, t, n, o = {}) {
  let r = null;
  const s = (f, h, w) => {
    const p = f.createSVGPoint();
    p.x = h, p.y = w;
    const g = f.getScreenCTM();
    if (!g) return { x: h, y: w };
    const y = p.matrixTransform(g.inverse());
    return { x: y.x, y: y.y };
  }, i = () => e.querySelector("svg.dd-flow-svg"), d = (f) => {
    var L, E, v, N, x;
    if (f.button !== 0) return;
    const h = i();
    if (!h) return;
    const w = f.target, p = s(h, f.clientX, f.clientY), g = (L = w.closest) == null ? void 0 : L.call(w, ".dd-flow-node");
    if (g) {
      const j = g.getAttribute("data-node-id"), R = t.nodes.find((P) => P.id === j);
      if (!R) return;
      const _ = (E = w.closest) == null ? void 0 : E.call(w, ".dd-flow-node-row"), M = (_ == null ? void 0 : _.getAttribute("data-row-id")) ?? null;
      r = {
        node: R,
        edgeId: null,
        rowId: M,
        startX: p.x,
        startY: p.y,
        nodeStartX: R.x,
        nodeStartY: R.y,
        moved: !1,
        shiftKey: f.shiftKey
      }, (v = e.setPointerCapture) == null || v.call(e, f.pointerId);
      return;
    }
    const y = (N = w.closest) == null ? void 0 : N.call(w, ".dd-flow-edge-hit"), C = y == null ? void 0 : y.closest(".dd-flow-edge");
    r = {
      node: null,
      edgeId: (C == null ? void 0 : C.getAttribute("data-edge-id")) ?? null,
      rowId: null,
      startX: p.x,
      startY: p.y,
      nodeStartX: 0,
      nodeStartY: 0,
      moved: !1,
      shiftKey: f.shiftKey
    }, (x = e.setPointerCapture) == null || x.call(e, f.pointerId);
  }, l = (f) => {
    var y;
    if (!r || !r.node) return;
    const h = i();
    if (!h) return;
    const w = s(h, f.clientX, f.clientY), p = w.x - r.startX, g = w.y - r.startY;
    e.classList.contains("dd-flow-editing") && (!r.moved && Math.hypot(p, g) < Rd || (r.moved || (y = o.onNodeDragStart) == null || y.call(o, r.node.id), r.moved = !0, r.node.x = r.nodeStartX + p, r.node.y = r.nodeStartY + g, n()));
  }, a = () => {
    var m, L, E, v, N;
    if (!r) return;
    const { node: f, edgeId: h, rowId: w, moved: p, shiftKey: g, startX: y, startY: C } = r;
    r = null, f ? p ? (m = o.onNodeMoved) == null || m.call(o, f.id) : w ? (L = o.onRowClick) == null || L.call(o, f.id, w, { shiftKey: g }) : (E = o.onNodeClick) == null || E.call(o, f.id, { shiftKey: g }) : h ? (v = o.onEdgeClick) == null || v.call(o, h, { shiftKey: g }) : e.dataset[ye] || (N = o.onBackgroundClick) == null || N.call(o, { x: y, y: C }, { shiftKey: g });
  }, c = (f) => {
    var y, C, m, L, E, v;
    const h = f.target, w = (C = (y = h.closest) == null ? void 0 : y.call(h, ".dd-flow-node")) == null ? void 0 : C.getAttribute("data-node-id"), p = (E = (L = (m = h.closest) == null ? void 0 : m.call(h, ".dd-flow-edge-hit")) == null ? void 0 : L.closest(".dd-flow-edge")) == null ? void 0 : E.getAttribute("data-edge-id"), g = w ? { nodeId: w } : p ? { edgeId: p } : null;
    g && ((v = o.onContextMenu) != null && v.call(o, g)) && f.preventDefault();
  };
  return e.addEventListener("pointerdown", d), e.addEventListener("contextmenu", c), e.addEventListener("pointermove", l), e.addEventListener("pointerup", a), e.addEventListener("pointercancel", a), {
    destroy() {
      e.removeEventListener("pointerdown", d), e.removeEventListener("contextmenu", c), e.removeEventListener("pointermove", l), e.removeEventListener("pointerup", a), e.removeEventListener("pointercancel", a);
    }
  };
}
function Bd(e, t) {
  return { ...e, nodes: [...e.nodes, t] };
}
function Dd(e, t) {
  return {
    ...e,
    nodes: e.nodes.filter((n) => n.id !== t),
    edges: e.edges.filter((n) => n.from !== t && n.to !== t)
  };
}
function Fd(e, t) {
  return { ...e, edges: e.edges.filter((n) => n.id !== t) };
}
function ve(e, t, n) {
  return { ...e, nodes: e.nodes.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function ge(e, t, n) {
  return { ...e, edges: e.edges.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function Gd(e, t, n, o) {
  return {
    ...e,
    nodes: e.nodes.map(
      (r) => r.id === t && r.rows ? { ...r, rows: r.rows.map((s) => s.id === n ? { ...s, label: o } : s) } : r
    )
  };
}
function qd(e, t, n) {
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
    const w = Pe("row", c, /* @__PURE__ */ new Set([...l, ...s.map((p) => p.id)]));
    return l.add(w), { id: w, label: c };
  });
  return ve(e, t, { rows: a.length ? a : void 0 });
}
function Pe(e, t, n) {
  const o = t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || e;
  if (!n.has(o)) return o;
  let r = 2;
  for (; n.has(`${o}-${r}`); ) r++;
  return `${o}-${r}`;
}
function Hd(e) {
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
  const f = [], h = [], w = [], p = [];
  for (const _ of t.edges) {
    const M = a.has(_.from), P = a.has(_.to);
    M && P ? f.push(_) : !M && P ? h.push(_) : M && !P ? w.push(_) : p.push(_);
  }
  const g = {
    id: s,
    title: d,
    style: t.style,
    direction: t.direction,
    nodes: t.nodes.filter((_) => a.has(_.id)),
    edges: f
  }, y = {
    id: i,
    label: d,
    type: "subprocess",
    subflow: s
  }, C = h.map((_) => ({ ..._, to: i })), m = w.map((_) => ({ ..._, from: i })), L = {
    ...t,
    nodes: [...t.nodes.filter((_) => !a.has(_.id)), y],
    edges: [...p, ...C, ...m]
  }, E = new Set(r), v = new Set(f.map((_) => _.id)), N = new Set([...C, ...m].map((_) => _.id)), x = {};
  for (const [_, M] of Object.entries(n.nodes))
    E.has(_) || (x[_] = M);
  const j = {};
  for (const [_, M] of Object.entries(n.edges))
    !v.has(_) && !N.has(_) && (j[_] = M);
  const R = zd(r, o);
  return R && (x[i] = R), {
    parent: { spec: L, layout: { nodes: x, edges: j } },
    subflow: { spec: g }
  };
}
function zd(e, t) {
  const n = e.map((s) => t[s]).filter((s) => !!s);
  if (!n.length) return null;
  const o = n.reduce((s, i) => s + i.x, 0) / n.length, r = n.reduce((s, i) => s + i.y, 0) / n.length;
  return { x: o, y: r };
}
const Mn = "http://127.0.0.1:5311";
let Yt = !1;
function Vd() {
  return Yt ? Promise.resolve(!0) : fetch(`${Mn}/health`).then((e) => (e.ok && (Yt = !0), e.ok)).catch(() => !1);
}
async function Yd(e, t, n) {
  const r = { layoutPath: e.layout ?? e.spec.replace(/\.flow\.json$/, ".layout.json"), layout: n };
  t && (r.specPath = e.spec, r.spec = t);
  try {
    return (await fetch(`${Mn}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(r)
    })).ok;
  } catch {
    return !1;
  }
}
let te = null, ne = null;
function He(e, t, n) {
  const { nodes: o, edges: r, orphanedNodeIds: s, orphanedEdgeIds: i } = xe(t, n);
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
    history: Ad()
  };
}
function Kd(e) {
  const t = e;
  return !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
}
function Ud(e, t, n = {}) {
  e.classList.add("dd-flow-embed", "dd-flow-inline"), ke(e, t.main.style);
  const o = He(t.main.id, t.main, t.mainLayout), r = Ge(o.nodes, o.edges);
  e.appendChild(r);
  const s = () => {
    var a;
    const l = He(t.main.id, t.main, t.mainLayout);
    (a = e.querySelector("svg.dd-flow-svg")) == null || a.replaceWith(Ge(l.nodes, l.edges));
  }, i = () => ra(t, n, s);
  e.addEventListener("click", i);
  const d = () => (te == null ? void 0 : te.bundle) === t;
  return {
    open: i,
    destroy() {
      e.removeEventListener("click", i), e.innerHTML = "";
    },
    // A fresh object every call, even when inactive -- a shared constant here would let a
    // caller's `getSelection().nodeIds.push(...)` mutate what every subsequent inactive read
    // (from this handle AND any other mountFlow() bundle's own inactive reads) observes.
    getSelection: () => d() ? te.getSelection() : { nodeIds: [], edgeId: null },
    setSelection(l) {
      if (!d()) return;
      const a = te.getSelection(), c = new Set(l.nodeIds ?? a.nodeIds), f = l.edgeId !== void 0 ? l.edgeId : a.edgeId;
      te.setSelection(c, f);
    }
  };
}
const Wd = ".dd-flow-embed[data-flow]:not([data-dd-flow-mounted])";
async function Xd(e = document) {
  const t = Array.from(e.querySelectorAll(Wd));
  await Promise.all(
    t.map(async (n) => {
      n.setAttribute("data-dd-flow-mounted", "1");
      const o = n.getAttribute("data-flow");
      if (o)
        try {
          const r = await fetch(o);
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          const s = await r.json();
          Ud(n, s);
        } catch (r) {
          console.error(`dd-flow: failed to load flow from "${o}"`, r), n.textContent = `dd-flow: failed to load "${o}" (see console)`;
        }
    })
  );
}
let q = null;
const Jd = 3, Qd = 400;
function Zd() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
function ea(e) {
  var o, r;
  if (!Zd()) return;
  const t = e.webkitRequestFullscreen, n = ((o = e.requestFullscreen) == null ? void 0 : o.bind(e)) ?? (t == null ? void 0 : t.bind(e));
  (r = n == null ? void 0 : n()) == null || r.catch(() => {
  });
}
function ta(e) {
  document.fullscreenElement === e && document.exitFullscreen().catch(() => {
  });
}
function na() {
  if (q) return q;
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
  `, document.body.appendChild(e), q = {
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
    inspector: jd(e)
  }, e.addEventListener("click", (o) => {
    o.target === e && Re();
  }), e.querySelector(".dd-flow-close-btn").addEventListener("click", Re);
  const t = e.querySelector(".dd-flow-menu-btn"), n = e.querySelector(".dd-flow-toolbar");
  return t.addEventListener("click", () => {
    n.hidden = !n.hidden, t.setAttribute("aria-expanded", String(!n.hidden)), t.classList.toggle("is-active", !n.hidden);
  }), document.addEventListener("keydown", (o) => {
    if (!e.hidden && (o.ctrlKey || o.metaKey) && !Kd(o.target)) {
      const r = o.key.toLowerCase(), s = r === "y" || r === "z" && o.shiftKey;
      if (r === "z" || s) {
        o.preventDefault(), s ? ne == null || ne.redo() : ne == null || ne.undo();
        return;
      }
    }
    !e.hidden && o.key === "Escape" && (q != null && q.inspector.isOpen ? q.inspector.hide() : Re());
  }), document.addEventListener("fullscreenchange", () => {
    !document.fullscreenElement && q && !q.root.hidden && Re();
  }), q;
}
function Re() {
  q && (ta(q.root), q.root.hidden = !0, q.stage.innerHTML = "", q.inspector.hide(), document.body.classList.remove("dd-flow-lightbox-open"), te = null, ne = null);
}
function oa(e) {
  const t = Math.min(...e.map((s) => s.left)), n = Math.min(...e.map((s) => s.top)), o = Math.max(...e.map((s) => s.right)), r = Math.max(...e.map((s) => s.bottom));
  return new DOMRect(t, n, o - t, r - n);
}
function ra(e, t, n = () => {
}) {
  var O, A;
  const o = na();
  o.root.hidden = !1, document.body.classList.add("dd-flow-lightbox-open"), ea(o.root), o.toolbar.hidden = !0, o.menuBtn.setAttribute("aria-expanded", "false"), o.menuBtn.classList.remove("is-active"), o.authoringEl.hidden = !0;
  const r = [He(e.main.id, e.main, e.mainLayout)];
  let s = !1, i = /* @__PURE__ */ new Set(), d = null, l = null, a = !1, c = !1;
  function f() {
    c || !e.sources || Vd().then((u) => {
      !u || o.root.hidden || (c = !0, o.authoringEl.hidden = !1, le(), o.addShapeBtn.disabled = !s, J());
    });
  }
  f(), o.stage.innerHTML = "";
  const h = document.createElement("div");
  h.className = "dd-flow-stage-inner", o.stage.appendChild(h), ke(o.root, e.main.style);
  const w = { nodes: r[0].nodes, edges: r[0].edges };
  function p() {
    return r[r.length - 1];
  }
  function g() {
    w.nodes = p().nodes, w.edges = p().edges;
  }
  function y(u) {
    return Array.from(h.querySelectorAll(".dd-flow-node")).find(
      (b) => b.getAttribute("data-node-id") === u
    ) ?? null;
  }
  function C(u) {
    return Array.from(h.querySelectorAll(".dd-flow-edge")).find(
      (b) => b.getAttribute("data-edge-id") === u
    ) ?? null;
  }
  function m(u, b = {}) {
    const k = p(), I = Te(k.nodes, k.edges);
    if (k.history.record(_(k), b.mergeKey), b.resizeNodeId) {
      const T = I.nodes[b.resizeNodeId];
      T && (I.nodes[b.resizeNodeId] = { x: T.x, y: T.y });
    }
    b.clearEdgePoints && delete I.edges[b.clearEdgePoints], b.setNodePosition && (I.nodes[b.setNodePosition.id] = b.setNodePosition.point), k.spec = u(k.spec);
    const S = xe(k.spec, I);
    k.nodes = S.nodes, k.edges = S.edges, k.orphanedNodeIds = S.orphanedNodeIds, k.orphanedEdgeIds = S.orphanedEdgeIds, k.dirty = !0, k.specDirty = !0, g(), o.saveBtn.disabled = !1, Z(), ae();
  }
  function L(u) {
    var T;
    const b = p().spec;
    let k, I, S;
    if ("edgeId" in u) {
      const B = b.edges.find((G) => G.id === u.edgeId);
      if (!B) return;
      k = "Arrow label", I = B.label ?? "", S = C(u.edgeId);
    } else {
      const B = b.nodes.find((G) => G.id === u.nodeId);
      if (!B) return;
      if (S = y(u.nodeId), u.rowId) {
        const G = (T = B.rows) == null ? void 0 : T.find((ee) => ee.id === u.rowId);
        if (!G) return;
        k = "Row text", I = G.label, S = Array.from((S == null ? void 0 : S.querySelectorAll(".dd-flow-node-row")) ?? []).find(
          (ee) => ee.getAttribute("data-row-id") === u.rowId
        ) ?? S;
      } else
        k = "Box text", I = B.label;
    }
    S && o.inspector.showPrompt(
      k,
      S.getBoundingClientRect(),
      I,
      (B) => {
        if (B !== I)
          if ("edgeId" in u)
            m((G) => ge(G, u.edgeId, { label: B || void 0 }));
          else if (u.rowId) {
            const G = u.rowId;
            m((ee) => Gd(ee, u.nodeId, G, B), { resizeNodeId: u.nodeId });
          } else
            m((G) => ve(G, u.nodeId, { label: B }), { resizeNodeId: u.nodeId });
      },
      { fieldLabel: "Text", submitLabel: "Save", allowEmpty: "edgeId" in u }
    );
  }
  function E(u) {
    var I;
    const b = p().spec.nodes.find((S) => S.id === u), k = b == null ? void 0 : b.subflow;
    return {
      onLabelChange: (S) => {
        m((B) => ve(B, u, { label: S }), {
          resizeNodeId: u,
          mergeKey: `label:${u}`
        });
        const T = y(u);
        T && o.inspector.refreshAnchor(T.getBoundingClientRect());
      },
      onNoteChange: (S) => m((T) => ve(T, u, { note: S }), { mergeKey: `note:${u}` }),
      onRowsChange: (S) => {
        m((B) => qd(B, u, S), { resizeNodeId: u, mergeKey: `rows:${u}` });
        const T = y(u);
        T && o.inspector.refreshAnchor(T.getBoundingClientRect());
      },
      onTypeChange: (S) => {
        m((T) => ve(T, u, { type: S }), { resizeNodeId: u }), s ? N() : x(u);
      },
      onDelete: () => {
        m((T) => Dd(T, u));
        const S = new Set(i);
        S.delete(u), M(S, null);
      },
      onGotoSubflow: k && ((I = e.subflows) != null && I[k]) ? () => P(k) : void 0
    };
  }
  function v(u) {
    return {
      onLabelChange: (b) => m((k) => ge(k, u, { label: b }), { mergeKey: `edge-label:${u}` }),
      onRoutingChange: (b) => m((k) => ge(k, u, { routing: b }), { clearEdgePoints: u }),
      onStrokeChange: (b) => m((k) => ge(k, u, { stroke: b })),
      onKindChange: (b) => m((k) => ge(k, u, { kind: b })),
      onDelete: () => {
        m((b) => Fd(b, u)), M(/* @__PURE__ */ new Set(), null);
      }
    };
  }
  function N(u = {}) {
    if (!s || !c) {
      o.inspector.hide();
      return;
    }
    i.size === 1 && !d && x([...i][0], u) || d && j(d) || o.inspector.hide();
  }
  function x(u, b = {}) {
    const k = p().spec.nodes.find((S) => S.id === u), I = y(u);
    return !k || !I ? !1 : (o.inspector.showNode(k, I.getBoundingClientRect(), E(u), b), !0);
  }
  function j(u) {
    const b = p().spec.edges.find((I) => I.id === u), k = C(u);
    return !b || !k ? !1 : (o.inspector.showEdge(b, k.getBoundingClientRect(), v(u)), !0);
  }
  function R(u) {
    const b = p();
    b.spec = u.spec;
    const k = xe(b.spec, u.layout);
    b.nodes = k.nodes, b.edges = k.edges, b.orphanedNodeIds = k.orphanedNodeIds, b.orphanedEdgeIds = k.orphanedEdgeIds, b.dirty = !0, b.specDirty = !0, g(), o.saveBtn.disabled = !1;
    const I = new Set(b.spec.nodes.map((T) => T.id)), S = new Set(b.spec.edges.map((T) => T.id));
    o.inspector.hide(), M(
      new Set([...i].filter((T) => I.has(T))),
      d && S.has(d) ? d : null
    ), ae();
  }
  function _(u) {
    return { spec: u.spec, layout: Te(u.nodes, u.edges) };
  }
  ne = {
    undo: () => {
      const u = p().history.undo(_(p()));
      u && R(u);
    },
    redo: () => {
      const u = p().history.redo(_(p()));
      u && R(u);
    }
  };
  function M(u, b, k = {}) {
    i = u, d = b, l = k.rowKey ?? null, le(), Z(), N({ focusLabel: k.focusLabel }), U(h, K.selectionChange, {
      flowId: p().flowId,
      selectedNodeIds: [...i],
      selectedEdgeId: d
    });
  }
  te = {
    bundle: e,
    getSelection: () => ({ nodeIds: [...i], edgeId: d }),
    setSelection: M
  };
  function P(u) {
    var I;
    const b = (I = e.subflows) == null ? void 0 : I[u];
    if (!b) return;
    const k = p().flowId;
    r.push(He(u, b.spec, b.layout)), g(), ke(o.root, b.spec.style ?? e.main.style), J(), M(/* @__PURE__ */ new Set(), null), U(h, K.subflowOpen, { flowId: k, subflowId: u });
  }
  const H = Pd(h, w, Z, {
    onNodeClick: (u, b) => {
      var I;
      const k = p().nodes.find((S) => S.id === u);
      if (k) {
        if (U(h, K.nodeClick, {
          flowId: p().flowId,
          nodeId: u,
          shiftKey: b.shiftKey
        }), s) {
          let S;
          b.shiftKey ? (S = new Set(i), S.has(u) ? S.delete(u) : S.add(u)) : S = i.size === 1 && i.has(u) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([u]), M(S, null);
          return;
        }
        if (k.subflow && ((I = e.subflows) != null && I[k.subflow])) {
          P(k.subflow);
          return;
        }
        c && !b.shiftKey && L({ nodeId: u });
      }
    },
    onNodeDragStart: () => p().history.record(_(p())),
    onNodeMoved: (u) => {
      s && M(/* @__PURE__ */ new Set([u]), null), p().dirty = !0, o.saveBtn.disabled = !1, ae();
    },
    onRowClick: (u, b, k) => {
      if (U(h, K.rowClick, {
        flowId: p().flowId,
        nodeId: u,
        rowId: b,
        shiftKey: k.shiftKey
      }), !s) {
        c && !k.shiftKey && L({ nodeId: u, rowId: b });
        return;
      }
      const I = (l == null ? void 0 : l.nodeId) === u && (l == null ? void 0 : l.rowId) === b;
      M(/* @__PURE__ */ new Set(), null, { rowKey: I ? null : { nodeId: u, rowId: b } });
    },
    onEdgeClick: (u, b) => {
      if (U(h, K.edgeClick, {
        flowId: p().flowId,
        edgeId: u,
        shiftKey: b.shiftKey
      }), !s) {
        c && !b.shiftKey && L({ edgeId: u });
        return;
      }
      M(/* @__PURE__ */ new Set(), d === u ? null : u);
    },
    onBackgroundClick: (u, b) => {
      if (U(h, K.backgroundClick, {
        flowId: p().flowId,
        point: u,
        shiftKey: b.shiftKey
      }), !s) {
        o.inspector.hide();
        return;
      }
      if (a) {
        const k = new Set(p().spec.nodes.map((S) => S.id)), I = Pe("step", "New step", k);
        m((S) => Bd(S, { id: I, label: "New step", type: "process" }), {
          setNodePosition: { id: I, point: u }
        }), a = !1, h.classList.remove("dd-flow-placing"), o.addShapeBtn.classList.remove("is-active"), M(/* @__PURE__ */ new Set([I]), null, { focusLabel: !0 });
        return;
      }
      M(/* @__PURE__ */ new Set(), null);
    },
    // Right-click opens a shape's tools straight away. In live mode that leaves the mode alone:
    // the next left click still edits text, and closing the panel is all there is to undo.
    onContextMenu: (u) => c ? ("nodeId" in u ? s ? M(/* @__PURE__ */ new Set([u.nodeId]), null) : x(u.nodeId) : s ? M(/* @__PURE__ */ new Set(), u.edgeId) : j(u.edgeId), !0) : !1
  });
  let z = null;
  function Z() {
    const u = p(), b = Ge(u.nodes, u.edges, { selectedNodeIds: i, selectedEdgeId: d, selectedRowKey: l }), k = h.querySelector("svg.dd-flow-svg");
    k ? h.replaceChild(b, k) : h.appendChild(b);
    const I = z == null ? void 0 : z.state();
    z == null || z.destroy(), z = On(h, b, { maxFitScale: Jd, initial: I });
  }
  function Le() {
    z == null || z.reset();
  }
  function he() {
    h.classList.toggle("dd-flow-editing", s || c), h.classList.toggle("dd-flow-live", c && !s);
  }
  function pe(u) {
    var k;
    const b = !!(t.onSaveLayout || t.onSaveSpec);
    return c && (b || !!((k = e.sources) != null && k[u.flowId]));
  }
  const de = /* @__PURE__ */ new Map();
  function ae() {
    const u = p();
    pe(u) && (clearTimeout(de.get(u)), de.set(
      u,
      setTimeout(() => {
        de.delete(u), we(u);
      }, Qd)
    ));
  }
  function le() {
    const u = i.size;
    o.makeSubflowBtn.disabled = !s || !c || u < 2, o.makeSubflowBtn.textContent = u >= 2 ? `Make subflow (${u})` : "Make subflow";
  }
  function J() {
    o.breadcrumbEl.innerHTML = "", o.breadcrumbEl.hidden = r.length < 2, r.forEach((I, S) => {
      if (S > 0) {
        const B = document.createElement("span");
        B.className = "dd-flow-breadcrumb-sep", B.textContent = "›", o.breadcrumbEl.appendChild(B);
      }
      const T = document.createElement(S === r.length - 1 ? "span" : "button");
      T.className = "dd-flow-breadcrumb-item", T.textContent = I.title, S !== r.length - 1 && (T.type = "button", T.addEventListener("click", () => {
        r.length = S + 1, g(), ke(o.root, p().spec.style ?? e.main.style), J(), M(/* @__PURE__ */ new Set(), null);
      })), o.breadcrumbEl.appendChild(T);
    }), o.saveBtn.disabled = !(p().dirty || p().specDirty), o.saveBtn.hidden = pe(p()), o.editBtn.classList.toggle("is-active", s), o.addShapeBtn.disabled = !s || !c, he();
    const { orphanedNodeIds: u, orphanedEdgeIds: b } = p(), k = u.length + b.length;
    if (k > 0) {
      const I = [...u, ...b].join(", ");
      o.warningBanner.textContent = `⚠ The saved layout has ${k} position(s) that no longer match this flow (${I}) — they were dropped. This usually means the flow was regenerated with different node/edge ids.`, o.warningBanner.hidden = !1;
    } else
      o.warningBanner.hidden = !0;
  }
  const Y = () => {
    s = !s, he(), o.editBtn.classList.toggle("is-active", s), s && f(), o.addShapeBtn.disabled = !s || !c, s ? (le(), Z(), N()) : (a = !1, h.classList.remove("dd-flow-placing"), o.addShapeBtn.classList.remove("is-active"), M(/* @__PURE__ */ new Set(), null));
  }, Se = () => {
    !s || !c || (a = !a, h.classList.toggle("dd-flow-placing", a), o.addShapeBtn.classList.toggle("is-active", a));
  }, _e = () => {
    if (!s || !c || i.size < 2) return;
    const u = [...i], b = u.map((I) => y(I)).filter((I) => I !== null);
    if (!b.length) return;
    const k = oa(b.map((I) => I.getBoundingClientRect()));
    o.inspector.showPrompt("Name the new subflow", k, "Subflow", (I) => {
      const S = p(), T = new Set(Object.keys(e.subflows ?? {})), B = new Set(S.spec.nodes.map((oe) => oe.id)), G = Pe("subflow", I, T), ee = Pe(G, I, B), wt = {};
      for (const oe of S.nodes) wt[oe.id] = { x: oe.x, y: oe.y };
      const An = _(S);
      let Oe;
      try {
        Oe = Hd({
          spec: S.spec,
          layout: Te(S.nodes, S.edges),
          nodePositions: wt,
          selectedNodeIds: u,
          newSubflowId: G,
          placeholderNodeId: ee,
          placeholderLabel: I,
          existingSubflowIds: T
        });
      } catch (oe) {
        console.error("dd-flow: could not extract subflow", oe);
        return;
      }
      S.history.record(An), S.spec = Oe.parent.spec;
      const $e = xe(S.spec, Oe.parent.layout);
      S.nodes = $e.nodes, S.edges = $e.edges, S.orphanedNodeIds = $e.orphanedNodeIds, S.orphanedEdgeIds = $e.orphanedEdgeIds, S.dirty = !0, S.specDirty = !0, e.subflows || (e.subflows = {}), e.subflows[G] = { spec: Oe.subflow.spec, layout: void 0 }, g(), o.saveBtn.disabled = !1, J(), M(/* @__PURE__ */ new Set([ee]), null);
    });
  }, we = async (u = p()) => {
    var T;
    const b = Te(u.nodes, u.edges), k = u.specDirty, I = t.onSaveLayout || t.onSaveSpec, S = c ? (T = e.sources) == null ? void 0 : T[u.flowId] : void 0;
    if (!I && S && await Yd(S, k ? u.spec : null, b)) {
      u.dirty = !1, u.specDirty = !1, o.saveBtn.disabled = !0, me(u, b);
      return;
    }
    t.onSaveLayout ? t.onSaveLayout(u.flowId, b) : Rn(u.flowId, b), k && (t.onSaveSpec ? t.onSaveSpec(u.flowId, u.spec) : Pn(u.flowId, u.spec)), u.dirty = !1, u.specDirty = !1, o.saveBtn.disabled = !0, me(u, b);
  };
  function me(u, b) {
    u === r[0] && (e.main = u.spec, e.mainLayout = b, n());
  }
  const Ne = () => {
    const u = h.querySelector("svg.dd-flow-svg");
    u && Fn(u, h, `${p().flowId}.svg`);
  }, Ie = () => {
    const u = h.querySelector("svg.dd-flow-svg");
    u && Gn(u, h, `${p().flowId}.png`);
  };
  o.editBtn.onclick = Y, o.addShapeBtn.onclick = Se, o.makeSubflowBtn.onclick = _e, o.saveBtn.onclick = () => void we(), o.fitBtn.onclick = Le, o.root.querySelector(".dd-flow-export-svg-btn").onclick = Ne, o.root.querySelector(".dd-flow-export-png-btn").onclick = Ie, s = !1, i = /* @__PURE__ */ new Set(), d = null, l = null, a = !1, h.classList.remove("dd-flow-editing", "dd-flow-live", "dd-flow-placing"), J(), le(), Z(), N(), (A = (O = o.root._interactions) == null ? void 0 : O.destroy) == null || A.call(O), o.root._interactions = H;
}
if (typeof document < "u") {
  const e = () => {
    Xd(), $d();
  }, t = globalThis.document$;
  t ? t.subscribe(e) : document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e();
}
export {
  K as DD_FLOW_EVENTS,
  nt as DEFAULT_THEME,
  qe as THEMES,
  ke as applyTheme,
  Xn as attachRelationHighlight,
  On as attachViewport,
  Xd as autoMountFlows,
  $d as autoMountGraphs,
  Be as buildGraphIndex,
  se as collectClosure,
  xe as computeLayout,
  U as dispatchFlowEvent,
  ze as downloadBlob,
  Rn as downloadLayout,
  Gn as downloadPng,
  Fn as downloadSvg,
  ca as emptyLayout,
  Cd as layoutLayered,
  Ud as mountFlow,
  Id as mountGraph,
  sd as paintLevels,
  Me as paintRelations,
  Ue as paintRowRelations,
  la as registerTheme,
  Ge as renderSvg,
  cd as routeEdge,
  Te as toLayout
};
