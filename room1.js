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
    let leftWall = 'img/room1/wall.jpg';
    let rightWall = 'img/room1/wall.jpg';
    let frontWall = 'img/room1/wall2.jpg';
    let ceiling = 'img/ceilingWhite.jpg';
    let floor = 'img/floorGrey.jpg';
    let textures = [leftWall, rightWall, frontWall, ceiling, floor];
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
    const scaleArrow = 120;
    const materialArrow = new THREE.MeshPhongMaterial( { color:  0x00008b } );
    createArrow(scene, objects, materials, posArrow, rotArrow, scaleArrow, materialArrow);

    // ArrowText
    const posArrowText = new THREE.Vector3(1050, 374, -1450);
    createArrowText(scene, objects, posArrowText)
    
    // Papers
    const posPaper = new THREE.Vector3(1400, -5000, -900);
    createPaper(scene, objects, posPaper,  'img/room1/description/cpe.png', 'paperCpe');
    createPaper(scene, objects, posPaper, 'img/room1/description/charlemagne.png', 'paperCharlemagne');
    createPaper(scene, objects, posPaper, 'img/room1/description/henri.png', 'paperHenri');
    
    // Buttons close
    const posButtonClose = new THREE.Vector3(1650, -5000, -890);
    createButtonClose(scene, objects, posButtonClose, 'buttonCloseCpe');
    createButtonClose(scene, objects, posButtonClose, 'buttonCloseCharlemagne');
    createButtonClose(scene, objects, posButtonClose, 'buttonCloseHenri');
    
    // Desk
    const loaderTextureDesk = new TGALoader();
    const textureDesk = loaderTextureDesk.load('models/room1/desk/texture.tga');

    const matDesk = new THREE.MeshPhongMaterial( {
        color: 0xffffff,
        map: textureDesk
    } );

    const loaderDesk = new FBXLoader();
    loaderDesk.load('models/room1/desk/desk.FBX', (desk) => {

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


