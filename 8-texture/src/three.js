import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const pi = Math.PI;

/**
 * Debug
 */

const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const parameters = {
  color: "#ffffff",
};

/**
 * Texture
 */

// const image = new Image();
// const texture = new THREE.Texture(image);
// image.addEventListener("load", () => {
//   texture.needsUpdate = true;
// })
// image.src = "/door-texture.jpeg"
const loadingManger = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManger)
const colorTexture = textureLoader.load("/checkerboard-8x8.png")
const alphaTexture = textureLoader.load('/door-alpha.jpg')
const heightTexture = textureLoader.load('/door-height.jpg')
const normalTexture = textureLoader.load('/door-normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/door-ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/door-metalness.jpg')
const roughnessTexture = textureLoader.load('/door-roughness.jpg')

// Transform

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 2
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5

// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// Minmapping

// colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

// Resize

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
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
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  map: colorTexture
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);
cubeMesh.visible = true;

gui.add(cubeMesh.position, "y", -1, 1, 0.1);

gui.add(cubeMesh.position, "x").min(-1).max(1).step(0.1).name("Cube x");

gui.add(cubeMesh, "visible").name("Cube visible");

gui.add(cubeMaterial, "wireframe");

gui.addColor(parameters, "color").onChange(() => {
  cubeMaterial.color.set(parameters.color);
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 2;
camera.lookAt(cubeMesh.position);
scene.add(camera);

// OrbitControl + Damping
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
