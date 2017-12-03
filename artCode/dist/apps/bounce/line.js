class Line {
    constructor(id, container, x1, y1, x2, y2, k, l0, from, to) {
        this.id = id;
        this.div = document.createElement('div');
        this.div.classList.add('line');
        container.appendChild(this.div);
        this.position = [x1, y1, x2, y2];
        this.bgColor = [255, 255, 255];
        this.opacity = 1;
        this.k = k;
        this.div.style.height = this.k + 'px';
        this.l0 = l0;
        this.from = from;
        this.to = to;
        this.updateBgColor();
    }

    remove() {
        this.div.style.display = 'none';
    }

    updateBgColor() {
        var l = this.length;
        if (l > 2*this.l0) {l = 2*this.l0}
        var r = Math.abs(l - this.l0)/this.l0;
        this.bgColor = [Math.floor(55+r*200), Math.floor(55+(1-r)*200), 0];
    }

    getForceVector(where) {
        if (!this.div.style.transform) {return [0, 0]}
        var f = this.length - this.l0;
        var angle = parseInt(this.div.style.transform.split('rotate(')[1].split('deg)')[0]) * 2 * Math.PI / 360;
        var v = [-Math.cos(angle)*f*this.k/10, -Math.sin(angle)*f*this.k/10];
        if (where !== this.from.id) {
            return v;
        }
        else {
            v[0] = -v[0];
            v[1] = -v[1];
            return v;
        }
    }

    get length() {return this.div.style.width.split('px')[0]}

    get position() {  // x1, y1, x2, y2
        // if (!this.div.style.transform) {
        //     return
        // }
        // var angle = parseInt(this.div.style.transform.split('rotate(')[1].split('deg)')[0]) * 2 * Math.PI / 360;
        // var w = parseInt(this.div.style.width.split('px'));
        // var x1 = parseInt(this.div.style.left.split('px')) + this.k / 2;
        // var y1 = parseInt(this.div.style.top.split('px')) + this.k / 2;
        // // console.log(angle*360/2/Math.PI);
        // var x2 = x1 + w * Math.cos(angle);
        // var y2 = y1 + w * Math.sin(angle);
        //
        // return [x1, y1, x2, y2];
    }

    set position(v) {
        v = [
            v[0]-this.k/2,
            v[1]-this.k/2,
            v[2]-this.k/2,
            v[3]-this.k/2
        ];
        this.div.style.left = Math.round(v[0]) + 'px';
        this.div.style.top = Math.round(v[1]) + 'px';
        this.div.style.width = Math.round(Math.sqrt((v[3] - v[1])**2 + (v[2] - v[0])**2)) + 'px';
        var r;
        if (v[0] == v[2]) {
            r = 90 * Math.abs(v[2] - v[0]) / (v[2] - v[0]);
        }
        else {
            r = Math.atan((v[3] - v[1])/(v[2] - v[0]))*360/2/Math.PI;
            if (v[2] < v[0]) {r += 180}
        }
        this.div.style.transform = 'rotate(' + r + 'deg)'
    }
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
