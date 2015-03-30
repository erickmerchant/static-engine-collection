# static-engine-collection

[![Dependency Status](https://david-dm.org/erickmerchant/static-engine-collection.svg?style=flat-square)](https://david-dm.org/erickmerchant/static-engine-collection) [![devDependency Status](https://david-dm.org/erickmerchant/static-engine-collection/dev-status.svg?style=flat-square)](https://david-dm.org/erickmerchant/static-engine-collection#info=devDependencies)

This is a plugin for [static-engine](https://github.com/erickmerchant/static-engine). It adds a property to each object in the array that is the result of static engine plugins. Call it with the name of the property and an array of plugins. It returns a function that can be used with static-engine.

```javascript

var engine = require('static-engine');
var collection = require('static-engine-collection');
var pluginA = require('plugin-a');
var pluginB = require('plugin-b');
var pluginC = require('plugin-c');

engine([
    pluginA,
    collection('example', [ pluginB, pluginC ])
]);

```
