import * as THREE from "three"; // import the whole library
/*console.log(THREE); //to check if library is imported correctly */

const scene = new THREE.Scene(); // to create the main scene

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // create cube geometry: a simple cube
const cubeMaterial = new THREE.MeshBasicMaterial({color: "green"}); // create material : just color for now

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial); //create new item and pass geometry and material

scene.add(cubeMesh); // add the item to the scene

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 4.5); // create a camera and pass field of view, aspect ratio(window.innerWidth / window.innerHeight), near (anything closest than that distance you will not see), far (anything further than that distance you will not see too)
camera.position.z = 5; // change the camera position; move it back in z axis

const canvas = document.querySelector("canvas.threejs"); // get canvas from html

const renderer = new THREE.WebGLRenderer({canvas: canvas}); // create a new renderer and pass canvas to it
/*const renderer = new THREE.WebGLRenderer({canvas});  // it also can be this way */
renderer.setSize(window.innerWidth, window.innerHeight); // set the size of renderer(canvas) to the browser page
renderer.render(scene, camera); // render the canvas and pass it scene and camera
