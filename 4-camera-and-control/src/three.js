import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const sizes = {
  width: 800,
  height: 600,
};

/**
 * Cursor
 */

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const cube = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(cube, material);
// cubeMesh.rotation.x = 0.5;
// cubeMesh.position.z = -4
scene.add(cubeMesh);

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);

// OrbitControl + Damping
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
// control.target.y = 0.2
// control.update()

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

scene.add(camera);
camera.position.z = 6
// camera.position.z = 4;
// camera.position.y = 0.2;
// camera.lookAt(cubeMesh)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // cubeMesh.rotation.y = elapsedTime;

  // camera.position.x = cursor.x * 10;
  // camera.position.y = - cursor.y * 10;
  // camera.rotation.y = elapsedTime
  // camera.lookAt(cubeMesh.position)

  // camera.rotation.y = elapsedTime
  // camera.position.x = 4 * Math.sin(elapsedTime);
  // camera.position.z = 4 * Math.sqrt(1 - Math.sin(elapsedTime)**2)

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 10
  // camera.lookAt(cubeMesh.position)
  control.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
