import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';

export function detectObjects(scene, raycaster, mouse, camera, objects, mat){
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children, true );
    for ( let i = 0; i < intersects.length; i ++ ) {

        // Case of the upper arrow
        if ((intersects[0].object.name == 'Box') || (intersects[0].object.name == 'Box1')){
        
            // Change the color of the arrow into red
            if (objects["arrow"] != undefined){
                objects["arrow"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0xff0000
                    }); 
                });
            }

        }else{
            
            // Change the color of the arrow into yellow
            if (objects["arrow"] != undefined){
                objects["arrow"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0xffff00
                    }); 
                });
            } 
        }


        // Case of the door 
        if (intersects[0].object.name.substring(0, 4) == 'door'){
            let num = parseInt(intersects[0].object.name.charAt(4), 10); 
            
            // Change the color of the arrow into red
            if (objects["doors"][num] != undefined){
                objects["doors"][num].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0xff0000
                    }); 
                });
            }

        }else{

            for ( let i = 0; i < 4; i ++ ) {
                // Change the color of the arrow into yellow
                if (objects["doors"][i] != undefined){
                    objects["doors"][i].traverse(function(child){
                        child.material = mat;
                    });
                }
            }
            
        }


    }
}