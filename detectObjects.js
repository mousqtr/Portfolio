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

        if ((intersects[0].object.name == 'arrowRoom') || (intersects[0].object.name == 'textArrowRoom')){
            
            // Change the color of the arrow into red
            if (room1Objects["arrow"] != undefined){
                room1Objects["arrow"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0xffff00
                    }); 
                });
            }

            // Change the color of the textArrowRoom in the arrow
            if (room1Objects["textArrowRoom"] != undefined){
                room1Objects["textArrowRoom"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0x000000
                    }); 
                });
            }

        }else{
            
            // Change the color of the arrow into yellow
            if (room1Objects["arrow"] != undefined){
                room1Objects["arrow"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0x00008b
                    }); 
                });
            } 

            // Change the color of the textArrowRoom in the arrow
            if (room1Objects["textArrowRoom"] != undefined){
                room1Objects["textArrowRoom"].traverse(function(child){
                    child.material = new THREE.MeshPhongMaterial( { 
                        color: 0xffffff
                    }); 
                });
            }

        }

        /*************************************************************/
        /*                       BoxCpe (room1)                       */
        /*************************************************************/
        // let str = 'boxCpe'
        // if (intersects[0].object.name == str){
            
        //     // Change the color of the arrow into red
        //     if (room1Objects[str] != undefined){
        //         room1Objects[str].traverse(function(child){
        //             child.material.transparent = true;
        //             child.material.opacity = 0.5; 
        //         });
        //     }

        // }else{
            
        //     // Change the color of the arrow into yellow
        //     if (room1Objects[str] != undefined){
        //         room1Objects[str].traverse(function(child){
        //             child.material.transparent = false;
        //         });
        //     } 

        // }

        changeOpacity(intersects, room1Objects["boxCpe"], 'boxCpe', 0.5);
        changeOpacity(intersects, room1Objects["boxCharlemagne"], 'boxCharlemagne', 0.5);
        changeOpacity(intersects, room1Objects["boxHenri"], 'boxHenri', 0.5);

    }
}

function changeOpacity(intersects, object, name, opacity){

    // When the mouse hovers it
    if (intersects[0].object.name == name){
            
        if (object != undefined){
            object.traverse(function(child){
                child.material.transparent = true;
                child.material.opacity = opacity; 
            });
        }

    }else{
        
        // Change the color of the arrow into yellow
        if (object != undefined){
            object.traverse(function(child){
                child.material.transparent = false;
            });
        } 

    }    
}