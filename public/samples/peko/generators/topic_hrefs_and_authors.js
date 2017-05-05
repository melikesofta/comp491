/**
 *  Prerequisite Collections:
 *
 *  entry
 *
 */

db = new Mongo().getDB("peko");
db.getCollection("topic_hrefs_and_authors_x").drop();
db.createCollection("topic_hrefs_and_authors_x");

var allowed_topics_array = ((new Mongo().getDB("eksi-db")).topics_allowed.findOne().p);



var _project = {
    $project: {
        _id: 1,
        href_norms:  { $setIntersection: [ "$href_norms", allowed_topics_array  ] },
        author_id: 1,
    }
};

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
    $out: "topic_hrefs_and_authors_x"
};


db.entry.aggregate(
    [_project, _unwind, _group, _out],
    {allowDiskUse: true}
);
