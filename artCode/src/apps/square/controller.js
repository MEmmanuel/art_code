class Controller {
    constructor(body, window) {
        var controller = this;

        this.body = body;
        this.window = window;
        this.container = document.getElementById('container');

        this.lightLevel = 255*3;
        this.lightLevelStepDirection = 1;

        this._init();
    }

    _init() {
        this.squares = [];
        var WIDTH = parseInt(this.window.innerWidth/SQUARE_COUNT);
        var HEIGHT = parseInt(this.window.innerWidth/SQUARE_COUNT);
        for (var i=0; i<SQUARE_COUNT; i++) {
            this.squares.push([]);
            for (var j=0; j<SQUARE_COUNT; j++) {
                this.squares[i].push(new Square((i+1)*j, this.container, i*HEIGHT, j*WIDTH,
                  WIDTH, HEIGHT, getRandomColor(this.lightLevel)));
            }
        }
    }

    render() {
        this.lightLevel -= LIGHT_LEVEL_STEP*this.lightLevelStepDirection;
        if (this.lightLevel < 0 || this.lightLevel > 255*3) {this.lightLevelStepDirection *= -1}
        for (var i=0; i<this.squares.length; i++) {
            for (var j=0; j<this.squares[i].length; j++) {
                this.squares[i][j].bgColor = getRandomColor(this.lightLevel);
            }
        }
    }
}
