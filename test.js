var assert = require('assert')
var plugin = require('./index.js')
var describe = require('mocha').describe
var it = require('mocha').it

describe('plugin', function () {
  var collection = plugin('test', [function (pages) {
    pages.push('a')

    return Promise.resolve(pages)
  }])

  it('should act on all desired properties as if they are pages', function (done) {
    var promise = collection([{}, {}, {}])

    assert.ok(promise instanceof Promise)

    promise.then(function (pages) {
      assert.deepEqual(pages, [ { test: ['a'] }, { test: ['a'] }, { test: ['a'] } ])

      done()
    })
      .catch(done)
  })

  it('should append to existing property that is an array', function (done) {
    var promise = collection([{test: ['b']}])

    assert.ok(promise instanceof Promise)

    promise.then(function (pages) {
      assert.deepEqual(pages, [ { test: ['b', 'a'] } ])

      done()
    })
      .catch(done)
  })

  it('should replace existing property that is not an array', function (done) {
    var promise = collection([{test: 'a'}])

    assert.ok(promise instanceof Promise)

    promise.then(function (pages) {
      assert.deepEqual(pages, [ { test: ['a'] } ])

      done()
    })
      .catch(done)
  })
})
