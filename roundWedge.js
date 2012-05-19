/**
 * @author Alan Rorie
 */

function roundWedge(_id, _theta, _innerRadius, _outterRadius, _innerCornerRadius, _outterCornerRadius) {
    this.id = _id;
    this.theta = _theta;
    this.inRad = _innerRadius;
    this.outRad = _outterRadius;
    this.inCorRad = _innerCornerRadius;
    this.outCorRad = _outterCornerRadius;
    this.poly
    this.sleected = false;
    this.valid = true;
    this.minTheta
    this.atMinTheta = false;
    this.atMinRad = false;
    this.atMaxRad =false;
    this.maxRad=300;

    this.updateTheta = function(mod) {
        //returns how much more there is to remove
        if(mod < 0) {//if we are subtractin
            var diff = this.theta - degrees(this.minTheta);
            //this is how much smaller it can get
            var remander = diff - Math.abs(mod);
            if(remander < 0) {//if we can't remove it all
                mod = -diff;
            }
            if(diff == 0) {
                mod = 0;
            }
        } else {
            remander = 0;
        }
        this.theta += mod;
        return remander;

    }

    this.constrainTheta = function() {
        this.minTheta = Math.asin(this.inCorRad / (this.inRad + this.inCorRad)) * 2;
        var roundThisTheta = Math.round(radians(this.theta) * 1000) / 1000;
        var roundMinTheta = Math.round(this.minTheta * 1000) / 1000;
        if(roundThisTheta <= roundMinTheta) {
            this.theta = degrees(this.minTheta);
            this.atMinTheta = true;
        } else {
            this.atMinTheta = false;
        }
    }
    

    this.constrainOutRad = function() {
        println(this.outRad - this.inRad + " " + this.outCorRad * 2);
        if((this.outRad - this.inRad) <= this.outCorRad * 2 ||(this.outRad - this.inRad) <0 ) {
            this.outRad = (this.outCorRad * 2)+this.inRad;
            this.atMinRad = true;
        } else {
            this.atMinRad = false;
        }
        if(this.outRad > this.maxRad) {
            this.atMaxRad = true;
        } else {
            this.atMaxRad = false;
        }
    }


    this.buildPoly = function() {
        offset.set(new Vec2D(0, 0));
        this.constrainTheta();
        this.constrainOutRad();
        if(this.valid) {

            this.poly = new Polygon2D();
            var outterAlpha = Math.atan(this.outCorRad / (this.outRad - this.outCorRad));
            //this is the angle between the side and the orgin of the rounder corner
            var outterBeta = (Math.PI / 2) - outterAlpha;
            //this is the arc length, in radians, of the rounder corner
            var o = new Vec2D.fromTheta(outterAlpha).scale(this.outRad - this.outCorRad);
            //this is the orgin of the rounder corner
            for(var t = 0; t < outterBeta; t += 0.1) {
                var point = new Vec2D.fromTheta(t).rotate((-Math.PI / 2) + outterAlpha).scale(this.outCorRad).add(o).add(offset);
                this.poly.add(point);
            }

            var arcTheta = radians(this.theta) - outterAlpha;
            for(var t = outterAlpha; t < arcTheta; t += 0.01) {
                var point = new Vec2D.fromTheta(t).scale(this.outRad).add(offset);
                this.poly.add(point);
            }

            o.set(Vec2D.fromTheta(arcTheta).scale(this.outRad - this.outCorRad));
            for(var t = 0; t < outterBeta; t += 0.1) {
                var point = new Vec2D.fromTheta(t).rotate(arcTheta + outterAlpha).scale(this.outCorRad).add(o).add(offset);
                this.poly.add(point);
            }

            var innerAlpha = Math.asin(this.inCorRad / (this.inCorRad + this.inRad));
            var innerBeta = (Math.PI / 2) - innerAlpha;
            var innerArcTheta = radians(this.theta) - innerAlpha;

            o.set(Vec2D.fromTheta(innerArcTheta).scale(this.inRad + this.inCorRad));
            for(var t = 0; t < innerBeta; t += 0.1) {
                var point = new Vec2D.fromTheta(t).rotate((-Math.PI - (Math.PI / 2)) + innerArcTheta + innerAlpha).scale(this.inCorRad).add(o).add(offset);
                this.poly.add(point);
            }
            for(var t = innerArcTheta; t > innerAlpha; t -= 0.01) {
                var point = new Vec2D.fromTheta(t).scale(this.inRad).add(offset);
                this.poly.add(point);
            }

            o.set(Vec2D.fromTheta(innerAlpha).scale(this.inRad + this.inCorRad));
            for(var t = 0; t < innerBeta; t += 0.1) {
                var point = new Vec2D.fromTheta(t).rotate(-(Math.PI) + innerAlpha).scale(this.inCorRad).add(o).add(offset);
                this.poly.add(point);

            }

        }
    }

    this.render = function() {

        if(this.selected) {
            fill(255, 0, 255, 100);
        } else {
            fill(255, 0, 255, 50);
        }
        gfx.polygon2D(this.poly);

    }

    this.position = function(bt) {
        offset.set(width / 2, height / 2);

        for(var i = 0; i < this.poly.vertices.length; i++) {
            this.poly.vertices[i].set(this.poly.vertices[i].rotate(radians(bt)).add(offset));
        };

    }
    this.checkIfSelected = function() {
        if(this.poly.containsPoint(mouse)) {
            this.selected = true;
        } else {
            this.selected = false;
        }
    }
    this.buildPoly();
}