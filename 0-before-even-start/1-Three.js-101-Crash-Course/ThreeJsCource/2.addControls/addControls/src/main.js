// import the whole library
import * as THREE from "three";
/*console.log(THREE); //to check if library is imported correctly */

// import orbit control addon
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
/*console.log(OrbitControls); //to check if library is imported correctly */

// to create the main scene
const scene = new THREE.Scene();

// create cube geometry: a simple cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// create material : just color for now
const cubeMaterial = new THREE.MeshBasicMaterial({color: "green"});

//create new item and pass geometry and material
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh); // add the item to the scene

/*create a camera and pass field of view, aspect ratio(window.innerWidth / window.innerHeight), near (anything closest than that distance you will not see), far (anything further than that distance you will not see too)*/
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
// change the camera position; move it back in z axis
camera.position.z = 5;

// get canvas from html
const canvas = document.querySelector("canvas.threejs");

// create a new renderer and pass canvas to it
const renderer = new THREE.WebGLRenderer({canvas: canvas});
/*const renderer = new THREE.WebGLRenderer({canvas});  // it also can be this way */

// set the size of renderer(canvas) to the browser page
renderer.setSize(window.innerWidth, window.innerHeight);

// to create orbit controls
const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true; // add smooth orbiting
controls.autoRotate = true; // active auto rotation ** need to add controls.update(); too renderLoop
controls.dampingFactor = 0.2; // set the number of it

// create a loop base on device refresh frame
const renderLoop = () => {
    // render the canvas and pass it scene and camera
    renderer.render(scene, camera);
    // is needed because of the autoRotate
    controls.update();
    // make this function a loop, but limited to device refresh rate, not an infinite loop
    window.requestAnimationFrame(renderLoop);
};

renderLoop();
