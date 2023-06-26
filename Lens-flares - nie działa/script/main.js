import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import { Lensflare, LensflareElement} from './Lensflare.js';
import CameraControl from './cameraControl.js';

(() => {
let cameraControl = new CameraControl()
cameraControl.camera.position.set(0, 5, 10)
let textureLoader = new THREE.TextureLoader()

/**
 * build and render hexagon - will be used as lensflare 
*/
// let hexagonRadius = 1; 
// let hexagonSides = 6; // Liczba boków heksagonu

// let hexagonGeometry = new THREE.Geometry();
// for (let i = 0; i <= hexagonSides; i++) {
//   let angle = (Math.PI * 2 * i) / hexagonSides;
//   let x = Math.cos(angle) * hexagonRadius;
//   let y = Math.sin(angle) * hexagonRadius;
//   hexagonGeometry.vertices.push(new THREE.Vector3(x, y+10, 0));
//   hexagonGeometry.faces.push(new THREE.Face3(0, i+1, (i+2) % 6));
// }

// let hexagonMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 })
// let hexagonMesh = new THREE.Mesh(hexagonGeometry, hexagonMaterial);

/**
 * lensflare setup
 */
let lensflare = new Lensflare()

/**
 * czemu to cholerstwo wyrzuca błędy
 */

// let hexagonLensflareElement = new LensflareElement(hexagonMesh.material.color.getHex(), 0.5, 0, hexagonMesh.material.opacity)
// lensflare.addElement(hexagonLensflareElement)
// lensflare.position.copy(hexagonMesh.position)

const lensTexture = textureLoader.load('./textures/hex.png');
lensflare.addElement(new LensflareElement(lensTexture, 512, 0))
lensflare.addElement(new LensflareElement(lensTexture, 512, 0.3))
lensflare.addElement(new LensflareElement(lensTexture, 512, 0.6))


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
 scene.add(light);

/**
 * todo: 999 errors NADAL
 */
// light.add(lensflare);

//  scene.add(hexagonMesh)

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

const floorGeometry = new THREE.BoxGeometry(width, height, length);
floorGeometry.faceVertexUvs[0][0][0].set(0, 0);
floorGeometry.faceVertexUvs[0][0][2].set(floorTextureRepeatX, 0);
floorGeometry.faceVertexUvs[0][0][1].set(0, floorTextureRepeatY);
floorGeometry.faceVertexUvs[0][1][0].set(0, floorTextureRepeatY);
floorGeometry.faceVertexUvs[0][1][2].set(floorTextureRepeatX, 0);
floorGeometry.faceVertexUvs[0][1][1].set(floorTextureRepeatX, floorTextureRepeatY);

const floorTexture = textureLoader.load('./textures/road.jpg');
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(floorTextureRepeatX, floorTextureRepeatY);

const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -height / 2;
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
   cameraControl.updateCameraPosition(innerWidth, innerHeight)
   renderer.render(scene, cameraControl.camera)
   
 }

 animate();

})()