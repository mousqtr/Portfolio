import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { createArrow, createArrowText, createRoom, createLight, createBox } from './utils.js';

export function initRoom2(scene){

    let objects = {};
    let materials = {};

    // Light
    // const posLight = new THREE.Vector3(1400, 0, -4000);
    // createLight(scene, posLight);

    // Room
    const posRoom = new THREE.Vector3(-1400, 0, -3000);
    let leftWall = 'img/room2/pexels6.jpg';
    let rightWall = 'img/room2/pexels6.jpg';
    let frontWall = 'img/room2/pexels5.jpg';
    let ceiling = 'img/ceilingWhite.jpg';
    let floor = 'img/floorGrey.jpg';
    let textures = [leftWall, rightWall, frontWall, ceiling, floor];
    createRoom(scene, objects, posRoom, textures)

    // Arrow
    const posArrow = new THREE.Vector3(-1100, 400, -3900);
    const rotArrow = new THREE.Vector3(0, 0, 0);
    const scaleArrow = 120;
    const materialArrow = new THREE.MeshPhongMaterial( { color:  0xff0000 } );
    createArrow(scene, objects, materials, posArrow, rotArrow, scaleArrow, materialArrow);

    // ArrowText
    const posArrowText = new THREE.Vector3(-1150, 374, -3850);
    createArrowText(scene, objects, posArrowText);

   

    return [objects, materials];
}