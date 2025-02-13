define([
  'exports',
  './Transforms-dadc538f',
  './Matrix3-b6f074fa',
  './defaultValue-0a909f67',
  './Matrix2-163b5a1d',
  './AttributeCompression-e18a879a',
  './ComponentDatatype-77274976',
  './Math-e97915da'
], function (t, e, i, a, o, r, n, s) {
  'use strict'
  function c(t, e) {
    ;(this._ellipsoid = t),
      (this._cameraPosition = new i.Cartesian3()),
      (this._cameraPositionInScaledSpace = new i.Cartesian3()),
      (this._distanceToLimbInScaledSpaceSquared = 0),
      a.defined(e) && (this.cameraPosition = e)
  }
  Object.defineProperties(c.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    },
    cameraPosition: {
      get: function () {
        return this._cameraPosition
      },
      set: function (t) {
        const e = this._ellipsoid.transformPositionToScaledSpace(t, this._cameraPositionInScaledSpace),
          a = i.Cartesian3.magnitudeSquared(e) - 1
        i.Cartesian3.clone(t, this._cameraPosition), (this._cameraPositionInScaledSpace = e), (this._distanceToLimbInScaledSpaceSquared = a)
      }
    }
  })
  const d = new i.Cartesian3()
  ;(c.prototype.isPointVisible = function (t) {
    return C(this._ellipsoid.transformPositionToScaledSpace(t, d), this._cameraPositionInScaledSpace, this._distanceToLimbInScaledSpaceSquared)
  }),
    (c.prototype.isScaledSpacePointVisible = function (t) {
      return C(t, this._cameraPositionInScaledSpace, this._distanceToLimbInScaledSpaceSquared)
    })
  const u = new i.Cartesian3()
  ;(c.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid = function (t, e) {
    const i = this._ellipsoid
    let o, r
    return (
      a.defined(e) && e < 0 && i.minimumRadius > -e
        ? ((r = u),
          (r.x = this._cameraPosition.x / (i.radii.x + e)),
          (r.y = this._cameraPosition.y / (i.radii.y + e)),
          (r.z = this._cameraPosition.z / (i.radii.z + e)),
          (o = r.x * r.x + r.y * r.y + r.z * r.z - 1))
        : ((r = this._cameraPositionInScaledSpace), (o = this._distanceToLimbInScaledSpaceSquared)),
      C(t, r, o)
    )
  }),
    (c.prototype.computeHorizonCullingPoint = function (t, e, i) {
      return p(this._ellipsoid, t, e, i)
    })
  const l = i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE)
  ;(c.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid = function (t, e, i, a) {
    return p(f(this._ellipsoid, i, l), t, e, a)
  }),
    (c.prototype.computeHorizonCullingPointFromVertices = function (t, e, i, a, o) {
      return S(this._ellipsoid, t, e, i, a, o)
    }),
    (c.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid = function (t, e, i, a, o, r) {
      return S(f(this._ellipsoid, o, l), t, e, i, a, r)
    })
  const m = []
  c.prototype.computeHorizonCullingPointFromRectangle = function (t, a, r) {
    const n = o.Rectangle.subsample(t, a, 0, m),
      s = e.BoundingSphere.fromPoints(n)
    if (!(i.Cartesian3.magnitude(s.center) < 0.1 * a.minimumRadius)) return this.computeHorizonCullingPoint(s.center, n, r)
  }
  const h = new i.Cartesian3()
  function f(t, e, o) {
    if (a.defined(e) && e < 0 && t.minimumRadius > -e) {
      const a = i.Cartesian3.fromElements(t.radii.x + e, t.radii.y + e, t.radii.z + e, h)
      t = i.Ellipsoid.fromCartesian3(a, o)
    }
    return t
  }
  function p(t, e, o, r) {
    a.defined(r) || (r = new i.Cartesian3())
    const n = b(t, e)
    let s = 0
    for (let e = 0, i = o.length; e < i; ++e) {
      const i = N(t, o[e], n)
      if (i < 0) return
      s = Math.max(s, i)
    }
    return M(n, s, r)
  }
  const x = new i.Cartesian3()
  function S(t, e, o, r, n, s) {
    a.defined(s) || (s = new i.Cartesian3()), (r = a.defaultValue(r, 3)), (n = a.defaultValue(n, i.Cartesian3.ZERO))
    const c = b(t, e)
    let d = 0
    for (let e = 0, i = o.length; e < i; e += r) {
      ;(x.x = o[e] + n.x), (x.y = o[e + 1] + n.y), (x.z = o[e + 2] + n.z)
      const i = N(t, x, c)
      if (i < 0) return
      d = Math.max(d, i)
    }
    return M(c, d, s)
  }
  function C(t, e, a) {
    const o = e,
      r = a,
      n = i.Cartesian3.subtract(t, o, d),
      s = -i.Cartesian3.dot(n, o)
    return !(r < 0 ? s > 0 : s > r && (s * s) / i.Cartesian3.magnitudeSquared(n) > r)
  }
  const g = new i.Cartesian3(),
    y = new i.Cartesian3()
  function N(t, e, a) {
    const o = t.transformPositionToScaledSpace(e, g)
    let r = i.Cartesian3.magnitudeSquared(o),
      n = Math.sqrt(r)
    const s = i.Cartesian3.divideByScalar(o, n, y)
    ;(r = Math.max(1, r)), (n = Math.max(1, n))
    const c = 1 / n
    return 1 / (i.Cartesian3.dot(s, a) * c - i.Cartesian3.magnitude(i.Cartesian3.cross(s, a, s)) * (Math.sqrt(r - 1) * c))
  }
  function M(t, e, a) {
    if (!(e <= 0 || e === 1 / 0 || e != e)) return i.Cartesian3.multiplyByScalar(t, e, a)
  }
  const T = new i.Cartesian3()
  function b(t, e) {
    return i.Cartesian3.equals(e, i.Cartesian3.ZERO) ? e : (t.transformPositionToScaledSpace(e, T), i.Cartesian3.normalize(T, T))
  }
  const P = {
      getHeight: function (t, e, i) {
        return (t - i) * e + i
      }
    },
    z = new i.Cartesian3()
  P.getPosition = function (t, e, a, o, r) {
    const n = e.cartesianToCartographic(t, z),
      s = P.getHeight(n.height, a, o)
    return i.Cartesian3.fromRadians(n.longitude, n.latitude, s, e, r)
  }
  var _ = P
  var E = Object.freeze({ NONE: 0, BITS12: 1 })
  const H = new i.Cartesian3(),
    w = new i.Cartesian3(),
    A = new o.Cartesian2(),
    I = new o.Matrix4(),
    V = new o.Matrix4(),
    q = Math.pow(2, 12)
  function G(t, e, r, n, s, c, d, u, l, m) {
    let h,
      f,
      p = E.NONE
    if (a.defined(e) && a.defined(r) && a.defined(n) && a.defined(s)) {
      const t = e.minimum,
        a = e.maximum,
        c = i.Cartesian3.subtract(a, t, w),
        d = n - r
      ;(p = Math.max(i.Cartesian3.maximumComponent(c), d) < q - 1 ? E.BITS12 : E.NONE), (h = o.Matrix4.inverseTransformation(s, new o.Matrix4()))
      const u = i.Cartesian3.negate(t, H)
      o.Matrix4.multiply(o.Matrix4.fromTranslation(u, I), h, h)
      const l = H
      ;(l.x = 1 / c.x),
        (l.y = 1 / c.y),
        (l.z = 1 / c.z),
        o.Matrix4.multiply(o.Matrix4.fromScale(l, I), h, h),
        (f = o.Matrix4.clone(s)),
        o.Matrix4.setTranslation(f, i.Cartesian3.ZERO, f),
        (s = o.Matrix4.clone(s, new o.Matrix4()))
      const m = o.Matrix4.fromTranslation(t, I),
        x = o.Matrix4.fromScale(c, V),
        S = o.Matrix4.multiply(m, x, I)
      o.Matrix4.multiply(s, S, s), o.Matrix4.multiply(f, S, f)
    }
    ;(this.quantization = p),
      (this.minimumHeight = r),
      (this.maximumHeight = n),
      (this.center = i.Cartesian3.clone(t)),
      (this.toScaledENU = h),
      (this.fromScaledENU = s),
      (this.matrix = f),
      (this.hasVertexNormals = c),
      (this.hasWebMercatorT = a.defaultValue(d, !1)),
      (this.hasGeodeticSurfaceNormals = a.defaultValue(u, !1)),
      (this.exaggeration = a.defaultValue(l, 1)),
      (this.exaggerationRelativeHeight = a.defaultValue(m, 0)),
      (this.stride = 0),
      (this._offsetGeodeticSurfaceNormal = 0),
      (this._offsetVertexNormal = 0),
      this._calculateStrideAndOffsets()
  }
  G.prototype.encode = function (t, e, a, n, c, d, u, l) {
    const m = n.x,
      h = n.y
    if (this.quantization === E.BITS12) {
      ;((a = o.Matrix4.multiplyByPoint(this.toScaledENU, a, H)).x = s.CesiumMath.clamp(a.x, 0, 1)),
        (a.y = s.CesiumMath.clamp(a.y, 0, 1)),
        (a.z = s.CesiumMath.clamp(a.z, 0, 1))
      const i = this.maximumHeight - this.minimumHeight,
        n = s.CesiumMath.clamp((c - this.minimumHeight) / i, 0, 1)
      o.Cartesian2.fromElements(a.x, a.y, A)
      const d = r.AttributeCompression.compressTextureCoordinates(A)
      o.Cartesian2.fromElements(a.z, n, A)
      const l = r.AttributeCompression.compressTextureCoordinates(A)
      o.Cartesian2.fromElements(m, h, A)
      const f = r.AttributeCompression.compressTextureCoordinates(A)
      if (((t[e++] = d), (t[e++] = l), (t[e++] = f), this.hasWebMercatorT)) {
        o.Cartesian2.fromElements(u, 0, A)
        const i = r.AttributeCompression.compressTextureCoordinates(A)
        t[e++] = i
      }
    } else
      i.Cartesian3.subtract(a, this.center, H),
        (t[e++] = H.x),
        (t[e++] = H.y),
        (t[e++] = H.z),
        (t[e++] = c),
        (t[e++] = m),
        (t[e++] = h),
        this.hasWebMercatorT && (t[e++] = u)
    return (
      this.hasVertexNormals && (t[e++] = r.AttributeCompression.octPackFloat(d)),
      this.hasGeodeticSurfaceNormals && ((t[e++] = l.x), (t[e++] = l.y), (t[e++] = l.z)),
      e
    )
  }
  const O = new i.Cartesian3(),
    B = new i.Cartesian3()
  ;(G.prototype.addGeodeticSurfaceNormals = function (t, e, i) {
    if (this.hasGeodeticSurfaceNormals) return
    const a = this.stride,
      o = t.length / a
    ;(this.hasGeodeticSurfaceNormals = !0), this._calculateStrideAndOffsets()
    const r = this.stride
    for (let n = 0; n < o; n++) {
      for (let i = 0; i < a; i++) {
        const o = n * a + i
        e[n * r + i] = t[o]
      }
      const o = this.decodePosition(e, n, O),
        s = i.geodeticSurfaceNormal(o, B),
        c = n * r + this._offsetGeodeticSurfaceNormal
      ;(e[c] = s.x), (e[c + 1] = s.y), (e[c + 2] = s.z)
    }
  }),
    (G.prototype.removeGeodeticSurfaceNormals = function (t, e) {
      if (!this.hasGeodeticSurfaceNormals) return
      const i = this.stride,
        a = t.length / i
      ;(this.hasGeodeticSurfaceNormals = !1), this._calculateStrideAndOffsets()
      const o = this.stride
      for (let r = 0; r < a; r++)
        for (let a = 0; a < o; a++) {
          const n = r * i + a
          e[r * o + a] = t[n]
        }
    }),
    (G.prototype.decodePosition = function (t, e, n) {
      if ((a.defined(n) || (n = new i.Cartesian3()), (e *= this.stride), this.quantization === E.BITS12)) {
        const i = r.AttributeCompression.decompressTextureCoordinates(t[e], A)
        ;(n.x = i.x), (n.y = i.y)
        const a = r.AttributeCompression.decompressTextureCoordinates(t[e + 1], A)
        return (n.z = a.x), o.Matrix4.multiplyByPoint(this.fromScaledENU, n, n)
      }
      return (n.x = t[e]), (n.y = t[e + 1]), (n.z = t[e + 2]), i.Cartesian3.add(n, this.center, n)
    }),
    (G.prototype.getExaggeratedPosition = function (t, e, i) {
      i = this.decodePosition(t, e, i)
      const a = this.exaggeration,
        o = this.exaggerationRelativeHeight
      if (1 !== a && this.hasGeodeticSurfaceNormals) {
        const r = this.decodeGeodeticSurfaceNormal(t, e, B),
          n = this.decodeHeight(t, e),
          s = _.getHeight(n, a, o) - n
        ;(i.x += r.x * s), (i.y += r.y * s), (i.z += r.z * s)
      }
      return i
    }),
    (G.prototype.decodeTextureCoordinates = function (t, e, i) {
      return (
        a.defined(i) || (i = new o.Cartesian2()),
        (e *= this.stride),
        this.quantization === E.BITS12
          ? r.AttributeCompression.decompressTextureCoordinates(t[e + 2], i)
          : o.Cartesian2.fromElements(t[e + 4], t[e + 5], i)
      )
    }),
    (G.prototype.decodeHeight = function (t, e) {
      if (((e *= this.stride), this.quantization === E.BITS12)) {
        return r.AttributeCompression.decompressTextureCoordinates(t[e + 1], A).y * (this.maximumHeight - this.minimumHeight) + this.minimumHeight
      }
      return t[e + 3]
    }),
    (G.prototype.decodeWebMercatorT = function (t, e) {
      return (e *= this.stride), this.quantization === E.BITS12 ? r.AttributeCompression.decompressTextureCoordinates(t[e + 3], A).x : t[e + 6]
    }),
    (G.prototype.getOctEncodedNormal = function (t, e, i) {
      const a = t[(e = e * this.stride + this._offsetVertexNormal)] / 256,
        r = Math.floor(a),
        n = 256 * (a - r)
      return o.Cartesian2.fromElements(r, n, i)
    }),
    (G.prototype.decodeGeodeticSurfaceNormal = function (t, e, i) {
      return (e = e * this.stride + this._offsetGeodeticSurfaceNormal), (i.x = t[e]), (i.y = t[e + 1]), (i.z = t[e + 2]), i
    }),
    (G.prototype._calculateStrideAndOffsets = function () {
      let t = 0
      if (this.quantization === E.BITS12) t += 3
      else t += 6
      this.hasWebMercatorT && (t += 1),
        this.hasVertexNormals && ((this._offsetVertexNormal = t), (t += 1)),
        this.hasGeodeticSurfaceNormals && ((this._offsetGeodeticSurfaceNormal = t), (t += 3)),
        (this.stride = t)
    })
  const R = { position3DAndHeight: 0, textureCoordAndEncodedNormals: 1, geodeticSurfaceNormal: 2 },
    U = { compressed0: 0, compressed1: 1, geodeticSurfaceNormal: 2 }
  ;(G.prototype.getAttributes = function (t) {
    const e = n.ComponentDatatype.FLOAT,
      i = n.ComponentDatatype.getSizeInBytes(e),
      a = this.stride * i
    let o = 0
    const r = []
    function s(n, s) {
      r.push({ index: n, vertexBuffer: t, componentDatatype: e, componentsPerAttribute: s, offsetInBytes: o, strideInBytes: a }), (o += s * i)
    }
    if (this.quantization === E.NONE) {
      s(R.position3DAndHeight, 4)
      let t = 2
      ;(t += this.hasWebMercatorT ? 1 : 0),
        (t += this.hasVertexNormals ? 1 : 0),
        s(R.textureCoordAndEncodedNormals, t),
        this.hasGeodeticSurfaceNormals && s(R.geodeticSurfaceNormal, 3)
    } else {
      const t = this.hasWebMercatorT || this.hasVertexNormals,
        e = this.hasWebMercatorT && this.hasVertexNormals
      s(U.compressed0, t ? 4 : 3), e && s(U.compressed1, 1), this.hasGeodeticSurfaceNormals && s(U.geodeticSurfaceNormal, 3)
    }
    return r
  }),
    (G.prototype.getAttributeLocations = function () {
      return this.quantization === E.NONE ? R : U
    }),
    (G.clone = function (t, e) {
      if (a.defined(t))
        return (
          a.defined(e) || (e = new G()),
          (e.quantization = t.quantization),
          (e.minimumHeight = t.minimumHeight),
          (e.maximumHeight = t.maximumHeight),
          (e.center = i.Cartesian3.clone(t.center)),
          (e.toScaledENU = o.Matrix4.clone(t.toScaledENU)),
          (e.fromScaledENU = o.Matrix4.clone(t.fromScaledENU)),
          (e.matrix = o.Matrix4.clone(t.matrix)),
          (e.hasVertexNormals = t.hasVertexNormals),
          (e.hasWebMercatorT = t.hasWebMercatorT),
          (e.hasGeodeticSurfaceNormals = t.hasGeodeticSurfaceNormals),
          (e.exaggeration = t.exaggeration),
          (e.exaggerationRelativeHeight = t.exaggerationRelativeHeight),
          e._calculateStrideAndOffsets(),
          e
        )
    }),
    (t.EllipsoidalOccluder = c),
    (t.TerrainEncoding = G)
})
