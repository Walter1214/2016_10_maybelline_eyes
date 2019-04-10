const EventEmitter = require('events').EventEmitter;

class Maybelline_API extends EventEmitter {
    constructor() {
        super();
    }

    postUpload(userEyePhoto) {
        console.log(userEyePhoto);
        $.ajax({
                method: 'POST',
                url: 'api/upload.ashx',
                data: userEyePhoto,
                dataType: "json"
            })
            .done((e) => {
                // alert("success");.
                if (e.RS == "OK")
                    this.emit('GetPhotoId', e);
                else
                    alert(e.RS);
            })
            .fail((e) => {
                // alert("error");
                alert('伺服器忙碌中，請重試');
                // alert('網路不穩在按一次');
            })
            .always((e) => {
                // alert("complete");
            });
    }

    postForm(UserInfo) {
        console.log(UserInfo);
        $.ajax({
                method: 'POST',
                url: 'api/form.ashx',
                data: UserInfo,
                dataType: "json"
            })
            .done((e) => {
                if (e.RS == "OK")
                    this.emit('GetStatus', e.RS);
                else
                    alert(e.RS);
                // alert("success");
                // console.log(e);
                // this.emit('GetStatus', e.RS);
            })
            .fail((e) => {
                // alert("error");
                alert('伺服器忙碌中，請重試');
            })
            .always((e) => {
                // alert("complete");
            });
    }

    postConnect(UserInfo) {
        $.ajax({
                method: 'POST',
                url: 'api/connect.ashx',
                data: UserInfo,
                dataType: "json"
            })
            .done((e) => {
                // alert("success");
                if (e.RS == "OK")
                    this.emit('GetPoster', e);
                else
                    alert(e.RS);

            })
            .fail((e) => {
                // alert("error");
                alert('伺服器忙碌中，請重試');
            })
            .always((e) => {
                // alert("complete");
            });
    }

    postGame(data, href) {
        console.log(data)
        $.ajax({
                method: 'POST',
                url: 'api/game.ashx',
                data: data,
                dataType: "json"
            })
            .done((e) => {
                console.log(e);
                // alert("success");
                if (e.RS == "OK") { console.log(e); } else {
                    alert(e.RS);
                }
            })
            .fail((e) => {
                console.log(e);
                // alert("error");
                alert('伺服器忙碌中，請重試');
            })
            .always((e) => {
                // alert("complete");
                location.href = href;
            });
    }

    postfbshare(data) {
        console.log(data)
        $.ajax({
                method: 'POST',
                url: 'api/fbshare.ashx',
                data: data,
                dataType: "json"
            })
            .done((e) => {
                if (e.RS == "OK") { console.log(e); } else {
                    alert(e.RS);
                }
                // alert("success");
            })
            .fail((e) => {
                console.log(e);
                // alert("error");
                alert('伺服器忙碌中，請重試');
            })
            .always((e) => {
                // alert("complete");
            });
    }
}

module.exports = Maybelline_API;