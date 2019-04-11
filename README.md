# parallel-each
A parallel, asynchronous implementation of forEach/map in ES6 with a configurable maximum degree of parallelism.

Excellent for use in API integrations (to avoid rate limiting) or parallel database processing (via connection pool for instance).

Works with all types of callbacks (sync or async), but really shines with long-running async callbacks.

For use in any ES6 environment (browser or node.js).

## Installation
* `npm i parallel-each`

## Usage
* `peach(array, callback, chunkSize);` - `Array`, `Function`, `(optional) Number` - returns any items (and their indexes and error reasons) whose callbacks may have errored.
* `callback(item, index, array)` - callback to process each item of array.
* `chunkSize` - maximum degress of parallelism in which to process array.

## Examples
```
const peach = require('parallel-each');

const asyncFn = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 1);
});

var collection = [];
for (var i = 0; i < (Math.pow(10, power)); i++) {
    collection.push({
        index: i,
        item: `item_${i}`
    });
}

var actualSum = collection.length * (collection.length + 1) / 2;

var sum = 0;
peach(collection, async (_, i) => {
    await asyncFn();

    sum += i + 1;
}, 10).then(() => {
    var processed = (sum === actualSum);
});
```

```
const peach = require('parallel-each');

const asyncFn = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 1);
});
const asyncErrorFn = () => new Promise((_, reject) => {
    setTimeout(() => {
        reject(new Error());
    }, 1);
});

var collection = [];
for (var i = 0; i < (Math.pow(10, power)); i++) {
    collection.push({
        index: i,
        item: `item_${i}`
    });
}

var actualSum = collection.length * (collection.length + 1) / 2;

var sum = 0;
peach(collection, async (_, i) => {
    if (i % 2 === 0) {
        await asyncErrorFn();
    }

    await asyncFn();

    sum += i + 1;
}, 10).then((erroredItems) => {
    var errored = (erroredItems.length === collection.length / 2);
    var processed = (sum === (actualSum / 2 + (collection.length / 4)));
});
```

## License

MIT License

Copyright (c) 2019 Garrick Thurston

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
