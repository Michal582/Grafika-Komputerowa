import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js';
import { OrbitControls } from './OrbitControls.js'
import { Lensflare, LensflareElement } from './Lensflare.js';
    // Tworzenie sceny
    const scene = new THREE.Scene();

    // Tworzenie kamery
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 1;
    camera.lookAt(new THREE.Vector3(0,0,0))

    // Tworzenie renderera
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    
    //Tworzenie planet

    function createPlanet(radius, texturePath, x, y, z) {
        let geometry = new THREE.SphereGeometry( radius, 32, 32)
        let texture = new THREE.TextureLoader().load(texturePath)
        let material = new THREE.MeshBasicMaterial({map: texture})
        let planet = new THREE.Mesh(geometry, material)
        planet.position.set(x,y,z)
        scene.add(planet)

    }

    createPlanet(5, './textures/earth.jpg', 0,0,0)
    createPlanet(3, './textures/mars.jpg', 20,0,0)
    createPlanet(5, './textures/jupiter.jpg', 40,0,0)

    // Kamera
    const controls = new OrbitControls( camera, renderer.domElement)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    const keys = {
        forward: false,
        backward: false,
        left: false,
        right: false
    }

    function handleKeyDown(event) {
        const keyCode = event.keyCode

        switch (keyCode) {
            case 87: // W
                keys.forward = true
                break
            case 83: // S
                keys.backward = true
                break
            case 65: // A 
                keys.left = true;
                break;
            case 68: // D 
                keys.right = true;
                break;
        }
    }

    function handleKeyUp(event) {
        const keyCode = event.keyCode

        switch (keyCode) {
            case 87: // W
                keys.forward = false
                break
            case 83: // S
                keys.backward = false
                break
            case 65: // A 
                keys.left = false;
                break;
            case 68: // D 
                keys.right = false;
                break;
        }
    }

    function updateCameraPosition() {
        const movementSpeed = 0.1

        if (keys.forward) {
            camera.position.z -= movementSpeed
        }
        if (keys.backward) {
            camera.position.z += movementSpeed
        }
        if (keys.left) {
            camera.position.x -= movementSpeed
        }
        if (keys.right) {
            camera.position.x += movementSpeed
        }

    }
    controls.update()

    // lights

    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.05 );
    dirLight.position.set( 0, - 1, 0 ).normalize();
    dirLight.color.setHSL( 0.1, 0.7, 0.5 );
    scene.add( dirLight );

    // lensflares
    const textureLoader = new THREE.TextureLoader();

    const textureFlare0 = textureLoader.load( 'textures/lensflare0.png' );
    const textureFlare3 = textureLoader.load( 'textures/lensflare2.png' );

    addLight( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
    addLight( 0.08, 0.8, 0.5, 0, 0, - 1000 );
    addLight( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );

    // TODO: Znaleźć lepsze tekstury/ samemu zrobić, ogarnąć płynniejsze zanikanie oraz nie przenikanie przez ziemię, dodać tło, cienie

    function addLight( h, s, l, x, y, z ) {

        const light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
        light.color.setHSL( h, s, l );
        light.position.set( x, y, z );
        scene.add( light );

        const lensflare = new Lensflare();
        lensflare.addElement( new LensflareElement( textureFlare0, 700, 0, light.color ) );
        lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6 ) );
        lensflare.addElement( new LensflareElement( textureFlare3, 70, 0.7 ) );
        lensflare.addElement( new LensflareElement( textureFlare3, 120, 0.9 ) );
        lensflare.addElement( new LensflareElement( textureFlare3, 70, 1 ) );
        light.add( lensflare );

    }

    // Funkcja animacji
    function animate() {
        requestAnimationFrame(animate);
        updateCameraPosition()
        controls.update()
        renderer.render(scene, camera);
    }

    // Uruchamianie animacji
    animate();