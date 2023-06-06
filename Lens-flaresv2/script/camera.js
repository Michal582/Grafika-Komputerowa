  // Tworzenie kamery
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Ustawienie pozycji kamery
  const cameraHeight = 1; // Wysokość kamery nad podłogą
  camera.position.set(0, cameraHeight, 0);

  // Inicjalizacja ruchu kamery
  const cameraSpeed = 0.1;
  const keyboardState = {};
  const mouseState = { x: 0, y: 0 };
  let headRotationY = 0;
  let isMousePressed = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  function handleKeyDown(event) {
    keyboardState[event.code] = true;
}

function handleKeyUp(event) {
    keyboardState[event.code] = false;
}

function handleMouseMove(event) {
  if (isMousePressed) {
    const movementX = event.clientX - prevMouseX;
    const movementY = event.clientY - prevMouseY;
    const sensitivity = 0.002;

    headRotationY -= movementX * sensitivity;
    const headRotationX = camera.rotation.x - movementY * sensitivity;

    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, headRotationX));
    camera.rotation.y = headRotationY;
  }

  prevMouseX = event.clientX;
  prevMouseY = event.clientY;
}

function handleMouseDown(event) {
  if (event.button === 0) {
    isMousePressed = true;
    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
  }
}

function handleMouseUp(event) {
  if (event.button === 0) {
    isMousePressed = false;
  }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);

function updateCameraPosition(){
  if (keyboardState['KeyW'] || keyboardState['ArrowUp']) {
    camera.position.add(camera.getWorldDirection().multiplyScalar(cameraSpeed));
  }
  if (keyboardState['KeyS'] || keyboardState['ArrowDown']) {
    camera.position.add(camera.getWorldDirection().multiplyScalar(-cameraSpeed));
  }
  if (keyboardState['KeyA'] || keyboardState['ArrowLeft']) {
    camera.position.add(camera.getWorldDirection().cross(new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(-cameraSpeed));
  }
  if (keyboardState['KeyD'] || keyboardState['ArrowRight']) {
    camera.position.add(camera.getWorldDirection().cross(new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(cameraSpeed));
  }
}