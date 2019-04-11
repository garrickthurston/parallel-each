import { EventEmitter } from 'events';

function ParallelEach(array, callback, chunkSize, logError, finishedCallback) {
    this.callback = callback;
    this.finishedCallback = finishedCallback

    this.array = array || [];
    this.chunkSize = chunkSize || 1;
    this.logError = logError || false;
    
    this.ee = new EventEmitter();
    this.processArray = [];
    this.availableIndexes = [];
    this.erroredItems = [];

    for (var i = 0; i < (chunkSize < array.length ? chunkSize : array.length); i++) {
        this.processArray.push({
            index: i,
            item: array[i]
        });
    }

    if (chunkSize < array.length) {
        for (var i = chunkSize; i < array.length; i++) {
            this.availableIndexes.push(i);
        }
    }

    this.processCallback = (item) => new Promise((resolve, reject) => {
        Promise.resolve(this.callback(item.item, item.index, this.array)).catch((ex) => { 
            this.ee.emit('itemError', { item, ex });
        }).finally(resolve);
    }).catch((ex) => {
        this.ee.emit('itemError', { item, ex });
    }).finally(() => {
        this.processArray = this.processArray.filter(val => item !== val);
        var nextIndex = null;
        if (this.availableIndexes && this.availableIndexes.length) {
            nextIndex = this.availableIndexes.splice(0, 1)[0];
            this.processArray.push({
                index: nextIndex,
                item: this.array[nextIndex]
            });
        }

        this.ee.emit('itemComplete', nextIndex);
    });

    this.process = () => new Promise((resolve, reject) => {
        this.ee.on('itemError', (e) => {
            this.erroredItems.push({
                item: e.item.item,
                index: e.item.index,
                exception: e.ex
            });

            this.processArray = this.processArray.filter(val => e.item !== val);
            var nextIndex = null;
            if (this.availableIndexes && this.availableIndexes.length) {
                nextIndex = this.availableIndexes.splice(0, 1)[0];
                this.processArray.push({
                    index: nextIndex,
                    item: this.array[nextIndex]
                });
            }

            this.ee.emit('itemComplete', nextIndex);
        });

        this.ee.on('itemComplete', (nextIndex = null) => {
            if (nextIndex === null && !this.processArray.length) {
                return resolve(this.erroredItems);
            }
            if (nextIndex !== null) {
                var nextItem = this.processArray.find(item => item.index === nextIndex);
                if (nextItem) {
                    this.processCallback(nextItem);
                }
            }
        });

        if (this.processArray.length) {
            for (var i = 0; i < this.processArray.length; i++) {
                this.processCallback(this.processArray[i]);
            }
        } else {
            this.ee.emit('itemComplete');
        }
    });

    return this.process();
};

const peach = (array, callback, chunkSize = 1, logError = false, finishedCallback = null) => {
    return new ParallelEach(array, callback, chunkSize, logError, finishedCallback);
};

export default peach;