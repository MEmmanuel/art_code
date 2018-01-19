var body = document.getElementsByTagName('body')[0];

var controller = new Controller(body, window);

setInterval(function () {
    controller.render();
}, RENDER_DELAY);
