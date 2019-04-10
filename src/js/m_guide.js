require("m_guide.jade");
require("m_guide.scss");

var common = require("./m/common.js");


$(() => {
    var index = 1;
    console.log('m_index.js');
    common.init();
    for (let i = 1; i <= 5; i++) {
        require('../img/m/index/look_btn_' + i + '.png');
    }

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
        $('.look_btn').attr("href", "m_style.html?id=" + (currentSlide + 1));
        $('.look_btn').css("background-image", 'url(asset/img/m/index/look_btn_' + (currentSlide + 1) + '.png)');
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