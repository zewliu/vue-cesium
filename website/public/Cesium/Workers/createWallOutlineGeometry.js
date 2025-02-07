define([
  './defaultValue-0a909f67',
  './Matrix3-b6f074fa',
  './Transforms-dadc538f',
  './ComponentDatatype-77274976',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './IndexDatatype-2149f06c',
  './Math-e97915da',
  './WallGeometryLibrary-6eb1da53',
  './Matrix2-163b5a1d',
  './RuntimeError-06c93819',
  './combine-ca22a614',
  './WebGLConstants-a8cc3e8c',
  './arrayRemoveDuplicates-e9673044',
  './PolylinePipeline-2b44aa86',
  './EllipsoidGeodesic-b00a0416',
  './EllipsoidRhumbLine-7f84cca0',
  './IntersectionTests-1307e0a8',
  './Plane-1c5a21a3'
], function (e, i, t, n, a, o, s, r, l, m, d, u, c, p, f, h, g, y, _) {
  'use strict'
  const E = new i.Cartesian3(),
    C = new i.Cartesian3()
  function H(t) {
    const n = (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).positions,
      a = t.maximumHeights,
      o = t.minimumHeights,
      s = e.defaultValue(t.granularity, r.CesiumMath.RADIANS_PER_DEGREE),
      l = e.defaultValue(t.ellipsoid, i.Ellipsoid.WGS84)
    ;(this._positions = n),
      (this._minimumHeights = o),
      (this._maximumHeights = a),
      (this._granularity = s),
      (this._ellipsoid = i.Ellipsoid.clone(l)),
      (this._workerName = 'createWallOutlineGeometry')
    let m = 1 + n.length * i.Cartesian3.packedLength + 2
    e.defined(o) && (m += o.length), e.defined(a) && (m += a.length), (this.packedLength = m + i.Ellipsoid.packedLength + 1)
  }
  H.pack = function (t, n, a) {
    let o
    a = e.defaultValue(a, 0)
    const s = t._positions
    let r = s.length
    for (n[a++] = r, o = 0; o < r; ++o, a += i.Cartesian3.packedLength) i.Cartesian3.pack(s[o], n, a)
    const l = t._minimumHeights
    if (((r = e.defined(l) ? l.length : 0), (n[a++] = r), e.defined(l))) for (o = 0; o < r; ++o) n[a++] = l[o]
    const m = t._maximumHeights
    if (((r = e.defined(m) ? m.length : 0), (n[a++] = r), e.defined(m))) for (o = 0; o < r; ++o) n[a++] = m[o]
    return i.Ellipsoid.pack(t._ellipsoid, n, a), (n[(a += i.Ellipsoid.packedLength)] = t._granularity), n
  }
  const b = i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),
    A = { positions: void 0, minimumHeights: void 0, maximumHeights: void 0, ellipsoid: b, granularity: void 0 }
  return (
    (H.unpack = function (t, n, a) {
      let o
      n = e.defaultValue(n, 0)
      let s = t[n++]
      const r = new Array(s)
      for (o = 0; o < s; ++o, n += i.Cartesian3.packedLength) r[o] = i.Cartesian3.unpack(t, n)
      let l, m
      if (((s = t[n++]), s > 0)) for (l = new Array(s), o = 0; o < s; ++o) l[o] = t[n++]
      if (((s = t[n++]), s > 0)) for (m = new Array(s), o = 0; o < s; ++o) m[o] = t[n++]
      const d = i.Ellipsoid.unpack(t, n, b),
        u = t[(n += i.Ellipsoid.packedLength)]
      return e.defined(a)
        ? ((a._positions = r),
          (a._minimumHeights = l),
          (a._maximumHeights = m),
          (a._ellipsoid = i.Ellipsoid.clone(d, a._ellipsoid)),
          (a._granularity = u),
          a)
        : ((A.positions = r), (A.minimumHeights = l), (A.maximumHeights = m), (A.granularity = u), new H(A))
    }),
    (H.fromConstantHeights = function (i) {
      const t = (i = e.defaultValue(i, e.defaultValue.EMPTY_OBJECT)).positions
      let n, a
      const o = i.minimumHeight,
        s = i.maximumHeight,
        r = e.defined(o),
        l = e.defined(s)
      if (r || l) {
        const e = t.length
        ;(n = r ? new Array(e) : void 0), (a = l ? new Array(e) : void 0)
        for (let i = 0; i < e; ++i) r && (n[i] = o), l && (a[i] = s)
      }
      return new H({ positions: t, maximumHeights: a, minimumHeights: n, ellipsoid: i.ellipsoid })
    }),
    (H.createGeometry = function (m) {
      const d = m._positions,
        u = m._minimumHeights,
        c = m._maximumHeights,
        p = m._granularity,
        f = m._ellipsoid,
        h = l.WallGeometryLibrary.computePositions(f, d, c, u, p, !1)
      if (!e.defined(h)) return
      const g = h.bottomPositions,
        y = h.topPositions
      let _ = y.length,
        H = 2 * _
      const b = new Float64Array(H)
      let A,
        k = 0
      for (_ /= 3, A = 0; A < _; ++A) {
        const e = 3 * A,
          t = i.Cartesian3.fromArray(y, e, E),
          n = i.Cartesian3.fromArray(g, e, C)
        ;(b[k++] = n.x), (b[k++] = n.y), (b[k++] = n.z), (b[k++] = t.x), (b[k++] = t.y), (b[k++] = t.z)
      }
      const w = new o.GeometryAttributes({
          position: new a.GeometryAttribute({ componentDatatype: n.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: b })
        }),
        x = H / 3
      H = 2 * x - 4 + x
      const G = s.IndexDatatype.createTypedArray(x, H)
      let L = 0
      for (A = 0; A < x - 2; A += 2) {
        const e = A,
          t = A + 2,
          n = i.Cartesian3.fromArray(b, 3 * e, E),
          a = i.Cartesian3.fromArray(b, 3 * t, C)
        if (i.Cartesian3.equalsEpsilon(n, a, r.CesiumMath.EPSILON10)) continue
        const o = A + 1,
          s = A + 3
        ;(G[L++] = o), (G[L++] = e), (G[L++] = o), (G[L++] = s), (G[L++] = e), (G[L++] = t)
      }
      return (
        (G[L++] = x - 2),
        (G[L++] = x - 1),
        new a.Geometry({ attributes: w, indices: G, primitiveType: a.PrimitiveType.LINES, boundingSphere: new t.BoundingSphere.fromVertices(b) })
      )
    }),
    function (t, n) {
      return e.defined(n) && (t = H.unpack(t, n)), (t._ellipsoid = i.Ellipsoid.clone(t._ellipsoid)), H.createGeometry(t)
    }
  )
})
