var homeJson = require('./data/home.json');
var recommendData1 = require('./data/recommend/recommend1.json');
var recommendData2 = require('./data/recommend/recommend2.json');
var recommendData3 = require('./data/recommend/recommend3.json');
var searchZhu = require('./data/search-zhu.json');
var searchTian = require('./data/search-tian.json');
var bookDetail = require('./data/352876.json');
var chapterList = require('./data/chapter-list.json');
var artical_1 = require('./data/artical/data1.json');
var artical_2 = require('./data/artical/data2.json');
var artical_3 = require('./data/artical/data3.json');
var artical_4 = require('./data/artical/data4.json');

var jsonObj = {
        '/api/index': homeJson,
        '/api/recommed?pageNum=1&count=10': recommendData1,
        '/api/recommed?pageNum=2&count=10': recommendData2,
        '/api/recommed?pageNum=3&count=10': recommendData3,
        '/api/search?key=诛仙': searchZhu,
        '/api/search?key=择天记': searchTian,
        '/api/detail?fiction_id=352876': bookDetail,
        '/api/chapter?fiction_id=352876': chapterList,
        '/api/artical?fiction_id=352876&chapter_id=1': artical_1,
        '/api/artical?fiction_id=352876&chapter_id=2': artical_2,
        '/api/artical?fiction_id=352876&chapter_id=3': artical_3,
        '/api/artical?fiction_id=352876&chapter_id=4': artical_4,
    }
    // /api/search?key=1212
module.exports = function(url) {
    if (jsonObj[url]) {
        return jsonObj[url]
    } else {
        return null
    }
}