import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { createArrow, createArrowText, createRoom, createLight } from './utils.js';

export function initRoom3(scene){

    let objects = {};
    let materials = {};

    // // Light
    // const posLight = new THREE.Vector3(1400, 0, -4000);
    // createLight(scene, posLight);

    // Room
    const posRoom = new THREE.Vector3(1400, 0, -3000);
    let wall = 'img/room3/wall.png';
    let frontWall = 'img/room3/wall.png';
    let ceiling = 'img/ceilingWhite.jpg';
    let floor = 'img/floorGrey.jpg';
    let textures = [wall, frontWall, ceiling, floor];
    createRoom(scene, objects, posRoom, textures)

    // Arrow
    const posArrow = new THREE.Vector3(1100, 400, -3900);
    const rotArrow = new THREE.Vector3(0, Math.PI, 0);
    const materialArrow = new THREE.MeshPhongMaterial( { color:  0xff0000 } );
    createArrow(scene, objects, materials, posArrow, rotArrow, materialArrow, 'arrowRoom3');

    // ArrowText
    const posArrowText = new THREE.Vector3(1050, 374, -3850);
    createArrowText(scene, objects, posArrowText)

    // Library
    const posLibraryLeft = new THREE.Vector3(1190, -500, -3800);
    const posLibraryRight = new THREE.Vector3(1610, -500, -3800);
    const posLibraries = [posLibraryLeft, posLibraryRight];
    const nameLibraries = ["libraryLeft", "libraryRight"];
    let textureLibrary = new THREE.TextureLoader().load( 'models/library/wood.jpg');
    const materialLibrary = new THREE.MeshPhongMaterial( {
        map: textureLibrary
    } );
    for ( let i = 0; i < 2; i ++ ) {
        const loaderLibrary = new FBXLoader();
        loaderLibrary.load('models/library/library.FBX', (library) => {
            library.traverse(child => {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material = materialLibrary;
            });
            library.scale.setScalar(4);
            library.position.set(posLibraries[i].x, posLibraries[i].y, posLibraries[i].z);
            library.rotation.set(0, 0, 0);
            scene.add(library);
            objects[nameLibraries[i]] = library; 
        });
    }
    

    return [objects, materials];
}