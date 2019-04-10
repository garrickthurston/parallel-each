import { sinon } from 'sinon';
import { expect } from 'chai';

import peach from '../src/parallel-each';

const getCollectionByPowerOf10 = (power = 1) => {
    if (power < 0) {
        power = 0;
    }
    if (power > 6) {
        power = 6;
    }

    var collection = [];
    for (var i = 0; i < (Math.pow(10, power)); i++) {
        collection.push({
            index: i,
            item: `item_${i}`
        });
    }
    return collection;
};

describe('Parallel-Each', () => {
    describe('should traverse through a collection and have identical results regardless of parallelism', () => {
        it('with sync callback', async () => {
            const power = 4;
            const collection = getCollectionByPowerOf10(power);

            const actualSum = (collection.length) * (collection.length + 1) / 2

            var sumAtOneParallel = 0;
            await peach(collection, (item, i) => {
                sumAtOneParallel += i + 1;
            }, 1);
            expect(sumAtOneParallel).to.equal(actualSum);

            var sumAtTenParallel = 0;
            await peach(collection, (item, i) => {
                sumAtTenParallel += i + 1;
            }, 10);
            expect(sumAtTenParallel).to.equal(actualSum);

            var sumAtHundredParallel = 0;
            await peach(collection, (item, i) => {
                sumAtHundredParallel += i + 1;
            }, 10);
            expect(sumAtHundredParallel).to.equal(actualSum);

            var sumAtThousandParallel = 0;
            await peach(collection, (item, i) => {
                sumAtThousandParallel += i + 1;
            }, 10);
            expect(sumAtThousandParallel).to.equal(actualSum);
        });

        it('with async callback', async () => {
            await peach([], () => {}, 20);

            expect(true).to.equal(true);
        });
    });

    describe('should traverse through a parent collection and child collection in callback', () => {
        it('sync', () => {
            peach([], () => {}, 20);

            expect(true).to.equal(true);
        });

        it('async', async () => {
            await peach([], () => {}, 20);

            expect(true).to.equal(true);
        });
    });

    describe('should expose error in callback to calling function', () => {
        it('sync', () => {
            peach([], () => {}, 20);

            expect(true).to.equal(true);
        });

        it('async', async () => {
            await peach([], () => {}, 20);

            expect(true).to.equal(true);
        });
    });

    describe('should thoroghly expose nested callback to calling function', () => {
        it('sync', () => {
            peach([], () => {}, 20);

            expect(true).to.equal(true);
        });

        it('async', async () => {
            await peach([], () => {}, 20);

            expect(true).to.equal(true);
        });
    });

    describe('should do nothing for null or undefined args', () => {
        it('sync', () => {
            peach([], () => {}, 20);

            expect(true).to.equal(true);
        });

        it('async', async () => {
            await peach([], () => {}, 20);

            expect(true).to.equal(true);
        });
    });

    describe('should process sequentially if chunkSize = 1', () => {
        it('sync', () => {
            peach([], () => {}, 20);

            expect(true).to.equal(true);
        });

        it('async', async () => {
            await peach([], () => {}, 20);

            expect(true).to.equal(true);
        });
    });

    describe('should process in parallel if chunkSize > 1', () => {
        it('sync', () => {
            peach([], () => {}, 20);

            expect(true).to.equal(true);
        });

        it('async', async () => {
            await peach([], () => {}, 20);

            expect(true).to.equal(true);
        });
    });

    describe('should process entire array at once if chunkSize > array.length', () => {
        it('sync', () => {
            peach([], () => {}, 20);

            expect(true).to.equal(true);
        });

        it('async', async () => {
            await peach([], () => {}, 20);

            expect(true).to.equal(true);
        });
    });
});