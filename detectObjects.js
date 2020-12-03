import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';

export function detectObjects(scene, raycaster, mouse, camera, objects, mat){
    let corridorObjects = objects["corridorObjects"]
    let room1Objects = objects["room1Objects"]

    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children, true );
    for ( let i = 0; i < intersects.length; i ++ ) {

        /*************************************************************/
        /*                 ARROW + TEXTS (Corridor)                  */
        /*************************************************************/

        changeArrowAndText(intersects, corridorObjects["arrow"], 'arrow', corridorObjects["textNext"], 'textArrow');
        changeArrowAndText(intersects, corridorObjects["arrow"], 'arrow', corridorObjects["textPrevious"], 'textArrow');

        /*************************************************************/
        /*                    DOOR (Corridor)                        */
        /*************************************************************/

        const color1 = new THREE.Color( 0xffff00 );
        const color2 = new THREE.Color( 0x696969 );
        changeColor(intersects, corridorObjects["doors"][0], 'door0', color1, color2)
        changeColor(intersects, corridorObjects["doors"][1], 'door1', color1, color2)
        changeColor(intersects, corridorObjects["doors"][2], 'door2', color1, color2)
        changeColor(intersects, corridorObjects["doors"][3], 'door3', color1, color2)

        /*************************************************************/
        /*                   ARROW + TEXT(room1)                     */
        /*************************************************************/

        changeArrowAndText(intersects, room1Objects["arrow"], 'arrowRoom', room1Objects["textArrowRoom"], 'textArrowRoom')

        /*************************************************************/
        /*                       Boxes (room1)                       */
        /*************************************************************/

        changeOpacity(intersects, room1Objects["boxCpe"], 'boxCpe', 0.5);
        changeOpacity(intersects, room1Objects["boxCharlemagne"], 'boxCharlemagne', 0.5);
        changeOpacity(intersects, room1Objects["boxHenri"], 'boxHenri', 0.5);

    }
}

function changeColor(intersects, object, name, color1, color2){

    if (intersects[0].object.name == name){

        // Change the color of object into color1
        if (object != undefined){
            object.traverse(function(child){
                child.material.color = color1
            });
        }
    }else{

        // Change the color of object into color2
        if (object != undefined){
            object.traverse(function(child){
                child.material.color = color2 
            });
        }
        
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


function changeArrowAndText(intersects, arrow, nameArrow, text, nameText){
    if ((intersects[0].object.name == nameArrow) || (intersects[0].object.name == nameText)){
            
        // Change the color of arrow
        if (arrow != undefined){
            arrow.traverse(function(child){
                child.material = new THREE.MeshPhongMaterial( { 
                    color: 0xffff00
                }); 
            });
        }

        // Change the color of object2
        if (text != undefined){
            text.traverse(function(child){
                child.material = new THREE.MeshPhongMaterial( { 
                    color: 0x000000
                }); 
            });
        }

    }else{
        
        // Change the color of object1
        if (arrow != undefined){
            arrow.traverse(function(child){
                child.material = new THREE.MeshPhongMaterial( { 
                    color: 0x00008b
                }); 
            });
        } 

        // Change the color of object2
        if (text != undefined){
            text.traverse(function(child){
                child.material = new THREE.MeshPhongMaterial( { 
                    color: 0xffffff
                }); 
            });
        }

    }
}