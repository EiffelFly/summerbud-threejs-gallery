import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import gsap from "gsap"

const pi = Math.PI

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: '#ff0000'
})
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

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
  // cubeMesh.rotation.y = Math.sin(elapsedTime)
  // cubeMesh.rotation.y = Math.cos(elapsedTime)
  // cubeMesh.position.x = Math.sin(elapsedTime)
  // cubeMesh.position.y = Math.cos(elapsedTime)

  // camera.rotation.x = Math.sin(elapsedTime)
  // camera.lookAt(cubeMesh.position)
  
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()