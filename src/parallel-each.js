function CallbackWrapper(callback, item, array, completedCallback) {
    this.callback = callback;
    this.item = item;

    new Promise(async (resolve, reject) => {
        try {
            await this.callback(item.item, item.index, array);
        } catch (e) {
            console.log(e);
        }

        completedCallback(this);

        resolve();
    });
}

function ParallelEach(array, callback, chunkSize = 1) {
    this.array = array;
    this.callback = callback;
    this.chunkSize = chunkSize;

    this.processArray = [];
    this.availableIndexes = [];

    for (var i = 0; i < (chunkSize < array.length ? chunkSize : array.length); i++) {
        this.processArray.push({
            index: i,
            processing: false,
            item: array[i]
        });
    }
    if (chunkSize < array.length) {
        for (var i = chunkSize; i < array.length; i++) {
            this.availableIndexes.push(i);
        }
    }

    this.process = (() => new Promise(async (resolve, reject) => {
        var toProcess = this.processArray.filter(item => !item.processing);
        if (!toProcess.length && !this.availableIndexes.length) {
            return resolve();
        }

        for (var i = 0; i < toProcess.length; i++) {
            var item = toProcess[i];
            item.processing = true;
            new CallbackWrapper(callback, item, this.array, (wrapper) => {
                this.processArray.splice(wrapper.item.index, 1);
                if (this.availableIndexes.length) {
                    var availableIndex = this.availableIndexes.splice(0, 1)[0];
                    this.processArray.push({
                        index: availableIndex,
                        processing: false,
                        item: this.array[availableIndex]
                    });
                }
                
                return resolve(this.process());
            });
        }
    })).bind(this);

    return this.process();
}

module.exports = ParallelEach;