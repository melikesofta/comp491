/**
 *  Prerequisite Collections:
 *
 *  entry
 *
 */

db = new Mongo().getDB("peko");
db.getCollection("popular_words").drop();
db.createCollection("popular_words");

var map = function () {
    var content = this.content;
    if (content) {
        content = content.split(" ");
        for (var i = content.length - 1; i >= 0; i--) {
            if (content[i]) {      // make sure there's something
                emit(content[i], 1); // store a 1 for each word
            }
        }
    }
};

var reduce = function (key, values) {
    var count = 0;
    values.forEach(function (v) {
        count += v;
    });
    return count;
}

db.entry.mapReduce(map, reduce, {out: "popular_words"});