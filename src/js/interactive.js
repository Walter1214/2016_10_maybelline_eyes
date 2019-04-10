class Interactive {
    constructor() {
        this.index = 6;
        this.MAX = 7;

        require('../img/interactive/style_all.jpg');

        for (let i = 1; i <= this.MAX; i++) {
            require('../img/interactive/style_big_' + i + '.jpg');
            require('../img/interactive/style_' + i + '.png');


            $('.background_all').children('div:eq(0)').clone().css({
                'background-image': 'url("asset/img/interactive/style_big_' + i + '.jpg")',
                'left': (100 * (i - 1)) + '%'
            }).appendTo('.background_all');

            if (i === 1) {
                $('.background_all').children('div:eq(0)').clone().css({
                    'background-image': 'url("asset/img/interactive/style_big_' + i + '.jpg")',
                    'left': (100 * (this.MAX)) + '%'
                }).appendTo('.background_all');
            } else {
                $('.home_dots').children('li:eq(0)').clone().appendTo('.home_dots');
            }
            if (i === this.MAX) {

                $('.background_all').children('div:eq(0)').clone().css({
                    'background-image': 'url("asset/img/interactive/style_big_' + i + '.jpg")',
                    'left': -100 + '%'
                }).appendTo('.background_all');

                $('.background_all').children('div:eq(0)').remove();

                $('.home_dots').children('li:eq(0)').remove();
            }
        }

        $('.eye_left_btn').on('click', (e) => {
            this.move(-1);
        })

        $('.eye_right_btn').on('click', (e) => {
                this.move(1);
            })
            // setInterval((e) => {
            //     this.move(1);
            // }, 3000);
        $('#select_style').on('click', (e) => {
            this.SendGA(this.index + 1);
        })

        $('.background_all').css({
            left: -100 * (this.index) + "%"
        })
        $('.dot_color').eq(this.index).attr('src', 'asset/img/_dot_yellow.png');
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

            $('.eye_style').attr('src', 'asset/img/interactive/style_' + (this.index + 1) + '.png');
            $('.eye_next').parent().attr('href', 'step.html?id=' + (this.index + 1));

        });
    }

    SendGA(goStyleNum) {
        // window.location.href = 'style.html?style=' + goStyleNum;
        switch (goStyleNum) {
            case 1:
                $.gapv('/style2016/select/qq_btn');
                break;
            case 2:
                $.gapv('/style2016/select/gaga_btn');
                break;
            case 3:
                $.gapv('/style2016/select/lomo_btn');
                break;
            case 4:
                $.gapv('/style2016/select/nana_btn');
                break;
            case 5:
                $.gapv('/style2016/select/yoyo_btn');
                break;
            case 6:
                $.gapv('/style2016/select/yen_btn');
                break;
            case 7:
                $.gapv('/style2016/select/bt_btn');
                break;
            default:
                break;
        }
        // $.gapv('/style2016/select/allstyle_btn');
        $.gapv('/style2016/select/next_btn');
    }
}

module.exports = Interactive;