import { useGLTF, Clone } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'
import { useRef, useState } from 'react';
import { useSpring, config } from '@react-spring/three';
import { Color } from 'three';

export function Trees(){
    const tree = useRef()
    const time = useRef(0);
     const itemsRef = useRef([]);

     let arrus=[]
     for(let i =0; i< 100; i++){
arrus.push(i)
     }

    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "/model/Palmtree.glb"
      );
const model = gltf.scene.children[1]
      model.material = new THREE.MeshStandardMaterial({wireframe:true, emissive: '#ff00ff', emissiveIntensity: 2})
      model.scale.set(0.2,0.94,0.2)
    console.log(gltf.scene.children[1].material)

let posX = -3
    useFrame((state)=> {
        let elapsed = state.clock.getElapsedTime();
    
        for (let i = 0; i<itemsRef.current.length; i++){
          let mesh = itemsRef.current[i];
          let z = (i - 20)*13.5+((elapsed*8.4)%100)*2;
          mesh.position.set(posX,-4,-z);
    
          mesh.scale.set(Math.random(), Math.random(), Math.random())
          let dist = Math.abs(z);
          mesh.scale.set( 1 - dist * 0.0084,0.991 - dist * 0.0004,1 - dist * 0.0084);
          
    
        }
      })

return(
        <>
         {arrus.map((v, i) => (
              <mesh
              dispose={null}
              castShadow
              receiveShadow
              position={[i,0,0]}
   
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              >
      <primitive
     object={gltf.scene} 
     ref={tree} 

 />
     <Clone object={gltf.scene} position={[8,0,0]}/>
     <Clone object={gltf.scene} position={[-3,0,0]}/>
 
     </mesh>
     ))}
        </>

    )

}