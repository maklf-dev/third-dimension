//-- Addons
//---- Controls
//------ OrbitControls

/*0- How to Import:*/
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

/*0 -How to Use: */
const controls = new OrbitControls(camera, renderer.domElement);
// controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();
function animate() {
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render(scene, camera);
}
/*
Read more at: 
https://github.com/maklf-dev/third-dimension/blob/main/0-before-even-start/1-Three.js-101-Crash-Course/Documents/Notes-2-cameraAndView.md#render-loop
*/

/*#1*/
controls.autoRotate = false;
/*
- gives item auto rotation.
** Note that if this is enabled, you must call update() in animation loop.
*/

/*#2*/
controls.autoRotateSpeed = 2;
/*
- sets how fast item rotates
- if update(deltaTime), the number unit would be RPM (Round Per Minute). so autoRotateSpeed = 2 means 2 round per minute
- if update(), if FPS = 60, number unit would be RPM
- the actual formula:
*/
if (deltaTime !== null) {
    return ((2 * Math.PI) / 60) * scope.autoRotateSpeed * deltaTime;
} else {
    return ((2 * Math.PI) / 60 / 60) * scope.autoRotateSpeed;
}

/*#3*/
controls.cursor; //???

/*#4*/
controls.cursorStyle = "auto";
/*
- sets the design of the cursor when hovers the dom.Element
- only gets two value of 'auto' and 'grab'
- for more cursor styles, we have to set them directly on dom.Element:
*/
renderer.domElement.style.cursor = "pointer";

/*#5*/
controls.enableDamping = false;
controls.dampingFactor = 0.05;
/*
- it gives a feel of wight 
- when it's off, immediately after releasing the item, the movement stops
- the number shows how percent of movement reduces in each frame
- so if movement speed is 100 and dampingFactor = 0.1, it means:
100 -> 90 -> 81 -> 72.9 -> 65.6 -> ...
speed gets reduces by 10% in each frame
*/
