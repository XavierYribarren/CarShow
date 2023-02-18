import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Ground } from './Ground';
import { Car } from './Car';
import { Rings } from './Rings';
import { Boxes } from './Boxes';
import { Totus } from './Totus';
import { Trees } from './Trees';
import './App.css';
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from '@react-three/drei';
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer } from '@react-three/postprocessing';
import {BlendFunction} from "postprocessing"

function CarShow() {


  return (
    <>
 <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[2, 1, 5]}/> 

      <color args={[0.01, 0.01, 0.01]} attach='background' />
            <CubeCamera resolution={512} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
      {/* <Rings /> */}
      {/* <Boxes/>  */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
            <Totus/>
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.96}
        penumbra={0.5}
        position={[0, 1, 3]}
        castShadow
        shadow-bias={-0.0001}
      />
    <Trees/>
       <Ground />
        <EffectComposer>
          <DepthOfField focusDistance={0.0035} focalLength={0.05} bokehScale={4} height={480}/>
          <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3}
          width={400}
          height={400}
          kernelSize={5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.025}
          />
          <ChromaticAberration 
          blendFunction={BlendFunction.NORMAL}
          offset={[0.00006, 0.0002]}
          />
        </EffectComposer>
      {/* <mesh>
      <boxGeometry args={[1,1,1]}/>
      <meshLambertMaterial color={'red'} />
    </mesh> */}
    </>
  );
}
function App() {
  return (
    // <Suspense >
      <Canvas shadows linear gl={{antialias: true}}>
        <CarShow />
        <Stars radius={100} depth={500} count={5000} factor={4} saturation={0} fade speed={1}/>
  
      </Canvas>
    // </Suspense>
  );
}

export default App;
