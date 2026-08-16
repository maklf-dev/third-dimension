# Mesh

## Geometry
- to add an item to the scene, we have two ways: 
    - to add 3js own geometries called **Primitives**
    - the other way to add a geometry is to do it from **Scratch**
        - by using 3d applications like **blender**
        - **BufferGeometry**

### Buffer Geometry
- the type of geometry where vertex data is stored in the memory as binary arrays or buffers. 
- the vertices in general refers to pointes between at least two edges of a shape

![vertex](./imgs/vertex.jpg)
![vertices](./imgs/vertices.png) 

- all the primitive we use for geometry, like `BoxGeometry`, use `BufferGeometry` under the hood.
- to create an item with BufferGeometry:
    - create a new geometry

    ```js
    const geometry = new THREE.BufferGeometry();
    ```
    - determine vertices 
    
    ```js
    const vertices = new Float32Array( [
        -1.0, -1.0,  1.0, // v0
         1.0, -1.0,  1.0, // v1
         1.0,  1.0,  1.0, // v2
         1.0,  1.0,  1.0, // v3
        -1.0,  1.0,  1.0, // v4
        -1.0, -1.0,  1.0  // v5
    ] );
    ```

    - set the vertices as the geometry attribute

    ```js
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    ```

    - create material

    ```js
    const material = new THREE.MeshBasicMaterial({color: 0xff0000});
    ```

    - mesh the item

    ```js
    const mesh = new THREE.Mesh(geometry, material);
    ```
    ![buffer](./imgs/buffer.png)

- when we create vertices positions with `Float32Array`, we actually set the `x,y,z` of each vertices on the axis.

![verticesPositionsOnAxis](./imgs/verticesPositionAxis.jpg)

- when we set `BufferAttribute` it takes three parameters:
    - array : the list of the vertex (Float32Array)
    - itemSize : the number of axis we have, so it knows how many numbers must be in each group when separate them (3)
    - normalize : 

### Primitives
- there is some primitive shapes that we can use and adjust them to add them to the scene:
    - BoxGeometry
    - CapsuleGeometry
    - CircleGeometry
    - ConeGeometry
    - DodecahedronGeometry
    - ExtrudeGeometry
    - IcosahedronGeometry
    - LatheGeometry
    - OctahedronGeometry
    - PlaneGeometry
    - RingGeometry
    - ShapeGeometry
    - SphereGeometry
    - TetrahedronGeometry
    - TorusGeometry
    - TorusKnotGeometry
    - TubeGeometry
    - CylinderGeometry

- for some of them, we just need to create `Geometry` and `Material`, `Mesh` them and add to the scene. for example:

```js
//ConeGeometry
const coneGeometry = new THREE.ConeGeometry(4, 22, 20);
const coneMaterial = new THREE.MeshBasicMaterial({color:"DarkRed", wireframe: true});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
scene.add(cone);
```

- but for some of them, we need to set more setting before adding to the set:

```js
//ExtrudeGeometry
const extrLength = 12, extrWidth = 8;
const extrShape = new THREE.Shape();
extrShape.moveTo(0,0);
extrShape.lineTo(0, extrWidth);
extrShape.lineTo(extrLength,extrWidth);
extrShape.lineTo(extrLength,0);
extrShape.lineTo(0,0)
const extrudeGeometry = new THREE.ExtrudeGeometry(extrShape);
const extrMaterial = new THREE.MeshBasicMaterial({color: "DeepPink", wireframe: true});
const extrude = new THREE.Mesh(extrudeGeometry, extrMaterial);
scene.add(extrude)
```
- the complete structure of how to use and set them is available at [ThreeJs Documentations](https://threejs.org/docs/) .
