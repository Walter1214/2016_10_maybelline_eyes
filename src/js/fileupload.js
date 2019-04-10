const EventEmitter = require('events').EventEmitter;

class FileUpload extends EventEmitter {
    constructor(InputDom) {
        super();
        console.log(InputDom);
        $(InputDom).on('change', (e) => {
            var input = event.target.files[0];
            this.setPhotoInfo(input);
        })
    }

    setPhotoInfo(PhotoPath) {
        console.log(PhotoPath);
        canvasResize(PhotoPath, {
            width: 2000,
            height: 2000,
            crop: false,
            quality: 100,
            callback: (data, width, height, imageData) => {
                console.log("onParseImageComplete", width, height);
                this.emit('UserPhoto', data);
                // if (width < CROP_IMAGE_SIZE && height < CROP_IMAGE_SIZE) {
                //     alert("選取的圖片太小張，換一張試試看");
                // } else {
                //     this.source.src = data;
                // }
            }
        });
    }

}
module.exports = FileUpload;