import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { createArrow, createArrowText, createRoom, createLight, createBox } from './utils.js';

export function initRoom3(scene){

    let objects = {};
    let materials = {};

    // Light
    // const posLight = new THREE.Vector3(1400, 0, -4000);
    // createLight(scene, posLight);

    // Room
    const posRoom = new THREE.Vector3(1400, 0, -3000);
    let leftWall = 'img/room3/wall.png';
    let rightWall = 'img/room3/wall.png';
    let frontWall = 'img/room3/wall.png';
    let ceiling = 'img/ceilingWhite.jpg';
    let floor = 'img/floorGrey.jpg';
    let textures = [leftWall, rightWall, frontWall, ceiling, floor];
    createRoom(scene, objects, posRoom, textures)

    // Arrow
    const posArrow = new THREE.Vector3(1100, 400, -3900);
    const rotArrow = new THREE.Vector3(0, Math.PI, 0);
    const scaleArrow = 120;
    const materialArrow = new THREE.MeshPhongMaterial( { color:  0xff0000 } );
    createArrow(scene, objects, materials, posArrow, rotArrow, scaleArrow, materialArrow);

    // ArrowText
    const posArrowText = new THREE.Vector3(1050, 374, -3850);
    createArrowText(scene, objects, posArrowText)

    // Boxes
    let rows = [140, 0, -140, -280, -397];
    let columns = [1110, 1300, 1500, 1700]
    const sizeBox = new THREE.Vector3(110, 110, 110);
    const sizeBox2 = new THREE.Vector3(110, 100, 110);

    const posBox1 = new THREE.Vector3(columns[0], rows[0], -3800);
    const posBox2 = new THREE.Vector3(columns[0], rows[1], -3800);
    const posBox3 = new THREE.Vector3(columns[0], rows[3], -3800);
    const posBox4 = new THREE.Vector3(columns[1], rows[2], -3800);
    const posBox5 = new THREE.Vector3(columns[1], rows[4], -3800);
    const posBox6 = new THREE.Vector3(columns[2], rows[0], -3800);
    const posBox7 = new THREE.Vector3(columns[2], rows[2], -3800);
    const posBox8 = new THREE.Vector3(columns[2], rows[3], -3800);
    const posBox9 = new THREE.Vector3(columns[3], rows[1], -3800);
    const posBox10 = new THREE.Vector3(columns[3], rows[2], -3800);
    const posBox11 = new THREE.Vector3(columns[3], rows[4], -3800);

    createBox(scene, objects, posBox1, sizeBox, 'img/room3/python.png', 'boxPython');
    createBox(scene, objects, posBox2, sizeBox, 'img/room3/cplusplus.png', 'boxC++');
    createBox(scene, objects, posBox3, sizeBox, 'img/room3/csharp.png', 'boxC#');
    createBox(scene, objects, posBox4, sizeBox, 'img/room3/c.png', 'boxC');
    createBox(scene, objects, posBox5, sizeBox2, 'img/room3/matlab.png', 'boxLua');
    createBox(scene, objects, posBox6, sizeBox, 'img/room3/java.png', 'boxJava');
    createBox(scene, objects, posBox7, sizeBox, 'img/room3/powerbi.png', 'boxMatlab');
    createBox(scene, objects, posBox8, sizeBox, 'img/room3/vba.png', 'boxVhdl');
    createBox(scene, objects, posBox9, sizeBox, 'img/room3/lua.png', 'boxPowerbi');
    createBox(scene, objects, posBox10, sizeBox, 'img/room3/vhdl.png', 'boxVba');
    createBox(scene, objects, posBox11, sizeBox2, 'img/room3/labview.png', 'boxLabview');

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