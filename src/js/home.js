class Home {
    constructor() {
        this.index = 0;
        this.MAX = 5;
        // this.queryObject = null;
        // this.getQueryString();
        // this.GetStylePhotoNumber();

        var autoMove = setInterval((e) => {
            this.move(1);
        }, 3000);
        // require('../img/dot_white.png');
        // require('../img/dot_yellow.png');

        $('.r_btn').on('click', e => {
            this.move(1);
            clearInterval(autoMove);
        })

        $('.l_btn').on('click', e => {
            this.move(-1);
            clearInterval(autoMove);
        })

        $('#home_a').on('click', e => {
            this.SendGA(this.index + 1);
        })

        for (let i = 1; i <= this.MAX; i++) {
            require('../img/home/btn_style_' + i + '.png');
            require('../img/home/style_big_' + i + '.jpg');

            // $('.background_all').children('img:eq(0)').clone().attr('src', 'asset/img/home/style_big_' + i + '.jpg').css('left', (100 * (i - 1) + '%')).appendTo('.background_all');
            $('.background_all').children('div:eq(0)').clone().css({
                'background-image': 'url("asset/img/home/style_big_' + i + '.jpg")',
                'left': (100 * (i - 1)) + '%'
            }).appendTo('.background_all');

            if (i === 1) {
                // $('.background_all').children('img:eq(0)').clone().attr('src', 'asset/img/home/style_big_' + i + '.jpg').css('left', (100 * (this.MAX) + '%')).appendTo('.background_all');
                $('.background_all').children('div:eq(0)').clone().css({
                    'background-image': 'url("asset/img/home/style_big_' + i + '.jpg")',
                    'left': (100 * (this.MAX)) + '%'
                }).appendTo('.background_all');
            } else {
                $('.home_dots').children('li:eq(0)').clone().appendTo('.home_dots');
            }
            if (i === this.MAX) {
                // $('.background_all').children('img:eq(0)').clone().attr('src', 'asset/img/home/style_big_' + i + '.jpg').css('left', (-100 + '%')).appendTo('.background_all');
                $('.background_all').children('div:eq(0)').clone().css({
                    'background-image': 'url("asset/img/home/style_big_' + i + '.jpg")',
                    'left': -100 + '%'
                }).appendTo('.background_all');

                // $('.background_all').children('img:eq(0)').remove();
                $('.background_all').children('div:eq(0)').remove();

                $('.home_dots').children('li:eq(0)').remove();
            }
        }

        for (let i = 1; i <= this.MAX; i++) {

            if (i === 1) {
                $('.home_dots').children('li:eq(1)').html(i).clone().css('color', 'yellow').appendTo('.home_dots');
            } else {
                $('.home_dots').children('li:eq(1)').html(i).clone().appendTo('.home_dots');
            }
            if (i === this.MAX) {
                $('.home_dots').children('li:eq(1)').remove();
            }
        }
    }

    SendGA(goStyleNum) {
        // window.location.href = 'style.html?style=' + goStyleNum;
        switch (goStyleNum) {
            case 1:
                $.gapv('/style2016/guide/qq_btn');
                break;
            case 2:
                $.gapv('/style2016/guide/gaga_btn');
                break;
            case 3:
                $.gapv('/style2016/guide/lomo_btn');
                break;
            case 4:
                $.gapv('/style2016/guide/nana_btn');
                break;
            case 5:
                $.gapv('/style2016/guide/yoyo_btn');
                break;
            default:
                break;
        }
        $.gapv('/style2016/guide/all_btn');
    }

    // getQueryString(name) {
    //     if (queryString != null) {
    //         return this.queryObject[name];
    //     }
    //     var params = {};
    //     var pattern1 = /([^&^=]+)=([^&^=]+)/g;
    //     var pattern2 = /([^=]+)/g;
    //     var is_input = document.URL.indexOf('?');
    //     if (is_input >= 0) {
    //         var queryString = document.URL.substring(is_input + 1, document.URL.length);
    //         var curMatch = [];
    //         var matchList = queryString.match(pattern1);
    //         for (var i in matchList) {
    //             curMatch = String(matchList[i]).match(pattern2);
    //             params[curMatch[0]] = curMatch[1];
    //         }
    //     }
    //     this.queryObject = params;
    //     return this.queryObject[name];
    // }

    // GetStylePhotoNumber() {
    //     switch (parseInt(this.queryObject.style)) {
    //         case 1:

    //             break;
    //         case 2:
    //             this.index = 1;
    //             break;
    //         case 3:
    //             this.index = 2;
    //             break;
    //         case 4:
    //             this.index = 3;
    //             break;
    //         case 5:
    //             this.index = 4;
    //             break;
    //         default:
    //             break;
    //     }
    // }

    move(i) {
        if (this.moving) return;
        this.moving = true;

        $('.background_all').animate({
            left: -100 * (this.index + i) + "%"
        }, () => {
            this.index += i;
            if (this.index >= this.MAX) this.index = 0;
            else if (this.index < 0) this.index = this.MAX - 1;

            $('.background_all').css('left', -100 * this.index + "%");

            $('#home_btn').attr('src', 'asset/img/home/btn_style_' + (this.index + 1) + '.png');
            $('#home_a').attr('href', 'style.html?id=' + (this.index + 1));


            this.moving = false;

            $('.dot_color').each((index, e) => {
                if (this.index == index) {
                    $(e).attr('src', 'asset/img/_dot_yellow.png');
                } else {
                    $(e).attr('src', 'asset/img/dot_white.png');
                }
            })

            $('.dot_text').each((index, e) => {
                if (this.index == index) {
                    $(e).css('color', 'yellow');
                } else {
                    $(e).css('color', 'white');
                }
            })
        });
    }
}

module.exports = Home;