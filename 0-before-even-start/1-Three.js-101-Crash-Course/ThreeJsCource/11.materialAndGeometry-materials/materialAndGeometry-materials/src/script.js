import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// create the main scene
const scene = new THREE.Scene();

//create cube, basic material and mesh it to the cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

const cubeMaterial = new THREE.MeshBasicMaterial({ 
    color: "Gold",
    transparent: true,
    opacity: 0.4,
    wireframe: false 
    });

const planeGeometry = new THREE.PlaneGeometry(1,1);

cubeMaterial.opacity = 0.8;
cubeMaterial.color = new THREE.Color("HotPink")

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube2Mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube2Mesh.position.x = 1.5;

const planeMesh = new THREE.Mesh(planeGeometry, cubeMaterial);
planeMesh.position.x = -1.5;
cubeMaterial.side = THREE.DoubleSide;

const fog = new THREE.Fog('#FFF0F5', 1, 10)

scene.add(cubeMesh);
scene.add(cube2Mesh);
scene.add(planeMesh);
scene.fog = fog;
scene.background = new THREE.Color('#FFF0F5')


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