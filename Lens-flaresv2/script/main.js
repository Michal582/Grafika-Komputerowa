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

 // Tworzenie sześcianu
 var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
 var cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
 var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
 scene.add(cube);

 // Animacja
 function animate() {
   requestAnimationFrame(animate);
   updateCameraPosition()
   cube.rotation.x += 0.01;
   cube.rotation.y += 0.01;
   renderer.render(scene, camera);
   
 }

 animate();