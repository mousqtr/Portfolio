import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';


export function createRoom(scene, objects, position, textures){
    let roomMaterialArray = [];
    let roomTexture_ft = new THREE.TextureLoader().load( textures[0] );
    let roomTexture_bk = new THREE.TextureLoader().load( textures[0] );
    let roomTexture_up = new THREE.TextureLoader().load( textures[2] );
    let roomTexture_dn = new THREE.TextureLoader().load( textures[3] );
    let roomTexture_rt = new THREE.TextureLoader().load( textures[0] );
    let roomTexture_lf = new THREE.TextureLoader().load( textures[1] );

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
    room.position.set(position.x, position.y, position.z)
    scene.add(room);  
    objects["room"] = room
}

export function createLight(scene, position){
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set(position.x, position.y, position.z);
    scene.add( hemiLight );
}

export function createArrow(scene, objects, materials, position, rotation, material){
    
    const arrowLoader = new FBXLoader();
    arrowLoader.load('models/arrow.fbx', (arrow) => {
        arrow.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = material;
            materials["arrow"] = material;
            child.name = 'arrowRoom';
        });       
        arrow.scale.setScalar(120);
        arrow.position.set(position.x, position.y, position.z);
        arrow.rotation.set(rotation.x, rotation.y, rotation.z);
        objects["arrow"] = arrow;
        scene.add(arrow);
    });
}

export function createArrowText(scene, objects, position){

    const loaderText = new THREE.FontLoader();
    loaderText.load( 'fonts/Bebas_Neue_Regular.json', function ( font ) {

        const textGeometry = new THREE.TextGeometry( 'Sortir', {
            font: font, size: 38, height: 2,
        });
        
        var textMaterial = new THREE.MeshPhongMaterial( { 
            color: 0xffffff, 
        });
        
        var mesh = new THREE.Mesh( textGeometry, textMaterial );

        mesh.traverse(child => {
            child.name = 'textArrowRoom'
        } );

        mesh.position.set(position.x, position.y, position.z);
        objects["textArrowRoom"] = mesh;
        
        scene.add( mesh );
            
    });
}

export function createBox(scene, objects, position, size, textureImg, objectName){
    let boxGeo = new THREE.BoxGeometry( size.x, size.y, size.z);
    let texture = new THREE.TextureLoader().load( textureImg );
    let boxMat = new THREE.MeshPhongMaterial( { map: texture } );
    let box = new THREE.Mesh( boxGeo, boxMat );
    box.traverse(child => {
        child.name = objectName
    } );
    box.position.set(position.x, position.y, position.z)
    scene.add(box);
    objects[objectName] = box
}

export function createPaper(scene, objects, paperImg, paperName){
    const textureBox1 = new THREE.TextureLoader().load(paperImg);
    const geometry = new THREE.PlaneGeometry( 600, 900 );
    const material = new THREE.MeshBasicMaterial( {map: textureBox1} );
    const plane = new THREE.Mesh( geometry, material );
    plane.position.set(1400, -5000, -900);
    objects[paperName] = plane;
    scene.add( plane )
}

export function createButtonClose(scene, objects, buttonName){
    const textureClose = new THREE.TextureLoader().load('img/room1/cross.png');
    const geometryClose = new THREE.PlaneGeometry( 50, 50 );
    const materialClose = new THREE.MeshBasicMaterial( { map: textureClose} );
    const buttonClose = new THREE.Mesh( geometryClose, materialClose );
    buttonClose.traverse(child => {
        child.name = buttonName
    } );
    buttonClose.position.set(1650, -5000, -890);
    objects[buttonName] = buttonClose;
    scene.add( buttonClose );
}