import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';


export function createRoom(scene, objects, position, textures){
    let roomMaterialArray = [];

    let leftWall = textures[0];
    let rightWall = textures[1];
    let frontWall = textures[2];
    let backWall = textures[0];
    let ceiling =  textures[3];
    let floor = textures[4];

    let roomTexture_ft = new THREE.TextureLoader().load( leftWall );
    let roomTexture_bk = new THREE.TextureLoader().load( rightWall );
    let roomTexture_up = new THREE.TextureLoader().load( ceiling );
    let roomTexture_dn = new THREE.TextureLoader().load( floor );
    let roomTexture_rt = new THREE.TextureLoader().load( backWall );
    let roomTexture_lf = new THREE.TextureLoader().load( frontWall );

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
    room.position.set(position.x, position.y, position.z);
    scene.add(room);  
    objects["room"] = room;
}

export function createLight(scene, position){
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set(position.x, position.y, position.z);
    scene.add( hemiLight );
}

export function createArrow(scene, objects, materials, position, rotation, scale, material){
    
    const arrowLoader = new FBXLoader();
    arrowLoader.load('models/arrow.fbx', (arrow) => {
        arrow.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = material;
            materials["arrow"] = material;
            child.name = 'arrowRoom';
        });       
        arrow.scale.setScalar(scale);
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

    // var geo = new THREE.EdgesGeometry( box.geometry );
    // var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 1 } );
    // var wireframe = new THREE.LineSegments( geo, mat );
    // wireframe.renderOrder = 1;
    // box.add( wireframe );
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


export function createTitle(scene, objects, position, text){
    const loaderTitles = new THREE.FontLoader();
    loaderTitles.load( 'fonts/Bebas_Neue_Regular.json', function ( font ) {

        const textGeometry = new THREE.TextGeometry( text, {
            font: font, size: 60, height: 2
        });
        
        var textMaterial = new THREE.MeshPhongMaterial( { 
            color: 0xffff00
        });
        
        var mesh = new THREE.Mesh( textGeometry, textMaterial );

        
        mesh.position.set(position.x, position.y, position.z)
        scene.add( mesh );
     
        if (objects["doorTexts"] != undefined){
            objects["doorTexts"].push(mesh)
        }else{
            objects["doorTexts"] = [mesh];
        }

    } );
    
}


