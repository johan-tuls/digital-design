var an = Object.defineProperty;
var ln = (e, t, n) => t in e ? an(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var A = (e, t, n) => ln(e, typeof t != "symbol" ? t + "" : t, n);
const md = () => ({ nodes: {}, edges: {} });
function cn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var fn = "\0", Q = "\0", Xe = "";
let un = class {
  constructor(t) {
    A(this, "_isDirected", !0);
    A(this, "_isMultigraph", !1);
    A(this, "_isCompound", !1);
    // Label for the graph itself
    A(this, "_label");
    // Defaults to be set when creating a new node
    A(this, "_defaultNodeLabelFn", () => {
    });
    // Defaults to be set when creating a new edge
    A(this, "_defaultEdgeLabelFn", () => {
    });
    // v -> label
    A(this, "_nodes", {});
    // v -> edgeObj
    A(this, "_in", {});
    // u -> v -> Number
    A(this, "_preds", {});
    // v -> edgeObj
    A(this, "_out", {});
    // v -> w -> Number
    A(this, "_sucs", {});
    // e -> edgeObj
    A(this, "_edgeObjs", {});
    // e -> label
    A(this, "_edgeLabels", {});
    /* Number of nodes in the graph. Should only be changed by the implementation. */
    A(this, "_nodeCount", 0);
    /* Number of edges in the graph. Should only be changed by the implementation. */
    A(this, "_edgeCount", 0);
    A(this, "_parent");
    A(this, "_children");
    t && (this._isDirected = Object.hasOwn(t, "directed") ? t.directed : !0, this._isMultigraph = Object.hasOwn(t, "multigraph") ? t.multigraph : !1, this._isCompound = Object.hasOwn(t, "compound") ? t.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[Q] = {});
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
    return Object.hasOwn(this._nodes, t) ? (arguments.length > 1 && (this._nodes[t] = n), this) : (this._nodes[t] = arguments.length > 1 ? n : this._defaultNodeLabelFn(t), this._isCompound && (this._parent[t] = Q, this._children[t] = {}, this._children[Q][t] = !0), this._in[t] = {}, this._preds[t] = {}, this._out[t] = {}, this._sucs[t] = {}, ++this._nodeCount, this);
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
      n = Q;
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
      if (n !== Q)
        return n;
    }
  }
  /**
   * Gets list of direct children of node v.
   * Complexity: O(1).
   */
  children(t = Q) {
    if (this._isCompound) {
      var n = this._children[t];
      if (n)
        return Object.keys(n);
    } else {
      if (t === Q)
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
    var d = oe(this._isDirected, t, n, o);
    if (Object.hasOwn(this._edgeLabels, d))
      return s && (this._edgeLabels[d] = r), this;
    if (o !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[d] = s ? r : this._defaultEdgeLabelFn(t, n, o);
    var l = hn(this._isDirected, t, n, o);
    return t = l.v, n = l.w, Object.freeze(l), this._edgeObjs[d] = l, Je(this._preds[n], t), Je(this._sucs[t], n), this._in[n][d] = l, this._out[t][d] = l, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, o) {
    var r = arguments.length === 1 ? Ce(this._isDirected, arguments[0]) : oe(this._isDirected, t, n, o);
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
    var r = arguments.length === 1 ? Ce(this._isDirected, arguments[0]) : oe(this._isDirected, t, n, o);
    return Object.hasOwn(this._edgeLabels, r);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, o) {
    var r = arguments.length === 1 ? Ce(this._isDirected, arguments[0]) : oe(this._isDirected, t, n, o), s = this._edgeObjs[r];
    return s && (t = s.v, n = s.w, delete this._edgeLabels[r], delete this._edgeObjs[r], Qe(this._preds[n], t), Qe(this._sucs[t], n), delete this._in[n][r], delete this._out[t][r], this._edgeCount--), this;
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
function Je(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function Qe(e, t) {
  --e[t] || delete e[t];
}
function oe(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  return r + Xe + s + Xe + (o === void 0 ? fn : o);
}
function hn(e, t, n, o) {
  var r = "" + t, s = "" + n;
  if (!e && r > s) {
    var i = r;
    r = s, s = i;
  }
  var d = { v: r, w: s };
  return o && (d.name = o), d;
}
function Ce(e, t) {
  return oe(e, t.v, t.w, t.name);
}
var He = un, pn = "2.2.4", wn = {
  Graph: He,
  version: pn
}, mn = He, gn = {
  write: bn,
  read: En
};
function bn(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: yn(e),
    edges: vn(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function yn(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), o = e.parent(t), r = { v: t };
    return n !== void 0 && (r.value = n), o !== void 0 && (r.parent = o), r;
  });
}
function vn(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), o = { v: t.v, w: t.w };
    return t.name !== void 0 && (o.name = t.name), n !== void 0 && (o.value = n), o;
  });
}
function En(e) {
  var t = new mn(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var xn = kn;
function kn(e) {
  var t = {}, n = [], o;
  function r(s) {
    Object.hasOwn(t, s) || (t[s] = !0, o.push(s), e.successors(s).forEach(r), e.predecessors(s).forEach(r));
  }
  return e.nodes().forEach(function(s) {
    o = [], r(s), o.length && n.push(o);
  }), n;
}
let Cn = class {
  constructor() {
    A(this, "_arr", []);
    A(this, "_keyIndices", {});
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
var _t = Cn, _n = _t, Lt = Nn, Ln = () => 1;
function Nn(e, t, n, o) {
  return Sn(
    e,
    String(t),
    n || Ln,
    o || function(r) {
      return e.outEdges(r);
    }
  );
}
function Sn(e, t, n, o) {
  var r = {}, s = new _n(), i, d, l = function(a) {
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
var In = Lt, On = Mn;
function Mn(e, t, n) {
  return e.nodes().reduce(function(o, r) {
    return o[r] = In(e, r, t, n), o;
  }, {});
}
var Nt = $n;
function $n(e) {
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
var jn = Nt, Rn = Tn;
function Tn(e) {
  return jn(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var An = Bn, Pn = () => 1;
function Bn(e, t, n) {
  return Dn(
    e,
    t || Pn,
    n || function(o) {
      return e.outEdges(o);
    }
  );
}
function Dn(e, t, n) {
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
function St(e) {
  var t = {}, n = {}, o = [];
  function r(s) {
    if (Object.hasOwn(n, s))
      throw new Te();
    Object.hasOwn(t, s) || (n[s] = !0, t[s] = !0, e.predecessors(s).forEach(r), delete n[s], o.push(s));
  }
  if (e.sinks().forEach(r), Object.keys(t).length !== e.nodeCount())
    throw new Te();
  return o;
}
class Te extends Error {
  constructor() {
    super(...arguments);
  }
}
var It = St;
St.CycleException = Te;
var Ze = It, Gn = Fn;
function Fn(e) {
  try {
    Ze(e);
  } catch (t) {
    if (t instanceof Ze.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var Ot = Hn;
function Hn(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var o = e.isDirected() ? (d) => e.successors(d) : (d) => e.neighbors(d), r = n === "post" ? Vn : Wn, s = [], i = {};
  return t.forEach((d) => {
    if (!e.hasNode(d))
      throw new Error("Graph does not have node: " + d);
    r(d, o, i, s);
  }), s;
}
function Vn(e, t, n, o) {
  for (var r = [[e, !1]]; r.length > 0; ) {
    var s = r.pop();
    s[1] ? o.push(s[0]) : Object.hasOwn(n, s[0]) || (n[s[0]] = !0, r.push([s[0], !0]), Mt(t(s[0]), (i) => r.push([i, !1])));
  }
}
function Wn(e, t, n, o) {
  for (var r = [e]; r.length > 0; ) {
    var s = r.pop();
    Object.hasOwn(n, s) || (n[s] = !0, o.push(s), Mt(t(s), (i) => r.push(i)));
  }
}
function Mt(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var zn = Ot, Yn = qn;
function qn(e, t) {
  return zn(e, t, "post");
}
var Un = Ot, Kn = Xn;
function Xn(e, t) {
  return Un(e, t, "pre");
}
var Jn = He, Qn = _t, Zn = eo;
function eo(e, t) {
  var n = new Jn(), o = {}, r = new Qn(), s;
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
var to = {
  components: xn,
  dijkstra: Lt,
  dijkstraAll: On,
  findCycles: Rn,
  floydWarshall: An,
  isAcyclic: Gn,
  postorder: Yn,
  preorder: Kn,
  prim: Zn,
  tarjan: Nt,
  topsort: It
}, et = wn, W = {
  Graph: et.Graph,
  json: gn,
  alg: to,
  version: et.version
};
let no = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return tt(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && tt(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, o = n._prev;
    for (; o !== n; )
      t.push(JSON.stringify(o, oo)), o = o._prev;
    return "[" + t.join(", ") + "]";
  }
};
function tt(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function oo(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var ro = no;
let so = W.Graph, io = ro;
var ao = co;
let lo = () => 1;
function co(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = uo(e, t || lo);
  return fo(n.graph, n.buckets, n.zeroIdx).flatMap((r) => e.outEdges(r.v, r.w));
}
function fo(e, t, n) {
  let o = [], r = t[t.length - 1], s = t[0], i;
  for (; e.nodeCount(); ) {
    for (; i = s.dequeue(); )
      _e(e, t, n, i);
    for (; i = r.dequeue(); )
      _e(e, t, n, i);
    if (e.nodeCount()) {
      for (let d = t.length - 2; d > 0; --d)
        if (i = t[d].dequeue(), i) {
          o = o.concat(_e(e, t, n, i, !0));
          break;
        }
    }
  }
  return o;
}
function _e(e, t, n, o, r) {
  let s = r ? [] : void 0;
  return e.inEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = e.node(i.v);
    r && s.push({ v: i.v, w: i.w }), l.out -= d, Ae(t, n, l);
  }), e.outEdges(o.v).forEach((i) => {
    let d = e.edge(i), l = i.w, a = e.node(l);
    a.in -= d, Ae(t, n, a);
  }), e.removeNode(o.v), s;
}
function uo(e, t) {
  let n = new so(), o = 0, r = 0;
  e.nodes().forEach((d) => {
    n.setNode(d, { v: d, in: 0, out: 0 });
  }), e.edges().forEach((d) => {
    let l = n.edge(d.v, d.w) || 0, a = t(d), c = l + a;
    n.setEdge(d.v, d.w, c), r = Math.max(r, n.node(d.v).out += a), o = Math.max(o, n.node(d.w).in += a);
  });
  let s = ho(r + o + 3).map(() => new io()), i = o + 1;
  return n.nodes().forEach((d) => {
    Ae(s, i, n.node(d));
  }), { graph: n, buckets: s, zeroIdx: i };
}
function Ae(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function ho(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let $t = W.Graph;
var P = {
  addBorderNode: xo,
  addDummyNode: jt,
  applyWithChunking: ve,
  asNonCompoundGraph: wo,
  buildLayerMatrix: yo,
  intersectRect: bo,
  mapValues: Io,
  maxRank: Tt,
  normalizeRanks: vo,
  notime: Lo,
  partition: Co,
  pick: So,
  predecessorWeights: go,
  range: Pt,
  removeEmptyRanks: Eo,
  simplify: po,
  successorWeights: mo,
  time: _o,
  uniqueId: At,
  zipObject: Ve
};
function jt(e, t, n, o) {
  for (var r = o; e.hasNode(r); )
    r = At(o);
  return n.dummy = t, e.setNode(r, n), r;
}
function po(e) {
  let t = new $t().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let o = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, r = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: o.weight + r.weight,
      minlen: Math.max(o.minlen, r.minlen)
    });
  }), t;
}
function wo(e) {
  let t = new $t({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function mo(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.outEdges(n).forEach((r) => {
      o[r.w] = (o[r.w] || 0) + e.edge(r).weight;
    }), o;
  });
  return Ve(e.nodes(), t);
}
function go(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.inEdges(n).forEach((r) => {
      o[r.v] = (o[r.v] || 0) + e.edge(r).weight;
    }), o;
  });
  return Ve(e.nodes(), t);
}
function bo(e, t) {
  let n = e.x, o = e.y, r = t.x - n, s = t.y - o, i = e.width / 2, d = e.height / 2;
  if (!r && !s)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let l, a;
  return Math.abs(s) * i > Math.abs(r) * d ? (s < 0 && (d = -d), l = d * r / s, a = d) : (r < 0 && (i = -i), l = i, a = i * s / r), { x: n + l, y: o + a };
}
function yo(e) {
  let t = Pt(Tt(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let o = e.node(n), r = o.rank;
    r !== void 0 && (t[r][o.order] = n);
  }), t;
}
function vo(e) {
  let t = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MAX_VALUE : r;
  }), n = ve(Math.min, t);
  e.nodes().forEach((o) => {
    let r = e.node(o);
    Object.hasOwn(r, "rank") && (r.rank -= n);
  });
}
function Eo(e) {
  let t = e.nodes().map((i) => e.node(i).rank), n = ve(Math.min, t), o = [];
  e.nodes().forEach((i) => {
    let d = e.node(i).rank - n;
    o[d] || (o[d] = []), o[d].push(i);
  });
  let r = 0, s = e.graph().nodeRankFactor;
  Array.from(o).forEach((i, d) => {
    i === void 0 && d % s !== 0 ? --r : i !== void 0 && r && i.forEach((l) => e.node(l).rank += r);
  });
}
function xo(e, t, n, o) {
  let r = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (r.rank = n, r.order = o), jt(e, "border", r, t);
}
function ko(e, t = Rt) {
  const n = [];
  for (let o = 0; o < e.length; o += t) {
    const r = e.slice(o, o + t);
    n.push(r);
  }
  return n;
}
const Rt = 65535;
function ve(e, t) {
  if (t.length > Rt) {
    const n = ko(t);
    return e.apply(null, n.map((o) => e.apply(null, o)));
  } else
    return e.apply(null, t);
}
function Tt(e) {
  const n = e.nodes().map((o) => {
    let r = e.node(o).rank;
    return r === void 0 ? Number.MIN_VALUE : r;
  });
  return ve(Math.max, n);
}
function Co(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((o) => {
    t(o) ? n.lhs.push(o) : n.rhs.push(o);
  }), n;
}
function _o(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function Lo(e, t) {
  return t();
}
let No = 0;
function At(e) {
  var t = ++No;
  return e + ("" + t);
}
function Pt(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let o = (s) => s < t;
  n < 0 && (o = (s) => t < s);
  const r = [];
  for (let s = e; o(s); s += n)
    r.push(s);
  return r;
}
function So(e, t) {
  const n = {};
  for (const o of t)
    e[o] !== void 0 && (n[o] = e[o]);
  return n;
}
function Io(e, t) {
  let n = t;
  return typeof t == "string" && (n = (o) => o[t]), Object.entries(e).reduce((o, [r, s]) => (o[r] = n(s, r), o), {});
}
function Ve(e, t) {
  return e.reduce((n, o, r) => (n[o] = t[r], n), {});
}
let Oo = ao, Mo = P.uniqueId;
var $o = {
  run: jo,
  undo: To
};
function jo(e) {
  (e.graph().acyclicer === "greedy" ? Oo(e, n(e)) : Ro(e)).forEach((o) => {
    let r = e.edge(o);
    e.removeEdge(o), r.forwardName = o.name, r.reversed = !0, e.setEdge(o.w, o.v, r, Mo("rev"));
  });
  function n(o) {
    return (r) => o.edge(r).weight;
  }
}
function Ro(e) {
  let t = [], n = {}, o = {};
  function r(s) {
    Object.hasOwn(o, s) || (o[s] = !0, n[s] = !0, e.outEdges(s).forEach((i) => {
      Object.hasOwn(n, i.w) ? t.push(i) : r(i.w);
    }), delete n[s]);
  }
  return e.nodes().forEach(r), t;
}
function To(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let o = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, o);
    }
  });
}
let Ao = P;
var Po = {
  run: Bo,
  undo: Go
};
function Bo(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => Do(e, t));
}
function Do(e, t) {
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
    }, a = Ao.addDummyNode(e, "edge", c, "_d"), o === l && (c.width = d.width, c.height = d.height, c.dummy = "edge-label", c.labelpos = d.labelpos), e.setEdge(n, a, { weight: d.weight }, i), f === 0 && e.graph().dummyChains.push(a), n = a;
  e.setEdge(n, r, { weight: d.weight }, i);
}
function Go(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), o = n.edgeLabel, r;
    for (e.setEdge(n.edgeObj, o); n.dummy; )
      r = e.successors(t)[0], e.removeNode(t), o.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (o.x = n.x, o.y = n.y, o.width = n.width, o.height = n.height), t = r, n = e.node(t);
  });
}
const { applyWithChunking: Fo } = P;
var Ee = {
  longestPath: Ho,
  slack: Vo
};
function Ho(e) {
  var t = {};
  function n(o) {
    var r = e.node(o);
    if (Object.hasOwn(t, o))
      return r.rank;
    t[o] = !0;
    let s = e.outEdges(o).map((d) => d == null ? Number.POSITIVE_INFINITY : n(d.w) - e.edge(d).minlen);
    var i = Fo(Math.min, s);
    return i === Number.POSITIVE_INFINITY && (i = 0), r.rank = i;
  }
  e.sources().forEach(n);
}
function Vo(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var Wo = W.Graph, ge = Ee.slack, Bt = zo;
function zo(e) {
  var t = new Wo({ directed: !1 }), n = e.nodes()[0], o = e.nodeCount();
  t.setNode(n, {});
  for (var r, s; Yo(t, e) < o; )
    r = qo(t, e), s = t.hasNode(r.v) ? ge(e, r) : -ge(e, r), Uo(t, e, s);
  return t;
}
function Yo(e, t) {
  function n(o) {
    t.nodeEdges(o).forEach((r) => {
      var s = r.v, i = o === s ? r.w : s;
      !e.hasNode(i) && !ge(t, r) && (e.setNode(i, {}), e.setEdge(o, i, {}), n(i));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function qo(e, t) {
  return t.edges().reduce((o, r) => {
    let s = Number.POSITIVE_INFINITY;
    return e.hasNode(r.v) !== e.hasNode(r.w) && (s = ge(t, r)), s < o[0] ? [s, r] : o;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Uo(e, t, n) {
  e.nodes().forEach((o) => t.node(o).rank += n);
}
var Ko = Bt, nt = Ee.slack, Xo = Ee.longestPath, Jo = W.alg.preorder, Qo = W.alg.postorder, Zo = P.simplify, er = Z;
Z.initLowLimValues = ze;
Z.initCutValues = We;
Z.calcCutValue = Dt;
Z.leaveEdge = Ft;
Z.enterEdge = Ht;
Z.exchangeEdges = Vt;
function Z(e) {
  e = Zo(e), Xo(e);
  var t = Ko(e);
  ze(t), We(t, e);
  for (var n, o; n = Ft(t); )
    o = Ht(t, e, n), Vt(t, e, n, o);
}
function We(e, t) {
  var n = Qo(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((o) => tr(e, t, o));
}
function tr(e, t, n) {
  var o = e.node(n), r = o.parent;
  e.edge(n, r).cutvalue = Dt(e, t, n);
}
function Dt(e, t, n) {
  var o = e.node(n), r = o.parent, s = !0, i = t.edge(n, r), d = 0;
  return i || (s = !1, i = t.edge(r, n)), d = i.weight, t.nodeEdges(n).forEach((l) => {
    var a = l.v === n, c = a ? l.w : l.v;
    if (c !== r) {
      var f = a === s, h = t.edge(l).weight;
      if (d += f ? h : -h, or(e, n, c)) {
        var u = e.edge(n, c).cutvalue;
        d += f ? -u : u;
      }
    }
  }), d;
}
function ze(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), Gt(e, {}, 1, t);
}
function Gt(e, t, n, o, r) {
  var s = n, i = e.node(o);
  return t[o] = !0, e.neighbors(o).forEach((d) => {
    Object.hasOwn(t, d) || (n = Gt(e, t, n, d, o));
  }), i.low = s, i.lim = n++, r ? i.parent = r : delete i.parent, n;
}
function Ft(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function Ht(e, t, n) {
  var o = n.v, r = n.w;
  t.hasEdge(o, r) || (o = n.w, r = n.v);
  var s = e.node(o), i = e.node(r), d = s, l = !1;
  s.lim > i.lim && (d = i, l = !0);
  var a = t.edges().filter((c) => l === ot(e, e.node(c.v), d) && l !== ot(e, e.node(c.w), d));
  return a.reduce((c, f) => nt(t, f) < nt(t, c) ? f : c);
}
function Vt(e, t, n, o) {
  var r = n.v, s = n.w;
  e.removeEdge(r, s), e.setEdge(o.v, o.w, {}), ze(e), We(e, t), nr(e, t);
}
function nr(e, t) {
  var n = e.nodes().find((r) => !t.node(r).parent), o = Jo(e, n);
  o = o.slice(1), o.forEach((r) => {
    var s = e.node(r).parent, i = t.edge(r, s), d = !1;
    i || (i = t.edge(s, r), d = !0), t.node(r).rank = t.node(s).rank + (d ? i.minlen : -i.minlen);
  });
}
function or(e, t, n) {
  return e.hasEdge(t, n);
}
function ot(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var rr = Ee, Wt = rr.longestPath, sr = Bt, ir = er, dr = ar;
function ar(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      rt(e);
      break;
    case "tight-tree":
      cr(e);
      break;
    case "longest-path":
      lr(e);
      break;
    case "none":
      break;
    default:
      rt(e);
  }
}
var lr = Wt;
function cr(e) {
  Wt(e), sr(e);
}
function rt(e) {
  ir(e);
}
var fr = ur;
function ur(e) {
  let t = pr(e);
  e.graph().dummyChains.forEach((n) => {
    let o = e.node(n), r = o.edgeObj, s = hr(e, t, r.v, r.w), i = s.path, d = s.lca, l = 0, a = i[l], c = !0;
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
function hr(e, t, n, o) {
  let r = [], s = [], i = Math.min(t[n].low, t[o].low), d = Math.max(t[n].lim, t[o].lim), l, a;
  l = n;
  do
    l = e.parent(l), r.push(l);
  while (l && (t[l].low > i || d > t[l].lim));
  for (a = l, l = o; (l = e.parent(l)) !== a; )
    s.push(l);
  return { path: r.concat(s.reverse()), lca: a };
}
function pr(e) {
  let t = {}, n = 0;
  function o(r) {
    let s = n;
    e.children(r).forEach(o), t[r] = { low: s, lim: n++ };
  }
  return e.children().forEach(o), t;
}
let be = P;
var wr = {
  run: mr,
  cleanup: yr
};
function mr(e) {
  let t = be.addDummyNode(e, "root", {}, "_root"), n = gr(e), o = Object.values(n), r = be.applyWithChunking(Math.max, o) - 1, s = 2 * r + 1;
  e.graph().nestingRoot = t, e.edges().forEach((d) => e.edge(d).minlen *= s);
  let i = br(e) + 1;
  e.children().forEach((d) => zt(e, t, s, i, r, n, d)), e.graph().nodeRankFactor = s;
}
function zt(e, t, n, o, r, s, i) {
  let d = e.children(i);
  if (!d.length) {
    i !== t && e.setEdge(t, i, { weight: 0, minlen: n });
    return;
  }
  let l = be.addBorderNode(e, "_bt"), a = be.addBorderNode(e, "_bb"), c = e.node(i);
  e.setParent(l, i), c.borderTop = l, e.setParent(a, i), c.borderBottom = a, d.forEach((f) => {
    zt(e, t, n, o, r, s, f);
    let h = e.node(f), u = h.borderTop ? h.borderTop : f, p = h.borderBottom ? h.borderBottom : f, y = h.borderTop ? o : 2 * o, x = u !== p ? 1 : r - s[i] + 1;
    e.setEdge(l, u, {
      weight: y,
      minlen: x,
      nestingEdge: !0
    }), e.setEdge(p, a, {
      weight: y,
      minlen: x,
      nestingEdge: !0
    });
  }), e.parent(i) || e.setEdge(t, l, { weight: 0, minlen: r + s[i] });
}
function gr(e) {
  var t = {};
  function n(o, r) {
    var s = e.children(o);
    s && s.length && s.forEach((i) => n(i, r + 1)), t[o] = r;
  }
  return e.children().forEach((o) => n(o, 1)), t;
}
function br(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function yr(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var o = e.edge(n);
    o.nestingEdge && e.removeEdge(n);
  });
}
let vr = P;
var Er = xr;
function xr(e) {
  function t(n) {
    let o = e.children(n), r = e.node(n);
    if (o.length && o.forEach(t), Object.hasOwn(r, "minRank")) {
      r.borderLeft = [], r.borderRight = [];
      for (let s = r.minRank, i = r.maxRank + 1; s < i; ++s)
        st(e, "borderLeft", "_bl", n, r, s), st(e, "borderRight", "_br", n, r, s);
    }
  }
  e.children().forEach(t);
}
function st(e, t, n, o, r, s) {
  let i = { width: 0, height: 0, rank: s, borderType: t }, d = r[t][s - 1], l = vr.addDummyNode(e, "border", i, n);
  r[t][s] = l, e.setParent(l, o), d && e.setEdge(d, l, { weight: 1 });
}
var kr = {
  adjust: Cr,
  undo: _r
};
function Cr(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && Yt(e);
}
function _r(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && Lr(e), (t === "lr" || t === "rl") && (Nr(e), Yt(e));
}
function Yt(e) {
  e.nodes().forEach((t) => it(e.node(t))), e.edges().forEach((t) => it(e.edge(t)));
}
function it(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function Lr(e) {
  e.nodes().forEach((t) => Le(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Le), Object.hasOwn(n, "y") && Le(n);
  });
}
function Le(e) {
  e.y = -e.y;
}
function Nr(e) {
  e.nodes().forEach((t) => Ne(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Ne), Object.hasOwn(n, "x") && Ne(n);
  });
}
function Ne(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let dt = P;
var Sr = Ir;
function Ir(e) {
  let t = {}, n = e.nodes().filter((l) => !e.children(l).length), o = n.map((l) => e.node(l).rank), r = dt.applyWithChunking(Math.max, o), s = dt.range(r + 1).map(() => []);
  function i(l) {
    if (t[l]) return;
    t[l] = !0;
    let a = e.node(l);
    s[a.rank].push(l), e.successors(l).forEach(i);
  }
  return n.sort((l, a) => e.node(l).rank - e.node(a).rank).forEach(i), s;
}
let Or = P.zipObject;
var Mr = $r;
function $r(e, t) {
  let n = 0;
  for (let o = 1; o < t.length; ++o)
    n += jr(e, t[o - 1], t[o]);
  return n;
}
function jr(e, t, n) {
  let o = Or(n, n.map((a, c) => c)), r = t.flatMap((a) => e.outEdges(a).map((c) => ({ pos: o[c.w], weight: e.edge(c).weight })).sort((c, f) => c.pos - f.pos)), s = 1;
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
var Rr = Tr;
function Tr(e, t = []) {
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
let Ar = P;
var Pr = Br;
function Br(e, t) {
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
  return Dr(o);
}
function Dr(e) {
  let t = [];
  function n(r) {
    return (s) => {
      s.merged || (s.barycenter === void 0 || r.barycenter === void 0 || s.barycenter >= r.barycenter) && Gr(r, s);
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
  return t.filter((r) => !r.merged).map((r) => Ar.pick(r, ["vs", "i", "barycenter", "weight"]));
}
function Gr(e, t) {
  let n = 0, o = 0;
  e.weight && (n += e.barycenter * e.weight, o += e.weight), t.weight && (n += t.barycenter * t.weight, o += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / o, e.weight = o, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let Fr = P;
var Hr = Vr;
function Vr(e, t) {
  let n = Fr.partition(e, (c) => Object.hasOwn(c, "barycenter")), o = n.lhs, r = n.rhs.sort((c, f) => f.i - c.i), s = [], i = 0, d = 0, l = 0;
  o.sort(Wr(!!t)), l = at(s, r, l), o.forEach((c) => {
    l += c.vs.length, s.push(c.vs), i += c.barycenter * c.weight, d += c.weight, l = at(s, r, l);
  });
  let a = { vs: s.flat(!0) };
  return d && (a.barycenter = i / d, a.weight = d), a;
}
function at(e, t, n) {
  let o;
  for (; t.length && (o = t[t.length - 1]).i <= n; )
    t.pop(), e.push(o.vs), n++;
  return n;
}
function Wr(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let zr = Rr, Yr = Pr, qr = Hr;
var Ur = qt;
function qt(e, t, n, o) {
  let r = e.children(t), s = e.node(t), i = s ? s.borderLeft : void 0, d = s ? s.borderRight : void 0, l = {};
  i && (r = r.filter((h) => h !== i && h !== d));
  let a = zr(e, r);
  a.forEach((h) => {
    if (e.children(h.v).length) {
      let u = qt(e, h.v, n, o);
      l[h.v] = u, Object.hasOwn(u, "barycenter") && Xr(h, u);
    }
  });
  let c = Yr(a, n);
  Kr(c, l);
  let f = qr(c, o);
  if (i && (f.vs = [i, f.vs, d].flat(!0), e.predecessors(i).length)) {
    let h = e.node(e.predecessors(i)[0]), u = e.node(e.predecessors(d)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + h.order + u.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function Kr(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((o) => t[o] ? t[o].vs : o);
  });
}
function Xr(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let Jr = W.Graph, Qr = P;
var Zr = es;
function es(e, t, n, o) {
  o || (o = e.nodes());
  let r = ts(e), s = new Jr({ compound: !0 }).setGraph({ root: r }).setDefaultNodeLabel((i) => e.node(i));
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
function ts(e) {
  for (var t; e.hasNode(t = Qr.uniqueId("_root")); ) ;
  return t;
}
var ns = os;
function os(e, t, n) {
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
let rs = Sr, ss = Mr, is = Ur, ds = Zr, as = ns, ls = W.Graph, fe = P;
var cs = Ut;
function Ut(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, Ut);
    return;
  }
  let n = fe.maxRank(e), o = lt(e, fe.range(1, n + 1), "inEdges"), r = lt(e, fe.range(n - 1, -1, -1), "outEdges"), s = rs(e);
  if (ct(e, s), t && t.disableOptimalOrderHeuristic)
    return;
  let i = Number.POSITIVE_INFINITY, d;
  for (let l = 0, a = 0; a < 4; ++l, ++a) {
    fs(l % 2 ? o : r, l % 4 >= 2), s = fe.buildLayerMatrix(e);
    let c = ss(e, s);
    c < i && (a = 0, d = Object.assign({}, s), i = c);
  }
  ct(e, d);
}
function lt(e, t, n) {
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
    return ds(e, s, n, o.get(s) || []);
  });
}
function fs(e, t) {
  let n = new ls();
  e.forEach(function(o) {
    let r = o.graph().root, s = is(o, r, n, t);
    s.vs.forEach((i, d) => o.node(i).order = d), as(o, n, s.vs);
  });
}
function ct(e, t) {
  Object.values(t).forEach((n) => n.forEach((o, r) => e.node(o).order = r));
}
let us = W.Graph, U = P;
var hs = {
  positionX: Cs
};
function ps(e, t) {
  let n = {};
  function o(r, s) {
    let i = 0, d = 0, l = r.length, a = s[s.length - 1];
    return s.forEach((c, f) => {
      let h = ms(e, c), u = h ? e.node(h).order : l;
      (h || c === a) && (s.slice(d, f + 1).forEach((p) => {
        e.predecessors(p).forEach((y) => {
          let x = e.node(y), E = x.order;
          (E < i || u < E) && !(x.dummy && e.node(p).dummy) && Kt(n, y, p);
        });
      }), d = f + 1, i = u);
    }), s;
  }
  return t.length && t.reduce(o), n;
}
function ws(e, t) {
  let n = {};
  function o(s, i, d, l, a) {
    let c;
    U.range(i, d).forEach((f) => {
      c = s[f], e.node(c).dummy && e.predecessors(c).forEach((h) => {
        let u = e.node(h);
        u.dummy && (u.order < l || u.order > a) && Kt(n, h, c);
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
function ms(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function Kt(e, t, n) {
  if (t > n) {
    let r = t;
    t = n, n = r;
  }
  let o = e[t];
  o || (e[t] = o = {}), o[n] = !0;
}
function gs(e, t, n) {
  if (t > n) {
    let o = t;
    t = n, n = o;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function bs(e, t, n, o) {
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
          s[a] === a && l < i[p] && !gs(n, a, p) && (s[p] = a, s[a] = r[a] = r[p], l = i[p]);
        }
      }
    });
  }), { root: r, align: s };
}
function ys(e, t, n, o, r) {
  let s = {}, i = vs(e, t, n, r), d = r ? "borderLeft" : "borderRight";
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
function vs(e, t, n, o) {
  let r = new us(), s = e.graph(), i = _s(s.nodesep, s.edgesep, o);
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
function Es(e, t) {
  return Object.values(t).reduce((n, o) => {
    let r = Number.NEGATIVE_INFINITY, s = Number.POSITIVE_INFINITY;
    Object.entries(o).forEach(([d, l]) => {
      let a = Ls(e, d) / 2;
      r = Math.max(l + a, r), s = Math.min(l - a, s);
    });
    const i = r - s;
    return i < n[0] && (n = [i, o]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function xs(e, t) {
  let n = Object.values(t), o = U.applyWithChunking(Math.min, n), r = U.applyWithChunking(Math.max, n);
  ["u", "d"].forEach((s) => {
    ["l", "r"].forEach((i) => {
      let d = s + i, l = e[d];
      if (l === t) return;
      let a = Object.values(l), c = o - U.applyWithChunking(Math.min, a);
      i !== "l" && (c = r - U.applyWithChunking(Math.max, a)), c && (e[d] = U.mapValues(l, (f) => f + c));
    });
  });
}
function ks(e, t) {
  return U.mapValues(e.ul, (n, o) => {
    if (t)
      return e[t.toLowerCase()][o];
    {
      let r = Object.values(e).map((s) => s[o]).sort((s, i) => s - i);
      return (r[1] + r[2]) / 2;
    }
  });
}
function Cs(e) {
  let t = U.buildLayerMatrix(e), n = Object.assign(
    ps(e, t),
    ws(e, t)
  ), o = {}, r;
  ["u", "d"].forEach((i) => {
    r = i === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((d) => {
      d === "r" && (r = r.map((f) => Object.values(f).reverse()));
      let l = (i === "u" ? e.predecessors : e.successors).bind(e), a = bs(e, r, n, l), c = ys(
        e,
        r,
        a.root,
        a.align,
        d === "r"
      );
      d === "r" && (c = U.mapValues(c, (f) => -f)), o[i + d] = c;
    });
  });
  let s = Es(e, o);
  return xs(o, s), ks(o, e.graph().align);
}
function _s(e, t, n) {
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
function Ls(e, t) {
  return e.node(t).width;
}
let Xt = P, Ns = hs.positionX;
var Ss = Is;
function Is(e) {
  e = Xt.asNonCompoundGraph(e), Os(e), Object.entries(Ns(e)).forEach(([t, n]) => e.node(t).x = n);
}
function Os(e) {
  let t = Xt.buildLayerMatrix(e), n = e.graph().ranksep, o = 0;
  t.forEach((r) => {
    const s = r.reduce((i, d) => {
      const l = e.node(d).height;
      return i > l ? i : l;
    }, 0);
    r.forEach((i) => e.node(i).y = o + s / 2), o += s + n;
  });
}
let ft = $o, ut = Po, Ms = dr, $s = P.normalizeRanks, js = fr, Rs = P.removeEmptyRanks, ht = wr, Ts = Er, pt = kr, As = cs, Ps = Ss, G = P, Bs = W.Graph;
var Ds = Gs;
function Gs(e, t) {
  let n = t && t.debugTiming ? G.time : G.notime;
  n("layout", () => {
    let o = n("  buildLayoutGraph", () => Xs(e));
    n("  runLayout", () => Fs(o, n, t)), n("  updateInputGraph", () => Hs(e, o));
  });
}
function Fs(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => Js(e)), t("    removeSelfEdges", () => ii(e)), t("    acyclic", () => ft.run(e)), t("    nestingGraph.run", () => ht.run(e)), t("    rank", () => Ms(G.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => Qs(e)), t("    removeEmptyRanks", () => Rs(e)), t("    nestingGraph.cleanup", () => ht.cleanup(e)), t("    normalizeRanks", () => $s(e)), t("    assignRankMinMax", () => Zs(e)), t("    removeEdgeLabelProxies", () => ei(e)), t("    normalize.run", () => ut.run(e)), t("    parentDummyChains", () => js(e)), t("    addBorderSegments", () => Ts(e)), t("    order", () => As(e, n)), t("    insertSelfEdges", () => di(e)), t("    adjustCoordinateSystem", () => pt.adjust(e)), t("    position", () => Ps(e)), t("    positionSelfEdges", () => ai(e)), t("    removeBorderNodes", () => si(e)), t("    normalize.undo", () => ut.undo(e)), t("    fixupEdgeLabelCoords", () => oi(e)), t("    undoCoordinateSystem", () => pt.undo(e)), t("    translateGraph", () => ti(e)), t("    assignNodeIntersects", () => ni(e)), t("    reversePoints", () => ri(e)), t("    acyclic.undo", () => ft.undo(e));
}
function Hs(e, t) {
  e.nodes().forEach((n) => {
    let o = e.node(n), r = t.node(n);
    o && (o.x = r.x, o.y = r.y, o.rank = r.rank, t.children(n).length && (o.width = r.width, o.height = r.height));
  }), e.edges().forEach((n) => {
    let o = e.edge(n), r = t.edge(n);
    o.points = r.points, Object.hasOwn(r, "x") && (o.x = r.x, o.y = r.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let Vs = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], Ws = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, zs = ["acyclicer", "ranker", "rankdir", "align"], Ys = ["width", "height", "rank"], wt = { width: 0, height: 0 }, qs = ["minlen", "weight", "width", "height", "labeloffset"], Us = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, Ks = ["labelpos"];
function Xs(e) {
  let t = new Bs({ multigraph: !0, compound: !0 }), n = Ie(e.graph());
  return t.setGraph(Object.assign(
    {},
    Ws,
    Se(n, Vs),
    G.pick(n, zs)
  )), e.nodes().forEach((o) => {
    let r = Ie(e.node(o));
    const s = Se(r, Ys);
    Object.keys(wt).forEach((i) => {
      s[i] === void 0 && (s[i] = wt[i]);
    }), t.setNode(o, s), t.setParent(o, e.parent(o));
  }), e.edges().forEach((o) => {
    let r = Ie(e.edge(o));
    t.setEdge(o, Object.assign(
      {},
      Us,
      Se(r, qs),
      G.pick(r, Ks)
    ));
  }), t;
}
function Js(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let o = e.edge(n);
    o.minlen *= 2, o.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? o.width += o.labeloffset : o.height += o.labeloffset);
  });
}
function Qs(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let o = e.node(t.v), s = { rank: (e.node(t.w).rank - o.rank) / 2 + o.rank, e: t };
      G.addDummyNode(e, "edge-proxy", s, "_ep");
    }
  });
}
function Zs(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let o = e.node(n);
    o.borderTop && (o.minRank = e.node(o.borderTop).rank, o.maxRank = e.node(o.borderBottom).rank, t = Math.max(t, o.maxRank));
  }), e.graph().maxRank = t;
}
function ei(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function ti(e) {
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
function ni(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), o = e.node(t.v), r = e.node(t.w), s, i;
    n.points ? (s = n.points[0], i = n.points[n.points.length - 1]) : (n.points = [], s = r, i = o), n.points.unshift(G.intersectRect(o, s)), n.points.push(G.intersectRect(r, i));
  });
}
function oi(e) {
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
function ri(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function si(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), o = e.node(n.borderTop), r = e.node(n.borderBottom), s = e.node(n.borderLeft[n.borderLeft.length - 1]), i = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(i.x - s.x), n.height = Math.abs(r.y - o.y), n.x = s.x + n.width / 2, n.y = o.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function ii(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function di(e) {
  var t = G.buildLayerMatrix(e);
  t.forEach((n) => {
    var o = 0;
    n.forEach((r, s) => {
      var i = e.node(r);
      i.order = s + o, (i.selfEdges || []).forEach((d) => {
        G.addDummyNode(e, "selfedge", {
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
function ai(e) {
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
function Se(e, t) {
  return G.mapValues(G.pick(e, t), Number);
}
function Ie(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, o]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = o;
  }), t;
}
let li = P, ci = W.Graph;
var fi = {
  debugOrdering: ui
};
function ui(e) {
  let t = li.buildLayerMatrix(e), n = new ci({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((o) => {
    n.setNode(o, { label: o }), n.setParent(o, "layer" + e.node(o).rank);
  }), e.edges().forEach((o) => n.setEdge(o.v, o.w, {}, o.name)), t.forEach((o, r) => {
    let s = "layer" + r;
    n.setNode(s, { rank: "same" }), o.reduce((i, d) => (n.setEdge(i, d, { style: "invis" }), d));
  }), n;
}
var hi = "1.1.8", pi = {
  graphlib: W,
  layout: Ds,
  debug: fi,
  util: {
    time: P.time,
    notime: P.notime
  },
  version: hi
};
const mt = /* @__PURE__ */ cn(pi), wi = "http://www.w3.org/2000/svg";
function O(e, t = {}) {
  const n = document.createElementNS(wi, e);
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
  compound: { w: 220, h: 64 }
}, te = 24, re = 28, mi = 8;
function Jt(e) {
  return re + ((e == null ? void 0 : e.length) ?? 0) * te + mi;
}
function Qt(e, t, n) {
  const o = [e, ...(t ?? []).map((s) => s.label)], r = Math.max(...o.map((s) => s.length));
  return Math.max(n, r * en + 40);
}
function V(e, t) {
  return `${e}::${t}`;
}
function Ye(e) {
  return `${V(e.sourceNode, e.sourceRow)}=>${V(e.targetNode, e.targetRow)}`;
}
function bt(e, t, n) {
  var i;
  const o = ((i = e.rows) == null ? void 0 : i.findIndex((d) => d.id === t)) ?? -1;
  if (o < 0) return null;
  const s = -e.h / 2 + re + o * te + te / 2;
  return { x: e.x + (n === "left" ? -e.w / 2 : e.w / 2), y: e.y + s };
}
function se(e) {
  switch (e) {
    case "start":
      return { fill: "var(--dd-flow-start-fill)", stroke: "var(--dd-flow-start-fill)", text: "var(--dd-flow-start-text)" };
    case "end":
      return { fill: "var(--dd-flow-end-fill)", stroke: "var(--dd-flow-end-fill)", text: "var(--dd-flow-end-text)" };
    case "decision":
      return { fill: "var(--dd-flow-decision-fill)", stroke: "var(--dd-flow-decision-stroke)", text: "var(--dd-flow-node-text)" };
    case "subprocess":
      return { fill: "var(--dd-flow-node-fill)", stroke: "var(--dd-flow-subprocess-stroke)", text: "var(--dd-flow-node-text)" };
    default:
      return { fill: "var(--dd-flow-node-fill)", stroke: "var(--dd-flow-node-stroke)", text: "var(--dd-flow-node-text)" };
  }
}
function Zt(e, t, n) {
  const { fill: o, stroke: r } = se(e), s = { fill: o, stroke: r, "stroke-width": 2 };
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
          stroke: se(e).stroke,
          "stroke-width": 2
        })
      ), i.appendChild(
        O("line", {
          x1: t / 2 - d,
          y1: -n / 2,
          x2: t / 2 - d,
          y2: n / 2,
          stroke: se(e).stroke,
          "stroke-width": 2
        })
      ), i;
    }
    case "process":
    default:
      return O("rect", { x: -t / 2, y: -n / 2, width: t, height: n, rx: 6, ry: 6, ...s });
  }
}
function gi(e, t) {
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
function bi(e, t) {
  const { text: n, stroke: o } = se(e.type), r = O("g", { class: "dd-flow-node-body" }), s = -e.h / 2, i = (l) => O("line", { x1: -e.w / 2, x2: e.w / 2, y1: l, y2: l, stroke: o, "stroke-width": 1, opacity: 0.4 }), d = O("text", {
    x: 0,
    y: s + re / 2,
    fill: n,
    "text-anchor": "middle",
    "dominant-baseline": "central",
    class: "dd-flow-label"
  });
  return d.textContent = e.label, r.appendChild(d), r.appendChild(i(s + re)), (e.rows ?? []).forEach((l, a) => {
    const c = s + re + a * te, f = O("g", {
      class: `dd-flow-node-row${l.id === t ? " is-row-selected" : ""}`,
      "data-row-id": l.id
    });
    f.appendChild(
      O("rect", { x: -e.w / 2, y: c, width: e.w, height: te, fill: "transparent" })
    );
    const h = O("text", {
      x: -e.w / 2 + 10,
      y: c + te / 2,
      fill: n,
      "text-anchor": "start",
      "dominant-baseline": "central",
      class: "dd-flow-label"
    });
    h.textContent = l.label, f.appendChild(h), r.appendChild(f), a > 0 && r.appendChild(i(c));
  }), r;
}
function yi(e, t = {}) {
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
  if (o.appendChild(Zt(e.type, e.w, e.h)), e.type === "compound" && ((r = e.rows) != null && r.length))
    o.appendChild(bi(e, t.selectedRowId));
  else {
    const { text: s } = se(e.type), i = O("text", {
      x: 0,
      y: 0,
      fill: s,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      class: "dd-flow-label"
    });
    vi(i, e.label, e.w - 20), o.appendChild(i);
  }
  return e.subflow && o.appendChild(gi(e.w, e.h)), o;
}
const Pe = 16, en = 7.2;
function tn(e, t) {
  const n = e.split(/\s+/), o = Math.max(4, Math.floor(t / en)), r = [];
  let s = "";
  for (const i of n) {
    const d = s ? `${s} ${i}` : i;
    d.length > o && s ? (r.push(s), s = i) : s = d;
  }
  return s && r.push(s), r;
}
function vi(e, t, n) {
  const o = tn(t, n), r = -((o.length - 1) * Pe) / 2;
  o.forEach((s, i) => {
    const d = O("tspan", { x: 0, y: r + i * Pe });
    d.textContent = s, e.appendChild(d);
  });
}
function Ei(e, t, n) {
  const r = n - (e === "start" || e === "end" ? n * 0.3 : 20);
  return tn(t, Math.max(20, r)).length * Pe + 24;
}
function yt(e, t) {
  const n = gt[e.type] ?? gt.process;
  if (e.type === "compound") {
    const s = (t == null ? void 0 : t.w) ?? e.w ?? Qt(e.label, e.rows, n.w), i = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, Jt(e.rows));
    return { w: s, h: i };
  }
  const o = (t == null ? void 0 : t.w) ?? e.w ?? n.w, r = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, Ei(e.type, e.label, o));
  return { w: o, h: r };
}
function Be(e, t) {
  const n = new mt.graphlib.Graph({ multigraph: !0 });
  n.setGraph({ rankdir: e.direction ?? "TB", nodesep: 50, ranksep: 60, marginx: 20, marginy: 20 }), n.setDefaultEdgeLabel(() => ({}));
  for (const a of e.nodes) {
    const { w: c, h: f } = yt(a, t == null ? void 0 : t.nodes[a.id]);
    n.setNode(a.id, { width: c, height: f });
  }
  for (const a of e.edges)
    n.setEdge(a.from, a.to, {}, a.id);
  mt.layout(n);
  const o = e.nodes.map((a) => {
    const c = t == null ? void 0 : t.nodes[a.id], { w: f, h } = yt(a, c), u = n.node(a.id);
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
function Oe(e, t) {
  const n = { nodes: {}, edges: {} };
  for (const o of e) n.nodes[o.id] = { x: o.x, y: o.y, w: o.w, h: o.h };
  for (const o of t) n.edges[o.id] = { points: o.points };
  return n;
}
const ue = 40;
function De(e) {
  const t = e.type === "conditional" ? "conditional" : "default", n = e.type === "dashed" ? "dashed" : "solid";
  return {
    kind: e.kind ?? t,
    routing: e.routing ?? "orthogonal",
    stroke: e.stroke ?? n
  };
}
function xi(e, t) {
  const n = t.x - e.x, o = t.y - e.y;
  if (n === 0 && o === 0) return [{ x: e.x, y: e.y }, { x: t.x, y: t.y }];
  const r = (s, i, d) => {
    const l = s.w / 2, a = s.h / 2, c = Math.min(
      i !== 0 ? l / Math.abs(i) : 1 / 0,
      d !== 0 ? a / Math.abs(d) : 1 / 0
    );
    return { x: s.x + i * c, y: s.y + d * c };
  };
  return [r(e, n, o), r(t, -n, -o)];
}
function ki(e, t) {
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
function Ci(e, t, n = "orthogonal") {
  if (n === "straight") return xi(e, t);
  if (n === "bezier") return ki(e, t);
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
const _i = 10, vt = 40;
function nn(e) {
  const [t, n] = [e[0], e[e.length - 1]], o = n.x - t.x, r = n.y - t.y;
  if (Math.abs(o) >= Math.abs(r)) {
    const i = Math.max(vt, Math.abs(o) / 2) * Math.sign(o || 1);
    return `M ${t.x} ${t.y} C ${t.x + i} ${t.y}, ${n.x - i} ${n.y}, ${n.x} ${n.y}`;
  }
  const s = Math.max(vt, Math.abs(r) / 2) * Math.sign(r || 1);
  return `M ${t.x} ${t.y} C ${t.x} ${t.y + s}, ${n.x} ${n.y - s}, ${n.x} ${n.y}`;
}
function Li(e, t) {
  if (!t || e.length <= 2) return Ni(e);
  const n = [`M ${e[0].x} ${e[0].y}`];
  for (let r = 1; r < e.length - 1; r++) {
    const s = e[r - 1], i = e[r], d = e[r + 1], l = Math.hypot(i.x - s.x, i.y - s.y), a = Math.hypot(d.x - i.x, d.y - i.y), c = Math.min(_i, l / 2, a / 2), f = { x: i.x - (i.x - s.x) / l * c, y: i.y - (i.y - s.y) / l * c }, h = { x: i.x + (d.x - i.x) / a * c, y: i.y + (d.y - i.y) / a * c };
    n.push(`L ${f.x} ${f.y}`, `Q ${i.x} ${i.y} ${h.x} ${h.y}`);
  }
  const o = e[e.length - 1];
  return n.push(`L ${o.x} ${o.y}`), n.join(" ");
}
function Ni(e) {
  return e.map((t, n) => `${n === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
}
const Si = {
  solid: null,
  dashed: "6,4",
  dotted: "1.5,4"
};
function Ii(e) {
  return e.filter((t, n) => n === 0 || t.x !== e[n - 1].x || t.y !== e[n - 1].y);
}
function Oi(e, t, n, o = {}) {
  const r = e.points.length >= 2 ? e.points : Ci(t, n, De(e).routing), s = Ii(r), { kind: i, routing: d, stroke: l } = De(e), a = O("g", {
    class: `dd-flow-edge dd-flow-edge-${i}${o.selected ? " is-selected" : ""}`,
    "data-edge-id": e.id
  }), c = d === "bezier" && s.length === 2 ? nn(s) : Li(s, d === "curved");
  a.appendChild(
    O("path", { d: c, fill: "none", stroke: "transparent", "stroke-width": 16, class: "dd-flow-edge-hit" })
  );
  const f = O("path", {
    d: c,
    fill: "none",
    stroke: i === "conditional" ? "var(--dd-flow-edge-conditional-stroke)" : "var(--dd-flow-edge-stroke)",
    "stroke-width": 2,
    "marker-end": "url(#dd-flow-arrow)"
  }), h = Si[l];
  if (h && f.setAttribute("stroke-dasharray", h), a.appendChild(f), e.label) {
    const u = s[Math.floor((s.length - 1) / 2)], p = s[Math.floor((s.length - 1) / 2) + 1] ?? u, y = (u.x + p.x) / 2, x = (u.y + p.y) / 2, E = Math.max(24, e.label.length * 7 + 12);
    a.appendChild(
      O("rect", {
        x: y - E / 2,
        y: x - 10,
        width: E,
        height: 20,
        rx: 4,
        fill: "var(--dd-flow-edge-label-bg)",
        class: "dd-flow-edge-label-bg"
      })
    );
    const m = O("text", {
      x: y,
      y: x,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "var(--dd-flow-edge-label-text)",
      class: "dd-flow-edge-label"
    });
    m.textContent = e.label, a.appendChild(m);
  }
  return a;
}
function Mi(e, t, n) {
  const o = O("g", {
    class: `dd-flow-row-edge${e.flagged ? " dd-flow-row-edge-flagged" : ""}`,
    "data-row-edge-id": Ye(e)
  }), r = nn([t, n]);
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
function $i() {
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
function qe(e, t, n = {}) {
  var E, m, v, w;
  const o = new Map(e.map((b) => [b.id, b]));
  let r = 1 / 0, s = 1 / 0, i = -1 / 0, d = -1 / 0;
  for (const b of e)
    r = Math.min(r, b.x - b.w / 2), s = Math.min(s, b.y - b.h / 2), i = Math.max(i, b.x + b.w / 2), d = Math.max(d, b.y + b.h / 2);
  e.length || (r = 0, s = 0, i = 200, d = 100);
  const l = i - r + ue * 2, a = d - s + ue * 2, c = ue - r, f = ue - s, h = O("svg", {
    class: "dd-flow-svg",
    viewBox: `0 0 ${l} ${a}`,
    width: l,
    height: a
  });
  h.appendChild($i());
  const u = O("g", { class: "dd-flow-world", transform: `translate(${c}, ${f})` }), p = O("g", { class: "dd-flow-edges" });
  for (const b of t) {
    const N = o.get(b.from), S = o.get(b.to);
    !N || !S || p.appendChild(Oi(b, N, S, { selected: b.id === n.selectedEdgeId }));
  }
  u.appendChild(p);
  const y = (((E = n.selectedNodeIds) == null ? void 0 : E.size) ?? 0) > 1, x = O("g", { class: "dd-flow-nodes" });
  for (const b of e) {
    const N = ((m = n.selectedNodeIds) == null ? void 0 : m.has(b.id)) ?? !1, S = !y && (b.id === n.selectedNodeId || N), M = ((v = n.selectedRowKey) == null ? void 0 : v.nodeId) === b.id ? n.selectedRowKey.rowId : null;
    x.appendChild(yi(b, { selected: S, multiselected: y && N, selectedRowId: M }));
  }
  if (u.appendChild(x), (w = n.rowEdges) != null && w.length) {
    const b = O("g", { class: "dd-flow-row-edges" });
    for (const N of n.rowEdges) {
      const S = o.get(N.sourceNode), M = o.get(N.targetNode);
      if (!S || !M) continue;
      const j = S.x <= M.x, _ = bt(S, N.sourceRow, j ? "right" : "left"), D = bt(M, N.targetRow, j ? "left" : "right");
      !_ || !D || b.appendChild(Mi(N, _, D));
    }
    u.appendChild(b);
  }
  return h.appendChild(u), h;
}
const ye = {
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
ye.host = {
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
const Me = "bam";
function ie(e, t) {
  const n = ye[t ?? Me] ?? ye[Me];
  e.setAttribute("data-dd-flow-theme", t ?? Me);
  for (const [o, r] of Object.entries(n.vars))
    e.style.setProperty(`--dd-flow-${o}`, r);
}
function vd(e, t) {
  ye[e] = t;
}
function xe(e, t) {
  const n = URL.createObjectURL(e), o = document.createElement("a");
  o.href = n, o.download = t, document.body.appendChild(o), o.click(), o.remove(), URL.revokeObjectURL(n);
}
function ji(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  xe(new Blob([n], { type: "application/json" }), `${e}.layout.json`);
}
function Ri(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  xe(new Blob([n], { type: "application/json" }), `${e}.flow.json`);
}
const Ti = /^var\((--dd-flow-[a-z-]+)\)$/;
function Ai(e, t) {
  const n = e.cloneNode(!0), o = getComputedStyle(t), r = ["fill", "stroke"], s = (d) => {
    const l = d.match(Ti);
    return l && o.getPropertyValue(l[1]).trim() || d;
  }, i = [n, ...Array.from(n.querySelectorAll("*"))];
  for (const d of i)
    for (const l of r) {
      const a = d.getAttribute(l);
      a && d.setAttribute(l, s(a));
    }
  return n;
}
function on(e, t) {
  const n = Ai(e, t);
  return n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), new XMLSerializer().serializeToString(n);
}
function Pi(e, t, n) {
  const o = on(e, t);
  xe(new Blob([o], { type: "image/svg+xml;charset=utf-8" }), n);
}
function Bi(e, t, n, o = 2) {
  const r = on(e, t), s = parseFloat(e.getAttribute("width") || "800"), i = parseFloat(e.getAttribute("height") || "600"), d = getComputedStyle(t).getPropertyValue("--dd-flow-canvas-bg").trim() || "#ffffff", l = new Blob([r], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(l), c = new Image();
  c.onload = () => {
    const f = document.createElement("canvas");
    f.width = s * o, f.height = i * o;
    const h = f.getContext("2d");
    if (!h) {
      URL.revokeObjectURL(a);
      return;
    }
    h.scale(o, o), h.fillStyle = d, h.fillRect(0, 0, s, i), h.drawImage(c, 0, 0, s, i), URL.revokeObjectURL(a), f.toBlob((u) => {
      u && xe(u, n);
    }, "image/png");
  }, c.onerror = () => URL.revokeObjectURL(a), c.src = a;
}
const Y = {
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
function q(e, t, n) {
  e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: !0, composed: !0 }));
}
const Di = ["start", "end", "process", "decision", "subprocess", "document", "data", "manual", "compound"];
function Gi(e) {
  const t = document.createElement("div");
  t.className = "dd-flow-inspector", t.hidden = !0, e.appendChild(t);
  let n = !1;
  function o(u) {
    const y = t.offsetWidth || 260, x = t.offsetHeight || 200;
    let E = u.right + 12;
    E + y > window.innerWidth && (E = u.left - 12 - y), E < 12 && (E = Math.min(u.left, window.innerWidth - y - 12)), E = Math.max(12, Math.min(E, window.innerWidth - y - 12));
    let m = u.top;
    return m = Math.max(12, Math.min(m, window.innerHeight - x - 12)), { left: E, top: m };
  }
  function r(u) {
    const { left: p, top: y } = o(u);
    t.style.left = `${p}px`, t.style.top = `${y}px`;
  }
  function s(u, p) {
    const y = document.createElement("div");
    y.className = "dd-flow-inspector-field";
    const x = document.createElement("label");
    return x.textContent = u, y.appendChild(x), y.appendChild(p), y;
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
    const x = document.createElement("textarea");
    x.rows = 2, x.value = u.note ?? "", x.addEventListener("input", () => p.onNoteChange(x.value)), t.appendChild(s("Note", x));
    const E = document.createElement("div");
    E.className = "dd-flow-type-grid";
    for (const m of Di) {
      const v = document.createElement("button");
      v.type = "button", v.className = `dd-flow-type-swatch${m === u.type ? " is-active" : ""}`, v.title = m, v.setAttribute("aria-label", m);
      const w = O("svg", { viewBox: "-32 -22 64 44", width: 48, height: 33 });
      w.appendChild(Zt(m, 56, 36)), v.appendChild(w), v.addEventListener("click", () => p.onTypeChange(m)), E.appendChild(v);
    }
    if (t.appendChild(s("Type", E)), u.subflow) {
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
  function a(u, p, y, x) {
    const E = document.createElement("div");
    E.className = "dd-flow-inspector-radios";
    for (const m of p) {
      const v = `dd-flow-${u}-${m}`, w = document.createElement("input");
      w.type = "radio", w.name = `dd-flow-${u}`, w.id = v, w.checked = m === y, w.addEventListener("change", () => x(m));
      const b = document.createElement("label");
      b.htmlFor = v, b.textContent = m, E.appendChild(w), E.appendChild(b);
    }
    return E;
  }
  function c(u, p) {
    t.innerHTML = "", t.appendChild(d());
    const y = document.createElement("input");
    y.type = "text", y.value = u.label ?? "", y.addEventListener("input", () => p.onLabelChange(y.value)), t.appendChild(s("Label", y));
    const { routing: x, stroke: E, kind: m } = De(u);
    t.appendChild(
      s("Routing", a("routing", ["orthogonal", "straight", "curved"], x, p.onRoutingChange))
    ), t.appendChild(s("Stroke", a("stroke", ["solid", "dashed", "dotted"], E, p.onStrokeChange))), t.appendChild(s("Kind", a("kind", ["default", "conditional"], m, p.onKindChange)));
    const v = document.createElement("p");
    v.className = "dd-flow-inspector-hint", v.textContent = "Changing routing clears any hand-dragged route for this connector.", t.appendChild(v), t.appendChild(i(p.onDelete));
  }
  function f(u, p, y) {
    t.innerHTML = "", t.appendChild(d());
    const x = document.createElement("p");
    x.className = "dd-flow-inspector-hint", x.textContent = u, t.appendChild(x);
    const E = document.createElement("input");
    E.type = "text", E.value = p;
    const m = () => {
      const N = E.value.trim();
      N && y(N), h();
    };
    E.addEventListener("keydown", (N) => {
      N.key === "Enter" && m();
    }), t.appendChild(s("Name", E));
    const v = document.createElement("div");
    v.className = "dd-flow-inspector-actions";
    const w = document.createElement("button");
    w.type = "button", w.className = "dd-flow-btn", w.textContent = "Cancel", w.addEventListener("click", h);
    const b = document.createElement("button");
    b.type = "button", b.className = "dd-flow-btn is-active", b.textContent = "Create", b.addEventListener("click", m), v.appendChild(w), v.appendChild(b), t.appendChild(v), requestAnimationFrame(() => {
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
    showNode(u, p, y, x) {
      if (l(u, y), t.hidden = !1, n = !0, r(p), x != null && x.focusLabel) {
        const E = t.querySelector('input[type="text"]');
        E == null || E.focus(), E == null || E.select();
      }
    },
    showEdge(u, p, y) {
      c(u, y), t.hidden = !1, n = !0, r(p);
    },
    showPrompt(u, p, y, x) {
      f(u, y, x), t.hidden = !1, n = !0, r(p);
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
const Fi = 0.2, Hi = 4, Vi = 4, Ge = "ddFlowPanned";
function Wi(e, t, n = {}) {
  var ae;
  const o = n.minScale ?? Fi, r = n.maxScale ?? Hi, s = n.maxFitScale ?? 1, i = Number(t.getAttribute("width")) || 1, d = Number(t.getAttribute("height")) || 1, l = t.querySelector("g.dd-flow-world");
  if (!l)
    return { fit: () => {
    }, reset: () => {
    }, zoomBy: () => {
    }, destroy: () => {
    } };
  const a = document.createElementNS("http://www.w3.org/2000/svg", "g");
  a.setAttribute("class", "dd-flow-pz"), (ae = l.parentNode) == null || ae.insertBefore(a, l), a.appendChild(l), e.classList.add("dd-flow-has-viewport");
  let c = 1, f = 0, h = 0, u = !1;
  const p = () => {
    a.setAttribute("transform", `translate(${f}, ${h}) scale(${c})`);
  }, y = () => {
    const R = e.getBoundingClientRect(), $ = Math.max(1, Math.round(R.width)), H = Math.max(1, Math.round(R.height));
    return t.setAttribute("width", String($)), t.setAttribute("height", String(H)), t.setAttribute("viewBox", `0 0 ${$} ${H}`), { w: $, h: H };
  }, x = () => {
    const { w: R, h: $ } = y();
    if (u) {
      p();
      return;
    }
    c = Math.min(s, R / i, $ / d), c = Math.max(o, c), f = (R - i * c) / 2, h = ($ - d * c) / 2, p();
  }, E = (R, $, H) => {
    const g = c;
    c = Math.min(r, Math.max(o, c * H)), c !== g && (f = R - (R - f) / g * c, h = $ - ($ - h) / g * c, p());
  }, m = (R) => {
    R.preventDefault(), u = !0;
    const $ = e.getBoundingClientRect();
    E(R.clientX - $.left, R.clientY - $.top, R.deltaY < 0 ? 1.1 : 0.9);
  };
  let v = !1, w = !1, b = 0, N = 0, S = 0, M = 0;
  const j = (R) => {
    const $ = R;
    return $ != null && $.closest ? !$.closest(".dd-flow-node") && !$.closest(".dd-flow-edge-hit") : !0;
  }, _ = (R) => {
    j(R.target) && (v = !0, w = !1, b = R.clientX, N = R.clientY, S = f, M = h);
  }, D = (R) => {
    if (!v) return;
    const $ = R.clientX - b, H = R.clientY - N;
    !w && Math.hypot($, H) < Vi || (w = !0, u = !0, e.dataset[Ge] = "1", f = S + $, h = M + H, p());
  }, z = () => {
    v && (v = !1, w && setTimeout(() => delete e.dataset[Ge], 0));
  }, F = { capture: !0 };
  e.addEventListener("wheel", m, { passive: !1, capture: !0 }), e.addEventListener("pointerdown", _, F), e.addEventListener("pointermove", D, F), e.addEventListener("pointerup", z, F), e.addEventListener("pointercancel", z, F);
  const de = new ResizeObserver(() => x());
  return de.observe(e), x(), {
    fit: x,
    reset() {
      u = !1, x();
    },
    zoomBy(R) {
      u = !0;
      const $ = e.getBoundingClientRect();
      E($.width / 2, $.height / 2, R);
    },
    destroy() {
      de.disconnect(), e.removeEventListener("wheel", m, F), e.removeEventListener("pointerdown", _, F), e.removeEventListener("pointermove", D, F), e.removeEventListener("pointerup", z, F), e.removeEventListener("pointercancel", z, F), e.classList.remove("dd-flow-has-viewport");
    }
  };
}
const zi = 4;
function Yi(e, t, n, o = {}) {
  let r = null;
  const s = (c, f, h) => {
    const u = c.createSVGPoint();
    u.x = f, u.y = h;
    const p = c.getScreenCTM();
    if (!p) return { x: f, y: h };
    const y = u.matrixTransform(p.inverse());
    return { x: y.x, y: y.y };
  }, i = () => e.querySelector("svg.dd-flow-svg"), d = (c) => {
    var m, v, w, b, N;
    const f = i();
    if (!f) return;
    const h = c.target, u = s(f, c.clientX, c.clientY), p = (m = h.closest) == null ? void 0 : m.call(h, ".dd-flow-node");
    if (p) {
      const S = p.getAttribute("data-node-id"), M = t.nodes.find((D) => D.id === S);
      if (!M) return;
      const j = (v = h.closest) == null ? void 0 : v.call(h, ".dd-flow-node-row"), _ = (j == null ? void 0 : j.getAttribute("data-row-id")) ?? null;
      r = { node: M, edgeId: null, rowId: _, startX: u.x, startY: u.y, nodeStartX: M.x, nodeStartY: M.y, moved: !1, shiftKey: c.shiftKey }, (w = e.setPointerCapture) == null || w.call(e, c.pointerId);
      return;
    }
    const y = (b = h.closest) == null ? void 0 : b.call(h, ".dd-flow-edge-hit"), x = y == null ? void 0 : y.closest(".dd-flow-edge");
    r = { node: null, edgeId: (x == null ? void 0 : x.getAttribute("data-edge-id")) ?? null, rowId: null, startX: u.x, startY: u.y, nodeStartX: 0, nodeStartY: 0, moved: !1, shiftKey: c.shiftKey }, (N = e.setPointerCapture) == null || N.call(e, c.pointerId);
  }, l = (c) => {
    if (!r || !r.node) return;
    const f = i();
    if (!f) return;
    const h = s(f, c.clientX, c.clientY), u = h.x - r.startX, p = h.y - r.startY;
    e.classList.contains("dd-flow-editing") && (!r.moved && Math.hypot(u, p) < zi || (r.moved = !0, r.node.x = r.nodeStartX + u, r.node.y = r.nodeStartY + p, n()));
  }, a = () => {
    var E, m, v, w, b;
    if (!r) return;
    const { node: c, edgeId: f, rowId: h, moved: u, shiftKey: p, startX: y, startY: x } = r;
    r = null, c ? u ? (E = o.onNodeMoved) == null || E.call(o, c.id) : h ? (m = o.onRowClick) == null || m.call(o, c.id, h, { shiftKey: p }) : (v = o.onNodeClick) == null || v.call(o, c.id, { shiftKey: p }) : f ? (w = o.onEdgeClick) == null || w.call(o, f, { shiftKey: p }) : e.dataset[Ge] || (b = o.onBackgroundClick) == null || b.call(o, { x: y, y: x }, { shiftKey: p });
  };
  return e.addEventListener("pointerdown", d), e.addEventListener("pointermove", l), e.addEventListener("pointerup", a), e.addEventListener("pointercancel", a), {
    destroy() {
      e.removeEventListener("pointerdown", d), e.removeEventListener("pointermove", l), e.removeEventListener("pointerup", a), e.removeEventListener("pointercancel", a);
    }
  };
}
function qi(e, t) {
  return { ...e, nodes: [...e.nodes, t] };
}
function Ui(e, t) {
  return {
    ...e,
    nodes: e.nodes.filter((n) => n.id !== t),
    edges: e.edges.filter((n) => n.from !== t && n.to !== t)
  };
}
function Ki(e, t) {
  return { ...e, edges: e.edges.filter((n) => n.id !== t) };
}
function $e(e, t, n) {
  return { ...e, nodes: e.nodes.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function he(e, t, n) {
  return { ...e, edges: e.edges.map((o) => o.id === t ? { ...o, ...n } : o) };
}
function je(e, t, n) {
  const o = t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || e;
  if (!n.has(o)) return o;
  let r = 2;
  for (; n.has(`${o}-${r}`); ) r++;
  return `${o}-${r}`;
}
function Xi(e) {
  const { spec: t, layout: n, nodePositions: o, selectedNodeIds: r, newSubflowId: s, placeholderNodeId: i, placeholderLabel: d, existingSubflowIds: l } = e, a = new Set(r);
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
    const D = a.has(_.from), z = a.has(_.to);
    D && z ? f.push(_) : !D && z ? h.push(_) : D && !z ? u.push(_) : p.push(_);
  }
  const y = {
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
  }, E = h.map((_) => ({ ..._, to: i })), m = u.map((_) => ({ ..._, from: i })), v = {
    ...t,
    nodes: [...t.nodes.filter((_) => !a.has(_.id)), x],
    edges: [...p, ...E, ...m]
  }, w = new Set(r), b = new Set(f.map((_) => _.id)), N = new Set([...E, ...m].map((_) => _.id)), S = {};
  for (const [_, D] of Object.entries(n.nodes))
    w.has(_) || (S[_] = D);
  const M = {};
  for (const [_, D] of Object.entries(n.edges))
    !b.has(_) && !N.has(_) && (M[_] = D);
  const j = Ji(r, o);
  return j && (S[i] = j), {
    parent: { spec: v, layout: { nodes: S, edges: M } },
    subflow: { spec: y }
  };
}
function Ji(e, t) {
  const n = e.map((s) => t[s]).filter((s) => !!s);
  if (!n.length) return null;
  const o = n.reduce((s, i) => s + i.x, 0) / n.length, r = n.reduce((s, i) => s + i.y, 0) / n.length;
  return { x: o, y: r };
}
const rn = "http://127.0.0.1:5311";
let Et = !1;
function Qi() {
  return Et ? Promise.resolve(!0) : fetch(`${rn}/health`).then((e) => (e.ok && (Et = !0), e.ok)).catch(() => !1);
}
async function Zi(e, t, n) {
  const r = { layoutPath: e.layout ?? e.spec.replace(/\.flow\.json$/, ".layout.json"), layout: n };
  t && (r.specPath = e.spec, r.spec = t);
  try {
    return (await fetch(`${rn}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(r)
    })).ok;
  } catch {
    return !1;
  }
}
let X = null;
function Fe(e, t, n) {
  const { nodes: o, edges: r, orphanedNodeIds: s, orphanedEdgeIds: i } = Be(t, n);
  return { flowId: e, title: t.title, spec: t, nodes: o, edges: r, dirty: !1, specDirty: !1, orphanedNodeIds: s, orphanedEdgeIds: i };
}
function ed(e, t, n = {}) {
  e.classList.add("dd-flow-embed", "dd-flow-inline"), ie(e, t.main.style);
  const o = Fe(t.main.id, t.main, t.mainLayout), r = qe(o.nodes, o.edges);
  e.appendChild(r);
  const s = () => ad(t, n);
  e.addEventListener("click", s);
  const i = () => (X == null ? void 0 : X.bundle) === t;
  return {
    open: s,
    destroy() {
      e.removeEventListener("click", s), e.innerHTML = "";
    },
    // A fresh object every call, even when inactive -- a shared constant here would let a
    // caller's `getSelection().nodeIds.push(...)` mutate what every subsequent inactive read
    // (from this handle AND any other mountFlow() bundle's own inactive reads) observes.
    getSelection: () => i() ? X.getSelection() : { nodeIds: [], edgeId: null },
    setSelection(d) {
      if (!i()) return;
      const l = X.getSelection(), a = new Set(d.nodeIds ?? l.nodeIds), c = d.edgeId !== void 0 ? d.edgeId : l.edgeId;
      X.setSelection(a, c);
    }
  };
}
const td = ".dd-flow-embed[data-flow]:not([data-dd-flow-mounted])";
async function nd(e = document) {
  const t = Array.from(e.querySelectorAll(td));
  await Promise.all(
    t.map(async (n) => {
      n.setAttribute("data-dd-flow-mounted", "1");
      const o = n.getAttribute("data-flow");
      if (o)
        try {
          const r = await fetch(o);
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          const s = await r.json();
          ed(n, s);
        } catch (r) {
          console.error(`dd-flow: failed to load flow from "${o}"`, r), n.textContent = `dd-flow: failed to load "${o}" (see console)`;
        }
    })
  );
}
let B = null;
const pe = 48;
function sn(e, t) {
  const { width: n, height: o } = t.viewBox.baseVal;
  if (!n || !o) return;
  const r = window.innerWidth * 0.96, s = window.innerHeight * 0.92, i = e.toolbar.querySelector(".dd-flow-toolbar-actions"), d = (i == null ? void 0 : i.scrollWidth) ?? 0, a = Math.min(Math.max(640, d + 24), r), c = Math.min(320, s), f = e.toolbar.getBoundingClientRect().height, h = e.warningBanner.hidden ? 0 : e.warningBanner.getBoundingClientRect().height, u = f + h, p = Math.min(Math.max(n + pe, a), r), y = Math.min(Math.max(o + pe + u, c), s);
  e.panel.style.width = `${p}px`, e.panel.style.height = `${y}px`;
  const x = p - pe, E = y - u - pe, m = Math.min(x / n, E / o, 1);
  t.setAttribute("width", String(Math.max(1, Math.floor(n * m)))), t.setAttribute("height", String(Math.max(1, Math.floor(o * m))));
}
function od() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
function rd(e) {
  var o, r;
  if (!od()) return;
  const t = e.webkitRequestFullscreen, n = ((o = e.requestFullscreen) == null ? void 0 : o.bind(e)) ?? (t == null ? void 0 : t.bind(e));
  (r = n == null ? void 0 : n()) == null || r.catch(() => {
  });
}
function sd(e) {
  document.fullscreenElement === e && document.exitFullscreen().catch(() => {
  });
}
function id() {
  if (B) return B;
  const e = document.createElement("div");
  return e.className = "dd-flow-lightbox", e.hidden = !0, e.innerHTML = `
    <div class="dd-flow-lightbox-panel">
      <div class="dd-flow-toolbar">
        <div class="dd-flow-breadcrumb"></div>
        <div class="dd-flow-toolbar-actions">
          <button type="button" class="dd-flow-btn dd-flow-edit-btn">Edit layout</button>
          <button type="button" class="dd-flow-btn dd-flow-add-shape-btn" disabled title="Add shape: click the canvas to place it">+ Shape</button>
          <button type="button" class="dd-flow-btn dd-flow-make-subflow-btn" disabled>Make subflow</button>
          <button type="button" class="dd-flow-btn dd-flow-save-btn" disabled>Save layout</button>
          <button type="button" class="dd-flow-btn dd-flow-export-svg-btn">Export SVG</button>
          <button type="button" class="dd-flow-btn dd-flow-export-png-btn">Export PNG</button>
          <button type="button" class="dd-flow-btn dd-flow-close-btn" aria-label="Close (Esc)">&times;</button>
        </div>
      </div>
      <div class="dd-flow-warning-banner" hidden></div>
      <div class="dd-flow-stage"></div>
    </div>
  `, document.body.appendChild(e), B = {
    root: e,
    panel: e.querySelector(".dd-flow-lightbox-panel"),
    stage: e.querySelector(".dd-flow-stage"),
    toolbar: e.querySelector(".dd-flow-toolbar"),
    breadcrumbEl: e.querySelector(".dd-flow-breadcrumb"),
    editBtn: e.querySelector(".dd-flow-edit-btn"),
    addShapeBtn: e.querySelector(".dd-flow-add-shape-btn"),
    makeSubflowBtn: e.querySelector(".dd-flow-make-subflow-btn"),
    saveBtn: e.querySelector(".dd-flow-save-btn"),
    warningBanner: e.querySelector(".dd-flow-warning-banner"),
    inspector: Gi(e)
  }, e.addEventListener("click", (t) => {
    t.target === e && we();
  }), e.querySelector(".dd-flow-close-btn").addEventListener("click", we), document.addEventListener("keydown", (t) => {
    !e.hidden && t.key === "Escape" && (B != null && B.inspector.isOpen ? B.inspector.hide() : we());
  }), window.addEventListener("resize", () => {
    if (!B || B.root.hidden) return;
    const t = B.stage.querySelector("svg.dd-flow-svg");
    t && sn(B, t);
  }), document.addEventListener("fullscreenchange", () => {
    !document.fullscreenElement && B && !B.root.hidden && we();
  }), B;
}
function we() {
  B && (sd(B.root), B.root.hidden = !0, B.stage.innerHTML = "", B.inspector.hide(), document.body.classList.remove("dd-flow-lightbox-open"), X = null);
}
function dd(e) {
  const t = Math.min(...e.map((s) => s.left)), n = Math.min(...e.map((s) => s.top)), o = Math.max(...e.map((s) => s.right)), r = Math.max(...e.map((s) => s.bottom));
  return new DOMRect(t, n, o - t, r - n);
}
function ad(e, t) {
  var $, H;
  const n = id();
  n.root.hidden = !1, document.body.classList.add("dd-flow-lightbox-open"), rd(n.root);
  const o = [Fe(e.main.id, e.main, e.mainLayout)];
  let r = !1, s = /* @__PURE__ */ new Set(), i = null, d = null, l = !1, a = !1;
  function c() {
    a || !e.sources || Qi().then((g) => {
      !g || n.root.hidden || (a = !0, j(), n.addShapeBtn.disabled = !r);
    });
  }
  c(), n.stage.innerHTML = "";
  const f = document.createElement("div");
  f.className = "dd-flow-stage-inner", n.stage.appendChild(f), ie(n.root, e.main.style);
  const h = { nodes: o[0].nodes, edges: o[0].edges };
  function u() {
    return o[o.length - 1];
  }
  function p() {
    h.nodes = u().nodes, h.edges = u().edges;
  }
  function y(g) {
    return Array.from(f.querySelectorAll(".dd-flow-node")).find((k) => k.getAttribute("data-node-id") === g) ?? null;
  }
  function x(g) {
    return Array.from(f.querySelectorAll(".dd-flow-edge")).find((k) => k.getAttribute("data-edge-id") === g) ?? null;
  }
  function E(g, k = {}) {
    const C = u(), I = Oe(C.nodes, C.edges);
    if (k.resizeNodeId) {
      const T = I.nodes[k.resizeNodeId];
      T && (I.nodes[k.resizeNodeId] = { x: T.x, y: T.y });
    }
    k.clearEdgePoints && delete I.edges[k.clearEdgePoints], k.setNodePosition && (I.nodes[k.setNodePosition.id] = k.setNodePosition.point), C.spec = g(C.spec);
    const L = Be(C.spec, I);
    C.nodes = L.nodes, C.edges = L.edges, C.orphanedNodeIds = L.orphanedNodeIds, C.orphanedEdgeIds = L.orphanedEdgeIds, C.dirty = !0, C.specDirty = !0, p(), n.saveBtn.disabled = !1, M();
  }
  function m(g) {
    var I;
    const k = u().spec.nodes.find((L) => L.id === g), C = k == null ? void 0 : k.subflow;
    return {
      onLabelChange: (L) => {
        E((K) => $e(K, g, { label: L }), { resizeNodeId: g });
        const T = y(g);
        T && n.inspector.refreshAnchor(T.getBoundingClientRect());
      },
      onNoteChange: (L) => E((T) => $e(T, g, { note: L })),
      onTypeChange: (L) => {
        E((T) => $e(T, g, { type: L }), { resizeNodeId: g }), w();
      },
      onDelete: () => {
        E((T) => Ui(T, g));
        const L = new Set(s);
        L.delete(g), b(L, null);
      },
      onGotoSubflow: C && ((I = e.subflows) != null && I[C]) ? () => N(C) : void 0
    };
  }
  function v(g) {
    return {
      onLabelChange: (k) => E((C) => he(C, g, { label: k })),
      onRoutingChange: (k) => E((C) => he(C, g, { routing: k }), { clearEdgePoints: g }),
      onStrokeChange: (k) => E((C) => he(C, g, { stroke: k })),
      onKindChange: (k) => E((C) => he(C, g, { kind: k })),
      onDelete: () => {
        E((k) => Ki(k, g)), b(/* @__PURE__ */ new Set(), null);
      }
    };
  }
  function w(g = {}) {
    if (!r || !a) {
      n.inspector.hide();
      return;
    }
    if (s.size === 1 && !i) {
      const k = [...s][0], C = u().spec.nodes.find((L) => L.id === k), I = y(k);
      if (C && I) {
        n.inspector.showNode(C, I.getBoundingClientRect(), m(k), g);
        return;
      }
    }
    if (i) {
      const k = u().spec.edges.find((I) => I.id === i), C = x(i);
      if (k && C) {
        n.inspector.showEdge(k, C.getBoundingClientRect(), v(i));
        return;
      }
    }
    n.inspector.hide();
  }
  function b(g, k, C = {}) {
    s = g, i = k, d = C.rowKey ?? null, j(), M(), w({ focusLabel: C.focusLabel }), q(f, Y.selectionChange, {
      flowId: u().flowId,
      selectedNodeIds: [...s],
      selectedEdgeId: i
    });
  }
  X = {
    bundle: e,
    getSelection: () => ({ nodeIds: [...s], edgeId: i }),
    setSelection: b
  };
  function N(g) {
    var I;
    const k = (I = e.subflows) == null ? void 0 : I[g];
    if (!k) return;
    const C = u().flowId;
    o.push(Fe(g, k.spec, k.layout)), p(), ie(n.root, k.spec.style ?? e.main.style), _(), b(/* @__PURE__ */ new Set(), null), q(f, Y.subflowOpen, { flowId: C, subflowId: g });
  }
  const S = Yi(f, h, M, {
    onNodeClick: (g, k) => {
      var I;
      const C = u().nodes.find((L) => L.id === g);
      if (C) {
        if (q(f, Y.nodeClick, {
          flowId: u().flowId,
          nodeId: g,
          shiftKey: k.shiftKey
        }), r) {
          let L;
          k.shiftKey ? (L = new Set(s), L.has(g) ? L.delete(g) : L.add(g)) : L = s.size === 1 && s.has(g) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([g]), b(L, null);
          return;
        }
        C.subflow && ((I = e.subflows) != null && I[C.subflow]) && N(C.subflow);
      }
    },
    onNodeMoved: (g) => {
      b(/* @__PURE__ */ new Set([g]), null), u().dirty = !0, n.saveBtn.disabled = !1;
    },
    onRowClick: (g, k, C) => {
      if (q(f, Y.rowClick, {
        flowId: u().flowId,
        nodeId: g,
        rowId: k,
        shiftKey: C.shiftKey
      }), !r) return;
      const I = (d == null ? void 0 : d.nodeId) === g && (d == null ? void 0 : d.rowId) === k;
      b(/* @__PURE__ */ new Set(), null, { rowKey: I ? null : { nodeId: g, rowId: k } });
    },
    onEdgeClick: (g, k) => {
      q(f, Y.edgeClick, {
        flowId: u().flowId,
        edgeId: g,
        shiftKey: k.shiftKey
      }), r && b(/* @__PURE__ */ new Set(), i === g ? null : g);
    },
    onBackgroundClick: (g, k) => {
      if (q(f, Y.backgroundClick, {
        flowId: u().flowId,
        point: g,
        shiftKey: k.shiftKey
      }), !!r) {
        if (l) {
          const C = new Set(u().spec.nodes.map((L) => L.id)), I = je("step", "New step", C);
          E((L) => qi(L, { id: I, label: "New step", type: "process" }), { setNodePosition: { id: I, point: g } }), l = !1, f.classList.remove("dd-flow-placing"), n.addShapeBtn.classList.remove("is-active"), b(/* @__PURE__ */ new Set([I]), null, { focusLabel: !0 });
          return;
        }
        b(/* @__PURE__ */ new Set(), null);
      }
    }
  });
  function M() {
    const g = u(), k = qe(g.nodes, g.edges, { selectedNodeIds: s, selectedEdgeId: i, selectedRowKey: d }), C = f.querySelector("svg.dd-flow-svg");
    C ? f.replaceChild(k, C) : f.appendChild(k), sn(n, k);
  }
  function j() {
    const g = s.size;
    n.makeSubflowBtn.disabled = !r || !a || g < 2, n.makeSubflowBtn.textContent = g >= 2 ? `Make subflow (${g})` : "Make subflow";
  }
  function _() {
    n.breadcrumbEl.innerHTML = "", o.forEach((I, L) => {
      if (L > 0) {
        const K = document.createElement("span");
        K.className = "dd-flow-breadcrumb-sep", K.textContent = "›", n.breadcrumbEl.appendChild(K);
      }
      const T = document.createElement(L === o.length - 1 ? "span" : "button");
      T.className = "dd-flow-breadcrumb-item", T.textContent = I.title, L !== o.length - 1 && (T.type = "button", T.addEventListener("click", () => {
        o.length = L + 1, p(), ie(n.root, u().spec.style ?? e.main.style), _(), b(/* @__PURE__ */ new Set(), null);
      })), n.breadcrumbEl.appendChild(T);
    }), n.saveBtn.disabled = !(u().dirty || u().specDirty), n.editBtn.textContent = r ? "Done editing" : "Edit layout", n.editBtn.classList.toggle("is-active", r), n.addShapeBtn.disabled = !r || !a;
    const { orphanedNodeIds: g, orphanedEdgeIds: k } = u(), C = g.length + k.length;
    if (C > 0) {
      const I = [...g, ...k].join(", ");
      n.warningBanner.textContent = `⚠ The saved layout has ${C} position(s) that no longer match this flow (${I}) — they were dropped. This usually means the flow was regenerated with different node/edge ids.`, n.warningBanner.hidden = !1;
    } else
      n.warningBanner.hidden = !0;
  }
  const D = () => {
    r = !r, f.classList.toggle("dd-flow-editing", r), n.editBtn.textContent = r ? "Done editing" : "Edit layout", n.editBtn.classList.toggle("is-active", r), r && c(), n.addShapeBtn.disabled = !r || !a, r ? (j(), M(), w()) : (l = !1, f.classList.remove("dd-flow-placing"), n.addShapeBtn.classList.remove("is-active"), b(/* @__PURE__ */ new Set(), null));
  }, z = () => {
    !r || !a || (l = !l, f.classList.toggle("dd-flow-placing", l), n.addShapeBtn.classList.toggle("is-active", l));
  }, F = () => {
    if (!r || !a || s.size < 2) return;
    const g = [...s], k = g.map((I) => y(I)).filter((I) => I !== null);
    if (!k.length) return;
    const C = dd(k.map((I) => I.getBoundingClientRect()));
    n.inspector.showPrompt("Name the new subflow", C, "Subflow", (I) => {
      const L = u(), T = new Set(Object.keys(e.subflows ?? {})), K = new Set(L.spec.nodes.map((J) => J.id)), ke = je("subflow", I, T), Ue = je(ke, I, K), Ke = {};
      for (const J of L.nodes) Ke[J.id] = { x: J.x, y: J.y };
      let le;
      try {
        le = Xi({
          spec: L.spec,
          layout: Oe(L.nodes, L.edges),
          nodePositions: Ke,
          selectedNodeIds: g,
          newSubflowId: ke,
          placeholderNodeId: Ue,
          placeholderLabel: I,
          existingSubflowIds: T
        });
      } catch (J) {
        console.error("dd-flow: could not extract subflow", J);
        return;
      }
      L.spec = le.parent.spec;
      const ce = Be(L.spec, le.parent.layout);
      L.nodes = ce.nodes, L.edges = ce.edges, L.orphanedNodeIds = ce.orphanedNodeIds, L.orphanedEdgeIds = ce.orphanedEdgeIds, L.dirty = !0, L.specDirty = !0, e.subflows || (e.subflows = {}), e.subflows[ke] = { spec: le.subflow.spec, layout: void 0 }, p(), n.saveBtn.disabled = !1, _(), b(/* @__PURE__ */ new Set([Ue]), null);
    });
  }, de = async () => {
    var T;
    const g = u(), k = Oe(g.nodes, g.edges), C = g.specDirty, I = t.onSaveLayout || t.onSaveSpec, L = a ? (T = e.sources) == null ? void 0 : T[g.flowId] : void 0;
    if (!I && L && await Zi(L, C ? g.spec : null, k)) {
      g.dirty = !1, g.specDirty = !1, n.saveBtn.disabled = !0;
      return;
    }
    t.onSaveLayout ? t.onSaveLayout(g.flowId, k) : ji(g.flowId, k), C && (t.onSaveSpec ? t.onSaveSpec(g.flowId, g.spec) : Ri(g.flowId, g.spec)), g.dirty = !1, g.specDirty = !1, n.saveBtn.disabled = !0;
  }, ae = () => {
    const g = f.querySelector("svg.dd-flow-svg");
    g && Pi(g, f, `${u().flowId}.svg`);
  }, R = () => {
    const g = f.querySelector("svg.dd-flow-svg");
    g && Bi(g, f, `${u().flowId}.png`);
  };
  n.editBtn.onclick = D, n.addShapeBtn.onclick = z, n.makeSubflowBtn.onclick = F, n.saveBtn.onclick = de, n.root.querySelector(".dd-flow-export-svg-btn").onclick = ae, n.root.querySelector(".dd-flow-export-png-btn").onclick = R, r = !1, s = /* @__PURE__ */ new Set(), i = null, d = null, l = !1, f.classList.remove("dd-flow-editing", "dd-flow-placing"), _(), j(), M(), w(), (H = ($ = n.root._interactions) == null ? void 0 : $.destroy) == null || H.call($), n.root._interactions = S;
}
function xt(e) {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const o of e)
    t.has(o.to) || t.set(o.to, []), t.get(o.to).push(o.from), n.has(o.from) || n.set(o.from, []), n.get(o.from).push(o.to);
  return { parentsOf: t, childrenOf: n };
}
function ne(e, t) {
  const n = /* @__PURE__ */ new Set(), o = [...e.get(t) ?? []];
  for (; o.length; ) {
    const r = o.pop();
    n.has(r) || (n.add(r), o.push(...e.get(r) ?? []));
  }
  return n;
}
const kt = ["is-focus", "is-upstream", "is-downstream", "is-dimmed"], Ct = ["is-row-focus", "is-row-upstream", "is-row-downstream", "is-row-dimmed"];
function dn(e, t, n, o, r) {
  const s = new Set(n ? [...o, n] : []), i = new Set(n ? [...r, n] : []);
  for (const l of e.querySelectorAll(".dd-flow-node")) {
    if (l.classList.remove(...kt), !n) continue;
    const a = l.getAttribute("data-node-id") ?? "";
    a === n ? l.classList.add("is-focus") : o.has(a) ? l.classList.add("is-upstream") : r.has(a) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed");
  }
  const d = new Map(t.map((l) => [l.id, l]));
  for (const l of e.querySelectorAll(".dd-flow-edge")) {
    if (l.classList.remove(...kt), !n) continue;
    const a = d.get(l.getAttribute("data-edge-id") ?? "");
    a && (s.has(a.from) && s.has(a.to) ? l.classList.add("is-upstream") : i.has(a.from) && i.has(a.to) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed"));
  }
}
function me(e, t, n, o) {
  const r = o ? ne(n.parentsOf, o) : /* @__PURE__ */ new Set(), s = o ? ne(n.childrenOf, o) : /* @__PURE__ */ new Set();
  dn(e, t, o, r, s);
}
function Re(e, t, n, o) {
  var c;
  const r = o ? V(o.nodeId, o.rowId) : null, s = r ? ne(n.parentsOf, r) : /* @__PURE__ */ new Set(), i = r ? ne(n.childrenOf, r) : /* @__PURE__ */ new Set(), d = new Set(r ? [...s, r] : []), l = new Set(r ? [...i, r] : []);
  for (const f of e.querySelectorAll(".dd-flow-node-row")) {
    if (f.classList.remove(...Ct), !r) continue;
    const h = ((c = f.closest(".dd-flow-node")) == null ? void 0 : c.getAttribute("data-node-id")) ?? "", u = f.getAttribute("data-row-id") ?? "", p = V(h, u);
    p === r ? f.classList.add("is-row-focus") : s.has(p) ? f.classList.add("is-row-upstream") : i.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
  const a = new Map(t.map((f) => [Ye(f), f]));
  for (const f of e.querySelectorAll(".dd-flow-row-edge")) {
    if (f.classList.remove(...Ct), !r) continue;
    const h = a.get(f.getAttribute("data-row-edge-id") ?? "");
    if (!h) continue;
    const u = V(h.sourceNode, h.sourceRow), p = V(h.targetNode, h.targetRow);
    d.has(u) && d.has(p) ? f.classList.add("is-row-upstream") : l.has(u) && l.has(p) ? f.classList.add("is-row-downstream") : f.classList.add("is-row-dimmed");
  }
}
function ld(e, t, n = {}) {
  const o = xt(t), r = n.flowId ?? "", s = n.rowEdges ?? [], i = xt(
    s.map((m) => ({ id: Ye(m), from: V(m.sourceNode, m.sourceRow), to: V(m.targetNode, m.targetRow) }))
  ), d = /* @__PURE__ */ new Map();
  for (const m of s)
    d.set(V(m.sourceNode, m.sourceRow), m.sourceNode), d.set(V(m.targetNode, m.targetRow), m.targetNode);
  let l = null, a = null;
  const c = () => a ? `r:${a.nodeId}:${a.rowId}` : l ? `n:${l}` : "", f = () => q(e, Y.selectionChange, {
    flowId: r,
    selectedNodeIds: a ? [a.nodeId] : l ? [l] : [],
    selectedEdgeId: null
  }), h = (m) => {
    var w;
    const v = (w = m == null ? void 0 : m.closest) == null ? void 0 : w.call(m, ".dd-flow-node");
    return (v == null ? void 0 : v.getAttribute("data-node-id")) ?? null;
  }, u = (m) => {
    var N, S;
    const v = (N = m == null ? void 0 : m.closest) == null ? void 0 : N.call(m, ".dd-flow-node-row"), w = (S = v == null ? void 0 : v.closest(".dd-flow-node")) == null ? void 0 : S.getAttribute("data-node-id"), b = v == null ? void 0 : v.getAttribute("data-row-id");
    return w && b ? { nodeId: w, rowId: b } : null;
  }, p = () => {
    if (a) {
      const m = V(a.nodeId, a.rowId), v = ne(i.parentsOf, m), w = ne(i.childrenOf, m);
      Re(e, s, i, a);
      const b = new Set([...v].map((S) => d.get(S) ?? S)), N = new Set([...w].map((S) => d.get(S) ?? S));
      dn(e, t, a.nodeId, b, N);
    } else
      me(e, t, o, l), s.length && Re(e, s, i, null);
  }, y = (m) => {
    if (l || a) return;
    const v = h(m.target);
    v && me(e, t, o, v);
  }, x = (m) => {
    var w, b;
    if (l || a) return;
    const v = (b = (w = m.relatedTarget) == null ? void 0 : w.closest) == null ? void 0 : b.call(w, ".dd-flow-node");
    v && v === m.target.closest(".dd-flow-node") || me(e, t, o, null);
  }, E = (m) => {
    const v = h(m.target), w = s.length ? u(m.target) : null, b = c();
    w ? (a = (a == null ? void 0 : a.nodeId) === w.nodeId && (a == null ? void 0 : a.rowId) === w.rowId ? null : w, l = null) : (l = v && v !== l ? v : null, a = null), p(), v ? q(e, Y.nodeClick, { flowId: r, nodeId: v, shiftKey: m.shiftKey }) : q(e, Y.backgroundClick, {
      flowId: r,
      point: { x: m.clientX, y: m.clientY },
      shiftKey: m.shiftKey
    }), c() !== b && f();
  };
  return n.hover !== !1 && (e.addEventListener("pointerover", y), e.addEventListener("pointerout", x)), e.addEventListener("click", E), {
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
      e.removeEventListener("pointerover", y), e.removeEventListener("pointerout", x), e.removeEventListener("click", E), me(e, t, o, null), s.length && Re(e, s, i, null);
    }
  };
}
const ee = {
  nodeWidth: 118,
  nodeHeight: 34,
  layerGap: 170,
  rowGap: 48,
  margin: 30,
  hint: "Hover to preview · click to pin · scroll to zoom · drag to pan"
};
function cd(e, t, n) {
  const { nodeWidth: o, nodeHeight: r, layerGap: s, rowGap: i, margin: d } = n, l = /* @__PURE__ */ new Map();
  for (const p of e) {
    const y = p.layer ?? 0;
    l.has(y) || l.set(y, []), l.get(y).push(p);
  }
  for (const p of l.values()) p.sort((y, x) => y.id.localeCompare(x.id));
  const a = Math.max(1, ...[...l.values()].map((p) => p.length)), c = Math.max(0, ...e.map((p) => p.layer ?? 0)), f = a * (r + i) - i, h = new Set(t.map((p) => p.source)), u = /* @__PURE__ */ new Map();
  for (const [p, y] of l) {
    const x = y.filter((w) => h.has(w.id)), E = y.filter((w) => !h.has(w.id)), m = x.length ? x.length * (r + i) - i : 0, v = d + (f - m) / 2;
    x.forEach((w, b) => {
      u.set(w.id, { x: d + p * s, y: v + b * (r + i) });
    }), E.forEach((w, b) => {
      const N = Math.floor(b / 2), S = b % 2 === 0 ? N : a - 1 - N;
      u.set(w.id, { x: d + p * s, y: d + S * (r + i) });
    });
  }
  return {
    positions: u,
    width: d * 2 + c * s + o,
    height: d * 2 + f
  };
}
const fd = (e) => `${e.source} ${e.target}`;
function ud(e, t, n = {}) {
  const o = n.nodeWidth ?? ee.nodeWidth, r = n.nodeHeight ?? ee.nodeHeight, s = n.hint ?? ee.hint;
  e.classList.add("dd-flow-embed", "dd-flow-graph-mount"), ie(e, n.style ?? "host");
  const i = t.nodes.map((w) => {
    var b;
    return (b = w.rows) != null && b.length ? Jt(w.rows) : r;
  }), d = Math.max(r, ...i), { positions: l } = cd(t.nodes, t.edges, {
    nodeWidth: o,
    nodeHeight: d,
    layerGap: n.layerGap ?? ee.layerGap,
    rowGap: n.rowGap ?? ee.rowGap,
    margin: ee.margin
  }), a = t.nodes.map((w, b) => {
    var _;
    const N = l.get(w.id), S = !!((_ = w.rows) != null && _.length), M = S ? Qt(w.label ?? w.id, w.rows, o) : o, j = S ? i[b] : r;
    return {
      id: w.id,
      label: w.label ?? w.id,
      type: S ? "compound" : "process",
      note: w.note,
      rows: w.rows,
      x: N.x + M / 2,
      y: N.y + d / 2,
      w: M,
      h: j
    };
  }), c = t.edges.filter((w) => l.has(w.source) && l.has(w.target)).map((w) => ({
    id: fd(w),
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
    var j, _;
    const b = (_ = (j = w.target) == null ? void 0 : j.closest) == null ? void 0 : _.call(j, ".dd-flow-node"), N = b == null ? void 0 : b.getAttribute("data-node-id"), S = N ? u.get(N) : void 0;
    if (!S) {
      h.style.display = "none";
      return;
    }
    h.textContent = S.note ? `${S.label ?? S.id} · ${S.note}` : S.label ?? S.id, h.style.display = "block";
    const M = e.getBoundingClientRect();
    h.style.left = `${w.clientX - M.left + 14}px`, h.style.top = `${w.clientY - M.top + 14}px`;
  }, y = () => {
    h.style.display = "none";
  };
  e.addEventListener("pointermove", p), e.addEventListener("pointerleave", y);
  const x = n.id ?? t.id ?? "", E = (w) => {
    var j, _;
    const b = (_ = (j = w.target) == null ? void 0 : j.closest) == null ? void 0 : _.call(j, ".dd-flow-node-row"), N = b == null ? void 0 : b.closest(".dd-flow-node"), S = N == null ? void 0 : N.getAttribute("data-node-id"), M = b == null ? void 0 : b.getAttribute("data-row-id");
    !S || !M || q(e, Y.rowClick, { flowId: x, nodeId: S, rowId: M, shiftKey: w.shiftKey });
  };
  e.addEventListener("click", E);
  let m = Wi(e, f, { maxFitScale: 1 }), v = ld(e, c, { flowId: x, rowEdges: t.rowEdges });
  return {
    destroy() {
      e.removeEventListener("pointermove", p), e.removeEventListener("pointerleave", y), e.removeEventListener("click", E), v == null || v.destroy(), v = null, m == null || m.destroy(), m = null, e.innerHTML = "", e.classList.remove("dd-flow-graph-mount");
    }
  };
}
const hd = ".dd-flow-graph:not([data-dd-flow-mounted])";
async function pd(e = document) {
  const t = Array.from(e.querySelectorAll(hd));
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
        ud(n, r, { style: n.getAttribute("data-style") ?? void 0, hint: s ?? void 0 });
      } catch (r) {
        console.error("dd-flow: failed to mount graph", r), n.textContent = "dd-flow: failed to mount graph (see console)";
      }
    })
  );
}
if (typeof document < "u") {
  const e = () => {
    nd(), pd();
  }, t = globalThis.document$;
  t ? t.subscribe(e) : document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e();
}
export {
  Y as DD_FLOW_EVENTS,
  Me as DEFAULT_THEME,
  ye as THEMES,
  ie as applyTheme,
  ld as attachRelationHighlight,
  Wi as attachViewport,
  nd as autoMountFlows,
  pd as autoMountGraphs,
  xt as buildGraphIndex,
  ne as collectClosure,
  Be as computeLayout,
  q as dispatchFlowEvent,
  xe as downloadBlob,
  ji as downloadLayout,
  Bi as downloadPng,
  Pi as downloadSvg,
  md as emptyLayout,
  cd as layoutLayered,
  ed as mountFlow,
  ud as mountGraph,
  me as paintRelations,
  Re as paintRowRelations,
  vd as registerTheme,
  qe as renderSvg,
  Ci as routeEdge,
  Oe as toLayout
};
