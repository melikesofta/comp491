COLLECTION_NAME = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME = "entry-sample";   // Sample set 100k Entry

// Test on sample set firsrt

collection = db.getCollection(COLLECTION_NAME);

AGGREATION = {
    $group: {
        _id: '$author_id',
        res: {
            $addToSet: '$title.title'
        }
    }
};


result = db.entry_sample.aggregate(AGGREATION);

chain = []
db.chain.deleteMany({})

result.forEach(function (b) {
    o = b.res;
    for (i = 0; i < o.length - 1; o++) {
        current = o[i];
        next = o[i + 1];
        db.people.update(
            {
                source: current,
                target: next
            },
            {
                $inc: { quantity: 1}
            },
            {
                upsert: true
            }
        )
    }
})