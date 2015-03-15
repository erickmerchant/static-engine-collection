var engine = require('static-engine');

module.exports = function (name, plugins) {

    if(!Array.isArray(plugins) || arguments.length > 2) {

        plugins = [].slice.call(arguments, 1);
    }

    return function (pages) {

        return Promise.all(

            pages.map(function (page) {

                return new Promise(function(resolve, reject){

                    var plugins_plus = plugins.slice(0);

                    if(page[name] && Array.isArray(page[name])) {

                        plugins_plus.unshift(function(pages, done) {

                            done(null, page[name]);
                        });
                    }

                    engine(plugins_plus).then(function (pages) {

                        page[name] = pages[0];

                        resolve(page);
                    })
                    .catch(reject);
                });
            })
        );
    };
};
