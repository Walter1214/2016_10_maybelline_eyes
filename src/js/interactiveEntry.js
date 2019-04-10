import 'index.scss';
import 'interactive.jade';

if (!device.desktop()) {
    const arr = location.href.split("/").pop()
    console.log(arr);
    window.location.href = 'm_' + arr;
}
var common = require("./w/w_common");
const Interactive = require('./interactive');

$(() => {

    var stylesheet = loadCSS("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
    onloadCSS(stylesheet, function() {
        $('body').css('display', 'block');
        var interactive = new Interactive();
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