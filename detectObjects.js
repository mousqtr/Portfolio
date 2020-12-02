import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';

export function detectObjects(scene, raycaster, mouse, camera, objects, mat){
    let corridorObjects = objects["corridorObjects"]
    let room1Objects = objects["room1Objects"]

    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children, true );
    for ( let i = 0; i < intersects.length; i ++ ) {
        
        /*************************************************************/
        /*                    ARROW (Corridor)                       */
        /*************************************************************/
        if ((intersects[0].object.name == 'arrow') || (intersects[0].object.name == 'textArrow')){

            // Change the color of the arrow into red
            if (corridorObjects["arrow"] != undefined){
                corridorObjects["arrow"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0xffff00
                    }); 
                });
            }

            // Change the color of the previousText in the arrow
            if (corridorObjects["textPrevious"] != undefined){
                corridorObjects["textPrevious"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0x000000
                    }); 
                });
            }

            // Change the color of the text in the arrow
            if (corridorObjects["textNext"] != undefined){
                corridorObjects["textNext"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0x000000
                    }); 
                });
            }

        }else{
            
            // Change the color of the arrow into yellow
            if (corridorObjects["arrow"] != undefined){
                corridorObjects["arrow"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0x00003f
                    }); 
                });
            } 

            // Change the color of the previousText in the arrow
            if (corridorObjects["textPrevious"] != undefined){
                corridorObjects["textPrevious"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0xffffff
                    }); 
                });
            }

            // Change the color of the text in the arrow
            if (corridorObjects["textNext"] != undefined){
                corridorObjects["textNext"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0xffffff
                    }); 
                });
            }

        }

        /*************************************************************/
        /*                    DOOR (Corridor)                        */
        /*************************************************************/

        if (intersects[0].object.name.substring(0, 4) == 'door'){
            let num = parseInt(intersects[0].object.name.charAt(4), 10); 
            
            // Change the color of the arrow into red
            if (corridorObjects["doors"][num] != undefined){
                corridorObjects["doors"][num].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0xffff00
                    }); 
                });
            }
        }else{
            for ( let i = 0; i < 4; i ++ ) {

                // Change the color of the arrow into yellow
                if (corridorObjects["doors"][i] != undefined){
                    corridorObjects["doors"][i].traverse(function(child){
                        child.material = new THREE.MeshPhongMaterial( { 
                            color: 0x696969
                        }); 
                    });
                }
            }    
        }

        /*************************************************************/
        /*                       ARROW (room1)                       */
        /*************************************************************/

        if (intersects[0].object.name == 'arrowRoom'){
            
            // Change the color of the arrow into red
            if (room1Objects["arrow"] != undefined){
                room1Objects["arrow"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0xffff00
                    }); 
                });
            }
        }else{
            
            // Change the color of the arrow into yellow
            if (room1Objects["arrow"] != undefined){
                room1Objects["arrow"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0xff0000
                    }); 
                });
            } 
        }




    }
}