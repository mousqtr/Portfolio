import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

import { walkTo, stopWalk } from "./characterMovements.js";
import { detectObjects } from "./detectObjects.js";
import { initRoom0 } from "./room0.js";
import { initRoom1 } from "./room1.js";
import { initRoom2 } from "./room2.js";
import { initRoom3 } from "./room3.js";
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
let [room0Objects, room0Materials] = initRoom0(scene);
let [room1Objects, room1Materials] = initRoom1(scene);
let [room2Objects, room2Materials] = initRoom2(scene);
let [room3Objects, room3Materials] = initRoom3(scene);

// List of objects
let objects = {}
objects["corridorObjects"] = corridorObjects
objects["room0Objects"] = room0Objects
objects["room1Objects"] = room1Objects
objects["room2Objects"] = room2Objects
objects["room3Objects"] = room3Objects

// List of materials
let materials = {}
materials["corridorMaterials"] = corridorMaterials
materials["room0Materials"] = room0Materials
materials["room1Materials"] = room1Materials
materials["room2Materials"] = room2Materials
materials["room3Materials"] = room3Materials

// Global variables
let positionState = 0;
let arrowClicked = false;

// Control the camera manually
//let controls = new OrbitControls(camera, renderer.domElement );
// controls.addEventListener('change', renderer);
// controls.minDistance = 500;
// controls.maxDistance = 4000;

let theta = 0;
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
                posZ = 0.67 * window.innerWidth - 2033;
            }else{
                posZ = 0.67 * window.innerWidth - 4033;
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
        if ((intersects[0].object.name == 'arrow') || (intersects[0].object.name == 'textArrow')){  
            arrowClicked = true;
        }

        goToCorridor(intersects);

        goToRoom(intersects, 'door0', 0);
        goToRoom(intersects, 'door1', 1);
        goToRoom(intersects, 'door2', 2);
        goToRoom(intersects, 'door3', 3);

        openBox(intersects, 'boxCpe', 'paperCpe', 'buttonCloseCpe', 1);
        openBox(intersects, 'boxCharlemagne', 'paperCharlemagne', 'buttonCloseCharlemagne', 1);
        openBox(intersects, 'boxHenri', 'paperHenri', 'buttonCloseHenri', 1);

        openBox(intersects, 'boxBarco', 'paperBarco', 'buttonCloseBarco', 2);
        openBox(intersects, 'boxSncf1', 'paperSncf1', 'buttonCloseSncf1', 2);
        openBox(intersects, 'boxSncf2', 'paperSncf2', 'buttonCloseSncf2', 2);
        openBox(intersects, 'boxCompletude', 'paperCompletude', 'buttonCloseCompletude', 2);

        closeBox(intersects, 'paperCpe', 'buttonCloseCpe', 1)
        closeBox(intersects, 'paperCharlemagne', 'buttonCloseCharlemagne', 1)
        closeBox(intersects, 'paperHenri', 'buttonCloseHenri', 1)

        closeBox(intersects, 'paperBarco', 'buttonCloseBarco', 2)
        closeBox(intersects, 'paperSncf1', 'buttonCloseSncf1', 2)
        closeBox(intersects, 'paperSncf2', 'buttonCloseSncf2', 2)
        closeBox(intersects, 'paperCompletude', 'buttonCloseCompletude', 2)

    }
}

function goToCorridor(intersects){
    if ((intersects[0].object.name == 'arrowRoom') || (intersects[0].object.name == 'textArrowRoom')){  
            
        corridorLights["hemiLight"].position.set(0, 0, 0);
        corridorLights["dirLight"].position.set(0, 0, 300);

        camera.position.set(0, 0, corridorObjects["paladin"].position.z + 600);          
    }
}


function goToRoom(intersects, doorName, doorId){
    if (intersects[0].object.name == doorName){
            
        if (corridorObjects["doors"][doorId] != undefined){       
            corridorLights["hemiLight"].position.set(0, -10000, 0);
            corridorLights["dirLight"].position.set(0, -10000, 300);

            switch(doorId){
                case 0:
                    camera.position.set(-1400, 100, 100);
                    break;
                case 1:
                    camera.position.set(1400, 100, 0);
                    break;
                case 2:
                    camera.position.set(-1400, 100, -2400);
                    break;
                case 3:
                    camera.position.set(1400, 100, -2400);
                    break;
                default:
                    break;
            }
            
        }
    }
}

