class Line {
    constructor(id, container, x1, y1, x2, y2, bgColor) {
        this.id = id;
        this.div = document.createElement('div');
        this.div.classList.add('line');
        container.appendChild(this.div);
        this.position = [x1, y1, x2, y2];
        this.bgColor = bgColor;
        this.opacity = 1;
        this.div.style.height = '1px'
    }

    remove() {
        this.div.style.display = 'none';
    }

    get position() {return [this.div.style.left, this.div.style.top,
        this.div.style.left + 0, this.div.style.top + 0]}
    set position(v) {
        v = [v[0]+4, v[1]+4, v[2]+4, v[3]+4];
        this.div.style.left = v[0] + 'px';
        this.div.style.top = v[1] + 'px';
        this.div.style.width = Math.sqrt((v[3] - v[1])**2 + (v[2] - v[0])**2) + 'px';
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
