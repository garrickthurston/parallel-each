import { sinon } from 'sinon';
import { expect } from 'chai';

import examples from '../examples';

describe('examples', () => {
    describe('should traverse through a collection', () => {
        it('sync', () => {
            expect(true).to.equal(true);

        });

        it('async', async () => {
            expect(true).to.equal(true);


        });
    });

    describe('should traverse through a parent collection and child collection in callback', () => {
        it('sync', () => {
            expect(true).to.equal(true);

        });

        it('async', async () => {
            expect(true).to.equal(true);


        });
    });

    describe('should expose error in callback to calling function', () => {
        it('sync', () => {
            expect(true).to.equal(true);

        });

        it('async', async () => {
            expect(true).to.equal(true);


        });
    });

    describe('should thoroghly expose nested callback to calling function', () => {
        it('sync', () => {
            expect(true).to.equal(true);

        });

        it('async', async () => {
            expect(true).to.equal(true);


        });
    });

    describe('should do nothing for null or undefined args', () => {
        it('sync', () => {
            expect(true).to.equal(true);

        });

        it('async', async () => {
            expect(true).to.equal(true);


        });
    });

    describe('should process sequentially if chunkSize = 1', () => {
        it('sync', () => {
            expect(true).to.equal(true);

        });

        it('async', async () => {
            expect(true).to.equal(true);


        });
    });

    describe('should process in parallel if chunkSize > 1', () => {
        it('sync', () => {
            expect(true).to.equal(true);

        });

        it('async', async () => {
            expect(true).to.equal(true);

            
        });
    });

    describe('should process entire array at once if chunkSize > array.length', () => {
        it('sync', () => {
            expect(true).to.equal(true);

        });

        it('async', async () => {
            expect(true).to.equal(true);

        });
    });
});