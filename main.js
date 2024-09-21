// Import Library

import * as THREE from "./threejs/build/three.module.js";
import { OrbitControls } from "./threejs/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "./threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "./threejs/examples/jsm/geometries/TextGeometry.js";
import { GLTFLoader } from "./threejs/examples/jsm/loaders/GLTFLoader.js";
import { CSS2DRenderer, CSS2DObject } from './threejs/examples/jsm/renderers/CSS2DRenderer.js';


// Global Variable (var)

var scene, camera1, camera2, selectedCamera, renderer;
var box;
var controls;
var rayCaster;
var statue = [];


// Creating Points Function


const createPoints = () => {

    const points = [
        new THREE.Vector3(-2, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(2, 0, 0),
        new THREE.Vector3(2, -1, 0),
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(points);

    const material = new THREE.PointsMaterial({
        color: 0x000000,
    });

    return new THREE.Points(geometry, material);

};


// Creating lines Function


const createLines = () => {

    const points = [
        new THREE.Vector3(-2, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(2, 0, 0),
        new THREE.Vector3(2, -1, 0),
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
        color: 0x000000,
    });

    return new THREE.LineLoop(geometry, material);

};


// Creating a plane function


const createPlane = () => {

    const geometry = new THREE.PlaneGeometry(40, 40);
    const material = new THREE.MeshLambertMaterial({
        color: 0xfffffff,
        side: THREE.DoubleSide,
    });

    return new THREE.Mesh(geometry, material);

};


// Texture Plane


const createPlaneTexture = (texturePath) => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);

    const material = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });

    const geometry = new THREE.PlaneGeometry(40, 40);

    return new THREE.Mesh(geometry, material);
};


// Creating a box function


// const createBox = (width, height, depth) => {
//     const geometry = new THREE.BoxGeometry(width, height, depth);
//     const material = new THREE.MeshPhongMaterial({
//         color: 0x000000,
//         wireframe: false,
//         emissive: 0x000000,
//     });

//     return new THREE.Mesh(geometry, material);
// };


const createBox = (width, height, depth, texturePath) => {
    
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(5, 5);

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: texture,
        metalness: 0.7,
        roughness: 0.4,
    });

    return new THREE.Mesh(geometry, material);
};


// Creating a cone function


const createCone = (radius, height, radialSegments) => {

    // Cari Texture at Polyhaven
  
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("./assets/Others/metalPlate1.png");
    const textureNormal = textureLoader.load("./assets/Others/metalPlate2.png");

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);

    const geometry = new THREE.ConeGeometry(radius, height, radialSegments);

    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        // roughness: 0.3,
        // metalness: 1,
        map: texture,
        normalMap: textureNormal,
    });

    return new THREE.Mesh(geometry, material);

};


// Creating a sphere function


const createSphere = (radius) => {
    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshLambertMaterial({
        color: 0xffff00,
        wireframe: true,
    });

    return new THREE.Mesh(geometry, material);
};


// Creating a cylinder function


const createCylinder = (radiusTop, radiusBottom, height) => {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height);
    const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });

    return new THREE.Mesh(geometry, material);
};


// Ambient Light Function


const createAmbientLight = () => {
    return new THREE.AmbientLight(0xffffff, 0.7);
};


// Directional Light Function


const createDirectionalLight = () => {

    const light = new THREE.DirectionalLight(0xffffff, 1);
    const lightHelper = new THREE.DirectionalLightHelper(light, 1, 0x000000);
    light.castShadow = true;
    // scene.add(lightHelper);
    light.shadow.mapSize.height = 1024;
    light.shadow.mapSize.width = 1024;
    light.position.set(10, 1, 0);
    light.rotation.set(0, 0, 0);

    return light;

};


// Spotlight function


const createSpotlight = () => {

    const light = new THREE.SpotLight(0xffffff, 1, 1000, 0.7, 0, 2);
    const lightHelper = new THREE.SpotLightHelper(light, 0x000000);
    light.castShadow = true;
    // scene.add(lightHelper);
    light.position.set(0, 5, 0);
    // light.position.set(0, 120, 0);

    return light;
  
};


const createSpotlightForStatue = () => {

    const light = new THREE.SpotLight(0xffffff, 1, 1000, 1, 0, 2);
    const lightHelper = new THREE.SpotLightHelper(light, 0x000000);
    light.castShadow = true;
    // scene.add(lightHelper);
    light.position.set(65, 65, 65);

    return light;
  
};


