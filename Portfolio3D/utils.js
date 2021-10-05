import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';



export function createTitle(scene, objects, position, text){
    const loaderTitles = new THREE.FontLoader();
    loaderTitles.load( 'fonts/Bangers_Regular.json', function ( font ) {

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


export function loadFBXModel(scene, manager, objects, url, position, rotation, scale, name){

    const modelLoader = new FBXLoader(manager);
    modelLoader.load(url, (model) => {
        model.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.name = name
        });       
        model.scale.setScalar(scale);
        model.position.set(position.x, position.y, position.z);
        model.rotation.set(rotation.x, rotation.y, rotation.z);
        objects[name] = model;
        scene.add(model);
    });

}


