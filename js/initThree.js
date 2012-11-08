var container = document.getElementById('container');
var stage = new toxi.geom.Vec2D(window.innerWidth, window.innerHeight);
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
    antiaalised : true
});
var camera = new THREE.TrackballCamera({
    fov : 45,
    aspect : stage.x / stage.y,
    near : 1,
    far : 2000,
    rotateSpeed : 1.0,
    noPan : true,
    noZoom : true,
    staticMoving : false,
    dynamicDampingFactor : 0.05
});
var toxicToThreeSupport = new toxi.THREE.ToxiclibsSupport(scene);

var material = new THREE.MeshNormalMaterial({
    color : 0xBAE8E6,
    opacity : 1.0
});
var $container = $('#container');

camera.position.x = 400;
camera.position.y = 400;
camera.position.z = 400;
scene.add(camera);

renderer.setSize(stage.x, stage.y);
$container.append(renderer.domElement);

var mesh = new toxi.Sphere(100).toMesh(null, 20);
var threeMesh = toxicToThreeSupport.addMesh(mesh, material);
scene.addObject(threeMesh);

renderer.render(scene, camera);

