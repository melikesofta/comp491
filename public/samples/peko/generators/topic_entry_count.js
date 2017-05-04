/**
 *  Prerequisite Collections:
 *
 *  entry
 *
 */
db = new Mongo().getDB("peko");
db.getCollection("topic_entry_count").drop();
db.createCollection("topic_entry_count");


var _out = {
    $out: "topic_entry_count"
};

var _group = {
    $group: {
        _id: "$title.title",
        count: {$sum: 1}
    }
};


var _sort = {
    $sort: {count: -1}
};


db.entry.aggregate(
    [_group, _sort, _out],
    {allowDiskUse: true}
)