define([
  './defaultValue-0a909f67',
  './Matrix3-b6f074fa',
  './ArcType-ce2e50ab',
  './arrayRemoveDuplicates-e9673044',
  './Transforms-dadc538f',
  './Color-0a64769f',
  './ComponentDatatype-77274976',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './IndexDatatype-2149f06c',
  './Math-e97915da',
  './PolylinePipeline-2b44aa86',
  './VertexFormat-ab2e00e6',
  './Matrix2-163b5a1d',
  './RuntimeError-06c93819',
  './combine-ca22a614',
  './WebGLConstants-a8cc3e8c',
  './EllipsoidGeodesic-b00a0416',
  './EllipsoidRhumbLine-7f84cca0',
  './IntersectionTests-1307e0a8',
  './Plane-1c5a21a3'
], function (e, t, o, r, n, a, i, l, s, c, p, d, u, y, m, f, h, C, g, _, A) {
  'use strict'
  const E = []
  function P(e, t, o, r, n) {
    const i = E
    let l
    i.length = n
    const s = o.red,
      c = o.green,
      p = o.blue,
      d = o.alpha,
      u = r.red,
      y = r.green,
      m = r.blue,
      f = r.alpha
    if (a.Color.equals(o, r)) {
      for (l = 0; l < n; l++) i[l] = a.Color.clone(o)
      return i
    }
    const h = (u - s) / n,
      C = (y - c) / n,
      g = (m - p) / n,
      _ = (f - d) / n
    for (l = 0; l < n; l++) i[l] = new a.Color(s + l * h, c + l * C, p + l * g, d + l * _)
    return i
  }
  function b(r) {
    const n = (r = e.defaultValue(r, e.defaultValue.EMPTY_OBJECT)).positions,
      i = r.colors,
      l = e.defaultValue(r.width, 1),
      s = e.defaultValue(r.colorsPerVertex, !1)
    ;(this._positions = n),
      (this._colors = i),
      (this._width = l),
      (this._colorsPerVertex = s),
      (this._vertexFormat = u.VertexFormat.clone(e.defaultValue(r.vertexFormat, u.VertexFormat.DEFAULT))),
      (this._arcType = e.defaultValue(r.arcType, o.ArcType.GEODESIC)),
      (this._granularity = e.defaultValue(r.granularity, p.CesiumMath.RADIANS_PER_DEGREE)),
      (this._ellipsoid = t.Ellipsoid.clone(e.defaultValue(r.ellipsoid, t.Ellipsoid.WGS84))),
      (this._workerName = 'createPolylineGeometry')
    let c = 1 + n.length * t.Cartesian3.packedLength
    ;(c += e.defined(i) ? 1 + i.length * a.Color.packedLength : 1),
      (this.packedLength = c + t.Ellipsoid.packedLength + u.VertexFormat.packedLength + 4)
  }
  b.pack = function (o, r, n) {
    let i
    n = e.defaultValue(n, 0)
    const l = o._positions
    let s = l.length
    for (r[n++] = s, i = 0; i < s; ++i, n += t.Cartesian3.packedLength) t.Cartesian3.pack(l[i], r, n)
    const c = o._colors
    for (s = e.defined(c) ? c.length : 0, r[n++] = s, i = 0; i < s; ++i, n += a.Color.packedLength) a.Color.pack(c[i], r, n)
    return (
      t.Ellipsoid.pack(o._ellipsoid, r, n),
      (n += t.Ellipsoid.packedLength),
      u.VertexFormat.pack(o._vertexFormat, r, n),
      (n += u.VertexFormat.packedLength),
      (r[n++] = o._width),
      (r[n++] = o._colorsPerVertex ? 1 : 0),
      (r[n++] = o._arcType),
      (r[n] = o._granularity),
      r
    )
  }
  const x = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    w = new u.VertexFormat(),
    T = {
      positions: void 0,
      colors: void 0,
      ellipsoid: x,
      vertexFormat: w,
      width: void 0,
      colorsPerVertex: void 0,
      arcType: void 0,
      granularity: void 0
    }
  b.unpack = function (o, r, n) {
    let i
    r = e.defaultValue(r, 0)
    let l = o[r++]
    const s = new Array(l)
    for (i = 0; i < l; ++i, r += t.Cartesian3.packedLength) s[i] = t.Cartesian3.unpack(o, r)
    l = o[r++]
    const c = l > 0 ? new Array(l) : void 0
    for (i = 0; i < l; ++i, r += a.Color.packedLength) c[i] = a.Color.unpack(o, r)
    const p = t.Ellipsoid.unpack(o, r, x)
    r += t.Ellipsoid.packedLength
    const d = u.VertexFormat.unpack(o, r, w)
    r += u.VertexFormat.packedLength
    const y = o[r++],
      m = 1 === o[r++],
      f = o[r++],
      h = o[r]
    return e.defined(n)
      ? ((n._positions = s),
        (n._colors = c),
        (n._ellipsoid = t.Ellipsoid.clone(p, n._ellipsoid)),
        (n._vertexFormat = u.VertexFormat.clone(d, n._vertexFormat)),
        (n._width = y),
        (n._colorsPerVertex = m),
        (n._arcType = f),
        (n._granularity = h),
        n)
      : ((T.positions = s), (T.colors = c), (T.width = y), (T.colorsPerVertex = m), (T.arcType = f), (T.granularity = h), new b(T))
  }
  const D = new t.Cartesian3(),
    k = new t.Cartesian3(),
    V = new t.Cartesian3(),
    v = new t.Cartesian3()
  return (
    (b.createGeometry = function (u) {
      const y = u._width,
        m = u._vertexFormat
      let f = u._colors
      const h = u._colorsPerVertex,
        C = u._arcType,
        g = u._granularity,
        _ = u._ellipsoid
      let A, b, x
      const w = []
      let T = r.arrayRemoveDuplicates(u._positions, t.Cartesian3.equalsEpsilon, !1, w)
      if (e.defined(f) && w.length > 0) {
        let e = 0,
          t = w[0]
        f = f.filter(function (o, r) {
          let n = !1
          return (n = h ? r === t || (0 === r && 1 === t) : r + 1 === t), !n || (e++, (t = w[e]), !1)
        })
      }
      let L = T.length
      if (L < 2 || y <= 0) return
      if (C === o.ArcType.GEODESIC || C === o.ArcType.RHUMB) {
        let t, r
        C === o.ArcType.GEODESIC
          ? ((t = p.CesiumMath.chordLength(g, _.maximumRadius)), (r = d.PolylinePipeline.numberOfPoints))
          : ((t = g), (r = d.PolylinePipeline.numberOfPointsRhumbLine))
        const n = d.PolylinePipeline.extractHeights(T, _)
        if (e.defined(f)) {
          let e = 1
          for (A = 0; A < L - 1; ++A) e += r(T[A], T[A + 1], t)
          const o = new Array(e)
          let n = 0
          for (A = 0; A < L - 1; ++A) {
            const i = T[A],
              l = T[A + 1],
              s = f[A],
              c = r(i, l, t)
            if (h && A < e) {
              const e = P(0, 0, s, f[A + 1], c),
                t = e.length
              for (b = 0; b < t; ++b) o[n++] = e[b]
            } else for (b = 0; b < c; ++b) o[n++] = a.Color.clone(s)
          }
          ;(o[n] = a.Color.clone(f[f.length - 1])), (f = o), (E.length = 0)
        }
        T =
          C === o.ArcType.GEODESIC
            ? d.PolylinePipeline.generateCartesianArc({ positions: T, minDistance: t, ellipsoid: _, height: n })
            : d.PolylinePipeline.generateCartesianRhumbArc({ positions: T, granularity: t, ellipsoid: _, height: n })
      }
      L = T.length
      const F = 4 * L - 4,
        G = new Float64Array(3 * F),
        O = new Float64Array(3 * F),
        R = new Float64Array(3 * F),
        I = new Float32Array(2 * F),
        S = m.st ? new Float32Array(2 * F) : void 0,
        B = e.defined(f) ? new Uint8Array(4 * F) : void 0
      let M,
        U = 0,
        N = 0,
        H = 0,
        W = 0
      for (b = 0; b < L; ++b) {
        let o, r
        0 === b ? ((M = D), t.Cartesian3.subtract(T[0], T[1], M), t.Cartesian3.add(T[0], M, M)) : (M = T[b - 1]),
          t.Cartesian3.clone(M, V),
          t.Cartesian3.clone(T[b], k),
          b === L - 1 ? ((M = D), t.Cartesian3.subtract(T[L - 1], T[L - 2], M), t.Cartesian3.add(T[L - 1], M, M)) : (M = T[b + 1]),
          t.Cartesian3.clone(M, v),
          e.defined(B) && ((o = 0 === b || h ? f[b] : f[b - 1]), b !== L - 1 && (r = f[b]))
        const n = b === L - 1 ? 2 : 4
        for (x = 0 === b ? 2 : 0; x < n; ++x) {
          t.Cartesian3.pack(k, G, U), t.Cartesian3.pack(V, O, U), t.Cartesian3.pack(v, R, U), (U += 3)
          const n = x - 2 < 0 ? -1 : 1
          if (((I[N++] = (x % 2) * 2 - 1), (I[N++] = n * y), m.st && ((S[H++] = b / (L - 1)), (S[H++] = Math.max(I[N - 2], 0))), e.defined(B))) {
            const e = x < 2 ? o : r
            ;(B[W++] = a.Color.floatToByte(e.red)),
              (B[W++] = a.Color.floatToByte(e.green)),
              (B[W++] = a.Color.floatToByte(e.blue)),
              (B[W++] = a.Color.floatToByte(e.alpha))
          }
        }
      }
      const Y = new s.GeometryAttributes()
      ;(Y.position = new l.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: G })),
        (Y.prevPosition = new l.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: O })),
        (Y.nextPosition = new l.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: R })),
        (Y.expandAndWidth = new l.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: I })),
        m.st && (Y.st = new l.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: S })),
        e.defined(B) &&
          (Y.color = new l.GeometryAttribute({
            componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 4,
            values: B,
            normalize: !0
          }))
      const q = c.IndexDatatype.createTypedArray(F, 6 * L - 6)
      let z = 0,
        J = 0
      const j = L - 1
      for (b = 0; b < j; ++b) (q[J++] = z), (q[J++] = z + 2), (q[J++] = z + 1), (q[J++] = z + 1), (q[J++] = z + 2), (q[J++] = z + 3), (z += 4)
      return new l.Geometry({
        attributes: Y,
        indices: q,
        primitiveType: l.PrimitiveType.TRIANGLES,
        boundingSphere: n.BoundingSphere.fromPoints(T),
        geometryType: l.GeometryType.POLYLINES
      })
    }),
    function (o, r) {
      return e.defined(r) && (o = b.unpack(o, r)), (o._ellipsoid = t.Ellipsoid.clone(o._ellipsoid)), b.createGeometry(o)
    }
  )
})
