/**
 * Created by melikesofta on 21.04.2017.
 */
COLLECTION_NAME  = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME  = "entry_sample";   // Sample set 100k Entry

db = new Mongo().getDB("eksi-db");
collection = db.getCollection(COLLECTION_NAME);

var map = function() {
    var content = this.content;
    if (content) {
        content = content.split(" ");
        for (var i = content.length - 1; i >= 0; i--) {
            if (content[i])  {      // make sure there's something
                emit(content[i], 1); // store a 1 for each word
            }
        }
    }
};

var reduce = function( key, values ) {
    var count = 0;
    values.forEach(function(v) {
        count +=v;
    });
    return count;
}

db.entry_sample.mapReduce(map, reduce, {out: "word_count"})