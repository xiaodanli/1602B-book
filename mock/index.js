var homeJson = require("./data/home.json");
var recommendData1 = require("./data/recommend/recommend1.json");
var recommendData2 = require("./data/recommend/recommend2.json");
var recommendData3 = require("./data/recommend/recommend3.json");

var jsonObj = {
    '/api/index': homeJson,
    '/api/recommed?pageNum=1&count=10': recommendData1,
    '/api/recommed?pageNum=2&count=10': recommendData2,
    '/api/recommed?pageNum=3&count=10': recommendData3,
}

module.exports = function(url) {
    return jsonObj[url]
}