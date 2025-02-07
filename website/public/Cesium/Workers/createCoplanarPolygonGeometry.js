define([
  './arrayRemoveDuplicates-e9673044',
  './BoundingRectangle-826280cd',
  './Transforms-dadc538f',
  './Matrix2-163b5a1d',
  './Matrix3-b6f074fa',
  './ComponentDatatype-77274976',
  './CoplanarPolygonGeometryLibrary-8933e3c1',
  './defaultValue-0a909f67',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './GeometryInstance-9b27c40d',
  './GeometryPipeline-b7404acc',
  './IndexDatatype-2149f06c',
  './Math-e97915da',
  './PolygonGeometryLibrary-a917cdd7',
  './PolygonPipeline-1ccef6d7',
  './VertexFormat-ab2e00e6',
  './combine-ca22a614',
  './RuntimeError-06c93819',
  './WebGLConstants-a8cc3e8c',
  './OrientedBoundingBox-83fb8c71',
  './EllipsoidTangentPlane-f7077c2e',
  './AxisAlignedBoundingBox-e5bb9f92',
  './IntersectionTests-1307e0a8',
  './Plane-1c5a21a3',
  './AttributeCompression-e18a879a',
  './EncodedCartesian3-de837603',
  './ArcType-ce2e50ab',
  './EllipsoidRhumbLine-7f84cca0'
], function (e, t, n, o, a, r, i, s, l, c, y, p, u, d, m, g, b, C, f, h, x, P, A, L, w, G, F, v, E) {
  'use strict'
  const _ = new a.Cartesian3(),
    T = new t.BoundingRectangle(),
    k = new o.Cartesian2(),
    D = new o.Cartesian2(),
    V = new a.Cartesian3(),
    R = new a.Cartesian3(),
    H = new a.Cartesian3(),
    I = new a.Cartesian3(),
    M = new a.Cartesian3(),
    B = new a.Cartesian3(),
    O = new n.Quaternion(),
    z = new a.Matrix3(),
    S = new a.Matrix3(),
    N = new a.Cartesian3()
  function Q(e, t, i, y, p, m, b, C, f) {
    const h = e.positions
    let x = g.PolygonPipeline.triangulate(e.positions2D, e.holes)
    x.length < 3 && (x = [0, 1, 2])
    const P = u.IndexDatatype.createTypedArray(h.length, x.length)
    P.set(x)
    let A = z
    if (0 !== y) {
      let e = n.Quaternion.fromAxisAngle(b, y, O)
      if (((A = a.Matrix3.fromQuaternion(e, A)), t.tangent || t.bitangent)) {
        e = n.Quaternion.fromAxisAngle(b, -y, O)
        const o = a.Matrix3.fromQuaternion(e, S)
        ;(C = a.Cartesian3.normalize(a.Matrix3.multiplyByVector(o, C, C), C)),
          t.bitangent && (f = a.Cartesian3.normalize(a.Cartesian3.cross(b, C, f), f))
      }
    } else A = a.Matrix3.clone(a.Matrix3.IDENTITY, A)
    const L = D
    t.st && ((L.x = i.x), (L.y = i.y))
    const w = h.length,
      G = 3 * w,
      F = new Float64Array(G),
      v = t.normal ? new Float32Array(G) : void 0,
      E = t.tangent ? new Float32Array(G) : void 0,
      T = t.bitangent ? new Float32Array(G) : void 0,
      V = t.st ? new Float32Array(2 * w) : void 0
    let R = 0,
      H = 0,
      I = 0,
      M = 0,
      B = 0
    for (let e = 0; e < w; e++) {
      const n = h[e]
      if (((F[R++] = n.x), (F[R++] = n.y), (F[R++] = n.z), t.st))
        if (s.defined(p) && p.positions.length === w) (V[B++] = p.positions[e].x), (V[B++] = p.positions[e].y)
        else {
          const e = m(a.Matrix3.multiplyByVector(A, n, _), k)
          o.Cartesian2.subtract(e, L, e)
          const t = d.CesiumMath.clamp(e.x / i.width, 0, 1),
            r = d.CesiumMath.clamp(e.y / i.height, 0, 1)
          ;(V[B++] = t), (V[B++] = r)
        }
      t.normal && ((v[H++] = b.x), (v[H++] = b.y), (v[H++] = b.z)),
        t.tangent && ((E[M++] = C.x), (E[M++] = C.y), (E[M++] = C.z)),
        t.bitangent && ((T[I++] = f.x), (T[I++] = f.y), (T[I++] = f.z))
    }
    const N = new c.GeometryAttributes()
    return (
      t.position && (N.position = new l.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: F })),
      t.normal && (N.normal = new l.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: v })),
      t.tangent && (N.tangent = new l.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: E })),
      t.bitangent && (N.bitangent = new l.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: T })),
      t.st && (N.st = new l.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: V })),
      new l.Geometry({ attributes: N, indices: P, primitiveType: l.PrimitiveType.TRIANGLES })
    )
  }
  function j(e) {
    const t = (e = s.defaultValue(e, s.defaultValue.EMPTY_OBJECT)).polygonHierarchy,
      n = e.textureCoordinates,
      r = s.defaultValue(e.vertexFormat, b.VertexFormat.DEFAULT)
    ;(this._vertexFormat = b.VertexFormat.clone(r)),
      (this._polygonHierarchy = t),
      (this._stRotation = s.defaultValue(e.stRotation, 0)),
      (this._ellipsoid = a.Ellipsoid.clone(s.defaultValue(e.ellipsoid, a.Ellipsoid.WGS84))),
      (this._workerName = 'createCoplanarPolygonGeometry'),
      (this._textureCoordinates = n),
      (this.packedLength =
        m.PolygonGeometryLibrary.computeHierarchyPackedLength(t, a.Cartesian3) +
        b.VertexFormat.packedLength +
        a.Ellipsoid.packedLength +
        (s.defined(n) ? m.PolygonGeometryLibrary.computeHierarchyPackedLength(n, o.Cartesian2) : 1) +
        2)
  }
  ;(j.fromPositions = function (e) {
    return new j({
      polygonHierarchy: { positions: (e = s.defaultValue(e, s.defaultValue.EMPTY_OBJECT)).positions },
      vertexFormat: e.vertexFormat,
      stRotation: e.stRotation,
      ellipsoid: e.ellipsoid,
      textureCoordinates: e.textureCoordinates
    })
  }),
    (j.pack = function (e, t, n) {
      return (
        (n = s.defaultValue(n, 0)),
        (n = m.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy, t, n, a.Cartesian3)),
        a.Ellipsoid.pack(e._ellipsoid, t, n),
        (n += a.Ellipsoid.packedLength),
        b.VertexFormat.pack(e._vertexFormat, t, n),
        (n += b.VertexFormat.packedLength),
        (t[n++] = e._stRotation),
        s.defined(e._textureCoordinates)
          ? (n = m.PolygonGeometryLibrary.packPolygonHierarchy(e._textureCoordinates, t, n, o.Cartesian2))
          : (t[n++] = -1),
        (t[n++] = e.packedLength),
        t
      )
    })
  const U = a.Ellipsoid.clone(a.Ellipsoid.UNIT_SPHERE),
    Y = new b.VertexFormat(),
    q = { polygonHierarchy: {} }
  return (
    (j.unpack = function (e, t, n) {
      t = s.defaultValue(t, 0)
      const r = m.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t, a.Cartesian3)
      ;(t = r.startingIndex), delete r.startingIndex
      const i = a.Ellipsoid.unpack(e, t, U)
      t += a.Ellipsoid.packedLength
      const l = b.VertexFormat.unpack(e, t, Y)
      t += b.VertexFormat.packedLength
      const c = e[t++],
        y = -1 === e[t] ? void 0 : m.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t, o.Cartesian2)
      s.defined(y) ? ((t = y.startingIndex), delete y.startingIndex) : t++
      const p = e[t++]
      return (
        s.defined(n) || (n = new j(q)),
        (n._polygonHierarchy = r),
        (n._ellipsoid = a.Ellipsoid.clone(i, n._ellipsoid)),
        (n._vertexFormat = b.VertexFormat.clone(l, n._vertexFormat)),
        (n._stRotation = c),
        (n._textureCoordinates = y),
        (n.packedLength = p),
        n
      )
    }),
    (j.createGeometry = function (t) {
      const o = t._vertexFormat,
        r = t._polygonHierarchy,
        c = t._stRotation,
        g = t._textureCoordinates,
        b = s.defined(g)
      let C = r.positions
      if (((C = e.arrayRemoveDuplicates(C, a.Cartesian3.equalsEpsilon, !0)), C.length < 3)) return
      let f = V,
        h = R,
        x = H,
        P = M
      const A = B
      if (!i.CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(C, I, P, A)) return
      if (
        ((f = a.Cartesian3.cross(P, A, f)),
        (f = a.Cartesian3.normalize(f, f)),
        !a.Cartesian3.equalsEpsilon(I, a.Cartesian3.ZERO, d.CesiumMath.EPSILON6))
      ) {
        const e = t._ellipsoid.geodeticSurfaceNormal(I, N)
        a.Cartesian3.dot(f, e) < 0 && ((f = a.Cartesian3.negate(f, f)), (P = a.Cartesian3.negate(P, P)))
      }
      const L = i.CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(I, P, A),
        w = i.CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(I, P, A)
      o.tangent && (h = a.Cartesian3.clone(P, h)), o.bitangent && (x = a.Cartesian3.clone(A, x))
      const G = m.PolygonGeometryLibrary.polygonsFromHierarchy(r, b, L, !1),
        F = G.hierarchy,
        v = G.polygons,
        E = b
          ? m.PolygonGeometryLibrary.polygonsFromHierarchy(
              g,
              !0,
              function (e) {
                return e
              },
              !1
            ).polygons
          : void 0
      if (0 === F.length) return
      C = F[0].outerRing
      const _ = n.BoundingSphere.fromPoints(C),
        k = m.PolygonGeometryLibrary.computeBoundingRectangle(f, w, C, c, T),
        D = []
      for (let e = 0; e < v.length; e++) {
        const t = new y.GeometryInstance({ geometry: Q(v[e], o, k, c, b ? E[e] : void 0, w, f, h, x) })
        D.push(t)
      }
      const O = p.GeometryPipeline.combineInstances(D)[0]
      ;(O.attributes.position.values = new Float64Array(O.attributes.position.values)),
        (O.indices = u.IndexDatatype.createTypedArray(O.attributes.position.values.length / 3, O.indices))
      const z = O.attributes
      return o.position || delete z.position, new l.Geometry({ attributes: z, indices: O.indices, primitiveType: O.primitiveType, boundingSphere: _ })
    }),
    function (e, t) {
      return s.defined(t) && (e = j.unpack(e, t)), j.createGeometry(e)
    }
  )
})
