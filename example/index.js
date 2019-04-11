import '@babel/polyfill';
import peach from 'parallel-each';

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

(async () => {
    var startTime = (new Date()).getTime();

    ////////////////////////////////////////////////////////////////////////
    console.log('=== basic examples with sync callbacks ===');
    var power = 4;
    var collection = getCollectionByPowerOf10(power);
    var actualSum = (collection.length) * (collection.length + 1) / 2;

    var sum = 0;
    var time = (new Date()).getTime();
    await peach(collection, (_, i) => {
        sum += i + 1;
    });
    var elapsed = (new Date()).getTime() - time;
    console.log(`basic sync :: 1 parallel :: realSum :: ${actualSum}`);
    console.log(`basic sync :: 1 parallel :: calcSum :: ${sum}`);
    console.log(`basic sync :: 1 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, (_, i) => {
        sum += i + 1;
    }, 10);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic sync :: 10 parallel :: realSum :: ${actualSum}`);
    console.log(`basic sync :: 10 parallel :: calcSum :: ${sum}`);
    console.log(`basic sync :: 10 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, (_, i) => {
        sum += i + 1;
    }, 100);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic sync :: 100 parallel :: realSum :: ${actualSum}`);
    console.log(`basic sync :: 100 parallel :: calcSum :: ${sum}`);
    console.log(`basic sync :: 100 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, (_, i) => {
        sum += i + 1;
    }, 1000);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic sync :: 1000 parallel :: realSum :: ${actualSum}`);
    console.log(`basic sync :: 1000 parallel :: calcSum :: ${sum}`);
    console.log(`basic sync :: 1000 parallel :: elapsed :: ${elapsed / 1000} s`);



    ////////////////////////////////////////////////////////////////////////
    console.log('=== basic examples with async callbacks ===');
    power = 3;
    collection = getCollectionByPowerOf10(power);
    actualSum = (collection.length) * (collection.length + 1) / 2;

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        await asyncFn();

        sum += i + 1;
    });
    elapsed = (new Date()).getTime() - time;
    console.log(`basic async :: 1 parallel :: realSum :: ${actualSum}`);
    console.log(`basic async :: 1 parallel :: calcSum :: ${sum}`);
    console.log(`basic async :: 1 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        await asyncFn();

        sum += i + 1;
    }, 10);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic async :: 10 parallel :: realSum :: ${actualSum}`);
    console.log(`basic async :: 10 parallel :: calcSum :: ${sum}`);
    console.log(`basic async :: 10 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        await asyncFn();

        sum += i + 1;
    }, 100);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic async :: 100 parallel :: realSum :: ${actualSum}`);
    console.log(`basic async :: 100 parallel :: calcSum :: ${sum}`);
    console.log(`basic async :: 100 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        await asyncFn();

        sum += i + 1;
    }, 1000);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic sync :: 1000 parallel :: realSum :: ${actualSum}`);
    console.log(`basic sync :: 1000 parallel :: calcSum :: ${sum}`);
    console.log(`basic sync :: 1000 parallel :: elapsed :: ${elapsed / 1000} s`);



    ////////////////////////////////////////////////////////////////////////
    console.log('=== basic examples with sync callback with errors ===');
    power = 3;
    collection = getCollectionByPowerOf10(power);
    actualSum = (collection.length) * (collection.length + 1) / 2;
    var manyErrorsSum = (actualSum / 2) + (collection.length / 4);
    var manyErrorsTotal = collection.length / 2;

    sum = 0;
    time = (new Date()).getTime();
    var erroredItems = await peach(collection, (_, i) => {
        if (i % 2 === 0) {
            throw new Error();
        }

        sum += i + 1;
    });
    elapsed = (new Date()).getTime() - time;
    console.log(`basic sync w/ errors :: 1 parallel :: expSum w/ errors :: ${manyErrorsSum}`);
    console.log(`basic sync w/ errors :: 1 parallel :: calSum w/ errors :: ${sum}`);
    console.log(`basic sync w/ errors :: 1 parallel :: expd error total :: ${manyErrorsTotal}`);
    console.log(`basic sync w/ errors :: 1 parallel :: calc error total :: ${erroredItems.length}`);
    console.log(`basic sync w/ errors :: 1 parallel ::          elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    erroredItems = await peach(collection, (_, i) => {
        if (i % 2 === 0) {
            throw new Error();
        }

        sum += i + 1;
    }, 10);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic sync w/ errors :: 10 parallel :: expSum w/ errors :: ${manyErrorsSum}`);
    console.log(`basic sync w/ errors :: 10 parallel :: calSum w/ errors :: ${sum}`);
    console.log(`basic sync w/ errors :: 10 parallel :: expd error total :: ${manyErrorsTotal}`);
    console.log(`basic sync w/ errors :: 10 parallel :: calc error total :: ${erroredItems.length}`);
    console.log(`basic sync w/ errors :: 10 parallel ::          elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    erroredItems = await peach(collection, (_, i) => {
        if (i % 2 === 0) {
            throw new Error();
        }

        sum += i + 1;
    }, 100);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic sync w/ errors :: 100 parallel :: expSum w/ errors :: ${manyErrorsSum}`);
    console.log(`basic sync w/ errors :: 100 parallel :: calSum w/ errors :: ${sum}`);
    console.log(`basic sync w/ errors :: 100 parallel :: expd error total :: ${manyErrorsTotal}`);
    console.log(`basic sync w/ errors :: 100 parallel :: calc error total :: ${erroredItems.length}`);
    console.log(`basic sync w/ errors :: 100 parallel ::          elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    erroredItems = await peach(collection, (_, i) => {
        if (i % 2 === 0) {
            throw new Error();
        }

        sum += i + 1;
    }, 100);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic sync w/ errors :: 1000 parallel :: expSum w/ errors :: ${manyErrorsSum}`);
    console.log(`basic sync w/ errors :: 1000 parallel :: calSum w/ errors :: ${sum}`);
    console.log(`basic sync w/ errors :: 1000 parallel :: expd error total :: ${manyErrorsTotal}`);
    console.log(`basic sync w/ errors :: 1000 parallel :: calc error total :: ${erroredItems.length}`);
    console.log(`basic sync w/ errors :: 1000 parallel ::          elapsed :: ${elapsed / 1000} s`);



    ////////////////////////////////////////////////////////////////////////
    console.log('=== basic examples with async callback with errors ===');
    power = 3;
    collection = getCollectionByPowerOf10(power);
    actualSum = (collection.length) * (collection.length + 1) / 2;
    var manyErrorsSum = (actualSum / 2) + (collection.length / 4);
    var manyErrorsTotal = collection.length / 2;

    sum = 0;
    time = (new Date()).getTime();
    var erroredItems = await peach(collection, async (_, i) => {
        if (i % 2 === 0) {
            await asyncErrorFn();
        }

        sum += i + 1;
    });
    elapsed = (new Date()).getTime() - time;
    console.log(`basic async w/ errors :: 1 parallel :: expSum w/ errors :: ${manyErrorsSum}`);
    console.log(`basic async w/ errors :: 1 parallel :: calSum w/ errors :: ${sum}`);
    console.log(`basic async w/ errors :: 1 parallel :: expd error total :: ${manyErrorsTotal}`);
    console.log(`basic async w/ errors :: 1 parallel :: calc error total :: ${erroredItems.length}`);
    console.log(`basic async w/ errors :: 1 parallel ::          elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    erroredItems = await peach(collection, async (_, i) => {
        if (i % 2 === 0) {
            await asyncErrorFn();
        }

        sum += i + 1;
    }, 10);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic async w/ errors :: 10 parallel :: expSum w/ errors :: ${manyErrorsSum}`);
    console.log(`basic async w/ errors :: 10 parallel :: calSum w/ errors :: ${sum}`);
    console.log(`basic async w/ errors :: 10 parallel :: expd error total :: ${manyErrorsTotal}`);
    console.log(`basic async w/ errors :: 10 parallel :: calc error total :: ${erroredItems.length}`);
    console.log(`basic async w/ errors :: 10 parallel ::          elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    erroredItems = await peach(collection, async (_, i) => {
        if (i % 2 === 0) {
            await asyncErrorFn();
        }

        sum += i + 1;
    }, 100);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic async w/ errors :: 100 parallel :: expSum w/ errors :: ${manyErrorsSum}`);
    console.log(`basic async w/ errors :: 100 parallel :: calSum w/ errors :: ${sum}`);
    console.log(`basic async w/ errors :: 100 parallel :: expd error total :: ${manyErrorsTotal}`);
    console.log(`basic async w/ errors :: 100 parallel :: calc error total :: ${erroredItems.length}`);
    console.log(`basic async w/ errors :: 100 parallel ::          elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    erroredItems = await peach(collection, async (_, i) => {
        if (i % 2 === 0) {
            await asyncErrorFn();
        }

        sum += i + 1;
    }, 1000);
    elapsed = (new Date()).getTime() - time;
    console.log(`basic async w/ errors :: 1000 parallel :: expSum w/ errors :: ${manyErrorsSum}`);
    console.log(`basic async w/ errors :: 1000 parallel :: calSum w/ errors :: ${sum}`);
    console.log(`basic async w/ errors :: 1000 parallel :: expd error total :: ${manyErrorsTotal}`);
    console.log(`basic async w/ errors :: 1000 parallel :: calc error total :: ${erroredItems.length}`);
    console.log(`basic async w/ errors :: 1000 parallel ::          elapsed :: ${elapsed / 1000} s`);

    

    ////////////////////////////////////////////////////////////////////////
    console.log('=== nested peach with sync child ===');
    power = 3;
    var parentCollection = getCollectionByPowerOf10(power);
    var childCollection = getCollectionByPowerOf10(1);
    actualSum = ((parentCollection.length) * (parentCollection.length + 1) / 2) 
        + (parentCollection.length * (childCollection.length) * (childCollection.length + 1) / 2);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        sum += i + 1;
    
        var childSum = 0;
        await peach(childCollection, (__, j) => {
            childSum += j + 1;
        }, 10)
        
        sum += childSum;
    });
    elapsed = (new Date()).getTime() - time;
    console.log(`nested peach with sync child :: 1 parallel :: realSum :: ${actualSum}`);
    console.log(`nested peach with sync child :: 1 parallel :: calcsum :: ${sum}`);
    console.log(`nested peach with sync child :: 1 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        sum += i + 1;
    
        var childSum = 0;
        await peach(childCollection, (__, j) => {
            childSum += j + 1;
        }, 10)
        
        sum += childSum;
    }, 10);
    elapsed = (new Date()).getTime() - time;
    console.log(`nested peach with sync child :: 10 parallel :: realSum :: ${actualSum}`);
    console.log(`nested peach with sync child :: 10 parallel :: calcsum :: ${sum}`);
    console.log(`nested peach with sync child :: 10 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        sum += i + 1;
    
        var childSum = 0;
        await peach(childCollection, (__, j) => {
            childSum += j + 1;
        }, 10)
        
        sum += childSum;
    }, 100);
    elapsed = (new Date()).getTime() - time;
    console.log(`nested peach with sync child :: 100 parallel :: realSum :: ${actualSum}`);
    console.log(`nested peach with sync child :: 100 parallel :: calcsum :: ${sum}`);
    console.log(`nested peach with sync child :: 100 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        sum += i + 1;
    
        var childSum = 0;
        await peach(childCollection, (__, j) => {
            childSum += j + 1;
        }, 10)
        
        sum += childSum;
    }, 1000);
    elapsed = (new Date()).getTime() - time;
    console.log(`nested peach with sync child :: 1000 parallel :: realSum :: ${actualSum}`);
    console.log(`nested peach with sync child :: 1000 parallel :: calcsum :: ${sum}`);
    console.log(`nested peach with sync child :: 1000 parallel :: elapsed :: ${elapsed / 1000} s`);




    ////////////////////////////////////////////////////////////////////////
    console.log('=== nested peach with async child ===');
    power = 3;
    var parentCollection = getCollectionByPowerOf10(power);
    var childCollection = getCollectionByPowerOf10(1);
    actualSum = ((parentCollection.length) * (parentCollection.length + 1) / 2) 
        + (parentCollection.length * (childCollection.length) * (childCollection.length + 1) / 2);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        sum += i + 1;
    
        var childSum = 0;
        await peach(childCollection, async (__, j) => {
            await asyncFn();

            childSum += j + 1;
        }, 10)
        
        sum += childSum;
    });
    elapsed = (new Date()).getTime() - time;
    console.log(`nested peach with async child :: 1 parallel :: realSum :: ${actualSum}`);
    console.log(`nested peach with async child :: 1 parallel :: calcsum :: ${sum}`);
    console.log(`nested peach with async child :: 1 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        sum += i + 1;
    
        var childSum = 0;
        await peach(childCollection, async (__, j) => {
            await asyncFn();

            childSum += j + 1;
        }, 10)
        
        sum += childSum;
    }, 10);
    elapsed = (new Date()).getTime() - time;
    console.log(`nested peach with async child :: 10 parallel :: realSum :: ${actualSum}`);
    console.log(`nested peach with async child :: 10 parallel :: calcsum :: ${sum}`);
    console.log(`nested peach with async child :: 10 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        sum += i + 1;
    
        var childSum = 0;
        await peach(childCollection, async (__, j) => {
            await asyncFn();

            childSum += j + 1;
        }, 10)
        
        sum += childSum;
    }, 100);
    elapsed = (new Date()).getTime() - time;
    console.log(`nested peach with async child :: 100 parallel :: realSum :: ${actualSum}`);
    console.log(`nested peach with async child :: 100 parallel :: calcsum :: ${sum}`);
    console.log(`nested peach with async child :: 100 parallel :: elapsed :: ${elapsed / 1000} s`);

    sum = 0;
    time = (new Date()).getTime();
    await peach(collection, async (_, i) => {
        sum += i + 1;
    
        var childSum = 0;
        await peach(childCollection, async (__, j) => {
            await asyncFn();

            childSum += j + 1;
        }, 10)
        
        sum += childSum;
    }, 1000);
    elapsed = (new Date()).getTime() - time;
    console.log(`nested peach with async child :: 1000 parallel :: realSum :: ${actualSum}`);
    console.log(`nested peach with async child :: 1000 parallel :: calcsum :: ${sum}`);
    console.log(`nested peach with async child :: 1000 parallel :: elapsed :: ${elapsed / 1000} s`);



    
    ////////////////////////////////////////////////////////////////////////
    console.log(`total elapsed :: ${((new Date()).getTime() - startTime) / 1000} s`);
})();