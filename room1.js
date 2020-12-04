import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {TGALoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/TGALoader.js';
import { createArrow, createArrowText, createRoom, createLight, createBox, createPaper, createButtonClose } from './utils.js';

export function initRoom1(scene){

    // List which contains every room object/materials
    let objects = {};
    let materials = {};

    // Light
    const posLight = new THREE.Vector3(1400, 0, 0);
    createLight(scene, posLight);

    // Room
    const posRoom = new THREE.Vector3(1400, 0, -600);
    let wall = 'img/room1/wall.jpg';
    let frontWall = 'img/room1/frontWall.png';
    let ceiling = 'img/ceilingWhite.jpg';
    let floor = 'img/floorGrey.jpg';
    let textures = [wall, frontWall, ceiling, floor];
    createRoom(scene, objects, posRoom, textures);

    // Boxes
    const posBox1 = new THREE.Vector3(1150, -110, -1400);
    const posBox2 = new THREE.Vector3(1400, -110, -1400);
    const posBox3 = new THREE.Vector3(1650, -110, -1400);
    const sizeBox = new THREE.Vector3(150, 150, 150);
    createBox(scene, objects, posBox1, sizeBox, 'img/room1/cpe.jpg', 'boxCpe');
    createBox(scene, objects, posBox2, sizeBox, 'img/room1/charlemagne.jpg', 'boxCharlemagne');
    createBox(scene, objects, posBox3, sizeBox, 'img/room1/henri.jpg', 'boxHenri');

    // Arrow
    const posArrow = new THREE.Vector3(1100, 400, -1500);
    const rotArrow = new THREE.Vector3(0, Math.PI, 0);
    const materialArrow = new THREE.MeshPhongMaterial( { color:  0x00008b } );
    createArrow(scene, objects, materials, posArrow, rotArrow, materialArrow, 'arrowRoom1');

    // ArrowText
    const posArrowText = new THREE.Vector3(1050, 374, -1450);
    createArrowText(scene, objects, posArrowText)
    
    // Papers
    createPaper(scene, objects, 'img/room1/cpePresentation.png', 'paperCpe');
    createPaper(scene, objects, 'img/room1/charlemagnePresentation.png', 'paperCharlemagne');
    createPaper(scene, objects, 'img/room1/henriPresentation.png', 'paperHenri');
    
    // Buttons close
    createButtonClose(scene, objects, 'buttonCloseCpe');
    createButtonClose(scene, objects, 'buttonCloseCharlemagne');
    createButtonClose(scene, objects, 'buttonCloseHenri');
    
    // Desk
    const loaderTextureDesk = new TGALoader();
    const textureDesk = loaderTextureDesk.load('models/desk/texture.tga');

    const matDesk = new THREE.MeshPhongMaterial( {
        color: 0xffffff,
        map: textureDesk
    } );

    const loaderDesk = new FBXLoader();
    loaderDesk.load('models/desk/desk.FBX', (desk) => {

        desk.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = matDesk;
        });
        desk.scale.setScalar(4);
        desk.position.set(1400, -500, -1400);
        desk.rotation.set(0, 0, 0);
        scene.add(desk);
        objects["desk"] = desk; 
    });

    return [objects, materials];
}


