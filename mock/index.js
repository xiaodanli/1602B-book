var homeJson = require("./data/bookDetail.json");


var jsonObj = {
    '/api/index': homeJson
}

module.exports = function(url) {
    return jsonObj[url]
}