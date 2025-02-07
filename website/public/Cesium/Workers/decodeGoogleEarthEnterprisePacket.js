define(['./RuntimeError-06c93819', './defaultValue-0a909f67', './createTaskProcessorWorker'], function (e, t, n) {
  'use strict'
  function i(t, n) {
    if (i.passThroughDataForTesting) return n
    const r = t.byteLength
    if (0 === r || r % 4 != 0) throw new e.RuntimeError('The length of key must be greater than 0 and a multiple of 4.')
    const a = new DataView(n),
      o = a.getUint32(0, !0)
    if (1953029805 === o || 2917034100 === o) return n
    const s = new DataView(t)
    let l = 0
    const c = n.byteLength,
      d = c - (c % 8),
      f = r
    let h,
      u = 8
    for (; l < d; )
      for (u = (u + 8) % 24, h = u; l < d && h < f; )
        a.setUint32(l, a.getUint32(l, !0) ^ s.getUint32(h, !0), !0),
          a.setUint32(l + 4, a.getUint32(l + 4, !0) ^ s.getUint32(h + 4, !0), !0),
          (l += 8),
          (h += 24)
    if (l < c) for (h >= f && ((u = (u + 8) % 24), (h = u)); l < c; ) a.setUint8(l, a.getUint8(l) ^ s.getUint8(h)), l++, h++
  }
  function r(e, t) {
    return 0 != (e & t)
  }
  i.passThroughDataForTesting = !1
  const a = [1, 2, 4, 8]
  function o(e, t, n, i, r, a) {
    ;(this._bits = e),
      (this.cnodeVersion = t),
      (this.imageryVersion = n),
      (this.terrainVersion = i),
      (this.imageryProvider = r),
      (this.terrainProvider = a),
      (this.ancestorHasTerrain = !1),
      (this.terrainState = void 0)
  }
  ;(o.clone = function (e, n) {
    return (
      t.defined(n)
        ? ((n._bits = e._bits),
          (n.cnodeVersion = e.cnodeVersion),
          (n.imageryVersion = e.imageryVersion),
          (n.terrainVersion = e.terrainVersion),
          (n.imageryProvider = e.imageryProvider),
          (n.terrainProvider = e.terrainProvider))
        : (n = new o(e._bits, e.cnodeVersion, e.imageryVersion, e.terrainVersion, e.imageryProvider, e.terrainProvider)),
      (n.ancestorHasTerrain = e.ancestorHasTerrain),
      (n.terrainState = e.terrainState),
      n
    )
  }),
    (o.prototype.setParent = function (e) {
      this.ancestorHasTerrain = e.ancestorHasTerrain || this.hasTerrain()
    }),
    (o.prototype.hasSubtree = function () {
      return r(this._bits, 16)
    }),
    (o.prototype.hasImagery = function () {
      return r(this._bits, 64)
    }),
    (o.prototype.hasTerrain = function () {
      return r(this._bits, 128)
    }),
    (o.prototype.hasChildren = function () {
      return r(this._bits, 15)
    }),
    (o.prototype.hasChild = function (e) {
      return r(this._bits, a[e])
    }),
    (o.prototype.getChildBitmask = function () {
      return 15 & this._bits
    })
  var s = {},
    l = {}
  var c = (e, t, n, i) => {
    let r = (65535 & e) | 0,
      a = ((e >>> 16) & 65535) | 0,
      o = 0
    for (; 0 !== n; ) {
      ;(o = n > 2e3 ? 2e3 : n), (n -= o)
      do {
        ;(r = (r + t[i++]) | 0), (a = (a + r) | 0)
      } while (--o)
      ;(r %= 65521), (a %= 65521)
    }
    return r | (a << 16) | 0
  }
  const d = new Uint32Array(
    (() => {
      let e,
        t = []
      for (var n = 0; n < 256; n++) {
        e = n
        for (var i = 0; i < 8; i++) e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1
        t[n] = e
      }
      return t
    })()
  )
  var f = (e, t, n, i) => {
    const r = d,
      a = i + n
    e ^= -1
    for (let n = i; n < a; n++) e = (e >>> 8) ^ r[255 & (e ^ t[n])]
    return -1 ^ e
  }
  const h = 16209
  const u = 15,
    w = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]),
    b = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]),
    m = new Uint16Array([
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0,
      0
    ]),
    g = new Uint8Array([
      16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64
    ])
  var k = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8
  }
  const _ = c,
    p = f,
    y = function (e, t) {
      let n, i, r, a, o, s, l, c, d, f, u, w, b, m, g, k, _, p, y, v, E, x, R, A
      const T = e.state
      ;(n = e.next_in),
        (R = e.input),
        (i = n + (e.avail_in - 5)),
        (r = e.next_out),
        (A = e.output),
        (a = r - (t - e.avail_out)),
        (o = r + (e.avail_out - 257)),
        (s = T.dmax),
        (l = T.wsize),
        (c = T.whave),
        (d = T.wnext),
        (f = T.window),
        (u = T.hold),
        (w = T.bits),
        (b = T.lencode),
        (m = T.distcode),
        (g = (1 << T.lenbits) - 1),
        (k = (1 << T.distbits) - 1)
      e: do {
        w < 15 && ((u += R[n++] << w), (w += 8), (u += R[n++] << w), (w += 8)), (_ = b[u & g])
        t: for (;;) {
          if (((p = _ >>> 24), (u >>>= p), (w -= p), (p = (_ >>> 16) & 255), 0 === p)) A[r++] = 65535 & _
          else {
            if (!(16 & p)) {
              if (0 == (64 & p)) {
                _ = b[(65535 & _) + (u & ((1 << p) - 1))]
                continue t
              }
              if (32 & p) {
                T.mode = 16191
                break e
              }
              ;(e.msg = 'invalid literal/length code'), (T.mode = h)
              break e
            }
            ;(y = 65535 & _),
              (p &= 15),
              p && (w < p && ((u += R[n++] << w), (w += 8)), (y += u & ((1 << p) - 1)), (u >>>= p), (w -= p)),
              w < 15 && ((u += R[n++] << w), (w += 8), (u += R[n++] << w), (w += 8)),
              (_ = m[u & k])
            n: for (;;) {
              if (((p = _ >>> 24), (u >>>= p), (w -= p), (p = (_ >>> 16) & 255), !(16 & p))) {
                if (0 == (64 & p)) {
                  _ = m[(65535 & _) + (u & ((1 << p) - 1))]
                  continue n
                }
                ;(e.msg = 'invalid distance code'), (T.mode = h)
                break e
              }
              if (
                ((v = 65535 & _),
                (p &= 15),
                w < p && ((u += R[n++] << w), (w += 8), w < p && ((u += R[n++] << w), (w += 8))),
                (v += u & ((1 << p) - 1)),
                v > s)
              ) {
                ;(e.msg = 'invalid distance too far back'), (T.mode = h)
                break e
              }
              if (((u >>>= p), (w -= p), (p = r - a), v > p)) {
                if (((p = v - p), p > c && T.sane)) {
                  ;(e.msg = 'invalid distance too far back'), (T.mode = h)
                  break e
                }
                if (((E = 0), (x = f), 0 === d)) {
                  if (((E += l - p), p < y)) {
                    y -= p
                    do {
                      A[r++] = f[E++]
                    } while (--p)
                    ;(E = r - v), (x = A)
                  }
                } else if (d < p) {
                  if (((E += l + d - p), (p -= d), p < y)) {
                    y -= p
                    do {
                      A[r++] = f[E++]
                    } while (--p)
                    if (((E = 0), d < y)) {
                      ;(p = d), (y -= p)
                      do {
                        A[r++] = f[E++]
                      } while (--p)
                      ;(E = r - v), (x = A)
                    }
                  }
                } else if (((E += d - p), p < y)) {
                  y -= p
                  do {
                    A[r++] = f[E++]
                  } while (--p)
                  ;(E = r - v), (x = A)
                }
                for (; y > 2; ) (A[r++] = x[E++]), (A[r++] = x[E++]), (A[r++] = x[E++]), (y -= 3)
                y && ((A[r++] = x[E++]), y > 1 && (A[r++] = x[E++]))
              } else {
                E = r - v
                do {
                  ;(A[r++] = A[E++]), (A[r++] = A[E++]), (A[r++] = A[E++]), (y -= 3)
                } while (y > 2)
                y && ((A[r++] = A[E++]), y > 1 && (A[r++] = A[E++]))
              }
              break
            }
          }
          break
        }
      } while (n < i && r < o)
      ;(y = w >> 3),
        (n -= y),
        (w -= y << 3),
        (u &= (1 << w) - 1),
        (e.next_in = n),
        (e.next_out = r),
        (e.avail_in = n < i ? i - n + 5 : 5 - (n - i)),
        (e.avail_out = r < o ? o - r + 257 : 257 - (r - o)),
        (T.hold = u),
        (T.bits = w)
    },
    v = (e, t, n, i, r, a, o, s) => {
      const l = s.bits
      let c,
        d,
        f,
        h,
        k,
        _,
        p = 0,
        y = 0,
        v = 0,
        E = 0,
        x = 0,
        R = 0,
        A = 0,
        T = 0,
        U = 0,
        S = 0,
        Z = null
      const D = new Uint16Array(16),
        I = new Uint16Array(16)
      let O,
        B,
        N,
        C = null
      for (p = 0; p <= u; p++) D[p] = 0
      for (y = 0; y < i; y++) D[t[n + y]]++
      for (x = l, E = u; E >= 1 && 0 === D[E]; E--);
      if ((x > E && (x = E), 0 === E)) return (r[a++] = 20971520), (r[a++] = 20971520), (s.bits = 1), 0
      for (v = 1; v < E && 0 === D[v]; v++);
      for (x < v && (x = v), T = 1, p = 1; p <= u; p++) if (((T <<= 1), (T -= D[p]), T < 0)) return -1
      if (T > 0 && (0 === e || 1 !== E)) return -1
      for (I[1] = 0, p = 1; p < u; p++) I[p + 1] = I[p] + D[p]
      for (y = 0; y < i; y++) 0 !== t[n + y] && (o[I[t[n + y]]++] = y)
      if (
        (0 === e ? ((Z = C = o), (_ = 20)) : 1 === e ? ((Z = w), (C = b), (_ = 257)) : ((Z = m), (C = g), (_ = 0)),
        (S = 0),
        (y = 0),
        (p = v),
        (k = a),
        (R = x),
        (A = 0),
        (f = -1),
        (U = 1 << x),
        (h = U - 1),
        (1 === e && U > 852) || (2 === e && U > 592))
      )
        return 1
      for (;;) {
        ;(O = p - A),
          o[y] + 1 < _ ? ((B = 0), (N = o[y])) : o[y] >= _ ? ((B = C[o[y] - _]), (N = Z[o[y] - _])) : ((B = 96), (N = 0)),
          (c = 1 << (p - A)),
          (d = 1 << R),
          (v = d)
        do {
          ;(d -= c), (r[k + (S >> A) + d] = (O << 24) | (B << 16) | N | 0)
        } while (0 !== d)
        for (c = 1 << (p - 1); S & c; ) c >>= 1
        if ((0 !== c ? ((S &= c - 1), (S += c)) : (S = 0), y++, 0 == --D[p])) {
          if (p === E) break
          p = t[n + o[y]]
        }
        if (p > x && (S & h) !== f) {
          for (0 === A && (A = x), k += v, R = p - A, T = 1 << R; R + A < E && ((T -= D[R + A]), !(T <= 0)); ) R++, (T <<= 1)
          if (((U += 1 << R), (1 === e && U > 852) || (2 === e && U > 592))) return 1
          ;(f = S & h), (r[f] = (x << 24) | (R << 16) | (k - a) | 0)
        }
      }
      return 0 !== S && (r[k + S] = ((p - A) << 24) | (64 << 16) | 0), (s.bits = x), 0
    },
    {
      Z_FINISH: E,
      Z_BLOCK: x,
      Z_TREES: R,
      Z_OK: A,
      Z_STREAM_END: T,
      Z_NEED_DICT: U,
      Z_STREAM_ERROR: S,
      Z_DATA_ERROR: Z,
      Z_MEM_ERROR: D,
      Z_BUF_ERROR: I,
      Z_DEFLATED: O
    } = k,
    B = 16180,
    N = 16190,
    C = 16191,
    M = 16192,
    L = 16194,
    F = 16199,
    P = 16200,
    z = 16206,
    V = 16209,
    H = e => ((e >>> 24) & 255) + ((e >>> 8) & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
  function j() {
    ;(this.strm = null),
      (this.mode = 0),
      (this.last = !1),
      (this.wrap = 0),
      (this.havedict = !1),
      (this.flags = 0),
      (this.dmax = 0),
      (this.check = 0),
      (this.total = 0),
      (this.head = null),
      (this.wbits = 0),
      (this.wsize = 0),
      (this.whave = 0),
      (this.wnext = 0),
      (this.window = null),
      (this.hold = 0),
      (this.bits = 0),
      (this.length = 0),
      (this.offset = 0),
      (this.extra = 0),
      (this.lencode = null),
      (this.distcode = null),
      (this.lenbits = 0),
      (this.distbits = 0),
      (this.ncode = 0),
      (this.nlen = 0),
      (this.ndist = 0),
      (this.have = 0),
      (this.next = null),
      (this.lens = new Uint16Array(320)),
      (this.work = new Uint16Array(288)),
      (this.lendyn = null),
      (this.distdyn = null),
      (this.sane = 0),
      (this.back = 0),
      (this.was = 0)
  }
  const K = e => {
      if (!e) return 1
      const t = e.state
      return !t || t.strm !== e || t.mode < B || t.mode > 16211 ? 1 : 0
    },
    Y = e => {
      if (K(e)) return S
      const t = e.state
      return (
        (e.total_in = e.total_out = t.total = 0),
        (e.msg = ''),
        t.wrap && (e.adler = 1 & t.wrap),
        (t.mode = B),
        (t.last = 0),
        (t.havedict = 0),
        (t.flags = -1),
        (t.dmax = 32768),
        (t.head = null),
        (t.hold = 0),
        (t.bits = 0),
        (t.lencode = t.lendyn = new Int32Array(852)),
        (t.distcode = t.distdyn = new Int32Array(592)),
        (t.sane = 1),
        (t.back = -1),
        A
      )
    },
    G = e => {
      if (K(e)) return S
      const t = e.state
      return (t.wsize = 0), (t.whave = 0), (t.wnext = 0), Y(e)
    },
    Q = (e, t) => {
      let n
      if (K(e)) return S
      const i = e.state
      return (
        t < 0 ? ((n = 0), (t = -t)) : ((n = 5 + (t >> 4)), t < 48 && (t &= 15)),
        t && (t < 8 || t > 15) ? S : (null !== i.window && i.wbits !== t && (i.window = null), (i.wrap = n), (i.wbits = t), G(e))
      )
    },
    W = (e, t) => {
      if (!e) return S
      const n = new j()
      ;(e.state = n), (n.strm = e), (n.window = null), (n.mode = B)
      const i = Q(e, t)
      return i !== A && (e.state = null), i
    }
  let X,
    q,
    J = !0
  const $ = e => {
      if (J) {
        ;(X = new Int32Array(512)), (q = new Int32Array(32))
        let t = 0
        for (; t < 144; ) e.lens[t++] = 8
        for (; t < 256; ) e.lens[t++] = 9
        for (; t < 280; ) e.lens[t++] = 7
        for (; t < 288; ) e.lens[t++] = 8
        for (v(1, e.lens, 0, 288, X, 0, e.work, { bits: 9 }), t = 0; t < 32; ) e.lens[t++] = 5
        v(2, e.lens, 0, 32, q, 0, e.work, { bits: 5 }), (J = !1)
      }
      ;(e.lencode = X), (e.lenbits = 9), (e.distcode = q), (e.distbits = 5)
    },
    ee = (e, t, n, i) => {
      let r
      const a = e.state
      return (
        null === a.window && ((a.wsize = 1 << a.wbits), (a.wnext = 0), (a.whave = 0), (a.window = new Uint8Array(a.wsize))),
        i >= a.wsize
          ? (a.window.set(t.subarray(n - a.wsize, n), 0), (a.wnext = 0), (a.whave = a.wsize))
          : ((r = a.wsize - a.wnext),
            r > i && (r = i),
            a.window.set(t.subarray(n - i, n - i + r), a.wnext),
            (i -= r)
              ? (a.window.set(t.subarray(n - i, n), 0), (a.wnext = i), (a.whave = a.wsize))
              : ((a.wnext += r), a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += r))),
        0
      )
    }
  ;(l.inflateReset = G),
    (l.inflateReset2 = Q),
    (l.inflateResetKeep = Y),
    (l.inflateInit = e => W(e, 15)),
    (l.inflateInit2 = W),
    (l.inflate = (e, t) => {
      let n,
        i,
        r,
        a,
        o,
        s,
        l,
        c,
        d,
        f,
        h,
        u,
        w,
        b,
        m,
        g,
        k,
        j,
        Y,
        G,
        Q,
        W,
        X = 0
      const q = new Uint8Array(4)
      let J, te
      const ne = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
      if (K(e) || !e.output || (!e.input && 0 !== e.avail_in)) return S
      ;(n = e.state),
        n.mode === C && (n.mode = M),
        (o = e.next_out),
        (r = e.output),
        (l = e.avail_out),
        (a = e.next_in),
        (i = e.input),
        (s = e.avail_in),
        (c = n.hold),
        (d = n.bits),
        (f = s),
        (h = l),
        (W = A)
      e: for (;;)
        switch (n.mode) {
          case B:
            if (0 === n.wrap) {
              n.mode = M
              break
            }
            for (; d < 16; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if (2 & n.wrap && 35615 === c) {
              0 === n.wbits && (n.wbits = 15),
                (n.check = 0),
                (q[0] = 255 & c),
                (q[1] = (c >>> 8) & 255),
                (n.check = p(n.check, q, 2, 0)),
                (c = 0),
                (d = 0),
                (n.mode = 16181)
              break
            }
            if ((n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & c) << 8) + (c >> 8)) % 31)) {
              ;(e.msg = 'incorrect header check'), (n.mode = V)
              break
            }
            if ((15 & c) !== O) {
              ;(e.msg = 'unknown compression method'), (n.mode = V)
              break
            }
            if (((c >>>= 4), (d -= 4), (Q = 8 + (15 & c)), 0 === n.wbits && (n.wbits = Q), Q > 15 || Q > n.wbits)) {
              ;(e.msg = 'invalid window size'), (n.mode = V)
              break
            }
            ;(n.dmax = 1 << n.wbits), (n.flags = 0), (e.adler = n.check = 1), (n.mode = 512 & c ? 16189 : C), (c = 0), (d = 0)
            break
          case 16181:
            for (; d < 16; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if (((n.flags = c), (255 & n.flags) !== O)) {
              ;(e.msg = 'unknown compression method'), (n.mode = V)
              break
            }
            if (57344 & n.flags) {
              ;(e.msg = 'unknown header flags set'), (n.mode = V)
              break
            }
            n.head && (n.head.text = (c >> 8) & 1),
              512 & n.flags && 4 & n.wrap && ((q[0] = 255 & c), (q[1] = (c >>> 8) & 255), (n.check = p(n.check, q, 2, 0))),
              (c = 0),
              (d = 0),
              (n.mode = 16182)
          case 16182:
            for (; d < 32; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            n.head && (n.head.time = c),
              512 & n.flags &&
                4 & n.wrap &&
                ((q[0] = 255 & c), (q[1] = (c >>> 8) & 255), (q[2] = (c >>> 16) & 255), (q[3] = (c >>> 24) & 255), (n.check = p(n.check, q, 4, 0))),
              (c = 0),
              (d = 0),
              (n.mode = 16183)
          case 16183:
            for (; d < 16; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            n.head && ((n.head.xflags = 255 & c), (n.head.os = c >> 8)),
              512 & n.flags && 4 & n.wrap && ((q[0] = 255 & c), (q[1] = (c >>> 8) & 255), (n.check = p(n.check, q, 2, 0))),
              (c = 0),
              (d = 0),
              (n.mode = 16184)
          case 16184:
            if (1024 & n.flags) {
              for (; d < 16; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(n.length = c),
                n.head && (n.head.extra_len = c),
                512 & n.flags && 4 & n.wrap && ((q[0] = 255 & c), (q[1] = (c >>> 8) & 255), (n.check = p(n.check, q, 2, 0))),
                (c = 0),
                (d = 0)
            } else n.head && (n.head.extra = null)
            n.mode = 16185
          case 16185:
            if (
              1024 & n.flags &&
              ((u = n.length),
              u > s && (u = s),
              u &&
                (n.head &&
                  ((Q = n.head.extra_len - n.length),
                  n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)),
                  n.head.extra.set(i.subarray(a, a + u), Q)),
                512 & n.flags && 4 & n.wrap && (n.check = p(n.check, i, u, a)),
                (s -= u),
                (a += u),
                (n.length -= u)),
              n.length)
            )
              break e
            ;(n.length = 0), (n.mode = 16186)
          case 16186:
            if (2048 & n.flags) {
              if (0 === s) break e
              u = 0
              do {
                ;(Q = i[a + u++]), n.head && Q && n.length < 65536 && (n.head.name += String.fromCharCode(Q))
              } while (Q && u < s)
              if ((512 & n.flags && 4 & n.wrap && (n.check = p(n.check, i, u, a)), (s -= u), (a += u), Q)) break e
            } else n.head && (n.head.name = null)
            ;(n.length = 0), (n.mode = 16187)
          case 16187:
            if (4096 & n.flags) {
              if (0 === s) break e
              u = 0
              do {
                ;(Q = i[a + u++]), n.head && Q && n.length < 65536 && (n.head.comment += String.fromCharCode(Q))
              } while (Q && u < s)
              if ((512 & n.flags && 4 & n.wrap && (n.check = p(n.check, i, u, a)), (s -= u), (a += u), Q)) break e
            } else n.head && (n.head.comment = null)
            n.mode = 16188
          case 16188:
            if (512 & n.flags) {
              for (; d < 16; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              if (4 & n.wrap && c !== (65535 & n.check)) {
                ;(e.msg = 'header crc mismatch'), (n.mode = V)
                break
              }
              ;(c = 0), (d = 0)
            }
            n.head && ((n.head.hcrc = (n.flags >> 9) & 1), (n.head.done = !0)), (e.adler = n.check = 0), (n.mode = C)
            break
          case 16189:
            for (; d < 32; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            ;(e.adler = n.check = H(c)), (c = 0), (d = 0), (n.mode = N)
          case N:
            if (0 === n.havedict) return (e.next_out = o), (e.avail_out = l), (e.next_in = a), (e.avail_in = s), (n.hold = c), (n.bits = d), U
            ;(e.adler = n.check = 1), (n.mode = C)
          case C:
            if (t === x || t === R) break e
          case M:
            if (n.last) {
              ;(c >>>= 7 & d), (d -= 7 & d), (n.mode = z)
              break
            }
            for (; d < 3; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            switch (((n.last = 1 & c), (c >>>= 1), (d -= 1), 3 & c)) {
              case 0:
                n.mode = 16193
                break
              case 1:
                if (($(n), (n.mode = F), t === R)) {
                  ;(c >>>= 2), (d -= 2)
                  break e
                }
                break
              case 2:
                n.mode = 16196
                break
              case 3:
                ;(e.msg = 'invalid block type'), (n.mode = V)
            }
            ;(c >>>= 2), (d -= 2)
            break
          case 16193:
            for (c >>>= 7 & d, d -= 7 & d; d < 32; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if ((65535 & c) != ((c >>> 16) ^ 65535)) {
              ;(e.msg = 'invalid stored block lengths'), (n.mode = V)
              break
            }
            if (((n.length = 65535 & c), (c = 0), (d = 0), (n.mode = L), t === R)) break e
          case L:
            n.mode = 16195
          case 16195:
            if (((u = n.length), u)) {
              if ((u > s && (u = s), u > l && (u = l), 0 === u)) break e
              r.set(i.subarray(a, a + u), o), (s -= u), (a += u), (l -= u), (o += u), (n.length -= u)
              break
            }
            n.mode = C
            break
          case 16196:
            for (; d < 14; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if (
              ((n.nlen = 257 + (31 & c)),
              (c >>>= 5),
              (d -= 5),
              (n.ndist = 1 + (31 & c)),
              (c >>>= 5),
              (d -= 5),
              (n.ncode = 4 + (15 & c)),
              (c >>>= 4),
              (d -= 4),
              n.nlen > 286 || n.ndist > 30)
            ) {
              ;(e.msg = 'too many length or distance symbols'), (n.mode = V)
              break
            }
            ;(n.have = 0), (n.mode = 16197)
          case 16197:
            for (; n.have < n.ncode; ) {
              for (; d < 3; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(n.lens[ne[n.have++]] = 7 & c), (c >>>= 3), (d -= 3)
            }
            for (; n.have < 19; ) n.lens[ne[n.have++]] = 0
            if (
              ((n.lencode = n.lendyn),
              (n.lenbits = 7),
              (J = { bits: n.lenbits }),
              (W = v(0, n.lens, 0, 19, n.lencode, 0, n.work, J)),
              (n.lenbits = J.bits),
              W)
            ) {
              ;(e.msg = 'invalid code lengths set'), (n.mode = V)
              break
            }
            ;(n.have = 0), (n.mode = 16198)
          case 16198:
            for (; n.have < n.nlen + n.ndist; ) {
              for (; (X = n.lencode[c & ((1 << n.lenbits) - 1)]), (m = X >>> 24), (g = (X >>> 16) & 255), (k = 65535 & X), !(m <= d); ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              if (k < 16) (c >>>= m), (d -= m), (n.lens[n.have++] = k)
              else {
                if (16 === k) {
                  for (te = m + 2; d < te; ) {
                    if (0 === s) break e
                    s--, (c += i[a++] << d), (d += 8)
                  }
                  if (((c >>>= m), (d -= m), 0 === n.have)) {
                    ;(e.msg = 'invalid bit length repeat'), (n.mode = V)
                    break
                  }
                  ;(Q = n.lens[n.have - 1]), (u = 3 + (3 & c)), (c >>>= 2), (d -= 2)
                } else if (17 === k) {
                  for (te = m + 3; d < te; ) {
                    if (0 === s) break e
                    s--, (c += i[a++] << d), (d += 8)
                  }
                  ;(c >>>= m), (d -= m), (Q = 0), (u = 3 + (7 & c)), (c >>>= 3), (d -= 3)
                } else {
                  for (te = m + 7; d < te; ) {
                    if (0 === s) break e
                    s--, (c += i[a++] << d), (d += 8)
                  }
                  ;(c >>>= m), (d -= m), (Q = 0), (u = 11 + (127 & c)), (c >>>= 7), (d -= 7)
                }
                if (n.have + u > n.nlen + n.ndist) {
                  ;(e.msg = 'invalid bit length repeat'), (n.mode = V)
                  break
                }
                for (; u--; ) n.lens[n.have++] = Q
              }
            }
            if (n.mode === V) break
            if (0 === n.lens[256]) {
              ;(e.msg = 'invalid code -- missing end-of-block'), (n.mode = V)
              break
            }
            if (((n.lenbits = 9), (J = { bits: n.lenbits }), (W = v(1, n.lens, 0, n.nlen, n.lencode, 0, n.work, J)), (n.lenbits = J.bits), W)) {
              ;(e.msg = 'invalid literal/lengths set'), (n.mode = V)
              break
            }
            if (
              ((n.distbits = 6),
              (n.distcode = n.distdyn),
              (J = { bits: n.distbits }),
              (W = v(2, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, J)),
              (n.distbits = J.bits),
              W)
            ) {
              ;(e.msg = 'invalid distances set'), (n.mode = V)
              break
            }
            if (((n.mode = F), t === R)) break e
          case F:
            n.mode = P
          case P:
            if (s >= 6 && l >= 258) {
              ;(e.next_out = o),
                (e.avail_out = l),
                (e.next_in = a),
                (e.avail_in = s),
                (n.hold = c),
                (n.bits = d),
                y(e, h),
                (o = e.next_out),
                (r = e.output),
                (l = e.avail_out),
                (a = e.next_in),
                (i = e.input),
                (s = e.avail_in),
                (c = n.hold),
                (d = n.bits),
                n.mode === C && (n.back = -1)
              break
            }
            for (n.back = 0; (X = n.lencode[c & ((1 << n.lenbits) - 1)]), (m = X >>> 24), (g = (X >>> 16) & 255), (k = 65535 & X), !(m <= d); ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if (g && 0 == (240 & g)) {
              for (
                j = m, Y = g, G = k;
                (X = n.lencode[G + ((c & ((1 << (j + Y)) - 1)) >> j)]), (m = X >>> 24), (g = (X >>> 16) & 255), (k = 65535 & X), !(j + m <= d);

              ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(c >>>= j), (d -= j), (n.back += j)
            }
            if (((c >>>= m), (d -= m), (n.back += m), (n.length = k), 0 === g)) {
              n.mode = 16205
              break
            }
            if (32 & g) {
              ;(n.back = -1), (n.mode = C)
              break
            }
            if (64 & g) {
              ;(e.msg = 'invalid literal/length code'), (n.mode = V)
              break
            }
            ;(n.extra = 15 & g), (n.mode = 16201)
          case 16201:
            if (n.extra) {
              for (te = n.extra; d < te; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(n.length += c & ((1 << n.extra) - 1)), (c >>>= n.extra), (d -= n.extra), (n.back += n.extra)
            }
            ;(n.was = n.length), (n.mode = 16202)
          case 16202:
            for (; (X = n.distcode[c & ((1 << n.distbits) - 1)]), (m = X >>> 24), (g = (X >>> 16) & 255), (k = 65535 & X), !(m <= d); ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if (0 == (240 & g)) {
              for (
                j = m, Y = g, G = k;
                (X = n.distcode[G + ((c & ((1 << (j + Y)) - 1)) >> j)]), (m = X >>> 24), (g = (X >>> 16) & 255), (k = 65535 & X), !(j + m <= d);

              ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(c >>>= j), (d -= j), (n.back += j)
            }
            if (((c >>>= m), (d -= m), (n.back += m), 64 & g)) {
              ;(e.msg = 'invalid distance code'), (n.mode = V)
              break
            }
            ;(n.offset = k), (n.extra = 15 & g), (n.mode = 16203)
          case 16203:
            if (n.extra) {
              for (te = n.extra; d < te; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(n.offset += c & ((1 << n.extra) - 1)), (c >>>= n.extra), (d -= n.extra), (n.back += n.extra)
            }
            if (n.offset > n.dmax) {
              ;(e.msg = 'invalid distance too far back'), (n.mode = V)
              break
            }
            n.mode = 16204
          case 16204:
            if (0 === l) break e
            if (((u = h - l), n.offset > u)) {
              if (((u = n.offset - u), u > n.whave && n.sane)) {
                ;(e.msg = 'invalid distance too far back'), (n.mode = V)
                break
              }
              u > n.wnext ? ((u -= n.wnext), (w = n.wsize - u)) : (w = n.wnext - u), u > n.length && (u = n.length), (b = n.window)
            } else (b = r), (w = o - n.offset), (u = n.length)
            u > l && (u = l), (l -= u), (n.length -= u)
            do {
              r[o++] = b[w++]
            } while (--u)
            0 === n.length && (n.mode = P)
            break
          case 16205:
            if (0 === l) break e
            ;(r[o++] = n.length), l--, (n.mode = P)
            break
          case z:
            if (n.wrap) {
              for (; d < 32; ) {
                if (0 === s) break e
                s--, (c |= i[a++] << d), (d += 8)
              }
              if (
                ((h -= l),
                (e.total_out += h),
                (n.total += h),
                4 & n.wrap && h && (e.adler = n.check = n.flags ? p(n.check, r, h, o - h) : _(n.check, r, h, o - h)),
                (h = l),
                4 & n.wrap && (n.flags ? c : H(c)) !== n.check)
              ) {
                ;(e.msg = 'incorrect data check'), (n.mode = V)
                break
              }
              ;(c = 0), (d = 0)
            }
            n.mode = 16207
          case 16207:
            if (n.wrap && n.flags) {
              for (; d < 32; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              if (4 & n.wrap && c !== (4294967295 & n.total)) {
                ;(e.msg = 'incorrect length check'), (n.mode = V)
                break
              }
              ;(c = 0), (d = 0)
            }
            n.mode = 16208
          case 16208:
            W = T
            break e
          case V:
            W = Z
            break e
          case 16210:
            return D
          default:
            return S
        }
      return (
        (e.next_out = o),
        (e.avail_out = l),
        (e.next_in = a),
        (e.avail_in = s),
        (n.hold = c),
        (n.bits = d),
        (n.wsize || (h !== e.avail_out && n.mode < V && (n.mode < z || t !== E))) && ee(e, e.output, e.next_out, h - e.avail_out),
        (f -= e.avail_in),
        (h -= e.avail_out),
        (e.total_in += f),
        (e.total_out += h),
        (n.total += h),
        4 & n.wrap && h && (e.adler = n.check = n.flags ? p(n.check, r, h, e.next_out - h) : _(n.check, r, h, e.next_out - h)),
        (e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === C ? 128 : 0) + (n.mode === F || n.mode === L ? 256 : 0)),
        ((0 === f && 0 === h) || t === E) && W === A && (W = I),
        W
      )
    }),
    (l.inflateEnd = e => {
      if (K(e)) return S
      let t = e.state
      return t.window && (t.window = null), (e.state = null), A
    }),
    (l.inflateGetHeader = (e, t) => {
      if (K(e)) return S
      const n = e.state
      return 0 == (2 & n.wrap) ? S : ((n.head = t), (t.done = !1), A)
    }),
    (l.inflateSetDictionary = (e, t) => {
      const n = t.length
      let i, r, a
      return K(e)
        ? S
        : ((i = e.state),
          0 !== i.wrap && i.mode !== N
            ? S
            : i.mode === N && ((r = 1), (r = _(r, t, n, 0)), r !== i.check)
            ? Z
            : ((a = ee(e, t, n, n)), a ? ((i.mode = 16210), D) : ((i.havedict = 1), A)))
    }),
    (l.inflateInfo = 'pako inflate (from Nodeca project)')
  var te = {}
  const ne = (e, t) => Object.prototype.hasOwnProperty.call(e, t)
  ;(te.assign = function (e) {
    const t = Array.prototype.slice.call(arguments, 1)
    for (; t.length; ) {
      const n = t.shift()
      if (n) {
        if ('object' != typeof n) throw new TypeError(n + 'must be non-object')
        for (const t in n) ne(n, t) && (e[t] = n[t])
      }
    }
    return e
  }),
    (te.flattenChunks = e => {
      let t = 0
      for (let n = 0, i = e.length; n < i; n++) t += e[n].length
      const n = new Uint8Array(t)
      for (let t = 0, i = 0, r = e.length; t < r; t++) {
        let r = e[t]
        n.set(r, i), (i += r.length)
      }
      return n
    })
  var ie = {}
  let re = !0
  try {
    String.fromCharCode.apply(null, new Uint8Array(1))
  } catch (e) {
    re = !1
  }
  const ae = new Uint8Array(256)
  for (let e = 0; e < 256; e++) ae[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1
  ;(ae[254] = ae[254] = 1),
    (ie.string2buf = e => {
      if ('function' == typeof TextEncoder && TextEncoder.prototype.encode) return new TextEncoder().encode(e)
      let t,
        n,
        i,
        r,
        a,
        o = e.length,
        s = 0
      for (r = 0; r < o; r++)
        (n = e.charCodeAt(r)),
          55296 == (64512 & n) &&
            r + 1 < o &&
            ((i = e.charCodeAt(r + 1)), 56320 == (64512 & i) && ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), r++)),
          (s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4)
      for (t = new Uint8Array(s), a = 0, r = 0; a < s; r++)
        (n = e.charCodeAt(r)),
          55296 == (64512 & n) &&
            r + 1 < o &&
            ((i = e.charCodeAt(r + 1)), 56320 == (64512 & i) && ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), r++)),
          n < 128
            ? (t[a++] = n)
            : n < 2048
            ? ((t[a++] = 192 | (n >>> 6)), (t[a++] = 128 | (63 & n)))
            : n < 65536
            ? ((t[a++] = 224 | (n >>> 12)), (t[a++] = 128 | ((n >>> 6) & 63)), (t[a++] = 128 | (63 & n)))
            : ((t[a++] = 240 | (n >>> 18)), (t[a++] = 128 | ((n >>> 12) & 63)), (t[a++] = 128 | ((n >>> 6) & 63)), (t[a++] = 128 | (63 & n)))
      return t
    })
  ;(ie.buf2string = (e, t) => {
    const n = t || e.length
    if ('function' == typeof TextDecoder && TextDecoder.prototype.decode) return new TextDecoder().decode(e.subarray(0, t))
    let i, r
    const a = new Array(2 * n)
    for (r = 0, i = 0; i < n; ) {
      let t = e[i++]
      if (t < 128) {
        a[r++] = t
        continue
      }
      let o = ae[t]
      if (o > 4) (a[r++] = 65533), (i += o - 1)
      else {
        for (t &= 2 === o ? 31 : 3 === o ? 15 : 7; o > 1 && i < n; ) (t = (t << 6) | (63 & e[i++])), o--
        o > 1 ? (a[r++] = 65533) : t < 65536 ? (a[r++] = t) : ((t -= 65536), (a[r++] = 55296 | ((t >> 10) & 1023)), (a[r++] = 56320 | (1023 & t)))
      }
    }
    return ((e, t) => {
      if (t < 65534 && e.subarray && re) return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t))
      let n = ''
      for (let i = 0; i < t; i++) n += String.fromCharCode(e[i])
      return n
    })(a, r)
  }),
    (ie.utf8border = (e, t) => {
      ;(t = t || e.length) > e.length && (t = e.length)
      let n = t - 1
      for (; n >= 0 && 128 == (192 & e[n]); ) n--
      return n < 0 || 0 === n ? t : n + ae[e[n]] > t ? n : t
    })
  const oe = l,
    se = te,
    le = ie,
    ce = {
      2: 'need dictionary',
      1: 'stream end',
      0: '',
      '-1': 'file error',
      '-2': 'stream error',
      '-3': 'data error',
      '-4': 'insufficient memory',
      '-5': 'buffer error',
      '-6': 'incompatible version'
    },
    de = function () {
      ;(this.input = null),
        (this.next_in = 0),
        (this.avail_in = 0),
        (this.total_in = 0),
        (this.output = null),
        (this.next_out = 0),
        (this.avail_out = 0),
        (this.total_out = 0),
        (this.msg = ''),
        (this.state = null),
        (this.data_type = 2),
        (this.adler = 0)
    },
    fe = function () {
      ;(this.text = 0),
        (this.time = 0),
        (this.xflags = 0),
        (this.os = 0),
        (this.extra = null),
        (this.extra_len = 0),
        (this.name = ''),
        (this.comment = ''),
        (this.hcrc = 0),
        (this.done = !1)
    },
    he = Object.prototype.toString,
    { Z_NO_FLUSH: ue, Z_FINISH: we, Z_OK: be, Z_STREAM_END: me, Z_NEED_DICT: ge, Z_STREAM_ERROR: ke, Z_DATA_ERROR: _e, Z_MEM_ERROR: pe } = k
  function ye(e) {
    this.options = se.assign({ chunkSize: 65536, windowBits: 15, to: '' }, e || {})
    const t = this.options
    t.raw && t.windowBits >= 0 && t.windowBits < 16 && ((t.windowBits = -t.windowBits), 0 === t.windowBits && (t.windowBits = -15)),
      !(t.windowBits >= 0 && t.windowBits < 16) || (e && e.windowBits) || (t.windowBits += 32),
      t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
      (this.err = 0),
      (this.msg = ''),
      (this.ended = !1),
      (this.chunks = []),
      (this.strm = new de()),
      (this.strm.avail_out = 0)
    let n = oe.inflateInit2(this.strm, t.windowBits)
    if (n !== be) throw new Error(ce[n])
    if (
      ((this.header = new fe()),
      oe.inflateGetHeader(this.strm, this.header),
      t.dictionary &&
        ('string' == typeof t.dictionary
          ? (t.dictionary = le.string2buf(t.dictionary))
          : '[object ArrayBuffer]' === he.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)),
        t.raw && ((n = oe.inflateSetDictionary(this.strm, t.dictionary)), n !== be)))
    )
      throw new Error(ce[n])
  }
  function ve(e, t) {
    const n = new ye(t)
    if ((n.push(e), n.err)) throw n.msg || ce[n.err]
    return n.result
  }
  ;(ye.prototype.push = function (e, t) {
    const n = this.strm,
      i = this.options.chunkSize,
      r = this.options.dictionary
    let a, o, s
    if (this.ended) return !1
    for (
      o = t === ~~t ? t : !0 === t ? we : ue,
        '[object ArrayBuffer]' === he.call(e) ? (n.input = new Uint8Array(e)) : (n.input = e),
        n.next_in = 0,
        n.avail_in = n.input.length;
      ;

    ) {
      for (
        0 === n.avail_out && ((n.output = new Uint8Array(i)), (n.next_out = 0), (n.avail_out = i)),
          a = oe.inflate(n, o),
          a === ge && r && ((a = oe.inflateSetDictionary(n, r)), a === be ? (a = oe.inflate(n, o)) : a === _e && (a = ge));
        n.avail_in > 0 && a === me && n.state.wrap > 0 && 0 !== e[n.next_in];

      )
        oe.inflateReset(n), (a = oe.inflate(n, o))
      switch (a) {
        case ke:
        case _e:
        case ge:
        case pe:
          return this.onEnd(a), (this.ended = !0), !1
      }
      if (((s = n.avail_out), n.next_out && (0 === n.avail_out || a === me)))
        if ('string' === this.options.to) {
          let e = le.utf8border(n.output, n.next_out),
            t = n.next_out - e,
            r = le.buf2string(n.output, e)
          ;(n.next_out = t), (n.avail_out = i - t), t && n.output.set(n.output.subarray(e, e + t), 0), this.onData(r)
        } else this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out))
      if (a !== be || 0 !== s) {
        if (a === me) return (a = oe.inflateEnd(this.strm)), this.onEnd(a), (this.ended = !0), !0
        if (0 === n.avail_in) break
      }
    }
    return !0
  }),
    (ye.prototype.onData = function (e) {
      this.chunks.push(e)
    }),
    (ye.prototype.onEnd = function (e) {
      e === be && ('string' === this.options.to ? (this.result = this.chunks.join('')) : (this.result = se.flattenChunks(this.chunks))),
        (this.chunks = []),
        (this.err = e),
        (this.msg = this.strm.msg)
    }),
    (s.Inflate = ye),
    (s.inflate = ve),
    (s.inflateRaw = function (e, t) {
      return ((t = t || {}).raw = !0), ve(e, t)
    }),
    (s.ungzip = ve),
    (s.constants = k)
  const Ee = Uint16Array.BYTES_PER_ELEMENT,
    xe = Int32Array.BYTES_PER_ELEMENT,
    Re = Uint32Array.BYTES_PER_ELEMENT,
    Ae = { METADATA: 0, TERRAIN: 1, DBROOT: 2 }
  Ae.fromString = function (e) {
    return 'Metadata' === e ? Ae.METADATA : 'Terrain' === e ? Ae.TERRAIN : 'DbRoot' === e ? Ae.DBROOT : void 0
  }
  const Te = 1953029805,
    Ue = 2917034100
  return n(function (t, n) {
    const r = Ae.fromString(t.type)
    let a = t.buffer
    i(t.key, a)
    const l = (function (t) {
      const n = new DataView(t)
      let i = 0
      const r = n.getUint32(i, !0)
      if (((i += Re), r !== Te && r !== Ue)) throw new e.RuntimeError('Invalid magic')
      const a = n.getUint32(i, r === Te)
      i += Re
      const o = new Uint8Array(t, i),
        l = s.inflate(o)
      if (l.length !== a) throw new e.RuntimeError("Size of packet doesn't match header")
      return l
    })(a)
    a = l.buffer
    const c = l.length
    switch (r) {
      case Ae.METADATA:
        return (function (t, n, i) {
          const r = new DataView(t)
          let a = 0
          const s = r.getUint32(a, !0)
          if (((a += Re), 32301 !== s)) throw new e.RuntimeError('Invalid magic')
          const l = r.getUint32(a, !0)
          if (((a += Re), 1 !== l)) throw new e.RuntimeError('Invalid data type. Must be 1 for QuadTreePacket')
          const c = r.getUint32(a, !0)
          if (((a += Re), 2 !== c)) throw new e.RuntimeError('Invalid QuadTreePacket version. Only version 2 is supported.')
          const d = r.getInt32(a, !0)
          a += xe
          const f = r.getInt32(a, !0)
          if (((a += xe), 32 !== f)) throw new e.RuntimeError('Invalid instance size.')
          const h = r.getInt32(a, !0)
          a += xe
          const u = r.getInt32(a, !0)
          a += xe
          const w = r.getInt32(a, !0)
          if (((a += xe), h !== d * f + a)) throw new e.RuntimeError('Invalid dataBufferOffset')
          if (h + u + w !== n) throw new e.RuntimeError('Invalid packet offsets')
          const b = []
          for (let e = 0; e < d; ++e) {
            const e = r.getUint8(a)
            ++a, ++a
            const t = r.getUint16(a, !0)
            a += Ee
            const n = r.getUint16(a, !0)
            a += Ee
            const i = r.getUint16(a, !0)
            ;(a += Ee), (a += Ee), (a += Ee), (a += xe), (a += xe), (a += 8)
            const s = r.getUint8(a++),
              l = r.getUint8(a++)
            ;(a += Ee), b.push(new o(e, t, n, i, s, l))
          }
          const m = []
          let g = 0
          function k(e, t, n) {
            let i = !1
            if (4 === n) {
              if (t.hasSubtree()) return
              i = !0
            }
            for (let r = 0; r < 4; ++r) {
              const a = e + r.toString()
              if (i) m[a] = null
              else if (n < 4)
                if (t.hasChild(r)) {
                  if (g === d) return void console.log('Incorrect number of instances')
                  const e = b[g++]
                  ;(m[a] = e), k(a, e, n + 1)
                } else m[a] = null
            }
          }
          let _ = 0
          const p = b[g++]
          '' === i ? ++_ : (m[i] = p)
          return k(i, p, _), m
        })(a, c, t.quadKey)
      case Ae.TERRAIN:
        return (function (t, n, i) {
          const r = new DataView(t),
            a = function (t) {
              for (let i = 0; i < 4; ++i) {
                const i = r.getUint32(t, !0)
                if (((t += Re), (t += i) > n)) throw new e.RuntimeError('Malformed terrain packet found.')
              }
              return t
            }
          let o = 0
          const s = []
          for (; s.length < 5; ) {
            const e = o
            o = a(o)
            const n = t.slice(e, o)
            i.push(n), s.push(n)
          }
          return s
        })(a, c, n)
      case Ae.DBROOT:
        return n.push(a), { buffer: a }
    }
  })
})
