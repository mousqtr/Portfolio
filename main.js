import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
// import {OrbitControls} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
// import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

import { walkTo, stopWalk } from "./characterMovements.js";
import { detectObjects } from "./detectObjects.js";

let scene, camera, renderer;

const clock = new THREE.Clock();
let objects = {};
let actions = {};
let mixers = {};

let arrowClicked = false;


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let positionState = 0;

window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'click', onClick, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

    if (Object.keys(objects).length > 0){
        let posZ;
        
        // Paladin
        posZ = 0.375 * window.innerWidth - 1150;
        posZ = Math.min(-600, posZ);
        posZ = Math.max(-1000, posZ);
        objects["paladin"].position.set(objects["paladin"].position.x, objects["paladin"].position.y, posZ);
        
        // Door
        for (let i = 0; i < objects["doors"].length; i++) {
            if (i < 2){
                posZ = 0.67 * window.innerWidth - 2333;
            }else{
                posZ = 0.67 * window.innerWidth - 4333;
            }
            objects["doors"][i].position.set(objects["doors"][i].position.x, objects["doors"][i].position.y, posZ);
        }

        // posZ = 0.67 * window.innerWidth - 1833;
        // objects["textsDoor"].position.set(objects["textsDoor"].position.x, objects["textsDoor"].position.y, posZ)

        // Door
        for (let i = 0; i < objects["doorTexts"].length; i++) {
            if (i < 2){
                posZ = 0.67 * window.innerWidth - 1933;
            }else{
                posZ = 0.67 * window.innerWidth - 3933;
            }
            objects["doorTexts"][i].position.set(objects["doorTexts"][i].position.x, objects["doorTexts"][i].position.y, posZ);
        }
    
    }          
}

const canvas = document.querySelector('#c');

scene = new THREE.Scene();
const fov = 55; // field of view
const aspect = window.innerWidth/window.innerHeight;  // the canvas default
const near = 45;
const far = 30000;
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 0);

renderer = new THREE.WebGLRenderer({antialias:true, canvas});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// let controls = new OrbitControls(camera, renderer.domElement );
// controls.addEventListener('change', renderer);
// controls.minDistance = 500;
// controls.maxDistance = 1500;

// Load the corridor
let corridorMaterialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'img/wall2.jpg');
let texture_bk = new THREE.TextureLoader().load( 'img/wall2.jpg');
let texture_up = new THREE.TextureLoader().load( 'img/wall3.jpg');
let texture_dn = new THREE.TextureLoader().load( 'img/parquet.jpg');
let texture_rt = new THREE.TextureLoader().load( 'img/wall2.jpg');
let texture_lf = new THREE.TextureLoader().load( 'img/wall2.jpg');

texture_dn.wrapS = texture_dn.wrapT = THREE.RepeatWrapping;
texture_up.wrapS = texture_up.wrapT = THREE.RepeatWrapping;
texture_ft.wrapS = texture_ft.wrapT = THREE.RepeatWrapping;
texture_bk.wrapS = texture_bk.wrapT = THREE.RepeatWrapping;

texture_dn.repeat.y = 5;
texture_up.repeat.y = 5;
texture_ft.repeat.x = 5;
texture_bk.repeat.x = 5;

corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

for (let i = 0; i < 6; i++) {
    corridorMaterialArray[i].side = THREE.BackSide;
}
    
let corridorGeo = new THREE.BoxGeometry( 1000, 1000, 10000);
let corridor = new THREE.Mesh( corridorGeo, corridorMaterialArray );
corridor.position.set(0, 0, -4500)
scene.add( corridor );  

// Load the top arrow 
const arrowLoader = new FBXLoader();
arrowLoader.load('models/arrow.fbx', (arrow) => {
    arrow.traverse(child => {
    child.castShadow = true;
    child.receiveShadow = true;
    child.material = new THREE.MeshPhongMaterial( { 
        color: 0xffff00
    } );
    });       
    arrow.scale.setScalar(200);
    arrow.position.set(0, 200, -600);
    arrow.rotation.set(-Math.PI/2, Math.PI, Math.PI/2);
    arrow.name = "arrow";
    objects["arrow"] = arrow;
    scene.add(arrow);
});

// Get the mouse position
function onMouseMove( event ) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

// When user click somewhere
function onClick(event) {
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children, true );

    for ( let i = 0; i < intersects.length; i ++ ) {
        if ((intersects[0].object.name == 'Box') || (intersects[0].object.name == 'Box1')){
            
            if (Object.keys(objects).length > 1){
            arrowClicked = true;
            }
        }
    }
}

// Hemisphere Light
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set(0, 0, 0);
scene.add( hemiLight );

// Directional Light
const dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set(0, 0, 300);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 180;
dirLight.shadow.camera.bottom = - 100;
dirLight.shadow.camera.left = - 120;
dirLight.shadow.camera.right = 120;
scene.add( dirLight );

