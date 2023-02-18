import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Ground } from './Ground';
import { Car } from './Car';
import { Rings } from './Rings';
import { Boxes } from './Boxes';
import { Totus } from './Totus';
import { Trees } from './Trees';
import './App.css';
import {
  CameraShake,
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from '@react-three/drei';
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer } from '@react-three/postprocessing';
import {BlendFunction} from "postprocessing"

function CarShow({aDonf}) {

const orbus = useRef()


  const config = {
    maxYaw: 0.21, // Max amount camera can yaw in either direction
    maxPitch: 0.051, // Max amount camera can pitch in either direction
    maxRoll: 0.1, // Max amount camera can roll in either direction
    yawFrequency: 0.1, // Frequency of the the yaw rotation
    pitchFrequency: aDonf?  10 :1.5 , // Frequency of the pitch rotation
    rollFrequency: 0.1, // Frequency of the roll rotation
    intensity: 0.5, // initial intensity of the shake
    decay: false, // should the intensity decay over time
    decayRate: 0.95, // if decay = true this is the rate at which intensity will reduce at
    controls: orbus.current, // if using orbit controls, pass a ref here so we can update the rotation
  }

  console.log(aDonf)
  return (
    <>
 <OrbitControls ref={orbus} target={[0, 0.35, 0]} maxPolarAngle={1.45}/>
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
      <CameraShake {...config} />
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={0.5}
        angle={0.6}
        penumbra={0.5}
        position={[0, 5, -10]}
        castShadow
        shadow-bias={-0.0001}
      /> *
            <Totus/>
<fog/>
    <Trees aDonf={aDonf}/>
       <Ground aDonf={aDonf}/>
        <EffectComposer>
          <DepthOfField focusDistance={0.0025} focalLength={0.015} blur={1} bokehScale={aDonf? 10 : 4} height={480}/>
          <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={aDonf? 3: 1.3}
          width={400}
          height={400}
          kernelSize={5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.025}
          />
          <ChromaticAberration 
          blendFunction={BlendFunction.NORMAL}
          offset={aDonf?[0.0026, 0.0002]: [0.0006, 0.0002]}
          />
        </EffectComposer>

    </>
  );
}
function App() {
  const [aDonf, setADonf] = useState(false)
  return (

      <Canvas shadows linear gl={{antialias: true}} onClick={() => setADonf(!aDonf)}>
        <CarShow aDonf={aDonf}/>
        <Stars radius={100} depth={500} count={5000} factor={4} saturation={0} fade speed={1}/>
  
      </Canvas>

  );
}

export default App;
