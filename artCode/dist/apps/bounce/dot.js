class Dot {
    constructor(id, container, top, left, bgColor, speedVector, weight) {
        this.id = id;
        this.div = document.createElement('div');
        this.div.classList.add('dot');
        container.appendChild(this.div);
        this.top = top;
        this.left = left;
        this.div.style.height = weight + 'px';
        this.div.style.width = weight + 'px';
        this.bgColor = bgColor;

        this.xSpeed = speedVector[0] / 10;
        this.ySpeed = speedVector[1] / 10;
        this.opacity = 1;

        this.weight = weight;

        this.linkedLines = [];
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

        // Let's make a PFD. DFP?
        var xA = 0;
        var yA = 0;
        for (var i=0; i<this.linkedLines.length; i++) {
            var v = this.linkedLines[i].getForceVector(this.id);
            xA += v[0]/100;
            yA += v[1]/100;
        }
        xA -= FRICTION * this.xSpeed / 10;
        yA -= FRICTION * this.ySpeed / 10;
        this.xSpeed += xA/this.weight;
        this.ySpeed += yA/this.weight;
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
