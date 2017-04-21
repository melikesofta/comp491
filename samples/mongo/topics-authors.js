/**
 * Created by melikesofta on 21.04.2017.
 */

COLLECTION_NAME  = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME  = "entry_sample";   // Sample set 100k Entry

db = new Mongo().getDB("eksi-db");
collection = db.getCollection(COLLECTION_NAME);

db.getCollection("topic_authors").drop()
db.createCollection("topic_authors")
db.topic_authors.insert(
    collection.aggregate(
        [
            {
                $group: {_id:"$title.title", authors: {$addToSet: "$author.name"}}
            },
            {
                $project: {"authors": "$authors", "size": {$size: "$authors"}}
            },
            {
                $sort: {"size": -1},
            }
        ],
        {allowDiskUse: true}
    ).toArray()
)

//db.topic_authors.remove({"authors": {$exists:true}, $where: 'this.authors.length<20'})
