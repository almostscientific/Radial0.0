/**
 * @author Alan Rorie
 *///// THis works

ToxiclibsSupport gfx;
var v, poly, k;
var steps, jitter, length, gap, baseTheta;
var slider1;
var width, height;
var mouse, offset;
var spokePolys = new Array();
var weges = new Array();
var wedge;
var splitTheta=180;
void setup() {
    getGUIVals();
    height = $(window).height();
    width = $(window).width();
    size(width, height);
    gfx = new ToxiclibsSupport(this);
    offset = new Vec2D(width / 2, height / 2);
    widths = new Array(90,1,22.5,45,90,45,45);

    dynamicSetup();

    var lens = new Array(gap, length);
    var totRot = 0;

    for(var i = 0; i < widths.length; i++) {
        weges[i] = new roundWedge(i,widths[i],gap,length,r/2,r);

    };
}
void draw() {
    dynamicSetup();
// gfx.line(new Line2D(new Vec2D(0,1000).add(offset),new Vec2D(0,-1000).add(offset) ));
// gfx.line(new Line2D(new Vec2D(1000,0).add(offset),new Vec2D(-1000,0).add(offset) ));

    totRot = 0;
    for(var i = 0; i < weges.length; i++) {
        weges[i].buildPoly();
        weges[i].position(totRot);
        weges[i].checkIfSelected();
        weges[i].render();
        weges[i].update();
        totRot += weges[i].theta;
    };
    if(totRot!=360){
        weges[0].theta = totRot>360 ? weges[0].theta-(totRot-360) : weges[0].theta+(360-totRot);
    }

    mouseWeges();
    checkSplitWeges();

}

function checkSplitWeges(){
          for(var i = 0; i < weges.length; i++) {
            if(weges[i].theta> splitTheta){
                var newWegeA=new roundWedge(i,splitTheta/2,gap,length,r/2,r);
                newWegeA.outRadMod=weges[i].outRadMod;
                var newWegeB=new roundWedge(i,splitTheta/2,gap,length,r/2,r);
                newWegeB.outRadMod=weges[i].outRadMod;
                weges.splice(i,1,newWegeA,newWegeB);
            }
}
  
}

function mouseWeges() {
    var fracChange,m,idx;
    if(mousePressed) {
        for(var i = 0; i < weges.length; i++) {
            if(weges[i].selected) {
                var thisWege = i;//weges[i].id;
                if(mouseButton == LEFT && !keyPressed) {        
                    if(thisWege == 0) {
                        fracChange = -0.5;
                        m = 0;
                        while(fracChange < 0) {
                            idx=(weges.length - 1 + m);
                            if(idx>=weges.length-1){
                                idx=idx%(weges.length-1);
                            }
                            fracChange = weges[idx].updateTheta(fracChange);
                            m++;
                        }
                    } else {
                        fracChange = -0.5;
                        m = 0;
                        while(fracChange < 0) {
                            var idx=(thisWege - (1 + m));
                            if(idx<0){
                                idx=weges.length+idx;
                            }
                            fracChange = weges[idx].updateTheta(fracChange);
                            m++;
                        }
                    }
                    fracChange = -0.5;
                    m = 0;
                    while(fracChange < 0) {
                        fracChange = weges[(thisWege + 1 + m) % weges.length].updateTheta(fracChange);
                        m++;
                    }
                    weges[thisWege].updateTheta(1);
                    }

                if(mouseButton == RIGHT && !keyPressed) {
                    // println(weges[thisWege].theta);
                    // println(weges[thisWege].atMinTheta.toString());
                    if(weges[thisWege].atMinTheta==false){
                    fracChange=0.5;
                    idx=thisWege==0 ? weges.length-1 : thisWege-1;                    
                    weges[idx].updateTheta(fracChange);
                    
                    idx=thisWege==weges.length-1 ? 0 : thisWege+1;
                    weges[idx].updateTheta(fracChange);
                    weges[thisWege].updateTheta(-1);
                    }
                }
                
                if(mouseButton == LEFT && keyPressed) {
                    if(keyCode == SHIFT) {
                        if(!weges[thisWege].atMaxRad)
{                        weges[thisWege].outRadMod++;
}                    }
                    // if(keyCode == CONTROL) {
                        // weges[thisWege].inRad++;
                    // }
                }
                if(mouseButton == RIGHT && keyPressed) {
                    if(keyCode == SHIFT) {
                                                if(!weges[thisWege].atMinRad)
{
                        weges[thisWege].outRadMod--;
}                    }
                    // if(keyCode == CONTROL) {
                        // weges[thisWege].inRad--;
                    // }
                }

            }
        }
    }
}



function getGUIVals() {
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
