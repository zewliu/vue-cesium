define(['exports', './defaultValue-0a909f67'], function (e, t) {
  'use strict'
  e.combine = function e(n, o, f) {
    f = t.defaultValue(f, !1)
    const r = {},
      i = t.defined(n),
      a = t.defined(o)
    let s, u, c
    if (i)
      for (s in n)
        n.hasOwnProperty(s) &&
          ((u = n[s]),
          a && f && 'object' == typeof u && o.hasOwnProperty(s) ? ((c = o[s]), (r[s] = 'object' == typeof c ? e(u, c, f) : u)) : (r[s] = u))
    if (a) for (s in o) o.hasOwnProperty(s) && !r.hasOwnProperty(s) && ((c = o[s]), (r[s] = c))
    return r
  }
})
