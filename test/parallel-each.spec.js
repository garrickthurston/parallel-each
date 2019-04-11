import { sinon } from 'sinon';
import { expect } from 'chai';

import peach from '../parallel-each';

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

describe('Parallel-Each', function () {
    this.timeout(0);

    describe('should traverse through a collection and have identical results', () => {
        describe('with sync callback', () => {
            const power = 4;
            const collection = getCollectionByPowerOf10(power);
            const actualSum = (collection.length) * (collection.length + 1) / 2;

            it('at one parallelism', async () => {
                var sum = 0;
                await peach(collection, (_, i) => {
                    sum += i + 1;
                });
                expect(sum).to.equal(actualSum);
            });

            it('at ten parallelism', async () => {
                var sum = 0;
                await peach(collection, (_, i) => {
                    sum += i + 1;
                }, 10);
                expect(sum).to.equal(actualSum);
            });

            it('at hundred parallelism', async () => {
                var sum = 0;
                await peach(collection, (_, i) => {
                    sum += i + 1;
                }, 100);
                expect(sum).to.equal(actualSum);
            });

            it('at thousand parallelism', async () => {
                var sum = 0;
                await peach(collection, (_, i) => {
                    sum += i + 1;
                }, 1000);
                expect(sum).to.equal(actualSum);
            });
        });

        describe('with async callback', () => {
            const power = 3;
            const collection = getCollectionByPowerOf10(power);
            const actualSum = (collection.length) * (collection.length + 1) / 2;

            it('at one parallelism', async () => {
                var sum = 0;
                await peach(collection, async (_, i) => {
                    await asyncFn();
    
                    sum += i + 1;
                });
                expect(sum).to.equal(actualSum);
            });

            it('at ten parallelism', async () => {
                var sum = 0;
                await peach(collection, async (_, i) => {
                    await asyncFn();
    
                    sum += i + 1;
                }, 10);
                expect(sum).to.equal(actualSum);
            });

            it('at hundred parallelism', async () => {
                var sum = 0;
                await peach(collection, async (_, i) => {
                    await asyncFn();
    
                    sum += i + 1;
                }, 100);
                expect(sum).to.equal(actualSum);
            });
        });
    });

    describe('should traverse through a parent collection and child collection in callback', () => {
        const power = 3;
        const parentCollection = getCollectionByPowerOf10(power);
        const childCollection = getCollectionByPowerOf10(1);
        const actualSum = ((parentCollection.length) * (parentCollection.length + 1) / 2) 
            + (parentCollection.length * (childCollection.length) * (childCollection.length + 1) / 2);

        describe('with sync parent callback and sync child callback', () => {
            it('at one parallelism', async () => {
                var sum = 0;
                await peach(parentCollection, (_, i) => {
                    sum += i + 1;

                    var childSum = 0;
                    peach(childCollection, (__, j) => {
                        childSum += j + 1;
                    }, 10).then(() => {
                        sum += childSum;
                    });
                });
                expect(sum).to.equal(actualSum);
            });

            it('at ten parallelism', async () => {
                var sum = 0;
                await peach(parentCollection, (_, i) => {
                    sum += i + 1;

                    var childSum = 0;
                    peach(childCollection, (__, j) => {
                        childSum += j + 1;
                    }, 10).then(() => {
                        sum += childSum;
                    });
                }, 10);
                expect(sum).to.equal(actualSum);
            });

            it('at hundred parallelism', async () => {
                var sum = 0;
                await peach(parentCollection, (_, i) => {
                    sum += i + 1;

                    var childSum = 0;
                    peach(childCollection, (__, j) => {
                        childSum += j + 1;
                    }, 10).then(() => {
                        sum += childSum;
                    });
                }, 100);
                expect(sum).to.equal(actualSum);
            });
        });

        describe('with async parent callback and sync child callback', () => {
            it('at one parallelism', async () => {
                var sum = 0;
                await peach(parentCollection, async (_, i) => {
                    await asyncFn();
    
                    sum += i + 1;
    
                    var childSum = 0;
                    await peach(childCollection, (__, j) => {
                        childSum += j + 1;
                    }, 10)
    
                    sum += childSum;
                });
                expect(sum).to.equal(actualSum);
            });

            it('at ten parallelism', async () => {
                var sum = 0;
                await peach(parentCollection, async (_, i) => {
                    await asyncFn();
    
                    sum += i + 1;
    
                    var childSum = 0;
                    await peach(childCollection, (__, j) => {
                        childSum += j + 1;
                    }, 10)
    
                    sum += childSum;
                }, 10);
                expect(sum).to.equal(actualSum);
            });

            it('at hundred parallelism', async () => {
                var sum = 0;
                await peach(parentCollection, async (_, i) => {
                    await asyncFn();
    
                    sum += i + 1;
    
                    var childSum = 0;
                    await peach(childCollection, (__, j) => {
                        childSum += j + 1;
                    }, 10)
    
                    sum += childSum;
                }, 10);
                expect(sum).to.equal(actualSum);
            });
        });

        describe('with async parent callback and async child callback', () => {
            it('at one parallelism', async () => {
                var sum = 0;
                await peach(parentCollection, async (_, i) => {
                    sum += i + 1;
    
                    var childSum = 0;
                    await peach(childCollection, async (__, j) => {
                        await asyncFn();
    
                        childSum += j + 1;
                    }, 10)
                    
                    sum += childSum;
                });
                expect(sum).to.equal(actualSum);
            });

            it('at ten parallelism', async () => {
                var sum = 0;
                await peach(parentCollection, async (_, i) => {
                    sum += i + 1;
    
                    var childSum = 0;
                    await peach(childCollection, async (__, j) => {
                        await asyncFn();
    
                        childSum += j + 1;
                    }, 10)
                    
                    sum += childSum;
                }, 10);
                expect(sum).to.equal(actualSum);
            });

            it('at hundred parallelism', async () => {
                var sum = 0;
                await peach(parentCollection, async (_, i) => {
                    sum += i + 1;
    
                    var childSum = 0;
                    await peach(childCollection, async (__, j) => {
                        await asyncFn();
    
                        childSum += j + 1;
                    }, 10)
                    
                    sum += childSum;
                }, 100);
                expect(sum).to.equal(actualSum);
            });
        });
    });

    describe('should swallow then expose error in callback to calling function', () => {
        const power = 3;
        const collection = getCollectionByPowerOf10(power);
        const actualSum = (collection.length) * (collection.length + 1) / 2;
        const oneErrorSum = actualSum - 1;
        const manyErrorsSum = (actualSum / 2) + (collection.length / 4);
        const oneErrorTotal = 1;
        const manyErrorsTotal = collection.length / 2;

        describe('with sync callback', () => {
            describe('with one callback error', () => {
                it('at one parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, (_, i) => {
                        if (i === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    });
                    expect(sum).to.equal(oneErrorSum);
                    expect(erroredItems.length).to.equal(oneErrorTotal);
                });

                it('at ten parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, (_, i) => {
                        if (i === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 10);
                    expect(sum).to.equal(oneErrorSum);
                    expect(erroredItems.length).to.equal(oneErrorTotal);
                });

                it('at hundred parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, (_, i) => {
                        if (i === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 100);
                    expect(sum).to.equal(oneErrorSum);
                    expect(erroredItems.length).to.equal(oneErrorTotal);
                });

                it('at thousand parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, (_, i) => {
                        if (i === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 1000);
                    expect(sum).to.equal(oneErrorSum);
                    expect(erroredItems.length).to.equal(oneErrorTotal);
                });
            });

            describe('with many callback errors', () => {
                it('at one parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, (_, i) => {
                        if (i % 2 === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    });
                    expect(sum).to.equal(manyErrorsSum);
                    expect(erroredItems.length).to.equal(manyErrorsTotal);
                });

                it('at ten parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, (_, i) => {
                        if (i % 2 === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 10);
                    expect(sum).to.equal(manyErrorsSum);
                    expect(erroredItems.length).to.equal(manyErrorsTotal);
                });

                it('at hundred parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, (_, i) => {
                        if (i % 2 === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 100);
                    expect(sum).to.equal(manyErrorsSum);
                    expect(erroredItems.length).to.equal(manyErrorsTotal);
                });

                it('at thousand parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, (_, i) => {
                        if (i % 2 === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 1000);
                    expect(sum).to.equal(manyErrorsSum);
                    expect(erroredItems.length).to.equal(manyErrorsTotal);
                });
            });
        });

        describe('with async callback', () => {
            describe('with one callback error', () => {
                it('at one parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, async (_, i) => {
                        await asyncFn();

                        if (i === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    });
                    expect(sum).to.equal(oneErrorSum);
                    expect(erroredItems.length).to.equal(oneErrorTotal);
                });

                it('at ten parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, async (_, i) => {
                        await asyncFn();

                        if (i === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 10);
                    expect(sum).to.equal(oneErrorSum);
                    expect(erroredItems.length).to.equal(oneErrorTotal);
                });

                it('at hundred parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, async (_, i) => {
                        await asyncFn();

                        if (i === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 100);
                    expect(sum).to.equal(oneErrorSum);
                    expect(erroredItems.length).to.equal(oneErrorTotal);
                });

                it('at thousand parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, async (_, i) => {
                        await asyncFn();

                        if (i === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 1000);
                    expect(sum).to.equal(oneErrorSum);
                    expect(erroredItems.length).to.equal(oneErrorTotal);
                });
            });

            describe('with many callback errors', () => {
                it('at one parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, async (_, i) => {
                        await asyncFn();
                        
                        if (i % 2 === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    });
                    expect(sum).to.equal(manyErrorsSum);
                    expect(erroredItems.length).to.equal(manyErrorsTotal);
                });

                it('at ten parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, async (_, i) => {
                        await asyncFn();
                        
                        if (i % 2 === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 10);
                    expect(sum).to.equal(manyErrorsSum);
                    expect(erroredItems.length).to.equal(manyErrorsTotal);
                });

                it('at hundred parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, async (_, i) => {
                        await asyncFn();
                        
                        if (i % 2 === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 100);
                    expect(sum).to.equal(manyErrorsSum);
                    expect(erroredItems.length).to.equal(manyErrorsTotal);
                });

                it('at thousand parallelism', async () => {
                    var sum = 0;
                    var erroredItems = await peach(collection, async (_, i) => {
                        await asyncFn();
                        
                        if (i % 2 === 0) {
                            throw new Error();
                        }

                        sum += i + 1;
                    }, 1000);
                    expect(sum).to.equal(manyErrorsSum);
                    expect(erroredItems.length).to.equal(manyErrorsTotal);
                });
            });
        });
    });

    describe('should thoroughly expose nested callback error to calling function', () => {
        const power = 3;
        const collection = getCollectionByPowerOf10(power);
        const actualSum = (collection.length) * (collection.length + 1) / 2;
        const oneErrorSum = actualSum - 1;
        const manyErrorsSum = (actualSum / 2) + (collection.length / 4);
        const oneErrorTotal = 1;
        const manyErrorsTotal = collection.length / 2;

        describe('with one callback error', () => {
            it('at one parallelism', async () => {
                var sum = 0;
                const erroredItems = await peach(collection, async (_, i) => {
                    if (i === 0) {
                        await asyncErrorFn();
                    }

                    sum += i + 1;
                });
                expect(sum).to.equal(oneErrorSum);
                expect(erroredItems.length).to.equal(oneErrorTotal);
            });

            it('at ten parallelism', async () => {
                var sum = 0;
                const erroredItems = await peach(collection, async (_, i) => {
                    if (i === 0) {
                        await asyncErrorFn();
                    }

                    sum += i + 1;
                }, 10);
                expect(sum).to.equal(oneErrorSum);
                expect(erroredItems.length).to.equal(oneErrorTotal);
            });

            it('at hundred parallelism', async () => {
                var sum = 0;
                const erroredItems = await peach(collection, async (_, i) => {
                    if (i === 0) {
                        await asyncErrorFn();
                    }

                    sum += i + 1;
                }, 100);
                expect(sum).to.equal(oneErrorSum);
                expect(erroredItems.length).to.equal(oneErrorTotal);
            });

            it('at thousand parallelism', async () => {
                var sum = 0;
                const erroredItems = await peach(collection, async (_, i) => {
                    if (i === 0) {
                        await asyncErrorFn();
                    }

                    sum += i + 1;
                }, 1000);
                expect(sum).to.equal(oneErrorSum);
                expect(erroredItems.length).to.equal(oneErrorTotal);
            });
        });

        describe('with many callback errors', () => {
            it('at one parallelism', async () => {
                var sum = 0;
                const erroredItems = await peach(collection, async (_, i) => {
                    if (i % 2 === 0) {
                        await asyncErrorFn();
                    }

                    sum += i + 1;
                });
                expect(sum).to.equal(manyErrorsSum);
                expect(erroredItems.length).to.equal(manyErrorsTotal);
            });

            it('at ten parallelism', async () => {
                var sum = 0;
                const erroredItems = await peach(collection, async (_, i) => {
                    if (i % 2 === 0) {
                        await asyncErrorFn();
                    }

                    sum += i + 1;
                }, 10);
                expect(sum).to.equal(manyErrorsSum);
                expect(erroredItems.length).to.equal(manyErrorsTotal);
            });

            it('at hundred parallelism', async () => {
                var sum = 0;
                const erroredItems = await peach(collection, async (_, i) => {
                    if (i % 2 === 0) {
                        await asyncErrorFn();
                    }

                    sum += i + 1;
                }, 100);
                expect(sum).to.equal(manyErrorsSum);
                expect(erroredItems.length).to.equal(manyErrorsTotal);
            });

            it('at thousand parallelism', async () => {
                var sum = 0;
                const erroredItems = await peach(collection, async (_, i) => {
                    if (i % 2 === 0) {
                        await asyncErrorFn();
                    }

                    sum += i + 1;
                }, 1000);
                expect(sum).to.equal(manyErrorsSum);
                expect(erroredItems.length).to.equal(manyErrorsTotal);
            });
        });
    });

    describe('should do nothing for null or undefined args', () => {
        const power = 3;
        const collection = getCollectionByPowerOf10(power);

        it('with all undefined args', async () => {
            var sum = 0;

            await peach();

            expect(sum).to.equal(0);
        });

        it('with all null args', async () => {
            var sum = 0;
            
            await peach(null, null, null);

            expect(sum).to.equal(0);
        });

        it('with valid array and undefined callback', async () => {
            var sum = 0;
            
            await peach(collection);

            expect(sum).to.equal(0);
        });

        it('with undefined array and valid callback', async () => {
            var sum = 0;
            
            await peach(undefined, () => {});

            expect(sum).to.equal(0);
        });

        it('with null array and valid callback', async () => {
            var sum = 0;
            
            await peach(null, () => {});

            expect(sum).to.equal(0);
        });
    });
});