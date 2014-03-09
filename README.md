# Oden.js

## Accept iterators as the *first* argument on your favorite Underscore.js methods!

!["Mmmmmmmmm.... Oden!"](http://www.nihonsun.com/wp-content/uploads/2008/11/image11.png)

[![Build Status](https://secure.travis-ci.org/masondesu/oden.png?branch=master)](http://travis-ci.org/masondesu/oden)

Ever wish you could provide the iterator as the first argument to Underscore's `map` method? Now you can with Oden.js. It's as easy as:

```javascript
ƒ.map(function(x){ return x + 10 }, [1,2,3]);
```

### Why?

If you spend a lot of time in [Clojure](http://clojure.org/), you'll get used to the threading macros ([`->>`](http://clojuredocs.org/clojure_core/clojure.core/-%3E%3E) and [`->`](http://clojuredocs.org/clojure_core/clojure.core/-%3E)) that make function composition silky smooth. Underscore provides similar functionality with `_.compose`. The [example](http://underscorejs.org/#compose) from Underscore's docs is:

```javascript
var greet    = function(name){ return "hi: " + name; };
var exclaim  = function(statement){ return statement.toUpperCase() + "!"; };
var welcome = _.compose(greet, exclaim);
welcome('moe');
// returns 'hi: MOE!'
```

Seems cool, right?

### The Problem

The above example *is* cool, but it gets less elegant when composing methods like `_.map` and `_.reject`. Partial application and/or function wrapping can make this better, but partial either solution can be a little bit verbose. Observe:

```javascript
// Just flat out composing these two methods is way gross.
_.reject(_.map([8.56, 9.63], 
               function(x) { 
                return x * 1.07 
               }), 
        function(x) { 
          return x > 10
        });

// Using _.compose is better,  but this is still undesirable,
// and gets heftier with deeply composed functions. 
// (N.B.: Partial application *could* be used here to allow the iterators 
// to be defined on the fly, but that gets even messier.)
var mapSalesTax = function(coll){
  return _.map(coll, function(x) { return x * 1.07 })
};

var rejectExpensiveItems = function(coll){
  return _.reject(coll, function(x) { return x > 10})
};

var affordableItems = _.compose(rejectExpensiveItems, mapSalesTax);
affordableItems([8, 9, 10, 11]);
// returns [8.56, 9.63]
```

### The Solution(?)

Oden makes this a little less painful (I hope?):

```javascript
ƒ.reject(function(x) { return x > 10},
         ƒ.map(function(x) { return x * 1.07 },
               [8, 9, 10, 11]));

// returns [8.56, 9.63]
```

And it gets even better in CoffeeScript:

```coffeescript
ƒ.reject (
  (x) -> x > 10), 
  ƒ.map(
    (x) -> x * 1.07, 
    [8, 9, 10, 11])
```

Or if you like LISP-y CoffeeScript:

```coffeescript
(ƒ.reject ((x) -> x > 10), (ƒ.map ((x) -> x * 1.07), [8, 9, 10, 11]))
```

### What's included?

Oden supports a number of functions from Underscore. It doesn't make sense to swap the first two arguments of every method, but here are the few that have been implemented so far: `each`, `map`, `find`, `filter`, `reject`, `sortBy`, `groupBy`, `indexBy`, `countBy`, and `times`.

Each of these "swapped" methods are available under the `ƒ` and `oden` namespaces. Call `oden.noConflict()` to make Oden "give back" the `ƒ` global to its original owner (if it existed before Oden was loaded).

Aside from the ten methods listed above, `ƒ.VERSION`, `ƒ._`, and `ƒ.noConflict`, all unchanged Underscore methods are also available via the `ƒ` object.

### Installation

Oden should work fine in both Node.js and browsers. It supports AMD, Node-style module exports, and plain old in-browser globals. Its only dependency is Underscore.js (lodash coming soon!), so make sure you've loaded that first.

For front end use:

`bower install oden`

or as a Node.js module (note the trailing `.js` in the module name):

`npm install oden.js`

After that require the module or load it via script tags and you're ready to go.

### Use

On a Mac, you can type the `ƒ` character with <kbd>option</kbd>+<kbd>f</kbd>. I don't have a Windows machine, but according to the Internet™ the shortcut is <kbd>alt</kbd>+<kbd>159</kbd>. The identical `oden` object is available, too, of course.

### Contributing

If you're not completely offended by this little library, please consider contributing. It's really an expirement, and only offers minimal syntactic improvements for a very niche issue. If you have an idea of how to actually make Oden.js useful, submit a pull request :sparkles:

### BTW, what's the name mean?

This library is named after the wonderful, traditional Japanese winter food that goes by the same name: おでん. 

Image credit: [Nihon Sun](http://www.nihonsun.com/2008/11/20/an-ode-to-oden-comfort-food-from-japan/).

### License

Oden.js is licensed under the The MIT License (MIT)

Copyright (c) 2014 [Mason Stewart](https://twitter.com/masondesu) See [LICENSE](https://github.com/masondesu/oden/blob/master/LICENSE) for more details.
