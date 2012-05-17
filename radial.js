ToxiclibsSupport gfx;
var v, poly, k;
var steps, jitter, length, gap;
var slider1;
var width, height;
var mouse, offset ;
var spokes=new Array();
var spokePolys=new Array();
void   setup() {
        getGUIVals();
     height = $(window).height();
     width = $(window).width();
    size(width, height);
    gfx = new ToxiclibsSupport(this);
    k = 0;
    offset=new Vec2D(500,200);

}
void draw() {

    getGUIVals();
    background(255, 0, 255);
    mouse = new Vec2D(mouseX, mouseY);
    poly = new Polygon2D();

    for(var i = 0; i <= 360; i += 360 / steps) {
        v = new Vec2D.fromTheta(radians(i));
        // v.scaleSelf(150);
        spokes[i]=new Line2D(v.scale(gap).add(offset).jitter(jitter),v.scale(length).add(offset).jitter(jitter));
        // println(spokes[i].a.toString());
        // println(steps);
        // var tmpPoly=new Polygon2D();
        // tmpPoly.add(v);
        gfx.line(spokes[i]);
    

    }
                // println("loop");
println(jitter);
    // for(i=0; i<spokes.length-1; i++){
        // gfx.line(spokes[i]);
//     
    // }

    ellipse(mouse.x, mouse.y, 10, 10);
    // pushMatrix()
    // translate(100,100);
    // gfx.polygon2D(poly);
    // // popMatrix();
}

function getGUIVals(){
    // println("ack");
        steps = $("#slider").slider("value");
            jitter = $("#slider2").slider("value");
            length = $("#slider3").slider("value");
            gap = $("#slider4").slider("value");
            

}
