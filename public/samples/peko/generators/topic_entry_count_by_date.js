/**
 *  Prerequisite Collections:
 *
 *  entry
 *
 */
db = new Mongo().getDB("peko");
db.getCollection("topic_entry_count_by_date").drop();
db.createCollection("topic_entry_count_by_date");


var _out = {
    $out: "topic_entry_count_by_date"
};

var _group_1 = {
    $group: {
        _id: {
            title: "$title.title",
            month: {$dateToString: {format: "%Y-%m", date: "$date_normalized"}}
        },
        count: {$sum: 1}
    }
};

var _group_2 = {
    $group: {
        _id: {
            month:"$_id.month"
        },
        count: {title: 1}
    }
};


var _sort = {
    $sort: {count: -1}
};


db.entry.aggregate(
    [_group,  _out],
    {allowDiskUse: true}
)