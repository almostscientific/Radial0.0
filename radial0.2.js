ToxiclibsSupport gfx;
var v, poly, k;
var steps, jitter, length, gap;
var slider1;
var width, height;
var mouse, offset;
// var spokes = new Array();
var spokePolys = new Array();
void                       setup() {
    getGUIVals();
    height = $(window).height();
    width = $(window).width();
    size(width, height);
    gfx = new ToxiclibsSupport(this);
    offset = new Vec2D(width / 2, height / 2);

}
void                     draw() {
    dynamicSetup();
    var spokeNum = 0;
    var spokes = new Array();
    // steps = 5;
    // var r = 0;
    var rot = 90 + (360 / (2 * steps));

    for(var i = 0; i < 360; i += 360 / steps) {
        // v = new Vec2D.fromTheta(radians(i));

        var vcw = new Vec2D.fromTheta(radians(i)).rotate(radians(360 / steps) / 2);
        var vccw = new Vec2D.fromTheta(radians(i)).rotate(-radians(360 / steps) / 2);
        var vcwI = vcw.scale(gap).add(offset);
        var vcwO = vcw.scale(length).add(offset);
        var vccwI = vccw.scale(gap).add(offset);
        var vccwO = vccw.scale(length).add(offset);
        poly = new Polygon2D();

        // poly.add(vccwO);
        var lineCCW = new Line2D(vccwI, vccwO);
        var lineCW = new Line2D(vcwI, vcwO);
        gfx.line(lineCCW);
        gfx.line(lineCW);

        var o = vccw.perpendicular().normalizeTo(r).add(vccwO);
        fill(255, 0, 0);
        gfx.circle(o, 10);
        for(var m = rot; m >= 0; m -= 1) {
            // println(rot);
            // println(m);
            // var radiusV = new Vec2D.fromTheta(radians(i)).rotate(-radians(360 / steps) * m).scale(r).add(o);
            var radiusV = new Vec2D.fromTheta(radians(i)).rotate(-radians(m)).scale(r).add(o);
            poly.add(radiusV);
            gfx.point(radiusV);

        }

        o.set(vcw.perpendicular().invert().normalizeTo(r).add(vcwO));
        fill(0, 255, 0);
        gfx.circle(o, 10);
        for(var m = 0; m < rot; m += 1) {
            // var radiusV = new Vec2D.fromTheta(radians(i)).rotate(radians(360 / steps) * m).scale(r).add(o);
            var radiusV = new Vec2D.fromTheta(radians(i)).rotate(radians(m)).scale(r).add(o);
            poly.add(radiusV);
            gfx.point(radiusV);
        }
        poly.add(vcwO);

        o.set(vcw.normalizeTo(r).add(vcwI));
        fill(0, 0, 255);
        gfx.circle(o, 10);
        for(var m = rot; m < rot + 90-(360 / (2 * steps)); m += 1) {
            // var radiusV = new Vec2D.fromTheta(radians(i)).rotate(radians(360 / steps) * m).scale(r).add(o);
            var radiusV = new Vec2D.fromTheta(radians(i)).rotate(radians(m)).scale(r).add(o);
            poly.add(radiusV);
             gfx.point(radiusV);

        }

        o.set(vccw.normalizeTo(r).add(vccwI));
        fill(0, 255, 255);
        gfx.circle(o, 10);
        // for(var m = rot; m < rot+ (360 / (2 * steps)); m += 1) {
        for(var m = rot+ 90-(360 / (2 * steps)); m > rot; m -= 1) {
            // var radiusV = new Vec2D.fromTheta(radians(i)).invert().rotate(radians(m)).scale(r).add(o);
            var radiusV = new Vec2D.fromTheta(radians(i)).rotate(-radians(m)).scale(r).add(o);
            poly.add(radiusV);
          poly.add(radiusV);
             gfx.point(radiusV)

        }
        fill(255, 0, 255, 50);
        // if(i==0){
        gfx.polygon2D(poly);
        // }
        spokeNum++;

    }
    // var zero = new Vec2D.fromTheta(radians(0));
    // fill(0);
    // gfx.circle(zero.scale(50).add(offset), 20);
    // fill(255, 0, 0);
    // gfx.circle(vcwI, 10);
    // fill(0, 255, 0);
    // gfx.circle(vcwO, 10);
    // fill(0, 0, 255);
    // gfx.circle(vccwI, 10);
    // fill(0);
    // gfx.circle(vccwO, 10);
    // fill(255);
    // print("steps ");
    // println(steps);
    // println(360/steps);

    // var alpha = radians(180 - (360 / steps)) / 2;
    // var r = 80;
    // var x = r / tan(alpha);
    // println(degrees(alpha));
    // println(x);
    // noStroke();
    // // println(spokes[0].a);
    // for(var i = 0; i < spokes.length - 1; i++) {
    // gfx.line(spokes[i]);
    // var tmpPoly = new Polygon2D();
    //
    // tmpPoly.add(spokes[i].a);
    // tmpPoly.add(spokes[i].b);
    // tmpPoly.add(spokes[(i + 1) % spokes.length].b);
    // tmpPoly.add(spokes[(i + 1) % spokes.length].a);
    // spokePolys[i] = tmpPoly;
    // // var amnt=.8;
    // // var baseW=constrain((amnt*.5)-.001,0,100);
    // // tmpPoly.smooth(amnt,baseW);
    // gfx.polygon2D(spokePolys[i]);
    // }
    //
    // ellipse(mouse.x, mouse.y, 10, 10);
    // // pushMatrix()
    // translate(100,100);
    // gfx.polygon2D(poly);
    // // popMatrix();
}

function getGUIVals() {
    // println("ack");
    steps = $("#slider").slider("value");
    r = $("#slider2").slider("value");
    length = $("#slider3").slider("value");
    gap = $("#slider4").slider("value");

}

function dynamicSetup() {
    height = $(window).height();
    width = $(window).width();
    size(width, height);
    offset.set(width / 2, height / 2);
    getGUIVals();
    background(255, 255, 255);
    mouse = new Vec2D(mouseX, mouseY);
}