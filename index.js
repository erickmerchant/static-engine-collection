var Promise = require('es6-promise').Promise;
var engine = require('static-engine');

module.exports = function (name, plugins) {

    return function (pages) {

        var promises = pages.map(function (page) {

            return new Promise(function(resolve, reject){

                var current_pages = page[name] && Array.isArray(page[name]) ? page[name] : [];

                var formula = [ plugins.slice(0) ];

                formula[0].unshift(function(){

                    return Promise.resolve(current_pages);
                });

                engine(formula).then(function (pages) {

                    page[name] = pages[0];

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
