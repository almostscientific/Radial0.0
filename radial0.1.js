ToxiclibsSupport gfx;
var v, poly, k;
var steps, jitter, length, gap;
var slider1;
var width, height;
var mouse, offset;
// var spokes = new Array();
var spokePolys = new Array();
void         setup() {
    getGUIVals();
    height = $(window).height();
    width = $(window).width();
    size(width, height);
    gfx = new ToxiclibsSupport(this);
    k = 0;
    offset = new Vec2D(500, 200);

}
void       draw() {

    getGUIVals();
    background(255, 0, 255);
    mouse = new Vec2D(mouseX, mouseY);
    poly = new Polygon2D();
    var spokeNum = 0;
    var spokes = new Array();
    for(var i = 0; i <= 360; i += 360 / steps) {
        v = new Vec2D.fromTheta(radians(i));
        spokes[spokeNum] = new Line2D(v.scale(gap).add(offset).jitter(jitter), v.scale(length).add(offset).jitter(jitter));
        // gfx.line(spokes[spokeNum]);
        spokeNum++;
    }
    // print("steps ");
// println(steps);
// println(360/steps);

var alpha=radians(180-(360/steps))/2;
var r=80;
var x =r/tan(alpha);
println(degrees(alpha));
println(x);
    noStroke();
    // println(spokes[0].a);
    for(var i = 0; i < spokes.length - 1; i++) {
        gfx.line(spokes[i]);
        var tmpPoly = new Polygon2D();

        tmpPoly.add(spokes[i].a);
        tmpPoly.add(spokes[i].b);
        tmpPoly.add(spokes[(i + 1) % spokes.length].b);
        tmpPoly.add(spokes[(i + 1) % spokes.length].a);
        spokePolys[i] = tmpPoly;
        // var amnt=.8;
        // var baseW=constrain((amnt*.5)-.001,0,100);
        // tmpPoly.smooth(amnt,baseW);
        gfx.polygon2D(spokePolys[i]);
    }

    ellipse(mouse.x, mouse.y, 10, 10);
    // pushMatrix()
    // translate(100,100);
    // gfx.polygon2D(poly);
    // // popMatrix();
}

function getGUIVals() {
    // println("ack");
    steps = $("#slider").slider("value");
    jitter = $("#slider2").slider("value");
    length = $("#slider3").slider("value");
    gap = $("#slider4").slider("value");

}