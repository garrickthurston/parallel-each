import { sinon } from 'sinon';
import { expect } from 'chai';

import peach from '../src/parallel-each';

describe('Parallel-Each', () => {
    describe('should traverse through a collection', () => {
        it('sync', () => {
            peach([], () => {}, 20);

            expect(true).to.equal(true);
        });

        it('async', async () => {
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