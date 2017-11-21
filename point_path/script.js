mixpanel.track("Point_path: Page start");

var LOOP_COUNT, N, L;
var ACTIVE = true;

function setup() {
    L = document.getElementById('traine').value;
    N = document.getElementById('nbPoints').value;
    LOOP_COUNT = L;  // to start to 0
    for (var i=0; i<L*N; i++) {
        var s = document.createElement('div');
        s.classList.add('point')
        document.getElementById('draw').appendChild(s);
        s.style.width = document.getElementById('pointSize').value + 'px';
        s.style.height = document.getElementById('pointSize').value + 'px';
        s.style.left = window.innerWidth/2 + 'px';
        s.style.top = window.innerHeight/2 + 'px';
    }

    var p = document.getElementsByClassName('pointer')[0];
    p.style.display = 'block';
    p.style.left = window.innerWidth/2 + 'px';
    p.style.top = window.innerHeight/2 + 'px';
}

function move(event) {
    var ro, t;
    LOOP_COUNT += 1;
    if (LOOP_COUNT >= L) {LOOP_COUNT = 0}
    if (!event) {
        ro = 0;
        t = 0;
    }
    else {
        deltaX = event.pageX - window.innerWidth/2;
        deltaY = event.pageY - window.innerHeight/2;
        ro = cartesianToPolar(deltaX, deltaY)[0];
        t = cartesianToPolar(deltaX, deltaY)[1];
    }
    for (var i=0; i<N; i++) {
        var e = document.getElementsByClassName('point')[LOOP_COUNT*N + i];
        if (!e) {
            console.log(LOOP_COUNT*N+i, document.getElementsByClassName('point').length)
        }
        e.style.top = window.innerHeight/2 + polarToCartesian(ro, (t+2*Math.PI*i/N))[0] + 'px';
        e.style.left = window.innerWidth/2 + polarToCartesian(ro, (t+2*Math.PI*i/N))[1] + 'px';
    }
}

document.getElementById('control').onclick = function() {
    if (ACTIVE) {
        setup();
        document.body.onmousemove = move;
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
            move(e);
        }, false);
        document.getElementById('control').innerText = 'Stop';
        document.getElementById('control').classList.add('stop');
        document.getElementById('control').classList.remove('start');
    }
    else {
        while (document.getElementsByClassName('point').length > 0) {
            document.getElementById('draw').removeChild(document.getElementsByClassName('point')[0])
        }
        document.body.onmousemove = undefined;
        document.body.removeEventListener('touchmove');
        document.getElementById('control').innerText = 'Start';
        document.getElementById('control').classList.add('start');
        document.getElementById('control').classList.remove('stop');
    }
    ACTIVE = !ACTIVE;
};
