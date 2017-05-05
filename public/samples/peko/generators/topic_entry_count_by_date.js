/**
 *  Prerequisite Collections:
 *
 *  entry
 *
 */
db = new Mongo().getDB("peko");
db.getCollection("topic_entry_count_by_date").drop();
db.createCollection("topic_entry_count_by_date");


var _out = {
    $out: "topic_entry_count_by_date"
};


$topics = [ 'unutulmayacak film sahneleri',
        'süper chat enstantaneleri',
        'kızların en çok söylediği yalanlar',
        'anne tripleri',
        'yeşilçam incileri',
        'guru',
        'ağza oturan süper laflar',
        'büyük filmlerden büyük replikler',
        'ssg',
        'kedi tripleri',
        'dünyada üretilmiş cümleler',
        'kimsin sorusuna verilmiş olabilecek cevaplar',
        'karizmatik cevaplar',
        'son sözler',
        'isimlerin fiil olması halinde muhtemel olumsuzları',
        'yaran entry\'ler',
        'ağza takılan laflar',
        'gelin kendimizi kandıralım',
        'başlıkları alt alta okumak',
        'çocukluk dönemi sanrıları',
        'türk astronot ve houston replikleri',
        'sözlükçüler hakkındaki asılsız dedikodular',
        'ölümcül frp enstantaneleri',
        'iğrenç espriler',
        'progresif gece şiirleri',
        'doğru bilgiler',
        'sözlük hakkında ne dediler',
        'ally mcbeal',
        'seni seviyorum',
        '8 kasım 2002 dream theater istanbul konseri',
        'üniversiteye yeni başlayacaklara tavsiyeler',
        'yapılmış en aptalca dalgınlık',
        'bir kelime bir çağrışım testi klişeleri',
        'ssgsever',
        'sözlükçülerin aslında demek istedikleri',
        'ingilizce şarkıların türkçe karşılayıcıları',
        'the matrix reloaded',
        'h2000 2003',
        'ekşi roman',
        'yaran diyaloglar',
        'aşk',
        'ekşi sözlük',
        'kurtlar vadisi',
        'itirafçıların aslında demek istedikleri',
        'anlamlı tashih',
        'gündelik hayat teorileri',
        'yaran msn diyalogları',
        'sözlükle ilgili istekler',
        'düz adam',
        'lost',
        'facebook',
        'heroes',
        'çocuklarla girilen komik diyaloglar',
        '6 kasım 2007 liverpool beşiktaş maçı',
        'yemekteyiz',
        'kurtlar vadisi pusu',
        '2008 eurovision şarkı yarışması',
        'aşk-ı memnu',
        'recep tayyip erdoğan',
        'ezel',
        'klişe timi',
        'ekşi itiraf',
        'kemal kılıçdaroğlu',
        'öyle bir geçer zaman ki',
        'sözlük yazarlarından aforizmalar',
        'behzat ç.',
        'leyla ile mecnun',
        'muhteşem yüzyıl',
        'fenerbahçe',
        'minimal ekşi roman',
        'galatasaray',
        'aykut kocaman',
        'işler güçler',
        'alex de souza',
        '28 mayıs 2013 taksim gezi parkı direnişi',
        'wesley sneijder',
        'didier drogba',
        'fatih terim',
        'beşiktaş',
        'öğrenildiğinde ufku iki katına çıkaran şeyler',
        'bedelli askerlik',
        '13 mayıs 2014 soma maden ocağı patlaması',
        'game of thrones',
        '30 mart 2014 ankara yerel seçim sonuçları',
        'şu anda çalan şarkı',
        'survivor all-star',
        'hastası olunan sözler',
        'hamza hamzaoğlu',
        'robin van persie',
        'survivor 2016',
        'düşün ki o bunu okuyor',
        'çaylak onay listesi',
        'pokemon go'
]

var _group = {
    $group: {
        _id: {
            title: "$title.title",
            month: {$dateToString: {format: "%Y-%m", date: "$date_normalized"}}
        },
        count: {$sum: 1}
    }
};


var _sort = {
    $sort: {count: -1}
};


db.entry.aggregate(
    [_group,  _out],
    {allowDiskUse: true}
)