class Product {
    constructor() {
        this.index = 0;
        this.MAX = 3;

        require('../img/product/product_text_1.jpg');
        require('../img/product/product_text_2.jpg');
        require('../img/product/product_text_3.jpg');
        require('../img/product/product_photo_1.jpg');
        require('../img/product/product_photo_2.jpg');
        require('../img/product/product_photo_3.jpg');


        $('.product_r_btn').on('click', e => {
            // this.RightMove();
            this.move(1);
        })
        $('.product_l_btn').on('click', e => {
            // this.LeftMove();
            this.move(-1);
        })


        $(window).resize((e) => {
            var windowWidth;
            if ($(window).width() < 1000) {
                windowWidth = 1000;
            } else {
                windowWidth = $(window).width();
            }

            $('.background_right').width($('#product_text').width());
            $('.background_left').width(windowWidth - $('#product_text').width());
            // console.log(windowWidth);
            // console.log($('#product_text').width());
            // console.log(windowWidth - $('#product_text').width());

        }).resize();

        $('#yahoo_logo').on('click', (e) => {

            // dataLayer.push({
            //     'category': 'ec',
            //     'action': 'click',
            //     'label': 'yahoo',
            //     'event': 'gtm.click',
            //     'eventCallback': function() {
            //         console.log('ALL tags which fire on {{event}} equals fireTags have now fired');
            //         window.location.href = 'https://tw.mall.yahoo.com/store/媚比琳MAYBELLINE官方旗艦店:maybelline-tw;_ylt=AgopdgVi58IVhrlHmg2b3S1iTB4J;_ylv=3'
            //     }
            // });

            // dataLayer.push({
            //     'event': 'yahoo.click',
            //     'category': 'ec',
            //     'action': 'click',
            //     'label': 'yahoo',
            //     'eventCallback': function() {
            //         console.log('ALL tags which fire on {{event}} equals fireTags have now fired');
            //         // window.location.href = 'https://tw.mall.yahoo.com/store/媚比琳MAYBELLINE官方旗艦店:maybelline-tw;_ylt=AgopdgVi58IVhrlHmg2b3S1iTB4J;_ylv=3'
            //     }
            // });


            // dataLayer.push({ 'event': 'yahoo.click', 'category': 'ec', 'action': 'click', 'label': 'yahoo' });

            // window.location.href = 'https://tw.mall.yahoo.com/store/媚比琳MAYBELLINE官方旗艦店:maybelline-tw;_ylt=AgopdgVi58IVhrlHmg2b3S1iTB4J;_ylv=3'
            // dataLayer.push({'event': 'event_name'}
        });


        setInterval((e) => {
            this.move(1);
        }, 4000);
    }

    move(i) {
        if (this.moving) return;
        this.moving = true;

        $('.left_silder').animate({
            left: -100 * (this.index + i) + "%"
        }, () => {
            this.index += i;
            if (this.index >= this.MAX) this.index = 0;
            else if (this.index < 0) this.index = this.MAX - 1;

            $('.left_silder').css('left', -100 * this.index + "%");

            this.moving = false;

            $('.dot_color').each((index, e) => {
                if (this.index == index) {
                    $(e).attr('src', 'asset/img/_dot_yellow.png');
                    $('#product_text').attr('src', 'asset/img/product/product_text_' + (index + 1) + '.jpg');
                } else {
                    $(e).attr('src', 'asset/img/dot_white.png');
                }

            })
        });
    }
}

module.exports = Product;