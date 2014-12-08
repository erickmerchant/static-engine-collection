var Promise = require('es6-promise').Promise;
var engine = require('static-engine');
var engine = require('static-engine-series');

module.exports = function (name, plugins) {

    plugins = series(plugins);

    return function (pages) {

        var promises = pages.map(function (page) {

            return new Promise(function(resolve, reject){

                var current_pages = page[name] && Array.isArray(page[name]) ? page[name] : [];

                plugins(current_pages).then(function (pages) {

                    page[name] = pages;

                    resolve(page);
                });
            });
        });

        return Promise.all(promises).then(function(results){

            var pages = [];

            Array.prototype.push.apply(pages, results);

            return Promise.resolve(pages);
        });
    };
};
