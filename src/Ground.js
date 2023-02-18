import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding } from "three";
import { RepeatWrapping } from "three";
import { TextureLoader } from "three";

export function Ground (){
    const [roughness, normal] = useLoader(TextureLoader, [
        process.env.PUBLIC_URL + "textures/terrain-roughness.jpg",
        process.env.PUBLIC_URL + "textures/terrain-normal.jpg",
    ]);
    useEffect (() => {
        [roughness, normal].forEach((t)=> {
        t.wrapS = RepeatWrapping;
        t.wrapT = RepeatWrapping;
        t.repeat.set(5,5);
    });
    normal.encoding = LinearEncoding;
    }, [roughness, normal]);

    useFrame((state, delta) => {
        let t = -state.clock.getElapsedTime()*0.48;
        roughness.offset.set(0,t);
        normal.offset.set(0,t);
    })
    return(
        <mesh rotation-x={-Math.PI*0.5} castShadow receiveShadow>
            <planeGeometry args={[30,300]}/>
            <MeshReflectorMaterial
            receiveShadow
            envMapIntensity={0.5}
            normalMap={normal}
            normalScale={[0.15, 0.15]}
            roughnessMap={roughness}
            dithering={true}
            color={[0.015, 0.015, 0.015]}
            roughness={0.97}
            blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
            mixBlur={10} // How much blur mixes with surface roughness (default = 1)
            mixStrength={20} // Strength of the reflections
            mixContrast={1} // Contrast of the reflections
            resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
            mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
            depthScale={0.1} // Scale the depth factor (0 = no depth, default = 0)
            minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
            maxDepthThreshold={0.1} // Upper edge for the depthTexture interpolation (default = 0)
            depthToBlurRatioBias={0.91} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
            debug={0}
            reflectorOffset={0.4} />
        </mesh>
    )
}