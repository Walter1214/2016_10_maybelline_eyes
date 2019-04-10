const EventEmitter = require('events').EventEmitter;

class FB_API extends EventEmitter {
    //status :String
    constructor() {
        super();



        // $(document).on('fbAsyncInit', () => {
        //     FB.getLoginStatus((response) => {
        //         this.status = response.status;

        //         this.token = response.authResponse.accessToken;
        //         console.log(response);
        //         if (response.status === 'connected') {
        //             // this.GetFBUserInfo(response.authResponse.accessToken);
        //             // console.log(response.authResponse.accessToken);
        //         } else {

        //         }
        //     });
        // });

    }
    init() {
        var deff = $.Deferred();
        console.log('init window.FB', window.FB)
        if (window.FB) {
            return deff.resolve().promise();
        }
        $.getScript('//connect.facebook.net/zh_TW/sdk.js', function() {
            FB.init({
                appId: '1723379247981127',
                xfbml: true,
                version: 'v2.8'
            });
            console.log('facebook work');
            deff.resolve();
            // $(document).trigger("fbAsyncInit");
            //FB.getLoginStatus(updateStatusCallback);
        });
        return deff.promise();
    }

    GetFBToken(userEyePhotoId) {

        // if (this.status == 'connected') {
        //     this.GetFBUserInfo();
        // } else {
        var url = `https://www.facebook.com/v2.8/dialog/oauth?client_id=1723379247981127&redirect_uri=` + encodeURIComponent(window.location.href + '&userEyePhotoId=' + userEyePhotoId);
        window.location.href = url;

        // if (!device.desktop()) {
        //     // encodeURIComponent('m_step.html?id=xxxx&img=xxxx.jpg&step=4')
        //     var url = `https://www.facebook.com/v2.8/dialog/oauth?client_id=1723379247981127&redirect_uri=` + encodeURIComponent(window.location.href + '&userEyePhotoId=' + userEyePhotoId);
        //     window.location.href = url;
        // } else {

        //     var url = `https://www.facebook.com/v2.8/dialog/oauth?client_id=1723379247981127&redirect_uri=` + encodeURIComponent(window.location.href + '&userEyePhotoId=' + userEyePhotoId);
        //     window.location.href = url;
        //     // FB.login((response) => {
        //     //     if (response.status === 'connected') {
        //     //         // Logged into your app and Facebook.
        //     //         this.GetFBUserInfo(response.authResponse.accessToken);
        //     //     } else if (response.status === 'not_authorized') {
        //     //         // The person is logged into Facebook, but not your app.
        //     //     } else {
        //     //         // The person is not logged into Facebook, so we're not sure if
        //     //         // they are logged into this app or not.
        //     //     }
        //     // });
        // }

        // }
    }

    GetFBUserInfo() {
        console.log('GetFBUserInfo');
        var deff = $.Deferred();
        FB.api('/me', (response) => {
            console.log(JSON.stringify(response));
            response.token = this.token;
            this.emit('FBUserName', response);
            deff.resolve(this.token);
            // this.emit('FBUserName', JSON.stringify(response));
        });
        return deff.promise();
    }

    deferredGetMe() {
        console.log('deferredGetMe');
        var deff = $.Deferred();
        FB.getLoginStatus((response) => {
            if (response.status === 'connected') {
                this.token = response.authResponse.accessToken;
                deff.resolve();
            } else {
                deff.reject();
            }
        });
        return deff.promise();
    }

    FB_share(dataId) {
        FB.ui({
            method: 'share',
            href: 'http://' + location.host + '/style2016/share.aspx?id=' + dataId,
            mobile_iframe: true
        }, (response) => {
            this.emit('FBShareOver', response);
        });
    }
}

module.exports = FB_API;