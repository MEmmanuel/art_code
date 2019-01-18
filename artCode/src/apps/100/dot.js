class Dot {
    constructor(id, container, top, left, bgColor, speedVector, mass, freezed) {
        this.id = id;
        this.div = document.createElement('div');
        this.div.classList.add('dot');
        container.appendChild(this.div);
        this.top = top;
        this.left = left;
        this.div.style.height = DOT_SIZE + 'px';
        this.div.style.width = DOT_SIZE + 'px';
        this.div.style.backgroundColor = 'rgb('+bgColor[0]+', '+bgColor[1]+', '+bgColor[2]+')';
        this.div.style.boxShadow = '0 0 15px rgb('+bgColor[0]+', '+bgColor[1]+', '+bgColor[2]+')';
        this.freezed = freezed;
        if (this.freezed) {
            this.xSpeed = 0;
            this.ySpeed = 0;
        }
        else {
            this.xSpeed = speedVector[0] / 10;
            this.ySpeed = speedVector[1] / 10;
        }
        this.mass = mass;
        this.opacity = 1;
    }

    remove() {
        this.div.style.display = 'none';
    }

    updatePosition(maxWidth, maxHeight, dots) {
        // Let's make a PFD. DFP?
        var xA = 0;
        var yA = 0;
        for (var i=0; i<dots.length; i++) {
          if (dots[i].id !== this.id) {
            var v = dots[i].getForceVector(this);
            xA += v[0];
            yA += v[1];
          }
        }
        xA -= FRICTION * this.xSpeed / 100;
        yA -= FRICTION * this.ySpeed / 100;
        this.setSpeed(this.xSpeed + xA*RENDER_DELAY/1000/this.mass, this.ySpeed + yA*RENDER_DELAY/1000/this.mass);

        // update position and eventually hit wall
        if (!this.freezed) {
            this.left += this.xSpeed;
            if (this.left < 0 || this.left+DOT_SIZE > maxWidth) {
                this.xSpeed = -this.xSpeed;
                if (this.left < 0) {this.left = -this.left}
                if (this.left > maxWidth) {this.left = 2*maxWidth-this.left}
            }
            this.top += this.ySpeed;
            if (this.top < 0 || this.top+DOT_SIZE > maxHeight) {
                this.ySpeed = -this.ySpeed;
                if (this.top < 0) {this.top = -this.top}
                if (this.top > maxHeight) {this.top = 2*maxHeight-this.top}
            }
        }
    }

    get left() {return parseFloat(this.div.style.left.split('px'))}
    set left(v) {this.div.style.left = v + 'px'}
    get top() {return parseFloat(this.div.style.top.split('px'))}
    set top(v) {this.div.style.top = v + 'px'}
    set opacity(v) {this.div.style.opacity = v}

    getForceVector(dot) {
        const d = Math.sqrt((dot.top-this.top)*(dot.top-this.top)+(dot.left-this.left)*(dot.left-this.left));

        let value = G * dot.mass * this.mass / d / d / 10;
        if (value > 20) {value = 20}

        var angle;
        if (dot.left === this.left) {angle = 90 * Math.abs(dot.top-this.top)}
        else {angle = -Math.atan((this.top-dot.top)/(this.left-dot.left))}
        if (dot.left < this.left) {angle = Math.PI+angle}
        if (angle < 0) {angle = Math.PI*2 + angle}
        // console.log(angle/2/Math.PI*360);
        // console.log([value * Math.cos(angle), value * Math.sin(angle)]);
        return [-value * Math.cos(angle), value * Math.sin(angle)];
    }

    setSpeed(xSpeed, ySpeed) {
        // console.log(xSpeed, ySpeed);
        if (!this.freezed) {
            this.xSpeed = xSpeed;
            this.ySpeed = ySpeed;
        }
    }
}
