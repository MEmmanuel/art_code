function cartesianToPolar(x, y) {
    if (x == 0) {return [Math.sqrt(x*x+y*y), y>0 ? 90 : -90]}
    return [Math.sqrt(x*x+y*y), Math.atan(y/x)]
}

function polarToCartesian(r, o) {
    return [Math.round(r * Math.cos(o)), Math.round(r * Math.sin(o))]
}

function distance(p1, p2) {
    return Math.sqrt((p2[0]-p1[0])**2 + (p2[1]-p1[1])**2);
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
    return [parseInt(luminosity*r1), parseInt(luminosity*(r2-r1)), parseInt(luminosity*(1-r2))]
}