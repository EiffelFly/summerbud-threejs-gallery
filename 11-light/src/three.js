import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xfffffc, 0)
directionalLight.position.x = -4
directionalLight.lookAt(new THREE.Vector3())
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, 0)
pointLight.position.x = 3
pointLight.distance = 2
pointLight.decay = 1
scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 0, 1, 1)
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00, 0, 10, Math.PI * 0.1, 0.25, 1)
spotLight.target.position.x = - 0.75
spotLight.lookAt(new THREE.Vector3())
scene.add(spotLight.target)
scene.add(spotLight)

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
hemisphereLightHelper.visible = false
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
directionalLightHelper.visible = false
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)
pointLightHelper.visible = false

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
rectAreaLightHelper.visible = false
scene.add(rectAreaLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
spotLightHelper.visible = false
scene.add(spotLightHelper)
window.requestAnimationFrame(() =>
{
    spotLightHelper.update()
})

// GUI

const ambientLightFolder = gui.addFolder("Ambient")
ambientLightFolder.add(ambientLight, "intensity").min(0).max(1).step(0.05).name("Ambient")

const directionalLightFolder = gui.addFolder("Directional")
directionalLightFolder.add(directionalLight, "intensity").min(0).max(1).step(0.05).name("Directional")
directionalLightFolder.add(directionalLightHelper, "visible").name("Directional helper")
directionalLightFolder.add(directionalLight.position, "x").min(-10).max(10).step(0.1).name("Directional x")
directionalLightFolder.add(directionalLight.position, "y").min(-10).max(10).step(0.1).name("Directional y")
directionalLightFolder.add(directionalLight.position, "z").min(-10).max(10).step(0.1).name("Directional z")

const hemisphereLightFolder = gui.addFolder("Hemisphere")
hemisphereLightFolder.add(hemisphereLight, "intensity").min(0).max(1).step(0.05).name("Hemisphere")
hemisphereLightFolder.add(hemisphereLightHelper, "visible").name("Hemisphere helper")
hemisphereLightFolder.add(hemisphereLight.position, "x").min(-10).max(10).step(0.1).name("Hemisphere x")
hemisphereLightFolder.add(hemisphereLight.position, "y").min(-10).max(10).step(0.1).name("Hemisphere y")
hemisphereLightFolder.add(hemisphereLight.position, "z").min(-10).max(10).step(0.1).name("Hemisphere z")

const pointLightFolder = gui.addFolder("Point")
pointLightFolder.add(pointLight, "intensity").min(0).max(1).step(0.05).name("Point intensity")
pointLightFolder.add(pointLight, "decay").min(0).max(1).step(0.05).name("Point decay")
pointLightFolder.add(pointLight, "distance").min(0).max(10).step(0.05).name("Point distance")
pointLightFolder.add(pointLight.position, "x").min(-10).max(10).step(0.1).name("Point x")
pointLightFolder.add(pointLight.position, "y").min(-10).max(10).step(0.1).name("Point y")
pointLightFolder.add(pointLight.position, "z").min(-10).max(10).step(0.1).name("Point z")
pointLightFolder.add(pointLightHelper, "visible").name("Point helper")


const rectLightFolder = gui.addFolder("Rect")
rectLightFolder.add(rectAreaLight, "intensity").min(0).max(1).step(0.05).name("Rect intensity")
rectLightFolder.add(rectAreaLight, "width").min(0).max(10).step(0.05).name("Rect width")
rectLightFolder.add(rectAreaLight, "height").min(0).max(10).step(0.05).name("Rect height")
rectLightFolder.add(rectAreaLight.position, "x").min(-10).max(10).step(0.1).name("Rect x")
rectLightFolder.add(rectAreaLight.position, "y").min(-10).max(10).step(0.1).name("Rect y")
rectLightFolder.add(rectAreaLight.position, "z").min(-10).max(10).step(0.1).name("Rect z")
rectLightFolder.add(rectAreaLightHelper, "visible").name("Rect helper")

const spotLightFolder = gui.addFolder("Spot")
spotLightFolder.add(spotLight, "intensity").min(0).max(1).step(0.05).name("Spot intensity")
spotLightFolder.add(spotLight, "distance").min(0).max(10).step(0.05).name("Spot distance")
spotLightFolder.add(spotLight, "angle").min(0).max(2 * Math.PI).step(0.1).name("Spot angle")
spotLightFolder.add(spotLight, "penumbra").min(0).max(5).step(0.1).name("Spot penumbra")
spotLightFolder.add(spotLight.target.position, "x").min(-10).max(10).step(0.1).name("Spot x")
spotLightFolder.add(spotLight.target.position, "y").min(-10).max(10).step(0.1).name("Spot y")
spotLightFolder.add(spotLight.target.position, "z").min(-10).max(10).step(0.1).name("Spot z")
spotLightFolder.add(spotLightHelper, "visible").name("Spot helper")

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()