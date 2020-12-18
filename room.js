import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';


export class Room {

    constructor(scene, objects, materials) {
        this.scene = scene;
        this.objects = objects;
        this.materials = materials;
    }

    createRoom(position, textures){
        
        let leftWall = textures[0];
        let rightWall = textures[1];
        let frontWall = textures[2];
        let backWall = textures[0];
        let ceiling =  textures[3];
        let floor = textures[4];
    
        let roomTexture_ft = new THREE.TextureLoader().load( leftWall );
        let roomTexture_bk = new THREE.TextureLoader().load( rightWall );
        let roomTexture_up = new THREE.TextureLoader().load( ceiling );
        let roomTexture_dn = new THREE.TextureLoader().load( floor );
        let roomTexture_rt = new THREE.TextureLoader().load( backWall );
        let roomTexture_lf = new THREE.TextureLoader().load( frontWall );
    
        let roomMaterialArray = [];
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
        room.position.set(position.x, position.y, position.z);

        this.scene.add(room);  
        this.objects["room"] = room;
    }

    
    loadFont(scene, objects, url, text, position, size, height, material, name){

        const loaderText = new THREE.FontLoader();
        loaderText.load( url, function ( font ) {
            let textGeometry = new THREE.TextGeometry( text, {
                font: font, size: size, height: height,
            });
            
            let mesh = new THREE.Mesh( textGeometry, material );
            mesh.traverse(child => {
                child.name = name
            } );
            mesh.position.set(position.x, position.y, position.z);
            
            objects[name] = mesh;
            scene.add( mesh );
        });
    }

    loadFBXModel(url, position, rotation, scale, material, name){

        const modelLoader = new FBXLoader();
        modelLoader.load(url, (model) => {
            model.traverse(child => {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material = material;
                child.name = name
            });       
            model.scale.setScalar(scale);
            model.position.set(position.x, position.y, position.z);
            model.rotation.set(rotation.x, rotation.y, rotation.z);

            this.materials[name] = material;
            this.objects[name] = model;
            this.scene.add(model);
        });

    }

    createBox(position, size, textureImg, objectName){
        let boxGeo = new THREE.BoxGeometry( size.x, size.y, size.z);
        let texture = new THREE.TextureLoader().load( textureImg );
        let boxMat = new THREE.MeshPhongMaterial( { map: texture } );
        let box = new THREE.Mesh( boxGeo, boxMat );
        box.traverse(child => {
            child.name = objectName
        } );
        box.position.set(position.x, position.y, position.z)
        
        this.scene.add(box);
        this.objects[objectName] = box
    
        // var geo = new THREE.EdgesGeometry( box.geometry );
        // var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 1 } );
        // var wireframe = new THREE.LineSegments( geo, mat );
        // wireframe.renderOrder = 1;
        // box.add( wireframe );
    }

    createLight(position){
        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        hemiLight.position.set(position.x, position.y, position.z);
        this.scene.add( hemiLight );
    }

    createPaper(position, paperImg, paperName){
        const textureBox1 = new THREE.TextureLoader().load(paperImg);
        const geometry = new THREE.PlaneGeometry( 600, 900 );
        const material = new THREE.MeshBasicMaterial( {map: textureBox1} );
        const plane = new THREE.Mesh( geometry, material );
        plane.position.set(position.x, position.y, position.z);
        
        this.objects[paperName] = plane;
        this.scene.add( plane )
    }
    
    createButtonClose(position, buttonName){
        const textureClose = new THREE.TextureLoader().load('img/common/cross.png');
        const geometryClose = new THREE.PlaneGeometry( 50, 50 );
        const materialClose = new THREE.MeshBasicMaterial( { map: textureClose} );
        const buttonClose = new THREE.Mesh( geometryClose, materialClose );
        buttonClose.traverse(child => {
            child.name = buttonName
        } );
        buttonClose.position.set(position.x, position.y, position.z);

        this.objects[buttonName] = buttonClose;
        this.scene.add( buttonClose );
    }

}