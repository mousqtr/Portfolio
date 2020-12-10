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
    let leftWall = 'img/room2/wall.jpg';
    let rightWall = 'img/room2/wall.jpg';
    let frontWall = 'img/room2/wall2.jpg';
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

    // Table
    const tableMaterial = new THREE.MeshPhongMaterial( { 
        color: 0x2b1d0e, 
    });
    const tableLoader = new FBXLoader();
    tableLoader.load('models/table_pro.fbx', (table) => {
        table.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = tableMaterial;
        });      
        table.scale.setScalar(0.05); 
        table.position.set(-1400, -550, -3500);
        table.rotation.set(0, Math.PI/2, 0);
        scene.add(table);
        objects["table"] = table; 
    });

    let chairLibrary = new THREE.TextureLoader().load( 'img/room2/black.jpg');
    const chairMaterial = new THREE.MeshPhongMaterial( {
        map: chairLibrary
    } );
    let chairs = [];
    for ( let i = 0; i < 4; i ++ ) {
        const loaderChair = new FBXLoader();
        loaderChair.load('models/chair_low.fbx', (chair) => {

            chair.traverse(child => {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material = chairMaterial;
            });
            chair.scale.setScalar(2.4);
            switch(i){
                case 0:
                    chair.position.set(-1600, -450, -3700);
                    chair.rotation.set(0, Math.PI/2, 0);
                    break;
                case 1:
                    chair.position.set(-1200, -450, -3700);
                    chair.rotation.set(0, -Math.PI/2, 0);
                    break;
                case 2:
                    chair.position.set(-1600, -450, -3400);
                    chair.rotation.set(0, Math.PI/2, 0);
                    break;
                case 3:
                    chair.position.set(-1200, -450, -3400);
                    chair.rotation.set(0, -Math.PI/2, 0);
                    break;
                default:
                    break;
            }
            
            scene.add(chair);
            chairs.push(chair)
        });
    }
    objects["chairs"] = chairs;


    // TV
    const materialTV = new THREE.MeshPhongMaterial( { color:  0x000000 } );
    const loaderTV = new FBXLoader();
    loaderTV.load('models/tv.fbx', (tv) => {
        tv.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = materialTV;
        });
        tv.scale.setScalar(0.01);
        tv.position.set(-1400, 100, -3900);
        tv.rotation.set(0, 0, 0);
        scene.add(tv);
        objects["tv"] = tv; 
    });

    let shelfGeo = new THREE.BoxGeometry(495, 290, 5);
    let shelftexture = new THREE.TextureLoader().load( 'img/room2/dashboard.jpg' );
    let shelfMat = new THREE.MeshPhongMaterial( { map: shelftexture } );
    let shelf = new THREE.Mesh( shelfGeo, shelfMat );
    shelf.position.set(-1400, 120, -3920);
    scene.add(shelf);

    return [objects, materials];
}