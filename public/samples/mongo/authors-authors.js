/**
 * Created by melikesofta on 21.04.2017.
 */

COLLECTION_NAME = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME = "entry_sample";   // Sample set 100k Entry
NEW_COLLECTION_NAME = "authors_to_authors";

db = new Mongo().getDB("eksi-db");
collection = db.getCollection("topic");

db.getCollection(NEW_COLLECTION_NAME).drop()
db.createCollection(NEW_COLLECTION_NAME)


_unwind_1 = {$unwind: "$author_1"};
_unwind_2 = {$unwind: "$author_2"};
_out = {
    $out: NEW_COLLECTION_NAME
};

_group = {
    $group: {
        _id: {
            "author_1": "$author_1",
            "author_2": "$author_2"
        },

        count: { $sum: 1 }
    }
};

_project = {
    $project: {
        "author_1": "$authors",
        "author_2": "$authors"
    }
};

_sort = {$sort: {count: -1}}
collection.aggregate(
    [_project, _unwind_1, _unwind_2, _group, _sort, _out],
    {allowDiskUse: true}
);

// evil
// 7946