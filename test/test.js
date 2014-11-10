var assert = require('chai').assert;
var collection = require('../index.js');

describe('plugin', function(){

    var plugin = collection('test', function(pages, next){

        pages.push('a');

        next(pages);
    });

    it('should act on all desired properties as if they are pages', function(done){

        plugin([{}, {}, {}], function(pages){

            assert.deepEqual(pages, [ { test: ['a'] }, { test: ['a'] }, { test: ['a'] } ]);

            done();
        });
    });

    it('should append to existing property that is an array', function(done){

        plugin([{test: ['b']}], function(pages){

            assert.deepEqual(pages, [ { test: ['b', 'a'] } ]);

            done();
        });
    });

    it('should replace existing property that is not an array', function(done){

        plugin([{test: 'a'}], function(pages){

            assert.deepEqual(pages, [ { test: ['a'] } ]);

            done();
        });
    });
});
