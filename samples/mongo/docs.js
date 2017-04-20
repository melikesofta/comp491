//basic commands for showing dbs, entries, and listing one's records
// show dbs
//	> eksi-db
// use eksi-db
// show collections
//	> entry
db.entry.find().pretty()

//https://docs.mongodb.com/manual/reference/mongo-shell/

// get topics with entry counts
db.topic_entry_count.insert(db.entry.aggregate([{$group:{_id:"$title_id", count:{$sum:1}}}, {$sort:{count:-1}}], {allowDiskUse:true}).toArray())

db.topic_entry_count.find().pretty()

// get last record
db.entry.find({}).sort({$natural:-1}).limit(1)

//find all entries posted in 2011
db.entry.find({"date": { $regex: '^\d{2}\.\d{2}\.2011'}})

//mapReduce for collecting top100 topics per year
//http://stackoverflow.com/questions/14785815/using-regex-in-mongodb-aggregation-framework-in-group
var mapYears = function(){
    var key = this.date.match("[0-9]{4}")[0];
    var value = {
        topic: this.title.title,
        year: key,
        entryCount: 1
    };
    emit(key, value);
};

var reduceYears = function(key, values){
    var reducedObject = {
        year: "",
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

db.entry.mapReduce(mapYears, reduceYears, {out:'topics_by_years'})
db.topics_by_years.find().pretty();