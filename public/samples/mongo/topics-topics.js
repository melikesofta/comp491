/**
 * Created by melikesofta on 21.04.2017.
 */

COLLECTION_NAME = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME = "entry_sample";   // Sample set 100k Entry

db = new Mongo().getDB("eksi-db");
collection = db.getCollection(COLLECTION_SAMPLE_NAME);

db.getCollection("topic").drop()
db.createCollection("topic")


_unwind = {$unwind: "$href_norms"};
_group = {
    $group: {
        _id: "$name_normalized",
        topics: {$addToSet: "$href_norms"},
        authors: {$addToSet: "$author_id"}
    }
};
_out = {
    $out: "topic"
};

_project = {
    $project: {
        "href_norms": {
            "$ifNull": [
                "$href_norms",
                ["self"]
            ]
        },
        "author_id": 1,
        "name_normalized": 1,
    }
};

collection.aggregate(
    [_project, _unwind, _group, _out],
    {allowDiskUse: true}
);

// evil
// 7946