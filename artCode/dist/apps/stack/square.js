class Square {
    constructor(id, container, top, left, width, height, bgColor) {
        this.id = id;
        this.div = document.createElement('div');
        this.div.classList.add('square');
        container.appendChild(this.div);
        this.top = top;
        this.left = left;
        this.div.style.height = height + 'px';
        this.div.style.width = width + 'px';
        this.div.style.transition = 'top 1s, opacity 1s, background-color 1s';
        this.bgColor = bgColor;
    }

    remove() {
        this.div.style.opacity = 0;
        setTimeout(() => {
            this.div.style.display = 'none';
        }, 1000);
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
