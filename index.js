var engine = require('static-engine');

module.exports = function (name, plugins) {

    if(!Array.isArray(plugins) || arguments.length > 2) {

        plugins = [].slice.call(arguments, 1);
    }

    return function (pages) {

        return Promise.all(

            pages.map(function (page) {

                return new Promise(function(resolve, reject){

                    var pluginsPlus = plugins.slice(0);

                    if(page[name] && Array.isArray(page[name])) {

                        pluginsPlus.unshift(function(pages, done) {

                            done(null, page[name]);
                        });
                    }

                    engine(pluginsPlus).then(function (pages) {

                        page[name] = pages[0];

                        resolve(page);
                    })
                    .catch(reject);
                });
            })
        );
    };
};
