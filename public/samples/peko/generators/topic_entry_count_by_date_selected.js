/**
 *  Prerequisite Collections:
 *
 *  entry
 *
 */
simple_format_number = function (x) {
    if (+x < 10)
        return "0" + x;
    return "" + x;
};
db.topic_entry_count_by_date_selected.deleteMany({})
put_it = function (month, year, limit) {
    x = db.topic_entry_count_by_date.find({"_id.month": year + "-" + simple_format_number(month)}).sort({count: -1}).limit(limit).toArray();
    db.topic_entry_count_by_date_selected.insertMany(x.map(function (doc) {
        return {
            title: doc._id.title,
            count: doc.count,
            month: 12 * (+year) + (+month)
        }
    }))
};
for (year = 1999; year <= 2016; year++)
    for (month = 1; month <= 12; month++)
        put_it(month, year, 50);
