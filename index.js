var Promise = require('es6-promise').Promise;

module.exports = function (name, plugin) {

    return function (pages, next) {

        var promises = pages.map(function (page) {

            return new Promise(function(resolve, reject){

                var current = page[name] && Array.isArray(page[name]) ? page[name] : [];

                plugin(current, function (collection) {

                    page[name] = collection;

                    resolve(page);
                });
            });
        });

        Promise.all(promises).then(function(results){

            var pages = [];

            Array.prototype.push.apply(pages, results);

            next(pages);
        });
    };
};
