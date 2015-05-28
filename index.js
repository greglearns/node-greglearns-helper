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
  if (!base) { return {} }
  return Array.prototype.slice.call(arguments).reduce(mergeOne)
  function mergeOne(to, from) {
    Object.keys(from).forEach(function(attr) { to[attr] = from[attr] })
    return to
  }
}

function onKeys(o, fn) {
  Object.keys(o).forEach(function(key, index) {
    fn(key, o[key], index)
  })
}
