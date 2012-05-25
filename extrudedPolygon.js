/**
 * @author Alan Rorie
 */
function extrudedPolygon(_poly, _h, _cap){
    this.baseShape=_poly;
    this.extrudeH=_h;
    this.cap=_cap;
    this.baseVec3D = new Array();
    this.extrudeVec=new Vec3D(0,0,extrudeH);
    this.mesh = new TriangleMesh();

    this.buildBase = function(){
        // creates an array of 3Dvectors for the baseshape
        for(var v2d=0; v2d<this.baseShape.vertices.length-1; v2d++){
            var x =this.baseShape.vertices[v2d].x;
            var y =this.baseShape.vertices[v2d].y;   
            var z=0;      
            this.baseVec3D[v2d]=new Vec3D(x,y,z);
            // println(this.baseVec3D[v2d].toString());
        }
    }
//     
    this.extrude = function(){
        for(int i=0; i<this.baseVec3D.length-1; i++){
            var m=this.baseVec3D.length-1;

            var v1, v2, v3 = new Vec3D();
            v1 = baseVec3D[i];
            v2 = baseVec3D[i].add(extrudeVec);
            v3 = baseVec3D[(i+1)%m];
            mesh.addFace(v1,v2,v3);
            v1=baseVec3D[(i+1)%m];
            v2=baseVec3D[(i+1)%m].add(extrudeVec);
            v3=baseVec3D[i].add(extrudeVec);
            mesh.addFace(v1,v2,v3);

                                                                                                                                                                                                                                                           
        }
        
    }
//     
    this.buildBase();
    this.extrude();
    
}
