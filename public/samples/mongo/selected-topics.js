COLLECTION_NAME = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME = "entry_sample";   // Sample set 100k Entry
ALLOW_DISK_USE = {allowDiskUse: true}
// Test on sample set firsrt

collection = db.getCollection(COLLECTION_SAMPLE_NAME);

var allowed_topics_array = db.topics_allowed.findOne().p;

PIPELINE = [
    { $addFields: {isInThere: {$in: ["$title.title", allowed_topics_array]}}},
    { $match: {"isInThere": true} },
    {$out: "selected_entries"}
];

result = collection.aggregate(PIPELINE, ALLOW_DISK_USE);
