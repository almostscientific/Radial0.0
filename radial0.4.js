/**
 * @author Alan Rorie
 *///// THis works

ToxiclibsSupport gfx;
var v, poly, k;
var steps, jitter, length, gap, baseTheta;
var slider1;
var width, height;
var mouse, offset;
// var spokes = new Array();
var spokePolys = new Array();
var weges = new Array();
var wedge;
void setup() {
    getGUIVals();
    height = $(window).height();
    width = $(window).width();
    size(width, height);
    gfx = new ToxiclibsSupport(this);
    offset = new Vec2D(width / 2, height / 2);
    widths = new Array(90,45,45,90,45,45);

    dynamicSetup();

    var lens = new Array(gap, length);
    var totRot = 0;

    for(var i = 0; i < widths.length; i++) {
        weges[i] = new roundWedge(i,widths[i],gap,length,r,r);

    };
}
void draw() {
    dynamicSetup();
gfx.line(new Line2D(new Vec2D(0,1000).add(offset),new Vec2D(0,-1000).add(offset) ));
gfx.line(new Line2D(new Vec2D(1000,0).add(offset),new Vec2D(-1000,0).add(offset) ));

    totRot = 0;
    for(var i = 0; i < weges.length; i++) {
        // println(i);
        weges[i].buildPoly();
        weges[i].position(totRot);
        weges[i].checkIfSelected();
        weges[i].render();
        totRot += weges[i].theta;
        // println(totRot);
    };
    updateWeges();

}


function updateWeges() {
    if(mousePressed) {
        for(var i = 0; i < weges.length; i++) {
            if(weges[i].selected) {
                var thisWege = weges[i].id;
                if(mouseButton == LEFT && !keyPressed) {                                
                    var subAmt = -0.5;
                    var m = 0;
                    if(thisWege == 0) {
                        // weges[weges.length - 1].updateTheta(-0.5);
                        while(subAmt<0){
                            subAmt=weges[weges.length - 1+m].updateTheta(subAmt)
                            m++;
                        }

                    } else {
                        // weges[(thisWege - 1)].updateTheta(-0.5);
                        while(subAmt<0){
                            subAmt=weges[(thisWege - 1+m)].updateTheta(subAmt)
                            m++;
                        }
                    }
                    var i=0;
                    while(weges[(thisWege + 1) % weges.length].updateTheta(-0.5) != 0){
                        i++;
                    }
                    // weges[(thisWege + 1) % weges.length].updateTheta(-0.5);

                    weges[thisWege].updateTheta(1);


                }

                if(mouseButton == RIGHT && !keyPressed) {
                    weges[thisWege].updateTheta(-1);
                    if(thisWege == 0) {
                    } else {
                        weges[thisWege - 1].updateTheta(0.5);
                    }
                    weges[(thisWege + 1) % weges.length].updateTheta(0.5);
                }
                if(mouseButton == LEFT && keyPressed) {
                    if(keyCode == SHIFT) {
                        weges[thisWege].outRad++;
                    }
                    if(keyCode == CONTROL) {
                        weges[thisWege].inRad++;
                    }
                }
                if(mouseButton == RIGHT && keyPressed) {
                    if(keyCode == SHIFT) {
                        weges[thisWege].outRad--;
                    }
                    if(keyCode == CONTROL) {
                        weges[thisWege].inRad--;
                    }
                }

            }
        }
    }
}



function getGUIVals() {
    // println("ack");
    steps = $("#slider").slider("value");
    r = $("#slider2").slider("value");
    length = $("#slider3").slider("value");
    gap = $("#slider4").slider("value");
    baseTheta = $("#slider5").slider("value");

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
