export function walkTo(positionState, objects, actions, camera){
    console.log("ok")
    // Move the character and the camera
    switch(positionState){
        case 0:
            camera.position.z -= 15;
            // objects["character"].position.z -= 15;
            // if(actions["stand"].isRunning()){
            //     actions["stand"].stop();
            // }
            // actions["walk"].play();
            break;
        case 1:
            camera.position.z += 15;
            // objects["character"].position.z += 15;
            // if(actions["stand"].isRunning()){
            //     actions["stand"].stop();
            // }
            // actions["jogBackwards"].play();
            break;
        default:
            break;
    }
    // camera.position.z = objects["character"].position.z + 600

}

export function stopWalk(positionState, objects, actions){

    // Stop the walk animation
    // if(actions["walk"].isRunning()){
    //     actions["walk"].stop();
    //     actions["stand"].play();
    // }

    // Stop the jogBackwards animation
    // if(actions["jogBackwards"].isRunning()){
    //     actions["jogBackwards"].stop();
    //     actions["stand"].play();
    // }

    // Move the arrow
    switch(positionState){
        case 0:
            objects["arrow"].position.set(objects["arrow"].position.x, objects["arrow"].position.y, -2600);
            objects["arrow"].rotation.set(Math.PI/2, Math.PI, Math.PI/2);

            objects["textNext"].position.set(objects["textNext"].position.x, -5000, objects["textNext"].position.z);
            objects["textPrevious"].position.set(objects["textPrevious"].position.x, 170, objects["textPrevious"].position.z);

            break;
        case 1:
            objects["arrow"].position.set(objects["arrow"].position.x, objects["arrow"].position.y, -600);
            objects["arrow"].rotation.set(-Math.PI/2, Math.PI, Math.PI/2);

            objects["textNext"].position.set(objects["textNext"].position.x, 150, objects["textNext"].position.z);
            objects["textPrevious"].position.set(objects["textPrevious"].position.x, -5000, objects["textPrevious"].position.z);

            break;
        default:
            break;
    }

}