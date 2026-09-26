var pn = Object.defineProperty;
var wn = (e, t, n) => t in e ? pn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var D = (e, t, n) => wn(e, typeof t != "symbol" ? t + "" : t, n);
const q = {
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
function z(e, t, n) {
  e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: !0, composed: !0 }));
}
function Ne(e, t) {
  const n = URL.createObjectURL(e), o = document.createElement("a");
  o.href = n, o.download = t, document.body.appendChild(o), o.click(), o.remove(), URL.revokeObjectURL(n);
}
function mn(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  Ne(new Blob([n], { type: "application/json" }), `${e}.layout.json`);
}
function gn(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  Ne(new Blob([n], { type: "application/json" }), `${e}.flow.json`);
}
const bn = /^var\((--dd-flow-[a-z-]+)\)$/;
function yn(e, t) {
  const n = e.cloneNode(!0), o = getComputedStyle(t), r = ["fill", "stroke"], s = (d) => {
    const l = d.match(bn);
    return l && o.getPropertyValue(l[1]).trim() || d;
  }, i = [n, ...Array.from(n.querySelectorAll("*"))];
  for (const d of i)
    for (const l of r) {
      const a = d.getAttribute(l);
      a && d.setAttribute(l, s(a));
    }
  return n;
}
function $t(e, t) {
  const n = yn(e, t);
  return n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), new XMLSerializer().serializeToString(n);
}
function vn(e, t, n) {
  const o = $t(e, t);
  Ne(new Blob([o], { type: "image/svg+xml;charset=utf-8" }), n);
}
function En(e, t, n, o = 2) {
  const r = $t(e, t), s = parseFloat(e.getAttribute("width") || "800"), i = parseFloat(e.getAttribute("height") || "600"), d = getComputedStyle(t).getPropertyValue("--dd-flow-canvas-bg").trim() || "#ffffff", l = new Blob([r], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(l), c = new Image();
  c.onload = () => {
    const f = document.createElement("canvas");
    f.width = s * o, f.height = i * o;
    const h = f.getContext("2d");
    if (!h) {
      URL.revokeObjectURL(a);
      return;
    }
    h.scale(o, o), h.fillStyle = d, h.fillRect(0, 0, s, i), h.drawImage(c, 0, 0, s, i), URL.revokeObjectURL(a), f.toBlob((u) => {
      u && Ne(u, n);
    }, "image/png");
  }, c.onerror = () => URL.revokeObjectURL(a), c.src = a;
}
const xn = "dd-flow-graph-fullscreen-open";
let tt = 0;
function kn(e, t, n = !0) {
  let o = !1;
  const r = n ? document.createElement("button") : null, s = () => {
    r && (r.textContent = o ? "✕" : "⤢", r.setAttribute("aria-label", o ? "Close fullscreen" : "Fullscreen"), r.setAttribute("aria-pressed", String(o)));
  }, i = (l) => {
    l !== o && (tt += l ? 1 : -1, document.body.classList.toggle(xn, tt > 0)), o = l, e.classList.toggle("dd-flow-graph-fullscreen", l), s(), t();
  }, d = (l) => {
    o && l.key === "Escape" && i(!1);
  };
  return document.addEventListener("keydown", d), r && (r.type = "button", r.className = "dd-flow-graph-expand", r.addEventListener("click", (l) => {
    l.stopPropagation(), i(!o);
  }), s(), e.appendChild(r)), {
    set: i,
    destroy() {
      o && i(!1), document.removeEventListener("keydown", d), r == null || r.remove();
    }
  };
}
const Cn = "http://www.w3.org/2000/svg";
function O(e, t = {}) {
  const n = document.createElementNS(Cn, e);
  for (const [o, r] of Object.entries(t)) n.setAttribute(o, String(r));
  return n;
}
const nt = {
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
}, oe = 24, de = 28, Ln = 8;
function Mt(e) {
  return de + ((e == null ? void 0 : e.length) ?? 0) * oe + Ln;
}
function Ie(e, t, n) {
  const o = [e, ...(t ?? []).map((s) => s.label)], r = Math.max(...o.map((s) => s.length));
  return Math.max(n, r * At + 40);
}
function U(e, t) {
  return `${e}::${t}`;
}
function Ke(e) {
  return `${U(e.sourceNode, e.sourceRow)}=>${U(e.targetNode, e.targetRow)}`;
}
function ot(e, t, n) {
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
function jt(e, t, n) {
  const { fill: o, stroke: r } = ae(e), s = { fill: o, stroke: r, "stroke-width": 2 };
  switch (e) {
    case "start":
    case "end": {
      const i = n / 2;
      return O("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: i, ry: i, ...s });
    }
    case "decision": {
      const i = [
        [0, -n / 2],
        [t / 2, 0],
        [0, n / 2],
        [-t / 2, 0]
      ].map((d) => d.join(",")).join(" ");
      return O("polygon", { points: i, ...s });
    }
    case "data": {
      const i = t * 0.15, d = [
        [-t / 2 + i, -n / 2],
        [t / 2, -n / 2],
        [t / 2 - i, n / 2],
        [-t / 2, n / 2]
      ].map((l) => l.join(",")).join(" ");
      return O("polygon", { points: d, ...s });
    }
    case "manual": {
      const i = t * 0.12, d = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [t / 2 - i, n / 2],
        [-t / 2 + i, n / 2]
      ].map((l) => l.join(",")).join(" ");
      return O("polygon", { points: d, ...s });
    }
    case "document": {
      const i = n * 0.12, d = [
        `M ${-t / 2} ${-n / 2}`,
        `L ${t / 2} ${-n / 2}`,
        `L ${t / 2} ${n / 2 - i}`,
        `C ${t / 4} ${n / 2 + i}, ${-t / 4} ${n / 2 - i * 2}, ${-t / 2} ${n / 2}`,
        "Z"
      ].join(" ");
      return O("path", { d, ...s });
    }
    case "multidocument": {
      const i = O("g", {}), d = n * 0.12, l = [
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
        i.appendChild(O("path", { d: f, ...s }));
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
      return O("polygon", { points: i, ...s });
    }
    case "database": {
      const i = n * 0.18, d = -n / 2, l = n / 2, a = O("g", {}), c = [
        `M ${-t / 2} ${d + i}`,
        `L ${-t / 2} ${l - i}`,
        `A ${t / 2} ${i} 0 0 0 ${t / 2} ${l - i}`,
        `L ${t / 2} ${d + i}`,
        "Z"
      ].join(" ");
      return a.appendChild(O("path", { d: c, ...s })), a.appendChild(O("ellipse", { cx: 0, cy: d + i, rx: t / 2, ry: i, ...s })), a;
    }
    case "delay": {
      const i = n / 2, d = [
        `M ${-t / 2} ${-n / 2}`,
        `L ${t / 2 - i} ${-n / 2}`,
        `A ${i} ${i} 0 0 1 ${t / 2 - i} ${n / 2}`,
        `L ${-t / 2} ${n / 2}`,
        "Z"
      ].join(" ");
      return O("path", { d, ...s });
    }
    case "on-page-reference":
      return O("circle", { cx: 0, cy: 0, r: Math.min(t, n) / 2, ...s });
    case "off-page-reference": {
      const i = n * 0.3, d = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [t / 2, n / 2 - i],
        [0, n / 2],
        [-t / 2, n / 2 - i]
      ].map((l) => l.join(",")).join(" ");
      return O("polygon", { points: d, ...s });
    }
    case "alternate-process": {
      const i = n * 0.35;
      return O("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: i, ry: i, ...s });
    }
    case "merge": {
      const i = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [0, n / 2]
      ].map((d) => d.join(",")).join(" ");
      return O("polygon", { points: i, ...s });
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
      return O("polygon", { points: d, ...s });
    }
    case "subprocess": {
      const i = O("g", {});
      i.appendChild(O("rect", { x: -t / 2, y: -n / 2, width: t, height: n, ...s }));
      const d = 10;
      return i.appendChild(
        O("line", {
          x1: -t / 2 + d,
          y1: -n / 2,
          x2: -t / 2 + d,
          y2: n / 2,
          stroke: ae(e).stroke,
          "stroke-width": 2
        })
      ), i.appendChild(
        O("line", {
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
      return O("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: 6, ry: 6, ...s });
  }
}
function _n(e, t) {
  const n = O("g", { transform: `translate(${e / 2 - 16}, ${t / 2 - 16})`, class: "dd-flow-subflow-badge" });
  n.appendChild(O("circle", { cx: 0, cy: 0, r: 10, fill: "var(--dd-flow-subprocess-stroke)" }));
  const o = O("path", {
    d: "M -4 3 L 3 -4 M -1 -4 L 3 -4 L 3 0",
    stroke: "#ffffff",
    "stroke-width": 1.6,
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });
  return n.appendChild(o), n;
}
function Sn(e, t) {
  const { text: n, stroke: o } = ae(e.type), r = O("g", { class: "dd-flow-node-body" }), s = -e.h / 2, i = (l) => O("line", { x1: -e.w / 2, x2: e.w / 2, y1: l, y2: l, stroke: o, "stroke-width": 1, opacity: 0.4 }), d = O("text", {
    x: 0,
    y: s + de / 2,
    fill: n,
    "text-anchor": "middle",
    "dominant-baseline": "central",
    class: "dd-flow-label"
  });
  return d.textContent = e.label, r.appendChild(d), r.appendChild(i(s + de)), (e.rows ?? []).forEach((l, a) => {
    const c = s + de + a * oe, f = O("g", {
      class: `dd-flow-node-row${l.id === t ? " is-row-selected" : ""}`,
      "data-row-id": l.id
    });
    f.appendChild(
      O("rect", { x: -e.w / 2, y: c, width: e.w, height: oe, fill: "transparent" })
    );
    const h = O("text", {
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
function Nn(e, t = {}) {
  var r;
  const n = [
    "dd-flow-node",
    `dd-flow-node-${e.type}`,
    t.selected && "is-selected",
    t.multiselected && "is-multiselected"
  ].filter(Boolean).join(" "), o = O("g", {
    class: n,
    "data-node-id": e.id,
    transform: `translate(${e.x}, ${e.y})`
  });
  if (o.appendChild(jt(e.type, e.w, e.h)), e.type === "compound" && ((r = e.rows) != null && r.length))
    o.appendChild(Sn(e, t.selectedRowId));
  else {
    const { text: s } = ae(e.type), i = O("text", {
      x: 0,
      y: 0,
      fill: s,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      class: "dd-flow-label"
    });
    In(i, e.label, e.w - 20), o.appendChild(i);
  }
  return e.subflow && o.appendChild(_n(e.w, e.h)), o;
}
const Ve = 16, At = 7.2;
function We(e, t) {
  const n = e.split(/\s+/), o = Math.max(4, Math.floor(t / At)), r = [];
  let s = "";
  for (const i of n) {
    const d = s ? `${s} ${i}` : i;
    d.length > o && s ? (r.push(s), s = i) : s = d;
  }
  return s && r.push(s), r;
}
function In(e, t, n) {
  const o = We(t, n), r = -((o.length - 1) * Ve) / 2;
  o.forEach((s, i) => {
    const d = O("tspan", { x: 0, y: r + i * Ve });
    d.textContent = s, e.appendChild(d);
  });
}
function Tt(e, t, n) {
  const r = n - (e === "start" || e === "end" ? n * 0.3 : 20);
  return We(t, Math.max(20, r)).length * Ve + 24;
}
function xe(e) {
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
const rt = ["is-focus", "is-upstream", "is-downstream", "is-dimmed"], st = ["is-row-focus", "is-row-upstream", "is-row-downstream", "is-row-dimmed"];
function Rt(e, t, n, o, r) {
  const s = new Set(n ? [...o, n] : []), i = new Set(n ? [...r, n] : []);
  for (const l of e.querySelectorAll(".dd-flow-node")) {
    if (l.classList.remove(...rt), !n) continue;
    const a = l.getAttribute("data-node-id") ?? "";
    a === n ? l.classList.add("is-focus") : o.has(a) ? l.classList.add("is-upstream") : r.has(a) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed");
  }
  const d = new Map(t.map((l) => [l.id, l]));
  for (const l of e.querySelectorAll(".dd-flow-edge")) {
    if (l.classList.remove(...rt), !n) continue;
    const a = d.get(l.getAttribute("data-edge-id") ?? "");
    a && (s.has(a.from) && s.has(a.to) ? l.classList.add("is-upstream") : i.has(a.from) && i.has(a.to) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed"));
  }
}
function ge(e, t, n, o) {
  const r = o ? ee(n.parentsOf, o) : /* @__PURE__ */ new Set(), s = o ? ee(n.childrenOf, o) : /* @__PURE__ */ new Set();
  Rt(e, t, o, r, s);
}
function Me(e, t, n, o) {
  var c;
  const r = o ? U(o.nodeId, o.rowId) : null, s = r ? ee(n.parentsOf, r) : /* @__PURE__ */ new Set(), i = r ? ee(n.childrenOf, r) : /* @__PURE__ */ new Set(), d = new Set(r ? [...s, r] : []), l = new Set(r ? [...i, r] : []);
  for (const f of e.querySelectorAll(".dd-flow-node-row")) {
    if (f.classList.remove(...st), !r) continue;
    const h = ((c = f.closest(".dd-flow-node")) == null ? void 0 : c.getAttribute("data-node-id")) ?? "", u = f.getAttribute("data-row-id") ?? "", p = U(h, u);
    p === r ? f.classList.add("is-row-focus") : s.has(p) ? f.classList.add("is-row-upstream") : i.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
  const a = new Map(t.map((f) => [Ke(f), f]));
  for (const f of e.querySelectorAll(".dd-flow-row-edge")) {
    if (f.classList.remove(...st), !r) continue;
    const h = a.get(f.getAttribute("data-row-edge-id") ?? "");
    if (!h) continue;
    const u = U(h.sourceNode, h.sourceRow), p = U(h.targetNode, h.targetRow);
    d.has(u) && d.has(p) ? f.classList.add("is-row-upstream") : l.has(u) && l.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
}
function On(e, t, n = {}) {
  const o = xe(t), r = n.flowId ?? "", s = n.rowEdges ?? [], i = xe(
    s.map((w) => ({
      id: Ke(w),
      from: U(w.sourceNode, w.sourceRow),
      to: U(w.targetNode, w.targetRow)
    }))
  ), d = /* @__PURE__ */ new Map();
  for (const w of s)
    d.set(U(w.sourceNode, w.sourceRow), w.sourceNode), d.set(U(w.targetNode, w.targetRow), w.targetNode);
  let l = null, a = null;
  const c = () => a ? `r:${a.nodeId}:${a.rowId}` : l ? `n:${l}` : "", f = () => z(e, q.selectionChange, {
    flowId: r,
    selectedNodeIds: a ? [a.nodeId] : l ? [l] : [],
    selectedEdgeId: null
  }), h = (w) => {
    var x;
    const y = (x = w == null ? void 0 : w.closest) == null ? void 0 : x.call(w, ".dd-flow-node");
    return (y == null ? void 0 : y.getAttribute("data-node-id")) ?? null;
  }, u = (w) => {
    var k, $;
    const y = (k = w == null ? void 0 : w.closest) == null ? void 0 : k.call(w, ".dd-flow-node-row"), x = ($ = y == null ? void 0 : y.closest(".dd-flow-node")) == null ? void 0 : $.getAttribute("data-node-id"), b = y == null ? void 0 : y.getAttribute("data-row-id");
    return x && b ? { nodeId: x, rowId: b } : null;
  }, p = () => {
    if (a) {
      const w = U(a.nodeId, a.rowId), y = ee(i.parentsOf, w), x = ee(i.childrenOf, w);
      Me(e, s, i, a);
      const b = new Set([...y].map(($) => d.get($) ?? $)), k = new Set([...x].map(($) => d.get($) ?? $));
      Rt(e, t, a.nodeId, b, k);
    } else
      ge(e, t, o, l), s.length && Me(e, s, i, null);
  }, g = (w) => {
    if (l || a) return;
    const y = h(w.target);
    y && ge(e, t, o, y);
  }, C = (w) => {
    var x, b;
    if (l || a) return;
    const y = (b = (x = w.relatedTarget) == null ? void 0 : x.closest) == null ? void 0 : b.call(x, ".dd-flow-node");
    y && y === w.target.closest(".dd-flow-node") || ge(e, t, o, null);
  }, E = (w) => {
    const y = h(w.target), x = s.length ? u(w.target) : null, b = c();
    x ? (a = (a == null ? void 0 : a.nodeId) === x.nodeId && (a == null ? void 0 : a.rowId) === x.rowId ? null : x, l = null) : (l = y && y !== l ? y : null, a = null), p(), y ? z(e, q.nodeClick, {
      flowId: r,
      nodeId: y,
      shiftKey: w.shiftKey
    }) : z(e, q.backgroundClick, {
      flowId: r,
      point: { x: w.clientX, y: w.clientY },
      shiftKey: w.shiftKey
    }), c() !== b && f();
  };
  return n.hover !== !1 && (e.addEventListener("pointerover", g), e.addEventListener("pointerout", C)), e.addEventListener("click", E), {
    setFocus(w) {
      const y = c();
      l = w, a = null, p(), c() !== y && f();
    },
    getFocus: () => l,
    setRowFocus(w) {
      const y = c();
      a = w, l = null, p(), c() !== y && f();
    },
    getRowFocus: () => a,
    destroy() {
      e.removeEventListener("pointerover", g), e.removeEventListener("pointerout", C), e.removeEventListener("click", E), ge(e, t, o, null), s.length && Me(e, s, i, null);
    }
  };
}
function $n(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Mn = "\0", Z = "\0", it = "";
let jn = class {
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
    var d = se(this._isDirected, t, n, o);
    if (Object.hasOwn(this._edgeLabels, d))
      return s && (this._edgeLabels[d] = r), this;
    if (o !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[d] = s ? r : this._defaultEdgeLabelFn(t, n, o);
    var l = An(this._isDirected, t, n, o);
    return t = l.v, n = l.w, Object.freeze(l), this._edgeObjs[d] = l, dt(this._preds[n], t), dt(this._sucs[t], n), this._in[n][d] = l, this._out[t][d] = l, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, o) {
    var r = arguments.length === 1 ? je(this._isDirected, arguments[0]) : se(this._isDirected, t, n, o);
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
    var r = arguments.length === 1 ? je(this._isDirected, arguments[0]) : se(this._isDirected, t, n, o);
    return Object.hasOwn(this._edgeLabels, r);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, o) {
    var r = arguments.length === 1 ? je(this._isDirected, arguments[0]) : se(this._isDirected, t, n, o), s = this._edgeObjs[r];
    return s && (t = s.v, n = s.w, delete this._edgeLabels[r], delete this._edgeObjs[r], at(this._preds[n], t), at(this._sucs[t], n), delete this._in[n][r], delete this._out[t][r], this._edgeCount--), this;
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
function dt(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function at(e, t) {
  --e[t] || delete e[t];
}
function se(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  return r + it + s + it + (o === void 0 ? Mn : o);
}
function An(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  var d = { v: r, w: s };
  return o && (d.name = o), d;
}
function je(e, t) {
  return se(e, t.v, t.w, t.name);
}
var Xe = jn, Tn = "2.2.4", Rn = {
  Graph: Xe,
  version: Tn
}, Pn = Xe, Bn = {
  write: Dn,
  read: Hn
};
function Dn(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: Fn(e),
    edges: Gn(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function Fn(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), o = e.parent(t), r = { v: t };
    return n !== void 0 && (r.value = n), o !== void 0 && (r.parent = o), r;
  });
}
function Gn(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), o = { v: t.v, w: t.w };
    return t.name !== void 0 && (o.name = t.name), n !== void 0 && (o.value = n), o;
  });
}
function Hn(e) {
  var t = new Pn(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var Vn = Yn;
function Yn(e) {
  var t = {}, n = [], o;
  function r(s) {
    Object.hasOwn(t, s) || (t[s] = !0, o.push(s), e.successors(s).forEach(r), e.predecessors(s).forEach(r));
  }
  return e.nodes().forEach(function(s) {
    o = [], r(s), o.length && n.push(o);
  }), n;
}
let qn = class {
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
var Pt = qn, zn = Pt, Bt = Kn, Un = () => 1;
function Kn(e, t, n, o) {
  return Wn(
    e,
    String(t),
    n || Un,
    o || function(r) {
      return e.outEdges(r);
    }
  );
}
function Wn(e, t, n, o) {
  var r = {}, s = new zn(), i, d, l = function(a) {
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
var Xn = Bt, Jn = Qn;
function Qn(e, t, n) {
  return e.nodes().reduce(function(o, r) {
    return o[r] = Xn(e, r, t, n), o;
  }, {});
}
var Dt = Zn;
function Zn(e) {
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
var eo = Dt, to = no;
function no(e) {
  return eo(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var oo = so, ro = () => 1;
function so(e, t, n) {
  return io(
    e,
    t || ro,
    n || function(o) {
      return e.outEdges(o);
    }
  );
}
function io(e, t, n) {
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
function Ft(e) {
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
var Gt = Ft;
Ft.CycleException = Ye;
var lt = Gt, ao = lo;
function lo(e) {
  try {
    lt(e);
  } catch (t) {
    if (t instanceof lt.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var Ht = co;
function co(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var o = e.isDirected() ? (d) => e.successors(d) : (d) => e.neighbors(d), r = n === "post" ? fo : uo, s = [], i = {};
  return t.forEach((d) => {
    if (!e.hasNode(d))
      throw new Error("Graph does not have node: " + d);
    r(d, o, i, s);
  }), s;
}
function fo(e, t, n, o) {
  for (var r = [[e, !1]]; r.length > 0; ) {
    var s = r.pop();
    s[1] ? o.push(s[0]) : Object.hasOwn(n, s[0]) || (n[s[0]] = !0, r.push([s[0], !0]), Vt(t(s[0]), (i) => r.push([i, !1])));
  }
}
function uo(e, t, n, o) {
  for (var r = [e]; r.length > 0; ) {
    var s = r.pop();
    Object.hasOwn(n, s) || (n[s] = !0, o.push(s), Vt(t(s), (i) => r.push(i)));
  }
}
function Vt(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var ho = Ht, po = wo;
function wo(e, t) {
  return ho(e, t, "post");
}
var mo = Ht, go = bo;
function bo(e, t) {
  return mo(e, t, "pre");
}
var yo = Xe, vo = Pt, Eo = xo;
function xo(e, t) {
  var n = new yo(), o = {}, r = new vo(), s;
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
var ko = {
  components: Vn,
  dijkstra: Bt,
  dijkstraAll: Jn,
  findCycles: to,
  floydWarshall: oo,
  isAcyclic: ao,
  postorder: po,
  preorder: go,
  prim: Eo,
  tarjan: Dt,
  topsort: Gt
}, ct = Rn, K = {
  Graph: ct.Graph,
  json: Bn,
  alg: ko,
  version: ct.version
};
let Co = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return ft(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && ft(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, o = n._prev;
    for (; o !== n; )
      t.push(JSON.stringify(o, Lo)), o = o._prev;
    return "[" + t.join(", ") + "]";
  }
};
function ft(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function Lo(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var _o = Co;
let So = K.Graph, No = _o;
var Io = $o;
let Oo = () => 1;
function $o(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = jo(e, t || Oo);
  return Mo(n.graph, n.buckets, n.zeroIdx).flatMap((r) => e.outEdges(r.v, r.w));
}
function Mo(e, t, n) {
  let o = [], r = t[t.length - 1], s = t[0], i;
  for (; e.nodeCount(); ) {
    for (; i = s.dequeue(); )
      Ae(e, t, n, i);
    for (; i = r.dequeue(); )
      Ae(e, t, n, i);
    if (e.nodeCount()) {
      for (let d = t.length - 2; d > 0; --d)
        if (i = t[d].dequeue(), i) {
          o = o.concat(Ae(e, t, n, i, !0));
          break;
        }
    }
  }
  return o;
}
function Ae(e, t, n, o, r) {
  let s = r ? [] : void 0;
  return e.inEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = e.node(i.v);
    r && s.push({ v: i.v, w: i.w }), l.out -= d, qe(t, n, l);
  }), e.outEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = i.w, a = e.node(l);
    a.in -= d, qe(t, n, a);
  }), e.removeNode(o.v), s;
}
function jo(e, t) {
  let n = new So(), o = 0, r = 0;
  e.nodes().forEach((d) => {
    n.setNode(d, { v: d, in: 0, out: 0 });
  }), e.edges().forEach((d) => {
    let l = n.edge(d.v, d.w) || 0, a = t(d), c = l + a;
    n.setEdge(d.v, d.w, c), r = Math.max(r, n.node(d.v).out += a), o = Math.max(o, n.node(d.w).in += a);
  });
  let s = Ao(r + o + 3).map(() => new No()), i = o + 1;
  return n.nodes().forEach((d) => {
    qe(s, i, n.node(d));
  }), { graph: n, buckets: s, zeroIdx: i };
}
function qe(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function Ao(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let Yt = K.Graph;
var F = {
  addBorderNode: Vo,
  addDummyNode: qt,
  applyWithChunking: Oe,
  asNonCompoundGraph: Ro,
  buildLayerMatrix: Fo,
  intersectRect: Do,
  mapValues: Xo,
  maxRank: Ut,
  normalizeRanks: Go,
  notime: Uo,
  partition: qo,
  pick: Wo,
  predecessorWeights: Bo,
  range: Wt,
  removeEmptyRanks: Ho,
  simplify: To,
  successorWeights: Po,
  time: zo,
  uniqueId: Kt,
  zipObject: Je
};
function qt(e, t, n, o) {
  for (var r = o; e.hasNode(r); )
    r = Kt(o);
  return n.dummy = t, e.setNode(r, n), r;
}
function To(e) {
  let t = new Yt().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let o = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, r = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: o.weight + r.weight,
      minlen: Math.max(o.minlen, r.minlen)
    });
  }), t;
}
function Ro(e) {
  let t = new Yt({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function Po(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.outEdges(n).forEach((r) => {
      o[r.w] = (o[r.w] || 0) + e.edge(r).weight;
    }), o;
  });
  return Je(e.nodes(), t);
}
function Bo(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.inEdges(n).forEach((r) => {
      o[r.v] = (o[r.v] || 0) + e.edge(r).weight;
    }), o;
  });
  return Je(e.nodes(), t);
}
function Do(e, t) {
  let n = e.x, o = e.y, r = t.x - n, s = t.y - o, i = e.width / 2, d = e.height / 2;
  if (!r && !s)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let l, a;
  return Math.abs(s) * i > Math.abs(r) * d ? (s < 0 && (d = -d), l = d * r / s, a = d) : (r < 0 && (i = -i), l = i, a = i * s / r), { x: n + l, y: o + a };
}
function Fo(e) {
  let t = Wt(Ut(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let o = e.node(n), r = o.rank;
    r !== void 0 && (t[r][o.order] = n);
  }), t;
}
function Go(e) {
  let t = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MAX_VALUE : r;
  }), n = Oe(Math.min, t);
  e.nodes().forEach((o) => {
    let r = e.node(o);
    Object.hasOwn(r, "rank") && (r.rank -= n);
  });
}
function Ho(e) {
  let t = e.nodes().map((i) => e.node(i).rank), n = Oe(Math.min, t), o = [];
  e.nodes().forEach((i) => {
    let d = e.node(i).rank - n;
    o[d] || (o[d] = []), o[d].push(i);
  });
  let r = 0, s = e.graph().nodeRankFactor;
  Array.from(o).forEach((i, d) => {
    i === void 0 && d % s !== 0 ? --r : i !== void 0 && r && i.forEach((l) => e.node(l).rank += r);
  });
}
function Vo(e, t, n, o) {
  let r = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (r.rank = n, r.order = o), qt(e, "border", r, t);
}
function Yo(e, t = zt) {
  const n = [];
  for (let o = 0; o < e.length; o += t) {
    const r = e.slice(o, o + t);
    n.push(r);
  }
  return n;
}
const zt = 65535;
function Oe(e, t) {
  if (t.length > zt) {
    const n = Yo(t);
    return e.apply(null, n.map((o) => e.apply(null, o)));
  } else
    return e.apply(null, t);
}
function Ut(e) {
  const n = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MIN_VALUE : r;
  });
  return Oe(Math.max, n);
}
function qo(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((o) => {
    t(o) ? n.lhs.push(o) : n.rhs.push(o);
  }), n;
}
function zo(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function Uo(e, t) {
  return t();
}
let Ko = 0;
function Kt(e) {
  var t = ++Ko;
  return e + ("" + t);
}
function Wt(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let o = (s) => s < t;
  n < 0 && (o = (s) => t < s);
  const r = [];
  for (let s = e; o(s); s += n)
    r.push(s);
  return r;
}
function Wo(e, t) {
  const n = {};
  for (const o of t)
    e[o] !== void 0 && (n[o] = e[o]);
  return n;
}
function Xo(e, t) {
  let n = t;
  return typeof t == "string" && (n = (o) => o[t]), Object.entries(e).reduce((o, [r, s]) => (o[r] = n(s, r), o), {});
}
function Je(e, t) {
  return e.reduce((n, o, r) => (n[o] = t[r], n), {});
}
let Jo = Io, Qo = F.uniqueId;
var Zo = {
  run: er,
  undo: nr
};
function er(e) {
  (e.graph().acyclicer === "greedy" ? Jo(e, n(e)) : tr(e)).forEach((o) => {
    let r = e.edge(o);
    e.removeEdge(o), r.forwardName = o.name, r.reversed = !0, e.setEdge(o.w, o.v, r, Qo("rev"));
  });
  function n(o) {
    return (r) => o.edge(r).weight;
  }
}
function tr(e) {
  let t = [], n = {}, o = {};
  function r(s) {
    Object.hasOwn(o, s) || (o[s] = !0, n[s] = !0, e.outEdges(s).forEach((i) => {
      Object.hasOwn(n, i.w) ? t.push(i) : r(i.w);
    }), delete n[s]);
  }
  return e.nodes().forEach(r), t;
}
function nr(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let o = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, o);
    }
  });
}
let or = F;
var rr = {
  run: sr,
  undo: dr
};
function sr(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => ir(e, t));
}
function ir(e, t) {
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
    }, a = or.addDummyNode(e, "edge", c, "_d"), o === l && (c.width = d.width, c.height = d.height, c.dummy = "edge-label", c.labelpos = d.labelpos), e.setEdge(n, a, { weight: d.weight }, i), f === 0 && e.graph().dummyChains.push(a), n = a;
  e.setEdge(n, r, { weight: d.weight }, i);
}
function dr(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), o = n.edgeLabel, r;
    for (e.setEdge(n.edgeObj, o); n.dummy; )
      r = e.successors(t)[0], e.removeNode(t), o.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (o.x = n.x, o.y = n.y, o.width = n.width, o.height = n.height), t = r, n = e.node(t);
  });
}
const { applyWithChunking: ar } = F;
var $e = {
  longestPath: lr,
  slack: cr
};
function lr(e) {
  var t = {};
  function n(o) {
    var r = e.node(o);
    if (Object.hasOwn(t, o))
      return r.rank;
    t[o] = !0;
    let s = e.outEdges(o).map((d) => d == null ? Number.POSITIVE_INFINITY : n(d.w) - e.edge(d).minlen);
    var i = ar(Math.min, s);
    return i === Number.POSITIVE_INFINITY && (i = 0), r.rank = i;
  }
  e.sources().forEach(n);
}
function cr(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var fr = K.Graph, ke = $e.slack, Xt = ur;
function ur(e) {
  var t = new fr({ directed: !1 }), n = e.nodes()[0], o = e.nodeCount();
  t.setNode(n, {});
  for (var r, s; hr(t, e) < o; )
    r = pr(t, e), s = t.hasNode(r.v) ? ke(e, r) : -ke(e, r), wr(t, e, s);
  return t;
}
function hr(e, t) {
  function n(o) {
    t.nodeEdges(o).forEach((r) => {
      var s = r.v, i = o === s ? r.w : s;
      !e.hasNode(i) && !ke(t, r) && (e.setNode(i, {}), e.setEdge(o, i, {}), n(i));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function pr(e, t) {
  return t.edges().reduce((o, r) => {
    let s = Number.POSITIVE_INFINITY;
    return e.hasNode(r.v) !== e.hasNode(r.w) && (s = ke(t, r)), s < o[0] ? [s, r] : o;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function wr(e, t, n) {
  e.nodes().forEach((o) => t.node(o).rank += n);
}
var mr = Xt, ut = $e.slack, gr = $e.longestPath, br = K.alg.preorder, yr = K.alg.postorder, vr = F.simplify, Er = te;
te.initLowLimValues = Ze;
te.initCutValues = Qe;
te.calcCutValue = Jt;
te.leaveEdge = Zt;
te.enterEdge = en;
te.exchangeEdges = tn;
function te(e) {
  e = vr(e), gr(e);
  var t = mr(e);
  Ze(t), Qe(t, e);
  for (var n, o; n = Zt(t); )
    o = en(t, e, n), tn(t, e, n, o);
}
function Qe(e, t) {
  var n = yr(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((o) => xr(e, t, o));
}
function xr(e, t, n) {
  var o = e.node(n), r = o.parent;
  e.edge(n, r).cutvalue = Jt(e, t, n);
}
function Jt(e, t, n) {
  var o = e.node(n), r = o.parent, s = !0, i = t.edge(n, r), d = 0;
  return i || (s = !1, i = t.edge(r, n)), d = i.weight, t.nodeEdges(n).forEach((l) => {
    var a = l.v === n, c = a ? l.w : l.v;
    if (c !== r) {
      var f = a === s, h = t.edge(l).weight;
      if (d += f ? h : -h, Cr(e, n, c)) {
        var u = e.edge(n, c).cutvalue;
        d += f ? -u : u;
      }
    }
  }), d;
}
function Ze(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), Qt(e, {}, 1, t);
}
function Qt(e, t, n, o, r) {
  var s = n, i = e.node(o);
  return t[o] = !0, e.neighbors(o).forEach((d) => {
    Object.hasOwn(t, d) || (n = Qt(e, t, n, d, o));
  }), i.low = s, i.lim = n++, r ? i.parent = r : delete i.parent, n;
}
function Zt(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function en(e, t, n) {
  var o = n.v, r = n.w;
  t.hasEdge(o, r) || (o = n.w, r = n.v);
  var s = e.node(o), i = e.node(r), d = s, l = !1;
  s.lim > i.lim && (d = i, l = !0);
  var a = t.edges().filter((c) => l === ht(e, e.node(c.v), d) && l !== ht(e, e.node(c.w), d));
  return a.reduce((c, f) => ut(t, f) < ut(t, c) ? f : c);
}
function tn(e, t, n, o) {
  var r = n.v, s = n.w;
  e.removeEdge(r, s), e.setEdge(o.v, o.w, {}), Ze(e), Qe(e, t), kr(e, t);
}
function kr(e, t) {
  var n = e.nodes().find((r) => !t.node(r).parent), o = br(e, n);
  o = o.slice(1), o.forEach((r) => {
    var s = e.node(r).parent, i = t.edge(r, s), d = !1;
    i || (i = t.edge(s, r), d = !0), t.node(r).rank = t.node(s).rank + (d ? i.minlen : -i.minlen);
  });
}
function Cr(e, t, n) {
  return e.hasEdge(t, n);
}
function ht(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var Lr = $e, nn = Lr.longestPath, _r = Xt, Sr = Er, Nr = Ir;
function Ir(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      pt(e);
      break;
    case "tight-tree":
      $r(e);
      break;
    case "longest-path":
      Or(e);
      break;
    case "none":
      break;
    default:
      pt(e);
  }
}
var Or = nn;
function $r(e) {
  nn(e), _r(e);
}
function pt(e) {
  Sr(e);
}
var Mr = jr;
function jr(e) {
  let t = Tr(e);
  e.graph().dummyChains.forEach((n) => {
    let o = e.node(n), r = o.edgeObj, s = Ar(e, t, r.v, r.w), i = s.path, d = s.lca, l = 0, a = i[l], c = !0;
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
function Ar(e, t, n, o) {
  let r = [], s = [], i = Math.min(t[n].low, t[o].low), d = Math.max(t[n].lim, t[o].lim), l, a;
  l = n;
  do
    l = e.parent(l), r.push(l);
  while (l && (t[l].low > i || d > t[l].lim));
  for (a = l, l = o; (l = e.parent(l)) !== a; )
    s.push(l);
  return { path: r.concat(s.reverse()), lca: a };
}
function Tr(e) {
  let t = {}, n = 0;
  function o(r) {
    let s = n;
    e.children(r).forEach(o), t[r] = { low: s, lim: n++ };
  }
  return e.children().forEach(o), t;
}
let Ce = F;
var Rr = {
  run: Pr,
  cleanup: Fr
};
function Pr(e) {
  let t = Ce.addDummyNode(e, "root", {}, "_root"), n = Br(e), o = Object.values(n), r = Ce.applyWithChunking(Math.max, o) - 1, s = 2 * r + 1;
  e.graph().nestingRoot = t, e.edges().forEach((d) => e.edge(d).minlen *= s);
  let i = Dr(e) + 1;
  e.children().forEach((d) => on(e, t, s, i, r, n, d)), e.graph().nodeRankFactor = s;
}
function on(e, t, n, o, r, s, i) {
  let d = e.children(i);
  if (!d.length) {
    i !== t && e.setEdge(t, i, { weight: 0, minlen: n });
    return;
  }
  let l = Ce.addBorderNode(e, "_bt"), a = Ce.addBorderNode(e, "_bb"), c = e.node(i);
  e.setParent(l, i), c.borderTop = l, e.setParent(a, i), c.borderBottom = a, d.forEach((f) => {
    on(e, t, n, o, r, s, f);
    let h = e.node(f), u = h.borderTop ? h.borderTop : f, p = h.borderBottom ? h.borderBottom : f, g = h.borderTop ? o : 2 * o, C = u !== p ? 1 : r - s[i] + 1;
    e.setEdge(l, u, {
      weight: g,
      minlen: C,
      nestingEdge: !0
    }), e.setEdge(p, a, {
      weight: g,
      minlen: C,
      nestingEdge: !0
    });
  }), e.parent(i) || e.setEdge(t, l, { weight: 0, minlen: r + s[i] });
}
function Br(e) {
  var t = {};
  function n(o, r) {
    var s = e.children(o);
    s && s.length && s.forEach((i) => n(i, r + 1)), t[o] = r;
  }
  return e.children().forEach((o) => n(o, 1)), t;
}
function Dr(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function Fr(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var o = e.edge(n);
    o.nestingEdge && e.removeEdge(n);
  });
}
let Gr = F;
var Hr = Vr;
function Vr(e) {
  function t(n) {
    let o = e.children(n), r = e.node(n);
    if (o.length && o.forEach(t), Object.hasOwn(r, "minRank")) {
      r.borderLeft = [], r.borderRight = [];
      for (let s = r.minRank, i = r.maxRank + 1; s < i; ++s)
        wt(e, "borderLeft", "_bl", n, r, s), wt(e, "borderRight", "_br", n, r, s);
    }
  }
  e.children().forEach(t);
}
function wt(e, t, n, o, r, s) {
  let i = { width: 0, height: 0, rank: s, borderType: t }, d = r[t][s - 1], l = Gr.addDummyNode(e, "border", i, n);
  r[t][s] = l, e.setParent(l, o), d && e.setEdge(d, l, { weight: 1 });
}
var Yr = {
  adjust: qr,
  undo: zr
};
function qr(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && rn(e);
}
function zr(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && Ur(e), (t === "lr" || t === "rl") && (Kr(e), rn(e));
}
function rn(e) {
  e.nodes().forEach((t) => mt(e.node(t))), e.edges().forEach((t) => mt(e.edge(t)));
}
function mt(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function Ur(e) {
  e.nodes().forEach((t) => Te(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Te), Object.hasOwn(n, "y") && Te(n);
  });
}
function Te(e) {
  e.y = -e.y;
}
function Kr(e) {
  e.nodes().forEach((t) => Re(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Re), Object.hasOwn(n, "x") && Re(n);
  });
}
function Re(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let gt = F;
var Wr = Xr;
function Xr(e) {
  let t = {}, n = e.nodes().filter((l) => !e.children(l).length), o = n.map((l) => e.node(l).rank), r = gt.applyWithChunking(Math.max, o), s = gt.range(r + 1).map(() => []);
  function i(l) {
    if (t[l]) return;
    t[l] = !0;
    let a = e.node(l);
    s[a.rank].push(l), e.successors(l).forEach(i);
  }
  return n.sort((l, a) => e.node(l).rank - e.node(a).rank).forEach(i), s;
}
let Jr = F.zipObject;
var Qr = Zr;
function Zr(e, t) {
  let n = 0;
  for (let o = 1; o < t.length; ++o)
    n += es(e, t[o - 1], t[o]);
  return n;
}
function es(e, t, n) {
  let o = Jr(n, n.map((a, c) => c)), r = t.flatMap((a) => e.outEdges(a).map((c) => ({ pos: o[c.w], weight: e.edge(c).weight })).sort((c, f) => c.pos - f.pos)), s = 1;
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
var ts = ns;
function ns(e, t = []) {
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
let os = F;
var rs = ss;
function ss(e, t) {
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
  return is(o);
}
function is(e) {
  let t = [];
  function n(r) {
    return (s) => {
      s.merged || (s.barycenter === void 0 || r.barycenter === void 0 || s.barycenter >= r.barycenter) && ds(r, s);
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
  return t.filter((r) => !r.merged).map((r) => os.pick(r, ["vs", "i", "barycenter", "weight"]));
}
function ds(e, t) {
  let n = 0, o = 0;
  e.weight && (n += e.barycenter * e.weight, o += e.weight), t.weight && (n += t.barycenter * t.weight, o += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / o, e.weight = o, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let as = F;
var ls = cs;
function cs(e, t) {
  let n = as.partition(e, (c) => Object.hasOwn(c, "barycenter")), o = n.lhs, r = n.rhs.sort((c, f) => f.i - c.i), s = [], i = 0, d = 0, l = 0;
  o.sort(fs(!!t)), l = bt(s, r, l), o.forEach((c) => {
    l += c.vs.length, s.push(c.vs), i += c.barycenter * c.weight, d += c.weight, l = bt(s, r, l);
  });
  let a = { vs: s.flat(!0) };
  return d && (a.barycenter = i / d, a.weight = d), a;
}
function bt(e, t, n) {
  let o;
  for (; t.length && (o = t[t.length - 1]).i <= n; )
    t.pop(), e.push(o.vs), n++;
  return n;
}
function fs(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let us = ts, hs = rs, ps = ls;
var ws = sn;
function sn(e, t, n, o) {
  let r = e.children(t), s = e.node(t), i = s ? s.borderLeft : void 0, d = s ? s.borderRight : void 0, l = {};
  i && (r = r.filter((h) => h !== i && h !== d));
  let a = us(e, r);
  a.forEach((h) => {
    if (e.children(h.v).length) {
      let u = sn(e, h.v, n, o);
      l[h.v] = u, Object.hasOwn(u, "barycenter") && gs(h, u);
    }
  });
  let c = hs(a, n);
  ms(c, l);
  let f = ps(c, o);
  if (i && (f.vs = [i, f.vs, d].flat(!0), e.predecessors(i).length)) {
    let h = e.node(e.predecessors(i)[0]), u = e.node(e.predecessors(d)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + h.order + u.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function ms(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((o) => t[o] ? t[o].vs : o);
  });
}
function gs(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let bs = K.Graph, ys = F;
var vs = Es;
function Es(e, t, n, o) {
  o || (o = e.nodes());
  let r = xs(e), s = new bs({ compound: !0 }).setGraph({ root: r }).setDefaultNodeLabel((i) => e.node(i));
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
function xs(e) {
  for (var t; e.hasNode(t = ys.uniqueId("_root")); ) ;
  return t;
}
var ks = Cs;
function Cs(e, t, n) {
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
let Ls = Wr, _s = Qr, Ss = ws, Ns = vs, Is = ks, Os = K.Graph, be = F;
var $s = dn;
function dn(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, dn);
    return;
  }
  let n = be.maxRank(e), o = yt(e, be.range(1, n + 1), "inEdges"), r = yt(e, be.range(n - 1, -1, -1), "outEdges"), s = Ls(e);
  if (vt(e, s), t && t.disableOptimalOrderHeuristic)
    return;
  let i = Number.POSITIVE_INFINITY, d;
  for (let l = 0, a = 0; a < 4; ++l, ++a) {
    Ms(l % 2 ? o : r, l % 4 >= 2), s = be.buildLayerMatrix(e);
    let c = _s(e, s);
    c < i && (a = 0, d = Object.assign({}, s), i = c);
  }
  vt(e, d);
}
function yt(e, t, n) {
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
    return Ns(e, s, n, o.get(s) || []);
  });
}
function Ms(e, t) {
  let n = new Os();
  e.forEach(function(o) {
    let r = o.graph().root, s = Ss(o, r, n, t);
    s.vs.forEach((i, d) => o.node(i).order = d), Is(o, n, s.vs);
  });
}
function vt(e, t) {
  Object.values(t).forEach((n) => n.forEach((o, r) => e.node(o).order = r));
}
let js = K.Graph, X = F;
var As = {
  positionX: qs
};
function Ts(e, t) {
  let n = {};
  function o(r, s) {
    let i = 0, d = 0, l = r.length, a = s[s.length - 1];
    return s.forEach((c, f) => {
      let h = Ps(e, c), u = h ? e.node(h).order : l;
      (h || c === a) && (s.slice(d, f + 1).forEach((p) => {
        e.predecessors(p).forEach((g) => {
          let C = e.node(g), E = C.order;
          (E < i || u < E) && !(C.dummy && e.node(p).dummy) && an(n, g, p);
        });
      }), d = f + 1, i = u);
    }), s;
  }
  return t.length && t.reduce(o), n;
}
function Rs(e, t) {
  let n = {};
  function o(s, i, d, l, a) {
    let c;
    X.range(i, d).forEach((f) => {
      c = s[f], e.node(c).dummy && e.predecessors(c).forEach((h) => {
        let u = e.node(h);
        u.dummy && (u.order < l || u.order > a) && an(n, h, c);
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
function Ps(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function an(e, t, n) {
  if (t > n) {
    let r = t;
    t = n, n = r;
  }
  let o = e[t];
  o || (e[t] = o = {}), o[n] = !0;
}
function Bs(e, t, n) {
  if (t > n) {
    let o = t;
    t = n, n = o;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function Ds(e, t, n, o) {
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
          s[a] === a && l < i[p] && !Bs(n, a, p) && (s[p] = a, s[a] = r[a] = r[p], l = i[p]);
        }
      }
    });
  }), { root: r, align: s };
}
function Fs(e, t, n, o, r) {
  let s = {}, i = Gs(e, t, n, r), d = r ? "borderLeft" : "borderRight";
  function l(f, h) {
    let u = i.nodes(), p = u.pop(), g = {};
    for (; p; )
      g[p] ? f(p) : (g[p] = !0, u.push(p), u = u.concat(h(p))), p = u.pop();
  }
  function a(f) {
    s[f] = i.inEdges(f).reduce((h, u) => Math.max(h, s[u.v] + i.edge(u)), 0);
  }
  function c(f) {
    let h = i.outEdges(f).reduce((p, g) => Math.min(p, s[g.w] - i.edge(g)), Number.POSITIVE_INFINITY), u = e.node(f);
    h !== Number.POSITIVE_INFINITY && u.borderType !== d && (s[f] = Math.max(s[f], h));
  }
  return l(a, i.predecessors.bind(i)), l(c, i.successors.bind(i)), Object.keys(o).forEach((f) => s[f] = s[n[f]]), s;
}
function Gs(e, t, n, o) {
  let r = new js(), s = e.graph(), i = zs(s.nodesep, s.edgesep, o);
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
function Hs(e, t) {
  return Object.values(t).reduce((n, o) => {
    let r = Number.NEGATIVE_INFINITY, s = Number.POSITIVE_INFINITY;
    Object.entries(o).forEach(([d, l]) => {
      let a = Us(e, d) / 2;
      r = Math.max(l + a, r), s = Math.min(l - a, s);
    });
    const i = r - s;
    return i < n[0] && (n = [i, o]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Vs(e, t) {
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
function Ys(e, t) {
  return X.mapValues(e.ul, (n, o) => {
    if (t)
      return e[t.toLowerCase()][o];
    {
      let r = Object.values(e).map((s) => s[o]).sort((s, i) => s - i);
      return (r[1] + r[2]) / 2;
    }
  });
}
function qs(e) {
  let t = X.buildLayerMatrix(e), n = Object.assign(
    Ts(e, t),
    Rs(e, t)
  ), o = {}, r;
  ["u", "d"].forEach((i) => {
    r = i === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((d) => {
      d === "r" && (r = r.map((f) => Object.values(f).reverse()));
      let l = (i === "u" ? e.predecessors : e.successors).bind(e), a = Ds(e, r, n, l), c = Fs(
        e,
        r,
        a.root,
        a.align,
        d === "r"
      );
      d === "r" && (c = X.mapValues(c, (f) => -f)), o[i + d] = c;
    });
  });
  let s = Hs(e, o);
  return Vs(o, s), Ys(o, e.graph().align);
}
function zs(e, t, n) {
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
function Us(e, t) {
  return e.node(t).width;
}
let ln = F, Ks = As.positionX;
var Ws = Xs;
function Xs(e) {
  e = ln.asNonCompoundGraph(e), Js(e), Object.entries(Ks(e)).forEach(([t, n]) => e.node(t).x = n);
}
function Js(e) {
  let t = ln.buildLayerMatrix(e), n = e.graph().ranksep, o = 0;
  t.forEach((r) => {
    const s = r.reduce((i, d) => {
      const l = e.node(d).height;
      return i > l ? i : l;
    }, 0);
    r.forEach((i) => e.node(i).y = o + s / 2), o += s + n;
  });
}
let Et = Zo, xt = rr, Qs = Nr, Zs = F.normalizeRanks, ei = Mr, ti = F.removeEmptyRanks, kt = Rr, ni = Hr, Ct = Yr, oi = $s, ri = Ws, V = F, si = K.Graph;
var ii = di;
function di(e, t) {
  let n = t && t.debugTiming ? V.time : V.notime;
  n("layout", () => {
    let o = n("  buildLayoutGraph", () => gi(e));
    n("  runLayout", () => ai(o, n, t)), n("  updateInputGraph", () => li(e, o));
  });
}
function ai(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => bi(e)), t("    removeSelfEdges", () => Si(e)), t("    acyclic", () => Et.run(e)), t("    nestingGraph.run", () => kt.run(e)), t("    rank", () => Qs(V.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => yi(e)), t("    removeEmptyRanks", () => ti(e)), t("    nestingGraph.cleanup", () => kt.cleanup(e)), t("    normalizeRanks", () => Zs(e)), t("    assignRankMinMax", () => vi(e)), t("    removeEdgeLabelProxies", () => Ei(e)), t("    normalize.run", () => xt.run(e)), t("    parentDummyChains", () => ei(e)), t("    addBorderSegments", () => ni(e)), t("    order", () => oi(e, n)), t("    insertSelfEdges", () => Ni(e)), t("    adjustCoordinateSystem", () => Ct.adjust(e)), t("    position", () => ri(e)), t("    positionSelfEdges", () => Ii(e)), t("    removeBorderNodes", () => _i(e)), t("    normalize.undo", () => xt.undo(e)), t("    fixupEdgeLabelCoords", () => Ci(e)), t("    undoCoordinateSystem", () => Ct.undo(e)), t("    translateGraph", () => xi(e)), t("    assignNodeIntersects", () => ki(e)), t("    reversePoints", () => Li(e)), t("    acyclic.undo", () => Et.undo(e));
}
function li(e, t) {
  e.nodes().forEach((n) => {
    let o = e.node(n), r = t.node(n);
    o && (o.x = r.x, o.y = r.y, o.rank = r.rank, t.children(n).length && (o.width = r.width, o.height = r.height));
  }), e.edges().forEach((n) => {
    let o = e.edge(n), r = t.edge(n);
    o.points = r.points, Object.hasOwn(r, "x") && (o.x = r.x, o.y = r.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let ci = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], fi = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, ui = ["acyclicer", "ranker", "rankdir", "align"], hi = ["width", "height", "rank"], Lt = { width: 0, height: 0 }, pi = ["minlen", "weight", "width", "height", "labeloffset"], wi = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, mi = ["labelpos"];
function gi(e) {
  let t = new si({ multigraph: !0, compound: !0 }), n = Be(e.graph());
  return t.setGraph(Object.assign(
    {},
    fi,
    Pe(n, ci),
    V.pick(n, ui)
  )), e.nodes().forEach((o) => {
    let r = Be(e.node(o));
    const s = Pe(r, hi);
    Object.keys(Lt).forEach((i) => {
      s[i] === void 0 && (s[i] = Lt[i]);
    }), t.setNode(o, s), t.setParent(o, e.parent(o));
  }), e.edges().forEach((o) => {
    let r = Be(e.edge(o));
    t.setEdge(o, Object.assign(
      {},
      wi,
      Pe(r, pi),
      V.pick(r, mi)
    ));
  }), t;
}
function bi(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let o = e.edge(n);
    o.minlen *= 2, o.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? o.width += o.labeloffset : o.height += o.labeloffset);
  });
}
function yi(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let o = e.node(t.v), s = { rank: (e.node(t.w).rank - o.rank) / 2 + o.rank, e: t };
      V.addDummyNode(e, "edge-proxy", s, "_ep");
    }
  });
}
function vi(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let o = e.node(n);
    o.borderTop && (o.minRank = e.node(o.borderTop).rank, o.maxRank = e.node(o.borderBottom).rank, t = Math.max(t, o.maxRank));
  }), e.graph().maxRank = t;
}
function Ei(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function xi(e) {
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
function ki(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), o = e.node(t.v), r = e.node(t.w), s, i;
    n.points ? (s = n.points[0], i = n.points[n.points.length - 1]) : (n.points = [], s = r, i = o), n.points.unshift(V.intersectRect(o, s)), n.points.push(V.intersectRect(r, i));
  });
}
function Ci(e) {
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
function Li(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function _i(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), o = e.node(n.borderTop), r = e.node(n.borderBottom), s = e.node(n.borderLeft[n.borderLeft.length - 1]), i = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(i.x - s.x), n.height = Math.abs(r.y - o.y), n.x = s.x + n.width / 2, n.y = o.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function Si(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function Ni(e) {
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
function Ii(e) {
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
function Pe(e, t) {
  return V.mapValues(V.pick(e, t), Number);
}
function Be(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, o]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = o;
  }), t;
}
let Oi = F, $i = K.Graph;
var Mi = {
  debugOrdering: ji
};
function ji(e) {
  let t = Oi.buildLayerMatrix(e), n = new $i({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((o) => {
    n.setNode(o, { label: o }), n.setParent(o, "layer" + e.node(o).rank);
  }), e.edges().forEach((o) => n.setEdge(o.v, o.w, {}, o.name)), t.forEach((o, r) => {
    let s = "layer" + r;
    n.setNode(s, { rank: "same" }), o.reduce((i, d) => (n.setEdge(i, d, { style: "invis" }), d));
  }), n;
}
var Ai = "1.1.8", Ti = {
  graphlib: K,
  layout: ii,
  debug: Mi,
  util: {
    time: F.time,
    notime: F.notime
  },
  version: Ai
};
const _t = /* @__PURE__ */ $n(Ti);
function St(e, t) {
  const n = nt[e.type] ?? nt.process;
  if (e.type === "compound") {
    const s = (t == null ? void 0 : t.w) ?? e.w ?? Ie(e.label, e.rows, n.w), i = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, Mt(e.rows));
    return { w: s, h: i };
  }
  const o = (t == null ? void 0 : t.w) ?? e.w ?? n.w, r = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, Tt(e.type, e.label, o));
  return { w: o, h: r };
}
function Le(e, t) {
  const n = new _t.graphlib.Graph({ multigraph: !0 });
  n.setGraph({ rankdir: e.direction ?? "TB", nodesep: 50, ranksep: 60, marginx: 20, marginy: 20 }), n.setDefaultEdgeLabel(() => ({}));
  for (const a of e.nodes) {
    const { w: c, h: f } = St(a, t == null ? void 0 : t.nodes[a.id]);
    n.setNode(a.id, { width: c, height: f });
  }
  for (const a of e.edges)
    n.setEdge(a.from, a.to, {}, a.id);
  _t.layout(n);
  const o = e.nodes.map((a) => {
    const c = t == null ? void 0 : t.nodes[a.id], { w: f, h } = St(a, c), u = n.node(a.id);
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
function De(e, t) {
  const n = { nodes: {}, edges: {} };
  for (const o of e) n.nodes[o.id] = { x: o.x, y: o.y, w: o.w, h: o.h };
  for (const o of t) n.edges[o.id] = { points: o.points };
  return n;
}
const Ri = 3, Nt = [
  "dd-flow-level-1",
  "dd-flow-level-2",
  "dd-flow-level-3",
  "dd-flow-level-none",
  "dd-flow-level-branch"
];
function _e(e, t) {
  const n = Math.floor((e == null ? void 0 : e[t]) ?? 0);
  return Math.min(Ri, Math.max(0, n));
}
function Pi(e, t, n, o) {
  var l;
  for (const a of e.querySelectorAll(Nt.map((c) => `.${c}`).join(",")))
    a.classList.remove(...Nt);
  const r = { 1: 0, 2: 0, 3: 0 };
  if (o === null) return r;
  const s = /* @__PURE__ */ new Map();
  for (const a of e.querySelectorAll(".dd-flow-node")) {
    const c = a.getAttribute("data-node-id");
    c && s.set(c, a);
  }
  const i = /* @__PURE__ */ new Set(), d = (a) => {
    for (const c of ee(n.parentsOf, a)) i.add(c);
  };
  for (const a of t) {
    const c = s.get(a.id);
    if (!c) continue;
    const f = _e(a.levels, o);
    f && (c.classList.add(`dd-flow-level-${f}`), r[f] += 1, d(a.id));
    const h = /* @__PURE__ */ new Map();
    for (const u of c.querySelectorAll(".dd-flow-node-row")) {
      const p = u.getAttribute("data-row-id");
      p && h.set(p, u);
    }
    for (const u of a.rows ?? []) {
      const p = h.get(u.id);
      if (!p) continue;
      const g = _e(u.levels, o);
      if (!g) {
        p.classList.add("dd-flow-level-none");
        continue;
      }
      p.classList.add(`dd-flow-level-${g}`), r[g] += 1, i.add(a.id), d(a.id);
    }
  }
  for (const a of i) (l = s.get(a)) == null || l.classList.add("dd-flow-level-branch");
  return r;
}
function Bi(e, t, n) {
  const o = /* @__PURE__ */ new Map();
  for (const d of t) o.set(d.target, [...o.get(d.target) ?? [], d.source]);
  const r = /* @__PURE__ */ new Map();
  for (const d of e) {
    const l = (d.rows ?? []).filter((a) => _e(a.levels, n) > 0);
    (_e(d.levels, n) > 0 || l.length) && r.set(d.id, l);
  }
  const s = new Set(r.keys()), i = [...s];
  for (; i.length; )
    for (const d of o.get(i.pop()) ?? [])
      s.has(d) || (s.add(d), i.push(d));
  return {
    nodes: e.filter((d) => s.has(d.id)).map((d) => {
      const l = r.get(d.id) ?? [];
      return { ...d, rows: l.length ? l : void 0 };
    }),
    edges: t.filter((d) => s.has(d.source) && s.has(d.target))
  };
}
function Di(e, t, n = "All") {
  const o = document.createElement("div");
  o.className = "dd-flow-filter-bar", o.setAttribute("role", "group"), o.setAttribute("aria-label", "Filter");
  const r = [], s = (i) => {
    for (const d of r) d.el.setAttribute("aria-pressed", String(d.key === i));
    t(i);
  };
  for (const [i, d] of [[null, n], ...e.map((l) => [l.key, l.label ?? l.key])]) {
    const l = document.createElement("button");
    l.type = "button", l.className = "dd-flow-filter-btn", l.textContent = d, l.setAttribute("aria-pressed", String(i === null)), i !== null && (l.dataset.filterKey = i), l.addEventListener("click", () => s(i)), r.push({ key: i, el: l }), o.appendChild(l);
  }
  return o.addEventListener("click", (i) => i.stopPropagation()), { element: o, select: s };
}
const ye = 40;
function ze(e) {
  const t = e.type === "conditional" ? "conditional" : "default", n = e.type === "dashed" ? "dashed" : "solid";
  return {
    kind: e.kind ?? t,
    routing: e.routing ?? "orthogonal",
    stroke: e.stroke ?? n
  };
}
function Fi(e, t) {
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
function Gi(e, t) {
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
function Hi(e, t, n = "orthogonal") {
  if (n === "straight") return Fi(e, t);
  if (n === "bezier") return Gi(e, t);
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
const Vi = 10, It = 40;
function cn(e) {
  const [t, n] = [e[0], e[e.length - 1]], o = n.x - t.x, r = n.y - t.y;
  if (Math.abs(o) >= Math.abs(r)) {
    const i = Math.max(It, Math.abs(o) / 2) * Math.sign(o || 1);
    return `M ${t.x} ${t.y} C ${t.x + i} ${t.y}, ${n.x - i} ${n.y}, ${n.x} ${n.y}`;
  }
  const s = Math.max(It, Math.abs(r) / 2) * Math.sign(r || 1);
  return `M ${t.x} ${t.y} C ${t.x} ${t.y + s}, ${n.x} ${n.y - s}, ${n.x} ${n.y}`;
}
function Yi(e, t) {
  if (!t || e.length <= 2) return qi(e);
  const n = [`M ${e[0].x} ${e[0].y}`];
  for (let r = 1; r < e.length - 1; r++) {
    const s = e[r - 1], i = e[r], d = e[r + 1], l = Math.hypot(i.x - s.x, i.y - s.y), a = Math.hypot(d.x - i.x, d.y - i.y), c = Math.min(Vi, l / 2, a / 2), f = { x: i.x - (i.x - s.x) / l * c, y: i.y - (i.y - s.y) / l * c }, h = { x: i.x + (d.x - i.x) / a * c, y: i.y + (d.y - i.y) / a * c };
    n.push(`L ${f.x} ${f.y}`, `Q ${i.x} ${i.y} ${h.x} ${h.y}`);
  }
  const o = e[e.length - 1];
  return n.push(`L ${o.x} ${o.y}`), n.join(" ");
}
function qi(e) {
  return e.map((t, n) => `${n === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
}
const zi = {
  solid: null,
  dashed: "6,4",
  dotted: "1.5,4"
};
function Ui(e) {
  return e.filter((t, n) => n === 0 || t.x !== e[n - 1].x || t.y !== e[n - 1].y);
}
function Ki(e, t, n, o = {}) {
  const r = e.points.length >= 2 ? e.points : Hi(t, n, ze(e).routing), s = Ui(r), { kind: i, routing: d, stroke: l } = ze(e), a = O("g", {
    class: `dd-flow-edge dd-flow-edge-${i}${o.selected ? " is-selected" : ""}`,
    "data-edge-id": e.id
  }), c = d === "bezier" && s.length === 2 ? cn(s) : Yi(s, d === "curved");
  a.appendChild(
    O("path", { d: c, fill: "none", stroke: "transparent", "stroke-width": 16, class: "dd-flow-edge-hit" })
  );
  const f = O("path", {
    d: c,
    fill: "none",
    stroke: i === "conditional" ? "var(--dd-flow-edge-conditional-stroke)" : "var(--dd-flow-edge-stroke)",
    "stroke-width": 2,
    "marker-end": "url(#dd-flow-arrow)"
  }), h = zi[l];
  if (h && f.setAttribute("stroke-dasharray", h), a.appendChild(f), e.label) {
    const u = s[Math.floor((s.length - 1) / 2)], p = s[Math.floor((s.length - 1) / 2) + 1] ?? u, g = (u.x + p.x) / 2, C = (u.y + p.y) / 2, E = Math.max(24, e.label.length * 7 + 12);
    a.appendChild(
      O("rect", {
        x: g - E / 2,
        y: C - 10,
        width: E,
        height: 20,
        rx: 4,
        fill: "var(--dd-flow-edge-label-bg)",
        class: "dd-flow-edge-label-bg"
      })
    );
    const w = O("text", {
      x: g,
      y: C,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "var(--dd-flow-edge-label-text)",
      class: "dd-flow-edge-label"
    });
    w.textContent = e.label, a.appendChild(w);
  }
  return a;
}
function Wi(e, t, n) {
  const o = O("g", {
    class: `dd-flow-row-edge${e.flagged ? " dd-flow-row-edge-flagged" : ""}`,
    "data-row-edge-id": Ke(e)
  }), r = cn([t, n]);
  return o.appendChild(
    O("path", {
      d: r,
      fill: "none",
      stroke: "var(--dd-flow-row-edge-stroke, var(--dd-flow-edge-stroke))",
      "stroke-width": 1.5,
      "stroke-dasharray": "3,3"
    })
  ), o;
}
function Xi() {
  const e = O("defs", {}), t = O("marker", {
    id: "dd-flow-arrow",
    viewBox: "0 0 10 10",
    refX: 9,
    refY: 5,
    markerWidth: 8,
    markerHeight: 8,
    orient: "auto-start-reverse"
  });
  return t.appendChild(O("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "var(--dd-flow-edge-stroke)" })), e.appendChild(t), e;
}
function et(e, t, n = {}) {
  var E, w, y, x;
  const o = new Map(e.map((b) => [b.id, b]));
  let r = 1 / 0, s = 1 / 0, i = -1 / 0, d = -1 / 0;
  for (const b of e)
    r = Math.min(r, b.x - b.w / 2), s = Math.min(s, b.y - b.h / 2), i = Math.max(i, b.x + b.w / 2), d = Math.max(d, b.y + b.h / 2);
  e.length || (r = 0, s = 0, i = 200, d = 100);
  const l = i - r + ye * 2, a = d - s + ye * 2, c = ye - r, f = ye - s, h = O("svg", {
    class: "dd-flow-svg",
    viewBox: `0 0 ${l} ${a}`,
    width: l,
    height: a
  });
  h.appendChild(Xi());
  const u = O("g", { class: "dd-flow-world", transform: `translate(${c}, ${f})` }), p = O("g", { class: "dd-flow-edges" });
  for (const b of t) {
    const k = o.get(b.from), $ = o.get(b.to);
    !k || !$ || p.appendChild(Ki(b, k, $, { selected: b.id === n.selectedEdgeId }));
  }
  u.appendChild(p);
  const g = (((E = n.selectedNodeIds) == null ? void 0 : E.size) ?? 0) > 1, C = O("g", { class: "dd-flow-nodes" });
  for (const b of e) {
    const k = ((w = n.selectedNodeIds) == null ? void 0 : w.has(b.id)) ?? !1, $ = !g && (b.id === n.selectedNodeId || k), j = ((y = n.selectedRowKey) == null ? void 0 : y.nodeId) === b.id ? n.selectedRowKey.rowId : null;
    C.appendChild(Nn(b, { selected: $, multiselected: g && k, selectedRowId: j }));
  }
  if (u.appendChild(C), (x = n.rowEdges) != null && x.length) {
    const b = O("g", { class: "dd-flow-row-edges" });
    for (const k of n.rowEdges) {
      const $ = o.get(k.sourceNode), j = o.get(k.targetNode);
      if (!$ || !j) continue;
      const A = $.x <= j.x, L = ot($, k.sourceRow, A ? "right" : "left"), T = ot(j, k.targetRow, A ? "left" : "right");
      !L || !T || b.appendChild(Wi(k, L, T));
    }
    u.appendChild(b);
  }
  return h.appendChild(u), h;
}
const Se = {
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
Se.host = {
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
const Fe = "bam";
function le(e, t) {
  const n = Se[t ?? Fe] ?? Se[Fe];
  e.setAttribute("data-dd-flow-theme", t ?? Fe);
  for (const [o, r] of Object.entries(n.vars))
    e.style.setProperty(`--dd-flow-${o}`, r);
}
function Td(e, t) {
  Se[e] = t;
}
const Ji = 0.2, Qi = 4, Zi = 4, ed = 300, td = 30, ie = "ddFlowPanned";
function fn(e, t, n = {}) {
  var M, S, R, Y, ne;
  const o = n.minScale ?? Ji, r = n.maxScale ?? Qi, s = n.maxFitScale ?? 1, i = Number(t.getAttribute("width")) || 1, d = Number(t.getAttribute("height")) || 1, l = 24, a = t.querySelector("g.dd-flow-world");
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
  c.setAttribute("class", "dd-flow-pz"), (M = a.parentNode) == null || M.insertBefore(c, a), c.appendChild(a), e.classList.add("dd-flow-has-viewport");
  let f = ((S = n.initial) == null ? void 0 : S.scale) ?? 1, h = ((R = n.initial) == null ? void 0 : R.tx) ?? 0, u = ((Y = n.initial) == null ? void 0 : Y.ty) ?? 0, p = ((ne = n.initial) == null ? void 0 : ne.userAdjusted) ?? !1;
  const g = () => {
    c.setAttribute("transform", `translate(${h}, ${u}) scale(${f})`);
  }, C = () => {
    const I = e.getBoundingClientRect(), N = Math.max(1, Math.round(I.width)), P = Math.max(1, Math.round(I.height));
    return t.setAttribute("width", String(N)), t.setAttribute("height", String(P)), t.setAttribute("viewBox", `0 0 ${N} ${P}`), { w: N, h: P };
  }, E = () => {
    const I = e.getBoundingClientRect(), N = a.getBoundingClientRect();
    return !N.width || !N.height || !f ? null : {
      x: (N.left - I.left - h) / f,
      y: (N.top - I.top - u) / f,
      width: N.width / f,
      height: N.height / f
    };
  }, w = () => {
    const { w: I, h: N } = C();
    if (p) {
      g();
      return;
    }
    g();
    const P = E() ?? { x: 0, y: 0, width: i, height: d }, H = { w: Math.max(1, I - l * 2), h: Math.max(1, N - l * 2) };
    f = Math.max(o, Math.min(s, H.w / P.width, H.h / P.height)), h = (I - P.width * f) / 2 - P.x * f, u = (N - P.height * f) / 2 - P.y * f, g();
  }, y = (I, N, P) => {
    const H = f;
    f = Math.min(r, Math.max(o, f * P)), f !== H && (h = I - (I - h) / H * f, u = N - (N - u) / H * f, g());
  }, x = (I) => {
    I.preventDefault(), p = !0;
    const N = e.getBoundingClientRect();
    y(I.clientX - N.left, I.clientY - N.top, I.deltaY < 0 ? 1.1 : 0.9);
  };
  let b = !1, k = !1, $ = 0, j = 0, A = 0, L = 0;
  const T = /* @__PURE__ */ new Map();
  let B = 0, ce = 0, fe = 0, ue = 0;
  const he = () => {
    if (T.size < 2) return null;
    const [I, N] = [...T.values()];
    return { distance: Math.hypot(I.x - N.x, I.y - N.y), cx: (I.x + N.x) / 2, cy: (I.y + N.y) / 2 };
  }, pe = (I) => {
    const N = I;
    return N != null && N.closest ? !N.closest(".dd-flow-node") && !N.closest(".dd-flow-edge-hit") && !N.closest(".dd-flow-filter-bar, button") : !0;
  }, we = (I) => {
    T.set(I.pointerId, { x: I.clientX, y: I.clientY });
    const N = he();
    if (N) {
      b = !1, B = N.distance;
      return;
    }
    pe(I.target) && (b = !0, k = !1, $ = I.clientX, j = I.clientY, A = h, L = u);
  }, Q = (I) => {
    T.has(I.pointerId) && T.set(I.pointerId, { x: I.clientX, y: I.clientY });
    const N = he();
    if (N) {
      if (!B) {
        B = N.distance;
        return;
      }
      p = !0, k = !0, e.dataset[ie] = "1";
      const W = e.getBoundingClientRect();
      y(N.cx - W.left, N.cy - W.top, N.distance / B), B = N.distance;
      return;
    }
    if (!b) return;
    const P = I.clientX - $, H = I.clientY - j;
    !k && Math.hypot(P, H) < Zi || (k = !0, p = !0, e.dataset[ie] = "1", h = A + P, u = L + H, g());
  }, me = (I) => {
    const N = Date.now(), P = N - ce < ed && Math.hypot(I.clientX - fe, I.clientY - ue) < td;
    return ce = P ? 0 : N, fe = I.clientX, ue = I.clientY, P;
  }, m = (I) => {
    const N = T.size >= 2;
    if (T.delete(I.pointerId), N) {
      B = 0, T.size < 2 && setTimeout(() => delete e.dataset[ie], 0);
      return;
    }
    if (b) {
      if (b = !1, !k) {
        pe(I.target) && me(I) && (p = !1, w());
        return;
      }
      setTimeout(() => delete e.dataset[ie], 0);
    }
  }, v = { capture: !0 };
  e.addEventListener("wheel", x, { passive: !1, capture: !0 }), e.addEventListener("pointerdown", we, v), e.addEventListener("pointermove", Q, v), e.addEventListener("pointerup", m, v), e.addEventListener("pointercancel", m, v);
  const _ = new ResizeObserver(() => w());
  return _.observe(e), w(), {
    fit: w,
    state: () => ({ scale: f, tx: h, ty: u, userAdjusted: p }),
    reset() {
      p = !1, w();
    },
    zoomBy(I) {
      p = !0;
      const N = e.getBoundingClientRect();
      y(N.width / 2, N.height / 2, I);
    },
    destroy() {
      _.disconnect(), e.removeEventListener("wheel", x, v), e.removeEventListener("pointerdown", we, v), e.removeEventListener("pointermove", Q, v), e.removeEventListener("pointerup", m, v), e.removeEventListener("pointercancel", m, v), e.classList.remove("dd-flow-has-viewport");
    }
  };
}
const re = {
  nodeWidth: 118,
  nodeHeight: 34,
  layerGap: 170,
  rowGap: 48,
  margin: 30,
  hint: "Hover to preview · click to pin · scroll to zoom · drag to pan"
};
function nd(e, t, n) {
  const { nodeWidth: o, nodeHeight: r, layerGap: s, rowGap: i, margin: d } = n, l = /* @__PURE__ */ new Map();
  for (const p of e) {
    const g = p.layer ?? 0;
    l.has(g) || l.set(g, []), l.get(g).push(p);
  }
  for (const p of l.values()) p.sort((g, C) => g.id.localeCompare(C.id));
  const a = Math.max(1, ...[...l.values()].map((p) => p.length)), c = Math.max(0, ...e.map((p) => p.layer ?? 0)), f = a * (r + i) - i, h = new Set(t.map((p) => p.source)), u = /* @__PURE__ */ new Map();
  for (const [p, g] of l) {
    const C = g.filter((x) => h.has(x.id)), E = g.filter((x) => !h.has(x.id)), w = C.length ? C.length * (r + i) - i : 0, y = d + (f - w) / 2;
    C.forEach((x, b) => {
      u.set(x.id, { x: d + p * s, y: y + b * (r + i) });
    }), E.forEach((x, b) => {
      const k = Math.floor(b / 2), $ = b % 2 === 0 ? k : a - 1 - k;
      u.set(x.id, { x: d + p * s, y: d + $ * (r + i) });
    });
  }
  return {
    positions: u,
    width: d * 2 + c * s + o,
    height: d * 2 + f
  };
}
const un = (e) => `${e.source} ${e.target}`;
function od(e, t, n, o) {
  const r = e.nodes.map((d) => {
    var l;
    return (l = d.rows) != null && l.length ? Mt(d.rows) : n;
  }), s = Math.max(n, ...r), { positions: i } = nd(e.nodes, e.edges, {
    nodeWidth: t,
    nodeHeight: s,
    layerGap: o.layerGap ?? re.layerGap,
    rowGap: o.rowGap ?? re.rowGap,
    margin: re.margin
  });
  return e.nodes.map((d, l) => {
    var u;
    const a = i.get(d.id), c = !!((u = d.rows) != null && u.length), f = c ? Ie(d.label ?? d.id, d.rows, t) : t, h = c ? r[l] : n;
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
const rd = 320;
function sd(e, t, n) {
  const o = Math.min(
    Math.max(t, Ie(e, void 0, t)),
    Math.max(t, rd)
  ), r = We(e, o - 20).length > 1;
  return { w: o, h: r ? Math.max(n, Tt("process", e, o)) : n };
}
function id(e, t, n, o) {
  const { nodes: r } = Le({
    id: e.id ?? "graph",
    direction: o,
    nodes: e.nodes.map((s) => {
      var d;
      const i = s.label ?? s.id;
      return (d = s.rows) != null && d.length ? {
        id: s.id,
        label: i,
        type: "compound",
        note: s.note,
        rows: s.rows,
        w: Ie(i, s.rows, t)
      } : { id: s.id, label: i, type: "process", note: s.note, ...sd(i, t, n) };
    }),
    edges: e.edges.map((s) => ({ id: un(s), from: s.source, to: s.target }))
  });
  return r;
}
function dd(e, t, n = {}) {
  var b;
  const o = n.nodeWidth ?? re.nodeWidth, r = n.nodeHeight ?? re.nodeHeight, s = n.hint ?? re.hint;
  e.classList.add("dd-flow-embed", "dd-flow-graph-mount"), le(e, n.style ?? "host");
  const i = n.id ?? t.id ?? "";
  let d, l = xe([]), a = null, c = null;
  const f = (k) => {
    c == null || c.destroy(), a == null || a.destroy(), d == null || d.remove();
    const $ = n.layout === "flow" ? id(k, o, r, n.direction ?? "LR") : od(k, o, r, n), j = new Set($.map((L) => L.id)), A = k.edges.filter((L) => j.has(L.source) && j.has(L.target)).map((L) => ({
      id: un(L),
      from: L.source,
      to: L.target,
      routing: "bezier",
      stroke: L.flagged ? "dashed" : "solid",
      kind: L.flagged ? "conditional" : "default",
      points: []
    }));
    d = et($, A, { rowEdges: k.rowEdges }), e.prepend(d), a = fn(e, d, { maxFitScale: 1 }), c = On(e, A, { flowId: i, rowEdges: k.rowEdges }), l = xe(A);
  };
  f(t);
  const h = document.createElement("div");
  if (h.className = "dd-flow-graph-tooltip", e.appendChild(h), s) {
    const k = document.createElement("div");
    k.className = "dd-flow-graph-hint", k.textContent = s, e.appendChild(k);
  }
  const u = new Map(t.nodes.map((k) => [k.id, k])), p = (k) => {
    var T, B;
    const $ = (B = (T = k.target) == null ? void 0 : T.closest) == null ? void 0 : B.call(T, ".dd-flow-node"), j = $ == null ? void 0 : $.getAttribute("data-node-id"), A = j ? u.get(j) : void 0;
    if (!A) {
      h.style.display = "none";
      return;
    }
    h.textContent = A.note ? `${A.label ?? A.id} · ${A.note}` : A.label ?? A.id, h.style.display = "block";
    const L = e.getBoundingClientRect();
    h.style.left = `${k.clientX - L.left + 14}px`, h.style.top = `${k.clientY - L.top + 14}px`;
  }, g = () => {
    h.style.display = "none";
  };
  e.addEventListener("pointermove", p), e.addEventListener("pointerleave", g);
  const C = (k) => {
    var T, B;
    const $ = (B = (T = k.target) == null ? void 0 : T.closest) == null ? void 0 : B.call(T, ".dd-flow-node-row"), j = $ == null ? void 0 : $.closest(".dd-flow-node"), A = j == null ? void 0 : j.getAttribute("data-node-id"), L = $ == null ? void 0 : $.getAttribute("data-row-id");
    !A || !L || z(e, q.rowClick, {
      flowId: i,
      nodeId: A,
      rowId: L,
      shiftKey: k.shiftKey
    });
  };
  e.addEventListener("click", C);
  let E = null;
  const w = (k) => {
    const $ = n.filterMode === "hide", j = $ && k !== null ? Bi(t.nodes, t.edges, k) : null, A = j != null && j.nodes.length ? { ...t, ...j, rowEdges: void 0 } : t;
    $ && (A !== t || E !== null) && f(A), E = k;
    const L = Pi(d, A.nodes, l, k);
    z(e, q.filterChange, { flowId: i, key: k, counts: L });
  }, y = (b = t.filters) != null && b.length ? Di(t.filters, w, n.allFilterLabel) : null;
  y && e.appendChild(y.element);
  const x = kn(e, () => a == null ? void 0 : a.reset(), n.fullscreen !== !1);
  return {
    setFullscreen: x.set,
    setFilter(k) {
      y ? y.select(k) : w(k);
    },
    getFilter: () => E,
    destroy() {
      x.destroy(), e.removeEventListener("pointermove", p), e.removeEventListener("pointerleave", g), e.removeEventListener("click", C), c == null || c.destroy(), c = null, a == null || a.destroy(), a = null, e.innerHTML = "", e.classList.remove("dd-flow-graph-mount");
    }
  };
}
const ad = ".dd-flow-graph:not([data-dd-flow-mounted])";
async function ld(e = document) {
  const t = Array.from(e.querySelectorAll(ad));
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
        dd(n, r, { style: n.getAttribute("data-style") ?? void 0, hint: s ?? void 0 });
      } catch (r) {
        console.error("dd-flow: failed to mount graph", r), n.textContent = "dd-flow: failed to mount graph (see console)";
      }
    })
  );
}
const Rd = () => ({ nodes: {}, edges: {} }), cd = [
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
function fd(e) {
  const t = document.createElement("div");
  t.className = "dd-flow-inspector", t.hidden = !0, e.appendChild(t);
  let n = !1;
  function o(u) {
    const g = t.offsetWidth || 260, C = t.offsetHeight || 200;
    let E = u.right + 12;
    E + g > window.innerWidth && (E = u.left - 12 - g), E < 12 && (E = Math.min(u.left, window.innerWidth - g - 12)), E = Math.max(12, Math.min(E, window.innerWidth - g - 12));
    let w = u.top;
    return w = Math.max(12, Math.min(w, window.innerHeight - C - 12)), { left: E, top: w };
  }
  function r(u) {
    const { left: p, top: g } = o(u);
    t.style.left = `${p}px`, t.style.top = `${g}px`;
  }
  function s(u, p) {
    const g = document.createElement("div");
    g.className = "dd-flow-inspector-field";
    const C = document.createElement("label");
    return C.textContent = u, g.appendChild(C), g.appendChild(p), g;
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
    const g = document.createElement("input");
    g.type = "text", g.value = u.label, g.addEventListener("input", () => p.onLabelChange(g.value)), t.appendChild(s("Label", g));
    const C = document.createElement("textarea");
    C.rows = 2, C.value = u.note ?? "", C.addEventListener("input", () => p.onNoteChange(C.value)), t.appendChild(s("Note", C));
    const E = document.createElement("div");
    E.className = "dd-flow-type-grid";
    for (const w of cd) {
      const y = document.createElement("button");
      y.type = "button", y.className = `dd-flow-type-swatch${w === u.type ? " is-active" : ""}`, y.title = w, y.setAttribute("aria-label", w);
      const x = O("svg", { viewBox: "-32 -22 64 44", width: 48, height: 33 });
      x.appendChild(jt(w, 56, 36)), y.appendChild(x), y.addEventListener("click", () => p.onTypeChange(w)), E.appendChild(y);
    }
    if (t.appendChild(s("Type", E)), u.subflow) {
      const w = document.createElement("div");
      w.className = "dd-flow-inspector-subflow-row";
      const y = document.createElement("span");
      if (y.textContent = `Opens subflow: ${u.subflow}`, w.appendChild(y), p.onGotoSubflow) {
        const x = document.createElement("button");
        x.type = "button", x.className = "dd-flow-btn", x.textContent = "Open", x.addEventListener("click", p.onGotoSubflow), w.appendChild(x);
      }
      t.appendChild(w);
    }
    t.appendChild(i(p.onDelete));
  }
  function a(u, p, g, C) {
    const E = document.createElement("div");
    E.className = "dd-flow-inspector-radios";
    for (const w of p) {
      const y = `dd-flow-${u}-${w}`, x = document.createElement("input");
      x.type = "radio", x.name = `dd-flow-${u}`, x.id = y, x.checked = w === g, x.addEventListener("change", () => C(w));
      const b = document.createElement("label");
      b.htmlFor = y, b.textContent = w, E.appendChild(x), E.appendChild(b);
    }
    return E;
  }
  function c(u, p) {
    t.innerHTML = "", t.appendChild(d());
    const g = document.createElement("input");
    g.type = "text", g.value = u.label ?? "", g.addEventListener("input", () => p.onLabelChange(g.value)), t.appendChild(s("Label", g));
    const { routing: C, stroke: E, kind: w } = ze(u);
    t.appendChild(
      s(
        "Routing",
        a("routing", ["orthogonal", "straight", "curved"], C, p.onRoutingChange)
      )
    ), t.appendChild(
      s("Stroke", a("stroke", ["solid", "dashed", "dotted"], E, p.onStrokeChange))
    ), t.appendChild(
      s("Kind", a("kind", ["default", "conditional"], w, p.onKindChange))
    );
    const y = document.createElement("p");
    y.className = "dd-flow-inspector-hint", y.textContent = "Changing routing clears any hand-dragged route for this connector.", t.appendChild(y), t.appendChild(i(p.onDelete));
  }
  function f(u, p, g) {
    t.innerHTML = "", t.appendChild(d());
    const C = document.createElement("p");
    C.className = "dd-flow-inspector-hint", C.textContent = u, t.appendChild(C);
    const E = document.createElement("input");
    E.type = "text", E.value = p;
    const w = () => {
      const k = E.value.trim();
      k && g(k), h();
    };
    E.addEventListener("keydown", (k) => {
      k.key === "Enter" && w();
    }), t.appendChild(s("Name", E));
    const y = document.createElement("div");
    y.className = "dd-flow-inspector-actions";
    const x = document.createElement("button");
    x.type = "button", x.className = "dd-flow-btn", x.textContent = "Cancel", x.addEventListener("click", h);
    const b = document.createElement("button");
    b.type = "button", b.className = "dd-flow-btn is-active", b.textContent = "Create", b.addEventListener("click", w), y.appendChild(x), y.appendChild(b), t.appendChild(y), requestAnimationFrame(() => {
      E.focus(), E.select();
    });
  }
  function h() {
    n = !1, t.hidden = !0, t.innerHTML = "";
  }
  return {
    get isOpen() {
      return n;
    },
    showNode(u, p, g, C) {
      if (l(u, g), t.hidden = !1, n = !0, r(p), C != null && C.focusLabel) {
        const E = t.querySelector('input[type="text"]');
        E == null || E.focus(), E == null || E.select();
      }
    },
    showEdge(u, p, g) {
      c(u, g), t.hidden = !1, n = !0, r(p);
    },
    showPrompt(u, p, g, C) {
      f(u, g, C), t.hidden = !1, n = !0, r(p);
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
const ud = 4;
function hd(e, t, n, o = {}) {
  let r = null;
  const s = (c, f, h) => {
    const u = c.createSVGPoint();
    u.x = f, u.y = h;
    const p = c.getScreenCTM();
    if (!p) return { x: f, y: h };
    const g = u.matrixTransform(p.inverse());
    return { x: g.x, y: g.y };
  }, i = () => e.querySelector("svg.dd-flow-svg"), d = (c) => {
    var w, y, x, b, k;
    const f = i();
    if (!f) return;
    const h = c.target, u = s(f, c.clientX, c.clientY), p = (w = h.closest) == null ? void 0 : w.call(h, ".dd-flow-node");
    if (p) {
      const $ = p.getAttribute("data-node-id"), j = t.nodes.find((T) => T.id === $);
      if (!j) return;
      const A = (y = h.closest) == null ? void 0 : y.call(h, ".dd-flow-node-row"), L = (A == null ? void 0 : A.getAttribute("data-row-id")) ?? null;
      r = {
        node: j,
        edgeId: null,
        rowId: L,
        startX: u.x,
        startY: u.y,
        nodeStartX: j.x,
        nodeStartY: j.y,
        moved: !1,
        shiftKey: c.shiftKey
      }, (x = e.setPointerCapture) == null || x.call(e, c.pointerId);
      return;
    }
    const g = (b = h.closest) == null ? void 0 : b.call(h, ".dd-flow-edge-hit"), C = g == null ? void 0 : g.closest(".dd-flow-edge");
    r = {
      node: null,
      edgeId: (C == null ? void 0 : C.getAttribute("data-edge-id")) ?? null,
      rowId: null,
      startX: u.x,
      startY: u.y,
      nodeStartX: 0,
      nodeStartY: 0,
      moved: !1,
      shiftKey: c.shiftKey
    }, (k = e.setPointerCapture) == null || k.call(e, c.pointerId);
  }, l = (c) => {
    if (!r || !r.node) return;
    const f = i();
    if (!f) return;
    const h = s(f, c.clientX, c.clientY), u = h.x - r.startX, p = h.y - r.startY;
    e.classList.contains("dd-flow-editing") && (!r.moved && Math.hypot(u, p) < ud || (r.moved = !0, r.node.x = r.nodeStartX + u, r.node.y = r.nodeStartY + p, n()));
  }, a = () => {
    var E, w, y, x, b;
    if (!r) return;
    const { node: c, edgeId: f, rowId: h, moved: u, shiftKey: p, startX: g, startY: C } = r;
    r = null, c ? u ? (E = o.onNodeMoved) == null || E.call(o, c.id) : h ? (w = o.onRowClick) == null || w.call(o, c.id, h, { shiftKey: p }) : (y = o.onNodeClick) == null || y.call(o, c.id, { shiftKey: p }) : f ? (x = o.onEdgeClick) == null || x.call(o, f, { shiftKey: p }) : e.dataset[ie] || (b = o.onBackgroundClick) == null || b.call(o, { x: g, y: C }, { shiftKey: p });
  };
  return e.addEventListener("pointerdown", d), e.addEventListener("pointermove", l), e.addEventListener("pointerup", a), e.addEventListener("pointercancel", a), {
    destroy() {
      e.removeEventListener("pointerdown", d), e.removeEventListener("pointermove", l), e.removeEventListener("pointerup", a), e.removeEventListener("pointercancel", a);
    }
  };
}
function pd(e, t) {
  return { ...e, nodes: [...e.nodes, t] };
}
function wd(e, t) {
  return {
    ...e,
    nodes: e.nodes.filter((n) => n.id !== t),
    edges: e.edges.filter((n) => n.from !== t && n.to !== t)
  };
}
function md(e, t) {
  return { ...e, edges: e.edges.filter((n) => n.id !== t) };
}
function Ge(e, t, n) {
  return { ...e, nodes: e.nodes.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function ve(e, t, n) {
  return { ...e, edges: e.edges.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function He(e, t, n) {
  const o = t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || e;
  if (!n.has(o)) return o;
  let r = 2;
  for (; n.has(`${o}-${r}`); ) r++;
  return `${o}-${r}`;
}
function gd(e) {
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
  const c = new Set(t.nodes.map((L) => L.id));
  if (c.has(i) && !a.has(i))
    throw new Error(`extractSubflow: placeholder id "${i}" collides with an existing node.`);
  for (const L of a)
    if (!c.has(L)) throw new Error(`extractSubflow: selected node "${L}" not found in spec.`);
  const f = [], h = [], u = [], p = [];
  for (const L of t.edges) {
    const T = a.has(L.from), B = a.has(L.to);
    T && B ? f.push(L) : !T && B ? h.push(L) : T && !B ? u.push(L) : p.push(L);
  }
  const g = {
    id: s,
    title: d,
    style: t.style,
    direction: t.direction,
    nodes: t.nodes.filter((L) => a.has(L.id)),
    edges: f
  }, C = {
    id: i,
    label: d,
    type: "subprocess",
    subflow: s
  }, E = h.map((L) => ({ ...L, to: i })), w = u.map((L) => ({ ...L, from: i })), y = {
    ...t,
    nodes: [...t.nodes.filter((L) => !a.has(L.id)), C],
    edges: [...p, ...E, ...w]
  }, x = new Set(r), b = new Set(f.map((L) => L.id)), k = new Set([...E, ...w].map((L) => L.id)), $ = {};
  for (const [L, T] of Object.entries(n.nodes))
    x.has(L) || ($[L] = T);
  const j = {};
  for (const [L, T] of Object.entries(n.edges))
    !b.has(L) && !k.has(L) && (j[L] = T);
  const A = bd(r, o);
  return A && ($[i] = A), {
    parent: { spec: y, layout: { nodes: $, edges: j } },
    subflow: { spec: g }
  };
}
function bd(e, t) {
  const n = e.map((s) => t[s]).filter((s) => !!s);
  if (!n.length) return null;
  const o = n.reduce((s, i) => s + i.x, 0) / n.length, r = n.reduce((s, i) => s + i.y, 0) / n.length;
  return { x: o, y: r };
}
const hn = "http://127.0.0.1:5311";
let Ot = !1;
function yd() {
  return Ot ? Promise.resolve(!0) : fetch(`${hn}/health`).then((e) => (e.ok && (Ot = !0), e.ok)).catch(() => !1);
}
async function vd(e, t, n) {
  const r = { layoutPath: e.layout ?? e.spec.replace(/\.flow\.json$/, ".layout.json"), layout: n };
  t && (r.specPath = e.spec, r.spec = t);
  try {
    return (await fetch(`${hn}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(r)
    })).ok;
  } catch {
    return !1;
  }
}
let J = null;
function Ue(e, t, n) {
  const { nodes: o, edges: r, orphanedNodeIds: s, orphanedEdgeIds: i } = Le(t, n);
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
function Ed(e, t, n = {}) {
  e.classList.add("dd-flow-embed", "dd-flow-inline"), le(e, t.main.style);
  const o = Ue(t.main.id, t.main, t.mainLayout), r = et(o.nodes, o.edges);
  e.appendChild(r);
  const s = () => Od(t, n);
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
const xd = ".dd-flow-embed[data-flow]:not([data-dd-flow-mounted])";
async function kd(e = document) {
  const t = Array.from(e.querySelectorAll(xd));
  await Promise.all(
    t.map(async (n) => {
      n.setAttribute("data-dd-flow-mounted", "1");
      const o = n.getAttribute("data-flow");
      if (o)
        try {
          const r = await fetch(o);
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          const s = await r.json();
          Ed(n, s);
        } catch (r) {
          console.error(`dd-flow: failed to load flow from "${o}"`, r), n.textContent = `dd-flow: failed to load "${o}" (see console)`;
        }
    })
  );
}
let G = null;
const Cd = 3;
function Ld() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
function _d(e) {
  var o, r;
  if (!Ld()) return;
  const t = e.webkitRequestFullscreen, n = ((o = e.requestFullscreen) == null ? void 0 : o.bind(e)) ?? (t == null ? void 0 : t.bind(e));
  (r = n == null ? void 0 : n()) == null || r.catch(() => {
  });
}
function Sd(e) {
  document.fullscreenElement === e && document.exitFullscreen().catch(() => {
  });
}
function Nd() {
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
    inspector: fd(e)
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
  G && (Sd(G.root), G.root.hidden = !0, G.stage.innerHTML = "", G.inspector.hide(), document.body.classList.remove("dd-flow-lightbox-open"), J = null);
}
function Id(e) {
  const t = Math.min(...e.map((s) => s.left)), n = Math.min(...e.map((s) => s.top)), o = Math.max(...e.map((s) => s.right)), r = Math.max(...e.map((s) => s.bottom));
  return new DOMRect(t, n, o - t, r - n);
}
function Od(e, t) {
  var Q, me;
  const n = Nd();
  n.root.hidden = !1, document.body.classList.add("dd-flow-lightbox-open"), _d(n.root), n.toolbar.hidden = !0, n.menuBtn.setAttribute("aria-expanded", "false"), n.menuBtn.classList.remove("is-active"), n.authoringEl.hidden = !0;
  const o = [Ue(e.main.id, e.main, e.mainLayout)];
  let r = !1, s = /* @__PURE__ */ new Set(), i = null, d = null, l = !1, a = !1;
  function c() {
    a || !e.sources || yd().then((m) => {
      !m || n.root.hidden || (a = !0, n.authoringEl.hidden = !1, T(), n.addShapeBtn.disabled = !r);
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
  function g(m) {
    return Array.from(f.querySelectorAll(".dd-flow-node")).find(
      (v) => v.getAttribute("data-node-id") === m
    ) ?? null;
  }
  function C(m) {
    return Array.from(f.querySelectorAll(".dd-flow-edge")).find(
      (v) => v.getAttribute("data-edge-id") === m
    ) ?? null;
  }
  function E(m, v = {}) {
    const _ = u(), M = De(_.nodes, _.edges);
    if (v.resizeNodeId) {
      const R = M.nodes[v.resizeNodeId];
      R && (M.nodes[v.resizeNodeId] = { x: R.x, y: R.y });
    }
    v.clearEdgePoints && delete M.edges[v.clearEdgePoints], v.setNodePosition && (M.nodes[v.setNodePosition.id] = v.setNodePosition.point), _.spec = m(_.spec);
    const S = Le(_.spec, M);
    _.nodes = S.nodes, _.edges = S.edges, _.orphanedNodeIds = S.orphanedNodeIds, _.orphanedEdgeIds = S.orphanedEdgeIds, _.dirty = !0, _.specDirty = !0, p(), n.saveBtn.disabled = !1, A();
  }
  function w(m) {
    var M;
    const v = u().spec.nodes.find((S) => S.id === m), _ = v == null ? void 0 : v.subflow;
    return {
      onLabelChange: (S) => {
        E((Y) => Ge(Y, m, { label: S }), { resizeNodeId: m });
        const R = g(m);
        R && n.inspector.refreshAnchor(R.getBoundingClientRect());
      },
      onNoteChange: (S) => E((R) => Ge(R, m, { note: S })),
      onTypeChange: (S) => {
        E((R) => Ge(R, m, { type: S }), { resizeNodeId: m }), x();
      },
      onDelete: () => {
        E((R) => wd(R, m));
        const S = new Set(s);
        S.delete(m), b(S, null);
      },
      onGotoSubflow: _ && ((M = e.subflows) != null && M[_]) ? () => k(_) : void 0
    };
  }
  function y(m) {
    return {
      onLabelChange: (v) => E((_) => ve(_, m, { label: v })),
      onRoutingChange: (v) => E((_) => ve(_, m, { routing: v }), { clearEdgePoints: m }),
      onStrokeChange: (v) => E((_) => ve(_, m, { stroke: v })),
      onKindChange: (v) => E((_) => ve(_, m, { kind: v })),
      onDelete: () => {
        E((v) => md(v, m)), b(/* @__PURE__ */ new Set(), null);
      }
    };
  }
  function x(m = {}) {
    if (!r || !a) {
      n.inspector.hide();
      return;
    }
    if (s.size === 1 && !i) {
      const v = [...s][0], _ = u().spec.nodes.find((S) => S.id === v), M = g(v);
      if (_ && M) {
        n.inspector.showNode(_, M.getBoundingClientRect(), w(v), m);
        return;
      }
    }
    if (i) {
      const v = u().spec.edges.find((M) => M.id === i), _ = C(i);
      if (v && _) {
        n.inspector.showEdge(v, _.getBoundingClientRect(), y(i));
        return;
      }
    }
    n.inspector.hide();
  }
  function b(m, v, _ = {}) {
    s = m, i = v, d = _.rowKey ?? null, T(), A(), x({ focusLabel: _.focusLabel }), z(f, q.selectionChange, {
      flowId: u().flowId,
      selectedNodeIds: [...s],
      selectedEdgeId: i
    });
  }
  J = {
    bundle: e,
    getSelection: () => ({ nodeIds: [...s], edgeId: i }),
    setSelection: b
  };
  function k(m) {
    var M;
    const v = (M = e.subflows) == null ? void 0 : M[m];
    if (!v) return;
    const _ = u().flowId;
    o.push(Ue(m, v.spec, v.layout)), p(), le(n.root, v.spec.style ?? e.main.style), B(), b(/* @__PURE__ */ new Set(), null), z(f, q.subflowOpen, { flowId: _, subflowId: m });
  }
  const $ = hd(f, h, A, {
    onNodeClick: (m, v) => {
      var M;
      const _ = u().nodes.find((S) => S.id === m);
      if (_) {
        if (z(f, q.nodeClick, {
          flowId: u().flowId,
          nodeId: m,
          shiftKey: v.shiftKey
        }), r) {
          let S;
          v.shiftKey ? (S = new Set(s), S.has(m) ? S.delete(m) : S.add(m)) : S = s.size === 1 && s.has(m) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([m]), b(S, null);
          return;
        }
        _.subflow && ((M = e.subflows) != null && M[_.subflow]) && k(_.subflow);
      }
    },
    onNodeMoved: (m) => {
      b(/* @__PURE__ */ new Set([m]), null), u().dirty = !0, n.saveBtn.disabled = !1;
    },
    onRowClick: (m, v, _) => {
      if (z(f, q.rowClick, {
        flowId: u().flowId,
        nodeId: m,
        rowId: v,
        shiftKey: _.shiftKey
      }), !r) return;
      const M = (d == null ? void 0 : d.nodeId) === m && (d == null ? void 0 : d.rowId) === v;
      b(/* @__PURE__ */ new Set(), null, { rowKey: M ? null : { nodeId: m, rowId: v } });
    },
    onEdgeClick: (m, v) => {
      z(f, q.edgeClick, {
        flowId: u().flowId,
        edgeId: m,
        shiftKey: v.shiftKey
      }), r && b(/* @__PURE__ */ new Set(), i === m ? null : m);
    },
    onBackgroundClick: (m, v) => {
      if (z(f, q.backgroundClick, {
        flowId: u().flowId,
        point: m,
        shiftKey: v.shiftKey
      }), !!r) {
        if (l) {
          const _ = new Set(u().spec.nodes.map((S) => S.id)), M = He("step", "New step", _);
          E((S) => pd(S, { id: M, label: "New step", type: "process" }), {
            setNodePosition: { id: M, point: m }
          }), l = !1, f.classList.remove("dd-flow-placing"), n.addShapeBtn.classList.remove("is-active"), b(/* @__PURE__ */ new Set([M]), null, { focusLabel: !0 });
          return;
        }
        b(/* @__PURE__ */ new Set(), null);
      }
    }
  });
  let j = null;
  function A() {
    const m = u(), v = et(m.nodes, m.edges, { selectedNodeIds: s, selectedEdgeId: i, selectedRowKey: d }), _ = f.querySelector("svg.dd-flow-svg");
    _ ? f.replaceChild(v, _) : f.appendChild(v);
    const M = j == null ? void 0 : j.state();
    j == null || j.destroy(), j = fn(f, v, { maxFitScale: Cd, initial: M });
  }
  function L() {
    j == null || j.reset();
  }
  function T() {
    const m = s.size;
    n.makeSubflowBtn.disabled = !r || !a || m < 2, n.makeSubflowBtn.textContent = m >= 2 ? `Make subflow (${m})` : "Make subflow";
  }
  function B() {
    n.breadcrumbEl.innerHTML = "", n.breadcrumbEl.hidden = o.length < 2, o.forEach((M, S) => {
      if (S > 0) {
        const Y = document.createElement("span");
        Y.className = "dd-flow-breadcrumb-sep", Y.textContent = "›", n.breadcrumbEl.appendChild(Y);
      }
      const R = document.createElement(S === o.length - 1 ? "span" : "button");
      R.className = "dd-flow-breadcrumb-item", R.textContent = M.title, S !== o.length - 1 && (R.type = "button", R.addEventListener("click", () => {
        o.length = S + 1, p(), le(n.root, u().spec.style ?? e.main.style), B(), b(/* @__PURE__ */ new Set(), null);
      })), n.breadcrumbEl.appendChild(R);
    }), n.saveBtn.disabled = !(u().dirty || u().specDirty), n.editBtn.textContent = r ? "Done editing" : "Edit layout", n.editBtn.classList.toggle("is-active", r), n.addShapeBtn.disabled = !r || !a;
    const { orphanedNodeIds: m, orphanedEdgeIds: v } = u(), _ = m.length + v.length;
    if (_ > 0) {
      const M = [...m, ...v].join(", ");
      n.warningBanner.textContent = `⚠ The saved layout has ${_} position(s) that no longer match this flow (${M}) — they were dropped. This usually means the flow was regenerated with different node/edge ids.`, n.warningBanner.hidden = !1;
    } else
      n.warningBanner.hidden = !0;
  }
  const ce = () => {
    r = !r, f.classList.toggle("dd-flow-editing", r), n.editBtn.textContent = r ? "Done editing" : "Edit layout", n.editBtn.classList.toggle("is-active", r), r && c(), n.addShapeBtn.disabled = !r || !a, r ? (T(), A(), x()) : (l = !1, f.classList.remove("dd-flow-placing"), n.addShapeBtn.classList.remove("is-active"), b(/* @__PURE__ */ new Set(), null));
  }, fe = () => {
    !r || !a || (l = !l, f.classList.toggle("dd-flow-placing", l), n.addShapeBtn.classList.toggle("is-active", l));
  }, ue = () => {
    if (!r || !a || s.size < 2) return;
    const m = [...s], v = m.map((M) => g(M)).filter((M) => M !== null);
    if (!v.length) return;
    const _ = Id(v.map((M) => M.getBoundingClientRect()));
    n.inspector.showPrompt("Name the new subflow", _, "Subflow", (M) => {
      const S = u(), R = new Set(Object.keys(e.subflows ?? {})), Y = new Set(S.spec.nodes.map((W) => W.id)), ne = He("subflow", M, R), I = He(ne, M, Y), N = {};
      for (const W of S.nodes) N[W.id] = { x: W.x, y: W.y };
      let P;
      try {
        P = gd({
          spec: S.spec,
          layout: De(S.nodes, S.edges),
          nodePositions: N,
          selectedNodeIds: m,
          newSubflowId: ne,
          placeholderNodeId: I,
          placeholderLabel: M,
          existingSubflowIds: R
        });
      } catch (W) {
        console.error("dd-flow: could not extract subflow", W);
        return;
      }
      S.spec = P.parent.spec;
      const H = Le(S.spec, P.parent.layout);
      S.nodes = H.nodes, S.edges = H.edges, S.orphanedNodeIds = H.orphanedNodeIds, S.orphanedEdgeIds = H.orphanedEdgeIds, S.dirty = !0, S.specDirty = !0, e.subflows || (e.subflows = {}), e.subflows[ne] = { spec: P.subflow.spec, layout: void 0 }, p(), n.saveBtn.disabled = !1, B(), b(/* @__PURE__ */ new Set([I]), null);
    });
  }, he = async () => {
    var R;
    const m = u(), v = De(m.nodes, m.edges), _ = m.specDirty, M = t.onSaveLayout || t.onSaveSpec, S = a ? (R = e.sources) == null ? void 0 : R[m.flowId] : void 0;
    if (!M && S && await vd(S, _ ? m.spec : null, v)) {
      m.dirty = !1, m.specDirty = !1, n.saveBtn.disabled = !0;
      return;
    }
    t.onSaveLayout ? t.onSaveLayout(m.flowId, v) : mn(m.flowId, v), _ && (t.onSaveSpec ? t.onSaveSpec(m.flowId, m.spec) : gn(m.flowId, m.spec)), m.dirty = !1, m.specDirty = !1, n.saveBtn.disabled = !0;
  }, pe = () => {
    const m = f.querySelector("svg.dd-flow-svg");
    m && vn(m, f, `${u().flowId}.svg`);
  }, we = () => {
    const m = f.querySelector("svg.dd-flow-svg");
    m && En(m, f, `${u().flowId}.png`);
  };
  n.editBtn.onclick = ce, n.addShapeBtn.onclick = fe, n.makeSubflowBtn.onclick = ue, n.saveBtn.onclick = he, n.fitBtn.onclick = L, n.root.querySelector(".dd-flow-export-svg-btn").onclick = pe, n.root.querySelector(".dd-flow-export-png-btn").onclick = we, r = !1, s = /* @__PURE__ */ new Set(), i = null, d = null, l = !1, f.classList.remove("dd-flow-editing", "dd-flow-placing"), B(), T(), A(), x(), (me = (Q = n.root._interactions) == null ? void 0 : Q.destroy) == null || me.call(Q), n.root._interactions = $;
}
if (typeof document < "u") {
  const e = () => {
    kd(), ld();
  }, t = globalThis.document$;
  t ? t.subscribe(e) : document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e();
}
export {
  q as DD_FLOW_EVENTS,
  Fe as DEFAULT_THEME,
  Se as THEMES,
  le as applyTheme,
  On as attachRelationHighlight,
  fn as attachViewport,
  kd as autoMountFlows,
  ld as autoMountGraphs,
  xe as buildGraphIndex,
  ee as collectClosure,
  Le as computeLayout,
  z as dispatchFlowEvent,
  Ne as downloadBlob,
  mn as downloadLayout,
  En as downloadPng,
  vn as downloadSvg,
  Rd as emptyLayout,
  nd as layoutLayered,
  Ed as mountFlow,
  dd as mountGraph,
  Pi as paintLevels,
  ge as paintRelations,
  Me as paintRowRelations,
  Td as registerTheme,
  et as renderSvg,
  Hi as routeEdge,
  De as toLayout
};
