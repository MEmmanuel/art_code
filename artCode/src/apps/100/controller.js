const numbers = [
    [[0, 50], [20, 80], [50, 100], [80, 80], [100, 50], [80, 20], [50, 0], [20, 20]], // 0
    [[50, 10], [33, 36], [16, 63], [0, 90], [25, 90], [50, 90], [75, 90], [100, 90]], // 1
    [[30, 0], [10, 25], [0, 50], [10, 75], [30, 100], [55, 75], [70, 50], [80, 25], [100, 0], [100, 25], [100, 50], [100, 75], [100, 100]], // 2
    [[20, 5], [5, 25], [0, 50], [10, 75], [30, 95], [50, 75], [70, 95], [90, 75], [100, 50], [95, 25], [80, 5]], // 3
    [[60, 100], [60, 75], [60, 50], [60, 25], [60, 0], [40, 16], [20, 33], [0, 50], [45, 75], [75, 75], [100, 75]], // 4
    [[0, 100], [0, 75], [0, 50], [0, 25], [0, 0], [25, 0], [27, 25], [30, 50], [40, 75], [62, 100], [85, 75], [94, 50], [98, 25], [100, 0]], // 5
    [[0, 50], [10, 35], [25, 20], [40, 10], [55, 0], [75, 10], [90, 25], [100, 50], [90, 70], [80, 85], [65, 95], [52, 85], [48, 65], [50, 40]], // 6
    [[0, 0], [0, 33], [0, 67], [0, 100], [25, 80], [50, 60], [75, 40], [100, 20]], // 7
    [[0, 50], [10, 70], [25, 90], [40, 70], [50, 50], [40, 30], [25, 10], [10, 30], [50, 50], [60, 80], [75, 100], [90, 80], [100, 50], [90, 20], [75, 0], [60, 20]], // 8
    [[100, 50], [90, 65], [75, 80], [60, 90], [45, 100], [25, 90], [10, 75], [0, 50], [10, 30], [20, 15], [35, 5], [48, 15], [52, 35], [50, 60]], // 9
];

class Controller {
    constructor(body, window, followersCount) {
        var controller = this;

        this.body = body;
        this.window = window;
        this.container = document.getElementById('container');
        this.followersCount = followersCount;

        this._init();
    }

    _init() {
        this.start = new Date();
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.fixedDots = [];
        this.dots = [];
        var WIDTH = 150;
        var HEIGHT = 200;
        var SPACE = 100;
        var startPosX = (this.window.innerWidth-WIDTH*3-SPACE*2)/2;
        var startPosY = (this.window.innerHeight-HEIGHT)/2;

        for (var j=0; j<(this.followersCount+'').length; j++) {
            var dList = numbers[parseInt((this.followersCount+'')[j])];
            for (var k=0; k<dList.length; k++) {
                this.fixedDots.push(new Dot(this.fixedDots.length, this.container,
                  startPosY + dList[k][0] * HEIGHT / 100,
                  (WIDTH + SPACE) * j + startPosX + dList[k][1] * WIDTH / 100,
                  [0, 0, 0], [0, 0], 5000, true));
            }
        }
    }

    click(event) {
        this.dots.push(new Dot(this.fixedDots.length + this.dots.length, this.container, event.clientY, event.clientX,
            getRandomColor(255*2), [Math.random()*2*V_MAX-V_MAX, Math.random()*2*V_MAX-V_MAX], 1));
    };

    render() {
        for (var i=0; i<this.dots.length; i++) {
            this.dots[i].updatePosition(window.innerWidth, window.innerHeight, this.fixedDots);
        }
    }
}
