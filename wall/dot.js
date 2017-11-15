class Dot {
    constructor(id, container, top, left, bgColor, speedVector) {
        this.id = id;
        this.div = document.createElement('div');
        this.div.classList.add('dot');
        container.appendChild(this.div);
        this.top = top;
        this.left = left;
        this.div.style.height = DOT_SIZE + 'px';
        this.div.style.width = DOT_SIZE + 'px';
        this.div.style.backgroundColor = 'rgb('+bgColor[0]+', '+bgColor[1]+', '+bgColor[2]+')';
        this.xSpeed = speedVector[0] / 10;
        this.ySpeed = speedVector[1] / 10;
        this.opacity = 1;
    }

    remove() {
        this.div.style.display = 'none';
    }

    updatePosition(maxWidth, maxHeight) {
        this.left += this.xSpeed;
        if (this.left < 0 || this.left > maxWidth) {
            this.xSpeed = -this.xSpeed;
            if (this.left < 0) {this.left = -this.left}
            if (this.left > maxWidth) {this.left = 2*maxWidth-this.left}
        }
        this.top += this.ySpeed;
        if (this.top < 0 || this.top > maxHeight) {
            this.ySpeed = -this.ySpeed;
            if (this.top < 0) {this.top = -this.top}
            if (this.top > maxHeight) {this.top = 2*maxHeight-this.top}
        }
    }

    get left() {return parseFloat(this.div.style.left.split('px'))}
    set left(v) {this.div.style.left = v + 'px'}
    get top() {return parseFloat(this.div.style.top.split('px'))}
    set top(v) {this.div.style.top = v + 'px'}
    set opacity(v) {this.div.style.opacity = v}
}
