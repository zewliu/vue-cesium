define([
  './defaultValue-0a909f67',
  './EllipsoidOutlineGeometry-87fcdae3',
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
  './IndexDatatype-2149f06c'
], function (e, t, r, a, i, n, o, f, u, c, d, l, m, s) {
  'use strict'
  return function (r, a) {
    return e.defined(r.buffer) && (r = t.EllipsoidOutlineGeometry.unpack(r, a)), t.EllipsoidOutlineGeometry.createGeometry(r)
  }
})
