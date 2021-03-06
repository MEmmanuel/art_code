class Controller {
    constructor(body, window) {
        var controller = this;

        this.body = body;
        this.window = window;
        this.container = document.getElementById('container');
        this.hasInit = false;

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
                [200, 200, 200], [Math.random()*2*V_MAX-V_MAX, Math.random()*2*V_MAX-V_MAX],
                Math.random()*(MAX_WEIGHT-MIN_WEIGHT)+MIN_WEIGHT));
        }
        var x0 = Math.random()*Math.min(window.innerWidth, window.innerHeight);
        for (var i=0; i<DOTS_NUMBER; i++) {
            // find a random dot except i
            var n = Math.floor(Math.random()*(DOTS_NUMBER-1));
            if (n >= i) {n += 1}

            this.dots[i].line = new Line(i, this.container, this.dots[i].left, this.dots[i].top,
                this.dots[n].left, this.dots[n].top, Math.floor(Math.random()*(MAX_FORCE-1))+1,
                x0,
                this.dots[i], this.dots[n]);
            this.dots[i].linkedLines.push(this.dots[i].line);
            this.dots[n].linkedLines.push(this.dots[i].line);
        }
        this.hasInit = true;
    }

    click(event) {
        var r = Math.floor(Math.random()*this.dots.length);
        this.dots[r].xSpeed += Math.random()*10*this.dots[r].xSpeed/Math.abs(this.dots[r].xSpeed);
        this.dots[r].ySpeed += Math.random()*10*this.dots[r].ySpeed/Math.abs(this.dots[r].ySpeed);
    };

    startDrag(t, x, y) {
        if (x !== 0 && y !== 0) {
            var i = parseInt(t.id);
            this.dragging = i;
        }
    }

    drag(t, x, y) {
        if (x !== 0 && y !== 0) {
            var i = parseInt(t.id);
            this.dots[i].div.style.left = x - this.dots[i].weight/2 + 'px';
            this.dots[i].div.style.top = y - this.dots[i].weight/2 + 'px';
            this.dots[i].bgColor = [255, 255, 255];
        }
        else {
            if (this.dragging && this.dots[this.dragging]) {
                this.dots[this.dragging].bgColor = [200, 200, 200];
                this.dragging = undefined;
            }
        }
    }

    endDrag() {
        this.dragging = undefined;
    }

    render() {
        for (var i=0; i<this.dots.length; i++) {
            if (i !== this.dragging) {
                this.dots[i].updatePosition(window.innerWidth, window.innerHeight);
            }
        }
        for (var i=0; i<this.dots.length; i++) {
            var d = this.dots[i];

            d.line.position = [
                d.line.from.left+d.weight/2,
                d.line.from.top+d.weight/2,
                d.line.to.left+d.weight/2,
                d.line.to.top+d.weight/2
            ];
            d.line.updateBgColor();
            // d.line.bgColor = d.bgColor;
        }
    }
}
