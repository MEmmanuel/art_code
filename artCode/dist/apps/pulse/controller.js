class Controller {
    constructor(body, window) {
        var controller = this;

        this.body = body;
        this.window = window;
        this.container = document.getElementById('container');

        this._init();
    }

    _init() {
        this.dots = [];
        this.addDot();
    }

    click(event) {
      var found = false;
        for (var i=0; i<this.dots.length; i++) {
            if (distance(this.dots[i].centerPosition, [event.clientX, event.clientY]) < this.dots[i].radius) {
                found = true;
                this.dots[i].remove();
                this.dots.splice(i, 1);
                break
            }
        }
        if (!found) {
            this.addDot(event.clientY, event.clientX);
        }
    };

    addDot(x, y) {
        if (!x || !y) {
            x = Math.random()*window.innerWidth;
            y = Math.random()*window.innerHeight;
        }
        this.dots.push(new Dot(this.dots.length, this.container, x, y, getRandomColor(255*2), 1+Math.random()*(V_MAX-1)));
    }

    render() {
        for (var i=0; i<this.dots.length; i++) {
            this.dots[i].update(window.innerWidth, window.innerHeight, this.dots);
        }
    }
}
