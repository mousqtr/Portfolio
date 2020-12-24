import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {TGALoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/TGALoader.js';
import { Room } from './room.js';

export function initRoom1(scene, manager){

    // Initialization of the room
    let objects = {};
    let materials = {};
    let room = new Room(scene, manager, objects, materials);

    // Light
    const posLight = new THREE.Vector3(1400, 0, 0);
    room.createLight(posLight);

    // Room
    const posRoom = new THREE.Vector3(1400, 0, -600);
    let leftWall = 'img/room1/wall.jpg';
    let rightWall = 'img/room1/wall.jpg';
    let frontWall = 'img/room1/wall3.jpg';
    let ceiling = 'img/ceilingWhite.jpg';
    let floor = 'img/floorGrey.jpg';
    let texturesRoom = [leftWall, rightWall, frontWall, ceiling, floor];
    room.createRoom(posRoom, texturesRoom);

    // Arrow
    const arrowUrl = 'models/common/arrow.fbx';
    const arrowPos = new THREE.Vector3(1100, 400, -1500);
    const arrowRot = new THREE.Vector3(0, Math.PI, 0);
    const arrowScale = 120;
    const arrowMaterial = new THREE.MeshPhongMaterial( { color:  0x00008b } );
    const arrowName = 'arrowRoom'
    room.loadFBXModel(arrowUrl, arrowPos, arrowRot, arrowScale, arrowMaterial, arrowName);

    // ArrowText
    const arrowTextUrl = 'fonts/Bebas_Neue_Regular.json';
    const arrowTextText = 'Sortir'
    const arrowTextPos = new THREE.Vector3(1050, 374, -1450);
    const arrowTextSize = 38;
    const arrowTextHeight = 2;
    const arrowTextMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff });
    const arrowTextName = 'textArrowRoom'
    room.loadFont(scene, objects, arrowTextUrl, arrowTextText, arrowTextPos, arrowTextSize, arrowTextHeight, arrowTextMaterial, arrowTextName);

    // Boxes
    const posBox1 = new THREE.Vector3(1150, -110, -1400);
    const posBox2 = new THREE.Vector3(1400, -110, -1400);
    const posBox3 = new THREE.Vector3(1650, -110, -1400);
    const sizeBox = new THREE.Vector3(150, 150, 150);
    room.createBox(posBox1, sizeBox, 'img/room1/cpe.jpg', 'boxCpe');
    room.createBox(posBox2, sizeBox, 'img/room1/charlemagne.jpg', 'boxCharlemagne');
    room.createBox(posBox3, sizeBox, 'img/room1/henri.jpg', 'boxHenri');

    // Papers
    const posPaper = new THREE.Vector3(1400, -5000, -900);
    room.createPaper(posPaper,  'img/room1/description/cpe.png', 'paperCpe');
    room.createPaper(posPaper, 'img/room1/description/charlemagne.png', 'paperCharlemagne');
    room.createPaper(posPaper, 'img/room1/description/henri.png', 'paperHenri');
    
    // Buttons close
    const posButtonClose = new THREE.Vector3(1650, -5000, -890);
    room.createButtonClose(posButtonClose, 'buttonCloseCpe');
    room.createButtonClose(posButtonClose, 'buttonCloseCharlemagne');
    room.createButtonClose(posButtonClose, 'buttonCloseHenri');
    
    // Desk
    const deskUrl = 'models/room1/desk/desk.FBX';
    const deskPos = new THREE.Vector3(1400, -500, -1400);
    const deskRot = new THREE.Vector3(0, 0, 0);
    const deskScale = 4;
    const deskTexture = new THREE.TextureLoader(manager).load( 'models/room1/desk/wood.jpg' );
    const deskMaterial = new THREE.MeshPhongMaterial( { map: deskTexture } );
    const deskName = 'desk';
    room.loadFBXModel(deskUrl, deskPos, deskRot, deskScale, deskMaterial, deskName);
    

    return [objects, materials];
}


