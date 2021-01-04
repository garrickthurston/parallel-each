function EventEmitter() {
    this.events = {};
};
EventEmitter.prototype.on = function (event, listener) {
    if (typeof this.events[event] !== 'object') {
        this.events[event] = [];
    }

    this.events[event].push(listener);
};
EventEmitter.prototype.emit = function (event) {
    let i, listeners, length, args = [].slice.call(arguments, 1);

    if (typeof this.events[event] === 'object') {
        listeners = this.events[event].slice();
        length = listeners.length;

        for (i = 0; i < length; i++) {
            listeners[i].apply(this, args);
        }
    }
};

function ParallelEach(array, callback, chunkSize) {
    this.callback = callback || (() => {});
    this.array = array || [];
    this.chunkSize = chunkSize || 1;
    
    this.ee = new EventEmitter();
    this.erroredItems = [];

    this.processArray = this.array.slice(0, chunkSize).map((item, i) => ({ index: i, item }));
    this.availableIndexes = this.array.map((_, i) => i).slice(chunkSize);

    this.processCallback = (item) => new Promise((resolve) => {
        Promise.resolve(this.callback(item.item, item.index, this.array)).catch((ex) => { 
            this.ee.emit('itemError', { item, ex });
        }).then(resolve);
    }).catch((ex) => {
        this.ee.emit('itemError', { item, ex });
    }).then(() => {
        this.processArray = this.processArray.filter(val => item !== val);
        let nextIndex = null;
        if (this.availableIndexes && this.availableIndexes.length) {
            nextIndex = this.availableIndexes.splice(0, 1)[0];
            this.processArray.push({
                index: nextIndex,
                item: this.array[nextIndex]
            });
        }

        this.ee.emit('itemComplete', nextIndex);
    });

    this.process = () => new Promise((resolve) => {
        this.ee.on('itemError', (e) => {
            this.erroredItems.push({
                item: e.item.item,
                index: e.item.index,
                exception: e.ex
            });
        });

        this.ee.on('itemComplete', (nextIndex = null) => {
            if (nextIndex === null && !this.processArray.length) {
                return resolve(this.erroredItems);
            }
            if (nextIndex !== null) {
                const nextItem = this.processArray.find(item => item.index === nextIndex);
                if (nextItem) {
                    this.processCallback(nextItem);
                }
            }
        });

        if (this.processArray.length) {
            for (let i = 0; i < this.processArray.length; i++) {
                this.processCallback(this.processArray[i]);
            }
        } else {
            this.ee.emit('itemComplete');
        }
    });

    return this.process();
};

module.exports = (array, callback, chunkSize = 1) => new ParallelEach(array, callback, chunkSize);