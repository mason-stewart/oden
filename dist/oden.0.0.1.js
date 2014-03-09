/*! oden - v0.0.1 - 2014-03-09
* https://github.com/masondesu/oden
* Copyright (c) 2014 Mason Stewart; Licensed MIT */

//    ____     ______      _____      __      _  
//   / __ \   (_  __ \    / ___/     /  \    / ) 
//  / /  \ \    ) ) \ \  ( (__      / /\ \  / /  
// ( ()  () )  ( (   ) )  ) __)     ) ) ) ) ) )  
// ( ()  () )   ) )  ) ) ( (       ( ( ( ( ( (   
//  \ \__/ /   / /__/ /   \ \___   / /  \ \/ /   
//   \____/   (______/     \____\ (_/    \__/    
//
// ## Accept iterators as the *first* argument on your favorite Underscore.js methods!                                              

// Uses Node/CommonJS exports, AMD, or browser globals to create a module.
// Defines the "oden" module.

(function(root, factory) {
  'use strict';
  
  // Set up module appropriately for the environment.
  if (typeof exports !== 'undefined') {
    // Node/CommonJS
    factory(root, exports, require('underscore'));

  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['underscore', 'exports'], function(_, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global oden.
      root.oden = factory(root, exports, _);
    });
  } else {
    // Browser globals
    root.oden = factory(root, {}, root._);
  }

}(this, function(root, oden, _) {
  'use strict';

  // Save the previous value of the `ƒ` variable and create shortcut to `ƒ`
  var previousƒ = root.ƒ;
  root.ƒ = oden;

  // The list of functions whose arguments we want to rearrange.
  // First off, the easy ones in which we only need to swap the
  // two arguments
  var swapTwo = [
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
  ];

  // Give the oden object each of _'s methods.
  _.each(_.prototype, function(method, key) {
    oden[key] = _[key];
  });

  // Uses a closure to swap the first two args of each method
  // in this list.
  _.each(swapTwo, function(key) {
    oden[key] = function(fn, target) {
      var args = Array.prototype.slice.call(arguments).slice(3);
      args = args.length ? args : undefined;

      return _[key].apply(_, [target, fn].concat(args));
    };
  });

  // make sure to overwrite any VERSION prop that was
  // slurped up from the host _
  oden.VERSION = '0.0.1';

  // Refer to oden instead of _ internaly
  oden._ = oden;

  oden.noConflict = function() {
    root.ƒ = previousƒ;
    return this;
  };

  return oden;
}));