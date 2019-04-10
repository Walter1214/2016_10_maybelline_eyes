require("m_style.jade");
require("m_style.scss");

var common = require("./m/common.js");


$(() => {
    console.log('m_style.js');
    common.init();
    $.gapv('/style2016/m_style_All.html');
    var devMode = process.env.NODE_ENV == 'development'
        // if (!devMode) {
        //     loadCSS('asset/css/m_style.css');
        // }

    var id = common.getQueryString('id') || 1;
    if (isNaN(id)) {
        id = 1;
    }
    // id = id / 1;
    console.log(id);

    $('#style_text').attr('src', 'asset/img/m/style/text_' + id + '.png');

    var MAX = 5;


    switch (parseInt(id)) {
        case 1:
            MAX = 4;
            break;
        case 2:
            MAX = 4;
            break;
        case 3:
            MAX = 4;
            break;
        case 4:
            MAX = 3;
            break;
        case 5:
            MAX = 3;
            break;
        default:
            MAX = 5;
            break;
    }

    for (let i = 1; i <= MAX; i++) {

        $('.background_all').children('div:eq(0)').clone().addClass('background_style_' + id + '_' + i).appendTo('.background_all');
        if (i === MAX) {
            $('.background_all').children('div:eq(0)').remove();
        }
        require('../img/m/style/text_' + i + '.png');
        require('../img/m/style/kv_title_' + i + '.png');
    }

    $('#kv_title').attr('src', 'asset/img/m//style/kv_title_' + id + '.png');

    $('.background_all').addClass("id" + id);
    // var currentSlickIndex = 0;
    $('.background_all').slick({
        autoplay: false,
        dots: true,
        adaptiveHeight: true,
        appendDots: $('.dot_wrap'),
        prevArrow: $('.l_btn'),
        nextArrow: $('.r_btn'),
    }).on("afterChange", (evt, slick, currentSlide) => {
        // console.log(currentSlide);
        // currentSlickIndex = currentSlide;
        $('.look_btn').attr("href", "m_style.html?id=" + currentSlide);

        if (parseInt(currentSlide) + 1 === MAX) {
            $('.btn_next').show();
            $('.btn_undo').show()
        } else {
            $('.btn_next').hide();
            $('.btn_undo').hide()
        }

    });



    $('.btn_next').on('click', e => {
        var next_num = parseInt(id) + 1;
        if (next_num > 5) {
            next_num = 1;
        }
        window.location.href = 'm_style.html?id=' + next_num;
    })
    $('.btn_undo').on('click', e => {
        var undo_num = parseInt(id) - 1;
        if (undo_num < 1) {
            undo_num = 5;
        }
        window.location.href = 'm_style.html?id=' + undo_num;
    })
});