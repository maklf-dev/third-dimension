import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// create the main scene
const scene = new THREE.Scene();

//create cube, basic material and mesh it to the cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "blue", wireframe: true });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

//append the new item to the scene
scene.add(cubeMesh);

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

const clock = new THREE.Clock();
let previousTime = 0;

//creating a render loop for controls and renderer auto updates
const renderloop = () => {
const currentTime = clock.getElapsedTime();
const delta = currentTime - previousTime;
previousTime = currentTime;

// console.log(Math.sin(currentTime))
//adding rotation animation
cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 50
cubeMesh.position.x = Math.sin(currentTime);
cubeMesh.scale.y = Math.sin(currentTime) * 2
controls.update();
renderer.render(scene, camera);
window.requestAnimationFrame(renderloop);
};


// calling auto loop to start everything
renderloop();