define([
  './defaultValue-0a909f67',
  './Matrix3-b6f074fa',
  './EllipsoidGeometry-ccc3a2e5',
  './VertexFormat-ab2e00e6',
  './Math-e97915da',
  './Transforms-dadc538f',
  './Matrix2-163b5a1d',
  './RuntimeError-06c93819',
  './combine-ca22a614',
  './ComponentDatatype-77274976',
  './WebGLConstants-a8cc3e8c',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './GeometryOffsetAttribute-04332ce7',
  './IndexDatatype-2149f06c'
], function (e, t, i, r, a, o, n, s, c, d, l, m, u, p, y) {
  'use strict'
  function f(r) {
    const a = e.defaultValue(r.radius, 1),
      o = { radii: new t.Cartesian3(a, a, a), stackPartitions: r.stackPartitions, slicePartitions: r.slicePartitions, vertexFormat: r.vertexFormat }
    ;(this._ellipsoidGeometry = new i.EllipsoidGeometry(o)), (this._workerName = 'createSphereGeometry')
  }
  ;(f.packedLength = i.EllipsoidGeometry.packedLength),
    (f.pack = function (e, t, r) {
      return i.EllipsoidGeometry.pack(e._ellipsoidGeometry, t, r)
    })
  const G = new i.EllipsoidGeometry(),
    k = { radius: void 0, radii: new t.Cartesian3(), vertexFormat: new r.VertexFormat(), stackPartitions: void 0, slicePartitions: void 0 }
  return (
    (f.unpack = function (a, o, n) {
      const s = i.EllipsoidGeometry.unpack(a, o, G)
      return (
        (k.vertexFormat = r.VertexFormat.clone(s._vertexFormat, k.vertexFormat)),
        (k.stackPartitions = s._stackPartitions),
        (k.slicePartitions = s._slicePartitions),
        e.defined(n)
          ? (t.Cartesian3.clone(s._radii, k.radii), (n._ellipsoidGeometry = new i.EllipsoidGeometry(k)), n)
          : ((k.radius = s._radii.x), new f(k))
      )
    }),
    (f.createGeometry = function (e) {
      return i.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)
    }),
    function (t, i) {
      return e.defined(i) && (t = f.unpack(t, i)), f.createGeometry(t)
    }
  )
})