// Load the paladin model
const loaderPaladin = new FBXLoader();
loaderPaladin.load('models/paladin/paladin.fbx', (paladin) => {

    // Load the model
    paladin.scale.setScalar(3);
    paladin.position.set(0, -500, -600)
    paladin.rotation.set(0, Math.PI, 0)
    paladin.traverse(child => {
    child.castShadow = true;
    child.receiveShadow = true;
    });
    objects["paladin"] = paladin;

    // Load the walk animation
    const animWalk = new FBXLoader();
    animWalk.load('models/paladin/walk.fbx', (animWalk) => {
        const mixer = new THREE.AnimationMixer(paladin);     
        const action = mixer.clipAction( animWalk.animations[0] );
        mixers["mixerWalk"] = mixer
        actions["walk"] = action;
    });
    
    // Load the stand animation
    const animStand = new FBXLoader();
    animStand.load('models/paladin/stand_brief.fbx', (animStand) => {
        const mixer = new THREE.AnimationMixer(paladin);
        const action = mixer.clipAction(animStand.animations[0]);
        mixers["mixerStand"] = mixer
        actions["stand"] = action;
        action.play();
    });

    // Load the stand animation
    const animRightTurn = new FBXLoader();
    animRightTurn.load('models/paladin/right_turn.fbx', (animRightTurn) => {
        const mixer = new THREE.AnimationMixer(paladin);
        const action = mixer.clipAction(animRightTurn.animations[0]);
        action.loop = THREE.LoopOnce;
        action.clampWhenFinished = true;
        mixers["mixerRightTurn"] = mixer
        mixer.timeScale = 0.4;
                mixer.addEventListener( 'finished', finishRightTurn );
        actions["rightTurn"] = action;
    });

    scene.add(paladin);
});

let rightTurnFinished = false;

function finishRightTurn(){
    rightTurnFinished = true;
    actions["rightTurn"].reset()
}


// Load the door model
let doors = [];
var mat;
let doorPosX, doorPosZ;
for ( let i = 0; i < 4; i ++ ) {
    const loaderDoor = new FBXLoader();
    loaderDoor.load('models/door.fbx', (door) => {
        
        door.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            mat = child.material;
            child.name = "door" + i.toString();
        });
        door.scale.setScalar(0.3);

        if (i % 2 == 0){
            doorPosX = -500;
            door.rotation.set(0, Math.PI/2, 0);
        }else{
            doorPosX = 500;
            door.rotation.set(0, -Math.PI/2, 0);
        }
    
        if (i < 2){
            doorPosZ = 0.67 * window.innerWidth - 2333;
        }else{
            doorPosZ = 0.67 * window.innerWidth - 4333;
        }

        door.position.set(doorPosX, -500, doorPosZ);
        scene.add(door);
        doors.push(door);
    });
}
objects["doors"] = doors;


// Load text
let doorTexts = [];
let doorTextPosX, doorTextPosZ;
let texts = ['Profil', 'Formation', 'Experiences', 'Projets']
for ( let i = 0; i < 4; i ++ ) {
    const loaderText = new THREE.FontLoader();
    loaderText.load( 'fonts/Bebas_Neue_Regular.json', function ( font ) {

        const textGeometry = new THREE.TextGeometry( texts[i], {
            font: font, size: 60, height: 2,
        });
        
        var textMaterial = new THREE.MeshPhongMaterial( { 
            color: 0x00ff00, 
        });
        
        var mesh = new THREE.Mesh( textGeometry, textMaterial );

        if (i % 2 == 0){
            doorTextPosX = -480;
        }else{
            doorTextPosX = 210;
        }

        if (i < 2){
            doorTextPosZ = 0.67 * window.innerWidth - 1933;
        }else{
            doorTextPosZ = 0.67 * window.innerWidth - 3933;
        }

        mesh.position.set(doorTextPosX, 150, doorTextPosZ)
        scene.add( mesh );

        
        doorTexts.push(mesh);
    } );
}

objects["doorTexts"] = doorTexts;




animate();

function animate() {

    // Hover objects
    if (arrowClicked == false){
        detectObjects(scene, raycaster, mouse, camera, objects, mat);
    }

    // Walk
    if (arrowClicked == true){
        walkTo(positionState, objects, actions, camera);
    }

    // Stop walking at the second position
    if ((arrowClicked == true) && (objects["paladin"].position.z < -2500) && (positionState == 0)){
        stopWalk(positionState, objects, actions);
        arrowClicked = false;
        positionState = 1;
    } 

    // Stop walking at first position
    if ((arrowClicked == true) && (positionState == 1) && (objects["paladin"].position.z > -600)){
        stopWalk(positionState, objects, actions);
        arrowClicked = false;
        positionState = 0;
    } 

    // Update mixers
    const delta = clock.getDelta();
    if ( mixers["mixerWalk"] ) mixers["mixerWalk"].update( delta );
    if ( mixers["mixerStand"] ) mixers["mixerStand"].update( delta );
    if ( mixers["mixerRightTurn"] ) mixers["mixerRightTurn"].update( delta );

    requestAnimationFrame(animate);

    renderer.render(scene,camera);
    
}