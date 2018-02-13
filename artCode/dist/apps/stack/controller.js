class Controller {
    constructor(body, window) {
        var controller = this;

        this.body = body;
        this.window = window;
        this.container = document.getElementById('container');

        this._init();
        this.WIDTH = parseInt(this.window.innerWidth/SQUARE_COUNT);
        this.HEIGHT = parseInt(this.window.innerWidth/SQUARE_COUNT);
        this._movingCount = 0;
    }

    _init() {
        this.squares = [];
        this.colors = [];
        for (var i=0; i<SQUARE_COUNT; i++) {
            this.squares.push([]);
        }
    }

    click() {
        if (this._movingCount === 0) {
            for (var i=0; i<SQUARE_COUNT; i++) {
                var s = this.squares[i].splice(0, 1)[0];
                if (s) {
                    s.remove()
                }
            }
            for (var i=0; i<SQUARE_COUNT; i++) {
                for (var j=0; j<this.squares[i].length; j++) {
                    this._movingCount += 1;
                    var f = (i, j) => {
                        return () => {
                            this.squares[i][j].top += this.HEIGHT;
                            this._movingCount -= 1;
                        }
                    };
                    setTimeout(f(i, j), 40*j);
                }
            }
        }
    };

    render() {
        var col = Math.floor(Math.random()*SQUARE_COUNT);
        var row = this.squares[col].length;
        var square = new Square((row+1)*col, this.container, -this.HEIGHT, col*this.WIDTH,
            this.WIDTH, this.HEIGHT, getRandomColor(255*1.8));
        this.squares[col].push(square);
        setTimeout(() => {
            square.top = this.window.innerHeight - (row+1)*this.HEIGHT;
            setTimeout(() => {
                this.colors[col] = square.bgColor;
            }, 1000);
        }, 100)
        for (var i=0; i<SQUARE_COUNT; i++) {
            if (this.colors[i]) {
                for (var j=this.squares[i].length-2; j>=0; j--) {
                    if (this.squares[i][j].bgColor[0] !== this.colors[i][0]
                            && this.squares[i][j].bgColor[1] !== this.colors[i][1]
                            && this.squares[i][j].bgColor[2] !== this.colors[i][2]) {
                        this.squares[i][j].bgColor = this.colors[i];
                        break
                    }
                }
            }
        }
    }
}
