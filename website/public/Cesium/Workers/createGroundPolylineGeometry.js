define([
  './Transforms-dadc538f',
  './Matrix2-163b5a1d',
  './Matrix3-b6f074fa',
  './defaultValue-0a909f67',
  './Math-e97915da',
  './ArcType-ce2e50ab',
  './arrayRemoveDuplicates-e9673044',
  './ComponentDatatype-77274976',
  './EllipsoidGeodesic-b00a0416',
  './EllipsoidRhumbLine-7f84cca0',
  './EncodedCartesian3-de837603',
  './GeometryAttribute-e2b38d72',
  './IntersectionTests-1307e0a8',
  './Plane-1c5a21a3',
  './WebMercatorProjection-8e29b101',
  './combine-ca22a614',
  './RuntimeError-06c93819',
  './WebGLConstants-a8cc3e8c'
], function (e, t, a, n, i, r, s, o, l, c, u, C, p, d, h, g, f, m) {
  'use strict'
  function w(i) {
    ;(i = n.defaultValue(i, n.defaultValue.EMPTY_OBJECT)),
      (this._ellipsoid = n.defaultValue(i.ellipsoid, a.Ellipsoid.WGS84)),
      (this._rectangle = n.defaultValue(i.rectangle, t.Rectangle.MAX_VALUE)),
      (this._projection = new e.GeographicProjection(this._ellipsoid)),
      (this._numberOfLevelZeroTilesX = n.defaultValue(i.numberOfLevelZeroTilesX, 2)),
      (this._numberOfLevelZeroTilesY = n.defaultValue(i.numberOfLevelZeroTilesY, 1))
  }
  Object.defineProperties(w.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    },
    rectangle: {
      get: function () {
        return this._rectangle
      }
    },
    projection: {
      get: function () {
        return this._projection
      }
    }
  }),
    (w.prototype.getNumberOfXTilesAtLevel = function (e) {
      return this._numberOfLevelZeroTilesX << e
    }),
    (w.prototype.getNumberOfYTilesAtLevel = function (e) {
      return this._numberOfLevelZeroTilesY << e
    }),
    (w.prototype.rectangleToNativeRectangle = function (e, a) {
      const r = i.CesiumMath.toDegrees(e.west),
        s = i.CesiumMath.toDegrees(e.south),
        o = i.CesiumMath.toDegrees(e.east),
        l = i.CesiumMath.toDegrees(e.north)
      return n.defined(a) ? ((a.west = r), (a.south = s), (a.east = o), (a.north = l), a) : new t.Rectangle(r, s, o, l)
    }),
    (w.prototype.tileXYToNativeRectangle = function (e, t, a, n) {
      const r = this.tileXYToRectangle(e, t, a, n)
      return (
        (r.west = i.CesiumMath.toDegrees(r.west)),
        (r.south = i.CesiumMath.toDegrees(r.south)),
        (r.east = i.CesiumMath.toDegrees(r.east)),
        (r.north = i.CesiumMath.toDegrees(r.north)),
        r
      )
    }),
    (w.prototype.tileXYToRectangle = function (e, a, i, r) {
      const s = this._rectangle,
        o = this.getNumberOfXTilesAtLevel(i),
        l = this.getNumberOfYTilesAtLevel(i),
        c = s.width / o,
        u = e * c + s.west,
        C = (e + 1) * c + s.west,
        p = s.height / l,
        d = s.north - a * p,
        h = s.north - (a + 1) * p
      return n.defined(r) || (r = new t.Rectangle(u, h, C, d)), (r.west = u), (r.south = h), (r.east = C), (r.north = d), r
    }),
    (w.prototype.positionToTileXY = function (e, a, r) {
      const s = this._rectangle
      if (!t.Rectangle.contains(s, e)) return
      const o = this.getNumberOfXTilesAtLevel(a),
        l = this.getNumberOfYTilesAtLevel(a),
        c = s.width / o,
        u = s.height / l
      let C = e.longitude
      s.east < s.west && (C += i.CesiumMath.TWO_PI)
      let p = ((C - s.west) / c) | 0
      p >= o && (p = o - 1)
      let d = ((s.north - e.latitude) / u) | 0
      return d >= l && (d = l - 1), n.defined(r) ? ((r.x = p), (r.y = d), r) : new t.Cartesian2(p, d)
    })
  const y = new a.Cartesian3(),
    M = new a.Cartesian3(),
    T = new a.Cartographic(),
    E = new a.Cartesian3(),
    _ = new a.Cartesian3(),
    O = new e.BoundingSphere(),
    b = new w(),
    P = [new a.Cartographic(), new a.Cartographic(), new a.Cartographic(), new a.Cartographic()],
    A = new t.Cartesian2(),
    k = {}
  function L(e) {
    a.Cartographic.fromRadians(e.east, e.north, 0, P[0]),
      a.Cartographic.fromRadians(e.west, e.north, 0, P[1]),
      a.Cartographic.fromRadians(e.east, e.south, 0, P[2]),
      a.Cartographic.fromRadians(e.west, e.south, 0, P[3])
    let t = 0,
      n = 0,
      i = 0,
      r = 0
    const s = k._terrainHeightsMaxLevel
    let o
    for (o = 0; o <= s; ++o) {
      let e = !1
      for (let t = 0; t < 4; ++t) {
        const a = P[t]
        if ((b.positionToTileXY(a, o, A), 0 === t)) (i = A.x), (r = A.y)
        else if (i !== A.x || r !== A.y) {
          e = !0
          break
        }
      }
      if (e) break
      ;(t = i), (n = r)
    }
    if (0 !== o) return { x: t, y: n, level: o > s ? s : o - 1 }
  }
  ;(k.initialize = function () {
    let t = k._initPromise
    return (
      n.defined(t) ||
        ((t = e.Resource.fetchJson(e.buildModuleUrl('Assets/approximateTerrainHeights.json')).then(function (e) {
          k._terrainHeights = e
        })),
        (k._initPromise = t)),
      t
    )
  }),
    (k.getMinimumMaximumHeights = function (e, i) {
      i = n.defaultValue(i, a.Ellipsoid.WGS84)
      const r = L(e)
      let s = k._defaultMinTerrainHeight,
        o = k._defaultMaxTerrainHeight
      if (n.defined(r)) {
        const l = `${r.level}-${r.x}-${r.y}`,
          c = k._terrainHeights[l]
        n.defined(c) && ((s = c[0]), (o = c[1])),
          i.cartographicToCartesian(t.Rectangle.northeast(e, T), y),
          i.cartographicToCartesian(t.Rectangle.southwest(e, T), M),
          a.Cartesian3.midpoint(M, y, E)
        const u = i.scaleToGeodeticSurface(E, _)
        if (n.defined(u)) {
          const e = a.Cartesian3.distance(E, u)
          s = Math.min(s, -e)
        } else s = k._defaultMinTerrainHeight
      }
      return (s = Math.max(k._defaultMinTerrainHeight, s)), { minimumTerrainHeight: s, maximumTerrainHeight: o }
    }),
    (k.getBoundingSphere = function (t, i) {
      i = n.defaultValue(i, a.Ellipsoid.WGS84)
      const r = L(t)
      let s = k._defaultMaxTerrainHeight
      if (n.defined(r)) {
        const e = `${r.level}-${r.x}-${r.y}`,
          t = k._terrainHeights[e]
        n.defined(t) && (s = t[1])
      }
      const o = e.BoundingSphere.fromRectangle3D(t, i, 0)
      return e.BoundingSphere.fromRectangle3D(t, i, s, O), e.BoundingSphere.union(o, O, o)
    }),
    (k._terrainHeightsMaxLevel = 6),
    (k._defaultMaxTerrainHeight = 9e3),
    (k._defaultMinTerrainHeight = -1e5),
    (k._terrainHeights = void 0),
    (k._initPromise = void 0),
    Object.defineProperties(k, {
      initialized: {
        get: function () {
          return n.defined(k._terrainHeights)
        }
      }
    })
  var S = k
  const x = [e.GeographicProjection, h.WebMercatorProjection],
    I = x.length,
    N = Math.cos(i.CesiumMath.toRadians(30)),
    R = Math.cos(i.CesiumMath.toRadians(150))
  function D(e) {
    const t = (e = n.defaultValue(e, n.defaultValue.EMPTY_OBJECT)).positions
    ;(this.width = n.defaultValue(e.width, 1)),
      (this._positions = t),
      (this.granularity = n.defaultValue(e.granularity, 9999)),
      (this.loop = n.defaultValue(e.loop, !1)),
      (this.arcType = n.defaultValue(e.arcType, r.ArcType.GEODESIC)),
      (this._ellipsoid = a.Ellipsoid.WGS84),
      (this._projectionIndex = 0),
      (this._workerName = 'createGroundPolylineGeometry'),
      (this._scene3DOnly = !1)
  }
  Object.defineProperties(D.prototype, {
    packedLength: {
      get: function () {
        return 1 + 3 * this._positions.length + 1 + 1 + 1 + a.Ellipsoid.packedLength + 1 + 1
      }
    }
  }),
    (D.setProjectionAndEllipsoid = function (e, t) {
      let a = 0
      for (let e = 0; e < I; e++)
        if (t instanceof x[e]) {
          a = e
          break
        }
      ;(e._projectionIndex = a), (e._ellipsoid = t.ellipsoid)
    })
  const v = new a.Cartesian3(),
    z = new a.Cartesian3(),
    H = new a.Cartesian3()
  function B(e, t, n, i, r) {
    const s = X(i, e, 0, v),
      o = X(i, e, n, z),
      l = X(i, t, 0, H),
      c = W(o, s, z),
      u = W(l, s, H)
    return a.Cartesian3.cross(u, c, r), a.Cartesian3.normalize(r, r)
  }
  const V = new a.Cartographic(),
    j = new a.Cartesian3(),
    G = new a.Cartesian3(),
    Y = new a.Cartesian3()
  function F(e, t, n, i, s, o, u, C, p, d, h) {
    if (0 === s) return
    let g
    o === r.ArcType.GEODESIC ? (g = new l.EllipsoidGeodesic(e, t, u)) : o === r.ArcType.RHUMB && (g = new c.EllipsoidRhumbLine(e, t, u))
    const f = g.surfaceDistance
    if (f < s) return
    const m = B(e, t, i, u, Y),
      w = Math.ceil(f / s),
      y = f / w
    let M = y
    const T = w - 1
    let E = C.length
    for (let e = 0; e < T; e++) {
      const e = g.interpolateUsingSurfaceDistance(M, V),
        t = X(u, e, n, j),
        r = X(u, e, i, G)
      a.Cartesian3.pack(m, C, E), a.Cartesian3.pack(t, p, E), a.Cartesian3.pack(r, d, E), h.push(e.latitude), h.push(e.longitude), (E += 3), (M += y)
    }
  }
  const q = new a.Cartographic()
  function X(e, t, n, i) {
    return a.Cartographic.clone(t, q), (q.height = n), a.Cartographic.toCartesian(q, e, i)
  }
  function W(e, t, n) {
    return a.Cartesian3.subtract(e, t, n), a.Cartesian3.normalize(n, n), n
  }
  function U(e, t, n, i) {
    return (i = W(e, t, i)), (i = a.Cartesian3.cross(i, n, i)), (i = a.Cartesian3.normalize(i, i)), (i = a.Cartesian3.cross(n, i, i))
  }
  ;(D.pack = function (e, t, i) {
    let r = n.defaultValue(i, 0)
    const s = e._positions,
      o = s.length
    t[r++] = o
    for (let e = 0; e < o; ++e) {
      const n = s[e]
      a.Cartesian3.pack(n, t, r), (r += 3)
    }
    return (
      (t[r++] = e.granularity),
      (t[r++] = e.loop ? 1 : 0),
      (t[r++] = e.arcType),
      a.Ellipsoid.pack(e._ellipsoid, t, r),
      (r += a.Ellipsoid.packedLength),
      (t[r++] = e._projectionIndex),
      (t[r++] = e._scene3DOnly ? 1 : 0),
      t
    )
  }),
    (D.unpack = function (e, t, i) {
      let r = n.defaultValue(t, 0)
      const s = e[r++],
        o = new Array(s)
      for (let t = 0; t < s; t++) (o[t] = a.Cartesian3.unpack(e, r)), (r += 3)
      const l = e[r++],
        c = 1 === e[r++],
        u = e[r++],
        C = a.Ellipsoid.unpack(e, r)
      r += a.Ellipsoid.packedLength
      const p = e[r++],
        d = 1 === e[r++]
      return (
        n.defined(i) || (i = new D({ positions: o })),
        (i._positions = o),
        (i.granularity = l),
        (i.loop = c),
        (i.arcType = u),
        (i._ellipsoid = C),
        (i._projectionIndex = p),
        (i._scene3DOnly = d),
        i
      )
    })
  const Z = new a.Cartesian3(),
    $ = new a.Cartesian3(),
    J = new a.Cartesian3(),
    Q = new a.Cartesian3()
  function K(e, t, n, r, s) {
    const o = W(n, t, Q),
      l = U(e, t, o, Z),
      c = U(r, t, o, $)
    if (i.CesiumMath.equalsEpsilon(a.Cartesian3.dot(l, c), -1, i.CesiumMath.EPSILON5))
      return (s = a.Cartesian3.cross(o, l, s)), (s = a.Cartesian3.normalize(s, s))
    ;(s = a.Cartesian3.add(c, l, s)), (s = a.Cartesian3.normalize(s, s))
    const u = a.Cartesian3.cross(o, s, J)
    return a.Cartesian3.dot(c, u) < 0 && (s = a.Cartesian3.negate(s, s)), s
  }
  const ee = d.Plane.fromPointNormal(a.Cartesian3.ZERO, a.Cartesian3.UNIT_Y),
    te = new a.Cartesian3(),
    ae = new a.Cartesian3(),
    ne = new a.Cartesian3(),
    ie = new a.Cartesian3(),
    re = new a.Cartesian3(),
    se = new a.Cartesian3(),
    oe = new a.Cartographic(),
    le = new a.Cartographic(),
    ce = new a.Cartographic()
  D.createGeometry = function (l) {
    const d = !l._scene3DOnly
    let h = l.loop
    const g = l._ellipsoid,
      f = l.granularity,
      m = l.arcType,
      w = new x[l._projectionIndex](g),
      y = 1e3
    let M, T
    const E = l._positions,
      _ = E.length
    let O, b, P, A
    2 === _ && (h = !1)
    const k = new c.EllipsoidRhumbLine(void 0, void 0, g)
    let L, I, R
    const D = [E[0]]
    for (T = 0; T < _ - 1; T++)
      (O = E[T]),
        (b = E[T + 1]),
        (L = p.IntersectionTests.lineSegmentPlane(O, b, ee, se)),
        !n.defined(L) ||
          a.Cartesian3.equalsEpsilon(L, O, i.CesiumMath.EPSILON7) ||
          a.Cartesian3.equalsEpsilon(L, b, i.CesiumMath.EPSILON7) ||
          (l.arcType === r.ArcType.GEODESIC
            ? D.push(a.Cartesian3.clone(L))
            : l.arcType === r.ArcType.RHUMB &&
              ((R = g.cartesianToCartographic(L, oe).longitude),
              (P = g.cartesianToCartographic(O, oe)),
              (A = g.cartesianToCartographic(b, le)),
              k.setEndPoints(P, A),
              (I = k.findIntersectionWithLongitude(R, ce)),
              (L = g.cartographicToCartesian(I, se)),
              !n.defined(L) ||
                a.Cartesian3.equalsEpsilon(L, O, i.CesiumMath.EPSILON7) ||
                a.Cartesian3.equalsEpsilon(L, b, i.CesiumMath.EPSILON7) ||
                D.push(a.Cartesian3.clone(L)))),
        D.push(b)
    h &&
      ((O = E[_ - 1]),
      (b = E[0]),
      (L = p.IntersectionTests.lineSegmentPlane(O, b, ee, se)),
      !n.defined(L) ||
        a.Cartesian3.equalsEpsilon(L, O, i.CesiumMath.EPSILON7) ||
        a.Cartesian3.equalsEpsilon(L, b, i.CesiumMath.EPSILON7) ||
        (l.arcType === r.ArcType.GEODESIC
          ? D.push(a.Cartesian3.clone(L))
          : l.arcType === r.ArcType.RHUMB &&
            ((R = g.cartesianToCartographic(L, oe).longitude),
            (P = g.cartesianToCartographic(O, oe)),
            (A = g.cartesianToCartographic(b, le)),
            k.setEndPoints(P, A),
            (I = k.findIntersectionWithLongitude(R, ce)),
            (L = g.cartographicToCartesian(I, se)),
            !n.defined(L) ||
              a.Cartesian3.equalsEpsilon(L, O, i.CesiumMath.EPSILON7) ||
              a.Cartesian3.equalsEpsilon(L, b, i.CesiumMath.EPSILON7) ||
              D.push(a.Cartesian3.clone(L)))))
    let v = D.length,
      z = new Array(v)
    for (T = 0; T < v; T++) {
      const e = a.Cartographic.fromCartesian(D[T], g)
      ;(e.height = 0), (z[T] = e)
    }
    if (((z = s.arrayRemoveDuplicates(z, a.Cartographic.equalsEpsilon)), (v = z.length), v < 2)) return
    const H = [],
      V = [],
      j = [],
      G = []
    let Y = te,
      q = ae,
      U = ne,
      Z = ie,
      $ = re
    const J = z[0],
      Q = z[1]
    for (
      Y = X(g, z[v - 1], 0, Y),
        Z = X(g, Q, 0, Z),
        q = X(g, J, 0, q),
        U = X(g, J, y, U),
        $ = h ? K(Y, q, U, Z, $) : B(J, Q, y, g, $),
        a.Cartesian3.pack($, V, 0),
        a.Cartesian3.pack(q, j, 0),
        a.Cartesian3.pack(U, G, 0),
        H.push(J.latitude),
        H.push(J.longitude),
        F(J, Q, 0, y, f, m, g, V, j, G, H),
        T = 1;
      T < v - 1;
      ++T
    ) {
      ;(Y = a.Cartesian3.clone(q, Y)), (q = a.Cartesian3.clone(Z, q))
      const e = z[T]
      X(g, e, y, U),
        X(g, z[T + 1], 0, Z),
        K(Y, q, U, Z, $),
        (M = V.length),
        a.Cartesian3.pack($, V, M),
        a.Cartesian3.pack(q, j, M),
        a.Cartesian3.pack(U, G, M),
        H.push(e.latitude),
        H.push(e.longitude),
        F(z[T], z[T + 1], 0, y, f, m, g, V, j, G, H)
    }
    const ue = z[v - 1],
      Ce = z[v - 2]
    if (((q = X(g, ue, 0, q)), (U = X(g, ue, y, U)), h)) {
      const e = z[0]
      ;(Y = X(g, Ce, 0, Y)), (Z = X(g, e, 0, Z)), ($ = K(Y, q, U, Z, $))
    } else $ = B(Ce, ue, y, g, $)
    if (
      ((M = V.length),
      a.Cartesian3.pack($, V, M),
      a.Cartesian3.pack(q, j, M),
      a.Cartesian3.pack(U, G, M),
      H.push(ue.latitude),
      H.push(ue.longitude),
      h)
    ) {
      for (F(ue, J, 0, y, f, m, g, V, j, G, H), M = V.length, T = 0; T < 3; ++T) (V[M + T] = V[T]), (j[M + T] = j[T]), (G[M + T] = G[T])
      H.push(J.latitude), H.push(J.longitude)
    }
    return (function (n, r, s, l, c, p, d) {
      let h, g
      const f = r._ellipsoid,
        m = s.length / 3 - 1,
        w = 8 * m,
        y = 4 * w,
        M = 36 * m,
        T = w > 65535 ? new Uint32Array(M) : new Uint16Array(M),
        E = new Float64Array(3 * w),
        _ = new Float32Array(y),
        O = new Float32Array(y),
        b = new Float32Array(y),
        P = new Float32Array(y),
        A = new Float32Array(y)
      let k, L, x, I
      d && ((k = new Float32Array(y)), (L = new Float32Array(y)), (x = new Float32Array(y)), (I = new Float32Array(2 * w)))
      const R = p.length / 2
      let D = 0
      const v = Oe
      v.height = 0
      const z = be
      z.height = 0
      let H = Pe,
        B = Ae
      if (d)
        for (g = 0, h = 1; h < R; h++)
          (v.latitude = p[g]),
            (v.longitude = p[g + 1]),
            (z.latitude = p[g + 2]),
            (z.longitude = p[g + 3]),
            (H = r.project(v, H)),
            (B = r.project(z, B)),
            (D += a.Cartesian3.distance(H, B)),
            (g += 2)
      const V = l.length / 3
      B = a.Cartesian3.unpack(l, 0, B)
      let j,
        G = 0
      for (g = 3, h = 1; h < V; h++) (H = a.Cartesian3.clone(B, H)), (B = a.Cartesian3.unpack(l, g, B)), (G += a.Cartesian3.distance(H, B)), (g += 3)
      g = 3
      let Y = 0,
        F = 0,
        q = 0,
        X = 0,
        U = !1,
        Z = a.Cartesian3.unpack(s, 0, Le),
        $ = a.Cartesian3.unpack(l, 0, Ae),
        J = a.Cartesian3.unpack(c, 0, xe)
      if (n) {
        de(J, a.Cartesian3.unpack(s, s.length - 6, ke), Z, $) && (J = a.Cartesian3.negate(J, J))
      }
      let Q = 0,
        K = 0,
        ee = 0
      for (h = 0; h < m; h++) {
        const e = a.Cartesian3.clone(Z, ke),
          n = a.Cartesian3.clone($, Pe)
        let o,
          C,
          h,
          m,
          w = a.Cartesian3.clone(J, Se)
        if (
          (U && (w = a.Cartesian3.negate(w, w)),
          (Z = a.Cartesian3.unpack(s, g, Le)),
          ($ = a.Cartesian3.unpack(l, g, Ae)),
          (J = a.Cartesian3.unpack(c, g, xe)),
          (U = de(J, e, Z, $)),
          (v.latitude = p[Y]),
          (v.longitude = p[Y + 1]),
          (z.latitude = p[Y + 2]),
          (z.longitude = p[Y + 3]),
          d)
        ) {
          const e = _e(v, z)
          ;(o = r.project(v, He)), (C = r.project(z, Be))
          const t = W(C, o, $e)
          ;(t.y = Math.abs(t.y)),
            (h = Ve),
            (m = je),
            0 === e || a.Cartesian3.dot(t, a.Cartesian3.UNIT_Y) > N
              ? ((h = me(r, v, w, o, Ve)), (m = me(r, z, J, C, je)))
              : 1 === e
              ? ((m = me(r, z, J, C, je)), (h.x = 0), (h.y = i.CesiumMath.sign(v.longitude - Math.abs(z.longitude))), (h.z = 0))
              : ((h = me(r, v, w, o, Ve)), (m.x = 0), (m.y = i.CesiumMath.sign(v.longitude - z.longitude)), (m.z = 0))
        }
        const y = a.Cartesian3.distance(n, $),
          M = u.EncodedCartesian3.fromCartesian(e, Ue),
          T = a.Cartesian3.subtract(Z, e, Ge),
          R = a.Cartesian3.normalize(T, qe)
        let H = a.Cartesian3.subtract(n, e, Ye)
        H = a.Cartesian3.normalize(H, H)
        let B = a.Cartesian3.cross(R, H, qe)
        B = a.Cartesian3.normalize(B, B)
        let V = a.Cartesian3.cross(H, w, Xe)
        V = a.Cartesian3.normalize(V, V)
        let te = a.Cartesian3.subtract($, Z, Fe)
        te = a.Cartesian3.normalize(te, te)
        let ae = a.Cartesian3.cross(J, te, We)
        ae = a.Cartesian3.normalize(ae, ae)
        const ne = y / G,
          ie = Q / G
        let re,
          se,
          oe,
          le = 0,
          ce = 0,
          ue = 0
        if (d) {
          ;(le = a.Cartesian3.distance(o, C)),
            (re = u.EncodedCartesian3.fromCartesian(o, Ze)),
            (se = a.Cartesian3.subtract(C, o, $e)),
            (oe = a.Cartesian3.normalize(se, Je))
          const e = oe.x
          ;(oe.x = oe.y), (oe.y = -e), (ce = le / D), (ue = K / D)
        }
        for (j = 0; j < 8; j++) {
          const e = X + 4 * j,
            t = F + 2 * j,
            n = e + 3,
            i = j < 4 ? 1 : -1,
            r = 2 === j || 3 === j || 6 === j || 7 === j ? 1 : -1
          a.Cartesian3.pack(M.high, _, e),
            (_[n] = T.x),
            a.Cartesian3.pack(M.low, O, e),
            (O[n] = T.y),
            a.Cartesian3.pack(V, b, e),
            (b[n] = T.z),
            a.Cartesian3.pack(ae, P, e),
            (P[n] = ne * i),
            a.Cartesian3.pack(B, A, e)
          let s = ie * r
          0 === s && r < 0 && (s = 9),
            (A[n] = s),
            d &&
              ((k[e] = re.high.x),
              (k[e + 1] = re.high.y),
              (k[e + 2] = re.low.x),
              (k[e + 3] = re.low.y),
              (x[e] = -h.y),
              (x[e + 1] = h.x),
              (x[e + 2] = m.y),
              (x[e + 3] = -m.x),
              (L[e] = se.x),
              (L[e + 1] = se.y),
              (L[e + 2] = oe.x),
              (L[e + 3] = oe.y),
              (I[t] = ce * i),
              (s = ue * r),
              0 === s && r < 0 && (s = 9),
              (I[t + 1] = s))
        }
        const Ce = ve,
          pe = ze,
          he = Re,
          ge = De,
          fe = t.Rectangle.fromCartographicArray(Ie, Ne),
          we = S.getMinimumMaximumHeights(fe, f),
          ye = we.minimumTerrainHeight,
          Te = we.maximumTerrainHeight
        ;(ee += ye), (ee += Te), Me(e, n, ye, Te, Ce, he), Me(Z, $, ye, Te, pe, ge)
        let Oe = a.Cartesian3.multiplyByScalar(B, i.CesiumMath.EPSILON5, Qe)
        a.Cartesian3.add(Ce, Oe, Ce),
          a.Cartesian3.add(pe, Oe, pe),
          a.Cartesian3.add(he, Oe, he),
          a.Cartesian3.add(ge, Oe, ge),
          Ee(Ce, pe),
          Ee(he, ge),
          a.Cartesian3.pack(Ce, E, q),
          a.Cartesian3.pack(pe, E, q + 3),
          a.Cartesian3.pack(ge, E, q + 6),
          a.Cartesian3.pack(he, E, q + 9),
          (Oe = a.Cartesian3.multiplyByScalar(B, -2 * i.CesiumMath.EPSILON5, Qe)),
          a.Cartesian3.add(Ce, Oe, Ce),
          a.Cartesian3.add(pe, Oe, pe),
          a.Cartesian3.add(he, Oe, he),
          a.Cartesian3.add(ge, Oe, ge),
          Ee(Ce, pe),
          Ee(he, ge),
          a.Cartesian3.pack(Ce, E, q + 12),
          a.Cartesian3.pack(pe, E, q + 15),
          a.Cartesian3.pack(ge, E, q + 18),
          a.Cartesian3.pack(he, E, q + 21),
          (Y += 2),
          (g += 3),
          (F += 16),
          (q += 24),
          (X += 32),
          (Q += y),
          (K += le)
      }
      g = 0
      let te = 0
      for (h = 0; h < m; h++) {
        for (j = 0; j < tt; j++) T[g + j] = et[j] + te
        ;(te += 8), (g += tt)
      }
      const ae = Ke
      e.BoundingSphere.fromVertices(s, a.Cartesian3.ZERO, 3, ae[0]), e.BoundingSphere.fromVertices(l, a.Cartesian3.ZERO, 3, ae[1])
      const ne = e.BoundingSphere.fromBoundingSpheres(ae)
      ne.radius += ee / (2 * m)
      const ie = {
        position: new C.GeometryAttribute({ componentDatatype: o.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, normalize: !1, values: E }),
        startHiAndForwardOffsetX: at(_),
        startLoAndForwardOffsetY: at(O),
        startNormalAndForwardOffsetZ: at(b),
        endNormalAndTextureCoordinateNormalizationX: at(P),
        rightNormalAndTextureCoordinateNormalizationY: at(A)
      }
      d &&
        ((ie.startHiLo2D = at(k)),
        (ie.offsetAndRight2D = at(L)),
        (ie.startEndNormals2D = at(x)),
        (ie.texcoordNormalization2D = new C.GeometryAttribute({
          componentDatatype: o.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          normalize: !1,
          values: I
        })))
      return new C.Geometry({ attributes: ie, indices: T, boundingSphere: ne })
    })(h, w, j, G, V, H, d)
  }
  const ue = new a.Cartesian3(),
    Ce = new a.Matrix3(),
    pe = new e.Quaternion()
  function de(t, n, r, s) {
    const o = W(r, n, ue),
      l = a.Cartesian3.dot(o, t)
    if (l > N || l < R) {
      const n = W(s, r, Q),
        o = l < R ? i.CesiumMath.PI_OVER_TWO : -i.CesiumMath.PI_OVER_TWO,
        c = e.Quaternion.fromAxisAngle(n, o, pe),
        u = a.Matrix3.fromQuaternion(c, Ce)
      return a.Matrix3.multiplyByVector(u, t, t), !0
    }
    return !1
  }
  const he = new a.Cartographic(),
    ge = new a.Cartesian3(),
    fe = new a.Cartesian3()
  function me(e, t, n, r, s) {
    const o = a.Cartographic.toCartesian(t, e._ellipsoid, ge)
    let l = a.Cartesian3.add(o, n, fe),
      c = !1
    const u = e._ellipsoid
    let C = u.cartesianToCartographic(l, he)
    Math.abs(t.longitude - C.longitude) > i.CesiumMath.PI_OVER_TWO &&
      ((c = !0), (l = a.Cartesian3.subtract(o, n, fe)), (C = u.cartesianToCartographic(l, he))),
      (C.height = 0)
    const p = e.project(C, s)
    return ((s = a.Cartesian3.subtract(p, r, s)).z = 0), (s = a.Cartesian3.normalize(s, s)), c && a.Cartesian3.negate(s, s), s
  }
  const we = new a.Cartesian3(),
    ye = new a.Cartesian3()
  function Me(e, t, n, i, r, s) {
    const o = a.Cartesian3.subtract(t, e, we)
    a.Cartesian3.normalize(o, o)
    const l = n - 0
    let c = a.Cartesian3.multiplyByScalar(o, l, ye)
    a.Cartesian3.add(e, c, r)
    const u = i - 1e3
    ;(c = a.Cartesian3.multiplyByScalar(o, u, ye)), a.Cartesian3.add(t, c, s)
  }
  const Te = new a.Cartesian3()
  function Ee(e, t) {
    const n = d.Plane.getPointDistance(ee, e),
      r = d.Plane.getPointDistance(ee, t)
    let s = Te
    i.CesiumMath.equalsEpsilon(n, 0, i.CesiumMath.EPSILON2)
      ? ((s = W(t, e, s)), a.Cartesian3.multiplyByScalar(s, i.CesiumMath.EPSILON2, s), a.Cartesian3.add(e, s, e))
      : i.CesiumMath.equalsEpsilon(r, 0, i.CesiumMath.EPSILON2) &&
        ((s = W(e, t, s)), a.Cartesian3.multiplyByScalar(s, i.CesiumMath.EPSILON2, s), a.Cartesian3.add(t, s, t))
  }
  function _e(e, t) {
    const a = Math.abs(e.longitude),
      n = Math.abs(t.longitude)
    if (i.CesiumMath.equalsEpsilon(a, i.CesiumMath.PI, i.CesiumMath.EPSILON11)) {
      const n = i.CesiumMath.sign(t.longitude)
      return (e.longitude = n * (a - i.CesiumMath.EPSILON11)), 1
    }
    if (i.CesiumMath.equalsEpsilon(n, i.CesiumMath.PI, i.CesiumMath.EPSILON11)) {
      const a = i.CesiumMath.sign(e.longitude)
      return (t.longitude = a * (n - i.CesiumMath.EPSILON11)), 2
    }
    return 0
  }
  const Oe = new a.Cartographic(),
    be = new a.Cartographic(),
    Pe = new a.Cartesian3(),
    Ae = new a.Cartesian3(),
    ke = new a.Cartesian3(),
    Le = new a.Cartesian3(),
    Se = new a.Cartesian3(),
    xe = new a.Cartesian3(),
    Ie = [Oe, be],
    Ne = new t.Rectangle(),
    Re = new a.Cartesian3(),
    De = new a.Cartesian3(),
    ve = new a.Cartesian3(),
    ze = new a.Cartesian3(),
    He = new a.Cartesian3(),
    Be = new a.Cartesian3(),
    Ve = new a.Cartesian3(),
    je = new a.Cartesian3(),
    Ge = new a.Cartesian3(),
    Ye = new a.Cartesian3(),
    Fe = new a.Cartesian3(),
    qe = new a.Cartesian3(),
    Xe = new a.Cartesian3(),
    We = new a.Cartesian3(),
    Ue = new u.EncodedCartesian3(),
    Ze = new u.EncodedCartesian3(),
    $e = new a.Cartesian3(),
    Je = new a.Cartesian3(),
    Qe = new a.Cartesian3(),
    Ke = [new e.BoundingSphere(), new e.BoundingSphere()],
    et = [0, 2, 1, 0, 3, 2, 0, 7, 3, 0, 4, 7, 0, 5, 4, 0, 1, 5, 5, 7, 4, 5, 6, 7, 5, 2, 6, 5, 1, 2, 3, 6, 2, 3, 7, 6],
    tt = et.length
  function at(e) {
    return new C.GeometryAttribute({ componentDatatype: o.ComponentDatatype.FLOAT, componentsPerAttribute: 4, normalize: !1, values: e })
  }
  return (
    (D._projectNormal = me),
    function (e, t) {
      return S.initialize().then(function () {
        return n.defined(t) && (e = D.unpack(e, t)), D.createGeometry(e)
      })
    }
  )
})
