export function startWalk(positionState, objects, camera){
    switch(positionState){
        case 0:
            camera.position.z -= 15;
            break;
        case 1:
            camera.position.z += 15;
            break;
        default:
            break;
    }
}

export function stopWalk(positionState, objects){
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