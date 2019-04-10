require("m_index.jade");
require("m_index.scss");

// window.location.href = (!device.desktop() ? 'm_guide.html' : 'guide.html') + location.search;

var common = require("./m/common.js");
const maybelline_API = require('./api/api.js');

$(() => {

    var Maybelline_API = new maybelline_API();
    var index = 1;
    console.log('m_index.js');
    common.init();

    var devMode = process.env.NODE_ENV == 'development'
        // if (!devMode) {
        //     loadCSS('asset/css/m_index.css');
        // }

    $('.look_btn').on('click', (e) => {
        SendGA(index);
    });

    $('.l_btn').on('click', (e) => {
        $('.background_all').slick('slickPause');
    });

    $('.r_btn').on('click', (e) => {
        $('.background_all').slick('slickPause');
    });

    // var currentSlickIndex = 0;
    $('.background_all').slick({
        autoplay: true,
        dots: true,
        adaptiveHeight: true,
        appendDots: $('.dot_wrap'),
        prevArrow: $('.l_btn'),
        nextArrow: $('.r_btn'),
    }).on("afterChange", (evt, slick, currentSlide) => {
        // console.log( currentSlide );
        // currentSlickIndex = currentSlide;
        index = (currentSlide + 1);
    });

    //set data to Maybelline API
    $('#index2_btn').on('click', e => {
        e.preventDefault();
        var data = {
            dev: (!device.desktop() ? 'mobile' : 'pc')
        };
        $.gapv('/style2016/m_start_btn');
        // console.log(e.target, e.currentTarget);
        Maybelline_API.postGame(data, $(e.currentTarget).attr('href'));
        return false;
    });

});

function SendGA(goStyleNum) {
    // window.location.href = 'style.html?style=' + goStyleNum;
    console.log(goStyleNum, typeof goStyleNum);
    switch (goStyleNum) {
        case 1:
            $.gapv('/style2016/guide/m_qq_btn');
            break;
        case 2:
            $.gapv('/style2016/guide/m_gaga_btn');
            break;
        case 3:
            $.gapv('/style2016/guide/m_lomo_btn');
            break;
        case 4:
            $.gapv('/style2016/guide/m_nana_btn');
            break;
        case 5:
            $.gapv('/style2016/guide/m_yoyo_btn');
            break;
        default:
            break;
    }
    $.gapv('/style2016/guide/m_all_btn');
}