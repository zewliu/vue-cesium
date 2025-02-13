define([
  './defaultValue-0a909f67',
  './Matrix3-b6f074fa',
  './arrayRemoveDuplicates-e9673044',
  './BoundingRectangle-826280cd',
  './Transforms-dadc538f',
  './Matrix2-163b5a1d',
  './ComponentDatatype-77274976',
  './PolylineVolumeGeometryLibrary-64eaf307',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './GeometryPipeline-b7404acc',
  './IndexDatatype-2149f06c',
  './Math-e97915da',
  './PolygonPipeline-1ccef6d7',
  './VertexFormat-ab2e00e6',
  './combine-ca22a614',
  './RuntimeError-06c93819',
  './WebGLConstants-a8cc3e8c',
  './EllipsoidTangentPlane-f7077c2e',
  './AxisAlignedBoundingBox-e5bb9f92',
  './IntersectionTests-1307e0a8',
  './Plane-1c5a21a3',
  './PolylinePipeline-2b44aa86',
  './EllipsoidGeodesic-b00a0416',
  './EllipsoidRhumbLine-7f84cca0',
  './AttributeCompression-e18a879a',
  './EncodedCartesian3-de837603'
], function (e, t, n, o, i, a, r, l, s, p, c, d, u, m, y, g, h, f, b, P, E, _, k, v, V, x, L) {
  'use strict'
  function C(n) {
    const o = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).polylinePositions,
      i = n.shapePositions
    ;(this._positions = o),
      (this._shape = i),
      (this._ellipsoid = t.Ellipsoid.clone(e.defaultValue(n.ellipsoid, t.Ellipsoid.WGS84))),
      (this._cornerType = e.defaultValue(n.cornerType, l.CornerType.ROUNDED)),
      (this._vertexFormat = y.VertexFormat.clone(e.defaultValue(n.vertexFormat, y.VertexFormat.DEFAULT))),
      (this._granularity = e.defaultValue(n.granularity, u.CesiumMath.RADIANS_PER_DEGREE)),
      (this._workerName = 'createPolylineVolumeGeometry')
    let r = 1 + o.length * t.Cartesian3.packedLength
    ;(r += 1 + i.length * a.Cartesian2.packedLength), (this.packedLength = r + t.Ellipsoid.packedLength + y.VertexFormat.packedLength + 2)
  }
  C.pack = function (n, o, i) {
    let r
    i = e.defaultValue(i, 0)
    const l = n._positions
    let s = l.length
    for (o[i++] = s, r = 0; r < s; ++r, i += t.Cartesian3.packedLength) t.Cartesian3.pack(l[r], o, i)
    const p = n._shape
    for (s = p.length, o[i++] = s, r = 0; r < s; ++r, i += a.Cartesian2.packedLength) a.Cartesian2.pack(p[r], o, i)
    return (
      t.Ellipsoid.pack(n._ellipsoid, o, i),
      (i += t.Ellipsoid.packedLength),
      y.VertexFormat.pack(n._vertexFormat, o, i),
      (i += y.VertexFormat.packedLength),
      (o[i++] = n._cornerType),
      (o[i] = n._granularity),
      o
    )
  }
  const F = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    A = new y.VertexFormat(),
    T = { polylinePositions: void 0, shapePositions: void 0, ellipsoid: F, vertexFormat: A, cornerType: void 0, granularity: void 0 }
  C.unpack = function (n, o, i) {
    let r
    o = e.defaultValue(o, 0)
    let l = n[o++]
    const s = new Array(l)
    for (r = 0; r < l; ++r, o += t.Cartesian3.packedLength) s[r] = t.Cartesian3.unpack(n, o)
    l = n[o++]
    const p = new Array(l)
    for (r = 0; r < l; ++r, o += a.Cartesian2.packedLength) p[r] = a.Cartesian2.unpack(n, o)
    const c = t.Ellipsoid.unpack(n, o, F)
    o += t.Ellipsoid.packedLength
    const d = y.VertexFormat.unpack(n, o, A)
    o += y.VertexFormat.packedLength
    const u = n[o++],
      m = n[o]
    return e.defined(i)
      ? ((i._positions = s),
        (i._shape = p),
        (i._ellipsoid = t.Ellipsoid.clone(c, i._ellipsoid)),
        (i._vertexFormat = y.VertexFormat.clone(d, i._vertexFormat)),
        (i._cornerType = u),
        (i._granularity = m),
        i)
      : ((T.polylinePositions = s), (T.shapePositions = p), (T.cornerType = u), (T.granularity = m), new C(T))
  }
  const G = new o.BoundingRectangle()
  return (
    (C.createGeometry = function (e) {
      const a = e._positions,
        u = n.arrayRemoveDuplicates(a, t.Cartesian3.equalsEpsilon)
      let y = e._shape
      if (((y = l.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y)), u.length < 2 || y.length < 3)) return
      m.PolygonPipeline.computeWindingOrder2D(y) === m.WindingOrder.CLOCKWISE && y.reverse()
      const g = o.BoundingRectangle.fromPoints(y, G)
      return (function (e, t, n, o) {
        const a = new p.GeometryAttributes()
        o.position && (a.position = new s.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: e }))
        const u = t.length,
          y = e.length / 3,
          g = (y - 2 * u) / (2 * u),
          h = m.PolygonPipeline.triangulate(t),
          f = (g - 1) * u * 6 + 2 * h.length,
          b = d.IndexDatatype.createTypedArray(y, f)
        let P, E, _, k, v, V
        const x = 2 * u
        let L = 0
        for (P = 0; P < g - 1; P++) {
          for (E = 0; E < u - 1; E++)
            (_ = 2 * E + P * u * 2),
              (V = _ + x),
              (k = _ + 1),
              (v = k + x),
              (b[L++] = k),
              (b[L++] = _),
              (b[L++] = v),
              (b[L++] = v),
              (b[L++] = _),
              (b[L++] = V)
          ;(_ = 2 * u - 2 + P * u * 2),
            (k = _ + 1),
            (v = k + x),
            (V = _ + x),
            (b[L++] = k),
            (b[L++] = _),
            (b[L++] = v),
            (b[L++] = v),
            (b[L++] = _),
            (b[L++] = V)
        }
        if (o.st || o.tangent || o.bitangent) {
          const e = new Float32Array(2 * y),
            o = 1 / (g - 1),
            i = 1 / n.height,
            l = n.height / 2
          let p,
            c,
            d = 0
          for (P = 0; P < g; P++) {
            for (p = P * o, c = i * (t[0].y + l), e[d++] = p, e[d++] = c, E = 1; E < u; E++)
              (c = i * (t[E].y + l)), (e[d++] = p), (e[d++] = c), (e[d++] = p), (e[d++] = c)
            ;(c = i * (t[0].y + l)), (e[d++] = p), (e[d++] = c)
          }
          for (E = 0; E < u; E++) (p = 0), (c = i * (t[E].y + l)), (e[d++] = p), (e[d++] = c)
          for (E = 0; E < u; E++) (p = (g - 1) * o), (c = i * (t[E].y + l)), (e[d++] = p), (e[d++] = c)
          a.st = new s.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: new Float32Array(e) })
        }
        const C = y - 2 * u
        for (P = 0; P < h.length; P += 3) {
          const e = h[P] + C,
            t = h[P + 1] + C,
            n = h[P + 2] + C
          ;(b[L++] = e), (b[L++] = t), (b[L++] = n), (b[L++] = n + u), (b[L++] = t + u), (b[L++] = e + u)
        }
        let F = new s.Geometry({
          attributes: a,
          indices: b,
          boundingSphere: i.BoundingSphere.fromVertices(e),
          primitiveType: s.PrimitiveType.TRIANGLES
        })
        if ((o.normal && (F = c.GeometryPipeline.computeNormal(F)), o.tangent || o.bitangent)) {
          try {
            F = c.GeometryPipeline.computeTangentAndBitangent(F)
          } catch (e) {
            l.oneTimeWarning('polyline-volume-tangent-bitangent', 'Unable to compute tangents and bitangents for polyline volume geometry')
          }
          o.tangent || (F.attributes.tangent = void 0), o.bitangent || (F.attributes.bitangent = void 0), o.st || (F.attributes.st = void 0)
        }
        return F
      })(l.PolylineVolumeGeometryLibrary.computePositions(u, y, g, e, !0), y, g, e._vertexFormat)
    }),
    function (n, o) {
      return e.defined(o) && (n = C.unpack(n, o)), (n._ellipsoid = t.Ellipsoid.clone(n._ellipsoid)), C.createGeometry(n)
    }
  )
})
