require("m_step.jade");
require("m_step.scss");

require('../lib/TransformTool/Utils');
require('../lib/TransformTool/TransformTool');
require('../lib/TransformTool/TransformCanvasPictures');
require('../lib/anteater.validate');

var common = require("./m/common.js");

const Step = require('./step');

$(() => {
    common.init();

    $('.teaching_img').on('click', (e) => {
        $(e.target).hide();
    });
    var step = new Step();
});