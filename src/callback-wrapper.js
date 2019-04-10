class CallbackWrapper {
    callback = null;
    item = null;

    constructor(callback, item, index, array, completedCallback) {
        this.callback = callback;
        this.item = item;
        this.index = index;

        this.process = this.process.bind(this);

        return this.process(array, completedCallback);
    }

    async process(array) {
        try {
            if (!this.item || this.index === undefined) {
                throw new Error('No item to process');
            }

            if (!array) {
                throw new Error('No array to process');
            }

            if (!this.callback) {
                throw new Error('No processing callback for item');
            }

            await this.callback(this.item, this.index, array);

            return this;
        } catch (e) {
            throw e;
        }
    }
}

export default (callback, item, index, array) => new CallbackWrapper(callback, item, index, array);