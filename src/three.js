import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import Planets from "./planets";

const padding = 0;
const screenRatio = 2.85;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(10, screenRatio);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, (window.innerWidth * 1) / screenRatio);
renderer.setAnimationLoop(animate);
document.getElementById("scene").append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 24, 24);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

const distanceExpo = 0.6;
const distanceMult = 8;
const sizeExpo = 0.6;
const sizeMult = 0.2;
const sunSize = 2;
const sunOffset = 0;

const Sun = new THREE.Mesh(geometry, material);
Sun.scale.set(sunSize, sunSize, sunSize);
scene.add(Sun);
const rot = 0;
const circle = new THREE.RingGeometry(10, 10.01, 100, 2);
const ring = new THREE.Mesh(circle, material);
scene.add(ring);
ring.rotateX(rot);

for (let i in Planets) {
  let size = Planets[i].size ** sizeExpo * sizeMult;
  let distance = Planets[i].distance ** distanceExpo * distanceMult;
  Planets[i].mesh = new THREE.Mesh(geometry, material);
  Planets[i].mesh.scale.set(size, size, size);
  Planets[i].mesh.translateX(distance + sunOffset);
  scene.add(Planets[i].mesh);
}

camera.position.z = 280;
// camera.rotation.z = 10;
renderer.setClearColor(0x000000, 0);

function animate() {
  renderer.render(scene, camera);
}
