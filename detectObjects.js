import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';

export function detectObjects(scene, raycaster, mouse, camera, objects, materials){
    let corridorObjects = objects["corridorObjects"]
    let room0Objects = objects["room0Objects"]
    let room1Objects = objects["room1Objects"]
    let room2Objects = objects["room2Objects"]
    let room3Objects = objects["room3Objects"]

    let corridorMaterials = materials["corridorMaterials"];
    let room0Materials = materials["room0Materials"];
    let room1Materials = materials["room1Materials"];
    let room2Materials = materials["room2Materials"];
    let room3Materials = materials["room3Materials"];

    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children, true );
    for ( let i = 0; i < intersects.length; i ++ ) {

        // Arrow + text (Corridor) 
        changeArrowAndText(intersects, corridorObjects["arrow"], 'arrow', corridorObjects["textNext"], 'textArrow', corridorMaterials["arrow"]);
        changeArrowAndText(intersects, corridorObjects["arrow"], 'arrow', corridorObjects["textPrevious"], 'textArrow', corridorMaterials["arrow"]);

        // Door (Corridor)
        const color1 = new THREE.Color( 0xffff00 );
        const color2 = new THREE.Color( 0x696969 );
        changeColor(intersects, corridorObjects["doors"][0], 'door0', color1, color2)
        changeColor(intersects, corridorObjects["doors"][1], 'door1', color1, color2)
        changeColor(intersects, corridorObjects["doors"][2], 'door2', color1, color2)
        changeColor(intersects, corridorObjects["doors"][3], 'door3', color1, color2)

        // Arrow + text
        changeArrowAndText(intersects, room0Objects["arrow"], 'arrowRoom', room0Objects["textArrowRoom"], 'textArrowRoom', room0Materials["arrow"])
        changeArrowAndText(intersects, room1Objects["arrow"], 'arrowRoom', room1Objects["textArrowRoom"], 'textArrowRoom', room1Materials["arrow"])
        changeArrowAndText(intersects, room2Objects["arrow"], 'arrowRoom', room2Objects["textArrowRoom"], 'textArrowRoom', room2Materials["arrow"])
        changeArrowAndText(intersects, room3Objects["arrow"], 'arrowRoom', room3Objects["textArrowRoom"], 'textArrowRoom', room3Materials["arrow"])

        // Boxes (room1)
        changeOpacity(intersects, room1Objects["boxCpe"], 'boxCpe', 0.5);
        changeOpacity(intersects, room1Objects["boxCharlemagne"], 'boxCharlemagne', 0.5);
        changeOpacity(intersects, room1Objects["boxHenri"], 'boxHenri', 0.5);

        // Boxes (room3)
        changeOpacity(intersects, room3Objects["boxPython"], 'boxPython', 0.5);
        changeOpacity(intersects, room3Objects["boxC++"], 'boxC++', 0.5);
        changeOpacity(intersects, room3Objects["boxC#"], 'boxC#', 0.5);
        changeOpacity(intersects, room3Objects["boxC"], 'boxC', 0.5);
        changeOpacity(intersects, room3Objects["boxLua"], 'boxLua', 0.5);
        changeOpacity(intersects, room3Objects["boxJava"], 'boxJava', 0.5);
        changeOpacity(intersects, room3Objects["boxMatlab"], 'boxMatlab', 0.5);
        changeOpacity(intersects, room3Objects["boxVhdl"], 'boxVhdl', 0.5);
        changeOpacity(intersects, room3Objects["boxPowerbi"], 'boxPowerbi', 0.5);
        changeOpacity(intersects, room3Objects["boxVba"], 'boxVba', 0.5);
        changeOpacity(intersects, room3Objects["boxLabview"], 'boxLabview', 0.5);

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

// function changeScale(intersects, object, name){

//     // When the mouse hovers it
//     if (intersects[0].object.name == name){
        
//         if (object != undefined){
//             object.scale.set(1.3, 1.3, 1.3);
//         }

//     }else{
        
//         if (object != undefined){
//             object.scale.set(1, 1, 1);
//         }

//     }    
// }


function changeArrowAndText(intersects, arrow, nameArrow, text, nameText, materialArrow){
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
                child.material = materialArrow;
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