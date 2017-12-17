class Dot {
    constructor(id, container, x, y, bgColor, radiusSpeed) {
        this.id = id;
        this.div = document.createElement('div');
        this.div.classList.add('dot');
        container.appendChild(this.div);
        this.radius = 1;
        this.top = x-this.radius;
        this.left = y-this.radius;
        this.radiusSpeed = Math.floor(radiusSpeed);
        this.div.style.backgroundColor = 'rgb('+bgColor[0]+', '+bgColor[1]+', '+bgColor[2]+')';
    }

    remove() {
      this.div.style.display = 'none';
    }

    update(w, h, dots) {
        if (this.radius + this.radiusSpeed < 1) {
            this.radius = 1
        }
        else {
            this.radius += this.radiusSpeed;
            this.top -= this.radiusSpeed;
            this.left -= this.radiusSpeed;
        }
        if (this.radius <= 1
            || this.left < 0 || this.top < 0
            || this.left+2*this.radius > w || this.top+2*this.radius > h) {
            this.radiusSpeed *= -1
        }
        else if (this.radiusSpeed > 0) {
            for (var i=0; i<dots.length; i++) {
                if (this.id !== dots[i].id) {
                    var c1 = this.centerPosition;
                    var c2 = dots[i].centerPosition;
                    if (dots[i].radiusSpeed > 0 && Math.sqrt((c2[1]-c1[1])**2+(c2[0]-c1[0])**2) < this.radius + dots[i].radius) {
                        this.radiusSpeed *= -1;
                        dots[i].radiusSpeed *= -1;
                        break
                    }
                }
            }
        }
    }

    get left() {return parseFloat(this.div.style.left.split('px')[0])}
    set left(v) {this.div.style.left = v + 'px'}
    get top() {return parseFloat(this.div.style.top.split('px')[0])}
    set top(v) {this.div.style.top = v + 'px'}
    get centerPosition() {
        var r = this.radius;
        return [this.left+r, this.top+r];
    }
    set radius(v) {
      this.div.style.height = v*2 + 'px';
      this.div.style.width = v*2 + 'px';
    }
    get radius() {return parseInt(this.div.style.height.split('px')[0])/2}
}
