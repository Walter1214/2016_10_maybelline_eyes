class CutArea {
    constructor(canvasArea, divArea) {
        this._rectangle = $(divArea);
        this._canvas = $(canvasArea);
    }
    getAreaResult() {
        //Get rectangle_area's coordinate and width and height in webpage
        // this._rectangle = $('.rectangle_area'),
        var _rectangle_offset = this._rectangle.offset(),
            rectangle_area = {
                x: _rectangle_offset.left,
                y: _rectangle_offset.top,
                width: this._rectangle.width(),
                height: this._rectangle.height()
            };
        console.log(rectangle_area);
        //Get canvas's coordinate and width and height in webpage
        // this._canvas = $('#canvas'),
        var _canvas_ctx = this._canvas.get(0),
            _canvas_offset = this._canvas.offset(),
            canvas_area = {
                x: _canvas_offset.left,
                y: _canvas_offset.top,
                width: this._canvas.width(),
                height: this._canvas.height()
            }
        console.log(canvas_area);
        //determine rectangle_area and canvas
        var rectangle_result = {
            x: Math.round(rectangle_area.x - canvas_area.x),
            y: Math.round(rectangle_area.y - canvas_area.y),
            width: Math.round(rectangle_area.width),
            height: Math.round(rectangle_area.height)
        }
        console.log(rectangle_result);

        //create elemnt canvas to store the rectangle_area
        var rectangle_canvas = document.createElement('canvas');
        rectangle_canvas.width = rectangle_result.width;
        rectangle_canvas.height = rectangle_result.height;
        var rectangle_ctx = rectangle_canvas.getContext('2d');

        // rectangle_ctx.width= $(hitArea).width();
        // rectangle_ctx.height= $(hitArea).height();

        rectangle_ctx.drawImage(_canvas_ctx, rectangle_result.x, rectangle_result.y, rectangle_result.width, rectangle_result.height, 0, 0, rectangle_result.width, rectangle_result.height);

        return rectangle_canvas.toDataURL("image/jpeg");
        // $('#RectangleImg').attr('src', rectangle_canvas.toDataURL("image/jpeg"));

        // this.emit('complete', rectangle_canvas.toDataURL("image/jpeg"));
    }
}
module.exports = CutArea;