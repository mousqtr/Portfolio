import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { createArrow, createArrowText } from './utils.js';

export function initRoom3(scene){

    let objects = {};

    /*************************************************************/
    /*                          LIGHTS                           */
    /*************************************************************/

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set(1400, 0, -3000);
    scene.add( hemiLight );


    /*************************************************************/
    /*                         ROOM                              */
    /*************************************************************/
    
    let roomMaterialArray = [];
    let roomTexture_ft = new THREE.TextureLoader().load( 'img/wallRed.jpg');
    let roomTexture_bk = new THREE.TextureLoader().load( 'img/wallRed.jpg');
    let roomTexture_up = new THREE.TextureLoader().load( 'img/ceilingWhite.jpg');
    let roomTexture_dn = new THREE.TextureLoader().load( 'img/floorGrey.jpg');
    let roomTexture_rt = new THREE.TextureLoader().load( 'img/wallRed.jpg');
    let roomTexture_lf = new THREE.TextureLoader().load( 'img/room1/wallRoom.png');

    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_ft }));
    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_bk }));
    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_up }));
    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_dn }));
    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_rt }));
    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_lf }));

    for (let i = 0; i < 6; i++) {
        roomMaterialArray[i].side = THREE.BackSide;
    }
        
    let roomGeo = new THREE.BoxGeometry( 1000, 1000, 2000);
    let room = new THREE.Mesh( roomGeo, roomMaterialArray );
    room.position.set(1400, 0, -3000)
    scene.add(room);  
    objects["room3"] = room


    const posArrow = new THREE.Vector3(1100, 400, -3900);
    const rotArrow = new THREE.Vector3(0, Math.PI, 0);
    createArrow(scene, objects, posArrow, rotArrow)

    const posArrowText = new THREE.Vector3(1050, 374, -3850);
    createArrowText(scene, objects, posArrowText)


    return objects;
}