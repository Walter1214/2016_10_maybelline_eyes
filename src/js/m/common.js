if (device.desktop()) {
    let arr = location.href.split("/").pop()
    if (!/\.html/.test(arr)) arr = 'm_index.html' + arr;
    console.log(arr);
    window.location.href = arr.slice(2);
    // window.location.href = "index.html" + location.search;
}

loadCSS('//cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css');
loadCSS('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css');
require('../../lib/loadCSS');

require('../../img/FB_share.jpg');
const maybelline_API = require('../api/api');

var Maybelline_API = new maybelline_API();

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

function init() {
    var menuOpen = false;
    $('.menu').click(() => {
        menuOpen = !menuOpen;
        if (menuOpen) {
            $('.menu,.menu_content').addClass('on');
        } else {
            $('.menu,.menu_content').removeClass('on');
        }
    });
}

$('.menu4').on('click', (e) => {
    e.preventDefault();
    var data = {
        dev: (!device.desktop() ? 'mobile' : 'pc')
    };
    Maybelline_API.postGame(data, $(e.currentTarget).attr('href'));
    return false;
})

module.exports = {
    init,
    getQueryString
};