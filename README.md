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

The above example *is* cool, but it gets less elegant when composing methods like `_.map` and `_.reject`. Partial application can make this better, but partial application in JavaScript can be a little bit verbose. Observe:

```javascript
// Just flat out composing these two methods is way gross.
_.reject(_.map([8.56, 9.63], 
               function(x) { 
                return x * 1.07 
               }), 
        function(x) { 
          return x > 10
        });

// Using _.compose plus partial application is better, 
// but this is still undesirable, and gets heftier 
// with deeply composed functions.
var mapSalesTax = function(){ 
  return function(coll){
    return _.map(coll, function(x) { return x * 1.07 })
  }
};

var rejectExpensiveItems = function(){ 
  return function(coll){
    return _.reject(coll, function(x) { return x > 10})
  }
};

var affordableItems = _.compose(rejectExpensiveItems(), mapSalesTax());
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

?

### Use

On a Mac, you can type the `ƒ` character with <kbd>option</kbd>+<kbd>f</kbd>. I don't have a Windows machine, but according to the Internet™ the shortcut is <kbd>alt</kbd>+<kbd>159</kbd>. The identical `oden` object is available, too, of course.

### Contributing

If you're not completely offended by this little library, please consider contributing. It's really an expirement, and only offers minimal syntactic improvements for a very niche issue. If you have an idea of how to actually make Oden.js useful, submit a pull request :sparkles:

### BTW, what's the name mean?

This library is named after the wonderful, traditional Japanese winter food that goes by the same name (おでん). Image credit: [Nihon Sun](http://www.nihonsun.com/2008/11/20/an-ode-to-oden-comfort-food-from-japan/).

### License

Oden.js is licensed under the The MIT License (MIT)

Copyright (c) 2014 [Mason Stewart](https://twitter.com/masondesu)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

