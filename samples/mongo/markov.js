/**
 * Created by aliahmet on 20/04/17.
 */


db.countries.aggregate(
    {$match:{a:'$data.country.neighbor.name'}},
    {$unwind:'$a'},
    {$unwind:'$a'},
    {$group:{_id:'a',res:{$addToSet:'$a'}}})