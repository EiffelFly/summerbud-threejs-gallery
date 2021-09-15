import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";

const pi = Math.PI;

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

  // Set pixel ration, but if on mobile the pixel ration maybe too high, we need to restrict that
  // renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});



window.addEventListener("dblclick", () => {

  // In order to work on Safari, we need webKit

  const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if (!fullScreenElement){
    if (canvas.requestFullscreen){
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen){
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen){
      document.webkitExitFullscreen()
    }
  }
})

// Scene
const scene = new THREE.Scene();

// Object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "#ff0000",
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 2;
camera.lookAt(cubeMesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

// GSAP
// gsap.to(cubeMesh.position, {duration: 1, delay:2, x: 20})
// gsap.to(cubeMesh.position, {duration: 1, delay:2, x: 0})

// Animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // console.log(elapsedTime)

  // cubeMesh.rotation.x = elapsedTime
  cubeMesh.rotation.y = Math.sin(elapsedTime);
  // cubeMesh.rotation.y = Math.cos(elapsedTime)
  // cubeMesh.position.x = Math.sin(elapsedTime)
  // cubeMesh.position.y = Math.cos(elapsedTime)

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
