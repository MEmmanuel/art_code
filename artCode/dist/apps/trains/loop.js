var body = document.getElementsByTagName('body')[0];

var controller = new Controller(body, window);

document.body.onclick = function (e) {controller.click(e)};

setInterval(function () {
    controller.render();
}, RENDER_DELAY);
