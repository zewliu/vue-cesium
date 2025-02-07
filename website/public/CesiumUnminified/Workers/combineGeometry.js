define([
  './PrimitivePipeline-5640850a',
  './createTaskProcessorWorker',
  './Transforms-a05e5e6e',
  './Matrix3-315394f6',
  './Check-666ab1a0',
  './defaultValue-0a909f67',
  './Math-2dbd6b93',
  './Matrix2-13178034',
  './RuntimeError-06c93819',
  './combine-ca22a614',
  './ComponentDatatype-f7b11d02',
  './WebGLConstants-a8cc3e8c',
  './GeometryAttribute-334718f8',
  './GeometryAttributes-f06a2792',
  './GeometryPipeline-8fb0db69',
  './AttributeCompression-b646d393',
  './EncodedCartesian3-81f70735',
  './IndexDatatype-a55ceaa1',
  './IntersectionTests-27d49265',
  './Plane-900aa728',
  './WebMercatorProjection-13a90d41'
], function (
  PrimitivePipeline,
  createTaskProcessorWorker,
  Transforms,
  Matrix3,
  Check,
  defaultValue,
  Math,
  Matrix2,
  RuntimeError,
  combine,
  ComponentDatatype,
  WebGLConstants,
  GeometryAttribute,
  GeometryAttributes,
  GeometryPipeline,
  AttributeCompression,
  EncodedCartesian3,
  IndexDatatype,
  IntersectionTests,
  Plane,
  WebMercatorProjection
) {
  'use strict'

  function combineGeometry(packedParameters, transferableObjects) {
    const parameters = PrimitivePipeline.PrimitivePipeline.unpackCombineGeometryParameters(packedParameters)
    const results = PrimitivePipeline.PrimitivePipeline.combineGeometry(parameters)
    return PrimitivePipeline.PrimitivePipeline.packCombineGeometryResults(results, transferableObjects)
  }
  var combineGeometry$1 = createTaskProcessorWorker(combineGeometry)

  return combineGeometry$1
})
