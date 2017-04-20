COLLECTION_NAME  = "entry";                 // Full Set 30m Entry
COLLECTION_SAMPLE_NAME  = "entry_sample";   // Sample set 100k Entry

db = new Mongo().getDB("eksi-db");
collection = db.getCollection(COLLECTION_SAMPLE_NAME);


// get entry count of all topics ordered by count
//db.topic_entry_count.drop();
//db.topic_entry_count.insert(collection.
  //  aggregate([{$group:{_id:"$title.title", count:{$sum:1}}}, {$sort:{count:-1}}], {allowDiskUse:true}).toArray())

db.getCollection("topics_by_years").drop();

var mapYears = function(){
    var key = this.date_normalized.getFullYear();
    var value = {
        topic: this.title.title,
        year: key,
        entryCount: 1
    };
    emit(key, value);
};

var reduceYears = function(key, values){
    var reducedObject = {
        year: 1,
        entryCount: 0,
        titles: []
    };

    values.forEach(function(value){
        reducedObject.year = value.year;
        var titleExists = false;
        reducedObject.titles.filter(function(obj){
            if(obj.title===value.topic){
                titleExists = true;
            }
        });
        if(!titleExists) {
            var titleObj = {
                title: value.topic,
                titleEntryCount: 0
            };
            reducedObject.titles.push(titleObj);
        }
        reducedObject.entryCount += 1;
        reducedObject.titles.filter(function(obj){
            if(obj.title === value.topic){
                obj.titleEntryCount += 1;
            }
        });
    });
    return reducedObject;
};

collection.mapReduce(mapYears, reduceYears, {out:'topics_by_years'})
//db.topics_by_years.find({"_id":2000}).pretty();


db.topics_by_years.find().toArray().map(function(obj){
    titles = obj.value.titles;
    return {
        "year": obj._id,
        "titles": titles.sort(function(a,b){return b.titleEntryCount-a.titleEntryCount}).slice(0,3)
    };
})
