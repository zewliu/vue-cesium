define([
  './AttributeCompression-e18a879a',
  './Matrix3-b6f074fa',
  './Math-e97915da',
  './Matrix2-163b5a1d',
  './createTaskProcessorWorker',
  './ComponentDatatype-77274976',
  './defaultValue-0a909f67',
  './WebGLConstants-a8cc3e8c',
  './RuntimeError-06c93819'
], function (a, e, t, r, n, o, i, s, c) {
  'use strict'
  const u = 32767,
    p = new e.Cartographic(),
    l = new e.Cartesian3(),
    f = new r.Rectangle(),
    m = new e.Ellipsoid(),
    h = { min: void 0, max: void 0 }
  return n(function (n, o) {
    const i = new Uint16Array(n.positions)
    !(function (a) {
      a = new Float64Array(a)
      let t = 0
      ;(h.min = a[t++]), (h.max = a[t++]), r.Rectangle.unpack(a, t, f), (t += r.Rectangle.packedLength), e.Ellipsoid.unpack(a, t, m)
    })(n.packedBuffer)
    const s = f,
      c = m,
      d = h.min,
      C = h.max,
      g = i.length / 3,
      b = i.subarray(0, g),
      w = i.subarray(g, 2 * g),
      k = i.subarray(2 * g, 3 * g)
    a.AttributeCompression.zigZagDeltaDecode(b, w, k)
    const y = new Float64Array(i.length)
    for (let a = 0; a < g; ++a) {
      const r = b[a],
        n = w[a],
        o = k[a],
        i = t.CesiumMath.lerp(s.west, s.east, r / u),
        f = t.CesiumMath.lerp(s.south, s.north, n / u),
        m = t.CesiumMath.lerp(d, C, o / u),
        h = e.Cartographic.fromRadians(i, f, m, p),
        g = c.cartographicToCartesian(h, l)
      e.Cartesian3.pack(g, y, 3 * a)
    }
    return o.push(y.buffer), { positions: y.buffer }
  })
})
