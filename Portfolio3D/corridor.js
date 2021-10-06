import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { createTitle } from './utils.js';

export function initCorridor(scene, manager){

    let objects = {};
    let materials = {};
    let lights = {};

    // Hemisphere Light
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x555555 );
    hemiLight.position.set(0, 100, 0);
    scene.add( hemiLight );
    lights["hemiLight"] = hemiLight;

    // Directional Light
    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set(0, 300, 300);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = - 100;
    dirLight.shadow.camera.left = - 120;
    dirLight.shadow.camera.right = 120;
    scene.add( dirLight );
    lights["dirLight"] = dirLight;

    // Corridor
    let corridorMaterialArray = [];
    let texture_ft = new THREE.TextureLoader(manager).load( 'img/corridor/wall.png');
    let texture_bk = new THREE.TextureLoader(manager).load( 'img/corridor/wall.png');
    let texture_up = new THREE.TextureLoader(manager).load( 'img/ceilingWhite.jpg');
    let texture_dn = new THREE.TextureLoader(manager).load( 'img/floorGrey.jpg');
    let texture_rt = new THREE.TextureLoader(manager).load( 'img/corridor/wall.png');
    let texture_lf = new THREE.TextureLoader(manager).load( 'img/corridor/wall.png');

    texture_dn.wrapS = texture_dn.wrapT = THREE.RepeatWrapping;
    texture_up.wrapS = texture_up.wrapT = THREE.RepeatWrapping;
    texture_ft.wrapS = texture_ft.wrapT = THREE.RepeatWrapping;
    texture_bk.wrapS = texture_bk.wrapT = THREE.RepeatWrapping;

    texture_dn.repeat.y = 5;
    texture_up.repeat.y = 5;
    texture_ft.repeat.x = 5;
    texture_bk.repeat.x = 5;

    corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
    corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
    corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
    corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
    corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
    corridorMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

    for (let i = 0; i < 6; i++) {
        corridorMaterialArray[i].side = THREE.BackSide;
    }
        
    let corridorGeo = new THREE.BoxGeometry( 1000, 1000, 7000);
    let corridor = new THREE.Mesh( corridorGeo, corridorMaterialArray );
    corridor.position.set(0, 0, -3000)
    scene.add( corridor );  
    objects["corridor"] = corridor;

    // Doors
    let doors = [];
    let doorPosX, doorPosZ;
    for ( let i = 0; i < 4; i ++ ) {
        const loaderDoor = new FBXLoader(manager);
        loaderDoor.load('models/corridor/door/door.fbx', (door) => {
            
            door.traverse(child => {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material = new THREE.MeshPhongMaterial( { 
                    color: 0x696969
                }); 
                materials["door"] = child.material;
                child.name = "door" + i.toString();
            });
            door.scale.setScalar(0.51);

            if (i % 2 == 0){
                doorPosX = -500;
                door.rotation.set(0, Math.PI/2, 0);
            }else{
                doorPosX = 500;
                door.rotation.set(0, -Math.PI/2, 0);
            }
        
            if (i < 2){
                doorPosZ = 0.67 * window.innerWidth - 2333;
            }else{
                doorPosZ = 0.67 * window.innerWidth - 4333;
            }

            door.position.set(doorPosX, -185, doorPosZ);
            scene.add(door);
            doors.push(door);
        });
    }
    objects["doors"] = doors;

    // Titles
    let posX_left = -475;
    let posX_right = 170;
    let posZ_1 = 0.67 * window.innerWidth - 2233;
    let posZ_2 = 0.67 * window.innerWidth - 4233;
    let posTextProfil = new THREE.Vector3(posX_left, 150, posZ_1);
    let posTextFormation = new THREE.Vector3(posX_right, 150, posZ_1);
    let posTextExperiences = new THREE.Vector3(posX_left, 150, posZ_2);
    let posTextProjets = new THREE.Vector3(posX_right, 150, posZ_2);
    createTitle(scene, objects, posTextProfil, 'Profil');
    createTitle(scene, objects, posTextFormation, 'Formation');
    createTitle(scene, objects, posTextExperiences, 'Experiences');
    createTitle(scene, objects, posTextProjets, 'Projets');

    // Top arrow
    const arrowLoader = new FBXLoader(manager);
    arrowLoader.load('models/common/arrow.fbx', (arrow) => {
        arrow.traverse(child => {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshPhongMaterial( { 
            color: 0x400000
        } );
        materials["arrow"] = child.material;
        child.name = 'arrow';
        });       
        arrow.scale.setScalar(200);
        arrow.position.set(0, 200, -600);
        arrow.rotation.set(-Math.PI/2, Math.PI, Math.PI/2);
        arrow.name = "arrow";
        objects["arrow"] = arrow;
        scene.add(arrow);
    });

    // Texts in arrow
    let texts = ['Suivant', 'Precedent']
    for ( let i = 0; i < 2; i ++ ) {
        const loaderText = new THREE.FontLoader();
        loaderText.load( 'fonts/Bangers_Regular.json', function ( font ) {

            const textGeometry = new THREE.TextGeometry( texts[i], {
                font: font, size: 17, height: 2,
            });
            
            var textMaterial = new THREE.MeshPhongMaterial( { 
                color: 0xffffff, 
            });
            
            var mesh = new THREE.Mesh( textGeometry, textMaterial );

            mesh.traverse(child => {
                child.name = 'textArrow'
            } );

            switch(i){
                case 0:
                    mesh.position.set(-29, 150, -500);
                    objects["textNext"] = mesh;
                    break;
                case 1:
                    mesh.position.set(-38, -5000, -2500);
                    objects["textPrevious"] = mesh;
                    break;
            }
            
            scene.add( mesh );
            
        } );
    }
    
    // Shelf
    const bookShelfGeo = new THREE.BoxGeometry(650, 850, 50);
    const bookShelfTexture = new THREE.TextureLoader(manager).load( 'img/corridor/shelf.png' );
    const bookShelfMat = new THREE.MeshPhongMaterial( { map: bookShelfTexture } );
    const bookShelf = new THREE.Mesh( bookShelfGeo, bookShelfMat );
    bookShelf.position.set(0, -100, -6400);
    objects["bookShelf"] = bookShelf;
    scene.add(bookShelf);

   // Doormats
    const doormatUrl1 = 'img/corridor/profil.png';
    const doormatUrl2 = 'img/corridor/formation.png';
    const doormatUrl3 = 'img/corridor/experiences.png';
    const doormatUrl4 = 'img/corridor/projets.png';
    const doormatUrls = [doormatUrl1, doormatUrl2, doormatUrl3, doormatUrl4]
    const doormatXPositions = [-360, 360, -360, 360];
    const doormatZPositions = [2300, 2300, 4300, 4300];
    const doormatRotations = [0, Math.PI, 0, Math.PI]
    for ( let i = 0; i < 4; i ++ ) {
        const doormatName = 'doormat'.concat(i.toString());
        const doormatUrl = doormatUrls[i]
        const doormatPosZ = 0.67 * window.innerWidth - doormatZPositions[i];
        const doormatPos = new THREE.Vector3(doormatXPositions[i], -480, doormatPosZ);
        const doormatRot = new THREE.Vector3(0, doormatRotations[i], 0);
        createDoorMat(scene, manager, objects, doormatUrl, doormatPos, doormatRot, doormatName);
    }

    // Wall Lamp
    const wallLampUrl = 'models/corridor/lampwall/lamp_wall.fbx';
    const wallLampXPositions = [-400, 400, -400, 400];
    const wallLampZPositions = [2440, 2800, 4440, 4800];
    const wallLampRotations = [0, Math.PI, 0, Math.PI];
    const wallLampScale = 0.2;
    for ( let i = 0; i < 4; i ++ ) {
        const wallLampName = 'wallLamp'.concat(i.toString());
        const wallLampPosZ = 0.67 * window.innerWidth - wallLampZPositions[i];
        const wallLampPos = new THREE.Vector3(wallLampXPositions[i], 50, wallLampPosZ);
        const wallLampRot = new THREE.Vector3(0, wallLampRotations[i], 0);
        createWallLamps(scene, manager, objects, wallLampUrl, wallLampPos, wallLampRot, wallLampScale, wallLampName);
    }

    // Painting
    const paintingGeo = new THREE.BoxGeometry(10, 400, 700);
    const paintingTexture = new THREE.TextureLoader(manager).load( 'img/corridor/air.jpg' );
    const paintingMat = new THREE.MeshPhongMaterial( { map: paintingTexture } );
    const painting = new THREE.Mesh( paintingGeo, paintingMat );
    let paintingPosZ = 0.67 * window.innerWidth - 3300;
    painting.position.set(-450, 100, paintingPosZ);
    objects["painting"] = painting;
    scene.add(painting);

    // Painting 2
    const painting2Geo = new THREE.BoxGeometry(10, 400, 700);
    const painting2Texture = new THREE.TextureLoader(manager).load( 'img/corridor/city.jpg' );
    const painting2Mat = new THREE.MeshPhongMaterial( { map: painting2Texture } );
    const painting2 = new THREE.Mesh( painting2Geo, painting2Mat );
    let painting2PosZ = 0.67 * window.innerWidth - 3300;
    painting2.position.set(450, 100, painting2PosZ);
    objects["painting2"] = painting2;
    scene.add(painting2);

    return [objects, materials, lights];

}


