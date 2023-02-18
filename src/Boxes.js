import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useSpring, animated, config} from "@react-spring/three";

function Box({color}){
  const box = useRef();
  const time = useRef(0);
  const [position, setPosition] = useState(getInitialPosition());
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2.0)*0.5+0.05);


  function getInitialPosition() {
    let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15); 
    if(v.x < 0) v.x -= 1.75;
    if(v.x > 0) v.x += 1.75;

    return v;
  }
  function resetPosition(){
    let v = new Vector3((Math.random()*2-1)*3, Math.random()*2.5+0.1, (Math.random()*2-1)*15);
    if (v.x < 0) v.x -= 1.75;
    if(v.x > 0) v.x += 1.75;
    setPosition(v);
  }

  useFrame(
    (state, delta) => {
      time.current += delta * 4.52;
      let newZ = position.z - (time.current);

      if(newZ < -15) {
        resetPosition();
        time.current = -5;
      }

      box.current.position.set(
        position.x, 
        position.y, 
        newZ, 
      )
      box.current.rotation.x += delta * xRotSpeed;
      box.current.rotation.y += delta * yRotSpeed;
    },
    [xRotSpeed, yRotSpeed, position]
  );
 


 return (
    <mesh ref={box} scale={scale} rotation-x={Math.PI * 0.5}  castShadow >
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15}/>
    </mesh>
  );
}

export function Boxes(){
  const [arr] = useState(() => {
    let a = [];
    for(let i = 0; i<100; i++) a.push(0);
    return a;
  })
  const [flip, set] = useState(false);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  })
  return <>
  {arr.map((e, i) => <Box key={i} style={props} color={i%2=== 0 ? [0.4,0.1,0.1] : [0.05, 0.15, 0.4]}/>)}
  </>
}