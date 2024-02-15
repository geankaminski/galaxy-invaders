import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import GUI from 'lil-gui'

const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader()

const gui = new GUI()

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const parameters = {
    orbitScale: 1.2,
    orbitVelocity: 0.1,
}

const sunTexture = textureLoader.load('/sunmap.jpg')
const mercuryTexture = textureLoader.load('/mercurymap.jpg')
const venusTexture = textureLoader.load('/venusmap.jpg')
const earthTexture = textureLoader.load('/earthmap.jpg')
const moonTexture = textureLoader.load('/moonmap.jpg')
const marsTexture = textureLoader.load('/marsmap.jpg')
const jupiterTexture = textureLoader.load('/jupitermap.jpg')
const saturnTexture = textureLoader.load('/saturnmap.jpg')
const saturnRingTexture = textureLoader.load('/saturnringmap.jpg')
const uranusTexture = textureLoader.load('/uranusmap.jpg')
const neptuneTexture = textureLoader.load('/neptunemap.jpg')

const sphere = new THREE.SphereGeometry(1, 32, 32)

const environmentMap = cubeTextureLoader.load([
    '/environmentMap/px.png',
    '/environmentMap/nx.png',
    '/environmentMap/py.png',
    '/environmentMap/ny.png',
    '/environmentMap/pz.png',
    '/environmentMap/nz.png'
])
scene.background = environmentMap

let alienInstance;
let alienLine;

const fbxLoader = new FBXLoader()
fbxLoader.load(
    'spaceinvader.fbx',
    (object) => {
        alienInstance = object
        alienLine = new THREE.Group()
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const alien = alienInstance.clone()
                alien.scale.set(0.04, 0.04, 0.04)
                alien.position.x = (i - 4) * 5
                alien.position.y = (j + 10) * 5
                alien.name = `alien-${i}-${j}`
                alienLine.add(alien)
            }
        }
        alienLine.name = 'alienLine'
        scene.add(alienLine)
        alienInstance = null
    }
)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

initSun()
initMercury()
initVenus()
initEarth()
initMars()
initJupiter()
initSaturn()
initUranus()
initNeptune()
addRadar()

let spaceshipShots = []

function initSun() {
    const pointLight = new THREE.PointLight(0xffffff, 40, 1000, 0.5)
    scene.add(pointLight)

    const sun = new THREE.Mesh(
        sphere,
        new THREE.MeshBasicMaterial({
            map: sunTexture
        })

    )
    sun.scale.set(1.4, 1.4, 1.4)
    sun.name = 'sun'
    scene.add(sun)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
    scene.add(ambientLight)
}

function initMercury() {
    const mercury = new THREE.Mesh(
        sphere,
        new THREE.MeshStandardMaterial({
            map: mercuryTexture,
            metalness: 0.1,
            roughness: 0.6,
        })
    )

    const angle = Math.random() * Math.PI * 2;
    const radius = (5.8 + Math.random() * 5) / parameters.orbitScale;
    mercury.position.x = Math.cos(angle) * radius;
    mercury.position.z = Math.sin(angle) * radius;
    mercury.position.y = (Math.random() - 0.5) * 10;
    mercury.scale.set(0.1, 0.1, 0.1);

    mercury.name = 'mercury';
    scene.add(mercury);
}

function initVenus() {
    const venus = new THREE.Mesh(
        sphere,
        new THREE.MeshStandardMaterial({
            map: venusTexture,
            metalness: 0.1,
            roughness: 0.6,
        })
    )

    const angle = Math.random() * Math.PI;
    const radius = Math.random() * 10.8 / parameters.orbitScale;
    venus.position.x = Math.cos(angle) * radius;
    venus.position.z = Math.sin(angle) * radius;
    venus.position.y = Math.sin(Math.random() * Math.PI * 2) * 0.2;
    venus.scale.set(0.3, 0.3, 0.3);

    venus.name = 'venus';
    scene.add(venus);
}

