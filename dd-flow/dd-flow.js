var Vt = Object.defineProperty;
var zt = (e, t, n) => t in e ? Vt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var j = (e, t, n) => zt(e, typeof t != "symbol" ? t + "" : t, n);
const Qi = () => ({ nodes: {}, edges: {} });
function Wt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Yt = "\0", Y = "\0", De = "";
let qt = class {
  constructor(t) {
    j(this, "_isDirected", !0);
    j(this, "_isMultigraph", !1);
    j(this, "_isCompound", !1);
    // Label for the graph itself
    j(this, "_label");
    // Defaults to be set when creating a new node
    j(this, "_defaultNodeLabelFn", () => {
    });
    // Defaults to be set when creating a new edge
    j(this, "_defaultEdgeLabelFn", () => {
    });
    // v -> label
    j(this, "_nodes", {});
    // v -> edgeObj
    j(this, "_in", {});
    // u -> v -> Number
    j(this, "_preds", {});
    // v -> edgeObj
    j(this, "_out", {});
    // v -> w -> Number
    j(this, "_sucs", {});
    // e -> edgeObj
    j(this, "_edgeObjs", {});
    // e -> label
    j(this, "_edgeLabels", {});
    /* Number of nodes in the graph. Should only be changed by the implementation. */
    j(this, "_nodeCount", 0);
    /* Number of edges in the graph. Should only be changed by the implementation. */
    j(this, "_edgeCount", 0);
    j(this, "_parent");
    j(this, "_children");
    t && (this._isDirected = Object.hasOwn(t, "directed") ? t.directed : !0, this._isMultigraph = Object.hasOwn(t, "multigraph") ? t.multigraph : !1, this._isCompound = Object.hasOwn(t, "compound") ? t.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[Y] = {});
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
    var r = arguments, o = this;
    return t.forEach(function(s) {
      r.length > 1 ? o.setNode(s, n) : o.setNode(s);
    }), this;
  }
  /**
   * Creates or updates the value for the node v in the graph. If label is supplied
   * it is set as the value for the node. If label is not supplied and the node was
   * created by this call then the default node label will be assigned.
   * Complexity: O(1).
   */
  setNode(t, n) {
    return Object.hasOwn(this._nodes, t) ? (arguments.length > 1 && (this._nodes[t] = n), this) : (this._nodes[t] = arguments.length > 1 ? n : this._defaultNodeLabelFn(t), this._isCompound && (this._parent[t] = Y, this._children[t] = {}, this._children[Y][t] = !0), this._in[t] = {}, this._preds[t] = {}, this._out[t] = {}, this._sucs[t] = {}, ++this._nodeCount, this);
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
      var r = (o) => n.removeEdge(n._edgeObjs[o]);
      delete this._nodes[t], this._isCompound && (this._removeFromParentsChildList(t), delete this._parent[t], this.children(t).forEach(function(o) {
        n.setParent(o);
      }), delete this._children[t]), Object.keys(this._in[t]).forEach(r), delete this._in[t], delete this._preds[t], Object.keys(this._out[t]).forEach(r), delete this._out[t], delete this._sucs[t], --this._nodeCount;
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
      n = Y;
    else {
      n += "";
      for (var r = n; r !== void 0; r = this.parent(r))
        if (r === t)
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
      if (n !== Y)
        return n;
    }
  }
  /**
   * Gets list of direct children of node v.
   * Complexity: O(1).
   */
  children(t = Y) {
    if (this._isCompound) {
      var n = this._children[t];
      if (n)
        return Object.keys(n);
    } else {
      if (t === Y)
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
      const o = new Set(n);
      for (var r of this.successors(t))
        o.add(r);
      return Array.from(o.values());
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
    var r = this;
    Object.entries(this._nodes).forEach(function([i, a]) {
      t(i) && n.setNode(i, a);
    }), Object.values(this._edgeObjs).forEach(function(i) {
      n.hasNode(i.v) && n.hasNode(i.w) && n.setEdge(i, r.edge(i));
    });
    var o = {};
    function s(i) {
      var a = r.parent(i);
      return a === void 0 || n.hasNode(a) ? (o[i] = a, a) : a in o ? o[a] : s(a);
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
    var r = this, o = arguments;
    return t.reduce(function(s, i) {
      return o.length > 1 ? r.setEdge(s, i, n) : r.setEdge(s, i), i;
    }), this;
  }
  /**
   * Creates or updates the label for the edge (v, w) with the optionally supplied
   * name. If label is supplied it is set as the value for the edge. If label is not
   * supplied and the edge was created by this call then the default edge label will
   * be assigned. The name parameter is only useful with multigraphs.
   */
  setEdge() {
    var t, n, r, o, s = !1, i = arguments[0];
    typeof i == "object" && i !== null && "v" in i ? (t = i.v, n = i.w, r = i.name, arguments.length === 2 && (o = arguments[1], s = !0)) : (t = i, n = arguments[1], r = arguments[3], arguments.length > 2 && (o = arguments[2], s = !0)), t = "" + t, n = "" + n, r !== void 0 && (r = "" + r);
    var a = K(this._isDirected, t, n, r);
    if (Object.hasOwn(this._edgeLabels, a))
      return s && (this._edgeLabels[a] = o), this;
    if (r !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[a] = s ? o : this._defaultEdgeLabelFn(t, n, r);
    var c = Ut(this._isDirected, t, n, r);
    return t = c.v, n = c.w, Object.freeze(c), this._edgeObjs[a] = c, Ge(this._preds[n], t), Ge(this._sucs[t], n), this._in[n][a] = c, this._out[t][a] = c, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, r) {
    var o = arguments.length === 1 ? me(this._isDirected, arguments[0]) : K(this._isDirected, t, n, r);
    return this._edgeLabels[o];
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
  hasEdge(t, n, r) {
    var o = arguments.length === 1 ? me(this._isDirected, arguments[0]) : K(this._isDirected, t, n, r);
    return Object.hasOwn(this._edgeLabels, o);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, r) {
    var o = arguments.length === 1 ? me(this._isDirected, arguments[0]) : K(this._isDirected, t, n, r), s = this._edgeObjs[o];
    return s && (t = s.v, n = s.w, delete this._edgeLabels[o], delete this._edgeObjs[o], Fe(this._preds[n], t), Fe(this._sucs[t], n), delete this._in[n][o], delete this._out[t][o], this._edgeCount--), this;
  }
  /**
   * Return all edges that point to the node v. Optionally filters those edges down to just those
   * coming from node u. Behavior is undefined for undirected graphs - use nodeEdges instead.
   * Complexity: O(|E|).
   */
  inEdges(t, n) {
    var r = this._in[t];
    if (r) {
      var o = Object.values(r);
      return n ? o.filter((s) => s.v === n) : o;
    }
  }
  /**
   * Return all edges that are pointed at by node v. Optionally filters those edges down to just
   * those point to w. Behavior is undefined for undirected graphs - use nodeEdges instead.
   * Complexity: O(|E|).
   */
  outEdges(t, n) {
    var r = this._out[t];
    if (r) {
      var o = Object.values(r);
      return n ? o.filter((s) => s.w === n) : o;
    }
  }
  /**
   * Returns all edges to or from node v regardless of direction. Optionally filters those edges
   * down to just those between nodes v and w regardless of direction.
   * Complexity: O(|E|).
   */
  nodeEdges(t, n) {
    var r = this.inEdges(t, n);
    if (r)
      return r.concat(this.outEdges(t, n));
  }
};
function Ge(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function Fe(e, t) {
  --e[t] || delete e[t];
}
function K(e, t, n, r) {
  var o = "" + t, s = "" + n;
  if (!e && o > s) {
    var i = o;
    o = s, s = i;
  }
  return o + De + s + De + (r === void 0 ? Yt : r);
}
function Ut(e, t, n, r) {
  var o = "" + t, s = "" + n;
  if (!e && o > s) {
    var i = o;
    o = s, s = i;
  }
  var a = { v: o, w: s };
  return r && (a.name = r), a;
}
function me(e, t) {
  return K(e, t.v, t.w, t.name);
}
var $e = qt, Xt = "2.2.4", Kt = {
  Graph: $e,
  version: Xt
}, Jt = $e, Qt = {
  write: Zt,
  read: nn
};
function Zt(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: en(e),
    edges: tn(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function en(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), r = e.parent(t), o = { v: t };
    return n !== void 0 && (o.value = n), r !== void 0 && (o.parent = r), o;
  });
}
function tn(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), r = { v: t.v, w: t.w };
    return t.name !== void 0 && (r.name = t.name), n !== void 0 && (r.value = n), r;
  });
}
function nn(e) {
  var t = new Jt(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var rn = on;
function on(e) {
  var t = {}, n = [], r;
  function o(s) {
    Object.hasOwn(t, s) || (t[s] = !0, r.push(s), e.successors(s).forEach(o), e.predecessors(s).forEach(o));
  }
  return e.nodes().forEach(function(s) {
    r = [], o(s), r.length && n.push(r);
  }), n;
}
let sn = class {
  constructor() {
    j(this, "_arr", []);
    j(this, "_keyIndices", {});
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
    var r = this._keyIndices;
    if (t = String(t), !Object.hasOwn(r, t)) {
      var o = this._arr, s = o.length;
      return r[t] = s, o.push({ key: t, priority: n }), this._decrease(s), !0;
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
    var r = this._keyIndices[t];
    if (n > this._arr[r].priority)
      throw new Error("New priority is greater than current priority. Key: " + t + " Old: " + this._arr[r].priority + " New: " + n);
    this._arr[r].priority = n, this._decrease(r);
  }
  _heapify(t) {
    var n = this._arr, r = 2 * t, o = r + 1, s = t;
    r < n.length && (s = n[r].priority < n[s].priority ? r : s, o < n.length && (s = n[o].priority < n[s].priority ? o : s), s !== t && (this._swap(t, s), this._heapify(s)));
  }
  _decrease(t) {
    for (var n = this._arr, r = n[t].priority, o; t !== 0 && (o = t >> 1, !(n[o].priority < r)); )
      this._swap(t, o), t = o;
  }
  _swap(t, n) {
    var r = this._arr, o = this._keyIndices, s = r[t], i = r[n];
    r[t] = i, r[n] = s, o[i.key] = t, o[s.key] = n;
  }
};
var ut = sn, an = ut, ht = ln, dn = () => 1;
function ln(e, t, n, r) {
  return cn(
    e,
    String(t),
    n || dn,
    r || function(o) {
      return e.outEdges(o);
    }
  );
}
function cn(e, t, n, r) {
  var o = {}, s = new an(), i, a, c = function(l) {
    var d = l.v !== i ? l.v : l.w, f = o[d], u = n(l), h = a.distance + u;
    if (u < 0)
      throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + l + " Weight: " + u);
    h < f.distance && (f.distance = h, f.predecessor = i, s.decrease(d, h));
  };
  for (e.nodes().forEach(function(l) {
    var d = l === t ? 0 : Number.POSITIVE_INFINITY;
    o[l] = { distance: d }, s.add(l, d);
  }); s.size() > 0 && (i = s.removeMin(), a = o[i], a.distance !== Number.POSITIVE_INFINITY); )
    r(i).forEach(c);
  return o;
}
var fn = ht, un = hn;
function hn(e, t, n) {
  return e.nodes().reduce(function(r, o) {
    return r[o] = fn(e, o, t, n), r;
  }, {});
}
var pt = pn;
function pn(e) {
  var t = 0, n = [], r = {}, o = [];
  function s(i) {
    var a = r[i] = {
      onStack: !0,
      lowlink: t,
      index: t++
    };
    if (n.push(i), e.successors(i).forEach(function(d) {
      Object.hasOwn(r, d) ? r[d].onStack && (a.lowlink = Math.min(a.lowlink, r[d].index)) : (s(d), a.lowlink = Math.min(a.lowlink, r[d].lowlink));
    }), a.lowlink === a.index) {
      var c = [], l;
      do
        l = n.pop(), r[l].onStack = !1, c.push(l);
      while (i !== l);
      o.push(c);
    }
  }
  return e.nodes().forEach(function(i) {
    Object.hasOwn(r, i) || s(i);
  }), o;
}
var mn = pt, wn = gn;
function gn(e) {
  return mn(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var bn = yn, vn = () => 1;
function yn(e, t, n) {
  return En(
    e,
    t || vn,
    n || function(r) {
      return e.outEdges(r);
    }
  );
}
function En(e, t, n) {
  var r = {}, o = e.nodes();
  return o.forEach(function(s) {
    r[s] = {}, r[s][s] = { distance: 0 }, o.forEach(function(i) {
      s !== i && (r[s][i] = { distance: Number.POSITIVE_INFINITY });
    }), n(s).forEach(function(i) {
      var a = i.v === s ? i.w : i.v, c = t(i);
      r[s][a] = { distance: c, predecessor: s };
    });
  }), o.forEach(function(s) {
    var i = r[s];
    o.forEach(function(a) {
      var c = r[a];
      o.forEach(function(l) {
        var d = c[s], f = i[l], u = c[l], h = d.distance + f.distance;
        h < u.distance && (u.distance = h, u.predecessor = f.predecessor);
      });
    });
  }), r;
}
function mt(e) {
  var t = {}, n = {}, r = [];
  function o(s) {
    if (Object.hasOwn(n, s))
      throw new Le();
    Object.hasOwn(t, s) || (n[s] = !0, t[s] = !0, e.predecessors(s).forEach(o), delete n[s], r.push(s));
  }
  if (e.sinks().forEach(o), Object.keys(t).length !== e.nodeCount())
    throw new Le();
  return r;
}
class Le extends Error {
  constructor() {
    super(...arguments);
  }
}
var wt = mt;
mt.CycleException = Le;
var He = wt, xn = kn;
function kn(e) {
  try {
    He(e);
  } catch (t) {
    if (t instanceof He.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var gt = _n;
function _n(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var r = e.isDirected() ? (a) => e.successors(a) : (a) => e.neighbors(a), o = n === "post" ? Ln : Cn, s = [], i = {};
  return t.forEach((a) => {
    if (!e.hasNode(a))
      throw new Error("Graph does not have node: " + a);
    o(a, r, i, s);
  }), s;
}
function Ln(e, t, n, r) {
  for (var o = [[e, !1]]; o.length > 0; ) {
    var s = o.pop();
    s[1] ? r.push(s[0]) : Object.hasOwn(n, s[0]) || (n[s[0]] = !0, o.push([s[0], !0]), bt(t(s[0]), (i) => o.push([i, !1])));
  }
}
function Cn(e, t, n, r) {
  for (var o = [e]; o.length > 0; ) {
    var s = o.pop();
    Object.hasOwn(n, s) || (n[s] = !0, r.push(s), bt(t(s), (i) => o.push(i)));
  }
}
function bt(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var Nn = gt, Sn = On;
function On(e, t) {
  return Nn(e, t, "post");
}
var Mn = gt, In = $n;
function $n(e, t) {
  return Mn(e, t, "pre");
}
var jn = $e, Tn = ut, Rn = An;
function An(e, t) {
  var n = new jn(), r = {}, o = new Tn(), s;
  function i(c) {
    var l = c.v === s ? c.w : c.v, d = o.priority(l);
    if (d !== void 0) {
      var f = t(c);
      f < d && (r[l] = s, o.decrease(l, f));
    }
  }
  if (e.nodeCount() === 0)
    return n;
  e.nodes().forEach(function(c) {
    o.add(c, Number.POSITIVE_INFINITY), n.setNode(c);
  }), o.decrease(e.nodes()[0], 0);
  for (var a = !1; o.size() > 0; ) {
    if (s = o.removeMin(), Object.hasOwn(r, s))
      n.setEdge(s, r[s]);
    else {
      if (a)
        throw new Error("Input graph is not connected: " + e);
      a = !0;
    }
    e.nodeEdges(s).forEach(i);
  }
  return n;
}
var Pn = {
  components: rn,
  dijkstra: ht,
  dijkstraAll: un,
  findCycles: wn,
  floydWarshall: bn,
  isAcyclic: xn,
  postorder: Sn,
  preorder: In,
  prim: Rn,
  tarjan: pt,
  topsort: wt
}, Ve = Kt, G = {
  Graph: Ve.Graph,
  json: Qt,
  alg: Pn,
  version: Ve.version
};
let Bn = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return ze(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && ze(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, r = n._prev;
    for (; r !== n; )
      t.push(JSON.stringify(r, Dn)), r = r._prev;
    return "[" + t.join(", ") + "]";
  }
};
function ze(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function Dn(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var Gn = Bn;
let Fn = G.Graph, Hn = Gn;
var Vn = Wn;
let zn = () => 1;
function Wn(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = qn(e, t || zn);
  return Yn(n.graph, n.buckets, n.zeroIdx).flatMap((o) => e.outEdges(o.v, o.w));
}
function Yn(e, t, n) {
  let r = [], o = t[t.length - 1], s = t[0], i;
  for (; e.nodeCount(); ) {
    for (; i = s.dequeue(); )
      we(e, t, n, i);
    for (; i = o.dequeue(); )
      we(e, t, n, i);
    if (e.nodeCount()) {
      for (let a = t.length - 2; a > 0; --a)
        if (i = t[a].dequeue(), i) {
          r = r.concat(we(e, t, n, i, !0));
          break;
        }
    }
  }
  return r;
}
function we(e, t, n, r, o) {
  let s = o ? [] : void 0;
  return e.inEdges(r.v).forEach((i) => {
    let a = e.edge(i), c = e.node(i.v);
    o && s.push({ v: i.v, w: i.w }), c.out -= a, Ce(t, n, c);
  }), e.outEdges(r.v).forEach((i) => {
    let a = e.edge(i), c = i.w, l = e.node(c);
    l.in -= a, Ce(t, n, l);
  }), e.removeNode(r.v), s;
}
function qn(e, t) {
  let n = new Fn(), r = 0, o = 0;
  e.nodes().forEach((a) => {
    n.setNode(a, { v: a, in: 0, out: 0 });
  }), e.edges().forEach((a) => {
    let c = n.edge(a.v, a.w) || 0, l = t(a), d = c + l;
    n.setEdge(a.v, a.w, d), o = Math.max(o, n.node(a.v).out += l), r = Math.max(r, n.node(a.w).in += l);
  });
  let s = Un(o + r + 3).map(() => new Hn()), i = r + 1;
  return n.nodes().forEach((a) => {
    Ce(s, i, n.node(a));
  }), { graph: n, buckets: s, zeroIdx: i };
}
function Ce(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function Un(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let vt = G.Graph;
var T = {
  addBorderNode: rr,
  addDummyNode: yt,
  applyWithChunking: fe,
  asNonCompoundGraph: Kn,
  buildLayerMatrix: er,
  intersectRect: Zn,
  mapValues: cr,
  maxRank: xt,
  normalizeRanks: tr,
  notime: ar,
  partition: sr,
  pick: lr,
  predecessorWeights: Qn,
  range: _t,
  removeEmptyRanks: nr,
  simplify: Xn,
  successorWeights: Jn,
  time: ir,
  uniqueId: kt,
  zipObject: je
};
function yt(e, t, n, r) {
  for (var o = r; e.hasNode(o); )
    o = kt(r);
  return n.dummy = t, e.setNode(o, n), o;
}
function Xn(e) {
  let t = new vt().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let r = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, o = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: r.weight + o.weight,
      minlen: Math.max(r.minlen, o.minlen)
    });
  }), t;
}
function Kn(e) {
  let t = new vt({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function Jn(e) {
  let t = e.nodes().map((n) => {
    let r = {};
    return e.outEdges(n).forEach((o) => {
      r[o.w] = (r[o.w] || 0) + e.edge(o).weight;
    }), r;
  });
  return je(e.nodes(), t);
}
function Qn(e) {
  let t = e.nodes().map((n) => {
    let r = {};
    return e.inEdges(n).forEach((o) => {
      r[o.v] = (r[o.v] || 0) + e.edge(o).weight;
    }), r;
  });
  return je(e.nodes(), t);
}
function Zn(e, t) {
  let n = e.x, r = e.y, o = t.x - n, s = t.y - r, i = e.width / 2, a = e.height / 2;
  if (!o && !s)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let c, l;
  return Math.abs(s) * i > Math.abs(o) * a ? (s < 0 && (a = -a), c = a * o / s, l = a) : (o < 0 && (i = -i), c = i, l = i * s / o), { x: n + c, y: r + l };
}
function er(e) {
  let t = _t(xt(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let r = e.node(n), o = r.rank;
    o !== void 0 && (t[o][r.order] = n);
  }), t;
}
function tr(e) {
  let t = e.nodes().map((r) => {
    let o = e.node(r).rank;
    return o === void 0 ? Number.MAX_VALUE : o;
  }), n = fe(Math.min, t);
  e.nodes().forEach((r) => {
    let o = e.node(r);
    Object.hasOwn(o, "rank") && (o.rank -= n);
  });
}
function nr(e) {
  let t = e.nodes().map((i) => e.node(i).rank), n = fe(Math.min, t), r = [];
  e.nodes().forEach((i) => {
    let a = e.node(i).rank - n;
    r[a] || (r[a] = []), r[a].push(i);
  });
  let o = 0, s = e.graph().nodeRankFactor;
  Array.from(r).forEach((i, a) => {
    i === void 0 && a % s !== 0 ? --o : i !== void 0 && o && i.forEach((c) => e.node(c).rank += o);
  });
}
function rr(e, t, n, r) {
  let o = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (o.rank = n, o.order = r), yt(e, "border", o, t);
}
function or(e, t = Et) {
  const n = [];
  for (let r = 0; r < e.length; r += t) {
    const o = e.slice(r, r + t);
    n.push(o);
  }
  return n;
}
const Et = 65535;
function fe(e, t) {
  if (t.length > Et) {
    const n = or(t);
    return e.apply(null, n.map((r) => e.apply(null, r)));
  } else
    return e.apply(null, t);
}
function xt(e) {
  const n = e.nodes().map((r) => {
    let o = e.node(r).rank;
    return o === void 0 ? Number.MIN_VALUE : o;
  });
  return fe(Math.max, n);
}
function sr(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((r) => {
    t(r) ? n.lhs.push(r) : n.rhs.push(r);
  }), n;
}
function ir(e, t) {
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
let dr = 0;
function kt(e) {
  var t = ++dr;
  return e + ("" + t);
}
function _t(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let r = (s) => s < t;
  n < 0 && (r = (s) => t < s);
  const o = [];
  for (let s = e; r(s); s += n)
    o.push(s);
  return o;
}
function lr(e, t) {
  const n = {};
  for (const r of t)
    e[r] !== void 0 && (n[r] = e[r]);
  return n;
}
function cr(e, t) {
  let n = t;
  return typeof t == "string" && (n = (r) => r[t]), Object.entries(e).reduce((r, [o, s]) => (r[o] = n(s, o), r), {});
}
function je(e, t) {
  return e.reduce((n, r, o) => (n[r] = t[o], n), {});
}
let fr = Vn, ur = T.uniqueId;
var hr = {
  run: pr,
  undo: wr
};
function pr(e) {
  (e.graph().acyclicer === "greedy" ? fr(e, n(e)) : mr(e)).forEach((r) => {
    let o = e.edge(r);
    e.removeEdge(r), o.forwardName = r.name, o.reversed = !0, e.setEdge(r.w, r.v, o, ur("rev"));
  });
  function n(r) {
    return (o) => r.edge(o).weight;
  }
}
function mr(e) {
  let t = [], n = {}, r = {};
  function o(s) {
    Object.hasOwn(r, s) || (r[s] = !0, n[s] = !0, e.outEdges(s).forEach((i) => {
      Object.hasOwn(n, i.w) ? t.push(i) : o(i.w);
    }), delete n[s]);
  }
  return e.nodes().forEach(o), t;
}
function wr(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let r = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, r);
    }
  });
}
let gr = T;
var br = {
  run: vr,
  undo: Er
};
function vr(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => yr(e, t));
}
function yr(e, t) {
  let n = t.v, r = e.node(n).rank, o = t.w, s = e.node(o).rank, i = t.name, a = e.edge(t), c = a.labelRank;
  if (s === r + 1) return;
  e.removeEdge(t);
  let l, d, f;
  for (f = 0, ++r; r < s; ++f, ++r)
    a.points = [], d = {
      width: 0,
      height: 0,
      edgeLabel: a,
      edgeObj: t,
      rank: r
    }, l = gr.addDummyNode(e, "edge", d, "_d"), r === c && (d.width = a.width, d.height = a.height, d.dummy = "edge-label", d.labelpos = a.labelpos), e.setEdge(n, l, { weight: a.weight }, i), f === 0 && e.graph().dummyChains.push(l), n = l;
  e.setEdge(n, o, { weight: a.weight }, i);
}
function Er(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), r = n.edgeLabel, o;
    for (e.setEdge(n.edgeObj, r); n.dummy; )
      o = e.successors(t)[0], e.removeNode(t), r.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (r.x = n.x, r.y = n.y, r.width = n.width, r.height = n.height), t = o, n = e.node(t);
  });
}
const { applyWithChunking: xr } = T;
var ue = {
  longestPath: kr,
  slack: _r
};
function kr(e) {
  var t = {};
  function n(r) {
    var o = e.node(r);
    if (Object.hasOwn(t, r))
      return o.rank;
    t[r] = !0;
    let s = e.outEdges(r).map((a) => a == null ? Number.POSITIVE_INFINITY : n(a.w) - e.edge(a).minlen);
    var i = xr(Math.min, s);
    return i === Number.POSITIVE_INFINITY && (i = 0), o.rank = i;
  }
  e.sources().forEach(n);
}
function _r(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var Lr = G.Graph, de = ue.slack, Lt = Cr;
function Cr(e) {
  var t = new Lr({ directed: !1 }), n = e.nodes()[0], r = e.nodeCount();
  t.setNode(n, {});
  for (var o, s; Nr(t, e) < r; )
    o = Sr(t, e), s = t.hasNode(o.v) ? de(e, o) : -de(e, o), Or(t, e, s);
  return t;
}
function Nr(e, t) {
  function n(r) {
    t.nodeEdges(r).forEach((o) => {
      var s = o.v, i = r === s ? o.w : s;
      !e.hasNode(i) && !de(t, o) && (e.setNode(i, {}), e.setEdge(r, i, {}), n(i));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function Sr(e, t) {
  return t.edges().reduce((r, o) => {
    let s = Number.POSITIVE_INFINITY;
    return e.hasNode(o.v) !== e.hasNode(o.w) && (s = de(t, o)), s < r[0] ? [s, o] : r;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Or(e, t, n) {
  e.nodes().forEach((r) => t.node(r).rank += n);
}
var Mr = Lt, We = ue.slack, Ir = ue.longestPath, $r = G.alg.preorder, jr = G.alg.postorder, Tr = T.simplify, Rr = q;
q.initLowLimValues = Re;
q.initCutValues = Te;
q.calcCutValue = Ct;
q.leaveEdge = St;
q.enterEdge = Ot;
q.exchangeEdges = Mt;
function q(e) {
  e = Tr(e), Ir(e);
  var t = Mr(e);
  Re(t), Te(t, e);
  for (var n, r; n = St(t); )
    r = Ot(t, e, n), Mt(t, e, n, r);
}
function Te(e, t) {
  var n = jr(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((r) => Ar(e, t, r));
}
function Ar(e, t, n) {
  var r = e.node(n), o = r.parent;
  e.edge(n, o).cutvalue = Ct(e, t, n);
}
function Ct(e, t, n) {
  var r = e.node(n), o = r.parent, s = !0, i = t.edge(n, o), a = 0;
  return i || (s = !1, i = t.edge(o, n)), a = i.weight, t.nodeEdges(n).forEach((c) => {
    var l = c.v === n, d = l ? c.w : c.v;
    if (d !== o) {
      var f = l === s, u = t.edge(c).weight;
      if (a += f ? u : -u, Br(e, n, d)) {
        var h = e.edge(n, d).cutvalue;
        a += f ? -h : h;
      }
    }
  }), a;
}
function Re(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), Nt(e, {}, 1, t);
}
function Nt(e, t, n, r, o) {
  var s = n, i = e.node(r);
  return t[r] = !0, e.neighbors(r).forEach((a) => {
    Object.hasOwn(t, a) || (n = Nt(e, t, n, a, r));
  }), i.low = s, i.lim = n++, o ? i.parent = o : delete i.parent, n;
}
function St(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function Ot(e, t, n) {
  var r = n.v, o = n.w;
  t.hasEdge(r, o) || (r = n.w, o = n.v);
  var s = e.node(r), i = e.node(o), a = s, c = !1;
  s.lim > i.lim && (a = i, c = !0);
  var l = t.edges().filter((d) => c === Ye(e, e.node(d.v), a) && c !== Ye(e, e.node(d.w), a));
  return l.reduce((d, f) => We(t, f) < We(t, d) ? f : d);
}
function Mt(e, t, n, r) {
  var o = n.v, s = n.w;
  e.removeEdge(o, s), e.setEdge(r.v, r.w, {}), Re(e), Te(e, t), Pr(e, t);
}
function Pr(e, t) {
  var n = e.nodes().find((o) => !t.node(o).parent), r = $r(e, n);
  r = r.slice(1), r.forEach((o) => {
    var s = e.node(o).parent, i = t.edge(o, s), a = !1;
    i || (i = t.edge(s, o), a = !0), t.node(o).rank = t.node(s).rank + (a ? i.minlen : -i.minlen);
  });
}
function Br(e, t, n) {
  return e.hasEdge(t, n);
}
function Ye(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var Dr = ue, It = Dr.longestPath, Gr = Lt, Fr = Rr, Hr = Vr;
function Vr(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      qe(e);
      break;
    case "tight-tree":
      Wr(e);
      break;
    case "longest-path":
      zr(e);
      break;
    case "none":
      break;
    default:
      qe(e);
  }
}
var zr = It;
function Wr(e) {
  It(e), Gr(e);
}
function qe(e) {
  Fr(e);
}
var Yr = qr;
function qr(e) {
  let t = Xr(e);
  e.graph().dummyChains.forEach((n) => {
    let r = e.node(n), o = r.edgeObj, s = Ur(e, t, o.v, o.w), i = s.path, a = s.lca, c = 0, l = i[c], d = !0;
    for (; n !== o.w; ) {
      if (r = e.node(n), d) {
        for (; (l = i[c]) !== a && e.node(l).maxRank < r.rank; )
          c++;
        l === a && (d = !1);
      }
      if (!d) {
        for (; c < i.length - 1 && e.node(l = i[c + 1]).minRank <= r.rank; )
          c++;
        l = i[c];
      }
      e.setParent(n, l), n = e.successors(n)[0];
    }
  });
}
function Ur(e, t, n, r) {
  let o = [], s = [], i = Math.min(t[n].low, t[r].low), a = Math.max(t[n].lim, t[r].lim), c, l;
  c = n;
  do
    c = e.parent(c), o.push(c);
  while (c && (t[c].low > i || a > t[c].lim));
  for (l = c, c = r; (c = e.parent(c)) !== l; )
    s.push(c);
  return { path: o.concat(s.reverse()), lca: l };
}
function Xr(e) {
  let t = {}, n = 0;
  function r(o) {
    let s = n;
    e.children(o).forEach(r), t[o] = { low: s, lim: n++ };
  }
  return e.children().forEach(r), t;
}
let le = T;
var Kr = {
  run: Jr,
  cleanup: eo
};
function Jr(e) {
  let t = le.addDummyNode(e, "root", {}, "_root"), n = Qr(e), r = Object.values(n), o = le.applyWithChunking(Math.max, r) - 1, s = 2 * o + 1;
  e.graph().nestingRoot = t, e.edges().forEach((a) => e.edge(a).minlen *= s);
  let i = Zr(e) + 1;
  e.children().forEach((a) => $t(e, t, s, i, o, n, a)), e.graph().nodeRankFactor = s;
}
function $t(e, t, n, r, o, s, i) {
  let a = e.children(i);
  if (!a.length) {
    i !== t && e.setEdge(t, i, { weight: 0, minlen: n });
    return;
  }
  let c = le.addBorderNode(e, "_bt"), l = le.addBorderNode(e, "_bb"), d = e.node(i);
  e.setParent(c, i), d.borderTop = c, e.setParent(l, i), d.borderBottom = l, a.forEach((f) => {
    $t(e, t, n, r, o, s, f);
    let u = e.node(f), h = u.borderTop ? u.borderTop : f, p = u.borderBottom ? u.borderBottom : f, g = u.borderTop ? r : 2 * r, w = h !== p ? 1 : o - s[i] + 1;
    e.setEdge(c, h, {
      weight: g,
      minlen: w,
      nestingEdge: !0
    }), e.setEdge(p, l, {
      weight: g,
      minlen: w,
      nestingEdge: !0
    });
  }), e.parent(i) || e.setEdge(t, c, { weight: 0, minlen: o + s[i] });
}
function Qr(e) {
  var t = {};
  function n(r, o) {
    var s = e.children(r);
    s && s.length && s.forEach((i) => n(i, o + 1)), t[r] = o;
  }
  return e.children().forEach((r) => n(r, 1)), t;
}
function Zr(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function eo(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var r = e.edge(n);
    r.nestingEdge && e.removeEdge(n);
  });
}
let to = T;
var no = ro;
function ro(e) {
  function t(n) {
    let r = e.children(n), o = e.node(n);
    if (r.length && r.forEach(t), Object.hasOwn(o, "minRank")) {
      o.borderLeft = [], o.borderRight = [];
      for (let s = o.minRank, i = o.maxRank + 1; s < i; ++s)
        Ue(e, "borderLeft", "_bl", n, o, s), Ue(e, "borderRight", "_br", n, o, s);
    }
  }
  e.children().forEach(t);
}
function Ue(e, t, n, r, o, s) {
  let i = { width: 0, height: 0, rank: s, borderType: t }, a = o[t][s - 1], c = to.addDummyNode(e, "border", i, n);
  o[t][s] = c, e.setParent(c, r), a && e.setEdge(a, c, { weight: 1 });
}
var oo = {
  adjust: so,
  undo: io
};
function so(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && jt(e);
}
function io(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && ao(e), (t === "lr" || t === "rl") && (lo(e), jt(e));
}
function jt(e) {
  e.nodes().forEach((t) => Xe(e.node(t))), e.edges().forEach((t) => Xe(e.edge(t)));
}
function Xe(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function ao(e) {
  e.nodes().forEach((t) => ge(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(ge), Object.hasOwn(n, "y") && ge(n);
  });
}
function ge(e) {
  e.y = -e.y;
}
function lo(e) {
  e.nodes().forEach((t) => be(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(be), Object.hasOwn(n, "x") && be(n);
  });
}
function be(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let Ke = T;
var co = fo;
function fo(e) {
  let t = {}, n = e.nodes().filter((c) => !e.children(c).length), r = n.map((c) => e.node(c).rank), o = Ke.applyWithChunking(Math.max, r), s = Ke.range(o + 1).map(() => []);
  function i(c) {
    if (t[c]) return;
    t[c] = !0;
    let l = e.node(c);
    s[l.rank].push(c), e.successors(c).forEach(i);
  }
  return n.sort((c, l) => e.node(c).rank - e.node(l).rank).forEach(i), s;
}
let uo = T.zipObject;
var ho = po;
function po(e, t) {
  let n = 0;
  for (let r = 1; r < t.length; ++r)
    n += mo(e, t[r - 1], t[r]);
  return n;
}
function mo(e, t, n) {
  let r = uo(n, n.map((l, d) => d)), o = t.flatMap((l) => e.outEdges(l).map((d) => ({ pos: r[d.w], weight: e.edge(d).weight })).sort((d, f) => d.pos - f.pos)), s = 1;
  for (; s < n.length; ) s <<= 1;
  let i = 2 * s - 1;
  s -= 1;
  let a = new Array(i).fill(0), c = 0;
  return o.forEach((l) => {
    let d = l.pos + s;
    a[d] += l.weight;
    let f = 0;
    for (; d > 0; )
      d % 2 && (f += a[d + 1]), d = d - 1 >> 1, a[d] += l.weight;
    c += l.weight * f;
  }), c;
}
var wo = go;
function go(e, t = []) {
  return t.map((n) => {
    let r = e.inEdges(n);
    if (r.length) {
      let o = r.reduce((s, i) => {
        let a = e.edge(i), c = e.node(i.v);
        return {
          sum: s.sum + a.weight * c.order,
          weight: s.weight + a.weight
        };
      }, { sum: 0, weight: 0 });
      return {
        v: n,
        barycenter: o.sum / o.weight,
        weight: o.weight
      };
    } else
      return { v: n };
  });
}
let bo = T;
var vo = yo;
function yo(e, t) {
  let n = {};
  e.forEach((o, s) => {
    let i = n[o.v] = {
      indegree: 0,
      in: [],
      out: [],
      vs: [o.v],
      i: s
    };
    o.barycenter !== void 0 && (i.barycenter = o.barycenter, i.weight = o.weight);
  }), t.edges().forEach((o) => {
    let s = n[o.v], i = n[o.w];
    s !== void 0 && i !== void 0 && (i.indegree++, s.out.push(n[o.w]));
  });
  let r = Object.values(n).filter((o) => !o.indegree);
  return Eo(r);
}
function Eo(e) {
  let t = [];
  function n(o) {
    return (s) => {
      s.merged || (s.barycenter === void 0 || o.barycenter === void 0 || s.barycenter >= o.barycenter) && xo(o, s);
    };
  }
  function r(o) {
    return (s) => {
      s.in.push(o), --s.indegree === 0 && e.push(s);
    };
  }
  for (; e.length; ) {
    let o = e.pop();
    t.push(o), o.in.reverse().forEach(n(o)), o.out.forEach(r(o));
  }
  return t.filter((o) => !o.merged).map((o) => bo.pick(o, ["vs", "i", "barycenter", "weight"]));
}
function xo(e, t) {
  let n = 0, r = 0;
  e.weight && (n += e.barycenter * e.weight, r += e.weight), t.weight && (n += t.barycenter * t.weight, r += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / r, e.weight = r, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let ko = T;
var _o = Lo;
function Lo(e, t) {
  let n = ko.partition(e, (d) => Object.hasOwn(d, "barycenter")), r = n.lhs, o = n.rhs.sort((d, f) => f.i - d.i), s = [], i = 0, a = 0, c = 0;
  r.sort(Co(!!t)), c = Je(s, o, c), r.forEach((d) => {
    c += d.vs.length, s.push(d.vs), i += d.barycenter * d.weight, a += d.weight, c = Je(s, o, c);
  });
  let l = { vs: s.flat(!0) };
  return a && (l.barycenter = i / a, l.weight = a), l;
}
function Je(e, t, n) {
  let r;
  for (; t.length && (r = t[t.length - 1]).i <= n; )
    t.pop(), e.push(r.vs), n++;
  return n;
}
function Co(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let No = wo, So = vo, Oo = _o;
var Mo = Tt;
function Tt(e, t, n, r) {
  let o = e.children(t), s = e.node(t), i = s ? s.borderLeft : void 0, a = s ? s.borderRight : void 0, c = {};
  i && (o = o.filter((u) => u !== i && u !== a));
  let l = No(e, o);
  l.forEach((u) => {
    if (e.children(u.v).length) {
      let h = Tt(e, u.v, n, r);
      c[u.v] = h, Object.hasOwn(h, "barycenter") && $o(u, h);
    }
  });
  let d = So(l, n);
  Io(d, c);
  let f = Oo(d, r);
  if (i && (f.vs = [i, f.vs, a].flat(!0), e.predecessors(i).length)) {
    let u = e.node(e.predecessors(i)[0]), h = e.node(e.predecessors(a)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + u.order + h.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function Io(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((r) => t[r] ? t[r].vs : r);
  });
}
function $o(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let jo = G.Graph, To = T;
var Ro = Ao;
function Ao(e, t, n, r) {
  r || (r = e.nodes());
  let o = Po(e), s = new jo({ compound: !0 }).setGraph({ root: o }).setDefaultNodeLabel((i) => e.node(i));
  return r.forEach((i) => {
    let a = e.node(i), c = e.parent(i);
    (a.rank === t || a.minRank <= t && t <= a.maxRank) && (s.setNode(i), s.setParent(i, c || o), e[n](i).forEach((l) => {
      let d = l.v === i ? l.w : l.v, f = s.edge(d, i), u = f !== void 0 ? f.weight : 0;
      s.setEdge(d, i, { weight: e.edge(l).weight + u });
    }), Object.hasOwn(a, "minRank") && s.setNode(i, {
      borderLeft: a.borderLeft[t],
      borderRight: a.borderRight[t]
    }));
  }), s;
}
function Po(e) {
  for (var t; e.hasNode(t = To.uniqueId("_root")); ) ;
  return t;
}
var Bo = Do;
function Do(e, t, n) {
  let r = {}, o;
  n.forEach((s) => {
    let i = e.parent(s), a, c;
    for (; i; ) {
      if (a = e.parent(i), a ? (c = r[a], r[a] = i) : (c = o, o = i), c && c !== i) {
        t.setEdge(c, i);
        return;
      }
      i = a;
    }
  });
}
let Go = co, Fo = ho, Ho = Mo, Vo = Ro, zo = Bo, Wo = G.Graph, te = T;
var Yo = Rt;
function Rt(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, Rt);
    return;
  }
  let n = te.maxRank(e), r = Qe(e, te.range(1, n + 1), "inEdges"), o = Qe(e, te.range(n - 1, -1, -1), "outEdges"), s = Go(e);
  if (Ze(e, s), t && t.disableOptimalOrderHeuristic)
    return;
  let i = Number.POSITIVE_INFINITY, a;
  for (let c = 0, l = 0; l < 4; ++c, ++l) {
    qo(c % 2 ? r : o, c % 4 >= 2), s = te.buildLayerMatrix(e);
    let d = Fo(e, s);
    d < i && (l = 0, a = Object.assign({}, s), i = d);
  }
  Ze(e, a);
}
function Qe(e, t, n) {
  const r = /* @__PURE__ */ new Map(), o = (s, i) => {
    r.has(s) || r.set(s, []), r.get(s).push(i);
  };
  for (const s of e.nodes()) {
    const i = e.node(s);
    if (typeof i.rank == "number" && o(i.rank, s), typeof i.minRank == "number" && typeof i.maxRank == "number")
      for (let a = i.minRank; a <= i.maxRank; a++)
        a !== i.rank && o(a, s);
  }
  return t.map(function(s) {
    return Vo(e, s, n, r.get(s) || []);
  });
}
function qo(e, t) {
  let n = new Wo();
  e.forEach(function(r) {
    let o = r.graph().root, s = Ho(r, o, n, t);
    s.vs.forEach((i, a) => r.node(i).order = a), zo(r, n, s.vs);
  });
}
function Ze(e, t) {
  Object.values(t).forEach((n) => n.forEach((r, o) => e.node(r).order = o));
}
let Uo = G.Graph, H = T;
var Xo = {
  positionX: is
};
function Ko(e, t) {
  let n = {};
  function r(o, s) {
    let i = 0, a = 0, c = o.length, l = s[s.length - 1];
    return s.forEach((d, f) => {
      let u = Qo(e, d), h = u ? e.node(u).order : c;
      (u || d === l) && (s.slice(a, f + 1).forEach((p) => {
        e.predecessors(p).forEach((g) => {
          let w = e.node(g), v = w.order;
          (v < i || h < v) && !(w.dummy && e.node(p).dummy) && At(n, g, p);
        });
      }), a = f + 1, i = h);
    }), s;
  }
  return t.length && t.reduce(r), n;
}
function Jo(e, t) {
  let n = {};
  function r(s, i, a, c, l) {
    let d;
    H.range(i, a).forEach((f) => {
      d = s[f], e.node(d).dummy && e.predecessors(d).forEach((u) => {
        let h = e.node(u);
        h.dummy && (h.order < c || h.order > l) && At(n, u, d);
      });
    });
  }
  function o(s, i) {
    let a = -1, c, l = 0;
    return i.forEach((d, f) => {
      if (e.node(d).dummy === "border") {
        let u = e.predecessors(d);
        u.length && (c = e.node(u[0]).order, r(i, l, f, a, c), l = f, a = c);
      }
      r(i, l, i.length, c, s.length);
    }), i;
  }
  return t.length && t.reduce(o), n;
}
function Qo(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function At(e, t, n) {
  if (t > n) {
    let o = t;
    t = n, n = o;
  }
  let r = e[t];
  r || (e[t] = r = {}), r[n] = !0;
}
function Zo(e, t, n) {
  if (t > n) {
    let r = t;
    t = n, n = r;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function es(e, t, n, r) {
  let o = {}, s = {}, i = {};
  return t.forEach((a) => {
    a.forEach((c, l) => {
      o[c] = c, s[c] = c, i[c] = l;
    });
  }), t.forEach((a) => {
    let c = -1;
    a.forEach((l) => {
      let d = r(l);
      if (d.length) {
        d = d.sort((u, h) => i[u] - i[h]);
        let f = (d.length - 1) / 2;
        for (let u = Math.floor(f), h = Math.ceil(f); u <= h; ++u) {
          let p = d[u];
          s[l] === l && c < i[p] && !Zo(n, l, p) && (s[p] = l, s[l] = o[l] = o[p], c = i[p]);
        }
      }
    });
  }), { root: o, align: s };
}
function ts(e, t, n, r, o) {
  let s = {}, i = ns(e, t, n, o), a = o ? "borderLeft" : "borderRight";
  function c(f, u) {
    let h = i.nodes(), p = h.pop(), g = {};
    for (; p; )
      g[p] ? f(p) : (g[p] = !0, h.push(p), h = h.concat(u(p))), p = h.pop();
  }
  function l(f) {
    s[f] = i.inEdges(f).reduce((u, h) => Math.max(u, s[h.v] + i.edge(h)), 0);
  }
  function d(f) {
    let u = i.outEdges(f).reduce((p, g) => Math.min(p, s[g.w] - i.edge(g)), Number.POSITIVE_INFINITY), h = e.node(f);
    u !== Number.POSITIVE_INFINITY && h.borderType !== a && (s[f] = Math.max(s[f], u));
  }
  return c(l, i.predecessors.bind(i)), c(d, i.successors.bind(i)), Object.keys(r).forEach((f) => s[f] = s[n[f]]), s;
}
function ns(e, t, n, r) {
  let o = new Uo(), s = e.graph(), i = as(s.nodesep, s.edgesep, r);
  return t.forEach((a) => {
    let c;
    a.forEach((l) => {
      let d = n[l];
      if (o.setNode(d), c) {
        var f = n[c], u = o.edge(f, d);
        o.setEdge(f, d, Math.max(i(e, l, c), u || 0));
      }
      c = l;
    });
  }), o;
}
function rs(e, t) {
  return Object.values(t).reduce((n, r) => {
    let o = Number.NEGATIVE_INFINITY, s = Number.POSITIVE_INFINITY;
    Object.entries(r).forEach(([a, c]) => {
      let l = ds(e, a) / 2;
      o = Math.max(c + l, o), s = Math.min(c - l, s);
    });
    const i = o - s;
    return i < n[0] && (n = [i, r]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function os(e, t) {
  let n = Object.values(t), r = H.applyWithChunking(Math.min, n), o = H.applyWithChunking(Math.max, n);
  ["u", "d"].forEach((s) => {
    ["l", "r"].forEach((i) => {
      let a = s + i, c = e[a];
      if (c === t) return;
      let l = Object.values(c), d = r - H.applyWithChunking(Math.min, l);
      i !== "l" && (d = o - H.applyWithChunking(Math.max, l)), d && (e[a] = H.mapValues(c, (f) => f + d));
    });
  });
}
function ss(e, t) {
  return H.mapValues(e.ul, (n, r) => {
    if (t)
      return e[t.toLowerCase()][r];
    {
      let o = Object.values(e).map((s) => s[r]).sort((s, i) => s - i);
      return (o[1] + o[2]) / 2;
    }
  });
}
function is(e) {
  let t = H.buildLayerMatrix(e), n = Object.assign(
    Ko(e, t),
    Jo(e, t)
  ), r = {}, o;
  ["u", "d"].forEach((i) => {
    o = i === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((a) => {
      a === "r" && (o = o.map((f) => Object.values(f).reverse()));
      let c = (i === "u" ? e.predecessors : e.successors).bind(e), l = es(e, o, n, c), d = ts(
        e,
        o,
        l.root,
        l.align,
        a === "r"
      );
      a === "r" && (d = H.mapValues(d, (f) => -f)), r[i + a] = d;
    });
  });
  let s = rs(e, r);
  return os(r, s), ss(r, e.graph().align);
}
function as(e, t, n) {
  return (r, o, s) => {
    let i = r.node(o), a = r.node(s), c = 0, l;
    if (c += i.width / 2, Object.hasOwn(i, "labelpos"))
      switch (i.labelpos.toLowerCase()) {
        case "l":
          l = -i.width / 2;
          break;
        case "r":
          l = i.width / 2;
          break;
      }
    if (l && (c += n ? l : -l), l = 0, c += (i.dummy ? t : e) / 2, c += (a.dummy ? t : e) / 2, c += a.width / 2, Object.hasOwn(a, "labelpos"))
      switch (a.labelpos.toLowerCase()) {
        case "l":
          l = a.width / 2;
          break;
        case "r":
          l = -a.width / 2;
          break;
      }
    return l && (c += n ? l : -l), l = 0, c;
  };
}
function ds(e, t) {
  return e.node(t).width;
}
let Pt = T, ls = Xo.positionX;
var cs = fs;
function fs(e) {
  e = Pt.asNonCompoundGraph(e), us(e), Object.entries(ls(e)).forEach(([t, n]) => e.node(t).x = n);
}
function us(e) {
  let t = Pt.buildLayerMatrix(e), n = e.graph().ranksep, r = 0;
  t.forEach((o) => {
    const s = o.reduce((i, a) => {
      const c = e.node(a).height;
      return i > c ? i : c;
    }, 0);
    o.forEach((i) => e.node(i).y = r + s / 2), r += s + n;
  });
}
let et = hr, tt = br, hs = Hr, ps = T.normalizeRanks, ms = Yr, ws = T.removeEmptyRanks, nt = Kr, gs = no, rt = oo, bs = Yo, vs = cs, B = T, ys = G.Graph;
var Es = xs;
function xs(e, t) {
  let n = t && t.debugTiming ? B.time : B.notime;
  n("layout", () => {
    let r = n("  buildLayoutGraph", () => $s(e));
    n("  runLayout", () => ks(r, n, t)), n("  updateInputGraph", () => _s(e, r));
  });
}
function ks(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => js(e)), t("    removeSelfEdges", () => Hs(e)), t("    acyclic", () => et.run(e)), t("    nestingGraph.run", () => nt.run(e)), t("    rank", () => hs(B.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => Ts(e)), t("    removeEmptyRanks", () => ws(e)), t("    nestingGraph.cleanup", () => nt.cleanup(e)), t("    normalizeRanks", () => ps(e)), t("    assignRankMinMax", () => Rs(e)), t("    removeEdgeLabelProxies", () => As(e)), t("    normalize.run", () => tt.run(e)), t("    parentDummyChains", () => ms(e)), t("    addBorderSegments", () => gs(e)), t("    order", () => bs(e, n)), t("    insertSelfEdges", () => Vs(e)), t("    adjustCoordinateSystem", () => rt.adjust(e)), t("    position", () => vs(e)), t("    positionSelfEdges", () => zs(e)), t("    removeBorderNodes", () => Fs(e)), t("    normalize.undo", () => tt.undo(e)), t("    fixupEdgeLabelCoords", () => Ds(e)), t("    undoCoordinateSystem", () => rt.undo(e)), t("    translateGraph", () => Ps(e)), t("    assignNodeIntersects", () => Bs(e)), t("    reversePoints", () => Gs(e)), t("    acyclic.undo", () => et.undo(e));
}
function _s(e, t) {
  e.nodes().forEach((n) => {
    let r = e.node(n), o = t.node(n);
    r && (r.x = o.x, r.y = o.y, r.rank = o.rank, t.children(n).length && (r.width = o.width, r.height = o.height));
  }), e.edges().forEach((n) => {
    let r = e.edge(n), o = t.edge(n);
    r.points = o.points, Object.hasOwn(o, "x") && (r.x = o.x, r.y = o.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let Ls = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], Cs = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, Ns = ["acyclicer", "ranker", "rankdir", "align"], Ss = ["width", "height", "rank"], ot = { width: 0, height: 0 }, Os = ["minlen", "weight", "width", "height", "labeloffset"], Ms = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, Is = ["labelpos"];
function $s(e) {
  let t = new ys({ multigraph: !0, compound: !0 }), n = ye(e.graph());
  return t.setGraph(Object.assign(
    {},
    Cs,
    ve(n, Ls),
    B.pick(n, Ns)
  )), e.nodes().forEach((r) => {
    let o = ye(e.node(r));
    const s = ve(o, Ss);
    Object.keys(ot).forEach((i) => {
      s[i] === void 0 && (s[i] = ot[i]);
    }), t.setNode(r, s), t.setParent(r, e.parent(r));
  }), e.edges().forEach((r) => {
    let o = ye(e.edge(r));
    t.setEdge(r, Object.assign(
      {},
      Ms,
      ve(o, Os),
      B.pick(o, Is)
    ));
  }), t;
}
function js(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let r = e.edge(n);
    r.minlen *= 2, r.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? r.width += r.labeloffset : r.height += r.labeloffset);
  });
}
function Ts(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let r = e.node(t.v), s = { rank: (e.node(t.w).rank - r.rank) / 2 + r.rank, e: t };
      B.addDummyNode(e, "edge-proxy", s, "_ep");
    }
  });
}
function Rs(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let r = e.node(n);
    r.borderTop && (r.minRank = e.node(r.borderTop).rank, r.maxRank = e.node(r.borderBottom).rank, t = Math.max(t, r.maxRank));
  }), e.graph().maxRank = t;
}
function As(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function Ps(e) {
  let t = Number.POSITIVE_INFINITY, n = 0, r = Number.POSITIVE_INFINITY, o = 0, s = e.graph(), i = s.marginx || 0, a = s.marginy || 0;
  function c(l) {
    let d = l.x, f = l.y, u = l.width, h = l.height;
    t = Math.min(t, d - u / 2), n = Math.max(n, d + u / 2), r = Math.min(r, f - h / 2), o = Math.max(o, f + h / 2);
  }
  e.nodes().forEach((l) => c(e.node(l))), e.edges().forEach((l) => {
    let d = e.edge(l);
    Object.hasOwn(d, "x") && c(d);
  }), t -= i, r -= a, e.nodes().forEach((l) => {
    let d = e.node(l);
    d.x -= t, d.y -= r;
  }), e.edges().forEach((l) => {
    let d = e.edge(l);
    d.points.forEach((f) => {
      f.x -= t, f.y -= r;
    }), Object.hasOwn(d, "x") && (d.x -= t), Object.hasOwn(d, "y") && (d.y -= r);
  }), s.width = n - t + i, s.height = o - r + a;
}
function Bs(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), r = e.node(t.v), o = e.node(t.w), s, i;
    n.points ? (s = n.points[0], i = n.points[n.points.length - 1]) : (n.points = [], s = o, i = r), n.points.unshift(B.intersectRect(r, s)), n.points.push(B.intersectRect(o, i));
  });
}
function Ds(e) {
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
function Gs(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function Fs(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), r = e.node(n.borderTop), o = e.node(n.borderBottom), s = e.node(n.borderLeft[n.borderLeft.length - 1]), i = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(i.x - s.x), n.height = Math.abs(o.y - r.y), n.x = s.x + n.width / 2, n.y = r.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function Hs(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function Vs(e) {
  var t = B.buildLayerMatrix(e);
  t.forEach((n) => {
    var r = 0;
    n.forEach((o, s) => {
      var i = e.node(o);
      i.order = s + r, (i.selfEdges || []).forEach((a) => {
        B.addDummyNode(e, "selfedge", {
          width: a.label.width,
          height: a.label.height,
          rank: i.rank,
          order: s + ++r,
          e: a.e,
          label: a.label
        }, "_se");
      }), delete i.selfEdges;
    });
  });
}
function zs(e) {
  e.nodes().forEach((t) => {
    var n = e.node(t);
    if (n.dummy === "selfedge") {
      var r = e.node(n.e.v), o = r.x + r.width / 2, s = r.y, i = n.x - o, a = r.height / 2;
      e.setEdge(n.e, n.label), e.removeNode(t), n.label.points = [
        { x: o + 2 * i / 3, y: s - a },
        { x: o + 5 * i / 6, y: s - a },
        { x: o + i, y: s },
        { x: o + 5 * i / 6, y: s + a },
        { x: o + 2 * i / 3, y: s + a }
      ], n.label.x = n.x, n.label.y = n.y;
    }
  });
}
function ve(e, t) {
  return B.mapValues(B.pick(e, t), Number);
}
function ye(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, r]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = r;
  }), t;
}
let Ws = T, Ys = G.Graph;
var qs = {
  debugOrdering: Us
};
function Us(e) {
  let t = Ws.buildLayerMatrix(e), n = new Ys({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((r) => {
    n.setNode(r, { label: r }), n.setParent(r, "layer" + e.node(r).rank);
  }), e.edges().forEach((r) => n.setEdge(r.v, r.w, {}, r.name)), t.forEach((r, o) => {
    let s = "layer" + o;
    n.setNode(s, { rank: "same" }), r.reduce((i, a) => (n.setEdge(i, a, { style: "invis" }), a));
  }), n;
}
var Xs = "1.1.8", Ks = {
  graphlib: G,
  layout: Es,
  debug: qs,
  util: {
    time: T.time,
    notime: T.notime
  },
  version: Xs
};
const st = /* @__PURE__ */ Wt(Ks), Js = "http://www.w3.org/2000/svg";
function O(e, t = {}) {
  const n = document.createElementNS(Js, e);
  for (const [r, o] of Object.entries(t)) n.setAttribute(r, String(o));
  return n;
}
const it = {
  start: { w: 140, h: 48 },
  end: { w: 140, h: 48 },
  process: { w: 180, h: 64 },
  decision: { w: 180, h: 100 },
  subprocess: { w: 200, h: 64 },
  document: { w: 180, h: 64 },
  data: { w: 180, h: 64 },
  manual: { w: 180, h: 64 }
};
function ae(e) {
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
function Bt(e, t, n) {
  const { fill: r, stroke: o } = ae(e), s = { fill: r, stroke: o, "stroke-width": 2 };
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
      ].map((a) => a.join(",")).join(" ");
      return O("polygon", { points: i, ...s });
    }
    case "data": {
      const i = t * 0.15, a = [
        [-t / 2 + i, -n / 2],
        [t / 2, -n / 2],
        [t / 2 - i, n / 2],
        [-t / 2, n / 2]
      ].map((c) => c.join(",")).join(" ");
      return O("polygon", { points: a, ...s });
    }
    case "manual": {
      const i = t * 0.12, a = [
        [-t / 2, -n / 2],
        [t / 2, -n / 2],
        [t / 2 - i, n / 2],
        [-t / 2 + i, n / 2]
      ].map((c) => c.join(",")).join(" ");
      return O("polygon", { points: a, ...s });
    }
    case "document": {
      const i = n * 0.12, a = [
        `M ${-t / 2} ${-n / 2}`,
        `L ${t / 2} ${-n / 2}`,
        `L ${t / 2} ${n / 2 - i}`,
        `C ${t / 4} ${n / 2 + i}, ${-t / 4} ${n / 2 - i * 2}, ${-t / 2} ${n / 2}`,
        "Z"
      ].join(" ");
      return O("path", { d: a, ...s });
    }
    case "subprocess": {
      const i = O("g", {});
      i.appendChild(O("rect", { x: -t / 2, y: -n / 2, width: t, height: n, ...s }));
      const a = 10;
      return i.appendChild(
        O("line", {
          x1: -t / 2 + a,
          y1: -n / 2,
          x2: -t / 2 + a,
          y2: n / 2,
          stroke: ae(e).stroke,
          "stroke-width": 2
        })
      ), i.appendChild(
        O("line", {
          x1: t / 2 - a,
          y1: -n / 2,
          x2: t / 2 - a,
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
function Qs(e, t) {
  const n = O("g", { transform: `translate(${e / 2 - 16}, ${t / 2 - 16})`, class: "dd-flow-subflow-badge" });
  n.appendChild(O("circle", { cx: 0, cy: 0, r: 10, fill: "var(--dd-flow-subprocess-stroke)" }));
  const r = O("path", {
    d: "M -4 3 L 3 -4 M -1 -4 L 3 -4 L 3 0",
    stroke: "#ffffff",
    "stroke-width": 1.6,
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });
  return n.appendChild(r), n;
}
function Zs(e, t = {}) {
  const n = [
    "dd-flow-node",
    `dd-flow-node-${e.type}`,
    t.selected && "is-selected",
    t.multiselected && "is-multiselected"
  ].filter(Boolean).join(" "), r = O("g", {
    class: n,
    "data-node-id": e.id,
    transform: `translate(${e.x}, ${e.y})`
  });
  r.appendChild(Bt(e.type, e.w, e.h));
  const { text: o } = ae(e.type), s = O("text", {
    x: 0,
    y: 0,
    fill: o,
    "text-anchor": "middle",
    "dominant-baseline": "central",
    class: "dd-flow-label"
  });
  return ti(s, e.label, e.w - 20), r.appendChild(s), e.subflow && r.appendChild(Qs(e.w, e.h)), r;
}
const Ne = 16, ei = 7.2;
function Dt(e, t) {
  const n = e.split(/\s+/), r = Math.max(4, Math.floor(t / ei)), o = [];
  let s = "";
  for (const i of n) {
    const a = s ? `${s} ${i}` : i;
    a.length > r && s ? (o.push(s), s = i) : s = a;
  }
  return s && o.push(s), o;
}
function ti(e, t, n) {
  const r = Dt(t, n), o = -((r.length - 1) * Ne) / 2;
  r.forEach((s, i) => {
    const a = O("tspan", { x: 0, y: o + i * Ne });
    a.textContent = s, e.appendChild(a);
  });
}
function ni(e, t, n) {
  const o = n - (e === "start" || e === "end" ? n * 0.3 : 20);
  return Dt(t, Math.max(20, o)).length * Ne + 24;
}
function at(e, t) {
  const n = it[e.type] ?? it.process, r = (t == null ? void 0 : t.w) ?? e.w ?? n.w, o = (t == null ? void 0 : t.h) ?? e.h ?? Math.max(n.h, ni(e.type, e.label, r));
  return { w: r, h: o };
}
function Se(e, t) {
  const n = new st.graphlib.Graph({ multigraph: !0 });
  n.setGraph({ rankdir: e.direction ?? "TB", nodesep: 50, ranksep: 60, marginx: 20, marginy: 20 }), n.setDefaultEdgeLabel(() => ({}));
  for (const l of e.nodes) {
    const { w: d, h: f } = at(l, t == null ? void 0 : t.nodes[l.id]);
    n.setNode(l.id, { width: d, height: f });
  }
  for (const l of e.edges)
    n.setEdge(l.from, l.to, {}, l.id);
  st.layout(n);
  const r = e.nodes.map((l) => {
    const d = t == null ? void 0 : t.nodes[l.id], { w: f, h: u } = at(l, d), h = n.node(l.id);
    return {
      ...l,
      x: (d == null ? void 0 : d.x) ?? h.x,
      y: (d == null ? void 0 : d.y) ?? h.y,
      w: f,
      h: u
    };
  }), o = e.edges.map((l) => {
    const d = t == null ? void 0 : t.edges[l.id];
    return { ...l, points: (d == null ? void 0 : d.points) ?? [] };
  }), s = new Set(e.nodes.map((l) => l.id)), i = new Set(e.edges.map((l) => l.id)), a = t ? Object.keys(t.nodes).filter((l) => !s.has(l)) : [], c = t ? Object.keys(t.edges).filter((l) => !i.has(l)) : [];
  return (a.length || c.length) && console.warn(
    `dd-flow "${e.id}": saved layout has ${a.length} node(s) and ${c.length} edge(s) with no match in the current flow — their manual positions/routes were dropped.`,
    { orphanedNodeIds: a, orphanedEdgeIds: c }
  ), { nodes: r, edges: o, orphanedNodeIds: a, orphanedEdgeIds: c };
}
function Ee(e, t) {
  const n = { nodes: {}, edges: {} };
  for (const r of e) n.nodes[r.id] = { x: r.x, y: r.y, w: r.w, h: r.h };
  for (const r of t) n.edges[r.id] = { points: r.points };
  return n;
}
const ne = 40;
function Oe(e) {
  const t = e.type === "conditional" ? "conditional" : "default", n = e.type === "dashed" ? "dashed" : "solid";
  return {
    kind: e.kind ?? t,
    routing: e.routing ?? "orthogonal",
    stroke: e.stroke ?? n
  };
}
function ri(e, t) {
  const n = t.x - e.x, r = t.y - e.y;
  if (n === 0 && r === 0) return [{ x: e.x, y: e.y }, { x: t.x, y: t.y }];
  const o = (s, i, a) => {
    const c = s.w / 2, l = s.h / 2, d = Math.min(
      i !== 0 ? c / Math.abs(i) : 1 / 0,
      a !== 0 ? l / Math.abs(a) : 1 / 0
    );
    return { x: s.x + i * d, y: s.y + a * d };
  };
  return [o(e, n, r), o(t, -n, -r)];
}
function oi(e, t) {
  const n = t.x - e.x, r = t.y - e.y;
  if (Math.abs(n) >= Math.abs(r)) {
    const s = n >= 0 ? 1 : -1;
    return [
      { x: e.x + s * e.w / 2, y: e.y },
      { x: t.x - s * t.w / 2, y: t.y }
    ];
  }
  const o = r >= 0 ? 1 : -1;
  return [
    { x: e.x, y: e.y + o * e.h / 2 },
    { x: t.x, y: t.y - o * t.h / 2 }
  ];
}
function si(e, t, n = "orthogonal") {
  if (n === "straight") return ri(e, t);
  if (n === "bezier") return oi(e, t);
  const r = t.x - e.x, o = t.y - e.y;
  if (Math.abs(o) >= Math.abs(r) || r === 0) {
    const l = o >= 0 ? 1 : -1, d = { x: e.x, y: e.y + l * e.h / 2 }, f = { x: t.x, y: t.y - l * t.h / 2 };
    if (d.x === f.x) return [d, f];
    const u = (d.y + f.y) / 2;
    return [d, { x: d.x, y: u }, { x: f.x, y: u }, f];
  }
  const s = r >= 0 ? 1 : -1, i = { x: e.x + s * e.w / 2, y: e.y }, a = { x: t.x - s * t.w / 2, y: t.y };
  if (i.y === a.y) return [i, a];
  const c = (i.x + a.x) / 2;
  return [i, { x: c, y: i.y }, { x: c, y: a.y }, a];
}
const ii = 10, dt = 40;
function ai(e) {
  const [t, n] = [e[0], e[e.length - 1]], r = n.x - t.x, o = n.y - t.y;
  if (Math.abs(r) >= Math.abs(o)) {
    const i = Math.max(dt, Math.abs(r) / 2) * Math.sign(r || 1);
    return `M ${t.x} ${t.y} C ${t.x + i} ${t.y}, ${n.x - i} ${n.y}, ${n.x} ${n.y}`;
  }
  const s = Math.max(dt, Math.abs(o) / 2) * Math.sign(o || 1);
  return `M ${t.x} ${t.y} C ${t.x} ${t.y + s}, ${n.x} ${n.y - s}, ${n.x} ${n.y}`;
}
function di(e, t) {
  if (!t || e.length <= 2) return li(e);
  const n = [`M ${e[0].x} ${e[0].y}`];
  for (let o = 1; o < e.length - 1; o++) {
    const s = e[o - 1], i = e[o], a = e[o + 1], c = Math.hypot(i.x - s.x, i.y - s.y), l = Math.hypot(a.x - i.x, a.y - i.y), d = Math.min(ii, c / 2, l / 2), f = { x: i.x - (i.x - s.x) / c * d, y: i.y - (i.y - s.y) / c * d }, u = { x: i.x + (a.x - i.x) / l * d, y: i.y + (a.y - i.y) / l * d };
    n.push(`L ${f.x} ${f.y}`, `Q ${i.x} ${i.y} ${u.x} ${u.y}`);
  }
  const r = e[e.length - 1];
  return n.push(`L ${r.x} ${r.y}`), n.join(" ");
}
function li(e) {
  return e.map((t, n) => `${n === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
}
const ci = {
  solid: null,
  dashed: "6,4",
  dotted: "1.5,4"
};
function fi(e) {
  return e.filter((t, n) => n === 0 || t.x !== e[n - 1].x || t.y !== e[n - 1].y);
}
function ui(e, t, n, r = {}) {
  const o = e.points.length >= 2 ? e.points : si(t, n, Oe(e).routing), s = fi(o), { kind: i, routing: a, stroke: c } = Oe(e), l = O("g", {
    class: `dd-flow-edge dd-flow-edge-${i}${r.selected ? " is-selected" : ""}`,
    "data-edge-id": e.id
  }), d = a === "bezier" && s.length === 2 ? ai(s) : di(s, a === "curved");
  l.appendChild(
    O("path", { d, fill: "none", stroke: "transparent", "stroke-width": 16, class: "dd-flow-edge-hit" })
  );
  const f = O("path", {
    d,
    fill: "none",
    stroke: i === "conditional" ? "var(--dd-flow-edge-conditional-stroke)" : "var(--dd-flow-edge-stroke)",
    "stroke-width": 2,
    "marker-end": "url(#dd-flow-arrow)"
  }), u = ci[c];
  if (u && f.setAttribute("stroke-dasharray", u), l.appendChild(f), e.label) {
    const h = s[Math.floor((s.length - 1) / 2)], p = s[Math.floor((s.length - 1) / 2) + 1] ?? h, g = (h.x + p.x) / 2, w = (h.y + p.y) / 2, v = Math.max(24, e.label.length * 7 + 12);
    l.appendChild(
      O("rect", {
        x: g - v / 2,
        y: w - 10,
        width: v,
        height: 20,
        rx: 4,
        fill: "var(--dd-flow-edge-label-bg)",
        class: "dd-flow-edge-label-bg"
      })
    );
    const x = O("text", {
      x: g,
      y: w,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "var(--dd-flow-edge-label-text)",
      class: "dd-flow-edge-label"
    });
    x.textContent = e.label, l.appendChild(x);
  }
  return l;
}
function hi() {
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
function Ae(e, t, n = {}) {
  var v, x;
  const r = new Map(e.map((b) => [b.id, b]));
  let o = 1 / 0, s = 1 / 0, i = -1 / 0, a = -1 / 0;
  for (const b of e)
    o = Math.min(o, b.x - b.w / 2), s = Math.min(s, b.y - b.h / 2), i = Math.max(i, b.x + b.w / 2), a = Math.max(a, b.y + b.h / 2);
  e.length || (o = 0, s = 0, i = 200, a = 100);
  const c = i - o + ne * 2, l = a - s + ne * 2, d = ne - o, f = ne - s, u = O("svg", {
    class: "dd-flow-svg",
    viewBox: `0 0 ${c} ${l}`,
    width: c,
    height: l
  });
  u.appendChild(hi());
  const h = O("g", { class: "dd-flow-world", transform: `translate(${d}, ${f})` }), p = O("g", { class: "dd-flow-edges" });
  for (const b of t) {
    const k = r.get(b.from), N = r.get(b.to);
    !k || !N || p.appendChild(ui(b, k, N, { selected: b.id === n.selectedEdgeId }));
  }
  h.appendChild(p);
  const g = (((v = n.selectedNodeIds) == null ? void 0 : v.size) ?? 0) > 1, w = O("g", { class: "dd-flow-nodes" });
  for (const b of e) {
    const k = ((x = n.selectedNodeIds) == null ? void 0 : x.has(b.id)) ?? !1, N = !g && (b.id === n.selectedNodeId || k);
    w.appendChild(Zs(b, { selected: N, multiselected: g && k }));
  }
  return h.appendChild(w), u.appendChild(h), u;
}
const ce = {
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
ce.host = {
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
const xe = "bam";
function J(e, t) {
  const n = ce[t ?? xe] ?? ce[xe];
  e.setAttribute("data-dd-flow-theme", t ?? xe);
  for (const [r, o] of Object.entries(n.vars))
    e.style.setProperty(`--dd-flow-${r}`, o);
}
function na(e, t) {
  ce[e] = t;
}
function he(e, t) {
  const n = URL.createObjectURL(e), r = document.createElement("a");
  r.href = n, r.download = t, document.body.appendChild(r), r.click(), r.remove(), URL.revokeObjectURL(n);
}
function pi(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  he(new Blob([n], { type: "application/json" }), `${e}.layout.json`);
}
function mi(e, t) {
  const n = JSON.stringify(t, null, 2) + `
`;
  he(new Blob([n], { type: "application/json" }), `${e}.flow.json`);
}
const wi = /^var\((--dd-flow-[a-z-]+)\)$/;
function gi(e, t) {
  const n = e.cloneNode(!0), r = getComputedStyle(t), o = ["fill", "stroke"], s = (a) => {
    const c = a.match(wi);
    return c && r.getPropertyValue(c[1]).trim() || a;
  }, i = [n, ...Array.from(n.querySelectorAll("*"))];
  for (const a of i)
    for (const c of o) {
      const l = a.getAttribute(c);
      l && a.setAttribute(c, s(l));
    }
  return n;
}
function Gt(e, t) {
  const n = gi(e, t);
  return n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), new XMLSerializer().serializeToString(n);
}
function bi(e, t, n) {
  const r = Gt(e, t);
  he(new Blob([r], { type: "image/svg+xml;charset=utf-8" }), n);
}
function vi(e, t, n, r = 2) {
  const o = Gt(e, t), s = parseFloat(e.getAttribute("width") || "800"), i = parseFloat(e.getAttribute("height") || "600"), a = getComputedStyle(t).getPropertyValue("--dd-flow-canvas-bg").trim() || "#ffffff", c = new Blob([o], { type: "image/svg+xml;charset=utf-8" }), l = URL.createObjectURL(c), d = new Image();
  d.onload = () => {
    const f = document.createElement("canvas");
    f.width = s * r, f.height = i * r;
    const u = f.getContext("2d");
    if (!u) {
      URL.revokeObjectURL(l);
      return;
    }
    u.scale(r, r), u.fillStyle = a, u.fillRect(0, 0, s, i), u.drawImage(d, 0, 0, s, i), URL.revokeObjectURL(l), f.toBlob((h) => {
      h && he(h, n);
    }, "image/png");
  }, d.onerror = () => URL.revokeObjectURL(l), d.src = l;
}
const yi = ["start", "end", "process", "decision", "subprocess", "document", "data", "manual"];
function Ei(e) {
  const t = document.createElement("div");
  t.className = "dd-flow-inspector", t.hidden = !0, e.appendChild(t);
  let n = !1;
  function r(h) {
    const g = t.offsetWidth || 260, w = t.offsetHeight || 200;
    let v = h.right + 12;
    v + g > window.innerWidth && (v = h.left - 12 - g), v < 12 && (v = Math.min(h.left, window.innerWidth - g - 12)), v = Math.max(12, Math.min(v, window.innerWidth - g - 12));
    let x = h.top;
    return x = Math.max(12, Math.min(x, window.innerHeight - w - 12)), { left: v, top: x };
  }
  function o(h) {
    const { left: p, top: g } = r(h);
    t.style.left = `${p}px`, t.style.top = `${g}px`;
  }
  function s(h, p) {
    const g = document.createElement("div");
    g.className = "dd-flow-inspector-field";
    const w = document.createElement("label");
    return w.textContent = h, g.appendChild(w), g.appendChild(p), g;
  }
  function i(h) {
    const p = document.createElement("button");
    return p.type = "button", p.className = "dd-flow-btn dd-flow-inspector-delete", p.textContent = "Delete", p.addEventListener("click", h), p;
  }
  function a() {
    const h = document.createElement("button");
    return h.type = "button", h.className = "dd-flow-inspector-close", h.textContent = "×", h.setAttribute("aria-label", "Close"), h.addEventListener("click", u), h;
  }
  function c(h, p) {
    t.innerHTML = "", t.appendChild(a());
    const g = document.createElement("input");
    g.type = "text", g.value = h.label, g.addEventListener("input", () => p.onLabelChange(g.value)), t.appendChild(s("Label", g));
    const w = document.createElement("textarea");
    w.rows = 2, w.value = h.note ?? "", w.addEventListener("input", () => p.onNoteChange(w.value)), t.appendChild(s("Note", w));
    const v = document.createElement("div");
    v.className = "dd-flow-type-grid";
    for (const x of yi) {
      const b = document.createElement("button");
      b.type = "button", b.className = `dd-flow-type-swatch${x === h.type ? " is-active" : ""}`, b.title = x, b.setAttribute("aria-label", x);
      const k = O("svg", { viewBox: "-32 -22 64 44", width: 48, height: 33 });
      k.appendChild(Bt(x, 56, 36)), b.appendChild(k), b.addEventListener("click", () => p.onTypeChange(x)), v.appendChild(b);
    }
    if (t.appendChild(s("Type", v)), h.subflow) {
      const x = document.createElement("div");
      x.className = "dd-flow-inspector-subflow-row";
      const b = document.createElement("span");
      if (b.textContent = `Opens subflow: ${h.subflow}`, x.appendChild(b), p.onGotoSubflow) {
        const k = document.createElement("button");
        k.type = "button", k.className = "dd-flow-btn", k.textContent = "Open", k.addEventListener("click", p.onGotoSubflow), x.appendChild(k);
      }
      t.appendChild(x);
    }
    t.appendChild(i(p.onDelete));
  }
  function l(h, p, g, w) {
    const v = document.createElement("div");
    v.className = "dd-flow-inspector-radios";
    for (const x of p) {
      const b = `dd-flow-${h}-${x}`, k = document.createElement("input");
      k.type = "radio", k.name = `dd-flow-${h}`, k.id = b, k.checked = x === g, k.addEventListener("change", () => w(x));
      const N = document.createElement("label");
      N.htmlFor = b, N.textContent = x, v.appendChild(k), v.appendChild(N);
    }
    return v;
  }
  function d(h, p) {
    t.innerHTML = "", t.appendChild(a());
    const g = document.createElement("input");
    g.type = "text", g.value = h.label ?? "", g.addEventListener("input", () => p.onLabelChange(g.value)), t.appendChild(s("Label", g));
    const { routing: w, stroke: v, kind: x } = Oe(h);
    t.appendChild(
      s("Routing", l("routing", ["orthogonal", "straight", "curved"], w, p.onRoutingChange))
    ), t.appendChild(s("Stroke", l("stroke", ["solid", "dashed", "dotted"], v, p.onStrokeChange))), t.appendChild(s("Kind", l("kind", ["default", "conditional"], x, p.onKindChange)));
    const b = document.createElement("p");
    b.className = "dd-flow-inspector-hint", b.textContent = "Changing routing clears any hand-dragged route for this connector.", t.appendChild(b), t.appendChild(i(p.onDelete));
  }
  function f(h, p, g) {
    t.innerHTML = "", t.appendChild(a());
    const w = document.createElement("p");
    w.className = "dd-flow-inspector-hint", w.textContent = h, t.appendChild(w);
    const v = document.createElement("input");
    v.type = "text", v.value = p;
    const x = () => {
      const S = v.value.trim();
      S && g(S), u();
    };
    v.addEventListener("keydown", (S) => {
      S.key === "Enter" && x();
    }), t.appendChild(s("Name", v));
    const b = document.createElement("div");
    b.className = "dd-flow-inspector-actions";
    const k = document.createElement("button");
    k.type = "button", k.className = "dd-flow-btn", k.textContent = "Cancel", k.addEventListener("click", u);
    const N = document.createElement("button");
    N.type = "button", N.className = "dd-flow-btn is-active", N.textContent = "Create", N.addEventListener("click", x), b.appendChild(k), b.appendChild(N), t.appendChild(b), requestAnimationFrame(() => {
      v.focus(), v.select();
    });
  }
  function u() {
    n = !1, t.hidden = !0, t.innerHTML = "";
  }
  return {
    get isOpen() {
      return n;
    },
    showNode(h, p, g, w) {
      if (c(h, g), t.hidden = !1, n = !0, o(p), w != null && w.focusLabel) {
        const v = t.querySelector('input[type="text"]');
        v == null || v.focus(), v == null || v.select();
      }
    },
    showEdge(h, p, g) {
      d(h, g), t.hidden = !1, n = !0, o(p);
    },
    showPrompt(h, p, g, w) {
      f(h, g, w), t.hidden = !1, n = !0, o(p);
    },
    refreshAnchor(h) {
      n && o(h);
    },
    hide: u,
    destroy() {
      u(), t.remove();
    }
  };
}
const xi = 0.2, ki = 4, _i = 4, Me = "ddFlowPanned";
function Li(e, t, n = {}) {
  var z;
  const r = n.minScale ?? xi, o = n.maxScale ?? ki, s = n.maxFitScale ?? 1, i = Number(t.getAttribute("width")) || 1, a = Number(t.getAttribute("height")) || 1, c = t.querySelector("g.dd-flow-world");
  if (!c)
    return { fit: () => {
    }, reset: () => {
    }, zoomBy: () => {
    }, destroy: () => {
    } };
  const l = document.createElementNS("http://www.w3.org/2000/svg", "g");
  l.setAttribute("class", "dd-flow-pz"), (z = c.parentNode) == null || z.insertBefore(l, c), l.appendChild(c), e.classList.add("dd-flow-has-viewport");
  let d = 1, f = 0, u = 0, h = !1;
  const p = () => {
    l.setAttribute("transform", `translate(${f}, ${u}) scale(${d})`);
  }, g = () => {
    const M = e.getBoundingClientRect(), m = Math.max(1, Math.round(M.width)), y = Math.max(1, Math.round(M.height));
    return t.setAttribute("width", String(m)), t.setAttribute("height", String(y)), t.setAttribute("viewBox", `0 0 ${m} ${y}`), { w: m, h: y };
  }, w = () => {
    const { w: M, h: m } = g();
    if (h) {
      p();
      return;
    }
    d = Math.min(s, M / i, m / a), d = Math.max(r, d), f = (M - i * d) / 2, u = (m - a * d) / 2, p();
  }, v = (M, m, y) => {
    const E = d;
    d = Math.min(o, Math.max(r, d * y)), d !== E && (f = M - (M - f) / E * d, u = m - (m - u) / E * d, p());
  }, x = (M) => {
    M.preventDefault(), h = !0;
    const m = e.getBoundingClientRect();
    v(M.clientX - m.left, M.clientY - m.top, M.deltaY < 0 ? 1.1 : 0.9);
  };
  let b = !1, k = !1, N = 0, S = 0, I = 0, A = 0;
  const U = (M) => {
    const m = M;
    return m != null && m.closest ? !m.closest(".dd-flow-node") && !m.closest(".dd-flow-edge-hit") : !0;
  }, C = (M) => {
    U(M.target) && (b = !0, k = !1, N = M.clientX, S = M.clientY, I = f, A = u);
  }, P = (M) => {
    if (!b) return;
    const m = M.clientX - N, y = M.clientY - S;
    !k && Math.hypot(m, y) < _i || (k = !0, h = !0, e.dataset[Me] = "1", f = I + m, u = A + y, p());
  }, F = () => {
    b && (b = !1, k && setTimeout(() => delete e.dataset[Me], 0));
  }, D = { capture: !0 };
  e.addEventListener("wheel", x, { passive: !1, capture: !0 }), e.addEventListener("pointerdown", C, D), e.addEventListener("pointermove", P, D), e.addEventListener("pointerup", F, D), e.addEventListener("pointercancel", F, D);
  const Q = new ResizeObserver(() => w());
  return Q.observe(e), w(), {
    fit: w,
    reset() {
      h = !1, w();
    },
    zoomBy(M) {
      h = !0;
      const m = e.getBoundingClientRect();
      v(m.width / 2, m.height / 2, M);
    },
    destroy() {
      Q.disconnect(), e.removeEventListener("wheel", x, D), e.removeEventListener("pointerdown", C, D), e.removeEventListener("pointermove", P, D), e.removeEventListener("pointerup", F, D), e.removeEventListener("pointercancel", F, D), e.classList.remove("dd-flow-has-viewport");
    }
  };
}
const Ci = 4;
function Ni(e, t, n, r = {}) {
  let o = null;
  const s = (d, f, u) => {
    const h = d.createSVGPoint();
    h.x = f, h.y = u;
    const p = d.getScreenCTM();
    if (!p) return { x: f, y: u };
    const g = h.matrixTransform(p.inverse());
    return { x: g.x, y: g.y };
  }, i = () => e.querySelector("svg.dd-flow-svg"), a = (d) => {
    var x, b, k, N;
    const f = i();
    if (!f) return;
    const u = d.target, h = s(f, d.clientX, d.clientY), p = (x = u.closest) == null ? void 0 : x.call(u, ".dd-flow-node");
    if (p) {
      const S = p.getAttribute("data-node-id"), I = t.nodes.find((A) => A.id === S);
      if (!I) return;
      o = { node: I, edgeId: null, startX: h.x, startY: h.y, nodeStartX: I.x, nodeStartY: I.y, moved: !1, shiftKey: d.shiftKey }, (b = e.setPointerCapture) == null || b.call(e, d.pointerId);
      return;
    }
    const g = (k = u.closest) == null ? void 0 : k.call(u, ".dd-flow-edge-hit"), w = g == null ? void 0 : g.closest(".dd-flow-edge");
    o = { node: null, edgeId: (w == null ? void 0 : w.getAttribute("data-edge-id")) ?? null, startX: h.x, startY: h.y, nodeStartX: 0, nodeStartY: 0, moved: !1, shiftKey: d.shiftKey }, (N = e.setPointerCapture) == null || N.call(e, d.pointerId);
  }, c = (d) => {
    if (!o || !o.node) return;
    const f = i();
    if (!f) return;
    const u = s(f, d.clientX, d.clientY), h = u.x - o.startX, p = u.y - o.startY;
    e.classList.contains("dd-flow-editing") && (!o.moved && Math.hypot(h, p) < Ci || (o.moved = !0, o.node.x = o.nodeStartX + h, o.node.y = o.nodeStartY + p, n()));
  }, l = () => {
    var w, v, x, b;
    if (!o) return;
    const { node: d, edgeId: f, moved: u, shiftKey: h, startX: p, startY: g } = o;
    o = null, d ? u ? (w = r.onNodeMoved) == null || w.call(r, d.id) : (v = r.onNodeClick) == null || v.call(r, d.id, { shiftKey: h }) : f ? (x = r.onEdgeClick) == null || x.call(r, f, { shiftKey: h }) : e.dataset[Me] || (b = r.onBackgroundClick) == null || b.call(r, { x: p, y: g }, { shiftKey: h });
  };
  return e.addEventListener("pointerdown", a), e.addEventListener("pointermove", c), e.addEventListener("pointerup", l), e.addEventListener("pointercancel", l), {
    destroy() {
      e.removeEventListener("pointerdown", a), e.removeEventListener("pointermove", c), e.removeEventListener("pointerup", l), e.removeEventListener("pointercancel", l);
    }
  };
}
function Si(e, t) {
  return { ...e, nodes: [...e.nodes, t] };
}
function Oi(e, t) {
  return {
    ...e,
    nodes: e.nodes.filter((n) => n.id !== t),
    edges: e.edges.filter((n) => n.from !== t && n.to !== t)
  };
}
function Mi(e, t) {
  return { ...e, edges: e.edges.filter((n) => n.id !== t) };
}
function ke(e, t, n) {
  return { ...e, nodes: e.nodes.map((r) => r.id === t ? { ...r, ...n } : r) };
}
function re(e, t, n) {
  return { ...e, edges: e.edges.map((r) => r.id === t ? { ...r, ...n } : r) };
}
function _e(e, t, n) {
  const r = t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || e;
  if (!n.has(r)) return r;
  let o = 2;
  for (; n.has(`${r}-${o}`); ) o++;
  return `${r}-${o}`;
}
function Ii(e) {
  const { spec: t, layout: n, nodePositions: r, selectedNodeIds: o, newSubflowId: s, placeholderNodeId: i, placeholderLabel: a, existingSubflowIds: c } = e, l = new Set(o);
  if (l.size < 2)
    throw new Error("extractSubflow requires at least 2 selected nodes.");
  if (c.has(s) || s === t.id)
    throw new Error(`extractSubflow: subflow id "${s}" already exists.`);
  const d = new Set(t.nodes.map((C) => C.id));
  if (d.has(i) && !l.has(i))
    throw new Error(`extractSubflow: placeholder id "${i}" collides with an existing node.`);
  for (const C of l)
    if (!d.has(C)) throw new Error(`extractSubflow: selected node "${C}" not found in spec.`);
  const f = [], u = [], h = [], p = [];
  for (const C of t.edges) {
    const P = l.has(C.from), F = l.has(C.to);
    P && F ? f.push(C) : !P && F ? u.push(C) : P && !F ? h.push(C) : p.push(C);
  }
  const g = {
    id: s,
    title: a,
    style: t.style,
    direction: t.direction,
    nodes: t.nodes.filter((C) => l.has(C.id)),
    edges: f
  }, w = {
    id: i,
    label: a,
    type: "subprocess",
    subflow: s
  }, v = u.map((C) => ({ ...C, to: i })), x = h.map((C) => ({ ...C, from: i })), b = {
    ...t,
    nodes: [...t.nodes.filter((C) => !l.has(C.id)), w],
    edges: [...p, ...v, ...x]
  }, k = new Set(o), N = new Set(f.map((C) => C.id)), S = new Set([...v, ...x].map((C) => C.id)), I = {};
  for (const [C, P] of Object.entries(n.nodes))
    k.has(C) || (I[C] = P);
  const A = {};
  for (const [C, P] of Object.entries(n.edges))
    !N.has(C) && !S.has(C) && (A[C] = P);
  const U = $i(o, r);
  return U && (I[i] = U), {
    parent: { spec: b, layout: { nodes: I, edges: A } },
    subflow: { spec: g }
  };
}
function $i(e, t) {
  const n = e.map((s) => t[s]).filter((s) => !!s);
  if (!n.length) return null;
  const r = n.reduce((s, i) => s + i.x, 0) / n.length, o = n.reduce((s, i) => s + i.y, 0) / n.length;
  return { x: r, y: o };
}
const Ft = "http://127.0.0.1:5311";
let lt = !1;
function ji() {
  return lt ? Promise.resolve(!0) : fetch(`${Ft}/health`).then((e) => (e.ok && (lt = !0), e.ok)).catch(() => !1);
}
async function Ti(e, t, n) {
  const o = { layoutPath: e.layout ?? e.spec.replace(/\.flow\.json$/, ".layout.json"), layout: n };
  t && (o.specPath = e.spec, o.spec = t);
  try {
    return (await fetch(`${Ft}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(o)
    })).ok;
  } catch {
    return !1;
  }
}
function Ie(e, t, n) {
  const { nodes: r, edges: o, orphanedNodeIds: s, orphanedEdgeIds: i } = Se(t, n);
  return { flowId: e, title: t.title, spec: t, nodes: r, edges: o, dirty: !1, specDirty: !1, orphanedNodeIds: s, orphanedEdgeIds: i };
}
function Ri(e, t, n = {}) {
  e.classList.add("dd-flow-embed", "dd-flow-inline"), J(e, t.main.style);
  const r = Ie(t.main.id, t.main, t.mainLayout), o = Ae(r.nodes, r.edges);
  e.appendChild(o);
  const s = () => Vi(t, n);
  return e.addEventListener("click", s), {
    open: s,
    destroy() {
      e.removeEventListener("click", s), e.innerHTML = "";
    }
  };
}
const Ai = ".dd-flow-embed[data-flow]:not([data-dd-flow-mounted])";
async function Pi(e = document) {
  const t = Array.from(e.querySelectorAll(Ai));
  await Promise.all(
    t.map(async (n) => {
      n.setAttribute("data-dd-flow-mounted", "1");
      const r = n.getAttribute("data-flow");
      if (r)
        try {
          const o = await fetch(r);
          if (!o.ok) throw new Error(`${o.status} ${o.statusText}`);
          const s = await o.json();
          Ri(n, s);
        } catch (o) {
          console.error(`dd-flow: failed to load flow from "${r}"`, o), n.textContent = `dd-flow: failed to load "${r}" (see console)`;
        }
    })
  );
}
let R = null;
const oe = 48;
function Ht(e, t) {
  const { width: n, height: r } = t.viewBox.baseVal;
  if (!n || !r) return;
  const o = window.innerWidth * 0.96, s = window.innerHeight * 0.92, i = e.toolbar.querySelector(".dd-flow-toolbar-actions"), a = (i == null ? void 0 : i.scrollWidth) ?? 0, l = Math.min(Math.max(640, a + 24), o), d = Math.min(320, s), f = e.toolbar.getBoundingClientRect().height, u = e.warningBanner.hidden ? 0 : e.warningBanner.getBoundingClientRect().height, h = f + u, p = Math.min(Math.max(n + oe, l), o), g = Math.min(Math.max(r + oe + h, d), s);
  e.panel.style.width = `${p}px`, e.panel.style.height = `${g}px`;
  const w = p - oe, v = g - h - oe, x = Math.min(w / n, v / r, 1);
  t.setAttribute("width", String(Math.max(1, Math.floor(n * x)))), t.setAttribute("height", String(Math.max(1, Math.floor(r * x))));
}
function Bi() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
function Di(e) {
  var r, o;
  if (!Bi()) return;
  const t = e.webkitRequestFullscreen, n = ((r = e.requestFullscreen) == null ? void 0 : r.bind(e)) ?? (t == null ? void 0 : t.bind(e));
  (o = n == null ? void 0 : n()) == null || o.catch(() => {
  });
}
function Gi(e) {
  document.fullscreenElement === e && document.exitFullscreen().catch(() => {
  });
}
function Fi() {
  if (R) return R;
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
  `, document.body.appendChild(e), R = {
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
    inspector: Ei(e)
  }, e.addEventListener("click", (t) => {
    t.target === e && se();
  }), e.querySelector(".dd-flow-close-btn").addEventListener("click", se), document.addEventListener("keydown", (t) => {
    !e.hidden && t.key === "Escape" && (R != null && R.inspector.isOpen ? R.inspector.hide() : se());
  }), window.addEventListener("resize", () => {
    if (!R || R.root.hidden) return;
    const t = R.stage.querySelector("svg.dd-flow-svg");
    t && Ht(R, t);
  }), document.addEventListener("fullscreenchange", () => {
    !document.fullscreenElement && R && !R.root.hidden && se();
  }), R;
}
function se() {
  R && (Gi(R.root), R.root.hidden = !0, R.stage.innerHTML = "", R.inspector.hide(), document.body.classList.remove("dd-flow-lightbox-open"));
}
function Hi(e) {
  const t = Math.min(...e.map((s) => s.left)), n = Math.min(...e.map((s) => s.top)), r = Math.max(...e.map((s) => s.right)), o = Math.max(...e.map((s) => s.bottom));
  return new DOMRect(t, n, r - t, o - n);
}
function Vi(e, t) {
  var z, M;
  const n = Fi();
  n.root.hidden = !1, document.body.classList.add("dd-flow-lightbox-open"), Di(n.root);
  const r = [Ie(e.main.id, e.main, e.mainLayout)];
  let o = !1, s = /* @__PURE__ */ new Set(), i = null, a = !1, c = !1;
  function l() {
    c || !e.sources || ji().then((m) => {
      !m || n.root.hidden || (c = !0, I(), n.addShapeBtn.disabled = !o);
    });
  }
  l(), n.stage.innerHTML = "";
  const d = document.createElement("div");
  d.className = "dd-flow-stage-inner", n.stage.appendChild(d), J(n.root, e.main.style);
  const f = { nodes: r[0].nodes, edges: r[0].edges };
  function u() {
    return r[r.length - 1];
  }
  function h() {
    f.nodes = u().nodes, f.edges = u().edges;
  }
  function p(m) {
    return Array.from(d.querySelectorAll(".dd-flow-node")).find((y) => y.getAttribute("data-node-id") === m) ?? null;
  }
  function g(m) {
    return Array.from(d.querySelectorAll(".dd-flow-edge")).find((y) => y.getAttribute("data-edge-id") === m) ?? null;
  }
  function w(m, y = {}) {
    const E = u(), L = Ee(E.nodes, E.edges);
    if (y.resizeNodeId) {
      const $ = L.nodes[y.resizeNodeId];
      $ && (L.nodes[y.resizeNodeId] = { x: $.x, y: $.y });
    }
    y.clearEdgePoints && delete L.edges[y.clearEdgePoints], y.setNodePosition && (L.nodes[y.setNodePosition.id] = y.setNodePosition.point), E.spec = m(E.spec);
    const _ = Se(E.spec, L);
    E.nodes = _.nodes, E.edges = _.edges, E.orphanedNodeIds = _.orphanedNodeIds, E.orphanedEdgeIds = _.orphanedEdgeIds, E.dirty = !0, E.specDirty = !0, h(), n.saveBtn.disabled = !1, S();
  }
  function v(m) {
    var L;
    const y = u().spec.nodes.find((_) => _.id === m), E = y == null ? void 0 : y.subflow;
    return {
      onLabelChange: (_) => {
        w((V) => ke(V, m, { label: _ }), { resizeNodeId: m });
        const $ = p(m);
        $ && n.inspector.refreshAnchor($.getBoundingClientRect());
      },
      onNoteChange: (_) => w(($) => ke($, m, { note: _ })),
      onTypeChange: (_) => {
        w(($) => ke($, m, { type: _ }), { resizeNodeId: m }), b();
      },
      onDelete: () => {
        w((_) => Oi(_, m)), s.delete(m), I(), n.inspector.hide();
      },
      onGotoSubflow: E && ((L = e.subflows) != null && L[E]) ? () => k(E) : void 0
    };
  }
  function x(m) {
    return {
      onLabelChange: (y) => w((E) => re(E, m, { label: y })),
      onRoutingChange: (y) => w((E) => re(E, m, { routing: y }), { clearEdgePoints: m }),
      onStrokeChange: (y) => w((E) => re(E, m, { stroke: y })),
      onKindChange: (y) => w((E) => re(E, m, { kind: y })),
      onDelete: () => {
        w((y) => Mi(y, m)), i = null, n.inspector.hide();
      }
    };
  }
  function b(m = {}) {
    if (!o || !c) {
      n.inspector.hide();
      return;
    }
    if (s.size === 1 && !i) {
      const y = [...s][0], E = u().spec.nodes.find((_) => _.id === y), L = p(y);
      if (E && L) {
        n.inspector.showNode(E, L.getBoundingClientRect(), v(y), m);
        return;
      }
    }
    if (i) {
      const y = u().spec.edges.find((L) => L.id === i), E = g(i);
      if (y && E) {
        n.inspector.showEdge(y, E.getBoundingClientRect(), x(i));
        return;
      }
    }
    n.inspector.hide();
  }
  function k(m) {
    var E;
    const y = (E = e.subflows) == null ? void 0 : E[m];
    y && (r.push(Ie(m, y.spec, y.layout)), h(), s = /* @__PURE__ */ new Set(), i = null, n.inspector.hide(), J(n.root, y.spec.style ?? e.main.style), A(), I(), S());
  }
  const N = Ni(d, f, S, {
    onNodeClick: (m, y) => {
      var L;
      const E = u().nodes.find((_) => _.id === m);
      if (E) {
        if (o) {
          i = null, y.shiftKey ? s.has(m) ? s.delete(m) : s.add(m) : s = s.size === 1 && s.has(m) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([m]), I(), S(), b();
          return;
        }
        E.subflow && ((L = e.subflows) != null && L[E.subflow]) && k(E.subflow);
      }
    },
    onNodeMoved: (m) => {
      s = /* @__PURE__ */ new Set([m]), i = null, I(), u().dirty = !0, n.saveBtn.disabled = !1, S(), b();
    },
    onEdgeClick: (m) => {
      o && (s = /* @__PURE__ */ new Set(), i = i === m ? null : m, I(), S(), b());
    },
    onBackgroundClick: (m) => {
      if (o) {
        if (a) {
          const y = new Set(u().spec.nodes.map((L) => L.id)), E = _e("step", "New step", y);
          w((L) => Si(L, { id: E, label: "New step", type: "process" }), { setNodePosition: { id: E, point: m } }), a = !1, d.classList.remove("dd-flow-placing"), n.addShapeBtn.classList.remove("is-active"), s = /* @__PURE__ */ new Set([E]), i = null, I(), b({ focusLabel: !0 });
          return;
        }
        s = /* @__PURE__ */ new Set(), i = null, I(), S(), b();
      }
    }
  });
  function S() {
    const m = u(), y = Ae(m.nodes, m.edges, { selectedNodeIds: s, selectedEdgeId: i }), E = d.querySelector("svg.dd-flow-svg");
    E ? d.replaceChild(y, E) : d.appendChild(y), Ht(n, y);
  }
  function I() {
    const m = s.size;
    n.makeSubflowBtn.disabled = !o || !c || m < 2, n.makeSubflowBtn.textContent = m >= 2 ? `Make subflow (${m})` : "Make subflow";
  }
  function A() {
    n.breadcrumbEl.innerHTML = "", r.forEach((L, _) => {
      if (_ > 0) {
        const V = document.createElement("span");
        V.className = "dd-flow-breadcrumb-sep", V.textContent = "›", n.breadcrumbEl.appendChild(V);
      }
      const $ = document.createElement(_ === r.length - 1 ? "span" : "button");
      $.className = "dd-flow-breadcrumb-item", $.textContent = L.title, _ !== r.length - 1 && ($.type = "button", $.addEventListener("click", () => {
        r.length = _ + 1, h(), s = /* @__PURE__ */ new Set(), i = null, J(n.root, u().spec.style ?? e.main.style), A(), I(), S(), b();
      })), n.breadcrumbEl.appendChild($);
    }), n.saveBtn.disabled = !(u().dirty || u().specDirty), n.editBtn.textContent = o ? "Done editing" : "Edit layout", n.editBtn.classList.toggle("is-active", o), n.addShapeBtn.disabled = !o || !c;
    const { orphanedNodeIds: m, orphanedEdgeIds: y } = u(), E = m.length + y.length;
    if (E > 0) {
      const L = [...m, ...y].join(", ");
      n.warningBanner.textContent = `⚠ The saved layout has ${E} position(s) that no longer match this flow (${L}) — they were dropped. This usually means the flow was regenerated with different node/edge ids.`, n.warningBanner.hidden = !1;
    } else
      n.warningBanner.hidden = !0;
  }
  const U = () => {
    o = !o, d.classList.toggle("dd-flow-editing", o), n.editBtn.textContent = o ? "Done editing" : "Edit layout", n.editBtn.classList.toggle("is-active", o), o && l(), o || (s = /* @__PURE__ */ new Set(), i = null, a = !1, d.classList.remove("dd-flow-placing"), n.addShapeBtn.classList.remove("is-active")), n.addShapeBtn.disabled = !o || !c, I(), S(), b();
  }, C = () => {
    !o || !c || (a = !a, d.classList.toggle("dd-flow-placing", a), n.addShapeBtn.classList.toggle("is-active", a));
  }, P = () => {
    if (!o || !c || s.size < 2) return;
    const m = [...s], y = m.map((L) => p(L)).filter((L) => L !== null);
    if (!y.length) return;
    const E = Hi(y.map((L) => L.getBoundingClientRect()));
    n.inspector.showPrompt("Name the new subflow", E, "Subflow", (L) => {
      const _ = u(), $ = new Set(Object.keys(e.subflows ?? {})), V = new Set(_.spec.nodes.map((W) => W.id)), pe = _e("subflow", L, $), Pe = _e(pe, L, V), Be = {};
      for (const W of _.nodes) Be[W.id] = { x: W.x, y: W.y };
      let Z;
      try {
        Z = Ii({
          spec: _.spec,
          layout: Ee(_.nodes, _.edges),
          nodePositions: Be,
          selectedNodeIds: m,
          newSubflowId: pe,
          placeholderNodeId: Pe,
          placeholderLabel: L,
          existingSubflowIds: $
        });
      } catch (W) {
        console.error("dd-flow: could not extract subflow", W);
        return;
      }
      _.spec = Z.parent.spec;
      const ee = Se(_.spec, Z.parent.layout);
      _.nodes = ee.nodes, _.edges = ee.edges, _.orphanedNodeIds = ee.orphanedNodeIds, _.orphanedEdgeIds = ee.orphanedEdgeIds, _.dirty = !0, _.specDirty = !0, e.subflows || (e.subflows = {}), e.subflows[pe] = { spec: Z.subflow.spec, layout: void 0 }, h(), s = /* @__PURE__ */ new Set([Pe]), i = null, I(), n.saveBtn.disabled = !1, A(), S(), b();
    });
  }, F = async () => {
    var $;
    const m = u(), y = Ee(m.nodes, m.edges), E = m.specDirty, L = t.onSaveLayout || t.onSaveSpec, _ = c ? ($ = e.sources) == null ? void 0 : $[m.flowId] : void 0;
    if (!L && _ && await Ti(_, E ? m.spec : null, y)) {
      m.dirty = !1, m.specDirty = !1, n.saveBtn.disabled = !0;
      return;
    }
    t.onSaveLayout ? t.onSaveLayout(m.flowId, y) : pi(m.flowId, y), E && (t.onSaveSpec ? t.onSaveSpec(m.flowId, m.spec) : mi(m.flowId, m.spec)), m.dirty = !1, m.specDirty = !1, n.saveBtn.disabled = !0;
  }, D = () => {
    const m = d.querySelector("svg.dd-flow-svg");
    m && bi(m, d, `${u().flowId}.svg`);
  }, Q = () => {
    const m = d.querySelector("svg.dd-flow-svg");
    m && vi(m, d, `${u().flowId}.png`);
  };
  n.editBtn.onclick = U, n.addShapeBtn.onclick = C, n.makeSubflowBtn.onclick = P, n.saveBtn.onclick = F, n.root.querySelector(".dd-flow-export-svg-btn").onclick = D, n.root.querySelector(".dd-flow-export-png-btn").onclick = Q, o = !1, s = /* @__PURE__ */ new Set(), i = null, a = !1, d.classList.remove("dd-flow-editing", "dd-flow-placing"), A(), I(), S(), b(), (M = (z = n.root._interactions) == null ? void 0 : z.destroy) == null || M.call(z), n.root._interactions = N;
}
function zi(e) {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const r of e)
    t.has(r.to) || t.set(r.to, []), t.get(r.to).push(r.from), n.has(r.from) || n.set(r.from, []), n.get(r.from).push(r.to);
  return { parentsOf: t, childrenOf: n };
}
function ct(e, t) {
  const n = /* @__PURE__ */ new Set(), r = [...e.get(t) ?? []];
  for (; r.length; ) {
    const o = r.pop();
    n.has(o) || (n.add(o), r.push(...e.get(o) ?? []));
  }
  return n;
}
const ft = ["is-focus", "is-upstream", "is-downstream", "is-dimmed"];
function ie(e, t, n, r) {
  const o = r ? ct(n.parentsOf, r) : /* @__PURE__ */ new Set(), s = r ? ct(n.childrenOf, r) : /* @__PURE__ */ new Set(), i = new Set(r ? [...o, r] : []), a = new Set(r ? [...s, r] : []);
  for (const l of e.querySelectorAll(".dd-flow-node")) {
    if (l.classList.remove(...ft), !r) continue;
    const d = l.getAttribute("data-node-id") ?? "";
    d === r ? l.classList.add("is-focus") : o.has(d) ? l.classList.add("is-upstream") : s.has(d) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed");
  }
  const c = new Map(t.map((l) => [l.id, l]));
  for (const l of e.querySelectorAll(".dd-flow-edge")) {
    if (l.classList.remove(...ft), !r) continue;
    const d = c.get(l.getAttribute("data-edge-id") ?? "");
    d && (i.has(d.from) && i.has(d.to) ? l.classList.add("is-upstream") : a.has(d.from) && a.has(d.to) ? l.classList.add("is-downstream") : l.classList.add("is-dimmed"));
  }
}
function Wi(e, t, n = {}) {
  const r = zi(t);
  let o = null;
  const s = (d) => {
    var u;
    const f = (u = d == null ? void 0 : d.closest) == null ? void 0 : u.call(d, ".dd-flow-node");
    return (f == null ? void 0 : f.getAttribute("data-node-id")) ?? null;
  }, i = () => ie(e, t, r, o), a = (d) => {
    if (o) return;
    const f = s(d.target);
    f && ie(e, t, r, f);
  }, c = (d) => {
    var u, h;
    if (o) return;
    const f = (h = (u = d.relatedTarget) == null ? void 0 : u.closest) == null ? void 0 : h.call(u, ".dd-flow-node");
    f && f === d.target.closest(".dd-flow-node") || ie(e, t, r, null);
  }, l = (d) => {
    const f = s(d.target);
    o = f && f !== o ? f : null, i();
  };
  return n.hover !== !1 && (e.addEventListener("pointerover", a), e.addEventListener("pointerout", c)), e.addEventListener("click", l), {
    setFocus(d) {
      o = d, i();
    },
    getFocus: () => o,
    destroy() {
      e.removeEventListener("pointerover", a), e.removeEventListener("pointerout", c), e.removeEventListener("click", l), ie(e, t, r, null);
    }
  };
}
const X = {
  nodeWidth: 118,
  nodeHeight: 34,
  layerGap: 170,
  rowGap: 48,
  margin: 30,
  hint: "Hover to preview · click to pin · scroll to zoom · drag to pan"
};
function Yi(e, t, n) {
  const { nodeWidth: r, nodeHeight: o, layerGap: s, rowGap: i, margin: a } = n, c = /* @__PURE__ */ new Map();
  for (const p of e) {
    const g = p.layer ?? 0;
    c.has(g) || c.set(g, []), c.get(g).push(p);
  }
  for (const p of c.values()) p.sort((g, w) => g.id.localeCompare(w.id));
  const l = Math.max(1, ...[...c.values()].map((p) => p.length)), d = Math.max(0, ...e.map((p) => p.layer ?? 0)), f = l * (o + i) - i, u = new Set(t.map((p) => p.source)), h = /* @__PURE__ */ new Map();
  for (const [p, g] of c) {
    const w = g.filter((k) => u.has(k.id)), v = g.filter((k) => !u.has(k.id)), x = w.length ? w.length * (o + i) - i : 0, b = a + (f - x) / 2;
    w.forEach((k, N) => {
      h.set(k.id, { x: a + p * s, y: b + N * (o + i) });
    }), v.forEach((k, N) => {
      const S = Math.floor(N / 2), I = N % 2 === 0 ? S : l - 1 - S;
      h.set(k.id, { x: a + p * s, y: a + I * (o + i) });
    });
  }
  return {
    positions: h,
    width: a * 2 + d * s + r,
    height: a * 2 + f
  };
}
const qi = (e) => `${e.source}\0${e.target}`;
function Ui(e, t, n = {}) {
  const r = n.nodeWidth ?? X.nodeWidth, o = n.nodeHeight ?? X.nodeHeight, s = n.hint ?? X.hint;
  e.classList.add("dd-flow-embed", "dd-flow-graph-mount"), J(e, n.style ?? "host");
  const { positions: i } = Yi(t.nodes, t.edges, {
    nodeWidth: r,
    nodeHeight: o,
    layerGap: n.layerGap ?? X.layerGap,
    rowGap: n.rowGap ?? X.rowGap,
    margin: X.margin
  }), a = t.nodes.map((w) => {
    const v = i.get(w.id);
    return {
      id: w.id,
      label: w.label ?? w.id,
      type: "process",
      note: w.note,
      x: v.x + r / 2,
      y: v.y + o / 2,
      w: r,
      h: o
    };
  }), c = t.edges.filter((w) => i.has(w.source) && i.has(w.target)).map((w) => ({
    id: qi(w),
    from: w.source,
    to: w.target,
    routing: "bezier",
    stroke: w.flagged ? "dashed" : "solid",
    kind: w.flagged ? "conditional" : "default",
    points: []
  })), l = Ae(a, c);
  e.appendChild(l);
  const d = document.createElement("div");
  if (d.className = "dd-flow-graph-tooltip", e.appendChild(d), s) {
    const w = document.createElement("div");
    w.className = "dd-flow-graph-hint", w.textContent = s, e.appendChild(w);
  }
  const f = new Map(t.nodes.map((w) => [w.id, w])), u = (w) => {
    var N, S;
    const v = (S = (N = w.target) == null ? void 0 : N.closest) == null ? void 0 : S.call(N, ".dd-flow-node"), x = v == null ? void 0 : v.getAttribute("data-node-id"), b = x ? f.get(x) : void 0;
    if (!b) {
      d.style.display = "none";
      return;
    }
    d.textContent = b.note ? `${b.label ?? b.id} · ${b.note}` : b.label ?? b.id, d.style.display = "block";
    const k = e.getBoundingClientRect();
    d.style.left = `${w.clientX - k.left + 14}px`, d.style.top = `${w.clientY - k.top + 14}px`;
  }, h = () => {
    d.style.display = "none";
  };
  e.addEventListener("pointermove", u), e.addEventListener("pointerleave", h);
  let p = Li(e, l, { maxFitScale: 1 }), g = Wi(e, c);
  return {
    destroy() {
      e.removeEventListener("pointermove", u), e.removeEventListener("pointerleave", h), g == null || g.destroy(), g = null, p == null || p.destroy(), p = null, e.innerHTML = "", e.classList.remove("dd-flow-graph-mount");
    }
  };
}
const Xi = ".dd-flow-graph:not([data-dd-flow-mounted])";
async function Ki(e = document) {
  const t = Array.from(e.querySelectorAll(Xi));
  await Promise.all(
    t.map(async (n) => {
      n.setAttribute("data-dd-flow-mounted", "1");
      const r = n.getAttribute("data-graph");
      try {
        let o;
        if (r) {
          const i = await fetch(r);
          if (!i.ok) throw new Error(`${i.status} ${i.statusText}`);
          o = await i.json();
        } else {
          const i = n.querySelector('script[type="application/json"]');
          if (!(i != null && i.textContent)) throw new Error("no data-graph attribute and no inline JSON");
          o = JSON.parse(i.textContent), i.remove();
        }
        const s = n.getAttribute("data-hint");
        Ui(n, o, { style: n.getAttribute("data-style") ?? void 0, hint: s ?? void 0 });
      } catch (o) {
        console.error("dd-flow: failed to mount graph", o), n.textContent = "dd-flow: failed to mount graph (see console)";
      }
    })
  );
}
if (typeof document < "u") {
  const e = () => {
    Pi(), Ki();
  }, t = globalThis.document$;
  t ? t.subscribe(e) : document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e();
}
export {
  xe as DEFAULT_THEME,
  ce as THEMES,
  J as applyTheme,
  Wi as attachRelationHighlight,
  Li as attachViewport,
  Pi as autoMountFlows,
  Ki as autoMountGraphs,
  zi as buildGraphIndex,
  ct as collectClosure,
  Se as computeLayout,
  he as downloadBlob,
  pi as downloadLayout,
  vi as downloadPng,
  bi as downloadSvg,
  Qi as emptyLayout,
  Yi as layoutLayered,
  Ri as mountFlow,
  Ui as mountGraph,
  ie as paintRelations,
  na as registerTheme,
  Ae as renderSvg,
  si as routeEdge,
  Ee as toLayout
};
