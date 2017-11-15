class Controller {
    constructor(body, window) {
        var controller = this;

        this.body = body;
        this.window = window;
        this.container = document.getElementById('container');
        this.walls = [10, 10, 10, 10];
        this.dots = [
            new Dot(0, this.container,
                Math.random()*window.innerHeight, Math.random()*window.innerWidth,
                getRandomColor(255*2), [Math.random()*2*V_MAX-V_MAX, Math.random()*2*V_MAX-V_MAX])
        ];
    }

    get walls() {
        var l = parseInt(this.container.style.left.split('px'));
        var h = parseInt(this.container.style.height.split('px'));
        var t = parseInt(this.container.style.top.split('px'));
        var w = parseInt(this.container.style.width.split('px'));
        return [t, this.window.innerWidth - w - l, this.window.innerHeight - h - t, l];
    }

    set walls(v) {
        this.container.style.height = this.window.innerHeight-v[0]-v[2];
        this.container.style.width = this.window.innerWidth-v[1]-v[3];
        this.container.style.top = v[0];
        this.container.style.left = v[3];
    }

    click(event) {
        if (event.clientX > this.walls[3] && event.clientY > this.walls[0]
            && event.clientX < window.innerWidth - this.walls[1]
            && event.clientY < window.innerHeight - this.walls[2]) {
            this.dots.push(new Dot(this.dots.length, this.container,
                event.clientY-this.walls[0], event.clientX-this.walls[3],
                getRandomColor(255*2), [Math.random()*2*V_MAX-V_MAX, Math.random()*2*V_MAX-V_MAX]));
        }
    };

    render() {
        for (var i=0; i<this.dots.length; i++) {
            this.dots[i].updatePosition(parseInt((this.container.style.width.split('px')[0])),
                parseInt((this.container.style.height.split('px')[0])));
        }
    }

    startDrag(x, y) {
        if (x < this.walls[0] || x > this.walls[1] || y < this.walls[2] || y > this.walls[3]) {
            this._drag = {x: x, y: y};
        }
    }

    drag(x, y) {
        if (this._drag && (x !== 0 || y !== 0)) {
            this.walls = [this.walls[0] + y - this._drag.y, this.walls[1] + x - this._drag.x,
                this.walls[2] + y - this._drag.y, this.walls[3] + x - this._drag.x];
            this._drag.x = x;
            this._drag.y = y;
        }
        else {
            this._drag = undefined;
        }
    }
}
