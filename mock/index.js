var homeJson = require('./data/home.json');
var recommendData1 = require('./data/recommend/recommend1.json');
var recommendData2 = require('./data/recommend/recommend2.json');
var recommendData3 = require('./data/recommend/recommend3.json');
var searchZhu = require('./data/search-zhu.json');
var searchTian = require('./data/search-tian.json');
var bookDetail = require('./data/352876.json');
var chapterList = require('./data/chapter-list.json');

var jsonObj = {
        '/api/index': homeJson,
        '/api/recommed?pageNum=1&count=10': recommendData1,
        '/api/recommed?pageNum=2&count=10': recommendData2,
        '/api/recommed?pageNum=3&count=10': recommendData3,
        '/api/search?key=诛仙': searchZhu,
        '/api/search?key=择天记': searchTian,
        '/api/detail?fiction_id=352876': bookDetail,
        '/api/chapter?fiction_id=352876': chapterList
    }
    // /api/search?key=1212
module.exports = function(url) {
    if (jsonObj[url]) {
        return jsonObj[url]
    } else {
        return null
    }
}