class Controller {
    constructor(body, window) {
        var controller = this;

        this.body = body;
        this.window = window;
        this.forceInput = document.getElementById('forceInput');
        this.forceInput.value = FORCE;
        this.initialQuantity = document.getElementById('initialQuantity');
        this.initialQuantity.value = DOTS_NUMBER;
        this.leftIndicator = document.getElementById('indicator');
        document.getElementById('restart').onclick = function () {setTimeout(function () {controller._init()}, 1)};
        this.container = document.getElementById('container');

        this._init();
    }

    _setTime() {
        var d = new Date()-this.start;
        var s = parseInt(d/1000);
        var r = '' + parseInt((d/1000-s)*100);
        if (r.length == 1) {r = '0'+r}
        if (r.length == 0) {r = '00'}
        document.getElementById('time').innerHTML =
            s + ':' + r;
    }

    _init() {
        this.start = new Date();
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.dots = [];
        for (var i=0; i<this.initialQuantity.value; i++) {
            this.dots.push(new Dot(i, this.container,
                Math.random()*window.innerHeight, Math.random()*window.innerWidth,
                getRandomColor(255*2), [Math.random()*2*V_MAX-V_MAX, Math.random()*2*V_MAX-V_MAX]));
        }
        this._maxEnergy = 0;
        this.leftIndicator.innerText = this.dots.length;
        this._setTime();
    }

    click(event) {
        this.dots.push(new Dot(this.dots.length, this.container, event.clientY, event.clientX,
            getRandomColor(255*2), [Math.random()*2*V_MAX-V_MAX, Math.random()*2*V_MAX-V_MAX]));
    };

    findNearest(dot) {
        var d = Math.max(window.innerHeight, window.innerWidth);
        var n;
        for (var i=0; i<this.dots.length; i++) {
            if (this.dots[i].id !== dot.id) {
                var td = distance([this.dots[i].top, this.dots[i].left], [dot.top, dot.left]);
                if (td < d) {
                    d = td;
                    n = this.dots[i];
                }
            }
        }
        return n;
    }

    calculate() {
        if (!this._calculationIndex || this._calculationIndex >= this.dots.length) {this._calculationIndex = 0}
        var dot1 = this.findNearest(this.dots[this._calculationIndex]);
        if (dot1) {
            var dot2 = this.dots[this._calculationIndex];
            var e1 = dot1.xSpeed**2+dot1.ySpeed**2;
            var e2 = dot2.xSpeed**2+dot2.ySpeed**2;
            if (e1 > e2) {
                var p = -this.forceInput.value * e2 / 100;
                var r = dot2.xSpeed**2 / e2;
                dot1.xSpeed = Math.sqrt(dot1.xSpeed**2 - r*p) * Math.abs(dot1.xSpeed) / dot1.xSpeed;
                dot1.ySpeed = Math.sqrt(dot1.ySpeed**2 - (1-r)*p) * Math.abs(dot1.ySpeed) / dot1.ySpeed;
                dot2.xSpeed = Math.sqrt(dot2.xSpeed**2 + r*p) * Math.abs(dot2.xSpeed) / dot2.xSpeed;
                dot2.ySpeed = Math.sqrt(dot2.ySpeed**2 + (1-r)*p) * Math.abs(dot2.ySpeed) / dot2.ySpeed;

                e2 = dot2.xSpeed**2+dot2.ySpeed**2;
                if (e2 > this._maxEnergy) {this._maxEnergy = e2}
                dot2.opacity = e2/this._maxEnergy;
                if (e2*10000 < DEATH_LIMIT) {
                    for(var i=0; i<this.dots.length; i++) {
                        if (this.dots[i].id === dot2.id) {
                            this.dots[i].remove();
                            this.dots.splice(i,1);
                        }
                    }
                }
            }
            else if (e1 < e2) {
                var p = -this.forceInput.value * e1 / 100;
                var r = dot1.xSpeed**2 / e1;
                dot1.xSpeed = Math.sqrt(dot1.xSpeed**2 + r*p) * Math.abs(dot1.xSpeed) / dot1.xSpeed;
                dot1.ySpeed = Math.sqrt(dot1.ySpeed**2 + (1-r)*p) * Math.abs(dot1.ySpeed) / dot1.ySpeed;
                dot2.xSpeed = Math.sqrt(dot2.xSpeed**2 - r*p) * Math.abs(dot2.xSpeed) / dot2.xSpeed;
                dot2.ySpeed = Math.sqrt(dot2.ySpeed**2 - (1-r)*p) * Math.abs(dot2.ySpeed) / dot2.ySpeed;

                e1 = dot1.xSpeed**2+dot1.ySpeed**2;
            }
        }

        this._calculationIndex += 1;
        this.leftIndicator.innerText = this.dots.length;
    }

    render() {
        for (var i=0; i<this.dots.length; i++) {
            this.dots[i].updatePosition(window.innerWidth, window.innerHeight);
        }
        this._setTime();
    }
}
