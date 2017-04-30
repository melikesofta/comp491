/**
 * Created by melikesofta on 21.04.2017.
 */

COLLECTION_NAME  = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME  = "entry_sample";   // Sample set 100k Entry

db = new Mongo().getDB("eksi-db");
collection = db.getCollection(COLLECTION_NAME);

db.getCollection("topic_authors").drop()
db.createCollection("topic_authors")


collection.aggregate(
    [
        {
            $unwind: "$href_norms"
        },

        {
            $group: {_id:"$name_normalized", topics: {$addToSet: "$href_norms"}}
        },

        {
            $out: "topics_topics_href"
        }
    ],

    {allowDiskUse: true}
).toArray()