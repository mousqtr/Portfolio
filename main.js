import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
// import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {OBJLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/OBJLoader.js';
import {TGALoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/TGALoader.js';

import { walkTo, stopWalk } from "./characterMovements.js";
import { detectObjects } from "./detectObjects.js";
import { loadRoom1 } from "./room1.js";
import { loadCorridor } from './corridor.js';

let scene, camera, renderer;

const clock = new THREE.Clock();


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

    if (Object.keys(corridorObjects).length > 0){
        let posZ;
        
        // Paladin
        posZ = 0.375 * window.innerWidth - 1150;
        posZ = Math.min(-600, posZ);
        posZ = Math.max(-1000, posZ);
        corridorObjects["paladin"].position.set(corridorObjects["paladin"].position.x, objcorridorObjectsects["paladin"].position.y, posZ);
        
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

let controls = new OrbitControls(camera, renderer.domElement );
controls.addEventListener('change', renderer);
controls.minDistance = 500;
controls.maxDistance = 1500;





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
            
            if (Object.keys(corridorObjects).length > 1){
                arrowClicked = true;
            }
        }

        if (intersects[0].object.name.substring(0, 4) == 'door'){
            let num = parseInt(intersects[0].object.name.charAt(4), 10); 
            
            if (corridorObjects["doors"][num] != undefined){
                camera.position.set(1400, 100, 0);
                camera.lookAt( room1Objects["box2"].position );
                corridorLights["hemiLight"].position.set(0, -10000, 0);
                corridorLights["dirLight"].position.set(0, -10000, 300);
            }

        }
    }
}





let [corridorObjects, corridorMaterials, corridorMixers, corridorActions, corridorLights] = loadCorridor(scene);
let room1Objects = loadRoom1(scene);



animate();

function animate() {

    // Hover objects
    if (arrowClicked == false){
        detectObjects(scene, raycaster, mouse, camera, corridorObjects, corridorMaterials["door"]);
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

    requestAnimationFrame(animate);

    renderer.render(scene,camera);
    
}