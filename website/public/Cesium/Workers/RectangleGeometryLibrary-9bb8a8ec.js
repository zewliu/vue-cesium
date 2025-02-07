define(['exports', './Matrix3-b6f074fa', './defaultValue-0a909f67', './Transforms-dadc538f', './Math-e97915da', './Matrix2-163b5a1d'], function (
  t,
  n,
  a,
  e,
  o,
  r
) {
  'use strict'
  const s = Math.cos,
    i = Math.sin,
    c = Math.sqrt,
    g = {
      computePosition: function (t, n, e, o, r, g, u) {
        const h = n.radiiSquared,
          l = t.nwCorner,
          C = t.boundingRectangle
        let d = l.latitude - t.granYCos * o + r * t.granXSin
        const S = s(d),
          M = i(d),
          w = h.z * M
        let f = l.longitude + o * t.granYSin + r * t.granXCos
        const X = S * s(f),
          Y = S * i(f),
          m = h.x * X,
          p = h.y * Y,
          x = c(m * X + p * Y + w * M)
        if (((g.x = m / x), (g.y = p / x), (g.z = w / x), e)) {
          const n = t.stNwCorner
          a.defined(n)
            ? ((d = n.latitude - t.stGranYCos * o + r * t.stGranXSin),
              (f = n.longitude + o * t.stGranYSin + r * t.stGranXCos),
              (u.x = (f - t.stWest) * t.lonScalar),
              (u.y = (d - t.stSouth) * t.latScalar))
            : ((u.x = (f - C.west) * t.lonScalar), (u.y = (d - C.south) * t.latScalar))
        }
      }
    },
    u = new r.Matrix2()
  let h = new n.Cartesian3()
  const l = new n.Cartographic()
  let C = new n.Cartesian3()
  const d = new e.GeographicProjection()
  function S(t, a, e, o, s, i, c) {
    const g = Math.cos(a),
      l = o * g,
      S = e * g,
      M = Math.sin(a),
      w = o * M,
      f = e * M
    ;(h = d.project(t, h)), (h = n.Cartesian3.subtract(h, C, h))
    const X = r.Matrix2.fromRotation(a, u)
    ;(h = r.Matrix2.multiplyByVector(X, h, h)), (h = n.Cartesian3.add(h, C, h)), (i -= 1), (c -= 1)
    const Y = (t = d.unproject(h, t)).latitude,
      m = Y + i * f,
      p = Y - l * c,
      x = Y - l * c + i * f,
      G = Math.max(Y, m, p, x),
      R = Math.min(Y, m, p, x),
      y = t.longitude,
      O = y + i * S,
      b = y + c * w,
      P = y + c * w + i * S
    return {
      north: G,
      south: R,
      east: Math.max(y, O, b, P),
      west: Math.min(y, O, b, P),
      granYCos: l,
      granYSin: w,
      granXCos: S,
      granXSin: f,
      nwCorner: t
    }
  }
  g.computeOptions = function (t, n, a, e, s, i, c) {
    let g,
      u = t.east,
      h = t.west,
      M = t.north,
      w = t.south,
      f = !1,
      X = !1
    M === o.CesiumMath.PI_OVER_TWO && (f = !0), w === -o.CesiumMath.PI_OVER_TWO && (X = !0)
    const Y = M - w
    g = h > u ? o.CesiumMath.TWO_PI - h + u : u - h
    const m = Math.ceil(g / n) + 1,
      p = Math.ceil(Y / n) + 1,
      x = g / (m - 1),
      G = Y / (p - 1),
      R = r.Rectangle.northwest(t, i),
      y = r.Rectangle.center(t, l)
    ;(0 === a && 0 === e) || (y.longitude < R.longitude && (y.longitude += o.CesiumMath.TWO_PI), (C = d.project(y, C)))
    const O = G,
      b = x,
      P = r.Rectangle.clone(t, s),
      W = { granYCos: O, granYSin: 0, granXCos: b, granXSin: 0, nwCorner: R, boundingRectangle: P, width: m, height: p, northCap: f, southCap: X }
    if (0 !== a) {
      const t = S(R, a, x, G, 0, m, p)
      ;(M = t.north),
        (w = t.south),
        (u = t.east),
        (h = t.west),
        (W.granYCos = t.granYCos),
        (W.granYSin = t.granYSin),
        (W.granXCos = t.granXCos),
        (W.granXSin = t.granXSin),
        (P.north = M),
        (P.south = w),
        (P.east = u),
        (P.west = h)
    }
    if (0 !== e) {
      a -= e
      const t = r.Rectangle.northwest(P, c),
        n = S(t, a, x, G, 0, m, p)
      ;(W.stGranYCos = n.granYCos),
        (W.stGranXCos = n.granXCos),
        (W.stGranYSin = n.granYSin),
        (W.stGranXSin = n.granXSin),
        (W.stNwCorner = t),
        (W.stWest = n.west),
        (W.stSouth = n.south)
    }
    return W
  }
  var M = g
  t.RectangleGeometryLibrary = M
})
