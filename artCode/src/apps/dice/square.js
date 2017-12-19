class Square {
    constructor(id, container, size, position, bgColor) {
        this.id = id;
        this.div = document.createElement('div');
        this.div.classList.add('square');
        this.div.style.backgroundColor = 'rgb('+bgColor[0]+', '+bgColor[1]+', '+bgColor[2]+')';
        container.appendChild(this.div);

        this.updatePosition(size, position);
    }

    updatePosition(size, position) {
        this.position = position;
        this.size = size;
    }

    render(camPosition) {
        // console.log(camPosition);
        this.div.style.height = this.size;
        this.div.style.width = this.size;
        this.div.style.left = this.id*100;
        this.div.style.top = this.id*100;
        // this.faces[i].style.zIndex = 10;
    }
}
