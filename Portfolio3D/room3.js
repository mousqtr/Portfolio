import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { Room } from './room.js';

export function initRoom3(scene, manager){

    // Initialization of the room
    let objects = {};
    let materials = {};
    let room = new Room(scene, manager, objects, materials);

    // Room
    const posRoom = new THREE.Vector3(1400, 0, -3000);
    let leftWall = 'img/room3/wall.jpg';
    let rightWall = 'img/room3/wall.jpg';
    let frontWall = 'img/room3/wall2.jpg';
    let ceiling = 'img/ceilingWhite.jpg';
    let floor = 'img/floorGrey.jpg';
    let texturesRoom = [leftWall, rightWall, frontWall, ceiling, floor];
    room.createRoom(posRoom, texturesRoom);

    // Arrow
    const arrowUrl = 'models/common/arrow.fbx';
    const arrowPos = new THREE.Vector3(1100, 400, -3900);
    const arrowRot = new THREE.Vector3(0, Math.PI, 0);
    const arrowScale = 120;
    const arrowMaterial = new THREE.MeshPhongMaterial( { color:  0xff0000 } );
    const arrowName = 'arrowRoom'
    room.loadFBXModel(arrowUrl, arrowPos, arrowRot, arrowScale, arrowMaterial, arrowName);

    // ArrowText
    const arrowTextUrl = 'fonts/Bangers_Regular.json';
    const arrowTextText = 'Sortir'
    const arrowTextPos = new THREE.Vector3(1030, 374, -3850);
    const arrowTextSize = 38;
    const arrowTextHeight = 2;
    const arrowTextMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff });
    const arrowTextName = 'textArrowRoom'
    room.loadFont(scene, objects, arrowTextUrl, arrowTextText, arrowTextPos, arrowTextSize, arrowTextHeight, arrowTextMaterial, arrowTextName);

    // Boxes
    let rows = [140, 0, -140, -280, -397];
    let columns = [1060, 1250, 1550, 1750]
    const sizeBox   = new THREE.Vector3(110, 110, 110);
    const sizeBox2  = new THREE.Vector3(110, 100, 110);
    const posBox1   = new THREE.Vector3(columns[0], rows[0], -3800);
    const posBox2   = new THREE.Vector3(columns[0], rows[1], -3800);
    const posBox3   = new THREE.Vector3(columns[0], rows[3], -3800);
    const posBox4   = new THREE.Vector3(columns[1], rows[2], -3800);
    const posBox5   = new THREE.Vector3(columns[1], rows[4], -3800);
    const posBox6   = new THREE.Vector3(columns[2], rows[0], -3800);
    const posBox7   = new THREE.Vector3(columns[2], rows[2], -3800);
    const posBox8   = new THREE.Vector3(columns[2], rows[3], -3800);
    const posBox9   = new THREE.Vector3(columns[3], rows[1], -3800);
    const posBox10  = new THREE.Vector3(columns[3], rows[2], -3800);
    const posBox11  = new THREE.Vector3(columns[3], rows[4], -3800);
    room.createBox(posBox1, sizeBox, 'img/room3/python.png', 'boxPython');
    room.createBox(posBox2, sizeBox, 'img/room3/cplusplus.png', 'boxC++');
    room.createBox(posBox3, sizeBox, 'img/room3/csharp.png', 'boxC#');
    room.createBox(posBox4, sizeBox, 'img/room3/matlab.png', 'boxMatlab');
    room.createBox(posBox5, sizeBox2, 'img/room3/c.png', 'boxC');
    room.createBox(posBox6, sizeBox, 'img/room3/java.png', 'boxJava');
    room.createBox(posBox7, sizeBox, 'img/room3/powerbi.png', 'boxPowerbi');
    room.createBox(posBox8, sizeBox, 'img/room3/vba.png', 'boxVba');
    room.createBox(posBox9, sizeBox, 'img/room3/lua.png', 'boxLua');
    room.createBox(posBox10, sizeBox, 'img/room3/vhdl.png', 'boxVhdl');
    room.createBox(posBox11, sizeBox2, 'img/room3/labview.png', 'boxLabview');

    //Papers
    const posPaper = new THREE.Vector3(1400, -5000, -3300);
    room.createPaper(posPaper, 'img/room3/description/c.png', 'paperC');
    room.createPaper(posPaper, 'img/room3/description/cplusplus.png', 'paperCplusplus');
    room.createPaper(posPaper, 'img/room3/description/csharp.png', 'paperCsharp');
    room.createPaper(posPaper, 'img/room3/description/java.png', 'paperJava');
    room.createPaper(posPaper, 'img/room3/description/labview.png', 'paperLabview');
    room.createPaper(posPaper, 'img/room3/description/lua.png', 'paperLua');
    room.createPaper(posPaper, 'img/room3/description/matlab.png', 'paperMatlab');
    room.createPaper(posPaper, 'img/room3/description/powerbi.png', 'paperPowerbi');
    room.createPaper(posPaper, 'img/room3/description/vba.png', 'paperVba');
    room.createPaper(posPaper, 'img/room3/description/vhdl.png', 'paperVhdl');

    // Buttons close
    const posButtonClose = new THREE.Vector3(1650, -5000, -3290);
    room.createButtonClose(posButtonClose, 'buttonCloseC');
    room.createButtonClose(posButtonClose, 'buttonCloseCplusplus');
    room.createButtonClose(posButtonClose, 'buttonCloseCsharp');
    room.createButtonClose(posButtonClose, 'buttonCloseJava');
    room.createButtonClose(posButtonClose, 'buttonCloseLabview');
    room.createButtonClose(posButtonClose, 'buttonCloseLua');
    room.createButtonClose(posButtonClose, 'buttonCloseMatlab');
    room.createButtonClose(posButtonClose, 'buttonClosePowerbi');
    room.createButtonClose(posButtonClose, 'buttonCloseVba');
    room.createButtonClose(posButtonClose, 'buttonCloseVhdl');

    // Library
    const libraryUrl = 'models/room3/library/library.FBX';
    const libraryRot = new THREE.Vector3(0, 0, 0);
    const libraryScale = 4;
    // const libraryTexture = new THREE.TextureLoader().load( 'models/room3/library/wood.jpg');
    // const libraryMaterial = new THREE.MeshPhongMaterial( { map: libraryTexture } );
    const libraryMaterial1 = new THREE.MeshPhongMaterial( { color: 0x1770c9 });
    const libraryMaterial2 = new THREE.MeshPhongMaterial( { color: 0x1770c9 });
    const libraryName1 = 'leftLibrary';
    const libraryName2 = 'rightLibrary';
    const libraryPos1 = new THREE.Vector3(1150, -500, -3800);
    const libraryPos2 = new THREE.Vector3(1650, -500, -3800);
    room.loadFBXModel(libraryUrl, libraryPos1, libraryRot, libraryScale, libraryMaterial1, libraryName1);
    room.loadFBXModel(libraryUrl, libraryPos2, libraryRot, libraryScale, libraryMaterial2, libraryName2);


    return [objects, materials];
}