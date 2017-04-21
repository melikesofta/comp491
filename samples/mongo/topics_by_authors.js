/**
 * Created by melikesofta on 21.04.2017.
 */

COLLECTION_NAME = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME = "entry_sample";   // Sample set 100k Entry

db = new Mongo().getDB("eksi-db");
collection = db.getCollection(COLLECTION_SAMPLE_NAME);

//db.getCollection("topic_authors").drop()
//db.createCollection("topic_authors")
//db.author_topics.insert(
//    collection.aggregate(
//        [
//            {
//                $group: {_id: "$author_id", topics: {$addToSet: "$title.title"}}
//            },
//            {
//                $project: {"topics": "$topics"}
//            },
//            {
//                $sort: {"size": -1},
//            }
//        ],
//        {allowDiskUse: true}
//    ).toArray()
//)


db.author_topics.find().forEach(function (ax) {
    topics = ax.topics
    topics.forEach(function (topic1) {
        topics.forEach(function (topic2) {
            db.topic_to_topic_by_author.update(
                {
                    _id: [topic1, topic2].sort()
                },
                {
                    $inc: {visit_count: 1}
                },
                {
                    upsert: true
                }
            )
        })
    })
})


//db.topic_authors.remove({"authors": {$exists:true}, $where: 'this.authors.length<20'})