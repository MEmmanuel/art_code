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
document.addEventListener('drag', function(e) {
    controller.drag(e.target, e.x, e.y);
}, false);
document.addEventListener('dragstart', function(e) {
    var div = document.createElement('div');
    div.style.display = 'none';
    document.body.appendChild(div);
    e.dataTransfer.setDragImage(div, 0, 0);
    controller.startDrag(e.target, e.x+e.offsetX-10, e.y+e.offsetY-10);
}, false);

setInterval(function () {
    if (controller.hasInit) {
        controller.render();
    }
}, RENDER_DELAY);
