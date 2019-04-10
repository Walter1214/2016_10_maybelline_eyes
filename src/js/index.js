const maybelline_API = require('./api/api.js');

class Activity {
    constructor() {
        this.index = 0;
        this.MAX = 5;

        var autoMove = setInterval((e) => {
            this.move(1);
        }, 3000);

        var Maybelline_API = new maybelline_API();
        require('../img/index2/content.png');
        require('../img/index2/logo.png');
        require('../img/index2/btn.png');
        require('../img/index2/sub_title.png');
        require('../img/index2/title.png');

        for (let i = 1; i <= this.MAX; i++) {
            require('../img/index2/style_big_' + i + '.jpg');

            $('.background_all').children('div:eq(0)').clone().css({
                'background-image': 'url("asset/img/index2/style_big_' + i + '.jpg")',
                'left': (100 * (i - 1)) + '%'
            }).appendTo('.background_all');

            if (i === 1) {

                $('.background_all').children('div:eq(0)').clone().css({
                    'background-image': 'url("asset/img/index2/style_big_' + i + '.jpg")',
                    'left': (100 * (this.MAX)) + '%'
                }).appendTo('.background_all');
            } else {
                $('.home_dots').children('li:eq(0)').clone().appendTo('.home_dots');
            }
            if (i === this.MAX) {

                $('.background_all').children('div:eq(0)').clone().css({
                    'background-image': 'url("asset/img/index2/style_big_' + i + '.jpg")',
                    'left': -100 + '%'
                }).appendTo('.background_all');

                $('.background_all').children('div:eq(0)').remove();

                $('.home_dots').children('li:eq(0)').remove();
            }
        }


        // setInterval((e) => {
        //     this.move(1);
        // }, 3000);

        //set data to Maybelline API
        $('#index2_btn').on('click', e => {
            e.preventDefault();
            var data = {
                dev: (!device.desktop() ? 'mobile' : 'pc')
            };
            // console.log(e.target, e.currentTarget);
            $.gapv('/style2016/start_btn');
            Maybelline_API.postGame(data, $(e.currentTarget).attr('href'));
            return false;
        });

        $('.r_btn').on('click', e => {
            this.move(1);
            clearInterval(autoMove);
        })

        $('.l_btn').on('click', e => {
            this.move(-1);
            clearInterval(autoMove);
        })

    }


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

            this.moving = false;

            $('.dot_color').each((index, e) => {
                if (this.index == index) {
                    $(e).attr('src', 'asset/img/_dot_yellow.png');
                } else {
                    $(e).attr('src', 'asset/img/dot_white.png');
                }
            })
        });
    }
}

module.exports = Activity;