// Pointlight function


const createPointlight = () => {

    const light = new THREE.PointLight(0xffffff, 1, 100);
    const lightHelper = new THREE.PointLightHelper(light, 0.5, 0x000000);
    light.castShadow = true;
    // scene.add(lightHelper);
    light.position.set(-7, -3, 0);

    return light;

};

// Dynamic Box

const createDynamicBox = (width, height, depth, texturePath) => {

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: texture,
        metalness: 0.7,
        roughness: 0.4,
    });

    return new THREE.Mesh(geometry, material);

};


const createSkyBox2 = () => {

    // Skybox 2

    const skyboxGeometry = new THREE.BoxGeometry(40, 40, 40);
    const textureLoader = new THREE.TextureLoader();

    const rightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox2/right.png"
        ),
        side: THREE.BackSide,
    });

    const leftMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox2/left.png"
        ),
        side: THREE.BackSide,
    });

    const topMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox2/top.png"
        ),
        side: THREE.BackSide,
    });

    const bottomMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox2/bottom.png"
        ),
        side: THREE.BackSide,
    });

    const frontMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox2/front.png"
        ),
        side: THREE.BackSide,
    });

    const backMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox2/back.png"
        ),
        side: THREE.BackSide,
    });

    scene.add(
        new THREE.Mesh(skyboxGeometry, [
            rightMaterial,
            leftMaterial,
            topMaterial,
            bottomMaterial,
            frontMaterial,
            backMaterial,
        ])
    );

}


// Initialization Function


