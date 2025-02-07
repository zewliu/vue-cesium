define(['exports', './defaultValue-0a909f67', './Math-e97915da'], function (e, n, t) {
  'use strict'
  const d = t.CesiumMath.EPSILON10
  e.arrayRemoveDuplicates = function (e, t, i, f) {
    if (!n.defined(e)) return
    i = n.defaultValue(i, !1)
    const u = n.defined(f),
      s = e.length
    if (s < 2) return e
    let l,
      a,
      r,
      c = e[0],
      h = 0,
      o = -1
    for (l = 1; l < s; ++l)
      (a = e[l]),
        t(c, a, d)
          ? (n.defined(r) || ((r = e.slice(0, l)), (h = l - 1), (o = 0)), u && f.push(l))
          : (n.defined(r) && (r.push(a), (h = l), u && (o = f.length)), (c = a))
    return (
      i && t(e[0], e[s - 1], d) && (u && (n.defined(r) ? f.splice(o, 0, h) : f.push(s - 1)), n.defined(r) ? (r.length -= 1) : (r = e.slice(0, -1))),
      n.defined(r) ? r : e
    )
  }
})
