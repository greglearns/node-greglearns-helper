var inspect = require('eyespect').inspector()
var util = require('util')

var fakeLog = {
  info: function(){},
  error: function(){},
  child: function(){ return fakeLog },
  trace: function(){}
}

var exports = {
  fakeLogger: fakeLog,
  asyncCatch: asyncCatch,
  show: show,
  tap: tap,
  clone: clone,
  tryJSON: tryJSON,
  onKeys: onKeys,
  Object_values: Object_values,
  forEachKey: forEachKey,
  helpWithOverrides: helpWithOverrides,
  merge: merge
}

module.exports = exports

function asyncCatch(fn, cb) {
  return function() {
    try {
      fn.apply(null, Array.prototype.slice.call(arguments))
    } catch (e) {
      show('Async error occurred:', e)
      cb(e)
    }
  }
}

function forEachKey(obj, cb) {
  Object.keys(obj).map(function(key){ return obj[key] }).forEach(function(x) { cb(x) })
}

function helpWithOverrides() {
  // Useful if you have multiple helpers in a project
  var helpWithOverrides = {}
  helpWithOverrides.__proto__ = exports
  return helpWithOverrides
}

function show() {
  var args = Array.prototype.slice.call(arguments);
  console.log('--------------------')
  var condensed = arguments.length === 2 && typeof arguments[0] === 'string'
  if (condensed) {
    util.print(arguments[0] + ': ')
    inspect(arguments[1])
  } else {
    args.forEach(function(thing) {
      inspect(thing)
      // console.dir(thing)
    })
  }
  console.log('--------------------')
}

function tap(obj) {
  show(obj)
  return obj
}

function merge(base) {
  // Last object wins: Fields in the arguments on the right overwrite object keys on the left
  if (!base) { return {} }
  return Array.prototype.slice.call(arguments).reduce(mergeOne)
  function mergeOne(to, from) {
    Object.keys(from).forEach(function(attr) { to[attr] = from[attr] })
    return to
  }
}


function onKeys(o, fn) {
  return Object.keys(o).map(function(key, index) {
    return fn(key, o[key], index)
  })
}

function Object_values(obj) {
  return Object.keys(obj).map(function(key) { return obj[key] })
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function tryJSON(thing) {
  try{ return JSON.parse(thing)
  } catch(e) { return thing }
}
