const maybelline_API = require('../api/api');

var Maybelline_API = new maybelline_API();


require('../../img/FB_share.jpg');

$('.list_1').on('click', (e) => {
    e.preventDefault();
    var data = {
        dev: (!device.desktop() ? 'mobile' : 'pc')
    };
    Maybelline_API.postGame(data, $(e.currentTarget).attr('href'));
    return false;
})

var queryObject = null;
/**
 * getQueryString
 * @param  {string} name
 */
function getQueryString(name) {
    if (queryString != null) {
        return queryObject[name];
    }
    var params = {};
    var pattern1 = /([^&^=]+)=([^&^=]+)/g;
    var pattern2 = /([^=]+)/g;
    var is_input = document.URL.indexOf('?');
    if (is_input >= 0) {
        var queryString = document.URL.substring(is_input + 1, document.URL.length);
        var curMatch = [];
        var matchList = queryString.match(pattern1);
        for (var i in matchList) {
            curMatch = String(matchList[i]).match(pattern2);
            params[curMatch[0]] = curMatch[1];
        }
    }
    queryObject = params;
    return queryObject[name];
}


module.exports = {
    getQueryString
};