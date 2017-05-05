/**
 *  Prerequisite Collections:
 *
 *  topic_hrefs_and_authors
 *
 */

db = new Mongo().getDB("peko");
collection = db.getCollection("topic_hrefs_and_authors");
//owner_id | car_id => topics | _id
collection.aggregate([
    {$unwind: {
        path: "$topics",
        preserveNullAndEmptyArrays: true
    }},
    { $group: {
        _id: { title: '$topics', topic_id: '$_id' }
    }},
    { $group: {
        _id: '$_id.title',
        hrefed: { $sum: 1 }
    }},
    { $project: {
        title: '$_id',
        hrefed: 1
    }},
    {
        $sort: {
            hrefed: -1
        }
    },
    {$out: "topic_href_count"}],
    {allowDiskUse: true}
);