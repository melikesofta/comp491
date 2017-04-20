COLLECTION_NAME = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME = "entry_sample";   // Sample set 100k Entry
ALLOW_DISK_USE = {allowDiskUse: true}
// Test on sample set firsrt

collection = db.getCollection(COLLECTION_NAME);

PIPELINE = [
    {$group: {_id: {title: "$title.title", year: "$year"}, count: {$sum: 1}}},
    {$sort: {count: -1}},
    {$out: "year_topic_id"}

];


//result = collection.aggregate(PIPELINE, ALLOW_DISK_USE);


function getMost(year, limit) {
    return db.year_topic_id.find({"_id.year": year}).limit(limit).map(function (x) {
            return {
                name: x._id.title,
                value: x.count
            }
        }
    )
}
