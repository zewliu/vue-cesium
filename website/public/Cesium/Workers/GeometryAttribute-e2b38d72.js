define([
  'exports',
  './Matrix2-163b5a1d',
  './Matrix3-b6f074fa',
  './defaultValue-0a909f67',
  './WebGLConstants-a8cc3e8c',
  './Transforms-dadc538f'
], function (t, e, n, a, r, i) {
  'use strict'
  var o = Object.freeze({ NONE: 0, TRIANGLES: 1, LINES: 2, POLYLINES: 3 })
  const s = {
    POINTS: r.WebGLConstants.POINTS,
    LINES: r.WebGLConstants.LINES,
    LINE_LOOP: r.WebGLConstants.LINE_LOOP,
    LINE_STRIP: r.WebGLConstants.LINE_STRIP,
    TRIANGLES: r.WebGLConstants.TRIANGLES,
    TRIANGLE_STRIP: r.WebGLConstants.TRIANGLE_STRIP,
    TRIANGLE_FAN: r.WebGLConstants.TRIANGLE_FAN,
    isLines: function (t) {
      return t === s.LINES || t === s.LINE_LOOP || t === s.LINE_STRIP
    },
    isTriangles: function (t) {
      return t === s.TRIANGLES || t === s.TRIANGLE_STRIP || t === s.TRIANGLE_FAN
    },
    validate: function (t) {
      return (
        t === s.POINTS ||
        t === s.LINES ||
        t === s.LINE_LOOP ||
        t === s.LINE_STRIP ||
        t === s.TRIANGLES ||
        t === s.TRIANGLE_STRIP ||
        t === s.TRIANGLE_FAN
      )
    }
  }
  var u = Object.freeze(s)
  function I(t) {
    ;(t = a.defaultValue(t, a.defaultValue.EMPTY_OBJECT)),
      (this.attributes = t.attributes),
      (this.indices = t.indices),
      (this.primitiveType = a.defaultValue(t.primitiveType, u.TRIANGLES)),
      (this.boundingSphere = t.boundingSphere),
      (this.geometryType = a.defaultValue(t.geometryType, o.NONE)),
      (this.boundingSphereCV = t.boundingSphereCV),
      (this.offsetAttribute = t.offsetAttribute)
  }
  I.computeNumberOfVertices = function (t) {
    let e = -1
    for (const n in t.attributes)
      if (t.attributes.hasOwnProperty(n) && a.defined(t.attributes[n]) && a.defined(t.attributes[n].values)) {
        const a = t.attributes[n]
        e = a.values.length / a.componentsPerAttribute
      }
    return e
  }
  const N = new n.Cartographic(),
    c = new n.Cartesian3(),
    T = new e.Matrix4(),
    l = [new n.Cartographic(), new n.Cartographic(), new n.Cartographic()],
    L = [new e.Cartesian2(), new e.Cartesian2(), new e.Cartesian2()],
    f = [new e.Cartesian2(), new e.Cartesian2(), new e.Cartesian2()],
    E = new n.Cartesian3(),
    p = new i.Quaternion(),
    m = new e.Matrix4(),
    y = new e.Matrix2()
  ;(I._textureCoordinateRotationPoints = function (t, a, r, o) {
    let s
    const u = e.Rectangle.center(o, N),
      I = n.Cartographic.toCartesian(u, r, c),
      b = i.Transforms.eastNorthUpToFixedFrame(I, r, T),
      C = e.Matrix4.inverse(b, T),
      h = L,
      d = l
    ;(d[0].longitude = o.west),
      (d[0].latitude = o.south),
      (d[1].longitude = o.west),
      (d[1].latitude = o.north),
      (d[2].longitude = o.east),
      (d[2].latitude = o.south)
    let A = E
    for (s = 0; s < 3; s++) n.Cartographic.toCartesian(d[s], r, A), (A = e.Matrix4.multiplyByPointAsVector(C, A, A)), (h[s].x = A.x), (h[s].y = A.y)
    const x = i.Quaternion.fromAxisAngle(n.Cartesian3.UNIT_Z, -a, p),
      S = n.Matrix3.fromQuaternion(x, m),
      P = t.length
    let G = Number.POSITIVE_INFINITY,
      R = Number.POSITIVE_INFINITY,
      _ = Number.NEGATIVE_INFINITY,
      O = Number.NEGATIVE_INFINITY
    for (s = 0; s < P; s++)
      (A = e.Matrix4.multiplyByPointAsVector(C, t[s], A)),
        (A = n.Matrix3.multiplyByVector(S, A, A)),
        (G = Math.min(G, A.x)),
        (R = Math.min(R, A.y)),
        (_ = Math.max(_, A.x)),
        (O = Math.max(O, A.y))
    const g = e.Matrix2.fromRotation(a, y),
      w = f
    ;(w[0].x = G), (w[0].y = R), (w[1].x = G), (w[1].y = O), (w[2].x = _), (w[2].y = R)
    const V = h[0],
      M = h[2].x - V.x,
      v = h[1].y - V.y
    for (s = 0; s < 3; s++) {
      const t = w[s]
      e.Matrix2.multiplyByVector(g, t, t), (t.x = (t.x - V.x) / M), (t.y = (t.y - V.y) / v)
    }
    const F = w[0],
      W = w[1],
      Y = w[2],
      B = new Array(6)
    return e.Cartesian2.pack(F, B), e.Cartesian2.pack(W, B, 2), e.Cartesian2.pack(Y, B, 4), B
  }),
    (t.Geometry = I),
    (t.GeometryAttribute = function (t) {
      ;(t = a.defaultValue(t, a.defaultValue.EMPTY_OBJECT)),
        (this.componentDatatype = t.componentDatatype),
        (this.componentsPerAttribute = t.componentsPerAttribute),
        (this.normalize = a.defaultValue(t.normalize, !1)),
        (this.values = t.values)
    }),
    (t.GeometryType = o),
    (t.PrimitiveType = u)
})
