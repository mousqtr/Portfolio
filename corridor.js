import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { createTitle, loadFBXModel } from './utils.js';

export function initCorridor(scene){

    let objects = {};
    let materials = {}
    let mixers = {}
    let actions = {};
    let lights = {};


    /*************************************************************/
    /*                          LIGHTS                           */
    /*************************************************************/

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

    /*************************************************************/
    /*                       CORRIDOR                            */
    /*************************************************************/

    let corridorMaterialArray = [];
    let texture_ft = new THREE.TextureLoader().load( 'img/corridor/wall.png');
    let texture_bk = new THREE.TextureLoader().load( 'img/corridor/wall.png');
    let texture_up = new THREE.TextureLoader().load( 'img/ceilingWhite.jpg');
    let texture_dn = new THREE.TextureLoader().load( 'img/floorGrey.jpg');
    let texture_rt = new THREE.TextureLoader().load( 'img/corridor/wall.png');
    let texture_lf = new THREE.TextureLoader().load( 'img/corridor/wall.png');

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


    /*************************************************************/
    /*                       PALADIN                             */
    /*************************************************************/

    const loaderPaladin = new FBXLoader();
    loaderPaladin.load('models/corridor/malcolm/malcolm.fbx', (paladin) => {

        // Load the model
        paladin.scale.setScalar(1.5);
        paladin.position.set(0, -500, -600)
        paladin.rotation.set(0, Math.PI, 0)
        paladin.traverse(child => {
        child.castShadow = true;
        child.receiveShadow = true;
        });
        objects["paladin"] = paladin;

        // Load the walk animation
        const animWalk = new FBXLoader();
        animWalk.load('models/corridor/malcolm/malcolm_walk.fbx', (animWalk) => {
            const mixer = new THREE.AnimationMixer(paladin);     
            const action = mixer.clipAction( animWalk.animations[0] );
            mixers["mixerWalk"] = mixer
            actions["walk"] = action;
        });
        
        // Load the stand animation
        const animStand = new FBXLoader();
        animStand.load('models/corridor/malcolm/malcolm_stand.fbx', (animStand) => {
            const mixer = new THREE.AnimationMixer(paladin);
            const action = mixer.clipAction(animStand.animations[0]);
            mixers["mixerStand"] = mixer
            actions["stand"] = action;
            action.play();
        });

        // Load the stand animation
        const animRightTurn = new FBXLoader();
        animRightTurn.load('models/corridor/paladin/right_turn.fbx', (animRightTurn) => {
            const mixer = new THREE.AnimationMixer(paladin);
            const action = mixer.clipAction(animRightTurn.animations[0]);
            action.loop = THREE.LoopOnce;
            action.clampWhenFinished = true;
            mixers["mixerRightTurn"] = mixer
            mixer.timeScale = 0.4;
            mixer.addEventListener( 'finished', finishRightTurn );
            actions["rightTurn"] = action;
        });

        scene.add(paladin);

    });

    let rightTurnFinished = false;

    function finishRightTurn(){
        rightTurnFinished = true;
        actions["rightTurn"].reset()
    }


    /*************************************************************/
    /*                          DOORS                            */
    /*************************************************************/

    let doors = [];
    let doorPosX, doorPosZ;
    for ( let i = 0; i < 4; i ++ ) {
        const loaderDoor = new FBXLoader();
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


    /*************************************************************/
    /*                         TITLES                            */
    /*************************************************************/

    let posX_left = -475;
    let posX_right = 190;
    let posZ_1 = 0.67 * window.innerWidth - 2033;
    let posZ_2 = 0.67 * window.innerWidth - 4033;
    let posTextProfil = new THREE.Vector3(posX_left, 150, posZ_1);
    let posTextFormation = new THREE.Vector3(posX_right, 150, posZ_1);
    let posTextExperiences = new THREE.Vector3(posX_left, 150, posZ_2);
    let posTextProjets = new THREE.Vector3(posX_right, 150, posZ_2);
    createTitle(scene, objects, posTextProfil, 'Profil');
    createTitle(scene, objects, posTextFormation, 'Formation');
    createTitle(scene, objects, posTextExperiences, 'Experiences');
    createTitle(scene, objects, posTextProjets, 'Projets');



    /*************************************************************/
    /*                         ARROW                             */
    /*************************************************************/

    // Load the top arrow 
    const arrowLoader = new FBXLoader();
    arrowLoader.load('models/commun/arrow.fbx', (arrow) => {
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

    /*************************************************************/
    /*                         TEXT                              */
    /*************************************************************/

    let texts = ['Suivant', 'Precedent']
    for ( let i = 0; i < 2; i ++ ) {
        const loaderText = new THREE.FontLoader();
        loaderText.load( 'fonts/Bebas_Neue_Regular.json', function ( font ) {

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


    // Plants
    const plantUrl = 'models/corridor/plant2/plant.fbx';
    const plantXPositions = [-370, 370];
    const plantRotations = [-Math.PI, Math.PI]
    const plantScale = 0.6;
    
    for ( let i = 0; i < 2; i ++ ) {
        const plantName = 'plant'.concat(i.toString());
        const plantPosZ = 0.67 * window.innerWidth - 4600;
        const plantPos = new THREE.Vector3(plantXPositions[i], -480, plantPosZ);
        const plantRot = new THREE.Vector3(0, plantRotations[i], 0);
        createPlant(scene, objects, plantUrl, plantPos, plantRot, plantScale, plantName);
    }


    // Shelf
    const bookShelfUrl = 'models/corridor/bookshelf/bookshelf.fbx';
    const bookShelfPos = new THREE.Vector3(-800, -480, -6000);
    const bookShelfRot = new THREE.Vector3(0, 0, 0);
    const bookShelfScale = 6;
    const bookShelfName = 'bookshelf';
    loadFBXModel(scene, objects, bookShelfUrl, bookShelfPos, bookShelfRot, bookShelfScale, bookShelfName);


   // Doormats
    const doormatUrl1 = 'img/corridor/doormat.jpg';
    const doormatUrl2 = 'img/corridor/formation.jpg';
    const doormatUrl3 = 'img/corridor/experiences.jpg';
    const doormatUrl4 = 'img/corridor/projets.jpg';
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
        createDoorMat(scene, objects, doormatUrl, doormatPos, doormatRot, doormatName);
    }

    // Table
    const tableUrl = 'models/corridor/table/table.fbx';
    const tablePosZ = 0.67 * window.innerWidth - 3100
    const tablePos = new THREE.Vector3(370, -480, tablePosZ);
    const tableRot = new THREE.Vector3(0, 0, 0);
    const tableScale = 0.18;
    const tableName = 'table';
    loadFBXModel(scene, objects, tableUrl, tablePos, tableRot, tableScale, tableName);

    // Lamp
    const lampUrl = 'models/corridor/lamp/lamp.fbx';
    const lampPosZ = 0.67 * window.innerWidth - 3020
    const lampPos = new THREE.Vector3(355, -200, lampPosZ);
    const lampRot = new THREE.Vector3(0, 0, 0);
    const lampScale = 0.03;
    const lampName = 'lamp';
    loadFBXModel(scene, objects, lampUrl, lampPos, lampRot, lampScale, lampName);

    return [objects, materials, mixers, actions, lights];

}


function createPlant(scene, objects, url, position, rotation, scale, name){

    const plantLoader = new FBXLoader();
    plantLoader.load(url, (plant) => {
        plant.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.name = name
        });       
        plant.scale.setScalar(scale);
        plant.position.set(position.x, position.y, position.z);
        plant.rotation.set(rotation.x, rotation.y, rotation.z);
        if (objects["plants"] == undefined){
            objects["plants"] = [plant];
        }else{
            objects["plants"].push(plant);
        }
        scene.add(plant);
    });

}

function createDoorMat(scene, objects, textureUrl, position, rotation, name){
    const doormatGeo = new THREE.BoxGeometry(200, 10, 380);
    const doormatTexture = new THREE.TextureLoader().load( textureUrl );
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



