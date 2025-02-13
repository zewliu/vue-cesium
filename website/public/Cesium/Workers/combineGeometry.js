define([
  './PrimitivePipeline-c5ce0d90',
  './createTaskProcessorWorker',
  './Transforms-dadc538f',
  './Matrix3-b6f074fa',
  './defaultValue-0a909f67',
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
], function (e, t, i, r, a, n, o, c, s, m, b, u, P, d, f, p, l, y, G, C) {
  'use strict'
  return t(function (t, i) {
    const r = e.PrimitivePipeline.unpackCombineGeometryParameters(t),
      a = e.PrimitivePipeline.combineGeometry(r)
    return e.PrimitivePipeline.packCombineGeometryResults(a, i)
  })
})
