import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// create the main scene
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

//BoxGeometry
const cubeGeometry = new THREE.BoxGeometry(5,5,5, 3,3,3);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 'BlueViolet', wireframe: true});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = 10;
scene.add(cube);

//CapsuleGeometry
const capsuleGeometry = new THREE.CapsuleGeometry(4,12,4 ,10 ,3);
const capsuleMaterial = new THREE.MeshBasicMaterial({color: "DarkGoldenRod", wireframe: true});
const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsule.position.x = 20;
scene.add(capsule);

//CircleGeometry
const circleGeometry = new THREE.CircleGeometry(3,16,0,5);
const circleMaterial = new THREE.MeshBasicMaterial({color:"DarkKhaki", wireframe: true});
const circle = new THREE.Mesh(circleGeometry,circleMaterial);
scene.add(circle);
circle.position.x = -10;

//ConeGeometry
const coneGeometry = new THREE.ConeGeometry(4, 22, 20);
const coneMaterial = new THREE.MeshBasicMaterial({color:"DarkRed", wireframe: true});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
scene.add(cone);
cone.position.x = -20;

//DodecahedronGeometry
const dodecahedronGeometry = new THREE.DodecahedronGeometry(5, 0);
const dodecahedronMaterial = new THREE.MeshBasicMaterial({color: "DarkSlateGrey", wireframe: true});
const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
scene.add(dodecahedron);
dodecahedron.position.set(10, 20,0);

//ExtrudeGeometry
const extrLength = 12, extrWidth = 8;
const extrShape = new THREE.Shape();
extrShape.moveTo(0,0);
extrShape.lineTo(0, extrWidth);
extrShape.lineTo(extrLength,extrWidth);
extrShape.lineTo(extrLength,0);
extrShape.lineTo(0,0)
const extrudeGeometry = new THREE.ExtrudeGeometry(extrShape);
const extrMaterial = new THREE.MeshBasicMaterial({color: "DeepPink", wireframe: true});
const extrude = new THREE.Mesh(extrudeGeometry, extrMaterial);
scene.add(extrude)
extrude.position.set(25, 18,0)

//IcosahedronGeometry
//LatheGeometry
//OctahedronGeometry
//PlaneGeometry
//RingGeometry
//ShapeGeometry
//SphereGeometry
//TetrahedronGeometry
//TorusGeometry
//TorusKnotGeometry
//TubeGeometry
//CylinderGeometry

//creating camera: PerspectiveCamera that fits the window
const camera = new THREE.PerspectiveCamera(
35,
window.innerWidth / window.innerHeight,
0.1,
200
);
camera.position.z = 100;

// getting canvas element and creating renderer with it
const $canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
canvas: $canvas,
antialias: true,
});

//setting size and pixel ratio of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//creating controls
const controls = new OrbitControls(camera, $canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

//setting auto camera and size auto update for window resizing
window.addEventListener("resize", () => {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

//creating a render loop for controls and renderer auto updates
const renderloop = () => {
controls.update();
renderer.render(scene, camera);
window.requestAnimationFrame(renderloop);
};


// calling auto loop to start everything
renderloop();