import { useLoader, useFrame } from "@react-three/fiber";
import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Mesh } from "three";

export function Car() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/model/scene.gltf"
  );

  useEffect(() => {
    gltf.scene.scale.set(75, 75, 75);
    gltf.scene.position.set(0, 0.13, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;


      }
    });
    console.log(gltf.scene.children[0].children[0].children[0].children[0]);
    gltf.scene.children[0].children[0].children[0].children[0].children[3].children[0].material.color = {r:0.1,g:0.01,b:0.2};
    gltf.scene.children[0].children[0].children[0].children[0].children[4].children[0].material.color = {r:0.1,g:0.1,b:0.2};
    gltf.scene.children[0].children[0].children[0].children[0].children[12].children[0].material.color = {r:0.01,g:0.01,b:0.01}

  }, [gltf]);

  useFrame((state, delta)=> {
    let t = state.clock.getElapsedTime();

    let group = gltf.scene.children[0].children[0].children[0].children[0];
    group.children[12].rotation.y = t*8;
    group.children[32].rotation.y = t*8;
    group.children[33].rotation.y = t*8;
    group.children[34].rotation.y = t*8;
  })
  return <primitive object={gltf.scene} rotation-y={-1.53} />;
}
