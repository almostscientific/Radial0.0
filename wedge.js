funciton wedge(i,w, l, r) {
    this.width = w;
    this.gap = l[0];
    this.length = l[1];
    this.radius = r;
    this.poly;// = new Polygon2D();
    this.oArray = new Array();
    // this.baseTheta = bt;
    this.tri = false;
    this.selected = false;
    this.id=i;

    this.buildPoly = function() {
    this.poly = new Polygon2D();

        //This rebuilds the poygon and is called at the end of the constructer
        var halfWidth = this.width / 2;
        var rot = 90 + halfWidth;

        var vccw = new Vec2D.fromTheta(radians(0));
        var vcw = new Vec2D.fromTheta(radians(this.width));
        var vcwI = vcw.scale(this.gap);
        //.add(offset);
        var vcwO = vcw.scale(this.length);
        //;.add(offset);
        var vccwI = vccw.scale(this.gap);
        //;.add(offset);
        var vccwO = vccw.scale(this.length);
        //.add(offset);
        var o, oArray = new Array();
        this.oArray[0] = vccw.perpendicular().normalizeTo(r).add(vccwO);
        this.oArray[1] = vcw.perpendicular().invert().normalizeTo(r).add(vcwO);
        this.oArray[2] = vcw.normalizeTo(r).add(vcwI);
        this.oArray[3] = vccw.normalizeTo(r).add(vccwI);
        // println(this.oArray[2].distanceTo(this.oArray[3]));
        if(this.oArray[2].distanceTo(this.oArray[3]) <= this.radius) {
            this.tri = true;
            // println("ack");
            // println("rad=" + this.radius);
            // println("dist=" + this.oArray[2].distanceTo(this.oArray[3]));

        } else {
            // println("");

        }
        lineCCW = new Line2D(vccwI, vccwO);
        lineCW = new Line2D(vcwI, vcwO);
        o = this.oArray[0];
        // fill(255, 0, 0);
        // gfx.circle(o, 10);
        for(var m = rot; m >= 0; m -= 1) {
            // println(rot);
            // println("1");
            // var radiusV = new Vec2D.fromTheta(radians(i)).rotate(-radians(360 / steps) * m).scale(r).add(o);
            var radiusV = new Vec2D.fromTheta(radians(halfWidth)).rotate(-radians(m)).scale(r).add(o);
            this.poly.add(radiusV);
            // gfx.point(radiusV);

        }
        o = this.oArray[1];
        // fill(0, 255, 0);
        // gfx.circle(o, 10);
        for(var m = 0; m < rot; m += 1) {
            // var radiusV = new Vec2D.fromTheta(radians(i)).rotate(radians(360 / steps) * m).scale(r).add(o);
            var radiusV = new Vec2D.fromTheta(radians(halfWidth)).rotate(radians(m)).scale(r).add(o);
            this.poly.add(radiusV);
            // gfx.point(radiusV);
        }
        o = this.oArray[2];
        // fill(0, 0, 255);
        // gfx.circle(o, 10);
        // for(var m = rot; m < rot + 90 - (180 - rot); m += 1) {
        for(var m = rot; m <= rot + (180 - rot); m += 1) {
            // var radiusV = new Vec2D.fromTheta(radians(i)).rotate(radians(360 / steps) * m).scale(r).add(o);
            var radiusV = new Vec2D.fromTheta(radians(halfWidth)).rotate(radians(m)).scale(r).add(o);
            this.poly.add(radiusV);
            // gfx.circle(radiusV,10);

        }
        o = this.oArray[3];
        // fill(0, 255, 255);
        // gfx.circle(o, 10);
        // for(var m = rot; m < rot+ (360 / (2 * steps)); m += 1) {
        // for(var m = rot + 90 - (180 - rot); m > rot; m -= 1) {
        for(var m = rot + (180 - rot); m > rot; m -= 1) {
            var radiusV = new Vec2D.fromTheta(radians(halfWidth)).rotate(-radians(m)).scale(r).add(o);
            this.poly.add(radiusV);
        }
        this.poly.add(vccwO);
    }

    this.position = function(bt) {
        for(var i = 0; i < this.poly.vertices.length; i++) {
            this.poly.vertices[i].set(this.poly.vertices[i].rotate(radians(bt)).add(offset));
        };

    }

    this.render = function() {

        if(this.selected) {
            fill(255, 0, 255, 100);
        } else {
            fill(255, 0, 255, 50);
        }
        gfx.polygon2D(this.poly);
        // pushMatrix();
        // translate(offset.x, offset.y);
        // rotate(radians(bt));
        //
        // for(var i = 0; i < this.oArray.length; i++) {
        // fill(0);
        // gfx.circle(this.oArray[i], 5);
        // }

        //
        // gfx.polygon2D(this.poly);
        // popMatrix();

    }
    //
    this.checkIfSelected = function() {
        if(this.poly.containsPoint(mouse)) {
            this.selected = true;
            //println("ack " + this.selected);
        } else {
            this.selected = false;
            //println("ick " + this.selected);

        }
    }

    // this.buildPoly();
}