var ln = Object.defineProperty;
var cn = (e, t, n) => t in e ? ln(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var B = (e, t, n) => cn(e, typeof t != "symbol" ? t + "" : t, n);
const W = {
  nodeClick: "dd-flow:node-click",
  edgeClick: "dd-flow:edge-click",
  backgroundClick: "dd-flow:background-click",
  /** Fired for a click on a row inside a `compound` node (see types.ts::NodeRow) — for a flow
   *  mount this fires INSTEAD OF `nodeClick`; for a graph mount it fires ALONGSIDE `nodeClick`
   *  (the row's owning node still gets pinned/highlighted, same as any other click on it). */
  rowClick: "dd-flow:row-click",
  selectionChange: "dd-flow:selection-change",
  subflowOpen: "dd-flow:subflow-open"
};
function K(e, t, n) {
  e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: !0, composed: !0 }));
}
function _e(e, t) {
  const n = URL.createObjectURL(e), o = document.createElement("a");
  o.href = n, o.download = t, document.body.appendChild(o), o.click(), o.remove(), URL.revokeObjectURL(n);
}
function fn(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  _e(new Blob([n], { type: "application/json" }), `${e}.layout.json`);
}
function un(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  _e(new Blob([n], { type: "application/json" }), `${e}.flow.json`);
}
const hn = /^var\((--dd-flow-[a-z-]+)\)$/;
function pn(e, t) {
  const n = e.cloneNode(!0), o = getComputedStyle(t), r = ["fill", "stroke"], s = (d) => {
    const l = d.match(hn);
    return l && o.getPropertyValue(l[1]).trim() || d;
  }, i = [n, ...Array.from(n.querySelectorAll("*"))];
  for (const d of i)
    for (const l of r) {
      const a = d.getAttribute(l);
      a && d.setAttribute(l, s(a));
    }
  return n;
}
function Lt(e, t) {
  const n = pn(e, t);
  return n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), new XMLSerializer().serializeToString(n);
}
function wn(e, t, n) {
  const o = Lt(e, t);
  _e(new Blob([o], { type: "image/svg+xml;charset=utf-8" }), n);
}
function mn(e, t, n, o = 2) {
  const r = Lt(e, t), s = parseFloat(e.getAttribute("width") || "800"), i = parseFloat(e.getAttribute("height") || "600"), d = getComputedStyle(t).getPropertyValue("--dd-flow-canvas-bg").trim() || "#ffffff", l = new Blob([r], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(l), c = new Image();
  c.onload = () => {
    const f = document.createElement("canvas");
    f.width = s * o, f.height = i * o;
    const h = f.getContext("2d");
    if (!h) {
      URL.revokeObjectURL(a);
      return;
    }
    h.scale(o, o), h.fillStyle = d, h.fillRect(0, 0, s, i), h.drawImage(c, 0, 0, s, i), URL.revokeObjectURL(a), f.toBlob((u) => {
      u && _e(u, n);
    }, "image/png");
  }, c.onerror = () => URL.revokeObjectURL(a), c.src = a;
}
const gn = "http://www.w3.org/2000/svg";
function N(e, t = {}) {
  const n = document.createElementNS(gn, e);
  for (const [o, r] of Object.entries(t)) n.setAttribute(o, String(r));
  return n;
}
const Je = {
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
}, oe = 24, de = 28, bn = 8;
function St(e) {
  return de + ((e == null ? void 0 : e.length) ?? 0) * oe + bn;
}
function Nt(e, t, n) {
  const o = [e, ...(t ?? []).map((s) => s.label)], r = Math.max(...o.map((s) => s.length));
  return Math.max(n, r * Ot + 40);
}
function z(e, t) {
  return `${e}::${t}`;
}
function ze(e) {
  return `${z(e.sourceNode, e.sourceRow)}=>${z(e.targetNode, e.targetRow)}`;
}
function Qe(e, t, n) {
  var i;
  const o = ((i = e.rows) == null ? void 0 : i.findIndex((d) => d.id === t)) ?? -1;
  if (o < 0) return null;
  const s = -e.h / 2 + de + o * oe + oe / 2;
  return { x: e.x + (n === "left" ? -e.w / 2 : e.w / 2), y: e.y + s };
}
function ae(e) {
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
function It(e, t, n) {
  const { fill: o, stroke: r } = ae(e), s = { fill: o, stroke: r, "stroke-width": 2 };
  switch (e) {
    case "start":
    case "end": {
      const i = n / 2;
      return N("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: i, ry: i, ...s });
    }
    case "decision": {
      const i = [
        [0, -n / 2],
        [t / 2, 0],
        [0, n / 2],
        [-t / 2, 0]
      ].map((d) => d.join(",")).join(" ");
      return N("polygon", { points: i, ...s });
    }
    case "data": {
      const i = t * 0.15, d = [
        [-t / 2 + i, -n / 2],
        [t / 2, -n / 2],
        [t / 2 - i, n / 2],
        [-t / 2, n / 2]
      ].map((l) => l.join(",")).join(" ");
      return N("polygon", { points: d, ...s });
    }
    case "manual": {
      const i = t * 0.12, d = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [t / 2 - i, n / 2],
        [-t / 2 + i, n / 2]
      ].map((l) => l.join(",")).join(" ");
      return N("polygon", { points: d, ...s });
    }
    case "document": {
      const i = n * 0.12, d = [
        `M ${-t / 2} ${-n / 2}`,
        `L ${t / 2} ${-n / 2}`,
        `L ${t / 2} ${n / 2 - i}`,
        `C ${t / 4} ${n / 2 + i}, ${-t / 4} ${n / 2 - i * 2}, ${-t / 2} ${n / 2}`,
        "Z"
      ].join(" ");
      return N("path", { d, ...s });
    }
    case "multidocument": {
      const i = N("g", {}), d = n * 0.12, l = [
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
        i.appendChild(N("path", { d: f, ...s }));
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
      return N("polygon", { points: i, ...s });
    }
    case "database": {
      const i = n * 0.18, d = -n / 2, l = n / 2, a = N("g", {}), c = [
        `M ${-t / 2} ${d + i}`,
        `L ${-t / 2} ${l - i}`,
        `A ${t / 2} ${i} 0 0 0 ${t / 2} ${l - i}`,
        `L ${t / 2} ${d + i}`,
        "Z"
      ].join(" ");
      return a.appendChild(N("path", { d: c, ...s })), a.appendChild(N("ellipse", { cx: 0, cy: d + i, rx: t / 2, ry: i, ...s })), a;
    }
    case "delay": {
      const i = n / 2, d = [
        `M ${-t / 2} ${-n / 2}`,
        `L ${t / 2 - i} ${-n / 2}`,
        `A ${i} ${i} 0 0 1 ${t / 2 - i} ${n / 2}`,
        `L ${-t / 2} ${n / 2}`,
        "Z"
      ].join(" ");
      return N("path", { d, ...s });
    }
    case "on-page-reference":
      return N("circle", { cx: 0, cy: 0, r: Math.min(t, n) / 2, ...s });
    case "off-page-reference": {
      const i = n * 0.3, d = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [t / 2, n / 2 - i],
        [0, n / 2],
        [-t / 2, n / 2 - i]
      ].map((l) => l.join(",")).join(" ");
      return N("polygon", { points: d, ...s });
    }
    case "alternate-process": {
      const i = n * 0.35;
      return N("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: i, ry: i, ...s });
    }
    case "merge": {
      const i = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [0, n / 2]
      ].map((d) => d.join(",")).join(" ");
      return N("polygon", { points: i, ...s });
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
      return N("polygon", { points: d, ...s });
    }
    case "subprocess": {
      const i = N("g", {});
      i.appendChild(N("rect", { x: -t / 2, y: -n / 2, width: t, height: n, ...s }));
      const d = 10;
      return i.appendChild(
        N("line", {
          x1: -t / 2 + d,
          y1: -n / 2,
          x2: -t / 2 + d,
          y2: n / 2,
          stroke: ae(e).stroke,
          "stroke-width": 2
        })
      ), i.appendChild(
        N("line", {
          x1: t / 2 - d,
          y1: -n / 2,
          x2: t / 2 - d,
          y2: n / 2,
          stroke: ae(e).stroke,
          "stroke-width": 2
        })
      ), i;
    }
    case "process":
    default:
      return N("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: 6, ry: 6, ...s });
  }
}
function yn(e, t) {
  const n = N("g", { transform: `translate(${e / 2 - 16}, ${t / 2 - 16})`, class: "dd-flow-subflow-badge" });
  n.appendChild(N("circle", { cx: 0, cy: 0, r: 10, fill: "var(--dd-flow-subprocess-stroke)" }));
  const o = N("path", {
    d: "M -4 3 L 3 -4 M -1 -4 L 3 -4 L 3 0",
    stroke: "#ffffff",
    "stroke-width": 1.6,
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });
  return n.appendChild(o), n;
}
function vn(e, t) {
  const { text: n, stroke: o } = ae(e.type), r = N("g", { class: "dd-flow-node-body" }), s = -e.h / 2, i = (l) => N("line", { x1: -e.w / 2, x2: e.w / 2, y1: l, y2: l, stroke: o, "stroke-width": 1, opacity: 0.4 }), d = N("text", {
    x: 0,
    y: s + de / 2,
    fill: n,
    "text-anchor": "middle",
    "dominant-baseline": "central",
    class: "dd-flow-label"
  });
  return d.textContent = e.label, r.appendChild(d), r.appendChild(i(s + de)), (e.rows ?? []).forEach((l, a) => {
    const c = s + de + a * oe, f = N("g", {
      class: `dd-flow-node-row${l.id === t ? " is-row-selected" : ""}`,
      "data-row-id": l.id
    });
    f.appendChild(
      N("rect", { x: -e.w / 2, y: c, width: e.w, height: oe, fill: "transparent" })
    );
    const h = N("text", {
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
function En(e, t = {}) {
  var r;
  const n = [
    "dd-flow-node",
    `dd-flow-node-${e.type}`,
    t.selected && "is-selected",
    t.multiselected && "is-multiselected"
  ].filter(Boolean).join(" "), o = N("g", {
    class: n,
    "data-node-id": e.id,
    transform: `translate(${e.x}, ${e.y})`
  });
  if (o.appendChild(It(e.type, e.w, e.h)), e.type === "compound" && ((r = e.rows) != null && r.length))
    o.appendChild(vn(e, t.selectedRowId));
  else {
    const { text: s } = ae(e.type), i = N("text", {
      x: 0,
      y: 0,
      fill: s,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      class: "dd-flow-label"
    });
    xn(i, e.label, e.w - 20), o.appendChild(i);
  }
  return e.subflow && o.appendChild(yn(e.w, e.h)), o;
}
const De = 16, Ot = 7.2;
function $t(e, t) {
  const n = e.split(/\s+/), o = Math.max(4, Math.floor(t / Ot)), r = [];
  let s = "";
  for (const i of n) {
    const d = s ? `${s} ${i}` : i;
    d.length > o && s ? (r.push(s), s = i) : s = d;
  }
  return s && r.push(s), r;
}
function xn(e, t, n) {
  const o = $t(t, n), r = -((o.length - 1) * De) / 2;
  o.forEach((s, i) => {
    const d = N("tspan", { x: 0, y: r + i * De });
    d.textContent = s, e.appendChild(d);
  });
}
function kn(e, t, n) {
  const r = n - (e === "start" || e === "end" ? n * 0.3 : 20);
  return $t(t, Math.max(20, r)).length * De + 24;
}
function Ze(e) {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const o of e)
    t.has(o.to) || t.set(o.to, []), t.get(o.to).push(o.from), n.has(o.from) || n.set(o.from, []), n.get(o.from).push(o.to);
  return { parentsOf: t, childrenOf: n };
}
function re(e, t) {
  const n = /* @__PURE__ */ new Set(), o = [...e.get(t) ?? []];
  for (; o.length; ) {
    const r = o.pop();
    n.has(r) || (n.add(r), o.push(...e.get(r) ?? []));
  }
  return n;
}
const et = ["is-focus", "is-upstream", "is-downstream", "is-dimmed"], tt = ["is-row-focus", "is-row-upstream", "is-row-downstream", "is-row-dimmed"];
function Mt(e, t, n, o, r) {
  const s = new Set(n ? [...o, n] : []), i = new Set(n ? [...r, n] : []);
  for (const l of e.querySelectorAll(".dd-flow-node")) {
    if (l.classList.remove(...et), !n) continue;
    const a = l.getAttribute("data-node-id") ?? "";
    a === n ? l.classList.add("is-focus") : o.has(a) ? l.classList.add("is-upstream") : r.has(a) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed");
  }
  const d = new Map(t.map((l) => [l.id, l]));
  for (const l of e.querySelectorAll(".dd-flow-edge")) {
    if (l.classList.remove(...et), !n) continue;
    const a = d.get(l.getAttribute("data-edge-id") ?? "");
    a && (s.has(a.from) && s.has(a.to) ? l.classList.add("is-upstream") : i.has(a.from) && i.has(a.to) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed"));
  }
}
function ge(e, t, n, o) {
  const r = o ? re(n.parentsOf, o) : /* @__PURE__ */ new Set(), s = o ? re(n.childrenOf, o) : /* @__PURE__ */ new Set();
  Mt(e, t, o, r, s);
}
function Ne(e, t, n, o) {
  var c;
  const r = o ? z(o.nodeId, o.rowId) : null, s = r ? re(n.parentsOf, r) : /* @__PURE__ */ new Set(), i = r ? re(n.childrenOf, r) : /* @__PURE__ */ new Set(), d = new Set(r ? [...s, r] : []), l = new Set(r ? [...i, r] : []);
  for (const f of e.querySelectorAll(".dd-flow-node-row")) {
    if (f.classList.remove(...tt), !r) continue;
    const h = ((c = f.closest(".dd-flow-node")) == null ? void 0 : c.getAttribute("data-node-id")) ?? "", u = f.getAttribute("data-row-id") ?? "", p = z(h, u);
    p === r ? f.classList.add("is-row-focus") : s.has(p) ? f.classList.add("is-row-upstream") : i.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
  const a = new Map(t.map((f) => [ze(f), f]));
  for (const f of e.querySelectorAll(".dd-flow-row-edge")) {
    if (f.classList.remove(...tt), !r) continue;
    const h = a.get(f.getAttribute("data-row-edge-id") ?? "");
    if (!h) continue;
    const u = z(h.sourceNode, h.sourceRow), p = z(h.targetNode, h.targetRow);
    d.has(u) && d.has(p) ? f.classList.add("is-row-upstream") : l.has(u) && l.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
}
function Cn(e, t, n = {}) {
  const o = Ze(t), r = n.flowId ?? "", s = n.rowEdges ?? [], i = Ze(
    s.map((m) => ({
      id: ze(m),
      from: z(m.sourceNode, m.sourceRow),
      to: z(m.targetNode, m.targetRow)
    }))
  ), d = /* @__PURE__ */ new Map();
  for (const m of s)
    d.set(z(m.sourceNode, m.sourceRow), m.sourceNode), d.set(z(m.targetNode, m.targetRow), m.targetNode);
  let l = null, a = null;
  const c = () => a ? `r:${a.nodeId}:${a.rowId}` : l ? `n:${l}` : "", f = () => K(e, W.selectionChange, {
    flowId: r,
    selectedNodeIds: a ? [a.nodeId] : l ? [l] : [],
    selectedEdgeId: null
  }), h = (m) => {
    var w;
    const v = (w = m == null ? void 0 : m.closest) == null ? void 0 : w.call(m, ".dd-flow-node");
    return (v == null ? void 0 : v.getAttribute("data-node-id")) ?? null;
  }, u = (m) => {
    var I, M;
    const v = (I = m == null ? void 0 : m.closest) == null ? void 0 : I.call(m, ".dd-flow-node-row"), w = (M = v == null ? void 0 : v.closest(".dd-flow-node")) == null ? void 0 : M.getAttribute("data-node-id"), g = v == null ? void 0 : v.getAttribute("data-row-id");
    return w && g ? { nodeId: w, rowId: g } : null;
  }, p = () => {
    if (a) {
      const m = z(a.nodeId, a.rowId), v = re(i.parentsOf, m), w = re(i.childrenOf, m);
      Ne(e, s, i, a);
      const g = new Set([...v].map((M) => d.get(M) ?? M)), I = new Set([...w].map((M) => d.get(M) ?? M));
      Mt(e, t, a.nodeId, g, I);
    } else
      ge(e, t, o, l), s.length && Ne(e, s, i, null);
  }, y = (m) => {
    if (l || a) return;
    const v = h(m.target);
    v && ge(e, t, o, v);
  }, k = (m) => {
    var w, g;
    if (l || a) return;
    const v = (g = (w = m.relatedTarget) == null ? void 0 : w.closest) == null ? void 0 : g.call(w, ".dd-flow-node");
    v && v === m.target.closest(".dd-flow-node") || ge(e, t, o, null);
  }, x = (m) => {
    const v = h(m.target), w = s.length ? u(m.target) : null, g = c();
    w ? (a = (a == null ? void 0 : a.nodeId) === w.nodeId && (a == null ? void 0 : a.rowId) === w.rowId ? null : w, l = null) : (l = v && v !== l ? v : null, a = null), p(), v ? K(e, W.nodeClick, {
      flowId: r,
      nodeId: v,
      shiftKey: m.shiftKey
    }) : K(e, W.backgroundClick, {
      flowId: r,
      point: { x: m.clientX, y: m.clientY },
      shiftKey: m.shiftKey
    }), c() !== g && f();
  };
  return n.hover !== !1 && (e.addEventListener("pointerover", y), e.addEventListener("pointerout", k)), e.addEventListener("click", x), {
    setFocus(m) {
      const v = c();
      l = m, a = null, p(), c() !== v && f();
    },
    getFocus: () => l,
    setRowFocus(m) {
      const v = c();
      a = m, l = null, p(), c() !== v && f();
    },
    getRowFocus: () => a,
    destroy() {
      e.removeEventListener("pointerover", y), e.removeEventListener("pointerout", k), e.removeEventListener("click", x), ge(e, t, o, null), s.length && Ne(e, s, i, null);
    }
  };
}
const be = 40;
function Fe(e) {
  const t = e.type === "conditional" ? "conditional" : "default", n = e.type === "dashed" ? "dashed" : "solid";
  return {
    kind: e.kind ?? t,
    routing: e.routing ?? "orthogonal",
    stroke: e.stroke ?? n
  };
}
function _n(e, t) {
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
function Ln(e, t) {
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
function Sn(e, t, n = "orthogonal") {
  if (n === "straight") return _n(e, t);
  if (n === "bezier") return Ln(e, t);
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
const Nn = 10, nt = 40;
function jt(e) {
  const [t, n] = [e[0], e[e.length - 1]], o = n.x - t.x, r = n.y - t.y;
  if (Math.abs(o) >= Math.abs(r)) {
    const i = Math.max(nt, Math.abs(o) / 2) * Math.sign(o || 1);
    return `M ${t.x} ${t.y} C ${t.x + i} ${t.y}, ${n.x - i} ${n.y}, ${n.x} ${n.y}`;
  }
  const s = Math.max(nt, Math.abs(r) / 2) * Math.sign(r || 1);
  return `M ${t.x} ${t.y} C ${t.x} ${t.y + s}, ${n.x} ${n.y - s}, ${n.x} ${n.y}`;
}
function In(e, t) {
  if (!t || e.length <= 2) return On(e);
  const n = [`M ${e[0].x} ${e[0].y}`];
  for (let r = 1; r < e.length - 1; r++) {
    const s = e[r - 1], i = e[r], d = e[r + 1], l = Math.hypot(i.x - s.x, i.y - s.y), a = Math.hypot(d.x - i.x, d.y - i.y), c = Math.min(Nn, l / 2, a / 2), f = { x: i.x - (i.x - s.x) / l * c, y: i.y - (i.y - s.y) / l * c }, h = { x: i.x + (d.x - i.x) / a * c, y: i.y + (d.y - i.y) / a * c };
    n.push(`L ${f.x} ${f.y}`, `Q ${i.x} ${i.y} ${h.x} ${h.y}`);
  }
  const o = e[e.length - 1];
  return n.push(`L ${o.x} ${o.y}`), n.join(" ");
}
function On(e) {
  return e.map((t, n) => `${n === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
}
const $n = {
  solid: null,
  dashed: "6,4",
  dotted: "1.5,4"
};
function Mn(e) {
  return e.filter((t, n) => n === 0 || t.x !== e[n - 1].x || t.y !== e[n - 1].y);
}
function jn(e, t, n, o = {}) {
  const r = e.points.length >= 2 ? e.points : Sn(t, n, Fe(e).routing), s = Mn(r), { kind: i, routing: d, stroke: l } = Fe(e), a = N("g", {
    class: `dd-flow-edge dd-flow-edge-${i}${o.selected ? " is-selected" : ""}`,
    "data-edge-id": e.id
  }), c = d === "bezier" && s.length === 2 ? jt(s) : In(s, d === "curved");
  a.appendChild(
    N("path", { d: c, fill: "none", stroke: "transparent", "stroke-width": 16, class: "dd-flow-edge-hit" })
  );
  const f = N("path", {
    d: c,
    fill: "none",
    stroke: i === "conditional" ? "var(--dd-flow-edge-conditional-stroke)" : "var(--dd-flow-edge-stroke)",
    "stroke-width": 2,
    "marker-end": "url(#dd-flow-arrow)"
  }), h = $n[l];
  if (h && f.setAttribute("stroke-dasharray", h), a.appendChild(f), e.label) {
    const u = s[Math.floor((s.length - 1) / 2)], p = s[Math.floor((s.length - 1) / 2) + 1] ?? u, y = (u.x + p.x) / 2, k = (u.y + p.y) / 2, x = Math.max(24, e.label.length * 7 + 12);
    a.appendChild(
      N("rect", {
        x: y - x / 2,
        y: k - 10,
        width: x,
        height: 20,
        rx: 4,
        fill: "var(--dd-flow-edge-label-bg)",
        class: "dd-flow-edge-label-bg"
      })
    );
    const m = N("text", {
      x: y,
      y: k,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "var(--dd-flow-edge-label-text)",
      class: "dd-flow-edge-label"
    });
    m.textContent = e.label, a.appendChild(m);
  }
  return a;
}
function Tn(e, t, n) {
  const o = N("g", {
    class: `dd-flow-row-edge${e.flagged ? " dd-flow-row-edge-flagged" : ""}`,
    "data-row-edge-id": ze(e)
  }), r = jt([t, n]);
  return o.appendChild(
    N("path", {
      d: r,
      fill: "none",
      stroke: "var(--dd-flow-row-edge-stroke, var(--dd-flow-edge-stroke))",
      "stroke-width": 1.5,
      "stroke-dasharray": "3,3"
    })
  ), o;
}
function Rn() {
  const e = N("defs", {}), t = N("marker", {
    id: "dd-flow-arrow",
    viewBox: "0 0 10 10",
    refX: 9,
    refY: 5,
    markerWidth: 8,
    markerHeight: 8,
    orient: "auto-start-reverse"
  });
  return t.appendChild(N("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "var(--dd-flow-edge-stroke)" })), e.appendChild(t), e;
}
function qe(e, t, n = {}) {
  var x, m, v, w;
  const o = new Map(e.map((g) => [g.id, g]));
  let r = 1 / 0, s = 1 / 0, i = -1 / 0, d = -1 / 0;
  for (const g of e)
    r = Math.min(r, g.x - g.w / 2), s = Math.min(s, g.y - g.h / 2), i = Math.max(i, g.x + g.w / 2), d = Math.max(d, g.y + g.h / 2);
  e.length || (r = 0, s = 0, i = 200, d = 100);
  const l = i - r + be * 2, a = d - s + be * 2, c = be - r, f = be - s, h = N("svg", {
    class: "dd-flow-svg",
    viewBox: `0 0 ${l} ${a}`,
    width: l,
    height: a
  });
  h.appendChild(Rn());
  const u = N("g", { class: "dd-flow-world", transform: `translate(${c}, ${f})` }), p = N("g", { class: "dd-flow-edges" });
  for (const g of t) {
    const I = o.get(g.from), M = o.get(g.to);
    !I || !M || p.appendChild(jn(g, I, M, { selected: g.id === n.selectedEdgeId }));
  }
  u.appendChild(p);
  const y = (((x = n.selectedNodeIds) == null ? void 0 : x.size) ?? 0) > 1, k = N("g", { class: "dd-flow-nodes" });
  for (const g of e) {
    const I = ((m = n.selectedNodeIds) == null ? void 0 : m.has(g.id)) ?? !1, M = !y && (g.id === n.selectedNodeId || I), j = ((v = n.selectedRowKey) == null ? void 0 : v.nodeId) === g.id ? n.selectedRowKey.rowId : null;
    k.appendChild(En(g, { selected: M, multiselected: y && I, selectedRowId: j }));
  }
  if (u.appendChild(k), (w = n.rowEdges) != null && w.length) {
    const g = N("g", { class: "dd-flow-row-edges" });
    for (const I of n.rowEdges) {
      const M = o.get(I.sourceNode), j = o.get(I.targetNode);
      if (!M || !j) continue;
      const T = M.x <= j.x, O = Qe(M, I.sourceRow, T ? "right" : "left"), A = Qe(j, I.targetRow, T ? "left" : "right");
      !O || !A || g.appendChild(Tn(I, O, A));
    }
    u.appendChild(g);
  }
  return h.appendChild(u), h;
}
const xe = {
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
xe.host = {
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
const Ie = "bam";
function le(e, t) {
  const n = xe[t ?? Ie] ?? xe[Ie];
  e.setAttribute("data-dd-flow-theme", t ?? Ie);
  for (const [o, r] of Object.entries(n.vars))
    e.style.setProperty(`--dd-flow-${o}`, r);
}
function yd(e, t) {
  xe[e] = t;
}
const An = 0.2, Pn = 4, Bn = 4, Dn = 300, Fn = 30, se = "ddFlowPanned";
function Tt(e, t, n = {}) {
  var $, _, R, V, te;
  const o = n.minScale ?? An, r = n.maxScale ?? Pn, s = n.maxFitScale ?? 1, i = Number(t.getAttribute("width")) || 1, d = Number(t.getAttribute("height")) || 1, l = 24, a = t.querySelector("g.dd-flow-world");
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
  c.setAttribute("class", "dd-flow-pz"), ($ = a.parentNode) == null || $.insertBefore(c, a), c.appendChild(a), e.classList.add("dd-flow-has-viewport");
  let f = ((_ = n.initial) == null ? void 0 : _.scale) ?? 1, h = ((R = n.initial) == null ? void 0 : R.tx) ?? 0, u = ((V = n.initial) == null ? void 0 : V.ty) ?? 0, p = ((te = n.initial) == null ? void 0 : te.userAdjusted) ?? !1;
  const y = () => {
    c.setAttribute("transform", `translate(${h}, ${u}) scale(${f})`);
  }, k = () => {
    const L = e.getBoundingClientRect(), S = Math.max(1, Math.round(L.width)), P = Math.max(1, Math.round(L.height));
    return t.setAttribute("width", String(S)), t.setAttribute("height", String(P)), t.setAttribute("viewBox", `0 0 ${S} ${P}`), { w: S, h: P };
  }, x = () => {
    const L = e.getBoundingClientRect(), S = a.getBoundingClientRect();
    return !S.width || !S.height || !f ? null : {
      x: (S.left - L.left - h) / f,
      y: (S.top - L.top - u) / f,
      width: S.width / f,
      height: S.height / f
    };
  }, m = () => {
    const { w: L, h: S } = k();
    if (p) {
      y();
      return;
    }
    y();
    const P = x() ?? { x: 0, y: 0, width: i, height: d }, H = { w: Math.max(1, L - l * 2), h: Math.max(1, S - l * 2) };
    f = Math.max(o, Math.min(s, H.w / P.width, H.h / P.height)), h = (L - P.width * f) / 2 - P.x * f, u = (S - P.height * f) / 2 - P.y * f, y();
  }, v = (L, S, P) => {
    const H = f;
    f = Math.min(r, Math.max(o, f * P)), f !== H && (h = L - (L - h) / H * f, u = S - (S - u) / H * f, y());
  }, w = (L) => {
    L.preventDefault(), p = !0;
    const S = e.getBoundingClientRect();
    v(L.clientX - S.left, L.clientY - S.top, L.deltaY < 0 ? 1.1 : 0.9);
  };
  let g = !1, I = !1, M = 0, j = 0, T = 0, O = 0;
  const A = /* @__PURE__ */ new Map();
  let F = 0, ce = 0, fe = 0, ue = 0;
  const he = () => {
    if (A.size < 2) return null;
    const [L, S] = [...A.values()];
    return { distance: Math.hypot(L.x - S.x, L.y - S.y), cx: (L.x + S.x) / 2, cy: (L.y + S.y) / 2 };
  }, pe = (L) => {
    const S = L;
    return S != null && S.closest ? !S.closest(".dd-flow-node") && !S.closest(".dd-flow-edge-hit") : !0;
  }, we = (L) => {
    A.set(L.pointerId, { x: L.clientX, y: L.clientY });
    const S = he();
    if (S) {
      g = !1, F = S.distance;
      return;
    }
    pe(L.target) && (g = !0, I = !1, M = L.clientX, j = L.clientY, T = h, O = u);
  }, Q = (L) => {
    A.has(L.pointerId) && A.set(L.pointerId, { x: L.clientX, y: L.clientY });
    const S = he();
    if (S) {
      if (!F) {
        F = S.distance;
        return;
      }
      p = !0, I = !0, e.dataset[se] = "1";
      const U = e.getBoundingClientRect();
      v(S.cx - U.left, S.cy - U.top, S.distance / F), F = S.distance;
      return;
    }
    if (!g) return;
    const P = L.clientX - M, H = L.clientY - j;
    !I && Math.hypot(P, H) < Bn || (I = !0, p = !0, e.dataset[se] = "1", h = T + P, u = O + H, y());
  }, me = (L) => {
    const S = Date.now(), P = S - ce < Dn && Math.hypot(L.clientX - fe, L.clientY - ue) < Fn;
    return ce = P ? 0 : S, fe = L.clientX, ue = L.clientY, P;
  }, b = (L) => {
    const S = A.size >= 2;
    if (A.delete(L.pointerId), S) {
      F = 0, A.size < 2 && setTimeout(() => delete e.dataset[se], 0);
      return;
    }
    if (g) {
      if (g = !1, !I) {
        pe(L.target) && me(L) && (p = !1, m());
        return;
      }
      setTimeout(() => delete e.dataset[se], 0);
    }
  }, E = { capture: !0 };
  e.addEventListener("wheel", w, { passive: !1, capture: !0 }), e.addEventListener("pointerdown", we, E), e.addEventListener("pointermove", Q, E), e.addEventListener("pointerup", b, E), e.addEventListener("pointercancel", b, E);
  const C = new ResizeObserver(() => m());
  return C.observe(e), m(), {
    fit: m,
    state: () => ({ scale: f, tx: h, ty: u, userAdjusted: p }),
    reset() {
      p = !1, m();
    },
    zoomBy(L) {
      p = !0;
      const S = e.getBoundingClientRect();
      v(S.width / 2, S.height / 2, L);
    },
    destroy() {
      C.disconnect(), e.removeEventListener("wheel", w, E), e.removeEventListener("pointerdown", we, E), e.removeEventListener("pointermove", Q, E), e.removeEventListener("pointerup", b, E), e.removeEventListener("pointercancel", b, E), e.classList.remove("dd-flow-has-viewport");
    }
  };
}
const ne = {
  nodeWidth: 118,
  nodeHeight: 34,
  layerGap: 170,
  rowGap: 48,
  margin: 30,
  hint: "Hover to preview · click to pin · scroll to zoom · drag to pan"
};
function Gn(e, t, n) {
  const { nodeWidth: o, nodeHeight: r, layerGap: s, rowGap: i, margin: d } = n, l = /* @__PURE__ */ new Map();
  for (const p of e) {
    const y = p.layer ?? 0;
    l.has(y) || l.set(y, []), l.get(y).push(p);
  }
  for (const p of l.values()) p.sort((y, k) => y.id.localeCompare(k.id));
  const a = Math.max(1, ...[...l.values()].map((p) => p.length)), c = Math.max(0, ...e.map((p) => p.layer ?? 0)), f = a * (r + i) - i, h = new Set(t.map((p) => p.source)), u = /* @__PURE__ */ new Map();
  for (const [p, y] of l) {
    const k = y.filter((w) => h.has(w.id)), x = y.filter((w) => !h.has(w.id)), m = k.length ? k.length * (r + i) - i : 0, v = d + (f - m) / 2;
    k.forEach((w, g) => {
      u.set(w.id, { x: d + p * s, y: v + g * (r + i) });
    }), x.forEach((w, g) => {
      const I = Math.floor(g / 2), M = g % 2 === 0 ? I : a - 1 - I;
      u.set(w.id, { x: d + p * s, y: d + M * (r + i) });
    });
  }
  return {
    positions: u,
    width: d * 2 + c * s + o,
    height: d * 2 + f
  };
}
const Hn = (e) => `${e.source} ${e.target}`;
function Yn(e, t, n = {}) {
  const o = n.nodeWidth ?? ne.nodeWidth, r = n.nodeHeight ?? ne.nodeHeight, s = n.hint ?? ne.hint;
  e.classList.add("dd-flow-embed", "dd-flow-graph-mount"), le(e, n.style ?? "host");
  const i = t.nodes.map((w) => {
    var g;
    return (g = w.rows) != null && g.length ? St(w.rows) : r;
  }), d = Math.max(r, ...i), { positions: l } = Gn(t.nodes, t.edges, {
    nodeWidth: o,
    nodeHeight: d,
    layerGap: n.layerGap ?? ne.layerGap,
    rowGap: n.rowGap ?? ne.rowGap,
    margin: ne.margin
  }), a = t.nodes.map((w, g) => {
    var O;
    const I = l.get(w.id), M = !!((O = w.rows) != null && O.length), j = M ? Nt(w.label ?? w.id, w.rows, o) : o, T = M ? i[g] : r;
    return {
      id: w.id,
      label: w.label ?? w.id,
      type: M ? "compound" : "process",
      note: w.note,
      rows: w.rows,
      x: I.x + j / 2,
      y: I.y + d / 2,
      w: j,
      h: T
    };
  }), c = t.edges.filter((w) => l.has(w.source) && l.has(w.target)).map((w) => ({
    id: Hn(w),
    from: w.source,
    to: w.target,
    routing: "bezier",
    stroke: w.flagged ? "dashed" : "solid",
    kind: w.flagged ? "conditional" : "default",
    points: []
  })), f = qe(a, c, { rowEdges: t.rowEdges });
  e.appendChild(f);
  const h = document.createElement("div");
  if (h.className = "dd-flow-graph-tooltip", e.appendChild(h), s) {
    const w = document.createElement("div");
    w.className = "dd-flow-graph-hint", w.textContent = s, e.appendChild(w);
  }
  const u = new Map(t.nodes.map((w) => [w.id, w])), p = (w) => {
    var T, O;
    const g = (O = (T = w.target) == null ? void 0 : T.closest) == null ? void 0 : O.call(T, ".dd-flow-node"), I = g == null ? void 0 : g.getAttribute("data-node-id"), M = I ? u.get(I) : void 0;
    if (!M) {
      h.style.display = "none";
      return;
    }
    h.textContent = M.note ? `${M.label ?? M.id} · ${M.note}` : M.label ?? M.id, h.style.display = "block";
    const j = e.getBoundingClientRect();
    h.style.left = `${w.clientX - j.left + 14}px`, h.style.top = `${w.clientY - j.top + 14}px`;
  }, y = () => {
    h.style.display = "none";
  };
  e.addEventListener("pointermove", p), e.addEventListener("pointerleave", y);
  const k = n.id ?? t.id ?? "", x = (w) => {
    var T, O;
    const g = (O = (T = w.target) == null ? void 0 : T.closest) == null ? void 0 : O.call(T, ".dd-flow-node-row"), I = g == null ? void 0 : g.closest(".dd-flow-node"), M = I == null ? void 0 : I.getAttribute("data-node-id"), j = g == null ? void 0 : g.getAttribute("data-row-id");
    !M || !j || K(e, W.rowClick, {
      flowId: k,
      nodeId: M,
      rowId: j,
      shiftKey: w.shiftKey
    });
  };
  e.addEventListener("click", x);
  let m = Tt(e, f, { maxFitScale: 1 }), v = Cn(e, c, {
    flowId: k,
    rowEdges: t.rowEdges
  });
  return {
    destroy() {
      e.removeEventListener("pointermove", p), e.removeEventListener("pointerleave", y), e.removeEventListener("click", x), v == null || v.destroy(), v = null, m == null || m.destroy(), m = null, e.innerHTML = "", e.classList.remove("dd-flow-graph-mount");
    }
  };
}
const Vn = ".dd-flow-graph:not([data-dd-flow-mounted])";
async function zn(e = document) {
  const t = Array.from(e.querySelectorAll(Vn));
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
        Yn(n, r, { style: n.getAttribute("data-style") ?? void 0, hint: s ?? void 0 });
      } catch (r) {
        console.error("dd-flow: failed to mount graph", r), n.textContent = "dd-flow: failed to mount graph (see console)";
      }
    })
  );
}
function qn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Un = "\0", Z = "\0", ot = "";
let Wn = class {
  constructor(t) {
    B(this, "_isDirected", !0);
    B(this, "_isMultigraph", !1);
    B(this, "_isCompound", !1);
    // Label for the graph itself
    B(this, "_label");
    // Defaults to be set when creating a new node
    B(this, "_defaultNodeLabelFn", () => {
    });
    // Defaults to be set when creating a new edge
    B(this, "_defaultEdgeLabelFn", () => {
    });
    // v -> label
    B(this, "_nodes", {});
    // v -> edgeObj
    B(this, "_in", {});
    // u -> v -> Number
    B(this, "_preds", {});
    // v -> edgeObj
    B(this, "_out", {});
    // v -> w -> Number
    B(this, "_sucs", {});
    // e -> edgeObj
    B(this, "_edgeObjs", {});
    // e -> label
    B(this, "_edgeLabels", {});
    /* Number of nodes in the graph. Should only be changed by the implementation. */
    B(this, "_nodeCount", 0);
    /* Number of edges in the graph. Should only be changed by the implementation. */
    B(this, "_edgeCount", 0);
    B(this, "_parent");
    B(this, "_children");
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
    var d = ie(this._isDirected, t, n, o);
    if (Object.hasOwn(this._edgeLabels, d))
      return s && (this._edgeLabels[d] = r), this;
    if (o !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[d] = s ? r : this._defaultEdgeLabelFn(t, n, o);
    var l = Kn(this._isDirected, t, n, o);
    return t = l.v, n = l.w, Object.freeze(l), this._edgeObjs[d] = l, rt(this._preds[n], t), rt(this._sucs[t], n), this._in[n][d] = l, this._out[t][d] = l, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, o) {
    var r = arguments.length === 1 ? Oe(this._isDirected, arguments[0]) : ie(this._isDirected, t, n, o);
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
    var r = arguments.length === 1 ? Oe(this._isDirected, arguments[0]) : ie(this._isDirected, t, n, o);
    return Object.hasOwn(this._edgeLabels, r);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, o) {
    var r = arguments.length === 1 ? Oe(this._isDirected, arguments[0]) : ie(this._isDirected, t, n, o), s = this._edgeObjs[r];
    return s && (t = s.v, n = s.w, delete this._edgeLabels[r], delete this._edgeObjs[r], st(this._preds[n], t), st(this._sucs[t], n), delete this._in[n][r], delete this._out[t][r], this._edgeCount--), this;
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
function rt(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function st(e, t) {
  --e[t] || delete e[t];
}
function ie(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  return r + ot + s + ot + (o === void 0 ? Un : o);
}
function Kn(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  var d = { v: r, w: s };
  return o && (d.name = o), d;
}
function Oe(e, t) {
  return ie(e, t.v, t.w, t.name);
}
var Ue = Wn, Xn = "2.2.4", Jn = {
  Graph: Ue,
  version: Xn
}, Qn = Ue, Zn = {
  write: eo,
  read: oo
};
function eo(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: to(e),
    edges: no(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function to(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), o = e.parent(t), r = { v: t };
    return n !== void 0 && (r.value = n), o !== void 0 && (r.parent = o), r;
  });
}
function no(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), o = { v: t.v, w: t.w };
    return t.name !== void 0 && (o.name = t.name), n !== void 0 && (o.value = n), o;
  });
}
function oo(e) {
  var t = new Qn(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var ro = so;
function so(e) {
  var t = {}, n = [], o;
  function r(s) {
    Object.hasOwn(t, s) || (t[s] = !0, o.push(s), e.successors(s).forEach(r), e.predecessors(s).forEach(r));
  }
  return e.nodes().forEach(function(s) {
    o = [], r(s), o.length && n.push(o);
  }), n;
}
let io = class {
  constructor() {
    B(this, "_arr", []);
    B(this, "_keyIndices", {});
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
var Rt = io, ao = Rt, At = co, lo = () => 1;
function co(e, t, n, o) {
  return fo(
    e,
    String(t),
    n || lo,
    o || function(r) {
      return e.outEdges(r);
    }
  );
}
function fo(e, t, n, o) {
  var r = {}, s = new ao(), i, d, l = function(a) {
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
var uo = At, ho = po;
function po(e, t, n) {
  return e.nodes().reduce(function(o, r) {
    return o[r] = uo(e, r, t, n), o;
  }, {});
}
var Pt = wo;
function wo(e) {
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
var mo = Pt, go = bo;
function bo(e) {
  return mo(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var yo = Eo, vo = () => 1;
function Eo(e, t, n) {
  return xo(
    e,
    t || vo,
    n || function(o) {
      return e.outEdges(o);
    }
  );
}
function xo(e, t, n) {
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
function Bt(e) {
  var t = {}, n = {}, o = [];
  function r(s) {
    if (Object.hasOwn(n, s))
      throw new Ge();
    Object.hasOwn(t, s) || (n[s] = !0, t[s] = !0, e.predecessors(s).forEach(r), delete n[s], o.push(s));
  }
  if (e.sinks().forEach(r), Object.keys(t).length !== e.nodeCount())
    throw new Ge();
  return o;
}
class Ge extends Error {
  constructor() {
    super(...arguments);
  }
}
var Dt = Bt;
Bt.CycleException = Ge;
var it = Dt, ko = Co;
function Co(e) {
  try {
    it(e);
  } catch (t) {
    if (t instanceof it.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var Ft = _o;
function _o(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var o = e.isDirected() ? (d) => e.successors(d) : (d) => e.neighbors(d), r = n === "post" ? Lo : So, s = [], i = {};
  return t.forEach((d) => {
    if (!e.hasNode(d))
      throw new Error("Graph does not have node: " + d);
    r(d, o, i, s);
  }), s;
}
function Lo(e, t, n, o) {
  for (var r = [[e, !1]]; r.length > 0; ) {
    var s = r.pop();
    s[1] ? o.push(s[0]) : Object.hasOwn(n, s[0]) || (n[s[0]] = !0, r.push([s[0], !0]), Gt(t(s[0]), (i) => r.push([i, !1])));
  }
}
function So(e, t, n, o) {
  for (var r = [e]; r.length > 0; ) {
    var s = r.pop();
    Object.hasOwn(n, s) || (n[s] = !0, o.push(s), Gt(t(s), (i) => r.push(i)));
  }
}
function Gt(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var No = Ft, Io = Oo;
function Oo(e, t) {
  return No(e, t, "post");
}
var $o = Ft, Mo = jo;
function jo(e, t) {
  return $o(e, t, "pre");
}
var To = Ue, Ro = Rt, Ao = Po;
function Po(e, t) {
  var n = new To(), o = {}, r = new Ro(), s;
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
var Bo = {
  components: ro,
  dijkstra: At,
  dijkstraAll: ho,
  findCycles: go,
  floydWarshall: yo,
  isAcyclic: ko,
  postorder: Io,
  preorder: Mo,
  prim: Ao,
  tarjan: Pt,
  topsort: Dt
}, dt = Jn, q = {
  Graph: dt.Graph,
  json: Zn,
  alg: Bo,
  version: dt.version
};
let Do = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return at(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && at(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, o = n._prev;
    for (; o !== n; )
      t.push(JSON.stringify(o, Fo)), o = o._prev;
    return "[" + t.join(", ") + "]";
  }
};
function at(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function Fo(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var Go = Do;
let Ho = q.Graph, Yo = Go;
var Vo = qo;
let zo = () => 1;
function qo(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = Wo(e, t || zo);
  return Uo(n.graph, n.buckets, n.zeroIdx).flatMap((r) => e.outEdges(r.v, r.w));
}
function Uo(e, t, n) {
  let o = [], r = t[t.length - 1], s = t[0], i;
  for (; e.nodeCount(); ) {
    for (; i = s.dequeue(); )
      $e(e, t, n, i);
    for (; i = r.dequeue(); )
      $e(e, t, n, i);
    if (e.nodeCount()) {
      for (let d = t.length - 2; d > 0; --d)
        if (i = t[d].dequeue(), i) {
          o = o.concat($e(e, t, n, i, !0));
          break;
        }
    }
  }
  return o;
}
function $e(e, t, n, o, r) {
  let s = r ? [] : void 0;
  return e.inEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = e.node(i.v);
    r && s.push({ v: i.v, w: i.w }), l.out -= d, He(t, n, l);
  }), e.outEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = i.w, a = e.node(l);
    a.in -= d, He(t, n, a);
  }), e.removeNode(o.v), s;
}
function Wo(e, t) {
  let n = new Ho(), o = 0, r = 0;
  e.nodes().forEach((d) => {
    n.setNode(d, { v: d, in: 0, out: 0 });
  }), e.edges().forEach((d) => {
    let l = n.edge(d.v, d.w) || 0, a = t(d), c = l + a;
    n.setEdge(d.v, d.w, c), r = Math.max(r, n.node(d.v).out += a), o = Math.max(o, n.node(d.w).in += a);
  });
  let s = Ko(r + o + 3).map(() => new Yo()), i = o + 1;
  return n.nodes().forEach((d) => {
    He(s, i, n.node(d));
  }), { graph: n, buckets: s, zeroIdx: i };
}
function He(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function Ko(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let Ht = q.Graph;
var D = {
  addBorderNode: rr,
  addDummyNode: Yt,
  applyWithChunking: Le,
  asNonCompoundGraph: Jo,
  buildLayerMatrix: tr,
  intersectRect: er,
  mapValues: fr,
  maxRank: zt,
  normalizeRanks: nr,
  notime: ar,
  partition: ir,
  pick: cr,
  predecessorWeights: Zo,
  range: Ut,
  removeEmptyRanks: or,
  simplify: Xo,
  successorWeights: Qo,
  time: dr,
  uniqueId: qt,
  zipObject: We
};
function Yt(e, t, n, o) {
  for (var r = o; e.hasNode(r); )
    r = qt(o);
  return n.dummy = t, e.setNode(r, n), r;
}
function Xo(e) {
  let t = new Ht().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let o = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, r = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: o.weight + r.weight,
      minlen: Math.max(o.minlen, r.minlen)
    });
  }), t;
}
function Jo(e) {
  let t = new Ht({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function Qo(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.outEdges(n).forEach((r) => {
      o[r.w] = (o[r.w] || 0) + e.edge(r).weight;
    }), o;
  });
  return We(e.nodes(), t);
}
function Zo(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.inEdges(n).forEach((r) => {
      o[r.v] = (o[r.v] || 0) + e.edge(r).weight;
    }), o;
  });
  return We(e.nodes(), t);
}
function er(e, t) {
  let n = e.x, o = e.y, r = t.x - n, s = t.y - o, i = e.width / 2, d = e.height / 2;
  if (!r && !s)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let l, a;
  return Math.abs(s) * i > Math.abs(r) * d ? (s < 0 && (d = -d), l = d * r / s, a = d) : (r < 0 && (i = -i), l = i, a = i * s / r), { x: n + l, y: o + a };
}
function tr(e) {
  let t = Ut(zt(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let o = e.node(n), r = o.rank;
    r !== void 0 && (t[r][o.order] = n);
  }), t;
}
function nr(e) {
  let t = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MAX_VALUE : r;
  }), n = Le(Math.min, t);
  e.nodes().forEach((o) => {
    let r = e.node(o);
    Object.hasOwn(r, "rank") && (r.rank -= n);
  });
}
function or(e) {
  let t = e.nodes().map((i) => e.node(i).rank), n = Le(Math.min, t), o = [];
  e.nodes().forEach((i) => {
    let d = e.node(i).rank - n;
    o[d] || (o[d] = []), o[d].push(i);
  });
  let r = 0, s = e.graph().nodeRankFactor;
  Array.from(o).forEach((i, d) => {
    i === void 0 && d % s !== 0 ? --r : i !== void 0 && r && i.forEach((l) => e.node(l).rank += r);
  });
}
function rr(e, t, n, o) {
  let r = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (r.rank = n, r.order = o), Yt(e, "border", r, t);
}
function sr(e, t = Vt) {
  const n = [];
  for (let o = 0; o < e.length; o += t) {
    const r = e.slice(o, o + t);
    n.push(r);
  }
  return n;
}
const Vt = 65535;
function Le(e, t) {
  if (t.length > Vt) {
    const n = sr(t);
    return e.apply(null, n.map((o) => e.apply(null, o)));
  } else
    return e.apply(null, t);
}
function zt(e) {
  const n = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MIN_VALUE : r;
  });
  return Le(Math.max, n);
}
function ir(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((o) => {
    t(o) ? n.lhs.push(o) : n.rhs.push(o);
  }), n;
}
function dr(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function ar(e, t) {
  return t();
}
let lr = 0;
function qt(e) {
  var t = ++lr;
  return e + ("" + t);
}
function Ut(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let o = (s) => s < t;
  n < 0 && (o = (s) => t < s);
  const r = [];
  for (let s = e; o(s); s += n)
    r.push(s);
  return r;
}
function cr(e, t) {
  const n = {};
  for (const o of t)
    e[o] !== void 0 && (n[o] = e[o]);
  return n;
}
function fr(e, t) {
  let n = t;
  return typeof t == "string" && (n = (o) => o[t]), Object.entries(e).reduce((o, [r, s]) => (o[r] = n(s, r), o), {});
}
function We(e, t) {
  return e.reduce((n, o, r) => (n[o] = t[r], n), {});
}
let ur = Vo, hr = D.uniqueId;
var pr = {
  run: wr,
  undo: gr
};
function wr(e) {
  (e.graph().acyclicer === "greedy" ? ur(e, n(e)) : mr(e)).forEach((o) => {
    let r = e.edge(o);
    e.removeEdge(o), r.forwardName = o.name, r.reversed = !0, e.setEdge(o.w, o.v, r, hr("rev"));
  });
  function n(o) {
    return (r) => o.edge(r).weight;
  }
}
function mr(e) {
  let t = [], n = {}, o = {};
  function r(s) {
    Object.hasOwn(o, s) || (o[s] = !0, n[s] = !0, e.outEdges(s).forEach((i) => {
      Object.hasOwn(n, i.w) ? t.push(i) : r(i.w);
    }), delete n[s]);
  }
  return e.nodes().forEach(r), t;
}
function gr(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let o = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, o);
    }
  });
}
let br = D;
var yr = {
  run: vr,
  undo: xr
};
function vr(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => Er(e, t));
}
function Er(e, t) {
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
    }, a = br.addDummyNode(e, "edge", c, "_d"), o === l && (c.width = d.width, c.height = d.height, c.dummy = "edge-label", c.labelpos = d.labelpos), e.setEdge(n, a, { weight: d.weight }, i), f === 0 && e.graph().dummyChains.push(a), n = a;
  e.setEdge(n, r, { weight: d.weight }, i);
}
function xr(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), o = n.edgeLabel, r;
    for (e.setEdge(n.edgeObj, o); n.dummy; )
      r = e.successors(t)[0], e.removeNode(t), o.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (o.x = n.x, o.y = n.y, o.width = n.width, o.height = n.height), t = r, n = e.node(t);
  });
}
const { applyWithChunking: kr } = D;
var Se = {
  longestPath: Cr,
  slack: _r
};
function Cr(e) {
  var t = {};
  function n(o) {
    var r = e.node(o);
    if (Object.hasOwn(t, o))
      return r.rank;
    t[o] = !0;
    let s = e.outEdges(o).map((d) => d == null ? Number.POSITIVE_INFINITY : n(d.w) - e.edge(d).minlen);
    var i = kr(Math.min, s);
    return i === Number.POSITIVE_INFINITY && (i = 0), r.rank = i;
  }
  e.sources().forEach(n);
}
function _r(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var Lr = q.Graph, ke = Se.slack, Wt = Sr;
function Sr(e) {
  var t = new Lr({ directed: !1 }), n = e.nodes()[0], o = e.nodeCount();
  t.setNode(n, {});
  for (var r, s; Nr(t, e) < o; )
    r = Ir(t, e), s = t.hasNode(r.v) ? ke(e, r) : -ke(e, r), Or(t, e, s);
  return t;
}
function Nr(e, t) {
  function n(o) {
    t.nodeEdges(o).forEach((r) => {
      var s = r.v, i = o === s ? r.w : s;
      !e.hasNode(i) && !ke(t, r) && (e.setNode(i, {}), e.setEdge(o, i, {}), n(i));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function Ir(e, t) {
  return t.edges().reduce((o, r) => {
    let s = Number.POSITIVE_INFINITY;
    return e.hasNode(r.v) !== e.hasNode(r.w) && (s = ke(t, r)), s < o[0] ? [s, r] : o;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Or(e, t, n) {
  e.nodes().forEach((o) => t.node(o).rank += n);
}
var $r = Wt, lt = Se.slack, Mr = Se.longestPath, jr = q.alg.preorder, Tr = q.alg.postorder, Rr = D.simplify, Ar = ee;
ee.initLowLimValues = Xe;
ee.initCutValues = Ke;
ee.calcCutValue = Kt;
ee.leaveEdge = Jt;
ee.enterEdge = Qt;
ee.exchangeEdges = Zt;
function ee(e) {
  e = Rr(e), Mr(e);
  var t = $r(e);
  Xe(t), Ke(t, e);
  for (var n, o; n = Jt(t); )
    o = Qt(t, e, n), Zt(t, e, n, o);
}
function Ke(e, t) {
  var n = Tr(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((o) => Pr(e, t, o));
}
function Pr(e, t, n) {
  var o = e.node(n), r = o.parent;
  e.edge(n, r).cutvalue = Kt(e, t, n);
}
function Kt(e, t, n) {
  var o = e.node(n), r = o.parent, s = !0, i = t.edge(n, r), d = 0;
  return i || (s = !1, i = t.edge(r, n)), d = i.weight, t.nodeEdges(n).forEach((l) => {
    var a = l.v === n, c = a ? l.w : l.v;
    if (c !== r) {
      var f = a === s, h = t.edge(l).weight;
      if (d += f ? h : -h, Dr(e, n, c)) {
        var u = e.edge(n, c).cutvalue;
        d += f ? -u : u;
      }
    }
  }), d;
}
function Xe(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), Xt(e, {}, 1, t);
}
function Xt(e, t, n, o, r) {
  var s = n, i = e.node(o);
  return t[o] = !0, e.neighbors(o).forEach((d) => {
    Object.hasOwn(t, d) || (n = Xt(e, t, n, d, o));
  }), i.low = s, i.lim = n++, r ? i.parent = r : delete i.parent, n;
}
function Jt(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function Qt(e, t, n) {
  var o = n.v, r = n.w;
  t.hasEdge(o, r) || (o = n.w, r = n.v);
  var s = e.node(o), i = e.node(r), d = s, l = !1;
  s.lim > i.lim && (d = i, l = !0);
  var a = t.edges().filter((c) => l === ct(e, e.node(c.v), d) && l !== ct(e, e.node(c.w), d));
  return a.reduce((c, f) => lt(t, f) < lt(t, c) ? f : c);
}
function Zt(e, t, n, o) {
  var r = n.v, s = n.w;
  e.removeEdge(r, s), e.setEdge(o.v, o.w, {}), Xe(e), Ke(e, t), Br(e, t);
}
function Br(e, t) {
  var n = e.nodes().find((r) => !t.node(r).parent), o = jr(e, n);
  o = o.slice(1), o.forEach((r) => {
    var s = e.node(r).parent, i = t.edge(r, s), d = !1;
    i || (i = t.edge(s, r), d = !0), t.node(r).rank = t.node(s).rank + (d ? i.minlen : -i.minlen);
  });
}
function Dr(e, t, n) {
  return e.hasEdge(t, n);
}
function ct(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var Fr = Se, en = Fr.longestPath, Gr = Wt, Hr = Ar, Yr = Vr;
function Vr(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      ft(e);
      break;
    case "tight-tree":
      qr(e);
      break;
    case "longest-path":
      zr(e);
      break;
    case "none":
      break;
    default:
      ft(e);
  }
}
var zr = en;
function qr(e) {
  en(e), Gr(e);
}
function ft(e) {
  Hr(e);
}
var Ur = Wr;
function Wr(e) {
  let t = Xr(e);
  e.graph().dummyChains.forEach((n) => {
    let o = e.node(n), r = o.edgeObj, s = Kr(e, t, r.v, r.w), i = s.path, d = s.lca, l = 0, a = i[l], c = !0;
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
function Kr(e, t, n, o) {
  let r = [], s = [], i = Math.min(t[n].low, t[o].low), d = Math.max(t[n].lim, t[o].lim), l, a;
  l = n;
  do
    l = e.parent(l), r.push(l);
  while (l && (t[l].low > i || d > t[l].lim));
  for (a = l, l = o; (l = e.parent(l)) !== a; )
    s.push(l);
  return { path: r.concat(s.reverse()), lca: a };
}
function Xr(e) {
  let t = {}, n = 0;
  function o(r) {
    let s = n;
    e.children(r).forEach(o), t[r] = { low: s, lim: n++ };
  }
  return e.children().forEach(o), t;
}
let Ce = D;
var Jr = {
  run: Qr,
  cleanup: ts
};
function Qr(e) {
  let t = Ce.addDummyNode(e, "root", {}, "_root"), n = Zr(e), o = Object.values(n), r = Ce.applyWithChunking(Math.max, o) - 1, s = 2 * r + 1;
  e.graph().nestingRoot = t, e.edges().forEach((d) => e.edge(d).minlen *= s);
  let i = es(e) + 1;
  e.children().forEach((d) => tn(e, t, s, i, r, n, d)), e.graph().nodeRankFactor = s;
}
function tn(e, t, n, o, r, s, i) {
  let d = e.children(i);
  if (!d.length) {
    i !== t && e.setEdge(t, i, { weight: 0, minlen: n });
    return;
  }
  let l = Ce.addBorderNode(e, "_bt"), a = Ce.addBorderNode(e, "_bb"), c = e.node(i);
  e.setParent(l, i), c.borderTop = l, e.setParent(a, i), c.borderBottom = a, d.forEach((f) => {
    tn(e, t, n, o, r, s, f);
    let h = e.node(f), u = h.borderTop ? h.borderTop : f, p = h.borderBottom ? h.borderBottom : f, y = h.borderTop ? o : 2 * o, k = u !== p ? 1 : r - s[i] + 1;
    e.setEdge(l, u, {
      weight: y,
      minlen: k,
      nestingEdge: !0
    }), e.setEdge(p, a, {
      weight: y,
      minlen: k,
      nestingEdge: !0
    });
  }), e.parent(i) || e.setEdge(t, l, { weight: 0, minlen: r + s[i] });
}
function Zr(e) {
  var t = {};
  function n(o, r) {
    var s = e.children(o);
    s && s.length && s.forEach((i) => n(i, r + 1)), t[o] = r;
  }
  return e.children().forEach((o) => n(o, 1)), t;
}
function es(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function ts(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var o = e.edge(n);
    o.nestingEdge && e.removeEdge(n);
  });
}
let ns = D;
var os = rs;
function rs(e) {
  function t(n) {
    let o = e.children(n), r = e.node(n);
    if (o.length && o.forEach(t), Object.hasOwn(r, "minRank")) {
      r.borderLeft = [], r.borderRight = [];
      for (let s = r.minRank, i = r.maxRank + 1; s < i; ++s)
        ut(e, "borderLeft", "_bl", n, r, s), ut(e, "borderRight", "_br", n, r, s);
    }
  }
  e.children().forEach(t);
}
function ut(e, t, n, o, r, s) {
  let i = { width: 0, height: 0, rank: s, borderType: t }, d = r[t][s - 1], l = ns.addDummyNode(e, "border", i, n);
  r[t][s] = l, e.setParent(l, o), d && e.setEdge(d, l, { weight: 1 });
}
var ss = {
  adjust: is,
  undo: ds
};
function is(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && nn(e);
}
function ds(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && as(e), (t === "lr" || t === "rl") && (ls(e), nn(e));
}
function nn(e) {
  e.nodes().forEach((t) => ht(e.node(t))), e.edges().forEach((t) => ht(e.edge(t)));
}
function ht(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function as(e) {
  e.nodes().forEach((t) => Me(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Me), Object.hasOwn(n, "y") && Me(n);
  });
}
function Me(e) {
  e.y = -e.y;
}
function ls(e) {
  e.nodes().forEach((t) => je(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(je), Object.hasOwn(n, "x") && je(n);
  });
}
function je(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let pt = D;
var cs = fs;
function fs(e) {
  let t = {}, n = e.nodes().filter((l) => !e.children(l).length), o = n.map((l) => e.node(l).rank), r = pt.applyWithChunking(Math.max, o), s = pt.range(r + 1).map(() => []);
  function i(l) {
    if (t[l]) return;
    t[l] = !0;
    let a = e.node(l);
    s[a.rank].push(l), e.successors(l).forEach(i);
  }
  return n.sort((l, a) => e.node(l).rank - e.node(a).rank).forEach(i), s;
}
let us = D.zipObject;
var hs = ps;
function ps(e, t) {
  let n = 0;
  for (let o = 1; o < t.length; ++o)
    n += ws(e, t[o - 1], t[o]);
  return n;
}
function ws(e, t, n) {
  let o = us(n, n.map((a, c) => c)), r = t.flatMap((a) => e.outEdges(a).map((c) => ({ pos: o[c.w], weight: e.edge(c).weight })).sort((c, f) => c.pos - f.pos)), s = 1;
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
var ms = gs;
function gs(e, t = []) {
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
let bs = D;
var ys = vs;
function vs(e, t) {
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
  return Es(o);
}
function Es(e) {
  let t = [];
  function n(r) {
    return (s) => {
      s.merged || (s.barycenter === void 0 || r.barycenter === void 0 || s.barycenter >= r.barycenter) && xs(r, s);
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
  return t.filter((r) => !r.merged).map((r) => bs.pick(r, ["vs", "i", "barycenter", "weight"]));
}
function xs(e, t) {
  let n = 0, o = 0;
  e.weight && (n += e.barycenter * e.weight, o += e.weight), t.weight && (n += t.barycenter * t.weight, o += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / o, e.weight = o, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let ks = D;
var Cs = _s;
function _s(e, t) {
  let n = ks.partition(e, (c) => Object.hasOwn(c, "barycenter")), o = n.lhs, r = n.rhs.sort((c, f) => f.i - c.i), s = [], i = 0, d = 0, l = 0;
  o.sort(Ls(!!t)), l = wt(s, r, l), o.forEach((c) => {
    l += c.vs.length, s.push(c.vs), i += c.barycenter * c.weight, d += c.weight, l = wt(s, r, l);
  });
  let a = { vs: s.flat(!0) };
  return d && (a.barycenter = i / d, a.weight = d), a;
}
function wt(e, t, n) {
  let o;
  for (; t.length && (o = t[t.length - 1]).i <= n; )
    t.pop(), e.push(o.vs), n++;
  return n;
}
function Ls(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let Ss = ms, Ns = ys, Is = Cs;
var Os = on;
function on(e, t, n, o) {
  let r = e.children(t), s = e.node(t), i = s ? s.borderLeft : void 0, d = s ? s.borderRight : void 0, l = {};
  i && (r = r.filter((h) => h !== i && h !== d));
  let a = Ss(e, r);
  a.forEach((h) => {
    if (e.children(h.v).length) {
      let u = on(e, h.v, n, o);
      l[h.v] = u, Object.hasOwn(u, "barycenter") && Ms(h, u);
    }
  });
  let c = Ns(a, n);
  $s(c, l);
  let f = Is(c, o);
  if (i && (f.vs = [i, f.vs, d].flat(!0), e.predecessors(i).length)) {
    let h = e.node(e.predecessors(i)[0]), u = e.node(e.predecessors(d)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + h.order + u.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function $s(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((o) => t[o] ? t[o].vs : o);
  });
}
function Ms(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let js = q.Graph, Ts = D;
var Rs = As;
function As(e, t, n, o) {
  o || (o = e.nodes());
  let r = Ps(e), s = new js({ compound: !0 }).setGraph({ root: r }).setDefaultNodeLabel((i) => e.node(i));
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
function Ps(e) {
  for (var t; e.hasNode(t = Ts.uniqueId("_root")); ) ;
  return t;
}
var Bs = Ds;
function Ds(e, t, n) {
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
let Fs = cs, Gs = hs, Hs = Os, Ys = Rs, Vs = Bs, zs = q.Graph, ye = D;
var qs = rn;
function rn(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, rn);
    return;
  }
  let n = ye.maxRank(e), o = mt(e, ye.range(1, n + 1), "inEdges"), r = mt(e, ye.range(n - 1, -1, -1), "outEdges"), s = Fs(e);
  if (gt(e, s), t && t.disableOptimalOrderHeuristic)
    return;
  let i = Number.POSITIVE_INFINITY, d;
  for (let l = 0, a = 0; a < 4; ++l, ++a) {
    Us(l % 2 ? o : r, l % 4 >= 2), s = ye.buildLayerMatrix(e);
    let c = Gs(e, s);
    c < i && (a = 0, d = Object.assign({}, s), i = c);
  }
  gt(e, d);
}
function mt(e, t, n) {
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
    return Ys(e, s, n, o.get(s) || []);
  });
}
function Us(e, t) {
  let n = new zs();
  e.forEach(function(o) {
    let r = o.graph().root, s = Hs(o, r, n, t);
    s.vs.forEach((i, d) => o.node(i).order = d), Vs(o, n, s.vs);
  });
}
function gt(e, t) {
  Object.values(t).forEach((n) => n.forEach((o, r) => e.node(o).order = r));
}
let Ws = q.Graph, X = D;
var Ks = {
  positionX: ii
};
function Xs(e, t) {
  let n = {};
  function o(r, s) {
    let i = 0, d = 0, l = r.length, a = s[s.length - 1];
    return s.forEach((c, f) => {
      let h = Qs(e, c), u = h ? e.node(h).order : l;
      (h || c === a) && (s.slice(d, f + 1).forEach((p) => {
        e.predecessors(p).forEach((y) => {
          let k = e.node(y), x = k.order;
          (x < i || u < x) && !(k.dummy && e.node(p).dummy) && sn(n, y, p);
        });
      }), d = f + 1, i = u);
    }), s;
  }
  return t.length && t.reduce(o), n;
}
function Js(e, t) {
  let n = {};
  function o(s, i, d, l, a) {
    let c;
    X.range(i, d).forEach((f) => {
      c = s[f], e.node(c).dummy && e.predecessors(c).forEach((h) => {
        let u = e.node(h);
        u.dummy && (u.order < l || u.order > a) && sn(n, h, c);
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
function Qs(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function sn(e, t, n) {
  if (t > n) {
    let r = t;
    t = n, n = r;
  }
  let o = e[t];
  o || (e[t] = o = {}), o[n] = !0;
}
function Zs(e, t, n) {
  if (t > n) {
    let o = t;
    t = n, n = o;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function ei(e, t, n, o) {
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
          s[a] === a && l < i[p] && !Zs(n, a, p) && (s[p] = a, s[a] = r[a] = r[p], l = i[p]);
        }
      }
    });
  }), { root: r, align: s };
}
function ti(e, t, n, o, r) {
  let s = {}, i = ni(e, t, n, r), d = r ? "borderLeft" : "borderRight";
  function l(f, h) {
    let u = i.nodes(), p = u.pop(), y = {};
    for (; p; )
      y[p] ? f(p) : (y[p] = !0, u.push(p), u = u.concat(h(p))), p = u.pop();
  }
  function a(f) {
    s[f] = i.inEdges(f).reduce((h, u) => Math.max(h, s[u.v] + i.edge(u)), 0);
  }
  function c(f) {
    let h = i.outEdges(f).reduce((p, y) => Math.min(p, s[y.w] - i.edge(y)), Number.POSITIVE_INFINITY), u = e.node(f);
    h !== Number.POSITIVE_INFINITY && u.borderType !== d && (s[f] = Math.max(s[f], h));
  }
  return l(a, i.predecessors.bind(i)), l(c, i.successors.bind(i)), Object.keys(o).forEach((f) => s[f] = s[n[f]]), s;
}
function ni(e, t, n, o) {
  let r = new Ws(), s = e.graph(), i = di(s.nodesep, s.edgesep, o);
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
function oi(e, t) {
  return Object.values(t).reduce((n, o) => {
    let r = Number.NEGATIVE_INFINITY, s = Number.POSITIVE_INFINITY;
    Object.entries(o).forEach(([d, l]) => {
      let a = ai(e, d) / 2;
      r = Math.max(l + a, r), s = Math.min(l - a, s);
    });
    const i = r - s;
    return i < n[0] && (n = [i, o]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function ri(e, t) {
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
function si(e, t) {
  return X.mapValues(e.ul, (n, o) => {
    if (t)
      return e[t.toLowerCase()][o];
    {
      let r = Object.values(e).map((s) => s[o]).sort((s, i) => s - i);
      return (r[1] + r[2]) / 2;
    }
  });
}
function ii(e) {
  let t = X.buildLayerMatrix(e), n = Object.assign(
    Xs(e, t),
    Js(e, t)
  ), o = {}, r;
  ["u", "d"].forEach((i) => {
    r = i === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((d) => {
      d === "r" && (r = r.map((f) => Object.values(f).reverse()));
      let l = (i === "u" ? e.predecessors : e.successors).bind(e), a = ei(e, r, n, l), c = ti(
        e,
        r,
        a.root,
        a.align,
        d === "r"
      );
      d === "r" && (c = X.mapValues(c, (f) => -f)), o[i + d] = c;
    });
  });
  let s = oi(e, o);
  return ri(o, s), si(o, e.graph().align);
}
function di(e, t, n) {
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
function ai(e, t) {
  return e.node(t).width;
}
let dn = D, li = Ks.positionX;
var ci = fi;
function fi(e) {
  e = dn.asNonCompoundGraph(e), ui(e), Object.entries(li(e)).forEach(([t, n]) => e.node(t).x = n);
}
function ui(e) {
  let t = dn.buildLayerMatrix(e), n = e.graph().ranksep, o = 0;
  t.forEach((r) => {
    const s = r.reduce((i, d) => {
      const l = e.node(d).height;
      return i > l ? i : l;
    }, 0);
    r.forEach((i) => e.node(i).y = o + s / 2), o += s + n;
  });
}
let bt = pr, yt = yr, hi = Yr, pi = D.normalizeRanks, wi = Ur, mi = D.removeEmptyRanks, vt = Jr, gi = os, Et = ss, bi = qs, yi = ci, Y = D, vi = q.Graph;
var Ei = xi;
function xi(e, t) {
  let n = t && t.debugTiming ? Y.time : Y.notime;
  n("layout", () => {
    let o = n("  buildLayoutGraph", () => Mi(e));
    n("  runLayout", () => ki(o, n, t)), n("  updateInputGraph", () => Ci(e, o));
  });
}
function ki(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => ji(e)), t("    removeSelfEdges", () => Hi(e)), t("    acyclic", () => bt.run(e)), t("    nestingGraph.run", () => vt.run(e)), t("    rank", () => hi(Y.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => Ti(e)), t("    removeEmptyRanks", () => mi(e)), t("    nestingGraph.cleanup", () => vt.cleanup(e)), t("    normalizeRanks", () => pi(e)), t("    assignRankMinMax", () => Ri(e)), t("    removeEdgeLabelProxies", () => Ai(e)), t("    normalize.run", () => yt.run(e)), t("    parentDummyChains", () => wi(e)), t("    addBorderSegments", () => gi(e)), t("    order", () => bi(e, n)), t("    insertSelfEdges", () => Yi(e)), t("    adjustCoordinateSystem", () => Et.adjust(e)), t("    position", () => yi(e)), t("    positionSelfEdges", () => Vi(e)), t("    removeBorderNodes", () => Gi(e)), t("    normalize.undo", () => yt.undo(e)), t("    fixupEdgeLabelCoords", () => Di(e)), t("    undoCoordinateSystem", () => Et.undo(e)), t("    translateGraph", () => Pi(e)), t("    assignNodeIntersects", () => Bi(e)), t("    reversePoints", () => Fi(e)), t("    acyclic.undo", () => bt.undo(e));
}
function Ci(e, t) {
  e.nodes().forEach((n) => {
    let o = e.node(n), r = t.node(n);
    o && (o.x = r.x, o.y = r.y, o.rank = r.rank, t.children(n).length && (o.width = r.width, o.height = r.height));
  }), e.edges().forEach((n) => {
    let o = e.edge(n), r = t.edge(n);
    o.points = r.points, Object.hasOwn(r, "x") && (o.x = r.x, o.y = r.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let _i = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], Li = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, Si = ["acyclicer", "ranker", "rankdir", "align"], Ni = ["width", "height", "rank"], xt = { width: 0, height: 0 }, Ii = ["minlen", "weight", "width", "height", "labeloffset"], Oi = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, $i = ["labelpos"];
function Mi(e) {
  let t = new vi({ multigraph: !0, compound: !0 }), n = Re(e.graph());
  return t.setGraph(Object.assign(
    {},
    Li,
    Te(n, _i),
    Y.pick(n, Si)
  )), e.nodes().forEach((o) => {
    let r = Re(e.node(o));
    const s = Te(r, Ni);
    Object.keys(xt).forEach((i) => {
      s[i] === void 0 && (s[i] = xt[i]);
    }), t.setNode(o, s), t.setParent(o, e.parent(o));
  }), e.edges().forEach((o) => {
    let r = Re(e.edge(o));
    t.setEdge(o, Object.assign(
      {},
      Oi,
      Te(r, Ii),
      Y.pick(r, $i)
    ));
  }), t;
}
function ji(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let o = e.edge(n);
    o.minlen *= 2, o.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? o.width += o.labeloffset : o.height += o.labeloffset);
  });
}
function Ti(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let o = e.node(t.v), s = { rank: (e.node(t.w).rank - o.rank) / 2 + o.rank, e: t };
      Y.addDummyNode(e, "edge-proxy", s, "_ep");
    }
  });
}
function Ri(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let o = e.node(n);
    o.borderTop && (o.minRank = e.node(o.borderTop).rank, o.maxRank = e.node(o.borderBottom).rank, t = Math.max(t, o.maxRank));
  }), e.graph().maxRank = t;
}
function Ai(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function Pi(e) {
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
function Bi(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), o = e.node(t.v), r = e.node(t.w), s, i;
    n.points ? (s = n.points[0], i = n.points[n.points.length - 1]) : (n.points = [], s = r, i = o), n.points.unshift(Y.intersectRect(o, s)), n.points.push(Y.intersectRect(r, i));
  });
}
function Di(e) {
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
function Fi(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function Gi(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), o = e.node(n.borderTop), r = e.node(n.borderBottom), s = e.node(n.borderLeft[n.borderLeft.length - 1]), i = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(i.x - s.x), n.height = Math.abs(r.y - o.y), n.x = s.x + n.width / 2, n.y = o.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function Hi(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function Yi(e) {
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
function Vi(e) {
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
function Te(e, t) {
  return Y.mapValues(Y.pick(e, t), Number);
}
function Re(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, o]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = o;
  }), t;
}
let zi = D, qi = q.Graph;
var Ui = {
  debugOrdering: Wi
};
function Wi(e) {
  let t = zi.buildLayerMatrix(e), n = new qi({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((o) => {
    n.setNode(o, { label: o }), n.setParent(o, "layer" + e.node(o).rank);
  }), e.edges().forEach((o) => n.setEdge(o.v, o.w, {}, o.name)), t.forEach((o, r) => {
    let s = "layer" + r;
    n.setNode(s, { rank: "same" }), o.reduce((i, d) => (n.setEdge(i, d, { style: "invis" }), d));
  }), n;
}
var Ki = "1.1.8", Xi = {
  graphlib: q,
  layout: Ei,
  debug: Ui,
  util: {
    time: D.time,
    notime: D.notime
  },
  version: Ki
};
const kt = /* @__PURE__ */ qn(Xi);
function Ct(e, t) {
  const n = Je[e.type] ?? Je.process;
  if (e.type === "compound") {
    const s = (t == null ? void 0 : t.w) ?? e.w ?? Nt(e.label, e.rows, n.w), i = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, St(e.rows));
    return { w: s, h: i };
  }
  const o = (t == null ? void 0 : t.w) ?? e.w ?? n.w, r = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, kn(e.type, e.label, o));
  return { w: o, h: r };
}
function Ye(e, t) {
  const n = new kt.graphlib.Graph({ multigraph: !0 });
  n.setGraph({ rankdir: e.direction ?? "TB", nodesep: 50, ranksep: 60, marginx: 20, marginy: 20 }), n.setDefaultEdgeLabel(() => ({}));
  for (const a of e.nodes) {
    const { w: c, h: f } = Ct(a, t == null ? void 0 : t.nodes[a.id]);
    n.setNode(a.id, { width: c, height: f });
  }
  for (const a of e.edges)
    n.setEdge(a.from, a.to, {}, a.id);
  kt.layout(n);
  const o = e.nodes.map((a) => {
    const c = t == null ? void 0 : t.nodes[a.id], { w: f, h } = Ct(a, c), u = n.node(a.id);
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
function Ae(e, t) {
  const n = { nodes: {}, edges: {} };
  for (const o of e) n.nodes[o.id] = { x: o.x, y: o.y, w: o.w, h: o.h };
  for (const o of t) n.edges[o.id] = { points: o.points };
  return n;
}
const kd = () => ({ nodes: {}, edges: {} }), Ji = [
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
function Qi(e) {
  const t = document.createElement("div");
  t.className = "dd-flow-inspector", t.hidden = !0, e.appendChild(t);
  let n = !1;
  function o(u) {
    const y = t.offsetWidth || 260, k = t.offsetHeight || 200;
    let x = u.right + 12;
    x + y > window.innerWidth && (x = u.left - 12 - y), x < 12 && (x = Math.min(u.left, window.innerWidth - y - 12)), x = Math.max(12, Math.min(x, window.innerWidth - y - 12));
    let m = u.top;
    return m = Math.max(12, Math.min(m, window.innerHeight - k - 12)), { left: x, top: m };
  }
  function r(u) {
    const { left: p, top: y } = o(u);
    t.style.left = `${p}px`, t.style.top = `${y}px`;
  }
  function s(u, p) {
    const y = document.createElement("div");
    y.className = "dd-flow-inspector-field";
    const k = document.createElement("label");
    return k.textContent = u, y.appendChild(k), y.appendChild(p), y;
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
    t.innerHTML = "", t.appendChild(d());
    const y = document.createElement("input");
    y.type = "text", y.value = u.label, y.addEventListener("input", () => p.onLabelChange(y.value)), t.appendChild(s("Label", y));
    const k = document.createElement("textarea");
    k.rows = 2, k.value = u.note ?? "", k.addEventListener("input", () => p.onNoteChange(k.value)), t.appendChild(s("Note", k));
    const x = document.createElement("div");
    x.className = "dd-flow-type-grid";
    for (const m of Ji) {
      const v = document.createElement("button");
      v.type = "button", v.className = `dd-flow-type-swatch${m === u.type ? " is-active" : ""}`, v.title = m, v.setAttribute("aria-label", m);
      const w = N("svg", { viewBox: "-32 -22 64 44", width: 48, height: 33 });
      w.appendChild(It(m, 56, 36)), v.appendChild(w), v.addEventListener("click", () => p.onTypeChange(m)), x.appendChild(v);
    }
    if (t.appendChild(s("Type", x)), u.subflow) {
      const m = document.createElement("div");
      m.className = "dd-flow-inspector-subflow-row";
      const v = document.createElement("span");
      if (v.textContent = `Opens subflow: ${u.subflow}`, m.appendChild(v), p.onGotoSubflow) {
        const w = document.createElement("button");
        w.type = "button", w.className = "dd-flow-btn", w.textContent = "Open", w.addEventListener("click", p.onGotoSubflow), m.appendChild(w);
      }
      t.appendChild(m);
    }
    t.appendChild(i(p.onDelete));
  }
  function a(u, p, y, k) {
    const x = document.createElement("div");
    x.className = "dd-flow-inspector-radios";
    for (const m of p) {
      const v = `dd-flow-${u}-${m}`, w = document.createElement("input");
      w.type = "radio", w.name = `dd-flow-${u}`, w.id = v, w.checked = m === y, w.addEventListener("change", () => k(m));
      const g = document.createElement("label");
      g.htmlFor = v, g.textContent = m, x.appendChild(w), x.appendChild(g);
    }
    return x;
  }
  function c(u, p) {
    t.innerHTML = "", t.appendChild(d());
    const y = document.createElement("input");
    y.type = "text", y.value = u.label ?? "", y.addEventListener("input", () => p.onLabelChange(y.value)), t.appendChild(s("Label", y));
    const { routing: k, stroke: x, kind: m } = Fe(u);
    t.appendChild(
      s(
        "Routing",
        a("routing", ["orthogonal", "straight", "curved"], k, p.onRoutingChange)
      )
    ), t.appendChild(
      s("Stroke", a("stroke", ["solid", "dashed", "dotted"], x, p.onStrokeChange))
    ), t.appendChild(
      s("Kind", a("kind", ["default", "conditional"], m, p.onKindChange))
    );
    const v = document.createElement("p");
    v.className = "dd-flow-inspector-hint", v.textContent = "Changing routing clears any hand-dragged route for this connector.", t.appendChild(v), t.appendChild(i(p.onDelete));
  }
  function f(u, p, y) {
    t.innerHTML = "", t.appendChild(d());
    const k = document.createElement("p");
    k.className = "dd-flow-inspector-hint", k.textContent = u, t.appendChild(k);
    const x = document.createElement("input");
    x.type = "text", x.value = p;
    const m = () => {
      const I = x.value.trim();
      I && y(I), h();
    };
    x.addEventListener("keydown", (I) => {
      I.key === "Enter" && m();
    }), t.appendChild(s("Name", x));
    const v = document.createElement("div");
    v.className = "dd-flow-inspector-actions";
    const w = document.createElement("button");
    w.type = "button", w.className = "dd-flow-btn", w.textContent = "Cancel", w.addEventListener("click", h);
    const g = document.createElement("button");
    g.type = "button", g.className = "dd-flow-btn is-active", g.textContent = "Create", g.addEventListener("click", m), v.appendChild(w), v.appendChild(g), t.appendChild(v), requestAnimationFrame(() => {
      x.focus(), x.select();
    });
  }
  function h() {
    n = !1, t.hidden = !0, t.innerHTML = "";
  }
  return {
    get isOpen() {
      return n;
    },
    showNode(u, p, y, k) {
      if (l(u, y), t.hidden = !1, n = !0, r(p), k != null && k.focusLabel) {
        const x = t.querySelector('input[type="text"]');
        x == null || x.focus(), x == null || x.select();
      }
    },
    showEdge(u, p, y) {
      c(u, y), t.hidden = !1, n = !0, r(p);
    },
    showPrompt(u, p, y, k) {
      f(u, y, k), t.hidden = !1, n = !0, r(p);
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
const Zi = 4;
function ed(e, t, n, o = {}) {
  let r = null;
  const s = (c, f, h) => {
    const u = c.createSVGPoint();
    u.x = f, u.y = h;
    const p = c.getScreenCTM();
    if (!p) return { x: f, y: h };
    const y = u.matrixTransform(p.inverse());
    return { x: y.x, y: y.y };
  }, i = () => e.querySelector("svg.dd-flow-svg"), d = (c) => {
    var m, v, w, g, I;
    const f = i();
    if (!f) return;
    const h = c.target, u = s(f, c.clientX, c.clientY), p = (m = h.closest) == null ? void 0 : m.call(h, ".dd-flow-node");
    if (p) {
      const M = p.getAttribute("data-node-id"), j = t.nodes.find((A) => A.id === M);
      if (!j) return;
      const T = (v = h.closest) == null ? void 0 : v.call(h, ".dd-flow-node-row"), O = (T == null ? void 0 : T.getAttribute("data-row-id")) ?? null;
      r = {
        node: j,
        edgeId: null,
        rowId: O,
        startX: u.x,
        startY: u.y,
        nodeStartX: j.x,
        nodeStartY: j.y,
        moved: !1,
        shiftKey: c.shiftKey
      }, (w = e.setPointerCapture) == null || w.call(e, c.pointerId);
      return;
    }
    const y = (g = h.closest) == null ? void 0 : g.call(h, ".dd-flow-edge-hit"), k = y == null ? void 0 : y.closest(".dd-flow-edge");
    r = {
      node: null,
      edgeId: (k == null ? void 0 : k.getAttribute("data-edge-id")) ?? null,
      rowId: null,
      startX: u.x,
      startY: u.y,
      nodeStartX: 0,
      nodeStartY: 0,
      moved: !1,
      shiftKey: c.shiftKey
    }, (I = e.setPointerCapture) == null || I.call(e, c.pointerId);
  }, l = (c) => {
    if (!r || !r.node) return;
    const f = i();
    if (!f) return;
    const h = s(f, c.clientX, c.clientY), u = h.x - r.startX, p = h.y - r.startY;
    e.classList.contains("dd-flow-editing") && (!r.moved && Math.hypot(u, p) < Zi || (r.moved = !0, r.node.x = r.nodeStartX + u, r.node.y = r.nodeStartY + p, n()));
  }, a = () => {
    var x, m, v, w, g;
    if (!r) return;
    const { node: c, edgeId: f, rowId: h, moved: u, shiftKey: p, startX: y, startY: k } = r;
    r = null, c ? u ? (x = o.onNodeMoved) == null || x.call(o, c.id) : h ? (m = o.onRowClick) == null || m.call(o, c.id, h, { shiftKey: p }) : (v = o.onNodeClick) == null || v.call(o, c.id, { shiftKey: p }) : f ? (w = o.onEdgeClick) == null || w.call(o, f, { shiftKey: p }) : e.dataset[se] || (g = o.onBackgroundClick) == null || g.call(o, { x: y, y: k }, { shiftKey: p });
  };
  return e.addEventListener("pointerdown", d), e.addEventListener("pointermove", l), e.addEventListener("pointerup", a), e.addEventListener("pointercancel", a), {
    destroy() {
      e.removeEventListener("pointerdown", d), e.removeEventListener("pointermove", l), e.removeEventListener("pointerup", a), e.removeEventListener("pointercancel", a);
    }
  };
}
function td(e, t) {
  return { ...e, nodes: [...e.nodes, t] };
}
function nd(e, t) {
  return {
    ...e,
    nodes: e.nodes.filter((n) => n.id !== t),
    edges: e.edges.filter((n) => n.from !== t && n.to !== t)
  };
}
function od(e, t) {
  return { ...e, edges: e.edges.filter((n) => n.id !== t) };
}
function Pe(e, t, n) {
  return { ...e, nodes: e.nodes.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function ve(e, t, n) {
  return { ...e, edges: e.edges.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function Be(e, t, n) {
  const o = t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || e;
  if (!n.has(o)) return o;
  let r = 2;
  for (; n.has(`${o}-${r}`); ) r++;
  return `${o}-${r}`;
}
function rd(e) {
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
  const c = new Set(t.nodes.map((O) => O.id));
  if (c.has(i) && !a.has(i))
    throw new Error(`extractSubflow: placeholder id "${i}" collides with an existing node.`);
  for (const O of a)
    if (!c.has(O)) throw new Error(`extractSubflow: selected node "${O}" not found in spec.`);
  const f = [], h = [], u = [], p = [];
  for (const O of t.edges) {
    const A = a.has(O.from), F = a.has(O.to);
    A && F ? f.push(O) : !A && F ? h.push(O) : A && !F ? u.push(O) : p.push(O);
  }
  const y = {
    id: s,
    title: d,
    style: t.style,
    direction: t.direction,
    nodes: t.nodes.filter((O) => a.has(O.id)),
    edges: f
  }, k = {
    id: i,
    label: d,
    type: "subprocess",
    subflow: s
  }, x = h.map((O) => ({ ...O, to: i })), m = u.map((O) => ({ ...O, from: i })), v = {
    ...t,
    nodes: [...t.nodes.filter((O) => !a.has(O.id)), k],
    edges: [...p, ...x, ...m]
  }, w = new Set(r), g = new Set(f.map((O) => O.id)), I = new Set([...x, ...m].map((O) => O.id)), M = {};
  for (const [O, A] of Object.entries(n.nodes))
    w.has(O) || (M[O] = A);
  const j = {};
  for (const [O, A] of Object.entries(n.edges))
    !g.has(O) && !I.has(O) && (j[O] = A);
  const T = sd(r, o);
  return T && (M[i] = T), {
    parent: { spec: v, layout: { nodes: M, edges: j } },
    subflow: { spec: y }
  };
}
function sd(e, t) {
  const n = e.map((s) => t[s]).filter((s) => !!s);
  if (!n.length) return null;
  const o = n.reduce((s, i) => s + i.x, 0) / n.length, r = n.reduce((s, i) => s + i.y, 0) / n.length;
  return { x: o, y: r };
}
const an = "http://127.0.0.1:5311";
let _t = !1;
function id() {
  return _t ? Promise.resolve(!0) : fetch(`${an}/health`).then((e) => (e.ok && (_t = !0), e.ok)).catch(() => !1);
}
async function dd(e, t, n) {
  const r = { layoutPath: e.layout ?? e.spec.replace(/\.flow\.json$/, ".layout.json"), layout: n };
  t && (r.specPath = e.spec, r.spec = t);
  try {
    return (await fetch(`${an}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(r)
    })).ok;
  } catch {
    return !1;
  }
}
let J = null;
function Ve(e, t, n) {
  const { nodes: o, edges: r, orphanedNodeIds: s, orphanedEdgeIds: i } = Ye(t, n);
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
function ad(e, t, n = {}) {
  e.classList.add("dd-flow-embed", "dd-flow-inline"), le(e, t.main.style);
  const o = Ve(t.main.id, t.main, t.mainLayout), r = qe(o.nodes, o.edges);
  e.appendChild(r);
  const s = () => gd(t, n);
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
const ld = ".dd-flow-embed[data-flow]:not([data-dd-flow-mounted])";
async function cd(e = document) {
  const t = Array.from(e.querySelectorAll(ld));
  await Promise.all(
    t.map(async (n) => {
      n.setAttribute("data-dd-flow-mounted", "1");
      const o = n.getAttribute("data-flow");
      if (o)
        try {
          const r = await fetch(o);
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          const s = await r.json();
          ad(n, s);
        } catch (r) {
          console.error(`dd-flow: failed to load flow from "${o}"`, r), n.textContent = `dd-flow: failed to load "${o}" (see console)`;
        }
    })
  );
}
let G = null;
const fd = 3;
function ud() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
function hd(e) {
  var o, r;
  if (!ud()) return;
  const t = e.webkitRequestFullscreen, n = ((o = e.requestFullscreen) == null ? void 0 : o.bind(e)) ?? (t == null ? void 0 : t.bind(e));
  (r = n == null ? void 0 : n()) == null || r.catch(() => {
  });
}
function pd(e) {
  document.fullscreenElement === e && document.exitFullscreen().catch(() => {
  });
}
function wd() {
  if (G) return G;
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
  `, document.body.appendChild(e), G = {
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
    inspector: Qi(e)
  }, e.addEventListener("click", (o) => {
    o.target === e && Ee();
  }), e.querySelector(".dd-flow-close-btn").addEventListener("click", Ee);
  const t = e.querySelector(".dd-flow-menu-btn"), n = e.querySelector(".dd-flow-toolbar");
  return t.addEventListener("click", () => {
    n.hidden = !n.hidden, t.setAttribute("aria-expanded", String(!n.hidden)), t.classList.toggle("is-active", !n.hidden);
  }), document.addEventListener("keydown", (o) => {
    !e.hidden && o.key === "Escape" && (G != null && G.inspector.isOpen ? G.inspector.hide() : Ee());
  }), document.addEventListener("fullscreenchange", () => {
    !document.fullscreenElement && G && !G.root.hidden && Ee();
  }), G;
}
function Ee() {
  G && (pd(G.root), G.root.hidden = !0, G.stage.innerHTML = "", G.inspector.hide(), document.body.classList.remove("dd-flow-lightbox-open"), J = null);
}
function md(e) {
  const t = Math.min(...e.map((s) => s.left)), n = Math.min(...e.map((s) => s.top)), o = Math.max(...e.map((s) => s.right)), r = Math.max(...e.map((s) => s.bottom));
  return new DOMRect(t, n, o - t, r - n);
}
function gd(e, t) {
  var Q, me;
  const n = wd();
  n.root.hidden = !1, document.body.classList.add("dd-flow-lightbox-open"), hd(n.root), n.toolbar.hidden = !0, n.menuBtn.setAttribute("aria-expanded", "false"), n.menuBtn.classList.remove("is-active"), n.authoringEl.hidden = !0;
  const o = [Ve(e.main.id, e.main, e.mainLayout)];
  let r = !1, s = /* @__PURE__ */ new Set(), i = null, d = null, l = !1, a = !1;
  function c() {
    a || !e.sources || id().then((b) => {
      !b || n.root.hidden || (a = !0, n.authoringEl.hidden = !1, A(), n.addShapeBtn.disabled = !r);
    });
  }
  c(), n.stage.innerHTML = "";
  const f = document.createElement("div");
  f.className = "dd-flow-stage-inner", n.stage.appendChild(f), le(n.root, e.main.style);
  const h = { nodes: o[0].nodes, edges: o[0].edges };
  function u() {
    return o[o.length - 1];
  }
  function p() {
    h.nodes = u().nodes, h.edges = u().edges;
  }
  function y(b) {
    return Array.from(f.querySelectorAll(".dd-flow-node")).find(
      (E) => E.getAttribute("data-node-id") === b
    ) ?? null;
  }
  function k(b) {
    return Array.from(f.querySelectorAll(".dd-flow-edge")).find(
      (E) => E.getAttribute("data-edge-id") === b
    ) ?? null;
  }
  function x(b, E = {}) {
    const C = u(), $ = Ae(C.nodes, C.edges);
    if (E.resizeNodeId) {
      const R = $.nodes[E.resizeNodeId];
      R && ($.nodes[E.resizeNodeId] = { x: R.x, y: R.y });
    }
    E.clearEdgePoints && delete $.edges[E.clearEdgePoints], E.setNodePosition && ($.nodes[E.setNodePosition.id] = E.setNodePosition.point), C.spec = b(C.spec);
    const _ = Ye(C.spec, $);
    C.nodes = _.nodes, C.edges = _.edges, C.orphanedNodeIds = _.orphanedNodeIds, C.orphanedEdgeIds = _.orphanedEdgeIds, C.dirty = !0, C.specDirty = !0, p(), n.saveBtn.disabled = !1, T();
  }
  function m(b) {
    var $;
    const E = u().spec.nodes.find((_) => _.id === b), C = E == null ? void 0 : E.subflow;
    return {
      onLabelChange: (_) => {
        x((V) => Pe(V, b, { label: _ }), { resizeNodeId: b });
        const R = y(b);
        R && n.inspector.refreshAnchor(R.getBoundingClientRect());
      },
      onNoteChange: (_) => x((R) => Pe(R, b, { note: _ })),
      onTypeChange: (_) => {
        x((R) => Pe(R, b, { type: _ }), { resizeNodeId: b }), w();
      },
      onDelete: () => {
        x((R) => nd(R, b));
        const _ = new Set(s);
        _.delete(b), g(_, null);
      },
      onGotoSubflow: C && (($ = e.subflows) != null && $[C]) ? () => I(C) : void 0
    };
  }
  function v(b) {
    return {
      onLabelChange: (E) => x((C) => ve(C, b, { label: E })),
      onRoutingChange: (E) => x((C) => ve(C, b, { routing: E }), { clearEdgePoints: b }),
      onStrokeChange: (E) => x((C) => ve(C, b, { stroke: E })),
      onKindChange: (E) => x((C) => ve(C, b, { kind: E })),
      onDelete: () => {
        x((E) => od(E, b)), g(/* @__PURE__ */ new Set(), null);
      }
    };
  }
  function w(b = {}) {
    if (!r || !a) {
      n.inspector.hide();
      return;
    }
    if (s.size === 1 && !i) {
      const E = [...s][0], C = u().spec.nodes.find((_) => _.id === E), $ = y(E);
      if (C && $) {
        n.inspector.showNode(C, $.getBoundingClientRect(), m(E), b);
        return;
      }
    }
    if (i) {
      const E = u().spec.edges.find(($) => $.id === i), C = k(i);
      if (E && C) {
        n.inspector.showEdge(E, C.getBoundingClientRect(), v(i));
        return;
      }
    }
    n.inspector.hide();
  }
  function g(b, E, C = {}) {
    s = b, i = E, d = C.rowKey ?? null, A(), T(), w({ focusLabel: C.focusLabel }), K(f, W.selectionChange, {
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
  function I(b) {
    var $;
    const E = ($ = e.subflows) == null ? void 0 : $[b];
    if (!E) return;
    const C = u().flowId;
    o.push(Ve(b, E.spec, E.layout)), p(), le(n.root, E.spec.style ?? e.main.style), F(), g(/* @__PURE__ */ new Set(), null), K(f, W.subflowOpen, { flowId: C, subflowId: b });
  }
  const M = ed(f, h, T, {
    onNodeClick: (b, E) => {
      var $;
      const C = u().nodes.find((_) => _.id === b);
      if (C) {
        if (K(f, W.nodeClick, {
          flowId: u().flowId,
          nodeId: b,
          shiftKey: E.shiftKey
        }), r) {
          let _;
          E.shiftKey ? (_ = new Set(s), _.has(b) ? _.delete(b) : _.add(b)) : _ = s.size === 1 && s.has(b) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([b]), g(_, null);
          return;
        }
        C.subflow && (($ = e.subflows) != null && $[C.subflow]) && I(C.subflow);
      }
    },
    onNodeMoved: (b) => {
      g(/* @__PURE__ */ new Set([b]), null), u().dirty = !0, n.saveBtn.disabled = !1;
    },
    onRowClick: (b, E, C) => {
      if (K(f, W.rowClick, {
        flowId: u().flowId,
        nodeId: b,
        rowId: E,
        shiftKey: C.shiftKey
      }), !r) return;
      const $ = (d == null ? void 0 : d.nodeId) === b && (d == null ? void 0 : d.rowId) === E;
      g(/* @__PURE__ */ new Set(), null, { rowKey: $ ? null : { nodeId: b, rowId: E } });
    },
    onEdgeClick: (b, E) => {
      K(f, W.edgeClick, {
        flowId: u().flowId,
        edgeId: b,
        shiftKey: E.shiftKey
      }), r && g(/* @__PURE__ */ new Set(), i === b ? null : b);
    },
    onBackgroundClick: (b, E) => {
      if (K(f, W.backgroundClick, {
        flowId: u().flowId,
        point: b,
        shiftKey: E.shiftKey
      }), !!r) {
        if (l) {
          const C = new Set(u().spec.nodes.map((_) => _.id)), $ = Be("step", "New step", C);
          x((_) => td(_, { id: $, label: "New step", type: "process" }), {
            setNodePosition: { id: $, point: b }
          }), l = !1, f.classList.remove("dd-flow-placing"), n.addShapeBtn.classList.remove("is-active"), g(/* @__PURE__ */ new Set([$]), null, { focusLabel: !0 });
          return;
        }
        g(/* @__PURE__ */ new Set(), null);
      }
    }
  });
  let j = null;
  function T() {
    const b = u(), E = qe(b.nodes, b.edges, { selectedNodeIds: s, selectedEdgeId: i, selectedRowKey: d }), C = f.querySelector("svg.dd-flow-svg");
    C ? f.replaceChild(E, C) : f.appendChild(E);
    const $ = j == null ? void 0 : j.state();
    j == null || j.destroy(), j = Tt(f, E, { maxFitScale: fd, initial: $ });
  }
  function O() {
    j == null || j.reset();
  }
  function A() {
    const b = s.size;
    n.makeSubflowBtn.disabled = !r || !a || b < 2, n.makeSubflowBtn.textContent = b >= 2 ? `Make subflow (${b})` : "Make subflow";
  }
  function F() {
    n.breadcrumbEl.innerHTML = "", n.breadcrumbEl.hidden = o.length < 2, o.forEach(($, _) => {
      if (_ > 0) {
        const V = document.createElement("span");
        V.className = "dd-flow-breadcrumb-sep", V.textContent = "›", n.breadcrumbEl.appendChild(V);
      }
      const R = document.createElement(_ === o.length - 1 ? "span" : "button");
      R.className = "dd-flow-breadcrumb-item", R.textContent = $.title, _ !== o.length - 1 && (R.type = "button", R.addEventListener("click", () => {
        o.length = _ + 1, p(), le(n.root, u().spec.style ?? e.main.style), F(), g(/* @__PURE__ */ new Set(), null);
      })), n.breadcrumbEl.appendChild(R);
    }), n.saveBtn.disabled = !(u().dirty || u().specDirty), n.editBtn.textContent = r ? "Done editing" : "Edit layout", n.editBtn.classList.toggle("is-active", r), n.addShapeBtn.disabled = !r || !a;
    const { orphanedNodeIds: b, orphanedEdgeIds: E } = u(), C = b.length + E.length;
    if (C > 0) {
      const $ = [...b, ...E].join(", ");
      n.warningBanner.textContent = `⚠ The saved layout has ${C} position(s) that no longer match this flow (${$}) — they were dropped. This usually means the flow was regenerated with different node/edge ids.`, n.warningBanner.hidden = !1;
    } else
      n.warningBanner.hidden = !0;
  }
  const ce = () => {
    r = !r, f.classList.toggle("dd-flow-editing", r), n.editBtn.textContent = r ? "Done editing" : "Edit layout", n.editBtn.classList.toggle("is-active", r), r && c(), n.addShapeBtn.disabled = !r || !a, r ? (A(), T(), w()) : (l = !1, f.classList.remove("dd-flow-placing"), n.addShapeBtn.classList.remove("is-active"), g(/* @__PURE__ */ new Set(), null));
  }, fe = () => {
    !r || !a || (l = !l, f.classList.toggle("dd-flow-placing", l), n.addShapeBtn.classList.toggle("is-active", l));
  }, ue = () => {
    if (!r || !a || s.size < 2) return;
    const b = [...s], E = b.map(($) => y($)).filter(($) => $ !== null);
    if (!E.length) return;
    const C = md(E.map(($) => $.getBoundingClientRect()));
    n.inspector.showPrompt("Name the new subflow", C, "Subflow", ($) => {
      const _ = u(), R = new Set(Object.keys(e.subflows ?? {})), V = new Set(_.spec.nodes.map((U) => U.id)), te = Be("subflow", $, R), L = Be(te, $, V), S = {};
      for (const U of _.nodes) S[U.id] = { x: U.x, y: U.y };
      let P;
      try {
        P = rd({
          spec: _.spec,
          layout: Ae(_.nodes, _.edges),
          nodePositions: S,
          selectedNodeIds: b,
          newSubflowId: te,
          placeholderNodeId: L,
          placeholderLabel: $,
          existingSubflowIds: R
        });
      } catch (U) {
        console.error("dd-flow: could not extract subflow", U);
        return;
      }
      _.spec = P.parent.spec;
      const H = Ye(_.spec, P.parent.layout);
      _.nodes = H.nodes, _.edges = H.edges, _.orphanedNodeIds = H.orphanedNodeIds, _.orphanedEdgeIds = H.orphanedEdgeIds, _.dirty = !0, _.specDirty = !0, e.subflows || (e.subflows = {}), e.subflows[te] = { spec: P.subflow.spec, layout: void 0 }, p(), n.saveBtn.disabled = !1, F(), g(/* @__PURE__ */ new Set([L]), null);
    });
  }, he = async () => {
    var R;
    const b = u(), E = Ae(b.nodes, b.edges), C = b.specDirty, $ = t.onSaveLayout || t.onSaveSpec, _ = a ? (R = e.sources) == null ? void 0 : R[b.flowId] : void 0;
    if (!$ && _ && await dd(_, C ? b.spec : null, E)) {
      b.dirty = !1, b.specDirty = !1, n.saveBtn.disabled = !0;
      return;
    }
    t.onSaveLayout ? t.onSaveLayout(b.flowId, E) : fn(b.flowId, E), C && (t.onSaveSpec ? t.onSaveSpec(b.flowId, b.spec) : un(b.flowId, b.spec)), b.dirty = !1, b.specDirty = !1, n.saveBtn.disabled = !0;
  }, pe = () => {
    const b = f.querySelector("svg.dd-flow-svg");
    b && wn(b, f, `${u().flowId}.svg`);
  }, we = () => {
    const b = f.querySelector("svg.dd-flow-svg");
    b && mn(b, f, `${u().flowId}.png`);
  };
  n.editBtn.onclick = ce, n.addShapeBtn.onclick = fe, n.makeSubflowBtn.onclick = ue, n.saveBtn.onclick = he, n.fitBtn.onclick = O, n.root.querySelector(".dd-flow-export-svg-btn").onclick = pe, n.root.querySelector(".dd-flow-export-png-btn").onclick = we, r = !1, s = /* @__PURE__ */ new Set(), i = null, d = null, l = !1, f.classList.remove("dd-flow-editing", "dd-flow-placing"), F(), A(), T(), w(), (me = (Q = n.root._interactions) == null ? void 0 : Q.destroy) == null || me.call(Q), n.root._interactions = M;
}
if (typeof document < "u") {
  const e = () => {
    cd(), zn();
  }, t = globalThis.document$;
  t ? t.subscribe(e) : document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e();
}
export {
  W as DD_FLOW_EVENTS,
  Ie as DEFAULT_THEME,
  xe as THEMES,
  le as applyTheme,
  Cn as attachRelationHighlight,
  Tt as attachViewport,
  cd as autoMountFlows,
  zn as autoMountGraphs,
  Ze as buildGraphIndex,
  re as collectClosure,
  Ye as computeLayout,
  K as dispatchFlowEvent,
  _e as downloadBlob,
  fn as downloadLayout,
  mn as downloadPng,
  wn as downloadSvg,
  kd as emptyLayout,
  Gn as layoutLayered,
  ad as mountFlow,
  Yn as mountGraph,
  ge as paintRelations,
  Ne as paintRowRelations,
  yd as registerTheme,
  qe as renderSvg,
  Sn as routeEdge,
  Ae as toLayout
};
