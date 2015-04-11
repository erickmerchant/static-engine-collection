var engine = require('static-engine')

module.exports = function (name, plugins) {
  return function (pages) {
    pages = pages.map(function (page) {
      return new Promise(function (resolve, reject) {
        var pluginsCopy = plugins.slice(0)

        if (page[name] && Array.isArray(page[name])) {
          pluginsCopy.unshift(function (pages, done) {
            done(null, page[name])
          })
        }

        engine(pluginsCopy).then(function (pages) {
          page[name] = pages[0]

          resolve(page)
        })
        .catch(reject)
      })
    })

    return Promise.all(pages)
  }
}