const init = () => {

    const cubeTextureLoader = new THREE.CubeTextureLoader();

    scene = new THREE.Scene();

    // Skybox (you can modify the size right here)

    const skyboxGeometry = new THREE.BoxGeometry(40, 40, 40);
    const textureLoader = new THREE.TextureLoader();

    // Skybox

    const rightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox3/right.jpg"
        ),
        side: THREE.BackSide,
    });

    const leftMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox3/left.jpg"
        ),
        side: THREE.BackSide,
    });

    const topMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox3/top.jpg"
        ),
        side: THREE.BackSide,
    });

    const bottomMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox3/bottom.jpg"
        ),
        side: THREE.BackSide,
    });

    const frontMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox3/front.jpg"
        ),
        side: THREE.BackSide,
    });

    const backMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textureLoader.load(
            "./assets/Minecraft_Skybox3/back.jpg"
        ),
        side: THREE.BackSide,
    });

    // Adding skybox ke scene

    scene.add(
        new THREE.Mesh(skyboxGeometry, [
            rightMaterial,
            leftMaterial,
            topMaterial,
            bottomMaterial,
            frontMaterial,
            backMaterial,
        ])
    );

    // Camera Tools

    camera1 = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera2 = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // Camera Position

    camera1.position.set(4, 0, 10);
    camera1.lookAt(0, 0, 0);
    camera1.layers.enable(1);

    camera2.position.set(60, 55, 65);
    // camera2.position.set(50, 65, 55);
    camera2.lookAt(0, 0, 0);

    // Default Camera
    
    selectedCamera = camera1;

    // Rendering Awal

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Shadowing

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(renderer.domElement);

    // Controls

    controls = new OrbitControls(camera1, renderer.domElement);
    controls.autoRotate = false;

    // Object and Geometry

    // Plane

    const planeTexture = [
        './assets/Others/steveFace.jpg',
        './assets/Others/alexFace.jpg',
    ];

    const plane = createPlaneTexture(planeTexture[0]);
    plane.rotation.set(Math.PI / 4, 0, 0);
    plane.position.set(0, 40, -10);
    plane.receiveShadow = true;
    plane.castShadow = true;

    const plane2 = createPlaneTexture(planeTexture[1]);
    plane2.rotation.set(Math.PI * 12, 0, 0);
    plane2.position.set(0, 40, 45);
    plane2.receiveShadow = true;
    plane2.castShadow = true;

    // Box (udah global var)
    // Box biasa

    const path = "./assets/Blocks/special/Tnt.PNG"
    box = createBox(1, 1, 1, path);
    box.position.set(0, 1, 0);
    box.receiveShadow = true;
    box.castShadow = true;

    // I named it Dynamic Box

    const texturePaths = [
        "./assets/Blocks/special/Tnt.PNG",
        "./assets/Blocks/special/Grass.PNG",
        "./assets/Blocks/special/Stone.PNG",
        "./assets/Blocks/special/Wood.PNG",
        "./assets/Blocks/special/Redstone.PNG",
        "./assets/Blocks/special/Leaves.PNG",
        "./assets/Blocks/special/Gold.PNG",
        "./assets/Blocks/special/Water.PNG",
    ];

    texturePaths.forEach((path, index) => {
        const box = createDynamicBox(1, 1, 1, path);
        
        const xPos = Math.random() * 20 - 5;
        const yPos = Math.random() * 20 - 5;
        const zPos = Math.random() * 10 - 5;
        box.position.set(xPos, yPos, zPos);
        
        box.receiveShadow = true;
        box.castShadow = true;
        
        scene.add(box);
    });

    // Box Statue

    const texturePaths2 = [
        "./assets/Others/steveFace.jpg",
        "./assets/Others/alexFace.jpg",
        "./assets/Others/pigFace.png",
        "./assets/Others/chickenFace.png",
        "./assets/Others/endermanFace.png",
        "./assets/Others/creeperFace.png",
    ];

    let positionX = 50;

    texturePaths2.forEach((path, index = 80) => {
        const box = createDynamicBox(1, 1, 1, path);
        
        // Camera2 = 60, 55, 65
        box.position.set(positionX += 2, 55, 45);
        
        box.receiveShadow = true;
        box.castShadow = true;

        scene.add(box);
        statue.push(box);
    });

    // Cone

    const cone = createCone(1, 3);
    cone.position.set(-5, -7, 0);
    cone.receiveShadow = true;
    cone.castShadow = true;

    // Sphere

    const sphere = createSphere(1);
    sphere.position.set(-9, -7, 0);
    sphere.receiveShadow = true;
    sphere.castShadow = true;

    // Cylinder

    const cylinder = createCylinder(1, 1, 3);
    cylinder.position.set(5, -9, 0);
    cylinder.receiveShadow = true;
    cylinder.castShadow = true;

    // KHUSUS supaya hanya ini yang bisa di ray
    // Only this item can get Raycast

    sphere.layers.set(1);
    cylinder.layers.set(1);

    // Font

    const fontLoader = new FontLoader();
        fontLoader.load(
        "./threejs/examples/fonts/helvetiker_bold.typeface.json",
        (font) => {
            const geometry = new TextGeometry("Simple Minecraft :D", {
                font: font,
                size: 0.8,
                height: 0.1,
            });
            const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
            scene.add(new THREE.Mesh(geometry, material));
        }
    );

    // Title: Theme (Change camera to see)

    const fontLoader2 = new FontLoader();
        fontLoader2.load(
        "./threejs/examples/fonts/helvetiker_regular.typeface.json",
        (font) => {
            const geometry = new TextGeometry("Steve say sorry to Alex for ruining the World :(", {
                font: font,
                size: 1.25,
                height: 1,
                // bevelEnabled: true,
                // bevelThickness: 0.1,
                // bevelSize: 0.05,
                // bevelSegments: 3
            });
            const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const textMesh = new THREE.Mesh(geometry, material);
            textMesh.position.set(40, 40, 5);
            // camera2.position.set(60, 55, 65);

            scene.add(textMesh);
        }
    );

    // I try to make a fixed Text...

    // Create CSS2DRenderer
    // const labelRenderer = new CSS2DRenderer();
    // labelRenderer.setSize(window.innerWidth, window.innerHeight);
    // labelRenderer.style.position = 'absolute';
    // labelRenderer.style.top = '0px';
    // labelRenderer.style.left = '0px';
    // document.body.appendChild(labelRenderer.domElement);

    // // Add text label
    // const textDiv = document.createElement('div');
    // textDiv.className = 'label';
    // textDiv.textContent = 'Minecraft';
    // textDiv.style.color = 'black';
    // textDiv.style.fontSize = '20px';

    // const textLabel = new CSS2DObject(textDiv);
    // textLabel.position.set(0, 0, 0);
    // scene.add(textLabel);


    // GLTF Model (looping)
    // Bisa diperbanyak model (stone)-nya, tapi karena ngelag, hanya 1 saja
    // You can change the number of model, however I just use 1, because it's quite lagging

    const numberOfModels = 1;

    const gltfLoader = new GLTFLoader();

    for (let i = 0; i < numberOfModels; i++) {
        gltfLoader.load(
            "./assets/desert__rocks__stones__pack/scene.gltf",
            (gltf) => {
                const model = gltf.scene;
                model.scale.set(0.05, 0.05, 0.05);

                // Set random position
                
                const xPos = Math.random() * 10 - 10;
                const yPos = -4;
                const zPos = Math.random() * 10 - 10;

                model.position.set(xPos, yPos, zPos);

                model.rotation.y = Math.random() * Math.PI * 2;

                model.layers.set(1);

                scene.add(model);
            }
        );
    }

    // Adding Object Here

    const objects = [
        // createPoints(),
        // createLines(),
        plane,
        plane2,
        box,
        cone,
        sphere,
        cylinder,

        // I used 4 types of Light

        createAmbientLight(),
        createDirectionalLight(),
        createSpotlight(),
        createPointlight(),
        createSpotlightForStatue(),
    ];

    // Put object  to scene

    objects.forEach((object) => {
        scene.add(object);
    });

    // Init Raycaster

    rayCaster = new THREE.Raycaster();

};


