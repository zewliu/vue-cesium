define([
  './Matrix3-b6f074fa',
  './defaultValue-0a909f67',
  './EllipseOutlineGeometry-356bd088',
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
  './GeometryOffsetAttribute-04332ce7',
  './IndexDatatype-2149f06c'
], function (e, t, r, i, a, n, l, o, c, s, f, u, d, m, p) {
  'use strict'
  return function (i, a) {
    return (
      t.defined(a) && (i = r.EllipseOutlineGeometry.unpack(i, a)),
      (i._center = e.Cartesian3.clone(i._center)),
      (i._ellipsoid = e.Ellipsoid.clone(i._ellipsoid)),
      r.EllipseOutlineGeometry.createGeometry(i)
    )
  }
})
