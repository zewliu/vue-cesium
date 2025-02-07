define([
  './Matrix3-b6f074fa',
  './defaultValue-0a909f67',
  './EllipseGeometry-e21d5877',
  './Math-e97915da',
  './Transforms-dadc538f',
  './Matrix2-163b5a1d',
  './RuntimeError-06c93819',
  './combine-ca22a614',
  './ComponentDatatype-77274976',
  './WebGLConstants-a8cc3e8c',
  './EllipseGeometryLibrary-4fec0674',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './GeometryInstance-9b27c40d',
  './GeometryOffsetAttribute-04332ce7',
  './GeometryPipeline-b7404acc',
  './AttributeCompression-e18a879a',
  './EncodedCartesian3-de837603',
  './IndexDatatype-2149f06c',
  './IntersectionTests-1307e0a8',
  './Plane-1c5a21a3',
  './VertexFormat-ab2e00e6'
], function (e, t, a, r, n, i, o, c, s, l, d, m, f, b, p, u, y, G, E, C, x, A) {
  'use strict'
  return function (r, n) {
    return (
      t.defined(n) && (r = a.EllipseGeometry.unpack(r, n)),
      (r._center = e.Cartesian3.clone(r._center)),
      (r._ellipsoid = e.Ellipsoid.clone(r._ellipsoid)),
      a.EllipseGeometry.createGeometry(r)
    )
  }
})
