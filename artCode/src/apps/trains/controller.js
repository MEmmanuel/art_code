class Controller {
    constructor(body, window) {
        var controller = this;

        this.body = body;
        this.window = window;
        this.container = document.getElementById('container');

        this._init();
    }

    _init() {
        this.trains = [];

        // todo: remove trains that arrives
    }

    render() {
        var width;
        for (var i=0; i<TRAIN_COUNT; i++) {
            width = MIN_TRAIN_WIDTH + Math.random()*(MAX_TRAIN_WIDTH-MIN_TRAIN_WIDTH);
            var train = new Train(this.trains.length, this.container, (this.window.innerHeight-TRAIN_HEIGHT)*Math.random(),
              -width, width, TRAIN_HEIGHT, getRandomColor(255*1.8), MIN_TRAIN_SPEED + Math.random()*(MAX_TRAIN_SPEED-MIN_TRAIN_SPEED));
            this.trains.push(train);
            setTimeout((train) => {train.left = this.window.innerWidth}, 100, train);
        }
    }
}
