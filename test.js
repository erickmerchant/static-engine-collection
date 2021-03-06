var plugin = require('./index.js')
var test = require('tape')

var collection = plugin('test', [ function (pages) {
  pages.push('a')

  return Promise.resolve(pages)
} ])

test('should act on all desired properties as if they are pages', function (t) {
  var promise = collection([{}, {}, {}])

  t.ok(promise instanceof Promise)

  promise.then(function (pages) {
    t.deepEqual(pages, [ { test: ['a'] }, { test: ['a'] }, { test: ['a'] } ])

    t.end()
  })
  .catch(t.end)
})

test('should append to existing property that is an array', function (t) {
  var promise = collection([{test: ['b']}])

  t.ok(promise instanceof Promise)

  promise.then(function (pages) {
    t.deepEqual(pages, [ { test: ['b', 'a'] } ])

    t.end()
  })
  .catch(t.end)
})

test('should replace existing property that is not an array', function (t) {
  var promise = collection([{test: 'a'}])

  t.ok(promise instanceof Promise)

  promise.then(function (pages) {
    t.deepEqual(pages, [ { test: ['a'] } ])

    t.end()
  })
  .catch(t.end)
})
