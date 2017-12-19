class Controller {
    constructor(body, window) {
        var controller = this;

        this.body = body;
        this.window = window;
        this.container = document.getElementById('container');

        this.space = new Space(window.innerWidth, window.innerHeight, Math.max(window.innerWidth, window.innerHeight));
        this.dice = new Dice(this.container, this.space,
            DICE_WIDTH, DICE_HEIGHT, DICE_DEPTH, this.space.width/2-DICE_WIDTH/2,
          this.space.height/2-DICE_HEIGHT/2, this.space.depth/2-DICE_DEPTH/2);
    }

    render() {
        // x, y, z, dirX, dirY, dirZ, camWidth, camHeight
        var camPosition = [0, 0, 0, 1, 1, 1, window.innerWidth, window.innerHeight];
        for (var i=0; i<this.space.elements.length; i++) {
            this.space.elements[i].render(camPosition)
        }
    }
}