function initEarth() {
    const group = new THREE.Group()

    const planet = new THREE.Mesh(
        sphere,
        new THREE.MeshStandardMaterial({
            map: earthTexture,
            metalness: 0.1,
            roughness: 0.6,
        })
    )
    planet.scale.set(0.3, 0.3, 0.3)
    group.add(planet)

    const moon = new THREE.Mesh(
        sphere,
        new THREE.MeshStandardMaterial({
            map: moonTexture,
            metalness: 0.1,
            roughness: 0.6,
        })
    )
    moon.position.set(1, 1, 1)
    moon.scale.set(0.08, 0.08, 0.08)
    group.add(moon)

    group.name = 'earthAndMoon'

    scene.add(group)
    group.position.x = 15 / parameters.orbitScale
    group.position.z = 15 / parameters.orbitScale
}


function initMars() {
    const mars = new THREE.Mesh(
        sphere,
        new THREE.MeshStandardMaterial({
            map: marsTexture,
            metalness: 0.1,
            roughness: 0.6,
        })
    )

    const angle = Math.random() * Math.PI * 6;
    const radius = Math.random() * 23 / parameters.orbitScale;
    mars.position.x = Math.cos(angle) * radius;
    mars.position.z = Math.sin(angle) * radius;
    mars.position.y = Math.sin(Math.random() * Math.PI * 2) * 0.2;
    mars.scale.set(0.2, 0.2, 0.2);

    mars.name = 'mars';
    scene.add(mars);
}

function initJupiter() {
    const jupiter = new THREE.Mesh(
        sphere,
        new THREE.MeshStandardMaterial({
            map: jupiterTexture,
            metalness: 0.1,
            roughness: 0.6,
        })
    )

    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 78 / parameters.orbitScale;
    jupiter.position.x = Math.cos(angle) * radius;
    jupiter.position.z = Math.sin(angle) * radius;
    jupiter.position.y = Math.sin(Math.random() * Math.PI * 2) * 0.2;
    jupiter.scale.set(3.5, 3.5, 3.5);

    jupiter.name = 'jupiter';
    scene.add(jupiter);
}

function initSaturn() {
    const group = new THREE.Group()

    const planet = new THREE.Mesh(
        sphere,
        new THREE.MeshStandardMaterial({
            map: saturnTexture,
            metalness: 0.1,
            roughness: 0.6,
        })
    )
    planet.scale.set(3, 3, 3)
    group.add(planet)

    const ring = new THREE.Mesh(
        new THREE.RingGeometry(3.7, 5.3, 32),
        new THREE.MeshStandardMaterial({
            map: saturnRingTexture,
            side: THREE.DoubleSide,
            metalness: 0.1,
            roughness: 0.6,
        })
    )
    ring.rotation.x = Math.PI * 0.4
    ring.position.y = - 0.2
    group.add(ring)

    group.name = 'saturn'
    scene.add(group)
    group.position.x = 143 / parameters.orbitScalew
    group.position.z = 143 / parameters.orbitScale
}

function initUranus() {
    const uranus = new THREE.Mesh(
        sphere,
        new THREE.MeshStandardMaterial({
            map: uranusTexture,
            metalness: 0.1,
            roughness: 0.6,
        })
    )

    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 287 / parameters.orbitScale;
    uranus.position.x = Math.cos(angle) * radius;
    uranus.position.z = Math.sin(angle) * radius;
    uranus.position.y = Math.sin(Math.random() * Math.PI * 2) * 0.2;
    uranus.scale.set(1.4, 1.4, 1.4);

    uranus.name = 'uranus';
    scene.add(uranus);
}

function initNeptune() {
    const neptune = new THREE.Mesh(
        sphere,
        new THREE.MeshStandardMaterial({
            map: neptuneTexture,
            metalness: 0.1,
            roughness: 0.6,
        })
    )
    const angle = Math.random() * Math.PI * 12;
    const radius = Math.random() * 450 / parameters.orbitScale;
    neptune.position.x = Math.cos(angle) * radius;
    neptune.position.z = Math.sin(angle) * radius;
    neptune.position.y = Math.sin(Math.random() * Math.PI * 2) * 0.2;
    neptune.scale.set(3.5, 3.5, 3.5);

    neptune.name = 'neptune';
    scene.add(neptune);
}

