import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// create the main scene
const scene = new THREE.Scene();
//creating camera: PerspectiveCamera that fits the window
const camera = new THREE.PerspectiveCamera(
35,
window.innerWidth / window.innerHeight,
0.1,
200
);
camera.position.z = 5;
//axes Helper
const axesHelper = new THREE.AxesHelper(20);
//scene.add(axesHelper)




//add lambert Material
const lamberMaterial = new THREE.MeshLambertMaterial()  
lamberMaterial.color = new THREE.Color(0xff00ff)

//add Phong Material
const phongMaterial = new THREE.MeshPhongMaterial();
phongMaterial.shininess = 400;
phongMaterial.opacity = 1;
phongMaterial.color = new THREE.Color(0x00ffff)
phongMaterial.side = THREE.DoubleSide;

//add Standard Mesh 
const standardMaterial = new THREE.MeshStandardMaterial();
standardMaterial.color = new THREE.Color(0xfff000);
standardMaterial.metalness = 1.4;
standardMaterial.roughness = 0.55;

//add Physical Mehs
const physicalMaterial = new THREE.MeshPhysicalMaterial();
physicalMaterial.color = new THREE.Color(0xf00f00);
physicalMaterial.metalness = 0.2;
physicalMaterial.roughness = 0.58;
physicalMaterial.reflectivity = 0.55;
physicalMaterial.clearcoat = 1;

//create cube, basic material and mesh it to the cube
//const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//const planeGeometry = new THREE.PlaneGeometry(1,1);
//torusGeometry
const toursKnotGeometry = new THREE.TorusKnotGeometry(0.4,0.15,150,55);

//Mesh
const torusKnotMesh1 = new THREE.Mesh(toursKnotGeometry, lamberMaterial);
torusKnotMesh1.position.x = -3;
scene.add(torusKnotMesh1);
const torusKnotMesh2 = new THREE.Mesh(toursKnotGeometry, phongMaterial);
torusKnotMesh2.position.x = -1;
scene.add(torusKnotMesh2);
const torusKnotMesh3 = new THREE.Mesh(toursKnotGeometry, standardMaterial);
scene.add(torusKnotMesh3);
torusKnotMesh3.position.x = 0.8; // -0.2
const torusKnotMesh4 = new THREE.Mesh(toursKnotGeometry, physicalMaterial);
torusKnotMesh4.position.x = 2.5; // 1.5
scene.add(torusKnotMesh4);


//create the light
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 15);
pointLight.position.set(-2,2,0);
const pointLight2 = new THREE.PointLight(0xffffff, 10);
pointLight2.position.set(2,2,0);
const pointLight3 = new THREE.PointLight(0xffffff, 10);
pointLight3.position.set(0,2,2);
scene.add(pointLight);
scene.add(pointLight2);
scene.add(pointLight3);


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