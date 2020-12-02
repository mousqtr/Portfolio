import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {TGALoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/TGALoader.js';

export function initRoom1(scene){

    let objects = {};

    /*************************************************************/
    /*                          LIGHTS                           */
    /*************************************************************/

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set(1400, 0, 0);
    scene.add( hemiLight );


    /*************************************************************/
    /*                         ROOM                              */
    /*************************************************************/
    
    let roomMaterialArray = [];
    let roomTexture_ft = new THREE.TextureLoader().load( 'img/wallRed.jpg');
    let roomTexture_bk = new THREE.TextureLoader().load( 'img/wallRed.jpg');
    let roomTexture_up = new THREE.TextureLoader().load( 'img/ceilingWhite.jpg');
    let roomTexture_dn = new THREE.TextureLoader().load( 'img/floorGrey.jpg');
    let roomTexture_rt = new THREE.TextureLoader().load( 'img/wallRed.jpg');
    let roomTexture_lf = new THREE.TextureLoader().load( 'img/room1/wallRoom.png');

    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_ft }));
    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_bk }));
    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_up }));
    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_dn }));
    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_rt }));
    roomMaterialArray.push(new THREE.MeshBasicMaterial( { map: roomTexture_lf }));

    for (let i = 0; i < 6; i++) {
        roomMaterialArray[i].side = THREE.BackSide;
    }
        
    let roomGeo = new THREE.BoxGeometry( 1000, 1000, 2000);
    let room = new THREE.Mesh( roomGeo, roomMaterialArray );
    room.position.set(1400, 0, -600)
    scene.add(room);  
    objects["room"] = room


    /*************************************************************/
    /*                         BOXES                             */
    /*************************************************************/

    let box1Geo = new THREE.BoxGeometry( 150, 150, 150);
    let texture1 = new THREE.TextureLoader().load( 'img/room1/cpe.jpg');
    let box1Mat = new THREE.MeshPhongMaterial( { map: texture1 } );
    let box1 = new THREE.Mesh( box1Geo, box1Mat );
    box1.position.set(1150, -110, -1400)
    scene.add(box1);
    objects["box1"] = box1

    let boxGeo2 = new THREE.BoxGeometry( 150, 150, 150);
    let texture2 = new THREE.TextureLoader().load( 'img/room1/charlemagne.jpg');
    let boxMat2 = new THREE.MeshPhongMaterial( { map: texture2 } );
    let box2 = new THREE.Mesh( boxGeo2, boxMat2 );
    box2.position.set(1400, -110, -1400)
    scene.add(box2);
    objects["box2"] = box2

    let boxGeo3 = new THREE.BoxGeometry( 150, 150, 150);
    let texture3 = new THREE.TextureLoader().load( 'img/room1/henri.jpg');
    let boxMat3 = new THREE.MeshPhongMaterial( { map: texture3 } );
    let box3 = new THREE.Mesh( boxGeo3, boxMat3 );
    box3.position.set(1650, -110, -1400)
    scene.add( box3 );
    objects["box3"] = box3 


    /*************************************************************/
    /*                          DESK                             */
    /*************************************************************/
    const loaderTextureDesk = new TGALoader();
    const textureDesk = loaderTextureDesk.load('models/desk/texture.tga');

    const matDesk = new THREE.MeshPhongMaterial( {
        color: 0xffffff,
        map: textureDesk
    } );

    const loaderDesk = new FBXLoader();
    loaderDesk.load('models/desk/desk.FBX', (desk) => {

        desk.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = matDesk;
        });
        desk.scale.setScalar(4);
        desk.position.set(1400, -500, -1400);
        desk.rotation.set(0, 0, 0);
        scene.add(desk);
        objects["desk"] = desk 
    });



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
            color: 0x00008b
        } );
        child.name = 'arrowRoom';
        });       
        arrow.scale.setScalar(50);
        arrow.position.set(1300, 200, -600);
        arrow.rotation.set(0, Math.PI, 0);
        arrow.name = "arrow";
        objects["arrow"] = arrow;
        scene.add(arrow);
    });

    /*************************************************************/
    /*                         TEXT                              */
    /*************************************************************/

    const loaderText = new THREE.FontLoader();
    loaderText.load( 'fonts/Bebas_Neue_Regular.json', function ( font ) {

        const textGeometry = new THREE.TextGeometry( 'Sortir', {
            font: font, size: 14, height: 2,
        });
        
        var textMaterial = new THREE.MeshPhongMaterial( { 
            color: 0xffffff, 
        });
        
        var mesh = new THREE.Mesh( textGeometry, textMaterial );

        mesh.traverse(child => {
            child.name = 'textArrowRoom'
        } );

        mesh.position.set(1282, 190, -580);
        objects["textArrowRoom"] = mesh;
        
        scene.add( mesh );
            
    });

    return objects;
}


