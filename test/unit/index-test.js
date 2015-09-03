var expect = require('chai').expect
var subject = require('../../index')

describe('object get/set helper function', function() {
  describe('set', function() {


    it('can set a value', function() {
      var obj = {}
      subject.set(obj, [ 'some', 'path' ], 42)
      expect( obj ).to.eql({ some: { path: 42 } })
    })

    it('setting a value requires a path', function() {
      var obj = {}
      expect( function() { subject.set(obj, [ ], 42) } ).to.throw(Error)
      expect( function() { subject.set(obj, [ ], 42) } ).to.throw(/path/)
    })
  })

  describe('get', function() {


    it('can get a value', function() {
      var obj = {}
      subject.set(obj, [ 'some', 'path' ], 42)
      expect( subject.get(obj, [ 'some', 'path' ]) ).to.eql(42)
    })

    it('can get a value at the root', function() {
      var obj = {}
      subject.set(obj, [ 'some', 'path' ], 42)
      expect( subject.get(obj, [ ]) ).to.eql({ some: { path: 42 } })
    })
  })

  describe('del', function() {


    it('can delete a path', function() {
      var obj = {}
      subject.set(obj, [ 'some', 'path' ], 42)
      subject.set(obj, [ 'some', 'otherpath' ], 100)
      subject.del(obj, [ 'some', 'path' ])
      expect( obj ).to.eql({ some: { otherpath: 100 }})
    })

    it('can delete a path and clean up empty paths', function() {
      var obj = {}
      subject.set(obj, [ 'some', 'path' ], 42)
      subject.set(obj, [ 'some', 'otherpath' ], 100)

      subject.del(obj, [ 'some', 'path' ])
      subject.del(obj, [ 'some', 'otherpath' ])
      expect( obj ).to.eql({})
    })

    it('can delete a path and clean up deeply empty paths', function() {
      var obj = {}
      subject.set(obj, [ 'some', 'path', 'that', 'is', 'long' ], 42)

      subject.del(obj, [ 'some', 'path', 'that', 'is', 'long' ])
      expect( obj ).to.eql({})
    })

    it('can delete a path and clean up empty paths, leaving good data', function() {
      var obj = {}
      subject.set(obj, [ 'some', 'path', 'that', 'is', 'long' ], 42)
      subject.set(obj, [ 'some', 'keepThis' ], 'data')

      subject.del(obj, [ 'some', 'path', 'that', 'is', 'long' ])
      expect( obj ).to.eql({ some: { keepThis: 'data' }})
    })
  })

})

