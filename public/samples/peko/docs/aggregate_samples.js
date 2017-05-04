/**
 * Created by aliahmet on 04/05/17.
 */


/**
 *  Out
 */
var _out = {
    $out: "topic_histogram"
};



/**
 *  Group
 */
_group = {
    $group: {
        _id: "$title",
        count: {$sum: 1}
    }
};

_group = {
    $group: {
        _id: {$dateToString: {format: "%Y-%m", date: "$date_normalized"}},
        content: {$addToSet: "$content"}
    }
};

/**
 *  Unwind
 */
_unwind = {
    $unwind: "$author_id"
};



/**
 *  Sort
 */
_sort = {
    $sort: {
        step: -1
    }
};


/**
 *  Project
 */
_project_1 = {
    $project: {
        _id: 1,
        step: {$floor: {$divide: ["$count", STEP_SIZE]}}
    }
};
