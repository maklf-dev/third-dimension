## camera

- **fov** : The vertical field of view. Default is 50.
  - the angle that captured by the lens. [visualization](https://observablehq.com/@grantcuster/understanding-scale-and-the-three-js-perspective-camera)
- **aspect** : The aspect ratio. Default is 1.
- **near** : The camera's near plane. Default is 0.1.
- **far** : The camera's far plane. Default is 2000.

- if set too small number for near and too big number for far, so it covers everything, it may cause `Z-fighting`

- the **far** number is the farthest distance that can be seen; and the **near** number is the closest distance that can be seen with camera. so if we set the position of camera for example `5`, and set the far to `7` and near to `1`, it means camera positioned at `5`, and can see distance between `1` and `7`:

```
      _____________________________
     |                             |
    `N`                 `C`       `F`
|----|----|----|----|----|----|----|----|
0    1    2    3    4    5    6    7    8
```
- so if we set the **far** number less that camera position, the item is not visible:
```
      _________
     |         |
    `N`       `F`       `C`       
|----|----|----|----|----|----|----|----|
0    1    2    3    4    5    6    7    8
```
- about **near** number, we should notice that when we set the **near** and position of the camera the same number, the camera actually is **inside** the item! so we have to minus at least half of the item geometry that is in the same axis of the camera, so we can see it. for example if the camera positioned at z = 5, and item is (1,1,1); the **near** value must be <4.5 so we can see it. ( 1 / 2 = 0.5, 5 - 0.5 = 4.5)
- with the same logic, the **far** number must be at least >=4.5

## Orbit Controls

- it allows the camera to orbit around the target
- [example](https://threejs.org/examples/misc_controls_orbit.html)
- it takes two parameter: camera and dom element
```js
const controls = new OrbitControls( camera, renderer.domElement );
```
- we can create it after canvas variable and rendering canvas, and just pass the canvas to it as the dom element:
```js
const canvas = document.querySelector("canvas.threejs"); // getting canvas
const renderer = new THREE.WebGLRenderer({canvas: canvas});  // pass the canvas as the renderer
const controls = new OrbitControls(camera, canvas); // create orbit control and pass canvas as dom element
```
### render loop

- call render once every frame

#### request animation frame

- if we just put the controls in the code, as js runs, it execute `renderer.render(scene, camera);` once, and thats it! any position items had in that moment, get captured and there is no more change to them.
- for fixing this, there are some trick that help us to execute code more than once, and times after first execute: `set timeout` , `set interval` and just creating a `loop`! but the problem is if we execute code with these, we get errors, crashes and Maximum call! because what actually happens is we call the function infinitely over and over again, and we actually don't want that!
- each device has **Frame Rate Gap**. usually devices has refresh rate of `60` or `120`. so if we want to have fluid experience  that **syncs** with the refresh rate of the screen, we want to match the screen refresh rate to how many times we execute renderer and actually rendering the renderer that many times.
- for rendering the renderer in needed sequences, and to sync it with different device refresh rates, we can use **Request Animation Frame**
- in browsers, we have access to global object `window`, which has method named `requestAnimationFrame`
- the `requestAnimationFrame` is a global function, that takes another function. and tells the computer: right before generating a new image(refresh and load a new frame) execute that function
```js
window.requestAnimationFrame(function)
```
- so in this way, we can render canvas, exactly as much as the computer refresh the frame in all devices. and we can create a loop for out renderer, but a loop that fot limited by device refresh rate, not an infinite loop:

```js
const renderLoop = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderLoop);
};

renderLoop();
```