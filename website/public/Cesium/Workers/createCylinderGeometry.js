define([
  './CylinderGeometry-244c9dda',
  './defaultValue-0a909f67',
  './Transforms-dadc538f',
  './Matrix3-b6f074fa',
  './Math-e97915da',
  './Matrix2-163b5a1d',
  './RuntimeError-06c93819',
  './combine-ca22a614',
  './ComponentDatatype-77274976',
  './WebGLConstants-a8cc3e8c',
  './CylinderGeometryLibrary-20be4f8b',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './GeometryOffsetAttribute-04332ce7',
  './IndexDatatype-2149f06c',
  './VertexFormat-ab2e00e6'
], function (e, t, r, a, n, i, o, d, c, f, y, m, b, u, G, s) {
  'use strict'
  return function (r, a) {
    return t.defined(a) && (r = e.CylinderGeometry.unpack(r, a)), e.CylinderGeometry.createGeometry(r)
  }
})
