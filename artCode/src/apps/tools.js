function cartesianToPolar(x, y) {
    if (x == 0) {return [Math.sqrt(x*x+y*y), y>0 ? 90 : -90]}
    return [Math.sqrt(x*x+y*y), Math.atan(y/x)]
}

function polarToCartesian(r, o) {
    return [Math.round(r * Math.cos(o)), Math.round(r * Math.sin(o))]
}

function distance(p1, p2) {
    return Math.sqrt((p2[0]-p1[0])*(p2[0]-p1[0]) + (p2[1]-p1[1])*(p2[1]-p1[1]));
}

function distance3d(p1, p2) {
    return Math.sqrt((p2[0]-p1[0])*(p2[0]-p1[0]) + (p2[1]-p1[1])*(p2[1]-p1[1]) + (p2[2]-p1[2])*(p2[2]-p1[2]));
}

function getRandomColor(luminosity) {
    var r1, r2;
    r1 = Math.random();
    r2 = Math.random();
    if (r1 > r2) {
        var t = r2;
        r2 = r1;
        r1 = t;
    }
    if (r1 > 1/2) {r1 = 1/2}
    if (r2-r1 > 1/2) {r2 = r1+1/2}

    var l1, l2, l3;
    if (luminosity < 255*3/2) {
        l1 = parseInt(luminosity*r1);
        l2 = parseInt(luminosity*(r2-r1));
        l3 = parseInt(luminosity*(1-r2));
    }
    else {
        l1 = 255-parseInt((255*3-luminosity)*r1);
        l2 = 255-parseInt((255*3-luminosity)*(r2-r1));
        l3 = 255-parseInt((255*3-luminosity)*(1-r2));
    }
    var r;
    for (var i=0; i<10; i++) {
        if (l1 > 255 || l2 > 255 || l3 > 255) {
            if (l1 > 255) {
                r = Math.random();
                l1 = 255;
                l2 += r*(l1-255);
                l3 += (1-r)*(l1-255);
            }
            if (l2 > 255) {
                r = Math.random();
                l1 += r*(l2-255);
                l2 = 255;
                l3 += (1-r)*(l2-255);
            }
            if (l3 > 255) {
                r = Math.random();
                l1 += r*(l3-255);
                l2 += (1-r)*(l3-255);
                l3 = 255;
            }
        }
        else {
            break
        }
    }
    return [parseInt(l1), parseInt(l2), parseInt(l3)]
}
