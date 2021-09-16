import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshLambertMaterial } from "three";

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

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorColorTexture = textureLoader.load("/door-color.jpg");
const doorAlphaTexture = textureLoader.load("/door-alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/door-ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/door-height.jpg");
const doorNormalTexture = textureLoader.load("/door-normal.jpg");
const doorMetalnessTexture = textureLoader.load("/door-metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/door-roughness.jpg");
const matCapTexture = textureLoader.load("/matcap-8.png");
const gradientTexture = textureLoader.load("/gradient-3.jpg");
// gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const environmentMapTexture = cubeTextureLoader.load([
  '/px.jpg',
  '/nx.jpg',
  '/py.jpg',
  '/ny.jpg',
  '/pz.jpg',
  '/nz.jpg'
])

// Scene
const scene = new THREE.Scene();

// Objects
// const material = new THREE.MeshBasicMaterial();
// material.map = matCapTexture
// material.transparent = true
// material.opacity = 0.5
// material.map = doorAlphaTexture

// 通常 THREE 只 Render 一面以節省資源
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matCapTexture

// near -> white, far -> dark
// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 500

// Red light reflection
// material.specular = new THREE.Color(0xff0000)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 0.5;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

gui.add(material, "metalness").min(0.05).max(1).step(0.05);

gui.add(material, "roughness").min(0.05).max(1).step(0.05);

gui.add(material, "aoMapIntensity").min(0.05).max(1).step(0.05);

gui.add(material, "displacementScale").min(0.05).max(1).step(0.05);


const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
scene.add(sphere);
sphere.position.x = -2;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 1000, 1000),
  material
);
scene.add(plane);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 48),
  material
);
scene.add(torus);
torus.position.x = 2;

/**
 * Light
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// OrbitControl + Damping
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// Animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.1 * elapsedTime;
  plane.rotation.x = 0.1 * elapsedTime;
  torus.rotation.x = 0.1 * elapsedTime;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
