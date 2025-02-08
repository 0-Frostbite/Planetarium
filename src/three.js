import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, 16 / 9);
const renderer = new THREE.WebGLRenderer();

document.getElementById("scene").append(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.4, 12, 16);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const circle = new THREE.Mesh(geometry, material);
scene.add(circle);

camera.position.z = 5;

function animate() {
  renderer.setSize(window.innerWidth, (window.innerWidth * 9) / 16);
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
