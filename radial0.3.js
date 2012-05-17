//// THis works

ToxiclibsSupport gfx;
var v, poly, k;
var steps, jitter, length, gap, baseTheta;
var slider1;
var width, height;
var mouse, offset;
// var spokes = new Array();
var spokePolys = new Array();
var weges = new Array();
void                                     setup() {
    getGUIVals();
    height = $(window).height();
    width = $(window).width();
    size(width, height);
    gfx = new ToxiclibsSupport(this);
    offset = new Vec2D(width / 2, height / 2);
    widths = new Array(22.5,30,30,30, 90, 22.5, 45, 45, 45);

    dynamicSetup();

    var lens = new Array(gap, length);
    var totRot = 0;

    for(var i = 0; i < widths.length; i++) {
        weges[i] = new wedge(i, widths[i], lens, r);
        // weges[i].position(totRot);
        // weges[i].checkIfSelected();
        // weges[i].render();
        // totRot += widths[i];
    };
}
void           draw() {
    dynamicSetup();

    // var lens = new Array(gap, length);
    totRot = 0;
    for(var i = 0; i < weges.length; i++) {
        // weges[i] = new wedge(i, widths[i], lens, r);
        weges[i].buildPoly();
        weges[i].position(totRot);
        weges[i].checkIfSelected();
        weges[i].render();
        totRot += weges[i].width;
    };
    updateWeges();
    //creates a new wedge object
    // wege1.render(baseTheta);
    // spokes = new Array(0, 90, 180, 270);

}
function updateWeges() {

    if(mousePressed) {
        for(var i = 0; i < weges.length; i++) {
            if(weges[i].selected) {
                var thisWege = weges[i].id;
                if(mouseButton == LEFT && !keyPressed) {
                    weges[thisWege].width += 1;
                    if(thisWege == 0) {
                        // widths[] -= .5;
                        weges[weges.length - 1].width -= .5;

                    } else {
                        weges[(thisWege - 1)].width -= .5;

                    }
                    weges[(thisWege + 1) % weges.length].width -= .5;
                }

                if(mouseButton == RIGHT && !keyPressed) {
                    weges[thisWege].width -= 1;
                    if(thisWege == 0) {
                        // widths[width.length] += .5;
                        weges[weges.length - 1].width += .5;
                    } else {
                        // widths[(thisWege - 1)] += .5;
                        weges[(thisWege - 1)].width += .5;
                    }
                    // widths[(thisWege + 1) % widths.length] += .5;
                    weges[(thisWege + 1) % weges.length].width += .5;
                }
                if(mouseButton == LEFT && keyPressed) {
                    if(keyCode == SHIFT) {
                        weges[thisWege].length++;
                    }
                    if(keyCode ==CONTROL){
                        weges[thisWege].gap++;
                    }
                }
                if(mouseButton == RIGHT && keyPressed) {
                    if(keyCode == SHIFT) {
                        weges[thisWege].length--;
                    }
                                        if(keyCode ==CONTROL){
                        weges[thisWege].gap--;
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