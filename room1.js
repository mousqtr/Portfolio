import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {TGALoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/TGALoader.js';

export function loadRoom1(scene){

    let objects = {};

    // Hemisphere Light
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set(1400, 0, 0);
    scene.add( hemiLight );

    // Load the room
    let roomMaterialArray = [];
    let roomTexture_ft = new THREE.TextureLoader().load( 'img/wall2.jpg');
    let roomTexture_bk = new THREE.TextureLoader().load( 'img/wall2.jpg');
    let roomTexture_up = new THREE.TextureLoader().load( 'img/wall3.jpg');
    let roomTexture_dn = new THREE.TextureLoader().load( 'img/parquet.jpg');
    let roomTexture_rt = new THREE.TextureLoader().load( 'img/wall2.jpg');
    let roomTexture_lf = new THREE.TextureLoader().load( 'img/wall2.jpg');

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
    room.position.set(1400, 0, -600)
    scene.add(room);  
    objects["room"] = room

    // Load boxes
    let box1Geo = new THREE.BoxGeometry( 150, 150, 150);
    let texture1 = new THREE.TextureLoader().load( 'img/cpe2.jpg');
    let box1Mat = new THREE.MeshPhongMaterial( { map: texture1 } );
    let box1 = new THREE.Mesh( box1Geo, box1Mat );
    box1.position.set(1200, -110, -1400)
    scene.add(box1);
    objects["box1"] = box1

    let boxGeo2 = new THREE.BoxGeometry( 150, 150, 150);
    let texture2 = new THREE.TextureLoader().load( 'img/charlemagne.jpg');
    let boxMat2 = new THREE.MeshPhongMaterial( { map: texture2 } );
    let box2 = new THREE.Mesh( boxGeo2, boxMat2 );
    box2.position.set(1400, -110, -1400)
    scene.add(box2);
    objects["box2"] = box2

    let boxGeo3 = new THREE.BoxGeometry( 150, 150, 150);
    let texture3 = new THREE.TextureLoader().load( 'img/henri.jpg');
    let boxMat3 = new THREE.MeshPhongMaterial( { map: texture3 } );
    let box3 = new THREE.Mesh( boxGeo3, boxMat3 );
    box3.position.set(1600, -110, -1400)
    scene.add( box3 );
    objects["box3"] = box3 

    // Load desk
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
        objects["desk"] = desk 
    });

    return objects;
}
