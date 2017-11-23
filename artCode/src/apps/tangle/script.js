var ANGLE = -3;
var X_NUMBER = 100;
var Y_NUMBER = 10;
var body = document.getElementsByTagName('body')[0];

function move() {
    ANGLE = (event.pageX - window.innerWidth/2)/100;
    var top;
    var divList = body.getElementsByTagName('div');
    for (var i=0; i<X_NUMBER; i++) {
        top = 0;
        for (var j=0; j<Y_NUMBER; j++) {
            var div = divList[i*Y_NUMBER+j];
            div.style.top = top + 'px';
            div.style.left = -2000 + i*101 + ANGLE*top + 'px';
            div.style.transform = "matrix(1, 0, "+ANGLE+", 1, 0, 0)";
            top += parseInt(div.style.height.split('px')[0]) + 1;
        }
    }
}

function draw() {
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
    var r, g, b, h, top;
    r = Math.round(Math.random()*255);
    g = Math.round(Math.random()*255);
    b = Math.round(Math.random()*255);
    for (var i=0; i<X_NUMBER; i++) {
        top = 0;
        for (var j=0; j<Y_NUMBER; j++) {
            r += Math.round((Math.random()-0.5)*20);
            if (r<0) {r=0}
            else if (r>255) {r=255}
            g += Math.round((Math.random()-0.5)*20);
            if (g<0) {g=0}
            else if (g>255) {g=255}
            b += Math.round((Math.random()-0.5)*20);
            if (b<0) {b=0}
            else if (b>255) {b=255}
            var div = document.createElement('div');
            h = 100 + Math.round(Math.random()*200);
            div.style.height = h;
            div.style.backgroundColor = "rgb("+r+","+g+","+b+")";
            div.style.top = top + 'px';
            div.style.left = -2000 + i*101 + ANGLE*top + 'px';
            div.style.transform = "matrix(1, 0, "+ANGLE+", 1, 0, 0)";
            body.appendChild(div);
            top += h + 1;
        }
    }
}

function setup() {
    draw();
    document.body.onmousemove = move;
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
        move();
    }, false);
    document.body.onclick = draw;
    document.addEventListener('click', function(e) {
        e.preventDefault();
        draw();
    }, false);
}

setup();
