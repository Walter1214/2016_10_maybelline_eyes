import 'index.scss';
import 'activity.jade';
if (!device.desktop()) {
    // window.location.href = "m_index.html" + location.search;
    const arr = location.href.split("/").pop()
    console.log(arr);
    window.location.href = 'm_' + arr;
}
var common = require("./w/w_common");
require('../lib/jquery.scrollbar.min');

$(() => {

    var stylesheet = loadCSS("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
    // var stylesheet = loadCSS("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
    onloadCSS(stylesheet, function() {
        $('body').css('display', 'block');
        $('.treaty_space').mCustomScrollbar();
            // $('.treaty_space').scrollbar();
    });


})

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

    if ("isApplicationInstalled" in navigator && "onloadcssdefined" in ss) {
        ss.onloadcssdefined(newcb);
    }
}