/**
 * Created by melikesofta on 21.04.2017.
 */

COLLECTION_NAME  = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME  = "entry_sample";   // Sample set 100k Entry

db = new Mongo().getDB("eksi-db");
collection = db.getCollection("topic_authors");

function intersect_safe(a, b){
    var ai=0, bi=0;
    var cnt = 0;
    while( ai < a.length && bi < b.length ){
        if      (a[ai] < b[bi] ){ ai++; }
        else if (a[ai] > b[bi] ){ bi++; }
        else {
            cnt++;
            ai++;
            bi++;
        }
    }

    return cnt;
}

db.topic_authors.remove({size: {$lt: 20}})

db.getCollection("common_authors").drop()
db.createCollection("common_authors")
db.topic_authors.find().forEach(
    function(t1){
        db.topic_authors.find().forEach(
            function(t2){
                top1 = t1._id;
                top2 = t2._id;
                cmmn = intersect_safe(t1.authors, t2.authors);
                if(top1!==top2 && cmmn > 0){
                    db.common_authors.insert(
                        {
                            "t1": top1,
                            "t2": top2,
                            "common": cmmn
                        }
                    )
                }
            }
        );
    }
);
