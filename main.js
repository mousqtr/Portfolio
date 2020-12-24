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

// Loading manager
const loadingElem = document.querySelector('#loading');
const progressBarElem = loadingElem.querySelector('.progressbar');

const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Start loading' );
    // console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onLoad = function ( ) {
    loadingElem.style.display = 'none';
    console.log( 'Loading complete!');
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    // const progress = itemsLoaded / itemsTotal;
    // console.log('itemLoaded ' + itemsLoaded + ' / itemsTotal ' + itemsTotal + '/ progress ' + progress);

    const tempItemsTotal = 150
    const progress = itemsLoaded / tempItemsTotal;
    // console.log(progress)
    
    progressBarElem.style.transform = `scaleX(${progress})`;
};

manager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url );
};

// Models initialization
let [corridorObjects, corridorMaterials, corridorMixers, corridorActions, corridorLights] = initCorridor(scene, manager);
let [room0Objects, room0Materials] = initRoom0(scene, manager);
let [room1Objects, room1Materials] = initRoom1(scene, manager);
let [room2Objects, room2Materials, room2Videos] = initRoom2(scene, manager);
let [room3Objects, room3Materials] = initRoom3(scene, manager);

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
// let controls = new OrbitControls(camera, renderer.domElement );
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

    // TODO : Replace the condition by the end of loading
    if (Object.keys(corridorObjects).length > 0){
        let posZ;
        
        // Character
        posZ = 0.375 * window.innerWidth - 1150;
        posZ = Math.min(-600, posZ);
        posZ = Math.max(-1000, posZ);
        corridorObjects["character"].position.set(corridorObjects["character"].position.x, corridorObjects["character"].position.y, posZ);
        
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

        // Doormats
        for (let i = 0; i < corridorObjects["doormats"].length; i++) {
            if (i < 2){
                posZ = 0.67 * window.innerWidth - 2300;
            }else{
                posZ = 0.67 * window.innerWidth - 4300;
            }
            corridorObjects["doormats"][i].position.set(corridorObjects["doormats"][i].position.x, corridorObjects["doormats"][i].position.y, posZ);
        }

        // Plants corridor
        posZ = 0.67 * window.innerWidth - 5400;
        corridorObjects["plant"].position.set(corridorObjects["plant"].position.x, corridorObjects["plant"].position.y, posZ);

        // Table
        posZ = 0.67 * window.innerWidth - 3300;
        corridorObjects["table"].position.set(corridorObjects["table"].position.x, corridorObjects["table"].position.y, posZ);

        // Lamp
        posZ = 0.67 * window.innerWidth - 3220;
        corridorObjects["lamp"].position.set(corridorObjects["lamp"].position.x, corridorObjects["lamp"].position.y, posZ);
    
        // Wall Lamp
        for (let i = 0; i < corridorObjects["wallLamps"].length; i++) {
            switch(i){
                case 0:
                    posZ = 0.67 * window.innerWidth - 2440;
                    break;
                case 1:
                    posZ = 0.67 * window.innerWidth - 2800;
                    break;
                case 2:
                    posZ = 0.67 * window.innerWidth - 4440;
                    break;
                case 3:
                    posZ = 0.67 * window.innerWidth - 4800;
                    break;
            }
            corridorObjects["wallLamps"][i].position.set(corridorObjects["wallLamps"][i].position.x, corridorObjects["wallLamps"][i].position.y, posZ);
        }

        // Shoes
        posZ = 0.67 * window.innerWidth - 4700;
        corridorObjects["shoes"][0].position.set(corridorObjects["shoes"][0].position.x, corridorObjects["shoes"][0].position.y, posZ);
        posZ = 0.67 * window.innerWidth - 4800;
        corridorObjects["shoes"][1].position.set(corridorObjects["shoes"][1].position.x, corridorObjects["shoes"][1].position.y, posZ);
       
        // Lamp
        posZ = 0.67 * window.innerWidth - 3300;
        corridorObjects["bench"].position.set(corridorObjects["bench"].position.x, corridorObjects["bench"].position.y, posZ);
   
        // Painting
        posZ = 0.67 * window.innerWidth - 3300;
        corridorObjects["painting"].position.set(corridorObjects["painting"].position.x, corridorObjects["painting"].position.y, posZ);
        

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

        // Room 1
        openBox(intersects, 'boxBarco', 'paperBarco', 'buttonCloseBarco', 2);
        openBox(intersects, 'boxSncf1', 'paperSncf1', 'buttonCloseSncf1', 2);
        openBox(intersects, 'boxSncf2', 'paperSncf2', 'buttonCloseSncf2', 2);
        openBox(intersects, 'boxCompletude', 'paperCompletude', 'buttonCloseCompletude', 2);
        closeBox(intersects, 'paperCpe', 'buttonCloseCpe', 1)
        closeBox(intersects, 'paperCharlemagne', 'buttonCloseCharlemagne', 1)
        closeBox(intersects, 'paperHenri', 'buttonCloseHenri', 1)

        // Room 2
        openBox(intersects, 'boxCpe', 'paperCpe', 'buttonCloseCpe', 1);
        openBox(intersects, 'boxCharlemagne', 'paperCharlemagne', 'buttonCloseCharlemagne', 1);
        openBox(intersects, 'boxHenri', 'paperHenri', 'buttonCloseHenri', 1);
        closeBox(intersects, 'paperBarco', 'buttonCloseBarco', 2)
        closeBox(intersects, 'paperSncf1', 'buttonCloseSncf1', 2)
        closeBox(intersects, 'paperSncf2', 'buttonCloseSncf2', 2)
        closeBox(intersects, 'paperCompletude', 'buttonCloseCompletude', 2)

        // Room 3
        openBox(intersects, 'boxC', 'paperC', 'buttonCloseC', 3);
        openBox(intersects, 'boxC++', 'paperCplusplus', 'buttonCloseCplusplus', 3);
        openBox(intersects, 'boxC#', 'paperCsharp', 'buttonCloseCsharp', 3);
        openBox(intersects, 'boxJava', 'paperJava', 'buttonCloseJava', 3);
        openBox(intersects, 'boxLabview', 'paperLabview', 'buttonCloseLabview', 3);
        openBox(intersects, 'boxLua', 'paperLua', 'buttonCloseLua', 3);
        openBox(intersects, 'boxMatlab', 'paperMatlab', 'buttonCloseMatlab', 3);
        openBox(intersects, 'boxPowerbi', 'paperPowerbi', 'buttonClosePowerbi', 3);
        openBox(intersects, 'boxVba', 'paperVba', 'buttonCloseVba', 3);
        openBox(intersects, 'boxVhdl', 'paperVhdl', 'buttonCloseVhdl', 3);
        closeBox(intersects, 'paperC', 'buttonCloseC', 3);
        closeBox(intersects, 'paperCplusplus', 'buttonCloseCplusplus', 3);
        closeBox(intersects, 'paperCsharp', 'buttonCloseCsharp', 3);
        closeBox(intersects, 'paperJava', 'buttonCloseJava', 3);
        closeBox(intersects, 'paperLabview', 'buttonCloseLabview', 3);
        closeBox(intersects, 'paperLua', 'buttonCloseLua', 3);
        closeBox(intersects, 'paperMatlab', 'buttonCloseMatlab', 3);
        closeBox(intersects, 'paperPowerbi', 'buttonClosePowerbi', 3);
        closeBox(intersects, 'paperVba', 'buttonCloseVba', 3);
        closeBox(intersects, 'paperVhdl', 'buttonCloseVhdl', 3);

        // Video in Room 2
        if (intersects[0].object.name == 'playButton'){  
            if (room2Videos["video"] != undefined){
                room2Videos["video"].play();
            }
        }

        if (intersects[0].object.name == 'pauseButton'){  
            if (room2Videos["video"] != undefined){
                room2Videos["video"].pause();
            }
        }

    }
}