function addRadar() {
    const radar = document.getElementById('radar')
    const radarCanvas = radar.getContext('2d')

    radarCanvas.fillStyle = 'transparent'

    const radarCenterX = radar.width / 2
    const radarCenterY = radar.height / 2

    radarCanvas.clearRect(0, 0, radar.width, radar.height)

    const sun = scene.getObjectByName('sun')
    if (sun) {
        radarCanvas.fillStyle = 'red'
        radarCanvas.fillRect(radarCenterX - 8, radarCenterY - 6, 16, 12)
    }

    const spaceship = scene.getObjectByName('spaceship')
    if (spaceship) {
        const distance = Math.sqrt(
            spaceship.position.x ** 2 + spaceship.position.z ** 2
        )

        const angle = Math.atan2(spaceship.position.z, spaceship.position.x)

        const x = radarCenterX + Math.cos(angle) * distance / 3
        const y = radarCenterY + Math.sin(angle) * distance / 3

        if (x > 0 && x < radar.width && y > 0 && y < radar.height) {
            radarCanvas.fillStyle = 'white'
            radarCanvas.fillRect(x - 4, y - 3, 8, 8)
        }
    }

    setTimeout(() => {
        addRadar()
    }, 1500)
}

function removeAlien(alien) {
    console.log("Removendo alien: ", alien.name);

    alienLine.remove(alien);
    console.log("Número de aliens restantes na linha: ", alienLine.children.length);

    if (alienLine.children.length === 0) {
        console.log("Não há mais aliens na linha. Removendo linha.")
        scene.remove(alienLine);
    }
}

function handleLaser() {
    if (!spaceship) return;
}

function createExplosion(position) {

}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 500)
scene.add(camera)

let spaceship;
const gltfLoader = new GLTFLoader()
gltfLoader.load(
    'spaceship.gltf',
    (gltf) => {
        spaceship = gltf.scene
        spaceship.scale.set(0.1, 0.1, 0.1)
        spaceship.name = 'spaceship'
        spaceship.position.y = 40
        scene.add(spaceship)

        const spaceshipLight = new THREE.PointLight(0xffffff, 1, 10, 1);
        spaceshipLight.position.set(1, 4, 2);
        spaceship.add(spaceshipLight);
    }
)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

