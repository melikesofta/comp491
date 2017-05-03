/**
 * Created by melikesofta on 21.04.2017.
 */

COLLECTION_NAME = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME = "entry_sample";   // Sample set 100k Entry

db = new Mongo().getDB("eksi-db");
collection = db.getCollection(COLLECTION_SAMPLE_NAME);

db.getCollection("words").drop()
db.createCollection("words")


_group = {
    $group: {
        _id: {$dateToString: {format: "%Y-%m", date: "$date_normalized"}},
        content: {$addToSet: "$content"}
    }
};
_out = {
    $out: "words"
};

_project = {
    $project: {
        content: {$concat: "$content"}
    },
    "_id": 1
}

collection.aggregate(
    [_group, _project, _out],
    {allowDiskUse: true}
);