function createDoorMat(scene, manager, objects, textureUrl, position, rotation, name){
    const doormatGeo = new THREE.BoxGeometry(200, 10, 380);
    const doormatTexture = new THREE.TextureLoader(manager).load( textureUrl );
    const doormatMat = new THREE.MeshPhongMaterial( { map: doormatTexture } );
    const doormat = new THREE.Mesh( doormatGeo, doormatMat );
    doormat.position.set(position.x, position.y, position.z);
    doormat.rotation.set(rotation.x, rotation.y, rotation.z);
    if (objects["doormats"] == undefined){
        objects["doormats"] = [doormat];
    }else{
        objects["doormats"].push(doormat);
    }
    
    scene.add(doormat);
}

function createWallLamps(scene, manager, objects, url, position, rotation, scale, name){

    const wallLampLoader = new FBXLoader(manager);
    wallLampLoader.load(url, (wallLamp) => {
        wallLamp.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.name = name
        });       
        wallLamp.scale.setScalar(scale);
        wallLamp.position.set(position.x, position.y, position.z);
        wallLamp.rotation.set(rotation.x, rotation.y, rotation.z);
        if (objects["wallLamps"] == undefined){
            objects["wallLamps"] = [wallLamp];
        }else{
            objects["wallLamps"].push(wallLamp);
        }
        scene.add(wallLamp);
    });

}

