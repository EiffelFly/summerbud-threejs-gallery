import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const gui = new dat.GUI({ width: 400 });

const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const parameters = {
  sceneBackgroundColor: "#CBD2D9",
  sceneFogColor: "#CBD2D9",
  sceneFogNear: 1,
  sceneFogFar: 1000,
  dampingFactor: 0.05,
  materialColor: "#DA852F",
  materialFlatShading: true,
  maxPolarAngle: 0.5
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


//Creates scene and camera

var scene = new THREE.Scene();
scene.background = new THREE.Color(parameters.sceneBackgroundColor);

scene.fog = new THREE.Fog(
  parameters.sceneFogColor,
  parameters.sceneFogNear,
  parameters.sceneFogFar
);

var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = parameters.dampingFactor;
controls.maxPolarAngle = parameters.maxPolarAngle * Math.PI

// Cylinder

var geometry = new THREE.CylinderGeometry( 0, 10, 30, 6, 1 );
var material = new THREE.MeshBasicMaterial( {color: parameters.materialColor} );

for ( let i = 0; i < 500; i ++ ) {
  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = Math.random() * 2000 - 1000;
  mesh.position.y = 0;
  mesh.position.z = Math.random() * 2000 - 1000;
  mesh.updateMatrix();
  mesh.matrixAutoUpdate = false;
  scene.add( mesh );
}


var cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );

camera.position.z = 60;

//Rendering

function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
}
render();

// Debug
gui.addColor(parameters, "sceneBackgroundColor").onChange(() => {
  scene.background.set(parameters.sceneBackgroundColor);
});

gui.addColor(parameters, "sceneFogColor").onChange(() => {
  scene.fog.color.set(parameters.sceneFogColor);
});

gui.add(parameters, "dampingFactor").min(0.01).max(0.1).step(0.01).onChange(() => {
  controls.dampingFactor = parameters.dampingFactor;
  controls.update();
});

gui.add(parameters, "maxPolarAngle").min(0.1).max(1).step(0.1).onChange(() => {
  controls.maxPolarAngle = parameters.maxPolarAngle * Math.PI
})
