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
camera.position.z = 8;

// getting canvas element and creating renderer with it
const $canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
canvas: $canvas,
antialias: true,
});

//creating controls
const controls = new OrbitControls(camera, $canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

// add light
const ambLight = new THREE.AmbientLight(0xffffff, 0.4);
const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5,5,5)
scene.add(ambLight);
scene.add(pointLight);

// add texture loader
const textureLoader = new THREE.TextureLoader()
// create a texture
const textureWall = textureLoader.load('/texture/rock-wall-mortar-bl/rock-wall-mortar_albedo.png')

// add texture to material map
const textureMaterial = new THREE.MeshBasicMaterial();
textureMaterial.map = textureWall;
textureMaterial.color = new THREE.Color('gold')

//create cube, basic material and mesh it to the cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const torusGeometry = new THREE.TorusKnotGeometry(0.4,0.15,150,55);
const planeGeometry = new  THREE.PlaneGeometry(1,1);
const sphereGeometry = new THREE.SphereGeometry(0.5,32,32);
const cylinderGeometry= new THREE.CylinderGeometry(0.5,0.5,1,32);

const cubeMesh = new THREE.Mesh(cubeGeometry, textureMaterial);
const torusKnotMesh = new THREE.Mesh(torusGeometry, textureMaterial);
const planeMesh = new THREE.Mesh(planeGeometry, textureMaterial);
const sphere = new THREE.Mesh();
sphere.geometry = sphereGeometry;
sphere.material = textureMaterial;
const cylinderMesh = new THREE.Mesh();
cylinderMesh.geometry = cylinderGeometry;
cylinderMesh.material = textureMaterial;

planeMesh.position.x = 1.5;
torusKnotMesh.position.x = -1.5;
sphere.position.y = -1.5;
cylinderMesh.position.y = 1.5

//append the new item to the scene
//scene.add(cubeMesh, planeMesh, torusKnotMesh, sphere, cylinderMesh);
const meshGroup = new THREE.Group();
meshGroup.add(cubeMesh, planeMesh, torusKnotMesh, sphere, cylinderMesh);
scene.add(meshGroup)

//setting size and pixel ratio of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//setting auto camera and size auto update for window resizing
window.addEventListener("resize", () => {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

//creating a render loop for controls and renderer auto updates
const renderloop = () => {

//cubeMesh.rotation.y += 0.01 
/*scene.children.forEach((child) =>{
    if(child instanceof THREE.Mesh){
        child.rotation.y += 0.01;
    }
})*/

    meshGroup.children.forEach((child) =>{
    if(child instanceof THREE.Mesh){
        //child.rotation.y += 0.01;
    }
})

controls.update();
renderer.render(scene, camera);
window.requestAnimationFrame(renderloop);
};

// calling auto loop to start everything
renderloop();