function openBox(intersects, objectName, paperName, buttonCloseName, nbRoom){
    if (intersects[0].object.name == objectName){
        switch(nbRoom){
            case 1:
                camera.position.set(1400, 0, 0);
                if ((room1Objects[objectName] != undefined) && (room1Objects[buttonCloseName] != undefined)){
                    room1Objects[paperName].position.set(1400, 0, -900);
                    room1Objects[buttonCloseName].position.set(1650, 400, -890);
                }
                break;
            case 2:
                camera.position.set(-1400, 0, -2400);
                if ((room2Objects[objectName] != undefined) && (room2Objects[buttonCloseName] != undefined)){
                    room2Objects[paperName].position.set(-1400, 0, -3300);
                    room2Objects[buttonCloseName].position.set(-1650, 400, -3290);
                }
                break;
            default:
                break;
        }  

    }
}

function closeBox(intersects, paperName, buttonCloseName, nbRoom){
    if (intersects[0].object.name == buttonCloseName){  
        switch(nbRoom){
            case 1:
                camera.position.set(1400, 100, 0);
                if ((room1Objects[paperName] != undefined) && (room1Objects[buttonCloseName] != undefined)){
                    room1Objects[paperName].position.set(1400, -5000, -900);
                    room1Objects[buttonCloseName].position.set(1650, -5000, -890);
                }
                break;
            case 2:
                camera.position.set(-1400, 100, -2400);
                if ((room2Objects[paperName] != undefined) && (room2Objects[buttonCloseName] != undefined)){
                    room2Objects[paperName].position.set(-1400, -5000, -3300);
                    room2Objects[buttonCloseName].position.set(-1650, -5000, -3290);
                }
                break;
            default:
                break;
        }
    }
}



// Loop
function animate() {

    // Hover objects
    if (arrowClicked == false){
        detectObjects(scene, raycaster, mouse, camera, objects, materials);
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

    // Rotates cubes of room 0
    room0Objects["boxComputing"].rotation.y += 0.01
    room0Objects["boxAsso"].rotation.y += 0.01
    room0Objects["boxSport"].rotation.y += 0.01
    room0Objects["boxMe"].rotation.y += 0.01

    // Rotates cubes of room 1
    room1Objects["boxCpe"].rotation.y += 0.01;
    room1Objects["boxCharlemagne"].rotation.y += 0.01
    room1Objects["boxHenri"].rotation.y += 0.01

    // Rotates cubes of room 2
    room2Objects["boxBarco"].rotation.y += 0.01;
    room2Objects["boxSncf1"].rotation.y += 0.01
    room2Objects["boxSncf2"].rotation.y += 0.01
    room2Objects["boxCompletude"].rotation.y += 0.01;

    theta += 0.01
    room2Objects["boxBarco"].position.x = -1400 + 120 * Math.cos(theta);
    room2Objects["boxBarco"].position.z = -3500 + 260 * Math.sin(theta);
    room2Objects["boxSncf1"].position.x = -1400 + 120 * Math.cos(theta + Math.PI/2);
    room2Objects["boxSncf1"].position.z = -3500 + 260 * Math.sin(theta + Math.PI/2);
    room2Objects["boxSncf2"].position.x = -1400 + 120 * Math.cos(theta + Math.PI);
    room2Objects["boxSncf2"].position.z = -3500 + 260 * Math.sin(theta + Math.PI);
    room2Objects["boxCompletude"].position.x = -1400 + 120 * Math.cos(theta + 3*Math.PI/2);
    room2Objects["boxCompletude"].position.z = -3500 + 260 * Math.sin(theta + 3*Math.PI/2);

    // Rotates cubes of room 3
    room3Objects["boxPython"].rotation.y += 0.01
    room3Objects["boxMatlab"].rotation.y += 0.01
    room3Objects["boxC++"].rotation.y += 0.01
    room3Objects["boxC"].rotation.y += 0.01
    room3Objects["boxC#"].rotation.y += 0.01
    room3Objects["boxJava"].rotation.y += 0.01
    room3Objects["boxPowerbi"].rotation.y += 0.01
    room3Objects["boxVhdl"].rotation.y += 0.01
    room3Objects["boxLabview"].rotation.y += 0.01
    room3Objects["boxLua"].rotation.y += 0.01
    room3Objects["boxVba"].rotation.y += 0.01

    requestAnimationFrame(animate);

    renderer.render(scene,camera);
    
}
