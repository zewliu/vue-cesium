define(['exports', './defaultValue-0a909f67'], function (t, e) {
  'use strict'
  t.GeometryAttributes = function (t) {
    ;(t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)),
      (this.position = t.position),
      (this.normal = t.normal),
      (this.st = t.st),
      (this.bitangent = t.bitangent),
      (this.tangent = t.tangent),
      (this.color = t.color)
  }
})
