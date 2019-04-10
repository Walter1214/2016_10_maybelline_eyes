import 'index.scss';
import 'product.jade';

require('../lib/loadCSS');

const Product = require('./product');
var common = require("./w/w_common");


if (!device.desktop()) {
    // window.location.href = "m_index.html" + location.search;
    const arr = location.href.split("/").pop()
    console.log(arr);
    window.location.href = 'm_' + arr;
}

$(() => {


    var stylesheet = loadCSS("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
    onloadCSS(stylesheet, function() {
        // $('body').css('display', 'block');

        setTimeout(function() {
            $('body').css('display', 'block');
            var product = new Product();
        }, 500);

    });



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