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
        this.bgColor = bgColor;

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
        var l = [0,1,2];
        var i1 = Math.floor(Math.random()*(l.length));
        i1 = l.splice(i1, 1)[0];
        var i2 = l[Math.floor(Math.random()*(l.length))];
        var t = Math.floor(Math.random()*10);

        var b = this.bgColor;
        b[i1] += t;
        if (b[i1] > 255) {b[i1] = 255}
        b[i2] -= t;
        if (b[i2] < 0) {b[i2] = 0}
        this.bgColor = b;
    }

    get left() {return parseFloat(this.div.style.left.split('px'))}
    set left(v) {this.div.style.left = v + 'px'}
    get top() {return parseFloat(this.div.style.top.split('px'))}
    set top(v) {this.div.style.top = v + 'px'}
    get bgColor() {
        var b = this.div.style.backgroundColor.split('rgb(')[1].split(')')[0].split(', ');
        return [parseInt(b[0]), parseInt(b[1]), parseInt(b[2])]
    }
    set bgColor(v) {
      this.div.style.backgroundColor = 'rgb('+v[0]+', '+v[1]+', '+v[2]+')';
      this.div.style.boxShadow = '0 0 15px rgb('+v[0]+', '+v[1]+', '+v[2]+')';
      this.div.style.oBoxShadow = '0 0 15px rgb('+v[0]+', '+v[1]+', '+v[2]+')';
      this.div.style.mozBoxShadow = '0 0 15px rgb('+v[0]+', '+v[1]+', '+v[2]+')';
      this.div.style.webkitBoxShadow = '0 0 15px rgb('+v[0]+', '+v[1]+', '+v[2]+')';
    }
    set opacity(v) {this.div.style.opacity = v}
}
