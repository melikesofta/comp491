/**
 * Created by melikesofta on 21.04.2017.
 */

db = new Mongo().getDB("eksi-db");


db.getCollection("topic_histogram").drop();

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
}
db.topic_entry_count.aggregate(
    [_project_1, _group, _project_2, _sort, _out],
    {allowDiskUse: true}
);

_group = {
    $group: {
        _id: "a",
        count: {$sum: "$count"},
    }
};

db.topic_histogram.find().forEach(function(doc){t+= +doc.count})