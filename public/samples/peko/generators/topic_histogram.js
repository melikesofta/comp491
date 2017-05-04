/**
 *  Prerequisite Collections:
 *
 *  entry, topic_entry_count
 *
 */
db = new Mongo().getDB("peko");
db.getCollection("topic_histogram").drop();
db.createCollection("topic_histogram");

var STEP_SIZE = 500;

_group = {
    $group: {
        _id: "$step",
        count: {$sum: 1},
    }
};


_out = {
    $out: "topic_histogram"
};

_project_1 = {
    $project: {
        _id: 1,
        step: {$floor: {$divide: ["$count", STEP_SIZE]}}
    }
};

_project_2 = {
    $project: {
        count: "$count",
        step: {$multiply: ["$_id", STEP_SIZE]}
    }
};
_sort = {
    $sort: {
        step: -1
    }
};

db.topic_entry_count.aggregate(
    [_project_1, _group, _project_2, _sort, _out],
    {allowDiskUse: true}
);
