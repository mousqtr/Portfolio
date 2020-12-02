export function walkTo(positionState, objects, actions, camera){

    // Run the walk animation
    if (Object.keys(actions).length > 1){
        if(actions["stand"].isRunning()){
            actions["stand"].stop();
        }
        actions["walk"].play();
    }

    // Move the character and the camera
    switch(positionState){
        case 0:
            objects["paladin"].rotation.set(0, Math.PI, 0);
            objects["paladin"].position.z -= 10;
            camera.position.z -= 10;
            break;
        case 1:
            objects["paladin"].rotation.set(0, 0, 0);
            objects["paladin"].position.z += 10;
            camera.position.z += 10;
            break;
        default:
            break;
    }

}

export function stopWalk(positionState, objects, actions){

    // Stop the walk animation
    if (Object.keys(actions).length > 1){
        if(actions["walk"].isRunning()){
        actions["walk"].stop();
        actions["stand"].play();
        }
    }

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