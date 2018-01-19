class Square {
    constructor(id, container, top, left, width, height, bgColor) {
        this.id = id;
        this.div = document.createElement('div');
        this.div.classList.add('square');
        container.appendChild(this.div);
        this.div.style.top = top + 'px';
        this.div.style.left = left + 'px';
        this.div.style.height = height + 'px';
        this.div.style.width = width + 'px';
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
}
