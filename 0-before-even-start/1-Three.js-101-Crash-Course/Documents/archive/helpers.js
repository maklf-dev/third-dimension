// to show the axis
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// to add a plain grid
const gridHelper = new THREE.GridHelper( 10, 10, "red", "green" );
scene.add( gridHelper );