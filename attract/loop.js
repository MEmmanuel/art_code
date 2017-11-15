var body = document.getElementsByTagName('body')[0];

var controller = new Controller(body, window);

document.body.onmousemove = controller.move;
// document.addEventListener('touchmove', function(e) {
//     e.preventDefault();
//     controller.move(e);
// }, false);
document.body.onclick = function (e) {controller.click(e)};
// document.addEventListener('click', function(e) {
//     e.preventDefault();
//     controller.click(e);
// }, false);

setInterval(function () {
    controller.render();
}, RENDER_DELAY);

setInterval(function () {
    controller.calculate();
}, CALCULATE_DELAY);