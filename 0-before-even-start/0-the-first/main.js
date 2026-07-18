import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

//make ready scene, camera and renderer
const scene = new THREE.Scene();

// (field of view, aspect ratio, view frustum from - to )
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#mainBg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//add new object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//const material = new THREE.MeshBasicMaterial({color: 0xaaaa44, wireframe: true});
const material = new THREE.MeshStandardMaterial({color: 0xff4763});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus); // add item to canvas
/*renderer.render(scene, camera); // set scene and camera to it*/

//add light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight); // add light to canvas

//create helpers:
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

//create controllers
const controls = new OrbitControls(camera, renderer.domElement);

//add stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xee4fff});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar); //append stars

//add texture
const spaceTexture = new THREE.TextureLoader().load("galaxy.jpg");
scene.background = spaceTexture;

// add cow
const cowTexture = new THREE.TextureLoader().load("cow.jpg");
const cowBox = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), new THREE.MeshBasicMaterial({map: cowTexture}));
scene.add(cowBox);

// add sun
const sunTexture = new THREE.TextureLoader().load("sun.jpg");
const sun = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshStandardMaterial({map: sunTexture}));

//instead of direct rendering over and over:
function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01; // add x rotation
    torus.rotation.y += 0.005; // add y rotation
    torus.rotation.z += 0.01; // add z rotation
    /*torus.position.z += 0.1; // item goes to left*/
    /*torus.scale.x += 0.005; // item scale grows*/

    controls.update();

    renderer.render(scene, camera);
}

//call it so items append to canvas
animate();
