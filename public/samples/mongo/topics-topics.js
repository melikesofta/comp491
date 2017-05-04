/**
 * Created by melikesofta on 21.04.2017.
 */

COLLECTION_NAME = "entry";                 // Full Set 30m Entry
collection = db.getCollection("selected_entries");

db.createCollection("selected_topics")


var _unwind = {
    $unwind: "$href_norms",
    preserveNullAndEmptyArrays: true


};
var _group = {
    $group: {
        _id: "$name_normalized",
        topics: {$addToSet: "$href_norms"},
        authors: {$addToSet: "$author_id"}
    }
};
var _out = {
    $out: "selected_topics"
};



collection.aggregate(
    [_unwind, _group, _out],
    {allowDiskUse: true}
);
