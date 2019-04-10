const Fileupload = require('./fileupload.js');
const HammerEffect = require('./HammerEffect.js');
const CutArea = require('./cutArea.js');
const fb_API = require('./fb/fb.js');
const maybelline_API = require('./api/api.js');

const canvas = $('#canvas').get(0);
const canvas2 = $('#canvas2').get(0);
const hitArea = $('.hit_area').get(0);
const rectangle_area = $('.rectangle_area').get(0);
const uploadPhoto = $('#upload_photo').get(0);

class Step {
    constructor() {

        var FB_API = new fb_API();

        // FB_API.init();
        var Maybelline_API = new maybelline_API();
        this.dataUserId = null;
        this.queryObject = null;
        this._App = App.create();


        //ChoseStyle
        this.getQueryString();
        this.id = this.queryObject.id;

        $('.upload_btn').on('click', (e) => {
            $('#upload_photo').click();
        });
        //Default steppage

        if (this.queryObject.userEyePhotoId) {
            $('.uploading_content').removeClass('hide_content');

            FB_API.init()
                .then(() => {
                    return FB_API.deferredGetMe();
                })
                .then(() => {
                    return FB_API.GetFBUserInfo();
                })
                .done((token) => {
                    console.log('token', token);
                });

        } else {
            FB_API.init();

            $('.step2_1_content').removeClass('hide_content');
            (!device.desktop() ? $.gapv('/style2016/m_upload.html') : $.gapv('/style2016/upload.html'));

        }

        // $('.step2_1_content').removeClass('hide_content');
        // $('.step2_1_content').addClass('hide_content');

        $('.btn_backupload').on('click', (e) => {
            $('.step2_1_content').removeClass('hide_content');
            $('.step2_2_content').addClass('hide_content');
        });

        $('.btn_recutting').on('click', (e) => {
            $('.step2_2_content').removeClass('hide_content');
            $('.step3_content').addClass('hide_content');

        });

        $('.final_step').on('click', (e) => {
            App.instance.selectImage()
            App.instance.render()
            var userEyePhoto = {
                pic: this.getResult(),
                type: this.id,
                dev: (!device.desktop() ? 'mobile' : 'pc')
            };

            // this.getResult();
            //get fb token 

            Maybelline_API.postUpload(userEyePhoto);


        });

        Maybelline_API.on('GetPhotoId', (e) => {
            console.log(e);
            FB_API.GetFBToken(e.pid);
        })

        FB_API.on('FBUserName', (e) => {
            console.log(e);
            var FBInfo = {
                fbid: e.id,
                fbname: e.name,
                token: e.token,
                pid: this.queryObject.userEyePhotoId
            }
            $('.step3_content').addClass('hide_content');
            $('.uploading_content').removeClass('hide_content');
            Maybelline_API.postConnect(FBInfo);
        });

        Maybelline_API.on('GetPoster', (e) => {
            console.log(e);
            $('.poster').attr('src', 'http://' + location.host + '/style2016/' + e.photo);


            $('.uploading_content').addClass('hide_content');
            $('.final_content').removeClass('hide_content');
            (!device.desktop() ? $.gapv('/style2016/m_poster.html') : $.gapv('/style2016/poster.html'));
            this.dataUserId = e.pid;
            $.ajax({
                // dataType: "json",
                url: "https://graph.facebook.com/",
                method: "POST",
                data: { id: 'http://' + location.host + '/style2016/share.aspx?id=' + this.dataUserId, scrape: true }
            });


        });

        $('.fb_share_btn').on('click', (e) => {
            var data = {
                pid: this.dataUserId
            }
            Maybelline_API.postfbshare(data);
            //fb 分享
            FB_API.FB_share(this.dataUserId);

        });

        FB_API.on('FBShareOver', (e) => {
            console.log(e);
            $('.final_content').addClass('hide_content');
            $('.user_contenct').removeClass('hide_content');
            (!device.desktop() ? $.gapv('/style2016/m_data.html') : $.gapv('/style2016/data.html'));
        });


        $('.sent_out').on('click', (e) => {
            let err = '';
            if (!$('#agreement').prop('checked')) err += '請詳閱並同意活動辦法、注意事 項及個資保護聲明\r';
            if (err !== '') {
                alert(err);
                return false;
            }
            if (!$('#user_name').val()) err += '請輸入姓名\r';
            if (!$('#user_email').val()) err += '請輸入Email\r';
            if (!$('#user_phone').val()) err += '請輸入電話\r';
            if (err !== '') {
                alert(err);
                return false;
            }

            if (!anteater.Validate.isEmail($('#user_email').val())) {
                alert('信箱格式錯誤');
                return;
            }
            if (!anteater.Validate.isPhoneNumber($('#user_phone').val())) {
                alert('電話格式錯誤');
                return;
            }

            var useInfo = {
                pid: this.dataUserId,
                name: $('#user_name').val(),
                email: $('#user_email').val(),
                tel: $('#user_phone').val()
            };

            Maybelline_API.postForm(useInfo);
            // console.log(useInfo);
        });

        Maybelline_API.on('GetStatus', (e) => {
            console.log(e);
            if (e == 'OK') {
                alert('資料成功送出！繼續體驗其他風格，眼出不同的你，就有更多機會獲得眼線液試用正品哦！');
                window.location.href = 'index.html';
            } else {
                // alert('網路連線不穩、輸入格式錯誤!');
            }
        });
        //hand event
        this.hammer = new HammerEffect(hitArea, data => this.drawCanvas(data));

        $(hitArea).children('.icon_big').on('click', (e) => {
            this.hammer.scaleShift(0.1);
        }).end().children('.icon_small').on('click', (e) => {
            this.hammer.scaleShift(-0.1);
        }).end().children('.icon_turnleft').on('click', (e) => {
            this.hammer.rotateShift(-10);
        }).end().children('.icon_turnright').on('click', (e) => {
            this.hammer.rotateShift(10);
        });


        //CutArea
        var cutArea = new CutArea(canvas, rectangle_area);

        $('.next_step3').on('click', (e) => {

            $('#RectangleImg').attr('src', cutArea.getAreaResult());
            $('.step2_2_content').addClass('hide_content');
            $('.step3_content').removeClass('hide_content');
            (!device.desktop() ? $.gapv('/style2016/m_adjust.html') : $.gapv('/style2016/adjust.html'));

            var oldCallback = this._App.loader.completeCallback;
            this._App.loader.completeCallback = () => {
                oldCallback();
                this._App.tool.setControls(ControlSet.getScalerWithRotate());
            };

            this._App.loader.load([
                require('../img/step_3/' + this.id + '_L.png'),
                require('../img/step_3/' + this.id + '_R.png')
            ]);


        });

        //image onload
        this.sourceImg = new Image();

        this.sourceImg.onload = (e) => {
            console.log(e);
            this.hammer.init(this.sourceImg.width, this.sourceImg.height, canvas.width, canvas.height);
            $('.step2_1_content').addClass('hide_content');
            $('.step2_2_content').removeClass('hide_content');
            (!device.desktop() ? $.gapv('/style2016/m_cut.html') : $.gapv('/style2016/cut.html'));
            // this.hammer.init(this.source.width, this.source.height, canvas.width, canvas.height)
        };

        // upload img
        var fileupload = new Fileupload(uploadPhoto);

        fileupload.on('UserPhoto', (e) => {
            this.sourceImg.src = e;
        });
        $('.remind_figure').on('click', (e) => {
            $('.remind_figure').hide();
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

    drawCanvas(hammerData) {
        /**
         * @param {{scale:number,angle:number,x:number,y:number}} hammerData 
         * */
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (hammerData) {
            ctx.save();

            var radian = hammerData.angle * Math.PI / 180;
            var scale = hammerData.scale;

            ctx.translate(hammerData.x, hammerData.y);
            ctx.rotate(radian);
            ctx.scale(scale, scale);

            ctx.drawImage(this.sourceImg, hammerData.centerX * -1, hammerData.centerY * -1);
            ctx.restore();
        }
    }

    getResult() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 164;

        ctx.drawImage(document.getElementById('RectangleImg'), 0, 0);
        ctx.drawImage(document.getElementById('canvas2'), 0, 43, 500, 164, 0, 0, 500, 164);

        // $('#result_img').attr('src', canvas.toDataURL("image/jpeg"));

        // console.log(canvas.toDataURL("image/jpeg"));

        return canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,", "");
    }

}

module.exports = Step;