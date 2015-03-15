var assert = require('chai').assert;
var collection = require('../index.js');

describe('plugin', function(){

    var plugin = collection('test', [function(pages){

        pages.push('a');

        return Promise.resolve(pages);
    }]);

    it('should act on all desired properties as if they are pages', function(done){

        plugin([{}, {}, {}]).then(function(pages){

            assert.deepEqual(pages, [ { test: ['a'] }, { test: ['a'] }, { test: ['a'] } ]);

            done();
        })
        .catch(done);
    });

    it('should append to existing property that is an array', function(done){

        plugin([{test: ['b']}]).then(function(pages){

            assert.deepEqual(pages, [ { test: ['b', 'a'] } ]);

            done();
        })
        .catch(done);
    });

    it('should replace existing property that is not an array', function(done){

        plugin([{test: 'a'}]).then(function(pages){

            assert.deepEqual(pages, [ { test: ['a'] } ]);

            done();
        })
        .catch(done);
    });
});
