class Controller {
    constructor(body, window) {
        var controller = this;

        this.body = body;
        this.window = window;
        this.container = document.getElementById('container');

        this._init();
    }

    _init() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.dots = [];
        for (var i=0; i<DOTS_NUMBER; i++) {
            this.dots.push(new Dot(i, this.container,
                Math.random()*window.innerHeight, Math.random()*window.innerWidth,
                getRandomColor(255*2), [Math.random()*2*V_MAX-V_MAX, Math.random()*2*V_MAX-V_MAX]));
        }
    }

    click(event) {
        this.dots.push(new Dot(this.dots.length, this.container, event.clientY, event.clientX,
            getRandomColor(255*2), [Math.random()*2*V_MAX-V_MAX, Math.random()*2*V_MAX-V_MAX]));
    };

    findNearest(dot, limit) {
        var d1 = Math.max(window.innerHeight, window.innerWidth);
        var d2 = Math.max(window.innerHeight, window.innerWidth);
        var n1, n2;
        for (var i=0; i<this.dots.length; i++) {
            if (this.dots[i].id !== dot.id) {
                var td = distance([this.dots[i].top, this.dots[i].left], [dot.top, dot.left]);
                if (td < d2) {
                    if (td < d1) {
                        d2 = d1;
                        d1 = td;
                        n2 = n1;
                        n1 = this.dots[i];
                    }
                    else {
                        d2 = td;
                        n2 = this.dots[i];
                    }
                }
            }
        }
        return [n1, n2];
    }

    calculate() {}

    render() {
        for (var i=0; i<this.dots.length; i++) {
            this.dots[i].updatePosition(window.innerWidth, window.innerHeight);
        }
        for (var i=0; i<this.dots.length; i++) {
            var d = this.dots[i];

            var nearestDot = this.findNearest(this.dots[i], 2);
            if (!d.line) {
                d.line = [new Line(this.dots[i].id, this.container, this.dots[i].left, this.dots[i].top,
                  nearestDot[0].left, nearestDot[0].top, d.bgColor), new Line(this.dots[i].id, this.container, this.dots[i].left, this.dots[i].top,
                  nearestDot[1].left, nearestDot[1].top, d.bgColor)];
            }
            else {
                d.line[0].position = [this.dots[i].left, this.dots[i].top,
                nearestDot[0].left, nearestDot[0].top];
                d.line[1].position = [this.dots[i].left, this.dots[i].top,
                nearestDot[1].left, nearestDot[1].top];
                d.line[0].bgColor = d.bgColor;
                d.line[1].bgColor = d.bgColor;
            }
        }
    }
}
