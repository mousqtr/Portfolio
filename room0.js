import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { Room } from './room.js';

export function initRoom0(scene, manager){

    // Initialization of the room
    let objects = {};
    let materials = {};
    let room = new Room(scene, manager, objects, materials);

    // Room
    const posRoom = new THREE.Vector3(-1400, 0, -600);
    const leftWall = 'img/room0/wall.jpg';
    const rightWall = 'img/room0/wall.jpg';
    const frontWall = 'img/room0/wall3.jpg';
    const ceiling = 'img/ceilingWhite.jpg';
    const floor = 'img/floorGrey.jpg';
    const texturesRoom = [leftWall, rightWall, frontWall, ceiling, floor];
    room.createRoom(posRoom, texturesRoom);

    // Arrow
    const arrowUrl = 'models/common/arrow.fbx';
    const arrowPos = new THREE.Vector3(-1100, 400, -1500);
    const arrowRot = new THREE.Vector3(0, 0, 0);
    const arrowScale = 120;
    const arrowMaterial = new THREE.MeshPhongMaterial( { color:  0x006400 } );
    const arrowName = 'arrowRoom'
    room.loadFBXModel(arrowUrl, arrowPos, arrowRot, arrowScale, arrowMaterial, arrowName);

    // ArrowText
    const arrowTextUrl = 'fonts/Bebas_Neue_Regular.json';
    const arrowTextText = 'Sortir'
    const arrowTextPos = new THREE.Vector3(-1150, 374, -1450);
    const arrowTextSize = 38;
    const arrowTextHeight = 2;
    const arrowTextMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff });
    const arrowTextName = 'textArrowRoom'
    room.loadFont(scene, objects, arrowTextUrl, arrowTextText, arrowTextPos, arrowTextSize, arrowTextHeight, arrowTextMaterial, arrowTextName);

    // Sofa
    const sofaUrl = 'models/room0/sofa/sofa.fbx';
    const sofaPos = new THREE.Vector3(-1380, -500, -1350);
    const sofaRot = new THREE.Vector3(0, 0, 0);
    const sofaScale = 4;
    const sofaTexture = new THREE.TextureLoader().load( 'models/room0/sofa/blue.jpg');
    const sofaMaterial = new THREE.MeshPhongMaterial( { map: sofaTexture } );
    const sofaName = 'sofa'
    room.loadFBXModel(sofaUrl, sofaPos, sofaRot, sofaScale, sofaMaterial, sofaName);

    // Chair
    const chairUrl = 'models/room0/chair/chair.fbx'
    const chairPos = new THREE.Vector3(-1100, -550, -1200);
    const chairRot = new THREE.Vector3(-Math.PI/2, 0, Math.PI);
    const chairScale = 4;
    const chairTexture = new THREE.TextureLoader().load( 'models/room0/chair/black.jpg');
    const chairMaterial = new THREE.MeshPhongMaterial( { map: chairTexture } );
    const chairName = 'chair'
    room.loadFBXModel(chairUrl, chairPos, chairRot, chairScale, chairMaterial, chairName);

    // Top shelf
    const topShelfGeo = new THREE.BoxGeometry(500, 30, 300);
    const topShelftexture = new THREE.TextureLoader().load( 'models/room0/chair/black.jpg' );
    const topShelfMat = new THREE.MeshPhongMaterial( { map: topShelftexture } );
    const topShelf = new THREE.Mesh( topShelfGeo, topShelfMat );
    topShelf.position.set(-1600, 300, -1430);
    scene.add(topShelf);

    // Bottom shelf
    const bottomShelfGeo = new THREE.BoxGeometry(500, 30, 300);
    const bottomShelftexture = new THREE.TextureLoader().load( 'models/room0/chair/black.jpg' );
    const bottomShelfMat = new THREE.MeshPhongMaterial( { map: bottomShelftexture } );
    const bottomShelf = new THREE.Mesh( bottomShelfGeo, bottomShelfMat );
    bottomShelf.position.set(-1600, 70, -1430);
    scene.add(bottomShelf);

    // Desk
    const deskUrl = 'models/room0/desk/desk.fbx';
    const deskPos = new THREE.Vector3(-1100, -500, -1900);
    const deskRot = new THREE.Vector3(Math.PI, Math.PI/2, Math.PI);
    const deskScale = 0.8;
    const deskMaterial = new THREE.MeshPhongMaterial( { color: 0x7f7f7f } );
    const deskName = 'desk';
    room.loadFBXModel(deskUrl, deskPos, deskRot, deskScale, deskMaterial, deskName);

    // Boxes
    const posBox1 = new THREE.Vector3(-1100, -110, -1400);
    const posBox2 = new THREE.Vector3(-1470, 165, -1400);
    const posBox3 = new THREE.Vector3(-1700, 400, -1400);
    const posBox4 = new THREE.Vector3(-1650, -170, -1350);
    const sizeBox = new THREE.Vector3(150, 150, 150);
    room.createBox(posBox1, sizeBox, 'img/room0/computing.png', 'boxComputing');
    room.createBox(posBox2, sizeBox, 'img/room0/group.png', 'boxAsso');
    room.createBox(posBox3, sizeBox, 'img/room0/bike.png', 'boxSport');
    room.createBox(posBox4, sizeBox, 'img/room0/me.png', 'boxMe');

    return [objects, materials];
}