class Space {
    constructor(width, height, depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.elements = [];
    }

    registerElement(element) {
        this.elements.push(element)
    }
}
