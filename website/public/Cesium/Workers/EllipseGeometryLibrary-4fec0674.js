define(['exports', './Matrix3-b6f074fa', './Math-e97915da', './Transforms-dadc538f'], function (a, t, e, n) {
  'use strict'
  const i = {},
    r = new t.Cartesian3(),
    s = new t.Cartesian3(),
    o = new n.Quaternion(),
    l = new t.Matrix3()
  function c(a, e, i, c, C, y, u, m, h, x) {
    const M = a + e
    t.Cartesian3.multiplyByScalar(c, Math.cos(M), r), t.Cartesian3.multiplyByScalar(i, Math.sin(M), s), t.Cartesian3.add(r, s, r)
    let f = Math.cos(a)
    f *= f
    let z = Math.sin(a)
    z *= z
    const d = y / Math.sqrt(u * f + C * z) / m
    return (
      n.Quaternion.fromAxisAngle(r, d, o),
      t.Matrix3.fromQuaternion(o, l),
      t.Matrix3.multiplyByVector(l, h, x),
      t.Cartesian3.normalize(x, x),
      t.Cartesian3.multiplyByScalar(x, m, x),
      x
    )
  }
  const C = new t.Cartesian3(),
    y = new t.Cartesian3(),
    u = new t.Cartesian3(),
    m = new t.Cartesian3()
  i.raisePositionsToHeight = function (a, e, n) {
    const i = e.ellipsoid,
      r = e.height,
      s = e.extrudedHeight,
      o = n ? (a.length / 3) * 2 : a.length / 3,
      l = new Float64Array(3 * o),
      c = a.length,
      h = n ? c : 0
    for (let e = 0; e < c; e += 3) {
      const o = e + 1,
        c = e + 2,
        x = t.Cartesian3.fromArray(a, e, C)
      i.scaleToGeodeticSurface(x, x)
      const M = t.Cartesian3.clone(x, y),
        f = i.geodeticSurfaceNormal(x, m),
        z = t.Cartesian3.multiplyByScalar(f, r, u)
      t.Cartesian3.add(x, z, x),
        n && (t.Cartesian3.multiplyByScalar(f, s, z), t.Cartesian3.add(M, z, M), (l[e + h] = M.x), (l[o + h] = M.y), (l[c + h] = M.z)),
        (l[e] = x.x),
        (l[o] = x.y),
        (l[c] = x.z)
    }
    return l
  }
  const h = new t.Cartesian3(),
    x = new t.Cartesian3(),
    M = new t.Cartesian3()
  i.computeEllipsePositions = function (a, n, i) {
    const r = a.semiMinorAxis,
      s = a.semiMajorAxis,
      o = a.rotation,
      l = a.center,
      m = 8 * a.granularity,
      f = r * r,
      z = s * s,
      d = s * r,
      _ = t.Cartesian3.magnitude(l),
      O = t.Cartesian3.normalize(l, h)
    let p = t.Cartesian3.cross(t.Cartesian3.UNIT_Z, l, x)
    p = t.Cartesian3.normalize(p, p)
    const w = t.Cartesian3.cross(O, p, M)
    let P = 1 + Math.ceil(e.CesiumMath.PI_OVER_TWO / m)
    const T = e.CesiumMath.PI_OVER_TWO / (P - 1)
    let I = e.CesiumMath.PI_OVER_TWO - P * T
    I < 0 && (P -= Math.ceil(Math.abs(I) / T))
    const g = n ? new Array(3 * (P * (P + 2) * 2)) : void 0
    let E = 0,
      V = C,
      A = y
    const R = 4 * P * 3
    let W = R - 1,
      S = 0
    const B = i ? new Array(R) : void 0
    let b, v, Q, G, H
    for (
      I = e.CesiumMath.PI_OVER_TWO,
        V = c(I, o, w, p, f, d, z, _, O, V),
        n && ((g[E++] = V.x), (g[E++] = V.y), (g[E++] = V.z)),
        i && ((B[W--] = V.z), (B[W--] = V.y), (B[W--] = V.x)),
        I = e.CesiumMath.PI_OVER_TWO - T,
        b = 1;
      b < P + 1;
      ++b
    ) {
      if (((V = c(I, o, w, p, f, d, z, _, O, V)), (A = c(Math.PI - I, o, w, p, f, d, z, _, O, A)), n)) {
        for (g[E++] = V.x, g[E++] = V.y, g[E++] = V.z, Q = 2 * b + 2, v = 1; v < Q - 1; ++v)
          (G = v / (Q - 1)), (H = t.Cartesian3.lerp(V, A, G, u)), (g[E++] = H.x), (g[E++] = H.y), (g[E++] = H.z)
        ;(g[E++] = A.x), (g[E++] = A.y), (g[E++] = A.z)
      }
      i && ((B[W--] = V.z), (B[W--] = V.y), (B[W--] = V.x), (B[S++] = A.x), (B[S++] = A.y), (B[S++] = A.z)),
        (I = e.CesiumMath.PI_OVER_TWO - (b + 1) * T)
    }
    for (b = P; b > 1; --b) {
      if (
        ((I = e.CesiumMath.PI_OVER_TWO - (b - 1) * T), (V = c(-I, o, w, p, f, d, z, _, O, V)), (A = c(I + Math.PI, o, w, p, f, d, z, _, O, A)), n)
      ) {
        for (g[E++] = V.x, g[E++] = V.y, g[E++] = V.z, Q = 2 * (b - 1) + 2, v = 1; v < Q - 1; ++v)
          (G = v / (Q - 1)), (H = t.Cartesian3.lerp(V, A, G, u)), (g[E++] = H.x), (g[E++] = H.y), (g[E++] = H.z)
        ;(g[E++] = A.x), (g[E++] = A.y), (g[E++] = A.z)
      }
      i && ((B[W--] = V.z), (B[W--] = V.y), (B[W--] = V.x), (B[S++] = A.x), (B[S++] = A.y), (B[S++] = A.z))
    }
    ;(I = e.CesiumMath.PI_OVER_TWO), (V = c(-I, o, w, p, f, d, z, _, O, V))
    const N = {}
    return (
      n && ((g[E++] = V.x), (g[E++] = V.y), (g[E++] = V.z), (N.positions = g), (N.numPts = P)),
      i && ((B[W--] = V.z), (B[W--] = V.y), (B[W--] = V.x), (N.outerPositions = B)),
      N
    )
  }
  var f = i
  a.EllipseGeometryLibrary = f
})
