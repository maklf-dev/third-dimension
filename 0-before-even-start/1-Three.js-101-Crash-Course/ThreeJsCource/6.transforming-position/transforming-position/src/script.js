import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// create the main scene
const scene = new THREE.Scene();

//create cube, basic material and mesh it to the cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "Chocolate", wireframe: false });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

//append the new item to the scene
scene.add(cubeMesh);

//change the positions of the cube
cubeMesh.position.y = 1
cubeMesh.position.x = -5
cubeMesh.position.z = -0.5

//changing the position with vector3 method
const newYPosition = new THREE.Vector3(0,2,0);
cubeMesh.position.copy(newYPosition)

//change the object scale
cubeMesh.scale.z = 2
cubeMesh.scale.set(2,1.5,0.2)

//add axis helper 
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper)

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