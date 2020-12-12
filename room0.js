import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { createArrow, createArrowText, createRoom, createLight, createBox } from './utils.js';

export function initRoom0(scene){

    let objects = {};
    let materials = {};

    // Light
    // const posLight = new THREE.Vector3(1400, 0, -4000);
    // createLight(scene, posLight);

    // Room
    const posRoom = new THREE.Vector3(-1400, 0, -600);
    let leftWall = 'img/room0/wall.jpg';
    let rightWall = 'img/room0/wall.jpg';
    let frontWall = 'img/room0/wall3.jpg';
    let ceiling = 'img/ceilingWhite.jpg';
    let floor = 'img/floorGrey.jpg';
    let textures = [leftWall, rightWall, frontWall, ceiling, floor];
    createRoom(scene, objects, posRoom, textures);

    // Arrow
    const posArrow = new THREE.Vector3(-1100, 400, -1500);
    const rotArrow = new THREE.Vector3(0, 0, 0);
    const scaleArrow = 120;
    const materialArrow = new THREE.MeshPhongMaterial( { color:  0x006400 } );
    createArrow(scene, objects, materials, posArrow, rotArrow, scaleArrow, materialArrow);

    // ArrowText
    const posArrowText = new THREE.Vector3(-1150, 374, -1450);
    createArrowText(scene, objects, posArrowText)

    let textureLibrary = new THREE.TextureLoader().load( 'models/room0/sofa/blue.jpg');
    const materialLibrary = new THREE.MeshPhongMaterial( {
        map: textureLibrary
    } );
    const benchLoader = new FBXLoader();
    benchLoader.load('models/room0/sofa/sofa.fbx', (plant) => {
        plant.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = materialLibrary;
        });       
        plant.scale.setScalar(4);
        plant.position.set(-1380, -500, -1350);
        plant.rotation.set(0, 0, 0);
        scene.add(plant);
    });

    // Chair
    let chairTexture = new THREE.TextureLoader().load( 'models/room0/chair/black.jpg');
    const chairMaterial = new THREE.MeshPhongMaterial( {
        map: chairTexture
    } );
    const chairLoader = new FBXLoader();
    chairLoader.load('models/room0/chair/chair.fbx', (chair) => {
        chair.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = chairMaterial;
        });      
        chair.scale.setScalar(4); 
        chair.position.set(-1100, -550, -1200);
        chair.rotation.set(-Math.PI/2, 0, Math.PI);
        scene.add(chair);
    });

    // Shelfs
    let shelfGeo = new THREE.BoxGeometry(500, 30, 300);
    let shelftexture = new THREE.TextureLoader().load( 'models/room0/chair/black.jpg' );
    let shelfMat = new THREE.MeshPhongMaterial( { map: shelftexture } );
    let shelf = new THREE.Mesh( shelfGeo, shelfMat );
    shelf.position.set(-1600, 300, -1430);
    scene.add(shelf);

    let shelf2Geo = new THREE.BoxGeometry(500, 30, 300);
    let shelf2texture = new THREE.TextureLoader().load( 'models/room0/chair/black.jpg' );
    let shelf2Mat = new THREE.MeshPhongMaterial( { map: shelf2texture } );
    let shelf2 = new THREE.Mesh( shelf2Geo, shelf2Mat );
    shelf2.position.set(-1600, 70, -1430);
    scene.add(shelf2);

    // Desk
    const deskMaterial = new THREE.MeshPhongMaterial( { color: 0x7f7f7f } );
    const deskLoader = new FBXLoader();
    deskLoader.load('models/room0/desk/desk.fbx', (desk) => {
        desk.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = deskMaterial;
        });      
        desk.scale.setScalar(0.8); 
        desk.position.set(-1100, -500, -1900);
        desk.rotation.set(Math.PI, Math.PI/2, Math.PI);
        scene.add(desk);
    });

      // Boxes
      const posBox1 = new THREE.Vector3(-1100, -110, -1400);
      const posBox2 = new THREE.Vector3(-1470, 165, -1400);
      const posBox3 = new THREE.Vector3(-1700, 400, -1400);
      const posBox4 = new THREE.Vector3(-1650, -170, -1350);
      const sizeBox = new THREE.Vector3(150, 150, 150);
      createBox(scene, objects, posBox1, sizeBox, 'img/room0/computing.png', 'boxComputing');
      createBox(scene, objects, posBox2, sizeBox, 'img/room0/group.png', 'boxAsso');
      createBox(scene, objects, posBox3, sizeBox, 'img/room0/bike.png', 'boxSport');
      createBox(scene, objects, posBox4, sizeBox, 'img/room0/me.png', 'boxMe');


    return [objects, materials];
}