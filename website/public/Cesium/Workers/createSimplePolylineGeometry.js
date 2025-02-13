define([
  './defaultValue-0a909f67',
  './Matrix3-b6f074fa',
  './ArcType-ce2e50ab',
  './Transforms-dadc538f',
  './Color-0a64769f',
  './ComponentDatatype-77274976',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './IndexDatatype-2149f06c',
  './Math-e97915da',
  './PolylinePipeline-2b44aa86',
  './Matrix2-163b5a1d',
  './RuntimeError-06c93819',
  './combine-ca22a614',
  './WebGLConstants-a8cc3e8c',
  './EllipsoidGeodesic-b00a0416',
  './EllipsoidRhumbLine-7f84cca0',
  './IntersectionTests-1307e0a8',
  './Plane-1c5a21a3'
], function (e, o, t, l, r, n, a, i, s, c, p, d, f, y, u, h, C, T, g) {
  'use strict'
  function m(e, o, t, l, n, a, i) {
    const s = p.PolylinePipeline.numberOfPoints(e, o, n)
    let c
    const d = t.red,
      f = t.green,
      y = t.blue,
      u = t.alpha,
      h = l.red,
      C = l.green,
      T = l.blue,
      g = l.alpha
    if (r.Color.equals(t, l)) {
      for (c = 0; c < s; c++)
        (a[i++] = r.Color.floatToByte(d)), (a[i++] = r.Color.floatToByte(f)), (a[i++] = r.Color.floatToByte(y)), (a[i++] = r.Color.floatToByte(u))
      return i
    }
    const m = (h - d) / s,
      P = (C - f) / s,
      _ = (T - y) / s,
      b = (g - u) / s
    let B = i
    for (c = 0; c < s; c++)
      (a[B++] = r.Color.floatToByte(d + c * m)),
        (a[B++] = r.Color.floatToByte(f + c * P)),
        (a[B++] = r.Color.floatToByte(y + c * _)),
        (a[B++] = r.Color.floatToByte(u + c * b))
    return B
  }
  function P(l) {
    const n = (l = e.defaultValue(l, e.defaultValue.EMPTY_OBJECT)).positions,
      a = l.colors,
      i = e.defaultValue(l.colorsPerVertex, !1)
    ;(this._positions = n),
      (this._colors = a),
      (this._colorsPerVertex = i),
      (this._arcType = e.defaultValue(l.arcType, t.ArcType.GEODESIC)),
      (this._granularity = e.defaultValue(l.granularity, c.CesiumMath.RADIANS_PER_DEGREE)),
      (this._ellipsoid = e.defaultValue(l.ellipsoid, o.Ellipsoid.WGS84)),
      (this._workerName = 'createSimplePolylineGeometry')
    let s = 1 + n.length * o.Cartesian3.packedLength
    ;(s += e.defined(a) ? 1 + a.length * r.Color.packedLength : 1), (this.packedLength = s + o.Ellipsoid.packedLength + 3)
  }
  ;(P.pack = function (t, l, n) {
    let a
    n = e.defaultValue(n, 0)
    const i = t._positions
    let s = i.length
    for (l[n++] = s, a = 0; a < s; ++a, n += o.Cartesian3.packedLength) o.Cartesian3.pack(i[a], l, n)
    const c = t._colors
    for (s = e.defined(c) ? c.length : 0, l[n++] = s, a = 0; a < s; ++a, n += r.Color.packedLength) r.Color.pack(c[a], l, n)
    return (
      o.Ellipsoid.pack(t._ellipsoid, l, n),
      (n += o.Ellipsoid.packedLength),
      (l[n++] = t._colorsPerVertex ? 1 : 0),
      (l[n++] = t._arcType),
      (l[n] = t._granularity),
      l
    )
  }),
    (P.unpack = function (t, l, n) {
      let a
      l = e.defaultValue(l, 0)
      let i = t[l++]
      const s = new Array(i)
      for (a = 0; a < i; ++a, l += o.Cartesian3.packedLength) s[a] = o.Cartesian3.unpack(t, l)
      i = t[l++]
      const c = i > 0 ? new Array(i) : void 0
      for (a = 0; a < i; ++a, l += r.Color.packedLength) c[a] = r.Color.unpack(t, l)
      const p = o.Ellipsoid.unpack(t, l)
      l += o.Ellipsoid.packedLength
      const d = 1 === t[l++],
        f = t[l++],
        y = t[l]
      return e.defined(n)
        ? ((n._positions = s), (n._colors = c), (n._ellipsoid = p), (n._colorsPerVertex = d), (n._arcType = f), (n._granularity = y), n)
        : new P({ positions: s, colors: c, ellipsoid: p, colorsPerVertex: d, arcType: f, granularity: y })
    })
  const _ = new Array(2),
    b = new Array(2),
    B = { positions: _, height: b, ellipsoid: void 0, minDistance: void 0, granularity: void 0 }
  return (
    (P.createGeometry = function (d) {
      const f = d._positions,
        y = d._colors,
        u = d._colorsPerVertex,
        h = d._arcType,
        C = d._granularity,
        T = d._ellipsoid,
        g = c.CesiumMath.chordLength(C, T.maximumRadius),
        P = e.defined(y) && !u
      let A
      const E = f.length
      let k,
        G,
        D,
        L,
        w = 0
      if (h === t.ArcType.GEODESIC || h === t.ArcType.RHUMB) {
        let o, l, n
        h === t.ArcType.GEODESIC
          ? ((o = c.CesiumMath.chordLength(C, T.maximumRadius)), (l = p.PolylinePipeline.numberOfPoints), (n = p.PolylinePipeline.generateArc))
          : ((o = C), (l = p.PolylinePipeline.numberOfPointsRhumbLine), (n = p.PolylinePipeline.generateRhumbArc))
        const a = p.PolylinePipeline.extractHeights(f, T),
          i = B
        if ((h === t.ArcType.GEODESIC ? (i.minDistance = g) : (i.granularity = C), (i.ellipsoid = T), P)) {
          let t = 0
          for (A = 0; A < E - 1; A++) t += l(f[A], f[A + 1], o) + 1
          ;(k = new Float64Array(3 * t)), (D = new Uint8Array(4 * t)), (i.positions = _), (i.height = b)
          let s = 0
          for (A = 0; A < E - 1; ++A) {
            ;(_[0] = f[A]), (_[1] = f[A + 1]), (b[0] = a[A]), (b[1] = a[A + 1])
            const o = n(i)
            if (e.defined(y)) {
              const e = o.length / 3
              L = y[A]
              for (let o = 0; o < e; ++o)
                (D[s++] = r.Color.floatToByte(L.red)),
                  (D[s++] = r.Color.floatToByte(L.green)),
                  (D[s++] = r.Color.floatToByte(L.blue)),
                  (D[s++] = r.Color.floatToByte(L.alpha))
            }
            k.set(o, w), (w += o.length)
          }
        } else if (((i.positions = f), (i.height = a), (k = new Float64Array(n(i))), e.defined(y))) {
          for (D = new Uint8Array((k.length / 3) * 4), A = 0; A < E - 1; ++A) {
            w = m(f[A], f[A + 1], y[A], y[A + 1], g, D, w)
          }
          const e = y[E - 1]
          ;(D[w++] = r.Color.floatToByte(e.red)),
            (D[w++] = r.Color.floatToByte(e.green)),
            (D[w++] = r.Color.floatToByte(e.blue)),
            (D[w++] = r.Color.floatToByte(e.alpha))
        }
      } else {
        ;(G = P ? 2 * E - 2 : E), (k = new Float64Array(3 * G)), (D = e.defined(y) ? new Uint8Array(4 * G) : void 0)
        let t = 0,
          l = 0
        for (A = 0; A < E; ++A) {
          const n = f[A]
          if (
            (P &&
              A > 0 &&
              (o.Cartesian3.pack(n, k, t),
              (t += 3),
              (L = y[A - 1]),
              (D[l++] = r.Color.floatToByte(L.red)),
              (D[l++] = r.Color.floatToByte(L.green)),
              (D[l++] = r.Color.floatToByte(L.blue)),
              (D[l++] = r.Color.floatToByte(L.alpha))),
            P && A === E - 1)
          )
            break
          o.Cartesian3.pack(n, k, t),
            (t += 3),
            e.defined(y) &&
              ((L = y[A]),
              (D[l++] = r.Color.floatToByte(L.red)),
              (D[l++] = r.Color.floatToByte(L.green)),
              (D[l++] = r.Color.floatToByte(L.blue)),
              (D[l++] = r.Color.floatToByte(L.alpha)))
        }
      }
      const V = new i.GeometryAttributes()
      ;(V.position = new a.GeometryAttribute({ componentDatatype: n.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: k })),
        e.defined(y) &&
          (V.color = new a.GeometryAttribute({
            componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 4,
            values: D,
            normalize: !0
          })),
        (G = k.length / 3)
      const x = 2 * (G - 1),
        S = s.IndexDatatype.createTypedArray(G, x)
      let I = 0
      for (A = 0; A < G - 1; ++A) (S[I++] = A), (S[I++] = A + 1)
      return new a.Geometry({ attributes: V, indices: S, primitiveType: a.PrimitiveType.LINES, boundingSphere: l.BoundingSphere.fromPoints(f) })
    }),
    function (t, l) {
      return e.defined(l) && (t = P.unpack(t, l)), (t._ellipsoid = o.Ellipsoid.clone(t._ellipsoid)), P.createGeometry(t)
    }
  )
})
