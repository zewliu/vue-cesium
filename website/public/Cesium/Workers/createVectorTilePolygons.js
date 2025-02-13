define([
  './AttributeCompression-e18a879a',
  './Matrix3-b6f074fa',
  './Color-0a64769f',
  './defaultValue-0a909f67',
  './IndexDatatype-2149f06c',
  './Math-e97915da',
  './OrientedBoundingBox-83fb8c71',
  './Matrix2-163b5a1d',
  './createTaskProcessorWorker',
  './ComponentDatatype-77274976',
  './WebGLConstants-a8cc3e8c',
  './Transforms-dadc538f',
  './combine-ca22a614',
  './RuntimeError-06c93819',
  './EllipsoidTangentPlane-f7077c2e',
  './AxisAlignedBoundingBox-e5bb9f92',
  './IntersectionTests-1307e0a8',
  './Plane-1c5a21a3'
], function (e, t, n, a, r, o, i, s, c, f, d, l, u, h, g, p, b, m) {
  'use strict'
  const y = new t.Cartesian3(),
    C = new t.Ellipsoid(),
    I = new s.Rectangle(),
    x = { min: void 0, max: void 0, indexBytesPerElement: void 0 }
  function w(e, t, a) {
    const r = t.length,
      o =
        2 +
        r * i.OrientedBoundingBox.packedLength +
        1 +
        (function (e) {
          const t = e.length
          let a = 0
          for (let r = 0; r < t; ++r) a += n.Color.packedLength + 3 + e[r].batchIds.length
          return a
        })(a),
      s = new Float64Array(o)
    let c = 0
    ;(s[c++] = e), (s[c++] = r)
    for (let e = 0; e < r; ++e) i.OrientedBoundingBox.pack(t[e], s, c), (c += i.OrientedBoundingBox.packedLength)
    const f = a.length
    s[c++] = f
    for (let e = 0; e < f; ++e) {
      const t = a[e]
      n.Color.pack(t.color, s, c), (c += n.Color.packedLength), (s[c++] = t.offset), (s[c++] = t.count)
      const r = t.batchIds,
        o = r.length
      s[c++] = o
      for (let e = 0; e < o; ++e) s[c++] = r[e]
    }
    return s
  }
  const A = new t.Cartesian3(),
    E = new t.Cartesian3(),
    N = new t.Cartesian3(),
    T = new t.Cartesian3(),
    B = new t.Cartesian3(),
    k = new t.Cartographic(),
    L = new s.Rectangle()
  return c(function (c, f) {
    let d
    !(function (e) {
      const n = new Float64Array(e)
      let a = 0
      ;(x.indexBytesPerElement = n[a++]),
        (x.min = n[a++]),
        (x.max = n[a++]),
        t.Cartesian3.unpack(n, a, y),
        (a += t.Cartesian3.packedLength),
        t.Ellipsoid.unpack(n, a, C),
        (a += t.Ellipsoid.packedLength),
        s.Rectangle.unpack(n, a, I)
    })(c.packedBuffer),
      (d = 2 === x.indexBytesPerElement ? new Uint16Array(c.indices) : new Uint32Array(c.indices))
    const l = new Uint16Array(c.positions),
      u = new Uint32Array(c.counts),
      h = new Uint32Array(c.indexCounts),
      g = new Uint32Array(c.batchIds),
      p = new Uint32Array(c.batchTableColors),
      b = new Array(u.length),
      m = y,
      O = C
    let U = I
    const P = x.min,
      F = x.max
    let M,
      S,
      D,
      R = c.minimumHeights,
      _ = c.maximumHeights
    a.defined(R) && a.defined(_) && ((R = new Float32Array(R)), (_ = new Float32Array(_)))
    const G = l.length / 2,
      V = l.subarray(0, G),
      Y = l.subarray(G, 2 * G)
    e.AttributeCompression.zigZagDeltaDecode(V, Y)
    const v = new Float64Array(3 * G)
    for (M = 0; M < G; ++M) {
      const e = V[M],
        n = Y[M],
        a = o.CesiumMath.lerp(U.west, U.east, e / 32767),
        r = o.CesiumMath.lerp(U.south, U.north, n / 32767),
        i = t.Cartographic.fromRadians(a, r, 0, k),
        s = O.cartographicToCartesian(i, A)
      t.Cartesian3.pack(s, v, 3 * M)
    }
    const H = u.length,
      W = new Array(H),
      z = new Array(H)
    let Z = 0,
      j = 0
    for (M = 0; M < H; ++M) (W[M] = Z), (z[M] = j), (Z += u[M]), (j += h[M])
    const q = new Float32Array(3 * G * 2),
      J = new Uint16Array(2 * G),
      K = new Uint32Array(z.length),
      Q = new Uint32Array(h.length)
    let X = []
    const $ = {}
    for (M = 0; M < H; ++M)
      (D = p[M]),
        a.defined($[D])
          ? (($[D].positionLength += u[M]), ($[D].indexLength += h[M]), $[D].batchIds.push(M))
          : ($[D] = { positionLength: u[M], indexLength: h[M], offset: 0, indexOffset: 0, batchIds: [M] })
    let ee,
      te = 0,
      ne = 0
    for (D in $)
      if ($.hasOwnProperty(D)) {
        ;(ee = $[D]), (ee.offset = te), (ee.indexOffset = ne)
        const e = 2 * ee.positionLength,
          t = 2 * ee.indexLength + 6 * ee.positionLength
        ;(te += e), (ne += t), (ee.indexLength = t)
      }
    const ae = []
    for (D in $)
      $.hasOwnProperty(D) &&
        ((ee = $[D]), ae.push({ color: n.Color.fromRgba(parseInt(D)), offset: ee.indexOffset, count: ee.indexLength, batchIds: ee.batchIds }))
    for (M = 0; M < H; ++M) {
      ;(D = p[M]), (ee = $[D])
      const e = ee.offset
      let n = 3 * e,
        r = e
      const o = W[M],
        s = u[M],
        c = g[M]
      let f = P,
        l = F
      a.defined(R) && a.defined(_) && ((f = R[M]), (l = _[M]))
      let y = Number.POSITIVE_INFINITY,
        C = Number.NEGATIVE_INFINITY,
        I = Number.POSITIVE_INFINITY,
        x = Number.NEGATIVE_INFINITY
      for (S = 0; S < s; ++S) {
        const e = t.Cartesian3.unpack(v, 3 * o + 3 * S, A)
        O.scaleToGeodeticSurface(e, e)
        const a = O.cartesianToCartographic(e, k),
          i = a.latitude,
          s = a.longitude
        ;(y = Math.min(i, y)), (C = Math.max(i, C)), (I = Math.min(s, I)), (x = Math.max(s, x))
        const d = O.geodeticSurfaceNormal(e, E)
        let u = t.Cartesian3.multiplyByScalar(d, f, N)
        const h = t.Cartesian3.add(e, u, T)
        u = t.Cartesian3.multiplyByScalar(d, l, u)
        const g = t.Cartesian3.add(e, u, B)
        t.Cartesian3.subtract(g, m, g),
          t.Cartesian3.subtract(h, m, h),
          t.Cartesian3.pack(g, q, n),
          t.Cartesian3.pack(h, q, n + 3),
          (J[r] = c),
          (J[r + 1] = c),
          (n += 6),
          (r += 2)
      }
      ;(U = L), (U.west = I), (U.east = x), (U.south = y), (U.north = C), (b[M] = i.OrientedBoundingBox.fromRectangle(U, P, F, O))
      let w = ee.indexOffset
      const G = z[M],
        V = h[M]
      for (K[M] = w, S = 0; S < V; S += 3) {
        const t = d[G + S] - o,
          n = d[G + S + 1] - o,
          a = d[G + S + 2] - o
        ;(X[w++] = 2 * t + e),
          (X[w++] = 2 * n + e),
          (X[w++] = 2 * a + e),
          (X[w++] = 2 * a + 1 + e),
          (X[w++] = 2 * n + 1 + e),
          (X[w++] = 2 * t + 1 + e)
      }
      for (S = 0; S < s; ++S) {
        const t = S,
          n = (S + 1) % s
        ;(X[w++] = 2 * t + 1 + e),
          (X[w++] = 2 * n + e),
          (X[w++] = 2 * t + e),
          (X[w++] = 2 * t + 1 + e),
          (X[w++] = 2 * n + 1 + e),
          (X[w++] = 2 * n + e)
      }
      ;(ee.offset += 2 * s), (ee.indexOffset = w), (Q[M] = w - K[M])
    }
    X = r.IndexDatatype.createTypedArray(q.length / 3, X)
    const re = ae.length
    for (let e = 0; e < re; ++e) {
      const t = ae[e].batchIds
      let n = 0
      const a = t.length
      for (let e = 0; e < a; ++e) n += Q[t[e]]
      ae[e].count = n
    }
    const oe = w(2 === X.BYTES_PER_ELEMENT ? r.IndexDatatype.UNSIGNED_SHORT : r.IndexDatatype.UNSIGNED_INT, b, ae)
    return (
      f.push(q.buffer, X.buffer, K.buffer, Q.buffer, J.buffer, oe.buffer),
      { positions: q.buffer, indices: X.buffer, indexOffsets: K.buffer, indexCounts: Q.buffer, batchIds: J.buffer, packedBuffer: oe.buffer }
    )
  })
})
