define([
  './AttributeCompression-e18a879a',
  './Matrix3-b6f074fa',
  './combine-ca22a614',
  './IndexDatatype-2149f06c',
  './Math-e97915da',
  './Matrix2-163b5a1d',
  './createTaskProcessorWorker',
  './ComponentDatatype-77274976',
  './defaultValue-0a909f67',
  './WebGLConstants-a8cc3e8c',
  './RuntimeError-06c93819'
], function (t, e, a, s, n, r, i, o, c, l, d) {
  'use strict'
  const f = 32767,
    u = Math.cos(n.CesiumMath.toRadians(150)),
    h = new e.Cartographic(),
    C = new e.Cartesian3()
  const p = new e.Cartographic(),
    m = new e.Cartographic()
  function b(t) {
    const e = 8 * t,
      a = 3 * e,
      n = 4 * e
    ;(this.startEllipsoidNormals = new Float32Array(a)),
      (this.endEllipsoidNormals = new Float32Array(a)),
      (this.startPositionAndHeights = new Float32Array(n)),
      (this.startFaceNormalAndVertexCornerIds = new Float32Array(n)),
      (this.endPositionAndHeights = new Float32Array(n)),
      (this.endFaceNormalAndHalfWidths = new Float32Array(n)),
      (this.vertexBatchIds = new Uint16Array(e)),
      (this.indices = s.IndexDatatype.createTypedArray(e, 36 * t)),
      (this.vec3Offset = 0),
      (this.vec4Offset = 0),
      (this.batchIdOffset = 0),
      (this.indexOffset = 0),
      (this.volumeStartIndex = 0)
  }
  const A = new e.Cartesian3(),
    w = new e.Cartesian3()
  function g(t, a, s, n, r) {
    const i = e.Cartesian3.subtract(s, a, w)
    let o = e.Cartesian3.subtract(a, t, A)
    return (
      e.Cartesian3.normalize(i, i),
      e.Cartesian3.normalize(o, o),
      e.Cartesian3.dot(i, o) < u && (o = e.Cartesian3.multiplyByScalar(o, -1, A)),
      e.Cartesian3.add(i, o, r),
      e.Cartesian3.equals(r, e.Cartesian3.ZERO) && (r = e.Cartesian3.subtract(t, a)),
      e.Cartesian3.cross(r, n, r),
      e.Cartesian3.cross(n, r, r),
      e.Cartesian3.normalize(r, r),
      r
    )
  }
  const y = [0, 2, 6, 0, 6, 4, 0, 1, 3, 0, 3, 2, 0, 4, 5, 0, 5, 1, 5, 3, 1, 5, 7, 3, 7, 5, 4, 7, 4, 6, 7, 6, 2, 7, 2, 3],
    N = y.length,
    k = new e.Cartesian3(),
    x = new e.Cartesian3(),
    I = new e.Cartesian3(),
    E = new e.Cartesian3(),
    F = new e.Cartesian3()
  b.prototype.addVolume = function (t, a, s, n, r, i, o, c, l, d) {
    let f = e.Cartesian3.add(a, l, k)
    const u = d.geodeticSurfaceNormal(f, x)
    f = e.Cartesian3.add(s, l, k)
    const h = d.geodeticSurfaceNormal(f, E),
      C = g(t, a, s, u, I),
      p = g(n, s, a, h, F),
      m = this.startEllipsoidNormals,
      b = this.endEllipsoidNormals,
      A = this.startPositionAndHeights,
      w = this.startFaceNormalAndVertexCornerIds,
      H = this.endPositionAndHeights,
      O = this.endFaceNormalAndHalfWidths,
      P = this.vertexBatchIds
    let v,
      D = this.batchIdOffset,
      M = this.vec3Offset,
      S = this.vec4Offset
    for (v = 0; v < 8; v++)
      e.Cartesian3.pack(u, m, M),
        e.Cartesian3.pack(h, b, M),
        e.Cartesian3.pack(a, A, S),
        (A[S + 3] = r),
        e.Cartesian3.pack(s, H, S),
        (H[S + 3] = i),
        e.Cartesian3.pack(C, w, S),
        (w[S + 3] = v),
        e.Cartesian3.pack(p, O, S),
        (O[S + 3] = o),
        (P[D++] = c),
        (M += 3),
        (S += 4)
    ;(this.batchIdOffset = D), (this.vec3Offset = M), (this.vec4Offset = S)
    const R = this.indices,
      U = this.volumeStartIndex,
      B = this.indexOffset
    for (v = 0; v < N; v++) R[B + v] = y[v] + U
    ;(this.volumeStartIndex += 8), (this.indexOffset += N)
  }
  const H = new r.Rectangle(),
    O = new e.Ellipsoid(),
    P = new e.Cartesian3(),
    v = new e.Cartesian3(),
    D = new e.Cartesian3(),
    M = new e.Cartesian3(),
    S = new e.Cartesian3()
  return i(function (i, o) {
    const c = new Uint16Array(i.positions),
      l = new Uint16Array(i.widths),
      d = new Uint32Array(i.counts),
      u = new Uint16Array(i.batchIds),
      A = H,
      w = O,
      g = P,
      y = new Float64Array(i.packedBuffer)
    let N = 0
    const k = y[N++],
      x = y[N++]
    let I
    r.Rectangle.unpack(y, N, A),
      (N += r.Rectangle.packedLength),
      e.Ellipsoid.unpack(y, N, w),
      (N += e.Ellipsoid.packedLength),
      e.Cartesian3.unpack(y, N, g)
    let E = c.length / 3
    const F = c.subarray(0, E),
      R = c.subarray(E, 2 * E),
      U = c.subarray(2 * E, 3 * E)
    t.AttributeCompression.zigZagDeltaDecode(F, R, U),
      (function (t, a, s, n) {
        const r = n.length,
          i = t.length,
          o = new Uint8Array(i),
          c = p,
          l = m
        let d = 0
        for (let s = 0; s < r; s++) {
          const r = n[s]
          let i = r
          for (let s = 1; s < r; s++) {
            const n = d + s,
              r = n - 1
            ;(l.longitude = t[n]), (l.latitude = a[n]), (c.longitude = t[r]), (c.latitude = a[r]), e.Cartographic.equals(l, c) && (i--, (o[r] = 1))
          }
          ;(n[s] = i), (d += r)
        }
        let f = 0
        for (let e = 0; e < i; e++) 1 !== o[e] && ((t[f] = t[e]), (a[f] = a[e]), (s[f] = s[e]), f++)
      })(F, R, U, d)
    const B = d.length
    let V = 0
    for (I = 0; I < B; I++) {
      V += d[I] - 1
    }
    const T = new b(V),
      W = (function (t, a, s, r, i, o, c) {
        const l = t.length,
          d = new Float64Array(3 * l)
        for (let u = 0; u < l; ++u) {
          const l = t[u],
            p = a[u],
            m = s[u],
            b = n.CesiumMath.lerp(r.west, r.east, l / f),
            A = n.CesiumMath.lerp(r.south, r.north, p / f),
            w = n.CesiumMath.lerp(i, o, m / f),
            g = e.Cartographic.fromRadians(b, A, w, h),
            y = c.cartographicToCartesian(g, C)
          e.Cartesian3.pack(y, d, 3 * u)
        }
        return d
      })(F, R, U, A, k, x, w)
    E = F.length
    const z = new Float32Array(3 * E)
    for (I = 0; I < E; ++I) (z[3 * I] = W[3 * I] - g.x), (z[3 * I + 1] = W[3 * I + 1] - g.y), (z[3 * I + 2] = W[3 * I + 2] - g.z)
    let q = 0,
      L = 0
    for (I = 0; I < B; I++) {
      const t = d[I] - 1,
        a = 0.5 * l[I],
        s = u[I],
        r = q
      for (let i = 0; i < t; i++) {
        const o = e.Cartesian3.unpack(z, q, D),
          c = e.Cartesian3.unpack(z, q + 3, M)
        let l = U[L],
          d = U[L + 1]
        ;(l = n.CesiumMath.lerp(k, x, l / f)), (d = n.CesiumMath.lerp(k, x, d / f)), L++
        let u = v,
          h = S
        if (0 === i) {
          const a = r + 3 * t,
            s = e.Cartesian3.unpack(z, a, v)
          if (e.Cartesian3.equals(s, o)) e.Cartesian3.unpack(z, a - 3, u)
          else {
            const t = e.Cartesian3.subtract(o, c, v)
            u = e.Cartesian3.add(t, o, v)
          }
        } else e.Cartesian3.unpack(z, q - 3, u)
        if (i === t - 1) {
          const t = e.Cartesian3.unpack(z, r, S)
          if (e.Cartesian3.equals(t, c)) e.Cartesian3.unpack(z, r + 3, h)
          else {
            const t = e.Cartesian3.subtract(c, o, S)
            h = e.Cartesian3.add(t, c, S)
          }
        } else e.Cartesian3.unpack(z, q + 6, h)
        T.addVolume(u, o, c, h, l, d, a, s, g, w), (q += 3)
      }
      ;(q += 3), L++
    }
    const _ = T.indices
    o.push(T.startEllipsoidNormals.buffer),
      o.push(T.endEllipsoidNormals.buffer),
      o.push(T.startPositionAndHeights.buffer),
      o.push(T.startFaceNormalAndVertexCornerIds.buffer),
      o.push(T.endPositionAndHeights.buffer),
      o.push(T.endFaceNormalAndHalfWidths.buffer),
      o.push(T.vertexBatchIds.buffer),
      o.push(_.buffer)
    let G = {
      indexDatatype: 2 === _.BYTES_PER_ELEMENT ? s.IndexDatatype.UNSIGNED_SHORT : s.IndexDatatype.UNSIGNED_INT,
      startEllipsoidNormals: T.startEllipsoidNormals.buffer,
      endEllipsoidNormals: T.endEllipsoidNormals.buffer,
      startPositionAndHeights: T.startPositionAndHeights.buffer,
      startFaceNormalAndVertexCornerIds: T.startFaceNormalAndVertexCornerIds.buffer,
      endPositionAndHeights: T.endPositionAndHeights.buffer,
      endFaceNormalAndHalfWidths: T.endFaceNormalAndHalfWidths.buffer,
      vertexBatchIds: T.vertexBatchIds.buffer,
      indices: _.buffer
    }
    if (i.keepDecodedPositions) {
      const t = (function (t) {
        const e = t.length,
          a = new Uint32Array(e + 1)
        let s = 0
        for (let n = 0; n < e; ++n) (a[n] = s), (s += t[n])
        return (a[e] = s), a
      })(d)
      o.push(W.buffer, t.buffer), (G = a.combine(G, { decodedPositions: W.buffer, decodedPositionOffsets: t.buffer }))
    }
    return G
  })
})
