import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js';
import { Lensflare, LensflareElement} from './Lensflare.js';
import CameraControl from './cameraControl.js';

(() => {
let cameraControl = new CameraControl()
cameraControl.camera.position.set(0, 5, 10)
let textureLoader = new THREE.TextureLoader()


// Tworzenie sceny
 var scene = new THREE.Scene();

 // Tworzenie renderera
 var renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);

 // Dodanie światła punktowego do sceny
 var light = new THREE.PointLight(0xffffff, 1, 0);

 //make light slightly above camera's default position, and make it in front of it
 light.position.set(0, 5, -10);


 /**
 * lensflare setup
 */
const lensSourceTexture = textureLoader.load('./textures/lensHexSource.png');
const lensHitTexture    = textureLoader.load('./textures/lensHexHit.png');

const lensflare = new Lensflare()
lensflare.addElement(new LensflareElement(lensSourceTexture, 200, 0, light.color))
lensflare.addElement(new LensflareElement(lensHitTexture, 100, 0.45))
lensflare.addElement(new LensflareElement(lensHitTexture, 80, 0.6))
lensflare.addElement(new LensflareElement(lensHitTexture, 60, 0.65))
lensflare.addElement(new LensflareElement(lensHitTexture, 70, 0.75))

light.add(lensflare)

scene.add(light);

 // Tworzenie nieba
 var skyGeometry = new THREE.SphereGeometry(500, 60, 40);
 var skyMaterial = new THREE.MeshBasicMaterial({
   map: textureLoader.load('./textures/sky.jpg'),
   side: THREE.BackSide
 });
 var sky = new THREE.Mesh(skyGeometry, skyMaterial);
 scene.add(sky);

// Tworzenie podłogi
const width = 120;
const length = 120;
const height = 0.01;
const floorTextureRepeatX = 50; // Liczba powtórzeń tekstury wzdłuż osi X
const floorTextureRepeatY = 50; // Liczba powtórzeń tekstury wzdłuż osi Y

const floorGeometry = new THREE.PlaneGeometry(width*floorTextureRepeatX, length*floorTextureRepeatY)

/**
 *  works with three.js@1.22, doesnt work with three@1.52
 */
// const floorGeometry = new THREE.BoxGeometry(width, height, length);
// floorGeometry.faceVertexUvs[0][0][0].set(0, 0);
// floorGeometry.faceVertexUvs[0][0][2].set(floorTextureRepeatX, 0);
// floorGeometry.faceVertexUvs[0][0][1].set(0, floorTextureRepeatY);
// floorGeometry.faceVertexUvs[0][1][0].set(0, floorTextureRepeatY);
// floorGeometry.faceVertexUvs[0][1][2].set(floorTextureRepeatX, 0);
// floorGeometry.faceVertexUvs[0][1][1].set(floorTextureRepeatX, floorTextureRepeatY);

const floorTexture = textureLoader.load('./textures/road.jpg');
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(floorTextureRepeatX, floorTextureRepeatY);

const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = 0;
// rotation by 90 degree (hell yeah euler)
floor.rotation.x = -1.5708
floor.castShadow = true;
floor.receiveShadow = true;
scene.add(floor);


// Tworzenie budynków
// const buildingTexture = textureLoader.load('./textures/building.jpg')
// const buildingMaterial = new THREE.MeshBasicMaterial({ map: buildingTexture });
var numBuildings = 6; // Liczba budynków w jednym wierszu i kolumnie
var buildingSize = 10; // Rozmiar pojedynczego budynku
var spacing = 20; // Odległość międazy budynkami

var startX = -((numBuildings - 1) * spacing) / 2;; // Startowa pozycja X dla pierwszego budynku
var startY = -((numBuildings - 1) * spacing) / 2;; // Startowa pozycja Y dla pierwszego budynku

/**
 * TODO: Dodać tekstury
 */
for (var i = 0; i < numBuildings; i++) {
  for (var j = 0; j < numBuildings; j++) {
    var buiildingHeight = Math.random() * (30 - 15) + 15 / 2;

    var buildingGeometry = new THREE.BoxGeometry(buildingSize, buiildingHeight, buildingSize);
    var buildingMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    var building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.x = startX + i * spacing;
    building.position.z = startY + j * spacing;
    building.position.y = height / 2;

    scene.add(building);
  }
}


 // Render sceny
 function animate() {
   requestAnimationFrame(animate)
  /**
   * TODO: fix that dummy camera
   */
   cameraControl.updateCameraPosition(innerWidth, innerHeight)
   renderer.render(scene, cameraControl.camera)
   
 }

 animate();

})()