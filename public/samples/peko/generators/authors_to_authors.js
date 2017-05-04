/**
 *  Prerequisite Collections:
 *
 *  topic_hrefs_and_authors, entry
 *
 */
db = new Mongo().getDB("peko");
db.getCollection("authors_to_authors").drop();
db.createCollection("authors_to_authors");


_unwind_1 = {$unwind: "$author_1"};
_unwind_2 = {$unwind: "$author_2"};
_out = {
    $out: "authors_to_authors"
};

var _group = {
    $group: {
        _id: {
            "author_1": "$author_1",
            "author_2": "$author_2"
        },

        count: {$sum: 1}
    }
};

var _project = {
    $project: {
        "author_1": "$authors",
        "author_2": "$authors"
    }
};

var _sort = {
    $sort: {count: -1}
};

db.topic_hrefs_and_authors.aggregate(
    [_project, _unwind_1, _unwind_2, _group, _sort, _out],
    {allowDiskUse: true}
);



