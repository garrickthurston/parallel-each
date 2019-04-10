import callbackWrapper from './callback-wrapper';

class ParallelEach {
    processArray = [];
    availableIndexes = [];

    constructor(array, callback, chunkSize) {
        this.array = array || [];
        this.callback = callback || (() => {});
        this.chunkSize = chunkSize || 1;

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

        this.process = this.process.bind(this);

        return this.process();
    }

    async process() {
        if (!this.processArray.length && !this.availableIndexes.length) {
            return;
        }

        var toProcess = this.processArray.filter(item => !item.processing);
        for (var i = 0; i < toProcess.length; i++) {
            var item = toProcess[i];
            item.processing = true;

            try {
                const wrapper = await callbackWrapper(this.callback, item.item, item.index, this.array);

                this.processArray.splice(wrapper.index, 1);

                if (this.availableIndexes) {
                    const availableIndex = this.availableIndexes.splice(0, 1)[0];
                    this.processArray.push({
                        index: availableIndex,
                        processing: false,
                        item: this.array[availableIndex]
                    });
                }
            } catch (e) {

            }

            this.process();
        }
    }
}

const peach = (array, callback, chunkSize = 1) => new ParallelEach(array, callback, chunkSize);

export default peach;