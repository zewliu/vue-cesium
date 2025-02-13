define([
  './BoxGeometry-f5437dce',
  './defaultValue-0a909f67',
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
  './GeometryOffsetAttribute-04332ce7',
  './VertexFormat-ab2e00e6'
], function (e, t, r, a, o, n, c, f, i, m, u, d, b, s) {
  'use strict'
  return function (r, a) {
    return t.defined(a) && (r = e.BoxGeometry.unpack(r, a)), e.BoxGeometry.createGeometry(r)
  }
})