gui.add(parameters, 'orbitScale').min(1).max(5).step(0.1).name('Orbit Scale')
gui.add(parameters, 'orbitVelocity').min(0.1).max(10).step(0.1).name('Orbit Velocity')

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    const mercury = scene.getObjectByName('mercury')
    mercury.position.x = Math.cos(elapsedTime * parameters.orbitVelocity) * 5.8 / parameters.orbitScale
    mercury.position.z = Math.sin(elapsedTime * parameters.orbitVelocity) * 5.8 / parameters.orbitScale
    mercury.position.y = Math.sin(elapsedTime * 0.6)

    const venus = scene.getObjectByName('venus')
    venus.position.x = Math.cos(elapsedTime * 0.9 * parameters.orbitVelocity) * 10.8 / parameters.orbitScale
    venus.position.z = Math.sin(elapsedTime * 0.9 * parameters.orbitVelocity) * 10.8 / parameters.orbitScale
    venus.position.y = Math.sin(elapsedTime * 0.6)

    const earthAndMoon = scene.getObjectByName('earthAndMoon')
    earthAndMoon.position.x = Math.cos(elapsedTime * 0.7 * parameters.orbitVelocity) * 15 / parameters.orbitScale
    earthAndMoon.position.z = Math.sin(elapsedTime * 0.7 * parameters.orbitVelocity) * 15 / parameters.orbitScale
    earthAndMoon.position.y = Math.sin(elapsedTime * 0.5)

    earthAndMoon.children[1].position.x = Math.cos(elapsedTime * 0.5 * parameters.orbitVelocity) * 2 / parameters.orbitScale
    earthAndMoon.children[1].position.z = Math.sin(elapsedTime * 0.5 * parameters.orbitVelocity) * 2 / parameters.orbitScale

    const mars = scene.getObjectByName('mars')
    mars.position.x = Math.cos(elapsedTime * 0.5 * parameters.orbitVelocity) * 23 / parameters.orbitScale
    mars.position.z = Math.sin(elapsedTime * 0.5 * parameters.orbitVelocity) * 23 / parameters.orbitScale
    mars.position.y = Math.sin(elapsedTime * 0.5)

    const jupiter = scene.getObjectByName('jupiter')
    jupiter.position.x = Math.cos(elapsedTime * 0.3 * parameters.orbitVelocity) * 78 / parameters.orbitScale
    jupiter.position.z = Math.sin(elapsedTime * 0.3 * parameters.orbitVelocity) * 78 / parameters.orbitScale
    jupiter.position.y = Math.sin(elapsedTime * 0.3)

    const saturn = scene.getObjectByName('saturn')
    saturn.position.x = Math.cos(elapsedTime * 0.2 * parameters.orbitVelocity) * 143 / parameters.orbitScale
    saturn.position.z = Math.sin(elapsedTime * 0.2 * parameters.orbitVelocity) * 143 / parameters.orbitScale
    saturn.position.y = Math.sin(elapsedTime * 0.2)

    const uranus = scene.getObjectByName('uranus')
    uranus.position.x = Math.cos(elapsedTime * 0.1 * parameters.orbitVelocity) * 287 / parameters.orbitScale
    uranus.position.z = Math.sin(elapsedTime * 0.1 * parameters.orbitVelocity) * 287 / parameters.orbitScale
    uranus.position.y = Math.sin(elapsedTime * 0.1)

    const neptune = scene.getObjectByName('neptune')
    neptune.position.x = Math.cos(elapsedTime * 0.05 * parameters.orbitVelocity) * 450 / parameters.orbitScale
    neptune.position.z = Math.sin(elapsedTime * 0.05 * parameters.orbitVelocity) * 450 / parameters.orbitScale
    neptune.position.y = Math.sin(elapsedTime * 0.05)

    const alienLine = scene.getObjectByName('alienLine')
    if (alienLine) {
        alienLine.position.y -= 0.01
    }

    const spaceship = scene.getObjectByName('spaceship')
    if (spaceship) {
        const cameraPosition = new THREE.Vector3()
        cameraPosition.setFromMatrixPosition(camera.matrixWorld)

        const spaceshipPosition = new THREE.Vector3()
        spaceshipPosition.setFromMatrixPosition(spaceship.matrixWorld)

        const distanceBehind = 1
        const offset = new THREE.Vector3(0, 1, -distanceBehind).applyQuaternion(spaceship.quaternion)
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2)

        const desiredPosition = spaceshipPosition.clone().add(offset)

        const smoothFactor = 0.1
        camera.position.lerp(desiredPosition, smoothFactor)

        camera.quaternion.y = Math.PI

        camera.lookAt(spaceshipPosition)
    }

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

const movement = {
    upward: false,
    downward: false,
    left: false,
    right: false
};

function removeLaser() {
    spaceshipShots.forEach((laser) => {
        scene.remove(laser);
    });
    spaceshipShots = [];
}

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            movement.upward = true;
            spaceship.rotation.z = -Math.PI / 6
            break;
        case 'KeyA':
            movement.left = true;
            spaceship.rotation.x = Math.PI / 12
            break;
        case 'KeyD':
            movement.right = true;
            spaceship.rotation.x = -Math.PI / 12
            break;
        case 'KeyS':
            movement.downward = true;
            spaceship.rotation.z = Math.PI / 6
            break;
        case 'Space':
            handleLaser()
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            movement.upward = false;
            spaceship.rotation.z = 0;
            break;
        case 'KeyA':
            movement.left = false;
            spaceship.rotation.x = 0;
            break;
        case 'KeyD':
            movement.right = false;
            spaceship.rotation.x = 0;
            break;
        case 'KeyS':
            movement.downward = false;
            spaceship.rotation.z = 0;
            break;
        case 'Space':
            removeLaser()
            break;
    }
});

let rotationAngle = Math.PI

const updateMovement = () => {
    const speed = 0.2;

    if (spaceship) {
        if (movement.left) {
            rotationAngle += 0.03;
        }
        if (movement.right) {
            rotationAngle -= 0.03;
        }

        spaceship.rotation.y = rotationAngle;

        spaceship.position.x += Math.sin(rotationAngle - Math.PI / 2) * speed;
        spaceship.position.z += Math.cos(rotationAngle - Math.PI / 2) * speed;

        if (movement.upward) {
            spaceship.position.y += 0.2;
        }
        if (movement.downward) {
            spaceship.position.y -= 0.2;
        }
    }

    requestAnimationFrame(updateMovement);
};

updateMovement();

tick()