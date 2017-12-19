class Dice {
    constructor(container, space, width, height, depth, x, y, z) {
        this.div = document.createElement('div');
        this.div.classList.add('dice');
        container.appendChild(this.div);

        this.faces = [];
        var position, face;
        position = [[100, 100, 100], [200, 100, 100], [100, 200, 100]];
        face = new Square(0, this.div, 100, position, getRandomColor(255*2));
        this.faces.push(face);
        position = [[100, 100, 100], [100, 100, 200], [100, 200, 100]];
        face = new Square(1, this.div, 100, position, getRandomColor(255*2));
        this.faces.push(face);
        position = [[100, 100, 100], [100, 100, 200], [200, 100, 100]];
        face = new Square(2, this.div, 100, position, getRandomColor(255*2));
        this.faces.push(face);
        position = [[200, 200, 200], [200, 100, 200], [100, 200, 200]];
        face = new Square(3, this.div, 100, position, getRandomColor(255*2));
        this.faces.push(face);
        position = [[200, 200, 200], [200, 200, 100], [100, 200, 100]];
        face = new Square(4, this.div, 100, position, getRandomColor(255*2));
        this.faces.push(face);
        position = [[200, 200, 200], [200, 200, 100], [200, 100, 100]];
        face = new Square(5, this.div, 100, position, getRandomColor(255*2));
        this.faces.push(face);

        this.space = space;
        this.space.registerElement(this);
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    render(camPosition) {
        for (var i=0; i<6; i++) {
            this.faces[i].render(camPosition);
        }
    }
}
