import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

import { walkTo, stopWalk } from "./characterMovements.js";
import { detectObjects } from "./detectObjects.js";
import { initRoom1 } from "./room1.js";
import { initCorridor } from './corridor.js';

// Canvas
const canvas = document.querySelector('#c');

// Clock
const clock = new THREE.Clock();

// Scene
let scene = new THREE.Scene();

// Camera
const fov = 55; // field of view
const aspect = window.innerWidth/window.innerHeight; 
const near = 45;
const far = 30000;
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 0);

// Renderer
let renderer = new THREE.WebGLRenderer({antialias:true, canvas});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// Mouse position
const mouse = new THREE.Vector2();

// Raycaster (used for mouse picking)
const raycaster = new THREE.Raycaster();

// Events 
window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'click', onClick, false );

// Models initialization
let [corridorObjects, corridorMaterials, corridorMixers, corridorActions, corridorLights] = initCorridor(scene);
let room1Objects = initRoom1(scene);

// List of objects
let objects = {}
objects["corridorObjects"] = corridorObjects
objects["room1Objects"] = room1Objects

// Global variables
let positionState = 0;
let arrowClicked = false;

// Control the camera manually
let controls = new OrbitControls(camera, renderer.domElement );
controls.addEventListener('change', renderer);
controls.minDistance = 500;
controls.maxDistance = 1500;

animate();

// When the window is resized
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

    if (Object.keys(corridorObjects).length > 0){
        let posZ;
        
        // Paladin
        posZ = 0.375 * window.innerWidth - 1150;
        posZ = Math.min(-600, posZ);
        posZ = Math.max(-1000, posZ);
        corridorObjects["paladin"].position.set(corridorObjects["paladin"].position.x, corridorObjects["paladin"].position.y, posZ);
        
        // Door
        for (let i = 0; i < corridorObjects["doors"].length; i++) {
            if (i < 2){
                posZ = 0.67 * window.innerWidth - 2333;
            }else{
                posZ = 0.67 * window.innerWidth - 4333;
            }
            corridorObjects["doors"][i].position.set(corridorObjects["doors"][i].position.x, corridorObjects["doors"][i].position.y, posZ);
        }

        // Door texts
        for (let i = 0; i < corridorObjects["doorTexts"].length; i++) {
            if (i < 2){
                posZ = 0.67 * window.innerWidth - 1933;
            }else{
                posZ = 0.67 * window.innerWidth - 3933;
            }
            corridorObjects["doorTexts"][i].position.set(corridorObjects["doorTexts"][i].position.x, corridorObjects["doorTexts"][i].position.y, posZ);
        }
    
    }          
}

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
        if (intersects[0].object.name == 'arrow'){  
            arrowClicked = true;
        }

        if (intersects[0].object.name == 'arrowRoom'){  
            camera.position.set(0, 0, 0);
            corridorLights["hemiLight"].position.set(0, 0, 0);
            corridorLights["dirLight"].position.set(0, 0, 300);
        }

        if (intersects[0].object.name.substring(0, 4) == 'door'){
            let num = parseInt(intersects[0].object.name.charAt(4), 10); 
            
            if (corridorObjects["doors"][num] != undefined){
                camera.position.set(1400, 100, 0);
                corridorLights["hemiLight"].position.set(0, -10000, 0);
                corridorLights["dirLight"].position.set(0, -10000, 300);
            }

        }
    }
}

// Loop
function animate() {

    // Hover objects
    if (arrowClicked == false){
        detectObjects(scene, raycaster, mouse, camera, objects, corridorMaterials["door"]);
    }

    // Walk
    if (arrowClicked == true){
        walkTo(positionState, corridorObjects, corridorActions, camera);
    }

    // Stop walking at the second position
    if ((arrowClicked == true) && (corridorObjects["paladin"].position.z < -2500) && (positionState == 0)){
        stopWalk(positionState, corridorObjects, corridorActions);
        arrowClicked = false;
        positionState = 1;
    } 

    // Stop walking at first position
    if ((arrowClicked == true) && (positionState == 1) && (corridorObjects["paladin"].position.z > -600)){
        stopWalk(positionState, corridorObjects, corridorActions);
        arrowClicked = false;
        positionState = 0;
    } 

    // Update mixers
    const delta = clock.getDelta();
    if ( corridorMixers["mixerWalk"] ) corridorMixers["mixerWalk"].update( delta );
    if ( corridorMixers["mixerStand"] ) corridorMixers["mixerStand"].update( delta );
    if ( corridorMixers["mixerRightTurn"] ) corridorMixers["mixerRightTurn"].update( delta );

    // Rotates cubes of room 1
    room1Objects["box1"].rotation.y += 0.01;
    room1Objects["box2"].rotation.y += 0.01
    room1Objects["box3"].rotation.y += 0.01

    requestAnimationFrame(animate);

    renderer.render(scene,camera);
    
}
