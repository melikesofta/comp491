/**
 *  Prerequisite Collections:
 *
 *  entry
 *
 */

db = new Mongo().getDB("peko");
db.getCollection("topic_hrefs_and_authors").drop();
db.createCollection("topic_hrefs_and_authors");

var _unwind = {
    $unwind: {
        path: "$href_norms",
        preserveNullAndEmptyArrays: true
    }
};
var _group = {
    $group: {
        _id: "$name_normalized",
        topics: {$addToSet: "$href_norms"},
        authors: {$addToSet: "$author_id"}
    }
};
var _out = {
    $out: "topic_hrefs_and_authors"
};


db.entry.aggregate(
    [_unwind, _group, _out],
    {allowDiskUse: true}
);