function goToCorridor(intersects){
    if ((intersects[0].object.name == 'arrowRoom') || (intersects[0].object.name == 'textArrowRoom')){  
            
        corridorLights["hemiLight"].position.set(0, 200, 200);
        corridorLights["dirLight"].position.set(0, 300, 300);

        // Reset the camera
        camera.position.set(0, 0, 0);

        // Reset the character
        corridorObjects["character"].position.set(0, -500, -600);   
        corridorObjects["character"].rotation.set(0, Math.PI, 0)
        if(corridorActions["sittingIdle"].isRunning()){ corridorActions["sittingIdle"].stop();}
        corridorActions["stand"].play();
              
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
                    if (room2Videos["video"] != undefined){
                        room2Videos["video"].play();
                    }
                    corridorObjects["character"].position.set(-1100, -400, -3300);
                    corridorObjects["character"].rotation.set(0, -Math.PI/2, 0)
                    if(corridorActions["stand"].isRunning()){
                        corridorActions["stand"].stop();
                    }
                    corridorActions["sittingIdle"].play();
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
                camera.position.set(-1400, 0, -2000);
                if ((room2Objects[objectName] != undefined) && (room2Objects[buttonCloseName] != undefined)){
                    room2Objects[paperName].position.set(-1400, 0, -2900);
                    room2Objects[buttonCloseName].position.set(-1150, 400, -2890);
                }
                break;
            case 3:
                camera.position.set(1400, 0, -2000);
                if ((room3Objects[objectName] != undefined) && (room3Objects[buttonCloseName] != undefined)){
                    room3Objects[paperName].position.set(1400, 0, -2900);
                    room3Objects[buttonCloseName].position.set(1650, 400, -2890);
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
            case 3:
                camera.position.set(1400, 100, -2400);
                if ((room3Objects[paperName] != undefined) && (room3Objects[buttonCloseName] != undefined)){
                    room3Objects[paperName].position.set(1400, -5000, -3300);
                    room3Objects[buttonCloseName].position.set(1650, -5000, -3290);
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
    if ((arrowClicked == true) && (corridorObjects["character"].position.z < -2500) && (positionState == 0)){
        stopWalk(positionState, corridorObjects, corridorActions);
        arrowClicked = false;
        positionState = 1;
    } 

    // Stop walking at first position
    if ((arrowClicked == true) && (positionState == 1) && (corridorObjects["character"].position.z > -600)){
        stopWalk(positionState, corridorObjects, corridorActions);
        arrowClicked = false;
        positionState = 0;
    } 

    // Update mixers
    const delta = clock.getDelta();
    if ( corridorMixers["walk"] ) corridorMixers["walk"].update( delta );
    if ( corridorMixers["stand"] ) corridorMixers["stand"].update( delta );
    if ( corridorMixers["jogBackwards"] ) corridorMixers["jogBackwards"].update( delta );
    if ( corridorMixers["rightTurn"] ) corridorMixers["rightTurn"].update( delta );
    if ( corridorMixers["sittingIdle"] ) corridorMixers["sittingIdle"].update( delta );

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

    // Run the video in room2
    if ( room2Videos["video"].readyState === room2Videos["video"].HAVE_ENOUGH_DATA ) 
	{
		room2Videos["videoImageContext"].drawImage( room2Videos["video"], 0, 0 );
		if ( room2Videos["videoTexture"] ) 
        room2Videos["videoTexture"].needsUpdate = true;
	}

    renderer.render(scene,camera);
    
}
