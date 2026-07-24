# to Start Project

## Vite
- a web dev tool, that automates the pocess of transforming code into production ready HTML CSS JS that will be ready by the browser.
- it designed specifically fro modern JS development.
- [Vite Website](https://vite.dev/)
- to use it, you need to install [Node.Js](https://nodejs.org/en) first.

### What's Node.js ? 
- its an open-source, cross-platform JavaScript runtime enviroment. so it's a place that allows you to run js outside of the browser.
- it also provides npm (node package management)

### how to install Vite
- install [Node.Js](https://nodejs.org/en)
- install the vite
```bash
npm create vite@latest
```
- fill **Project name**, Select a **framework**, Select a **variant**
- install npm (if not installed in vite process)
```bash
npm install
```
- run npm for live development changes
```bash
npm run dev
```

## How To install ThreeJs
- [ThreeJs Installation Document](https://threejs.org/manual/#en/installation)

- index.html : main page that must contain 
```html
<script type="module" src="/main.js"></script>
```
at the end of the body
- main.js : the file that linked to end of the body, that imporst threejs:
```js
import * as THREE from 'three'
```
- public/ :  the files it contains are pushed to the website unchanged. Usually **textures**, **audio**, and **3D models** will go here.

- add threejs
  - Install with NPM and a build tool:
  ```bash
  # three.js
  npm install --save three
  ```
  -  Import from a CDN:

  ```html
    <script type="importmap">
      {
        "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@<version>/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@<version>/examples/jsm/"
        }
      }
    </script>
  ```

## Basics in a ThreeJs project
- scene 
```js
const scene = new THREE.Scene();
```
- item geometry
```js
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); 
```
- item material
```js
const cubeMaterial = new THREE.MeshBasicMaterial({color: "green"});
```
- item mesh
```js
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
```
- add item to the scene
```js
scene.add(cubeMesh);
```
- add camera
```js
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30);
```
- add canvas
```html
<canvas class="threejs"></canvas>
```
- add renderer 
```js
const renderer = new THREE.WebGLRenderer({canvas});
```