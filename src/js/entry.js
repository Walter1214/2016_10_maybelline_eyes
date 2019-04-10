import 'index.scss';
import 'guide.jade';
// import 'style!css!lib/bootstrap.min.css';
// import 'style.jade';
require('../lib/all');
// require('../lib/jquery.min.js');
// require('../lib/loadCSS');
// require('../lib/slick-1.6.0/slick/slick.min')

// const CropImage = require('./CropImage');
var common = require("./w/w_common");
const Home = require('./home');

var utm_content = common.getQueryString('utm_content');


// if (window.location.pathname.indexOf('guide.html') > 0) {
if (/mbl_fans[3|4]_[carousel|ppagif]/i.test(utm_content)) {
    window.location.href = "index.html" + location.search;
}
// }
else if (!device.desktop()) {
    // window.location.href = "m_index.html" + location.search;
    let arr = location.href.split("/").pop()
    if (!/\.html/.test(arr)) arr = 'index.html' + arr;
    console.log(arr);
    window.location.href = 'm_' + arr;
}

$(() => {

    // loadCSS('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
    var stylesheet = loadCSS("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
    onloadCSS(stylesheet, function() {
        $('body').css('display', 'block');
    });

    var home = new Home();
});

function onloadCSS(ss, callback) {
    var called;

    function newcb() {
        if (!called && callback) {
            called = true;
            callback.call(ss);
        }
    }
    if (ss.addEventListener) {
        ss.addEventListener("load", newcb);
    }
    if (ss.attachEvent) {
        ss.attachEvent("onload", newcb);
    }

    // This code is for browsers that don’t support onload
    // No support for onload (it'll bind but never fire):
    //	* Android 4.3 (Samsung Galaxy S4, Browserstack)
    //	* Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
    //	* Android 2.3 (Pantech Burst P9070)

    // Weak inference targets Android < 4.4
    if ("isApplicationInstalled" in navigator && "onloadcssdefined" in ss) {
        ss.onloadcssdefined(newcb);
    }
}