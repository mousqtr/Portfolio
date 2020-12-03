import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

export function createArrow(scene, objects, position, rotation){
    
    const arrowLoader = new FBXLoader();
    arrowLoader.load('models/arrow.fbx', (arrow) => {
        arrow.traverse(child => {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshPhongMaterial( { 
            color: 0x00008b
        } );
        child.name = 'arrowRoom';
        });       
        arrow.scale.setScalar(120);
        arrow.position.set(position.x, position.y, position.z);
        arrow.rotation.set(rotation.x, rotation.y, rotation.z);
        arrow.name = "arrow";
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