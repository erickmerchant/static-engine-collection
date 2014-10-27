var assert = require('chai').assert;
var Q = require('q');
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

    describe('when the property already exists and is an array', function(){

        it('should work with it', function(done){

            plugin([{}, {test: ['b']}, {}], function(pages){

                assert.deepEqual(pages, [ { test: ['a'] }, { test: ['b', 'a'] }, { test: ['a'] } ]);

                done();
            });
        });
    });

    describe('when the property already exists but is not an array', function(){

        it('should replace it', function(done){

            plugin([{}, {test: 'a'}, {}], function(pages){

                assert.deepEqual(pages, [ { test: ['a'] }, { test: ['a'] }, { test: ['a'] } ]);

                done();
            });
        });
    });
});