// Rendering Function


const render = () => {
    requestAnimationFrame(render);
    renderer.setClearColor("#cfcfcf");

    animate();
    animate2();
    controls.update();
    renderer.render(scene, selectedCamera);
    // labelRenderer.render(scene, selectedCamera);
};


// Animate Function (1 TNT Box)


const animate = () => {
    box.rotation.x += 0.05;
    box.rotation.y += 0.05;
};


const animate2 = () => {
    let step = 
    statue.forEach((element, index) => {
        index % 2 === 0 ? element.rotation.x += 0.02 : element.rotation.y += 0.02;
    });
};

// Initialization and Rendering


window.onload = () => {
    init();
    // createSkyBox2();
    render();
};


// Responsiveness Window


window.onresize = () => {
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();

    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
};


// Mouse event listener


window.addEventListener("mousemove", (e) => {

    const pointer = new THREE.Vector2();

    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // Raycast Application

    rayCaster.setFromCamera(pointer, selectedCamera);

    // Kalau mau yang di ray hanya layer 1 (biar ga terlalu aneh dan sering terjadi)
    // Only the items that in the layer 1 can get Raycaster

    rayCaster.layers.set(1);

    const objects = rayCaster.intersectObjects(scene.children);

    objects.forEach((obj) => {
        obj.object.material.color.set(0xfffffff);
    });

});


// Keypress to switching camera


window.addEventListener("keypress", (e) => {

    if (e.key.charCodeAt(0) === 32) {
        if (selectedCamera === camera1) {
            selectedCamera = camera2;
            controls.enabled = false;
        }
        else if (selectedCamera === camera2) {
            selectedCamera = camera1;
            controls.enabled = true;
        }
    }

});


// Spawn Animation

let spawnInterval;
let isSpawning = true;

const createSpawnBox = (width, height, depth, texturePath) => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.7,
        roughness: 0.4,
    });

    const box = new THREE.Mesh(geometry, material);
    box.position.set(
        Math.random() * 30 - 5,
        Math.random() * 20 - 5,
        Math.random() * 40 - 20
    );

    box.castShadow = true;
    box.receiveShadow = true;

    return box;
};

const texturePaths2 = [
    "./assets/Blocks/special/Tnt.PNG",
    "./assets/Blocks/special/Grass.PNG",
    "./assets/Blocks/special/Stone.PNG",
    "./assets/Blocks/special/Wood.PNG",
    "./assets/Blocks/special/Redstone.PNG",
    "./assets/Blocks/special/Leaves.PNG",
    "./assets/Blocks/special/Gold.PNG",
    "./assets/Blocks/special/Water.PNG",
];

const boxes = [];

const spawnBox = () => {
    const texturePath = texturePaths2[Math.floor(Math.random() * texturePaths2.length)];
    const box = createSpawnBox(1, 1, 1, texturePath);
    scene.add(box);
    boxes.push(box);
};

spawnInterval = setInterval(spawnBox, 1000);

const toggleSpawning = () => {
    if (isSpawning) {
        clearInterval(spawnInterval);
        alert("Box spawning stopped.");
    } else {
        spawnInterval = setInterval(spawnBox, 1000);
        alert("Box spawning started.");
    }
    isSpawning = !isSpawning;
};

// Start and Stop Animation

const handleKeyPress = (event) => {
    if (event.key === "s" || event.key === "S") {
        toggleSpawning();
    }
};

window.addEventListener("keydown", handleKeyPress);