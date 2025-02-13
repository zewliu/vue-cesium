define(['exports', './Math-e97915da'], function (t, n) {
  'use strict'
  const o = {
    computePositions: function (t, o, e, r, s) {
      const i = 0.5 * t,
        a = -i,
        c = r + r,
        u = new Float64Array(3 * (s ? 2 * c : c))
      let f,
        h = 0,
        y = 0
      const M = s ? 3 * c : 0,
        d = s ? 3 * (c + r) : 3 * r
      for (f = 0; f < r; f++) {
        const t = (f / r) * n.CesiumMath.TWO_PI,
          c = Math.cos(t),
          l = Math.sin(t),
          m = c * e,
          p = l * e,
          C = c * o,
          P = l * o
        ;(u[y + M] = m),
          (u[y + M + 1] = p),
          (u[y + M + 2] = a),
          (u[y + d] = C),
          (u[y + d + 1] = P),
          (u[y + d + 2] = i),
          (y += 3),
          s && ((u[h++] = m), (u[h++] = p), (u[h++] = a), (u[h++] = C), (u[h++] = P), (u[h++] = i))
      }
      return u
    }
  }
  var e = o
  t.CylinderGeometryLibrary = e
})
