class Style {
    constructor() {
        this.index = 0;
        this.MAX = 5;
        this.queryObject = null;

        this.getQueryString();
        // console.log(this.queryObject.style);
        this.GetStylePhotoNumber();

        require('../img/style/style_title_' + this.queryObject.id + '.png');
        // GA code
        $.gapv('/style2016/style_All.html');


        $('#style_title').attr('src', 'asset/img/style/style_title_' + this.queryObject.id + '.png');

        for (let i = 1; i <= this.MAX; i++) {
            require('../img/style/' + this.queryObject.id + i + '.jpg');

            // $('.background_all').children('img:eq(0)').clone().attr('src', 'asset/img/style/' + this.queryObject.style + i + '.jpg').css('left', (100 * (i - 1) + '%')).appendTo('.background_all');
            $('.background_all').children('div:eq(0)').clone().css({
                'background-image': 'url("asset/img/style/' + this.queryObject.id + i + '.jpg")',
                'left': (100 * (i - 1)) + '%'
            }).appendTo('.background_all');

            if (i === 1) {
                // $('.background_all').children('img:eq(0)').clone().attr('src', 'asset/img/style/' + this.queryObject.style + i + '.jpg').css('left', (100 * (this.MAX) + '%')).appendTo('.background_all');
                $('.background_all').children('div:eq(0)').clone().css({
                    'background-image': 'url("asset/img/style/' + this.queryObject.id + i + '.jpg")',
                    'left': (100 * (this.MAX)) + '%'
                }).appendTo('.background_all');
            } else {
                $('.home_dots').children('li:eq(0)').clone().appendTo('.home_dots');
            }
            if (i === this.MAX) {
                // $('.background_all').children('img:eq(0)').clone().attr('src', 'asset/img/style/' + this.queryObject.style + i + '.jpg').css('left', (-100 + '%')).appendTo('.background_all');
                $('.background_all').children('div:eq(0)').clone().css({
                    'background-image': 'url("asset/img/style/' + this.queryObject.id + i + '.jpg")',
                    'left': -100 + '%'
                }).appendTo('.background_all');
                // $('.background_all').children('img:eq(0)').remove();
                $('.background_all').children('div:eq(0)').remove();

                $('.home_dots').children('li:eq(0)').remove();
            }
        }

        // setInterval((e) => {
        //     this.move(1);
        // }, 3000);

        $('.r_btn').on('click', e => {
            this.move(1);
        })

        $('.l_btn').on('click', e => {
            this.move(-1);
        })

        $('.btn_undo').on('click', e => {
            var undo_num = parseInt(this.queryObject.id) - 1;
            if (undo_num < 1) {
                undo_num = 5;
            }
            // console.log(undo_num);
            window.location.href = 'style.html?id=' + undo_num;
        })
        $('.btn_next').on('click', e => {
            var next_num = parseInt(this.queryObject.id) + 1;
            if (next_num > 5) {
                next_num = 1;
            }
            // console.log(next_num);
            window.location.href = 'style.html?id=' + next_num;
        })

        $('.back_btn').on('click', e => {
            window.location.href = 'guide.html';
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
            if (parseInt(this.index) + 1 == this.MAX) {
                $('.btn_undo').show();
                $('.btn_next').show();
            } else {
                $('.btn_undo').hide();
                $('.btn_next').hide();
            }
        });
    }

    getQueryString(name) {
        if (queryString != null) {
            return this.queryObject[name];
        }
        var params = {};
        var pattern1 = /([^&^=]+)=([^&^=]+)/g;
        var pattern2 = /([^=]+)/g;
        var is_input = document.URL.indexOf('?');
        if (is_input >= 0) {
            var queryString = document.URL.substring(is_input + 1, document.URL.length);
            var curMatch = [];
            var matchList = queryString.match(pattern1);
            for (var i in matchList) {
                curMatch = String(matchList[i]).match(pattern2);
                params[curMatch[0]] = curMatch[1];
            }
        }
        this.queryObject = params;
        return this.queryObject[name];
    }

    GetStylePhotoNumber() {
        switch (parseInt(this.queryObject.id)) {
            case 1:
                this.MAX = 3;
                break;
            case 2:
                this.MAX = 3;
                break;
            case 3:
                this.MAX = 4;
                break;
            case 4:
                this.MAX = 3;
                break;
            case 5:
                this.MAX = 3;
                break;
            default:
                break;
        }
    }
}

module.exports = Style;