import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import Planets from "./planets";
import { Texture } from "./texture";

// setup scene, camera and renderer
const padding = 0;
const screenRatio = 16 / 8;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(10, screenRatio);
camera.position.z = 120;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerWidth / screenRatio);
renderer.setAnimationLoop(animate);
renderer.setClearColor(0xffffff, 0);
document.getElementById("scene").append(renderer.domElement);

// setup Orbitalcontrols
const controls = new OrbitControls(camera, renderer.domElement);

// setup geometry and material
const gradientTexture = new THREE.CanvasTexture(Texture(true));
const sphereGeometry = new THREE.SphereGeometry(1, 24, 24);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: gradientTexture,
});
const pathMaterial = new THREE.LineBasicMaterial({
  color: 0x555555,
  side: THREE.DoubleSide,
});

// constant to control 3D object sizeing
const distanceExpo = 0.6;
const distanceMult = 3.2;
const sizeExpo = 0.6;
const sizeMult = 0.1;
const sizeSub = 0;
const sunSize = 0.8;
const sunOffset = 0;
const timeScale = 0.1;

// add Sun
const Sun = new THREE.Mesh(sphereGeometry, sphereMaterial);
Sun.scale.set(sunSize, sunSize, sunSize);
Sun.rotateX(0.1);
scene.add(Sun);

// add Planets
for (let i in Planets) {
  let size = (Planets[i].size - sizeSub) ** sizeExpo * sizeMult;
  // let distance = Planets[i].distance ** distanceExpo * distanceMult;
  Planets[i].mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  Planets[i].mesh.scale.set(size, size, size);
  Planets[i].mesh.translateX(getDistance(Planets[i]));
  Sun.add(Planets[i].mesh);

  //add Planet motion path
  Planets[i].path.curve = new THREE.EllipseCurve(
    0,
    0, // ax, aY
    getDistance(Planets[i]),
    getDistance(Planets[i]),
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0, // aRotation
  );
  Planets[i].path.gmtry = new THREE.BufferGeometry().setFromPoints(
    Planets[i].path.curve.getPoints(128),
  );
  Planets[i].path.mesh = new THREE.Line(Planets[i].path.gmtry, pathMaterial);
  Planets[i].path.mesh.rotateX(1.57);
  Sun.add(Planets[i].path.mesh);
}

//give the planets a random offset
for (let Planet in Planets) {
  let rand = Math.random() * 170732710.9488;
  move(Planets[Planet], rand);
}

// setup animation loop
function animate() {
  renderer.setSize(window.innerWidth, window.innerWidth / screenRatio);
  renderer.render(scene, camera);
  for (let i in Planets) {
    move(Planets[i]);
  }
}

function move(Planet, multiplier = 1) {
  Planet.rotation += Planet.orbitalVel * multiplier;
  Planet.mesh.position.set(
    Math.sin(Planet.rotation * timeScale * multiplier) * getDistance(Planet),
    0,
    Math.cos(Planet.rotation * timeScale * multiplier) * getDistance(Planet),
  );
}

function getDistance(Planet) {
  return Planet.distance ** distanceExpo * distanceMult + sunOffset;
}
