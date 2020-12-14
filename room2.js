import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { Room } from './room.js';

export function initRoom2(scene){

    // Initialization of the room
    let objects = {};
    let materials = {};
    let room = new Room(scene, objects, materials);

    // Room
    const posRoom = new THREE.Vector3(-1400, 0, -3000);
    let leftWall = 'img/room2/wall.jpg';
    let rightWall = 'img/room2/wall.jpg';
    let frontWall = 'img/room2/wall2.jpg';
    let ceiling = 'img/ceilingWhite.jpg';
    let floor = 'img/floorGrey.jpg';
    let texturesRoom = [leftWall, rightWall, frontWall, ceiling, floor];
    room.createRoom(posRoom, texturesRoom);
    
    // Arrow
    const arrowUrl = 'models/commun/arrow.fbx';
    const arrowPos = new THREE.Vector3(-1100, 400, -3900);
    const arrowRot = new THREE.Vector3(0, 0, 0);
    const arrowScale = 120;
    const arrowMaterial = new THREE.MeshPhongMaterial( { color:  0xff0000 } );
    const arrowName = 'arrowRoom'
    room.loadFBXModel(arrowUrl, arrowPos, arrowRot, arrowScale, arrowMaterial, arrowName);

    // ArrowText
    const arrowTextUrl = 'fonts/Bebas_Neue_Regular.json';
    const arrowTextText = 'Sortir'
    const arrowTextPos = new THREE.Vector3(-1150, 374, -3850);
    const arrowTextSize = 38;
    const arrowTextHeight = 2;
    const arrowTextMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff });
    const arrowTextName = 'textArrowRoom'
    room.loadFont(scene, objects, arrowTextUrl, arrowTextText, arrowTextPos, arrowTextSize, arrowTextHeight, arrowTextMaterial, arrowTextName);

    // Table
    const tableUrl = 'models/room2/table/table.fbx';
    const tablePos = new THREE.Vector3(-1400, -550, -3500);
    const tableRot = new THREE.Vector3(0, Math.PI/2, 0);
    const tableScale = 0.05;
    const tableMaterial = new THREE.MeshPhongMaterial( { color: 0x2b1d0e } );
    const tableName = 'table';
    room.loadFBXModel(tableUrl, tablePos, tableRot, tableScale, tableMaterial, tableName);

    // Chairs
    const chairUrl = 'models/room2/chair/chair.fbx';
    const chairScale = 2.4;
    const chairTexture = new THREE.TextureLoader().load( 'models/room2/chair/black.jpg');
    const chairMaterial = new THREE.MeshPhongMaterial( { map: chairTexture } );
    const chairName = 'chair';
    const chair0Pos = new THREE.Vector3(-1600, -450, -3700);
    const chair1Pos = new THREE.Vector3(-1200, -450, -3700);
    const chair2Pos = new THREE.Vector3(-1600, -450, -3400);
    const chair3Pos = new THREE.Vector3(-1200, -450, -3400);
    const chair0Rot = new THREE.Vector3(0, Math.PI/2, 0);
    const chair1Rot = new THREE.Vector3(0, -Math.PI/2, 0);
    const chair2Rot = new THREE.Vector3(0, Math.PI/2, 0);
    const chair3Rot = new THREE.Vector3(0, -Math.PI/2, 0);
    room.loadFBXModel(chairUrl, chair0Pos, chair0Rot, chairScale, chairMaterial, chairName);
    room.loadFBXModel(chairUrl, chair1Pos, chair1Rot, chairScale, chairMaterial, chairName);
    room.loadFBXModel(chairUrl, chair2Pos, chair2Rot, chairScale, chairMaterial, chairName);
    room.loadFBXModel(chairUrl, chair3Pos, chair3Rot, chairScale, chairMaterial, chairName);

    // TV
    const tvUrl = 'models/room2/tv/tv.fbx';
    const tvPos = new THREE.Vector3(-1400, 140, -3900);
    const tvRot = new THREE.Vector3(0, 0, 0);
    const tvScale = 0.01;
    const tvMaterial = new THREE.MeshPhongMaterial( { color:  0x000000 } );
    const tvName = 'tv'
    room.loadFBXModel(tvUrl, tvPos, tvRot, tvScale, tvMaterial, tvName);

    // Screen
    let screenGeo = new THREE.BoxGeometry(495, 290, 5);
    let screenTexture = new THREE.TextureLoader().load( 'img/room2/dashboard.jpg' );
    let screenMat = new THREE.MeshPhongMaterial( { map: screenTexture } );
    let screen = new THREE.Mesh( screenGeo, screenMat );
    screen.position.set(-1400, 160, -3920);
    scene.add(screen);
    objects["screen"] = screen; 

    // Boxes
    const posBox1 = new THREE.Vector3(-1500, -80, -3400);
    const posBox2 = new THREE.Vector3(-1300, -80, -3400);
    const posBox3 = new THREE.Vector3(-1300, -80, -3600);
    const posBox4 = new THREE.Vector3(-1500, -80, -3600);  
    const sizeBox = new THREE.Vector3(110, 110, 110);
    room.createBox(posBox1, sizeBox, 'img/room2/barco.png', 'boxBarco');
    room.createBox(posBox2, sizeBox, 'img/room2/SNCF.jpg', 'boxSncf1');
    room.createBox(posBox3, sizeBox, 'img/room2/SNCF2.jpg', 'boxSncf2');
    room.createBox(posBox4, sizeBox, 'img/room2/completude.png', 'boxCompletude');

    // Papers
    const posPaper = new THREE.Vector3(-1400, -5000, -3300);
    room.createPaper(posPaper, 'img/room2/description/barco.png', 'paperBarco');
    room.createPaper(posPaper, 'img/room2/description/sncf1.png', 'paperSncf1');
    room.createPaper(posPaper, 'img/room2/description/sncf2.png', 'paperSncf2');
    room.createPaper(posPaper, 'img/room2/description/completude.png', 'paperCompletude');
    
    // Buttons close
    const posButtonClose = new THREE.Vector3(-1650, -5000, -3290);
    room.createButtonClose(posButtonClose, 'buttonCloseBarco');
    room.createButtonClose(posButtonClose, 'buttonCloseSncf1');
    room.createButtonClose(posButtonClose, 'buttonCloseSncf2');
    room.createButtonClose(posButtonClose, 'buttonCloseCompletude');

    return [objects, materials];
}