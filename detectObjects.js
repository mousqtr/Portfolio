import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';

export function detectArrow(scene, raycaster, mouse, camera, objects){
    raycaster.setFromCamera( mouse, camera );
        const intersects = raycaster.intersectObjects( scene.children, true );
        for ( let i = 0; i < intersects.length; i ++ ) {

            // Case of the upper arrow
            if ((intersects[0].object.name == 'Box') || (intersects[0].object.name == 'Box1')){
            
                // Change the color of the arrow into red
                if (Object.keys(objects).length > 1){
                    objects["arrow"].traverse(function(child){
                        child.material = new THREE.MeshPhongMaterial( { 
                            color: 0xff0000
                        }); 
                    });
                }

                }else{
                
                // Change the color of the arrow into yellow
                if (Object.keys(objects).length > 1){
                    objects["arrow"].traverse(function(child){
                        child.material = new THREE.MeshPhongMaterial( { 
                            color: 0xffff00
                        }); 
                    });
                } 
            }
        }
}