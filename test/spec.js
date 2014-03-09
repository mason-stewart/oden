/**
 * oden.js
 *
 * The Specs™
 */

'use strict'

var assert = require('assert'),
  chai = require('chai'),
  _ = require('underscore'),
  ƒ = require('../lib/oden'),
  expect = chai.expect;


describe('Return values should be identical to Underscore for methods that', function() {
  it('take a function as their second argument', function() {

    // A few different stubbed out iterators.
    var mappyFn = function(x) { return x + 10 };
    var truthyFn = function(x) { return x === 1 };
    var sortyFn = function(x) { return x > 1 };

    // A fake Array.
    var coll = [1, 2, 3];

    // Expect each of the following _ methods to have
    // the same return value as their ƒ counterpart.
    expect( _.each    (coll, mappyFn)   ).to.deep.equal( ƒ.each     (mappyFn, coll)   );
    expect( _.map     (coll, mappyFn)   ).to.deep.equal( ƒ.map      (mappyFn, coll)   );
    expect( _.find    (coll, truthyFn)  ).to.deep.equal( ƒ.find     (truthyFn, coll)  );
    expect( _.filter  (coll, mappyFn)   ).to.deep.equal( ƒ.filter   (mappyFn, coll)   );
    expect( _.reject  (coll, truthyFn)  ).to.deep.equal( ƒ.reject   (truthyFn, coll)  );
    expect( _.sortBy  (coll, sortyFn)   ).to.deep.equal( ƒ.sortBy   (sortyFn, coll)   );
    expect( _.groupBy (coll, sortyFn)   ).to.deep.equal( ƒ.groupBy  (sortyFn, coll)   );
    expect( _.indexBy (coll, sortyFn)   ).to.deep.equal( ƒ.indexBy  (sortyFn, coll)   );
    expect( _.countBy (coll, sortyFn)   ).to.deep.equal( ƒ.countBy  (sortyFn, coll)   );
    expect( _.times   (3, mappyFn)      ).to.deep.equal( ƒ.times    (mappyFn, 3)   );
  })

  it('should remain unchanged', function(){

    // The running list of properties and methods 
    // that oden has changed.
    var changed = [
      '_',
      'VERSION',
      'noConflict',
      'each',
      'map',
      'find',
      'filter',
      'reject',
      'sortBy',
      'groupBy',
      'indexBy',
      'countBy',
      'times'
    ]

    // Unless it's in the list above, every method in ƒ
    // should be the exact same object in memory as its
    // _ counterpart.
    _.each(_.prototype,  function(method, key){
      if (!_.contains(changed, key)){
        expect(_[key]).to.equal(ƒ[key]);
      }
    });

  });
});