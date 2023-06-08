 // Tworzenie sceny
 var scene = new THREE.Scene();

 // Tworzenie renderera
 var renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);

 // Dodanie światła punktowego do sceny
 var light = new THREE.PointLight(0xffffff, 1, 0);
 light.position.set(0, 0, 10);
 scene.add(light);

 // Tworzenie nieba
 var skyGeometry = new THREE.SphereGeometry(500, 60, 40);
 var skyMaterial = new THREE.MeshBasicMaterial({
   map: new THREE.TextureLoader().load('./textures/sky.jpg'),
   side: THREE.BackSide
 });
 var sky = new THREE.Mesh(skyGeometry, skyMaterial);
 scene.add(sky);

// Tworzenie podłogi
const width = 120;
const length = 120;
const height = 0.01;
const textureRepeatX = 50; // Liczba powtórzeń tekstury wzdłuż osi X
const textureRepeatY = 50; // Liczba powtórzeń tekstury wzdłuż osi Y

const geometryFloor = new THREE.BoxGeometry(width, height, length);
geometryFloor.faceVertexUvs[0][0][0].set(0, 0);
geometryFloor.faceVertexUvs[0][0][2].set(textureRepeatX, 0);
geometryFloor.faceVertexUvs[0][0][1].set(0, textureRepeatY);
geometryFloor.faceVertexUvs[0][1][0].set(0, textureRepeatY);
geometryFloor.faceVertexUvs[0][1][2].set(textureRepeatX, 0);
geometryFloor.faceVertexUvs[0][1][1].set(textureRepeatX, textureRepeatY);

const textureFloor = new THREE.TextureLoader().load('./textures/road.jpg');
textureFloor.wrapS = THREE.RepeatWrapping;
textureFloor.wrapT = THREE.RepeatWrapping;
textureFloor.repeat.set(textureRepeatX, textureRepeatY);

const materialFloor = new THREE.MeshBasicMaterial({ map: textureFloor });
const floor = new THREE.Mesh(geometryFloor, materialFloor);
floor.position.y = -height / 2;
floor.castShadow = true;
floor.receiveShadow = true;
scene.add(floor);

// Tworzenie budynków
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
   requestAnimationFrame(animate);
   updateCameraPosition()
   renderer.render(scene, camera);
   
 }

 animate();