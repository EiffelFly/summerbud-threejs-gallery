import "./style.css";
import * as THREE from "three";
const pi = Math.PI;
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Resize

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix(); // Alarm Threejs to update matrix
  renderer.setSize(sizes.width, sizes.height);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullScreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullScreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// Scene
const scene = new THREE.Scene();

// Object
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshBasicMaterial({
//   color: "#ff0000",
//   wireframe: true,
// });
// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cubeMesh);

// Create a triangle
// We store vertices position value in the array
// We have tree vertices so we store 9 value (x, y, z) * 3

const geometry = new THREE.BufferGeometry();

const count = 5000;
const positionArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
  positionArray[i] = Math.random();
}

const positionAttr = new THREE.BufferAttribute(positionArray, 3);
geometry.setAttribute("position", positionAttr);
const material = new THREE.MeshBasicMaterial({
  color: "#ff0000",
  wireframe: true,
});

const customMesh = new THREE.Mesh(geometry, material);
scene.add(customMesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);
camera.position.z = 3;
camera.position.y = 2;
// camera.lookAt(cubeMesh.position);
scene.add(camera);

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

// Animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
