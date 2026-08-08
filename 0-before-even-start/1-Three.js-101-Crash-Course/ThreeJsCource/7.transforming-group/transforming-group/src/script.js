import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// create the main scene
const scene = new THREE.Scene();

//create cube, basic material and mesh it to the cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeGeometry2 = new THREE.BoxGeometry(2, 2, 0.5);
const cubeGeometry3 = new THREE.BoxGeometry(0.3, 0.4, 0.5);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "Chocolate", wireframe: true });
const cubeMaterial2 = new THREE.MeshBasicMaterial({ color: "green", wireframe: true });
const cubeMaterial3 = new THREE.MeshBasicMaterial({ color: "yellow", wireframe: true });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);true
const cubeMesh2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);
cubeMesh2.position.set(2,2,2)
const cubeMesh3 = new THREE.Mesh(cubeGeometry3, cubeMaterial3);
cubeMesh3.position.set(-2,-2,-2)

//add rotation
cubeMesh.rotation.x = Math.PI;

//create a group of items
const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);

//apply changes to group
//group.scale.set(2,1.5,3.5)

//append the new item to the scene
//scene.add(cubeMesh);
scene.add(group)

//add axis helper 
const axesHelper = new THREE.AxesHelper(10);
const axesHelper2 = new THREE.AxesHelper(10);
const axesHelper3 = new THREE.AxesHelper(10);
//scene.add(axesHelper)
cubeMesh.add(axesHelper);
cubeMesh2.add(axesHelper2);
cubeMesh3.add(axesHelper3);

//creating camera: PerspectiveCamera that fits the window
const camera = new THREE.PerspectiveCamera(
35,
window.innerWidth / window.innerHeight,
0.1,
200
);
camera.position.z = 5;

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