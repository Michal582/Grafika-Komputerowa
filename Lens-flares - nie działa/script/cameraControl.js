import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js'

export default class CameraControl {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 5

    // default camera position
    this.cameraHeight = 1 // 
    this.camera.position.set(0, this.cameraHeight, 0)

    this.cameraSpeed = 0.1
    this.keyboardState = {}
    this.mouseState = { x: 0, y: 0 }
    this.headRotationY = 0
    this.isMousePressed = false
    this.prevMouseX = 0
    this.prevMouseY = 0

    document.addEventListener('keydown', (e) => this.handleKeyDown(e))
    document.addEventListener('keyup', (e) => this.handleKeyUp(e))
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e))
    document.addEventListener('mousedown', (e) => this.handleMouseDown(e))
    document.addEventListener('mouseup', (e) => this.handleMouseUp(e))
  }

  handleKeyDown(e) {
    this.keyboardState[e.code] = true
  }

  handleKeyUp(e) {
    this.keyboardState[e.code] = false
  }

  handleMouseMove(e) {
    if (this.isMousePressed) {
      const movementX = e.clientX - this.prevMouseX
      const movementY = e.clientY - this.prevMouseY
      const sensitivity = 0.002

      this.headRotationY -= movementX * sensitivity
      const headRotationX = this.camera.rotation.x - movementY * sensitivity

      const maxVerticalAngle = Math.PI / 4 // Maksymalny kąt obrotu w pionie (w górę i w dół)

      this.camera.rotation.x = Math.max(-maxVerticalAngle, Math.min(maxVerticalAngle, headRotationX))
      this.camera.rotation.y = this.headRotationY
    }

    this.prevMouseX = e.clientX
    this.prevMouseY = e.clientY
  }

  handleMouseDown(e) {
    this.isMousePressed = true
    this.prevMouseX = e.clientX
    this.prevMouseY = e.clientY
  }

  handleMouseUp(e) {
    this.isMousePressed = false
  }

  updateCameraPosition(width, length) {
    console.log("XD")

    // keyboardState is object of keys modifying another camera,
    // so it's better to leave as it is
    if (this.keyboardState['KeyW'] || this.keyboardState['ArrowUp']) {
      this.camera.position.add(this.camera.getWorldDirection().multiplyScalar(this.cameraSpeed))
    }
    if (this.keyboardState['KeyS'] || this.keyboardState['ArrowDown']) {
      this.camera.position.add(this.camera.getWorldDirection().multiplyScalar(-this.cameraSpeed))
    }
    if (this.keyboardState['KeyA'] || this.keyboardState['ArrowLeft']) {
      this.camera.position.add(this.camera.getWorldDirection().cross(new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(-this.cameraSpeed))
    }
    if (this.keyboardState['KeyD'] || this.keyboardState['ArrowRight']) {
      this.camera.position.add(this.camera.getWorldDirection().cross(new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(this.cameraSpeed))
    }

    this.camera.position.y = Math.max(this.cameraHeight, this.camera.position.y)

    // Ograniczenie ruchu kamery na boki do szerokości drogi
    var maxCameraX = width / 2 - 0.5
    this.camera.position.x = Math.max(-maxCameraX, Math.min(maxCameraX, this.camera.position.x))

    var maxCameraZ = length / 2 - 0.5
    this.camera.position.z = Math.max(-maxCameraZ, Math.min(maxCameraZ, this.camera.position.z))
  }
}