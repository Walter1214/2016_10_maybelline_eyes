import 'index.scss';
import 'step.jade';


require('../lib/TransformTool/Utils');
require('../lib/TransformTool/TransformTool');
require('../lib/TransformTool/TransformCanvasPictures');
require('../lib/anteater.validate');

var common = require("./w/w_common");
const Step = require('./step');

if (!device.desktop()) {
    // window.location.href = "m_index.html" + location.search;
    let arr = location.href.split("/").pop()
    if (!/\.html/.test(arr)) arr = 'index.html' + arr;
    console.log(arr);
    window.location.href = 'm_' + arr;
}

$(() => {
    // window.fbAsyncInit = function() {
    //     FB.init({
    //         appId: '1723379247981127',
    //         xfbml: true,
    //         version: 'v2.8'
    //     });
    // };

    // (function(d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) { return; }
    //     js = d.createElement(s);
    //     js.id = id;
    //     js.src = "//connect.facebook.net/en_US/sdk.js";
    //     fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
    var stylesheet = loadCSS("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
    onloadCSS(stylesheet, function() {
        $('body').css('display', 'block');
        var step = new Step();
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