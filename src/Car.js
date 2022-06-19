import { useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Car() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/model/scene.gltf"
  );

  useEffect(() => {
    gltf.scene.scale.set(50, 50, 50);
    gltf.scene.position.set(0, 0.1, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.shadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
        console.log(gltf)
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}
