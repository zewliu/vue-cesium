define([
  './defaultValue-0a909f67',
  './PrimitivePipeline-c5ce0d90',
  './createTaskProcessorWorker',
  './Transforms-dadc538f',
  './Matrix3-b6f074fa',
  './Math-e97915da',
  './Matrix2-163b5a1d',
  './RuntimeError-06c93819',
  './combine-ca22a614',
  './ComponentDatatype-77274976',
  './WebGLConstants-a8cc3e8c',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './GeometryPipeline-b7404acc',
  './AttributeCompression-e18a879a',
  './EncodedCartesian3-de837603',
  './IndexDatatype-2149f06c',
  './IntersectionTests-1307e0a8',
  './Plane-1c5a21a3',
  './WebMercatorProjection-8e29b101'
], function (e, t, r, n, o, a, i, c, s, f, u, d, m, l, b, p, y, P, k, C) {
  'use strict'
  const G = {}
  function W(t) {
    let r = G[t]
    return (
      e.defined(r) ||
        ('object' == typeof exports
          ? (G[r] = r = require(`Workers/${t}`))
          : require([`Workers/${t}`], function (e) {
              ;(r = e), (G[r] = e)
            })),
      r
    )
  }
  return r(function (r, n) {
    const o = r.subTasks,
      a = o.length,
      i = new Array(a)
    for (let t = 0; t < a; t++) {
      const r = o[t],
        n = r.geometry,
        a = r.moduleName
      if (e.defined(a)) {
        const e = W(a)
        i[t] = e(n, r.offset)
      } else i[t] = n
    }
    return Promise.all(i).then(function (e) {
      return t.PrimitivePipeline.packCreateGeometryResults(e, n)
    })
  })
})
