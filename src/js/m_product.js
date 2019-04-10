require("m_product.jade");
require("m_product.scss");

var common = require("./m/common.js");


$(() => {
    console.log('m_product.js');
    common.init();
    var devMode = process.env.NODE_ENV == 'development'
        // if (!devMode) {
        //     loadCSS('asset/css/m_product.css');
        // }

    $('.go_top_btn').click(() => {
        $("html, body").animate({ scrollTop: 0 }, "fast");
        return;
    });

});