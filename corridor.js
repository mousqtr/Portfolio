import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { createBox, createTitle } from './utils.js';

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
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set(0, 0, 0);
    scene.add( hemiLight );
    lights["hemiLight"] = hemiLight;

    // Directional Light
    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set(0, 0, 300);
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
    let texture_ft = new THREE.TextureLoader().load( 'img/wallRed.jpg');
    let texture_bk = new THREE.TextureLoader().load( 'img/wallRed.jpg');
    let texture_up = new THREE.TextureLoader().load( 'img/ceilingWhite.jpg');
    let texture_dn = new THREE.TextureLoader().load( 'img/floorGrey.jpg');
    let texture_rt = new THREE.TextureLoader().load( 'img/wallRed.jpg');
    let texture_lf = new THREE.TextureLoader().load( 'img/wallRed.jpg');

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
        
    let corridorGeo = new THREE.BoxGeometry( 1000, 1000, 10000);
    let corridor = new THREE.Mesh( corridorGeo, corridorMaterialArray );
    corridor.position.set(0, 0, -4500)
    scene.add( corridor );  
    objects["corridor"] = corridor;


    /*************************************************************/
    /*                       PALADIN                             */
    /*************************************************************/

    const loaderPaladin = new FBXLoader();
    loaderPaladin.load('models/paladin/paladin.fbx', (paladin) => {

        // Load the model
        paladin.scale.setScalar(3);
        paladin.position.set(0, -500, -600)
        paladin.rotation.set(0, Math.PI, 0)
        paladin.traverse(child => {
        child.castShadow = true;
        child.receiveShadow = true;
        });
        objects["paladin"] = paladin;

        // Load the walk animation
        const animWalk = new FBXLoader();
        animWalk.load('models/paladin/walk.fbx', (animWalk) => {
            const mixer = new THREE.AnimationMixer(paladin);     
            const action = mixer.clipAction( animWalk.animations[0] );
            mixers["mixerWalk"] = mixer
            actions["walk"] = action;
        });
        
        // Load the stand animation
        const animStand = new FBXLoader();
        animStand.load('models/paladin/stand_brief.fbx', (animStand) => {
            const mixer = new THREE.AnimationMixer(paladin);
            const action = mixer.clipAction(animStand.animations[0]);
            mixers["mixerStand"] = mixer
            actions["stand"] = action;
            action.play();
        });

        // Load the stand animation
        const animRightTurn = new FBXLoader();
        animRightTurn.load('models/paladin/right_turn.fbx', (animRightTurn) => {
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
        loaderDoor.load('models/door2.fbx', (door) => {
            
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
    arrowLoader.load('models/arrow.fbx', (arrow) => {
        arrow.traverse(child => {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshPhongMaterial( { 
            color: 0x00003f
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



    // const benchLoader = new FBXLoader();
    // benchLoader.load('models/corridor/bench3.fbx', (plant) => {
    //     plant.traverse(child => {
    //         child.castShadow = true;
    //         child.receiveShadow = true;
    //         child.material = new THREE.MeshPhongMaterial( { 
    //             color: 0x855E42
    //         } );
    //     });       
    //     plant.scale.setScalar(1.4);
    //     plant.position.set(420, -500, -2400);
    //     plant.rotation.set(0, Math.PI, 0);
    //     scene.add(plant);
    // });



    return [objects, materials, mixers, actions, lights];

}



