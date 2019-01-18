class Train {
    constructor(id, container, top, left, width, height, bgColor, speed) {
        this.id = id;
        this.div = document.createElement('div');
        this.div.classList.add('train');
        container.appendChild(this.div);
        this.top = top;
        this.left = left;
        this.div.style.height = height + 'px';
        this.div.style.width = width + 'px';
        this.div.style.borderRadius = height/2 + 'px';
        this.div.style.transition = 'left ' + speed + 's linear';
        this.bgColor = bgColor;
    }

    remove() {
        this.div.style.display = 'none';
    }

    get bgColor() {
        var b = this.div.style.backgroundColor.split('rgb(')[1].split(')')[0].split(', ');
        return [parseInt(b[0]), parseInt(b[1]), parseInt(b[2])]
    }
    set bgColor(v) {
        this.div.style.backgroundColor = 'rgb('+v[0]+', '+v[1]+', '+v[2]+')';
    }

    get left() {return parseFloat(this.div.style.left.split('px')[0])}
    set left(v) {this.div.style.left = v + 'px'}
    get top() {return parseFloat(this.div.style.top.split('px')[0])}
    set top(v) {this.div.style.top = v + 'px'}
}
