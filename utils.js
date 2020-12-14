import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';



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


